import { FileNode } from '../components/CodeViewer';

export const dailyShort: FileNode[] = [
    {
        name: 'Writing',
        path: 'Writing',
        type: 'directory',
        children: [
            {
                name: '.gitignore',
                path: 'Writing/.gitignore',
                type: 'file',
                content: `# Secrets
Secrets
Secrets.swift`,
                language: 'plaintext'
            },
            {
                name: 'ApplicationUtility.swift',
                path: 'Writing/ApplicationUtility.swift',
                type: 'file',
                content: `//
//  ApplicationUtility.swift
//  Writing
//
//  Created by Ben Dreyer on 6/16/24.
//

import Foundation
import SwiftUI
import UIKit

// This is needed for Google Sign in SDK.
final class ApplicationUtility {
    static var rootViewController: UIViewController {
        guard let screen = UIApplication.shared.connectedScenes.first as? UIWindowScene else {
            return .init()
        }
        
        guard let root = screen.windows.first?.rootViewController else {
            return .init()
        }
        
        return root
    }
}
`,
                language: 'plaintext'
            },
            {
                name: 'ContentView.swift',
                path: 'Writing/ContentView.swift',
                type: 'file',
                content: `//
//  ContentView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/1/24.
//

import FirebaseAuth
import SwiftUI

struct ContentView: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @StateObject var authController = AuthController()
    @StateObject var homeController = HomeController()
    @StateObject var userController = UserController()
    @StateObject var profileController = ProfileController()
    @StateObject var localNotificationController = LocalNotificationController()
    
    // Scene phase (used for tracking when notification auth status changes)
    @Environment(\\.scenePhase) var scenePhase
    
    var body: some View {
        
        ZStack {
            NavBarView()
        }
        .environmentObject(authController)
        .environmentObject(homeController)
        .environmentObject(userController)
        .environmentObject(profileController)
        .environmentObject(localNotificationController)
        .task {
            try? await localNotificationController.requestAuthorization()
        }
        .onChange(of: scenePhase) {
            if scenePhase == .active {
                Task {
                    await localNotificationController.getCurrentSetting()
                    await localNotificationController.getPendingRequests()
                    if localNotificationController.isGranted {
                        localNotificationController.enableNotifications()
                    }
                }
            }
        }
        .onChange(of: isSignedIn) {
            print("is Signed in value has changed: ", isSignedIn)
            
            if isSignedIn == true {
                if let user = Auth.auth().currentUser {
                    print("YAY called retrieve user on dissapear auth view")
                    userController.retrieveUserFromFirestore(userId: user.uid)
                    userController.retrieveUsersProfilePicture(userId: user.uid)
                    profileController.retrieveShorts()
                    homeController.retrieveSignedInUsersShort()
                } else {
                    print("no auth user yet lol nice try")
                }
            }
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AuthController())
        .environmentObject(HomeController())
        .environmentObject(UserController())
        .environmentObject(ProfileController())
        .environmentObject(LocalNotificationController())
}
`,
                language: 'plaintext'
            },
            {
                name: 'Controllers',
                path: 'Writing/Controllers',
                type: 'directory',
                children: [
                    {
                        name: 'AdvertisementController.swift',
                        path: 'Writing/Controllers/AdvertisementController.swift',
                        type: 'file',
                        content: `//
//  AdvertisementController.swift
//  Writing
//
//  Created by Ben Dreyer on 8/25/24.
//

import FirebaseFirestore
import Foundation
import FirebaseStorage
import UIKit


class AdvertisementController : ObservableObject {
    
    @Published var focusedAd: Ad?
    @Published var advertiserImage : UIImage?
    
    // Firestore
    let db = Firestore.firestore()
    
    // Storage
    let storage = Storage.storage()
    
    @Published var isFullAdSheetShowing: Bool = false
    
    
    // Ads in the Daily Short work via a daily system. There's one ad slot per day, available to be filled by a single advertiser.
    // If the advertiser signs up for an ad slot for a certain day, they are the only ad showing in the app that day.
    // We store ads in firestore, and if an document exists with the ID equal to the current date (e.g. 20240825) then we'll show
    // that ad to users.
    
    
    // vars that control the view
    @Published var isFocusedAdLiked: Bool = false
    
    init() {
        fetchAd()
    }
    
    
    // Lookup if an ad exists for the current date.
    func fetchAd() {
        // return early. Can only have 1 ad at a time.
        if let _ = self.focusedAd {
            return
        }
        
        
        // Get current date in YYYYMMDD format.
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyyMMdd"
        let currentDate = dateFormatter.string(from: Date())
        print(currentDate)
        
        Task {
            let docRef = db.collection("ads").document(currentDate)
            do {
                let fetchedAd = try await docRef.getDocument(as: Ad.self)
                
                DispatchQueue.main.async {
                    self.focusedAd = fetchedAd
                }
                
                // Fetch the advertiser image
                let imageRef = self.storage.reference().child("advertisers/" + (fetchedAd.advertiserPictureUrl ?? "") + ".jpeg")
                
                imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                    if let error = error {
                        print("error downloading image from storage: ", error.localizedDescription)
                        return
                    } else {
                        let image = UIImage(data: data!)
                        DispatchQueue.main.async {
                            self.advertiserImage = image
                        }
                    }
                }
            } catch {
                print("error decoding ad, or it wasn't found: ", error.localizedDescription)
                DispatchQueue.main.async {
                    self.focusedAd = nil
                    self.advertiserImage = nil
                }
            }
        }
    }
    
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'AuthController.swift',
                        path: 'Writing/Controllers/AuthController.swift',
                        type: 'file',
                        content: `//
//  AuthController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/14/24.
//

import AuthenticationServices
import CryptoKit
import FirebaseAuth
import FirebaseCore
import FirebaseFirestore
import FirebaseFirestoreSwift
import Foundation
import GoogleSignIn
import GoogleSignInSwift
import SwiftUI

class AuthController : UIViewController, ObservableObject {
    // Controls which views the user can access based on login status.
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @Published var isAuthPopupShowing: Bool = false
    
    @Published var email = ""
    @Published var firstName = ""
    @Published var lastName = ""
    
    // Unhashed nonce. (used for Apple sign in)
    @Published var currentNonce:String?
    @Published var request: ASAuthorizationAppleIDRequest?
    
    @Published var errorString: String = ""
    @Published var isErrorStringShowing: Bool = false
    
    let db = Firestore.firestore()
    
    func signInWithGoogle() {
        // get app client id
        guard let clientID = FirebaseApp.app()?.options.clientID else { return }
        
        // Create Google Sign In config object.
        let config = GIDConfiguration(clientID: clientID)
        
        GIDSignIn.sharedInstance.configuration = config
        
        // sign in mrthod goes here
        
        GIDSignIn.sharedInstance.signIn(withPresenting: ApplicationUtility.rootViewController) { user, error in
            if let error = error {
                print(error)
                return
            }
            
            guard
                let user = user?.user,
                let idToken = user.idToken else { return }
            
            let accessToken = user.accessToken
            
            let credential = GoogleAuthProvider.credential(withIDToken: idToken.tokenString, accessToken: accessToken.tokenString)
            
            Auth.auth().signIn(with: credential) { result, error in
                if let error = error {
                    print(error)
                    return
                }
                
                guard let user = result?.user else { return }
//                print("user was signed in: ", user)
//                print(user.displayName ?? "display name")
//                print(user.email ?? "email")
                
                // Split the display name into a first and last name, there's a space inbetween, usually
                let names = user.displayName?.components(separatedBy: " ")

                if let names = names {
                    if names.count >= 2 {
                        let firstName = names[0]
                        let lastName = names[1]
                        self.firstName = firstName
                        self.lastName = lastName
                    } else {
//                        print("The string does not contain a space")
                        self.firstName = user.displayName ?? ""
                        self.lastName = ""
                    }
                } else {
                    self.firstName = user.displayName ?? ""
                    self.lastName = ""
                }
                
                self.email = user.email ?? ""
                
                // Figure out if the user already has an account and is signing in
                // or if this is their first time signing up. (check on email)
                let docRef = self.db.collection("users").whereField("email", isEqualTo: self.email)
                docRef.getDocuments { (querySnapshot, err) in
                    if let err = err {
                        print(err.localizedDescription)
                    } else {
                        if querySnapshot!.documents.isEmpty {
                            // User doesn't exist in the database yet, create a new user object
                            
                            // The only field not populated is profilePicture. User needs to add that themselves.
                            let userObject = User(firstName: self.firstName, lastName: self.lastName, email: self.email, shortsCount: 0, numLikes: 0, avgWritingScore: 0, numAnalysisGenerated: 0, title: 0, lastShortWrittenDate: Timestamp(), currentStreak: 0, bestStreak: 0, contributions: [:], freeWriteCount: 0, freeWriteAverageWordCount: 0, isAdmin: false, blockedUsers: [:], likedPrompts: [:], likedShorts: [:])
                            
                            // Add the user to firestore user collection
                            let collectionRef = self.db.collection("users")
                            do {
                                try collectionRef.document(user.uid).setData(from: userObject)
                                self.isSignedIn = true
                                // Set User Default
                                //                                    UserDefaults.standard.set(self.isSignedIn, forKey: loginStatusKey)
                                // Close the auth popup
                                self.isAuthPopupShowing = false
                            } catch {
                                print("Error saving the new user to firestore")
                            }
                        } else {
                            // An existing user is signing back in
                            if let user = Auth.auth().currentUser {
                                print("current user signed in ", user.uid)
                            }
                            self.isSignedIn = true
                            // Set user defaults
                            //                                UserDefaults.standard.set(self.isSignedIn, forKey: loginStatusKey)
                            self.isAuthPopupShowing = false
                        }
                    }
                }
            }
        }
    }
    
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
                
//                print("full name: ", appleIDCredential.fullName ?? "no name")
                
                if let fullName = appleIDCredential.fullName {
                    if let firstName = fullName.givenName {
                        self.firstName = firstName
                    }
                    
                    if let lastName = fullName.familyName {
                        self.lastName = lastName
                    }
                }
                
                if self.firstName == "" {
                    self.firstName = "Guest"
                }
                
                if self.lastName == "" {
                    self.lastName = "Writer"
                }
                
                guard let idTokenString = String(data: appleIDToken, encoding: .utf8) else {
//                    print("Unable to serialize token string from data: \\(appleIDToken.debugDescription)")
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
                    
//                    print("signed in with apple")
//                    print("\\(String(describing: user.uid))")
                    
                    // Figure out if the user already has an account and is signing in
                    // or if this is their first time signing up. (check on email)
                    let docRef = self.db.collection("users").whereField("email", isEqualTo: self.email)
                    docRef.getDocuments { (querySnapshot, err) in
                        if let err = err {
                            print(err.localizedDescription)
                        } else {
                            if querySnapshot!.documents.isEmpty {
                                // User doesn't exist in the database yet, create a new user object
                                
                                // The only field not populated is profilePicture. User needs to add that themselves.
                                let userObject = User(firstName: self.firstName, lastName: self.lastName, email: self.email, shortsCount: 0, numLikes: 0, avgWritingScore: 0, numAnalysisGenerated: 0, title: 0, lastShortWrittenDate: Timestamp(), currentStreak: 0, bestStreak: 0, contributions: [:], freeWriteCount: 0, freeWriteAverageWordCount: 0, isAdmin: false, blockedUsers: [:], likedPrompts: [:], likedShorts: [:])
                                
                                // Add the user to firestore user collection
                                let collectionRef = self.db.collection("users")
                                do {
                                    try collectionRef.document(user.uid).setData(from: userObject)
                                    self.isSignedIn = true
                                    // Set User Default
                                    //                                    UserDefaults.standard.set(self.isSignedIn, forKey: loginStatusKey)
                                    // Close the auth popup
                                    self.isAuthPopupShowing = false
                                } catch {
                                    print("Error saving the new user to firestore")
                                }
                            } else {
                                // An existing user is signing back in
                                if let user = Auth.auth().currentUser {
//                                    print("current user signed in ", user.uid)
                                }
                                self.isSignedIn = true
                                // Set user defaults
                                //                                UserDefaults.standard.set(self.isSignedIn, forKey: loginStatusKey)
                                self.isAuthPopupShowing = false
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
        self.isSignedIn = false
        //        UserDefaults.standard.set(isSignedIn, forKey: loginStatusKey)
        print("The user logged out")
    }
    
    func deleteAuthUser() {
        let user = Auth.auth().currentUser
        user?.delete { error in
          if let error = error {
              print("error deleting auth account: ", error)
          } else {
            // Account deleted.
//              print("auth accound deleted successfully")
              self.logOut()
          }
        }
    }
    
    
    // Functions for apple sign in flow
    
    // Generate a random Nonce used to make sure the ID token you get was granted specifically in response to your app's authentication request.
    // Hashing function using CryptoKit
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
    
}

extension AuthController: ASAuthorizationControllerDelegate {
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
                
                //                // delete the account after sign in
                //                do {
                //                    if let user = Auth.auth().currentUser {
                //                        // set bit on firestore field
                //                        self.db.collection("users").document(user.uid).updateData([
                //                            "isUserDeleted": true,
                //                            "email": "deleted@deleted.com"
                //                        ]) { err in
                //                            if let err = err {
                //                                print("error updating user in firestore as deleted: ", err.localizedDescription)
                //                            } else {
                //                                print("successfully set bit")
                //                                Task {
                //                                    try Auth.auth().revokeToken(withAuthorizationCode: String(data: appleIDCredential.authorizationCode!, encoding: .utf8)!)
                //                                    try user.delete()
                //                                    self.logOut()
                //                                }
                //                            }
                //                        }
                //
                //                    }
                //                } catch {
                //                    print(error)
                //                }
            }
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

extension AuthController: ASAuthorizationControllerPresentationContextProviding {
    /// - Tag: provide_presentation_anchor
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}

extension UIViewController {
    func showLoginViewController() {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        if let loginViewController = storyboard.instantiateViewController(withIdentifier: "loginViewController") as? AuthController {
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
                        name: 'CreateShortController.swift',
                        path: 'Writing/Controllers/CreateShortController.swift',
                        type: 'file',
                        content: `//
//  CreateShortController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/18/24.
//

import Firebase
import FirebaseFirestore
import Foundation
import SwiftUI

class CreateShortController : ObservableObject {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    // if the create short sheet is showing
    @Published var isCreateShortSheetShowing = false
    
    // State
    @Published var shortContent: String = ""
    @Published var isNSFW: Bool = false
    
    let characterLimit = 2500
    
    // Firebase
    let db = Firestore.firestore()
    
    func submitShort(user: User, prompt: Prompt) {
        // Make sure the user is signed in first (arg passed from AppStorage var)
        if !self.isSignedIn {
//            print("User not signed in, cannot create a short")
            return
        }
//        print("user is signed in we are good to go")
        
        // Create a new short
        let short = Short(date: prompt.date, rawTimestamp: Timestamp(date: Date()), authorId: user.id, authorFirstName: user.firstName, authorLastName: user.lastName, authorProfilePictureUrl: user.profilePictureUrl, authorNumShorts: user.shortsCount, authorNumLikes: user.numLikes, authorTitle: user.title ?? 0, promptRawText: prompt.promptRawText!, shortRawText: self.shortContent, isNSFW: self.isNSFW, likeCount: 0, commentCount: 0)
        
        Task {
            // Write the short to firebase
            do {
                try db.collection("shorts").addDocument(from: short)
//                print("short written to firestore")
            } catch let error {
                print("error writign short to firestore: ", error.localizedDescription)
            }
        }
        
        Task {
            // Update the prompt response count
            do {
                let promptRef = db.collection("prompts").document(prompt.date!)
                try await promptRef.updateData([
                    "shortCount": FieldValue.increment(Int64(1))
                ])
//                print("shortCount updated +1")
            } catch let error {
                print("error updating short count on prompt: ", error.localizedDescription)
            }
        }
        
        Task {
            // Update the user's stats
            do {
                var amountToAddToCurrentStreak = -1
                
                if isYesterday(date: user.lastShortWrittenDate!.dateValue()) {
                    amountToAddToCurrentStreak = 1
                } else if isToday(date: user.lastShortWrittenDate!.dateValue()) {
                    amountToAddToCurrentStreak = 0
                }
                
                // value to add to bestStreak
                var bestStreak = 0
                if user.currentStreak == user.bestStreak && amountToAddToCurrentStreak == 1 {
                    bestStreak = 1
                }
                
                
                // TODO(): Have some sort of animation when a user unlocks a new title
                // check if the user reached a title milestone
                let curTitleLevel = user.title ?? 0
                let numShorts = user.shortsCount ?? 0
                let shouldIncrementTitleLevel = shouldIncrementTitleLevel(curTitleLevel: curTitleLevel, numShorts: numShorts)
                
                let userRef = db.collection("users").document(user.id!)
                try await userRef.updateData([
                    "shortsCount": FieldValue.increment(Int64(1)),
                    "title": shouldIncrementTitleLevel ? FieldValue.increment(Int64(1)) : FieldValue.increment(Int64(0)),
                    "currentStreak": amountToAddToCurrentStreak >= 0 ? FieldValue.increment(Int64(amountToAddToCurrentStreak)) : 1,
                    "bestStreak": FieldValue.increment(Int64(bestStreak)),
                    "lastShortWrittenDate": Timestamp(),
                    "contributions.\\(prompt.date!)": true
                ])
            } catch let error {
                print(error.localizedDescription)
            }
        }
        return
    }
    
    func shouldIncrementTitleLevel(curTitleLevel: Int, numShorts: Int) -> Bool {
        switch curTitleLevel {
        case 0:
            if numShorts == 0 {
                return true
            }
        case 1:
            if numShorts == 4 {
                return true
            }
        case 2:
            if numShorts == 9 {
                return true
            }
        case 3:
            if numShorts == 24 {
                return true
            }
        case 4:
            if numShorts == 49 {
                return true
            }
        case 5:
            if numShorts == 99 {
                return true
            }
        case 6:
            if numShorts == 199 {
                return true
            }
        default:
            return false
        }
        
        return false
    }
    
    // this function is called whenever a new character is added to the text field. Making sure it doesn't exceed the text length.
    func limitTextLength(_ upper: Int) {
        if self.shortContent.count > upper {
            self.shortContent = String(self.shortContent.prefix(upper))
        }
    }
    
    func isYesterday(date: Date) -> Bool {
        let calendar = Calendar.current
        return calendar.isDateInYesterday(date)
    }
    
    func isToday(date: Date) -> Bool {
        let calendar = Calendar.current
        return calendar.isDateInToday(date)
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'FreeWriteController.swift',
                        path: 'Writing/Controllers/FreeWriteController.swift',
                        type: 'file',
                        content: `//
//  FreeWriteController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/29/24.
//

import FirebaseAuth
import FirebaseFirestore
import Foundation

class FreeWriteController : ObservableObject {
    
    
    // Free Writes (sorted by date descending)
    @Published var freeWrites: [FreeWrite] = []
    
    // Free writes (sorted by date ascending)
    @Published var freeWritesOldest: [FreeWrite] = []
    
    // The focused freeWrite (user tapped on it)
    @Published var focusedFreeWrite: FreeWrite?
    
    // sorting method (0 = newest, 1 = oldest)
    @Published var selectedSortingMethod: Int = 0
    
    // Vars for creating a new free write
    @Published var titleText: String = ""
    @Published var iconName: String = "sun.max"
    @Published var contentText: String = ""
    @Published var wordCount: Int = 0
    
    // Pagination
    @Published var lastDoc: QueryDocumentSnapshot?
    
    // Pagination - sort by oldest
    @Published var lastDocOldest: QueryDocumentSnapshot?
    
    // Vars controlling view
    @Published var isCreateEntrySheetShowing: Bool = false
    @Published var isSingleFreeWriteSheetShowing: Bool = false
    @Published var isConfirmDeleteAlertShowing: Bool = false
    @Published var areNoShortsLeftToLoad: Bool = false
    
    // Icon collection (for choosing symbol on your entry)
    var iconOptions = ["message.fill", "phone.down.fill", "sun.max", "cloud.bolt.rain", "figure.walk.circle", "car", "paperplane.fill", "studentdesk", "display.2", "candybarphone", "photo.fill", "arrow.triangle.2.circlepath", "flag.checkered", "gamecontroller", "network.badge.shield.half.filled", "dot.radiowaves.left.and.right", "airplane.circle.fill", "bicycle", "snowflake.circle", "key.fill", "person.fill", "person.3", "house.fill", "party.popper.fill", "figure.archery", "sportscourt.fill", "globe.americas.fill", "sun.snow", "moon.fill", "wind.snow", "bolt.square.fill", "wand.and.stars.inverse", "bandage.fill", "textformat.abc", "play.rectangle.fill", "shuffle", "command.circle.fill", "keyboard.fill", "cart.fill", "giftcard.fill", "pesosign.circle", "chineseyuanrenminbisign.circle.fill", "hourglass.circle.fill", "heart.fill", "pill.fill", "eye", "brain.fill", "percent"]
    
    // Firestore
    let db = Firestore.firestore()
    
    init() {
        self.retrieveFreeWrites()
    }
    
    func switchSortingMethod() {
        self.areNoShortsLeftToLoad = false
        
        // if no shorts are in the respective list, retrieve the initial one
        if selectedSortingMethod == 0 {
            if freeWrites.isEmpty {
                retrieveFreeWrites()
            }
        } else {
            if freeWritesOldest.isEmpty {
                retrieveFreeWrites()
            }
        }
    }
    
    
    func retrieveFreeWrites() {
        if selectedSortingMethod == 0 {
            self.freeWrites = []
        } else {
            self.freeWritesOldest = []
        }
        
        
        // Ensure the user is authenticated
        if let user = Auth.auth().currentUser {
            // Start async task to read FreeWrites for user from firestore
            Task {
                do {
                    let querySnapshot = try await db.collection("freeWrites").whereField("authorId", isEqualTo: user.uid).order(by: "rawTimestamp", descending: selectedSortingMethod == 0 ? true : false).limit(to: 8).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
                            print("no shorts returned")
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        for document in querySnapshot.documents {
                            if let freeWrite = try? document.data(as: FreeWrite.self) {
                                if self.selectedSortingMethod == 0 {
                                    self.freeWrites.append(freeWrite)
                                } else {
                                    self.freeWritesOldest.append(freeWrite)
                                }
                            }
                        }
                        
                        // get the last doc (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
//                            print("error getting the last document snapshot")
                            return
                        }
                        
                        if self.selectedSortingMethod == 0 {
                            self.lastDoc = lastSnapshot
                        } else {
                            self.lastDocOldest = lastSnapshot
                        }
                    }
                } catch let error {
                    print("error getting free writes from firestore: ", error.localizedDescription)
                }
            }
        }
    }
    
    func retrieveNextFreeWrites() {
        // return early if lastDoc isn't populated
        if self.selectedSortingMethod == 0 && self.lastDoc == nil {
            return
        } else if self.selectedSortingMethod == 1 && self.lastDocOldest == nil {
            return
        }
        
        // Ensure the user is authenticated
        if let user = Auth.auth().currentUser {
            Task {
                do {
                    
                    let querySnapshot = try await db.collection("freeWrites").whereField("authorId", isEqualTo: user.uid).order(by: "rawTimestamp", descending: selectedSortingMethod == 0 ? true : false).limit(to: 6).start(afterDocument: selectedSortingMethod == 0 ? self.lastDoc! : self.lastDocOldest!).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
                            print("no shorts returned")
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        for document in querySnapshot.documents {
                            if let freeWrite = try? document.data(as: FreeWrite.self) {
                                if self.selectedSortingMethod == 0 {
                                    self.freeWrites.append(freeWrite)
                                } else {
                                    self.freeWritesOldest.append(freeWrite)
                                }
                            }
                        }
                        
                        // get the last doc (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
//                            print("error getting the last document snapshot")
                            return
                        }
                        
                        
                        if self.selectedSortingMethod == 0 {
                            self.lastDoc = lastSnapshot
                        } else {
                            self.lastDocOldest = lastSnapshot
                        }
                    }
                } catch let error {
                    print(error.localizedDescription)
                }
            }
        }
    }
    
    
    func focusFreeWrite(freeWrite: FreeWrite) {
        self.focusedFreeWrite = nil
        self.focusedFreeWrite = freeWrite
    }
    
    func submitFreeWrite(freeWriteCount: Int, freeWriteAverageWordCount: Int) {
        // Ensure the user is authenticated
        if let user = Auth.auth().currentUser {
            self.areNoShortsLeftToLoad = false
            
            // Ensure title text and content text are not empty
            if titleText.isEmpty || contentText.isEmpty { return }
            
            let freeWrite = FreeWrite(rawTimestamp: Timestamp(), authorId: user.uid, title: self.titleText, symbol: self.iconName, content: self.contentText, wordCount: wordCount)
            Task {
                // Write the Free Write to Firestore
                do {
                    try db.collection("freeWrites").addDocument(from: freeWrite)
//                    print("free write written to firestore")
                } catch let error {
                    print("error writing new free write to firestore: ", error.localizedDescription)
                }
                
                // Update the user in firestore (free write count and average word count)
                do {
                    // Find new word count average
                    let newWordCountAverage = ((freeWriteAverageWordCount * freeWriteCount) + self.wordCount) / (freeWriteCount + 1)
                    
                    
                    let docRef = db.collection("users").document(user.uid)
                    docRef.updateData([
                        "freeWriteCount": FieldValue.increment(Int64(1)),
                        "freeWriteAverageWordCount": newWordCountAverage
                    ])
//                    print("updated stats for user")
                    
                    // Reset view vars
                    DispatchQueue.main.async {
                        self.titleText = ""
                        self.iconName = "sun.max"
                        self.contentText  = ""
                        self.wordCount = 0
                    }
                }
            }
            
            Task {
                // Update the user's stats
                
                // Get today's date in YYYYMMDD
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "yyyyMMdd"
                
                let today = Date()
                let formattedDate = dateFormatter.string(from: today)
                
                do {
                    let userRef = db.collection("users").document(user.uid)
                    try await userRef.updateData([
                        "contributions.\\(formattedDate)": true
                    ])
                } catch let error {
                    print(error.localizedDescription)
                }
            }
        }
    }
    
    func editFreeWrite(freeWriteCount: Int, freeWriteOldAverageWordCount: Int) {
        // Ensure user is authd
        if let user = Auth.auth().currentUser {
            // Check if title and content is empty
            if self.titleText.isEmpty || self.contentText.isEmpty { return }
            
            
            if let oldFreeWrite = self.focusedFreeWrite {
                // Check if title and content and symbol are unchanged
                if self.titleText == oldFreeWrite.title! && self.contentText == oldFreeWrite.content! && self.iconName == oldFreeWrite.symbol! { return }
                
                Task {
                    // Edit the free Write document
                    db.collection("freeWrites").document(oldFreeWrite.id!).updateData([
                        "title": self.titleText,
                        "symbol": self.iconName,
                        "content": self.contentText,
                        "wordCount": self.wordCount
                    ])
//                    print("free write updated in firestore")
                    
                    // Edit the user's average word count
                    
                    // n = number of documents (freeWriteCount)
                    // W = The average word count before editing (freeWriteOldAverageWordCount)
                    
                    // word count of the document before editing
                    let wordCountBeforeEditing = oldFreeWrite.wordCount!
                    
                    // word count of the document after editing
                    let wordCountAfterEditing = self.wordCount
                    
                    // New Average word count = W - (Wold / n) + (Wnew / n)
                    let newAverageWordCount = freeWriteOldAverageWordCount - (wordCountBeforeEditing / freeWriteCount) + (wordCountAfterEditing / freeWriteCount)
                    
//                    print("word count for the old one: ", wordCountBeforeEditing)
//                    print("word count for the new one: ", wordCountAfterEditing)
                    do {
                        let docRef = db.collection("users").document(user.uid)
                        docRef.updateData([
                            "freeWriteAverageWordCount": newAverageWordCount
                        ])
//                        print("updated stats for user")
                        
                        DispatchQueue.main.async {
                            self.titleText = ""
                            self.iconName = "sun.max"
                            self.contentText  = ""
                            self.wordCount = 0
                            self.isSingleFreeWriteSheetShowing = false
                        }
                    }
                }
            }
        }
    }
    
    func deleteFreeWrite(freeWriteCount: Int, averageWordCountBeforeDeletion: Int) {
        // Ensure user is authd
        if let user = Auth.auth().currentUser {
            // Ensure a freeWrite is focused
            if let freeWrite = self.focusedFreeWrite {
                // Remove the document from firestore
                Task {
                    do {
                        try await db.collection("freeWrites").document(freeWrite.id!).delete()
//                        print("free write successfully removed!")
                    } catch let error {
                        print("error deleting from firestore: ", error.localizedDescription)
                    }
                }
                
                // Update users stats
                Task {
                    // W = averageWordCountBeforeDeletion
                    let W = averageWordCountBeforeDeletion
                    
                    // n = total number of documents before deletion
                    let n = freeWriteCount
                    
                    // Wdelete = the word count of the document being deleted
                    let Wdelete = freeWrite.wordCount!
                    
                    // Wnew = new average word count after deletion
                    
                    // Wnew = ((n * W) - Wdelete) / n-1
                    let Wnew = ((n * W) - Wdelete) / (n - 1)
                    
                    // Update the users stats
                    do {
                        let docRef = db.collection("users").document(user.uid)
                        docRef.updateData([
                            "freeWriteCount": FieldValue.increment(Int64(-1)),
                            "freeWriteAverageWordCount": Wnew
                        ])
//                        print("updated stats for user")
                        
                        DispatchQueue.main.async {
                            // Clear the controller vars
                            self.titleText = ""
                            self.iconName = "sun.max"
                            self.contentText  = ""
                            self.wordCount = 0
                            self.focusedFreeWrite = nil
                            self.isSingleFreeWriteSheetShowing = false
                        }
                    }
                }
            }
        }
    }
    
    // updates the word count of a new entry being created or an entry being edited.
    func updateWordCount() {
        let words = self.contentText.split { !$0.isLetter }
        self.wordCount = words.count
    }
}


`,
                        language: 'plaintext'
                    },
                    {
                        name: 'HomeController.swift',
                        path: 'Writing/Controllers/HomeController.swift',
                        type: 'file',
                        content: `//
//  HomeController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/15/24.
//  Last Updated 08/24/2024
//

import Foundation
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import OpenAI
import SwiftUI

class HomeController : ObservableObject {
    @AppStorage("filterNSFWShorts") private var filterNSFWShorts = false
    
    // The day in focus, determines which prompt should be shown.
    @Published public var promptSelectedDate: Date = Date()
    
    // The prompt currently being displayed on the home view.
    @Published var focusedPrompt: Prompt?
    @Published var focusedPromptImage: UIImage?
    // Cached Prompts. (avoid making firebase call each time)
    var cachedPrompts: [String : Prompt] = [:]
    var cachedPromptImages: [String : UIImage] = [:]
    
    // UsersFocusedShort - Is nil if the signed in user hasn't made a short for the focused prompt.
    @Published var usersFocusedShort: Short?
    // Cached UsersShorts
    var cachedUserShorts: [String : Short] = [:]
    
    // FocusedTopCommunityShorts - The Top three responses
    @Published var focusedTopCommunityShorts: [Short] = []
    // Cached Communnity shorts --
    var cachedTopCommunityShorts: [String : [Short]] = [:]
    
    
    // sorting method (0 = recent, 1 = like count)
    @Published var selectedSortingMethod: Int = 0
    
    // FocusedFullCommunityShorts - The full list of shorts for the selected prompt (sorted by date)
    @Published var focusedFullCommunityShorts: [Short] = []
    // Cached full community shorts (sorted by date)
    var cachedFullCommunityShorts: [String : [Short]] = [:]
    
    // same as above but sorted by like count
    @Published var focusedFullCommunityShortsByLikeCount: [Short] = []
    var cachedFullCommunityShortsByLikeCount: [String : [Short]] = [:]
    
    // If a single short preview is clicked on to view fully, this is that short
    @Published var focusedSingleShort: Short?
    // Determines if the focused short is from the user, or from the community
    var isFocusedShortOwned: Bool = false
    
    
    // The author of the focused short (used to display stats about the author)
    @Published var focusedShortAuthor: User?
    // Cached authors of previosuly focused shorts
    var cachedShortAuthors: [String : User] = [:]
    
    // focused comments, on the foccused single short
    @Published var focusedShortComments: [ShortComment] = []
    // cached comments [shortId : [ShortComment]]
    var cachedShortComments: [String : [ShortComment]] = [:]
    
    // Profile Picutres for community shorts (cached on device, they're small tho)
    @Published var communityProfilePictures: [String : UIImage] = [:]
    
    // Tracks the likes a user assigns to prompts throughout their app session.
    //    @Published var likedPrompts: [String : Bool] = [:]
    
    // Tracks the likes a user assigns to shorts throughout their app session.
    // [Id : Bool] - if the id = true in the map, that short has been liked.
    //    @Published var likedShorts: [String : Bool] = [:]
    
    // tracks the text when a user is creating a comment
    @Published var commentText: String = ""
    
    // Pagination
    // - sort by recent
    @Published var lastDocListShorts: QueryDocumentSnapshot?
    var cachedLastDocListShorts : [String : QueryDocumentSnapshot] = [:]
    // - sort by likeCount
    @Published var lastDocListShortsByLikeCount: QueryDocumentSnapshot?
    var cachedLastDocListShortsByLikeCount: [String : QueryDocumentSnapshot] = [:]
    
    
    @Published var lastDocComments: QueryDocumentSnapshot?
    var cachedLastDocComments : [String : QueryDocumentSnapshot] = [:]
    
    // Vars for controlling views (sheets, popups etc..)
    
    @Published var isFullCommunityResposneSheetShowing: Bool = false
    @Published var isCreateCommentSheetShowing: Bool = false
    @Published var isReportPromptAlertShowing: Bool = false
    @Published var isReportShortAlertShowing: Bool = false
    @Published var isReportCommentAlertShowing: Bool = false
    @Published var areNoShortsLeftToLoad: Bool = false
    @Published var areNoCommentsLeftToLoad: Bool = false
    @Published var areTopCommentsShowing: Bool = false
    @Published var isPromptLoading: Bool = false
    
    // OpenAI Config
    let openAI = OpenAI(configuration: OpenAI.Configuration(token: Secrets().openAIKey, timeoutInterval: 60.0))
    
    // Firestore
    let db = Firestore.firestore()
    
    // Storage
    let storage = Storage.storage()
    
    // Run this function when the HomeMainView first appears
    init() {
        // Retrieve the prompt for the selected day
        retrievePrompt()
        // Retrieve the signed in users short for the selected day
        retrieveSignedInUsersShort()
    }
    
    func retrievePrompt() {
        // null the previous prompt and image
        
        self.focusedPrompt = nil
        self.focusedPromptImage = nil
        self.areTopCommentsShowing = false
        
        // initiate loading
        self.isPromptLoading = true
        
        
        // Get the date in YYYYMMDD format.
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyyMMdd"
        let dateIntString = formatter.string(from: self.promptSelectedDate)
        
        // First check if the prompt for the passed date is already cached.
        
        if let prompt = self.cachedPrompts[dateIntString] {
            // Prompt is already cached
            self.focusedPrompt = prompt
            
            // double check the image is also cached.
            if let promptImage = self.cachedPromptImages[dateIntString] {
                self.focusedPromptImage = promptImage
            } else {
                // Image isn't cached so fetch both the prompt and Image again from DB.
                self.focusedPrompt = nil
                self.focusedPromptImage = nil
            }
            self.isPromptLoading = false
            return
        }
        
        // Retrieve today's prompt from firestore (if it exists - fallback to a default if it doesn't exist)
        // User does not need to be validated for this.
        Task {
            let docRef = db.collection("prompts").document(dateIntString)
            do {
                let fetchedPrompt = try await docRef.getDocument(as: Prompt.self)
                
                DispatchQueue.main.async {
                    self.focusedPrompt = fetchedPrompt
                    //                    print("testing concurrency: ")
                    //                    print(self.focusedPrompt!.promptRawText ?? "nothing yet")
                    
                    // Add the prompt to the cache
                    self.cachedPrompts[self.focusedPrompt!.date!] = self.focusedPrompt!
                    
                    // Fetch the prompts image from storage
                    let imageRef = self.storage.reference().child("prompts/" + self.focusedPrompt!.date! + ".jpeg")
                    
                    // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
                    imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                        if let error = error {
                            print("error downloading image from storage: ", error.localizedDescription)
                            // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                            self.focusedPrompt = nil
                            self.focusedPromptImage = nil
                            self.isPromptLoading = false
                            return
                        } else {
                            // Data for image is returned
                            let image = UIImage(data: data!)
                            self.focusedPromptImage = image
                            
                            // Add image to cache
                            // making sure the focusedPrompt exists and has a date
                            if let prompt = self.focusedPrompt {
                                if let date = prompt.date {
                                    self.cachedPromptImages[date]  = image
                                }
                            }
                            
                            // stop loading
                            self.isPromptLoading = false
                        }
                    }
                }
            } catch {
                print("error decoding prompt, or it wasnt found: \\(error)")
                DispatchQueue.main.async {
                    // Set focusedPrompt back to nil so that the view can update appropriately
                    self.focusedPrompt = nil
                    self.focusedPromptImage = nil
                    self.isPromptLoading = false
                    return
                }
            }
        }
        
    }
    
    func retrieveSignedInUsersShort() {
        self.usersFocusedShort = nil
        
        // Get the date in a string (YYYYMMDD)
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyyMMdd"
        let dateIntString = formatter.string(from: self.promptSelectedDate)
        
        // Check if the users short is already in the cache before fetching from Firestore
        if let short = self.cachedUserShorts[dateIntString] {
            DispatchQueue.main.async {
                self.usersFocusedShort = short
//                print("assigned previously cached user short - skipping firebase read")
            }
            return
        }
        
        // Get the user, we need to access the user ID when making the firebase call.
        if let user = Auth.auth().currentUser {
            Task {
                do {
                    let querySnapshot = try await db.collection("shorts").whereField("authorId", isEqualTo: user.uid).whereField("date", isEqualTo: dateIntString).getDocuments()
                    // there should only be one document if any
                    // if empty, reset the focusedshort to nil
                    DispatchQueue.main.async {
                        if querySnapshot.documents.isEmpty {
                            self.usersFocusedShort = nil
                        }
                        
                        for document in querySnapshot.documents {
                            if let short = try? document.data(as: Short.self) {
                                self.usersFocusedShort = short
                                
                                // Add the short to the cache
                                self.cachedUserShorts[dateIntString] = short
                            } else {
                                print("can't get short")
                                self.usersFocusedShort = nil
                            }
                        }
                    }
                }
            }
        }
    }
    
    func getCommunityAuthorsProfilePicutre(authorId: String) {
        // check if the author's PP is already cached
        if let _ = self.communityProfilePictures[authorId] {
//            print("profile picture already cached")
            return
        }
        
        
        // else fetch it from storage and store it
        // Fetch the prompts image from storage
        let imageRef = self.storage.reference().child("profile_pictures/" + authorId + ".jpeg")
        
        Task {
            // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
//            print("calling firestore for profile picture maaan")
            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                if let error = error {
                    print("error downloading profile picture from storage: ", error.localizedDescription)
                    // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                    return
                } else {
                    DispatchQueue.main.async {
                        // Data for image is returned
                        let image = UIImage(data: data!)
                        self.communityProfilePictures[authorId] = image
                    }
                }
            }
        }
    }
    
    func retrieveTopCommunityShorts(blockedUsers: [String : Bool]) {
        self.focusedTopCommunityShorts = []
        
        // make sure a prompt is focused
        if let prompt = self.focusedPrompt {
            // check if the top 3 responses for this prompt are already cached
            if let prompts = self.cachedTopCommunityShorts[prompt.date!] {
                self.focusedTopCommunityShorts = prompts
                return
            } else {
                // Otherwise the shorts are not cached for this prompt, fetch them from FB.
                Task {
                    do {
                        let querySnapshot = try await self.db.collection("shorts").whereField("date", isEqualTo: prompt.date!).order(by: "likeCount", descending: true).limit(to: 3).getDocuments()
                        DispatchQueue.main.async {
                            if querySnapshot.isEmpty {
//                                print("no matching resposnes were found")
                                return
                            }
                            
                            // There will be at most 3 shorts, at least 1
                            for document in querySnapshot.documents {
                                if let short = try? document.data(as: Short.self) {
                                    // Before adding the short, make sure the user isn't blocking the author of one of the shorts (this will result in less than 3 shorts showing up as the top shorts).
                                    if let isBlocked = blockedUsers[short.authorId ?? "0"] {
                                        if isBlocked { continue }
                                    }
                                    
                                    if !self.filterNSFWShorts || (self.filterNSFWShorts && !(short.isNSFW ?? false)) {
                                        self.focusedTopCommunityShorts.append(short)
                                    }
//                                    print("checking if the short has an id: ", short.id ?? "nil id lol")
                                    
                                    // get the profile picture for the author of the short
                                    self.getCommunityAuthorsProfilePicutre(authorId: short.authorId!)
                                } else {
//                                    print("cant cast document to short")
                                }
                            }
                            
                            // Cache the shorts retrieved
                            self.cachedTopCommunityShorts[prompt.date!] = self.focusedTopCommunityShorts
                        }
                        
                    } catch let error {
                        print("error fetching shorts from firestore: ", error.localizedDescription)
                    }
                }
            }
        } else {
//            print("no focused prompt yet")
            return
        }
    }
    
    // Fetches the full list of community shorts for the focused prompt
    func retrieveFullCommunityShorts(blockedUsers: [String : Bool]) {
        if selectedSortingMethod == 0 {
            self.focusedFullCommunityShorts = []
            self.lastDocListShorts = nil
        } else {
            self.focusedFullCommunityShortsByLikeCount = []
            self.lastDocListShortsByLikeCount = nil
        }
        
        // Make sure a prompt is focused
        if let prompt = self.focusedPrompt {
            
            // Check if this prompt's full short list has been cached already
            if selectedSortingMethod == 0 {
                if let prompts = self.cachedFullCommunityShorts[prompt.date!] {
                    self.focusedFullCommunityShorts = prompts
                    // if the shorts are cached, the last Document Snapshot should also be cached
                    if let querySnapshotDoc = self.cachedLastDocListShorts[prompt.date!] {
                        self.lastDocListShorts = querySnapshotDoc
                    }
                    
                    return
                }
            } else {
                if let prompts = self.cachedFullCommunityShortsByLikeCount[prompt.date!] {
                    self.focusedFullCommunityShortsByLikeCount = prompts
                    // if the shorts are cached, the last Document Snapshot should also be cached
                    if let querySnapshotDoc = self.cachedLastDocListShortsByLikeCount[prompt.date!] {
                        self.lastDocListShortsByLikeCount = querySnapshotDoc
                    }
                    return
                }
            }
            
            
//            print("no cache found - full community shorts")
            Task {
                do {
                    let querySnapshot = try await self.db.collection("shorts").whereField("date", isEqualTo: prompt.date!).order(by: self.selectedSortingMethod == 0 ? "rawTimestamp" : "likeCount", descending: true).limit(to: 8).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
                            print("no matching resposnes were found")
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        // There will be at most 8 shorts, at least 1
                        for document in querySnapshot.documents {
                            if let short = try? document.data(as: Short.self) {
                                // Check if the author is being blocked by the user
                                if let isBlocked = blockedUsers[short.authorId!] {
                                    if isBlocked { continue }
                                }
                                
                                if self.selectedSortingMethod == 0 {
                                    // check if user is filtering NSFW shorts
                                    
                                    if !self.filterNSFWShorts || (self.filterNSFWShorts && !(short.isNSFW ?? false)) {
                                        self.focusedFullCommunityShorts.append(short)
                                    }
                                } else {
                                    if !self.filterNSFWShorts || (self.filterNSFWShorts && !(short.isNSFW ?? false)) {
                                        self.focusedFullCommunityShortsByLikeCount.append(short)
                                    }
                                }
                                
                                // get the profile picture for the author of the short
                                self.getCommunityAuthorsProfilePicutre(authorId: short.authorId!)
                            } else {
//                                print("cant cast document to short")
                            }
                        }
                        
                        // get the last document snapshot (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
                            return
                        }
                        
                        if self.selectedSortingMethod == 0 {
                            self.lastDocListShorts = lastSnapshot
                            
                            // then add last doc to the cache
                            self.cachedLastDocListShorts[prompt.date!] = lastSnapshot
                            
                            // Cache the shorts retrieved
                            self.cachedFullCommunityShorts[prompt.date!] = self.focusedFullCommunityShorts
                        } else {
                            self.lastDocListShortsByLikeCount = lastSnapshot
                            
                            // then add last doc to the cache
                            self.cachedLastDocListShortsByLikeCount[prompt.date!] = lastSnapshot
                            
                            // Cache the shorts retrieved
                            self.cachedFullCommunityShortsByLikeCount[prompt.date!] = self.focusedFullCommunityShorts
                        }
                    }
                    
                } catch let error {
                    print("error fetching shorts from firestore: ", error.localizedDescription)
                }
            }
        } else {
//            print("no focused prompt")
        }
    }
    
    func retrieveNextFullCommunityShorts(blockedUsers: [String : Bool]) {
        // Make sure a prompt is focused
        if let prompt = self.focusedPrompt {
            Task {
                do {
                    let querySnapshot = try await self.db.collection("shorts").whereField("date", isEqualTo: prompt.date!).order(by: selectedSortingMethod == 0 ? "rawTimestamp" : "likeCount", descending: true).limit(to: 8).start(afterDocument: selectedSortingMethod == 0 ? self.lastDocListShorts! : self.lastDocListShortsByLikeCount!).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
//                            print("no matching resposnes were found")
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        // There will be at most 8 shorts, at least 1
                        for document in querySnapshot.documents {
                            if let short = try? document.data(as: Short.self) {
                                // Check if the author is being blocked by the user
                                if let isBlocked = blockedUsers[short.authorId!] {
                                    if isBlocked { continue }
                                }
                                
                                
                                if self.selectedSortingMethod == 0{
                                    if !self.filterNSFWShorts || (self.filterNSFWShorts && !(short.isNSFW ?? false)) {
                                        self.focusedFullCommunityShorts.append(short)
                                    }
                                } else {
                                    if !self.filterNSFWShorts || (self.filterNSFWShorts && !(short.isNSFW ?? false)) {
                                        self.focusedFullCommunityShortsByLikeCount.append(short)
                                    }
                                }
                                
                                // get the profile picture for the author of the short
                                self.getCommunityAuthorsProfilePicutre(authorId: short.authorId!)
                            } else {
//                                print("cant cast document to short")
                            }
                        }
                        
                        // get the last document snapshot (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
                            return
                        }
                        
                        if self.selectedSortingMethod == 0 {
                            self.lastDocListShorts = lastSnapshot
                            // then add last doc to the cache
                            self.cachedLastDocListShorts[prompt.date!] = lastSnapshot
                            
                            // Cache the shorts retrieved
                            self.cachedFullCommunityShorts[prompt.date!] = self.focusedFullCommunityShorts
                        } else {
                            self.lastDocListShortsByLikeCount = lastSnapshot
                            // then add last doc to the cache
                            self.cachedLastDocListShortsByLikeCount[prompt.date!] = lastSnapshot
                            
                            // Cache the shorts retrieved
                            self.cachedFullCommunityShortsByLikeCount[prompt.date!] = self.focusedFullCommunityShorts
                        }
                    }
                } catch {
                    print("error getting next shorts: ", error.localizedDescription)
                }
            }
        }
    }
    
    func switchShortSortingMethod(blockedUsers: [String : Bool]) {
        self.areNoShortsLeftToLoad = false
        
        // if no shorts are in the respective list, retrieve the initial one
        if selectedSortingMethod == 0 {
            if focusedFullCommunityShorts.isEmpty {
                retrieveFullCommunityShorts(blockedUsers: blockedUsers)
            }
        } else {
            if focusedFullCommunityShortsByLikeCount.isEmpty {
                retrieveFullCommunityShorts(blockedUsers: blockedUsers)
            }
        }
    }
    
    // TODO : add infinite scroll to this lol fkk
    func retrieveShortComments(refresh: Bool) {
        self.focusedShortComments = []
        
        // make sure a short is focused
        if let short = self.focusedSingleShort {
            // if it's a refresh, skip the cache and retrieve from firestore
            if !refresh {
                // check cache
                if let comments = self.cachedShortComments[short.id!] {
                    self.focusedShortComments = comments
                    if let querySnapshotDoc = self.cachedLastDocComments[short.id!] {
                        self.lastDocComments = querySnapshotDoc
                    }
                    return
                }
            }
            
            Task {
//                print("checking firestore for comments")
                do {
                    let querySnapshot = try await self.db.collection("shortComments").whereField("parentShortId", isEqualTo: short.id!).order(by: "rawTimestamp", descending: true).limit(to: 8).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
//                            print("no matching comments found")
                            self.cachedShortComments[short.id!] = []
                            self.areNoCommentsLeftToLoad = true
                            return
                        }
                        
                        var comments: [ShortComment] = []
                        for document in querySnapshot.documents {
                            if let comment = try? document.data(as: ShortComment.self) {
                                comments.append(comment)
                                self.getCommunityAuthorsProfilePicutre(authorId: comment.authorId!)
                            }
                        }
                        
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
                            return
                        }
                        
                        self.lastDocComments = lastSnapshot
                        self.cachedLastDocComments[short.id!] = lastSnapshot
                        
                        self.focusedShortComments = comments
                        self.cachedShortComments[short.id!] = comments
                    }
                } catch let error {
                    print("error fetching comments: ", error.localizedDescription)
                }
            }
        }
    }
    
    func retrieveNextShortComments() {
        if let short = self.focusedSingleShort {
            Task {
                do {
                    let querySnapshot = try await self.db.collection("shortComments").whereField("parentShortId", isEqualTo: short.id!).order(by: "rawTimestamp", descending: true).limit(to: 8).start(afterDocument: self.lastDocComments!).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
//                            print("no matching comments found")
                            self.areNoCommentsLeftToLoad = true
                            return
                        }
                        
                        var comments: [ShortComment] = []
                        for document in querySnapshot.documents {
                            if let comment = try? document.data(as: ShortComment.self) {
                                comments.append(comment)
                                self.getCommunityAuthorsProfilePicutre(authorId: comment.authorId!)
                            }
                        }
                        
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
                            return
                        }
                        
                        self.lastDocComments = lastSnapshot
                        self.cachedLastDocComments[short.id!] = lastSnapshot
                        
                        for comment in comments {
                            self.focusedShortComments.append(comment)
                        }
                        //                        self.focusedShortComments = comments
                        self.cachedShortComments[short.id!] = self.focusedShortComments
                    }
                } catch let error {
                    print("error fetching next comments: ", error.localizedDescription)
                }
            }
        }
    }
    
    // called when a user clicks on a short preview, opening the full short view
    func focusSingleShort(short: Short, isOwned: Bool) {
//        print("focusing a single short")
        self.focusedSingleShort = nil
        self.focusedSingleShort = short
        self.isFocusedShortOwned = isOwned
        self.retrieveShortComments(refresh: false)
        self.focusAuthor(authorId: short.authorId ?? "1")
    }
    
    func focusAuthor(authorId: String) {
        // Check if the author is already cached
        if let author = self.cachedShortAuthors[authorId] {
            self.focusedShortAuthor = author
            return
        }
        
        // Fetch the author from firestore, store it in the focused author var and cache it
        Task {
            let docRef = self.db.collection("users").document(authorId)
            
            do {
                let author = try await docRef.getDocument(as: User.self)
                
                DispatchQueue.main.async {
                    self.focusedShortAuthor = author
                    self.cachedShortAuthors[authorId] = author
                }
            } catch {
                print(error.localizedDescription)
            }
        }
    }
    
    
    func likePrompt(usersPromptLikes: [String : Bool]) {
        // make sure a prompt is focused
        if let prompt = self.focusedPrompt {
            // Write to Firestore (Prompt - Adding / Subtracting like count)
            Task {
                do {
                    var isLike = true
                    if let like = usersPromptLikes[prompt.date!] {
                        if like == true {isLike = false} else {isLike = true}
                    }
                    
                    let promptRef = db.collection("prompts").document(prompt.date!)
                    try await promptRef.updateData([
                        "likeCount": FieldValue.increment(Int64(isLike ? 1 : -1))
                    ])
                    // Update published vars - prompt
                    DispatchQueue.main.async {
                        
                        var isLikeConcurrent = true
                        if let like = usersPromptLikes[prompt.date!] {
                            if like == true {isLikeConcurrent = false} else {isLikeConcurrent = true}
                        }
                        // Add / Subtract 1 to the focusedPrompt, so it updates on the view
                        self.focusedPrompt?.likeCount! += isLikeConcurrent ? 1 : -1
                    }
                } catch let error {
                    print(error.localizedDescription)
                }
            }
        }
    }
    
    func likeShort(usersShortsLikes: [String : Bool]) {
        // ensure a short is focused
        if let short = self.focusedSingleShort {
            // update short like count in firestore and the local like cache for the shorts like count
            Task {
                do {
                    // determine like or unlike
                    var isLike = true
                    if let like = usersShortsLikes[short.id!] {
                        if like == true {isLike = false} else {isLike = true}
                    }
                    
                    let shortRef = db.collection("shorts").document(short.id!)
                    try await shortRef.updateData([
                        "likeCount": FieldValue.increment(Int64(isLike ? 1 : -1))
                    ])
                    
                    DispatchQueue.main.async {
                        var isLikeConcurrent = true
                        if let like = usersShortsLikes[short.id!] {
                            if like == true {isLikeConcurrent = false} else {isLikeConcurrent = true}
                        }
                        // Add / Subtract 1 to the focusedShort, so it updates on the view
                        self.focusedSingleShort?.likeCount! += isLikeConcurrent ? 1 : -1
                        
                        // update focused top community shorts
                        // find the corresponding short in the array (can be 1 of 3)
                        for topShort in self.focusedTopCommunityShorts {
                            if topShort.id! == short.id! {
                                
                            }
                        }
                        
                        // update the users Shorts too (the user might have liked their own short)
                        if let userShort = self.usersFocusedShort {
                            if userShort.id == short.id! {
                                self.usersFocusedShort!.likeCount! += isLikeConcurrent ? 1 : -1
                            }
                        }
                        
                        // update users cached shorts
                        if let _ = self.cachedUserShorts[short.date!] {
                            self.cachedUserShorts[short.date!]!.likeCount! += isLikeConcurrent ? 1 : -1
                        }
                        
                        
                        // check focusedTopCommunityShorts
                        for i in 0..<self.focusedTopCommunityShorts.count {
                            if self.focusedTopCommunityShorts[i].id == short.id! {
                                self.focusedTopCommunityShorts[i].likeCount! += isLikeConcurrent ? 1 : -1
                                
                                // then update the cache since it exists too
                                if let cachedArrayOfShorts = self.cachedTopCommunityShorts[short.date!] {
                                    for i in 0..<cachedArrayOfShorts.count {
                                        if cachedArrayOfShorts[i].id! == short.id! {
                                            self.cachedTopCommunityShorts[short.date!]![i].likeCount! += isLikeConcurrent ? 1 : -1
                                        }
                                    }
                                }
                            }
                        }
                        
                        // check focusedFullCommunityShorts
                        for i in 0..<self.focusedFullCommunityShorts.count {
                            if self.focusedFullCommunityShorts[i].id == short.id! {
                                self.focusedFullCommunityShorts[i].likeCount! += isLikeConcurrent ? 1 : -1
                                
                                // then update the cache since it exists too
                                if let cachedArrayOfShorts = self.cachedFullCommunityShorts[short.date!] {
                                    for i in 0..<cachedArrayOfShorts.count {
                                        if cachedArrayOfShorts[i].id! == short.id! {
                                            self.cachedFullCommunityShorts[short.date!]![i].likeCount! += isLikeConcurrent ? 1 : -1
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                } catch let error {
                    print(error.localizedDescription)
                }
            }
            
            // send a like to the author's profile (don't send dislikes)
            Task {
                var isLike = true
                if let like = usersShortsLikes[short.id!] {
                    if like == true {isLike = false} else {isLike = true}
                }
                
                if !isLike { return }
                
                guard let author = self.focusedShortAuthor else { return }
                
                let authorRef = db.collection("users").document(author.id!)
                authorRef.updateData([
                    "numLikes": FieldValue.increment(Int64(1))
                ])
                
            }
        }
    }
    
    func submitComment(user: User) {
        // if the comment text is empty, do nothing
        if self.commentText.isEmpty { return }
        
        if let short = self.focusedSingleShort {
            let shortComment = ShortComment(parentShortId: short.id!, rawTimestamp: Timestamp(), authorId: user.id, authorFirstName: user.firstName, authorLastName: user.lastName, authorProfilePictureUrl: user.profilePictureUrl, commentRawText: self.commentText)
            
            Task {
                // write the short comment to firestore
                do {
                    try db.collection("shortComments").addDocument(from: shortComment)
//                    print("short Comment written to firestore")
                } catch let error {
                    print("error writing comment to firestore: ", error.localizedDescription)
                }
                
                // update the short comment count
                do {
                    let shortRef = db.collection("shorts").document(short.id!)
                    try await shortRef.updateData([
                        "commentCount": FieldValue.increment(Int64(1))
                    ])
                } catch let error {
                    print("error updating short comment count: ", error.localizedDescription)
                }
                
                // refresh the comment list for focused short
                DispatchQueue.main.async {
                    self.retrieveShortComments(refresh: true)
                    self.commentText = ""
                    self.isCreateCommentSheetShowing = false
                }
            }
        }
    }
    
    func clearShortOnSignOut() {
        self.usersFocusedShort = nil
        self.cachedUserShorts = [:]
    }
    
    func reportPrompt(reportReason: String) {
        // ensure a user is authd
        if let user = Auth.auth().currentUser {
            // ensure a prompt is focused
            if self.focusedPrompt == nil { return }
            
            // Else write the following info in a document into firestore
            // Prompt date
            // Report reason
            // Reporting user id
            // Date(timestamp) of report
            
            let promptDate: String = (self.focusedPrompt?.date!)!
            let reportingUserId = user.uid
            let date = Timestamp()
            
            Task {
                do {
                    let ref = try await db.collection("promptReports").addDocument(data: [
                        "promptDate": promptDate,
                        "reportReason": reportReason,
                        "reportingUserId": reportingUserId,
                        "date": date
                    ])
                    print("prompt report successfuly filed into firestore: ", ref.documentID)
                } catch {
                    print(error.localizedDescription)
                }
            }
        } else {
            print("no auth")
        }
    }
    
    func reportShort(reportReason: String) {
        // ensure a user is authd
        if let user = Auth.auth().currentUser {
            // ensure a short is focused
            if self.focusedSingleShort == nil {
                return
            }
            
            // Write the following info into a document into firestore
            // Short Id
            // Report Reason
            // Reporting user id
            // Date(timestamp) of report
            
            let focusedShortId : String = (self.focusedSingleShort?.id!)!
            let reportingUserId = user.uid
            let date = Timestamp()
            
            Task {
                do {
                    let ref = try await db.collection("shortReports").addDocument(data: [
                        "shortId": focusedShortId,
                        "reportReason": reportReason,
                        "reportingUserId": reportingUserId,
                        "date": date
                    ])
//                    print("short report successfuly filed into firestore: ", ref.documentID)
                } catch {
                    print(error.localizedDescription)
                }
            }
        } else {
//            print("no auth")
        }
    }
    
    func reportComment(reportReason: String, commentId: String) {
        // ensure a user is authd
        if let user = Auth.auth().currentUser {
            
            // Write the following info into a document into firestore
            // Comment Id
            // Report Reason
            // Reporting user id
            // Date(timestamp) of report
            
            let reportingUserId = user.uid
            let date = Timestamp()
            
            Task {
                do {
                    let ref = try await db.collection("commentReports").addDocument(data: [
                        "commentId": commentId,
                        "reportReason": reportReason,
                        "reportingUserId": reportingUserId,
                        "date": date
                    ])
                    print("comment report successfuly filed into firestore: ", ref.documentID)
                } catch {
                    print(error.localizedDescription)
                }
            }
        } else {
//            print("no auth")
        }
    }
    
    
    func convertTitleIntToString(int : Int) -> String {
        switch int {
        case 0:
            return "Pupil"
        case 1:
            return "Novice Author"
        case 2:
            return "Storyteller"
        case 3:
            return "Scribe"
        case 4:
            return "Seasoned Wordsmith"
        case 5:
            return "Accomplished Novelist"
        case 6:
            return "Renowned Author"
        case 7:
            return "Literary Master"
        default:
            return ""
        }
    }
    
    // Call this function when you need to reload a user short which is updated or deleted.
    func clearEditedOrRemovedShortFromCache(shortDate: String) {
        if let removedValue = self.cachedUserShorts.removeValue(forKey: shortDate) {
            print("Removed value: \\(removedValue)")
        } else {
//            print("Key not found")
        }
    }
    
    // limits the number of characters you can write when editing your short (2500 characters)
    func limitCommentTextLength(_ upper: Int) {
        if self.commentText.count > upper {
            self.commentText = String(self.commentText.prefix(upper))
        }
    }
    
    
    
    // Adds community shorts to the focused Prompt (For testing)
    // For now they are hardcoded, but eventually will be openAI response.
    func addCommunityShorts() {
        // Ensure a prompt is focused
        if let prompt = self.focusedPrompt {
            // Generate 3 responses (2500 characters) based off the prompt
            Task {
                let responses = try await getShortText(promptText: prompt.promptRawText!)
                
                // Build a couple of short objects
                let short1 = Short(date: prompt.date!, rawTimestamp: Timestamp(date: Date() - Double.random(in: 1...1000)), authorId: "NfoTqlNKlqsZmObbP90z", authorFirstName: "Writing Inspiration", authorLastName: "Bot - Georgie", authorProfilePictureUrl: "asdasd", authorNumShorts: 1, authorNumLikes: 1, promptRawText: prompt.promptRawText!, shortRawText: responses[0], likeCount: 1, commentCount: 0)
                
                let short2 = Short(date: prompt.date!, rawTimestamp: Timestamp(date: Date() - Double.random(in: 1...1000)), authorId: "S0mE0rS3RfSY2O21Yyk9", authorFirstName: "Writing Inspiration", authorLastName: "Bot - Marco", authorProfilePictureUrl: "asdasd", authorNumShorts: 32, authorNumLikes: 12, promptRawText: prompt.promptRawText!, shortRawText: responses[1], likeCount: 1, commentCount: 0)
                
                let short3 = Short(date: prompt.date!, rawTimestamp: Timestamp(date: Date() - Double.random(in: 1...1000)), authorId: "pWXYaNd6cAsAM9GxpsN8", authorFirstName: "Writing Inspiration", authorLastName: "Bot - Slo", authorProfilePictureUrl: "asdasd", authorNumShorts: 1, authorNumLikes: 1, promptRawText: prompt.promptRawText!, shortRawText: responses[2], likeCount: 1, commentCount: 0)
                
                let shorts = [short1, short2, short3]
                
                // Write all three shorts to firestore
                for short in shorts {
                    // Write the short to firebase
                    do {
                        try db.collection("shorts").addDocument(from: short)
                        print("short written to firestore")
                    } catch let error {
                        print("error writign short to firestore: ", error.localizedDescription)
                    }
                    
                    // Update the prompt response count
                    do {
                        let promptRef = db.collection("prompts").document(prompt.date!)
                        try await promptRef.updateData([
                            "shortCount": FieldValue.increment(Int64(1))
                        ])
                        print("shortCount updated +1")
                    } catch let error {
                        print("error updating short count on prompt: ", error.localizedDescription)
                    }
                }
            }
        } else {
//            print("no focused prompt")
        }
    }
    
    func getShortText(promptText: String) async throws -> [String] {
        let dialogueResponsePrompt = "Write a 2500 character response to the following creative writing prompt, focusing on character dialogue: \\(promptText)"
        let imageryResponse = "Write a 2500 character response to the following creative writing prompt, focusing on imagery: \\(promptText)"
        let plotResponse = "Write a 2500 character response to the following creative writing prompt, focusing on creating an intriciate and complex plot: \\(promptText)"
        
        
        let query1 = ChatQuery(messages: [.init(role: .user, content: dialogueResponsePrompt)!], model: .gpt4_o_mini, maxTokens: 650)
        let query2 = ChatQuery(messages: [.init(role: .user, content: imageryResponse)!], model: .gpt4_o_mini, maxTokens: 650)
        let query3 = ChatQuery(messages: [.init(role: .user, content: plotResponse)!], model: .gpt4_o_mini, maxTokens: 650)
        
        var responses: [String] = []
        // query 1
        do {
            let result = try await openAI.chats(query: query1)
            let content = result.choices.first?.message.content?.string
            
            // Split the string by comma, then convert to double
            
            responses.append(content!)
        }
        // query 2
        do {
            let result = try await openAI.chats(query: query2)
            let content = result.choices.first?.message.content?.string
            
            // Split the string by comma, then convert to double
            
            responses.append(content!)
        }
        
        // query 3
        do {
            let result = try await openAI.chats(query: query3)
            let content = result.choices.first?.message.content?.string
            
            // Split the string by comma, then convert to double
            
            responses.append(content!)
        }
        return responses
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'LocalNotificationController.swift',
                        path: 'Writing/Controllers/LocalNotificationController.swift',
                        type: 'file',
                        content: `//
//  LocalNotificationController.swift
//  Writing
//
//  Created by Ben Dreyer on 7/28/24.
//

import Foundation
import NotificationCenter
import SwiftUI

@MainActor
class LocalNotificationController : NSObject, ObservableObject, UNUserNotificationCenterDelegate {
    @AppStorage("notificationTimeOfDay") private var notificationTimeOfDay = ""
    
    
    let notificationCenter = UNUserNotificationCenter.current()
    
    // Are notifications granted by the user on device for the app
    @Published var isGranted = false
    
    // Are notifications enabled for the app.
    @Published var areNotificationsEnabled: Bool = true
    
    @Published var selectedCadence: Cadence = .daily
    // Time of day notification fires
    @Published var timeOfDay = Date()
    // If notification fires once a week, which day it will fire
    @Published var dayOfWeek: DayOfWeek = .monday
    
    @Published var pendingRequests: [UNNotificationRequest] = []
    
    
    private let dateFormatter: DateFormatter = {
            let formatter = DateFormatter()
            formatter.dateStyle = .medium
            formatter.timeStyle = .medium
            return formatter
        }()
    
    // messages to put in the notifications
    var notificationMessages = ["Time to write! Open to see your latest prompt", "Today's prompt is ready for you!", "Have you written yet today?", "New prompt alert, get in here and start your flow", "It's time! Get those writing juices flowing"]
    
    override init() {
        super.init()
        notificationCenter.delegate = self
        
        self.timeOfDay = dateFormatter.date(from: notificationTimeOfDay) ?? Date()
        enableNotifications()
    }
    
    func enableNotifications() {
        Task {
            await getPendingRequests()
            
            if pendingRequests.isEmpty {
                // If this is the first time the app is loading the controller, and no notification has been scheduled yet. Then we should schedule one based on the default settings (Daily, 12 noon)
//                print("no pending notification requests, we are going to schedule one based on the selected settings")
                
                // build the date component based on the settings
                var dateComponents = DateComponents()
                
                
                let calendar = Calendar.current
                let hour = calendar.component(.hour, from: self.timeOfDay)
                let minute = calendar.component(.minute, from: self.timeOfDay)
                
                dateComponents.hour = hour
                dateComponents.minute = minute
                
                // schedule the notification
                let localNotification = LocalNotification(identifier: UUID().uuidString,
                                                          title: "The Daily Short",
                                                          body: notificationMessages.randomElement() ?? "",
                                                          dateComponents: dateComponents,
                                                          repeats: true)
                await self.schedule(localNotification: localNotification)
            } else {
//                print("a notification is already scheduled")
            }
        }
    }
    
    // the function which updates the notification to be sent next
    // called in the view when any of the following variables change:
    // - selectedCadence, timeOfDay, dayOfWeek
    func updateNotificationSettings() {
//        print("notif settings got updated")
        disableNotifications()
        
        // update the AppStorage String Date
        let dateString = dateFormatter.string(from: timeOfDay)
//        print("new timeOfDay: ", dateString)
        notificationTimeOfDay = dateString
        self.timeOfDay = dateFormatter.date(from: notificationTimeOfDay) ?? Date()
        
        
        // re-enable notification with new settings
        enableNotifications()
    }
    
    func disableNotifications() {
        notificationCenter.removeAllPendingNotificationRequests()
        Task {
           await getPendingRequests()
        }
    }
    
    // Delegate function
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification) async -> UNNotificationPresentationOptions {
        await getPendingRequests()
        return [.sound, .banner]
    }
    
    func requestAuthorization() async throws {
        try await notificationCenter.requestAuthorization(options: [.sound, .badge, .alert])
        
        await getCurrentSetting()
    }
    
    func getCurrentSetting() async {
        let currentSettings = await notificationCenter.notificationSettings()
        isGranted = (currentSettings.authorizationStatus == .authorized)
    }
    
    func openSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) {
            if UIApplication.shared.canOpenURL(url) {
                Task {
                    await UIApplication.shared.open(url)
                }
            }
        }
    }
    
    func schedule(localNotification: LocalNotification) async {
        let content = UNMutableNotificationContent()
        content.title = localNotification.title
        content.body = localNotification.body
        content.sound = .default
        
        if localNotification.scheduleType == .time {
            guard let timeInterval = localNotification.timeInterval else { return }
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: timeInterval, repeats: localNotification.repeats)
            let request = UNNotificationRequest(identifier: localNotification.identifier, content: content, trigger: trigger)
            try? await notificationCenter.add(request)
        } else {
            guard let dateComponents = localNotification.dateComponents else { return }
            let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: localNotification.repeats)
            let request = UNNotificationRequest(identifier: localNotification.identifier, content: content, trigger: trigger)
            try? await notificationCenter.add(request)
        }
        await getPendingRequests()
    }
    
    func getPendingRequests() async {
        pendingRequests = await notificationCenter.pendingNotificationRequests()
//        print("Pending: \\(pendingRequests.count)")
    }
    
    func removeRequest(withIdentifier identifier: String) {
        notificationCenter.removePendingNotificationRequests(withIdentifiers: [identifier])
        if let index = pendingRequests.firstIndex(where: {$0.identifier == identifier}) {
            pendingRequests.remove(at: index)
//            print("Pending: \\(pendingRequests.count)")
        }
    }
}


enum Cadence: String, CaseIterable, Identifiable {
    case daily, weekly
    var id: Self { self }
}

enum DayOfWeek: String, CaseIterable, Identifiable {
    case monday, tuesday, wednesday, thursday, friday, saturday, sunday
    var id: Self { self }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ProfileController.swift',
                        path: 'Writing/Controllers/ProfileController.swift',
                        type: 'file',
                        content: `//
//  ProfileController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/15/24.
//

import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import Foundation
import PhotosUI
import SwiftUI

class ProfileController : ObservableObject {
    
    // Sorted by date written (default)
    @Published var shorts: [Short] = []
    
    // Sorted by Like Count
    @Published var shortsByLikeCount: [Short] = []
    
    // Sorted by Prompt Date
    @Published var shortsByPromptDate: [Short] = []
    
    // Sorting method (0 = byDateWritten, 1 = byLikeCount, 2 = byPromptDate)
    @Published var shortsSortingMethod: Int = 0
    
    // Used to display in rows of three in the view (grid)
    var chunksOfShorts: [ArrayOfShort] = []
    @Published var promptImages: [String : UIImage] = [:]
    
    @Published var focusedShort: Short?
    
    @Published var newShortText: String = ""
    let characterLimit = 2500
    
    // Changing profile picture vars
    @Published var data: Data?
    @Published var selectedItem: [PhotosPickerItem] = []
    
    // Prompt suggestion
    @Published var suggestedPromptText: String = ""
    
    // TODO(ordering) : figure out how to retrieve prompts based on what ordering is going on
    
    // Pagination - Sorted by date written
    @Published var lastDoc: QueryDocumentSnapshot?
    
    // Pagination - Sorted by like count
    @Published var lastDocByLikeCount: QueryDocumentSnapshot?
    
    // Pagination - Sorted by prompt date
    @Published var lastDocByPromptDate: QueryDocumentSnapshot?
    
    // vars that control the view
    @Published var isSignUpViewShowing: Bool = false
    @Published var isSettingsShowing: Bool = false
    @Published var showSidebar: Bool = false
    @Published var isConfirmShortDelteAlertShowing: Bool = false
    
    @Published var isFocusedShortSheetShowing: Bool = false
    @Published var isChangeNameAlertShowing: Bool = false
    @Published var isChangePhotoSheetShowing: Bool = false
    @Published var areNoShortsLeftToLoad: Bool = false
    
    @Published var contributions: [Int] = []
    @Published var contributionCount: Int = 0
    
    // Firebase
    let db = Firestore.firestore()
    let storage = Storage.storage()
    
    init() {
//        print("init profile controller")
        retrieveShorts()
    }
    
    // Retrieves shorts the user has written, to be displayed on their profile
    func retrieveShorts() {
        self.shorts = []
        self.chunksOfShorts = []
        
        if let user = Auth.auth().currentUser {
            // Lookup firestore shorts collection that match userId
            Task {
                do {
                    
                    let query: Query
                    
                    if shortsSortingMethod == 0 {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "rawTimestamp", descending: true)
                    } else if shortsSortingMethod == 1 {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "likeCount", descending: true)
                    } else {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "date", descending: true)
                    }
                    
                    let querySnapshot = try await query.limit(to: 9).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
//                            print("no shorts returned")
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        for document in querySnapshot.documents {
                            if let short = try? document.data(as: Short.self) {
                                // add the short to the local array, and fetch it's prompt and picture
                                self.retrievePromptImage(date: short.date!)
//                                print("profile - appended short to list")
                                
                                if self.shortsSortingMethod == 0 {
                                    self.shorts.append(short)
                                } else if self.shortsSortingMethod == 1 {
                                    self.shortsByLikeCount.append(short)
                                } else {
                                    self.shortsByPromptDate.append(short)
                                }
                                
                            }
                        }
                        
                        // get the last doc (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
//                            print("error getting the last document snapshot")
                            return
                        }
                        
                        if self.shortsSortingMethod == 0 {
                            self.lastDoc = lastSnapshot
                        } else if self.shortsSortingMethod == 1 {
                            self.lastDocByLikeCount = lastSnapshot
                        } else {
                            self.lastDocByPromptDate = lastSnapshot
                        }
                        
                        
                        self.resetChunks()
                    }
                } catch let error {
                    print("error retrieving the user's shorts: ", error.localizedDescription)
                }
            }
        } else {
//            print("no auth user yet.")
        }
    }
    
    // the function to call when loading the next N shrots on the profile
    func retrieveNextShorts() {
        if let user = Auth.auth().currentUser {
            Task {
                do {
                    
                    let query: Query
                    let lastDoc: QueryDocumentSnapshot
                    
                    if shortsSortingMethod == 0 {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "rawTimestamp", descending: true)
                        lastDoc = self.lastDoc!
                    } else if shortsSortingMethod == 1 {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "likeCount", descending: true)
                        lastDoc = self.lastDocByLikeCount!
                    } else {
                        query = db.collection("shorts").whereField("authorId", isEqualTo: user.uid).order(by: "date", descending: true)
                        lastDoc = self.lastDocByPromptDate!
                    }
                    
                    
                    let querySnapshot = try await query.limit(to: 9).start(afterDocument: lastDoc).getDocuments()
                    
                    DispatchQueue.main.async {
                        if querySnapshot.isEmpty {
                            self.areNoShortsLeftToLoad = true
                            return
                        }
                        
                        for document in querySnapshot.documents {
                            if let short = try? document.data(as: Short.self) {
                                // add the short to the local array, and fetch it's prompt and picture
                                self.retrievePromptImage(date: short.date!)
//                                print("profile - appended short to list")
                                
                                if self.shortsSortingMethod == 0 {
                                    self.shorts.append(short)
                                } else if self.shortsSortingMethod == 1 {
                                    self.shortsByLikeCount.append(short)
                                } else {
                                    self.shortsByPromptDate.append(short)
                                }
                            }
                        }
                        
                        // get the last doc (for pagination)
                        guard let lastSnapshot = querySnapshot.documents.last else {
                            // The collection is empty.
//                            print("error getting the last document snapshot")
                            return
                        }
                        
                        if self.shortsSortingMethod == 0 {
                            self.lastDoc = lastSnapshot
                        } else if self.shortsSortingMethod == 1 {
                            self.lastDocByLikeCount = lastSnapshot
                        } else {
                            self.lastDocByPromptDate = lastSnapshot
                        }
                        
                        
                        self.resetChunks()
                    }
                } catch let error {
                    print("error retrieving the user's shorts: ", error.localizedDescription)
                }
            }
        }
    }
    
    func switchSortingMethod() {
        self.areNoShortsLeftToLoad = false
        
        // the var should already be set.
//        print("switching sorting method")
        
        if shortsSortingMethod == 0 {
            if shorts.isEmpty {
                retrieveShorts()
            } else {
                resetChunks()
            }
        } else if shortsSortingMethod == 1 {
            if shortsByLikeCount.isEmpty {
                retrieveShorts()
            } else {
                resetChunks()
            }
        } else if shortsSortingMethod == 2 {
            if shortsByPromptDate.isEmpty {
                retrieveShorts()
            } else {
                resetChunks()
            }
        }
    }
    
    func resetChunks() {
        // clear the chunks
        self.chunksOfShorts = []
        
        var chunks: [[Short]] = []
        if self.shortsSortingMethod == 0 {
            chunks = self.shorts.chunked(into: 3)
        } else if self.shortsSortingMethod == 1 {
            chunks = self.shortsByLikeCount.chunked(into: 3)
        } else {
            chunks = self.shortsByPromptDate.chunked(into: 3)
        }
        
//                        let chunks = self.shorts.chunked(into: 3)
        for chunk in chunks {
            let arrayofShort = ArrayOfShort(shorts: chunk)
            self.chunksOfShorts.append(arrayofShort)
        }
    }
    
    func retrievePromptImage(date: String) {
        // check if the image is already in the cache / map
        if let _ = self.promptImages[date] {
//            print("image already cached")
            return
        }
        
        // TODO: share the image cache from the home controller in this function, and return the image there. Can avoid some extra storage calls
        

        // Fetch image from firestore
        Task {
            // Fetch the prompts image from storage
            let imageRef = self.storage.reference().child("prompts/" + date + ".jpeg")
            
            // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                if let error = error {
                    print("error downloading image from storage: ", error.localizedDescription)
                    // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                    return
                } else {
                    // Data for image is returned
                    let image = UIImage(data: data!)
                    // Add image to cache
                    self.promptImages[date] = image
                }
            }
        }
    }
    
    func focusShort(short: Short) {
        self.focusedShort = nil
        self.focusedShort = short
        self.isFocusedShortSheetShowing = true
    }
    
    // Update the focused short to the new text stored in this controller
    func editShort() {
        // make sure a short is focused
        if let short = self.focusedShort {
            // Make sure the text has changed
            if self.newShortText == short.shortRawText! {
//                print("the text didn't change at all")
                return
            }
            
            // Check text length
            if self.newShortText.count == 0 {
//                print("new short text is empty")
                return
            }
            
            // Else update Firestore
            Task {
                let docRef = db.collection("shorts").document(short.id!)
                
                do {
                    try await docRef.updateData([
                        "shortRawText": self.newShortText
                    ])
//                    print("changed text")
                } catch let error {
                    print("error updating short: ", error.localizedDescription)
                }
                
                DispatchQueue.main.async {
                    // Refresh the shorts stored on profile
                    self.retrieveShorts()
                    // close the views
                    self.isFocusedShortSheetShowing = false
                    // nil the focused short
                    self.focusedShort = nil
                }
            }
        }
    }
    
    // use this function to display a short's prompt's date in the profile view.
    func convertDateString(intDateString: String) -> String {
        // Step 1: Create a DateFormatter for the input format
        let inputFormatter = DateFormatter()
        inputFormatter.dateFormat = "yyyyMMdd"
        
        // Step 2: Convert the input string to a Date object
        guard let date = inputFormatter.date(from: intDateString) else {
            return ""
        }
        
        // Step 3: Create a DateFormatter for the output format
        let outputFormatter = DateFormatter()
        outputFormatter.dateFormat = "MMMM d"
        
        // Step 4: Format the date to the desired output string
        let formattedDate = outputFormatter.string(from: date)
        
        // Step 5: Add the ordinal suffix
        let day = Calendar.current.component(.day, from: date)
        let suffix: String
        switch day {
        case 11, 12, 13:
            suffix = "th"
        default:
            switch day % 10 {
            case 1:
                suffix = "st"
            case 2:
                suffix = "nd"
            case 3:
                suffix = "rd"
            default:
                suffix = "th"
            }
        }
        
        // Step 6: Append the suffix and year
        let yearFormatter = DateFormatter()
        yearFormatter.dateFormat = "yyyy"
        let year = yearFormatter.string(from: date)
        
        return "\\(formattedDate)\\(suffix), \\(year)"
    }
    
    // Either sort the shorts by date or by likeCount
