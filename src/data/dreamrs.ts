import { FileNode } from '../components/CodeViewer';

export const dreamrs: FileNode[] = [
    {
        name: 'Dreamrs',
        path: 'Dreamrs',
        type: 'directory',
        children: [
            {
                name: '.gitignore',
                path: 'Dreamrs/.gitignore',
                type: 'file',
                content: `# Secrets
Secrets
Secrets.swift`,
                language: 'plaintext'
            },
            {
                name: 'ContentView.swift',
                path: 'Dreamrs/ContentView.swift',
                type: 'file',
                content: `//
//  ContentView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI
import FirebaseAuth
import AuthenticationServices

struct ContentView: View {
    @StateObject var authManager = AuthManager()
    @StateObject var userManager = UserManager()
    
    var body: some View {
        ZStack {
            // check if user is logged in from userDefaults
            if let loginStatus = UserDefaults.standard.object(forKey: loginStatusKey) as? Bool {
                
                if loginStatus == false {
                    RegisterView()
                }
                
                if loginStatus == true {
                    BottomNavBar()
                        .onAppear {
                            if let userId = Auth.auth().currentUser?.uid {
                                userManager.retrieverUserFromFirestore(userId: userId)
                            } else {
                                print("The current user could not be retrieved")
                                authManager.logOut()
                            }
                        }
                    
                    if let hasUserCompletedWelcomeSurvey = userManager.user?.hasUserCompletedWelcomeSurvey {
                        if hasUserCompletedWelcomeSurvey == false {
                            WelcomeSurveyView()
                        }
                    }
                }
            } else {
                RegisterView()
            }
        }
        .environmentObject(authManager)
        .environmentObject(userManager)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
`,
                language: 'plaintext'
            },
            {
                name: 'Controllers',
                path: 'Dreamrs/Controllers',
                type: 'directory',
                children: [
                    {
                        name: 'AdminManager.swift',
                        path: 'Dreamrs/Controllers/AdminManager.swift',
                        type: 'file',
                        content: `//
//  AdminManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/31/24.
//

import Foundation
import FirebaseFirestore
import FirebaseStorage
import OpenAI
import StabilityAIKit

class AdminManager : ObservableObject {
    
    // Firestore
    let db = Firestore.firestore()
    
    // Storage
    let storage = Storage.storage()
    
    let openAI = OpenAI(configuration: OpenAI.Configuration(token: Secrets().openAiToken, timeoutInterval: 60.0))
    let stabilityAiConfiguration = Configuration(apiKey: Secrets().stabilityAiToken)
    
    var botUsers : [[String: String]] = [
        ["userId" : "XmdaBDcFQIt71hoPA2QT", "userColor" : "Blue", "userHandle" : "gkittle"],
        ["userId" : "TDcr5qoRdcPqPvK434WL", "userColor" : "Purple", "userHandle" : "arose"],
        ["userId" : "2EboIKb1bgr9ICzk8Pcz", "userColor" : "Yellow", "userHandle" : "liamjones"],
        ["userId" : "BRpaoW5CiyzA74QewsuF", "userColor" : "Orange", "userHandle" : "mayapatel"],
        ["userId" : "ffL918HWwTEVHBKsO6CH", "userColor" : "Cyan", "userHandle" : "egarcia"],
        ["userId" : "1fFuZd1Vf7NIYzahDRBM", "userColor" : "Red", "userHandle" : "livhernandez"],
        ["userId" : "i5N71qbgFtgJEt0q7yWG", "userColor" : "Blue", "userHandle" : "nomiller"],
    ]
    
    func generateRandomDreamsForForYouPage() {
        for user in self.botUsers {
            submitDream(userId: user["userId"]!, userColor: user["userColor"]!, userHandle: user["userHandle"]!)
        }
    }
    
    func submitDream(userId: String, userColor: String, userHandle: String) {
        // Steps:
        
        // 1. Generate a random dream title, 5 words or less
        // 2. Generate a dream description based on the title, 100 words or less
        // 3. Submit the dream to firestore
        // 4. Go through the AI process for text analysis, save it to the dream object
        // 5. Go through the AI process for image generation, save it to storage and set bit on the dream in firestore
        
        let dreamPrompt = "Generate a random dream you had (no flying, make the dream unique), don't include quotes. Six words or less."
        let query = ChatQuery(messages: [.init(role: .user, content: dreamPrompt)!], model: .gpt3_5Turbo)
        openAI.chats(query: query) { result in
            switch result {
            case .success(let result):
                do {
                    
                    if let response = result.choices[0].message.content {
                        // Now generate a dream description based on the dream title
                        let dreamDescriptionPrompt = "Generate a dream based on the following title, one hundred words or less: " + response
                        
                        let queryDescription = ChatQuery(messages: [.init(role: .user, content: dreamDescriptionPrompt)!], model: .gpt3_5Turbo)
                        self.openAI.chats(query: queryDescription) { result in
                            switch result {
                            case .success(let result):
                                do {
                                    if let responseDescription = result.choices[0].message.content {
                                        let date = Date()
                                        let formattedDate = date.formatted(date: .abbreviated, time: .omitted)
                                        let calendar = Calendar.current
                                        let dayOfWeek = calendar.component(.weekday, from: Date())
                                        let dayOfWeekString = calendar.weekdaySymbols[dayOfWeek - 1]
                                        let timestamp = Timestamp(date: Date())
                                        let dateValue = timestamp.dateValue()
                                        let dateFormatter = DateFormatter()
                                        dateFormatter.dateFormat = "MMMMYYYY"  // Set the desired format
                                        let formattedString = dateFormatter.string(from: dateValue)
                                        let dreamCollection = "dreams" + formattedString
                                        
                                        let archivedData: Data = try! NSKeyedArchiver.archivedData(withRootObject: NSAttributedString(string: responseDescription), requiringSecureCoding: false)
                                        
                                        // Now create a dream object and save it firestore
                                        // Create a dream object
                                        var dream = Dream(authorId: userId, authorHandle: userHandle, authorColor: userColor, title: response, plainText: responseDescription, archivedData: archivedData, date: formattedDate, rawTimestamp: timestamp, dayOfWeek: dayOfWeekString, karma: 1, sharedWithFriends: true, sharedWithCommunity: true, tags: [])
                                        
                                        // Store the dream in firestore
                                        let dreamsRef = self.db.collection("dreams" + formattedString)
                                        do {
                                            let newDreamRef = try dreamsRef.addDocument(from: dream)
                                            print("Dream stored with new doc reference: ", newDreamRef.documentID)
                                            
                                            // update the local dream id
                                            dream.id = newDreamRef.documentID
                                            
                                            // Add 1 to users num derams
                                            // TODO add error handling
                                            let userRef = self.db.collection("users").document(userId)
                                            userRef.updateData([
                                                "numDreams": FieldValue.increment(Int64(1))
                                            ])
                                            
                                            // AI Steps. Call analyze text, which will call generate image
                                            self.analyzeDreamText(dreamId: newDreamRef.documentID, dreamContent: responseDescription)
                                            return
                                        } catch {
                                            print("Error saving dream to firestore: ", error.localizedDescription)
                                            return
                                        }
                                        
                                    }
                                } catch {
                                    print("Failure idk")
                                }
                            case .failure(let error):
                                print("Failure generating dream description: ", error)
                            }
                        }
                    }
                } catch {
                    print("Failure big idk")
                }
            case .failure(let error):
                print("failure getting gpt response: ", error)
            }
        }
    }
    
    func analyzeDreamText(dreamId: String, dreamContent: String) {
        let dreamPrompt = "Analyze the following dream: " + dreamContent
        
        let query = ChatQuery(messages: [.init(role: .user, content: dreamPrompt)!], model: .gpt3_5Turbo)
        openAI.chats(query: query) { result in
            // Handle OpenAI response
            switch result {
            case .success(let result):
                if let response = result.choices[0].message.content {
                    // Save the AI dream analysis onto the dream object in firestore
                    do {
                        // Get dream collection
                        let timestamp = Timestamp(date: Date())
                        let date = timestamp.dateValue()
                        let dateFormatter = DateFormatter()
                        dateFormatter.dateFormat = "MMMMYYYY"  // Set the desired format
                        let formattedString = dateFormatter.string(from: date)
                        let dreamCollection = "dreams" + formattedString

                        try self.db.collection(dreamCollection).document(dreamId).updateData([
                            "AITextAnalysis": response
                        ])
                        
                        print("AI text analysis successfully saved to firestore")
                        
                        // Text is done, now call visualizeDream
                        Task {
                            await self.visualizeDream(dreamId: dreamId, dreamContent: dreamContent)
                        }
                        
                    } catch {
                        print("Error saving AI text analysis to firestore")
                    }
                } else {
                    print("Text response from OpenAI is empty")
                }
            case .failure(let error):
                print("Failure generating AI Dream Analysis: ", error.localizedDescription)
                
            }
        }
    }
    
    func visualizeDream(dreamId: String, dreamContent: String) async {
        let imagePrompt = "Visualize this dream:" + dreamContent
        
        let client = Client(configuration: stabilityAiConfiguration)
        let request = TextToImageRequest(textPrompts: [.init(text: imagePrompt)])
        
        do {
            let results = try await client.getImageFromText(request, engine: "stable-diffusion-xl-1024-v1-0")
            // Make a UI Image with the response
            
            // Convert the response payload to UIImage
            if let response = results[0].data {
                let image = UIImage(data: response)
                
                // Convert the image into JPEG and compress the quality to reduce its size
                if let image = image {
                    let data = image.jpegData(compressionQuality: 0.8)
                    
                    let metadata = StorageMetadata()
                    metadata.contentType = "image/jpg"
                    
                    // Save the compressed jpeg to firestore under the dreamId
                    
                    // Get dream collection
                    let timestamp = Timestamp(date: Date())
                    let date = timestamp.dateValue()
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateFormat = "MMMMYYYY"  // Set the desired format
                    let formattedString = dateFormatter.string(from: date)
                    let dreamCollection = "dreams" + formattedString
                    
                    // Create a storage reference
                    let storageRef = storage.reference().child(dreamCollection + "/" + dreamId + ".jpg")
                    
                    if let data = data {
                        storageRef.putData(data, metadata: metadata) { (metadata, error) in
                            if let error = error {
                                print("Error while uploading file to storage: ", error)
                            } else {
                                if let metadata = metadata {
                                    print("Metadata: ", metadata)
                                }
                                self.db.collection(dreamCollection).document(dreamId).updateData([
                                    "hasImage": true
                                ]) { error in
                                    if let error = error {
                                        print("Error setting has image bit on dream: ", error.localizedDescription)
                                        
                                    } else {
                                        print("successfully completed image flow, closing popup")
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
        } catch {
            print("error generating image with stable diffusion: ", error)
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'AuthManager.swift',
                        path: 'Dreamrs/Controllers/AuthManager.swift',
                        type: 'file',
                        content: `import AuthenticationServices
import CryptoKit
import Foundation
import FirebaseCore
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import PhotosUI


class AuthManager: UIViewController, ObservableObject {
    // This variable tracks whether or not the user will encounter the login / register screens
    @Published var isLoggedIn: Bool = false
    
    @Published var email = ""
    @Published var firstName = ""
    @Published var lastName = ""
    
    // Unhashed nonce. (used for Apple sign in)
    @Published var currentNonce:String?
    @Published var request: ASAuthorizationAppleIDRequest?
    
    @Published var errorString: String = ""
    @Published var isErrorStringShowing: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    
    // The function called in the onComplete closure of the SignInWithAppleButton in the RegisterView
    func appleSignInButtonOnCompletion(result: Result<ASAuthorization, Error>) {
        switch result {
        case .success(let authResults):
            print(authResults.credential.description)
            switch authResults.credential {
            case let appleIDCredential as ASAuthorizationAppleIDCredential:
                
                guard let nonce = currentNonce else {
                    fatalError("Invalid state: A login callback was received, but no login request was sent.")
                }
                guard let appleIDToken = appleIDCredential.identityToken else {
                    fatalError("Invalid state: A login callback was received, but no login request was sent.")
                }
                
                print("full name: ", appleIDCredential.fullName ?? "no name")
                
                if let fullName = appleIDCredential.fullName {
                    if let firstName = fullName.givenName {
                        self.firstName = firstName
                    }
                    
                    if let lastName = fullName.familyName {
                        self.lastName = lastName
                    }
                }
                
                guard let idTokenString = String(data: appleIDToken, encoding: .utf8) else {
                    print("Unable to serialize token string from data: \\(appleIDToken.debugDescription)")
                    return
                }
                
                let credential = OAuthProvider.appleCredential(withIDToken: idTokenString,
                                                                        rawNonce: nonce,
                                                                        fullName: appleIDCredential.fullName)
                
//                let credential = OAuthProvider.credential(withProviderID: "apple.com",idToken: idTokenString, rawNonce: nonce)
                Auth.auth().signIn(with: credential) { (authResult, error) in
                    if (error != nil) {
                        // Error. If error.code == .MissingOrInvalidNonce, make sure
                        // you're sending the SHA256-hashed nonce as a hex string with
                        // your request to Apple.
                        print(error?.localizedDescription as Any)
                        return
                    }
                    
                    guard let user = authResult?.user else {
                        //                        print("No user")
                        return
                    }
                    
                    // grab the email
                    if let email = user.email {
                        self.email = email
                    }
                    
                    
                    if let name = user.displayName {
                        print("display name is: ", name)
                    } else {
                        print("no display name")
                    }
                    
                    //                    print("signed in with apple")
                    //                    print("\\(String(describing: user.uid))")
                    
                    
                    // Figure out if the user already has an account or is signing up for the first time (email is either blank or filled, can't be null)
                    let docRef = self.db.collection("users").whereField("email", isEqualTo: self.email)
                    docRef.getDocuments { (querySnapshot, err) in
                        if let err = err {
                            print("Error retrieving user via email: ", err)
                        } else {
                            if querySnapshot!.documents.isEmpty {
                                // No user account matches this email, create a firestore user, new user is registering
                                
                                // Create the user object (only define some fields, the user will update the rest of the info in the welcome survey)
                                let userObject = User(firstName: self.firstName, lastName: self.lastName, email: self.email, handle: "", userColor: "black", following: [user.uid], followers: [user.uid], numDreams: 0, karma: 0, pinnedDreams: [], hasUserCompletedWelcomeSurvey: false)
                                // Add the user to firestore user collection
                                let collectionRef = self.db.collection("users")
                                do {
                                    try collectionRef.document(user.uid).setData(from: userObject)
                                    //                                    print("Apple sign in user stored in firestore with new user reference: ", user.uid)
                                    
                                    self.isLoggedIn = true
                                    // Set user defaults
                                    UserDefaults.standard.set(self.isLoggedIn, forKey: loginStatusKey)
                                } catch {
                                    print("Error saving the new user to firestore")
                                }
                            } else {
                                // An existing user is signing in
                                //                                print("A current user with that same email already exists: ")
                                //                                print(querySnapshot!.documents[0].documentID)
                                
                                //                                let dataDescription = querySnapshot!.documents[0].data().map(String.init(describing:))
                                
                                
                                //                                print("The auth user id is: ")
                                if let user = Auth.auth().currentUser {
                                    print(user.uid)
                                }
                                
                                self.isLoggedIn = true
                                // Set user defaults
                                UserDefaults.standard.set(self.isLoggedIn, forKey: loginStatusKey)
                            }
                        }
                    }
                }
            default:
                break
            }
        default:
            break
        }
    }
    
    func logOut() {
        let firebaseAuth = Auth.auth()
        do {
            try firebaseAuth.signOut()
        } catch let signOutError as NSError {
            print("Error signing out: \\(signOutError.localizedDescription)")
            return
        }
        self.isLoggedIn = false
        UserDefaults.standard.set(isLoggedIn, forKey: loginStatusKey)
        UserDefaults.standard.set(false, forKey: hasUserCompletedWelcomeSurveyKey)
        //        print("The user logged out")
    }
    
    
    // Functions for apple sign in flow
    
    // Generate a random Nonce used to make sure the ID token you get was granted specifically in response to your app's authentication request.
    //Hashing function using CryptoKit
    func sha256(_ input: String) -> String {
        let inputData = Data(input.utf8)
        let hashedData = SHA256.hash(data: inputData)
        let hashString = hashedData.compactMap {
            return String(format: "%02x", $0)
        }.joined()
        
        return hashString
    }
    
    // from https://firebase.google.com/docs/auth/ios/apple
    func randomNonceString(length: Int = 32) -> String {
        precondition(length > 0)
        let charset: Array<Character> =
        Array("0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._")
        var result = ""
        var remainingLength = length
        
        while remainingLength > 0 {
            let randoms: [UInt8] = (0 ..< 16).map { _ in
                var random: UInt8 = 0
                let errorCode = SecRandomCopyBytes(kSecRandomDefault, 1, &random)
                if errorCode != errSecSuccess {
                    fatalError("Unable to generate nonce. SecRandomCopyBytes failed with OSStatus \\(errorCode)")
                }
                return random
            }
            
            randoms.forEach { random in
                if remainingLength == 0 {
                    return
                }
                
                if random < charset.count {
                    result.append(charset[Int(random)])
                    remainingLength -= 1
                }
            }
        }
        
        return result
    }
    
    func deleteUser() {
        do {
            let nonce = try self.randomNonceString()
            currentNonce = nonce
            let appleIDProvider = ASAuthorizationAppleIDProvider()
            let request = appleIDProvider.createRequest()
            request.requestedScopes = [.fullName, .email]
            request.nonce = self.sha256(nonce)

            let authorizationController = ASAuthorizationController(authorizationRequests: [request])
            authorizationController.delegate = self
            authorizationController.presentationContextProvider = self
            authorizationController.performRequests()
          } catch {
            // In the unlikely case that nonce generation fails, show error view.
            print(error)
          }
    }
    
    // - Tag: perform_appleid_password_request
    /// Prompts the user if an existing iCloud Keychain credential or Apple ID credential is found.
//    func performExistingAccountSetupFlows() {
//        // Prepare requests for both Apple ID and password providers.
//        let requests = [ASAuthorizationAppleIDProvider().createRequest()]
//        
//        // Create an authorization controller with the given requests.
//        let authorizationController = ASAuthorizationController(authorizationRequests: requests)
//        authorizationController.delegate = self
//        authorizationController.presentationContextProvider = self
//        authorizationController.performRequests()
//    }
//    
//    /// - Tag: perform_appleid_request
//    @objc
//    func handleAuthorizationAppleIDButtonPress() {
//        let appleIDProvider = ASAuthorizationAppleIDProvider()
//        let request = appleIDProvider.createRequest()
//        request.requestedScopes = [.fullName, .email]
//        
//        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
//        authorizationController.delegate = self
//        authorizationController.presentationContextProvider = self
//        authorizationController.performRequests()
//    }
    
//    func deleteUser(userId: String) async {
//        // This action requires a recent login in firebase auth, so reauthenticate
//        
//        guard let user = Auth.auth().currentUser else {
//            print("Error getting cur user")
//            return
//        }
//        
//        do {
//            let idToken = try await user.getIDToken()
//            let nonce = self.randomNonceString()
//            
//            let credential = OAuthProvider.credential(
//                withProviderID: "apple.com",
//                idToken: idToken,
//                rawNonce: nonce
//            )
//            
//            
//            Auth.auth().currentUser!.reauthenticate(with: credential) { (authResult, error) in
//                guard error != nil else {
//                    print("error reauthenticating")
//                    return
//                }
//                // Apple user successfully re-authenticated.
//                print("reauth successful")
//                
//                // Delete the user from auth, and mark their firestore page as innactive
//                Auth.auth().currentUser!.delete() { error in
//                    if let error = error {
//                        print("error deleting auth user: ", error.localizedDescription)
//                    } else {
//                        // Update firestore page
//                        self.db.collection("users").document(userId).updateData([
//                            "isUserDeleted": true,
//                            "email": "deleted@deleted.com"
//                        ]) { err in
//                            if let err = err {
//                                print("error updating firestore page: ", err.localizedDescription)
//                            } else {
//                                self.logOut()
//                            }
//                        }
//                    }
//                }
//            }
//        } catch {
//            print("error getting token: ", error.localizedDescription)
//        }
//        
//        
//        
//        //        // First update the user in firestore marking their account as deleted
//                self.db.collection("users").document(userId).updateData([
//                    "isUserDeleted": true
//                ]) { err in
//                    if let err = err {
//                        print("error updating user in firestore as deleted: ", err.localizedDescription)
//                    } else {
//        //                print("successfully updated user as deleted")
//                        // Delete the auth user
//                        let user = Auth.auth().currentUser
//                        user?.delete() { error in
//                            if let error = error {
//                                print("Error deleting auth user: ", error.localizedDescription)
//                                self.errorString = "Your credentials are out of date, please log out and log in again to delete your account."
//                                self.isErrorStringShowing = true
//                            } else {
//        //                        print("Auth user got deleted successfully")
//                                self.logOut()
//                            }
//                        }
//                    }
//                }
//    }
}


extension AuthManager: ASAuthorizationControllerDelegate {
    /// - Tag: did_complete_authorization
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            
            guard let nonce = currentNonce else {
                fatalError("Invalid state: A login callback was received, but no login request was sent.")
            }
            guard let appleIDToken = appleIDCredential.identityToken else {
                print("Unable to fetch identity token")
                return
            }
            guard let idTokenString = String(data: appleIDToken, encoding: .utf8) else {
                print("Unable to serialize token string from data: \\(appleIDToken.debugDescription)")
                return
            }
            
            // Initialize a fresh Apple credential with Firebase.
            let credential = OAuthProvider.appleCredential(withIDToken: idTokenString,
                                                                    rawNonce: nonce,
                                                                    fullName: appleIDCredential.fullName)
            Auth.auth().signIn(with: credential) { (authResult, error) in
                if (error != nil) {
                    // Error. If error.code == .MissingOrInvalidNonce, make sure
                    // you're sending the SHA256-hashed nonce as a hex string with
                    // your request to Apple.
                    print(error?.localizedDescription as Any)
                    return
                }
                
                guard let user = authResult?.user else {
                    //                        print("No user")
                    return
                }
                
                // grab the email
                if let email = user.email {
                    self.email = email
                }
                
                
                if let name = user.displayName {
                    print("display name is: ", name)
                } else {
                    print("no display name")
                }
                
                print("we signed in okay?")
                
                // delete the account after sign in
                do {
                    
                    if let user = Auth.auth().currentUser {
                        // set bit on firestore field
                        self.db.collection("users").document(user.uid).updateData([
                            "isUserDeleted": true,
                            "email": "deleted@deleted.com"
                        ]) { err in
                            if let err = err {
                                print("error updating user in firestore as deleted: ", err.localizedDescription)
                            } else {
                                print("successfully set bit")
                                Task {
                                    try Auth.auth().revokeToken(withAuthorizationCode: String(data: appleIDCredential.authorizationCode!, encoding: .utf8)!)
                                    try user.delete()
                                    self.logOut()
                                }
                            }
                        }
                        
                    }
                    
                    
                    
                } catch {
                    print(error)
                }
                
            }
            
            // For the purpose of this demo app, show the Apple ID credential information in the \`ResultViewController\`.
            
        default:
            break
        }
    }
    
    
    /// - Tag: did_complete_error
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        // Handle error.
        print(error)
    }
}

extension AuthManager: ASAuthorizationControllerPresentationContextProviding {
    /// - Tag: provide_presentation_anchor
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}

extension UIViewController {
    
    func showLoginViewController() {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        if let loginViewController = storyboard.instantiateViewController(withIdentifier: "loginViewController") as? AuthManager {
            loginViewController.modalPresentationStyle = .formSheet
            loginViewController.isModalInPresentation = true
            self.present(loginViewController, animated: true, completion: nil)
        }
    }
}

`,
                        language: 'plaintext'
                    },
                    {
                        name: 'CommunityManager.swift',
                        path: 'Dreamrs/Controllers/CommunityManager.swift',
                        type: 'file',
                        content: `//
//  CommunityManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/4/24.
//

import Foundation
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import SwiftUI

class CommunityManager : ObservableObject {
    
    @Published var selectedTrafficSlice: String
    var trafficSlices = ["Following", "For You"]
    
    @Published var selectedTimeFilter: String
    var timeFilters = ["Today", "This Month"]
    
    // Following traffic
    @Published var retrievedDreamsToday: [Dream] = []
    @Published var retrievedDreamsThisMonth: [Dream] = []
    // For you traffic
    @Published var retrievedDreamsTodayForYou: [Dream] = []
    @Published var retrievedDreamsThisMonthForYou: [Dream] = []
    // Dream Images
    @Published var retrievedImages: [String : UIImage] = [:]
    // Limit document queries
    @Published var lastDoc: QueryDocumentSnapshot?
    @Published var shouldLoadMoreDreamsButtonBeVisible: Bool = false
    
    @Published var focusedDream: Dream?
    @Published var focusedTextFormatted: NSAttributedString?
    
    @Published var localKarmaVotes : [String: Bool] = [:]
    
    @Published var focusedProfile: User?
    @Published var focusedProfilesPinnedDreams: [Dream] = []
    
    @Published var isSearchBarShowing: Bool = false
    @Published var searchText: String = ""
    @Published var searchedProfiles: [User] = []
    
    // Reporting
    @Published var isReportMenuShowing: Bool = false
    @Published var isBlockUserMenuShowing: Bool = false
    @Published var isUnblockUserMenuShowing: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    
    // Storage
    let storage = Storage.storage()
    
    init() {
        selectedTimeFilter = timeFilters[1]
        selectedTrafficSlice = trafficSlices[0]
    }
    
    func clearDreams() {
        self.retrievedDreamsToday = []
        self.retrievedDreamsTodayForYou = []
        self.retrievedDreamsThisMonth = []
        self.retrievedDreamsThisMonthForYou = []
        
//        selectedTimeFilter = timeFilters[1]
//        selectedTrafficSlice = trafficSlices[0]
    }
    
    func retrieveDreams(userId: String, following: [String], isInfiniteScrollRequest: Bool, blockedUsers: [String: Bool]) {
        if userId != Auth.auth().currentUser?.uid { return }
        
        print(blockedUsers)
        
        // Cache the dreams already retrieved so that we do not make unnecessary calls to firestore.
        if !isInfiniteScrollRequest {
            if self.selectedTimeFilter == self.timeFilters[0] {
                if !self.retrievedDreamsToday.isEmpty && self.selectedTrafficSlice == self.trafficSlices[0] {
                    return
                }
                if !self.retrievedDreamsTodayForYou.isEmpty && self.selectedTrafficSlice == self.trafficSlices[1] {
                    return
                }
            } else {
                if !self.retrievedDreamsThisMonth.isEmpty && self.selectedTrafficSlice == self.trafficSlices[0] {
                    return
                }
                if !self.retrievedDreamsThisMonthForYou.isEmpty && self.selectedTrafficSlice == self.trafficSlices[1]{
                    return
                }
            }
        }
        
        var numPostsInCurBatch: Int = 0
        
        
        // TODO: implement infnite scroll
        // for now we just use the current month and get all
        
        // Get currentMonth + year string
        let calendar = Calendar.current
        let dateComponents = calendar.dateComponents([.month, .year], from: Date())
        let month = DateFormatter().monthSymbols[dateComponents.month! - 1]
        let year = String(dateComponents.year!)
        let currentDateString = "\\(month)\\(year)"
        let collectionString = "dreams\\(currentDateString)"
        
        
        var dreamRef = db.collection("dreams").whereField("authorId", isEqualTo: userId)
        
        if self.selectedTimeFilter == self.timeFilters[0] {
            // Only retrieve todays Dreams
            
            // Get todays date in format: MMM D, YYYY
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "MMM d, yyyy" // Set the desired format

            let today = Date()               // Get the current date
            let formattedDate = dateFormatter.string(from: today) // Format the date // Output: Jan 5, 2024 (assuming today's date)
            
            // set Dream ref based on if we are looking at following or for you page, as well as Today vs. This Month
            if self.selectedTrafficSlice == self.trafficSlices[0] {
                if isInfiniteScrollRequest {
                    // Today, Following, not first batch
                    dreamRef = db.collection(collectionString).whereField("authorId", in: following).whereField("date", isEqualTo: formattedDate).whereField("sharedWithFriends", isEqualTo: true).order(by: "rawTimestamp", descending: false).start(afterDocument: self.lastDoc!).limit(to: 20)
                } else {
                    // Today, following, first batch
                    dreamRef = db.collection(collectionString).whereField("authorId", in: following).whereField("date", isEqualTo: formattedDate).whereField("sharedWithFriends", isEqualTo: true).order(by: "rawTimestamp", descending: false).limit(to: 20)
                }
                
            } else {
                if isInfiniteScrollRequest {
                    // Today, For You, Not first batch
                    dreamRef = db.collection(collectionString).whereField("date", isEqualTo: formattedDate).whereField("sharedWithCommunity", isEqualTo: true).order(by: "rawTimestamp", descending: false).start(afterDocument: self.lastDoc!).limit(to: 20)
                } else {
                    // Today, For You, First Batch
                    dreamRef = db.collection(collectionString).whereField("date", isEqualTo: formattedDate).whereField("sharedWithCommunity", isEqualTo: true).order(by: "rawTimestamp", descending: false).limit(to: 20)
                }
                
            }
            
        } else if self.selectedTimeFilter == self.timeFilters[1] {
            // Retrieve all dreams this month, depending on traffic slice (following vs. for you)
            if self.selectedTrafficSlice == self.trafficSlices[0] {
                if isInfiniteScrollRequest {
                    // This month, Following, Not first batch
                    dreamRef = db.collection(collectionString).whereField("authorId", in: following).whereField("sharedWithFriends", isEqualTo: true).order(by: "rawTimestamp", descending: false).start(afterDocument: self.lastDoc!).limit(to: 20)
                } else {
                    // This month, Following, First Batch
                    dreamRef = db.collection(collectionString).whereField("authorId", in: following).whereField("sharedWithFriends", isEqualTo: true).order(by: "rawTimestamp", descending: false).limit(to: 20)
                }
                
            } else {
                if isInfiniteScrollRequest {
                    // This month, For You, Not First Batch
                    dreamRef = db.collection(collectionString).whereField("sharedWithCommunity", isEqualTo: true).order(by: "rawTimestamp", descending: false).start(afterDocument: self.lastDoc!).limit(to: 20)
                } else {
                    // This Month, For You, first Batch
                    dreamRef = db.collection(collectionString).whereField("sharedWithCommunity", isEqualTo: true).order(by: "rawTimestamp", descending: false).limit(to: 20)
                }
                
            }
            
        }
        
        // Get all dreams from all users in the following array
        if isInfiniteScrollRequest {
            dreamRef.addSnapshotListener { (snapshot, error) in
                guard let snapshot = snapshot else {
                    print("error retrieving next set of posts: \\(error?.localizedDescription ?? "x")")
                    return
                }
                
                for document in snapshot.documents {
                    
                    // if the author id is in the users blocked user list, skip this dream
                    let authorId = document.data()["authorId"] as? String
                    if let userIsBlocked = blockedUsers[authorId ?? ""] {
                        print("exists in blocked list")
                        continue
                    }
                    
                    
                    let id = document.documentID
//                    let authorId = document.data()["authorId"] as? String
                    let authorHandle = document.data()["authorHandle"] as? String
                    let authorColor = document.data()["authorColor"] as? String
                    let title = document.data()["title"] as? String
                    let plainText = document.data()["plainText"] as? String
                    let archivedData = document.data()["archivedData"] as? Data
                    let date = document.data()["date"] as? String
                    let rawTimestamp = document.data()["rawTimestamp"] as? Timestamp
                    let dayOfWeek = document.data()["dayOfWeek"] as? String
                    let karma = document.data()["karma"] as? Int
                    let sharedWithFriends = document.data()["sharedWithFriends"] as? Bool
                    let sharedWithCommunity = document.data()["sharedWithCommunity"] as? Bool
                    let tags = document.data()["tags"] as? [[String : String]]
                    let AITextAnalysis = document.data()["AITextAnalysis"] as? String
                    let hasImage = document.data()["hasImage"] as? Bool
                    let hasAdultContent = document.data()["hasAdultContent"] as? Bool
                    
                    let dream = Dream(id: id, authorId: authorId, authorHandle: authorHandle, authorColor: authorColor, title: title, plainText: plainText, archivedData: archivedData, date: date, rawTimestamp: rawTimestamp, dayOfWeek: dayOfWeek, karma: karma, sharedWithFriends: sharedWithFriends, sharedWithCommunity: sharedWithCommunity, tags: tags, AITextAnalysis: AITextAnalysis, hasImage: hasImage, hasAdultContent: hasAdultContent)
//                    print("appended a dream with timestamp: ", rawTimestamp ?? "None")
                    
                    // Append dream to correct dream list slice
                    if self.selectedTrafficSlice == self.trafficSlices[0] {
                        // Following
                        if dream.sharedWithFriends ?? false {
                            if self.selectedTimeFilter == self.timeFilters[0] {
                                // Today's dreams
                                self.retrievedDreamsToday.append(dream)
                            } else if self.selectedTimeFilter == self.timeFilters[1] {
                                // This month's dreams
                                self.retrievedDreamsThisMonth.append(dream)
                            }
                        }
                    } else if self.selectedTrafficSlice == self.trafficSlices[1] {
                        // For you
                        if dream.sharedWithCommunity ?? false {
                            if self.selectedTimeFilter == self.timeFilters[0] {
                                // Today's Dreams
                                self.retrievedDreamsTodayForYou.append(dream)
                            } else if self.selectedTimeFilter == self.timeFilters[1] {
                                // This month's dreams
                                self.retrievedDreamsThisMonthForYou.append(dream)
                            }
                        }
                    }
                    
                    // Append dream image to map
                    if let hasImage = dream.hasImage {
                        if hasImage {
                            // Download the image from firestore
                            let imageRef = self.storage.reference().child(collectionString + "/" + dream.id! + ".jpg")
                            
                            // Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                                if let error = error {
                                    print("Error downloading image from storage: ", error.localizedDescription)
                                } else {
                                    // Data for "images/island.jpg" is returned
                                    let image = UIImage(data: data!)
                                    self.retrievedImages[dream.id!] = image
                                }
                            }
                        }
                    }
                    
                    numPostsInCurBatch += 1
                }
                
                if numPostsInCurBatch >= 20 {
                    self.shouldLoadMoreDreamsButtonBeVisible = true
                } else {
                    self.shouldLoadMoreDreamsButtonBeVisible = false
                }
                
                guard let lastDocument = snapshot.documents.last else {
                    // The collection is empty
                    return
                }
                
                self.lastDoc = lastDocument
            }
        } else if !isInfiniteScrollRequest {
            dreamRef.getDocuments() { (querySnapshot, error) in
                if let err = error {
                    print("error getting dreams: ", err.localizedDescription)
                } else {
                    for document in querySnapshot!.documents {
                        // if the author id is in the users blocked user list, skip this dream
                        let authorId = document.data()["authorId"] as? String
                        if let userIsBlocked = blockedUsers[authorId ?? ""] {
                            print("exists in blocked list")
                            continue
                        }
                        
                        let id = document.documentID
//                        let authorId = document.data()["authorId"] as? String
                        let authorHandle = document.data()["authorHandle"] as? String
                        let authorColor = document.data()["authorColor"] as? String
                        let title = document.data()["title"] as? String
                        let plainText = document.data()["plainText"] as? String
                        let archivedData = document.data()["archivedData"] as? Data
                        let date = document.data()["date"] as? String
                        let rawTimestamp = document.data()["rawTimestamp"] as? Timestamp
                        let dayOfWeek = document.data()["dayOfWeek"] as? String
                        let karma = document.data()["karma"] as? Int
                        let sharedWithFriends = document.data()["sharedWithFriends"] as? Bool
                        let sharedWithCommunity = document.data()["sharedWithCommunity"] as? Bool
                        let tags = document.data()["tags"] as? [[String : String]]
                        let AITextAnalysis = document.data()["AITextAnalysis"] as? String
                        let hasImage = document.data()["hasImage"] as? Bool
                        let hasAdultContent = document.data()["hasAdultContent"] as? Bool
                        
                        let dream = Dream(id: id, authorId: authorId, authorHandle: authorHandle, authorColor: authorColor, title: title, plainText: plainText, archivedData: archivedData, date: date, rawTimestamp: rawTimestamp, dayOfWeek: dayOfWeek, karma: karma, sharedWithFriends: sharedWithFriends, sharedWithCommunity: sharedWithCommunity, tags: tags, AITextAnalysis: AITextAnalysis, hasImage: hasImage, hasAdultContent: hasAdultContent)
//                        print("appended a dream with timestamp: ", rawTimestamp ?? "None")
                        
                        
                        if self.selectedTrafficSlice == self.trafficSlices[0] {
                            // Following
                            if dream.sharedWithFriends ?? false {
                                if self.selectedTimeFilter == self.timeFilters[0] {
                                    // Today's dreams
                                    self.retrievedDreamsToday.append(dream)
                                } else if self.selectedTimeFilter == self.timeFilters[1] {
                                    // This month's dreams
                                    self.retrievedDreamsThisMonth.append(dream)
                                }
                            }
                        } else if self.selectedTrafficSlice == self.trafficSlices[1] {
                            // For you
                            if dream.sharedWithCommunity ?? false {
                                if self.selectedTimeFilter == self.timeFilters[0] {
                                    // Today's Dreams
                                    self.retrievedDreamsTodayForYou.append(dream)
                                } else if self.selectedTimeFilter == self.timeFilters[1] {
                                    // This month's dreams
                                    self.retrievedDreamsThisMonthForYou.append(dream)
                                }
                            }
                        }
                        
                        // Append dream image to map
                        if let hasImage = dream.hasImage {
                            if hasImage {
                                // Download the image from firestore
                                let imageRef = self.storage.reference().child(collectionString + "/" + dream.id! + ".jpg")
                                
                                // Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                                imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                                    if let error = error {
                                        print("Error downloading image from storage: ", error.localizedDescription)
                                    } else {
                                        // Data for "images/island.jpg" is returned
                                        let image = UIImage(data: data!)
                                        self.retrievedImages[dream.id!] = image
                                    }
                                }
                            }
                        }
                        
                        numPostsInCurBatch += 1
                    }
                    
                    self.lastDoc = querySnapshot!.documents.last
                    if numPostsInCurBatch >= 20 {
                        self.shouldLoadMoreDreamsButtonBeVisible = true
                    } else {
                        self.shouldLoadMoreDreamsButtonBeVisible = false
                    }
                    
                }
            }
        }
    }
    
    func retrieveDreamImage(dream: Dream) {
        
        // If dream image is already in map, do nothing
        if let exists = self.retrievedImages[dream.id ?? ""] {
            return
        }
        
        if let hasImage = dream.hasImage {
            if hasImage {
                // Build collection string from dream timestamp
                if let rawTimestamp = dream.rawTimestamp {
                    let calendar = Calendar.current
                    let dateComponents = calendar.dateComponents([.month, .year], from: dream.rawTimestamp!.dateValue())
                    let month = DateFormatter().monthSymbols[dateComponents.month! - 1]
                    let year = String(dateComponents.year!)
                    let currentDateString = "\\(month)\\(year)"
                    let collectionString = "dreams\\(currentDateString)"
                    
                    // Download the image from firestore
                    let imageRef = self.storage.reference().child(collectionString + "/" + dream.id! + ".jpg")
                    
                    // Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                    imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                        if let error = error {
                            print("Error downloading image from storage: ", error.localizedDescription)
                        } else {
                            // Data for "images/island.jpg" is returned
                            let image = UIImage(data: data!)
                            self.retrievedImages[dream.id!] = image
                        }
                    }
                } else {
                    print("dream has no timestamp")
                }
            } else {
                print("dream has no image")
            }
        } else {
            print("dream has no hasimage field")
        }
    }
    
    func displayDream(dream: Dream) {
        self.focusedDream = dream
        self.focusedTextFormatted = try! NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(dream.archivedData!) as? NSAttributedString
//        self.focusedTextFormatted = try! NSKeyedUnarchiver.unarchivedObject(ofClass: NSAttributedString.self, from: dream.archivedData!)
    }
    
    // Karma Voting
    func processKarmaVote(userId: String, dream: Dream, isUpvote: Bool) {
        
        // Get current month and year for collection string.
        let calendar = Calendar.current
        let dateComponents = calendar.dateComponents([.month, .year], from: Date())
        let month = DateFormatter().monthSymbols[dateComponents.month! - 1]
        let year = String(dateComponents.year!)
        let currentDateString = "\\(month)\\(year)"
        let collectionString = "dreams\\(currentDateString)"
        
        // Update the posts Karma based on what the user has already voted already (update a local map and firestore simultaneously so the user can observe the local change while the db updates - we don't re-read the document in firestore).
        // Options:
        //   If the user hasn't voted on the dream already
        //      1. Update the karma based on upvote or downvote
        //   If the user has upvoted already
        //      1. If upvoting again, karma -= 1
        //      2. If downvoting, karma -= 2
        //   If the user has downvoted already
        //      1. If upvoting, karma += 2
        //      2. If downvoting, karma += 1
        
        var netKarma = 0
        
        if !self.localKarmaVotes.keys.contains(dream.id!) {
            netKarma = isUpvote ? 1 : -1
            self.localKarmaVotes[dream.id!] = isUpvote ? true : false
        } else if self.localKarmaVotes[dream.id!] == true {
            netKarma  = isUpvote ? -1 : -2
            if isUpvote {
                self.localKarmaVotes.removeValue(forKey: dream.id!)
            } else {
                self.localKarmaVotes[dream.id!] = false
            }
        } else if self.localKarmaVotes[dream.id!] == false {
            netKarma = isUpvote ? 2 : 1
            if isUpvote {
                self.localKarmaVotes[dream.id!] = true
            } else {
                self.localKarmaVotes.removeValue(forKey: dream.id!)
            }
        }
        
        db.collection(collectionString).document(dream.id!).updateData([
            "karma": FieldValue.increment(Int64(netKarma))
        ]) { err in
            if let err = err {
                print("Error updating dream karma: \\(err)")
            } else {
//                print("Dream Karma successfully updated")
            }
        }
        
        
        print(dream.authorId!)
        print(dream.authorHandle!)
        // Update the authors Karma
        db.collection("users").document(dream.authorId!).updateData([
            "karma": FieldValue.increment(Int64(isUpvote ? 1 : -1))
        ]) { err in
            if let err = err {
                print("Error updating user's karma: ", err.localizedDescription)
            } else {
//                print("Successfully updated user's karma")
                
                
            }
        }
        
        // Add the dream to the signed in user's upvoted list. (if it's an upvote)
    }
    
    
    // TODO: Give each user a color, which will be displayed on their profile page and in community forum so we don't need to generate a random color which changes everytime the view reloads.