//    func sortShorts(byDateWritten: Bool, byNumLikes: Bool, byPromptDate: Bool) {
//        
//        // set the bool (controls view dropdown text)
//        
//        // clear the chunks
//        self.chunksOfShorts = []
//        // sort by date
//        if byDateWritten {
//            self.shortsSortingMethod = 0
//            // Sort by timestamp (converted to date)
//            self.shorts = self.shorts.sorted(by: {$0.rawTimestamp!.dateValue() > $1.rawTimestamp!.dateValue()} )
//        }
//        
//        // sort by like count
//        if byNumLikes {
//            self.shortsSortingMethod = 1
//            self.shorts = self.shorts.sorted(by: {$0.likeCount! > $1.likeCount! })
//        }
//        
//        // sort by prompt date
//        if byPromptDate {
//            self.shortsSortingMethod = 2
//            self.shorts = self.shorts.sorted(by: {$0.date! > $1.date! })
//        }
//        
//        // rebuild the chunks
//        let chunks = self.shorts.chunked(into: 3)
//        for chunk in chunks {
//            let arrayofShort = ArrayOfShort(shorts: chunk)
//            self.chunksOfShorts.append(arrayofShort)
//        }
//    }
    
    func submitPromptSuggestion(user: User) {
        if self.suggestedPromptText.isEmpty { return }
        
        Task {
            let promptSuggestion = PromptSuggestion(authorId: user.id!, authorFirstName: user.firstName!, authorLastName: user.lastName!, rawText: self.suggestedPromptText)
            
            do {
                try db.collection("promptSuggestions").addDocument(from: promptSuggestion)
//                print("prompt suggestion written")
                
                DispatchQueue.main.async {
                    self.suggestedPromptText = ""
                }
            } catch let error {
                print("error uploading prompt suggestion: ", error.localizedDescription)
            }
        }
    }
    
    func clearShorts() {
        self.shorts = []
        self.chunksOfShorts = []
    }
    
    func deleteShort() {
        // Ensure user is authd
        if let user = Auth.auth().currentUser {
            // Ensure a short is focused
            if let short = self.focusedShort {
                // Remove the document from firestore
                Task {
                    do {
                        try await db.collection("shorts").document(short.id!).delete()
//                        print("short successfully removed!")
                    } catch let error {
                        print("error deleting from firestore: ", error.localizedDescription)
                    }
                }
                
                // Update the user stats
                Task {
                    do {
                        let docRef = db.collection("users").document(user.uid)
                        docRef.updateData([
                            "shortsCount": FieldValue.increment(Int64(-1)),
                            "numLikes": FieldValue.increment(Int64(0 - (short.likeCount ?? 0)))
                        ])
//                        print("updated stats for user")
                        
                        DispatchQueue.main.async {
                            // Clear the controller vars
                            self.focusedShort = nil
                            self.isFocusedShortSheetShowing = false
                        }
                    }
                }
            }
        }
    }
    
    func generateContributions(user: User) {
        self.contributions = []
        self.contributionCount = 0
        
        if let contributions = user.contributions {
            var dates: [String] = []
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyyMMdd"
            
            let calendar = Calendar.current
            let today = Date()
            
            for i in 0..<88 {
                if let date = calendar.date(byAdding: .day, value: -i, to: today) {
                    let dateString = dateFormatter.string(from: date)
                    dates.append(dateString)
                }
            }
            
            for date in dates {
                // cross check if the date has a write on it from the user
                if let didUserWrite = contributions[date] {
                    if didUserWrite {
                        self.contributions.append(Int(1))
                        self.contributionCount += 1
                    } else {
                        self.contributions.append(Int(0))
                    }
                } else {
                    self.contributions.append(Int(0))
                }
            }
        } else {
//            print("no contributions?")
        }
    }
    
    func limitTextLengthSuggestedPrompt(_ upper: Int) {
        if self.suggestedPromptText.count > upper {
            self.suggestedPromptText = String(self.suggestedPromptText.prefix(upper))
        }
    }
    
    // limits the number of characters you can write when editing your short (2500 characters)
    func limitTextLength(_ upper: Int) {
        if self.newShortText.count > upper {
            self.newShortText = String(self.newShortText.prefix(upper))
        }
    }
    
    func convertTitleIntToString(int : Int) -> String {
        switch int {
        case 0:
            return "Pupil"
        case 1:
            return "Novice Author"
        case 2:
            return "Storyteller"
        case 3:
            return "Scribe"
        case 4:
            return "Seasoned Wordsmith"
        case 5:
            return "Accomplished Novelist"
        case 6:
            return "Renowned Author"
        case 7:
            return "Literary Master"
        default:
            return ""
        }
    }
    
    func getNextTitleCriteria(curLevel: Int, numShorts: Int) -> String {
        var totalShortsNeeded = 0
        switch curLevel {
        case 0:
            totalShortsNeeded = 1
        case 1:
            totalShortsNeeded = 5
        case 2:
            totalShortsNeeded = 10
        case 3:
            totalShortsNeeded = 25
        case 4:
            totalShortsNeeded = 50
        case 5:
            totalShortsNeeded = 100
        case 6:
            totalShortsNeeded = 200
        case 7:
            totalShortsNeeded = 300
        default:
            return ""
        }
        
        return "\\(numShorts) / \\(totalShortsNeeded) Shorts Written"
    }
    
}


extension Array {
    func chunked(into size: Int) -> [[Element]] {
        return stride(from: 0, to: count, by: size).map {
            Array(self[$0 ..< Swift.min($0 + size, count)])
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ShortAnalysisController.swift',
                        path: 'Writing/Controllers/ShortAnalysisController.swift',
                        type: 'file',
                        content: `//
//  ShortAnalysisController.swift
//  Writing
//
//  Created by Ben Dreyer on 7/13/24.
//

import FirebaseFirestore
import Foundation
import OpenAI
import SwiftUI

// The class which controlls the AI analysis for shorts
class ShortAnalysisController : ObservableObject {
    
    @Published var focusedShortAnalysis: ShortAnalysis?
    // cached analysis'
    var cachedShortAnalysis: [String : ShortAnalysis] = [:]
    
    
    // vars controlling the view
    @Published var isLoadingAnalysis: Bool = false
    @Published var isErrorLoadingAnalysis: Bool = false
    @Published var isAnalysisHelpPopoverShowing: Bool = false
    @Published var isConfirmCreateAnalysisAlertShowing: Bool = false
    
    
    // OpenAI Config
    let openAI = OpenAI(configuration: OpenAI.Configuration(token: Secrets().openAIKey, timeoutInterval: 60.0))
    
    // Firestore
    let db = Firestore.firestore()
    
    init() {
//        self.isLoadingAnalysis = true
    }
    
    // attempt to retrieve an analysis when you visit the corresponding view (may return nothing)
    func retrieveAnalysis(shortId: String) {
        // if the shortId is in the cache already, just focus it
        if let analysis = self.cachedShortAnalysis[shortId] {
            self.focusedShortAnalysis = analysis
            return
        }
        
        Task {
            do {
                let querySnapshot = try await db.collection("shortAnalysis").whereField("shortId", isEqualTo: shortId).getDocuments()
                
                DispatchQueue.main.async {
                    if querySnapshot.isEmpty {
//                        print("no shorts returned, setting loading to false")
                        self.isLoadingAnalysis = false
                        return
                    }
                    
                    for document in querySnapshot.documents {
                        if let analysis = try? document.data(as: ShortAnalysis.self) {
                            self.focusedShortAnalysis = analysis
                            self.cachedShortAnalysis[analysis.id!] = analysis
                            self.isLoadingAnalysis = false
                        }
                        // we can break, this query will only return one result
                        break
                    }
                }
            } catch let error {
                print(error.localizedDescription)
            }
        }
    }
    
    // create analysis
    func createAnalysis(user: User, short: Short) {
        // Create a ShortAnalysis object and write it into firestore.
        self.isLoadingAnalysis = true
        
        Task {
            // Get writing scores
            do {
                let writingScores = try await getWritingScores(short: short)
                
//                print("writing score is: ", writingScores)
                let proseScore = writingScores[0]
                let imageryScore = writingScores[1]
                let flowScore = writingScores[2]
                
                do {
                    let textAnalysis = try await getTextAnalysis(short: short)
                    
                    // Create overall score (average the 3)
                    let overallScore = (proseScore + imageryScore + flowScore) / 3.0
                    
                    // Create the model object
                    let shortAnalysis = ShortAnalysis(shortId: short.id!, authorId: user.id!, proseScore: proseScore, imageryScore: imageryScore, flowScore: flowScore, score: overallScore, content: textAnalysis)
                    
                    // Write the Free Write to Firestore
                    do {
                        try db.collection("shortAnalysis").addDocument(from: shortAnalysis)
//                        print("short analysis written to firestore")
                        
                        
                        // Get the new writing average for the user
                        // cur_average passed as arg
                        let curAvg = Double(user.avgWritingScore!)
                        // num analysis passed as arg
                        let numAnalysis = Double(user.numAnalysisGenerated!)
                        
                        let newAvg = ((curAvg * numAnalysis) + overallScore) / (numAnalysis + 1)
                        
                        // Write new writing avg to the user's page.
                        do {
                            let userRef = db.collection("users").document(user.id!)
                            try await userRef.updateData([
                                "avgWritingScore": newAvg,
                                "numAnalysisGenerated": (numAnalysis+1)
                            ])
                            
                            // Update View Controller variables
                            DispatchQueue.main.async {
                                self.isLoadingAnalysis = false
                                
                                // focus the newly created analysis
                                self.focusedShortAnalysis = shortAnalysis
                                // add it to the cache too
                                self.cachedShortAnalysis[short.id!] = shortAnalysis
                            }
                        } catch let error {
                            print("error updating user stats: ", error.localizedDescription)
                            isErrorLoadingAnalysis = true
                        }
                    } catch let error {
                        print("error writing new short analysis to firestore: ", error.localizedDescription)
                        isErrorLoadingAnalysis = true
                    }
                } catch {
                    print("error getting text analysis: ", error.localizedDescription)
                    isErrorLoadingAnalysis = true
                }
                
            } catch {
                print("error getting writing scores: ", error.localizedDescription)
                isErrorLoadingAnalysis = true
            }
        }
    }
    
    func getWritingScores(short: Short) async throws -> [Double] {
        let openAIPrompt = "Give me three scores out of 10 (example: 8.5) for the following piece of writing based on its prose, imagery and flow respectively. Only respond with the numbers separated by a space, with no period: \\n \\(short.shortRawText!)"
        
        let query = ChatQuery(messages: [.init(role: .user, content: openAIPrompt)!], model: .gpt4_o_mini, maxTokens: 10)
        do {
            let result = try await openAI.chats(query: query)
            let content = result.choices.first?.message.content?.string
            
            // Split the string by comma, then convert to double
            
//            print("the string we get from openAI: ", content!)
            let splitArray = content!.components(separatedBy: " ")
            let doubleArray = splitArray.compactMap { Double($0) }
//            print("the array we made:", doubleArray)
            
            if doubleArray.count != 3 {
                print("error getting three values for writing score")
                return [0,0,0]
            }
            
            return doubleArray
        } catch {
            print("error getting the AI writing scores: ", error.localizedDescription)
            return [0,0,0]
        }
    }
    
    // AI function
    func getTextAnalysis(short: Short) async throws -> String {
        let queryToAPI = "Write an analysis for the following piece of writing in 150 words or less explaining what the writer did well and what could be better: \\n \\(short.shortRawText!)"
        
        let query = ChatQuery(messages: [.init(role: .user, content: queryToAPI)!], model: .gpt4_o_mini, maxTokens: 400)
        
        do {
            let result = try await openAI.chats(query: query)
            let content = result.choices.first?.message.content?.string
//            print("content of text analysis AI query: ", content!)
            return content ?? ""
        } catch {
            print("error doing AI for imagery score")
            return ""
        }
    }
    
    
    func determineScoreColor(score: Double) -> Color {
        switch score {
        case 0.00..<3.33:
            return Color.red
        case 3.33..<6.66:
            return Color.orange
        case 6.66...10.0:
            return Color.green
        default:
            return Color.green
        }
    }
    
    // re-do analysis
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'UserController.swift',
                        path: 'Writing/Controllers/UserController.swift',
                        type: 'file',
                        content: `//
//  UserController.swift
//  Writing
//
//  Created by Ben Dreyer on 6/18/24.
//

import Firebase
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import Foundation

class UserController : ObservableObject {
    
    
    // Rate Limiting
    @Published var numActionsInLastMinute: Int = 0
    @Published var firstActionDate: Date?
    
    // User object - used to reference user throughout the app (signed in only)
    @Published var user: User?
    // Users profile picture
    @Published var usersProfilePicture: UIImage?
    
    // Edit profile vars
    @Published var newFirstName: String = ""
    @Published var newLastName: String = ""
    
    // Firestore
    let db = Firestore.firestore()
    
    // Storage
    let storage = Storage.storage()
    
    init() {
        // Retrieve the user on init if auth'd
        if let userId = Auth.auth().currentUser?.uid {
            self.retrieveUserFromFirestore(userId: userId)
            self.retrieveUsersProfilePicture(userId: userId)
        } else {
            print("auth wasn't setup yet.")
        }
    }
    
    func retrieveUserFromFirestore(userId: String) {
        self.user = nil
        let docRef = db.collection("users").document(userId)
        docRef.getDocument(as: User.self) { result in
            switch result {
            case .success(let userObject):
                self.user = userObject
                print("we have the user: ", self.user?.email ?? "no email")
            case .failure(let error):
                print("Failure retrieving user from firestore: ", error.localizedDescription)
            }
        }
    }
    
    func retrieveUsersProfilePicture(userId: String) {
        let imageRef = self.storage.reference().child("profile_pictures/" + userId + ".jpeg")
        
        Task {
            // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                if let error = error {
                    print("error downloading user's profile picture from storage: ", error.localizedDescription)
                    // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                    return
                } else {
                    DispatchQueue.main.async {
                        // Data for image is returned
                        let image = UIImage(data: data!)
                        self.usersProfilePicture = image
                    }
                }
            }
            
        }
    }
    
    func logOut() {
        self.user = nil
        self.usersProfilePicture = nil
//        print("log out - local user")
    }
    
    func deleteUser() {
        // Delete the current user in firestore (not auth)
        Task {
            if let user = self.user {
                do {
                    try await db.collection("users").document(user.id!).delete()
//                    print("Document successfully removed!")
                    DispatchQueue.main.async {
                        self.logOut()
                    }
                    
                } catch {
                    print("Error removing document: \\(error)")
                }
            } else {
//                print("no user and we can't delete it")
            }
        }
    }
    
    func changeName() {
//        print("starting name change")
        // Rate limit
        
        if self.newFirstName != "" && self.newLastName != "" {
            // ensure current user
            if let user = self.user {
                if self.newFirstName != user.firstName! && self.newLastName != user.lastName! {
                    // Reach out to fire base to update the names
                    Task {
                        let docRef = self.db.collection("users").document(user.id!)
                        
                        do {
                            try await docRef.updateData([
                                "firstName": self.newFirstName,
                                "lastName": self.newLastName
                            ])
                            print("updated successfully")
                        } catch let error {
                            print("error updating name: ", error.localizedDescription)
                        }
                        
                        // refresh the local user object
                        self.retrieveUserFromFirestore(userId: user.id!)
                        
                        // Change the name on every short authored by the current user!
                    }
                } else {
                    print("names are the same")
                }
            } else {
                print("no user")
            }
        } else {
            print("empty first name or last name")
        }
    }
    
    func uploadProfilePicture(data: Data) {
        // TODO: see if we can scale down the image to a certain res?
        if let user = self.user {
            let imageRef = storage.reference().child("profile_pictures/" + user.id! + ".jpeg")
            
            // Add metadate for the image
            let metadata = StorageMetadata()
            metadata.contentType = "image/jpeg"
            
            
//            print("the size of the data in bytes is: ", data.count)
            // compress image
            if let newData = compressImageData(imageData: data, maxSizeInBytes: (1 * 1024 * 1024)) {
//                print("after compression function the size in bytes is: ", newData.count)
                
                
                imageRef.putData(newData, metadata: metadata) { (metadata, error) in
                    if let error = error {
                        print("error uploading photo to storage: ", error.localizedDescription)
                        return
                    }
                    guard let _ = metadata else { return }
                    
                    // refresh the profile picture
                    self.retrieveUsersProfilePicture(userId: user.id!)
                }
            } else {
//                print("new data was nuil")
            }
        }
    }
    
    func compressImageData(imageData: Data, maxSizeInBytes: Int) -> Data? {
        
//        print("image data size: ", imageData.count)
        var compressionScaler = 1.0
        switch imageData.count {
        case 0..<500_000:
            print("under 500 KB")
            compressionScaler = 1.0
        case 500_000..<1_000_000:
            print("between 500KB and 1MB")
            compressionScaler = 0.9
        case 1_000_000..<5_000_000:
            print("between 1MB and 5MB")
            compressionScaler = 0.15
        case 5_000_000..<10_000_000:
            print("between 5MB and 10MB")
            compressionScaler = 0.05
        default:
            print("larger than 10MB")
            return nil
        }
        
        guard let image = UIImage(data: imageData) else { return nil }
        let newImageData = image.jpegData(compressionQuality: compressionScaler)
        
//        print("after compression, size is: ", newImageData!.count)
        return newImageData
    }
    
    func blockUser(userId: String) {
        // blocks the userId passed in from the arguments (if the user is not already blocked)
        
        if let user = self.user {
            // cannot block yourself
            if user.id! == userId { return }
            
            // if user is already blocked
            if let isBlocked = user.blockedUsers![userId] {
                if isBlocked { return }
            }
            
            // add the blocked user into the map in firestore
            Task {
                let docRef = db.collection("users").document(user.id!)
                
                do {
                    try await docRef.updateData([
                        "blockedUsers.\\(userId)": true
                    ])
                    
                    // then add the user directly to the local map
                    DispatchQueue.main.async {
                        self.user!.blockedUsers![userId] = true
                    }
                } catch {
                    print(error.localizedDescription)
                }
            }
        }
    }
    
    func likePrompt(promptDate: String) {
        Task {
            do {
                // check if we're doing a like or an unlike
                var isLike = true
                
                if let likePrompts = user?.likedPrompts {
                    if let like = likePrompts[promptDate] {
                        isLike = !like
                    }
                }
                
                
                let userRef = self.db.collection("users").document(user!.id!)
                userRef.updateData([
                    "likedPrompts.\\(promptDate)": isLike
                ])
                
                DispatchQueue.main.async {
                    var isLikeConcurrent = true
                    
                    if let likePrompts = self.user?.likedPrompts {
                        if let like = likePrompts[promptDate] {
                            isLikeConcurrent = !like
                        }
                    }
                    
                    if let _ = self.user?.likedPrompts {
                        self.user!.likedPrompts![promptDate] = isLikeConcurrent
                    } else {
                        self.user!.likedPrompts = [:]
                        self.user!.likedPrompts![promptDate] = isLikeConcurrent
                    }
                }
            }
        }
    }
    
    func likeShort(shortId: String) {
        Task {
            do {
                // check if we're doing a like or an unlike
                var isLike = true
                
                if let likeShorts = user?.likedShorts {
                    if let like = likeShorts[shortId] {
                        isLike = !like
                    }
                }
                
                let userRef = self.db.collection("users").document(user!.id!)
                userRef.updateData([
                    "likedShorts.\\(shortId)": isLike
                ])
                
                DispatchQueue.main.async {
                    var isLikeConcurrent = true
                    
                    if let likeShorts = self.user?.likedShorts {
                        if let like = likeShorts[shortId] {
                            isLikeConcurrent = !like
                        }
                    }
                    
                    if let _ = self.user?.likedShorts {
                        self.user!.likedShorts![shortId] = isLikeConcurrent
                    } else {
                        self.user!.likedShorts = [:]
                        self.user!.likedShorts![shortId] = isLikeConcurrent
                    }
                }
            }
        }
    }
    
    // Rate limiting - limits firestore writes and blocks spamming in a singular user session. app is still prone to attacks in multiple app sessions (closing and re-opening)
    // Limits users to 5 writes in one minute
    func processFirestoreWrite() -> String? {
        
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
        
        return nil
    }
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Info.plist',
                path: 'Writing/Info.plist',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>NICETRY</string>
			</array>
		</dict>
	</array>
</dict>
</plist>
`,
                language: 'plaintext'
            },
            {
                name: 'Models',
                path: 'Writing/Models',
                type: 'directory',
                children: [
                    {
                        name: 'Ad.swift',
                        path: 'Writing/Models/Ad.swift',
                        type: 'file',
                        content: `//
//  Ad.swift
//  Writing
//
//  Created by Ben Dreyer on 8/25/24.
//

import Foundation
import FirebaseFirestore

struct Ad : Codable {
    var date: String?
    
    // Advertiser Information
    var advertiserName: String?
    var advertiserSubtitle: String?
    var advertiserPictureUrl: String?
    
    // Ad Content
    var contentPreview: String?
    var contentFull: String?
    var redirectUrl: String?
    
    // stats
    var likeCount: Int?
    var commentCount: Int?
    
    enum CodingKeys: String, CodingKey {
        case date
        case advertiserName
        case advertiserSubtitle
        case advertiserPictureUrl
        case contentPreview
        case contentFull
        case redirectUrl
        case likeCount
        case commentCount
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'FreeWrite.swift',
                        path: 'Writing/Models/FreeWrite.swift',
                        type: 'file',
                        content: `//
//  FreeWrite.swift
//  Writing
//
//  Created by Ben Dreyer on 6/29/24.
//

import FirebaseFirestore
import Foundation

struct FreeWrite : Codable, Identifiable {
    @DocumentID var id: String?
    
    // Timestamp
    var rawTimestamp: Timestamp?
    
    // Author
    var authorId: String?
    
    // Content
    var title: String?
    var symbol: String?
    var content: String?
    var wordCount: Int?
    
    enum CodingKeys: String, CodingKey {
        case id
        case rawTimestamp
        case authorId
        case title
        case symbol
        case content
        case wordCount
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'LocalNotification.swift',
                        path: 'Writing/Models/LocalNotification.swift',
                        type: 'file',
                        content: `//
//  LocalNotification.swift
//  Writing
//
//  Created by Ben Dreyer on 7/28/24.
//

import Foundation

struct LocalNotification {
    internal init(identifier: String, title: String, body: String, timeInterval: Double, repeats: Bool) {
        self.identifier = identifier
        self.title = title
        self.scheduleType = .time
        self.body = body
        self.timeInterval = timeInterval
        self.dateComponents = nil
        self.repeats = repeats
    }
    
    internal init(identifier: String, title: String, body: String, dateComponents: DateComponents, repeats: Bool) {
        self.identifier = identifier
        self.title = title
        self.scheduleType = .calendar
        self.body = body
        self.timeInterval = nil
        self.dateComponents = dateComponents
        self.repeats = repeats
    }
    
    enum ScheduleType {
        case time, calendar
    }
    
    var identifier: String
    var title: String
    var scheduleType: ScheduleType
    var body: String
    var timeInterval: Double?
    var dateComponents: DateComponents?
    var repeats: Bool
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Prompt.swift',
                        path: 'Writing/Models/Prompt.swift',
                        type: 'file',
                        content: `//
//  Prompt.swift
//  Writing
//
//  Created by Ben Dreyer on 6/12/24.
//

import Foundation

public struct Prompt : Codable {
    // dates
    
    // Formated Date e,g, "20240612"
    var date: String?
    
    // Prompt Content
    var promptRawText: String?
    var promptImageUrl: String?
    
    // Prompt Stats
    var likeCount: Int?
    var shortCount: Int?
    var tags: [String]?
    
    enum CodingKeys: String, CodingKey {
        case date
        case promptRawText
        case promptImageUrl
        case likeCount
        case shortCount
        case tags
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'PromptSuggestion.swift',
                        path: 'Writing/Models/PromptSuggestion.swift',
                        type: 'file',
                        content: `//
//  PromptSuggestion.swift
//  Writing
//
//  Created by Ben Dreyer on 6/28/24.
//

import Foundation

struct PromptSuggestion : Codable {
    var authorId: String?
    var authorFirstName: String?
    var authorLastName: String?
    var rawText: String?
    
    enum CodingKeys: String, CodingKey {
        case authorId
        case authorFirstName
        case authorLastName
        case rawText
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Short.swift',
                        path: 'Writing/Models/Short.swift',
                        type: 'file',
                        content: `//
//  Short.swift
//  Writing
//
//  Created by Ben Dreyer on 6/12/24.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

struct Short : Codable, Identifiable {
    @DocumentID var id: String?
//    var id: String?
    // Date -- also the firestore Id of the prompt this short was written for.
    var date: String?
    // Exact time the short was submitted, used for sorting.
    var rawTimestamp: Timestamp?
    
    // Author
    var authorId: String?
    var authorFirstName: String?
    var authorLastName: String?
    var authorProfilePictureUrl: String?
    var authorNumShorts: Int?
    var authorNumLikes: Int?
    var authorTitle: Int?
    
    // Content
    var promptRawText: String?
    var shortRawText: String?
    var isNSFW: Bool?
    
    // Stats
    var likeCount: Int?
    var commentCount: Int?
    
    enum CodingKeys: String, CodingKey {
        case id
        case date
        case rawTimestamp
        case authorId
        case authorFirstName
        case authorLastName
        case authorProfilePictureUrl
        case authorNumShorts
        case authorNumLikes
        case authorTitle
        case promptRawText
        case shortRawText
        case isNSFW
        case likeCount
        case commentCount
    }
}

struct ArrayOfShort : Identifiable {
    let id = UUID()
    var shorts = [Short]()
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ShortAnalysis.swift',
                        path: 'Writing/Models/ShortAnalysis.swift',
                        type: 'file',
                        content: `//
//  ShortAnalysis.swift
//  Writing
//
//  Created by Ben Dreyer on 7/13/24.
//

import FirebaseFirestore
import Foundation

struct ShortAnalysis : Codable {
    @DocumentID var id: String?
    
    // Short attatchment
    var shortId: String?
    var authorId: String?
    
    // Content Scores
    var proseScore: Double?
    var imageryScore: Double?
    var flowScore: Double?
    
    // Overall Score
    var score: Double?
    
    // Text Analysis
    var content: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case shortId
        case authorId
        case proseScore
        case imageryScore
        case flowScore
        case score
        case content
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ShortComment.swift',
                        path: 'Writing/Models/ShortComment.swift',
                        type: 'file',
                        content: `//
//  ShortComment.swift
//  Writing
//
//  Created by Ben Dreyer on 6/12/24.
//

import Foundation
import FirebaseFirestore

struct ShortComment : Codable, Identifiable {
    @DocumentID var id: String?
    
    // Parent - the Id of the short this comment is on
    var parentShortId: String?
    
    // rawtimestamp
    var rawTimestamp: Timestamp?
    
    
    // Author
    var authorId: String?
    var authorFirstName: String?
    var authorLastName: String?
    var authorProfilePictureUrl: String?
    
    // Content
    var commentRawText: String?
    
    enum CodingKeys : String, CodingKey {
        case id
        case parentShortId
        case rawTimestamp
        case authorId
        case authorFirstName
        case authorLastName
        case authorProfilePictureUrl
        case commentRawText
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'User.swift',
                        path: 'Writing/Models/User.swift',
                        type: 'file',
                        content: `//
//  User.swift
//  Writing
//
//  Created by Ben Dreyer on 6/12/24.
//

import FirebaseFirestore
import Foundation


struct User : Codable {
    @DocumentID var id: String?
    var firstName: String?
    var lastName: String?
    
    var email: String?
    // A url path to the storage bucket the file is stored in
    var profilePictureUrl: String?
    // A count of how many shorts this user has written
    var shortsCount: Int?
    var numLikes: Int?
    // The average score of the user's writings and the number of analysis been generated
    var avgWritingScore: Float?
    var numAnalysisGenerated: Int?
    
    // Title
    var title: Int?
    
    // Streaks & Awards
    var lastShortWrittenDate: Timestamp?
    var currentStreak: Int?
    var bestStreak: Int?
    var contributions: [String : Bool]?
    
    // Free Write Info
    var freeWriteCount: Int?
    var freeWriteAverageWordCount: Int?
    
    var isAdmin: Bool?
    
    // Map of userIds : isBlocked
    var blockedUsers: [String: Bool]?
    
    // Stores likes the user has sent on prompts and community shorts
    var likedPrompts: [String : Bool]?
    var likedShorts: [String : Bool]?
    
    enum CodingKeys: String, CodingKey {
        case id
        case firstName
        case lastName
        case email
        case profilePictureUrl
        case shortsCount
        case numLikes
        case avgWritingScore
        case numAnalysisGenerated
        case title
        case lastShortWrittenDate
        case currentStreak
        case bestStreak
        case contributions
        case freeWriteCount
        case freeWriteAverageWordCount
        case isAdmin
        case blockedUsers
        case likedPrompts
        case likedShorts
    }
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Preview Content',
                path: 'Writing/Preview Content',
                type: 'directory',
                children: [
                    {
                        name: 'Preview Assets.xcassets',
                        path: 'Writing/Preview Content/Preview Assets.xcassets',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Preview Content/Preview Assets.xcassets/Contents.json',
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
                name: 'Views',
                path: 'Writing/Views',
                type: 'directory',
                children: [
                    {
                        name: 'Auth',
                        path: 'Writing/Views/Auth',
                        type: 'directory',
                        children: [
                            {
                                name: 'SignUpOrIn.swift',
                                path: 'Writing/Views/Auth/SignUpOrIn.swift',
                                type: 'file',
                                content: `//
//  SignUpOrIn.swift
//  Writing
//
//  Created by Ben Dreyer on 6/14/24.
//

import FirebaseAuth
import SwiftUI
import AuthenticationServices
import GoogleSignIn
import GoogleSignInSwift

struct SignUpOrIn: View {
    // Light / Dark Theme
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
            VStack {
                HStack {
                    // Small Logo
                    if (colorScheme == .light) {
                        Image("LogoTransparentWhiteBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    } else if (colorScheme == .dark) {
                        Image("LogoBlackBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    
                    Text("| The Daily Short")
                        .font(.system(size: 16, design: .serif))
                        .bold()
                }
                
                Text("Begin your writing journey")
                    .font(.system(size: 14, design: .serif))
                    .padding(.bottom, 5)
                
                Text("Create an account today")
                    .font(.system(size: 12, design: .serif))
                    .padding(.bottom, 20)
                
                SignInWithAppleButton(
                    onRequest: { request in
                        let nonce = authController.randomNonceString()
                        authController.currentNonce = nonce
                        request.requestedScopes = [.fullName, .email]
                        request.nonce = authController.sha256(nonce)
                    },
                    onCompletion: { result in
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            Task {
                                authController.appleSignInButtonOnCompletion(result: result)
                            }
                        }
                    }
                )
                .frame(maxWidth: 250, maxHeight: 40)
                .cornerRadius(10)
                .signInWithAppleButtonStyle(colorScheme == .light ? .black : .white)
                
                // Sign in with Google Button
                Button(action: {
                    if let rateLimit = userController.processFirestoreWrite() {
                        print(rateLimit)
                    } else {
                        authController.signInWithGoogle()
                    }
                }) {
                    HStack {
                        Image("google_logo")
                            .resizable()
                            .frame(width: 18, height: 18)
                        Text("Sign in with Google")
//                            .font(.headline)
                            .font(.system(size: 16))
                            .foregroundColor(.black)
                    }
                    .frame(width: 250, height: 40)
                    .background(Color.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.black, lineWidth: 1)
                    )
                    .cornerRadius(10)
                }
                
                HStack {
                    Text("Use the methods above to")
                        .font(.system(size: 12, design: .serif))
                    
                    Text("Log in")
                        .font(.system(size: 12, design: .serif))
                        .foregroundStyle(Color.blue)
                }
                .padding(.top, 10)
            }
            .padding(20)
            .padding(.bottom, 40)
            .background(colorScheme == .light ? Color.white : Color.black) // Optional: Add a background color
            .cornerRadius(10) // Apply rounded corners
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(colorScheme == .light ? Color.black : Color.white, lineWidth: 2)
            )
            .padding()
        }
}

#Preview {
    SignUpOrIn()
        .environmentObject(AuthController())
        .environmentObject(UserController())
}

`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'FreeWrite',
                        path: 'Writing/Views/FreeWrite',
                        type: 'directory',
                        children: [
                            {
                                name: 'FreeWriteContentView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteContentView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteContentView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/17/24.
//

import SwiftUI

struct FreeWriteContentView: View {
    
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    var body: some View {
        ZStack {
            FreeWriteSignedOutView()
                .opacity(isSignedIn ? 0.0 : 1.0)
            FreeWriteMainView()
                .opacity(isSignedIn ? 1.0 : 0.0)
        }
    }
}

#Preview {
    FreeWriteContentView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteCreateEntryView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteCreateEntryView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteCreateEntryView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/16/24.
//

import Combine
import SwiftUI

struct FreeWriteCreateEntryView: View {
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    @EnvironmentObject var freeWriteController: FreeWriteController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    TextField("A poem about...", text: $freeWriteController.titleText)
                        .font(.system(size: 20, design: .serif))
                    
                    HStack {
//                        Image(systemName: freeWriteController.iconName)
                        
                        Picker("", selection: $freeWriteController.iconName) {
                            ForEach(freeWriteController.iconOptions, id: \\.self) { image in
                                Image(systemName: image)
                                    .resizable()
                                    .scaledToFit()
                                    .frame(width: 50, height: 50)  // Adjust size as needed
                                    .foregroundColor(.black)
                                    .tag(freeWriteController.iconOptions.firstIndex(of: image)!)
                            }
                        }
                        .pickerStyle(DefaultPickerStyle())
                        .accentColor(self.isDarkMode ? Color.white : Color.black)
                        
//                        Button(action: {
//                            
//                        }) {
//                            Image(systemName: "arrowtriangle.down.fill")
//                                .resizable()
//                                .frame(width: 15, height: 10)
//                        }
//                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.bottom, 10)
                
                ScrollView(showsIndicators: false) {
                    TextField("Once upon a time...",text: $freeWriteController.contentText, axis: .vertical)
                        .font(.system(size: 16, design: .serif))
                    // Styling
                        .padding(.vertical, 8)
                        .background(
                            VStack {
                                Spacer()
                                Color(UIColor.systemGray4)
                                    .frame(height: 2)
                            }
                        )
                        .onChange(of: freeWriteController.contentText) {
                            freeWriteController.updateWordCount()
                        }
                    
                    HStack {
                        // Character Count
                        Text("\\(freeWriteController.wordCount) Words")
                            .font(.system(size: 12, design: .serif))
                        
                        
                        Button(action: {
                            // Rate Limiting check
                            if let rateLimit = userController.processFirestoreWrite() {
                                print(rateLimit)
                            } else {
                                if let user = userController.user {
                                    Task {
                                        freeWriteController.submitFreeWrite(freeWriteCount: user.freeWriteCount!, freeWriteAverageWordCount: user.freeWriteAverageWordCount!)
                                        
                                        // re-pull the freewrites for the user
                                        freeWriteController.retrieveFreeWrites()
                                        
                                        // re-pull the user in user controller
                                        userController.retrieveUserFromFirestore(userId: user.id!)
                                        
                                        // close the sheet
                                        freeWriteController.isCreateEntrySheetShowing = false
                                    }
                                }
                            }
                        }) {
                            Image(systemName: "arrowshape.right.circle")
                                .font(.callout)
                                .foregroundStyle(Color.green)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .disabled(freeWriteController.titleText.isEmpty || freeWriteController.contentText.isEmpty)
                        
                    }
                    .frame(maxWidth: .infinity, alignment: .trailing)
                }
            }
            .padding(.top, 40)
            .padding(.leading, 20)
            .padding(.trailing, 20)
            .onAppear {
                // hide tab bar when keyboard can be shown
                self.isTabBarShowing = false
                
                // reset create entry vars to initial state
                freeWriteController.titleText = ""
                freeWriteController.iconName = "sun.max"
                freeWriteController.contentText = ""
            }
            .onDisappear {
                self.isTabBarShowing = true
            }
        }
    }
}

#Preview {
    FreeWriteCreateEntryView()
        .environmentObject(FreeWriteController())
        .environmentObject(UserController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteEditEntryView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteEditEntryView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteEditEntryView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/30/24.
//

import SwiftUI

struct FreeWriteEditEntryView: View {
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    @EnvironmentObject var freeWriteController: FreeWriteController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    TextField("A poem about...", text: $freeWriteController.titleText)
                        .font(.system(size: 20, design: .serif))
                    
                    HStack {
//                        Image(systemName: freeWriteController.iconName)
                        
                        Picker("", selection: $freeWriteController.iconName) {
                            ForEach(freeWriteController.iconOptions, id: \\.self) { image in
                                Image(systemName: image)
                                    .resizable()
                                    .scaledToFit()
                                    .frame(width: 50, height: 50)  // Adjust size as needed
                                    .foregroundColor(.black)
                                    .tag(freeWriteController.iconOptions.firstIndex(of: image)!)
                            }
                        }
                        .pickerStyle(DefaultPickerStyle())
                        .accentColor(self.isDarkMode ? Color.white : Color.black)
                        
//                        Button(action: {
//
//                        }) {
//                            Image(systemName: "arrowtriangle.down.fill")
//                                .resizable()
//                                .frame(width: 15, height: 10)
//                        }
//                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.bottom, 10)
                
                ScrollView(showsIndicators: false) {
                    TextField("Once upon a time...",text: $freeWriteController.contentText, axis: .vertical)
                        .font(.system(size: 16, design: .serif))
                    // Styling
                        .padding(.vertical, 8)
                        .background(
                            VStack {
                                Spacer()
                                Color(UIColor.systemGray4)
                                    .frame(height: 2)
                            }
                        )
                        .onChange(of: freeWriteController.contentText) {
                            freeWriteController.updateWordCount()
                        }
                    
                    HStack {
                        // Character Count
                        Text("\\(freeWriteController.wordCount) Words")
                            .font(.system(size: 12, design: .serif))
                        
                        
                        Button(action: {
                            // Rate Limiting check
                            if let rateLimit = userController.processFirestoreWrite() {
                                print(rateLimit)
                            } else {
                                if let user = userController.user {
                                    Task {
                                        freeWriteController.editFreeWrite(freeWriteCount: user.freeWriteCount!, freeWriteOldAverageWordCount: user.freeWriteAverageWordCount!)
                                        
                                        
                                        // re-pull the freewrites for the user
                                        freeWriteController.retrieveFreeWrites()
                                        
                                        // re-pull the user in user controller
                                        userController.retrieveUserFromFirestore(userId: user.id!)
                                    }
                                }
                            }
                        }) {
                            Image(systemName: "arrowshape.right.circle")
                                .font(.callout)
                                .foregroundStyle(Color.green)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .disabled(freeWriteController.titleText.isEmpty || freeWriteController.contentText.isEmpty)
                        
                    }
                    .frame(maxWidth: .infinity, alignment: .trailing)
                }
            }
            .padding(.top, 20)
            .padding(.leading, 20)
            .padding(.trailing, 20)
            .onAppear {
                if let freeWrite = freeWriteController.focusedFreeWrite {
                    freeWriteController.titleText = freeWrite.title!
                    freeWriteController.iconName = freeWrite.symbol!
                    freeWriteController.contentText = freeWrite.content!
                    freeWriteController.wordCount = freeWrite.wordCount!
                }
            }
            .onAppear {
                self.isTabBarShowing = false
            }
            .onDisappear {
                self.isTabBarShowing = true
            }
        }
    }
}

#Preview {
    FreeWriteEditEntryView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteEntryPreviewView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteEntryPreviewView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteEntryPreviewView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/29/24.
//

import FirebaseFirestore
import SwiftUI

struct FreeWriteEntryPreviewView: View {
    @EnvironmentObject var freeWriteController: FreeWriteController
    
    var freeWrite: FreeWrite
    
    let calendar = Calendar.current
    
    var body: some View {
        VStack {
            Button(action: {
                freeWriteController.focusFreeWrite(freeWrite: self.freeWrite)
                freeWriteController.isSingleFreeWriteSheetShowing = true
            }) {
                VStack {
                    HStack {
                        VStack {
                            Text("\\(calendar.component(.day, from: freeWrite.rawTimestamp!.dateValue()))")
                                .font(.system(size: 14, design: .serif))
                            
                            Text(self.getMonthString(from: freeWrite.rawTimestamp!.dateValue()))
                                .font(.system(size: 12, design: .serif))
                        }
                        
                        
                        Text("|")
                            .font(.system(size: 25, design: .serif))
                        
                        VStack {
                            Text(freeWrite.title!)
                                .font(.system(size: 16, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            HStack {
                                Text("Last Updated \\(freeWrite.rawTimestamp!.dateValue().formatted(date: .omitted, time: .shortened))")
                                    .font(.system(size: 12, design: .serif))
                                
                                Text("●")
                                    .font(.system(size: 12, design: .serif))
                                
                                Text("\\(freeWrite.wordCount!) words")
                                    .font(.system(size: 12, design: .serif))
                                
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        
                        Image(systemName: freeWrite.symbol!)
                            .font(.headline)
                        
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.bottom, 5)
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    func getMonthString(from date: Date) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMM" // "MMMM" for full month name, "MMM" for abbreviated month name
        return dateFormatter.string(from: date)
    }
}

#Preview {
    FreeWriteEntryPreviewView(freeWrite: FreeWrite(rawTimestamp: Timestamp(), title: "Title", symbol: "sun.max", content: "The content of it all", wordCount: 5))
        .environmentObject(FreeWriteController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteFullListView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteFullListView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteFullListView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/30/24.
//

import SwiftUI

struct FreeWriteFullListView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var freeWriteController: FreeWriteController
    var body: some View {
        ZStack {
            VStack {
                // Logo / Slogan / Free Write
                HStack {
                    // Small Logo
                    if (colorScheme == .light) {
                        Image("LogoTransparentWhiteBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    } else if (colorScheme == .dark) {
                        Image("LogoBlackBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    
                    Text("| The Daily Short")
                        .font(.system(size: 16, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .bold()
                    
                    Text("Free Write")
                        .font(.system(size: 16, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .bold()
                }
                .padding(.top, 15)
                .padding(.leading, 20)
                .padding(.trailing, 20)
                
                
                // Sort By
                HStack {
                    Menu {
                        Button(action: {
                            freeWriteController.selectedSortingMethod = 0
                            freeWriteController.switchSortingMethod()
                        }) {
                            HStack {
                                Text("Recent")
                                    .font(.system(size: 13, design: .serif))
                                
//                                Image(systemName: "clock")
//                                    .font(.subheadline)
                            }
                            
                        }
                        Button(action: {
                            freeWriteController.selectedSortingMethod = 1
                            freeWriteController.switchSortingMethod()
                        }) {
                            HStack {
                                Text("Oldest")
                                    .font(.system(size: 13, design: .serif))
                                
//                                Image(systemName: "crown")
//                                    .font(.subheadline)
                            }
                        }
                    } label: {
                        HStack {
                            if freeWriteController.selectedSortingMethod == 0 {
                                Text("Recent")
                                    .font(.system(size: 13, design: .serif))
                            } else if freeWriteController.selectedSortingMethod == 1 {
                                Text("Oldest")
                                    .font(.system(size: 13, design: .serif))
                            }
                            Image(systemName: "chevron.down")
                                .font(.subheadline)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.bottom, 10)
                .padding(.horizontal, 20)
                
                ScrollView(showsIndicators: false) {
                    VStack {
                        
                        if freeWriteController.selectedSortingMethod == 0 {
                            ForEach(freeWriteController.freeWrites) { freeWrite in
                                FreeWriteEntryPreviewView(freeWrite: freeWrite)
                                    .onTapGesture {
                                        freeWriteController.focusFreeWrite(freeWrite: freeWrite)
                                    }
                            }
                        } else if freeWriteController.selectedSortingMethod == 1 {
                            ForEach(freeWriteController.freeWritesOldest) { freeWrite in
                                FreeWriteEntryPreviewView(freeWrite: freeWrite)
                                    .onTapGesture {
                                        freeWriteController.focusFreeWrite(freeWrite: freeWrite)
                                    }
                            }
                        }
                        
                        // Older button (allows user to load next batch of free writes)
                        if !freeWriteController.areNoShortsLeftToLoad {
                            Button(action: {
                                freeWriteController.retrieveNextFreeWrites()
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 110, height: 35)
                                    .overlay {
                                        HStack {
                                            Text("More")
                                                .font(.system(size: 14, design: .serif))
                                                .bold()
                                            
                                            Image(systemName: "arrow.down")
                                                .resizable()
                                                .frame(width: 10, height: 10)
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                        
                        VStack {
                            // Logo
                            if (colorScheme == .light) {
                                Image("LogoTransparentWhiteBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            } else if (colorScheme == .dark) {
                                Image("LogoBlackBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            }
                            
                            Text("The Daily Short")
                                .font(.system(size: 15, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                            Text("version 1.1")
                                .font(.system(size: 11, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                        }
                    }
                    .padding(.horizontal, 20)
                }
            }
        }
        .onAppear {
            freeWriteController.retrieveNextFreeWrites()
        }
    }
}

#Preview {
    FreeWriteFullListView()
        .environmentObject(FreeWriteController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteMainView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteMainView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteMainView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/16/24.
//

import SwiftUI

struct FreeWriteMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @StateObject var freeWriteController = FreeWriteController()
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    // Logo / Slogan / Free Write
                    HStack {
                        // Small Logo
                        if (colorScheme == .light) {
                            Image("LogoTransparentWhiteBackground")
                                .resizable()
                                .frame(width: 30, height: 30)
                        } else if (colorScheme == .dark) {
                            Image("LogoBlackBackground")
                                .resizable()
                                .frame(width: 30, height: 30)
                        }
                        
                        Text("| The Daily Short")
                            .font(.system(size: 16, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .bold()
                        
                        Text("Free Write")
                            .font(.system(size: 16, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .trailing)
                            .bold()
                    }
                    .padding(.top, 15)
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                    
                    ScrollView(showsIndicators: false) {
                        VStack {
                            // Writing Stats
                            HStack {
                                VStack {
                                    Text("\\(userController.user?.freeWriteCount ?? 0)")
                                        .font(.system(size: 16, design: .serif))
                                    
                                    Text("Entries")
                                        .font(.system(size: 12, design: .serif))
                                }
                                .padding()
                                
                                VStack {
                                    Text("\\(userController.user?.freeWriteAverageWordCount ?? 0)")
                                        .font(.system(size: 16, design: .serif))
                                    
                                    Text("Avg Word Count")
                                        .font(.system(size: 12, design: .serif))
                                }
                                .padding()
                            }
                            
                            HStack {
                                Text("Latest Entries")
                                    .font(.system(size: 16, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .bold()
                                
                                NavigationLink(destination: FreeWriteFullListView()) {
                                    Text("View All")
                                        .font(.system(size: 12, design: .serif))
                                        .frame(maxWidth: .infinity, alignment: .trailing)
                                }
                                .buttonStyle(PlainButtonStyle())
                                
                            }
                            .padding(.bottom, 10)
                            
                            
                            ForEach(freeWriteController.freeWrites.prefix(8), id: \\.id) { freeWrite in
                                FreeWriteEntryPreviewView(freeWrite: freeWrite)
                                    .onTapGesture {
                                        freeWriteController.focusFreeWrite(freeWrite: freeWrite)
                                    }
                            }
                            
                            Button(action: {
                                freeWriteController.isCreateEntrySheetShowing = true
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 160, height: 40)
                                    .overlay {
                                        HStack {
                                            // TODO(bendreyer): have a couple different openers here (start your creation, dive right in, etc..) and pick one at random
                                            Text("Create Entry")
                                                .font(.system(size: 14, design: .serif))
                                                .bold()
                                            
                                            Image(systemName: "pencil.and.scribble")
                                            
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            VStack {
                                // Logo
                                if (colorScheme == .light) {
                                    Image("LogoTransparentWhiteBackground")
                                        .resizable()
                                        .frame(width: 80, height: 80)
                                } else if (colorScheme == .dark) {
                                    Image("LogoBlackBackground")
                                        .resizable()
                                        .frame(width: 80, height: 80)
                                }
                                
                                Text("The Daily Short")
                                    .font(.system(size: 15, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .bottom)
                                    .opacity(0.8)
                                Text("version 1.1")
                                    .font(.system(size: 11, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .bottom)
                                    .opacity(0.8)
                            }
                        }
                        .padding(.leading, 20)
                        .padding(.trailing, 20)
                    }
                }
                .sheet(isPresented: $freeWriteController.isCreateEntrySheetShowing) {
                    FreeWriteCreateEntryView()
                }
                .sheet(isPresented: $freeWriteController.isSingleFreeWriteSheetShowing) {
                    FreeWriteSingleEntryView()
                        .presentationDetents([.medium, .large])
                        .presentationDragIndicator(.automatic)
                }
                
            }
            .padding(.bottom, 25)
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
        .environmentObject(freeWriteController)
    }
}

#Preview {
    FreeWriteMainView()
        .environmentObject(FreeWriteController())
        .environmentObject(UserController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteSignedOutView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteSignedOutView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteSignedOutView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/17/24.
//

import SwiftUI

struct FreeWriteSignedOutView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @State private var isSignUpViewShowing: Bool = false
    
    var body: some View {
        ZStack {
            VStack {
                // Logo / Slogan / Free Write
                HStack {
                    // Small Logo
                    if (colorScheme == .light) {
                        Image("LogoTransparentWhiteBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    } else if (colorScheme == .dark) {
                        Image("LogoBlackBackground")
                            .resizable()
                            .frame(width: 30, height: 30)
                    }
                    
                    Text("| The Daily Short")
                        .font(.system(size: 16, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .bold()
                    
                    Text("Free Write")
                        .font(.system(size: 16, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .bold()
                }
                .padding(.top, 15)
                .padding(.leading, 20)
                .padding(.trailing, 20)
                
                ScrollView(showsIndicators: false) {
                    VStack {
                        
                        // Writing Stats
                        HStack {
                            VStack {
                                Text("0")
                                    .font(.system(size: 20, design: .serif))
                                
                                Text("Entries")
                                    .font(.system(size: 12, design: .serif))
                            }
                            .padding()
                            
                            VStack {
                                Text("0")
                                    .font(.system(size: 20, design: .serif))
                                
                                Text("Avg Word Count")
                                    .font(.system(size: 12, design: .serif))
                            }
                            .padding()
                        }
                        
                        HStack {
                            Text("Latest Entries")
                                .font(.system(size: 16, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .bold()
                            
                            Text("View All")
                                .font(.system(size: 12, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .trailing)
                        }
                        .padding(.bottom, 10)
                        
                        // Auth button
                        VStack(spacing: 0.5) {
                            Button(action: {
                                self.isSignUpViewShowing = true
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 220, height: 40)
                                    .overlay {
                                        HStack {
                                            Text("Create Account / Sign In")
                                                .font(.system(size: 14, design: .serif))
                                                .bold()
                                            
                                            Image(systemName: "person.badge.plus")
                                            
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                        
                        VStack {
                            // Logo
                            if (colorScheme == .light) {
                                Image("LogoTransparentWhiteBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            } else if (colorScheme == .dark) {
                                Image("LogoBlackBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            }
                            
                            Text("The Daily Short")
                                .font(.system(size: 15, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                            Text("version 1.1 june 2024")
                                .font(.system(size: 11, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                        }
                    }
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                }
            }
            .blur(radius: isSignUpViewShowing ? 10.0 : 0.0)
            .onTapGesture {
                if (isSignUpViewShowing) {
                    isSignUpViewShowing = false
                }
            }
            
            if (isSignUpViewShowing) {
                SignUpOrIn()
            }
        }
        .padding(.bottom, 25)
    }
}

#Preview {
    FreeWriteSignedOutView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'FreeWriteSingleEntryView.swift',
                                path: 'Writing/Views/FreeWrite/FreeWriteSingleEntryView.swift',
                                type: 'file',
                                content: `//
//  FreeWriteSingleEntryView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/16/24.
//

import SwiftUI

struct FreeWriteSingleEntryView: View {
    @EnvironmentObject var freeWriteController: FreeWriteController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        if let freeWrite = freeWriteController.focusedFreeWrite {
            NavigationView {
                VStack {
                    HStack {
                        // Profile Picture
                        if let image = userController.usersProfilePicture {
                            Image(uiImage: image)
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                .frame(width: 40, height: 40)
                        } else {
                            Image("not-signed-in-profile")
                                .resizable()
                                .clipShape(Circle())
                                .frame(width: 40, height: 40)
                        }
                        
                        
                        // Name and time posted
                        VStack {
                            // Title
                            Text((userController.user?.firstName ?? "Guest ") + " " + (userController.user?.lastName ?? "Writer"))
                                .font(.system(size: 12, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            // Date
                            Text("\\(freeWrite.rawTimestamp!.dateValue().formatted(date: .abbreviated, time: .shortened))")
                                .font(.system(size: 12, design: .serif))
                                .opacity(0.6)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        
                        Image(systemName: freeWrite.symbol!)
                            .font(.headline)
                    }
                    .padding(.bottom, 10)
                    
                    // Title
                    Text(freeWrite.title!)
                        .font(.system(size: 16, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .bold()
                    
                    // Content
                    ScrollView(showsIndicators: false) {
                        
                        Text(freeWrite.content!)
                            .font(.system(size: 12, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        
                        
                        HStack {
                            NavigationLink(destination: FreeWriteEditEntryView()) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 150, height: 40)
                                    .overlay {
                                        HStack {
                                            Text("Edit Your Entry")
                                                .font(.system(size: 13, design: .serif))
                                                .bold()
                                            Image(systemName: "square.and.pencil")
                                        }
                                    }
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            .padding(.leading, 2)
                            
                            Button(action: {
                                freeWriteController.isConfirmDeleteAlertShowing = true
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 170, height: 40)
                                    .overlay {
                                        HStack {
                                            Text("Delete Your Entry")
                                                .font(.system(size: 13, design: .serif))
                                                .bold()
                                            Image(systemName: "trash")
                                        }
                                    }
                            }
                            .foregroundStyle(Color.red)
                            .buttonStyle(PlainButtonStyle())
                            //                            .frame(maxWidth: .infinity, alignment: .leading)
                            .alert("Are you sure?", isPresented: $freeWriteController.isConfirmDeleteAlertShowing) {
                                Button("Confirm") {
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        
                                        // Remove free write entry
                                        if let user = userController.user {
                                            Task {
                                                freeWriteController.deleteFreeWrite(freeWriteCount: user.freeWriteCount!, averageWordCountBeforeDeletion: user.freeWriteAverageWordCount!)
                                                
                                                // re-pull the freewrites for the user
                                                freeWriteController.retrieveFreeWrites()
                                                
                                                // re-pull the user in user controller
                                                userController.retrieveUserFromFirestore(userId: user.id!)
                                            }
                                        }
                                    }
                                }
                                
                                Button("Cancel", role: .cancel) { }
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .padding(.top, 20)
                .padding(.leading, 20)
                .padding(.trailing, 20)
            }
            // Needed for iPad compliance
            .navigationViewStyle(StackNavigationViewStyle())
        } else {
            Text("we had trouble loading your entry, sawwwyy :((")
                .italic()
        }
        
    }
}

#Preview {
    FreeWriteSingleEntryView()
        .environmentObject(FreeWriteController())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Home',
                        path: 'Writing/Views/Home',
                        type: 'directory',
                        children: [
                            {
                                name: 'Advertisements',
                                path: 'Writing/Views/Home/Advertisements',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'AdFullView.swift',
                                        path: 'Writing/Views/Home/Advertisements/AdFullView.swift',
                                        type: 'file',
                                        content: `//
//  AdFullView.swift
//  Writing
//
//  Created by Ben Dreyer on 8/25/24.
//

import SwiftUI

struct AdFullView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var advertisementController: AdvertisementController
    
    var body: some View {
        ZStack {
            if let ad = advertisementController.focusedAd {
                VStack {

                    
                    ScrollView(showsIndicators: false) {
                        HStack {
                            // Image
                            if let image = advertisementController.advertiserImage {
                                Image(uiImage: image)
                                    .resizable()
                                    .clipShape(RoundedRectangle(cornerRadius: 15))
                                    .frame(width: 60, height: 60)
                            } else {
                                Image("not-signed-in-profile")
                                    .resizable()
                                    .clipShape(RoundedRectangle(cornerRadius: 15))
                                    .frame(width: 60, height: 60)
                            }
                            
                            VStack {
                                // Advertiser Name
                                Text(ad.advertiserName ?? "Advertiser")
                                    .font(.system(size: 14, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                
                                HStack {
                                    // Subtitle
                                    Text(ad.advertiserSubtitle ?? "A publishing company")
                                        .font(.system(size: 12, design: .serif))
                                        .opacity(0.6)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.bottom, 5)
                        
                        
                        // Full Content
                        Text(ad.contentFull ?? "This is an advertisement")
                            .font(.system(size: 15, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            // Like Button
                            Button(action: {
                                advertisementController.isFocusedAdLiked.toggle()
                            }) {
                                ZStack {
                                    // Unliked like count (no color)
                                    HStack {
                                        // Comment image
                                        Image(systemName: "hand.thumbsup")
                                            .resizable()
                                            .frame(width: 15, height: 15)
                                        // comment number
                                        Text("\\((ad.likeCount ?? 0).formatted())")
                                            .font(.system(size: 13, design: .serif))
                                    }
                                    if advertisementController.isFocusedAdLiked {
                                        HStack {
                                            // Comment image
                                            Image(systemName: "hand.thumbsup")
                                                .resizable()
                                                .frame(width: 15, height: 15)
                                            // comment number
                                            Text("\\((ad.likeCount ?? 0).formatted())")
                                                .font(.system(size: 13, design: .serif))
                                        }
                                        .foregroundStyle(Color.orange)
                                    }
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            HStack {
                                // Comment image
                                Image(systemName: "message")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                                // comment number
                                Text("\\((ad.commentCount ?? 0).formatted())")
                                    .font(.system(size: 13, design: .serif))
                            }
                            
                            // Report Ad
                            
                            
                            // Sponsored text
                            Text("Sponsored")
                                .font(.system(size: 10, design: .serif))
                                .foregroundStyle(Color.blue)
                                .opacity(0.8)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        
                        
                        // Redirect Button
                        Link("Learn More", destination: URL(string: ad.redirectUrl ?? "")!)
                            .foregroundColor(.blue)
                    }
                    
                    // Daily Short Logo?
                    if (colorScheme == .light) {
                        Image("LogoTransparentWhiteBackground")
                            .resizable()
                            .frame(width: 80, height: 80)
                    } else if (colorScheme == .dark) {
                        Image("LogoBlackBackground")
                            .resizable()
                            .frame(width: 80, height: 80)
                    }
                }
                .padding(.top, 40)
                .padding(.horizontal, 20)
            }
        }
    }
}

#Preview {
    AdFullView()
        .environmentObject(AdvertisementController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'AdPreviewView.swift',
                                        path: 'Writing/Views/Home/Advertisements/AdPreviewView.swift',
                                        type: 'file',
                                        content: `//
//  AdPreview.swift
//  Writing
//
//  Created by Ben Dreyer on 8/25/24.
//

import SwiftUI

struct AdPreviewView: View {
    @EnvironmentObject var advertisementController: AdvertisementController
    
    
    var body: some View {
        Button(action: {
            advertisementController.isFullAdSheetShowing = true
        }) {
            if let ad = advertisementController.focusedAd {
                VStack {
                    HStack {
                        // Profile Picture
                        
                        if let image = advertisementController.advertiserImage {
                            Image(uiImage: image)
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        } else {
                            Image("not-signed-in-profile")
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        }
                        
                        
                        
                        VStack {
                            // Advertiser Name
                            Text(ad.advertiserName ?? "Advertiser")
                                .font(.system(size: 12, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            HStack {
                                // Subtitle
                                Text(ad.advertiserSubtitle ?? "A publishing company")
                                    .font(.system(size: 10, design: .serif))
                                    .opacity(0.6)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                    }
                    
                    // Content
                    Text(ad.contentPreview ?? "This is an advertisement")
                        .font(.system(size: 13, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    HStack {
                        ZStack {
                            HStack {
                                // like image
                                Image(systemName: "hand.thumbsup")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                                // like number
                                Text("\\((ad.likeCount ?? 0).formatted())")
                                    .font(.system(size: 13, design: .serif))
                            }
                            if advertisementController.isFocusedAdLiked {
                                HStack {
                                    Image(systemName: "hand.thumbsup")
                                        .resizable()
                                        .frame(width: 15, height: 15)
                                    Text("\\((ad.likeCount ?? 0).formatted())")
                                        .font(.system(size: 13, design: .serif))
                                }
                                .foregroundStyle(Color.orange)
                            }
                        }
                        
                        HStack {
                            // Comment image
                            Image(systemName: "message")
                                .resizable()
                                .frame(width: 15, height: 15)
                            // comment number
                            Text("\\((ad.commentCount ?? 0).formatted())")
                                .font(.system(size: 13, design: .serif))
                        }
                        
                        // Report Short
                        Image(systemName: "info.circle")
                            .font(.caption)
                        
                        Text("Sponsored")
                            .font(.system(size: 10, design: .serif))
                            .foregroundStyle(Color.blue)
                            .opacity(0.8)
                        
                        
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(.bottom, 10)
            }
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    AdPreviewView()
        .environmentObject(AdvertisementController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'CommunityResponses',
                                path: 'Writing/Views/Home/CommunityResponses',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ListCommunityResponseView.swift',
                                        path: 'Writing/Views/Home/CommunityResponses/ListCommunityResponseView.swift',
                                        type: 'file',
                                        content: `//
//  ListCommunityResponseView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import SwiftUI

// A full list of the community responses to a prompt (infinite scroll)
struct ListCommunityResponseView: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var advertisementController: AdvertisementController
    
//    @State private var isSingleCommunityResponsePopupShowing: Bool = false
    
    var body: some View {
        ZStack {
            VStack {
                ScrollView(showsIndicators: false) {
                    // If a prompt is fetched from firestore and loaded in the controller, show that. Else show the preview (loading) View.
                    if let focusedPrompt = homeController.focusedPrompt {
                        if let focusedImage = homeController.focusedPromptImage {
                            TodaysPrompt(image: focusedImage, prompt: focusedPrompt.promptRawText!, tags: focusedPrompt.tags!, likeCount: focusedPrompt.likeCount!, responseCount: focusedPrompt.shortCount!, includeResponseCount: false)
                        }
                    } else {
                        TodaysPrompt(imageText: "prompt-knight", prompt: "A seasoned knight and his loyal squire discover the scene of a crime. They find a ransacked carriage and dwarf who cannot walk. They discuss what action to take next.", tags: ["Fantasy", "ThronesLike"], likeCount: 173, responseCount: 47, includeResponseCount: true)
                    }
                    
                    // Sort By
                    HStack {
                        Menu {
                            Button(action: {
                                homeController.selectedSortingMethod = 0
                                if let user = userController.user {
                                    homeController.switchShortSortingMethod(blockedUsers: user.blockedUsers ?? [:])
                                }
                                
                            }) {
                                HStack {
                                    Text("Recent")
                                        .font(.system(size: 13, design: .serif))
                                    
                                    Image(systemName: "clock")
                                        .font(.subheadline)
                                }
                                
                            }
                            Button(action: {
                                homeController.selectedSortingMethod = 1
                                if let user = userController.user {
                                    homeController.switchShortSortingMethod(blockedUsers: user.blockedUsers ?? [:])
                                }
                            }) {
                                HStack {
                                    Text("Best")
                                        .font(.system(size: 13, design: .serif))
                                    
                                    Image(systemName: "crown")
                                        .font(.subheadline)
                                }
                            }
                        } label: {
                            HStack {
                                if homeController.selectedSortingMethod == 0 {
                                    Text("Recent")
                                        .font(.system(size: 13, design: .serif))
                                } else if homeController.selectedSortingMethod == 1 {
                                    Text("Best")
                                        .font(.system(size: 13, design: .serif))
                                }
                                Image(systemName: "chevron.down")
                                    .font(.subheadline)
                            }
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    
                    
                    // if there's no shorts yet
                    if (homeController.focusedFullCommunityShorts.isEmpty) {

                    } else {
                        if homeController.selectedSortingMethod == 0 {
                            // If there's an advertisement for today, show it.
                            if let ad = advertisementController.focusedAd {
                                AdPreviewView()
                            }
                            
                            
                            ForEach(homeController.focusedFullCommunityShorts) { short in
                                Button(action: {
                                }) {
                                    SingleLimitedCommunityResponse(short: short, isOwnedShort: false)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        } else {
                            if let ad = advertisementController.focusedAd {
                                AdPreviewView()
                            }
                            ForEach(homeController.focusedFullCommunityShortsByLikeCount) { short in
                                Button(action: {
                                }) {
                                    SingleLimitedCommunityResponse(short: short, isOwnedShort: false)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        
                        // older button
                        if !homeController.areNoShortsLeftToLoad {
                            Button(action: {
                                if let user = userController.user {
                                    homeController.retrieveNextFullCommunityShorts(blockedUsers: user.blockedUsers ?? [:])
                                }
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 110, height: 35)
                                    .overlay {
                                        HStack {
                                            Text("More")
                                                .font(.system(size: 14, design: .serif))
                                                .bold()
                                            
                                            Image(systemName: "arrow.down")
                                                .resizable()
                                                .frame(width: 10, height: 10)
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                }
                .padding(.leading, 20)
                .padding(.trailing, 20)
            }
        }
        .padding(.bottom, 25)
        .onAppear {
            if let user = userController.user {
                homeController.focusedFullCommunityShorts = []
                homeController.focusedFullCommunityShortsByLikeCount = []
                homeController.selectedSortingMethod = 0
                homeController.retrieveFullCommunityShorts(blockedUsers: user.blockedUsers ?? [:])
            }
            
        }
    }
}

#Preview {
    ListCommunityResponseView()
        .environmentObject(HomeController())
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SingleCommunityResponseView.swift',
                                        path: 'Writing/Views/Home/CommunityResponses/SingleCommunityResponseView.swift',
                                        type: 'file',
                                        content: `//
//  SingleCommunityResponseView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import FirebaseFirestore
import SwiftUI

// The full view of a single community response to a prompt.
struct SingleCommunityResponseView: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        ZStack {
            if let short = homeController.focusedSingleShort {
                VStack {
                    ScrollView(showsIndicators: false) {
                        
                        
                        // Prompt
                        if let prompt = homeController.focusedPrompt {
                            Text(prompt.promptRawText!)
                                .font(.system(size: 14, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .italic()
                                .padding(.bottom, 20)
                        } else {
                            Text("prompt not loaded")
                                .font(.system(size: 14, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .italic()
                                .padding(.bottom, 20)
                        }
                        
                        
                        HStack {
                            // Image
                            // Profile Picture
                            if homeController.isFocusedShortOwned {
                                if let image = userController.usersProfilePicture {
                                    Image(uiImage: image)
                                        .resizable()
                                        .clipShape(RoundedRectangle(cornerRadius: 15))
                                        .frame(width: 40, height: 40)
                                } else {
                                    Image("not-signed-in-profile")
                                        .resizable()
                                        .clipShape(RoundedRectangle(cornerRadius: 15))
                                        .frame(width: 40, height: 40)
                                }
                            } else {
                                if let image = homeController.communityProfilePictures[short.authorId!] {
                                    Image(uiImage: image)
                                        .resizable()
                                        .clipShape(RoundedRectangle(cornerRadius: 15))
                                        .frame(width: 40, height: 40)
                                } else {
                                    Image("not-signed-in-profile")
                                        .resizable()
                                        .clipShape(RoundedRectangle(cornerRadius: 15))
                                        .frame(width: 40, height: 40)
                                }
                            }
                            
                            VStack {
                                // Name
                                Text(short.authorFirstName! + " " + short.authorLastName!)
                                    .font(.system(size: 15, design: .serif))
                                    .frame(maxWidth: 140, alignment: .leading)
                                    
                                // Date posted
                                Text(short.rawTimestamp!.dateValue().formatted(date: .abbreviated, time: .shortened))
                                    .font(.system(size: 12, design: .serif))
                                    .opacity(0.6)
                                    .frame(maxWidth: 140, alignment: .leading)
                            }
//                            .frame(maxWidth: 140, alignment: .leading)
                            .padding(.trailing, 10)
                            
                            
                            // Num Shorts
                            VStack {
                                if let author = homeController.focusedShortAuthor {
                                    Text("\\(author.shortsCount!.formatted())")
                                        .font(.system(size: 16, design: .serif))
                                        .foregroundStyle(Color.green)
                                } else {
                                    Text("")
                                        .font(.system(size: 16, design: .serif))
                                        .foregroundStyle(Color.green)
                                }
                                
                                
                                Text("Shorts")
                                    .font(.system(size: 12, design: .serif))
                                
                            }
                            .padding(.leading, 15)
                            
                            // Num Likes
                            VStack {
                                if let author = homeController.focusedShortAuthor {
                                    Text("\\(author.numLikes!.formatted())")
                                        .font(.system(size: 16, design: .serif))
                                        .foregroundStyle(Color.blue)
                                } else {
                                    Text("")
                                        .font(.system(size: 16, design: .serif))
                                        .foregroundStyle(Color.blue)
                                }
                                
                                
                                Text("Likes")
                                    .font(.system(size: 12, design: .serif))
                                
                            }
                            .padding(.leading, 15)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.bottom, 5)
                    
                        
                        // Response
                        Text(short.shortRawText!)
                            .font(.system(size: 13, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            // Like short button
                            Button(action: {
                                // Rate Limiting check
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    if let user = userController.user {
                                        if let shortsLikes = user.likedShorts {
                                            homeController.likeShort(usersShortsLikes: shortsLikes)
                                        } else {
                                            homeController.likeShort(usersShortsLikes: [:])
                                        }
                                    }
                                    
                                    // check a short is focused
                                    if let short = homeController.focusedSingleShort {
                                        userController.likeShort(shortId: short.id!)
                                    }
                                    
                                }
                            }) {
                                ZStack {
                                    // Unliked like count (no color)
                                    HStack {
                                        // Comment image
                                        Image(systemName: "hand.thumbsup")
                                            .resizable()
                                            .frame(width: 15, height: 15)
                                        // comment number
                                        Text("\\(short.likeCount!.formatted())")
                                            .font(.system(size: 13, design: .serif))
                                    }
                                    
                                    // Liked like count (color)
                                    if let short = homeController.focusedSingleShort {
                                        if let user = userController.user {
                                            if let likesShorts = user.likedShorts {
                                                if let isLiked = likesShorts[short.id!] {
                                                    if isLiked == true {
                                                        HStack {
                                                            // Comment image
                                                            Image(systemName: "hand.thumbsup")
                                                                .resizable()
                                                                .frame(width: 15, height: 15)
                                                            // comment number
                                                            Text("\\(short.likeCount!.formatted())")
                                                                .font(.system(size: 13, design: .serif))
                                                        }
                                                        .foregroundStyle(Color.orange)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            HStack {
                                // Comment image
                                Image(systemName: "message")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                                // comment number
                                Text("\\(short.commentCount!.formatted())")
                                    .font(.system(size: 13, design: .serif))
                            }
                            
                            
                            
                            
                            Button(action: {
                                homeController.isReportShortAlertShowing = true
                            }) {
                                Image(systemName: "info.circle")
                                    .font(.caption)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .alert("Report Short", isPresented: $homeController.isReportShortAlertShowing) {
                                Button("Offensive") {
                                    // Rate Limiting check
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        homeController.reportShort(reportReason: "Offensive")
                                    }
                                }
                                
                                Button("Harmful or Abusive") {
                                    // Rate Limiting check
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        homeController.reportShort(reportReason: "Harmful or Abusive")
                                    }
                                }
                                
                                Button("Graphic content") {
                                    // Rate Limiting check
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        homeController.reportShort(reportReason: "Graphic content")
                                    }
                                }
                                
                                Button("Poor Quality / Image does not match text") {
                                    // Rate Limiting check
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        homeController.reportShort(reportReason: "Poor Quality / Image does not match text")
                                    }
                                }
                                
                                Button("Block User") {
                                    // Rate Limiting check
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        if let short = homeController.focusedSingleShort {
                                            userController.blockUser(userId: short.authorId!)
                                        }
                                        
                                    }
                                }
                                
                                Button("Cancel", role: .cancel) { }
                            }
                            
                            if let isNSFW = short.isNSFW {
                                if isNSFW {
                                    Text("NSFW")
                                        .font(.system(size: 10, design: .serif))
                                        .foregroundStyle(Color.red)
                                        .opacity(0.6)
                                }
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        
                        
                        Text("Comments")
                            .font(.system(size: 13, design: .serif))
                        
                        Button(action: {
                            homeController.isCreateCommentSheetShowing = true
                        }) {
                            RoundedRectangle(cornerRadius: 25.0)
                                .stroke(lineWidth: 1)
                                .frame(width: 140, height: 40)
                                .overlay {
                                    HStack {
                                        // TODO(bendreyer): have a couple different openers here (start your creation, dive right in, etc..) and pick one at random
                                        Text("Add a comment")
                                            .font(.system(size: 10, design: .serif))
                                            .bold()
                                        
                                        Image(systemName: "message")
                                            .font(.caption)
                                        
                                    }
                                }
                                .padding(.bottom, 10)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.leading, 2)
                        
                        // Response Comments (hardcoded 3 for now)
                        //                        CommunityResponseComment(imageName: "space-guy", authorHandle: "southxx", timePosted: "7:45am", comment: "Really a substantial comment I appreciate your resiliancy in this area, lie forreal")
                        //                        CommunityResponseComment(imageName: "hoop-guy", authorHandle: "jokic", timePosted: "9:32pm", comment: "I'm not really sure how this relates to basketball at all. Please try again, 4/10.")
                        
                        // comments for the short
                        ForEach(homeController.focusedShortComments) { comment in
                            CommunityResponseComment(comment: comment)
                        }
                        
                        if !homeController.areNoCommentsLeftToLoad {
                            Button(action: {
                                if let user = userController.user {
                                    homeController.retrieveNextShortComments()
                                }
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 110, height: 35)
                                    .overlay {
                                        HStack {
                                            Text("Older")
                                                .font(.system(size: 14, design: .serif))
                                            //                                            .bold()
                                            
                                            Image(systemName: "arrow.down")
                                            
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                }
                .padding(20)
            } else {
                VStack {
                    Text("error loading short.. awkward")
                }
            }
        }
        .sheet(isPresented: $homeController.isCreateCommentSheetShowing) {
            // Create comment view
            CreateCommentView()
                .presentationDetents([.height(400), .medium])
                .presentationDragIndicator(.automatic)
        }
        
    }
}

#Preview {
    SingleCommunityResponseView()
        .environmentObject(HomeController())
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SingleLimitedCommunityResponse.swift',
                                        path: 'Writing/Views/Home/CommunityResponses/SingleLimitedCommunityResponse.swift',
                                        type: 'file',
                                        content: `//
//  SingleLimitedCommunityResponse.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import FirebaseFirestore
import SwiftUI

struct SingleLimitedCommunityResponse: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    
    // The short to be displayed (limied means preview, only show like first 200 characters of response)
    var short: Short
    // If the short belongs to the user, else it's a community short.
    var isOwnedShort: Bool
    
    var body: some View {
        Button(action: {
            homeController.focusSingleShort(short: self.short, isOwned: isOwnedShort)
            homeController.isFullCommunityResposneSheetShowing = true
        }) {
            VStack {
                HStack {
                    // Profile Picture
                    if isOwnedShort {
                        if let image = userController.usersProfilePicture {
                            Image(uiImage: image)
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        } else {
                            Image("not-signed-in-profile")
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        }
                    } else {
                        if let image = homeController.communityProfilePictures[short.authorId!] {
                            Image(uiImage: image)
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        } else {
                            Image("not-signed-in-profile")
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        }
                    }
                    
                    
                    
                    VStack {
                        // Handle
                        Text(short.authorFirstName! + " " + short.authorLastName!)
                            .font(.system(size: 12, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            // Author title
                            Text(homeController.convertTitleIntToString(int: short.authorTitle ?? 0))
                                .font(.system(size: 10, design: .serif))
                                .opacity(0.6)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                    
                }
                
                // Response
                Text(short.shortRawText!.prefix(200))
                    .font(.system(size: 13, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                HStack {
                    
                    ZStack {
                        HStack {
                            // like image
                            Image(systemName: "hand.thumbsup")
                                .resizable()
                                .frame(width: 15, height: 15)
                            // like number
                            Text("\\(short.likeCount!.formatted())")
                                .font(.system(size: 13, design: .serif))
                        }
                        if let user = userController.user {
                            if let likesShorts = user.likedShorts {
                                if let isLike = likesShorts[self.short.id!] {
                                    if isLike {
                                        HStack {
                                            Image(systemName: "hand.thumbsup")
                                                .resizable()
                                                .frame(width: 15, height: 15)
                                            Text("\\(short.likeCount!.formatted())")
                                                .font(.system(size: 13, design: .serif))
                                        }
                                        .foregroundStyle(Color.orange)
                                    }
                                }
                            }
                        }
                    }
                    
                    HStack {
                        // Comment image
                        Image(systemName: "message")
                            .resizable()
                            .frame(width: 15, height: 15)
                        // comment number
                        Text("\\(short.commentCount!.formatted())")
                            .font(.system(size: 13, design: .serif))
                    }
                    
                    // Report Short
                    Image(systemName: "info.circle")
                        .font(.caption)
                    
                    if let isNSFW = short.isNSFW {
                        if isNSFW {
                            Text("NSFW")
                                .font(.system(size: 10, design: .serif))
                                .foregroundStyle(Color.red)
                                .opacity(0.6)
                        }
                    }
                    
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.bottom, 10)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    SingleLimitedCommunityResponse(short: Short(date: "20240620", rawTimestamp: Timestamp(), authorId: "123", authorFirstName: "Ben", authorLastName: "Dreyer", authorProfilePictureUrl: "123", authorNumShorts: 12, authorNumLikes: 144, shortRawText: "This is a response for a good prompt and it was a great prompt to be honest so yearh.", likeCount: 4, commentCount: 1), isOwnedShort: false)
        .environmentObject(HomeController())
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'CreateCommentView.swift',
                                path: 'Writing/Views/Home/CreateCommentView.swift',
                                type: 'file',
                                content: `//
//  CreateCommentView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/22/24.
//

import Combine
import SwiftUI

struct CreateCommentView: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    var body: some View {
        ZStack {
            VStack {
                // The short the user's adding a comment to:
                if let short = homeController.focusedSingleShort {
                    HStack {
                        // Profile Picture
                        if homeController.isFocusedShortOwned {
                            if let image = userController.usersProfilePicture {
                                Image(uiImage: image)
                                    .resizable()
                                    .clipShape(Circle())
                                    .frame(width: 40, height: 40)
                            } else {
                                Image("not-signed-in-profile")
                                    .resizable()
                                    .clipShape(Circle())
                                    .frame(width: 40, height: 40)
                            }
                        } else {
                            if let image = homeController.communityProfilePictures[short.authorId!] {
                                Image(uiImage: image)
                                    .resizable()
                                    .clipShape(Circle())
                                    .frame(width: 40, height: 40)
                            } else {
                                Image("not-signed-in-profile")
                                    .resizable()
                                    .clipShape(Circle())
                                    .frame(width: 40, height: 40)
                            }
                        }
                        
                        VStack {
                            // Handle
                            Text(short.authorFirstName! + " " + short.authorLastName!)
                                .font(.system(size: 12, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            // Date posted
                            Text(short.rawTimestamp!.dateValue().formatted(date: .abbreviated, time: .shortened))
                                .font(.system(size: 12, design: .serif))
                                .opacity(0.6)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        
                    }
                    
                    // Response
                    Text(short.shortRawText!.prefix(200))
                        .font(.system(size: 13, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.bottom, 10)
                    
                    // TODO(bendreyer): have a couple different openers here (once upon a time, in a land far far away, etc..) and pick one at random
                    TextField("Great job...",text: $homeController.commentText, axis: .vertical)
                    //                    .modifier(KeyboardAdaptive())
                        .font(.system(size: 16, design: .serif))
                    // Styling
                        .padding(.vertical, 8)
                        .background(
                            VStack {
                                Spacer()
                                Color(UIColor.systemGray4)
                                    .frame(height: 2)
                            }
                        )
                        .onReceive(Just(homeController.commentText)) { _ in homeController.limitCommentTextLength(250) }
                    
                    
                    HStack {
                        // Character Count
                        Text("\\(homeController.commentText.count) / 250 Characters")
                            .font(.system(size: 12, design: .serif))
                        
                        Button(action: {
                            // Rate Limiting check
                            if let rateLimit = userController.processFirestoreWrite() {
                                print(rateLimit)
                            } else {
                                // Ensure user is available
                                if let user = userController.user {
                                    // Ensure a prompt is focused
                                    if let _ = homeController.focusedPrompt {
                                        Task {
                                             // Submit comment
                                            homeController.submitComment(user: user)
                                            // refresh the comment list, so the newly submitted one will show up
    //                                        homeController.retrieveSignedInUsersShort()
                                        }
                                    } else {
                                        print("prompt not available")
                                    }
                                } else {
                                    print("user not available")
                                }
                            }
                        }) {
                            if homeController.commentText.isEmpty {
                                Image(systemName: "arrowshape.right.circle")
                                    .font(.callout)
                                    .foregroundStyle(Color.gray)
                            } else {
                                Image(systemName: "arrowshape.right.circle")
                                    .font(.callout)
                                    .foregroundStyle(Color.green)
                            }
                            
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .trailing)
                    
                    
                } else {
                    Text("error loading the short, sorry :O")
                        .italic()
                }
                
                Spacer()
            }
            .padding(.top, 40)
            .padding(.leading, 20)
            .padding(.trailing, 20)
            
        }
    }
}

#Preview {
    CreateCommentView()
        .environmentObject(HomeController())
        .environmentObject(UserController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CreateResponseView.swift',
                                path: 'Writing/Views/Home/CreateResponseView.swift',
                                type: 'file',
                                content: `//
//  CreateResponseView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import SwiftUI
import Combine

struct CreateResponseView: View {
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    
    @EnvironmentObject var createShortController : CreateShortController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var profileController: ProfileController
    
//    @State private var response: String = ""
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                // Show focused prompt or a fallback if it's not loaded
                if let focusedPrompt = homeController.focusedPrompt {
                    if homeController.focusedPromptImage != nil {
                        TodaysPrompt(image: nil, prompt: focusedPrompt.promptRawText!, tags: focusedPrompt.tags!, likeCount: focusedPrompt.likeCount!, responseCount: focusedPrompt.shortCount!, includeResponseCount: true)
                    }
                } else {
                    TodaysPrompt(image: nil, prompt: "We couldn't load the prompt for the date you selected, sorry about that, please try a different date!", tags: ["Awkward"], likeCount: 0, responseCount: 0, includeResponseCount: true)
                }
                
                // TODO(bendreyer): have a couple different openers here (once upon a time, in a land far far away, etc..) and pick one at random
                TextField("Once upon a time...",text: $createShortController.shortContent, axis: .vertical)
//                    .modifier(KeyboardAdaptive())
                    .font(.system(size: 16, design: .serif))
                // Styling
                    .padding(.vertical, 8)
                    .background(
                        VStack {
                            Spacer()
                            Color(UIColor.systemGray4)
                                .frame(height: 2)
                        }
                    )
                // character limit
                    .onReceive(Just(createShortController.shortContent)) { _ in createShortController.limitTextLength(createShortController.characterLimit) }
                HStack {
                    Button(action: {
                        // Toggle the check state
                        createShortController.isNSFW.toggle()
                    }) {
                        HStack {
                            if createShortController.isNSFW {
                                Text("NSFW?")
                                    .font(.system(size: 10, design: .serif))
                                    .foregroundColor(.red)
                            } else {
                                Text("NSFW?")
                                    .font(.system(size: 10, design: .serif))
                            }
                            Image(systemName: createShortController.isNSFW ? "checkmark.square.fill" : "square")
                                .foregroundColor(createShortController.isNSFW ? .blue : .gray)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.trailing, 2)
                    
                    // Character Count
                    Text("\\(createShortController.shortContent.count) / 2500 Characters")
                        .font(.system(size: 12, design: .serif))
                    
                    Button(action: {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            if createShortController.shortContent.isEmpty {
                                return
                            } else {
                                // Ensure user is available
                                if let user = userController.user {
                                    // Ensure a prompt is focused
                                    if let prompt = homeController.focusedPrompt {
                                        Task {
                                            createShortController.submitShort(user: user, prompt: prompt)
                                            
                                            // refresh, so the just submitted short will show up back on home view
                                            homeController.retrieveSignedInUsersShort()
                                            
                                            // refresh the profile view, so the new short shows up on the profile
                                            profileController.retrieveShorts()
                                            
                                            // refresh user stats
                                            userController.retrieveUserFromFirestore(userId: user.id!)
                                            
                                            createShortController.isCreateShortSheetShowing = false
                                        }
                                    } else {
                                        print("prompt not available")
                                    }
                                } else {
                                    print("user not available")
                                }
                            }
                        }
                    }) {
                        Image(systemName: "arrowshape.right.circle")
                            .font(.callout)
                            .foregroundStyle(createShortController.shortContent.count == 0 ? Color.gray : Color.green)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .trailing)
                
                Spacer()
            }
        }
        .padding(.top, 20)
        .padding(.leading, 20)
        .padding(.trailing, 20)
//        .onAppear {
//            self.isTabBarShowing = false
//        }
//        .onDisappear {
//            self.isTabBarShowing = true
//        }
    }
}

#Preview {
    CreateResponseView()
        .environmentObject(CreateShortController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeMainView.swift',
                                path: 'Writing/Views/Home/HomeMainView.swift',
                                type: 'file',
                                content: `//
//  HomeMainView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/1/24.
//

import SwiftUI

struct HomeMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    @StateObject var createShortController = CreateShortController()
    @StateObject var advertisementController = AdvertisementController()
    
    // Date Range for the prompt picker
    let dateRange: ClosedRange<Date> = {
        let calendar = Calendar.current
        let startComponents = DateComponents(year: 2024, month: 8, day: 17)
//        let endComponents = Calendar.current.dateComponents([.year, .month, .day], from: Date())  // THIS IS WHAT'S USED IN PROD (WE DON'T WANT USERS TO GO PAST CURRENT DATE)
        let endComponents = DateComponents(year: 2024, month: 8, day: 30) // USE THIS IN DEV TO TEST FUTURE PROMPTS
        return calendar.date(from:startComponents)!
        ...
        calendar.date(from:endComponents)!
    }()
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    // Today's Prompt and Change Date Button
                    HStack {
                        // Small Logo
                        if (colorScheme == .light) {
                            Image("LogoTransparentWhiteBackground")
                                .resizable()
                                .frame(width: 30, height: 30)
                        } else if (colorScheme == .dark) {
                            Image("LogoBlackBackground")
                                .resizable()
                                .frame(width: 30, height: 30)
                        }
                        
                        Text("| The Daily Short")
                            .font(.system(size: 16, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .bold()
                        
                        DatePicker(
                            "",
                            selection: $homeController.promptSelectedDate,
                            in: dateRange,
                            displayedComponents: [.date]
                        )
                        .labelsHidden()
                        .onChange(of: homeController.promptSelectedDate) {
                            homeController.retrievePrompt()
                            homeController.retrieveSignedInUsersShort()
                            homeController.focusedTopCommunityShorts = []
                            createShortController.shortContent = ""
                        }
                        
                    }
                    .padding(.top, 15)
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                    
                    ScrollView(showsIndicators: false) {
                        // If a prompt is fetched from firestore and loaded in the controller, show that. Else show the preview (loading) View.
                        if let focusedPrompt = homeController.focusedPrompt {
                            if let focusedImage = homeController.focusedPromptImage {
                                TodaysPrompt(image: focusedImage, prompt: focusedPrompt.promptRawText!, tags: focusedPrompt.tags!, likeCount: focusedPrompt.likeCount!, responseCount: focusedPrompt.shortCount!, includeResponseCount: true)
                            }
                        } else {
                            // only show the missing prompt if we are NOT currently loading the prompt
                            if !homeController.isPromptLoading {
                                TodaysPrompt(imageText: "missingPrompt", prompt: "We couldn't load the prompt for the date you selected, sorry about that, please try a different date!", tags: ["Awkward"], likeCount: 0, responseCount: 0, includeResponseCount: true)
                            }
                        }
                        
                        
                        // If the user has responded to the loaded prompt, it will show their response. Otherwise a button to create it.
                        CreateShortOrYourExistingShort()
                        
                        CommunityResponses()
                        
                        Spacer()
                        
                        // Logo
                        if (colorScheme == .light) {
                            Image("LogoTransparentWhiteBackground")
                                .resizable()
                                .frame(width: 80, height: 80)
                        } else if (colorScheme == .dark) {
                            Image("LogoBlackBackground")
                                .resizable()
                                .frame(width: 80, height: 80)
                        }
                        Text("The Daily Short")
                            .font(.system(size: 15, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .bottom)
                            .opacity(0.8)
                        Text("version 1.1")
                            .font(.system(size: 11, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .bottom)
                            .opacity(0.8)
                    }
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                    .onTapGesture {
                        if (authController.isAuthPopupShowing) {
                            authController.isAuthPopupShowing = false
                        }
                    }
                    .scrollDismissesKeyboard(.interactively)
                }
                .blur(radius: authController.isAuthPopupShowing ? 10.0 : 0.0)
                
                
                if (authController.isAuthPopupShowing) {
                    SignUpOrIn()
                }
            }
            .padding(.bottom, 25)
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
        .sheet(isPresented: $homeController.isFullCommunityResposneSheetShowing) {
            SingleCommunityResponseView()
        }
        .sheet(isPresented: $advertisementController.isFullAdSheetShowing) {
            AdFullView()
        }
        .onAppear {
            // We aren't worried about calling these functions on each view appear, because they retrieve cached data. We're not making a firestore read everytime the view re-appears, just making sure the data on screen is the most up to date.
            
            // Retrieve the prompt for the selected day
            homeController.retrievePrompt()
            // Retrieve the signed in users short for the selected day
            homeController.retrieveSignedInUsersShort()
        }
        .environmentObject(createShortController)
        .environmentObject(advertisementController)
        
    }
}

#Preview {
    HomeMainView()
        .environmentObject(AuthController())
        .environmentObject(HomeController())
        .environmentObject(UserController())
        .environmentObject(CreateShortController())
}


struct CommunityResponses : View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    
//    @State public var areTopCommentsShowing: Bool = false
    
    var body : some View {
        VStack {
            Button(action: {
                if (!homeController.areTopCommentsShowing) {
                    if let user = userController.user {
                        homeController.retrieveTopCommunityShorts(blockedUsers: user.blockedUsers ?? [:])
                    }
                }
                homeController.areTopCommentsShowing.toggle()
            }) {
                if let _ = userController.user {
                    HStack {
                        Text("Top Community Shorts")
                            .font(.system(size: 14, design: .serif))
                            .bold()
                        
                        if (homeController.areTopCommentsShowing) {
                            Image(systemName: "chevron.up")
                                .resizable()
                                .frame(width: 18, height: 10)
                        } else {
                            Image(systemName: "chevron.down")
                                .resizable()
                                .frame(width: 18, height: 10)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                } else {
                    Text("Log in to view community responses")
                        .font(.system(size: 14, design: .serif))
                        .bold()
                }
            }
            .buttonStyle(PlainButtonStyle())
            .frame(maxWidth: .infinity, alignment: .center)
            
            if (homeController.areTopCommentsShowing) {
                VStack {
                    // if there's no shorts yet
                    if (homeController.focusedTopCommunityShorts.isEmpty) {
                        // Just show nothing if there's no shorts yet, less jumpy when the view changes / loads.
                    } else {
                        ForEach(homeController.focusedTopCommunityShorts) { short in
                            SingleLimitedCommunityResponse(short: short, isOwnedShort: false)
                        }
                        
                        // View All Comments
                        NavigationLink(destination: ListCommunityResponseView()) {
                            RoundedRectangle(cornerRadius: 25.0)
                                .stroke(lineWidth: 1)
                                .frame(width: 130, height: 40)
                                .overlay {
                                    HStack {
                                        Text("All Shorts")
                                            .font(.system(size: 11, design: .serif))
                                        
                                        Image(systemName: "message")
                                            .font(.caption)
                                    }
                                }
                                .padding(.bottom, 10)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .padding(.leading, 2)
                    }
                }
            }
        }
    }
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Modules',
                        path: 'Writing/Views/Modules',
                        type: 'directory',
                        children: [
                            {
                                name: 'CommunityResponseComment.swift',
                                path: 'Writing/Views/Modules/CommunityResponseComment.swift',
                                type: 'file',
                                content: `//
//  CommunityResponseComment.swift
//  Writing
//
//  Created by Ben Dreyer on 6/4/24.
//

import FirebaseFirestore
import SwiftUI

struct CommunityResponseComment: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    
    var comment: ShortComment
    
    var body: some View {
        VStack {
            HStack {
                // Profile Picture
                if let image = homeController.communityProfilePictures[comment.authorId!] {
                    Image(uiImage: image)
                        .resizable()
                        .clipShape(Circle())
                        .frame(width: 30, height: 30)
                } else {
                    Image("not-signed-in-profile")
                        .resizable()
                        .clipShape(Circle())
                        .frame(width: 30, height: 30)
                }
                
                VStack {
                    // Handle
                    Text(comment.authorFirstName! + " " + comment.authorLastName!)
                        .font(.system(size: 11, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    
                    HStack {
                        // Date posted
                        Text(comment.rawTimestamp!.dateValue().formatted(date: .abbreviated, time: .shortened))
                            .font(.system(size: 11, design: .serif))
                            .opacity(0.6)
//                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        
                        // Info popup (where you can report, give feedback, etc..)
                        Button(action: {
                            homeController.isReportCommentAlertShowing = true
                        }) {
                            Image(systemName: "info.circle")
                                .font(.caption)
                                .padding(.trailing, 5)
                        }
                        .padding(.leading, 5)
                        .buttonStyle(PlainButtonStyle())
                        .alert("Report Comment", isPresented: $homeController.isReportCommentAlertShowing) {
                            Button("Offensive") {
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    homeController.reportComment(reportReason: "Offensive", commentId: self.comment.id!)
                                }
                            }
                            
                            Button("Harmful or Abusive") {
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    homeController.reportComment(reportReason: "Harmful or Abusive", commentId: self.comment.id!)
                                }
                            }
                            
                            Button("Graphic content") {
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    homeController.reportComment(reportReason: "Graphic content", commentId: self.comment.id!)
                                }
                            }
                            
                            Button("Poor Quality / Image does not match text") {
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    homeController.reportComment(reportReason: "Poor Quality / Image does not match text", commentId: self.comment.id!)
                                }
                            }
                            
                            Button("Cancel", role: .cancel) { }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                
                
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            
            // Response
            Text(comment.commentRawText!)
                .font(.system(size: 12, design: .serif))
                .frame(maxWidth: .infinity, alignment: .leading)
            
            
            
        }
    }
}

#Preview {
    CommunityResponseComment(comment: ShortComment(rawTimestamp: Timestamp(), authorFirstName: "Ben", authorLastName: "Dreyer", commentRawText: "This is a substantial story, it really has a lot of vigor. Well done."))
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'CreateShortOrYourExistingShort.swift',
                                path: 'Writing/Views/Modules/CreateShortOrYourExistingShort.swift',
                                type: 'file',
                                content: `//
//  CreateShortOrYourExistingShort.swift
//  Writing
//
//  Created by Ben Dreyer on 6/18/24.
//

import Combine
import SwiftUI

struct CreateShortOrYourExistingShort: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var createShortController: CreateShortController
//    @StateObject var createShortController = CreateShortController()
    
//    @State var isKeyboardPresented = false
    
    var body: some View {
        VStack {
            // If the users short is not nil in the home Controller, we should show the short. If it is nil, we should show a button that lets the user create their short
            
            if let short = homeController.usersFocusedShort {
                // Show the short if it exists
                Text("Your Response")
                    .font(.system(size: 16, design: .serif))
                    .bold()
                // Image name hardcoded for now
                SingleLimitedCommunityResponse(short: short, isOwnedShort: true)
            } else {
                // Otherwise the user can create a short.
                // But if they are not logged in force them to log in
                if (isSignedIn) {
                    
                    HStack {
                        // User Profile Image
                        if let image = userController.usersProfilePicture {
                            Image(uiImage: image)
                                .resizable()
                                .clipShape(RoundedRectangle(cornerRadius: 15))
                                .frame(width: 40, height: 40)
                        }
                        
                        // User name and title
                        if let user = userController.user {
                            VStack {
                                // Handle
                                Text(user.firstName! + " " + user.lastName!)
                                    .font(.system(size: 12, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                
                                HStack {
                                    // Author title
                                    Text(homeController.convertTitleIntToString(int: user.title ?? 0))
                                        .font(.system(size: 10, design: .serif))
                                        .opacity(0.6)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                            }
                        }
                    }
                    
                    Button(action: {
                        createShortController.isCreateShortSheetShowing = true
                    }) {
                        // Text Field
                        TextField("Once upon a time...",text: $createShortController.shortContent, axis: .vertical)
                            .font(.system(size: 16, design: .serif))
                            .padding(.vertical, 8)
                            .background(
                                VStack {
                                    Spacer()
                                    Color(UIColor.systemGray4)
                                        .frame(height: 2)
                                }
                            )
//                            .onReceive(Just(createShortController.shortContent)) { _ in createShortController.limitTextLength(createShortController.characterLimit) }
////                            .onReceive(keyboardPublisher) { value in
////                                print("Is keyboard visible? ", value)
////                                isKeyboardPresented = value
////                                isTabBarShowing = !isKeyboardPresented
////                            }
                            .disabled(!createShortController.isCreateShortSheetShowing)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    
                    
                    HStack {
                        // Is NSFW?
                        
                        if createShortController.isNSFW {
                            Text("NSFW")
                                .font(.system(size: 10, design: .serif))
                                .foregroundColor(Color.red)
                        }
                        
                        
                        // Character Count
                        Text("\\(createShortController.shortContent.count) / 2500 Characters")
                            .font(.system(size: 12, design: .serif))
                        
                        Button(action: {
                            // Rate Limiting check
                            if let rateLimit = userController.processFirestoreWrite() {
                                print(rateLimit)
                            } else {
                                
                                if createShortController.shortContent == "" {
                                    return
                                }
                                
                                // Ensure user is available
                                if let user = userController.user {
                                    // Ensure a prompt is focused
                                    if let prompt = homeController.focusedPrompt {
                                        Task {
                                            createShortController.submitShort(user: user, prompt: prompt)
                                            
                                            // refresh, so the just submitted short will show up back on home view
                                            homeController.retrieveSignedInUsersShort()
                                            
                                            // refresh the profile view, so the new short shows up on the profile
                                            profileController.retrieveShorts()
                                            
                                            // refresh user stats
                                            userController.retrieveUserFromFirestore(userId: user.id!)
                                            
                                            createShortController.isCreateShortSheetShowing = false
                                        }
                                    } else {
                                        print("prompt not available")
                                    }
                                } else {
                                    print("user not available")
                                }
                            }
                        }) {
                            Image(systemName: "arrowshape.right.circle")
                                .font(.callout)
                                .foregroundStyle(createShortController.shortContent.count == 0 ? Color.gray : Color.green)
                        }
                        
                    }
                    .frame(maxWidth: .infinity, alignment: .trailing)
                } else {
                    Button(action: {
                        // enable show auth screen
                        authController.isAuthPopupShowing = true
                    }) {
                        RoundedRectangle(cornerRadius: 25.0)
                            .stroke(lineWidth: 1)
                            .frame(width: 220, height: 40)
                            .overlay {
                                HStack {
                                    Text("Create Account / Sign In")
                                        .font(.system(size: 14, design: .serif))
                                        .bold()
                                    
                                    Image(systemName: "person.badge.plus")
                                    
                                }
                            }
                            .padding(.bottom, 10)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                
                
            }
        }
        .sheet(isPresented: $createShortController.isCreateShortSheetShowing) {
            CreateResponseView()
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.automatic)
        }
        .onAppear {
            createShortController.shortContent = ""
            createShortController.isNSFW = false
        }
        .environmentObject(createShortController)
        
    }
    //    }
}

#Preview {
    CreateShortOrYourExistingShort()
        .environmentObject(HomeController())
        .environmentObject(UserController())
        .environmentObject(AuthController())
        .environmentObject(CreateShortController())
        .environmentObject(ProfileController())
}


extension View {

  var keyboardPublisher: AnyPublisher<Bool, Never> {
    Publishers
      .Merge(
        NotificationCenter
          .default
          .publisher(for: UIResponder.keyboardWillShowNotification)
          .map { _ in true },
        NotificationCenter
          .default
          .publisher(for: UIResponder.keyboardWillHideNotification)
          .map { _ in false })
      .debounce(for: .seconds(0.1), scheduler: RunLoop.main)
      .eraseToAnyPublisher()
  }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SideBarStack.swift',
                                path: 'Writing/Views/Modules/SideBarStack.swift',
                                type: 'file',
                                content: `//
//  SideBarStack.swift
//  Writing
//
//  Created by Ben Dreyer on 6/9/24.
//

import SwiftUI

struct SideBarStack<SidebarContent: View, Content: View>: View {
    
    let sidebarContent: SidebarContent
    let mainContent: Content
    let sidebarWidth: CGFloat
    @Binding var showSidebar: Bool
    
    init(sidebarWidth: CGFloat, showSidebar: Binding<Bool>, @ViewBuilder sidebar: ()->SidebarContent, @ViewBuilder content: ()->Content) {
        self.sidebarWidth = sidebarWidth
        self._showSidebar = showSidebar
        sidebarContent = sidebar()
        mainContent = content()
    }
    
    var body: some View {
        ZStack(alignment: .leading) {
            sidebarContent
                .frame(width: sidebarWidth, alignment: .center)
                .offset(x: showSidebar ? 0 : -1 * sidebarWidth, y: 0)
                .animation(Animation.easeInOut.speed(1))
            mainContent
                .overlay(
                    Group {
                        if showSidebar {
                            Color.white
                                .opacity(showSidebar ? 0.01 : 0)
                                .onTapGesture {
                                    self.showSidebar = false
                                }
                        } else {
                            Color.clear
                            .opacity(showSidebar ? 0 : 0)
                            .onTapGesture {
                                self.showSidebar = false
                            }
                        }
                    }
                )
                .offset(x: showSidebar ? sidebarWidth : 0, y: 0)
//                .animation(.easeInOut, 1)
                .animation(Animation.easeInOut.speed(1))
                
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'TodaysPrompt.swift',
                                path: 'Writing/Views/Modules/TodaysPrompt.swift',
                                type: 'file',
                                content: `//
//  TodaysPrompt.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import SwiftUI

struct TodaysPrompt: View {
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    
    var image: UIImage?
    var imageText: String?
    var prompt: String
    var tags: [String]
    var likeCount: Int
    var responseCount: Int
    var includeResponseCount: Bool
    
    // Max Three Tags
    var tagColorOrder = [Color.red, Color.blue, Color.green]
    
    var isIPad: Bool {
        UIDevice.current.userInterfaceIdiom == .pad
    }
    
    var body: some View {
        // Image
        if let img = image {
            if isIPad {
                Image(uiImage: img)
                    .resizable()
                    .frame(maxWidth: 1000, maxHeight: 740)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
            } else {
                Image(uiImage: img)
                    .resizable()
                    .frame(maxWidth: 400, maxHeight: 370)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
            }
        } else {
            if isIPad {
                Image(imageText ?? "")
                    .resizable()
                    .frame(maxWidth: 1000, maxHeight: 740)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
            } else {
                Image(imageText ?? "")
                    .resizable()
                    .frame(maxWidth: 400, maxHeight: 300)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
            }
        }
        
        
        // Text
        Text(prompt)
            .font(.system(size: 14, design: .serif))
            .frame(maxWidth: .infinity, alignment: .leading)
            .italic()
            .padding(.bottom, 5)
        
        // Tags & Like Count
        HStack {
            Group {
                
                ForEach(Array(tags.enumerated()), id: \\.element) { index, tag in
                    Text("#\\(tag)")
                        .font(.system(size: 13, design: .serif))
                        .foregroundStyle(tagColorOrder[index % tagColorOrder.count])
                }
            }
            
            // Likes, Responses, Feedback, report, and admin button
            HStack {
                // Likes
                Button(action: {
                    // Rate Limiting check
                    if let rateLimit = userController.processFirestoreWrite() {
                        print(rateLimit)
                    } else {
                        if let user = userController.user {
                            if let userLikesPrompts = user.likedPrompts {
                                homeController.likePrompt(usersPromptLikes: userLikesPrompts)
                            } else {
                                homeController.likePrompt(usersPromptLikes: [:])
                            }
                        }
                        // check a prompt is focused
                        if let prompt = homeController.focusedPrompt {
                            userController.likePrompt(promptDate: prompt.date!)
                        }
                    }
                }) {
                    ZStack {
                        // Non colored like count (when a user hasn't liked this prompt)
                        HStack {
                            Image(systemName: "hand.thumbsup")
                                .font(.caption)
                            // Like Count
                            Text("\\(likeCount.formatted())")
                                .font(.system(size: 13, design: .serif))
                        }
                        
                        // Colored like count (when a user has liked this prompt)
                        if let prompt = homeController.focusedPrompt {
                            if let user = userController.user {
                                if let likesPrompts = user.likedPrompts {
                                    if let isLiked = likesPrompts[prompt.date!] {
                                        if isLiked == true {
                                            HStack {
                                                Image(systemName: "hand.thumbsup")
                                                    .font(.caption)
                                                // Like Count
                                                Text("\\(likeCount.formatted())")
                                                    .font(.system(size: 13, design: .serif))
                                            }
                                            .foregroundStyle(Color.orange)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .buttonStyle(PlainButtonStyle())
                
                // Responses
                if (includeResponseCount) {
                    NavigationLink(destination: ListCommunityResponseView()) {
                        HStack {
                            Image(systemName: "arrowshape.turn.up.right")
                                .font(.caption)
                            // Response Count
                            Text("\\(responseCount.formatted())")
                                .font(.system(size: 13, design: .serif))
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    
                }
                
                // Info popup (where you can report, give feedback, etc..)
                Button(action: {
                    homeController.isReportPromptAlertShowing = true
                }) {
                    Image(systemName: "info.circle")
                        .font(.caption)
                        .padding(.trailing, 5)
                }
                .buttonStyle(PlainButtonStyle())
                .alert("Report Prompt", isPresented: $homeController.isReportPromptAlertShowing) {
                    Button("Offensive") {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            homeController.reportPrompt(reportReason: "Offensive")
                        }
                    }
                    
                    Button("Harmful or Abusive") {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            homeController.reportPrompt(reportReason: "Harmful or Abusive")
                        }
                    }
                    
                    Button("Graphic content") {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            homeController.reportPrompt(reportReason: "Graphic content")
                        }
                    }
                    
                    Button("Poor Quality / Image does not match text") {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            homeController.reportPrompt(reportReason: "Poor Quality / Image does not match text")
                        }
                    }
                    
                    Button("Cancel", role: .cancel) { }
                }
                                
                // Admin button to add responses (for testing) (not AI yet)
                if let user = userController.user {
                    if user.isAdmin! == true {
                        Button(action: {
                            homeController.addCommunityShorts()
                        }) {
                            Image(systemName: "plus.circle")
                                .font(.caption)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .foregroundStyle(Color.green)
                        .padding(.trailing, 5)
                    }
                }
                
            }
            .frame(maxWidth: .infinity, alignment: .trailing)
        }
        .padding(.bottom, 10)
    }
}

#Preview {
    TodaysPrompt(imageText: "", prompt: "A seasoned knight and his loyal squire discover the scene of a crime. They find a ransacked carriage and dwarf who cannot walk. They discuss what action to take next.", tags: ["Fantasy", "ThronesLike", "Buboy"], likeCount: 173, responseCount: 47, includeResponseCount: true)
        .environmentObject(HomeController())
        .environmentObject(UserController())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Navigation',
                        path: 'Writing/Views/Navigation',
                        type: 'directory',
                        children: [
                            {
                                name: 'NavBarView.swift',
                                path: 'Writing/Views/Navigation/NavBarView.swift',
                                type: 'file',
                                content: `//
//  NavBarView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/4/24.
//

import SwiftUI

struct NavBarView: View {
    //    @AppStorage("isSignedIn") private var isSignedIn = false
    @Environment(\\.colorScheme) var colorScheme
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    
    @State var selectedTab = 0
    
    
    var body: some View {
        
        ZStack(alignment: .bottom) {
            TabView(selection: $selectedTab) {
                HomeMainView()
                    .tag(0)
                
                FreeWriteContentView()
                    .tag(1)
                
                ProfileContentView()
                    .tag(2)
            }
            ZStack{
                HStack{
                    ForEach((TabbedItems.allCases), id: \\.self){ item in
                        Button{
                            selectedTab = item.rawValue
                        } label: {
                            CustomTabItem(imageName: item.iconName, title: item.title, isActive: (selectedTab == item.rawValue))
                        }
                    }
                }
                .padding(6)
            }
            // Border
//            .frame(maxWidth: 100)
            .frame(height: 70)
            .background(colorScheme == .light ? .white.opacity(0.6) : .black.opacity(0.6))
            .cornerRadius(35)
            .overlay(
                RoundedRectangle(cornerRadius: 35)
                    .stroke(colorScheme == .light ? Color.black : Color.white, lineWidth: 1) // 1 px border
            )
            .padding(.horizontal, 80)
            // tab bar visibility
            .opacity(self.isTabBarShowing ? 1.0 : 0.0)
            
            
        }
        //        TabView {
        //            Group {
        //                HomeMainView()
        //                    .tabItem {
        //                        Label("Home", systemImage: "house")
        //                    }
        //
        //                ProfileContentView()
        //                    .tabItem { Label("Profile", systemImage: "person") }
        //
        //            }
        //            .toolbarBackground(.visible, for: .tabBar)
        //        }
    }
}

#Preview {
    NavBarView()
        .environmentObject(AuthController())
        .environmentObject(ProfileController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
        .environmentObject(CreateShortController())
}

enum TabbedItems : Int, CaseIterable {
    case home = 0
    
    case freeWrite
    case profile
    
    var title: String{
        switch self {
        case .home:
            return "Home"
        case .freeWrite:
            return "Free Write"
        case .profile:
            return "Profile"
        }
    }
    
    var iconName: String{
        switch self {
        case .home:
            return "house"
        case .freeWrite:
            return "books.vertical"
        case .profile:
            return "person"
        }
    }
}


extension NavBarView{
    func CustomTabItem(imageName: String, title: String, isActive: Bool) -> some View{
        HStack(spacing: 10){
            Spacer()
            Image(systemName: imageName)
                .resizable()
                .renderingMode(.template)
//                .foregroundColor(isActive ? .black : .gray)
                .foregroundColor(colorScheme == .light ? isActive ? .white : .gray : isActive ? .black : .gray)
                .frame(width: 20, height: 20)
            if isActive{
//                Text(title)
//                    .font(.system(size: 14))
////                    .foregroundColor(isActive ? .black : .gray)
//                    .foregroundColor(colorScheme == .light ? .white : .black)
            }
            Spacer()
        }
        .frame(maxWidth: isActive ? 100 : 60, maxHeight: 60)
//        .background(isActive ? .white.opacity(0.4) : .clear)
        .background(colorScheme == .light ? isActive ? .black.opacity(0.9) : .clear : isActive ? .white.opacity(0.9) : .clear)
        .cornerRadius(30)
    }
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Profile',
                        path: 'Writing/Views/Profile',
                        type: 'directory',
                        children: [
                            {
                                name: 'ProfileContentView.swift',
                                path: 'Writing/Views/Profile/ProfileContentView.swift',
                                type: 'file',
                                content: `//
//  ProfileContentView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/15/24.
//

import SwiftUI

struct ProfileContentView: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    var body: some View {
        ZStack {
            ProfileMainViewNotSignedIn()
                .opacity(isSignedIn ? 0.0 : 1.0)
            ProfileMainView()
                .opacity(isSignedIn ? 1.0 : 0.0)
        }
    }
}

#Preview {
    ProfileContentView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ProfileMainView-SignedIn',
                                path: 'Writing/Views/Profile/ProfileMainView-SignedIn',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'Analysis',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/Analysis',
                                        type: 'directory',
                                        children: [
                                            {
                                                name: 'ShortAnalysisLoadingView.swift',
                                                path: 'Writing/Views/Profile/ProfileMainView-SignedIn/Analysis/ShortAnalysisLoadingView.swift',
                                                type: 'file',
                                                content: `//
//  ShortAnalysisLoadingView.swift
//  Writing
//
//  Created by Ben Dreyer on 7/15/24.
//

import SwiftUI

struct ShortAnalysisLoadingView: View {
    @EnvironmentObject var shortAnalysisController: ShortAnalysisController
    
    // Animation vars
    @State var imageScale: CGFloat = 1.0
    @State var imageOpacity: Double = 1.0
    
    var body: some View {
        VStack {
            if !shortAnalysisController.isErrorLoadingAnalysis {
                Text("Generating Your Analysis...")
                    .font(.system(size: 16, design: .serif))
                    .italic()
                    .bold()
                    .foregroundStyle(Color.blue)
                    .padding(.bottom, 20)
                
                Image(systemName: "bolt.circle")
                    .resizable()
                    .frame(width: 40, height: 40)
                    .scaleEffect(imageScale)
                    .opacity(imageOpacity)
                    .foregroundStyle(Color.blue)
                    .onAppear {
                        withAnimation(Animation.easeInOut(duration: 1.0).repeatForever(autoreverses: true)) {
                            imageScale = 1.5
                            imageOpacity = 0.6
                        }
                    }
                
                
            } else {
                Text("Encountered an issue retrieving your analysis, please try again")
                    .font(.system(size: 16, design: .serif))
                    .italic()
                    .bold()
                    .foregroundStyle(Color.red)
            }
        }
        .padding(.bottom, 100)
        .onAppear {
            self.imageScale = 1.0
            self.imageOpacity = 1.0
        }
    }
}

#Preview {
    ShortAnalysisLoadingView()
        .environmentObject(ShortAnalysisController())
}
`,
                                                language: 'plaintext'
                                            },
                                            {
                                                name: 'ShortAnalysisMainView.swift',
                                                path: 'Writing/Views/Profile/ProfileMainView-SignedIn/Analysis/ShortAnalysisMainView.swift',
                                                type: 'file',
                                                content: `//
//  ShortAnalysisMainView.swift
//  Writing
//
//  Created by Ben Dreyer on 7/13/24.
//

import SwiftUI

struct ShortAnalysisMainView: View {
    
    @StateObject var shortAnalysisController = ShortAnalysisController()
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        ZStack {
            VStack {
                ScrollView(showsIndicators: false) {
                    
                    if shortAnalysisController.isLoadingAnalysis {
                        ShortAnalysisLoadingView()
                    } else {
                        Image(systemName: "bolt.circle")
                            .font(.title)
                            .foregroundStyle(Color.blue)
                        
                        Text("What You Wrote")
                            .font(.system(size: 16, design: .serif))
                            .padding(.top, 15)
                            .padding(.bottom, 15)
                            .bold()
                        
                        
                        if let short = profileController.focusedShort {
                            Text(short.shortRawText ?? "")
                                .font(.system(size: 13, design: .serif))
                                .padding(.bottom, 10)
                        }
                        
                        if let analysis = shortAnalysisController.focusedShortAnalysis {
                            // the analysis was retrieved
                            HStack {
                                Text("What We Think")
                                    .font(.system(size: 16, design: .serif))
                                    .padding(.top, 15)
                                    .padding(.bottom, 15)
                                    .bold()
                                
                                
                                Button {
                                    shortAnalysisController.isAnalysisHelpPopoverShowing.toggle()
                                } label: {
                                    Image(systemName: "info.circle")
                                        .resizable()
                                        .frame(maxWidth: 14, maxHeight: 14)
                                        .popover(isPresented: $shortAnalysisController.isAnalysisHelpPopoverShowing,
                                                 attachmentAnchor: .point(.top),
                                                 arrowEdge: .top,
                                                 content: {
                                            VStack {
                                                Text("We use external ai (openai) to analyze")
                                                Text("your writing. This analysis is not an")
                                                Text("official indication of how well you")
                                                Text("write, but a simple prediction based")
                                                Text("on the words the ai models have been trained ")
                                                Text("on. Please do not use our analysis as an")
                                                Text("official metric to judge your writing.")
                                            }
                                            
                                            .multilineTextAlignment(.center)
                                            .lineLimit(0)
                                            //                                .foregroundStyle(.black)
                                            .font(.system(size: 10, weight: .medium, design: .rounded))
                                            .padding()
                                            .presentationCompactAdaptation(.none)
                                        })
                                }
                            }
                            
                            
                            // Scoring
                            HStack {
                                // Prose
                                VStack {
                                    Text(String(format: "%.1f", analysis.proseScore ?? 0.0))
                                        .font(.system(size: 24, design: .serif))
                                        .bold()
                                        .foregroundStyle(shortAnalysisController.determineScoreColor(score: analysis.proseScore ?? 0.0))
                                    
                                    Text("Prose")
                                        .font(.system(size: 14, design: .serif))
                                }
                                // Imagery
                                VStack {
                                    Text(String(format: "%.1f", analysis.imageryScore ?? 0.0))
                                        .font(.system(size: 24, design: .serif))
                                        .bold()
                                        .foregroundStyle(shortAnalysisController.determineScoreColor(score: analysis.imageryScore ?? 0.0))
                                    
                                    Text("Imagery")
                                        .font(.system(size: 14, design: .serif))
                                }
                                .padding(.leading, 20)
                                .padding(.trailing, 20)
                                
                                
                                // Flow
                                VStack {
                                    Text(String(format: "%.1f", analysis.flowScore ?? 0.0))
                                        .font(.system(size: 24, design: .serif))
                                        .bold()
                                        .foregroundStyle(shortAnalysisController.determineScoreColor(score: analysis.flowScore ?? 0.0))
                                    
                                    Text("Flow")
                                        .font(.system(size: 14, design: .serif))
                                }
                            }
                            .padding(.bottom, 2)
                            
                            // Text Analysis
                            Text(analysis.content ?? "")
                                .font(.system(size: 15, design: .serif))
                                .padding(.bottom, 10)
                            
                            Text(String(format: "%.1f", analysis.score ?? 0.0))
                                .font(.system(size: 28, design: .serif))
                                .bold()
                                .foregroundStyle(shortAnalysisController.determineScoreColor(score: analysis.score ?? 0.0))
                            
                            
                            Text("Overall")
                                .font(.system(size: 18, design: .serif))
                        } else {
                            // else there's no analysis yet
                            Button(action: {
                                shortAnalysisController.isConfirmCreateAnalysisAlertShowing = true
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 200, height: 40)
                                    .overlay {
                                        HStack {
                                            Text("Generate Analysis")
                                                .font(.system(size: 13, design: .serif))
                                                .bold()
                                            Image(systemName: "bolt")
                                        }
                                    }
                            }
                            .buttonStyle(PlainButtonStyle())
                            .foregroundStyle(Color.blue)
                            .alert("Are you sure?", isPresented: $shortAnalysisController.isConfirmCreateAnalysisAlertShowing) {
                                
                                Button("Confirm") {
                                    if let rateLimit = userController.processFirestoreWrite() {
                                        print(rateLimit)
                                    } else {
                                        Task {
                                            if let user = userController.user {
                                                if let short = profileController.focusedShort {
                                                    shortAnalysisController.createAnalysis(user: user, short: short)
                                                    
                                                    // Update the user vars (avg writing score got updated)
                                                    //                                                userController.retrieveUserFromFirestore(userId: user.id!)
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
            }
            .padding(.leading, 20)
            .padding(.trailing, 20)
        }
        .onAppear {
            if let _ = userController.user {
                if let short = profileController.focusedShort {
                    shortAnalysisController.retrieveAnalysis(shortId: short.id!)
                }
            }
        }
        .environmentObject(shortAnalysisController)
    
    }
}

#Preview {
    ShortAnalysisMainView()
        .environmentObject(ShortAnalysisController())
        .environmentObject(ProfileController())
        .environmentObject(UserController())
}
`,
                                                language: 'plaintext'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'ProfileEditShortView.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileEditShortView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileEditShortView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/24/24.
//

import Combine
import SwiftUI

struct ProfileEditShortView: View {
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    // Only need home controller to clear the cache
    @EnvironmentObject var homeController: HomeController
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                // make sure a short is focused
                if let short = profileController.focusedShort {
                    // see if we have the prompt image
                    if let image = profileController.promptImages[short.date!] {
                        // Image
                        Image(uiImage: image)
                            .resizable()
                            .resizable()
                            .frame(maxWidth: 400, maxHeight: 300)
                        
                    }
                    
                    // Prompt Text
                    Text(short.promptRawText!)
                        .font(.system(size: 14, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .italic()
                        .padding(.bottom, 5)
                    
                    // TextField (initialize with the text that's already written for the short)
                    // TODO(bendreyer): have a couple different openers here (once upon a time, in a land far far away, etc..) and pick one at random
                    TextField("Once upon a time...",text: $profileController.newShortText, axis: .vertical)
    //                    .modifier(KeyboardAdaptive())
                        .font(.system(size: 16, design: .serif))
                    // Styling
                        .padding(.vertical, 8)
                        .background(
                            VStack {
                                Spacer()
                                Color(UIColor.systemGray4)
                                    .frame(height: 2)
                            }
                        )
                    // character limit -
                        .onReceive(Just(profileController.newShortText)) { _ in profileController.limitTextLength(profileController.characterLimit) }
                    
                    
                    HStack {
                        // Character Count
                        Text("\\(profileController.newShortText.count) / 2500 Characters")
                            .font(.system(size: 12, design: .serif))
                        
                        Button(action: {
                            // Rate Limiting check
                            if let rateLimit = userController.processFirestoreWrite() {
                                print(rateLimit)
                            } else {
                                // Ensure user is available
                                if let _ = userController.user {
                                    // Ensure a short is focused
                                    if let short = profileController.focusedShort {
                                        Task {
                                            profileController.editShort()
                                            
                                            // clear the short from the home view (must get called from firestore again)
                                            homeController.clearEditedOrRemovedShortFromCache(shortDate: short.date!)
                                        }
                                    } else {
                                        print("prompt not available")
                                    }
                                } else {
                                    print("user not available")
                                }
                            }
                        }) {
                            Image(systemName: "arrowshape.right.circle")
                                .font(.callout)
                                .foregroundStyle(Color.green)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .trailing)
                }
            }
        }
        .padding(.horizontal, 20)
        .onAppear {
            self.isTabBarShowing = false
            
            // Set the text in the text field to what the focused short text is
            if let short = profileController.focusedShort {
                profileController.newShortText = short.shortRawText ?? ""
            }
            
        }
        .onDisappear {
            self.isTabBarShowing = true
        }
    }
}

#Preview {
    ProfileEditShortView()
        .environmentObject(ProfileController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileFocusedShortView.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileFocusedShortView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileFocusedShortView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/23/24.
//

import SwiftUI

struct ProfileFocusedShortView: View {
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    // Only need home controller to update the cache from the profile.
    @EnvironmentObject var homeController: HomeController
    
    @State var isEditShortViewActive: Bool = false
    
    var isIPad: Bool {
        UIDevice.current.userInterfaceIdiom == .pad
    }
    
    var body: some View {
        NavigationView {
            VStack {
                ScrollView(showsIndicators: false) {
                    // ensure focused short is not nil
                    if let short = profileController.focusedShort {
                        // check image
                        if let image = profileController.promptImages[short.date!] {
                            if isIPad {
                                Image(uiImage: image)
                                    .resizable()
                                    .frame(maxWidth: 1000, maxHeight: 740)
                                    .clipShape(RoundedRectangle(cornerRadius: 20))
                            } else {
                                Image(uiImage: image)
                                    .resizable()
                                    .frame(maxWidth: 400, maxHeight: 370)
                                    .clipShape(RoundedRectangle(cornerRadius: 20))
                            }
                        } else {
//                            Image("wolf")
//                                .resizable()
//                                .frame(maxWidth: 400, maxHeight: 300)
                        }
                        
                        Text(short.promptRawText!)
                            .font(.system(size: 14, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .italic()
                            .padding(.bottom, 5)
                        
                        HStack {
                            // Profile Picture
                            if let image = userController.usersProfilePicture {
                                Image(uiImage: image)
                                    .resizable()
                                    .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                    .frame(width: 40, height: 40)
                            } else {
                                Image("not-signed-in-profile")
                                    .resizable()
                                    .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                    .frame(width: 40, height: 40)
                            }
                            
                            VStack {
                                // Handle
                                Text(short.authorFirstName! + " " + short.authorLastName!)
                                    .font(.system(size: 12, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                
                                // Date posted
                                Text(short.rawTimestamp!.dateValue().formatted(date: .abbreviated, time: .shortened))
                                    .font(.system(size: 12, design: .serif))
                                    .opacity(0.6)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        
                        // Response
                        Text(short.shortRawText!)
                            .font(.system(size: 13, design: .serif))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            HStack {
                                // Comment image
                                Image(systemName: "hand.thumbsup")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                                // comment number
                                Text("\\(short.likeCount!)")
                                    .font(.system(size: 13, design: .serif))
                            }
                            
                            HStack {
                                // Comment image
                                Image(systemName: "message")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                                // comment number
                                Text("\\(short.commentCount!)")
                                    .font(.system(size: 13, design: .serif))
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack {
                                // Edit Short
                                NavigationLink(destination: ProfileEditShortView(), isActive: $isEditShortViewActive) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(lineWidth: 1)
                                        .frame(width: 150, height: 40)
                                        .overlay {
                                            HStack {
                                                Text("Edit Your Short")
                                                    .font(.system(size: 13, design: .serif))
                                                    .bold()
                                                Image(systemName: "square.and.pencil")
                                            }
                                        }
                                }
                                .buttonStyle(PlainButtonStyle())
                                .padding(.leading, 1)
                                
                                // Analysis
                                NavigationLink(destination: ShortAnalysisMainView()) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(lineWidth: 1)
                                        .frame(width: 150, height: 40)
                                        .overlay {
                                            HStack {
                                                Text("What We Think")
                                                    .font(.system(size: 13, design: .serif))
                                                    .bold()
                                                Image(systemName: "bolt")
                                            }
                                        }
                                }
                                .foregroundStyle(Color.blue)
                                .buttonStyle(PlainButtonStyle())
                                
                                // Delete Short
                                Button(action: {
                                    profileController.isConfirmShortDelteAlertShowing = true
                                }) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(lineWidth: 1)
                                        .frame(width: 170, height: 40)
                                        .overlay {
                                            HStack {
                                                Text("Delete Your Short")
                                                    .font(.system(size: 13, design: .serif))
                                                    .bold()
                                                Image(systemName: "trash")
                                            }
                                        }
                                }
                                .foregroundStyle(Color.red)
                                .buttonStyle(PlainButtonStyle())
                                .alert("Are you sure?", isPresented: $profileController.isConfirmShortDelteAlertShowing) {
                                    
                                    Button("Confirm") {
                                        if let rateLimit = userController.processFirestoreWrite() {
                                            print(rateLimit)
                                        } else {
                                            if let user = userController.user {
                                                Task {
                                                    profileController.deleteShort()
                                                    
                                                    // repull the shorts for the user in profile
                                                    profileController.retrieveShorts()
                                                    
                                                    // re-pull the user in user controller
                                                    userController.retrieveUserFromFirestore(userId: user.id!)
                                                    
                                                    // clear the deleted short from the cache in home controller
                                                    if let short = profileController.focusedShort {
                                                        homeController.clearEditedOrRemovedShortFromCache(shortDate: short.date!)
                                                    }
                                                }
                                            }
                                    }
                                }
                                    
                                    Button("Cancel", role: .cancel) { }
                                }
                            }
                            .padding(.vertical, 2)
                        }
                    }
                }
            }
            .padding(20)
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

#Preview {
    ProfileFocusedShortView()
        .environmentObject(ProfileController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileMainView.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileMainView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileMainView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import SwiftUI

struct ProfileMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        NavigationView {
            ZStack {
                SideBarStack(sidebarWidth: 240, showSidebar: $profileController.showSidebar) {
                    ProfileSidebarContentView()
                } content: {
                    VStack {
                        HStack {
                            HStack {
                                Button(action: {
                                    profileController.showSidebar = true
                                }) {
                                    Image(systemName: "text.justify")
                                        .font(.title3)
                                        
                                }
                                .buttonStyle(PlainButtonStyle())
                                
                                // Small Logo
                                if (colorScheme == .light) {
                                    Image("LogoTransparentWhiteBackground")
                                        .resizable()
                                        .frame(width: 30, height: 30)
                                } else if (colorScheme == .dark) {
                                    Image("LogoBlackBackground")
                                        .resizable()
                                        .frame(width: 30, height: 30)
                                }
                                
                                Text("| The Daily Short")
                                    .font(.system(size: 16, design: .serif))
                                    .bold()
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            // Side Menu activate
                            
                            
                            HStack {
                                
                                // Settings buttons
                                Button(action: {
                                    profileController.isSettingsShowing = true
                                }) {
                                    Image(systemName: "gearshape")
                                        .font(.title3)
                                }
                                .buttonStyle(PlainButtonStyle())
                                
                            }
//                            .frame(maxWidth: .infinity, alignment: .trailing)
                            
                        }
                        .padding(.top, 15)
                        .padding(.leading, 20)
                        .padding(.trailing, 20)
                        .padding(.bottom, 10)
                        
                        ScrollView(showsIndicators: false) {
                            VStack {
                                HStack {
                                    VStack {
                                        if let image = userController.usersProfilePicture {
                                            Image(uiImage: image)
                                                .resizable()
                                                .frame(maxWidth: 60, maxHeight: 60)
                                                .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                        } else {
                                            Image("not-signed-in-profile")
                                                .resizable()
                                                .frame(maxWidth: 60, maxHeight: 60)
                                                .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                        }
                                        
                                        if let user = userController.user {
                                            Text(user.firstName! + " " + user.lastName!)
                                                .font(.system(size: 16, design: .serif))
                                                .bold()
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                        } else {
                                            Text("Guest Writer")
                                                .font(.system(size: 16, design: .serif))
                                                .bold()
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                        }
                                        
                                        
                                        // Profile Title
                                        if let user = userController.user {
                                            Text(profileController.convertTitleIntToString(int: user.title ?? 0))
                                                .font(.system(size: 12, design: .serif))
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                                .opacity(0.7)
                                        } else {
                                            Text("Novice Author")
                                                .font(.system(size: 12, design: .serif))
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                                .opacity(0.7)
                                        }
                                        
                                    }
                                    .frame(minWidth: 100, maxWidth: 140, alignment: .leading)
                                    
                                    
                                    HStack {
                                        if let user = userController.user {
                                            VStack {
                                                Text("\\(user.shortsCount!.formatted())")
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Shorts")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                            
                                            VStack {
                                                Text("\\(user.numLikes!.formatted())")
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Likes")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                            
                                            VStack {
                                                Text(String(format: "%.1f", user.avgWritingScore ?? 0.0))
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Avg")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                        } else {
                                            VStack {
                                                Text("0")
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Shorts")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                            VStack {
                                                Text("0")
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Likes")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                            VStack {
                                                Text("0")
                                                    .font(.system(size: 16, design: .serif))
                                                
                                                Text("Avg")
                                                    .font(.system(size: 10, design: .serif))
                                            }
                                            .padding()
                                        }
                                    }
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                }
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.bottom, 20)
                                
                                
                                NavigationLink(destination: ProfileStreaksAndAwardsView()) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(lineWidth: 1)
                                        .frame(width: 150, height: 40)
                                        .overlay {
                                            HStack {
                                                // TODO(bendreyer): have a couple different openers here (start your creation, dive right in, etc..) and pick one at random
                                                Text("Streaks & Awards")
                                                    .font(.system(size: 12, design: .serif))
    //                                                .bold()
                                                
                                                Image(systemName: "trophy")
                                                
                                            }
                                        }
                                        .padding(.bottom, 10)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                                .buttonStyle(PlainButtonStyle())
                               
                                
                                
                                
                                // Your Shorts
                                HStack {
                                    Text("Your Shorts")
                                        .bold()
                                        .font(.system(size: 16, design: .serif))
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    
                                    HStack {
                                        Menu {
                                            Button(action: {
                                                profileController.shortsSortingMethod = 0
                                                profileController.switchSortingMethod()
                                            }) {
                                                HStack {
                                                    Text("Date Written")
                                                        .font(.system(size: 13, design: .serif))
                                                    
                                                    Image(systemName: "clock")
                                                        .font(.subheadline)
                                                }
                                                
                                            }
                                            Button(action: {
                                                profileController.shortsSortingMethod = 1
                                                profileController.switchSortingMethod()
                                            }) {
                                                HStack {
                                                    Text("Like Count")
                                                        .font(.system(size: 13, design: .serif))
                                                    
                                                    Image(systemName: "crown")
                                                        .font(.subheadline)
                                                }
                                            }
                                            Button(action: {
                                                profileController.shortsSortingMethod = 2
                                                profileController.switchSortingMethod()
                                            }) {
                                                HStack {
                                                    Text("Prompt Date")
                                                        .font(.system(size: 13, design: .serif))
                                                    
                                                    Image(systemName: "calendar.circle")
                                                        .font(.subheadline)
                                                }
                                            }
                                        } label: {
                                            HStack {
                                                if profileController.shortsSortingMethod == 0 {
                                                    Text("Date Written")
                                                        .font(.system(size: 13, design: .serif))
                                                } else if profileController.shortsSortingMethod == 1 {
                                                    Text("Like Count")
                                                        .font(.system(size: 13, design: .serif))
                                                } else if profileController.shortsSortingMethod == 2 {
                                                    Text("Prompt date")
                                                        .font(.system(size: 13, design: .serif))
                                                }
                                                
                                                Image(systemName: "chevron.down")
                                                    .font(.subheadline)
                                            }
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                    }
                                    .frame(maxWidth: .infinity, alignment: .trailing)
                                }
                            }
                            .padding(.leading, 20)
                            .padding(.trailing, 20)
                            
                            
                            ProfileShortGrid()
                            
                            
                            // Pagination control (for now it's just one button that loads older posts)
                            
                            if !profileController.areNoShortsLeftToLoad {
                                Button(action: {
                                    profileController.retrieveNextShorts()
                                }) {
                                    RoundedRectangle(cornerRadius: 25.0)
                                        .stroke(lineWidth: 1)
                                        .frame(width: 110, height: 35)
                                        .overlay {
                                            HStack {
                                                Text("More")
                                                    .font(.system(size: 14, design: .serif))
                                                    .bold()
                                                
                                                Image(systemName: "arrow.down")
                                                    .resizable()
                                                    .frame(width: 10, height: 10)
                                            }
                                        }
                                        .padding(.top, 10)
                                        .padding(.bottom, 10)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                            
                            
                            VStack {
                                // Logo
                                if (colorScheme == .light) {
                                    Image("LogoTransparentWhiteBackground")
                                        .resizable()
                                        .frame(width: 80, height: 80)
                                } else if (colorScheme == .dark) {
                                    Image("LogoBlackBackground")
                                        .resizable()
                                        .frame(width: 80, height: 80)
                                }
                                
                                Text("The Daily Short")
                                    .font(.system(size: 15, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .bottom)
                                    .opacity(0.8)
                                Text("version 1.1")
                                    .font(.system(size: 11, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .bottom)
                                    .opacity(0.8)
                            }
                            //                            .padding(.top, 50)
                        }
                        .sheet(isPresented: $profileController.isSettingsShowing) {
                            ProfileSettingsView()
                        }
                        .sheet(isPresented: $profileController.isFocusedShortSheetShowing) {
                            ProfileFocusedShortView()
                        }
                        .blur(radius: profileController.showSidebar ? 4.0 : 0.0)
                    }
                }
            }
            .padding(.bottom, 25)
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

#Preview {
    ProfileMainView()
        .environmentObject(ProfileController())
        .environmentObject(UserController())
}


//struct ResponsePreview: View {
//    
//    var promptImage: String
//    var date: String
//    @State private var isSinglePersonalResponsePopupShowing: Bool = false
//    
//    var body: some View {
//        Button(action: {
//            self.isSinglePersonalResponsePopupShowing.toggle()
//        }) {
//            ZStack(alignment: .topTrailing) {
//                Image(promptImage)
//                    .resizable()
//                    .aspectRatio(contentMode: .fill)
//                    .frame(maxWidth: 400, maxHeight: 300)
//                
//                VStack {
//                    HStack {
//                        RoundedRectangle(cornerRadius: 30.0)
//                            .frame(width: 50, height: 20)
//                            .foregroundStyle(Color.black)
//                            .opacity(0.6)
//                        
//                            .overlay {
//                                Text(date)
//                                    .font(.system(size: 11, design: .serif))
//                                    .foregroundStyle(Color.white)
//                            }
//                    }
//                }
//                .padding(8)
//            }
//        }
//        .sheet(isPresented: $isSinglePersonalResponsePopupShowing) {
//            SinglePersonalResponse(imageName: "space-guy", authorHandle: "Salvor Hardin", timePosted: "3:23pm", prompt: "The inconcievable universe seemed increddibly large for almost all of it's inhabitants. Except for Jackal Lend, maybe one of the only men in the Universe who truly understood its scale.", response: "Jackal Lend stood on the bridge of his starship, gazing out at the swirling galaxies beyond. To most, the cosmos was an endless expanse of mystery and wonder. But to Jackal, it was a map he had memorized long ago. He had traveled to the furthest reaches, seen stars born and die, and navigated the black holes' perilous edges. The universe’s vastness was no longer daunting; it was a puzzle he had pieced together, every fragment a testament to his relentless exploration. For Jackal Lend, the universe wasn't vast; it was home.", numLikes: 42, numComments: 13)
//        }
//    }
//}

extension Int {
    func formatted() -> String {
        if self >= 1000 && self < 10000 {
            return String(format: "%.1fk", Double(self) / 1000.0)
        } else if self >= 10000 && self < 100000 {
            return String(format: "%.0fk", Double(self) / 1000.0)
        } else if self >= 100000 && self < 1000000 {
            return String(format: "%.0fk", Double(self) / 1000.0)
        } else {
            return String(self)
        }
        
    }
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileShortGrid.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileShortGrid.swift',
                                        type: 'file',
                                        content: `//
//  ProfileShortGrid.swift
//  Writing
//
//  Created by Ben Dreyer on 6/23/24.
//

import SwiftUI

struct ProfileShortGrid: View {
    @EnvironmentObject var profileController: ProfileController
    
    var body: some View {
        VStack(spacing: 0.5) {
            ForEach(profileController.chunksOfShorts) { chunk in
                HStack(spacing: 0.5) {
                    ForEach(chunk.shorts) { short in
                        // check the image exists
                        if let image = profileController.promptImages[short.date!] {
                            ProfileShortPreview(short: short, image: image)
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ProfileShortGrid()
        .environmentObject(ProfileController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileShortPreview.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileShortPreview.swift',
                                        type: 'file',
                                        content: `//
//  ProfileShortPreview.swift
//  Writing
//
//  Created by Ben Dreyer on 6/23/24.
//

import FirebaseFirestore
import SwiftUI

struct ProfileShortPreview: View {
    @EnvironmentObject var profileController: ProfileController
    
    var short: Short
    var image: UIImage
    
    var body: some View {
        Button(action: {
            // focus a single short
            profileController.focusShort(short: self.short)
        }) {
            VStack {
                ZStack(alignment: .topTrailing) {
                    Image(uiImage: image)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
                        .clipped()
                        .aspectRatio(1, contentMode: .fit)
                    
                    VStack {
                        HStack {
                            RoundedRectangle(cornerRadius: 30.0)
                                .frame(width: 100, height: 20)
                                .foregroundStyle(Color.black)
                                .opacity(0.6)
                            
                                .overlay {
                                    Text(profileController.convertDateString(intDateString: short.date!))
                                        .font(.system(size: 11, design: .serif))
                                        .foregroundStyle(Color.white)
                                }
                        }
                    }
                    .padding(8)
                }
            }
        }
    }
}

#Preview {
    ProfileShortPreview(short: Short(date: "20240620", rawTimestamp: Timestamp(), shortRawText: "this the prompt"), image: UIImage(named: "wolf")!)
        .environmentObject(ProfileController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileStreaksAndAwardsView.swift',
                                        path: 'Writing/Views/Profile/ProfileMainView-SignedIn/ProfileStreaksAndAwardsView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileStreaksAndAwardsView.swift
//  Writing
//
//  Created by Ben Dreyer on 7/8/24.
//

import FirebaseFirestore
import SwiftUI

struct ProfileStreaksAndAwardsView: View {
    
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    
    
    // Constants for contribution graph
    let contributions: [Int] = Array(repeating: 1, count: 10) + Array(repeating: 0, count: 10) + Array(repeating: 1, count: 70)
    
    let columns = 22 // Number of columns (weeks in 90 days)
    let rows = 4    // Number of rows (days in a week)
    let squareSize: CGFloat = 12
    let spacing: CGFloat = 5
    
    
    var body: some View {
        VStack {
            // Current Streak
            VStack {
                Text("Current Streak")
                    .font(.system(size: 18, design: .serif))
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                HStack {
                    Image("fire")
                        .resizable()
                        .frame(width: 30, height: 30)
                        .foregroundStyle(Color.orange)
                    
                    
                    VStack {
                        if let user = userController.user {
                            if let currentStreak = user.currentStreak {
                                
                                // Make sure the current streak is active
                                // The last Short Written date should be yesterday
                                
                                if let lastShortWrittenDate = user.lastShortWrittenDate {
                                    let dateValueOfLastShort = lastShortWrittenDate.dateValue()
                                    
                                    if self.isYesterdayOrToday(date: dateValueOfLastShort) {
                                        Text("\\(currentStreak)")
                                            .font(.system(size: 16, design: .serif))
                                            .bold()
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                    } else {
                                        Text("0")
                                            .font(.system(size: 16, design: .serif))
                                            .bold()
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                    }
                                }
                                
                                Text("Day Writing Streak")
                                    .font(.system(size: 12, design: .serif))
                                    .opacity(0.8)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.bottom, 10)
            
            // Personal Best
            VStack {
                Text("Personal Best")
                    .font(.system(size: 18, design: .serif))
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                HStack {
                    Image("fire")
                        .resizable()
                        .frame(width: 30, height: 30)
                        .foregroundStyle(Color.orange)
                    
                    
                    VStack {
                        if let user = userController.user {
                            if let bestStreak = user.bestStreak {
                                Text("\\(bestStreak)")
                                    .font(.system(size: 16, design: .serif))
                                    .bold()
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        
                        Text("Days")
                            .font(.system(size: 12, design: .serif))
                            .opacity(0.8)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.bottom, 10)
            
            
            VStack {
                Text("Titles")
                    .font(.system(size: 18, design: .serif))
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                HStack {
                    Text("Current Title:")
                        .font(.system(size: 14, design: .serif))
                        .bold()
                        
                    if let user = userController.user {
                        Text(profileController.convertTitleIntToString(int: user.title ?? 0))
                            .font(.system(size: 14, design: .serif))
                    } else {
                        Text("Pupil")
                            .font(.system(size: 14, design: .serif))
                    }
                    
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.bottom, 1)
                
                HStack {
                    Text("Next:")
                        .font(.system(size: 14, design: .serif))
                        .bold()
                    
                    if let user = userController.user {
                        Text(profileController.convertTitleIntToString(int: (user.title ?? 0) + 1))
                            .font(.system(size: 14, design: .serif))
                    }
                    
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.bottom, 1)
                
                HStack {
                    Text("Criteria:")
                        .font(.system(size: 14, design: .serif))
                        .bold()
                        
                    
                    if let user = userController.user {
                        Text(profileController.getNextTitleCriteria(curLevel: user.title ?? 0, numShorts: user.shortsCount ?? 0))
                            .font(.system(size: 14, design: .serif))
                    }
                    
                    
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.bottom, 10)
            
            HStack {
                // Contribution Graph
                VStack {
                    Text("Contributions")
                        .bold()
                        .font(.system(size: 18, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    Text("\\(profileController.contributionCount) contributions in the last 90 days")
                        .font(.system(size: 12, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    let gridItems = Array(repeating: GridItem(.fixed(squareSize), spacing: spacing), count: columns)
                    
                    ScrollView(.horizontal) {
                        LazyVGrid(columns: gridItems, spacing: spacing) {
                            ForEach(0..<Array(profileController.contributions).count, id: \\.self) { index in
                                Rectangle()
                                    .fill(Array(profileController.contributions)[index] == 1 ? Color.green : Color.gray)
                                    .frame(width: squareSize, height: squareSize)
                            }
                        }
                        .padding()
                    }
                    
//                    ZStack {
//                        VStack(alignment: .leading) {
//                            ForEach(0..<profileController.contributions.count, id: \\.self) { row in
//                                HStack(spacing: 2.5) {
//                                    ForEach(0..<profileController.contributions[row].count, id: \\.self) { column in
//                                        RoundedRectangle(cornerRadius: 1.5)
//                                            .foregroundStyle(profileController.contributions[row][column] == 1 ? Color.green : Color.gray)
//                                            .frame(width: 15, height: 15)
//                                    }
//                                }
//                            }
//                        }
//                        //                                            .padding(10)
//                        .overlay {
//                            //                                                RoundedRectangle(cornerRadius: 10)
//                            //                                                    .stroke(Color.black, lineWidth: 1)
//                        }
//                    }
//                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .padding(.bottom, 10)
            
            Spacer()
        }
        .padding(.horizontal, 20)
        .onAppear {
            if let user = userController.user {
                profileController.generateContributions(user: user)
            }
        }
    }
    
    func isYesterdayOrToday(date: Date) -> Bool {
        let calendar = Calendar.current
        
        return calendar.isDateInToday(date) || calendar.isDateInYesterday(date)
    }
}

#Preview {
    ProfileStreaksAndAwardsView()
        .environmentObject(ProfileController())
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'ProfileMainViewNotSignedIn.swift',
                                path: 'Writing/Views/Profile/ProfileMainViewNotSignedIn.swift',
                                type: 'file',
                                content: `//
//  ProfileMainView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/3/24.
//

import SwiftUI

struct ProfileMainViewNotSignedIn: View {
    @Environment(\\.colorScheme) var colorScheme
    @EnvironmentObject var profileController: ProfileController
    
    //    @State private var isSignUpViewShowing: Bool = false
    
    
    var body: some View {
        ZStack {
            SideBarStack(sidebarWidth: 240, showSidebar: $profileController.showSidebar) {
                ProfileSidebarContentView()
            } content: {
                VStack {
                    HStack {
                        HStack {
                            Button(action: {
                                profileController.showSidebar = true
                            }) {
                                Image(systemName: "text.justify")
                                    .font(.title3)
                                
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            // Small Logo
                            if (colorScheme == .light) {
                                Image("LogoTransparentWhiteBackground")
                                    .resizable()
                                    .frame(width: 30, height: 30)
                            } else if (colorScheme == .dark) {
                                Image("LogoBlackBackground")
                                    .resizable()
                                    .frame(width: 30, height: 30)
                            }
                            
                            Text("| The Daily Short")
                                .font(.system(size: 16, design: .serif))
                                .bold()
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        // Side Menu activate
                        
                        
                        HStack {
                            // Share Profile
                            Image(systemName: "square.and.arrow.up")
                                .font(.title3)
                            
                            // Settings buttons
                            Button(action: {
                                profileController.isSettingsShowing = true
                            }) {
                                Image(systemName: "gearshape")
                                    .font(.title3)
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                        }
                        //                            .frame(maxWidth: .infinity, alignment: .trailing)
                        
                    }
                    .padding(.top, 15)
                    .padding(.leading, 20)
                    .padding(.trailing, 20)
                    .padding(.bottom, 10)
                    
                    
                    ScrollView(showsIndicators: false) {
                        VStack {
                            HStack {
                                VStack {
                                    
                                    Image("not-signed-in-profile")
                                        .resizable()
                                        .frame(maxWidth: 60, maxHeight: 60)
                                        .clipShape(RoundedRectangle(cornerRadius: 15.0))
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    
                                    
                                    
                                    Text("Guest Writer")
                                        .font(.system(size: 16, design: .serif))
                                        .bold()
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    
                                    
                                }
                                .frame(minWidth: 100, maxWidth: 140, alignment: .leading)
                                
                                
                                HStack {
                                    
                                    VStack {
                                        Text("0")
                                            .font(.system(size: 18, design: .serif))
                                        
                                        Text("Shorts")
                                            .font(.system(size: 12, design: .serif))
                                    }
                                    .padding()
                                    VStack {
                                        Text("0")
                                            .font(.system(size: 18, design: .serif))
                                        
                                        Text("Likes")
                                            .font(.system(size: 12, design: .serif))
                                    }
                                    .padding()
                                    VStack {
                                        Text("0")
                                            .font(.system(size: 18, design: .serif))
                                        
                                        Text("Avg")
                                            .font(.system(size: 12, design: .serif))
                                    }
                                    .padding()
                                }
                                .frame(maxWidth: .infinity, alignment: .leading)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.bottom, 20)
                            
                            // Streaks
                            
                            // Your Shorts
                            HStack {
                                Text("Your Shorts")
                                    .font(.system(size: 22, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        .padding(.leading, 20)
                        .padding(.trailing, 20)
                        
                        VStack(spacing: 0.5) {
                            
                            Button(action: {
                                profileController.isSignUpViewShowing = true
                            }) {
                                RoundedRectangle(cornerRadius: 25.0)
                                    .stroke(lineWidth: 1)
                                    .frame(width: 220, height: 40)
                                    .overlay {
                                        HStack {
                                            // TODO(bendreyer): have a couple different openers here (start your creation, dive right in, etc..) and pick one at random
                                            Text("Create Account / Sign In")
                                                .font(.system(size: 14, design: .serif))
                                                .bold()
                                            
                                            Image(systemName: "person.badge.plus")
                                            
                                        }
                                    }
                                    .padding(.bottom, 10)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                        
                        VStack {
                            // Logo
                            if (colorScheme == .light) {
                                Image("LogoTransparentWhiteBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            } else if (colorScheme == .dark) {
                                Image("LogoBlackBackground")
                                    .resizable()
                                    .frame(width: 80, height: 80)
                            }
                            
                            Text("The Daily Short")
                                .font(.system(size: 15, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                            Text("version 1.1 june 2024")
                                .font(.system(size: 11, design: .serif))
                                .frame(maxWidth: .infinity, alignment: .bottom)
                                .opacity(0.8)
                        }
                    }
                }
                .blur(radius: profileController.showSidebar ? 4.0 : 0.0)
            }
            .blur(radius: profileController.isSignUpViewShowing ? 10.0 : 0.0)
            .onTapGesture {
                if (profileController.isSignUpViewShowing) {
                    profileController.isSignUpViewShowing = false
                }
            }
            
            if (profileController.isSignUpViewShowing) {
                SignUpOrIn()
            }
        }
    }
}


#Preview {
    ProfileMainViewNotSignedIn()
        .environmentObject(ProfileController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ProfileSettingsView.swift',
                                path: 'Writing/Views/Profile/ProfileSettingsView.swift',
                                type: 'file',
                                content: `//
//  ProfileSettingsView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/10/24.
//

import SwiftUI

struct ProfileSettingsView: View {
    @AppStorage("filterNSFWShorts") private var filterNSFWShorts = false
    
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var profileController: ProfileController
    
    @State var isConfirmDeleteAccountAlertShowing: Bool = false
    
    var body: some View {
        VStack {
            List {
                Section(header: Text("The Daily Short")) {
                    Link("Terms of Use (EULA)", destination: URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!)
                    
                    Link("Privacy Policy", destination: URL(string: "https://sites.google.com/view/the-daily-short-privacy-policy/home")!)
                    
                    Toggle(isOn: $filterNSFWShorts) {
                        Text("Filter NSFW Content")
                    }
                }
                
                
                if let user = userController.user {
                    Section(header: Text("Account")) {
                        Button(action: {
                            // Sign out of account - auth
                            authController.logOut()
                            // Set the user back to nil
                            userController.logOut()
                            // reset the shorts on home screen
                            homeController.clearShortOnSignOut()
                            // reset the shorts on profile screen
                            profileController.clearShorts()
                            // dismiss the settings sheet
                            profileController.isSettingsShowing = false
                        }) {
                            Text("Sign Out")
                        }
                        
                        Button(action: {
                            self.isConfirmDeleteAccountAlertShowing = true
                            
                            
                        }) {
                            Text("Delete Account")
                                .foregroundColor(.red)
                        }
                        .alert("Are you sure?", isPresented: $isConfirmDeleteAccountAlertShowing) {
                            Button("Confirm") {
                                Task {
                                    // delete local user
                                    userController.deleteUser()
                                    // delete auth
                                    authController.deleteAuthUser()
                                    //                                // Log out - auth
                                    //                                authController.logOut()
                                    //                                // log out - local
                                    //                                userController.logOut()
                                    // reset the shorts on home screen
                                    DispatchQueue.main.async {
                                        homeController.clearShortOnSignOut()
                                        // dismiss the settings sheet
                                        profileController.isSettingsShowing = false
                                    }
                                }
                            }
                            
                            Button("Cancel", role: .cancel) { }
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ProfileSettingsView()
        .environmentObject(AuthController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
        .environmentObject(ProfileController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SidebarViews',
                                path: 'Writing/Views/Profile/SidebarViews',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ProfileAboutTheAppView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileAboutTheAppView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileAboutTheAppView.swift
//  Writing
//
//  Created by Ben Dreyer on 8/11/24.
//

import SwiftUI

struct ProfileAboutTheAppView: View {
    @Environment(\\.colorScheme) var colorScheme
    var body: some View {
        VStack {
            
            // Logo
            if (colorScheme == .light) {
                Image("LogoTransparentWhiteBackground")
                    .resizable()
                    .frame(width: 80, height: 80)
            } else if (colorScheme == .dark) {
                Image("LogoBlackBackground")
                    .resizable()
                    .frame(width: 80, height: 80)
            }
            Text("The Daily Short")
                .font(.system(size: 15, design: .serif))
                .frame(maxWidth: .infinity, alignment: .bottom)
                .opacity(0.8)
                .padding(.bottom, 20)

            
            Text("Hello! My name is Ben, I'm a developer based in San Francisco, California, and I'm the creator of The Daily Short! I still work full time as a Software Engineer for my day job, but in my spare time I love working on passion projects and apps. I'm hoping to support and keep this app up and running for as long as I can.")
                .font(.system(size: 16, design: .serif))
                .italic()
                
            
            Text("I hope this apps pushes you to stay consistent with your writing journey and helps you find some inspiration among other authors. If you have any suggestions or advice please don't hesistate to send me an email :)")
                .font(.system(size: 16, design: .serif))
                .italic()
                .padding(.bottom, 20)
            Text("thedailyshortapp@gmail.com")
                .font(.system(size: 16, design: .serif))
                .italic()
                .contextMenu {
                    Button(action: {
                        UIPasteboard.general.string = "thedailyshortapp@gmail.com"
                    }) {
                        Text("Copy")
                        Image(systemName: "doc.on.doc")
                    }
                }
                .padding(.bottom, 20)
            
            
            VStack {
                Text("Enjoying the App?")
                    .font(.system(size: 16, design: .serif))
                    .italic()
                    .bold()
                Text("If you'd like to support my work and help keep the app running smoothly, consider buying me a coffee! ☕️ Your support means a lot and helps me continue improving the app for everyone. Tap the button below.")
                    .font(.system(size: 16, design: .serif))
                    .italic()
            }
            
            Button(action: {
                if let url = URL(string: "https://buymeacoffee.com/bendreyer") {
                    UIApplication.shared.open(url)
                }
            }) {
                Image("bmc-button")
                    .resizable() // Make the image resizable
                    .scaledToFill() // Scale the image to fill the space
                    .frame(width: 200, height: 50) // Set the size of the image
                    .clipped() // Clip the overflowing parts of the image
                    .cornerRadius(20) // Apply corner radius to the image
            }
            
            Spacer()
        }
        .padding(.top, 40)
        .padding(.leading, 20)
        .padding(.trailing, 20)
    }
}

#Preview {
    ProfileAboutTheAppView()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileAdvertiseWithUsView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileAdvertiseWithUsView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileAdvertiseWithUsView.swift
//  Writing
//
//  Created by Ben Dreyer on 7/27/24.
//

import SwiftUI

struct ProfileAdvertiseWithUsView: View {
    var body: some View {
        VStack {
            Text("If intersted in advertising for your brand / company / product on the Daily Short, please reach out to the following email for quotes on ad slots:")
                .font(.system(size: 16, design: .serif))
                .italic()
                .padding(5)
            
            
            
            Text("thedailyshortapp@gmail.com")
                .font(.system(size: 16, design: .serif))
                .italic()
                .contextMenu {
                    Button(action: {
                        UIPasteboard.general.string = "thedailyshortapp@gmail.com"
                    }) {
                        Text("Copy")
                        Image(systemName: "doc.on.doc")
                    }
                }
                .padding()
                .font(.title)
                .padding(.bottom, 100)
        }
        .padding(.horizontal, 20)
    }
}

#Preview {
    ProfileAdvertiseWithUsView()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileChangePhotoView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileChangePhotoView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileChangePhotoView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/27/24.
//

import SwiftUI
import _PhotosUI_SwiftUI

struct ProfileChangePhotoView: View {
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    @State private var data: Data?
    @State private var selectedItem: [PhotosPickerItem] = []
    
    var body: some View {
        Form {
            Section {
                PhotosPicker(selection: $selectedItem, maxSelectionCount: 1, selectionBehavior: .default, matching: .images, preferredItemEncoding: .automatic) {
                    if let data = data, let image = UIImage(data: data) {
                        Image(uiImage: image)
                            .resizable()
                            .clipShape(RoundedRectangle(cornerRadius: 20))
                            .frame(maxWidth: 140, maxHeight: 140, alignment: .center)
                            .aspectRatio(contentMode: .fit)
                    } else {
                        Label("Select a picture", systemImage: "photo.on.rectangle.angled")
                    }
                }
                .frame(maxWidth: .infinity, alignment: .center)
            }
            .frame(maxHeight: 200)
            .onChange(of: selectedItem, {
                Task {
                    DispatchQueue.main.async {
                        guard let item = selectedItem.first else {
                            return
                        }
                        
                        item.loadTransferable(type: Data.self) { result in
                            switch result {
                            case .success(let data):
                                if let data = data {
                                    self.data = data
                                }
                            case .failure(let failure):
                                print("Error: \\(failure.localizedDescription)")
                            }
                        }
                    }
                }
            })
            Section {
                Button("Confirm") {
                    if let rateLimit = userController.processFirestoreWrite() {
                        print(rateLimit)
                    } else {
                        // Function to post data to Firebase Storage
                        // we can assume data is not nill because the button is disabled if it is.
                        userController.uploadProfilePicture(data: self.data!)
                        profileController.isChangePhotoSheetShowing = false
                    }
                }.disabled(self.data == nil)
            }
        }
    }
}

#Preview {
    ProfileChangePhotoView()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileEditProfileView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileEditProfileView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileEditProfileView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/9/24.
//

import PhotosUI
import SwiftUI

struct ProfileEditProfileView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    Button(action: {
                        // Rate Limiting check
                        if let rateLimit = userController.processFirestoreWrite() {
                            print(rateLimit)
                        } else {
                            profileController.isChangePhotoSheetShowing = true
                        }
                    }) {
                        // current profile picture
                        if let image = userController.usersProfilePicture {
                            Image(uiImage: image).resizable()
                                .frame(width: 100, height: 100)
                                .clipShape(RoundedRectangle(cornerRadius: 20.0))
                                .overlay(alignment: .topTrailing) {
                                    Image(systemName: "pencil.circle.fill")
                                        .font(.system(size: 30))
                                        .padding(-12)
                                }
                        } else {
                            Image("not-signed-in-profile")
                                .resizable()
                                .frame(width: 100, height: 100)
                                .clipShape(RoundedRectangle(cornerRadius: 20.0))
                                .overlay(alignment: .topTrailing) {
                                    Image(systemName: "pencil.circle.fill")
                                        .font(.system(size: 30))
                                        .padding(-12)
                                    
                                    
                                }
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.trailing, 25)
                    
                    // First and Last Name
                    if let user = userController.user {
                        Text(user.firstName! + " " + user.lastName!)
                            .font(.system(size: 24, design: .serif))
                            .bold()
                    } else {
                        Text("Guest Writer")
                            .font(.system(size: 24, design: .serif))
                            .bold()
                    }
                    
                    
                    Button(action: {
                        profileController.isChangeNameAlertShowing = true
                    }) {
                        Image(systemName: "square.and.pencil")
                            .font(.system(size: 20))
                    }
                    .alert("Edit Name", isPresented: $profileController.isChangeNameAlertShowing) {
                        
                        if colorScheme == .light {
                            TextField("First Name", text: $userController.newFirstName)
                                .foregroundStyle(Color.black)
                            TextField("Last Name", text: $userController.newLastName)
                                .foregroundStyle(Color.black)
                        } else if colorScheme == .dark {
                            TextField("First Name", text: $userController.newFirstName)
                                .foregroundStyle(Color.white)
                            TextField("Last Name", text: $userController.newLastName)
                                .foregroundStyle(Color.white)
                        }
                        
                        
                        HStack {
                            Button("Cancel", role: .cancel) {
                                profileController.isChangeNameAlertShowing = false
                            }.foregroundColor(.red)
                            Button("Save", role: .none) {
                                // Rate Limiting check
                                if let rateLimit = userController.processFirestoreWrite() {
                                    print(rateLimit)
                                } else {
                                    userController.changeName()
                                    profileController.isChangeNameAlertShowing = false
                                }
                            }.foregroundColor(.blue)
                        }
                    }
                    
                }
                Spacer()
            }
            .padding(.top, 40)
            .sheet(isPresented: $profileController.isChangePhotoSheetShowing) {
                ProfileChangePhotoView()
                    .presentationDetents([.height(400), .medium])
                    .presentationDragIndicator(.automatic)
            }
        }
    }
}

#Preview {
    ProfileEditProfileView()
        .environmentObject(ProfileController())
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileHowWeAnalyzeView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileHowWeAnalyzeView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileHowWeAnalyzeView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/9/24.
//

import SwiftUI

struct ProfileHowWeAnalyzeView: View {
    var body: some View {
        Text("We use external ai (openai) to analyze your writing. This analysis is not an official indication of how well you write, but a simple prediction based on the words the ai models have been trained on. Please do not use our analysis as an official metric to judge your writing.")
            .font(.system(size: 16, design: .serif))
            .italic()
            .padding(20)
            .padding(.bottom, 100)
    }
}

#Preview {
    ProfileHowWeAnalyzeView()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileNotificationsView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileNotificationsView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileNotificationsView.swift
//  Writing
//
//  Created by Ben Dreyer on 7/28/24.
//

import SwiftUI

struct ProfileNotificationsView: View {
    @EnvironmentObject var localNotificationController: LocalNotificationController
    
    var body: some View {
        if localNotificationController.isGranted {
            VStack {
                Toggle(isOn: $localNotificationController.areNotificationsEnabled) {
                    Text("Enable Notifications")
                        .font(.system(size: 15, design: .serif))
                        .bold()
                }
                .onChange(of: localNotificationController.areNotificationsEnabled) {
                    if localNotificationController.areNotificationsEnabled {
                        // enable
//                        print("enable notifs")
                        localNotificationController.enableNotifications()
                    } else {
                        // disable
//                        print("disable notifs")
                        localNotificationController.disableNotifications()
                    }
                }
                .padding(.bottom, 20)
                
                if localNotificationController.areNotificationsEnabled {
                    
                    HStack {
                        Text("Cadence")
                            .font(.system(size: 15, design: .serif))
                            .bold()
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        Picker(localNotificationController.selectedCadence.rawValue, selection: $localNotificationController.selectedCadence) {
                            Text("Daily").tag(Cadence.daily)
                        }
                        .pickerStyle(.automatic)
                    }
                    .padding(.bottom, 20)
                    
                    
                    if localNotificationController.selectedCadence == .weekly {
                        HStack {
                            Text("Day Of Week")
                                .font(.system(size: 15, design: .serif))
                                .bold()
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            Picker(localNotificationController.dayOfWeek.rawValue, selection: $localNotificationController.dayOfWeek) {
                                Text("Monday").tag(DayOfWeek.monday)
                                Text("Tuesday").tag(DayOfWeek.tuesday)
                                Text("Wednesday").tag(DayOfWeek.wednesday)
                                Text("Thursday").tag(DayOfWeek.thursday)
                                Text("Friday").tag(DayOfWeek.friday)
                                Text("Saturday").tag(DayOfWeek.saturday)
                                Text("Sunday").tag(DayOfWeek.sunday)
                            }
                            .pickerStyle(.menu)
                        }
                        .padding(.bottom, 20)
                    }
                    
                    
                    DatePicker(
                        selection: $localNotificationController.timeOfDay,
                        displayedComponents: [.hourAndMinute]
                    ) {
                        Text("Time of Day")
                            .font(.system(size: 15, design: .serif))
                            .bold()
                    }
                    .onChange(of: localNotificationController.timeOfDay) {
                        localNotificationController.updateNotificationSettings()
                    }
                    
                }
                
                
                Spacer()
            }
            .padding(.horizontal, 20)
        } else {
            VStack {
                Button("Eable Notifications - Open Settings") {
                    localNotificationController.openSettings()
                }
            }
        }
        
        
        
        // un comment to view pending notifiction requests in the view
//            if localNotificationController.isGranted {
//                Button("Interval noticiation") {
//                    Task {
//                        let localNotification = LocalNotification(identifier: UUID().uuidString,
//                                                                  title: "Some Title",
//                                                                  body: "some body",
//                                                                  timeInterval: 20,
//                                                                  repeats: false)
//                        await localNotificationController.schedule(localNotification: localNotification)
//                    }
//                }
//
//                List{
//                    ForEach(localNotificationController.pendingRequests, id: \\.identifier) { request in
//                        VStack(alignment: .leading) {
//                            Text(request.content.title)
//                            HStack {
//                                Text(request.identifier)
//                                    .font(.caption)
//                                    .foregroundStyle(.secondary)
//                            }
//                        }
//                        .swipeActions {
//                            Button("Delete", role: .destructive) {
//                                localNotificationController.removeRequest(withIdentifier: request.identifier)
//                            }
//                        }
//                    }
//                }
//            } else {
//                Button("enable notifications") {
//                    localNotificationController.openSettings()
//                }
//            }
    }
}

#Preview {
    ProfileNotificationsView()
        .environmentObject(LocalNotificationController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileSidebarContentView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileSidebarContentView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileSidebarContentView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/22/24.
//

import SwiftUI

struct ProfileSidebarContentView: View {
    @Environment(\\.colorScheme) var colorScheme
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    @EnvironmentObject var profileController: ProfileController
    var body: some View {
        VStack {
            
            
            // Icons
            HStack {
                VStack {
                    // Edit Profile
                    NavigationLink(destination: ProfileEditProfileView()) {
                        Image(systemName: "person.badge.plus")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Suggest a prompt
                    NavigationLink(destination: ProfileSuggestPromptView()) {
                        Image(systemName: "leaf.circle")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // How we analyze
                    NavigationLink(destination: ProfileHowWeAnalyzeView()) {
                        Image(systemName: "bolt")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Advertise with us
                    NavigationLink(destination: ProfileHowWeAnalyzeView()) {
                        Image(systemName: "chart.bar.xaxis.ascending")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Notifications
                    NavigationLink(destination: ProfileNotificationsView()) {
                        Image(systemName: "bell.badge")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // About the App
                    NavigationLink(destination: ProfileAboutTheAppView()) {
                        Image(systemName: "info.circle")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    
                    // Settings
                    Button(action: {
                        profileController.isSettingsShowing = true
                    }) {
                        Image(systemName: "gearshape")
                            .font(.title3)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .frame(maxWidth: 25)
                
                // Text
                VStack {
                    // Edit profile
                    NavigationLink(destination: ProfileEditProfileView()) {
                        Text("Edit Profile")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    
                    // Suggest a Prompt
                    NavigationLink(destination: ProfileSuggestPromptView()) {
                        Text("Suggest a Prompt")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    NavigationLink(destination: ProfileHowWeAnalyzeView()) {
                        Text("How we Analyze")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // How we Analyze
                    NavigationLink(destination: ProfileAdvertiseWithUsView()) {
                        Text("Advertise with Us")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Notifications
                    NavigationLink(destination: ProfileNotificationsView()) {
                        Text("Notifications")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Notifications
                    NavigationLink(destination: ProfileAboutTheAppView()) {
                        Text("About the App")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 10)
                    
                    // Settings
                    Button(action: {
                        profileController.isSettingsShowing = true
                    }) {
                        Text("Settings")
                            .font(.system(size: 17, design: .serif))
                    }
                    .buttonStyle(PlainButtonStyle())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 3)
                }
            }
            
            
            
//            // Edit Profile
//            NavigationLink(destination: ProfileEditProfileView()) {
//                HStack {
//                    Image(systemName: "person.badge.plus")
//                        .font(.title3)
//                    Text("Edit Profile")
//                        .font(.system(size: 16, design: .serif))
//                }
//                .padding(.bottom, 10)
//            }
//            .buttonStyle(PlainButtonStyle())
//            .frame(maxWidth: .infinity, alignment: .leading)
//            
//            // Suggest a Prompt
//            NavigationLink(destination: ProfileSuggestPromptView()) {
//                HStack {
//                    Image(systemName: "leaf.circle")
//                        .font(.title3)
//                    
//                    Text("Suggest a Prompt")
//                        .font(.system(size: 16, design: .serif))
//                }
//                .padding(.bottom, 10)
//                .frame(maxWidth: .infinity, alignment: .leading)
//            }
//            .buttonStyle(PlainButtonStyle())
//            
//            // How we Analyze
//            NavigationLink(destination: ProfileHowWeAnalyzeView()) {
//                HStack {
//                    Image(systemName: "bolt")
//                        .font(.title3)
//                    
//                    Text("How we Analyze")
//                        .font(.system(size: 16, design: .serif))
//                }
//                .padding(.bottom, 10)
//                .frame(maxWidth: .infinity, alignment: .leading)
//            }
//            .buttonStyle(PlainButtonStyle())
//            
//            // How we Analyze
//            NavigationLink(destination: ProfileHowWeAnalyzeView()) {
//                HStack {
//                    Image(systemName: "chart.bar.xaxis.ascending")
//                        .font(.title3)
//                    
//                    Text("Advertise with Us")
//                        .font(.system(size: 16, design: .serif))
//                }
//                .padding(.bottom, 10)
//                .frame(maxWidth: .infinity, alignment: .leading)
//            }
//            .buttonStyle(PlainButtonStyle())
//            
//            // Settings
//            Button(action: {
//                profileController.isSettingsShowing = true
//            }) {
//                HStack {
//                    Image(systemName: "gearshape")
//                        .font(.title3)
//                    
//                    Text("Settings")
//                        .font(.system(size: 16, design: .serif))
//                }
//                .padding(.bottom, 10)
//                .frame(maxWidth: .infinity, alignment: .leading)
//            }
//            .buttonStyle(PlainButtonStyle())
            
            
            Spacer()
            
            Button(action: {
                self.isDarkMode.toggle()
            }) {
                Image(systemName: "moon.stars")
                    .font(.title)
            }
            .buttonStyle(PlainButtonStyle())
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.top, 60)
        .padding(.leading, 20)
        .padding(.trailing, 20)
        .padding(.bottom, 60)
    }
}

#Preview {
    ProfileSidebarContentView()
        .environmentObject(ProfileController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ProfileSuggestPromptView.swift',
                                        path: 'Writing/Views/Profile/SidebarViews/ProfileSuggestPromptView.swift',
                                        type: 'file',
                                        content: `//
//  ProfileSuggestPromptView.swift
//  Writing
//
//  Created by Ben Dreyer on 6/9/24.
//

import Combine
import SwiftUI

struct ProfileSuggestPromptView: View {
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    
    @EnvironmentObject var profileController: ProfileController
    @EnvironmentObject var userController: UserController
    
    var body: some View {
        VStack {
            Text("Our app thrives on community suggested prompts, if you think you have a great idea and want others to write about it, please submit it here!")
                .font(.system(size: 16, design: .serif))
                .italic()
            
            TextField("In a far away land...",text: $profileController.suggestedPromptText, axis: .vertical)
            //                .modifier(KeyboardAdaptive())
                .font(.system(size: 16, design: .serif))
            // Styling
                .padding(.vertical, 8)
                .background(
                    VStack {
                        Spacer()
                        Color(UIColor.systemGray4)
                            .frame(height: 2)
                    }
                )
                .onReceive(Just(profileController.suggestedPromptText)) { _ in profileController.limitTextLengthSuggestedPrompt(400) }
            HStack {
                // Character Count
                Text("\\(profileController.suggestedPromptText.count) / 400 Characters")
                    .font(.system(size: 12, design: .serif))
                
                Button(action: {
                    // Rate Limiting check
                    if let rateLimit = userController.processFirestoreWrite() {
                        print(rateLimit)
                    } else {
                        if let user = userController.user {
                            profileController.submitPromptSuggestion(user: user)
                        }
                    }
                }) {
                    if !profileController.suggestedPromptText.isEmpty {
                        Image(systemName: "arrowshape.right.circle")
                            .font(.callout)
                            .foregroundStyle(Color.green)
                    } else {
                        Image(systemName: "arrowshape.right.circle")
                            .font(.callout)
                    }
                }
                .buttonStyle(PlainButtonStyle())
                
            }
            .frame(maxWidth: .infinity, alignment: .trailing)
            
            Spacer()
        }
        .padding(.top, 40)
        .padding(.leading, 20)
        .padding(.trailing, 20)
        .onAppear {
            self.isTabBarShowing = false
        }
        .onDisappear {
            self.isTabBarShowing = true
        }
        
    }
}

#Preview {
    ProfileSuggestPromptView()
        .environmentObject(ProfileController())
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
                name: 'Writing.entitlements',
                path: 'Writing/Writing.entitlements',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>development</string>
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
                name: 'WritingApp.swift',
                path: 'Writing/WritingApp.swift',
                type: 'file',
                content: `//
//  WritingApp.swift
//  Writing
//
//  Created by Ben Dreyer on 6/1/24.
//

import SwiftUI
import FirebaseCore
import GoogleSignIn

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        FirebaseApp.configure()
        return true
    }
    
    @available(iOS 9.0, *)
    func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return GIDSignIn.sharedInstance.handle(url)
    }
}


@main
struct WritingApp: App {
    // App Storage: isDarkMode variable tracks dark theme throughout the app
    @AppStorage("isDarkMode") private var isDarkMode = false
    // App Storage: isSignedIn tracks auth status throughout app
    @AppStorage("isSignedIn") private var isSignedIn = false
    // App Storage: isTabBarShowing tracks if the tab bar should be visible or not
    @AppStorage("isTabBarShowing") private var isTabBarShowing = true
    // App Storage: Var for deciding whether notification cadence is daily or weekly
    @AppStorage("isNotificationDaily") private var notificationCadence = true
    // App Storage: Time of day for the notification to fire (converted into string from Date Object)
    @AppStorage("notificationTimeOfDay") private var notificationTimeOfDay = ""
    // App Storage: If the user is filtering NSFW shorts in the home view.
    @AppStorage("filterNSFWShorts") private var filterNSFWShorts = false
    
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(isDarkMode ? .dark : .light)
                .onAppear {
                    self.isTabBarShowing = true
                }
        }
    }
}
`,
                language: 'plaintext'
            }
        ]
    }
];