//    func getColorForHandle() -> Color {
//        let randomColor = Int.random(in: 0...6)
//        switch randomColor {
//        case 0:
//            return .green
//        case 1:
//            return .orange
//        case 2:
//            return .red
//        case 3:
//            return .blue
//        case 4:
//            return .purple
//        case 5:
//            return .brown
//        case 6:
//            return .cyan
//        default:
//            return .gray
//        }
//    }
    
    func convertStringToColor(color: String) -> Color {
        switch color {
        case "Red":
            return Color.red
        case "Blue":
            return Color.blue
        case "Green":
            return Color.green
        case "Purple":
            return Color.purple
        case "Cyan":
            return Color.cyan
        case "Yellow":
            return Color.yellow
        case "Orange":
            return Color.orange
        default:
            return Color.red
        }
    }
    
    func retrieverUserFromFirestore(userId: String) {
        // Grab Document
        let docRef = db.collection("users").document(userId)
        docRef.getDocument(as: User.self) { result in
            switch result {
            case .success(let userObject):
                // A user value was successfully initialized from the Documentsnapshot
                self.focusedProfile = userObject
//                print("The community user was successfully retrieved from firestore, access them with communityManager.focusedProfile")
                self.loadPinnedDreams()
            case .failure(let error):
                // A user value could not be initialized from the DocumentSnapshot
                print("Failure retrieving user from firestore: ", error.localizedDescription)
            }
        }
    }
    
    func loadPinnedDreams() {
        // We'll re-call this function every time the communityProfileView appears because there's no way to tell if it's a different user or not
        print("In load pinned dreams")
        
        self.focusedProfilesPinnedDreams = []
        
        if let user = self.focusedProfile {
            if let pinnedDreams = user.pinnedDreams {
                for dream in pinnedDreams {
                    // Grab Document
                    let docRef = db.collection(dream["dreamCollection"]!).document(dream["dreamId"]!)
                    docRef.getDocument(as: Dream.self) { result in
                        switch result {
                        case .success(let dreamObject):
                            // A user value was successfully initialized from the Documentsnapshot
                            self.focusedProfilesPinnedDreams.append(dreamObject)
                        case .failure(let error):
                            // A user value could not be initialized from the DocumentSnapshot
                            print("Failure retrieving dream from firestore: ", error.localizedDescription)
                        }
                    }
                }
            } else {
//                print("no pinned dreams")
            }
            
        } else {
//            print("no user")
        }
        
    }
    
    func searchCommunityProfiles() {
        // Search the user collection in firestore for the exact userHandle
        
        // Options to implement this function:
            // 1. search once when a user presses the search button
            // 2. search at every new character added to the handle query (real time update)
        
        // Lets go with option one for now
        // we can create a list of Published Users which match this search query, and when a user clicks on one, we can use the focusedProfile to display that users profile
        let userHandle = self.searchText
        self.searchedProfiles = []
        
        let docRef = db.collection("users").whereField("handle", isEqualTo: userHandle).order(by: "karma", descending: true)
        docRef.getDocuments() { (querySnapshot, err) in
            if let err = err {
                print("Error searching community profiles: ", err.localizedDescription)
            } else if let qSnapshot = querySnapshot {
                for document in qSnapshot.documents {
                    let user = User(
                        id: document.documentID,
                        firstName: document.data()["firstName"] as? String,
                        lastName: document.data()["lastName"] as? String,
                        email: document.data()["email"] as? String,
                        handle: document.data()["handle"] as? String,
                        userColor: document.data()["userColor"] as? String,
                        following: document.data()["following"] as? [String],
                        followers: document.data()["followers"] as? [String],
                        numDreams: document.data()["numDreams"] as? Int,
                        karma: document.data()["karma"] as? Int,
                        pinnedDreams: document.data()["pinnedDreams"] as? [[String: String]],
                        hasUserCompletedWelcomeSurvey: document.data()["hasUserCompletedWelcomeSurvey"] as? Bool
                    )
                    self.searchedProfiles.append(user)
                }
            }
        }
    }
    
    // The currently focused dream is being reported
    func reportDream(userId: String, reportReason: ReportReason) {
        if let dream = self.focusedDream {
            // write to the report firestore collection with the following info
            // 1. DreamId
            // 2. AuthorId
            // 3. dream collection
            // 3. reportReason
            // 4. reportingUserId
            
            // get the dream collection from the dream raw timestamp
            let date = dream.rawTimestamp!.dateValue()
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "MMMMyyyy"
            let dateString = "dreams" + dateFormatter.string(from: date)
            
            print(dateString)
            
            let report = DreamReport(dreamId: dream.id, authorId: dream.authorId, dreamCollection: dateString, resonForReport: reportReason.rawValue, reportingUserId: userId)
            
            let newReportRef = db.collection("reports").document()
            
            do {
                try newReportRef.setData(from: report)
            } catch let error {
                print("error adding report to firestore: ", error)
            }
        } else {
            print("no dream focused")
        }
    }
    
//    func randomImage() -> String {
//        let randomNumber = Int.random(in: 2...6)
//        return "dream\\(randomNumber)"
//    }
}

enum ReportReason: String {
    case offensive = "Offensive"
    case harmfulOrAbusive = "Harmful or Abusive"
    case graphicContent = "Graphic content"
    case spamOrAdvertisement = "Spam or Advertisement"
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'CreateDreamManager.swift',
                        path: 'Dreamrs/Controllers/CreateDreamManager.swift',
                        type: 'file',
                        content: `//
//  CreateDreamManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/6/23.
//

import FirebaseFirestore
import FirebaseAuth
import Foundation
import RichTextKit
import SwiftUI

class CreateDreamManager : ObservableObject {
    // Dream Content
    @Published var title: String = ""
    @Published var text = NSAttributedString(string: "I dreamt of...")
    @Published var context = RichTextContext()
    
    // Tags
    @Published var tagText: String = ""
    @Published var tags : [Tag] = [Tag(id: UUID().uuidString, index: 0, text: "Dream", icon: "sun.max", color: "red")]
    var colorOptions = ["Red", "Blue", "Green", "Purple", "Cyan", "Yellow", "Orange"]
    var iconOptions = ["message.fill", "phone.down.fill", "sun.max", "cloud.bolt.rain", "figure.walk.circle", "car", "paperplane.fill", "studentdesk", "display.2", "candybarphone", "photo.fill", "arrow.triangle.2.circlepath", "flag.checkered", "gamecontroller", "network.badge.shield.half.filled", "dot.radiowaves.left.and.right", "airplane.circle.fill", "bicycle", "snowflake.circle", "key.fill", "person.fill", "person.3", "house.fill", "party.popper.fill", "figure.archery", "sportscourt.fill", "globe.americas.fill", "sun.snow", "moon.fill", "wind.snow", "bolt.square.fill", "wand.and.stars.inverse", "bandage.fill", "textformat.abc", "play.rectangle.fill", "shuffle", "command.circle.fill", "keyboard.fill", "cart.fill", "giftcard.fill", "pesosign.circle", "chineseyuanrenminbisign.circle.fill", "hourglass.circle.fill", "heart.fill", "pill.fill", "eye", "brain.fill", "percent"]
    
    
    @Published var isReadyToSubmitPopupShowing: Bool = false
    
    // AI
    @Published var shouldVisualizeDream: Bool = true
    @Published var shouldAnalyzeDream: Bool = true
    
    // 18+
    @Published var hasAdultContent: Bool = false
    
    // Community
    @Published var shareWithFriends: Bool = false
    @Published var shareWithCommunity: Bool = false
    
    @Published var retrievedText: NSAttributedString?
    
    var date: String?
    let dateFormatter = DateFormatter()
    
    // Firestore
    let db = Firestore.firestore()
    
    init() {
        context.fontName = "Hoefler Text"
        context.fontSize = 15
//        context.isEditingText = true
        
        dateFormatter.dateFormat = "MMMM dd'th', yyyy"
        date = dateFormatter.string(from: Date.now)
    }
    
//    deinit {
//        print("leaving")
//        context.isEditingText = false
//    }
    
    func addTagtoDream(text: String) {
        // Cap at 5 Tags
        if self.tags.count < 5 {
            if self.tagText.count < 35 {
                let newTag = Tag(id: UUID().uuidString, index: self.tags.count, text: text, icon: self.iconOptions.randomElement()!, color: self.colorOptions.randomElement()!)
                self.tags.append(newTag)
//                print("added new tag, index: ", newTag.index)
            }
        }
    }
    
    func removeTagFromDream(index: Int) {
//        print(self.tags)
//        print("tag index to be deleted: ", index)
        self.tags.remove(at: index)
        
        if !self.tags.isEmpty {
            for i in 0...self.tags.count - 1 {
                self.tags[i].index = i
            }
        }
        
    }
    
    
    // TODO: Decide how we grab the userId, either from view or check Auth or whatever
    func submitDream(userId: String, userHandle: String, userColor: String) -> Dream? {
        // Check the userId passed from view matches the Auth.auth().currentuser
        if Auth.auth().currentUser?.uid != userId {
            print("user ids do not match")
            return nil
        }
        
        if self.title == "" || self.text == NSAttributedString(string: "") {
            print("content is empty")
        }
        
        if self.text.string.count >= 5000 {
            print("dream length is too long.")
            return nil
        }
        
        // plain text and formatting data
        let string = self.text.string
        let archivedData: Data = try! NSKeyedArchiver.archivedData(withRootObject: self.text, requiringSecureCoding: false)
        
        
        let date = Date()
        let formattedDate = date.formatted(date: .abbreviated, time: .omitted)
        // Get today's day of week
        let calendar = Calendar.current
        let dayOfWeek = calendar.component(.weekday, from: Date())
        let dayOfWeekString = calendar.weekdaySymbols[dayOfWeek - 1]
        let rawDate = Date.now
        let rawTimestamp = Timestamp(date: date)
        
        
        // Create Tags Array
        var tagArray: [[String : String]] = []
        for i in 0...self.tags.count - 1{
            let tagDict: [String:String] = ["text":self.tags[i].text, "icon":self.tags[i].icon, "color":self.tags[i].color]
            tagArray.append(tagDict)
        }
        
        // Create a dream object
        var dream = Dream(authorId: userId, authorHandle: userHandle, authorColor: userColor, title: self.title, plainText: string, archivedData: archivedData, date: formattedDate, rawTimestamp: rawTimestamp, dayOfWeek: dayOfWeekString, karma: 1,  sharedWithFriends: self.shareWithFriends, sharedWithCommunity: self.shareWithCommunity, tags: tagArray, hasAdultContent: self.hasAdultContent)
        
        
        // Get the month and year
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMMMYYYY" // Format for full month name and year
        let currentMonthYearString = dateFormatter.string(from: Date()) // Example output: "December 2023"
        
        // Save the dream to firestore
        let dreamsRef = db.collection("dreams")
        do {
            let newDreamRef = try dreamsRef.addDocument(from: dream)
            print("Dream stored with new doc reference: ", newDreamRef.documentID)
            
            // update the local dream id
            dream.id = newDreamRef.documentID
            
            // Add 1 to users num dreams
            // TODO add error handling
            let userRef = db.collection("users").document(userId)
            userRef.updateData([
                "numDreams": FieldValue.increment(Int64(1))
            ])
            
            
            
            return dream
        } catch {
            print("Error saving dream to firestore: ", error.localizedDescription)
            return nil
        }
    }
    
    func convertSingleTagToDict(tag: Tag) -> [String : String] {
        var innerDict = [String : String]()
        innerDict["text"] = tag.text
        innerDict["icon"] = tag.icon
        innerDict["color"] = tag.color
        return innerDict
    }
}

struct Tag : Identifiable {
    var id: String
    
    var index: Int
    var text: String
    var icon: String
    var color: String
    
    func convertColorStringToView() -> Color {
        switch self.color{
        case "Red":
            return Color.red
        case "Blue":
            return Color.blue
        case "Green":
            return Color.green
        case "Purple":
            return Color.purple
        case "Cyan":
            return Color.cyan
        case "Yellow":
            return Color.yellow
        case "Orange":
            return Color.orange
        default:
            return Color.red
        }
    }
}


`,
                        language: 'plaintext'
                    },
                    {
                        name: 'HomeManager.swift',
                        path: 'Dreamrs/Controllers/HomeManager.swift',
                        type: 'file',
                        content: `//
//  HomeManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/11/23.
//

import Foundation
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import SwiftUI
import StabilityAIKit
import OpenAI


class HomeManager : ObservableObject {
    
    @Published var retrievedDreams : [Dream] = []
    @Published var retrievedImages : [String : UIImage] = [:]
    @Published var lastDocumentSnapshot: DocumentSnapshot? = nil
    @Published var isLoadingMoreDreams: Bool = false
    @Published var noMoreDreamsAvailable: Bool = false
    
    // Sort by ascending or descending date (false = oldest first)
    @Published var sortByDateDescending: Bool = false
    
    @Published var isCreateDreamPopupShowing: Bool = false
    
    @Published var focusedDream: Dream?
    @Published var focusedTextFormatted: NSAttributedString?
    @Published var isFocusedDreamPinned: Bool = false
    
    // AI
    // TODO: Understand what timeout interval does. If I Open the app, and wait for 60 minutes, then try to submit a dream will the openAI access but cutoff?
    let openAI = OpenAI(configuration: OpenAI.Configuration(token: Secrets().openAiToken, timeoutInterval: 60.0))
    let stabilityAiConfiguration = Configuration(apiKey: Secrets().stabilityAiToken)
    
    // Post Publish Vars (Viewing newly created dreams)
    @Published var isViewNewlyCreatedDreamPopupShowing: Bool = false
    @Published var isErrorLoadingNewDream: Bool = false
    
    @Published var isConfirmPinnedDreamPopupShowing: Bool = false
    
    @Published var isConfirmDeleteDreamAlertShowing: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    
    let defaultNumberDreamsToRetrieve: Int = 10 
    
    // Storage
    let storage = Storage.storage()
    
    init() {
        // Find the current month, set the selector
        let calendar = Calendar.current
        let currentMonth = calendar.component(.month, from: Date())
    }
    
    func retrieveDreams(userId: String, loadMore: Bool = false) {
        // validate user id
        if userId != Auth.auth().currentUser?.uid { return }
        
        if !loadMore {
            DispatchQueue.main.async {
                self.retrievedDreams = []
                self.lastDocumentSnapshot = nil
                self.noMoreDreamsAvailable = false
            }
        }
        
        // Set loading state
        DispatchQueue.main.async {
            self.isLoadingMoreDreams = true
        }
        
        // start with getting all documents from a current user (build dream individualy)
        var query = db.collection("dreams")
            .whereField("authorId", isEqualTo: userId)
            .order(by: "rawTimestamp", descending: sortByDateDescending)
            .limit(to: defaultNumberDreamsToRetrieve)
        
        // If loading more, start after the last document
        if loadMore, let lastSnapshot = lastDocumentSnapshot {
            query = query.start(afterDocument: lastSnapshot)
        }
        
        query.getDocuments() { (querySnapshot, err) in
            if let err = err {
                print("Error getting documents: ", err.localizedDescription)
                DispatchQueue.main.async {
                    self.isLoadingMoreDreams = false
                }
            } else {
                // Check if there are any more dreams available
                if querySnapshot!.documents.isEmpty {
                    DispatchQueue.main.async {
                        self.noMoreDreamsAvailable = true
                        self.isLoadingMoreDreams = false
                    }
                    return
                }
                
                // Save the last document for pagination
                self.lastDocumentSnapshot = querySnapshot!.documents.last
                
                for document in querySnapshot!.documents {
                    
                    let id = document.documentID
                    let title = document.data()["title"] as? String
                    let plainText = document.data()["plainText"] as? String
                    let archivedData = document.data()["archivedData"] as? Data
                    let date = document.data()["date"] as? String
                    let rawTimestamp = document.data()["rawTimestamp"] as? Timestamp
                    let dayOfWeek = document.data()["dayOfWeek"] as? String
                    let karma = document.data()["karma"] as? Int
                    let sharedWithFriends = document.data()["sharedWithFriends"] as? Bool
                    let sharedWithCommunity = document.data()["sharedWithCommunity"] as? Bool
                    let tags = document.data()["tags"] as? [[String : String]]
                    let AITextAnalysis = document.data()["AITextAnalysis"] as? String
                    let hasImage = document.data()["hasImage"] as? Bool
                    let hasAdultContent = document.data()["hasAdultContent"] as? Bool
                    
                    let dream = Dream(id: id, authorId: userId, title: title, plainText: plainText, archivedData: archivedData, date: date, rawTimestamp: rawTimestamp, dayOfWeek: dayOfWeek, karma: karma, sharedWithFriends: sharedWithFriends, sharedWithCommunity: sharedWithCommunity, tags: tags, AITextAnalysis: AITextAnalysis, hasImage: hasImage, hasAdultContent: hasAdultContent)
                    self.retrievedDreams.append(dream)
                    
                    // append image to local map if necessary
                    if let hasImage = dream.hasImage {
                        if hasImage {
                            // Download the image from firestore
                            let imageRef = self.storage.reference().child("dreams" + "/" + dream.id! + ".jpg")
                            
                            // Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                                if let error = error {
                                    print("Error downloading image from storage: ", error.localizedDescription)
                                } else {
                                    // Data for "images/island.jpg" is returned
                                    let image = UIImage(data: data!)
                                    self.retrievedImages[dream.id!] = image
                                }
                            }
                        }
                    }
                }
                
                DispatchQueue.main.async {
                    self.isLoadingMoreDreams = false
                }
            }
        }
    }
    
    func loadMoreDreams() {
        if let user = Auth.auth().currentUser {
            self.retrieveDreams(userId: user.uid, loadMore: true)
        }
    }
    
    func toggleSortOrder(isNewest: Bool) {
        sortByDateDescending = isNewest
        if let user = Auth.auth().currentUser {
            self.retrieveDreams(userId: user.uid)
        }
    }
    
    // Called after a dream is created in CreateDreamManager, processes the AI aspects of the dream
    func processNewDream(dream: Dream, shouldVisualizeDream: Bool, shouldAnalyzeDream: Bool) async {
        
        // Process the text analysis first, then the image ( called in seperate functions )
        
        // Options:
        //  1. Generate text and image
        //  2. Generate only text
        //  3. Generate only image
        
        if shouldAnalyzeDream && shouldVisualizeDream {
            // process Text Analysis will can processImageGeneration if the image is needed
            await processTextAnalysis(dream: dream, isImageGenerationNeeded: true)
        } else if shouldAnalyzeDream {
            await processTextAnalysis(dream: dream, isImageGenerationNeeded: false)
        } else if shouldVisualizeDream {
            //            processImageGeneration(dream: dream)
            await processImageGeneration(dream: dream)
        } else {
            DispatchQueue.main.async {
                if let user = Auth.auth().currentUser {
                    self.retrieveDreams(userId: user.uid)
                    self.isViewNewlyCreatedDreamPopupShowing = false
                }
            }
        }
        
    }
    
    func processTextAnalysis(dream: Dream, isImageGenerationNeeded: Bool) async {
        let dreamPrompt = "Analyze the following dream: " + dream.plainText!
        
        // Create a non-optional Chat message
        
        guard let message = ChatQuery.ChatCompletionMessageParam(role: .user, content: dreamPrompt) else {
            print( "Failed to create Chat message")
            return
        }
        
        let query = ChatQuery(messages: [message], model: .gpt4_o_mini)
        openAI.chats(query: query) { result in
            // Handle OpenAI response
            switch result {
            case .success(let result):
                if let response = result.choices[0].message.content {
                    // Save the AI dream analysis onto the dream object in firestore
                    do {
                        self.db.collection("dreams").document(dream.id!).updateData([
                            "AITextAnalysis": response
                        ])
                        
//                        print("AI text analysis successfully saved to firestore")
                        
                        // AI is finished, call retrieve dreams to load the new dream and dismiss the loading view, or do it in image if needed
                        if isImageGenerationNeeded {
                            Task {
                                await self.processImageGeneration(dream: dream)
                            }
                        } else {
                            self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                            DispatchQueue.main.async {
                                self.isViewNewlyCreatedDreamPopupShowing = false
                            }
                        }
                        
                    } catch {
//                        print("Error saving AI text analysis to firestore")
                    }
                } else {
//                    print("Text response from OpenAI is empty")
                }
            case .failure(let error):
                print("Failure generating AI Dream Analysis: ", error.localizedDescription)
                print(result)
            }
        }
    }
    
    func processImageGeneration(dream: Dream) async {
        let imagePrompt = "Visualize this dream:" + dream.plainText!
        
        
        let client = Client(configuration: stabilityAiConfiguration)
        let request = TextToImageRequest(textPrompts: [.init(text: imagePrompt)])
        
        do {
            let results = try await client.getImageFromText(request, engine: "stable-diffusion-xl-1024-v1-0")
            // Make a UI Image with the response
            
            // Convert the response payload to UIImage
            if let response = results[0].data {
                let image = UIImage(data: response)
                
                // Convert the image into JPEG and compress the quality to reduce its size
                if let image = image {
                    let data = image.jpegData(compressionQuality: 0.8)
                    
                    let metadata = StorageMetadata()
                    metadata.contentType = "image/jpg"
                    
                    
                    // Save the compressed jpeg to firestore under the dreamId
                    
                    let dreamCollection = "dreams"
                    
                    // Create a storage reference
                    let storageRef = storage.reference().child(dreamCollection + "/" + dream.id! + ".jpg")
                    
                    if let data = data {
                        storageRef.putData(data, metadata: metadata) { (metadata, error) in
                            if let error = error {
                                print("Error while uploading file to storage: ", error)
                                self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                                self.isViewNewlyCreatedDreamPopupShowing = false
                            } else {
                                if let _ = metadata {
//                                    print("Metadata: ", metadata)
                                }
                                self.setHasImageBitOnDream(dreamId: dream.id!, dreamCollection: dreamCollection)
                            }
                            
                        }
                    } else {
//                        print("failure compressing image")
                        self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                        self.isViewNewlyCreatedDreamPopupShowing = false
                    }
                } else {
//                    print("failure getting UIimage from response")
                }
            } else {
//                print("failing getting response from results[0].data")
                self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                self.isViewNewlyCreatedDreamPopupShowing = false
            }
        } catch {
            print("error generating image with stable diffusion: ", error)
            self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
            self.isViewNewlyCreatedDreamPopupShowing = false
            
        }
    }
    
    func setHasImageBitOnDream(dreamId: String, dreamCollection: String) {
        self.db.collection(dreamCollection).document(dreamId).updateData([
            "hasImage": true
        ]) { error in
            if let error = error {
                print("Error setting has image bit on dream: ", error.localizedDescription)
                self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                self.isViewNewlyCreatedDreamPopupShowing = false
            } else {
//                print("successfully completed image flow, closing popup")
                self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                self.isViewNewlyCreatedDreamPopupShowing = false
            }
        }
    }
    
    func displayDream(dream: Dream) {
        self.focusedDream = dream
        self.focusedTextFormatted = try! NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(dream.archivedData!) as? NSAttributedString
//        print("The displayed dream's raw timestamp is: ", self.focusedDream?.rawTimestamp ?? "None")
    }
    
    func deleteDream() {
        if let dream = self.focusedDream {
            let collectionString = "dreams"
            
            self.db.collection(collectionString).document(dream.id!).delete() { err in
                if let err = err {
                    print("Error deleting dream: ", err.localizedDescription)
                } else {
//                    print("Dream deleted successefully in firestore")
                    self.focusedDream = nil
                    self.retrieveDreams(userId: Auth.auth().currentUser!.uid)
                    
                    // in the view we also check the if the dream being deleted is pinned and remove it if it is
                    
                    // also need to -1 the numDreams for the user
                    
                    self.db.collection("users").document(Auth.auth().currentUser!.uid).updateData([
                        "numDreams": FieldValue.increment(Int64(-1))
                    ]) { err in
                        if let err = err {
//                            print("error -1ing num dreams for user")
                        } else {
//                            print("successfully -1 num dreams for user")
                        }
                    }
                }
            }
            
            // delete the image from storage
            if let hasImage = dream.hasImage, hasImage {
                let imageRef = self.storage.reference().child("dreams" + "/" + dream.id! + ".jpg")
                
                imageRef.delete { error in
                    if let error = error {
                        print("Error deleting image from storage: ", error.localizedDescription)
                    } else {
                        print("Image successfully deleted from storage")
                    }
                }
            }
            
        }
    }
    
    func randomImage() -> String {
        let randomNumber = Int.random(in: 2...6)
        return "dream\\(randomNumber)"
    }
    
    func convertStringToColor(color: String) -> Color {
        switch color {
        case "Red":
            return Color.red
        case "Blue":
            return Color.blue
        case "Green":
            return Color.green
        case "Purple":
            return Color.purple
        case "Cyan":
            return Color.cyan
        case "Yellow":
            return Color.yellow
        case "Orange":
            return Color.orange
        default:
            return Color.blue
            
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'UserManager.swift',
                        path: 'Dreamrs/Controllers/UserManager.swift',
                        type: 'file',
                        content: `//
//  UserManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/4/23.
//

import Foundation
import FirebaseFirestore
import FirebaseAuth
import FirebaseStorage
import SwiftUI

class UserManager : ObservableObject {
    // ToDo
    // Firebase Storage
    
    
    // Rate Limiting
    @Published var numActionsInLastMinute: Int = 0
    @Published var firstActionDate: Date?
    
    // Firestore
    let db = Firestore.firestore()
    @Published var user: User?
    
    // Storage
    let storage = Storage.storage()
    
    // Parts of the user to display but not change in firestore.
    @Published var pinnedDreams: [Dream] = []
    @Published var pinnedDreamImages: [String : UIImage] = [:]
    @Published var followers: [User] = []
    
    func retrieverUserFromFirestore(userId: String) {
        // Grab Document
        let docRef = db.collection("users").document(userId)
        docRef.getDocument(as: User.self) { result in
            switch result {
            case .success(let userObject):
                // A user value was successfully initialized from the Documentsnapshot
                self.user = userObject
//                print("The user was successfully retrieved from firestore, access it with userManager.user")
            case .failure(let error):
                // A user value could not be initialized from the DocumentSnapshot
                print("Failure retrieving user from firestore: ", error.localizedDescription)
            }
        }
    }
    
    func followProfile(profileId: String) {
        if let user = self.user {
            db.collection("users").document(user.id!).updateData([
                "following": FieldValue.arrayUnion([profileId])
            ]) { err in
                if let err = err {
                    print("Error following user: ", err)
                } else {
//                    print("User followed successfully")
                }
            }
        }
    }
    
    func unfollowProfile(profileId: String) {
        if let user = self.user {
            db.collection("users").document(user.id!).updateData([
                "following": FieldValue.arrayRemove([profileId])
            ]) { err in
                if let err = err {
                    print("Error unfollowing user: ", err)
                } else {
//                    print("User unfollowed successfully")
                }
            }
        }
    }
    
    func loadFollowers() {
        if self.followers.isEmpty {
            if let user = self.user {
                let docRef = db.collection("users")
                for follower in user.followers! {
                    // Lookup user from firestore return User Object
                    docRef.document(follower).getDocument(as: User.self) { result in
                        switch result {
                        case .success(let userObject):
                            // A user value was successfully initialized from the Documentsnapshot
                            self.followers.append(userObject)
//                            print("Follower retrieved")
                        case .failure(let error):
                            // A user value could not be initialized from the DocumentSnapshot
                            print("Error retrieving follower: ", error.localizedDescription)
                        }
                    }
                }
            }
        }
    }
    
    func pinDream(dreamId: String, date: String) {
        if let user = self.user {
            // Verify signed in user is the user attatched to userManager
            if user.id == Auth.auth().currentUser?.uid {
                // Parse the dream collection from the date
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "MMM dd, yyyy"
                guard let date = dateFormatter.date(from: date) else {
                    // Handle the error if the string cannot be parsed
//                    print("date could not be parsed")
                    return
                }
                
                let outputFormatter = DateFormatter()
                outputFormatter.dateFormat = "MMMMyyyy" // Capitalized month name and year
                let formattedString = outputFormatter.string(from: date)
//                print("dreams" + formattedString) // Output: January2024
                
                // Create a map for the pinned dream
                let pinnedDream : [String : String] = [
                    "dreamCollection" : "dreams" + formattedString,
                    "dreamId": dreamId
                ]
                
                // Write the pinned dream to firestore
                self.db.collection("users").document(user.id!).updateData([
                    "pinnedDreams": FieldValue.arrayUnion([pinnedDream])
                ]) { err in
                    if let err = err {
                        print("Error updating pinned dreams: \\(err)")
                    } else {
//                        print("Pinned Dreams successfully updated")
                        // update array locallay (need to do this because we dont refresh userManager.user) when loading the pinned dreams
                        self.user?.pinnedDreams!.append(pinnedDream)
                        self.loadPinnedDreams(isRefresh: true)
                    }
                }
                
            }
        }
    }
    
    func removePinnedDream(indexOfRemovedDream: Int) {
//        print("index of dream to be deleted: ", indexOfRemovedDream)
//        print("The actual dream which we are deleting from the local map ", self.user!.pinnedDreams![indexOfRemovedDream])
        
        self.user?.pinnedDreams!.reverse()
        
        if let user = self.user {
            if user.id == Auth.auth().currentUser?.uid {
                // Remove the already pinned dream at given index from firestore, then reload the pinned dreams array via the loadPinnedDreams function
                self.db.collection("users").document(user.id!).updateData([
                    "pinnedDreams": FieldValue.arrayRemove([self.user?.pinnedDreams![indexOfRemovedDream]])
                ]) { err in
                    if let err = err {
                        print("Error removing pinned Dream: ", err)
                    } else {
//                        print("Pinned dream successfully removed")
                        self.user?.pinnedDreams!.remove(at: indexOfRemovedDream)
                        self.loadPinnedDreams(isRefresh: true)
                    }
                }
            }
        }
    }
    
    func loadPinnedDreams(isRefresh: Bool) {
        if let user = self.user {
            if let userPinnedDreams = user.pinnedDreams {
                
                // If the call isn't for a refresh, and the array is already populated, do nothing
                // In this case refresh means a new dream has been pinned, and we want to reload the array from firebase.
                if !isRefresh {
                    if !self.pinnedDreams.isEmpty {
                        return
                    }
                }
                
                
                self.pinnedDreams = []
                var curIndex = userPinnedDreams.count - 1
                
                // Retrieve each dream from firebase
                for dream in userPinnedDreams {
                    // Grab Document
                    let docRef = db.collection(dream["dreamCollection"]!).document(dream["dreamId"]!)
                    docRef.getDocument(as: Dream.self) { result in
                        switch result {
                        case .success(let dreamObject):
                            // A user value was successfully initialized from the Documentsnapshot
                            self.pinnedDreams.append(dreamObject)
//                            print("dream added: ", dreamObject.id!)
                            
                            
                            // append image to local map if necessary
                            if let hasImage = dreamObject.hasImage {
                                if hasImage {
                                    // Download the image from firestore
                                    let imageRef = self.storage.reference().child(dream["dreamCollection"]! + "/" + dreamObject.id! + ".jpg")
                                    
                                    // Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                                    imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                                        if let error = error {
                                            print("Error downloading image from storage: ", error.localizedDescription)
                                        } else {
                                            // Data for "images/island.jpg" is returned
                                            let image = UIImage(data: data!)
                                            self.pinnedDreamImages[dreamObject.id!] = image
                                        }
                                    }
                                }
                            }
                            
                        case .failure(let error):
                            // A user value could not be initialized from the DocumentSnapshot
                            print("Failure retrieving pinned dream from firestore: ", error.localizedDescription)
                        }
                    }
                }
            }
        }
    }
    
    func updateUserFirstName(newFirstName: String) -> String? {
        var errorText: String?
        
        if let user = self.user {
            if newFirstName.count > 50 {
                return "Name too long"
            }
            
            let docRef = db.collection("users").document(user.id!)
            
            self.user?.firstName = newFirstName
            do {
                try docRef.setData(from: self.user)
            } catch {
                errorText = error.localizedDescription
            }
        }
        
        return errorText
    }
    
    func updateUserLastName(newLastName: String) -> String? {
        var errorText: String?
        
        if let user = self.user {
            if newLastName.count > 50 {
                return "Name too long"
            }
            
            let docRef = db.collection("users").document(user.id!)
            
            self.user?.lastName = newLastName
            do {
                try docRef.setData(from: self.user)
            } catch {
                errorText = error.localizedDescription
            }
        }
        
        return errorText
    }
    
    func updateUserHandle(newHandle: String) -> String? {
        var errorText: String?
        
        if let user = self.user {
            if newHandle.count > 50 {
                return "Name too long"
            }
            
            if newHandle.contains(where: { $0.isWhitespace }) {
                return "Handle must not contain a whitespace"
            }
            
            
            // check if handle already exists
            db.collection("users").whereField("handle", isEqualTo: newHandle)
                .getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        print("Error getting documents: ", err.localizedDescription)
                    } else {
                        for _ in querySnapshot!.documents {
                            errorText = "Handle is already in use"
                            return
                        }
                        
                        // Otherwise handle is not already in use, continue with the setup.
                        let docRef = self.db.collection("users").document(user.id!)
                        
                        self.user?.handle = newHandle
                        do {
                            try docRef.setData(from: self.user)
                        } catch {
                            errorText = error.localizedDescription
                        }
                    }
                }
        }
        return errorText
    }
    
    func blockUser(blockedUserId: String) async -> [String : Bool] {
        if let _ = self.user {
            // update locally
            if let _ = user!.blockedUsers {
                self.user!.blockedUsers![blockedUserId] = true
            } else {
                self.user!.blockedUsers = [blockedUserId : true]
            }
            
            // update firestore
            let ref = self.db.collection("users").document(self.user!.id!)
            
            do {
                try await ref.setData([
                    "blockedUsers" : [
                        blockedUserId: true
                    ]
                ], merge: true)
                return self.user!.blockedUsers!
                
            } catch {
                print(error)
            }   
        }
        return [:]
    }
    
    func unblockUser(blockedUserId: String) async -> [String: Bool] {
        if let _ = self.user {
            if let _ = user!.blockedUsers {
                // update locally
                user!.blockedUsers!.removeValue(forKey: blockedUserId)
            }
            
            let ref = self.db.collection("users").document(self.user!.id!)
            
            do {
                try await ref.updateData(["blockedUsers.\\(blockedUserId)": FieldValue.delete()])
                
//                ref.updateData([
//                    "blockedUsers" : [
//                        blockedUserId: FieldValue.delete()
//                    ]
//                ])
                return self.user!.blockedUsers!
                
            } catch {
                print(error)
            }
        }
        
        return [:]
    }
    
    // Rate limiting - limits firestore writes and blocks spamming in a singular user session. app is still prone to attacks in multiple app sessions (closing and re-opening)
    // Limits users to 5 writes in one minute
    func processFirestoreWrite() -> String? {
        var errorText: String?
        
        // Cases:
            // 1. This is the first action - first action date doesn't exist
                // Set first action to Date()
                // set num actions = 1
            // 2. First action exists - currentAction is less than one minute from first action
                // Allow action if numActions < 5
                    // set num actions += 1
                // Block action if numActions >= 5
            // 3. First action exists - current action is greater than one minute from first action
                // allow action
                // set first action date to Date()
                // set num action = 1
        
        if let firstActionDate = self.firstActionDate {
            
            // Get firstActionDate + 60 seconds
            let oneMinFromFirst = Calendar.current.date(byAdding: .second, value: 60, to: firstActionDate)
            
            if Date() < oneMinFromFirst! {
                if self.numActionsInLastMinute < 5 {
                    self.numActionsInLastMinute += 1
                } else {
                    return "Too many actions in one minute"
                }
            } else {
                self.firstActionDate = Date()
                self.numActionsInLastMinute = 1
            }
        } else {
            self.firstActionDate = Date()
            self.numActionsInLastMinute = 1
        }
        
        return errorText
    }
    
    func convertColorStringToView() -> Color {
        switch self.user?.userColor {
        case "Black":
            return Color.black
        case "Red":
            return Color.red
        case "Blue":
            return Color.blue
        case "Green":
            return Color.green
        case "Purple":
            return Color.purple
        case "Cyan":
            return Color.cyan
        case "Yellow":
            return Color.yellow
        case "Orange":
            return Color.orange
        default:
            return Color.red
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'WelcomeSurveyManager.swift',
                        path: 'Dreamrs/Controllers/WelcomeSurveyManager.swift',
                        type: 'file',
                        content: `//
//  WelcomeSurveyManager.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/15/24.
//

import Foundation
import SwiftUI
import FirebaseAuth
import FirebaseFirestore

class WelcomeSurveyManager : ObservableObject {
    
    @Published var handle: String = ""
    @Published var userColor: String = ""
    
    @Published var errorString: String = ""
    
    @Published var isEULAShowing: Bool = false
    @Published var hasUserAcceptedEULA: Bool = false
    
    @Published var isLoadingWheelVisisble: Bool = false
    
    @Published var hasUserCompletedSurvey = true
    
    

    // Firestore
    let db = Firestore.firestore()
    
    var colorOptions = ["Black", "Red", "Blue", "Green", "Purple", "Cyan", "Yellow", "Orange"]
    
    init() {
        self.userColor = colorOptions[0]
    }
    
    func completeWelcomeSurvey() {
        self.errorString = ""
        // Blank error cases
        if self.handle == "" {
            self.errorString = "Please enter a handle"
            return
        }
        
        // Whitespace error cases
        if self.handle.contains(where: { $0.isWhitespace }) {
            self.errorString = "Handle must not contain a whitespace"
            return
        }
        
        // Character count error cases
        if self.handle.count > 30 {
            self.errorString = "Handle is too long"
            return
        }
        
        db.collection("users").whereField("handle", isEqualTo: self.handle)
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: ", err.localizedDescription)
                } else {
                    for _ in querySnapshot!.documents {
                        self.errorString = "Handle is already in use"
                        return
                    }
                    
                    // Otherwise handle is not already in use, continue with the setup.
                    self.isLoadingWheelVisisble = true
                    // Get user Id from firebase Auth
                    let userId = Auth.auth().currentUser!.uid
                    
                    // All fields are valid, update database and set UserDefault
                    self.db.collection("users").document(userId).updateData([
                        "handle": self.handle,
                        "userColor": self.userColor,
                        "hasUserCompletedWelcomeSurvey": true,
                        "isUserDeleted": false,
                        "isAdmin": false
                    ]) { err in
                        if let err = err {
                            print("Error updating user fields from welcome sruvey: \\(err)")
                        } else {
//                            print("User updated successfully during welcome survey!")
                        }
                    }
                }
                
            }
    }
    
    func convertColorStringToView() -> Color {
        switch self.userColor {
        case "Black":
            return Color.black
        case "Red":
            return Color.red
        case "Blue":
            return Color.blue
        case "Green":
            return Color.green
        case "Purple":
            return Color.purple
        case "Cyan":
            return Color.cyan
        case "Yellow":
            return Color.yellow
        case "Orange":
            return Color.orange
        default:
            return Color.red
        }
    }
    
    var eulaText = """
    END USER LICENSE AGREEMENT (EULA) FOR DREAMRS
    
    IMPORTANT – READ CAREFULLY: This End User License Agreement ("EULA") is a legal agreement between you (either an individual or a single entity) and Benjamin Dreyer ("Licensor") for the Dreamrs software application and any associated materials (collectively, the "App"). By installing, accessing, or using the App, you agree to be bound by the terms of this EULA. If you do not agree to the terms of this EULA, do not install or use the App.

    LICENSE GRANT
    Subject to your compliance with the terms of this EULA, Licensor grants you a limited, non-exclusive, revocable, non-transferable license to download, install, and use the App for your personal, non-commercial use on a device owned or controlled by you.

    USER GENERATED CONTENT
    The App supports user-generated content ("UGC"). You retain ownership of any intellectual property rights that you hold in the UGC you create or submit through the App. By creating or submitting UGC, you grant Licensor a worldwide, royalty-free, perpetual, irrevocable, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the UGC in connection with the App and Licensor's business, including without limitation for promoting and redistributing part or all of the App.

    COLLECTION AND USE OF INFORMATION
    The App may collect and use information about you, including but not limited to, your device and identity information. By using the App, you consent to the collection and use of this information as described in the App's Privacy Policy. You acknowledge that Licensor may update the Privacy Policy from time to time, and it is your responsibility to review and familiarize yourself with any changes.

    OBJECTIONABLE CONTENT AND ABUSE
    The App prohibits the submission of objectionable content or abusive behavior by users. Objectionable content includes, but is not limited to, content that is defamatory, obscene, offensive, or violates any applicable laws. Users engaging in objectionable content or abuse may have their content deleted, and their accounts may be removed from the App.

    TERMINATION
    This license is effective until terminated. Your rights under this license will terminate automatically without notice from Licensor if you fail to comply with any term(s) of this EULA. Upon termination of the license, you must cease all use of the App and delete all copies of the App from your devices.

    DISCLAIMER OF WARRANTY
    The App is provided "as is" without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

    LIMITATION OF LIABILITY
    To the extent permitted by applicable law, in no event shall Licensor be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the App; (ii) any unauthorized access to or use of your information; or (iii) any third-party content or conduct.

    GOVERNING LAW
    This EULA is governed by and construed in accordance with the laws of your country and state, without regard to its conflict of law principles.

    By installing, accessing, or using the App, you acknowledge that you have read and understood this EULA and agree to be bound by its terms. If you do not agree to these terms, do not use the App.

    """
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Dreamrs.entitlements',
                path: 'Dreamrs/Dreamrs.entitlements',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.applesignin</key>
	<array>
		<string>Default</string>
	</array>
</dict>
</plist>
`,
                language: 'plaintext'
            },
            {
                name: 'DreamrsApp.swift',
                path: 'Dreamrs/DreamrsApp.swift',
                type: 'file',
                content: `//
//  DreamrsApp.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI
import FirebaseCore

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        FirebaseApp.configure()
        
        return true
    }
}

@main
struct DreamrsApp: App {
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}


`,
                language: 'plaintext'
            },
            {
                name: 'GoogleService-Info.plist',
                path: 'Dreamrs/GoogleService-Info.plist',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>API_KEY</key>
	<string>NICETRY</string>
	<key>GCM_SENDER_ID</key>
	<string>NICETRY</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>com.bendreyer.Dreamrs</string>
	<key>PROJECT_ID</key>
	<string>NICETRY</string>
	<key>STORAGE_BUCKET</key>
	<string>NICETRY</string>
	<key>IS_ADS_ENABLED</key>
	<false></false>
	<key>IS_ANALYTICS_ENABLED</key>
	<false></false>
	<key>IS_APPINVITE_ENABLED</key>
	<true></true>
	<key>IS_GCM_ENABLED</key>
	<true></true>
	<key>IS_SIGNIN_ENABLED</key>
	<true></true>
	<key>GOOGLE_APP_ID</key>
	<string>NICETRY</string>
</dict>
</plist>`,
                language: 'plaintext'
            },
            {
                name: 'Info.plist',
                path: 'Dreamrs/Info.plist',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict/>
</plist>
`,
                language: 'plaintext'
            },
            {
                name: 'Models',
                path: 'Dreamrs/Models',
                type: 'directory',
                children: [
                    {
                        name: 'Dream.swift',
                        path: 'Dreamrs/Models/Dream.swift',
                        type: 'file',
                        content: `//
//  Dream.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 11/27/23.
//

import Foundation
import FirebaseCore
import FirebaseFirestore
import FirebaseFirestoreSwift

struct Dream : Codable, Identifiable, Equatable {
    @DocumentID var id: String?
    var authorId: String?
    var authorHandle: String?
    var authorColor: String?
    var title: String?
    var plainText: String?
    var archivedData: Data?
    var date: String?
    var rawTimestamp: Timestamp?
    var dayOfWeek: String?
    var karma: Int?
    var sharedWithFriends: Bool?
    var sharedWithCommunity: Bool?
    var tags: [[String : String]]?
    var AITextAnalysis: String?
    var hasImage: Bool?
    var hasAdultContent: Bool?
}

struct DreamReport : Codable, Identifiable {
    @DocumentID var id: String?
    var dreamId: String?
    var authorId: String?
    var dreamCollection: String?
    var resonForReport: String?
    var reportingUserId: String?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'User.swift',
                        path: 'Dreamrs/Models/User.swift',
                        type: 'file',
                        content: `//
//  User.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 11/27/23.
//

import Foundation
import FirebaseCore
import FirebaseFirestore
import FirebaseFirestoreSwift

struct User: Codable, Identifiable {
    @DocumentID var id: String?
    var firstName: String?
    var lastName: String?
    var email: String?
    var handle: String?
    var userColor: String?
    var following: [String]?
    var followers: [String]?
    var numDreams: Int?
    var karma: Int?
    var pinnedDreams: [[String : String]]?
    var hasUserCompletedWelcomeSurvey: Bool?
    var isUserDeleted: Bool?
    var isAdmin: Bool?
    var blockedUsers: [String: Bool]?
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Preview Content',
                path: 'Dreamrs/Preview Content',
                type: 'directory',
                children: [
                    {
                        name: 'Preview Assets.xcassets',
                        path: 'Dreamrs/Preview Content/Preview Assets.xcassets',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Dreamrs/Preview Content/Preview Assets.xcassets/Contents.json',
                                type: 'file',
                                content: `{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'UserDefaults.swift',
                path: 'Dreamrs/UserDefaults.swift',
                type: 'file',
                content: `//
//  UserDefaults.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/2/23.
//

import Foundation


// Need to add something for apple sign in
let loginStatusKey = "loginStatus"
// User default for completing the welcome survey
let hasUserCompletedWelcomeSurveyKey = "hasUserCompletedWelcomeSurvey"
`,
                language: 'plaintext'
            },
            {
                name: 'Views',
                path: 'Dreamrs/Views',
                type: 'directory',
                children: [
                    {
                        name: 'AuthViews',
                        path: 'Dreamrs/Views/AuthViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'RegisterView.swift',
                                path: 'Dreamrs/Views/AuthViews/RegisterView.swift',
                                type: 'file',
                                content: `//
//  RegisterView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/2/23.
//

import SwiftUI
import FirebaseAuth
import AuthenticationServices

struct RegisterView: View {
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        ZStack {
            Color.white // Background
            VStack {
                // Logo
                HStack {
                    Image("home_logo")
                        .resizable()
                        .frame(width: 100, height: 100)
                    
                    Text("D R E A M R S")
                        .font(.system(size: 14))
                        .padding(.trailing, 20)
                        .padding(.bottom, 15)
                        .font(.subheadline)
                        .bold()
                }
                .padding(.top, 150)
                
                Spacer()
                
                
                ZStack {
                    
                    Image("register")
                        .resizable()
                        .frame(width: 500, height: 500)
                        .cornerRadius(20.0)
                        .offset(y: 35)
                    
                    
//                    SignInWithAppleButton(onRequest: { _ in
//                        authManager.signInWithAppleRequest()
//                    },
//                    onCompletion: { _ in
//                        authManager.signInWithAppleOnCompletion()
//                    })
//                    .frame(width: 350, height: 60)
//                    .cornerRadius(50)
//                    .background(Color.clear)
//                    .overlay(
//                        RoundedRectangle(cornerRadius: 50)
//                            .stroke(Color.white, lineWidth: 1))
//                    .padding(.top, 350)
                    
                    SignInWithAppleButton(
                        onRequest: { request in
                            let nonce = authManager.randomNonceString()
                            authManager.currentNonce = nonce
                            request.requestedScopes = [.fullName, .email]
                            request.nonce = authManager.sha256(nonce)
                        },
                        onCompletion: { result in
                            authManager.appleSignInButtonOnCompletion(result: result)
                        }
                    ).frame(width: 350, height: 60)
                        .cornerRadius(50)
                        .background(Color.clear)
                        .overlay(
                            RoundedRectangle(cornerRadius: 50)
                                .stroke(Color.white, lineWidth: 1))
                        .padding(.top, 350)
                }
            }
        }
    }
}

#Preview {
    RegisterView()
        .environmentObject(AuthManager())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'CommunityViews',
                        path: 'Dreamrs/Views/CommunityViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'CommunityFollowingView.swift',
                                path: 'Dreamrs/Views/CommunityViews/CommunityFollowingView.swift',
                                type: 'file',
                                content: `//
//  CommunityFollowingView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/5/24.
//

import SwiftUI

struct CommunityFollowingView: View {
    
    @EnvironmentObject var communityManager: CommunityManager
    @EnvironmentObject var userManager: UserManager
    
    var body: some View {
        VStack {
            ScrollView {
                // Display dreams based on time frame selection
                if communityManager.selectedTimeFilter == communityManager.timeFilters[0] {
                    ForEach(communityManager.retrievedDreamsToday) { dream in
                        CommunityDream(dream: dream, title: dream.title!, handle: dream.authorHandle!, date: dream.date!, karma: dream.karma!)
                    }
                } else if communityManager.selectedTimeFilter == communityManager.timeFilters[1] {
                    ForEach(communityManager.retrievedDreamsThisMonth) { dream in
                        CommunityDream(dream: dream, title: dream.title!, handle: dream.authorHandle!, date: dream.date!, karma: dream.karma!)
                    }
                    if communityManager.shouldLoadMoreDreamsButtonBeVisible {
                        Button(action: {
                            if let user = userManager.user {
                                communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: true, blockedUsers: user.blockedUsers ?? [:])
                            }
                            
                        }) {
                            Image(systemName: "arrow.down.circle.fill")
                                .resizable()
                                .frame(width: 25, height: 25)
                                .foregroundStyle(Color.black)
                        }
                    }
                }
                
            }
        }
        .padding(.leading, 20)
    }
}

#Preview {
    CommunityFollowingView()
        .environmentObject(CommunityManager())
        .environmentObject(UserManager())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CommunityForYouView.swift',
                                path: 'Dreamrs/Views/CommunityViews/CommunityForYouView.swift',
                                type: 'file',
                                content: `//
//  CommunityForYouView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/5/24.
//

import SwiftUI

struct CommunityForYouView: View {
    
    @EnvironmentObject var communityManager: CommunityManager
    @EnvironmentObject var userManager: UserManager
    
    var body: some View {
        VStack {
            ScrollView {
                // Display dreams based on time frame selection
                if communityManager.selectedTimeFilter == communityManager.timeFilters[0] {
                    ForEach(communityManager.retrievedDreamsTodayForYou) { dream in
                        CommunityDream(dream: dream, title: dream.title!, handle: dream.authorHandle!, date: dream.date!, karma: dream.karma!)
                    }
                } else if communityManager.selectedTimeFilter == communityManager.timeFilters[1] {
                    ForEach(communityManager.retrievedDreamsThisMonthForYou) { dream in
                        CommunityDream(dream: dream, title: dream.title!, handle: dream.authorHandle!, date: dream.date!, karma: dream.karma!)
                    }
                    if communityManager.shouldLoadMoreDreamsButtonBeVisible {
                        Button(action: {
                            if let user = userManager.user {
                                communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: true, blockedUsers: user.blockedUsers ?? [:])
                            }
                            
                        }) {
                            Image(systemName: "arrow.down.circle.fill")
                                .resizable()
                                .frame(width: 25, height: 25)
                                .foregroundStyle(Color.black)
                        }
                    }
                }
                
            }
        }
        .padding(.leading, 20)
    }
}

#Preview {
    CommunityForYouView()
        .environmentObject(CommunityManager())
        .environmentObject(UserManager())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CommunityMainView.swift',
                                path: 'Dreamrs/Views/CommunityViews/CommunityMainView.swift',
                                type: 'file',
                                content: `//
//  CommunityMainView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI

struct CommunityMainView: View {
    
    @StateObject var communityManager = CommunityManager()
    @EnvironmentObject var userManager: UserManager
    
    @StateObject var adminManager = AdminManager()
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    // Logo
                    HStack {
                        Image("home_logo")
                            .resizable()
                            .frame(width: 100, height: 100)
                        
                        Text("D R E A M R S")
                            .font(.system(size: 14))
                            .padding(.trailing, 20)
                        //                            .padding(.bottom, 15)
                            .font(.subheadline)
                            .bold()
                    }
                    .padding(.bottom, 20)
                    
                    // Following vs. For You
                    HStack {
                        
                        // Admin add posts
                        if let user = userManager.user {
                            if let isAdmin = user.isAdmin {
                                if isAdmin {
                                    Button(action: {
                                        adminManager.generateRandomDreamsForForYouPage()
                                    }) {
                                        Image(systemName: "plus")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundStyle(Color.green)
                                    }
                                }
                            }
                        }
                        
                        if !communityManager.isSearchBarShowing {
                            Button(action: {
                                communityManager.selectedTrafficSlice = communityManager.trafficSlices[0]
                                if let user = userManager.user {
                                    communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: user.blockedUsers ?? [:])
                                }
                                
                            }) {
                                
                                if communityManager.selectedTrafficSlice == communityManager.trafficSlices[0] {
                                    Text("Following")
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .bold()
                                        .foregroundColor(.black)
                                } else {
                                    Text("Following")
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .opacity(0.5)
                                        .foregroundColor(.black)
                                }
                                
                            }
                            
                            Button(action: {
                                communityManager.selectedTrafficSlice = communityManager.trafficSlices[1]
                                if let user = userManager.user {
                                    communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: user.blockedUsers ?? [:])
                                }
                            }) {
                                if communityManager.selectedTrafficSlice == communityManager.trafficSlices[1] {
                                    Text("For You")
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .bold()
                                        .foregroundColor(.black)
                                } else {
                                    Text("For You")
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .opacity(0.5)
                                        .foregroundColor(.black)
                                }
                            }
                            
                            Button(action: {
                                communityManager.isSearchBarShowing = true
                            }) {
                                Image(systemName: "magnifyingglass")
                                    .resizable()
                                    .frame(width: 20, height: 20)
    //                                .frame(maxWidth: .infinity, alignment: .trailing)
                                    .foregroundStyle(Color.black)
                            }
                            .offset(x: 80)
                        } else {
                            
                            
                            
                            
                            HStack {
                                // Text field
                                TextField("User Handle", text: $communityManager.searchText)
                                    .textInputAutocapitalization(.never)
                                    .padding(10) // Add some padding for better visual spacing
                                    .background(Color.clear) // Make the text field background transparent
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 25) // Define the shape of the border
                                            .stroke(Color.black, lineWidth: 1) // Set the border color and width
                                    )
                                    .padding(.leading, 80)
                                
                                
                                // Submit button
                                if communityManager.searchText != "" {
                                    
                                    NavigationLink(destination: CommunitySearchedProiflesView()) {
                                        Image(systemName: "arrow.right.circle")
                                            .resizable()
                                            .frame(width: 25, height: 25)
                                            .clipShape(Circle())
                                            .foregroundStyle(Color.green)
                                    }
                                    .simultaneousGesture(TapGesture().onEnded {
                                        communityManager.searchCommunityProfiles()
                                    })
                                    
                                }
                                
                                // Cancel button
                                Button(action: {
                                    communityManager.isSearchBarShowing = false
                                    communityManager.searchText = ""
                                }) {
                                    Image(systemName: "x.circle")
                                        .resizable()
                                        .frame(width: 25, height: 25)
                                        .clipShape(Circle())
                                        .foregroundStyle(Color.red)
                                }
                                
                            }
                            .padding(.trailing, 80)
                        }
                        
                        
                        
                        
                    }
                    .padding(.bottom, 10)
                    
                    HStack {
                        Menu {
                            Picker(selection: $communityManager.selectedTimeFilter) {
                                ForEach(communityManager.timeFilters, id: \\.self) { value in
                                    Text(value)
                                        .tag(value)
                                        .font(.system(size: 16, design: .serif))
                                        .accentColor(.black)
                                        .bold()
                                    
                                }
                            } label: {}
                                .accentColor(.black)
                                .padding(.leading, -12)
                                .font(.system(size: 16, design: .serif))
                                .onChange(of: communityManager.selectedTimeFilter) { newValue in
                                    if let user = userManager.user {
                                        communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: user.blockedUsers ?? [:])
                                    }
                                    
                                }
                        } label: {
                            HStack {
                                Text(communityManager.selectedTimeFilter)
                                    .font(.system(size: 16, design: .serif))
                                    .accentColor(.black)
                                    .bold()
                                Image(systemName: "arrowtriangle.down.fill")
                                    .resizable()
                                    .frame(width: 12, height: 6)
                                    .foregroundColor(.black)
                            }
                        }
                        Spacer()
                    }
                    .padding(.leading, 20)
                    .padding(.bottom, 15)
                    
                    // Following vs For You
                    if communityManager.selectedTrafficSlice == communityManager.trafficSlices[0] {
                        CommunityFollowingView()
                    } else if communityManager.selectedTrafficSlice == communityManager.trafficSlices[1] {
                        CommunityForYouView()
                    }
                }
                .frame(maxHeight: .infinity, alignment: .top)
                .padding(.bottom, 25)
            }
        }
        .environmentObject(communityManager)
        .environmentObject(adminManager)
        .onAppear {
            if let user = userManager.user {
                print("user available")
                if let following = user.following {
                    communityManager.retrieveDreams(userId: user.id!, following: following, isInfiniteScrollRequest: false, blockedUsers: user.blockedUsers ?? [:])
                } else {
                    print("following not available")
                }
            } else {
                print("user not available")
            }
        }
    }
}

#Preview {
    CommunityMainView()
    //        .environmentObject(CommunityManager())
        .environmentObject(UserManager())
        .environmentObject(AdminManager())
}


struct CommunityDream : View {
    
    @EnvironmentObject var communityManager: CommunityManager
    @EnvironmentObject var userManager: UserManager
    
    var dream: Dream
    var title: String
    var handle: String
    var date: String
    var karma: Int
    
    var body : some View {
        NavigationLink(destination: SingleCommunityDream()) {
            VStack {
                HStack {
                    VStack {
                        Text(title)
                            .foregroundStyle(.black)
                            .font(.system(size: 16, design: .serif))
                            .multilineTextAlignment(.leading)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        Text("@" + handle)
//                            .foregroundStyle(.blue)
                            .foregroundColor(communityManager.convertStringToColor(color: dream.authorColor!))
                            .bold()
                            .font(.system(size: 16, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
//                            .padding(/*@START_MENU_TOKEN@*/EdgeInsets()/*@END_MENU_TOKEN@*/)
                        
                        // 18+ indicated
                        if let hasAdultContent = dream.hasAdultContent {
                            if hasAdultContent {
                                Text("18+")
                                    .foregroundStyle(Color.red)
                                    .bold()
                                    .font(.system(size: 13, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        
                        Text(date)
                            .foregroundStyle(.gray)
                            .font(.system(size: 14, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    
                    // Dream Image
                    if let image = communityManager.retrievedImages[dream.id!] {
                        Image(uiImage: image)
                            .resizable()
                            .frame(width: 100, height: 60)
                            .clipShape(Circle())
                    }
                }
                
                // Karma Vote button (only show if post is not yours)
                if let user = userManager.user {
                    if dream.authorId! == user.id {
                        HStack {
                            RoundedRectangle(cornerRadius: 25.0)
                                .stroke(Color.gray, lineWidth: 1)
                                .frame(minWidth: 10, maxWidth: 40, minHeight: 25)
                                .overlay {
                                    Text("\\(karma)")
                                        .foregroundStyle(.orange)
                                }
                            Spacer()
                        }
                    } else {
                        HStack {
                            RoundedRectangle(cornerRadius: 25.0)
                                .stroke(Color.gray, lineWidth: 1)
                                .frame(minWidth: 10, maxWidth: 80, minHeight: 25)
                                .overlay {
                                    HStack {
                                        Button(action: {
                                            if let user = userManager.user {
                                                // Rate limiting check
                                                if let rateLimit = userManager.processFirestoreWrite() {
                                                    print(rateLimit)
                                                } else {
                                                    communityManager.processKarmaVote(userId: user.id!, dream: self.dream, isUpvote: true)
                                                }
                                            }
                                        }) {
                                            if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                                Image(systemName: "arrowshape.up")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.black)
                                            } else if communityManager.localKarmaVotes[dream.id!] == true {
                                                Image(systemName: "arrowshape.up")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.orange)
                                            } else {
                                                Image(systemName: "arrowshape.up")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.black)
                                            }
                                        }
                                        
                                        // different colors based on local votes
                                        if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                            Text("\\(karma)")
                                                .foregroundStyle(.black)
                                        } else if communityManager.localKarmaVotes[dream.id!] == true {
                                            Text("\\(karma + 1)")
                                                .foregroundStyle(.orange)
                                        } else {
                                            Text("\\(karma - 1)")
                                                .foregroundStyle(.blue)
                                        }
                                        
                                        
                                        Divider()
                                            .foregroundColor(.black)
                                        
                                        Button(action: {
                                            if let user = userManager.user {
                                                // Rate limiting check
                                                if let rateLimit = userManager.processFirestoreWrite() {
                                                    print(rateLimit)
                                                } else {
                                                    communityManager.processKarmaVote(userId: user.id!, dream: self.dream, isUpvote: false)
                                                }
                                            }
                                        }) {
                                            if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                                Image(systemName: "arrowshape.down")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.black)
                                            } else if communityManager.localKarmaVotes[dream.id!] == true {
                                                Image(systemName: "arrowshape.down")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.black)
                                            } else {
                                                Image(systemName: "arrowshape.down")
                                                    .resizable()
                                                    .frame(width: 14, height: 14)
                                                    .foregroundColor(.blue)
                                            }
                                        }
                                    }
                                }
                            Spacer()
                        }
                    }
                }
                
//                Rectangle()
//                    .frame(height: 0.5) // Adjust height as needed
//                    .foregroundColor(.gray)
//                    .padding(.trailing, 20)
            }
            .padding(.bottom, 10)
        }
        .simultaneousGesture(TapGesture().onEnded {
            communityManager.displayDream(dream: self.dream)
        })
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CommunityProfileView.swift',
                                path: 'Dreamrs/Views/CommunityViews/CommunityProfileView.swift',
                                type: 'file',
                                content: `//
//  CommunityProfileView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/7/24.
//

import SwiftUI

struct CommunityProfileView: View {
    
    @EnvironmentObject var communityManager: CommunityManager
    @EnvironmentObject var userManager: UserManager
    
    @State var isUnfollowPopupShowing: Bool = false
    
    var body: some View {
        ZStack {
            VStack {
                // Logo
                HStack {
                    Image("home_logo")
                        .resizable()
                        .frame(width: 100, height: 100)
                    
                    Text("D R E A M R S")
                        .font(.system(size: 14))
                        .padding(.trailing, 20)
                    //                            .padding(.bottom, 5)
                        .font(.subheadline)
                        .bold()
                        .padding(.trailing, 40)
                }
                .padding(.bottom, 20)
                
                if let profile = communityManager.focusedProfile {
                    
                    // Account deactivated status
                    if let isDeletedProfile = profile.isUserDeleted {
                        if isDeletedProfile {
                            Text("User Innactive")
                                .font(.system(size: 18))
                                .fontDesign(.serif)
                                .bold()
                                .foregroundStyle(Color.red)
                        }
                    }
                    
                    // Blocking user
                    
                    if let user = userManager.user {
                        if let blockedUsers = user.blockedUsers {
                            if let _ = blockedUsers[profile.id!] {
                                // User is being blocked
                                Button(action: {
                                    communityManager.isUnblockUserMenuShowing = true
                                }) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(Color.red, lineWidth: 1) // red border
                                        .background(Color.clear) // Clear background
                                        .frame(width: 250, height: 40)
                                        .overlay {
                                            HStack {
                                                Text("This user is being blocked")
                                                    .foregroundStyle(Color.red)
                                                    .font(.system(size: 18))
                                                    .fontDesign(.serif)
                                                
                                                Image(systemName: "arrowtriangle.down.fill")
                                                    .resizable()
                                                    .frame(width: 12, height: 6)
                                                    .foregroundColor(.red)
                                            }
                                        }
                                    
                                }
                                .alert("Would you like to unblock this user?", isPresented: $communityManager.isUnblockUserMenuShowing) {
                                    Button("Confirm") {
                                        if let user = userManager.user {
                                            // rate limit
                                            if let rateLimit = userManager.processFirestoreWrite() {
                                                print(rateLimit)
                                            } else {
                                                if let profile = communityManager.focusedProfile {
                                                    
                                                    Task {
                                                        let newBlockedUsers = await userManager.unblockUser(blockedUserId: profile.id!)
                                                        
                                                        // Refresh pulled dreams to get add the unblocked user's posts back
                                                        communityManager.clearDreams()
                                                        communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: newBlockedUsers)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    
                                    Button("Cancel", role: .cancel) { }
                                }
                                .padding(.bottom, 10)
                            }
                        }
                    }
                    
                    
                    HStack {
                        // Full Name
                        Text(profile.firstName! + " " + profile.lastName!)
                            .font(.system(size: 20))
                            .fontDesign(.serif)
                            .bold()
                        
                        // Block User
                        if let user = userManager.user {
                            if let blockedUsers = user.blockedUsers {
                                if let _ = blockedUsers[profile.id!] {
                                } else {
                                    // Blocked user map exists, but the current user isn't being blocked
                                    Button(action: {
                                        communityManager.isBlockUserMenuShowing = true
                                    }) {
                                        Image(systemName: "info.circle")
                                            .resizable()
                                            .frame(width: 15, height: 15)
                                            .foregroundStyle(Color.black)
                                    }
                                    .alert("Would you like to block this user?", isPresented: $communityManager.isBlockUserMenuShowing) {
                                        Button("Confirm") {
                                            if let user = userManager.user {
                                                // rate limit
                                                if let rateLimit = userManager.processFirestoreWrite() {
                                                    print(rateLimit)
                                                } else {
                                                    if let profile = communityManager.focusedProfile {
                                                        
                                                        Task {
                                                            let newBlockedUsers = await userManager.blockUser(blockedUserId: profile.id!)
                                                            
                                                            // Refresh pulled dreams to get rid of the blocked user's posts
                                                            communityManager.clearDreams()
                                                            communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: newBlockedUsers)
                                                        }
                                                        
                                                        
                                                        
                                                        
                                                    }
                                                }
                                                
                                            }
                                        }
                                        
                                        Button("Cancel", role: .cancel) { }
                                    }
                                }
                            } else {
                                // Or the blocked user list doesn't exist yet (the user hasn't yet blocked anyone
                                Button(action: {
                                    communityManager.isBlockUserMenuShowing = true
                                }) {
                                    Image(systemName: "info.circle")
                                        .resizable()
                                        .frame(width: 15, height: 15)
                                        .foregroundStyle(Color.black)
                                }
                                .alert("Would you like to block this user?", isPresented: $communityManager.isBlockUserMenuShowing) {
                                    Button("Confirm") {
                                        if let user = userManager.user {
                                            // rate limit
                                            if let rateLimit = userManager.processFirestoreWrite() {
                                                print(rateLimit)
                                            } else {
                                                if let profile = communityManager.focusedProfile {
                                                    
                                                    Task {
                                                        let newBlockedUsers = await userManager.blockUser(blockedUserId: profile.id!)
                                                        
                                                        // Refresh pulled dreams to get rid of the blocked user's posts
                                                        communityManager.clearDreams()
                                                        communityManager.retrieveDreams(userId: user.id!, following: user.following!, isInfiniteScrollRequest: false, blockedUsers: newBlockedUsers)
                                                    }
                                                    
                                                    
                                                    
                                                    
                                                }
                                            }
                                            
                                        }
                                    }
                                    
                                    Button("Cancel", role: .cancel) { }
                                }
                            }
                        }
                    }

                    // Handle
                    Text("@" + profile.handle!)
                        .font(.system(size: 16))
                        .fontDesign(.serif)
                        .opacity(1.0)
                        .foregroundStyle(communityManager.convertStringToColor(color: profile.userColor!))
                    
                    // Dream Stats
                    HStack {
                        // Dreams Recorded
                        VStack {
                            Text("\\(profile.numDreams!)")
                                .font(.system(size: 18))
                                .fontDesign(.serif)
                                .bold()
                            
                            
                            Text("Dreams")
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .opacity(0.8)
                        }
                        
                        // Dream Karma
                        VStack {
                            Text("\\(profile.karma!)")
                                .font(.system(size: 18))
                                .fontDesign(.serif)
                                .bold()
                            
                            Text("Karma")
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .opacity(0.8)
                        }
                        
                        // Friends
                        VStack {
                            
                            Text("\\(profile.followers!.count)")
                                .font(.system(size: 18))
                                .fontDesign(.serif)
                                .bold()
                            
                            
                            Text("Followers")
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .opacity(0.8)
                        }
                    }
                    .padding(.top, 40)
                    .padding(.bottom, 10)
                    
                    // Follow / Unfollow
                    if let user = userManager.user {
                        if var following = user.following {
                            if following.contains(profile.id!) {
                                Button(action: {
                                    self.isUnfollowPopupShowing.toggle()
                                }) {
                                    VStack {
                                        ZStack {
                                            
                                            RoundedRectangle(cornerRadius: 25.0)
                                                .stroke(Color.black, lineWidth: 1) // Black border
                                                .background(Color.clear) // Clear background
                                                .frame(width: 120, height: 40)
                                            HStack {
                                                Text("Following")
                                                    .foregroundColor(.black) // Black text
                                                    .font(.system(size: 16))
                                                    .fontDesign(.serif)
                                                Image(systemName: "arrowtriangle.down.fill")
                                                    .resizable()
                                                    .frame(width: 12, height: 6)
                                                    .foregroundColor(.black)
                                                
                                            }
                                        }
                                        if self.isUnfollowPopupShowing {
                                            Button(action: {
                                                // Rate limiting check
                                                if let rateLimit = userManager.processFirestoreWrite() {
                                                    print(rateLimit)
                                                } else {
                                                    // Remove the following locally, and in firestore.
                                                    userManager.user!.following! = userManager.user!.following!.filter { $0 != profile.id! }
                                                    self.isUnfollowPopupShowing.toggle()
                                                     userManager.unfollowProfile(profileId: profile.id!)
                                                }
                                            }) {
                                                ZStack {
                                                    RoundedRectangle(cornerRadius: 25.0)
                                                        .stroke(Color.red, lineWidth: 1) // Black border
                                                        .background(Color.clear) // Clear background
                                                        .frame(width: 100, height: 30)
                                                    
                                                    Text("Unfollow")
                                                        .foregroundColor(.red) // Black text
                                                        .font(.system(size: 14))
                                                        .fontDesign(.serif)
                                                }
                                                
                                            }
                                        }
                                    }
                                    
                                    
                                }
                                .padding(.bottom, 40)
                            } else {
                                Button(action: {
                                    
                                    // Rate limiting check
                                    if let rateLimit = userManager.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
//                                        print("User wanted to follow")
                                        userManager.user!.following!.append(profile.id!)
                                        self.isUnfollowPopupShowing = false
                                        userManager.followProfile(profileId: profile.id!)
                                    }
                                }) {
                                    ZStack {
                                        RoundedRectangle(cornerRadius: 25.0)
                                            .stroke(Color.black, lineWidth: 1) // Black border
                                            .frame(width: 120, height: 40)
                                            .background(Color.clear) // Clear background
                                        Text("Follow")
                                            .padding()
                                            .foregroundColor(.black) // Black text
                                            .font(.system(size: 16))
                                            .fontDesign(.serif)
                                    }
                                }
                                .padding(.bottom, 40)
                            }
                        }
                    }
                    
                    
                    
                    // Pinned Dreams
                    VStack {
                        Text("Pinned Dreams")
                            .font(.system(size: 18))
                            .fontDesign(.serif)
                            .bold()
                        
                        
                        ForEach(communityManager.focusedProfilesPinnedDreams) { dream in
                            CommunityPinnedDream(dream: dream)
                        }
                        
//                        NavigationLink(destination: SingleDream()) {
//                            HStack {
//                                VStack {
//                                    Text("Swimming with mermaids")
//                                        .foregroundStyle(.black)
//                                        .font(.system(size: 14, design: .serif))
//                                        .multilineTextAlignment(.leading)
//                                        .frame(maxWidth: .infinity, alignment: .leading)
//                                    
//                                    Text("Oct 9th, 2023")
//                                        .foregroundStyle(.gray)
//                                        .font(.system(size: 14, design: .serif))
//                                        .frame(maxWidth: .infinity, alignment: .leading)
//                                }
//                                
//                                Image("dream3")
//                                    .resizable()
//                                    .frame(width: 100, height: 60)
//                                    .clipShape(Circle())
//                            }
//                        }
                        
                    }
                    .padding(.leading, 20)
                    .padding(.trailing, 10)
                    
                }
                
            }
            .frame(maxHeight: .infinity, alignment: .top)
        }
        .onAppear {
            
        }
    }
}

#Preview {
    CommunityProfileView()
        .environmentObject(CommunityManager())
}


struct CommunityPinnedDream : View {
    
    @EnvironmentObject var communityManager: CommunityManager
    
    var dream: Dream
    
    var body : some View {
        NavigationLink(destination: SingleCommunityDream()) {
            HStack {
                VStack {
                    Text(dream.title!)
                        .foregroundStyle(.black)
                        .font(.system(size: 14, design: .serif))
                        .multilineTextAlignment(.leading)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    Text(dream.date!)
                            .foregroundStyle(.gray)
                            .font(.system(size: 14, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                }
                
                
                if let image = communityManager.retrievedImages[dream.id!] {
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: 100, height: 60)
                        .clipShape(Circle())
                }
                
//                Image(communityManager.randomImage())
//                    .resizable()
//                    .frame(width: 100, height: 60)
//                    .clipShape(Circle())
            }
        }
        .simultaneousGesture(TapGesture().onEnded {
            communityManager.displayDream(dream: self.dream)
        })
        .onAppear {
            communityManager.retrieveDreamImage(dream: self.dream)
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CommunitySearchedProiflesView.swift',
                                path: 'Dreamrs/Views/CommunityViews/CommunitySearchedProiflesView.swift',
                                type: 'file',
                                content: `//
//  CommunitySearchedProiflesView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/16/24.
//

import SwiftUI

struct CommunitySearchedProiflesView: View {
    
    @EnvironmentObject var communityManager: CommunityManager
    
    var body: some View {
        ZStack {
            VStack {
                ScrollView(.vertical, showsIndicators: false) {
                    
                    if communityManager.searchedProfiles.isEmpty {
                        Image("sleep_face")
                            .resizable()
                            .frame(width: 100, height: 100)
                            .opacity(0.6)
                            .padding(.top, 60)
                    }
                    
                    ForEach(communityManager.searchedProfiles) { user in
                        NavigationLink(destination: CommunityProfileView()) {
                            HStack {
                                VStack {
                                    Text(user.firstName! + " " + user.lastName!)
                                        .foregroundStyle(Color.black)
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .opacity(1.0)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    Text("@" + user.handle!)
                                        .foregroundStyle(Color.black)
                                        .font(.system(size: 14))
                                        .fontDesign(.serif)
                                        .opacity(0.8)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                                Spacer()
                                VStack {
                                    Text("\\(user.karma!)")
                                        .foregroundStyle(Color.black)
                                        .font(.system(size: 16))
                                        .fontDesign(.serif)
                                        .opacity(1.0)
                                    Text("Karma")
                                        .foregroundStyle(Color.black)
                                        .font(.system(size: 12))
                                        .fontDesign(.serif)
                                        .opacity(0.8)
                                }
                            }
                            .padding(.bottom, 10)
                        }
                        .simultaneousGesture(TapGesture().onEnded {
                            communityManager.focusedProfile = user
                            communityManager.loadPinnedDreams()
                        })
                    }
                }
                Spacer()
            }
            .padding(.leading, 20)
            .padding(.trailing, 20)
            .padding(.top, 20)
        }
    }
}

#Preview {
    CommunitySearchedProiflesView()
        .environmentObject(CommunityManager())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SingleCommunityDream.swift',
                                path: 'Dreamrs/Views/CommunityViews/SingleCommunityDream.swift',
                                type: 'file',
                                content: `//
//  SingleCommunityDream.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/4/24.
//

import SwiftUI

struct SingleCommunityDream: View {
    
    @EnvironmentObject var communityManager: CommunityManager
    @EnvironmentObject var userManager: UserManager
    
    var body: some View {
        ZStack {
            ScrollView {
                if let dream = communityManager.focusedDream {
                    VStack {
                        // Date
                        HStack {
                            Text(dream.date!)
                                .opacity(0.7)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                            
                            Spacer()
                            
                            // Report Dream
                            Button(action: {
                                communityManager.isReportMenuShowing = true
                            }) {
                                Image(systemName: "info.circle")
                                    .resizable()
                                    .frame(width: 20, height: 20)
                                    .foregroundStyle(Color.black)
                                    .padding(.trailing, 20)
                            }
                            .alert("Would you like to report this dream?", isPresented: $communityManager.isReportMenuShowing) {
                                Button("Offensive") {
                                    if let user = userManager.user {
                                        // rate limit
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            communityManager.reportDream(userId: user.id!, reportReason: ReportReason.offensive)
                                        }
                                        
                                    }
                                }
                                
                                Button("Harmful or Abusive") {
                                    if let user = userManager.user {
                                        // rate limit
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            communityManager.reportDream(userId: user.id!, reportReason: ReportReason.harmfulOrAbusive)
                                        }
                                    }
                                }
                                
                                Button("Graphic content") {
                                    if let user = userManager.user {
                                        // rate limit
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            communityManager.reportDream(userId: user.id!, reportReason: ReportReason.graphicContent)
                                        }
                                    }
                                }
                                
                                Button("Spam or Advertisment") {
                                    if let user = userManager.user {
                                        // rate limit
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            communityManager.reportDream(userId: user.id!, reportReason: ReportReason.spamOrAdvertisement)
                                        }
                                    }
                                }
                                
                                Button("Cancel", role: .cancel) { }
                            }
                        }
                        .padding(.top, 10)
                        
                        // Dream Title
                        HStack {
                            Text(dream.title!)
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                        }

                        // Author Handle
                        NavigationLink(destination: CommunityProfileView()) {
                            Text("@" + dream.authorHandle!)
                                .font(.system(size: 20, design: .serif))
                                .fontWeight(.bold)
                                .foregroundColor(communityManager.convertStringToColor(color: dream.authorColor!))
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                                .padding(.trailing, 10)
                        }.simultaneousGesture(TapGesture().onEnded {
                            communityManager.retrieverUserFromFirestore(userId: dream.authorId!)
                        })
                        
                        // 18+ indicated
                        HStack {
                            if let hasAdultContent = dream.hasAdultContent {
                                if hasAdultContent {
                                    Text("18+")
                                        .foregroundStyle(Color.red)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                        .padding(.leading, 20)
                                        .bold()
                                }
                            }
                        }
                        .padding(.bottom, 20)
                        
                        
                        // Dream details text
                        HStack {
                            
                            if let text = communityManager.focusedTextFormatted {
                                Text(AttributedString(text))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.leading, 20)
                                    .padding(.trailing, 20)
                                    .padding(.bottom, 20)
                            } else {
                                Image("sleep_face")
                                    .resizable()
                                    .frame(width: 100, height: 100)
                                    .opacity(0.6)
                                    .padding(.top, 60)
                            }
                        }
                        
                        // Tags
                        HStack() {
                            if let tags = dream.tags {
                                if !tags.isEmpty {
                                    ScrollView(.horizontal, showsIndicators: false) {
                                        HStack {
                                            ForEach(tags, id: \\.self) { tag in
                                                TagView(index: 0, text: tag["text"] ?? "Dream", icon: tag["icon"] ?? "sun.max", color: communityManager.convertStringToColor(color: tag["color"] ?? "red"), isEditable: false)
                                            }
                                        }
                                    }
                                }
                            }
                            Spacer()
                        }
                        .padding(.bottom, 20)
                        .padding(.leading, 20)
                        
                        
                        // Karma Voting (Can only vote if the dream isn't yours)
                        if let user = userManager.user {
                            if dream.authorId == user.id {
                                HStack {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(Color.gray, lineWidth: 1)
                                        .frame(minWidth: 10, maxWidth: 40, minHeight: 25)
                                        .overlay {
                                            Text("\\(dream.karma ?? 1)")
                                                .foregroundStyle(.orange)
                                        }
                                    Spacer()
                                }
                                .padding(.bottom, 20)
                                .padding(.leading, 20)
                            } else {
                                HStack {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(Color.black, lineWidth: 1)
                                        .frame(minWidth: 10, maxWidth: 110, minHeight: 35)
                                        .overlay {
                                            HStack {
                                                Button(action: {
                                                    if let user = userManager.user {
                                                        // Rate limiting check
                                                        if let rateLimit = userManager.processFirestoreWrite() {
                                                            print(rateLimit)
                                                        } else {
                                                            communityManager.processKarmaVote(userId: user.id!, dream: communityManager.focusedDream!, isUpvote: true)
                                                        }
                                                    }
                                                }) {
                                                    if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                                        Image(systemName: "arrowshape.up")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.black)
                                                    } else if communityManager.localKarmaVotes[dream.id!] == true {
                                                        Image(systemName: "arrowshape.up")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.orange)
                                                    } else {
                                                        Image(systemName: "arrowshape.up")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.black)
                                                    }
                                                }
                                                
                                                
                                                // Define different colors for the text based on the local votes
                                                if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                                    Text("\\(dream.karma!)")
                                                        .foregroundStyle(.black)
                                                } else if communityManager.localKarmaVotes[dream.id!] == true {
                                                    Text("\\(dream.karma! + 1)")
                                                        .foregroundStyle(.orange)
                                                } else {
                                                    Text("\\(dream.karma! - 1)")
                                                        .foregroundStyle(.blue)
                                                }
                                                
                                                
                                                Divider()
                                                    .foregroundColor(.black)
                                                
                                                Button(action: {
                                                    if let user = userManager.user {
                                                        // Rate limiting checl
                                                        if let rateLimit = userManager.processFirestoreWrite() {
                                                            print(rateLimit)
                                                        } else {
                                                            communityManager.processKarmaVote(userId: user.id!, dream: communityManager.focusedDream!, isUpvote: false)
                                                        }
                                                    }
                                                }) {
                                                    
                                                    if !communityManager.localKarmaVotes.keys.contains(dream.id!) {
                                                        Image(systemName: "arrowshape.down")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.black)
                                                    } else if communityManager.localKarmaVotes[dream.id!] == true {
                                                        Image(systemName: "arrowshape.down")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.black)
                                                    } else {
                                                        Image(systemName: "arrowshape.down")
                                                            .resizable()
                                                            .frame(width: 18, height: 18)
                                                            .foregroundColor(.blue)
                                                    }
                                                }
                                            }
                                        }
                                    Spacer()
                                }
                                .padding(.bottom, 20)
                                .padding(.leading, 20)
                            }
                        }
                        
                        
                        
                        // Dream Image
                        HStack {
                            if let image = communityManager.retrievedImages[dream.id!] {
                                Image(uiImage: image)
                                    .resizable()
                                    .frame(maxWidth: .infinity)
                                    .frame(height: 400)
                            }
                            
                        }
                        .padding(.bottom, 10)
                        
                        Text("Analysis")
                            .font(.headline)
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.leading, 20)
                            .padding(.bottom, 20)
                        
                        if let textAnalysis = dream.AITextAnalysis {
                            Text(textAnalysis)
                                .font(.subheadline)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                                .padding(.trailing, 20)
                                .padding(.bottom, 20)
                        } else {
//                            Text("Sorry couldn't find the analysis")
//                                .font(.subheadline)
//                                .frame(maxWidth: .infinity, alignment: .leading)
//                                .padding(.leading, 20)
//                                .padding(.trailing, 20)
//                                .padding(.bottom, 20)
                        }
                    }
                } else {
                    Image("sleep_face")
                        .resizable()
                        .frame(width: 100, height: 100)
                        .opacity(0.6)
                        .padding(.top, 60)
                    
                    
                    
                    RoundedRectangle(cornerRadius: 25.0)
                        .stroke(Color.black, lineWidth: 1)
                        .frame(minWidth: 10, maxWidth: 125, minHeight: 40)
                        .overlay {
                            HStack {
                                Button(action: {
                                    
                                }) {
                                    Image(systemName: "arrowshape.up")
                                        .resizable()
                                        .frame(width: 18, height: 18)
                                        .foregroundColor(.black)
                                }
                                
                                Text("34")
                                
                                Divider()
                                    .foregroundColor(.black)
                                
                                Button(action: {
                                    
                                }) {
                                    Image(systemName: "arrowshape.down")
                                        .resizable()
                                        .frame(width: 18, height: 18)
                                        .foregroundColor(.black)
                                }
                            }
                        }
                }
            }
            .padding(.bottom, 20)
        }
    }
}

#Preview {
    SingleCommunityDream()
        .environmentObject(CommunityManager())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'HomeViews',
                        path: 'Dreamrs/Views/HomeViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'CreateDreamRichText.swift',
                                path: 'Dreamrs/Views/HomeViews/CreateDreamRichText.swift',
                                type: 'file',
                                content: `//
//  TestingRichTestKit.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 12/7/23.
//

import SwiftUI
import RichTextKit

struct CreateDreamRichText: View {
    
    @StateObject var createDreamManager = CreateDreamManager()
    @EnvironmentObject var userManager: UserManager
    @EnvironmentObject var homeManager: HomeManager
    
    var body: some View {
        ZStack {
            VStack {
                Text("D R E A M R S")
                    .font(.system(size: 14))
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.bottom, 15)
                    .font(.subheadline)
                    .bold()
                
                
                // TODO: show the current date formatted to day
                Text(createDreamManager.date ?? "Today")
                    .font(.system(size: 18, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.bottom, 15)
                    .font(.subheadline)
                //                    .bold()
                
                TextField("Dream title", text: $createDreamManager.title, axis: .horizontal)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .font(.system(size: 20, design: .serif))
//                    .padding(.bottom, 5)
                    .padding(.leading, 25)
                    .font(.subheadline)
                
                
                ZStack {
                    RichTextEditor(text: $createDreamManager.text, context: createDreamManager.context) {
                        $0.textContentInset = CGSize(width: 10, height: 20)
                    }
                    .background(.white)
//                    .focusedValue(\\.richTextContext, createDreamManager.context)
                    .cornerRadius(20)
                    .padding(.leading, 10)
                    .padding(.trailing, 10)
                    
                }
                
                // Tags
                HStack {
                    // Text Field
                    TextField("Tags", text: $createDreamManager.tagText, axis: .horizontal)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .frame(maxWidth: 80)
                        .font(.system(size: 15, design: .serif))
                        .padding(.leading, 25)
                        .font(.subheadline)
                    
                    if !createDreamManager.tagText.isEmpty {
                        Button(action: {
                            print("User wanted to add a tag to their dream")
                            createDreamManager.addTagtoDream(text: createDreamManager.tagText)
                            createDreamManager.tagText = ""
                        }) {
                            Image(systemName: "arrow.right.circle.fill")
                                .resizable()
                                .frame(width: 20, height: 20)
                                .foregroundColor(.green)
                                .padding(.trailing, 5)
                        }
                        
                    }
                    
                    // Tag List
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack {
                            ForEach(createDreamManager.tags) { tag in
                                TagView(index: tag.index, text: tag.text, icon: tag.icon, color: tag.convertColorStringToView(), isEditable: true)
                            }
                        }
                    }
                }
                
                // Only show submission button once the title and text have been filled
                if (createDreamManager.title != "" && createDreamManager.text != NSAttributedString(string: "")) {
                    Button(action: {
                        createDreamManager.isReadyToSubmitPopupShowing = true
                    }) {
                        Image("check")
                            .resizable()
                            .frame(width: 65, height: 65)
                        //                            .font(.title)
                        //                            .foregroundColor(.white)
                        //                            .padding(20)
                        //                            .background(Color(hue: 0.352, saturation: 0.69, brightness: 0.81))
                            .clipShape(Circle())
                            .shadow(color: Color.black.opacity(0.2), radius: 10, x: 10, y: 10)
                    }
                    .padding(.bottom, 10)
                    .popover(isPresented: $createDreamManager.isReadyToSubmitPopupShowing, content: {
                        VStack {
                            let atrbText = AttributedString(createDreamManager.text)
                            Text(createDreamManager.title)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .font(.system(size: 20, design: .serif))
                                .padding(.top, 40)
                                .padding(.leading, 20)
                                .font(.subheadline)
                            ScrollView {
                                Text(atrbText)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.leading, 20)
                            }
                            .padding(.top, 10)
                            .padding(.bottom, 20)
                            
                            // Tag List
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack {
                                    ForEach(createDreamManager.tags) { tag in
                                        TagView(index: tag.index, text: tag.text, icon: tag.icon, color: tag.convertColorStringToView(), isEditable: false)
                                    }
                                }
                                .padding(.leading, 20)
                                .padding(.bottom, 10)
                            }
                            
                            // AI choices
                            HStack {
                                Text("Visualize this dream with AI?")
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .font(.system(size: 16, design: .serif))
                                
                                Button(action: {
                                    createDreamManager.shouldVisualizeDream.toggle()
                                }) {
                                    if !createDreamManager.shouldVisualizeDream {
                                        Image(systemName: "square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.black)
                                    } else {
                                        Image(systemName: "checkmark.square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.green)
                                    }
                                }
                                .padding(.trailing, 20)
                            }
                            .padding(.leading, 20)
                            .padding(.bottom, 10)
                            
                            HStack {
                                Text("Analyze this dream with AI?")
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .font(.system(size: 16, design: .serif))
                                
                                Button(action: {
                                    createDreamManager.shouldAnalyzeDream.toggle()
                                }) {
                                    if !createDreamManager.shouldAnalyzeDream {
                                        Image(systemName: "square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.black)
                                    } else {
                                        Image(systemName: "checkmark.square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.green)
                                    }
                                }
                                .padding(.trailing, 20)
                            }
                            .padding(.leading, 20)
                            .padding(.bottom, 10)
                            
                            // 18 +
                            HStack {
                                Text("Does dream contain adult content?")
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .font(.system(size: 16, design: .serif))
                                
                                Button(action: {
                                    createDreamManager.hasAdultContent.toggle()
                                }) {
                                    if !createDreamManager.hasAdultContent {
                                        Image(systemName: "square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.black)
                                    } else {
                                        Image(systemName: "checkmark.square")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundColor(.green)
                                    }
                                }
                                .padding(.trailing, 20)
                            }
                            .padding(.leading, 20)
                            .padding(.bottom, 10)
                            
                            // Community Sharing
//                            HStack {
//                                Text("Share this dream with your followers?")
//                                    .frame(maxWidth: .infinity, alignment: .leading)
//                                    .font(.system(size: 16, design: .serif))
//                                
//                                
//                                Button(action: {
//                                    createDreamManager.shareWithFriends.toggle()
//                                }) {
//                                    if !createDreamManager.shareWithFriends {
//                                        Image(systemName: "square")
//                                            .resizable()
//                                            .frame(width: 20, height: 20)
//                                            .foregroundColor(.black)
//                                    } else {
//                                        Image(systemName: "checkmark.square")
//                                            .resizable()
//                                            .frame(width: 20, height: 20)
//                                            .foregroundColor(.green)
//                                    }
//                                }
//                                .padding(.trailing, 20)
//                                
//                            }
//                            .padding(.leading, 20)
//                            .padding(.bottom, 10)
                            
//                            HStack {
//                                Text("Share this dream with the community?")
//                                    .frame(maxWidth: .infinity, alignment: .leading)
//                                    .font(.system(size: 16, design: .serif))
//                                
//                                Button(action: {
//                                    createDreamManager.shareWithCommunity.toggle()
//                                }) {
//                                    if !createDreamManager.shareWithCommunity {
//                                        Image(systemName: "square")
//                                            .resizable()
//                                            .frame(width: 20, height: 20)
//                                            .foregroundColor(.black)
//                                    } else {
//                                        Image(systemName: "checkmark.square")
//                                            .resizable()
//                                            .frame(width: 20, height: 20)
//                                            .foregroundColor(.green)
//                                    }
//                                }
//                                .padding(.trailing, 20)
//                            }
//                            .padding(.leading, 20)
//                            .padding(.bottom, 20)
                            
                            
                            Button(action: {
                                // Grab the userId and userHandle from userManager
                                if let user = userManager.user {
                                    // Rate limiting check
                                    if let rateLimit = userManager.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        if let dream = createDreamManager.submitDream(userId: user.id!, userHandle: user.handle!, userColor: user.userColor!) {
                                            print("we successfully got a dream from submitDream function")
                                            homeManager.displayDream(dream: dream)
                                            // dismiss the create popup
                                            homeManager.isCreateDreamPopupShowing = false
                                            
                                            // call the view published popup
                                            homeManager.isViewNewlyCreatedDreamPopupShowing = true
                                            
                                            Task {
                                                await homeManager.processNewDream(dream: dream, shouldVisualizeDream: createDreamManager.shouldVisualizeDream, shouldAnalyzeDream: createDreamManager.shouldAnalyzeDream)
                                            }
                                            
                                        } else {
                                            homeManager.isCreateDreamPopupShowing = false
                                            print("we didn't get the dream returned from SubmitDream")
                                            //
                                            //                                    // call the view published popup
                                            //                                    homeManager.isViewNewlyCreatedDreamPopupShowing = true
                                            //                                    homeManager.isNewDreamLoading = false
                                            //                                    homeManager.isErrorLoadingNewDream = true
                                        }
                                    }
                                }
                            }) {
                                Image("check")
                                    .resizable()
                                    .frame(width: 65, height: 65)
                                //                            .font(.title)
                                //                            .foregroundColor(.white)
                                //                            .padding(20)
                                //                            .background(Color(hue: 0.352, saturation: 0.69, brightness: 0.81))
                                    .clipShape(Circle())
                                    .shadow(color: Color.black.opacity(0.2), radius: 10, x: 10, y: 10)
                            }
                        }
                    })
                }
                
                
                
                RichTextKeyboardToolbar(
                    context: createDreamManager.context,
                    leadingButtons: {},
                    trailingButtons: {}
                )
            }
            .padding(.top, 40)
        }
        .environmentObject(createDreamManager)
        .onDisappear {
            createDreamManager.context.isEditingText = false
        }
    }
}

#Preview {
    CreateDreamRichText()
}


struct TagView: View {
    var index: Int
    var text: String
    var icon: String
    var color: Color
    var isEditable: Bool
    var customSize: CGFloat?
    
    @State var isEditPopupShowing: Bool = false
    
    var body: some View {
        
        VStack {
            
            if self.isEditPopupShowing {
                TagEditPopupView(tagIndex: index)
                //                    .frame(width: 300, height: 100)
                    .opacity(0.75)
                    .transition(.slide)
            }
            
            Label(text, systemImage: icon)
                .font(.system(size: customSize ?? 11, design: .serif))
                .foregroundColor(.white)
                .padding(customSize ?? 13)
                .background(color.opacity(0.75), in: Capsule())
                .onTapGesture {
                    if isEditable {
                        self.isEditPopupShowing.toggle()
                    }
                }
        }
    }
}

struct TagEditPopupView: View {
    
    var tagIndex: Int
    @State var shouldDisplaySelf: Bool = true
    @EnvironmentObject var createDreamManager: CreateDreamManager
    
    var body: some View {
        VStack {
            HStack {
                
                if !createDreamManager.tags.isEmpty && self.shouldDisplaySelf {
                    Picker("", selection: $createDreamManager.tags[tagIndex].color) {
                        ForEach(createDreamManager.colorOptions, id: \\.self) { color in
                            Text(color)
                                .foregroundStyle(Color.red)
                        }
                    }
                    .pickerStyle(.automatic)
                }
                
                
                if !createDreamManager.tags.isEmpty && self.shouldDisplaySelf {
                    Picker("", selection: $createDreamManager.tags[tagIndex].icon) {
                        ForEach(createDreamManager.iconOptions, id: \\.self) { image in
                            Image(systemName: image)
                                .resizable()
                                .scaledToFit()
                                .frame(width: 50, height: 50)  // Adjust size as needed
                                .foregroundColor(.black)
                                .tag(createDreamManager.iconOptions.firstIndex(of: image)!)
                        }
                    }
                    .foregroundColor(.black)
                    .pickerStyle(.automatic)
                }
            }
            Button(action: {
                createDreamManager.removeTagFromDream(index: self.tagIndex)
                self.shouldDisplaySelf = false
            }) {
                Image(systemName: "trash.fill")
                    .resizable()
                    .frame(width: 20, height: 20)
                    .foregroundStyle(Color.red)
                    .opacity(1.0)
            }
            
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeView.swift',
                                path: 'Dreamrs/Views/HomeViews/HomeView.swift',
                                type: 'file',
                                content: `//
//  HomeView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 11/19/23.
//

import SwiftUI
import FirebaseAuth
import UIKit

struct HomeView: View {
    
    @StateObject var homeManager = HomeManager()
    @EnvironmentObject var userManager: UserManager
    @State private var showFilterView = false
    @State private var showSearchBar = false
    @State private var searchText = ""
    @State private var isNewestSelected = true
    @State private var isOldestSelected = false
    
    var filteredDreams: [Dream] {
        if searchText.isEmpty {
            return homeManager.retrievedDreams
        } else {
            return homeManager.retrievedDreams.filter { dream in
                if let title = dream.title {
                    return title.lowercased().contains(searchText.lowercased())
                }
                return false
            }
        }
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    // Logo
                    HStack {
                        Image("home_logo")
                            .resizable()
                            .frame(width: 100, height: 100)
                        
                        Text("D R E A M R S")
                            .font(.system(size: 14))
                            .padding(.trailing, 20)
                            .font(.subheadline)
                            .bold()
                        
//                        Spacer()
                    }
                    .padding(.bottom, 10)
                    
                    
                    // Filters and search
                    HStack(spacing: 16) {
                        Spacer()
                        // Filters button
                        Button(action: {
                            withAnimation {
                                showFilterView.toggle()
                                if showSearchBar { showSearchBar = false }
                            }
                        }) {
                            Image(systemName: "slider.horizontal.3")
                                .font(.system(size: 18))
                                .foregroundColor(showFilterView ? .blue : .primary)
                        }
                        
                        // Search button
                        Button(action: {
                            withAnimation {
                                showSearchBar.toggle()
                                if showFilterView { showFilterView = false }
                            }
                        }) {
                            Image(systemName: "magnifyingglass")
                                .font(.system(size: 18))
                                .foregroundColor(showSearchBar ? .blue : .primary)
                        }
                    }
                    .padding(.horizontal)
                    .padding(.bottom, 5)
                    
                    // Search bar
                    if showSearchBar {
                        SearchBar(text: $searchText, placeholder: "Search dreams...")
                            .padding(.horizontal)
                            .padding(.bottom, 10)
                            .transition(.move(edge: .top).combined(with: .opacity))
                    }
                    
                    // Filter view
                    if showFilterView {
                        HStack {
                            Spacer()
                            VStack(alignment: .leading, spacing: 10) {
                                Text("Filters")
                                    .font(.headline)
                                    .padding(.bottom, 5)
                                
                                HStack {
                                    FilterChip(title: "Newest", isSelected: $isNewestSelected, action: {
                                        isNewestSelected = true
                                        isOldestSelected = false
                                        homeManager.toggleSortOrder(isNewest: true)
                                    })
                                    FilterChip(title: "Oldest", isSelected: $isOldestSelected, action: {
                                        isNewestSelected = false
                                        isOldestSelected = true
                                        homeManager.toggleSortOrder(isNewest: false)
                                    })
                                }
                            }
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(10)
                            .padding(.horizontal)
                            .padding(.bottom, 10)
                            .transition(.move(edge: .top).combined(with: .opacity))
                        }
                    }
                    
                    ScrollView(showsIndicators: false) {
                        if homeManager.retrievedDreams.isEmpty {
                            Image("sleep_face")
                                .resizable()
                                .frame(width: 100, height: 100)
                                .opacity(0.6)
                                .padding(.top, 60)
                        } else if !searchText.isEmpty && filteredDreams.isEmpty {
                            VStack {
                                Image("sleep_face")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                                    .opacity(0.4)
                                    .padding(.top, 60)
                                
                                Text("No dreams match your search")
                                    .font(.system(size: 16))
                                    .foregroundColor(.gray)
                                    .padding(.top, 20)
                            }
                        } else {
                            LazyVGrid(columns: [
                                GridItem(.flexible(), spacing: 12),
                                GridItem(.flexible(), spacing: 12)
                            ], spacing: 12) {
                                ForEach(filteredDreams) { dream in
                                    ListDream(dream: dream, title: dream.title!, date: dream.date!, dayOfWeek: dream.dayOfWeek!)
                                }
                            }
                            .padding(.horizontal, 12)
                            .padding(.bottom, 8)
                            .frame(maxWidth: .infinity)
                        }
                        
                        
                        if !homeManager.retrievedDreams.isEmpty && homeManager.noMoreDreamsAvailable == false && self.searchText.isEmpty {
                            // More Dreams Button
                            Button(action: {
                                homeManager.loadMoreDreams()
                            }) {
                                if homeManager.isLoadingMoreDreams {
                                    ProgressView()
                                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 12)
                                        .background(
                                            LinearGradient(gradient: Gradient(colors: [Color.blue.opacity(0.5), Color.purple.opacity(0.5)]),
                                                          startPoint: .leading,
                                                          endPoint: .trailing)
                                        )
                                        .cornerRadius(20)
                                } else {
                                    Text(homeManager.noMoreDreamsAvailable ? "No More Dreams" : "More Dreams")
                                        .font(.system(size: 14, weight: .medium))
                                        .foregroundColor(.white)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 12)
                                        .background(
                                            LinearGradient(gradient: Gradient(colors: [
                                                homeManager.noMoreDreamsAvailable ? Color.gray.opacity(0.7) : Color.blue.opacity(0.7),
                                                homeManager.noMoreDreamsAvailable ? Color.gray.opacity(0.7) : Color.purple.opacity(0.7)
                                            ]),
                                                          startPoint: .leading,
                                                          endPoint: .trailing)
                                        )
                                        .cornerRadius(20)
                                        .shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 2)
                                }
                            }
                            .disabled(homeManager.isLoadingMoreDreams || homeManager.noMoreDreamsAvailable)
                            .padding(.horizontal, 150)
                            .padding(.top, 10)
                            .padding(.bottom, 20)
                        }
                        
                    }
                    .padding(.top, 5)
                    
                    
                    
                }
                .scrollDismissesKeyboard(.interactively)
                .padding(.top, 10)
                .padding(.bottom, 25)
                .onTapGesture {
                    UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
                }
                
                VStack {
                    Spacer()
                    HStack {
                        Spacer()
                        Button(action: {
                            homeManager.isCreateDreamPopupShowing = true
                        }) {
                            Image("pencil")
                                .resizable()
                                .frame(width: 60, height: 60)
                                .clipShape(Circle())
                                .shadow(color: Color.black.opacity(0.3), radius: 10, x: 10, y: 10)
                        }
                        .sheet(isPresented: $homeManager.isCreateDreamPopupShowing) {
                            CreateDreamRichText()
                        }
                    }
                    .padding(.trailing, 20)
                    .padding(.bottom, 20)
                }
            }
            .sheet(isPresented: $homeManager.isViewNewlyCreatedDreamPopupShowing) {
                LoadingDreamView()
            }
        }
        .environmentObject(homeManager)
        .onAppear {
            // Initialize sort order based on UI selection
            homeManager.sortByDateDescending = isNewestSelected
            
            if let user = Auth.auth().currentUser {
                homeManager.retrieveDreams(userId: user.uid)
            } else {
                print("no user yet")
            }
        }
        
    }
}

#Preview {
    HomeView()
}

struct LoadingDreamView : View {
    
    @EnvironmentObject var homeManager: HomeManager
    
    // Animation values for new dream
    @State var imageScale: CGFloat = 1.0
    @State var imageOpacity: Double = 1.0
    
    var body: some View {
        Group {
            if !homeManager.isErrorLoadingNewDream {
                Image("sleep_face")
                    .resizable()
                    .frame(width: 80, height: 80)
                    .padding(.top, 60)
                    .scaleEffect(imageScale)
                    .opacity(imageOpacity)
                    .padding(.bottom, 40)
                    .onAppear {
                        withAnimation(Animation.easeInOut(duration: 1.0).repeatForever(autoreverses: true)) {
                            imageScale = 1.1
                            imageOpacity = 0.6
                        }
                    }
                
                Text("Understanding your dream with artificial intelligence")
                    .font(.system(size: 15, design: .serif))
                    .italic()
                    .padding(.bottom, 20)
                
                Text("This may take a few moments")
                    .font(.system(size: 13, design: .serif))
                    .italic()
                
            } else {
                Text("Error loading your dream, please try again")
            }
        }
        .padding(.bottom, 100)
        .onAppear {
            self.imageScale = 1.0
            self.imageOpacity = 1.0
        }
        
        
    }
}

struct FilterChip: View {
    var title: String
    @Binding var isSelected: Bool
    var action: () -> Void
    
    var body: some View {
        Button(action: {
            action()
        }) {
            Text(title)
                .font(.footnote)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.blue.opacity(0.2) : Color(.systemGray5))
                .foregroundColor(isSelected ? .blue : .primary)
                .cornerRadius(16)
        }
    }
}

struct SearchBar: View {
    @Binding var text: String
    var placeholder: String
    
    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.gray)
            
            TextField(placeholder, text: $text)
                .disableAutocorrection(true)
            
            if !text.isEmpty {
                Button(action: {
                    text = ""
                }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.gray)
                }
            }
        }
        .padding(8)
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ListDream.swift',
                                path: 'Dreamrs/Views/HomeViews/ListDream.swift',
                                type: 'file',
                                content: `//
//  ListDream.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 4/10/25.
//

import SwiftUI

struct ListDream: View {
    
    @EnvironmentObject var homeManager: HomeManager

    var dream: Dream
    var title: String
    var date: String
    var dayOfWeek: String
    
    var body: some View {
        NavigationLink(destination: SingleDream()) {
            VStack(alignment: .leading, spacing: 0) {
                ZStack(alignment: .topTrailing) {
                    
                    if dream.hasImage == false || dream.hasImage == nil {
                        ZStack {
                            Rectangle()
                                .fill(Color.white)
                                .frame(height: 140)
                            
                            Image("sleep_face")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(height: 40)
                                .opacity(0.4)
                        }
                    } else {
                        if let image = homeManager.retrievedImages[dream.id!] {
                            ZStack {
                                Rectangle()
                                    .fill(Color.white)
                                    .frame(height: 140)
                                
                                Image(uiImage: image)
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .frame(height: 140)
                                    .clipped()
                            }
                        } else {
                            ZStack {
                                Rectangle()
                                    .fill(Color.white)
                                    .frame(height: 140)
                            }
                        }
                    }
                    
                    // Adult content indicator
                    if let hasAdultContent = dream.hasAdultContent, hasAdultContent {
                        Text("18+")
                            .foregroundStyle(.white)
                            .font(.system(size: 12))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.red)
                            .cornerRadius(12)
                            .padding(6)
                    }
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    // Title row
                    Text(title)
                        .font(.system(size: 13))
                        .foregroundStyle(.black)
                        .lineLimit(1)
                    
                    // Date
                    Text(date)
                        .font(.system(size: 11, design: .serif))
                        .foregroundStyle(.gray)
                    
                    // Tags - only show if there's space
                    if let tags = dream.tags, !tags.isEmpty {
                        HStack {
                            ForEach(tags.prefix(2), id: \\.self) { tag in
                                TagView(index: 0, text: tag["text"] ?? "Dream", icon: tag["icon"] ?? "sun.max", color: homeManager.convertStringToColor(color: tag["color"] ?? "red"), isEditable: false, customSize: 9)
                            }
                        }
                    }
                }
                .padding(.horizontal, 10)
                .padding(.vertical, 10)
            }
            .frame(height: 220)
            .background(Color.white)
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 3, x: 0, y: 2)
        }
        .simultaneousGesture(TapGesture().onEnded {
            homeManager.displayDream(dream: self.dream)
        })
    }
}

struct TitleTextView: View {
    let dayOfWeek: String
    
    var body: some View {
        switch(dayOfWeek) {
        case "Monday":
            Text(dayOfWeek)
                .foregroundStyle(.purple)
                
        case "Tuesday":
            Text(dayOfWeek)
                .foregroundStyle(.blue)
                
        case "Wednesday":
            Text(dayOfWeek)
                .foregroundStyle(.green)
                
        case "Thursday":
            Text(dayOfWeek)
                .foregroundStyle(.red)

        case "Friday":
            Text(dayOfWeek)
                .foregroundStyle(.mint)
                
        case "Saturday":
            Text(dayOfWeek)
                .foregroundStyle(.orange)
                
        case "Sunday":
            Text(dayOfWeek)
                .foregroundStyle(.indigo)
                
        default:
            Text(dayOfWeek)
                .foregroundStyle(.black)
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'PinDreamView.swift',
                                path: 'Dreamrs/Views/HomeViews/PinDreamView.swift',
                                type: 'file',
                                content: `//
//  PinDreamView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/10/24.
//

import SwiftUI

struct PinDreamView: View {
    
    @EnvironmentObject var homeManager: HomeManager
    @EnvironmentObject var userManager: UserManager
    
    @State var confirmPin: Bool = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                VStack {
                    // Pinned Dreams
                    VStack {
                        Text("Currently Pinned Dreams")
                            .font(.system(size: 18))
                            .fontDesign(.serif)
                            .bold()
                        
                        ForEach(userManager.pinnedDreams) { dream in
                            AlreadyPinnedDream(dream: dream, index: userManager.pinnedDreams.firstIndex(of: dream)!)
                        }
                        
                        if userManager.pinnedDreams.count != 3 {
                            Button(action: {
                                self.confirmPin = true
                            }) {
                                Image(systemName: "plus.app")
                                    .resizable()
                                    .frame(width: 25, height:  25)
                                    .foregroundStyle(Color.black)
                            }
                            .alert("Pin Dream?", isPresented: self.$confirmPin) {
                                Button("Confirm") {
                                    // Rate Limiting check
                                    if let _ = userManager.user {
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            userManager.pinDream(dreamId: homeManager.focusedDream!.id!, date: homeManager.focusedDream!.date!)
                                            print("Action confirmed, adding dream!")
                                            homeManager.isConfirmPinnedDreamPopupShowing = false
                                            homeManager.isFocusedDreamPinned = true
                                        }
                                    }
                                }
                                Button("Cancel", role: .cancel) { }
                            }
                        }
                        
                        
                    }
                    .padding(.leading, 20)
                    .padding(.trailing, 10)
                    
                    
//                    Text("Are you sure you want to pin this dream?")
//                    Button(action: {
//                        if let user = userManager.user {
//                            if let dream = homeManager.focusedDream {
//                                if user.pinnedDreams!.count < 3 {
//                                    userManager.pinDream(dreamId: dream.id!, date: dream.date!, indexOfReplacedDream: -1)
//                                } else {
//                                    print("User already has three dreams pinned")
//                                }
//                                homeManager.isConfirmPinnedDreamPopupShowing = false
//                            }
//                        }
//                    }) {
//                        Text("Yes")
//                    }
//                    Button(action: {
//                        homeManager.isConfirmPinnedDreamPopupShowing = false
//                    }) {
//                        Text("No")
//                    }
                }
            }
        }
        .onAppear {
            if let _ = userManager.user {
                userManager.loadPinnedDreams(isRefresh: false)
            }
            
                
        }
    }
}

#Preview {
    PinDreamView()
        .environmentObject(HomeManager())
        .environmentObject(UserManager())
}

struct AlreadyPinnedDream : View {
    var dream: Dream
    var index: Int
    
    @EnvironmentObject var userManager: UserManager
    @EnvironmentObject var homeManager: HomeManager
    
    @State var confirmPin: Bool = false
    
    var body: some View {
        Button(action: {
            self.confirmPin = true
        }) {
            HStack {
                HStack {
                    VStack {
                        Text(dream.title!)
                            .foregroundStyle(.black)
                            .font(.system(size: 14, design: .serif))
                            .multilineTextAlignment(.leading)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        Text(dream.date!)
                                .foregroundStyle(.gray)
                                .font(.system(size: 14, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    
                    if let image = homeManager.retrievedImages[dream.id!] {
                        Image(uiImage: image)
                            .resizable()
                            .frame(width: 100, height: 60)
                            .clipShape(Circle())
                    } else {
    //                    Image(homeManager.randomImage())
    //                        .resizable()
    //                        .frame(width: 100, height: 60)
    //                        .clipShape(Circle())
                    }
                }
                
            }
            Image(systemName: "xmark.bin.fill")
                .resizable()
                .frame(width: 20, height: 20)
                .foregroundStyle(Color.red)
        }
        .alert("Delete Pinned Dream \\(index + 1)?", isPresented: $confirmPin) {
            Button("Confirm") {
                userManager.removePinnedDream(indexOfRemovedDream: self.index)
                print("Replacing the pinned dream!")
            }
            Button("Cancel", role: .cancel) { }
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SingleDream.swift',
                                path: 'Dreamrs/Views/HomeViews/SingleDream.swift',
                                type: 'file',
                                content: `//
//  SingleDream.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI

struct SingleDream: View {
    
    @EnvironmentObject var homeManager: HomeManager
    @EnvironmentObject var userManager: UserManager
    
//    @State var isDreamAlreadyPinned: Bool = false
    
    var body: some View {
        ZStack {
            ScrollView {
                if let dream = homeManager.focusedDream {
                    VStack {
                        // Date
                        HStack {
                            Text(dream.date!)
                                .opacity(0.7)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                            
                            
                            HStack {
                                // Display pin dream button if the dream is not already pinned
                                if !homeManager.isFocusedDreamPinned {
                                    Button(action: {
                                        homeManager.isConfirmPinnedDreamPopupShowing = true
                                    }) {
                                        Image(systemName: "plus.app")
                                            .resizable()
                                            .frame(width: 20, height: 20)
                                            .foregroundStyle(Color.black)
                                    }.popover(isPresented: $homeManager.isConfirmPinnedDreamPopupShowing) {
                                        PinDreamView()
                                    }
                                    .padding(.trailing, 5)
                                }
                                
                                // Delete Dream
                                Button(action: {
                                    homeManager.isConfirmDeleteDreamAlertShowing = true
                                }) {
                                    Image(systemName: "trash")
                                        .resizable()
                                        .frame(width: 20, height: 20)
                                        .foregroundStyle(Color.black)
                                }
                                .alert("Do you want to delete this dream?", isPresented: $homeManager.isConfirmDeleteDreamAlertShowing) {
                                    Button("Confirm") {
                                        if let _ = userManager.user {
                                            homeManager.deleteDream()
                                            // check if the dream being deleted is part of the user's pinned dream, if so remove it 
                                            if let pinnedDreams = userManager.user?.pinnedDreams {
                                                var i = 0
                                                for pinnedDream in pinnedDreams {
                                                    if pinnedDream["dreamId"] == homeManager.focusedDream!.id {
                                                        userManager.removePinnedDream(indexOfRemovedDream: i)
                                                    }
                                                    i += 1
                                                }
                                            }
                                        }
                                    }
                                    Button("Cancel", role: .cancel) { }
                                }
                                .padding(.trailing, 20)
                            }
                            
                        }
                        .padding(.top, 10)
                        
                        // Dream Title
                        HStack {
                            Text(dream.title!)
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                        }
                        
                        // 18+ indicated
                        HStack {
                            if let hasAdultContent = dream.hasAdultContent {
                                if hasAdultContent {
                                    Text("18+")
                                        .foregroundStyle(Color.red)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                        .padding(.leading, 20)
                                        .bold()
                                        .padding(.bottom, 20)
                                }
                            }
                        }
                        
                        // Dream details text
                        HStack {
                            
                            if let text = homeManager.focusedTextFormatted {
                                Text(AttributedString(text))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.leading, 20)
                                    .padding(.trailing, 20)
                                    .padding(.bottom, 20)
                            } else {
                                Image("sleep_face")
                                    .resizable()
                                    .frame(width: 100, height: 100)
                                    .opacity(0.6)
                                    .padding(.top, 60)
                            }
                        }
                        
                        // Tags
                        HStack() {
                            if let tags = dream.tags {
                                if !tags.isEmpty {
                                    ScrollView(.horizontal, showsIndicators: false) {
                                        HStack {
                                            ForEach(tags, id: \\.self) { tag in
                                                TagView(index: 0, text: tag["text"] ?? "Dream", icon: tag["icon"] ?? "sun.max", color: homeManager.convertStringToColor(color: tag["color"] ?? "red"), isEditable: false)
                                            }
                                        }
                                    }
                                }
                            }
                            
                            
                            
                            Spacer()
                        }
                        .padding(.bottom, 20)
                        .padding(.leading, 20)
                        
                        // Dream Image
                        HStack {
                            // First check homeManager loaded images
                            if let image = homeManager.retrievedImages[dream.id!] {
                                Image(uiImage: image)
                                    .resizable()
                                    .frame(maxWidth: .infinity)
                                    .frame(height: 400)
                                    .cornerRadius(0)
                            } else {
            //                    Image(homeManager.randomImage())
            //                        .resizable()
            //                        .frame(width: 100, height: 60)
            //                        .clipShape(Circle())
                                
                                // We  can then also check pinned dream images, if user is coming from profile
                                if let pinnedDreamImage = userManager.pinnedDreamImages[dream.id!] {
                                    Image(uiImage: pinnedDreamImage)
                                        .resizable()
                                        .frame(maxWidth: .infinity)
                                        .frame(height: 400)
                                        .cornerRadius(0)
                                }
                            }
                        }
                        .padding(.bottom, 10)
                        
                        Text("Analysis")
                            .font(.headline)
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.leading, 20)
                            .padding(.bottom, 20)
                        
                        if let textAnalysis = dream.AITextAnalysis {
                            Text(textAnalysis)
                                .font(.subheadline)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 20)
                                .padding(.trailing, 20)
                                .padding(.bottom, 20)
                        } else {
//                            Text("Sorry couldn't find the analysis")
//                                .font(.subheadline)
//                                .frame(maxWidth: .infinity, alignment: .leading)
//                                .padding(.leading, 20)
//                                .padding(.trailing, 20)
//                                .padding(.bottom, 20)
                        }
                            
                    }
                } else {
                    Image("sleep_face")
                        .resizable()
                        .frame(width: 100, height: 100)
                        .opacity(0.6)
                        .padding(.top, 60)
                }
            }
            .padding(.bottom, 20)
        }
        .onAppear {
            homeManager.isFocusedDreamPinned = false
            if let map = userManager.user?.pinnedDreams {
                if let dreamId = homeManager.focusedDream!.id {
                    // Constant loop, only 3 max dreamMaps
                    for dreamMap in map {
                        if dreamMap["dreamId"] == dreamId {
                            homeManager.isFocusedDreamPinned = true
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    SingleDream()
        .environmentObject(HomeManager())
        .environmentObject(UserManager())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'NavigationViews',
                        path: 'Dreamrs/Views/NavigationViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'BottomNavBar.swift',
                                path: 'Dreamrs/Views/NavigationViews/BottomNavBar.swift',
                                type: 'file',
                                content: `//
//  BottomNavBar.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI

struct BottomNavBar: View {
    var body: some View {
        ZStack {
            TabView() {
                Group() {
                    HomeView()
                        .tabItem {
                            Label("", systemImage: "house")
                        }
                    
//                    CommunityMainView()
//                        .tabItem {
//                            Label("", systemImage: "person.3.fill")
//                        }
                    
//                    TestSingleDream()
                    ProfileMainView()
                        .tabItem {
                            Label("", systemImage: "person.fill")
                        }
                }
//                .toolbarBackground(.visible, for:.tabBar)
                .toolbarColorScheme(.none, for: .tabBar)
                .toolbarBackground(.hidden, for: .tabBar)
            }
        }
    }
}

struct BottomNavBar_Previews: PreviewProvider {
    static var previews: some View {
        BottomNavBar()
    }
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'ProfileViews',
                        path: 'Dreamrs/Views/ProfileViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'ProfileFollowerListView.swift',
                                path: 'Dreamrs/Views/ProfileViews/ProfileFollowerListView.swift',
                                type: 'file',
                                content: `//
//  ProfileFollowerListView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/7/24.
//

import SwiftUI

struct ProfileFollowerListView: View {
    
    @EnvironmentObject var userManager: UserManager
    @StateObject var communityManager = CommunityManager()
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    ScrollView(.vertical, showsIndicators: false) {
                        ForEach(userManager.followers) { follower in
                            NavigationLink(destination: CommunityProfileView()) {
                                HStack {
                                    VStack {
                                        Text(follower.firstName! + " " + follower.lastName!)
                                            .foregroundStyle(Color.black)
                                            .font(.system(size: 16))
                                            .fontDesign(.serif)
                                            .opacity(1.0)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                        Text("@" + follower.handle!)
                                            .foregroundStyle(Color.black)
                                            .font(.system(size: 14))
                                            .fontDesign(.serif)
                                            .opacity(0.8)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                    }
                                    Spacer()
                                    VStack {
                                        Text("\\(follower.karma!)")
                                            .foregroundStyle(Color.black)
                                            .font(.system(size: 16))
                                            .fontDesign(.serif)
                                            .opacity(1.0)
                                        Text("Karma")
                                            .foregroundStyle(Color.black)
                                            .font(.system(size: 12))
                                            .fontDesign(.serif)
                                            .opacity(0.8)
                                    }
                                }
                                .padding(.bottom, 10)
                            }
                            .simultaneousGesture(TapGesture().onEnded {
                                communityManager.focusedProfile = follower
                            })
                        }
                    }
                    Spacer()
                }
                .padding(.leading, 20)
                .padding(.trailing, 20)
                .padding(.top, 20)
            }
        }
        .environmentObject(communityManager)
    }
}

#Preview {
    ProfileFollowerListView()
        .environmentObject(UserManager())
        .environmentObject(CommunityManager())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ProfileMainView.swift',
                                path: 'Dreamrs/Views/ProfileViews/ProfileMainView.swift',
                                type: 'file',
                                content: `//
//  ProfileMainView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 10/28/23.
//

import SwiftUI

struct ProfileMainView: View {
    @State var isProfileSettingsPopupShowing: Bool = false
    
    @EnvironmentObject var userManager: UserManager
    @StateObject var homeManager = HomeManager()
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    // Logo and settings
                    HStack {
                        Image("home_logo")
                            .resizable()
                            .frame(width: 100, height: 100)
                        
                        Text("D R E A M R S")
                            .font(.system(size: 14))
                            .padding(.trailing, 20)
//                            .padding(.bottom, 5)
                            .font(.subheadline)
                            .bold()
                            .padding(.trailing, 40)
                        
                        Button(action: {
                            isProfileSettingsPopupShowing = true
                        }) {
                            Image(systemName: "gear")
                                .resizable()
                                .frame(width: 30, height: 30)
                                .foregroundColor(.black)
                        }.sheet(isPresented: $isProfileSettingsPopupShowing) {
                            ProfileSettingsView()
                        }
                    }
                    .padding(.bottom, 20)
                    
                    if let user = userManager.user {
                        if let firstName = user.firstName {
                            if let lastName = user.lastName {
                                // Full Name
                                Text(firstName + " " + lastName)
                                    .font(.system(size: 20))
                                    .fontDesign(.serif)
                                    .bold()
                            }
                        }
                        
                        if let handle = user.handle {
                            // Handle
                            Text("@" + handle)
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .foregroundStyle(userManager.convertColorStringToView())
                                .opacity(1.0)
                        }
                    }
                    
                    
                    
                    
                    
                    // Dream Stats
                    HStack {
                        // Dreams Recorded
                        VStack {
                            if let user = userManager.user {
                                if let numDreams = user.numDreams {
                                    Text("\\(numDreams)")
                                        .font(.system(size: 18))
                                        .fontDesign(.serif)
                                        .bold()
                                } else {
                                    Text("34")
                                        .font(.system(size: 18))
                                        .fontDesign(.serif)
                                        .bold()
                                }
                            } else {
                                Text("34")
                                    .font(.system(size: 18))
                                    .fontDesign(.serif)
                                    .bold()
                            }
                            Text("Dreams")
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .opacity(0.8)
                        }
                        
                        // Dream Karma
                        VStack {
                            if let user = userManager.user {
                                if let karma = user.karma {
                                    Text("\\(karma)")
                                        .font(.system(size: 18))
                                        .fontDesign(.serif)
                                        .bold()
                                } else {
                                    Text("1")
                                        .font(.system(size: 18))
                                        .fontDesign(.serif)
                                        .bold()
                                }
                            } else {
                                Text("1")
                                    .font(.system(size: 18))
                                    .fontDesign(.serif)
                                    .bold()
                            }
                            Text("Karma")
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .opacity(0.8)
                        }
                        
                        
                        // Friends
                        NavigationLink(destination: ProfileFollowerListView()) {
                            VStack {
                                if let user = userManager.user {
                                    if let followers = user.followers {
                                        Text("\\(followers.count)")
                                            .font(.system(size: 18))
                                            .fontDesign(.serif)
                                            .bold()
                                    } else {
                                        Text("0")
                                            .font(.system(size: 18))
                                            .fontDesign(.serif)
                                            .bold()
                                    }
                                } else {
                                    Text("0")
                                        .font(.system(size: 18))
                                        .fontDesign(.serif)
                                        .bold()
                                }
                                
                                Text("Followers")
                                    .font(.system(size: 16))
                                    .fontDesign(.serif)
                                    .opacity(0.8)
                            }
                        }
                        .foregroundStyle(Color.black)
                        .simultaneousGesture(TapGesture().onEnded {
                            userManager.loadFollowers()
                        })
                        
                    }
                    .padding(.top, 40)
                    .padding(.bottom, 40)
                    
                    
                    // Pinned Dreams
                    VStack {
                        Text("Pinned Dreams")
                            .font(.system(size: 18))
                            .fontDesign(.serif)
                            .bold()
                        
                        ForEach(userManager.pinnedDreams) { dream in
                            PinnedDream(dream: dream)
                        }
                        
                    }
                    .padding(.leading, 20)
                    .padding(.trailing, 10)
                }
                .frame(maxHeight: .infinity, alignment: .top)
            }
        }
        .environmentObject(homeManager)
        .onAppear {
            userManager.loadPinnedDreams(isRefresh: false)
        }
    }
}

#Preview {
    ProfileMainView()
        .environmentObject(UserManager())
        .environmentObject(HomeManager())
}


struct PinnedDream : View {
    
    var dream: Dream
    
    @EnvironmentObject var homeManager: HomeManager
    @EnvironmentObject var userManager: UserManager
    
    var body : some View {
        NavigationLink(destination: SingleDream()) {
            HStack {
                VStack {
                    Text(dream.title!)
                        .foregroundStyle(.black)
                        .font(.system(size: 14, design: .serif))
                        .multilineTextAlignment(.leading)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    Text(dream.date!)
                            .foregroundStyle(.gray)
                            .font(.system(size: 14, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                }
                
                // dream image
                if let image = userManager.pinnedDreamImages[dream.id!] {
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: 100, height: 60)
                        .clipShape(Circle())
                } else {
//                    Image(homeManager.randomImage())
//                        .resizable()
//                        .frame(width: 100, height: 60)
//                        .clipShape(Circle())
                }
            }
        }
        .simultaneousGesture(TapGesture().onEnded {
            homeManager.displayDream(dream: self.dream)
        })
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ProfileSettingsView.swift',
                                path: 'Dreamrs/Views/ProfileViews/ProfileSettingsView.swift',
                                type: 'file',
                                content: `//
//  ProfileSettingsView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 11/24/23.
//

import SwiftUI
import AuthenticationServices

struct ProfileSettingsView: View {
    @EnvironmentObject var authManager: AuthManager
    @EnvironmentObject var userManager: UserManager
    
    @State var presentEditFirstNameAlert: Bool = false
    @State var presentEditLastNameAlert: Bool = false
    @State var presentEditHandleAlert: Bool = false
    
    @State var newFirstName: String = ""
    @State var newLastName: String = ""
    @State var newHandle: String = ""
    
    @State var confirmDelete: Bool = false
    
    var body: some View {
        VStack {
            List {
                Section(header: Text("Dreamrs")) {
                    Link("Terms of Use (EULA)", destination: URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!)
                    
                    
                    Link("Privacy Policy", destination: URL(string: "https://sites.google.com/view/dreamboard-privacy-policy/home")!)
                }
                
                Section(header: Text("Account Details")) {
                    // Email
                    HStack {
                        Text("Email: ")
                            .bold()
                        if let user = userManager.user {
                            if let email = user.email {
                                
                                Text(email)
                            }
                        }
                    }
                    
                    
                    // First Name
                    HStack {
                        Text("First Name: ")
                            .bold()
                        if let user = userManager.user {
                            if let firstName = user.firstName {
                                HStack {
                                    Text(firstName)
                                }
                            }
                        }
                        
                        // Change first name button
                        Button(action: {
                            presentEditFirstNameAlert = true
                        })
                        {
                            Image(systemName: "info.circle")
                        }
                        .alert("Edit First Name", isPresented: self.$presentEditFirstNameAlert) {
                            TextField("New First Name", text: self.$newFirstName)
                            HStack {
                                Button("Cancel", role: .cancel) {
                                    presentEditFirstNameAlert = false
                                }.foregroundColor(.red)
                                Button("Save", role: .none) {
                                    if self.newFirstName != "" {
                                        // Rate limit check
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            if let err = userManager.updateUserFirstName(newFirstName: self.newFirstName) {
                                                print("error changing name: \\(err)")
                                            } else {
                                                print("name change success")
                                            }
                                        }
                                    }
                                    self.presentEditFirstNameAlert = false
                                }.foregroundColor(.blue)
                            }
                        }
                        
                    }
                    // Last Name
                    HStack {
                        Text("Last Name: ")
                            .bold()
                        if let user = userManager.user {
                            if let lastName = user.lastName {
                                HStack {
                                    Text(lastName)
                                }
                            }
                        }
                        
                        // Change last name button
                        Button(action: {
                            presentEditLastNameAlert = true
                        })
                        {
                            Image(systemName: "info.circle")
                        }
                        .alert("Edit Last Name", isPresented: self.$presentEditLastNameAlert) {
                            TextField("New Last Name", text: self.$newLastName)
                            HStack {
                                Button("Cancel", role: .cancel) {
                                    presentEditLastNameAlert = false
                                }.foregroundColor(.red)
                                Button("Save", role: .none) {
                                    if self.newLastName != "" {
                                        // Rate limit check
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            if let err = userManager.updateUserLastName(newLastName: self.newLastName) {
                                                print("error changing name: \\(err)")
                                            } else {
                                                print("name change success")
                                            }
                                        }
                                    }
                                    self.presentEditLastNameAlert = false
                                }.foregroundColor(.blue)
                            }
                        }
                    }
                }
                
                Section(header: Text("Community")) {
                    // Display Name
                    HStack {
                        Text("Handle: ")
                            .bold()
                        if let user = userManager.user {
                            if let handle = user.handle {
                                HStack {
                                    Text(handle)
                                }
                            }
                        }
                        
                        // Change handle button
                        Button(action: {
                            presentEditHandleAlert = true
                        })
                        {
                            Image(systemName: "info.circle")
                        }
                        .alert("Edit Handle", isPresented: self.$presentEditHandleAlert) {
                            TextField("New Handle", text: self.$newHandle)
                                .textInputAutocapitalization(.never)
                            HStack {
                                Button("Cancel", role: .cancel) {
                                    presentEditHandleAlert = false
                                }.foregroundColor(.red)
                                Button("Save", role: .none) {
                                    if self.newHandle != "" {
                                        // Rate limit check
                                        if let rateLimit = userManager.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            if let err = userManager.updateUserHandle(newHandle: self.newHandle) {
                                                print("error changing name: \\(err)")
                                            } else {
                                                print("name change success")
                                            }
                                        }
                                    }
                                    self.presentEditHandleAlert = false
                                }.foregroundColor(.blue)
                            }
                        }
                        
                    }
                }
                
                Section(header: Text("Account")) {
                    Button(action: {
                        // Sign out of account
                        authManager.logOut()
                    }) {
                        Text("Sign Out")
                    }
                    
                    
                    Button(action: {
                        self.confirmDelete = true
                    }) {
                        Text("Delete Account")
                            .foregroundColor(.red)
                    }
                    .alert("Confirm you want to delete your account permanently?", isPresented: self.$confirmDelete) {
                        Button("Confirm") {
                            if let user = userManager.user {
                                authManager.deleteUser()
                            }
                        }
                        Button("Cancel", role: .cancel) { }
                    }
                }
            }
        }
    }
}

#Preview {
    ProfileSettingsView()
        .environmentObject(UserManager())
        .environmentObject(AuthManager())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'WelcomeSurveyView.swift',
                                path: 'Dreamrs/Views/ProfileViews/WelcomeSurveyView.swift',
                                type: 'file',
                                content: `//
//  WelcomeSurveyView.swift
//  Dreamrs
//
//  Created by Ben Dreyer on 1/15/24.
//

import SwiftUI

struct WelcomeSurveyView: View {
    
    @EnvironmentObject var userManager: UserManager
    @StateObject var welcomeSurveyManager = WelcomeSurveyManager()
    
    
    var body: some View {
        ZStack {
            Color.white // Background
                .ignoresSafeArea()
            VStack {
                // Logo and settings
                HStack {
                    Image("home_logo")
                        .resizable()
                        .frame(width: 100, height: 100)
                    
                    Text("D R E A M R S")
                        .font(.system(size: 14))
                        .padding(.trailing, 20)
                    //                            .padding(.bottom, 5)
                        .font(.subheadline)
                        .bold()
                        .padding(.trailing, 40)
                }
                .padding(.bottom, 40)
                
                Text("Welcome! We need some info before you begin your dream journey:")
                    .font(.system(size: 16))
                    .fontDesign(.serif)
                    .foregroundStyle(Color.black)
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                    .padding(.bottom, 20)
                
                HStack {
                    TextField("username", text: $welcomeSurveyManager.handle)
                        .textFieldStyle(.roundedBorder)
                        .font(.system(size: 16))
                        .frame(maxWidth: 150, alignment: .leading)
                        .fontDesign(.serif)
                        .foregroundStyle(welcomeSurveyManager.convertColorStringToView())
                        .padding(.leading, 20)
                        .textInputAutocapitalization(.never)
                    
                    
                    Picker("", selection: $welcomeSurveyManager.userColor) {
                        ForEach(welcomeSurveyManager.colorOptions, id: \\.self) { color in
                            Text(color)
                                .foregroundStyle(Color.red)
                        }
                    }
                    .pickerStyle(.automatic)
                    .frame(maxWidth: 150, alignment: .leading)
                    .padding(.trailing, 20)
                }
                .padding(.bottom, 100)
                
                // EULA
                Button(action: {
                    welcomeSurveyManager.isEULAShowing = true
                }) {
                    RoundedRectangle(cornerRadius: 25)
                        .frame(width: 340, height: 50)
                        .foregroundStyle(Color.cyan)
                        .overlay {
                            Text("End User Licensce Agreement (EULA)")
                                .foregroundStyle(Color.white)
                                .font(.system(size: 16))
                                .fontDesign(.serif)
                                .padding()
                        }
                    
                }
                .padding(.bottom, 20)
                .sheet(isPresented: $welcomeSurveyManager.isEULAShowing) {
                    ScrollView {
                        Text(welcomeSurveyManager.eulaText)
                            .padding()
                    }
                }
                
                // EULA Agreement
                HStack {
                    Text("I have read and agree to the EULA")
                        .font(.system(size: 16))
                        .fontDesign(.serif)
                        .foregroundStyle(Color.black)
                        .padding(.leading, 20)
                        .padding(.trailing, 20)
                    
                    Button(action: {
                        welcomeSurveyManager.hasUserAcceptedEULA.toggle()
                    }) {
                        if !welcomeSurveyManager.hasUserAcceptedEULA {
                            Image(systemName: "square")
                                .resizable()
                                .frame(width: 20, height: 20)
                                .foregroundColor(.black)
                        } else {
                            Image(systemName: "checkmark.square")
                                .resizable()
                                .frame(width: 20, height: 20)
                                .foregroundColor(.green)
                        }
                    }
                    .padding(.trailing, 20)
                }
                .padding(.bottom, 20)
                
                
                if welcomeSurveyManager.isLoadingWheelVisisble {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .black))
                        .scaleEffect(2)  // Adjust size if needed
                        .animation(.linear(duration: 1.0).repeatForever(autoreverses: true))
                        .padding(.bottom, 20)
                }
                
                
                if welcomeSurveyManager.errorString != "" {
                    Text(welcomeSurveyManager.errorString)
                        .font(.system(size: 16))
                        .fontDesign(.serif)
                        .foregroundStyle(Color.red)
                        .padding(.leading, 20)
                        .padding(.trailing, 20)
                        .padding(.bottom, 20)
                }
                
                
                
                Button(action: {
                    if welcomeSurveyManager.hasUserAcceptedEULA {
                        welcomeSurveyManager.completeWelcomeSurvey()
                        // Re-load the user manager to get rid of the welcome survey view - but wait 2 seconds (spagehtti code rip)
                        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(4)) {
                            userManager.retrieverUserFromFirestore(userId: userManager.user!.id!)
                        }
                    }
                }) {
                    Text("Continue")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .background(welcomeSurveyManager.hasUserAcceptedEULA ? Color.black : Color.gray)
                        .cornerRadius(10)
                        .overlay(
                            RoundedRectangle(cornerRadius: 25)
                                .stroke(welcomeSurveyManager.hasUserAcceptedEULA ? Color(.black).opacity(0.5) : Color(.gray).opacity(0.5), lineWidth: 1)
                        )
                }
                
                
                
                
                Spacer()
                
            }
            
            
        }
        .environmentObject(welcomeSurveyManager)
        .environmentObject(userManager)
    }
}

#Preview {
    WelcomeSurveyView()
        .environmentObject(WelcomeSurveyManager())
        .environmentObject(UserManager())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'README.md',
        path: 'README.md',
        type: 'file',
        content: `Social AI Dream Journal iOS App. On the [app store](https://apps.apple.com/us/app/dreamrs/id6473683619)
`,
        language: 'markdown'
    }
];
