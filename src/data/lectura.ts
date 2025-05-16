import { FileNode } from '../components/CodeViewer';

export const lectura: FileNode[] = [
    {
        name: 'Lectures',
        path: 'Lectures',
        type: 'directory',
        children: [
            {
                name: '.cursor',
                path: 'Lectures/.cursor',
                type: 'directory',
                children: [
                    {
                        name: 'rules',
                        path: 'Lectures/.cursor/rules',
                        type: 'directory',
                        children: [
                            {
                                name: 'swift-rules.mdc',
                                path: 'Lectures/.cursor/rules/swift-rules.mdc',
                                type: 'file',
                                content: `---
description: Swift Rules
globs: *.swift
---
You are a expert swift writer, writing for programs using SwiftUI, not UIKit.


- Avoid force unwrapping optionals
- Use built in apple components always (DatePicker, TextField, etc..)
- Treat me like an expert`,
                                language: 'plaintext'
                            }
                        ]
                    }
                ]
            },
            {
                name: '.gitignore',
                path: 'Lectures/.gitignore',
                type: 'file',
                content: `
Secrets
GoogleService-Info
Info
`,
                language: 'plaintext'
            },
            {
                name: 'ApplicationUtility.swift',
                path: 'Lectures/ApplicationUtility.swift',
                type: 'file',
                content: `//
//  ApplicationUtility.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
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
                path: 'Lectures/ContentView.swift',
                type: 'file',
                content: `//
//  ContentView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/15/24.
//

import FirebaseAuth
import SwiftUI

struct ContentView: View {
    
    // Tab Bar
    @StateObject var tabbarController = TabBarController()
    @State private var selectedTab: CustomTabBar.TabItemKind = .home
    
    @AppStorage("isDarkMode") private var isDarkMode = false
    @AppStorage("isSignedIn") private var isSignedIn = false
    // TODO: Decide if we want to keep the paywall hidden at app launch
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = true
    
    @StateObject var courseController = CourseController()
    
    @StateObject var authController = AuthController()
    @StateObject var userController = UserController()
    @StateObject var homeController = HomeController()
    @StateObject var myCourseController = MyCourseController()
    
    // Resource Controllers
    @StateObject var resourceController = ResourceController()
    @StateObject var examController = ExamController()
    @StateObject var examAnswerController = ExamAnswerController()
    @StateObject var notesController = NotesController()
    @StateObject var homeworkController = HomeworkController()
    @StateObject var homeworkAnswersController = HomeworkAnswersController()
    
    // Rate Limiter
    @StateObject var rateLimiter = RateLimiter()
    
    // Created on December 15, 2024 - Main view controller managing tab bar navigation,
    // user authentication, course management, and various resource controllers
    
    // subscriptions
    @StateObject private var subscriptionController = SubscriptionController.shared
    
    var body: some View {
        ZStack {
            
            switch selectedTab {
            case .home:
                HomeMainView()
            case .trends:
                MyCoursesMainView()
            case .reels:
                ReelMainView()
            case .search:
                SearchMainView()
            case .settings:
                SettingsMainView()
            }
            
            // show rate limit popup if applicable
            if rateLimiter.shouldRateLimitPopupShow {
                RateLimitPopUp()
            }
            
            VStack {
                Spacer()
                if tabbarController.isTabbarShowing {
                    CustomTabBar(selectedTab: $selectedTab)
                }
                
            }
        }
        .environmentObject(tabbarController)
        .environmentObject(authController)
        .environmentObject(userController)
        .environmentObject(homeController)
        .environmentObject(resourceController)
        .environmentObject(examController)
        .environmentObject(examAnswerController)
        .environmentObject(notesController)
        .environmentObject(homeworkController)
        .environmentObject(homeworkAnswersController)
        .environmentObject(myCourseController)
        .environmentObject(courseController)
        .environmentObject(rateLimiter)
        .environmentObject(subscriptionController)
        .onChange(of: isSignedIn) {
            if isSignedIn == true {
                if let user = Auth.auth().currentUser {
                    userController.retrieveUserFromFirestore(userId: user.uid)
                    
                    // Sign in the user into RevenueCat
//                    subscriptionController.loginRevenueCat(userId: user.uid)
                } else {
                    print("no auth user yet lol nice try")
                }
            }
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(TabBarController())
        .environmentObject(AuthController())
        .environmentObject(UserController())
        .environmentObject(HomeController())
        .environmentObject(ExamController())
        .environmentObject(ExamAnswerController())
        .environmentObject(NotesController())
        .environmentObject(HomeworkController())
        .environmentObject(HomeworkAnswersController())
        .environmentObject(MyCourseController())
        .environmentObject(CourseController())
        .environmentObject(ResourceController())
        .environmentObject(RateLimiter())
}
`,
                language: 'plaintext'
            },
            {
                name: 'Controllers',
                path: 'Lectures/Controllers',
                type: 'directory',
                children: [
                    {
                        name: 'AuthController.swift',
                        path: 'Lectures/Controllers/AuthController.swift',
                        type: 'file',
                        content: `//
//  AuthController.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//
import AuthenticationServices
import CryptoKit
import FirebaseAuth
import FirebaseCore
import FirebaseFirestore
import Foundation
import GoogleSignIn
import GoogleSignInSwift
import SwiftUI
import RevenueCat

class AuthController : UIViewController, ObservableObject {
    // Controls which views the user can access based on login status.
    @AppStorage("isSignedIn") private var isSignedIn = false
    // Whether or not the user still sess the paywall screen after app first start
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false
    
//    @Published var selectedMembershipType: Int = 0
    
    @Published var email = ""
    @Published var firstName = ""
    @Published var lastName = ""
    
    // Unhashed nonce. (used for Apple sign in)
    @Published var currentNonce: String?
    @Published var request: ASAuthorizationAppleIDRequest?
    
    @Published var errorString: String = ""
    @Published var isErrorStringShowing: Bool = false
    
    @Published var isFinishedSigningIn: Bool = false
    
    let db = Firestore.firestore()
    
    @available(iOS 13, *)
    // The function called in the onComplete closure of the SignInWithAppleButton in the RegisterView
    func appleSignInButtonOnCompletion(result: Result<ASAuthorization, Error>, displaySignInSheet: Binding<Bool>, closePaywallOnSignIn: Bool) {
        switch result {
        case .success(let authResults):
            print("GETTING RESULT IN ON SIGN IN BUTTON COMPLETEION")
            
            
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
                print("email: ", appleIDCredential.email ?? "no email")
                
                
                if let email = appleIDCredential.email {
                    print(" we have the email it's here: ", email)
                } else {
                    print("we don't have an email:")
                }
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
                    print("Unable to serialize token string from data: \\(appleIDToken.debugDescription)")
                    return
                }
                
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
                        print("No user")
                        return
                    }
                    
                    // grab the email
                    if let email = user.email {
                        self.email = email
                    }
                    
                    print("signed in with apple")
                    print("\\(String(describing: user.uid))")
                    
                    // close the paywall if necessary
                    if closePaywallOnSignIn {
                        self.hasUserSeenPaywall = true
                    }
                    
                    // Figure out if the user already has an account and is signing in
                    // or if this is their first time signing up. (check on email)
                    let docRef = self.db.collection("users").whereField("email", isEqualTo: self.email)
                    docRef.getDocuments { (querySnapshot, err) in
                        if let err = err {
                            print(err.localizedDescription)
                        } else {
                            if let querySnapshot = querySnapshot {
                                if querySnapshot.documents.isEmpty {
                                    // User doesn't exist in the database yet, create a new user object
                                    
                                    // The only field not populated is profilePicture. User needs to add that themselves.
                                    let userObject = User(firstName: self.firstName, lastName: self.lastName, email: self.email, accountType: 0, likedCourseIds: [], likedLectureIds: [], followedChannelIds: [], isAdmin: false)
                                    
                                    // Add the user to firestore user collection
                                    let collectionRef = self.db.collection("users")
                                    do {
                                        try collectionRef.document(user.uid).setData(from: userObject)
                                        self.isSignedIn = true
                                        
                                        
                                        self.isFinishedSigningIn = true
                                        
                                        print("a new user signed in")
                                        
                                        // close the sign in sheet when sign in finishes, if a
                                        if displaySignInSheet.wrappedValue {
                                            displaySignInSheet.wrappedValue = false
                                        }
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
                                    self.isFinishedSigningIn = true
                                    
                                    print("an existing user signed in")
                                    
                                    
                                    // make it so the paywall goes away -
//                                    self.hasUserSeenPaywall = true
                                }
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
    
    func signInWithGoogle(displaySignInSheet: Binding<Bool>, closePaywallOnSignIn: Bool) {
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
                print("user was signed in: ", user)
                print(user.displayName ?? "display name")
                print(user.email ?? "email")
                
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
                
                // close paywall if necessary
                if closePaywallOnSignIn {
                    self.hasUserSeenPaywall = true
                }
                
                // Figure out if the user already has an account and is signing in
                // or if this is their first time signing up. (check on email)
                let docRef = self.db.collection("users").whereField("email", isEqualTo: self.email)
                docRef.getDocuments { (querySnapshot, err) in
                    if let err = err {
                        print(err.localizedDescription)
                    } else {
                        if let querySnapshot = querySnapshot {
                            if querySnapshot.documents.isEmpty {
                                // User doesn't exist in the database yet, create a new user object
                                
                                let userObject = User(firstName: self.firstName, lastName: self.lastName, email: self.email, accountType: 0, likedCourseIds: [], likedLectureIds: [], followedChannelIds: [], isAdmin: false)
                                
                                // Add the user to firestore user collection
                                let collectionRef = self.db.collection("users")
                                do {
                                    try collectionRef.document(user.uid).setData(from: userObject)
                                    self.isSignedIn = true
                                    
                                    self.isFinishedSigningIn = true
                                    
                                    // close the sign in sheet when sign in finishes, if a
                                    if displaySignInSheet.wrappedValue {
                                        displaySignInSheet.wrappedValue = false
                                    }
                                    
                                } catch {
                                    print("Error saving the new user to firestore")
                                }
                            } else {
                                // An existing user is signing back in
                                if let user = Auth.auth().currentUser {
                                    print("current user signed in ", user.uid)
                                }
                                self.isSignedIn = true
                                
                                self.isFinishedSigningIn = true
                                
                                // make it so the paywall goes away -
//                                self.hasUserSeenPaywall = true
                            }
                        }
                    }
                }
            }
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
        self.hasUserSeenPaywall = false
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
    @available(iOS 13, *)
    func sha256(_ input: String) -> String {
        let inputData = Data(input.utf8)
        let hashedData = SHA256.hash(data: inputData)
        let hashString = hashedData.compactMap {
            String(format: "%02x", $0)
        }.joined()
        
        return hashString
    }
    
    // from https://firebase.google.com/docs/auth/ios/apple
    func randomNonceString(length: Int = 32) -> String {
        precondition(length > 0)
        var randomBytes = [UInt8](repeating: 0, count: length)
        let errorCode = SecRandomCopyBytes(kSecRandomDefault, randomBytes.count, &randomBytes)
        if errorCode != errSecSuccess {
            fatalError(
                "Unable to generate nonce. SecRandomCopyBytes failed with OSStatus \\(errorCode)"
            )
        }
        
        let charset: [Character] =
        Array("0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._")
        
        let nonce = randomBytes.map { byte in
            // Pick a random character from the set, wrapping around if needed.
            charset[Int(byte) % charset.count]
        }
        
        return String(nonce)
    }
}

extension AuthController: ASAuthorizationControllerDelegate {
    /// - Tag: did_complete_authorization
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            
            print("SOMETHING HAPPENNING NOE?? - IN EXTENSION")
            
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
                        name: 'CourseController.swift',
                        path: 'Lectures/Controllers/CourseController.swift',
                        type: 'file',
                        content: `//
//  CourseController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/15/25.
//

import FirebaseFirestore
import FirebaseStorage
import Foundation
import SwiftUI

// This controller is used for handling all instances of courses, lectures, and channels. If any of those objects need to be loaded or displayed in the app, the logic will happen here
class CourseController : ObservableObject {
    
    // ---------- Caches ----------
    // CourseId : Course
    @Published var cachedCourses: [String : Course] = [:]
    // LectureId : Course
    @Published var cachedLectures: [String : Lecture] = [:]
    // ChannelId: Channel
    @Published var cachedChannels: [String : Channel] = [:]
    // CourseId : [Lecture]
    @Published var lecturesInCourse: [String : [Lecture]] = [:]
    // CourseId : [Lecture]
    @Published var lecturesInSameCourse: [String : [Lecture]] = [:]
    // CourseId: [Course]
    @Published var cachedCourseRecommendations: [String : [Course]] = [:]
    // Course Views [CourseId : Bool]
    private var cachedCourseViews: [String : Bool] = [:]
    // Lecture Views [LectureId : Bool]
    private var cachedLectureViews: [String : Bool] = [:]
    
    // ---------- Focus ----------
    // Course Recommendations for currently focused course
    @Published var courseRecommendations: [Course] = []
    
    // ---------- Pagination ----------
    // For Focused Channel, we paginate the courses under this channel, this var tracks pagination (we order it in increments of 10)
    @Published var channelCoursesPrefixPaginationNumber: Int = 10
    // For Lectures In Course, we paginate how many lectures show up
    @Published var lecturesInCoursePrefixPaginationNumber: Int = 8
    
    
    // ---------- Thumbnails ----------
    // CourseId : UIImage
    @Published var courseThumbnails: [String : UIImage] = [:]
    // LectureId : UIImage
    @Published var lectureThumbnails: [String : UIImage] = [:]
    // ChannelId : UIImage
    @Published var channelThumbnails: [String : UIImage] = [:]
    
    // Thumbnail Request Queue
    // CourseId : IsRequestProcessingOrFinished
    @Published var courseThumbnailRequestQueue: [String : Bool] = [:]
    // LectureId : IsRequestProcessingOrFinished
    @Published var lectureThumbnailRequestQueue: [String : Bool] = [:]
    // ChannelId : IsRequestProcessingOrFinished
    @Published var channelThumbnailRequestQueue: [String : Bool] = [:]
    
    // Loading vars
    @Published var isRelatedCourseLoading: Bool = false
    @Published var isLecturesInCourseLoading: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    // Storage
    let storage = Storage.storage()
    
    // Each home page will store it's list of courses / channels individually, but they will retrieve them through this controller, checking the cache before making a lookup
    
    // ---------- FUNCTIONS ----------
    

    
    // ---------- Retrieval ----------
    func retrieveCourse(courseId: String) {
//        print("fetching course from course controller")
        
        // check the cache
        if let _ = cachedCourses[courseId] {
            //            print("course already cached")
            return
        }
        
        Task { @MainActor in
            let docRef = db.collection("courses").document(courseId)
            
            do {
                var course = try await docRef.getDocument(as: Course.self)
                
                // sort the courses lecture Id list
                if let lectures = course.lectureIds {
                   course.lectureIds = lectures.sorted { lhs, rhs in
                        // Get lecture numbers from the IDs (assuming format includes number at the end)
                        let lhsNumber = Int(lhs.components(separatedBy: "_").last ?? "0") ?? 0
                        let rhsNumber = Int(rhs.components(separatedBy: "_").last ?? "0") ?? 0
                        return lhsNumber < rhsNumber
                    }
                }
                self.cachedCourses[courseId] = course
                
                // don't fetch the thumbnail, we only need to see it if user wants to access a specific course or lecture
            } catch {
                print("Error decoding course: \\(error)")
            }
        }
    }
    
    func retrieveChannel(channelId: String) {
        // check the cache
        if let _ = cachedChannels[channelId] {
            //            print("channel already cached")
            return
        }
        
        Task { @MainActor in
            let docRef = db.collection("channels").document(channelId)
            
            do {
                let channel = try await docRef.getDocument(as: Channel.self)
                self.cachedChannels[channelId] = channel
                
                // don't fetch the thumbnail, we only need to see it if user wants to access a specific course or lecture
            } catch {
                print("channel decoding error: \\(channelId)")
                print("Error decoding channel: \\(error)")
            }
        }
    }
    
    func retrieveLecture(lectureId: String) {
        // check the cache
        if let _ = cachedLectures[lectureId] {
            //            print("channel already cached")
            return
        }
        
        Task { @MainActor in
            let docRef = db.collection("lectures").document(lectureId)
            
            do {
                let lecture = try await docRef.getDocument(as: Lecture.self)
                self.cachedLectures[lectureId] = lecture
                
                // don't fetch the thumbnail, we only need to see it if user wants to access a specific course or lecture
            } catch {
                print("Error decoding channel: \\(error)")
            }
        }
    }
    
    
    // Paginate lectures in course by only calling groups of 8 lectures at a time. If the user has already watched this course, focus the last watched lecture at the middle of the group of 8, allowing for user to then recall this function with the previous 8 or next 8. If the user hasn't watched this course before, just load the first 8. This is controlled by which lectureIds are passed in as arguemnts.
    func retrieveLecturesInCourse(courseId: String, lectureIdsToLoad: [String]) {
        var newLectures: [Lecture] = []
        
        isLecturesInCourseLoading = true
        Task { @MainActor in
            for lectureId in lectureIdsToLoad {
                // check cache
                if let lecture = cachedLectures[lectureId] {
                    newLectures.append(lecture)
                    continue
                }
                
                // otherwise fetch it from firestore and store it in the cache
                let docRef = db.collection("lectures").document(lectureId)
                
                do {
                    let lecture = try await docRef.getDocument(as: Lecture.self)
                    
                    newLectures.append(lecture)
                    
                    // add the newly fetched lecture to the cache
                    self.cachedLectures[lectureId] = lecture
                    
                    // fetch the lecture thumbnail from storage
                    self.getLectureThumnbnail(lectureId: lectureId)
                    
                    // fetch the channel
                    if let lectureChannelId = lecture.channelId {
                        self.retrieveChannel(channelId: lectureChannelId)
                    }
                } catch {
                    print("Error decoding lecture: \\(error)")
                }
                
                // check if this course already has lectures loaded, if it does, add these new ones
                if let existingLectures = self.lecturesInCourse[courseId] {
                    var totalLectures = (existingLectures + newLectures)
                    // sort totalLectures
                    self.lecturesInCourse[courseId] = totalLectures
                } else {
                    self.lecturesInCourse[courseId] = newLectures
                }
            }
            isLecturesInCourseLoading = false
        }
    }
    
    // ---------- Generation & Content Recommendation ----------
    func generateRecommendedCourses(courseId: String, searchTerms: [String]) {
        self.isRelatedCourseLoading = true
        
        // Validate input
        guard !searchTerms.isEmpty else {
            print("Search terms array is empty")
            self.courseRecommendations = []
            self.isRelatedCourseLoading = false
            return
        }
        
        // Check cache
        if let courseRecs = self.cachedCourseRecommendations[courseId] {
            self.courseRecommendations = courseRecs
            self.isRelatedCourseLoading = false
            return
        }
        
        Task { @MainActor in
            do {
                let coursesRef = db.collection("courses")
                
                let query = coursesRef
                    .whereField(FieldPath.documentID(), isNotEqualTo: courseId)
                    .whereField("searchTerms", arrayContainsAny: searchTerms)
                    .limit(to: 3)
                
                let querySnapshot = try await query.getDocuments()
                
//                print("Found \\(querySnapshot.documents.count) matching documents")
                
                let recommendedCourses = querySnapshot.documents.compactMap { document in
                    if let course = try? document.data(as: Course.self) {
                        if let courseId = course.id {
                            self.getCourseThumbnail(courseId: courseId)
                        }
                        
                        // fetch channel so it can show up in the related course card
                        if let channelId = course.channelId {
                            self.retrieveChannel(channelId: channelId)
                        }
                        return course
                    }
                    return nil
                }
                
                await MainActor.run {
                    self.courseRecommendations = recommendedCourses
                    self.cachedCourseRecommendations[courseId] = recommendedCourses
                    self.isRelatedCourseLoading = false
                }
            } catch {
                print("Error fetching recommended courses: \\(error.localizedDescription)")
                await MainActor.run {
                    self.courseRecommendations = []
                    self.isRelatedCourseLoading = false
                }
            }
        }
    }
    
    
    // ---------- Focus Functions ----------
    func focusCourse(_ course: Course) {
        if let channelId = course.channelId {
            
            // TODO: add some logic to avoid duplicate calls to storage
            // When a course gets focused we want to make sure the channel's thumbnail is loaded and ready to display on Courseview
            self.getChannelThumbnail(channelId: channelId)
            
            // generate related courses
            if let id = course.id, let searchTerms = course.searchTerms {
                self.generateRecommendedCourses(courseId: id, searchTerms: searchTerms)
            } else {
                print("couldn't generate recommended courses")
            }
            
            // set the number of lectures we paginate in this course
            self.lecturesInCoursePrefixPaginationNumber = 8
            
            // Only increment view count if this is first time viewing
            if let courseId = course.id {
                if cachedCourseViews[courseId] == nil {
                    // First time viewing this course
                    cachedCourseViews[courseId] = true
                    
                    // Increment view count in Firestore
                    let courseRef = db.collection("courses").document(courseId)
                    courseRef.updateData([
                        "numViews": FieldValue.increment(Int64(1))
                    ]) { err in
                        if let err = err {
                            print("Error updating course views: \\(err)")
                        }
                    }
                }
            }
        }
    }
    
    func focusLecture(_ lecture: Lecture) {
        if let channelId = lecture.channelId {
            
            // When a lecture gets focused we want to make sure the channel's thumbnail is loaded and ready to display on LectureView
            self.getChannelThumbnail(channelId: channelId)
            
            // Only increment view count if this is first time viewing
            if let lectureId = lecture.id {
                if cachedLectureViews[lectureId] == nil {
                    // First time viewing this course
                    cachedLectureViews[lectureId] = true
                    
                    // Increment view count in Firestore
                    let courseRef = db.collection("lectures").document(lectureId)
                    courseRef.updateData([
                        "numViews": FieldValue.increment(Int64(1))
                    ]) { err in
                        if let err = err {
                            print("Error updating lecture views: \\(err)")
                        }
                    }
                }
            }
        }
    }
    
    func focusChannel(_ channel: Channel) {
        if let channelId = channel.id, let courseIds = channel.courseIds {
            self.channelCoursesPrefixPaginationNumber = 10
            
            // get channel thumbnail
            self.getChannelThumbnail(channelId: channelId)
            
            // We only want to retrieve the first 10 courses by this channel.
            let coursesToRetrieve = Array(courseIds.prefix(channelCoursesPrefixPaginationNumber))
            
            for courseId in coursesToRetrieve {
                // Retrieve the course from firestore
                self.retrieveCourse(courseId: courseId)
                // Retrieve the thumbnail for the course from storage
                self.getCourseThumbnail(courseId: courseId)
            }
        }
    }
    
    // ---------- Fetch Thumbnail (Storage) ----------
    func getCourseThumbnail(courseId: String) {
        // check if request was already made for this course
        if let request = self.courseThumbnailRequestQueue[courseId] {
            // make sure it's set to true, if we failed to retrieve thumbnail, we'll set the bool val back to false
            if request {
//                print("we already requested this course thumbnail")
                return
            }
        }
        
        // first time requesting this thumbnail, process the request
        self.courseThumbnailRequestQueue[courseId] = true
        
        Task { @MainActor in
            
            // check cache
            if let _ = self.courseThumbnails[courseId] {
                //            print("course thumbnail already cached")
                return
            }
            
            // Fetch image from firestore
            
            let storage = Storage.storage()

            // Create a storage reference from our storage service
            let storageRef = storage.reference()
            
            // Fetch the prompts image from storage
            let imageRef = storageRef.child("courses/" + courseId + ".jpeg")
            
            // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                if let error = error {
                    print("error downloading image from storage: ", error.localizedDescription)
                    // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                    
                    self.courseThumbnailRequestQueue[courseId] = false
                    return
                } else {
                    if let data = data {
                        // Data for image is returned
                        let image = UIImage(data: data)
                        // Add image to cache
                        self.courseThumbnails[courseId] = image
                    }
                }
            }
        }
    }
    
    func getLectureThumnbnail(lectureId: String) {
        // Do nothing, we don't use lecture thumbnails anymore, just the course.
    }
    
    func getChannelThumbnail(channelId: String) {
        // check if request was already made for this course
        if let request = self.channelThumbnailRequestQueue[channelId] {
            // make sure it's set to true, if we failed to retrieve thumbnail, we'll set the bool val back to false
            if request {
//                print("we already requested this channel thumbnail")
                return
            }
        } else {
            // first time requesting this thumbnail, process the request
            self.channelThumbnailRequestQueue[channelId] = true
        }
        
        // check cache
        if let _ = self.channelThumbnails[channelId] {
            //            print("channel thumbnail already cached")
            return
        }
        
        Task { @MainActor in
            // Get a reference to the storage service using the default Firebase App
            let storage = Storage.storage()

            // Create a storage reference from our storage service
            let storageRef = storage.reference()
            // Fetch the prompts image from storage
            let imageRef = storageRef.child("channels/" + channelId + ".jpeg")
            
            // download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
            imageRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
                if let error = error {
                    print("error downloading image from storage: ", error.localizedDescription)
                    // There was an issue with the image or the image doesn't exist, either way set both prompt and promptImage back to nil
                    self.channelThumbnailRequestQueue[channelId] = false
                    return
                } else {
                    if let data = data {
                        // Data for image is returned
                        let image = UIImage(data: data)
                        // Add image to cache
                        self.channelThumbnails[channelId] = image
                    }
                }
            }
        }
    }

    // ---------- Misc Functions ----------
    func reportIssueWithResource(resourceType: Int, resourceId: String, issue: String) {
        Task { @MainActor in
            do {
                let issueData: [String: Any] = [
                    "resourceType": resourceType,
                    "resourceId": resourceId,
                    "issue": issue,
                    "timestamp": FieldValue.serverTimestamp()
                ]
                
                try await db.collection("resourceIssues").addDocument(data: issueData)
            } catch {
                print("Error reporting resource issue: \\(error.localizedDescription)")
            }
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'HomeController.swift',
                        path: 'Lectures/Controllers/HomeController.swift',
                        type: 'file',
                        content: `//
//  HomeController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/1/25.
//

import Firebase
import FirebaseFirestore
import FirebaseStorage
import Foundation

class HomeController : ObservableObject {
    
    // Content for the for you page
    @Published var leadingUniversities: [Channel] = []
    @Published var curatedCourses: [Course] = []
    @Published var communityFavorites: [Course] = []
    // loading vars for the home page content
    @Published var isUniversityLoading: Bool = false
    @Published var isCuratedCoursesLoading: Bool = false
    @Published var isCommunityFavoritesLoading: Bool = false
    
    let tabs = ["Computer Science", "Business", "Engineering", "Humanities", "Math", "Health"]
    
    @Published var coursesForYouPerTab: [String: [Course]] = [:]
    @Published var leadingChannelsPerTab: [String: [Channel]] = [:]
    @Published var famousCoursesPerTab: [String: [Course]] = [:]
    // loading vars
    @Published var isCoursesForYouLoading: Bool = false
    @Published var isLeadingChannelsLoading: Bool = false
    @Published var isFamousCoursesLoading: Bool = false
    
    var courseForYouIdsByTab: [String : [String]] = [:]
    var leadingChannelIdsByTab: [String : [String]] = [:]
    
    // Firestore
    let db = Firestore.firestore()
    // Storage
    let storage = Storage.storage()
    
    
    init() {
        courseForYouIdsByTab["Computer Science"] = ["385", "537", "533", "544", "885", "958", "419", "547", "917", "550", "538", "549", "927", "462", "956", "539", "952", "548", "948", "565", "955", "926", "965", "465", "553", "950", "951", "551", "961"]
        courseForYouIdsByTab["Business"] = ["424", "448", "1157", "445", "433", "1126", "434", "1127", "450", "439", "1164"]
        courseForYouIdsByTab["Engineering"] = ["416", "579", "597", "580", "921", "885", "500", "907", "1134", "478", "529", "883", "535", "979", "895", "249", "526", "886", "566", "525", "417", "576", "882", "582", "541"]
        courseForYouIdsByTab["Humanities"] = ["9", "909", "1116", "424", "1155", "1148", "1166", "1163", "1157", "1150", "1117", "595", "844", "1149", "1139", "1152", "1118", "389", "1147", "99", "1160", "1162", "845", "1136", "1122", "319", "1161", "101", "313", "1159", "1129", "33"]
        courseForYouIdsByTab["Math"] = ["463", "461", "824", "474", "828", "827", "455", "616", "544", "456", "547", "836", "459", "546", "835", "547", "829", "391", "458", "423", "471", "462", "752", "422", "736", "548", "830", "918", "599", "601", "421", "726"]
        courseForYouIdsByTab["Health"] = ["909", "597", "1148", "1117", "844", "842", "577", "389", "919", "576", "313", "33", "841", "1124", "360", "572", "32", "840", "575", "574"]
        
        leadingChannelIdsByTab["Computer Science"] = ["26", "9", "15", "27", "4"]
        leadingChannelIdsByTab["Business"] = ["5", "7", "19", "27", "36"]
        leadingChannelIdsByTab["Engineering"] = ["3", "4", "9", "15", "26", "27"]
        leadingChannelIdsByTab["Humanities"] = ["5", "19", "24", "34", "36", "2", "11"]
        leadingChannelIdsByTab["Math"] = ["18", "15", "3", "26", "30", "33"]
        leadingChannelIdsByTab["Health"] = ["10", "12", "11", "19", "26", "33"]
        
        
    }
    
    // MARK: - For You Functions
    func retrieveLeadingUniversities(courseController: CourseController) {
        // IDs = [harvard, mit open courseware, oxford math, stanford , yale courses]
        let channelIds = ["9", "15", "18", "26", "36"]
        
        Task { @MainActor in
            
            for channelId in channelIds {
                let docRef = db.collection("channels").document(channelId)
                
                do {
                    let channel = try await docRef.getDocument(as: Channel.self)
                    // Add the channel to leading university list to be displayed on home page
                    self.leadingUniversities.append(channel)
                    
                    // cache the fetched channel for future lookups
                    courseController.cachedChannels[channelId] = channel
                    
                    // TODO: add some logic to not duplicate calls
                    // get the thumbnail for the channels
                    courseController.getChannelThumbnail(channelId: channelId)
                    
                } catch {
                    print("Error decoding channel: \\(error)")
                }
            }
            self.isUniversityLoading = false
        }
    }
    
    func retrieveCuratedCourses(courseController: CourseController) {
        // This function will select 5 random courses from this list of curated course
        // courseids = [533, 388, 824, 424, 537, 597, 580, 1135, 445, 419, 1150, 547, 917, 1134, 1139]
        
        
        // TODO: make this list curated, not just the top from the db
        Task { @MainActor in
            let courseids = ["533", "388", "824", "424", "537", "597", "580", "1135", "445", "419", "1150", "547", "917", "1134", "1139", "474", "579", "448", "827", "921", "1155", "616"]
            // Randomly select 6 course IDs
            let selectedCourseIds = Array(courseids.shuffled().prefix(6))
            
            do {
                for courseId in selectedCourseIds {
                    let docRef = db.collection("courses").document(courseId)
                    
                    do {
                        let course = try await docRef.getDocument(as: Course.self)
                        self.curatedCourses.append(course)
                        
                        // add the course to the cache
                        courseController.cachedCourses[courseId] = course
                        
                        // fetch the courses thumbnail
                        courseController.getCourseThumbnail(courseId: courseId)
                        
                        // fetch the channel
                        if let channelId = course.channelId {
                            courseController.retrieveChannel(channelId: channelId)
                        }
                    } catch {
                        print("Error decoding course \\(courseId): \\(error)")
                    }
                }
                
                self.isCuratedCoursesLoading = false
            }
        }
    }
    
    func retrieveCommunityFavorites(courseController: CourseController) {
        
        // get the courses with the most likes from the courses column in Firebase
        self.communityFavorites = []
        
        Task { @MainActor in
            do {
                let querySnapshot = try await db.collection("courses")
                    .order(by: "aggregateViews", descending: true)
                    .limit(to: 5)
                    .getDocuments()
                
                if querySnapshot.isEmpty {
                    print("no courses returned when looking up community favorites")
                    self.isCommunityFavoritesLoading = false
                    return
                }
                
                for document in querySnapshot.documents {
                    if let course = try? document.data(as: Course.self) {
                        
                        self.communityFavorites.append(course)
                        
                        if let courseId = course.id {
                            // add the course to the cache
                            courseController.cachedCourses[courseId] = course
                            
                            // fetch the courses thumbnail
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            // fetch the channel
                            if let channelId = course.channelId {
                                courseController.retrieveChannel(channelId: channelId)
                            }
                        }
                    }
                }
                
                self.isCommunityFavoritesLoading = false
            } catch let error {
                print("error getting community favorites from firestore: ", error)
            }
        }
    }
    
    // MARK: - Functions per tab
    func retrieveCoursesForYouByTab(tabName: String, courseController: CourseController) {
        // Check if we already have courses for this tab
        if let existingCourses = self.coursesForYouPerTab[tabName], !existingCourses.isEmpty {
            return
        }
        
        self.isCoursesForYouLoading = true
        
        var courseIds: [String] = []
        switch tabName {
        case "Computer Science":
            courseIds = Array((courseForYouIdsByTab["Computer Science"] ?? []).shuffled().prefix(6))
        case "Business":
            courseIds = Array((courseForYouIdsByTab["Business"] ?? []).shuffled().prefix(6))
        case "Engineering":
            courseIds = Array((courseForYouIdsByTab["Engineering"] ?? []).shuffled().prefix(6))
        case "Humanities":
            courseIds = Array((courseForYouIdsByTab["Humanities"] ?? []).shuffled().prefix(6))
        case "Math":
            courseIds = Array((courseForYouIdsByTab["Math"] ?? []).shuffled().prefix(6))
        case "Health":
            courseIds = Array((courseForYouIdsByTab["Health"] ?? []).shuffled().prefix(6))
        default:
            print("Unknown tab: \\(tabName)")
            return
        }
        
        Task { @MainActor in
            // Initialize empty array for this tab if it doesn't exist
            self.coursesForYouPerTab[tabName] = []
            
            do {
                for courseId in courseIds {
                    // Check if course is already cached
                    if let cachedCourse = courseController.cachedCourses[courseId] {
                        self.coursesForYouPerTab[tabName]?.append(cachedCourse)
                        continue
                    }
                    
                    let docRef = db.collection("courses").document(courseId)
                    
                    do {
                        let course = try await docRef.getDocument(as: Course.self)
                        self.coursesForYouPerTab[tabName]?.append(course)
                        
                        // add the course to the cache
                        courseController.cachedCourses[courseId] = course
                        
                        // fetch the courses thumbnail
                        courseController.getCourseThumbnail(courseId: courseId)
                        
                        // fetch the channel
                        if let channelId = course.channelId {
                            courseController.retrieveChannel(channelId: channelId)
                        }
                    } catch {
                        print("Error decoding course \\(courseId): \\(error)")
                    }
                }
                
                self.isCoursesForYouLoading = false
            }
        }
    }
    
    func retrieveLeadingChannelsPerTab(tabName: String, courseController: CourseController) {
        // Check if we already have channels for this tab
        if let existingChannels = self.leadingChannelsPerTab[tabName], !existingChannels.isEmpty {
            return
        }
        
        self.isLeadingChannelsLoading = true
        
        var channelIds: [String] = []
        switch tabName {
        case "Computer Science":
            channelIds = Array((leadingChannelIdsByTab["Computer Science"] ?? []).shuffled().prefix(6))
        case "Business":
            channelIds = Array((leadingChannelIdsByTab["Business"] ?? []).shuffled().prefix(6))
        case "Engineering":
            channelIds = Array((leadingChannelIdsByTab["Engineering"] ?? []).shuffled().prefix(6))
        case "Humanities":
            channelIds = Array((leadingChannelIdsByTab["Humanities"] ?? []).shuffled().prefix(6))
        case "Math":
            channelIds = Array((leadingChannelIdsByTab["Math"] ?? []).shuffled().prefix(6))
        case "Health":
            channelIds = Array((leadingChannelIdsByTab["Health"] ?? []).shuffled().prefix(6))
        default:
            print("Unknown tab: \\(tabName)")
            return
        }
        
        Task { @MainActor in
            // Initialize empty array for this tab if it doesn't exist
            self.leadingChannelsPerTab[tabName] = []
            
            do {
                for channelId in channelIds {
                    // Check if channel is already cached
                    if let cachedChannel = courseController.cachedChannels[channelId] {
                        self.leadingChannelsPerTab[tabName]?.append(cachedChannel)
                        continue
                    }
                    
                    let docRef = db.collection("channels").document(channelId)
                    
                    do {
                        let channel = try await docRef.getDocument(as: Channel.self)
                        self.leadingChannelsPerTab[tabName]?.append(channel)
                        
                        // cache the fetched channel
                        courseController.cachedChannels[channelId] = channel
                        
                        // get the thumbnail for the channel
                        courseController.getChannelThumbnail(channelId: channelId)
                        
                    } catch {
                        print("Error decoding channel \\(channelId): \\(error)")
                    }
                }
                
                self.isLeadingChannelsLoading = false
            }
        }
    }
    
    func retrieveFamousCoursePerTab(tabName: String, courseController: CourseController) {
        // Check if we already have courses for this tab
        if let existingCourses = self.famousCoursesPerTab[tabName], !existingCourses.isEmpty {
            return
        }
        
        self.isFamousCoursesLoading = true
        
        var searchTerms: [String] = []
        switch tabName {
        case "Computer Science":
            searchTerms = ["computer", "programming", "software", "coding", "algorithm", "data structure", "artificial intelligence", "machine learning", "computer vision", "natural language processing", "computer networks", "operating systems", "database", "computer architecture", "computer organization", "computer graphics", "computer security", "computer networks", "operating systems", "database", "computer architecture", "computer organization", "computer graphics", "computer security"]
        case "Business":
            searchTerms = ["business", "finance", "economics", "management", "marketing", "entrepreneurship", "accounting", "finance", "economics", "management", "marketing", "entrepreneurship", "accounting", "finance", "economics", "management", "marketing", "entrepreneurship", "accounting", "finance", "economics", "management", "marketing", "entrepreneurship", "accounting"]
        case "Engineering":
            searchTerms = ["engineering", "mechanical", "electrical", "civil", "chemical", "materials", "biomedical", "environmental", "physics", "thermodynamics", "fluid mechanics", "structural engineering", "control systems", "robotics", "power systems", "electronics", "circuits", "manufacturing", "aerodynamics", "heat transfer", "mechanics", "dynamics", "statics", "materials science"]
        case "Humanities":
            searchTerms = ["history", "philosophy", "literature", "arts", "music", "film", "theater", "dance", "literature", "arts", "music", "film", "theater", "dance"]
        case "Math":
            searchTerms = ["mathematics", "calculus", "algebra", "statistics", "geometry", "trigonometry", "algebra", "statistics", "geometry", "trigonometry"]
        case "Health":
            searchTerms = ["health", "medical", "biology", "medicine", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness", "nutrition", "fitness"]
        default:
            print("Unknown tab: \\(tabName)")
            return
        }
        
        Task { @MainActor in
            // Initialize empty array for this tab if it doesn't exist
            self.famousCoursesPerTab[tabName] = []
            
            do {
                let querySnapshot = try await db.collection("courses")
                    .whereField("searchTerms", arrayContainsAny: searchTerms)
                    .order(by: "aggregateViews", descending: true)
                    .limit(to: 6)
                    .getDocuments()
                
                if querySnapshot.isEmpty {
                    print("No famous courses found for tab: \\(tabName)")
                    self.isFamousCoursesLoading = false
                    return
                }
                
                for document in querySnapshot.documents {
                    if let course = try? document.data(as: Course.self) {
                        self.famousCoursesPerTab[tabName]?.append(course)
                        
                        if let courseId = course.id {
                            // add the course to the cache
                            courseController.cachedCourses[courseId] = course
                            
                            // fetch the courses thumbnail
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            // fetch the channel
                            if let channelId = course.channelId {
                                courseController.retrieveChannel(channelId: channelId)
                            }
                        }
                    }
                }
                
                self.isFamousCoursesLoading = false
            } catch {
                print("Error retrieving famous courses for \\(tabName): \\(error)")
                self.isFamousCoursesLoading = false
            }
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'MyCourseController.swift',
                        path: 'Lectures/Controllers/MyCourseController.swift',
                        type: 'file',
                        content: `//
//  WatchHistoryController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/15/25.
//

import Firebase
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import Foundation


class MyCourseController : ObservableObject {
    
    @Published var watchHistories: [WatchHistory] = []
    
    // Pagination
    @Published var lastWatchHistoryDoc: QueryDocumentSnapshot?
    @Published var noWatchHistoriesLeftToLoad: Bool = false
    
    // CourseId : WatchHistory
    @Published var cachedWatchHistories: [String : WatchHistory] = [:]
    
    // Loading
    @Published var isWatchHistoryLoading: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    // Storage
    let storage = Storage.storage()
    
    // Add these properties to the class
    @Published var currentChannelOffset: Int = 8
    @Published var currentCourseOffset: Int = 8
    @Published var currentLectureOffset: Int = 8
    
    
    func updateWatchHistory(userId: String, course: Course, lecture: Lecture) {
        Task { @MainActor in
            if let courseId = course.id, let numLecturesInCourse = course.numLecturesInCourse, let courseChannelId = course.channelId, let numLecturesInCourse = course.numLecturesInCourse, let lectureId = lecture.id, let currentLectureNumberInCourse  = lecture.lectureNumberInCourse {
                
                // check the cache, if a watchHistory is already in there, and the new lecture being watched isn't greater than the already highest watched lecture, we don't need to do anything
                if let watchHistory = cachedWatchHistories[courseId], let watchHistoryLectureNumberInCourse  = watchHistory.lectureNumberInCourse {
                    if watchHistoryLectureNumberInCourse >= currentLectureNumberInCourse {
                        print("returning early from cache - new lecture not greater - watch history")
                        return
                    }
                }
                
                
                // check if a watch history exists for this course already - if it does, update that same document. otherwise create a new one and store it in firestore
                do {
                    // determine if course is completed or not - if this is the last lecture
                    var isCourseCompleted = false
                    if currentLectureNumberInCourse == numLecturesInCourse {
                        isCourseCompleted = true
                    }
                    
                    let watchHistory = WatchHistory(userId: userId, courseId: courseId, lectureId: lectureId, channelId: courseChannelId, lectureNumberInCourse: currentLectureNumberInCourse, numLecturesInCourse: numLecturesInCourse, courseLastWatched: Timestamp(), isCourseCompleted: isCourseCompleted)
                    
                    
                    let querySnapshot = try await db.collection("watchHistories").whereField("userId", isEqualTo: userId).whereField("courseId", isEqualTo: courseId).getDocuments()
                    
                    // There's not an existing watch history so make a new one
                    if querySnapshot.documents.isEmpty {
                        print(" this is a new watch history, we're adding it")
                        // write this new object to firestore
                        do {
                            try db.collection("watchHistories").addDocument(from: watchHistory)
                            
                            // add the watch history to the cache
                            self.cachedWatchHistories[courseId] = watchHistory
                        } catch let error {
                            print("error writing new free watch history to firestore: ", error.localizedDescription)
                        }
                        
                        self.refreshCourseHistory(userId: userId)
                        return
                    }
                    
                    for document in querySnapshot.documents {
                        print("we've got an existing watch history for this user and this course: \\(document.documentID)")
                        // update the existing wathch History
                        
                        // ONLY IF THE NEW LECTURE NUMBER IS HIGHER THAN THE PREVIOUS. THIS MEANS YOUR WATCH HISTORY PROGRESS CAN ONLY MOVE FORWARDS, NOT BACKWARDS. (e.g. if you previously had watched lecture 3, then you went back and watched lecture 1, the watch history will remain on lecture 3)
                        if let previousWatchHistory = try? document.data(as: WatchHistory.self) {
                            if let previousLectureNumberInCourse = previousWatchHistory.lectureNumberInCourse {
                                if let newLectureNumberInCourse = watchHistory.lectureNumberInCourse {
                                    if previousLectureNumberInCourse >= newLectureNumberInCourse {
                                        return
                                    }
                                }
                            }
                        }
                        
                        do {
                            try db.collection("watchHistories").document(document.documentID).setData(from: watchHistory)
                            // add the watch history to the cache
                            self.cachedWatchHistories[courseId] = watchHistory
                        } catch let error {
                            print("Error writing watch history to Firestore: \\(error)")
                        }
                        
                        
                        self.refreshCourseHistory(userId: userId)
                        return
                    }
                } catch {
                    print("error getting watch history: \\(error)")
                }
            } else {
                print("some values are nil?")
            }
        }
    }
    
    // get a user's recently watched courses (on app open)
    func retrieveRecentWatchHistories(userId: String, courseController: CourseController) {
        // TODO: find a better way to refresh this? for now if it's already filled we won't check firestore again
        if self.watchHistories.count > 0 {
            print("skipping getting recent watch history again")
            return
        }
        
        self.isWatchHistoryLoading = true
        Task { @MainActor in
            self.watchHistories = []
            do {
                let querySnapshot = try await db.collection("watchHistories").whereField("userId", isEqualTo: userId).order(by: "courseLastWatched", descending: true).limit(to: 6).getDocuments()
                
                
                if querySnapshot.documents.isEmpty { noWatchHistoriesLeftToLoad = true }
                
                for document in querySnapshot.documents {
                    // build the watchHistory object and add it
                    if let watchHistory = try? document.data(as: WatchHistory.self) {
                        if let watchHistoryCourseId = watchHistory.courseId, let watchHistoryChannelId = watchHistory.channelId {
                            self.watchHistories.append(watchHistory)
                            self.cachedWatchHistories[watchHistoryCourseId] = watchHistory
                            
                            
                            courseController.retrieveCourse(courseId: watchHistoryCourseId)
                            courseController.retrieveChannel(channelId: watchHistoryChannelId)
                            courseController.getCourseThumbnail(courseId: watchHistoryCourseId)
                        }
                        
                    } else {
                        print("couldn't convert the document to a watch history")
                    }
                }
                
                // get the last doc for pagination
                guard let lastDocument = querySnapshot.documents.last else {
                    // the collection is empty
                    isWatchHistoryLoading = false
                    return
                }
                
                self.lastWatchHistoryDoc = lastDocument
                
                self.isWatchHistoryLoading = false
            } catch {
                print("Error getting documents: \\(error)")
            }
        }
    }
    
    
    func refreshCourseHistory(userId: String) {
        Task { @MainActor in
            self.watchHistories = []
            do {
                let querySnapshot = try await db.collection("watchHistories").whereField("userId", isEqualTo: userId).order(by: "courseLastWatched", descending: true).limit(to: 6).getDocuments()
                
                if querySnapshot.documents.isEmpty { noWatchHistoriesLeftToLoad = true }
                
                for document in querySnapshot.documents {
                    // build the watchHistory object and add it
                    if let watchHistory = try? document.data(as: WatchHistory.self) {
                        if let watchHistoryCourseId = watchHistory.courseId {
                            self.watchHistories.append(watchHistory)
                            self.cachedWatchHistories[watchHistoryCourseId] = watchHistory
                        }
                    } else {
                        print("couldn't convert the document to a watch history")
                    }
                }
                
                // get the last doc for pagination
                guard let lastDocument = querySnapshot.documents.last else {
                    // the collection is empty
                    return
                }
                
                self.lastWatchHistoryDoc = lastDocument
                
                self.isWatchHistoryLoading = false
            } catch {
                print("Error getting documents: \\(error)")
            }
        }
    }
    
    // Load first 8 channels, rest need to be paginated.
    func retrieveFollowedChannels(channelIds: [String], courseController: CourseController) {
        Task { @MainActor in
            currentChannelOffset = 8  // Reset the offset
            let initialChannels = channelIds.prefix(currentChannelOffset)
            for channelId in initialChannels {
                courseController.retrieveChannel(channelId: channelId)
                courseController.getChannelThumbnail(channelId: channelId)
            }
        }
    }
    
    // Load first 8 courses, rest need to be paginated.
    func retrieveLikedCourses(courseIds: [String], courseController: CourseController) {
        Task { @MainActor in
            currentCourseOffset = 8  // Reset the offset
            let initialCourses = courseIds.prefix(currentCourseOffset)
            for courseId in initialCourses {
                courseController.retrieveCourse(courseId: courseId)
                courseController.getCourseThumbnail(courseId: courseId)
            }
        }
    }
    
    // Load first 8 lectures, rest need to be paginated.
    func retrieveLikedLectures(lectureIds: [String], courseController: CourseController) {
        Task { @MainActor in
            currentLectureOffset = 2  // Reset the offset
            let initialLectures = lectureIds.prefix(currentLectureOffset)
            for lectureId in initialLectures {
                courseController.retrieveLecture(lectureId: lectureId)
                courseController.getLectureThumnbnail(lectureId: lectureId)
            }
        }
    }
    
    // pagination of watch history
    func getMoreWatchHistories(userId: String, courseController: CourseController) {
        if let lastDoc = self.lastWatchHistoryDoc {
            Task { @MainActor in
                do {
                    let querySnapshot = try await db.collection("watchHistories").whereField("userId", isEqualTo: userId).order(by: "courseLastWatched", descending: true).start(afterDocument: lastDoc).limit(to: 6).getDocuments()
                    
                    
                    if querySnapshot.documents.isEmpty { noWatchHistoriesLeftToLoad = true }
                    
                    for document in querySnapshot.documents {
                        // build the watchHistory object and add it
                        if let watchHistory = try? document.data(as: WatchHistory.self) {
                            if let watchHistoryCourseId = watchHistory.courseId, let watchHistoryChannelId = watchHistory.channelId {
                                self.watchHistories.append(watchHistory)
                                self.cachedWatchHistories[watchHistoryCourseId] = watchHistory
                                
                                
                                courseController.retrieveCourse(courseId: watchHistoryCourseId)
                                courseController.retrieveChannel(channelId: watchHistoryChannelId)
                                courseController.getCourseThumbnail(courseId: watchHistoryCourseId)
                            }
                            
                        } else {
                            print("couldn't convert the document to a watch history")
                        }
                    }
                    
                    // get the last doc for pagination
                    guard let lastDocument = querySnapshot.documents.last else {
                        // the collection is empty
                        return
                    }
                    
                    self.lastWatchHistoryDoc = lastDocument
                    
                    self.isWatchHistoryLoading = false
                } catch {
                    print("Error getting documents: \\(error)")
                }
            }
        }
    }
    
    // Add these new functions
    func loadMoreFollowedChannels(channelIds: [String], courseController: CourseController) {
        Task { @MainActor in
            let nextChannels = channelIds[currentChannelOffset..<min(currentChannelOffset + 8, channelIds.count)]
            for channelId in nextChannels {
                courseController.retrieveChannel(channelId: channelId)
                courseController.getChannelThumbnail(channelId: channelId)
            }
            currentChannelOffset += 8
        }
    }

    func loadMoreLikedCourses(courseIds: [String], courseController: CourseController) {
        Task { @MainActor in
            let nextCourses = courseIds[currentCourseOffset..<min(currentCourseOffset + 8, courseIds.count)]
            for courseId in nextCourses {
                courseController.retrieveCourse(courseId: courseId)
                courseController.getCourseThumbnail(courseId: courseId)
            }
            currentCourseOffset += 8
        }
    }

    func loadMoreLikedLectures(lectureIds: [String], courseController: CourseController) {
        Task { @MainActor in
            let nextLectures = lectureIds[currentLectureOffset..<min(currentLectureOffset + 2, lectureIds.count)]
            for lectureId in nextLectures {
                courseController.retrieveLecture(lectureId: lectureId)
                courseController.getLectureThumnbnail(lectureId: lectureId)
            }
            currentLectureOffset += 2
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'RateLimiter.swift',
                        path: 'Lectures/Controllers/RateLimiter.swift',
                        type: 'file',
                        content: `//
//  RateLimiter.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/23/25.
//

import Foundation
import SwiftUI


class RateLimiter : ObservableObject {
    @AppStorage("numActionsInLastMinute") private var numActionsInLastMinute: Int = 0
    @AppStorage("firstActionDateTimeInterval") private var firstActionDateTimeInterval: Double? {
        didSet {
            firstActionDate = firstActionDateTimeInterval.map { Date(timeIntervalSince1970: $0) }
        }
    }
    private var firstActionDate: Date?
    
    @AppStorage("numberBreach") private var numberBreach: Int = 0
    @AppStorage("lastBreachTimeInterval") private var lastBreachTimeInterval: Double?
    @Published var shouldRateLimitPopupShow: Bool = false
    
    
    init() {
        self.firstActionDate = firstActionDateTimeInterval.map { Date(timeIntervalSince1970: $0) }
        
        if let lastBreachTime = lastBreachTimeInterval {
            let lastBreachDate = Date(timeIntervalSince1970: lastBreachTime)
            let timeoutDuration: TimeInterval
            
            switch numberBreach {
            case 0, 1: timeoutDuration = 60
            case 2: timeoutDuration = 300
            case 3: timeoutDuration = 600
            default: timeoutDuration = 300
            }
            
            if Date() < lastBreachDate.addingTimeInterval(timeoutDuration) {
                shouldRateLimitPopupShow = true
            }
        }
    }
    
    // Rate limiting - limits firestore writes and blocks spamming in a singular user session. app is still prone to attacks in multiple app sessions (closing and re-opening)
    // Limits users to 10 writes in one minute
    func processWrite() -> String? {
        if shouldRateLimitPopupShow {
            return "Too many actions in one minute"
        }
        
        if let firstActionDate = self.firstActionDate {
            
            // Get firstActionDate + 60 seconds
            let oneMinFromFirst = Calendar.current.date(byAdding: .second, value: 60, to: firstActionDate)
            
            if let oneMinFromFirst {
                if Date() < oneMinFromFirst {
                    if self.numActionsInLastMinute < 10 {
                        self.numActionsInLastMinute += 1
                    } else {
                        withAnimation(.spring()) {
                            self.shouldRateLimitPopupShow = true
                        }
                        self.numberBreach += 1
                        self.lastBreachTimeInterval = Date().timeIntervalSince1970
                        return "Too many actions in one minute"
                    }
                } else {
                    self.firstActionDate = Date()
                    self.numActionsInLastMinute = 1
                }
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
                    },
                    {
                        name: 'ResourceControllers',
                        path: 'Lectures/Controllers/ResourceControllers',
                        type: 'directory',
                        children: [
                            {
                                name: 'ExamAnswerController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/ExamAnswerController.swift',
                                type: 'file',
                                content: `//
//  ExamAnswerController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/3/25.
//

import FirebaseFirestore
import Foundation

class ExamAnswerController : ObservableObject {
    
    // ExamId : Exam
    @Published var cachedExamAnswers: [String : Resource] = [:]
    
    // TODO: Should we also store a map of courseIds : Resource?
    
    // Firestore
    let db = Firestore.firestore()
    
    func retrieveExamAnswer(examAnswerId: String) {
        // if it's already cached don't do another lookup
        if let _ = cachedExamAnswers[examAnswerId] {
//            print("examAnswer already cached")
            return
        }
        
        // Use Main actor because cachedExams which is the updated published property determinies behavior in the UI, so it's logic should be on the main thread.
        Task { @MainActor in
            let docRef = db.collection("examAnswers").document(examAnswerId)
            
            do {
                let examAnswer = try await docRef.getDocument(as: Resource.self)
                
                // add the exam to the cache
                self.cachedExamAnswers[examAnswerId] = examAnswer
            } catch {
                print("Error decoding exam answer: \\(error)")
            }
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ExamController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/ExamController.swift',
                                type: 'file',
                                content: `//
//  ExamController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/3/25.
//

import FirebaseFirestore
import Foundation

class ExamController : ObservableObject {
    
    // ExamId : Exam
    @Published var cachedExams: [String : Resource] = [:]
    
    // TODO: Should we also store a map of courseIds : Resource?
    
    // Firestore
    let db = Firestore.firestore()
    
    func retrieveExam(examId: String) {
        // if it's already cached don't do another lookup
        if let _ = cachedExams[examId] {
//            print("exam already cached")
            return
        }
        
        // Use Main actor because cachedExams which is the updated published property determinies behavior in the UI, so it's logic should be on the main thread.
        Task { @MainActor in
            let docRef = db.collection("exams").document(examId)
            
            do {
                let exam = try await docRef.getDocument(as: Resource.self)
                
                // add the exam to the cache
                self.cachedExams[examId] = exam
            } catch {
                print("Error decoding exam: \\(error)")
            }
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeworkAnswersController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/HomeworkAnswersController.swift',
                                type: 'file',
                                content: `//
//  HomeworkAnswersController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/4/25.
//

import Foundation
import FirebaseFirestore
import Foundation

class HomeworkAnswersController : ObservableObject {
    
    // ExamId : Exam
    @Published var cachedHomeworkAnswers: [String : Resource] = [:]
    
    // TODO: Should we also store a map of courseIds : Resource?
    
    // Firestore
    let db = Firestore.firestore()
    
    func retrieveHomeworkAnswer(homeworkAnswerId: String) {
        // if it's already cached don't do another lookup
        if let _ = cachedHomeworkAnswers[homeworkAnswerId] {
//            print("homework already cached")
            return
        }
        
        // Use Main actor because cachedNotes which is the updated published property determinies behavior in the UI, so it's logic should be on the main thread.
        Task { @MainActor in
            let docRef = db.collection("homeworkAnswers").document(homeworkAnswerId)
            
            do {
                let homeworkAnswer = try await docRef.getDocument(as: Resource.self)
                
                // add the exam to the cache
                self.cachedHomeworkAnswers[homeworkAnswerId] = homeworkAnswer
            } catch {
                print("Error decoding homework answer: \\(error)")
            }
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeworkController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/HomeworkController.swift',
                                type: 'file',
                                content: `import FirebaseFirestore
import Foundation

class HomeworkController : ObservableObject {
    
    // ExamId : Exam
    @Published var cachedHomeworks: [String : Resource] = [:]
    
    // TODO: Should we also store a map of courseIds : Resource?
    
    // Firestore
    let db = Firestore.firestore()
    
    func retrieveHomework(homeworkId: String) {
        // if it's already cached don't do another lookup
        if let _ = cachedHomeworks[homeworkId] {
//            print("homework already cached")
            return
        }
        
        // Use Main actor because cachedNotes which is the updated published property determinies behavior in the UI, so it's logic should be on the main thread.
        Task { @MainActor in
            let docRef = db.collection("homeworks").document(homeworkId)
            
            do {
                let homework = try await docRef.getDocument(as: Resource.self)
                
                // add the exam to the cache
                self.cachedHomeworks[homeworkId] = homework
            } catch {
                print("Error decoding homework: \\(error)")
            }
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'NotesController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/NotesController.swift',
                                type: 'file',
                                content: `import FirebaseFirestore
import Foundation

class NotesController : ObservableObject {
    
    // ExamId : Exam
    @Published var cachedNotes: [String : Resource] = [:]
    @Published var isLoading: Bool = false
    
    
    
    // TODO: Should we also store a map of courseIds : Resource?
    
    // Firestore
    let db = Firestore.firestore()
    
    func retrieveNote(noteId: String) {
        // if it's already cached don't do another lookup
        if let _ = cachedNotes[noteId] {
//            print("note already cached")
            return
        }
        
        isLoading = true
        
        // Use Main actor because cachedNotes which is the updated published property determinies behavior in the UI, so it's logic should be on the main thread.
        Task { @MainActor in
            let docRef = db.collection("notes").document(noteId)
            
            do {
                let note = try await docRef.getDocument(as: Resource.self)
                
                // add the exam to the cache
                self.cachedNotes[noteId] = note
            } catch {
                print("Error decoding note: \\(error)")
            }
            
            isLoading = false
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ReelsController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/ReelsController.swift',
                                type: 'file',
                                content: `//
//  ReelsController.swift
//  Lectures
//
//  Created by Ben Dreyer on 3/9/25.
//

import Foundation
import AVFoundation
import SwiftUI
import Combine
import FirebaseFirestore
import FirebaseStorage

class ReelsController: NSObject, ObservableObject {
    @Published var reels: [Reel] = []
    @Published var currentIndex: Int = 0
    @Published var isPlaying: Bool = true
    @Published var isLoading: Bool = true
    @Published var likedReels: Set<String> = Set() // Track liked reels by ID
    
    // Replace the players array with a fixed-size array and tracking variables
    private var recycledPlayers: [AVPlayer] = [AVPlayer(), AVPlayer(), AVPlayer()]
    private var playerAssignments: [Int: Int] = [:] // Maps reel index to player index
    private var playerReelIndices: [Int] = [-1, -1, -1] // Tracks which reel index each player is showing
    
    private var cancellables = Set<AnyCancellable>()
    private let db = Firestore.firestore()
    private let storage = Storage.storage()
    
    // Alternative approach - create a new player for each reel
    private var playerCache: [Int: AVPlayer] = [:]
    
    // Add these properties to the ReelsController class
    private var lastFetchedReelId: String? = nil
    private var isFetchingMoreReels: Bool = false
    private let reelsPerPage: Int = 8
    private var fetchedReelIds: Set<String> = Set() // Track already fetched reels to avoid duplicates
    
    // Add this property to track our random number threshold
    private var currentRandomThreshold: Int = 0
    
    // Add audio session property
    private var audioSession: AVAudioSession?
    
    override init() {
        super.init()
        setupAudioSession()
        fetchReelsFromFirebase()
    }
    
    // Add this new method to configure the audio session
    private func setupAudioSession() {
        do {
            audioSession = AVAudioSession.sharedInstance()
            try audioSession?.setCategory(.playback, mode: .default)
            try audioSession?.setActive(true)
        } catch {
            print("Failed to set up audio session: \\(error.localizedDescription)")
        }
    }
    
    private func fetchReelsFromFirebase() {
        isLoading = true
        fetchedReelIds.removeAll() // Clear the set when starting fresh
        lastFetchedReelId = nil
        
        // Generate a random threshold for the initial fetch
        currentRandomThreshold = Int.random(in: 0...999999)
        
        // Fetch the first batch of random reels
        fetchReelsWithRandomThreshold()
    }
    
    private func fetchReelsWithRandomThreshold() {
        guard !isFetchingMoreReels else { return }
        
        isFetchingMoreReels = true
        
        // Show loading indicator only if this is the first fetch
        let shouldShowLoading = reels.isEmpty
        if shouldShowLoading {
            DispatchQueue.main.async { [weak self] in
                self?.isLoading = true
            }
        }
        
        print("Fetching reels with random threshold: \\(currentRandomThreshold)")
        
        // Create a query to get reels with randomNumber > our threshold
        let query = db.collection("reels")
                      .whereField("randomNumber", isGreaterThan: currentRandomThreshold)
                      .limit(to: reelsPerPage)
        
        query.getDocuments { [weak self] snapshot, error in
            guard let self = self else { return }
            
            if let error = error {
                print("Error fetching reels: \\(error.localizedDescription)")
                self.handleEmptyOrErrorResult(shouldShowLoading: shouldShowLoading)
                return
            }
            
            guard let documents = snapshot?.documents, !documents.isEmpty else {
                print("No reels found with randomNumber > \\(self.currentRandomThreshold)")
                
                // If no reels found above the threshold, try below the threshold
                self.fetchReelsBelowThreshold(shouldShowLoading: shouldShowLoading)
                return
            }
            
            // Process the documents
            self.processReelDocuments(documents, shouldShowLoading: shouldShowLoading)
        }
    }
    
    private func fetchReelsBelowThreshold(shouldShowLoading: Bool) {
        print("Trying to fetch reels with randomNumber < \\(currentRandomThreshold)")
        
        // Create a query to get reels with randomNumber < our threshold
        let query = db.collection("reels")
                      .whereField("randomNumber", isLessThan: currentRandomThreshold)
                      .limit(to: reelsPerPage)
        
        query.getDocuments { [weak self] snapshot, error in
            guard let self = self else { return }
            
            if let error = error {
                print("Error fetching reels below threshold: \\(error.localizedDescription)")
                self.handleEmptyOrErrorResult(shouldShowLoading: shouldShowLoading)
                return
            }
            
            guard let documents = snapshot?.documents, !documents.isEmpty else {
                print("No reels found below threshold either")
                self.handleEmptyOrErrorResult(shouldShowLoading: shouldShowLoading)
                return
            }
            
            // Process the documents
            self.processReelDocuments(documents, shouldShowLoading: shouldShowLoading)
        }
    }
    
    private func handleEmptyOrErrorResult(shouldShowLoading: Bool) {
        defer {
            isFetchingMoreReels = false
        }
        
        // If this is the first fetch and no reels were found, fall back to sample data
        if reels.isEmpty {
            print("Falling back to sample data")
            DispatchQueue.main.async {
                self.reels = Reel.samples
                self.setupPlayers()
                self.isLoading = false
            }
        } else {
            // Otherwise, just end loading
            if shouldShowLoading {
                DispatchQueue.main.async {
                    self.isLoading = false
                }
            }
        }
    }
    
    private func processReelDocuments(_ documents: [QueryDocumentSnapshot], shouldShowLoading: Bool) {
        defer {
            isFetchingMoreReels = false
        }
        
        print("Fetched \\(documents.count) reels")
        
        // Parse documents into Reel objects
        var newReels: [Reel] = []
        
        for document in documents {
            // Skip if we've already fetched this reel
            if self.fetchedReelIds.contains(document.documentID) {
                continue
            }
            
            do {
                var reel = try document.data(as: Reel.self, decoder: Firestore.Decoder())
                
                // Ensure the reel has an ID
                if reel.id == nil {
                    reel.id = document.documentID
                }
                
                // Add to our tracking set
                self.fetchedReelIds.insert(document.documentID)
                newReels.append(reel)
            } catch {
                print("Error decoding reel: \\(error.localizedDescription)")
            }
        }
        
        // If we got new reels, download their videos and add them to our list
        if !newReels.isEmpty {
            // First, download videos for the new reels before adding them to the main array
            downloadVideosForNewReels(newReels) { [weak self] in
                guard let self = self else { return }
                
                // Now add the new reels to our existing reels
                DispatchQueue.main.async {
                    let oldCount = self.reels.count
                    self.reels.append(contentsOf: newReels)
                    
                    print("Total reels count now: \\(self.reels.count)")
                    
                    if shouldShowLoading {
                        self.isLoading = false
                    }
                }
            }
        } else {
            if shouldShowLoading {
                DispatchQueue.main.async {
                    self.isLoading = false
                }
            }
        }
    }
    
    private func downloadVideosFromStorage() {
        isLoading = true
        let dispatchGroup = DispatchGroup()
        
        // We'll only download the first few videos initially
        let initialLoadCount = min(3, reels.count)
        
        for i in 0..<initialLoadCount {
            let reel = reels[i]
            guard let reelId = reel.id else { continue }
            
            dispatchGroup.enter()
            
            // Create a reference to the video in Firebase Storage
            let videoRef = storage.reference().child("reels/\\(reelId).mp4")
            
            // Get the download URL
            videoRef.downloadURL { [weak self] (url, error) in
                defer { dispatchGroup.leave() }
                guard let self = self else { return }
                
                if let error = error {
                    print("Error getting download URL for reel \\(reelId): \\(error.localizedDescription)")
                    return
                }
                
                guard let downloadURL = url else {
                    print("Download URL is nil for reel \\(reelId)")
                    return
                }
                
                // Assign this URL to one of our recycled players
                if i < self.recycledPlayers.count {
                    let player = self.recycledPlayers[i]
                    let playerItem = AVPlayerItem(url: downloadURL)
                    player.replaceCurrentItem(with: playerItem)
                    
                    // Set up looping for this player
                    NotificationCenter.default.addObserver(
                        forName: .AVPlayerItemDidPlayToEndTime,
                        object: player.currentItem,
                        queue: .main) { _ in
                            player.seek(to: CMTime.zero)
                            player.play()
                        }
                    
                    // Track which reel this player is showing
                    self.playerReelIndices[i] = i
                    self.playerAssignments[i] = i
                    
                    // Add this to the player item setup
                    playerItem.preferredForwardBufferDuration = 2.0  // Buffer 2 seconds ahead
                }
            }
        }
        
        dispatchGroup.notify(queue: .main) { [weak self] in
            guard let self = self else { return }
            
            // If we couldn't download any videos, fall back to samples
            if self.playerReelIndices.allSatisfy({ $0 == -1 }) {
                self.reels = Reel.samples
                self.setupSamplePlayers()
            }
            
            self.isLoading = false
        }
    }
    
    private func setupSamplePlayers() {
        // Initialize the recycled players with sample videos
        let sampleCount = min(recycledPlayers.count, reels.count)
        
        for i in 0..<sampleCount {
            if let path = Bundle.main.path(forResource: reels[i].videoURL, ofType: "mp4") {
                let url = URL(fileURLWithPath: path)
                let player = recycledPlayers[i]
                let playerItem = AVPlayerItem(url: url)
                player.replaceCurrentItem(with: playerItem)
                
                // Loop videos
                NotificationCenter.default.addObserver(
                    forName: .AVPlayerItemDidPlayToEndTime,
                    object: player.currentItem,
                    queue: .main) { [weak self] _ in
                        player.seek(to: CMTime.zero)
                        player.play()
                    }
                
                // Track which reel this player is showing
                playerReelIndices[i] = i
                playerAssignments[i] = i
            }
        }
    }
    
    private func setupPlayers() {
        // This method should call setupSamplePlayers since we're falling back to samples
        setupSamplePlayers()
    }
    
    // Add this method to properly dispose of a player
    private func disposePlayer(_ player: AVPlayer) {
        // Stop playback
        player.pause()
        
        // Set volume to 0
        player.volume = 0
        
        // Remove all observers
        NotificationCenter.default.removeObserver(player)
        
        // Remove the current item
        player.replaceCurrentItem(with: nil)
    }
    
    // Add this method to clean up unused players
    private func cleanupUnusedPlayers() {
        // Get the set of indices we need to keep (current and adjacent)
        let indicesToKeep = Set([
            currentIndex,
            currentIndex - 1,
            currentIndex + 1
        ].filter { $0 >= 0 && $0 < reels.count })
        
        // Find indices to remove
        let indicesToRemove = playerCache.keys.filter { !indicesToKeep.contains($0) }
        
        // Dispose and remove players for these indices
        for index in indicesToRemove {
            if let player = playerCache[index] {
//                print("Disposing player for reel \\(index)")
                disposePlayer(player)
                playerCache.removeValue(forKey: index)
            }
        }
    }
    
    // Update the playerForReelAt method to clean up unused players
    func playerForReelAt(index: Int) -> AVPlayer? {
        // Clean up unused players periodically
        cleanupUnusedPlayers()
        
        // Check if we already have a player for this reel
        if let existingPlayer = playerCache[index] {
            return existingPlayer
        }
        
        // Create a new player for this reel
        guard index >= 0, index < reels.count else { return nil }
        let reel = reels[index]
        guard let reelId = reel.id else { return nil }
        
//        print("Creating new player for reel \\(index)")
        
        // Create a new player
        let player = AVPlayer()
        playerCache[index] = player
        
        // Load the video
        loadVideoForReel(at: index, into: player)
        
        return player
    }
    
    // Modify forceLoadVideoForReel to be more efficient
    private func forceLoadVideoForReel(at reelIndex: Int, into player: AVPlayer) {
        guard reelIndex >= 0, reelIndex < reels.count else { return }
        
        let reel = reels[reelIndex]
        guard let reelId = reel.id else { return }
        
        // Only show loading indicator for the current reel
        let shouldShowLoading = reelIndex == currentIndex
        
        if shouldShowLoading {
            DispatchQueue.main.async { [weak self] in
                self?.isLoading = true
            }
        }
        
        // Remove all observers and reset the player
        NotificationCenter.default.removeObserver(player)
        
        // Try to get the URL first instead of downloading the entire file
        let videoRef = storage.reference().child("reels/\\(reelId).mp4")
        
        videoRef.downloadURL { [weak self] (url, error) in
            guard let self = self else { return }
            
            if let error = error {
                print("Error getting download URL for reel \\(reelIndex): \\(error.localizedDescription)")
                if shouldShowLoading {
                    DispatchQueue.main.async {
                        self.isLoading = false
                    }
                }
                return
            }
            
            guard let downloadURL = url else {
                print("Download URL is nil for reel \\(reelIndex)")
                if shouldShowLoading {
                    DispatchQueue.main.async {
                        self.isLoading = false
                    }
                }
                return
            }
            
            // Create AVAsset with custom loading options for better streaming
            let asset = AVAsset(url: downloadURL)
            let playerItem = AVPlayerItem(asset: asset, automaticallyLoadedAssetKeys: ["playable"])
            
            // Set up a timeout for loading
            let timeoutSeconds = 10.0
            DispatchQueue.main.asyncAfter(deadline: .now() + timeoutSeconds) { [weak self] in
                if shouldShowLoading {
                    self?.isLoading = false
                }
            }
            
            // Listen for when the item is ready to play
            playerItem.addObserver(self, forKeyPath: "status", options: [.new, .old], context: nil)
            
            DispatchQueue.main.async {
                // Replace the current item with the new one
                player.replaceCurrentItem(with: playerItem)
                
                // Set up looping for this player
                NotificationCenter.default.addObserver(
                    forName: .AVPlayerItemDidPlayToEndTime,
                    object: player.currentItem,
                    queue: .main) { _ in
                        player.seek(to: CMTime.zero)
                        player.play()
                    }
            }
        }
    }
    
    // Add this method to handle player item status changes
    public override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == "status", let playerItem = object as? AVPlayerItem {
            if playerItem.status == .readyToPlay {
                // The item is ready to play
                DispatchQueue.main.async { [weak self] in
                    self?.isLoading = false
                }
            } else if playerItem.status == .failed {
                // The item failed to load
                print("Player item failed to load: \\(String(describing: playerItem.error))")
                DispatchQueue.main.async { [weak self] in
                    self?.isLoading = false
                }
            }
        }
    }
    
    // Add this method to load a video into a player
    private func loadVideoForReel(at reelIndex: Int, into player: AVPlayer) {
        // Simply call our force loading method since that's the more reliable approach
        forceLoadVideoForReel(at: reelIndex, into: player)
    }
    
    // Modify the assignPlayerToReel method to use our new force loading method
    private func assignPlayerToReel(at reelIndex: Int) -> AVPlayer? {
        guard reelIndex >= 0, reelIndex < reels.count else { return nil }
        
//        print("Assigning player to reel \\(reelIndex)")
        
        // Find a player to reuse - simplify this logic
        var playerToReuse = reelIndex % recycledPlayers.count
        
        // Update our tracking
        let oldReelIndex = playerReelIndices[playerToReuse]
        if oldReelIndex != -1 {
            playerAssignments.removeValue(forKey: oldReelIndex)
        }
        
        playerReelIndices[playerToReuse] = reelIndex
        playerAssignments[reelIndex] = playerToReuse
        
        // Force load the video for this reel
        let player = recycledPlayers[playerToReuse]
        forceLoadVideoForReel(at: reelIndex, into: player)
        
        return player
    }
    
    // Replace existing playerForCurrentReel method
    func playerForCurrentReel() -> AVPlayer? {
        return playerForReelAt(index: currentIndex)
    }
    
    // Update existing playCurrentVideo method
    func playCurrentVideo() {
        // First stop all audio to prevent overlap
        stopAllAudio()
        
        // Then pause all videos
        pauseAllVideos()
        
        // Ensure audio session is active before playing
        do {
            try audioSession?.setActive(true)
            // Print debug info
            debugAudioSessionStatus()
        } catch {
            print("Failed to activate audio session: \\(error.localizedDescription)")
        }
        
        // Finally play the current video with full volume
        if let player = playerForCurrentReel() {
            player.volume = 1.0
            player.play()
            isPlaying = true
        }
    }
    
    // Update existing pauseCurrentVideo method
    func pauseCurrentVideo() {
        if let player = playerForCurrentReel() {
            player.pause()
            isPlaying = false
        }
    }
    
    // Update existing pauseAllVideos method
    private func pauseAllVideos() {
        // Pause all recycled players
        recycledPlayers.forEach { $0.pause() }
        
        // Also pause all cached players
        for (_, player) in playerCache {
            player.pause()
        }
    }
    
    // Add a method to completely stop all audio
    private func stopAllAudio() {
        // Set volume to 0 for all players
        recycledPlayers.forEach { $0.volume = 0 }
        
        for (_, player) in playerCache {
            player.volume = 0
        }
    }
    
    // Update existing playerAt method
    func playerAt(index: Int) -> AVPlayer? {
        return playerForReelAt(index: index)
    }
    
    // Update existing preparePlayerAt method
    func preparePlayerAt(index: Int) {
        guard index >= 0, index < reels.count else { return }
        
        // Make sure we have a player assigned to this reel
        let player = playerForReelAt(index: index) ?? assignPlayerToReel(at: index)
        
        // Prepare it
        player?.seek(to: CMTime.zero)
        player?.pause()
    }
    
    // Add this method to preload videos beyond just adjacent ones
    private func preloadUpcomingVideos() {
        // Preload the next few videos (not just the adjacent one)
        let preloadCount = 3  // Number of videos to preload ahead
        
        for i in (currentIndex + 1)...(currentIndex + preloadCount) {
            if i < reels.count {
                // Load at low priority
                DispatchQueue.global(qos: .background).async {
                    _ = self.playerForReelAt(index: i)
                }
            }
        }
    }
    
    // Update the setCurrentIndex method to ensure audio is properly set
    func setCurrentIndex(to index: Int) {
        guard index >= 0, index < reels.count else { return }
        
        // Stop audio from all players
        stopAllAudio()
        
        // Update the current index
        currentIndex = index
        
        // Always ensure the current video is loaded and has proper volume
        if let currentPlayer = playerForReelAt(index: index) {
            currentPlayer.volume = 1.0  // Ensure volume is set to full
        }
        
        // Preload adjacent videos but ensure they're muted
        if index > 0 {
            if let prevPlayer = playerForReelAt(index: index - 1) {
                prevPlayer.volume = 0
                prevPlayer.pause()
            }
        }
        
        if index < reels.count - 1 {
            if let nextPlayer = playerForReelAt(index: index + 1) {
                nextPlayer.volume = 0
                nextPlayer.pause()
            }
        }
        
        // Preload more upcoming videos in the background
        preloadUpcomingVideos()
        
        // Clean up any other players
        cleanupUnusedPlayers()
        
        // Check if we need to fetch more reels
        checkAndFetchMoreReelsIfNeeded()
    }
    
    // Update existing playPlayerAt method
    func playPlayerAt(index: Int) {
        // First stop all audio
        stopAllAudio()
        
        // Then pause all videos
        pauseAllVideos()
        
        // Finally play the requested video with full volume
        if let player = playerForReelAt(index: index) {
            player.volume = 1.0
            player.play()
        }
    }
    
    // Toggle like status for the current reel
    func toggleLike() {
        guard currentIndex < reels.count, let reelId = reels[currentIndex].id else { return }
        
        // Check if already liked
        let isCurrentlyLiked = likedReels.contains(reelId)
        
        // Update local state first for immediate feedback
        if isCurrentlyLiked {
            likedReels.remove(reelId)
            reels[currentIndex].likes -= 1
        } else {
            likedReels.insert(reelId)
            reels[currentIndex].likes += 1
        }
        
        // Update Firestore
        updateReelLikeCount(reelId: reelId, increment: !isCurrentlyLiked)
    }
    
    // Update like count in Firestore
    private func updateReelLikeCount(reelId: String, increment: Bool) {
        let reelRef = db.collection("reels").document(reelId)
        
        // Use Firestore transactions to safely update the count
        db.runTransaction({ (transaction, errorPointer) -> Any? in
            do {
                let reelDocument = try transaction.getDocument(reelRef)
                
                // Get current like count
                guard let currentLikes = reelDocument.data()?["likes"] as? Int else {
                    return nil
                }
                
                // Calculate new like count
                let newLikes = increment ? currentLikes + 1 : currentLikes - 1
                
                // Update the document
                transaction.updateData(["likes": newLikes], forDocument: reelRef)
                
                return newLikes
            } catch let fetchError as NSError {
                errorPointer?.pointee = fetchError
                return nil
            }
        }) { (_, error) in
            if let error = error {
                print("Error updating reel like count: \\(error.localizedDescription)")
                
                // Revert local state if update fails
                DispatchQueue.main.async { [weak self] in
                    guard let self = self, self.currentIndex < self.reels.count, 
                          let reelId = self.reels[self.currentIndex].id else { return }
                    
                    if increment {
                        self.likedReels.remove(reelId)
                        self.reels[self.currentIndex].likes -= 1
                    } else {
                        self.likedReels.insert(reelId)
                        self.reels[self.currentIndex].likes += 1
                    }
                }
            }
        }
    }
    
    // Check if a reel is liked
    func isReelLiked(reelId: String) -> Bool {
        return likedReels.contains(reelId)
    }
    
    // Add this method to the ReelsController class
    func reelAt(index: Int) -> Reel? {
        guard index >= 0, index < reels.count else { return nil }
        return reels[index]
    }
    
    // Add this method to the ReelsController class
    func togglePlayPause() {
        if isPlaying {
            pauseCurrentVideo()
        } else {
            playCurrentVideo()
        }
    }
    
    // Add a method to reset loading state in case of issues
    func resetLoadingState() {
        DispatchQueue.main.async { [weak self] in
            self?.isLoading = false
        }
    }
    
    // Add a method to fetch thumbnail for a reel
    private func fetchThumbnailForReel(at index: Int) {
        guard index >= 0, index < reels.count else { return }
        let reel = reels[index]
        guard let reelId = reel.id else { return }
        
        // Try to get a thumbnail from Firebase Storage
        let thumbnailRef = storage.reference().child("thumbnails/\\(reelId).jpg")
        
        thumbnailRef.getData(maxSize: 1 * 1024 * 1024) { [weak self] (data, error) in
            guard let self = self else { return }
            
            if let data = data, let image = UIImage(data: data) {
                DispatchQueue.main.async {
                    // Store the thumbnail in the reel object or a separate cache
                    // This would require adding a thumbnailImage property to the Reel model
                    // self.reelThumbnails[reelId] = image
                }
            }
        }
    }
    
    // Add this method to download videos for new reels
    private func downloadVideosForNewReels(_ newReels: [Reel], completion: @escaping () -> Void) {
        let dispatchGroup = DispatchGroup()
        
        for (index, reel) in newReels.enumerated() {
            guard let reelId = reel.id else { continue }
            
            dispatchGroup.enter()
            
            // Create a reference to the video in Firebase Storage
            let videoRef = storage.reference().child("reels/\\(reelId).mp4")
            
            // Get the download URL
            videoRef.downloadURL { [weak self] (url, error) in
                defer { dispatchGroup.leave() }
                guard let self = self else { return }
                
                if let error = error {
                    print("Error getting download URL for new reel \\(reelId): \\(error.localizedDescription)")
                    return
                }
                
                guard let downloadURL = url else {
                    print("Download URL is nil for new reel \\(reelId)")
                    return
                }
                
                // Create a player for this reel and preload the video
                let player = AVPlayer()
                let playerItem = AVPlayerItem(url: downloadURL)
                
                // Set up custom loading options for better streaming
                playerItem.preferredForwardBufferDuration = 2.0
                
                // Replace the current item with the new one
                player.replaceCurrentItem(with: playerItem)
                
                // Set up looping for this player
                NotificationCenter.default.addObserver(
                    forName: .AVPlayerItemDidPlayToEndTime,
                    object: player.currentItem,
                    queue: .main) { _ in
                        player.seek(to: CMTime.zero)
                        player.play()
                    }
                
                // Store this player in our cache
                let globalIndex = self.reels.count + index
                self.playerCache[globalIndex] = player
                
//                print("Preloaded video for new reel at future index \\(globalIndex)")
            }
        }
        
        // When all videos are downloaded, call the completion handler
        dispatchGroup.notify(queue: .main) {
            print("All videos for new reels have been preloaded")
            completion()
        }
    }
    
    // Update the checkAndFetchMoreReelsIfNeeded method
    private func checkAndFetchMoreReelsIfNeeded() {
        // If we're within 2 reels of the end, fetch more
        let threshold = 2
        if currentIndex >= reels.count - threshold {
            // Generate a new random threshold for the next fetch
            currentRandomThreshold = Int.random(in: 0...999999)
            fetchReelsWithRandomThreshold()
        }
    }
    
    // Add this method to completely randomize the reels order
    private func randomizeReelsOrder() {
        DispatchQueue.main.async {
            // Shuffle the entire reels array
            self.reels.shuffle()
            
            // Reset player assignments since indices have changed
            self.playerAssignments.removeAll()
            self.playerReelIndices = Array(repeating: -1, count: self.recycledPlayers.count)
            self.playerCache.removeAll()
            
            // Reset current index to 0
            self.currentIndex = 0
            
            // Reload the first few videos
            self.downloadVideosFromStorage()
        }
    }
    
    // Add a method to clean up audio session when needed
    func cleanupAudioSession() {
        do {
            try audioSession?.setActive(false)
        } catch {
            print("Failed to deactivate audio session: \\(error.localizedDescription)")
        }
    }
    
    // Add this method to debug audio issues
    private func debugAudioSessionStatus() {
        guard let session = audioSession else { return }
        
        print("Audio Session Status:")
        print("- Category: \\(session.category.rawValue)")
        print("- Mode: \\(session.mode.rawValue)")
        print("- Is Active: \\(session.isOtherAudioPlaying)")
        print("- Output Volume: \\(session.outputVolume)")
        print("- Silent mode: \\(!UserDefaults.standard.bool(forKey: "silent_mode_check"))")
        
        // Store if we've checked for silent mode
        UserDefaults.standard.set(true, forKey: "silent_mode_check")
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ResourceController.swift',
                                path: 'Lectures/Controllers/ResourceControllers/ResourceController.swift',
                                type: 'file',
                                content: `//
//  ResourceController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import Foundation

class ResourceController : ObservableObject {
    // Path : PDF URL
    @Published var cachedUrls: [String : URL] = [:]
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'SearchController.swift',
                        path: 'Lectures/Controllers/SearchController.swift',
                        type: 'file',
                        content: `//
//  SearchController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import FirebaseFirestore
import Foundation

class SearchController : ObservableObject {
    @Published var searchText: String = ""
    @Published var areFiltersShowing: Bool = false
    
    @Published var searchResultCourses: [Course] = []
    @Published var searchResultLectures: [Lecture] = []
    @Published var searchResultChannels: [Channel] = []
    
    @Published var wasSearchPerformed = false
    @Published var displaySearchGraphic = true
    
    // Pagination
    @Published var lastDocChannel: QueryDocumentSnapshot?
    @Published var lastDocCourse: QueryDocumentSnapshot?
    @Published var lastDocLecture: QueryDocumentSnapshot?
    
    @Published var noChannelsLeftToLoad: Bool = false
    @Published var noCoursesLeftToLoad: Bool = false
    @Published var noLecturesLeftToLoad: Bool = false
    
    // Loading vars
    @Published var isCoursesLoading: Bool = false
    @Published var isLecturesLoading: Bool = false
    @Published var isChannelsLoading: Bool = false
    
    // Filters
    
    // Search result type
    @Published var isLectureFilterSelected: Bool = true
    @Published var isCourseFilterSelected: Bool = true
    @Published var isChannelFilterSelected: Bool = true
    
    // Category list
    @Published var categoryList: [String] = ["Computer Science", "Engineering", "Mathematics", "Natural Sciences", "Business", "Economics", "Finance", "History", "Philosophy", "Sociology", "Psychology", "Literature", "Design", "Medicine", "Health", "Education", "Language"]
    // use this in query to Firestore
    @Published var activeCategories: [String] = []
    
    // Course size filters
    @Published var lessThanFiveLectures: Bool = false
    @Published var greaterThanFiveLectures: Bool = false
    @Published var greaterThanTenLectures: Bool = false
    
    // Sory by filters
    @Published var sortByMostWatched: Bool = true
    @Published var sortByMostLiked: Bool = false
    
    
    // Firestore
    let db = Firestore.firestore()
    
    func clearSearchResults() {
        searchResultCourses = []
        searchResultLectures = []
        searchResultChannels = []
        
        isCoursesLoading = false
        isLecturesLoading = false
        isChannelsLoading = false
        
        noCoursesLeftToLoad = false
        noLecturesLeftToLoad = false
        noChannelsLeftToLoad = false
        
        wasSearchPerformed = false
        displaySearchGraphic = true
    }
    
    func performSearch(courseController: CourseController) {
        Task { @MainActor in
            guard searchText.count >= 2 else {
                searchResultCourses = []
                searchResultLectures = []
                searchResultChannels = []
                return
            }
            self.displaySearchGraphic = false
            self.wasSearchPerformed = false
            
            self.searchResultCourses = []
            self.searchResultLectures = []
            self.searchResultChannels = []
            
            
            
            
            // Create search terms for case-insensitive search
            var searchTerms = searchText.lowercased().split(separator: " ").map(String.init)
            
            if !activeCategories.isEmpty {
                
                // add categories into search terms
                for category in activeCategories {
                    let categoryTerms = category.lowercased().split(separator: " ").map(String.init)
                    for term in categoryTerms {
                        searchTerms.append(term)
                    }
//                    print("we have categories, here's current search terms: ", searchTerms)
                }
            }
            
            let trimmedSearchTerms = searchTerms.map { $0.trimmingCharacters(in: .whitespaces) }
            
            // search courses
            if isCourseFilterSelected {
                self.isCoursesLoading = true
                
                do {
                    var courseQuery = db.collection("courses").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    // Apply course size filters
                    if lessThanFiveLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isLessThan: 5)
                    } else if greaterThanFiveLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isGreaterThan: 5)
                    } else if greaterThanTenLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isGreaterThan: 10)
                    }
                    
                    // Apply sorting
                    if sortByMostWatched {
                        // TODO: switch aggregate views to an int, rn it's a string
                        courseQuery = courseQuery.order(by: "aggregateViews", descending: true)
                    } else if sortByMostLiked {
                        courseQuery = courseQuery.order(by: "numLikesInApp", descending: true)
                    }
                    
                    let courseSnapshot = try await courseQuery.limit(to: 6).getDocuments()
                    
                    if courseSnapshot.documents.isEmpty { noCoursesLeftToLoad = true }
                    
                    self.searchResultCourses = courseSnapshot.documents.compactMap { document -> Course? in
                        let course = try? document.data(as: Course.self)
                        
                        if let course = course, let courseId = course.id, let channelId = course.channelId {
                            courseController.cachedCourses[courseId] = course
                            
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            courseController.retrieveChannel(channelId: channelId)
                        } else {
                            print("course was nil")
                        }
                        return course
                    }
                    
                    // get the last doc for pagination
                    if let lastCourseDocument = courseSnapshot.documents.last {
                        self.lastDocCourse = lastCourseDocument
                    }
                    
                } catch let error {
                    print("error fetching courses: ", error.localizedDescription)
                }
                
                self.isCoursesLoading = false
            }
            
            if isLectureFilterSelected {
                self.isLecturesLoading = true
                
                do {
                    var lectureQuery = db.collection("lectures").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    // for lectures, we'd prefer to show results for the earliest lecture in the course if possible, so let's try to order them by that field
                    lectureQuery = lectureQuery.order(by: "lectureNumberInCourse")
                    
//                    // Apply sorting
                    if sortByMostWatched {
                        // TODO: switch views on Youtube to an int, rn it's a string
                        lectureQuery = lectureQuery.order(by: "viewsOnYouTube", descending: true)
                    } else if sortByMostLiked {
                        lectureQuery = lectureQuery.order(by: "numLikesInApp", descending: true)
                    }
                    
                    
                    
                    
                    let lectureSnapshot = try await lectureQuery.limit(to: 6).getDocuments()
                    
                    if lectureSnapshot.documents.isEmpty { noLecturesLeftToLoad = true }
                    
                    self.searchResultLectures = lectureSnapshot.documents.compactMap { document -> Lecture? in
                        let lecture = try? document.data(as: Lecture.self)
                        
                        if let lecture = lecture, let lectureId = lecture.id, let channelId = lecture.channelId, let courseId = lecture.courseId {
                            courseController.cachedLectures[lectureId] = lecture
                            
//                            courseController.getLectureThumnbnail(lectureId: lectureId)
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            courseController.retrieveChannel(channelId: channelId)
                        } else {
                            print("lecture was nil")
                        }
                        return lecture
                    }
                    
                    // get the last doc for pagination
                    if let lastLectureDocument = lectureSnapshot.documents.last {
                        self.lastDocLecture = lastLectureDocument
                    }
                    
                } catch let error {
                    print("error searching lectures: ", error.localizedDescription)
                }
                
                self.isLecturesLoading = false
            }
            
            if isChannelFilterSelected {
                isChannelsLoading = true
                
                do {
                    let channelQuery = db.collection("channels").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    let channelSnapshot = try await channelQuery.limit(to: 6).getDocuments()
                    
                    if channelSnapshot.documents.isEmpty { noChannelsLeftToLoad = true }
                    
                    self.searchResultChannels = channelSnapshot.documents.compactMap { document -> Channel? in
                        let channel = try? document.data(as: Channel.self)
                        
                        if let channel = channel, let channelId = channel.id {
                            courseController.cachedChannels[channelId] = channel
                            
                            courseController.getChannelThumbnail(channelId: channelId)
                        }
                        
                        return channel
                    }
                    
                    // get the last doc for pagination
                    if let lastChannelDocument = channelSnapshot.documents.last {
                        self.lastDocChannel = lastChannelDocument
                    }
                    
                } catch let error {
                    print("error searching channels: ", error.localizedDescription)
                }
                
                isChannelsLoading = false
            }
            
            self.wasSearchPerformed = true
        }
    }
    
    func getMoreChannels(courseController: CourseController) {
        // return early if last doc isn't populated
        if let lastDocChannel = self.lastDocChannel {
            Task { @MainActor in
                // Create search terms for case-insensitive search
                var searchTerms = searchText.lowercased().split(separator: " ").map(String.init)
                
                if !activeCategories.isEmpty {
                    
                    // add categories into search terms
                    for category in activeCategories {
                        let categoryTerms = category.lowercased().split(separator: " ").map(String.init)
                        for term in categoryTerms {
                            searchTerms.append(term)
                        }
    //                    print("we have categories, here's current search terms: ", searchTerms)
                    }
                }
                
                let trimmedSearchTerms = searchTerms.map { $0.trimmingCharacters(in: .whitespaces) }
                
                do {
                    let channelQuery = db.collection("channels").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    let channelSnapshot = try await channelQuery.limit(to: 6).start(afterDocument: lastDocChannel).getDocuments()
                    
                    if channelSnapshot.documents.isEmpty {
                        noChannelsLeftToLoad = true
                        return
                    }
                    
                    self.searchResultChannels.append(contentsOf: channelSnapshot.documents.compactMap { document -> Channel? in
                        let channel = try? document.data(as: Channel.self)
                        
                        if let channel = channel, let channelId = channel.id {
                            courseController.cachedChannels[channelId] = channel
                            
                            courseController.getChannelThumbnail(channelId: channelId)
                        }
                        
                        return channel
                    })
                    
                    // get the last doc for pagination
                    guard let lastChannelDocument = channelSnapshot.documents.last else {
                        // the collection is empty
                        return
                    }
                    
                    self.lastDocChannel = lastChannelDocument
                    
                } catch let error {
                    print("error searching channels: ", error.localizedDescription)
                }
                
            }
            
        }
    }
    
    func getMoreCourses(courseController: CourseController) {
        // return early if last doc isn't populated
        if let lastDocCourse = self.lastDocCourse {
            Task { @MainActor in
                // build search terms
                var searchTerms = searchText.lowercased().split(separator: " ").map(String.init)
                
                if !activeCategories.isEmpty {
                    
                    // add categories into search terms
                    for category in activeCategories {
                        let categoryTerms = category.lowercased().split(separator: " ").map(String.init)
                        for term in categoryTerms {
                            searchTerms.append(term)
                        }
                    }
                }
                
                let trimmedSearchTerms = searchTerms.map { $0.trimmingCharacters(in: .whitespaces) }
                
                // make the call
                do {
                    var courseQuery = db.collection("courses").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    // Apply course size filters
                    if lessThanFiveLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isLessThan: 5)
                    } else if greaterThanFiveLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isGreaterThan: 5)
                    } else if greaterThanTenLectures {
                        courseQuery = courseQuery.whereField("numLecturesInCourse", isGreaterThan: 10)
                    }
                    
                    // Apply sorting
                    if sortByMostWatched {
                        // TODO: switch aggregate views to an int, rn it's a string
                        courseQuery = courseQuery.order(by: "aggregateViews", descending: true)
                    } else if sortByMostLiked {
                        courseQuery = courseQuery.order(by: "numLikesInApp", descending: true)
                    }
                    
                    let courseSnapshot = try await courseQuery.limit(to: 6).start(afterDocument: lastDocCourse).getDocuments()
                    
                    if courseSnapshot.documents.isEmpty { noCoursesLeftToLoad = true }
                    
                    self.searchResultCourses.append(contentsOf: courseSnapshot.documents.compactMap { document -> Course? in
                        let course = try? document.data(as: Course.self)
                        
                        if let course = course, let courseId = course.id, let channelId = course.channelId {
                            courseController.cachedCourses[courseId] = course
                            
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            courseController.retrieveChannel(channelId: channelId)
                        } else {
                            print("course was nil")
                        }
                        return course
                    })
                    
                    // get the last doc for pagination
                    guard let lastDocument = courseSnapshot.documents.last else {
                        // the collection is empty
                        return
                    }
                    
                    self.lastDocCourse = lastDocument
                    
                } catch let error {
                    print("error")
                }
            }
        }
    }
    
    func getMoreLectures(courseController: CourseController) {
        // return early if last doc isn't populated
        if let lastDocLecture = self.lastDocLecture {
            Task { @MainActor in
                // build search terms
                var searchTerms = searchText.lowercased().split(separator: " ").map(String.init)
                
                if !activeCategories.isEmpty {
                    
                    // add categories into search terms
                    for category in activeCategories {
                        let categoryTerms = category.lowercased().split(separator: " ").map(String.init)
                        for term in categoryTerms {
                            searchTerms.append(term)
                        }
                    }
                }
                
                let trimmedSearchTerms = searchTerms.map { $0.trimmingCharacters(in: .whitespaces) }
                
                do {
                    var lectureQuery = db.collection("lectures").whereField("searchTerms", arrayContainsAny: trimmedSearchTerms)
                    
                    // for lectures, we'd prefer to show results for the earliest lecture in the course if possible, so let's try to order them by that field
                    lectureQuery = lectureQuery.order(by: "lectureNumberInCourse")
                    
//                    // Apply sorting
                    if sortByMostWatched {
                        // TODO: switch views on Youtube to an int, rn it's a string
                        lectureQuery = lectureQuery.order(by: "viewsOnYouTube", descending: true)
                    } else if sortByMostLiked {
                        lectureQuery = lectureQuery.order(by: "numLikesInApp", descending: true)
                    }
                    
                    
                    let lectureSnapshot = try await lectureQuery.limit(to: 6).start(afterDocument: lastDocLecture).getDocuments()
                    
                    if lectureSnapshot.documents.isEmpty { noLecturesLeftToLoad = true }
                    
                    
                    self.searchResultLectures.append(contentsOf: lectureSnapshot.documents.compactMap { document -> Lecture? in
                        let lecture = try? document.data(as: Lecture.self)
                        
                        if let lecture = lecture, let lectureId = lecture.id, let channelId = lecture.channelId, let courseId = lecture.courseId {
                            courseController.cachedLectures[lectureId] = lecture
                            
//                            courseController.getLectureThumnbnail(lectureId: lectureId)
                            courseController.getCourseThumbnail(courseId: courseId)
                            
                            courseController.retrieveChannel(channelId: channelId)
                        } else {
                            print("lecture was nil")
                        }
                        return lecture
                    })
                    
                    // get the last doc for pagination
                    guard let lastLectureDocument = lectureSnapshot.documents.last else {
                        // the collection is empty
                        return
                    }
                    
                    self.lastDocLecture = lastLectureDocument
                    
                } catch  {
                    print("error")
                }
            }
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'SubscriptionController.swift',
                        path: 'Lectures/Controllers/SubscriptionController.swift',
                        type: 'file',
                        content: `//
//  SubscriptionController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/31/25.
//


import Combine
import FirebaseAuth
import FirebaseFirestore
import Foundation
import RevenueCat
import SwiftUI

class SubscriptionController: NSObject, ObservableObject {
    @Published var packages: [Package] = []
    @Published var customerInfo: CustomerInfo?
    @Published var isLoading: Bool = false
    @Published var error: String?
    @Published var isPro: Bool = false
    
//    @EnvironmentObject var userController: UserController
    
    // Singleton instance
    static let shared = SubscriptionController()
    
    // Firestore
    let db = Firestore.firestore()
    
    private override init() {
        super.init() // Required when inheriting from NSObject
        // Fetch initial data
        Task {
            await fetchPackages()
            await updateCustomerInfo()
        }
    }
    
    @MainActor
    func fetchPackages() async {
        isLoading = true
        error = nil
        
        do {
            // Fetch offering
            let offering = try await Purchases.shared.offerings().current
            
            if let availablePackages = offering?.availablePackages {
                self.packages = availablePackages
            } else {
                error = "No packages available"
            }
        } catch {
            self.error = error.localizedDescription
        }
        
        isLoading = false
    }
    
    @MainActor
    func updateCustomerInfo() async {
        do {
            let customerInfo = try await Purchases.shared.customerInfo()
            self.customerInfo = customerInfo
            
            // Check if user has pro access
            isPro = customerInfo.entitlements["Lectura Pro"]?.isActive == true
        } catch {
            self.error = error.localizedDescription
        }
    }
    
    @MainActor
    func purchase(package: Package) async -> Bool {
        isLoading = true
        error = nil
        
        do {
            let result = try await Purchases.shared.purchase(package: package)
            customerInfo = result.customerInfo
            isPro = result.customerInfo.entitlements["Lectura Pro"]?.isActive == true
            isLoading = false
            
            // if purchase is successfull, change the account type on the user if the user is currently registered, if not don't do it
            if let user = Auth.auth().currentUser {
                changeUserMembershipTypeInFirestore(freeToPro: isPro)
            }
            
            return true
        } catch {
            self.error = error.localizedDescription
            isLoading = false
            return false
        }
    }
    
    func restorePurchases() async {
        isLoading = true
        error = nil
        
        do {
            let customerInfo = try await Purchases.shared.restorePurchases()
            await MainActor.run {
                self.customerInfo = customerInfo
                self.isPro = customerInfo.entitlements["Lectura Pro"]?.isActive == true
                
                // if purchase is successfull, change the account type on the user
                if let user = Auth.auth().currentUser {
                    changeUserMembershipTypeInFirestore(freeToPro: isPro)
                }
            }
        } catch {
            await MainActor.run {
                self.error = error.localizedDescription
            }
        }
        
        await MainActor.run {
            self.isLoading = false
        }
    }

    func loginRevenueCat(userId: String) {
        Task {
            Purchases.shared.logIn(userId) { (customerInfo, created, error) in
                if let customerInfo = customerInfo {
                    // customerInfo updated for my_app_user_id
                    self.customerInfo = customerInfo

                    // Check if user has pro access
                    self.isPro = customerInfo.entitlements["Lectura Pro"]?.isActive == true
                }
            }
        }
    }
    
    func logOutRevenueCat() {
        Purchases.shared.logOut { customerInfo ,_ in
            if let customerInfo = customerInfo {
                self.customerInfo = customerInfo
            }
        }
        
        self.isPro = false
    }
    
    func changeUserMembershipTypeInFirestore(freeToPro: Bool) {
        // get the firebase auth user id
        if let currentUser = Auth.auth().currentUser {
            // write to firestore
            
            Task { @MainActor in
                let userRef = db.collection("users").document(currentUser.uid)
                
                userRef.updateData([
                    "accountType": freeToPro ? 1 : 0
                ])
                print("Document successfully updated")
            }
        }
    }
}

// MARK: - PurchasesDelegate
extension SubscriptionController: PurchasesDelegate {
    
    func purchases(_ purchases: Purchases, receivedUpdated customerInfo: CustomerInfo) {
        Task { @MainActor in
            self.customerInfo = customerInfo
            self.isPro = customerInfo.entitlements["Lectura Pro"]?.isActive == true
            
            if let user = Auth.auth().currentUser {
                changeUserMembershipTypeInFirestore(freeToPro: isPro)
            }
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'TabBarController.swift',
                        path: 'Lectures/Controllers/TabBarController.swift',
                        type: 'file',
                        content: `//
//  TabBarController.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/18/24.
//

import Foundation

class TabBarController : ObservableObject {
    
    @Published var isTabbarShowing: Bool = true
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'UserController.swift',
                        path: 'Lectures/Controllers/UserController.swift',
                        type: 'file',
                        content: `//
//  UserController.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/1/25.
//

import Firebase
import FirebaseAuth
import FirebaseFirestore
import Foundation

class UserController : ObservableObject {
    // User object - used to reference user throughout the app (signed in only)
    @Published var user: User?
    
    // Firestore
    let db = Firestore.firestore()
    
    init() {
        // Retrieve the user on init if auth'd
        if let userId = Auth.auth().currentUser?.uid {
            self.retrieveUserFromFirestore(userId: userId)
        } else {
            print("auth wasn't setup yet.")
        }
    }
    
    func retrieveUserFromFirestore(userId: String) {
        Task { @MainActor in
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
    }
    
    func logOut() {
        self.user = nil
        print("log out - local user")
    }
    
    func deleteUser() {
        // Delete the current user in firestore (not auth)
        Task { @MainActor in
            if let user = self.user, let id = user.id {
                do {
                    try await db.collection("users").document(id).delete()
                    
                    self.logOut()
                } catch {
                    print("Error removing document: \\(error)")
                }
            } else {
                print("no user and we can't delete it")
            }
        }
    }
    
    func changeMebershipType(userId: String, freeToPro: Bool) {
        // if freetoPro is true, change membership type from 0 to 1, else from 1 to 0
        
        Task { @MainActor in
            let userRef = db.collection("users").document(userId)
            
            userRef.updateData([
                "accountType": freeToPro ? 1 : 0
            ])
            print("Document successfully updated")
            
        }
    }
    
    func followChannel(userId: String, channelId: String) {
        Task { @MainActor in
            
            var follow: Bool = false
            
            // figure out if following or unfollowing
            if let user = self.user, let followedChannelIds = user.followedChannelIds {
                if followedChannelIds.contains(channelId) {
                    follow = false
                    if let _ = self.user {
                        self.user?.followedChannelIds?.removeAll(where: {$0 == channelId})
                    }
                } else {
                    follow = true
                    // also update local user var
                    if let _ = self.user {
                        self.user?.followedChannelIds?.append(channelId)
                    }
                }
            }
            
            let userRef = db.collection("users").document(userId)
            
            if follow {
                userRef.updateData([
                    "followedChannelIds": FieldValue.arrayUnion([channelId])
                ])
                
            } else {
                userRef.updateData([
                    "followedChannelIds": FieldValue.arrayRemove([channelId])
                ])
            }
        }
    }
    
    func likeCourse(userId: String, courseId: String) {
        Task { @MainActor in
            // determine if we are liking or unliking this course
            var isLiking: Bool = false
            
            if let user = self.user, let likedCourseIds = user.likedCourseIds {
                if likedCourseIds.contains(courseId) {
                    isLiking = false
                    if let _ = self.user {
                        self.user?.likedCourseIds?.removeAll(where: {$0 == courseId})
                    }
                } else {
                    isLiking = true
                    // also update local user var
                    if let _ = self.user {
                        self.user?.likedCourseIds?.append(courseId)
                    }
                }
            }
            
            let userRef = db.collection("users").document(userId)
            
            if isLiking {
                userRef.updateData([
                    "likedCourseIds": FieldValue.arrayUnion([courseId])
                ])
                
            } else {
                userRef.updateData([
                    "likedCourseIds": FieldValue.arrayRemove([courseId])
                ])
            }
            
        }
    }
    
    func likeLecture(userId: String, lectureId: String) {
        Task { @MainActor in
            // determine if we are liking or unliking this course
            var isLiking: Bool = false
            
            if let user = self.user, let likedLectureIds = user.likedLectureIds {
                if likedLectureIds.contains(lectureId) {
                    isLiking = false
                    if let _ = self.user {
                        self.user?.likedLectureIds?.removeAll(where: {$0 == lectureId})
                    }
                } else {
                    isLiking = true
                    // also update local user var
                    if let _ = self.user {
                        self.user?.likedLectureIds?.append(lectureId)
                    }
                }
            }
            
            let userRef = db.collection("users").document(userId)
            
            if isLiking {
                userRef.updateData([
                    "likedLectureIds": FieldValue.arrayUnion([lectureId])
                ])
                
            } else {
                userRef.updateData([
                    "likedLectureIds": FieldValue.arrayRemove([lectureId])
                ])
            }
        }
    }
    
    func changeName(firstName: String, lastName: String) {
        Task { @MainActor in
            // change the name in firestore
            if let user = self.user, let id = user.id {
                let userRef = db.collection("users").document(id)

                // Set the "capital" field of the city 'DC'
                do {
                  try await userRef.updateData([
                    "firstName": firstName,
                    "lastName": lastName,
                  ])
                    
                    // update it locally
                    self.user?.firstName = firstName
                    self.user?.lastName = lastName
                  
                } catch {
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
                name: 'GoogleService-Info.plist',
                path: 'Lectures/GoogleService-Info.plist',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CLIENT_ID</key>
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
	<key>REVERSED_CLIENT_ID</key>
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
	<key>API_KEY</key>
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
	<key>GCM_SENDER_ID</key>
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>com.bendreyer.Lectura</string>
	<key>PROJECT_ID</key>
	<string>lectura-6548f</string>
	<key>STORAGE_BUCKET</key>
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
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
	<string>NICE-TRY-BUT-SMART-OF-YOU-TO-LOOK-HERE</string>
</dict>
</plist>`,
                language: 'plaintext'
            },
            {
                name: 'Info.plist',
                path: 'Lectures/Info.plist',
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
	<key>NSServices</key>
	<array>
		<dict/>
	</array>
</dict>
</plist>
`,
                language: 'plaintext'
            },
            {
                name: 'Lectures.entitlements',
                path: 'Lectures/Lectures.entitlements',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.applesignin</key>
	<array>
		<string>Default</string>
	</array>
	<key>com.apple.security.app-sandbox</key>
	<true/>
	<key>com.apple.security.files.user-selected.read-only</key>
	<true/>
</dict>
</plist>
`,
                language: 'plaintext'
            },
            {
                name: 'LecturesApp.swift',
                path: 'Lectures/LecturesApp.swift',
                type: 'file',
                content: `//
//  LecturesApp.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/15/24.
//

import FirebaseAuth
import FirebaseCore
import GoogleSignIn
import RevenueCat
import RevenueCatUI
import SwiftUI

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        FirebaseApp.configure()
        
        // TODO: change to info for prod build
        Purchases.logLevel = .info

        // If we have the auth'd user at app launch, configure RevenueCat using the auth'd user. 
        // Otherwise, continue anonymously, and use revenue cat login function when signing a user in via auth.
        if let user = Auth.auth().currentUser {
            Purchases.configure(withAPIKey: Secrets().revenueCatProjectKey, appUserID: user.uid)
            print("on app launch and we are setting up revenue cat with firebase auth id")
        } else {
            Purchases.configure(withAPIKey: Secrets().revenueCatProjectKey)
            print("we don't have the auth user, using anonymous id for revenue cat. Call the login function later")
        }
        return true
    }
    
    @available(iOS 9.0, *)
    func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return GIDSignIn.sharedInstance.handle(url)
    }
}

@main
struct LecturesApp: App {
    
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate
    
    
    // App Storage: isDarkMode variable tracks dark theme throughout the app
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    // App Storage: isSignedIn tracks auth status throughout app
    @AppStorage("isSignedIn") private var isSignedIn = false
    
//    @AppStorage("numActionsInLastMinute") private var numActionsInLastMinute = 0
//    @AppStorage("firstActionDate") private var firstActionDate = Date()
    
    // App Storage: isSignedIn tracks auth status throughout app
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false

    // App Storage: Rate limiting variables
    @AppStorage("numActionsInLastMinute") private var numActionsInLastMinute: Int = 0
    @AppStorage("firstActionDate") private var firstActionDateTimeInterval: Double?
    @AppStorage("numberBreach") private var numberBreach: Int = 0
    @AppStorage("lastBreachTimeInterval") private var lastBreachTimeInterval: Double?
    
    var body: some Scene {
        WindowGroup {
            ContentView()
//                .presentPaywallIfNeeded(
//                    requiredEntitlementIdentifier: "pro",
//                    purchaseCompleted: { customerInfo in
//                        print("Purchase completed: \\(customerInfo.entitlements)")
//                    },
//                    restoreCompleted: { customerInfo in
//                        // Paywall will be dismissed automatically if "pro" is now active.
//                        print("Purchases restored: \\(customerInfo.entitlements)")
//                    }
//                )
                .preferredColorScheme(isDarkMode ? .dark : .light)
        }
    }
}
`,
                language: 'plaintext'
            },
            {
                name: 'Models',
                path: 'Lectures/Models',
                type: 'directory',
                children: [
                    {
                        name: 'Channel.swift',
                        path: 'Lectures/Models/Channel.swift',
                        type: 'file',
                        content: `//
//  Channel.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/4/25.
//

import FirebaseFirestore
import Foundation

struct Channel : Codable, Identifiable {
    // identifier
    @DocumentID var id: String?
    
    // title
    var title: String?
    
    // channel description
    var channelDescription: String?
    
    // courses
    var courseIds: [String]?
    
    // stats
    var numCourses: Int?
    var numLectures: Int?
    
    // youtube link
    var channelYouTubeLink: String?
    
    var searchTerms: [String]?
    
    var thumbnailUrl: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case channelDescription
        case courseIds
        case numCourses
        case numLectures
        case channelYouTubeLink
        case searchTerms
        case thumbnailUrl
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Collection.swift',
                        path: 'Lectures/Models/Collection.swift',
                        type: 'file',
                        content: `//
//  Collection.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/12/25.
//

import Foundation


struct Collection {
    var id: String?
    var image: String?
    var title: String?
    var subText: String?
    var description: String?
    var courseIdList: [String]?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Course.swift',
                        path: 'Lectures/Models/Course.swift',
                        type: 'file',
                        content: `//
//  Course.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/1/25.
//

import FirebaseFirestore
import Foundation

struct Course : Codable, Identifiable, Hashable {
    // Identifiers
    @DocumentID var id: String?
    
    // Channel Link
    var channelId: String?
    
    // Course Metadata
    var courseTitle: String?
    var courseDescription: String?
    var professorName: String?
    var numLecturesInCourse: Int?
    var watchTimeInHrs: Int?
    var aggregateViews: Int?
    var categories: [String]?
    var numLikesInApp: Int?
    
    // Resource Information
    var examResourceId: String?
    var examAnswersResourceId: String?
    
    // Lectures inside of the course, using their ID
    var lectureIds: [String]?
    
    // Terms used to search for this course (title, channel, categories, etc..)
    var searchTerms: [String]?
    
    // link to thumbnail on the web (not in storage, we'll download it from this link)
    var thumbnailUrl: String?
    
    var numViews: Int?
    
    
    enum CodingKeys: String, CodingKey {
        case id
        case channelId
        case courseTitle
        case courseDescription
        case professorName
        case numLecturesInCourse
        case watchTimeInHrs
        case aggregateViews
        case categories
        case numLikesInApp
//        case hasExam
//        case hasExamAnswers
        case examResourceId
        case examAnswersResourceId
        case lectureIds
        case searchTerms
        case thumbnailUrl
        case numViews
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Lecture.swift',
                        path: 'Lectures/Models/Lecture.swift',
                        type: 'file',
                        content: `//
//  Lecture.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/1/25.
//

import FirebaseFirestore
import Foundation

struct Lecture : Codable, Identifiable, Hashable {
    // identifier
    @DocumentID var id: String?
    
    // the parent course this lecture belongs to
    var courseId: String?
    // parent channel
    var channelId: String?
    
    // course metadata
    var lectureTitle: String?
    var courseTitle: String?
    var professorName: String?
    var channelName: String?
    var lectureDescription: String?
    var lectureNumberInCourse: Int?
    var viewsOnYouTube: Int?
    var datePostedonYoutube: String?
    var numLikesInApp: Int?
    
    // Resources
    var notesResourceId: String?
    var homeworkResourceId: String?
    var homeworkAnswersResourceId: String?
    
    
    var lectureDuration: String?
    
    var youtubeVideoUrl: String?
    
    var searchTerms: [String]?
    
    var thumbnailUrl: String?
    
    var numViews: Int?
    
    enum CodingKeys: String, CodingKey {
        case id
        case courseId
        case channelId
        case lectureTitle
        case courseTitle
        case professorName
        case channelName
        case lectureDescription
        case lectureNumberInCourse
        case viewsOnYouTube
        case datePostedonYoutube
        case numLikesInApp
        case notesResourceId
        case homeworkResourceId
        case homeworkAnswersResourceId
        case lectureDuration
        case youtubeVideoUrl
        case searchTerms
        case thumbnailUrl
        case numViews
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Reel.swift',
                        path: 'Lectures/Models/Reel.swift',
                        type: 'file',
                        content: `//
//  Reel.swift
//  Lectures
//
//  Created by Ben Dreyer on 3/9/25.
//

import FirebaseFirestore
import Foundation

struct Reel: Codable, Identifiable {
    @DocumentID var id: String?
    // Linked attributes
    var lectureId: String?
    var lectureName: String?
    var courseId: String?
    var courseName: String?
    var channelId: String?
    var channelName: String?
    var youtubeUrl: String?
    
    // Added fields for reels functionality
    var videoURL: String
    var likes: Int
    var comments: Int
    var shares: Int
    
    // Random number so we can fetch random videos in the feed.
    var randomNumber: Int?
    
    // For local testing with sample videos
    static let samples = [
        Reel(videoURL: "sample1", likes: 1200, comments: 45, shares: 67),
        Reel(videoURL: "sample2", likes: 890, comments: 32, shares: 41),
        Reel(videoURL: "sample3", likes: 750, comments: 28, shares: 35)
    ]
    
    // Custom Codable implementation to handle potential missing fields
    enum CodingKeys: String, CodingKey {
        case id, lectureId, lectureName, courseId, courseName, channelId, channelName, youtubeUrl, randomNumber
        case videoURL, likes, comments, shares
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        // Required fields
        videoURL = try container.decodeIfPresent(String.self, forKey: .videoURL) ?? ""
        
        // Optional fields with defaults
        likes = try container.decodeIfPresent(Int.self, forKey: .likes) ?? 0
        comments = try container.decodeIfPresent(Int.self, forKey: .comments) ?? 0
        shares = try container.decodeIfPresent(Int.self, forKey: .shares) ?? 0
        
        // Other optional fields
        id = try container.decodeIfPresent(String.self, forKey: .id)
        lectureId = try container.decodeIfPresent(String.self, forKey: .lectureId)
        lectureName = try container.decodeIfPresent(String.self, forKey: .lectureName)
        courseId = try container.decodeIfPresent(String.self, forKey: .courseId)
        courseName = try container.decodeIfPresent(String.self, forKey: .courseName)
        channelId = try container.decodeIfPresent(String.self, forKey: .channelId)
        channelName = try container.decodeIfPresent(String.self, forKey: .channelName)
        youtubeUrl = try container.decodeIfPresent(String.self, forKey: .youtubeUrl)
        randomNumber = try container.decodeIfPresent(Int.self, forKey: .randomNumber)
    }
    
    // Constructor for sample data
    init(videoURL: String, likes: Int, comments: Int, shares: Int) {
        self.videoURL = videoURL
        self.likes = likes
        self.comments = comments
        self.shares = shares
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Resource.swift',
                        path: 'Lectures/Models/Resource.swift',
                        type: 'file',
                        content: `//
//  Resource.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/3/25.
//

import FirebaseFirestore
import Foundation

struct Resource : Codable {
    // A resource can be any of the following - Notes, Homework (or Answers), Exam (or Answers)
    
    // identifier
    @DocumentID var id: String?
    
    var courseId: String?
    var lectureId: String?
    
    
    // 0: Notes
    // 1: Homework
    // 2: Homework Answers
    // 3: Exam
    // 4: Exam Answers
    var resourceType: Int?
    
    var title: String?
    
    var content: String?
    
    var createdAt: Timestamp?
    var updatedAt: Timestamp?
    
    enum CodingKeys: String, CodingKey {
        case id
        case courseId
        case lectureId
        case resourceType
        case title
        case content
        case createdAt
        case updatedAt
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'User.swift',
                        path: 'Lectures/Models/User.swift',
                        type: 'file',
                        content: `//
//  User.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/30/24.
//

import FirebaseFirestore
import Foundation

struct User : Codable {
    @DocumentID var id: String?
    var firstName: String?
    var lastName: String?
    var email: String?
    
    // 0 = Free, 1 = Pro
    var accountType: Int?
    
    var likedCourseIds: [String]?
    var likedLectureIds: [String]?
    var followedChannelIds: [String]?
    
    var isAdmin: Bool?
    
    enum CodingKeys: String, CodingKey {
        case id
        case firstName
        case lastName
        case email
        case accountType
        case likedCourseIds
        case likedLectureIds
        case followedChannelIds
        case isAdmin
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'WatchHistory.swift',
                        path: 'Lectures/Models/WatchHistory.swift',
                        type: 'file',
                        content: `//
//  WatchHistory.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/15/25.
//

import FirebaseFirestore
import Foundation


struct WatchHistory : Codable, Equatable {
    @DocumentID var id: String?
    var userId: String?
    var courseId: String?
    var lectureId: String?
    var channelId: String?
    
    // lecture progress - used fpr progress bar
    var lectureNumberInCourse: Int?
    var numLecturesInCourse: Int?
    
    // timestamp course was watched last
    var courseLastWatched: Timestamp?
    
    var isCourseCompleted: Bool?
    
    enum CodingKeys: String, CodingKey {
        case id
        case userId
        case courseId
        case lectureId
        case channelId
        case lectureNumberInCourse
        case numLecturesInCourse
        case courseLastWatched
        case isCourseCompleted
    }
    
    // Add this initializer
    init(userId: String?,
         courseId: String?,
         lectureId: String?,
         channelId: String?,
         lectureNumberInCourse: Int?,
         numLecturesInCourse: Int?,
         courseLastWatched: Timestamp?,
         isCourseCompleted: Bool?,
         id: String? = nil) {  // id is optional with default value
        
        self.userId = userId
        self.courseId = courseId
        self.lectureId = lectureId
        self.channelId = channelId
        self.lectureNumberInCourse = lectureNumberInCourse
        self.numLecturesInCourse = numLecturesInCourse
        self.courseLastWatched = courseLastWatched
        self.isCourseCompleted = isCourseCompleted
        self.id = id
    }
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Preview Content',
                path: 'Lectures/Preview Content',
                type: 'directory',
                children: [
                    {
                        name: 'Preview Assets.xcassets',
                        path: 'Lectures/Preview Content/Preview Assets.xcassets',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Lectures/Preview Content/Preview Assets.xcassets/Contents.json',
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
                path: 'Lectures/Views',
                type: 'directory',
                children: [
                    {
                        name: 'BottomBrandView.swift',
                        path: 'Lectures/Views/BottomBrandView.swift',
                        type: 'file',
                        content: `//
//  BottomBrandView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct BottomBrandView: View {
    var body: some View {
        // Logo
        VStack {
            Text("Lectura")
                .font(.system(size: 15, design: .serif))
                .frame(maxWidth: .infinity, alignment: .bottom)
                .opacity(0.6)
            Text("version 1.2")
                .font(.system(size: 11, design: .serif))
                .frame(maxWidth: .infinity, alignment: .bottom)
                .opacity(0.6)
        }
        .padding(.top, 60)
    }
}

#Preview {
    BottomBrandView()
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'CourseViewer',
                        path: 'Lectures/Views/CourseViewer',
                        type: 'directory',
                        children: [
                            {
                                name: 'Modules',
                                path: 'Lectures/Views/CourseViewer/Modules',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ChannelInfo.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/ChannelInfo.swift',
                                        type: 'file',
                                        content: `//
//  ChannelInfo.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI

struct ChannelInfo: View {
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    @EnvironmentObject var userController: UserController
    
    @State private var isChannelFollowed = false
    
    @State private var isUpgradeAccountSheetShowing: Bool = false
    @State private var isProAccountButNotRegisteredSheetShowing: Bool = false
    
    var channelId: String
    var body: some View {
        HStack {
            // channel image - nav link to channel view
            
            if let channel = courseController.cachedChannels[channelId] {
                NavigationLink(destination: ChannelView(channel: channel)) {
                    if let channelImage = courseController.channelThumbnails[channelId] {
                        Image(uiImage: channelImage)
                            .resizable()
                            .frame(width: 40, height: 40)
                        
                        if let channelTitle = channel.title, let numCourses = channel.numCourses, let numLectures = channel.numLectures {
                            VStack {
                                Text(channelTitle)
                                    .font(.system(size: 14, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                
                                HStack {
                                    Text("\\(numCourses) Courses")
                                        .font(.system(size: 12))
                                        .opacity(0.6)
                                    
                                    Text("\\(numLectures) Lectures")
                                        .font(.system(size: 12))
                                        .opacity(0.6)
                                    
                                    Spacer()
                                }
                            }
                        }
                    } else {
                        HStack {
                            SkeletonLoader(width: 300, height: 40)
                            Spacer()
                        }
                    }
                }
                .simultaneousGesture(TapGesture().onEnded {
                    //                        self.shouldPopCourseFromStackOnDissapear = false
                    
                    // try to get the channel using course.channelId
                    if let channel = courseController.cachedChannels[channelId] {
                        courseController.focusChannel(channel)
                    }
                })
                .buttonStyle(PlainButtonStyle())
            }
            
            // Channel Follow Button
            Button(action: {
                // User can follow accounts if they are signed in, otherwise show sign in sheet
                if let user = userController.user, let userId = user.id {
                    if let rateLimit = rateLimiter.processWrite() {
                        print(rateLimit)
                        return
                    }
                    
                    userController.followChannel(userId: userId, channelId: channelId)
                    withAnimation(.spring()) {
                        isChannelFollowed.toggle()
                    }
                } else {
                    isProAccountButNotRegisteredSheetShowing = true
                }
            }) {
                HStack(spacing: 8) {
                    Image(systemName: isChannelFollowed ? "heart.fill" : "heart")
                        .font(.system(size: 14))
                    
                    Text(isChannelFollowed ? "Following" : "Follow")
                        .font(.system(size: 14, weight: .semibold))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .foregroundColor(isChannelFollowed ? .white : .primary)
                .background(
                    Capsule()
                        .fill(isChannelFollowed ? Color.red : Color.clear)
                        .overlay(
                            Capsule()
                                .strokeBorder(isChannelFollowed ? Color.red : Color.gray, lineWidth: 1)
                        )
                )
            }
            // Determine if the user has already followed this channel or not, if they have, change the button view
            .onAppear {
                if let user = userController.user, let followedChannelIds = user.followedChannelIds {
                    if followedChannelIds.contains(channelId) {
                        self.isChannelFollowed = true
                    }
                }
            }
            .sheet(isPresented: $isUpgradeAccountSheetShowing) {
                UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
            }
            .sheet(isPresented: $isProAccountButNotRegisteredSheetShowing) {
                ProAccountButNotSignedInSheet(displaySheet: $isProAccountButNotRegisteredSheetShowing)
            }
            
        }
        .cornerRadius(5)
    }
}

//#Preview {
//    ChannelInfo()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CourseCardView.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/CourseCardView.swift',
                                        type: 'file',
                                        content: `//
//  NewLectureView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/29/24.
//

import SwiftUI

struct CourseCardView: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    
    var course: Course
    var body: some View {
        if let courseId = course.id, let courseTitle = course.courseTitle, let channelId = course.channelId, let numLecturesInCourse = course.numLecturesInCourse, let watchTimeInHrs = course.watchTimeInHrs {
            ZStack(alignment: .bottomLeading) {
                if let image = courseController.courseThumbnails[courseId] {
                    Image(uiImage: image)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: cardWidth, height: cardHeight)
                        .clipped()
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                } else {
                    SkeletonLoader(width: cardWidth, height: cardHeight)
                }
                
                // Add semi-transparent gradient overlay
                LinearGradient(
                    gradient: Gradient(colors: [.clear, .black.opacity(0.85)]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .frame(maxWidth: .infinity, maxHeight: .infinity) // Make gradient fill entire space
                .clipShape(RoundedRectangle(cornerRadius: 10))
                
                
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text(courseTitle)
                                .font(.system(size: titleFontSize, design: .serif))
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            
                            HStack {
                                // TODO: Add back university name
                                if let channel = courseController.cachedChannels[channelId], let channelTitle = channel.title {
                                    Text(channelTitle)
                                        .lineLimit(1) // Limit to a single line
                                        .truncationMode(.tail) // Use ellipsis for truncation
                                        .font(.system(size: subtitleFontSize, design: .serif))
                                        .foregroundColor(.white.opacity(0.8))
                                }
                                
                                Text("\\(numLecturesInCourse) Lectures")
                                    .font(.system(size: subtitleFontSize, design: .serif))
                                    .foregroundColor(.white.opacity(0.8))
                                Text("\\(watchTimeInHrs)hrs")
                                    .font(.system(size: subtitleFontSize, design: .serif))
                                    .foregroundColor(.white.opacity(0.8))
                            }
                        }
                        Spacer()
                    }
                    .padding()
                }
                .padding(.bottom, 1)
                
            }
            .frame(width: cardWidth, height: cardHeight)
        }
    }
    
    // Computed properties for responsive sizing
    private var cardWidth: CGFloat {
        horizontalSizeClass == .regular ? 320 : 240 // Wider on iPad
    }
    
    private var cardHeight: CGFloat {
        horizontalSizeClass == .regular ? 180 : 130 // Taller on iPad
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 18 : 14
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 14 : 11
    }
}

#Preview {
    CourseCardView(course: Course())
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CroppedImageView.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/CroppedImageView.swift',
                                        type: 'file',
                                        content: `//
//  CroppedImageView.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/12/25.
//

import SwiftUI

struct CroppedImageView: View {
    let image: UIImage
    @State private var contentInsets: EdgeInsets = .init(top: 0, leading: 0, bottom: 0, trailing: 0)
    
    var body: some View {
        GeometryReader { geometry in
            Image(uiImage: image)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(height: geometry.size.height - contentInsets.top - contentInsets.bottom)
                .offset(y: -contentInsets.top)
                .onAppear {
                    calculateBlackBars()
                }
        }
    }
    
    private func calculateBlackBars() {
        guard let cgImage = image.cgImage else { return }
        let width = cgImage.width
        let height = cgImage.height
        
        // Find top edge (first non-black row)
        var topInset: Int = 0
        for y in 0..<height {
            if !isRowBlack(at: y, in: cgImage) {
                topInset = y
                break
            }
        }
        
        // Find bottom edge (last non-black row)
        var bottomInset: Int = 0
        for y in (0..<height).reversed() {
            if !isRowBlack(at: y, in: cgImage) {
                bottomInset = height - y - 1
                break
            }
        }
        
        // Convert pixel measurements to percentages
        let topPercentage = CGFloat(topInset) / CGFloat(height)
        let bottomPercentage = CGFloat(bottomInset) / CGFloat(height)
        
        // Calculate the actual insets based on the image's displayed height
        if let size = image.size.height as CGFloat? {
            contentInsets = EdgeInsets(
                top: size * topPercentage,
                leading: 0,
                bottom: size * bottomPercentage,
                trailing: 0
            )
        }
    }
    
    private func isRowBlack(at y: Int, in image: CGImage) -> Bool {
        let threshold: Double = 20 // Adjust this value based on how dark your black bars are
        
        // Sample pixels across the row
        let width = image.width
        let sampleCount = 10
        let step = width / sampleCount
        
        var totalBrightness: Double = 0
        
        for x in stride(from: 0, to: width, by: step) {
            if let pixel = getPixel(x: Int(x), y: y, from: image) {
                let brightness = (Double(pixel.red) + Double(pixel.green) + Double(pixel.blue)) / (3.0 * 255.0)
                totalBrightness += brightness
            }
        }
        
        let averageBrightness = totalBrightness / Double(sampleCount)
        return averageBrightness < (threshold / 255.0)
    }
    
    private func getPixel(x: Int, y: Int, from image: CGImage) -> (red: UInt8, green: UInt8, blue: UInt8)? {
        guard let data = CFDataGetBytePtr(image.dataProvider?.data) else { return nil }
        let pixelInfo = ((image.width * y) + x) * 4
        
        return (
            data[pixelInfo],     // Red
            data[pixelInfo + 1], // Green
            data[pixelInfo + 2]  // Blue
        )
    }
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FetchButton.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/FetchButton.swift',
                                        type: 'file',
                                        content: `//
//  FetchButton.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/14/25.
//

import SwiftUI

struct FetchButton: View {
    let isMore: Bool  // determines if button shows "Fetch More" or "Fetch Previous"
    let action: () -> Void  // closure for button action
    
    var body: some View {
        Button(action: action) {
            Text(isMore ? "Fetch More" : "Fetch Previous")
                .font(.caption)
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.blue.opacity(0.8))
                .cornerRadius(6)
        }
    }
}

// #Preview {
//     HStack {
//         FetchButton(isMore: true, action: {})
//         FetchButton(isMore: false, action: {})
//     }
// }
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LikeCourseButton.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/LikeCourseButton.swift',
                                        type: 'file',
                                        content: `//
//  LikeCourseButton.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI

struct LikeCourseButton: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var rateLimiter: RateLimiter
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    var courseId: String
    
    @State private var isCourseLiked: Bool = false
    @State private var isUpgradeAccountSheetShowing: Bool = false
    @State private var isProAccountButNotRegisteredSheetShowing: Bool = false
    
    var body: some View {
        Button(action: {
            // User can liked course if they are signed in, otherwise show sign in sheet
            if let user = userController.user, let userId = user.id {
                if let rateLimit = rateLimiter.processWrite() {
                    print(rateLimit)
                    return
                }
                
                userController.likeCourse(userId: userId, courseId: courseId)
                withAnimation(.spring()) {
                    self.isCourseLiked.toggle()
                }
            } else {
                isProAccountButNotRegisteredSheetShowing = true
            }
        }) {
            Image(systemName: isCourseLiked ? "heart.fill" : "heart")
                .font(.system(size: 18, design: .serif))
                .foregroundStyle(isCourseLiked ? Color.red : colorScheme == .light ? Color.black : Color.white)
        }
        .sheet(isPresented: $isUpgradeAccountSheetShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
        }
        .sheet(isPresented: $isProAccountButNotRegisteredSheetShowing) {
            ProAccountButNotSignedInSheet(displaySheet: $isProAccountButNotRegisteredSheetShowing)
        }
        .onAppear {
            // Determine if the user has already liked this course or not, if they have, set the button to liked
            if let user = userController.user, let likedCourseIds = user.likedCourseIds {
                if likedCourseIds.contains(courseId) {
                    self.isCourseLiked = true
                }
            }
        }
    }
}

//#Preview {
//    LikeCourseButton()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'RelatedCourse.swift',
                                        path: 'Lectures/Views/CourseViewer/Modules/RelatedCourse.swift',
                                        type: 'file',
                                        content: `//
//  RelatedCourse.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/7/25.
//

import SwiftUI

struct RelatedCourse: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    @EnvironmentObject var examController: ExamController
    @EnvironmentObject var examAnswerController: ExamAnswerController
    
    var course: Course
    var body: some View {
        if let courseId = course.id, let channelId = course.channelId, let numLecturesInCourse = course.numLecturesInCourse, let watchTimeInHrs = course.watchTimeInHrs, let aggregateViews = course.aggregateViews  {
            NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                HStack {
                    // Image
                    if let image = courseController.courseThumbnails[courseId] {
                        Image(uiImage: image)
                            .resizable()
                            .aspectRatio(contentMode: .fill) // Fill the frame while maintaining aspect ratio
                            .frame(width: 60, height: 40)
                            .clipped() // Clip the image to the frame
                    } else {
                        SkeletonLoader(width: 60, height: 40)
                    }
                    
                    VStack {
                        // course name
                        HStack {
                            Text(course.courseTitle ?? "")
                                .font(.system(size: 16, design: .serif))
                                .lineLimit(1)
                                .truncationMode(.tail)
                            Spacer()
                        }
                        
                        HStack {
                            // channel name
                            if let channel = courseController.cachedChannels[channelId] {
                                Text(channel.title ?? "")
                                    .font(.system(size: 12, design: .serif))
                                    .lineLimit(1)
                                    .truncationMode(.tail)
                            }
                            
                            Spacer()
                        }
                        
                        // Course Info
                        HStack {
                            Text("\\(numLecturesInCourse) Lectures")
                                .font(.system(size: 12))
                                .lineLimit(1)
                                .truncationMode(.tail)
                            
                            Text("\\(watchTimeInHrs)hr Watch Time")
                                .font(.system(size: 12))
                                .lineLimit(1)
                                .truncationMode(.tail)
                            
                            Text("\\(formatIntViewsToString(numViews: aggregateViews)) Views")
                                .font(.system(size: 12))
                                .lineLimit(1)
                                .truncationMode(.tail)
                            Spacer()
                        }
                    }
                    .padding(.leading, 5)
                }
                .cornerRadius(5)
            }
            .buttonStyle(PlainButtonStyle())
            .simultaneousGesture(TapGesture().onEnded {
                courseController.focusCourse(course)
            })
        }
    }
    
    func formatIntViewsToString(numViews: Int) -> String {
        switch numViews {
            case 0..<1_000:
                return String(numViews)
            case 1_000..<1_000_000:
                let thousands = Double(numViews) / 1_000.0
                return String(format: "%.0fk", thousands)
            case 1_000_000...:
                let millions = Double(numViews) / 1_000_000.0
                return String(format: "%.0fM", millions)
            default:
                return "0"
            }
    }
}

#Preview {
    RelatedCourse(course: Course())
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'NewCourse.swift',
                                path: 'Lectures/Views/CourseViewer/NewCourse.swift',
                                type: 'file',
                                content: `//
//  NewCourse.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI
import YouTubePlayerKit

struct NewCourse: View {
    // System Vars
    @Environment(\\.colorScheme) var colorScheme
    @Environment(\\.presentationMode) var presentationMode
    
    // View Controllers
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    // View Arguments
    var course: Course
    
    // State
    @State var isLecturePlaying: Bool
    
    @State var playingLecture: Lecture?
    
    // We have the option to autoplay a lecture if clicking on a watch history
    var lastWatchedLectureId: String?
    var lastWatchedLectureNumber: Int?
    
    
    // YT Player
    @StateObject public var player: YouTubePlayer = ""
    
    // Add this state variable at the top with other @State properties
    @State private var hasAppeared = false
    
    // Add new state for tracking size
    @State private var viewSize: CGSize = .zero
    
    var playerHeight: CGFloat {
        // Calculate height based on 16:9 aspect ratio
        // For iPad, limit the max width to maintain reasonable size
        let maxWidth: CGFloat = UIDevice.current.userInterfaceIdiom == .pad ? 800 : UIScreen.main.bounds.width
        let width = min(viewSize.width, maxWidth)
        return width * 0.5625 // 9/16 = 0.5625 for standard video aspect ratio
    }
    
    var body: some View {
        if let courseId = course.id, let courseTitle = course.courseTitle, let channelId = course.channelId {
            GeometryReader { geometry in
                VStack {
                    // Course Image or Youtube Player
                    if isLecturePlaying {
                        ZStack(alignment: .bottomLeading) {
                            YouTubePlayerView(self.player) { state in
                                // Overlay ViewBuilder closure to place an overlay View
                                // for the current \`YouTubePlayer.State\`
                                switch state {
                                case .idle:
                                    ProgressView()
                                    //                                    SkeletonLoader(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.6)
                                case .ready:
                                    EmptyView()
                                case .error(let error):
                                    Text(verbatim: "YouTube player couldn't be loaded: \\(error)")
                                }
                            }
                            .frame(maxWidth: UIDevice.current.userInterfaceIdiom == .pad ? 800 : nil)
                            .frame(height: playerHeight)
                            .frame(maxWidth: .infinity) // Center the player
                        }
                        .frame(height: playerHeight)
                        .shadow(radius: 2.5)
                    } else {
                        if let image = courseController.courseThumbnails[courseId] {
                            Button(action: {
                                print("Course thumbnail tapped for course: \\(courseTitle)")
                                // make sure lectures are loaded first
                                if let lectures = course.lectureIds {
                                    playFirstLecture()
                                } else {
                                    print("no lectures to play")
                                }
                            }) {
                                ZStack {
                                    Image(uiImage: image)
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(maxWidth: UIDevice.current.userInterfaceIdiom == .pad ? 800 : nil)
                                        .frame(height: playerHeight)
                                        .frame(maxWidth: .infinity) // Center the image
                                        .clipped()
                                    
                                    Image(systemName: "play.circle.fill")
                                        .font(.system(size: 60))
                                        .foregroundColor(.white)
                                        .opacity(0.8)
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                    
                    VStack {
                        // Course Title & Like Button
                        HStack {
                            // Course title and University
                            VStack {
                                Text(courseTitle)
                                    .font(.system(size: 18, design: .serif))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                            
                            
                            LikeCourseButton(courseId: courseId)
                            
                        }
                        .padding(.top, 2)
                        
                        // Channel Info
                        ChannelInfo(channelId: channelId)
                        
                        NewCourseTabSwitcher(course: course,
                                             playingLecture: $playingLecture,
                                             isLecturePlaying: $isLecturePlaying,
                                             lastWatchedLectureNumber: lastWatchedLectureNumber,
                                             player: player)
                        .padding(.top, 5)
                        
                        
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                }
                .onAppear {
                    viewSize = geometry.size
                    // Only execute this block on first appearance
                    guard !hasAppeared else { return }
                    hasAppeared = true
                    
                    // if last watched lecture was passed in, then autoplay
                    if let _ = lastWatchedLectureNumber, let lastWatchedLectureId = lastWatchedLectureId {
                        print("The on appear getting called with a last watched lecture")
                        playLastWatchedLecture(lectureId: lastWatchedLectureId)
                    } else {
                        print("no last watched")
                    }
                }
                .onChange(of: geometry.size) { newSize in
                    viewSize = newSize
                }
                .onChange(of: player.source) {
                    // when the video source changes, we know the user has watched a new video, and we should update course history accordingly.
                    print("video player source is changing and we're trying to update watch history")
                    
                    
                    // If the user is signed in, we'll save their watch history.
                    if let user = userController.user, let userId = user.id {
                        if let playingLecture = playingLecture {
                            if course.id == nil {
                                print("course id is nil for some readosn?")
                            }
                            myCourseController.updateWatchHistory(userId: userId, course: course, lecture: playingLecture)
                        }
                    }
                }
            }
        } else {
            ErrorLoadingView()
        }
    }
    
    func playFirstLecture() {
        // Play the first lecture in the course
        if let lectureIds = course.lectureIds {
            if lectureIds.count == 0 { return }
            
            // Find the lecture where numLectureInCourse == 1
            var firstLecture: Lecture?
            for lectureId in lectureIds {
                if let loadedLecture = courseController.cachedLectures[lectureId] {
                    if loadedLecture.lectureNumberInCourse == 1 {
                        firstLecture = loadedLecture
                    }
                }
            }
    
            
            if let firstLecture = firstLecture {
                if let youtubeVideoUrl = firstLecture.youtubeVideoUrl {
                    isLecturePlaying = true
                    self.player.source = .url(youtubeVideoUrl)
                    playingLecture = firstLecture
                }
            }
        }
    }
    
    func playLastWatchedLecture(lectureId: String) {
        // first ensure the lectureId passed is actually part of this course
        if let lectureIds = course.lectureIds {
            if !lectureIds.contains(lectureId) { return }
        }
        
        if let lecture = courseController.cachedLectures[lectureId] {
            if let youtubeVideoUrl = lecture.youtubeVideoUrl {
                self.player.source = .url(youtubeVideoUrl)
                self.playingLecture = lecture
            }
        } else {
            print("no lecture")
        }
    }
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'NewCourseTabSwitcher.swift',
                                path: 'Lectures/Views/CourseViewer/NewCourseTabSwitcher.swift',
                                type: 'file',
                                content: `//
//  NewCourseTabSwitcher.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI
import YouTubePlayerKit

struct NewCourseTabSwitcher: View {
    @State private var selectedTab = "Lectures"
    @State private var hasTabLecturesAppeared = false
    // Add state for loaded lectures
    @State private var currentLoadedLectures: [String] = []
    
    var course: Course
    
    @Binding var playingLecture: Lecture?
    @Binding var isLecturePlaying: Bool
    
    var lastWatchedLectureNumber: Int?
    
    @ObservedObject var player: YouTubePlayer
    
    var body: some View {
        // Tab Switcher
        VStack(spacing: 0) {
//            Text("Current playing lecture: \\(playingLecture?.id ?? "-1")" )
            // Tab buttons
            HStack(spacing: 0) {
                ForEach(["Lectures", "Resources", "About"], id: \\.self) { tab in
                    Button(action: {
                        withAnimation {
                            selectedTab = tab
                        }
                    }) {
                        VStack {
                            Text(tab)
                                .font(.system(size: 12))
                                .foregroundColor(selectedTab == tab ? .primary : .gray)
//                                .padding(.vertical, 4)
                            
                            // Underline indicator
                            Rectangle()
                                .fill(selectedTab == tab ? .orange.opacity(0.8) : .clear)
                                .frame(height: 2)
                        }
                    }
                    .frame(maxWidth: .infinity)
                }
            }
            
            // Divider line
            Rectangle()
                .fill(Color.gray.opacity(0.2))
                .frame(height: 1)
            
            // Content based on selected tab
            switch selectedTab {
            case "Lectures":
                TabLectures(course: course,
                            playingLecture: $playingLecture, 
                            isLecturePlaying: $isLecturePlaying,
                            lastWatchedLectureNumber: lastWatchedLectureNumber,
                            player: player,
                            currentLoadedLectures: $currentLoadedLectures, hasAppeared: $hasTabLecturesAppeared)  // Pass the state
            case "Resources":
                TabResources(course: course, playingLecture: playingLecture)
            case "About":
                TabAbout(course: course, lecture: playingLecture)
            default:
                EmptyView()
            }
        }
        .padding(.bottom, 80)
    }
}

//#Preview {
//    NewCourseTabSwitcher()
//}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'TabAbout.swift',
                                path: 'Lectures/Views/CourseViewer/TabAbout.swift',
                                type: 'file',
                                content: `//
//  TabAbout.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import FirebaseFirestore
import SwiftUI

struct TabAbout: View {
    var course: Course
    var lecture: Lecture?
    
    var body: some View {
        if let courseTitle = course.courseTitle,
           let numLecturesInCourse = course.numLecturesInCourse,
           let watchTimeInHrs = course.watchTimeInHrs,
           let aggregateViews = course.aggregateViews,
           let courseDescription = course.courseDescription,
           let professorName = course.professorName {
            
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Course Information Section
                    CourseInfoSection(
                        courseTitle: courseTitle,
                        numLectures: numLecturesInCourse,
                        watchTime: watchTimeInHrs,
                        views: aggregateViews,
                        description: courseDescription,
                        professorName: professorName
                    )
                    
                    // Current Lecture Section (if available)
                    if let lecture = lecture {
                        CurrentLectureSection(lecture: lecture)
                    }
                    
                    RecommendedCoursesSection(course: course)
                }
                .padding(.vertical)
            }
        }
    }
}

// MARK: - Course Information Section
private struct CourseInfoSection: View {
    let courseTitle: String
    let numLectures: Int
    let watchTime: Int
    let views: Int
    let description: String
    let professorName: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            Text("Course Information")
                .font(.title2)
                .fontWeight(.bold)
            
            // Title
            Text(courseTitle)
                .font(.system(size: 18, design: .serif))
            
            if professorName != "" {
                HStack(spacing: 4) {
                    Text("Taught by:")
                        .font(.system(size: 12))
                        .fontWeight(.medium)
                        .italic()
                    
                    Text(professorName)
                        .font(.system(size: 12))
                        .fontWeight(.medium)
                }
            }
                
            
            // Stats Row
            HStack(spacing: 16) {
                StatItem(icon: "play.circle", text: "\\(numLectures) Lectures")
                StatItem(icon: "clock", text: "\\(watchTime)hr Watch Time")
                StatItem(icon: "eye", text: "\\(formatIntViewsToString(numViews: views)) Views")
            }
            
            // Description
            VStack(alignment: .leading, spacing: 4) {
                Text("About this course")
                    .font(.subheadline)
                    .fontWeight(.medium)
                
                ExpandableText(
                    text: description.isEmpty ? "We couldn't find a description for this course" : description,
                    maxLength: 150
                )
            }
        }
    }
}

// MARK: - Current Lecture Section
private struct CurrentLectureSection: View {
    let lecture: Lecture
    
    var body: some View {
        if let lectureTitle = lecture.lectureTitle,
           let professorName = lecture.professorName,
           let lectureDescription = lecture.lectureDescription,
           let viewsOnYouTube = lecture.viewsOnYouTube,
           let datePostedonYoutube = lecture.datePostedonYoutube {
            
            VStack(alignment: .leading, spacing: 12) {
                // Header
                Text("Current Lecture")
                    .font(.title2)
                    .fontWeight(.bold)
                
                // Lecture Title
                Text(lectureTitle)
                    .font(.system(size: 18, design: .serif))
                
                // Professor
                if professorName != "" {
                    HStack(spacing: 4) {
                        Text("Taught by:")
                            .font(.system(size: 12))
                            .fontWeight(.medium)
                            .italic()
                        
                        Text(professorName)
                            .font(.system(size: 12))
                            .fontWeight(.medium)
                    }
                }
                
                // Stats Row
                HStack(spacing: 16) {
                    StatItem(icon: "eye", text: "\\(formatIntViewsToString(numViews: viewsOnYouTube)) Views")
                    StatItem(icon: "calendar", text: datePostedonYoutube)
                }

                // Description
                ExpandableText(
                    text: lectureDescription.isEmpty ? "We couldn't find a description for this lecture" : lectureDescription,
                    maxLength: 150
                )
            }
        }
    }
}

// MARK: - Recommended Course Section
private struct RecommendedCoursesSection: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    @EnvironmentObject var courseController: CourseController
    
    var course: Course
    
    @State private var isSignInSheetShowing: Bool = false
    @State private var isUpgradeAccountSheetShowing: Bool = false
    
    @State private var localCourseRecommendations: [Course] = []
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Recommended Courses")
                .font(.title2)
                .fontWeight(.bold)
            
            if !isSignedIn {
                VStack(alignment: .center) {
                    Image(systemName: "person.crop.circle.fill")
                        .font(.system(size: 30))
                        .foregroundColor(.gray.opacity(0.3))
                    
                    Text("Logged in users have access to course recommendations")
                        .font(.system(size: 13, design: .serif))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.bottom, 10)
                    
                    Button(action: {
                        isSignInSheetShowing = true
                    }) {
                        Text("Sign Up / Sign In")
                            .font(.system(size: 14))
                            .foregroundColor(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(Color.blue)
                            .cornerRadius(20)
                    }
                }
                .frame(maxWidth: .infinity)
            } else {
                ForEach(self.localCourseRecommendations, id: \\.id) { course in
                    RelatedCourse(course: course)
                }
            }
        }
        .onAppear {
            // get a local version of courseRecommendations, so we don't get dragged back to the view when going to another nav link
            if self.localCourseRecommendations.isEmpty {
                self.localCourseRecommendations = courseController.courseRecommendations
            }
        }
        .sheet(isPresented: $isSignInSheetShowing) {
            ProAccountButNotSignedInSheet(displaySheet: $isSignInSheetShowing)
        }
        .sheet(isPresented: $isUpgradeAccountSheetShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
        }
    }
}

// MARK: - Helper Views
struct StatItem: View {
    let icon: String
    let text: String
    
    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 11))
            Text(text)
                .font(.system(size: 11))
        }
        .foregroundColor(.secondary)
    }
}

func formatIntViewsToString(numViews: Int) -> String {
    switch numViews {
    case 0..<1_000:
        return String(numViews)
    case 1_000..<1_000_000:
        let thousands = Double(numViews) / 1_000.0
        return String(format: "%.0fk", thousands)
    case 1_000_000...:
        let millions = Double(numViews) / 1_000_000.0
        return String(format: "%.0fM", millions)
    default:
        return "0"
    }
}

//#Preview {
//    TabAbout()
//}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'TabLectures.swift',
                                path: 'Lectures/Views/CourseViewer/TabLectures.swift',
                                type: 'file',
                                content: `//
//  TabLectures.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI
import YouTubePlayerKit

struct TabLectures: View {
    @EnvironmentObject var courseController: CourseController
    
    var course: Course
    
    @Binding var playingLecture: Lecture?
    @Binding var isLecturePlaying: Bool
    
    // Optional to pass in when we want to init lecture loading around a certain lecture number and not lecture 0
    var lastWatchedLectureNumber: Int?
    
    @ObservedObject var player: YouTubePlayer
    
    // [LectureId]
    @Binding var currentLoadedLectures: [String]
    
    @Binding var hasAppeared: Bool
    
    func playLecture(lecture: Lecture) {
        self.playingLecture = lecture
        if let youtubeVideoUrl = lecture.youtubeVideoUrl {
            self.player.source = .url(youtubeVideoUrl)
            isLecturePlaying = true
        }
    }
    
    
    func retrieveLectures() {
        // first we wanna know if we are loading lectures around a playing lecture, if this is the case, we need to load 8 lectures, with the playing lecture in the middle.
        if isLecturePlaying {
            
            // get the number of the current playing lecture
            if let playingLecture = playingLecture, let lectureNumberInCourse = playingLecture.lectureNumberInCourse {
                // we want to load 3 before, the current lecture, and 4 after, if there are less than 3 before, we add how many are missing to after, and same if after are missing, we add to before
                
                // lectureIds [String], playingLecture: Lecure
                
                // find the index of the playing lecture in lectureIds
                if let lectureIds = course.lectureIds {
                    let sortedLectureIds = lectureIds.sorted()
                    let playingLectureIndex: Int = sortedLectureIds.firstIndex(where: { $0 == playingLecture.id }) ?? 0
                    
                    // Calculate how many lectures we can load before and after
                    let maxBefore = 3
                    let maxAfter = 4
                    
                    // Calculate available lectures before and after
                    let availableBefore = playingLectureIndex
                    let availableAfter = sortedLectureIds.count - playingLectureIndex - 1
                    
                    // Initially set the number of lectures to load
                    var numBefore = min(availableBefore, maxBefore)
                    var numAfter = min(availableAfter, maxAfter)
                    
                    // If we couldn't get enough lectures before, add more after
                    let remainingBefore = maxBefore - numBefore
                    if remainingBefore > 0 {
                        numAfter = min(numAfter + remainingBefore, availableAfter)
                    }
                    
                    // If we couldn't get enough lectures after, add more before
                    let remainingAfter = maxAfter - numAfter
                    if remainingAfter > 0 {
                        numBefore = min(numBefore + remainingAfter, availableBefore)
                    }
                    
                    // Calculate the final range
                    let startIndex = playingLectureIndex - numBefore
                    let endIndex = playingLectureIndex + numAfter + 1 // +1 because the range is exclusive
                    
                    // Get the lecture IDs to load
                    let lecturesToLoad = Array(sortedLectureIds[startIndex..<endIndex])
                    courseController.retrieveLecturesInCourse(courseId: course.id!, lectureIdsToLoad: lecturesToLoad)
                    self.currentLoadedLectures = lecturesToLoad
                }
            }
        } else {
            // otherwise, we are just loading a course, and want to retrieve the first 8 lectures in the course
            if let courseId = course.id, let lectureIds = course.lectureIds {
                let sortedLectureIds = lectureIds.sorted()
                
                let lecturesToLoad = Array(sortedLectureIds.prefix(8))
                courseController.retrieveLecturesInCourse(courseId: courseId, lectureIdsToLoad: lecturesToLoad)
                self.currentLoadedLectures = lecturesToLoad
            }
        }
    }
    
    func retrievePreviousLectures() {
        guard let lectureIds = course.lectureIds else { return }
        
        let sortedLectureIds = lectureIds.sorted()
        
        // Find the earliest loaded lecture's index
        guard let earliestLoadedId = currentLoadedLectures.min(),
              let earliestLoadedIndex = sortedLectureIds.firstIndex(of: earliestLoadedId) else {
            return
        }
        
        // Calculate how many lectures we can load before
        let numToLoad = 8
        let startIndex = max(0, earliestLoadedIndex - numToLoad)
        let endIndex = earliestLoadedIndex
        
        // Get the lecture IDs to load
        let lecturesToLoad = Array(sortedLectureIds[startIndex..<endIndex])
        
        // Only proceed if we have lectures to load
        guard !lecturesToLoad.isEmpty else { return }
        
        courseController.retrieveLecturesInCourse(courseId: course.id!, lectureIdsToLoad: lecturesToLoad)
        
        // Update currentLoadedLectures to include both the new and existing lectures
        // Insert new lectures at the beginning since they come before current ones
        self.currentLoadedLectures.insert(contentsOf: lecturesToLoad, at: 0)
    }
    
    func retrieveFollowingLectures() {
        guard let lectureIds = course.lectureIds else { return }
        
        let sortedLectureIds = lectureIds.sorted()
        
        // Find the latest loaded lecture's index
        guard let latestLoadedId = currentLoadedLectures.max(),
              let latestLoadedIndex = sortedLectureIds.firstIndex(of: latestLoadedId) else {
            return
        }
        
        // Calculate how many lectures we can load after
        let numToLoad = 8
        let startIndex = latestLoadedIndex + 1
        let endIndex = min(sortedLectureIds.count, startIndex + numToLoad)
        
        // Get the lecture IDs to load
        let lecturesToLoad = Array(sortedLectureIds[startIndex..<endIndex])
        
        // Only proceed if we have lectures to load
        guard !lecturesToLoad.isEmpty else { return }
        
        courseController.retrieveLecturesInCourse(courseId: course.id!, lectureIdsToLoad: lecturesToLoad)
        
        // Update currentLoadedLectures to include both existing and new lectures
        // Append new lectures at the end since they come after current ones
        self.currentLoadedLectures.append(contentsOf: lecturesToLoad)
    }
    
    var body: some View {
        if let lectureIds = course.lectureIds {
            VStack {
                ScrollView() {
                    
                    if courseController.isLecturesInCourseLoading {
                        ForEach(0..<5, id: \\.self) { _ in
                            HStack {
                                SkeletonLoader(width: 350, height: 30)
                                    .padding(.bottom, 2)
                                Spacer()
                            }
                        }
                    } else {
                        
                        
                        if let earliestLoadedId = currentLoadedLectures.min(),
                           let lectureIds = course.lectureIds,
                           let earliestLoadedIndex = lectureIds.sorted().firstIndex(of: earliestLoadedId),
                           earliestLoadedIndex > 0 {  // Check if there are lectures before the earliest loaded one
                            
                            
                            
                            FetchButton(isMore: false) {
                                retrievePreviousLectures()
                            }
                            .padding(.bottom, 10)
                            
                        }
                        
                        ForEach(lectureIds, id: \\.self) { lectureId in
                            if let lecture = courseController.cachedLectures[lectureId] {
                                if let playingLecture = playingLecture, let playingLectureId = playingLecture.id  {
                                    Button(action: {
                                        playLecture(lecture: lecture)
                                    }) {
                                        LectureInCourse(lecture: lecture, playingLectureId: playingLectureId)
                                            .padding(.bottom, 10)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                } else {
                                    Button(action: {
                                        playLecture(lecture: lecture)
                                    }) {
                                        LectureInCourse(lecture: lecture)
                                            .padding(.bottom, 10)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                        }
                        
                        if let latestLoadedId = currentLoadedLectures.max(),
                           let lectureIds = course.lectureIds,
                           let latestLoadedIndex = lectureIds.sorted().firstIndex(of: latestLoadedId),
                           latestLoadedIndex < lectureIds.count - 1 {  // Check if there are lectures after the latest loaded one
                            
                            
                            FetchButton(isMore: true) {
                                retrieveFollowingLectures()
                            }
                            .padding(.top, 6)
                            .padding(.bottom, 10)
                        }
                    }
                }
            }
            .padding(.top, 10)
            .onAppear {
                print("is lecture playing?", isLecturePlaying)
                
                print(" we are retrieving lectures again, value of hasAppeared: \\(hasAppeared) ")
                guard !hasAppeared else { return }
                hasAppeared = true
                
                retrieveLectures()
            }
        }
    }
}

struct LectureInCourse: View {
    @Environment(\\.colorScheme) var colorScheme
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var subscriptionController: SubscriptionController
    @EnvironmentObject var rateLimiter: RateLimiter
    
    var lecture: Lecture
    var playingLectureId: String?
    
    @State var isLectureLiked: Bool = false
    
    @State private var isUpgradeAccountSheetShowing: Bool = false
    @State private var isProAccountButNotRegisteredSheetShowing: Bool = false
    
    var body: some View {
        if let lectureId = lecture.id, let lectureTitle = lecture.lectureTitle, let lectureNumberInCourse = lecture.lectureNumberInCourse, let viewsOnYouTube = lecture.viewsOnYouTube {
            HStack {
                // Lecture number in course
                Text("\\(lectureNumberInCourse)")
                    .font(.system(size: 12, design: .serif))
                
                // Lecture title, duration and number plays
                VStack {
                    // Check mark if user watched this lecture already
                    
                    HStack {
                        Text(lectureTitle)
                            .font(.system(size: 14, design: .serif))
                            .lineLimit(1)
                            .truncationMode(.tail)
                        Spacer()
                        
                        // Like Lecture Button
                        Button(action: {
                            if let user = userController.user, let userId = user.id {
                                if let rateLimit = rateLimiter.processWrite() {
                                    print(rateLimit)
                                    return
                                }
                                
                                userController.likeLecture(userId: userId, lectureId: lectureId)
                                withAnimation(.spring()) {
                                    self.isLectureLiked.toggle()
                                }
                            } else {
                                isProAccountButNotRegisteredSheetShowing = true
                            }
                        }) {
                            Image(systemName: isLectureLiked ? "heart.fill" : "heart")
                                .font(.system(size: 12, design: .serif))
                                .foregroundStyle(isLectureLiked ? Color.red : colorScheme == .light ? Color.black : Color.white)
                        }
                        .sheet(isPresented: $isUpgradeAccountSheetShowing) {
                            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
                        }
                        .sheet(isPresented: $isProAccountButNotRegisteredSheetShowing) {
                            ProAccountButNotSignedInSheet(displaySheet: $isProAccountButNotRegisteredSheetShowing)
                        }
                        .padding(.trailing, 10)
                    }
                    
                    HStack {
                        if let lectureDuration = lecture.lectureDuration  {
                            // Duration
                            
                            StatItem(icon: "play.circle", text: "\\(lectureDuration)")
                            
                            
                            //                            Text("\\(lectureDuration)")
                            //                                .font(.system(size: 12))
                            //                                .opacity(0.6)
                        }
                        
                        StatItem(icon: "eye", text: "\\(formatIntViewsToString(numViews: viewsOnYouTube)) Views")
                        Spacer()
                    }
                }
            }
            .padding(lectureId == playingLectureId ? 8 : 0)
            .background(
                RoundedRectangle(cornerRadius: 8)
                //                    .fill(Color.gray.opacity(0.2))
                    .fill(lectureId == playingLectureId ? Color.gray.opacity(0.2) : Color.clear)
            )
            .onAppear {
                if let user = userController.user, let likedLectureIds = user.likedLectureIds {
                    if likedLectureIds.contains(lectureId) {
                        self.isLectureLiked = true
                    }
                }
            }
        }
    }
    
    func formatIntViewsToString(numViews: Int) -> String {
        switch numViews {
        case 0..<1_000:
            return String(numViews)
        case 1_000..<1_000_000:
            let thousands = Double(numViews) / 1_000.0
            return String(format: "%.0fk", thousands)
        case 1_000_000...:
            let millions = Double(numViews) / 1_000_000.0
            return String(format: "%.0fM", millions)
        default:
            return "0"
        }
    }
}

//#Preview {
//    TabLectures()
//}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'TabResources.swift',
                                path: 'Lectures/Views/CourseViewer/TabResources.swift',
                                type: 'file',
                                content: `//
//  TabResources.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/6/25.
//

import SwiftUI

struct TabResources: View {
    @EnvironmentObject var notesController: NotesController
    
    var course: Course
    var playingLecture: Lecture?
    
    // TODO: we somewhere need to fetch the notes
    var body: some View {
        VStack {
            // For now we just have notes, so display it if available
            
            if let lecture = playingLecture {
                HStack {
                    Text("Lecture Notes")
                        .font(.system(size: 14))
                    Image(systemName: "sparkles")
                        .foregroundStyle(Color.blue)
                        .font(.system(size: 14, design: .serif))
                    Spacer()
                }
                .padding(.top, 20)
                
                
                
                // Notes
                if let noteId = lecture.notesResourceId {
                    if let note = notesController.cachedNotes[noteId] {
                        ResourceChip(resource: note)
                            .padding(.bottom, 2)
                    } else if notesController.isLoading == false {
                        VStack(spacing: 12) {
                            Image(systemName: "text.page.badge.magnifyingglass")
                                .font(.system(size: 24))
                                .foregroundColor(.gray.opacity(0.3))
                            
                            Text("No notes available for this lecture")
                                .font(.system(size: 12, design: .serif))
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                        }
                        .padding(.vertical, 12)
                    }
                }
            } else {
                VStack(spacing: 16) {
                    Image(systemName: "play.rectangle")
                        .font(.system(size: 30))
                        .foregroundColor(.gray.opacity(0.3))
                        .padding(.top, 40)
                    
                    HStack(spacing: 4) {
                        Text("Play a lecture to view resources")
                    }
                    .font(.system(size: 12, design: .serif))
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 20)
                }
            }
        }
        .onAppear {
            // Fetch the resource on open
            if let playingLecture = playingLecture {
                if let noteId = playingLecture.notesResourceId {
                    // if we already have the note, do nothing
                    if let note = notesController.cachedNotes[noteId] { return }
                    
                    notesController.retrieveNote(noteId: noteId)
                } else {
                    print("lecture didn't have an notes Id")
                }
            }
        }
    }
}

//#Preview {
//    TabResources()
//}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'CustomTabBar.swift',
                        path: 'Lectures/Views/CustomTabBar.swift',
                        type: 'file',
                        content: `//
//  CustomTabBar.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/18/24.
//

import SwiftUI

struct CustomTabBar: View {
  
  enum TabItemKind: Int, Identifiable {
    var id: Int {
      self.rawValue
    }
    
    case home = 0
    case trends
    case reels
    case search
    case settings
  }
  
  struct TabItem {
    let imageName: String
    let type: TabItemKind
  }
  
  private let items = [
    TabItem(imageName: "house", type: .home),
    TabItem(imageName: "book.pages", type: .trends),
    TabItem(imageName: "play.square.stack", type: .reels),
    TabItem(imageName: "magnifyingglass", type: .search),
    TabItem(imageName: "gearshape", type: .settings)
  ]
  
  @Binding var selectedTab: TabItemKind
  @State private var scale = 1.0
  
  private let tabItemWidth = 60.0
  private let indicatorColor = Color(red: 224/255.0, green: 103/255.0, blue: 111/255.0)
  
  var body: some View {
    
    ZStack {
      HStack {
        Spacer()
        
        ForEach(items, id: \\.type) { item in
          Image(systemName: item.imageName)
            .frame(width: tabItemWidth, height: tabItemWidth)
          // to make the full frame tappable, not just the image
            .contentShape(Rectangle())
            .scaleEffect(selectedTab == item.type ? scale : 1.0)
            .symbolVariant(selectedTab == item.type ? .fill : .none)
            .foregroundStyle(selectedTab == item.type ? .primary : .secondary)
            .onTapGesture {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                selectedTab = item.type
                scale = 1.1
              }
            }
          
          Spacer()
        }
      }
      
      VStack(alignment: .leading) {
        // Push indicator to the bottom
        Spacer()
        HStack {
          // Leading dynamic spacing
          leadingSpacers()
          
          Capsule()
            .frame(width: 32, height: 3)
            .offset(y: -3)
            .foregroundStyle(indicatorColor)
            .padding(.horizontal, 14)
            .shadow(color: indicatorColor, radius: 5, x: 0, y: -1)
          
          // Trailing dynamic spacing
          trailingSpacers()
        }
      }
      .frame(maxWidth: .infinity)
    }
    .frame(maxWidth: .infinity)
    .frame(height: 64)
    .background(.thickMaterial.opacity(0.95), in: .capsule)
//    .background(.thickMaterial)
    .shadow(color: .black.opacity(0.6), radius: 0.0, y: 0.5)
    .padding()
  }
  
  @ViewBuilder
  func leadingSpacers() -> some View {
    let leadingMaxIndex = selectedTab.rawValue + 1
    ForEach(0..<leadingMaxIndex, id: \\.self) { _ in
      Spacer()
    }
    Spacer().frame(width: tabItemWidth * CGFloat((leadingMaxIndex - 1)))
  }
  
  @ViewBuilder
  func trailingSpacers() -> some View {
    let trailingMaxIndex = items.count - selectedTab.rawValue
    ForEach(0..<trailingMaxIndex, id: \\.self) { _ in
      Spacer()
    }
    Spacer().frame(width: tabItemWidth * CGFloat(trailingMaxIndex - 1))
  }
}

struct CustomTabBarPreviewWrapper: View {
    @State private var selectedTab: CustomTabBar.TabItemKind = .home

    var body: some View {
        CustomTabBar(selectedTab: $selectedTab)
    }
}

#Preview {
    CustomTabBarPreviewWrapper()
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Home',
                        path: 'Lectures/Views/Home',
                        type: 'directory',
                        children: [
                            {
                                name: 'ChannelViews',
                                path: 'Lectures/Views/Home/ChannelViews',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ChannelCard.swift',
                                        path: 'Lectures/Views/Home/ChannelViews/ChannelCard.swift',
                                        type: 'file',
                                        content: `//
//  ChannelCard.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/4/25.
//

import SwiftUI

struct ChannelCard: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var channel: Channel
    
    var body: some View {
        if let id = channel.id, let title = channel.title, let numCourses = channel.numCourses, let numLectures = channel.numLectures {
            HStack {
                if let image = courseController.channelThumbnails[id] {
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: imageSize, height: imageSize)
                        .aspectRatio(contentMode: .fill)
                } else {
                    // default image when not loaded
                    SkeletonLoader(width: imageSize, height: imageSize)
                }
                
                VStack {
                    Text(title)
                        .font(.system(size: titleFontSize, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    HStack {
                        Text("\\(numCourses) Courses")
                            .font(.system(size: subtitleFontSize))
                            .opacity(0.6)
                        
                        Text("\\(numLectures) Lectures")
                            .font(.system(size: subtitleFontSize))
                            .opacity(0.6)
                        
                        Spacer()
                    }
                }
                .frame(maxWidth: cardWidth)
            }
            .cornerRadius(5)
        }
    }
    
    // Computed properties for responsive sizing
    private var imageSize: CGFloat {
        horizontalSizeClass == .regular ? 60 : 40
    }
    
    private var cardWidth: CGFloat {
        horizontalSizeClass == .regular ? 240 : 180
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 16 : 14
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 14 : 12
    }
}

#Preview {
    ChannelCard(channel: Channel())
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ChannelView.swift',
                                        path: 'Lectures/Views/Home/ChannelViews/ChannelView.swift',
                                        type: 'file',
                                        content: `//
//  ChannelView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import SwiftUI

struct ChannelView: View {
    @Environment(\\.presentationMode) var presentationMode
    
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var channel: Channel
    
    @State private var isChannelFollowed = false
    @State private var isUpgradeAccountSheetShowing: Bool = false
    @State private var isProAccountButNotRegisteredSheetShowing: Bool = false
    var body: some View {
        Group {
            if let id = channel.id, let title = channel.title, let numCourses = channel.numCourses, let numLectures = channel.numLectures, let channelDescription = channel.channelDescription {
                VStack {
                    ScrollView(showsIndicators: false) {
                        VStack {
                            HStack {
                                if let channelImage = courseController.channelThumbnails[id] {
                                    Image(uiImage: channelImage)
                                        .resizable()
                                        .frame(width: imageSize, height: imageSize)
                                } else {
                                    Image("stanford")
                                        .resizable()
                                        .frame(width: imageSize, height: imageSize)
                                }
                                
                                VStack {
                                    Text(title)
                                        .font(.system(size: titleFontSize, design: .serif))
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    
                                    HStack {
                                        Text("\\(numCourses) Courses")
                                            .font(.system(size: subtitleFontSize))
                                            .opacity(0.6)
                                        
                                        Text("\\(numLectures) Lectures")
                                            .font(.system(size: subtitleFontSize))
                                            .opacity(0.6)
                                        
                                        Spacer()
                                    }
                                }
                                
                                Button(action: {
                                    // A signed in user can follow channels
                                    if let user = userController.user, let userId = user.id {
                                        if let rateLimit = rateLimiter.processWrite() {
                                            print(rateLimit)
                                            return
                                        }
                                        
                                        userController.followChannel(userId: userId, channelId: id)
                                        withAnimation(.spring()) {
                                            isChannelFollowed.toggle()
                                        }
                                    } else {
                                        isProAccountButNotRegisteredSheetShowing = true
                                    }
                                }) {
                                    HStack(spacing: 8) {
                                        Image(systemName: isChannelFollowed ? "heart.fill" : "heart")
                                            .font(.system(size: buttonIconSize))
                                        
                                        Text(isChannelFollowed ? "Following" : "Follow")
                                            .font(.system(size: buttonTextSize, weight: .semibold))
                                    }
                                    .padding(.horizontal, buttonPadding)
                                    .padding(.vertical, buttonPadding * 0.5)
                                    .foregroundColor(isChannelFollowed ? .white : .primary)
                                    .background(
                                        Capsule()
                                            .fill(isChannelFollowed ? Color.red : Color.clear)
                                            .overlay(
                                                Capsule()
                                                    .strokeBorder(isChannelFollowed ? Color.red : Color.gray, lineWidth: 1)
                                            )
                                    )
                                }
                                .sheet(isPresented: $isProAccountButNotRegisteredSheetShowing) {
                                    ProAccountButNotSignedInSheet(displaySheet: $isProAccountButNotRegisteredSheetShowing)
                                }
                            }
                            .cornerRadius(5)
                            
                            ExpandableText(text: channelDescription, maxLength: descriptionMaxLength)
                            
                            CoursesByChannel(channel: channel)
                                .padding(.top, 5)
                        }
                        .padding(.horizontal, horizontalPadding)
                    }
                }
                .sheet(isPresented: $isUpgradeAccountSheetShowing) {
                    UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
                }
                .onAppear {
                    // check if the user follows the course's channel and set the button accordingly
                    if let user = userController.user, let followedChannelIds = user.followedChannelIds {
                        if followedChannelIds.contains(id) {
                            self.isChannelFollowed = true
                        }
                    }
                }
            } else {
                ErrorLoadingView()
            }
        }
//        .navigationBarBackButtonHidden(true)
//        .navigationBarItems(leading: Button(action: {
//            self.presentationMode.wrappedValue.dismiss()
//        }) {
//            HStack {
//                Image(systemName: "chevron.left")
//                    .bold()
//                Text("Back")
//            }
//        })
    }
    
    // Computed properties for responsive sizing
    private var imageSize: CGFloat {
        horizontalSizeClass == .regular ? 60 : 40
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 22 : 18
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 14 : 12
    }
    
    private var buttonIconSize: CGFloat {
        horizontalSizeClass == .regular ? 16 : 14
    }
    
    private var buttonTextSize: CGFloat {
        horizontalSizeClass == .regular ? 16 : 14
    }
    
    private var buttonPadding: CGFloat {
        horizontalSizeClass == .regular ? 20 : 16
    }
    
    private var horizontalPadding: CGFloat {
        horizontalSizeClass == .regular ? 40 : 20
    }
    
    private var descriptionMaxLength: Int {
        horizontalSizeClass == .regular ? 250 : 150
    }
}

//#Preview {
//    ChannelView()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CourseByChannelModule.swift',
                                        path: 'Lectures/Views/Home/ChannelViews/CourseByChannelModule.swift',
                                        type: 'file',
                                        content: `//
//  CourseByChannelModule.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import SwiftUI

struct CourseByChannelModule: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var courseId: String
    
    var body: some View {
        if let course = courseController.cachedCourses[courseId], 
           let courseTitle = course.courseTitle, 
           let numLecturesInCourse = course.numLecturesInCourse, 
           let watchTimeInHrs = course.watchTimeInHrs, 
           let aggregateViews = course.aggregateViews {
            
            HStack {
                // Image
                if let image = courseController.courseThumbnails[courseId] {
                    Image(uiImage: image)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: thumbnailWidth, height: thumbnailHeight)
                        .clipped()
                } else {
                    SkeletonLoader(width: thumbnailWidth, height: thumbnailHeight)
                }
                
                // Lecture Name
                Rectangle()
                    .foregroundColor(Color.clear)
                    .frame(height: textContainerHeight)
                    .overlay {
                        VStack(alignment: .leading) {
                            Text(courseTitle)
                                .font(.system(size: titleFontSize, design: .serif))
                                .lineLimit(3)
                                .truncationMode(.tail)
                                .fixedSize(horizontal: false, vertical: true)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            HStack {
                                Text("\\(numLecturesInCourse) Lectures")
                                    .font(.system(size: subtitleFontSize))
                                    .opacity(0.8)
                                
                                Text("\\(watchTimeInHrs)Hrs")
                                    .font(.system(size: subtitleFontSize))
                                    .opacity(0.8)
                                
                                Text("\\(formatIntViewsToString(numViews: aggregateViews)) Views")
                                    .font(.system(size: subtitleFontSize))
                                    .opacity(0.8)
                                
                                Spacer()
                            }
                        }
                    }
            }
            .cornerRadius(5)
        }
    }
    
    // Computed properties for responsive sizing
    private var thumbnailWidth: CGFloat {
        horizontalSizeClass == .regular ? 160 : 120
    }
    
    private var thumbnailHeight: CGFloat {
        thumbnailWidth * 0.5625 // Maintains 16:9 aspect ratio
    }
    
    private var textContainerHeight: CGFloat {
        horizontalSizeClass == .regular ? 50 : 40
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 16 : 13
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 13 : 11
    }
    
    func formatIntViewsToString(numViews: Int) -> String {
        switch numViews {
            case 0..<1_000:
                return String(numViews)
            case 1_000..<1_000_000:
                let thousands = Double(numViews) / 1_000.0
                return String(format: "%.0fk", thousands)
            case 1_000_000...:
                let millions = Double(numViews) / 1_000_000.0
                return String(format: "%.0fM", millions)
            default:
                return "0"
            }
    }
}

#Preview {
    CourseByChannelModule(courseId: "1")
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CoursesByChannel.swift',
                                        path: 'Lectures/Views/Home/ChannelViews/CoursesByChannel.swift',
                                        type: 'file',
                                        content: `//
//  CoursesByChannel.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import SwiftUI

struct CoursesByChannel: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var channel: Channel
    
    var body: some View {
        if let courseIds = channel.courseIds {
            VStack {
                HStack {
                    Text("Courses by")
                        .font(.system(size: headerFontSize, design: .serif))
                        .bold()
                    
                    Text(channel.title ?? "")
                        .font(.system(size: headerFontSize, design: .serif))
                        .lineLimit(1)
                        .truncationMode(.tail)
                    
                    Spacer()
                }
                
                LazyVGrid(
                    columns: gridColumns,
                    spacing: gridSpacing
                ) {
                    ForEach(courseIds.prefix(courseController.channelCoursesPrefixPaginationNumber), id: \\.self) { courseId in
                        if let course = courseController.cachedCourses[courseId] {
                            NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                CourseByChannelModule(courseId: courseId)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .simultaneousGesture(TapGesture().onEnded {
                                courseController.focusCourse(course)
                            })
                        }
                    }
                }
                
                if courseController.channelCoursesPrefixPaginationNumber < courseIds.count {
                    FetchButton(isMore: true) {
                        courseController.channelCoursesPrefixPaginationNumber += 10
                        
                        let coursesToRetrieve = courseIds.prefix(courseController.channelCoursesPrefixPaginationNumber)
                        
                        for courseId in coursesToRetrieve {
                            courseController.retrieveCourse(courseId: courseId)
                            courseController.getCourseThumbnail(courseId: courseId)
                        }
                    }
                    .padding(.top, topPadding)
                    .padding(.bottom, bottomPadding)
                }
                
                BottomBrandView()
            }
        }
    }
    
    // Computed properties for responsive sizing
    private var headerFontSize: CGFloat {
        horizontalSizeClass == .regular ? 18 : 14
    }
    
    private var gridColumns: [GridItem] {
        let columns = horizontalSizeClass == .regular ? 2 : 1
        return Array(repeating: GridItem(.flexible(), spacing: gridSpacing), count: columns)
    }
    
    private var gridSpacing: CGFloat {
        horizontalSizeClass == .regular ? 24 : 16
    }
    
    private var topPadding: CGFloat {
        horizontalSizeClass == .regular ? 16 : 10
    }
    
    private var bottomPadding: CGFloat {
        horizontalSizeClass == .regular ? 30 : 20
    }
}

//#Preview {
//    CoursesByChannel()
//}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'HomeMainView.swift',
                                path: 'Lectures/Views/Home/HomeMainView.swift',
                                type: 'file',
                                content: `//
//  HomeMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/17/24.
//

import SwiftUI

struct HomeMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    @State var userHasPreviouslyWatchedLectures: Bool = true
    
    @State private var selectedTab = 0
    
    let tabs = ["For You", "Computer Science", "Business", "Engineering", "Humanities", "Math", "Health"]
    
    var body: some View {
        NavigationView {
            VStack {
                TopBrandView()
                
                ScrollView(showsIndicators: false) {
                    // Top Tags
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack {
                            ForEach(Array(tabs.enumerated()), id: \\.element) { index, tab in
                                VStack {
                                    Text(tab)
                                        .foregroundColor(selectedTab == index ? .blue : .gray)
                                        .font(.system(size: 11, design: .serif))
                                        .bold()
                                        .lineLimit(1)                    // Ensure single line
                                        .truncationMode(.tail)           // Add ellipsis if text is too long
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                        .animation(.easeInOut(duration: 0.4), value: selectedTab) // Animate text color
                                    
                                    // Blue line indicator for selected tab
                                    Rectangle()
                                        .fill(selectedTab == index ? Color.blue : Color.clear)
                                        .frame(height: 2)
                                        .animation(.spring(response: 0.5, dampingFraction: 0.7), value: selectedTab) // Animate underline
                                }
                                .onTapGesture {
                                    selectedTab = index
                                }
                                .padding(.trailing, 2)
                            }
                        }
                    }
                    .padding(.top, 10)
                    
                    switch selectedTab {
                    case 0:
                        Trending()
                    case 1:
                        TabMainView(tabName: tabs[selectedTab])
                    case 2:
                        TabMainView(tabName: tabs[selectedTab])
                    case 3:
                        TabMainView(tabName: tabs[selectedTab])
                    case 4:
                        TabMainView(tabName: tabs[selectedTab])
                    case 5:
                        TabMainView(tabName: tabs[selectedTab])
                    case 6:
                        TabMainView(tabName: tabs[selectedTab])
                    default:
                        Text("Couldn't load tab")
                    }
                    
                    Spacer()
                    
                   BottomBrandView()
                }
                
            }
            .navigationBarHidden(true)
            .padding(.horizontal, 20)
            .onAppear {
                // for first time loading this view, fetch the content
                if homeController.curatedCourses.isEmpty {
                    homeController.isCommunityFavoritesLoading = true
                    homeController.isCuratedCoursesLoading = true
                    homeController.isUniversityLoading = true
                    homeController.retrieveLeadingUniversities(courseController: courseController)
                    homeController.retrieveCuratedCourses(courseController: courseController)
                    homeController.retrieveCommunityFavorites(courseController: courseController)
                }
            }
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

#Preview {
    HomeMainView()
        .environmentObject(HomeController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeModules',
                                path: 'Lectures/Views/Home/HomeModules',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'CommunityFavorites.swift',
                                        path: 'Lectures/Views/Home/HomeModules/CommunityFavorites.swift',
                                        type: 'file',
                                        content: `//
//  CommunityFavorites.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/18/24.
//

import SwiftUI

struct CommunityFavorites: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                
                Image(systemName: "party.popper")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Famous Lectures")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    
                    ForEach(homeController.communityFavorites, id: \\.id) { course in
                        if homeController.isCommunityFavoritesLoading {
                            SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                        } else {
                            NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                CourseCardView(course: course)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .simultaneousGesture(TapGesture().onEnded {
                                courseController.focusCourse(course)
                            })
                        }
                    }
                }
            }
        }
        .frame(maxHeight: 220)
    }
}

#Preview {
    CommunityFavorites()
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CuratedCourses.swift',
                                        path: 'Lectures/Views/Home/HomeModules/CuratedCourses.swift',
                                        type: 'file',
                                        content: `//
//  CuratedCourses.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/17/24.
//

import SwiftUI

struct CuratedCourses: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Image(systemName: "mail.stack")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Courses For You")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    ForEach(homeController.curatedCourses, id: \\.id) { course in
                        
                        if homeController.isCuratedCoursesLoading {
                            SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                        } else {
                            NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                CourseCardView(course: course)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .simultaneousGesture(TapGesture().onEnded {
                                courseController.focusCourse(course)
                            })
                        }
                    }
                }
            }
        }
        .frame(maxHeight: 220)
    }
}

#Preview {
    CuratedCourses()
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ExpandableText.swift',
                                        path: 'Lectures/Views/Home/HomeModules/ExpandableText.swift',
                                        type: 'file',
                                        content: `//
//  ExpandableText.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/4/25.
//

import SwiftUI

struct ExpandableText: View {
    let text: String
    let maxLength: Int
    @State private var isExpanded: Bool = false
    
    private var truncatedText: String {
        if text.count <= maxLength || isExpanded {
            return text
        }
        return String(text.prefix(maxLength)) + "..."
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(truncatedText)
                .font(.system(size: 13))
//                .font(.system(size: 13, design: .serif))
                .opacity(0.8)
                .frame(maxWidth: .infinity, alignment: .leading)
            
            if text.count > maxLength {
                Button(action: {
                    withAnimation {
                        isExpanded.toggle()
                    }
                }) {
                    Text(isExpanded ? "Show Less" : "Show More")
                        .font(.system(size: 12))
                        .bold()
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }
    }
}

#Preview {
    ExpandableText(text: "Professor Minsky captivated the audience at MIT's Stata Center with a two-hour exploration of how mental agents cooperate and compete within human consciousness, using playful analogies ranging from jazz improvisation to children building with blocks. He particularly emphasized how our perception of having a unified mind is an illusion, demonstrating through interactive thought experiments how different parts of our cognitive processes work independently yet create what feels like a seamless mental experience.", maxLength: 100)
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LeadingUniversities.swift',
                                        path: 'Lectures/Views/Home/HomeModules/LeadingUniversities.swift',
                                        type: 'file',
                                        content: `//
//  LeadingUniversities.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import SwiftUI

struct LeadingUniversities: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                
                Image(systemName: "graduationcap")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Leading Universities")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: 16) {
                    let groupedUniversities = stride(from: 0, to: homeController.leadingUniversities.count, by: 2).map { index in
                        Array(homeController.leadingUniversities[index..<min(index + 2, homeController.leadingUniversities.count)])
                    }
                    
                    ForEach(groupedUniversities.indices, id: \\.self) { groupIndex in
                        let group = groupedUniversities[groupIndex]
                        VStack(spacing: 16) {
                            ForEach(group, id: \\.id) { channel in
                                if homeController.isUniversityLoading {
                                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                                } else {
                                    NavigationLink(destination: ChannelView(channel: channel)) {
                                        ChannelCard(channel: channel)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .simultaneousGesture(TapGesture().onEnded {
                                        courseController.focusChannel(channel)
                                    })
                                }
                            }
                        }
                        .padding(.trailing, 10)
                    }
                }
            }
        }
        .frame(maxHeight: 220)
    }
}

#Preview {
    LeadingUniversities()
        .environmentObject(HomeController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'HomeTabs',
                                path: 'Lectures/Views/Home/HomeTabs',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ComputerScience.swift',
                                        path: 'Lectures/Views/Home/HomeTabs/ComputerScience.swift',
                                        type: 'file',
                                        content: `//
//  ComputerScience.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/12/25.
//

import SwiftUI

struct ComputerScience: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    
    var tabName: String
    var body: some View {
        VStack {
            if homeController.isCoursesForYouLoading || homeController.isLeadingChannelsLoading || homeController.isFamousCoursesLoading {
                HomeLoadingView()
            } else {
                
                CoursesForYouList(tabName: tabName)
                    .padding(.top, 10)
                
                ChannelList(tabName: tabName)
                    .padding(.top, 10)
                
                FamousCoursesList(tabName: tabName)
                    .padding(.top, 10)
            }
        }
        .onAppear {
            homeController.retrieveCoursesForYouByTab(tabName: tabName, courseController: courseController)
            homeController.retrieveLeadingChannelsPerTab(tabName: tabName, courseController: courseController)
            homeController.retrieveFamousCoursePerTab(tabName: tabName, courseController: courseController)
        }
    }
}

//#Preview {
//    ComputerScience()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'HomeTabModules',
                                        path: 'Lectures/Views/Home/HomeTabs/HomeTabModules',
                                        type: 'directory',
                                        children: [
                                            {
                                                name: 'ChannelList.swift',
                                                path: 'Lectures/Views/Home/HomeTabs/HomeTabModules/ChannelList.swift',
                                                type: 'file',
                                                content: `//
//  ChannelList.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/15/25.
//

import SwiftUI

struct ChannelList: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var tabName: String
    
    var body: some View {
        if let channelList = homeController.leadingChannelsPerTab[tabName] {
            VStack(alignment: .leading) {
                HStack {
                    
                    Image(systemName: "graduationcap")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Leading Universities")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Spacer()
                }
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: 16) {
                        let groupedUniversities = stride(from: 0, to: channelList.count, by: 2).map { index in
                            Array(channelList[index..<min(index + 2, channelList.count)])
                        }
                        
                        ForEach(groupedUniversities.indices, id: \\.self) { groupIndex in
                            let group = groupedUniversities[groupIndex]
                            VStack(spacing: 16) {
                                ForEach(group, id: \\.id) { channel in
                                    if homeController.isLeadingChannelsLoading {
                                        SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                                    } else {
                                        NavigationLink(destination: ChannelView(channel: channel)) {
                                            ChannelCard(channel: channel)
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                        .simultaneousGesture(TapGesture().onEnded {
                                            courseController.focusChannel(channel)
                                        })
                                    }
                                }
                            }
                            .padding(.trailing, 10)
                        }
                    }
                }
            }
            .frame(maxHeight: 220)
        }
    }
}

//#Preview {
//    ChannelList()
//}
`,
                                                language: 'plaintext'
                                            },
                                            {
                                                name: 'CoursesForYouList.swift',
                                                path: 'Lectures/Views/Home/HomeTabs/HomeTabModules/CoursesForYouList.swift',
                                                type: 'file',
                                                content: `//
//  CoursesForYouList.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/15/25.
//

import SwiftUI

struct CoursesForYouList: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var tabName: String
    
    var body: some View {
        if let courses = homeController.coursesForYouPerTab[tabName] {
            VStack(alignment: .leading) {
                HStack {
                    Image(systemName: "mail.stack")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Courses For You")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Spacer()
                }
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(courses, id: \\.id) { course in
                            
                            if homeController.isCoursesForYouLoading {
                                SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                            } else {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                    CourseCardView(course: course)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .simultaneousGesture(TapGesture().onEnded {
                                    courseController.focusCourse(course)
                                })
                            }
                        }
                    }
                }
            }
            .frame(maxHeight: 220)
        }
    }
}

//#Preview {
//    CoursesForYouList()
//}
`,
                                                language: 'plaintext'
                                            },
                                            {
                                                name: 'FamousCoursesList.swift',
                                                path: 'Lectures/Views/Home/HomeTabs/HomeTabModules/FamousCoursesList.swift',
                                                type: 'file',
                                                content: `//
//  FamousCoursesList.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/15/25.
//

import SwiftUI

struct FamousCoursesList: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    var tabName: String
    
    var body: some View {
        if let courses = homeController.famousCoursesPerTab[tabName] {
            VStack(alignment: .leading) {
                HStack {
                    Image(systemName: "mail.stack")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Popular Courses")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Spacer()
                }
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(courses, id: \\.id) { course in
                            if homeController.isFamousCoursesLoading {
                                SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                            } else {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                    CourseCardView(course: course)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .simultaneousGesture(TapGesture().onEnded {
                                    courseController.focusCourse(course)
                                })
                            }
                        }
                    }
                }
            }
            .frame(maxHeight: 220)
        }
    }
}

//#Preview {
//    FamousCoursesList()
//}
`,
                                                language: 'plaintext'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'TabMainView.swift',
                                        path: 'Lectures/Views/Home/HomeTabs/TabMainView.swift',
                                        type: 'file',
                                        content: `//
//  TabMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/15/25.
//

import SwiftUI

struct TabMainView: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var homeController: HomeController
    
    
    var tabName: String
    var body: some View {
        VStack {
            if homeController.isCoursesForYouLoading || homeController.isLeadingChannelsLoading || homeController.isFamousCoursesLoading {
                HomeLoadingView()
            } else {
                
                CoursesForYouList(tabName: tabName)
                    .padding(.top, 10)
                
                ChannelList(tabName: tabName)
                    .padding(.top, 10)
                
                FamousCoursesList(tabName: tabName)
                    .padding(.top, 10)
            }
        }
        .onAppear {
            homeController.retrieveCoursesForYouByTab(tabName: tabName, courseController: courseController)
            homeController.retrieveLeadingChannelsPerTab(tabName: tabName, courseController: courseController)
            homeController.retrieveFamousCoursePerTab(tabName: tabName, courseController: courseController)
        }
    }
}

//#Preview {
//    TabMainView()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'Trending.swift',
                                        path: 'Lectures/Views/Home/HomeTabs/Trending.swift',
                                        type: 'file',
                                        content: `//
//  Trending.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/12/25.
//

import FirebaseAuth
import SwiftUI

struct Trending: View {
    @EnvironmentObject var homeController: HomeController
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    
    // list local to the view so navigation won't abrutpy change when the list on the controller is updated
    @State var localWatchHistories: [WatchHistory] = []
    
    // Add a state variable to track if this tab is active
    @State private var isViewActive = false
    
    var body: some View {
        Group {
            if homeController.isUniversityLoading || homeController.isCuratedCoursesLoading || homeController.isCommunityFavoritesLoading {
                HomeLoadingView()
            } else {
                TrendingContent(localWatchHistories: $localWatchHistories, isViewActive: $isViewActive)
            }
        }
        .onAppear {
            isViewActive = true
        }
        .onDisappear {
            isViewActive = false
        }
    }
}

// Create a new view to handle the content
private struct TrendingContent: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    @Binding var localWatchHistories: [WatchHistory]
    @Binding var isViewActive: Bool
    
    var body: some View {
        Group {
            VStack(alignment: .leading, spacing: 0) {
                if isSignedIn {
                    ContinueWatchingSection(localWatchHistories: $localWatchHistories, isViewActive: $isViewActive)
                }
                
                CuratedCourses()
                    .padding(.top, 10)
                
                LeadingUniversities()
                    .padding(.top, 10)
                
                CommunityFavorites()
                    .padding(.top, 10)
            }
        }
        .onAppear {
            if let user = Auth.auth().currentUser {
                myCourseController.retrieveRecentWatchHistories(userId: user.uid, courseController: courseController)
            }
        }
    }
}

// Break out the Continue Watching section into its own view
private struct ContinueWatchingSection: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    @Binding var localWatchHistories: [WatchHistory]
    @Binding var isViewActive: Bool
    
    var body: some View {
        Group {
            HStack {
                Image(systemName: "play.circle")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Continue Watching")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            .padding(.bottom, 6)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    ForEach(localWatchHistories, id: \\.id) { watchHistory in
                        WatchHistoryItem(watchHistory: watchHistory)
                    }
                }
            }
        }
        .onAppear {
            print("on appear of trending")
            if let user = Auth.auth().currentUser {
                self.localWatchHistories = myCourseController.watchHistories
            }
        }
    }
}

// Break out the individual watch history item into its own view
private struct WatchHistoryItem: View {
    @EnvironmentObject var courseController: CourseController
    let watchHistory: WatchHistory
    
    var body: some View {
        Group {
            if let watchHistoryCourseId = watchHistory.courseId,
               let course = courseController.cachedCourses[watchHistoryCourseId],
               let lectureId = watchHistory.lectureId,
               let lectureNumberInCourse = watchHistory.lectureNumberInCourse {
                
                NavigationLink(destination: NewCourse(course: course,
                                                    isLecturePlaying: true,
                                                    lastWatchedLectureId: lectureId,
                                                    lastWatchedLectureNumber: lectureNumberInCourse)) {
                    WatchedCourseCard(course: course, watchHistory: watchHistory)
                }
                .buttonStyle(PlainButtonStyle())
                .simultaneousGesture(TapGesture().onEnded {
                    courseController.focusCourse(course)
                })
            } else {
                SkeletonLoader(width: 400 * 0.6, height: 150)
            }
        }
    }
}

#Preview {
    Trending()
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'OLD',
                                path: 'Lectures/Views/Home/OLD',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'CourseView.swift',
                                        path: 'Lectures/Views/Home/OLD/CourseView.swift',
                                        type: 'file',
                                        content: `////
////  CourseView.swift
////  Lectures
////
////  Created by Ben Dreyer on 12/19/24.
////
//
//import SwiftUI
//
//struct CourseView: View {
//    @Environment(\\.colorScheme) var colorScheme
//    @AppStorage("isSignedIn") private var isSignedIn = false
//    
//    @EnvironmentObject var rateLimiter: RateLimiter
//    
//    @EnvironmentObject var courseController: CourseController
//    @EnvironmentObject var userController: UserController
//    @EnvironmentObject var homeController: HomeController
//    @EnvironmentObject var examController: ExamController
//    @EnvironmentObject var examAnswerController: ExamAnswerController
//
//    @EnvironmentObject var subscriptionController: SubscriptionController
//    
//    // TODO: move these into user controller rather than local on this view
//    @State var isCourseLiked: Bool = false
//    @State private var isChannelFollowed = false
//    
//    @State private var shouldPopCourseFromStackOnDissapear: Bool = true
//    @State private var shouldAddCourseToStack: Bool = true
//    
//    @State private var isUpgradeAccountSheetShowing: Bool = false
//    @State private var isSignInSheetShowing: Bool = false
//    
//    var body: some View {
//        Group {
//            if let course = courseController.focusedCourse, let courseId = course.id, let channelId = course.channelId, let courseTitle = course.courseTitle,  let courseDescription = course.courseDescription, let numLecturesInCourse = course.numLecturesInCourse, let watchTimeInHrs = course.watchTimeInHrs, let aggregateViews = course.aggregateViews {
//                VStack {
//                    ScrollView(showsIndicators: false) {
////                        if let courseImage = courseController.courseThumbnails[courseId] {
////                            ZStack(alignment: .bottomLeading) {
////                                Image(uiImage: courseImage)
////                                    .resizable()
////                                    .frame(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.4)
////                                
////                            }
////                            .frame(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.4)
////                            .shadow(radius: 2.5)
////                        }
//                        VStack(spacing: 5) {
//                            // Course Cover Image
//                           
//                            
//                            
//                            HStack {
//                                // Course title and University
//                                VStack {
//                                    Text(courseTitle)
//                                        .font(.system(size: 18, design: .serif))
//                                        .frame(maxWidth: .infinity, alignment: .leading)
//                                }
//                                
//
//                                // Like Course Button
//                                Button(action: {
//                                    // if the user isn't a PRO member, they can't like courses
//                                    if subscriptionController.isPro {
//                                        if let rateLimit = rateLimiter.processWrite() {
//                                            print(rateLimit)
//                                            return
//                                        }
//                                        if let user = userController.user, let userId = user.id {
//                                            userController.likeCourse(userId: userId, courseId: courseId)
//                                            withAnimation(.spring()) {
//                                                self.isCourseLiked.toggle()
//                                            }
//                                        }
//                                        return
//                                    }
//                                    // show the upgrade account sheet
//                                    self.isUpgradeAccountSheetShowing = true
//                                }) {
//                                    Image(systemName: isCourseLiked ? "heart.fill" : "heart")
//                                        .font(.system(size: 18, design: .serif))
//                                        .foregroundStyle(isCourseLiked ? Color.red : colorScheme == .light ? Color.black : Color.white)
//                                }
//                                
//                            }
//                            
//                            // Course Info
//                            HStack {
//                                Text("\\(numLecturesInCourse) Lectures")
//                                    .font(.system(size: 12))
////                                    .font(.system(size: 12, design: .serif))
//                                    .opacity(0.6)
//                                
//                                Text("\\(watchTimeInHrs)Hr Watch Time")
//                                    .font(.system(size: 12))
////                                    .font(.system(size: 12, design: .serif))
//                                    .opacity(0.6)
//                                
//                                Text("\\(formatIntViewsToString(numViews: aggregateViews)) Views")
//                                    .font(.system(size: 12))
////                                    .font(.system(size: 12, design: .serif))
//                                    .opacity(0.6)
//                                Spacer()
//                            }
//                            
//                            // Course Categories
//                            ScrollView(.horizontal, showsIndicators: false) {
//                                HStack {
//                                    ForEach(course.categories ?? [], id: \\.self) { category in
//                                        Text(category)
//                                            .font(.system(size: 12))
//                                            .opacity(0.6)
//                                    }
//                                }
//                                
//                                Spacer()
//                            }
//                            
//                            HStack {
//                                // Play Button - links to lecture view and starts video
//                                if let lectures = courseController.lecturesInCourse[courseId] {
//                                    if lectures.count > 0 {
//                                        PlayCourseButton(shouldPopCourseFromStack: $shouldPopCourseFromStackOnDissapear, lecture: lectures[0])
//                                    } else {
//                                        SkeletonLoader(width: 50, height: 40)
//                                    }
//                                }
//                                
//                                Spacer()
//                            }
//                            .padding(.bottom, 12)
//                            
//                            
//                            
//                            // Channel Info
//                            HStack {
//                                // channel image - nav link to channel view
////                                NavigationLink(destination: ChannelView()) {
////                                    if let channelImage = courseController.channelThumbnails[channelId] {
////                                        Image(uiImage: channelImage)
////                                            .resizable()
////                                        //                                        .clipShape(RoundedRectangle(cornerRadius: 10))
////                                            .frame(width: 40, height: 40)
////                                        
////                                        if let channel = courseController.cachedChannels[channelId], let channelTitle = channel.title, let numCourses = channel.numCourses, let numLectures = channel.numLectures {
////                                            VStack {
////                                                Text(channelTitle)
////                                                    .font(.system(size: 14, design: .serif))
////                                                    .frame(maxWidth: .infinity, alignment: .leading)
////                                                
////                                                HStack {
////                                                    Text("\\(numCourses) Courses")
////                                                        .font(.system(size: 12))
//////                                                        .font(.system(size: 12, design: .serif))
////                                                        .opacity(0.6)
////                                                    
////                                                    Text("\\(numLectures) Lectures")
////                                                        .font(.system(size: 12))
//////                                                        .font(.system(size: 12, design: .serif))
////                                                        .opacity(0.6)
////                                                    
////                                                    Spacer()
////                                                }
////                                            }
////                                        }
////                                    } else {
////                                        HStack {
////                                            SkeletonLoader(width: 300, height: 40)
////                                            Spacer()
////                                        }
////                                    }
////                                }
////                                .simultaneousGesture(TapGesture().onEnded {
////                                    self.shouldPopCourseFromStackOnDissapear = false
////                                    
////                                    // try to get the channel using course.channelId
////                                    if let channel = courseController.cachedChannels[channelId] {
////                                        courseController.focusChannel(channel)
////                                    }
////                                })
////                                .buttonStyle(PlainButtonStyle())
//                                
//                                // Channel Follow Button
//                                Button(action: {
//                                    // if the user isn't a PRO member, they can't follow accounts
//                                    if subscriptionController.isPro {
//                                        if let rateLimit = rateLimiter.processWrite() {
//                                            print(rateLimit)
//                                            return
//                                        }
//                                        
//                                        if let user = userController.user, let userId = user.id {
//                                            userController.followChannel(userId: userId, channelId: channelId)
//                                            withAnimation(.spring()) {
//                                                isChannelFollowed.toggle()
//                                            }
//                                        }
//                                        return
//                                    }
//                                    
//                                    self.isUpgradeAccountSheetShowing = true
//                                }) {
//                                    HStack(spacing: 8) {
//                                        Image(systemName: isChannelFollowed ? "heart.fill" : "heart")
//                                            .font(.system(size: 14))
//                                        
//                                        Text(isChannelFollowed ? "Following" : "Follow")
//                                            .font(.system(size: 14, weight: .semibold))
//                                    }
//                                    .padding(.horizontal, 16)
//                                    .padding(.vertical, 8)
//                                    .foregroundColor(isChannelFollowed ? .white : .primary)
//                                    .background(
//                                        Capsule()
//                                            .fill(isChannelFollowed ? Color.red : Color.clear)
//                                            .overlay(
//                                                Capsule()
//                                                    .strokeBorder(isChannelFollowed ? Color.red : Color.gray, lineWidth: 1)
//                                            )
//                                    )
//                                }
//                                
//                            }
//                            .cornerRadius(5)
//                            
//                            // Course Description
//                            ExpandableText(text: courseDescription, maxLength: 150)
//                                .padding(.top, 10)
//                            
//                            
//                            // TODO: Add back resources if we are adding them to the app
//                            // Resources
////                            HStack {
////                                Text("Resources")
////                                    .font(.system(size: 14))
////                                Image(systemName: "sparkles")
////                                    .foregroundStyle(Color.blue)
////                                    .font(.system(size: 14, design: .serif))
////                                Spacer()
////                            }
////                            .padding(.top, 20)
////                            
////                            
////                            // Exam                            
////                            if let examId = course.examResourceId {
////                                if let exam = examController.cachedExams[examId] {
////                                    ResourceChip(resource: exam, shouldPopFromStack: $shouldPopCourseFromStackOnDissapear)
////                                        .padding(.bottom, 2)
////                                } else {
////                                    HStack {
////                                        SkeletonLoader(width: 300, height: 40)
////                                        Spacer()
////                                    }
////                                }
////                            }
////                            
////                            // Exam Answers
////                            if let examAnswerId = course.examAnswersResourceId {
////                                if let examAnswer = examAnswerController.cachedExamAnswers[examAnswerId] {
////                                    ResourceChip(resource: examAnswer, shouldPopFromStack: $shouldPopCourseFromStackOnDissapear)
////                                } else {
////                                    HStack {
////                                        SkeletonLoader(width: 300, height: 40)
////                                        Spacer()
////                                    }
////                                }
////                            }
//                            
//                            // Lectures In Course
//                            VStack {
//                                HStack {
//                                    Text("Lectures In")
//                                        .font(.system(size: 14))
////                                        .font(.system(size: 14, design: .serif))
//                                        .bold()
//                                    
//                                    Text(course.courseTitle ?? "Title")
//                                        .font(.system(size: 14, design: .serif))
//                                        .lineLimit(1)
//                                        .truncationMode(.tail)
//                                    
//                                    Spacer()
//                                }
//                                
//                                Group {
//                                    if let lectures = courseController.lecturesInCourse[courseId] {
//                                        ScrollView(showsIndicators: false) {
//                                            ForEach(lectures, id: \\.id) { lecture in
//                                                NavigationLink(destination: LectureView()) {
//                                                    LectureInCourseModule(lecture: lecture)
//                                                        
//                                                }
//                                                .buttonStyle(PlainButtonStyle())
//                                                .simultaneousGesture(TapGesture().onEnded {
//                                                    shouldPopCourseFromStackOnDissapear = false
//                                                    // focus the lecture
//                                                    courseController.focusLecture(lecture)
//                                                })
////                                                .padding(2)
//                                            }
//                                            
//                                            
//                                            if let lectureIds = course.lectureIds {
//                                                if courseController.lecturesInCoursePrefixPaginationNumber < lectureIds.count {
//                                                    Button(action: {
//                                                        courseController.lecturesInCoursePrefixPaginationNumber += 8
//                                                        
//                                                        courseController.retrieveLecturesInCourse(courseId: courseId, lectureIds: lectureIds, isFetchingMore: true)
//                                                        
//                                                    }) {
//                                                        Text("Fetch More")
//                                                            .font(.system(size: 10))
//                                                            .opacity(0.8)
//                                                    }
//                                                    .padding(.top, 5)
//                                                    .padding(.bottom, 10)
//                                                }
//                                            }
//                                            
//                                        }
//                                        .frame(maxHeight: 300)  // Added maxHeight
////                                        .overlay(
////                                            RoundedRectangle(cornerRadius: 8)
////                                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
////                                        )
//                                    } else {
//                                        HStack {
//                                            SkeletonLoader(width: 300, height: 40)
//                                            Spacer()
//                                        }
//                                    }
//                                }
//                            }
//                            .padding(.top, 20)
//                            .padding(.bottom, 50)
//                            
//                            
//                            Divider()
//                                .padding(.bottom, 20)
//                            
//                            
//                            // Related Courses
//                            RelatedCourses()
//                            
//                            BottomBrandView()
//                        }
//                        .padding(.horizontal, 20)
//                    }
//                }
//                .sheet(isPresented: $isSignInSheetShowing) {
//                    FirstOpenSignUpSheet(text: "Sign In", displaySheet: $isSignInSheetShowing)
//                        .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
//                }
//                .sheet(isPresented: $isUpgradeAccountSheetShowing) {
//                    UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
//                }
//                .onAppear {
//                    // check if the user follows the course's channel and set the button accordingly
//                    if let user = userController.user, let followedChannelIds = user.followedChannelIds {
//                        if followedChannelIds.contains(channelId) {
//                            self.isChannelFollowed = true
//                        }
//                    }
//                    
//                    // same if the user likes the course
//                    if let user = userController.user, let likedCourseIds = user.likedCourseIds {
//                        if likedCourseIds.contains(courseId) {
//                            self.isCourseLiked = true
//                        }
//                    }
//                    
//                    // get the lectures in this course
//                    if let lectureIds = course.lectureIds {
//                        print("retrieving lectures in course gang")
//                        courseController.retrieveLecturesInCourse(courseId: courseId, lectureIds: lectureIds, isFetchingMore: false)
//                    } else {
//                        print("lecture ids not ready on a new focused course?")
//                    }
//                    
//                    if self.shouldAddCourseToStack {
//                        // add the newly focused course to the stack
//                        
//                        // MAKE SURE we aren't navigating back and the course was already focused and already in the stack
//                        if courseController.focusedCourseStack.last != course {
//                            print("appending to focus stack")
//                            courseController.focusedCourseStack.append(course)
//                        }
//                    }
//                }
//                .onDisappear {
//                    if self.shouldPopCourseFromStackOnDissapear {
//                        print("course view is dissapearing, we're going to pop the course stack")
//                        
//                        // remove the top of the focused lecture stack, for backwards navigation
//                        if let _ = courseController.focusedCourseStack.popLast() {
////                            print("")
//                        }
//                        
//                        // also set the focused lecture to nil
//                        courseController.focusedCourse = nil
//                    } else {
//                        print("course is dissapearing, but we're not popping it")
//                        
//                        // set the var back to true, it's default state - so if you return via nav stack, the propper behavior occurs
//                        // set the var back to false if returning to the view
//                        self.shouldPopCourseFromStackOnDissapear = true
//                    }
//                }
//            } else {
//                ErrorLoadingView()
//            }
//        }
//        .onAppear {
//            print("ON APPEAR - num things in the course stack: \\(courseController.focusedCourseStack.count)")
//            if courseController.focusedCourse == nil {
//                print("course not focused yet, we'll try to focus the top of the stack")
//                // if there's not a focused lecture, try to focus the top of the stack
//                
//                if let topCourse = courseController.focusedCourseStack.last {
//                    courseController.focusCourse(topCourse)
//                    // since the lecture was already in the stack, the resources should be cached
//                    self.shouldAddCourseToStack = false
//                }
//            }
//        }
//        .onDisappear {
//            print("ON DISAPPEAR - num things in the course stack: \\(courseController.focusedCourseStack.count)")
//        }
//    }
//    
//    func formatIntViewsToString(numViews: Int) -> String {
//        switch numViews {
//            case 0..<1_000:
//                return String(numViews)
//            case 1_000..<1_000_000:
//                let thousands = Double(numViews) / 1_000.0
//                return String(format: "%.0fk", thousands)
//            case 1_000_000...:
//                let millions = Double(numViews) / 1_000_000.0
//                return String(format: "%.0fM", millions)
//            default:
//                return "0"
//            }
//    }
//}
//
//
//
//#Preview {
//    CourseView()
//        .environmentObject(HomeController())
//        .environmentObject(ExamController())
//        .environmentObject(ExamAnswerController())
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LectureViews',
                                        path: 'Lectures/Views/Home/OLD/LectureViews',
                                        type: 'directory',
                                        children: [
                                            {
                                                name: 'LectureView.swift',
                                                path: 'Lectures/Views/Home/OLD/LectureViews/LectureView.swift',
                                                type: 'file',
                                                content: `////
////  LectureView.swift
////  Lectures
////
////  Created by Ben Dreyer on 12/19/24.
////
//
//import SwiftUI
//import YouTubePlayerKit
//
//struct LectureView: View {
//    @Environment(\\.colorScheme) var colorScheme
//    @Environment(\\.presentationMode) var presentationMode
//    
//    @EnvironmentObject var rateLimiter: RateLimiter
//    
//    @EnvironmentObject var courseController: CourseController
//    @EnvironmentObject var userController: UserController
//    @EnvironmentObject var homeController: HomeController
//    @EnvironmentObject var myCourseController: MyCourseController
//    
//    @EnvironmentObject var subscriptionController: SubscriptionController
//    
//    // resource controllers
//    @EnvironmentObject var notesController: NotesController
//    @EnvironmentObject var homeworkController: HomeworkController
//    @EnvironmentObject var homeworkAnswersController: HomeworkAnswersController
//    
//    // YT player - local to each lecture view
//    @StateObject public var player: YouTubePlayer = ""
//    
//    @State var isLectureLiked: Bool = false
//    
//    // tracking if we're leaving lecture view in forward or backward navigation
//    @State var shouldPopLectureFromStackOnDissapear: Bool = true
//    @State var shouldAddLectureToStack: Bool = true
//    
//    @State private var isUpgradeAccountSheetShowing: Bool = false
//    
//    var body: some View {
//        Group {
//            if let lecture = courseController.focusedLecture, let lectureId = lecture.id, let courseId = lecture.courseId, let professorName = lecture.professorName, let channelId = lecture.channelId, let viewsOnYouTube = lecture.viewsOnYouTube, let datePostedonYoutube = lecture.datePostedonYoutube, let lectureDescription = lecture.lectureDescription {
//                VStack {
//                    // YouTubePlayer (starts video on page load)
//                    ZStack(alignment: .bottomLeading) {
//                        
//                        // make sure the youtube url is attatched to this lecture
//                        YouTubePlayerView(self.player) { state in
//                                // Overlay ViewBuilder closure to place an overlay View
//                                // for the current \`YouTubePlayer.State\`
//                                switch state {
//                                case .idle:
//                                    ProgressView()
////                                    SkeletonLoader(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.6)
//                                case .ready:
//                                    EmptyView()
//                                case .error(let error):
//                                    Text(verbatim: "YouTube player couldn't be loaded: \\(error)")
//                                }
//                            }
//                            .frame(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.6)
//                            .onChange(of: player.source) {
//                                print("yt player source changed?")
//                            }
//                        
//                    }
//                    .frame(width: UIScreen.main.bounds.width * 1, height: UIScreen.main.bounds.width * 0.6)
//                    .shadow(radius: 2.5)
//                    
//                    
//                    Spacer()
//                    
//                    // Course Indicator & Lecture Picker
//                    ScrollView() {
//                        VStack(alignment: .leading) {
//                            HStack {
//                                Text(lecture.lectureTitle ?? "Title Not Found")
//                                    .font(.system(size: 18, design: .serif))
//                                    .frame(maxWidth: .infinity, alignment: .leading)
//                                
//                                // Like Lecture button
//                                Button(action: {
//                                    if subscriptionController.isPro {
//                                        if let user = userController.user, let userId = user.id {
//                                            if let rateLimit = rateLimiter.processWrite() {
//                                                print(rateLimit)
//                                                return
//                                            }
//                                            
//                                            userController.likeLecture(userId: userId, lectureId: lectureId)
//                                            withAnimation(.spring()) {
//                                                self.isLectureLiked.toggle()
//                                            }
//                                        }
//                                        return
//                                    }
//
//                                    self.isUpgradeAccountSheetShowing = true
//                                }) {
//                                    Image(systemName: isLectureLiked ? "heart.fill" : "heart")
//                                        .font(.system(size: 18, design: .serif))
//                                        .foregroundStyle(isLectureLiked ? Color.red : colorScheme == .light ? Color.black : Color.white)
//                                }
//                            }
//                            
//                            // Professor if avaialble
//                            Text(professorName)
//                                .font(.system(size: 14, design: .serif))
//                                .opacity(0.8)
//                            
//                            HStack {
//                                Text("\\(formatIntViewsToString(numViews: viewsOnYouTube)) Views")
//                                    .font(.system(size: 12))
////                                    .font(.system(size: 12, design: .serif))
//                                    .opacity(0.8)
//                                
//                                Text(datePostedonYoutube)
//                                    .font(.system(size: 12))
////                                    .font(.system(size: 12, design: .serif))
//                                    .opacity(0.8)
//                            }
//                            
//                            // Course Publisher
//                            HStack {
//                                // TODO: Channel thumbnail
//                                // Profile Picture
//                                // channel image - nav link to channel view
////                                NavigationLink(destination: ChannelView()) {
////                                    if let channelImage = courseController.channelThumbnails[channelId] {
////                                        Image(uiImage: channelImage)
////                                            .resizable()
////                                        //                                        .clipShape(RoundedRectangle(cornerRadius: 10))
////                                            .frame(width: 40, height: 40)
////                                    } else {
////                                        Image("stanford")
////                                            .resizable()
////                                        //                                        .clipShape(RoundedRectangle(cornerRadius: 10))
////                                            .frame(width: 40, height: 40)
////                                    }
////                                }
////                                .simultaneousGesture(TapGesture().onEnded {
////                                    // we're leaving to channel view, so set var to not pop lecture from stack
////                                    self.shouldPopLectureFromStackOnDissapear = false
////                                    
////                                    // focus a channel
////                                    if let channel = courseController.cachedChannels[channelId] {
////                                        courseController.focusChannel(channel)
////                                        
////                                        
////                                    }
////                                })
////                                .buttonStyle(PlainButtonStyle())
//                                
//                                
//                                VStack {
//                                    HStack {
//                                        // channel image - nav link to channel view
////                                        NavigationLink(destination: ChannelView()) {
////                                            Text(lecture.channelName ?? "Channel Not Found")
////                                                .font(.system(size: 12, design: .serif))
////                                                .frame(maxWidth: .infinity, alignment: .leading)
////                                        }
////                                        .simultaneousGesture(TapGesture().onEnded {
////                                            // we're leaving to channel view, so set var to not pop lecture from stack
////                                            self.shouldPopLectureFromStackOnDissapear = false
////                                            
////                                            // focus a channel
////                                            if let channel = courseController.cachedChannels[channelId] {
////                                                courseController.focusChannel(channel)
////                                            }
////                                        })
////                                        .buttonStyle(PlainButtonStyle())
//                                        
//                                        Spacer()
//                                        
//                                        // TODO: add back channel stats
//                                        if let course = courseController.cachedCourses[courseId] {
//                                            if let channel = courseController.cachedChannels[channelId], let numCourses = channel.numCourses, let numLectures = channel.numLectures {
//                                                // TODO: Channel stats
//                                                Text("\\(numCourses) Courses | \\(numLectures) Lectures")
//                                                    .font(.system(size: 12))
////                                                    .font(.system(size: 12, design: .serif))
//                                                    .opacity(0.7)
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                            .cornerRadius(5)
//                            .padding(.top, 5)
//                            
//                            
//                            
//                            // Lecture Description
//                            ExpandableText(text: lectureDescription, maxLength: 150)
//                                .padding(.top, 10)
//                            
//                            
//                            HStack {
//                                Text("Notes")
//                                    .font(.system(size: 14))
////                                    .font(.system(size: 14, design: .serif))
//                                Image(systemName: "sparkles")
//                                    .foregroundStyle(Color.blue)
//                                    .font(.system(size: 14, design: .serif))
//                                Spacer()
//                            }
//                            .padding(.top, 20)
//                            
//                            // Notes
//                            if let noteId = lecture.notesResourceId {
//                                if let note = notesController.cachedNotes[noteId] {
//                                    ResourceChip(resource: note, shouldPopFromStack: $shouldPopLectureFromStackOnDissapear)
//                                        .padding(.bottom, 2)
//                                } else {
//                                    HStack {
//                                        SkeletonLoader(width: 300, height: 40)
//                                        Spacer()
//                                    }
//                                }
//                            }
//                            
//                            
////                            // Homework Assignment
////                            if let homeworkId = lecture.homeworkResourceId {
////                                if let homework = homeworkController.cachedHomeworks[homeworkId] {
////                                    ResourceChip(resource: homework, shouldPopFromStack: $shouldPopLectureFromStackOnDissapear)
////                                        .padding(.bottom, 2)
////                                } else {
////                                    HStack {
////                                        SkeletonLoader(width: 300, height: 40)
////                                        Spacer()
////                                    }
////                                }
////                            }
////                            
////                            // Homework Assignment
////                            if let homeworkAnswerId = lecture.homeworkAnswersResourceId {
////                                if let homeworkAnswer = homeworkAnswersController.cachedHomeworkAnswers[homeworkAnswerId] {
////                                    ResourceChip(resource: homeworkAnswer, shouldPopFromStack: $shouldPopLectureFromStackOnDissapear)
////                                        .padding(.bottom, 2)
////                                } else {
////                                    HStack {
////                                        SkeletonLoader(width: 300, height: 40)
////                                        Spacer()
////                                    }
////                                }
////                            }
//                            
//                            // Play on youtube button
//                            if let url = lecture.youtubeVideoUrl {
//                                WatchOnYouTubeButton(videoUrl: url)
//                            }
//                            
//                            
//                            
//                            // Next Lessons
//                            MoreLecturesInSameCourseModule(player: player)
//                                .padding(.top, 20)
//                        }
//                        .padding(.top, 5)
//                        .padding(.horizontal, 20)
//                        
//                        Divider()
//                        
//                        BottomBrandView()
//                    }
//                }
//                .sheet(isPresented: $isUpgradeAccountSheetShowing) {
//                    UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountSheetShowing)
//                }
//                .onAppear {
//                    // we need to fetch a separate list of lectures in this same course. this is becaus the user may be watching lecture 35, and that may not match up with what we retrieved for dispalying on course view, which is stored in lecturesInCourse. instead, we write and read from lecturesInSameCourse
//                    if let course = courseController.cachedCourses[courseId], let courseId = course.id, let lectureIds = course.lectureIds {
//                        
//                        if let lectureNum = lecture.lectureNumberInCourse {
//                            courseController.retrievLecturesInSameCourse(courseId: courseId, lectureIds: lectureIds, currentLectureNum: lectureNum)
//                        }
//                    }
//                    
//                    
//                    // if the user already likes this lecture, change the heart view to red
//                    if let user = userController.user, let likedLectureIds = user.likedLectureIds {
//                        if likedLectureIds.contains(lectureId) {
//                            self.isLectureLiked = true
//                        }
//                    }
//                    
//                    // get the resource info
//                    
//                    // notes
//                    if let noteId = lecture.notesResourceId {
//                        notesController.retrieveNote(noteId: noteId)
//                    } else {
//                        print("lecture didn't have an notes Id")
//                    }
//                    
//                    // homework
////                    if let homeworkId = lecture.homeworkResourceId {
////                        homeworkController.retrieveHomework(homeworkId: homeworkId)
////                    } else {
////                        print("lecture didn't have an homework Id")
////                    }
////                    
////                    // homework answers
////                    if let homeworkAnswersId = lecture.homeworkAnswersResourceId {
////                        homeworkAnswersController.retrieveHomeworkAnswer(homeworkAnswerId: homeworkAnswersId)
////                    } else {
////                        print("course didn't have an exam Id")
////                    }
//                    
//                    if self.shouldAddLectureToStack {
//                        
//                        if courseController.focusedLectureStack.last != lecture {    
//                            // add the newly focused lecture to the stack
//                            courseController.focusedLectureStack.append(lecture)
//                            
//                            // save a new watch history state
//                            if let user = userController.user, let userId = user.id {
//                                // only if the user is PRO member
//                                if user.accountType == 1 {
//                                    // we should make sure we have the course somewhere, if we don't have the course what do we do?? Theres a case where lecture view can appear without first focusing a course
//                                    if let course = courseController.cachedCourses[courseId] {
//                                        // TODO: add a rate limit
//                                        myCourseController.updateWatchHistory(userId: userId, course: course, lecture: lecture)
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//                .onDisappear {
//                    if self.shouldPopLectureFromStackOnDissapear {
//                        print("lecture view is dissapearing, we're going to pop the lecture stack")
//                        
//                        // remove the top of the focused lecture stack, for backwards navigation
//                        if let poppedLecture = courseController.focusedLectureStack.popLast() {
//                            //                            print("")
//                        }
//                        
//                        // also set the focused lecture to nil
//                        courseController.focusedLecture = nil
//                    } else {
//                        print("lecture is dissapearing, but we're not popping it")
//                        
//                        self.shouldPopLectureFromStackOnDissapear = true
//                    }
//                }
//            } else {
//                ErrorLoadingView()
//            }
//        }
//        .onAppear {
//            // TODO: how can we speed this up?
//            if let lecture = courseController.focusedLecture, let youtubeVideoUrl = lecture.youtubeVideoUrl {
//                // load the youtube video
//                self.player.source = .url(youtubeVideoUrl)
//            }
//            
//            
//            if courseController.focusedLecture == nil {
//                print("lecture not focused yet, we'll try to focus the top of the stack")
//                // if there's not a focused lecture, try to focus the top of the stack
//                
//                if let topLecture = courseController.focusedLectureStack.last {
//                    courseController.focusLecture(topLecture)
//                    // since the lecture was already in the stack, the resources should be cached
//                    
//                    // change the YT player source
//                    self.player.source = .url(topLecture.youtubeVideoUrl ?? "")
//                    
//                    
//                    self.shouldAddLectureToStack = false
//                }
//            }
//        }
//        .navigationBarBackButtonHidden(true)
//        .navigationBarItems(leading: Button(action: {
//            self.presentationMode.wrappedValue.dismiss()
//        }) {
//            HStack {
//                Image(systemName: "chevron.left")
//                    .bold()
//                Text("Back")
//            }
//        })
//    }
//    
//    func formatIntViewsToString(numViews: Int) -> String {
//        switch numViews {
//            case 0..<1_000:
//                return String(numViews)
//            case 1_000..<1_000_000:
//                let thousands = Double(numViews) / 1_000.0
//                return String(format: "%.0fk", thousands)
//            case 1_000_000...:
//                let millions = Double(numViews) / 1_000_000.0
//                return String(format: "%.0fM", millions)
//            default:
//                return "0"
//            }
//    }
//}
//
//#Preview {
//    LectureView()
//        .environmentObject(NotesController())
//        .environmentObject(MyCourseController())
//}
`,
                                                language: 'plaintext'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'ResourceChip.swift',
                                path: 'Lectures/Views/Home/ResourceChip.swift',
                                type: 'file',
                                content: `//
//  ResourceChip.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/3/25.
//

import SwiftUI

struct ResourceChip: View {
    var resource: Resource
    
    var exampleText: String = """
# Header 1\\n## Header 2\\n### Header 3
"""

    
//    @Binding var shouldPopFromStack: Bool
    var body: some View {
        HStack {
            
//            NavigationLink(destination: ResourceView(resource: resource)) {
            NavigationLink(destination: ResourceNativeView(resourceType: resource.resourceType ?? 0, resourceTitle: resource.title ?? "", resourceContent: resource.content ?? "")) {
                // Main content container
                HStack(spacing: 5) {
                    Image(systemName: "doc.fill")
                        .font(.system(size: 16, design: .serif))
                        .foregroundStyle(Color.blue.opacity(0.8))
                    
                    Text(resource.title?.prefix(50) ?? "")
                        .font(.system(size: 12, design: .serif))
                        .opacity(0.9)
                        .lineLimit(1)
                        .underline(color: .gray)
                }
//                .padding(.horizontal, 10)
                .padding(.vertical, 5)
                // Background and border styling
//                .background(
//                    RoundedRectangle(cornerRadius: 20)
//                        .strokeBorder(
//                            LinearGradient(
//                                colors: [.red, .orange, .yellow, .green, .blue, .purple],
//                                startPoint: .topLeading,
//                                endPoint: .bottomTrailing
//                            ).opacity(0.6),
//                            lineWidth: 1
//                        )
//                )
            }
            .buttonStyle(PlainButtonStyle())
            
            Spacer()
        }
    }
}

//#Preview {
//    ResourceChip(resource: Resource(title: "Exam - 1. Introduction to 'The Society of Mind'"), shouldPopFromStack: .constant(false))
//}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'LoadingViews',
                        path: 'Lectures/Views/LoadingViews',
                        type: 'directory',
                        children: [
                            {
                                name: 'ErrorLoadingView.swift',
                                path: 'Lectures/Views/LoadingViews/ErrorLoadingView.swift',
                                type: 'file',
                                content: `//
//  ErrorLoadingView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/26/25.
//

import SwiftUI

struct ErrorLoadingView: View {
    var body: some View {
        VStack(spacing: 24) {
            // Graphic
            ZStack {
                // Base Circle
                Circle()
                    .fill(Color.blue.opacity(0.1))
                    .frame(width: 150, height: 150)
                
                // Sad Face
                VStack(spacing: 8) {
                    // Eyes
                    HStack(spacing: 20) {
                        Circle()
                            .fill(Color.blue)
                            .frame(width: 12, height: 12)
                        Circle()
                            .fill(Color.blue)
                            .frame(width: 12, height: 12)
                    }
                    // Mouth
                    Path { path in
                        path.move(to: CGPoint(x: 40, y: 20))
                        path.addArc(
                            center: CGPoint(x: 40, y: 30),
                            radius: 20,
                            startAngle: Angle(degrees: 0),
                            endAngle: Angle(degrees: 180),
                            clockwise: true
                        )
                    }
                    .stroke(Color.blue, lineWidth: 2)
                    .frame(width: 80, height: 40)
                }
            }
            
            // Message
            Text("Oops! We couldn’t display this page.")
                .font(.title3)
                .fontWeight(.semibold)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)
            
            Text("Please check your internet connection or try again later.")
                .font(.body)
                .foregroundColor(.gray)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(UIColor.systemBackground).edgesIgnoringSafeArea(.all))
    }
}

#Preview {
    ErrorLoadingView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'HomeLoadingView.swift',
                                path: 'Lectures/Views/LoadingViews/HomeLoadingView.swift',
                                type: 'file',
                                content: `//
//  HomeLoadingView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/8/25.
//

import SwiftUI

struct HomeLoadingView: View {
    var body: some View {
        VStack {
            // Categories
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Channels
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                    
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Communtiy favorites
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Popular lectures
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
        }
    }
}

#Preview {
    HomeLoadingView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'LoaderPreview.swift',
                                path: 'Lectures/Views/LoadingViews/LoaderPreview.swift',
                                type: 'file',
                                content: `//
//  LoaderPreview.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/7/25.
//

import SwiftUI

struct LoaderPreview: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header skeleton
            SkeletonLoader(width: 300, height: 40)
            
            // Text line skeletons
            ForEach(0..<3) { _ in
                SkeletonLoader(width: 250, height: 20)
            }
            
            // Image placeholder skeleton
            SkeletonLoader(width: 200, height: 200)
        }
        .padding()
    }
}

#Preview {
    LoaderPreview()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'MyCoursesLoadingView.swift',
                                path: 'Lectures/Views/LoadingViews/MyCoursesLoadingView.swift',
                                type: 'file',
                                content: `//
//  MyCoursesLoadingView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct MyCoursesLoadingView: View {
    var body: some View {
        VStack {
            // Course History
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Channels
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                    
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Communtiy favorites
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
            
            // Popular lectures
            HStack {
                SkeletonLoader(width: 250, height: 20)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                    
                    
                    SkeletonLoader(width: UIScreen.main.bounds.width * 0.6, height: 150)
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
        }
    }
}

#Preview {
    MyCoursesLoadingView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SearchLoadingView.swift',
                                path: 'Lectures/Views/LoadingViews/SearchLoadingView.swift',
                                type: 'file',
                                content: `//
//  SearchLoadingView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct SearchLoadingView: View {
    var body: some View {
        VStack {
            // Channels
            HStack {
                SkeletonLoader(width: 250, height: 10)
                    .padding(.top, 10)
                
                Spacer()
            }
            
            ScrollView(.horizontal) {
                HStack {
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                    
                    VStack {
                        SkeletonLoader(width: 200, height: 50)
                        
                        
                        SkeletonLoader(width: 200, height: 50)
                    }
                }
                
            }
            .padding(.top, 2)
            .scrollDisabled(true)
        }
        
        // Courses
        HStack {
            SkeletonLoader(width: 250, height: 10)
                .padding(.top, 10)
            
            Spacer()
        }
        
        ScrollView(.horizontal) {
            VStack {
                
                SkeletonLoader(width: 120, height: 67.5)
                
                
                SkeletonLoader(width: 120, height: 67.5)
            }
            
        }
        .padding(.top, 2)
        .scrollDisabled(true)
        
        // Lectures
        HStack {
            SkeletonLoader(width: 250, height: 10)
                .padding(.top, 10)
            
            Spacer()
        }
        
        ScrollView(.horizontal) {
            VStack {
                
                SkeletonLoader(width: 120, height: 67.5)
                
                
                SkeletonLoader(width: 120, height: 67.5)
            }
            
        }
        .padding(.top, 2)
        .scrollDisabled(true)
    }
}

#Preview {
    SearchLoadingView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SkeletonLoader.swift',
                                path: 'Lectures/Views/LoadingViews/SkeletonLoader.swift',
                                type: 'file',
                                content: `//
//  SkeletonLoaders.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/7/25.
//

import SwiftUI

struct SkeletonLoader: View {
    @State private var isAnimating = false
    
    var width: CGFloat
    var height: CGFloat
    
    init(width: CGFloat = 200, height: CGFloat = 20) {
        self.width = width
        self.height = height
    }
    
    var body: some View {
        ZStack {
            Rectangle()
                .fill(Color.gray.opacity(0.1))
                .frame(width: width, height: height)
                .cornerRadius(8)
            
            // Shimmer effect
            Rectangle()
                .fill(
                    LinearGradient(
                        gradient: Gradient(stops: [
                            .init(color: .clear, location: 0),
                            .init(color: .white.opacity(0.4), location: 0.3),
                            .init(color: .white.opacity(0.4), location: 0.7),
                            .init(color: .clear, location: 1)
                        ]),
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .frame(width: width * 0.8) // Make gradient width smaller for smoother animation
                .offset(x: isAnimating ? width : -width)
                .animation(
                    Animation.linear(duration: 1.2)
                        .repeatForever(autoreverses: false),
                    value: isAnimating
                )
        }
        .onAppear {
            isAnimating = true
        }
        .clipped()
    }
}

#Preview {
    SkeletonLoader()
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'MyCourses',
                        path: 'Lectures/Views/MyCourses',
                        type: 'directory',
                        children: [
                            {
                                name: 'MyCoursesMainView.swift',
                                path: 'Lectures/Views/MyCourses/MyCoursesMainView.swift',
                                type: 'file',
                                content: `//
//  MyCoursesMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/18/24.
//

import FirebaseAuth
import SwiftUI

struct MyCoursesMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    //    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    @State var signUpSheetShowing: Bool = false
    @State var upgradeAccountSheetShowing: Bool = false
    var body: some View {
        if !isSignedIn {
            VStack {
                TopBrandView()
                    .padding(.horizontal, 20)
                
                VStack(spacing: 16) {
                    Image(systemName: "person.crop.circle.fill")
                        .font(.system(size: 30))
                        .foregroundColor(.gray.opacity(0.3))
                        .padding(.top, 40)
                    
                    Text("Logged in users have access to course history and more")
                        .font(.system(size: 13, design: .serif))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)

                    Button(action: {
                        signUpSheetShowing = true
                    }) {
                        Text("Sign Up / Sign In")
                            .font(.system(size: 14))
                            .foregroundColor(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(Color.blue)
                            .cornerRadius(20)
                    }
                    .sheet(isPresented: $signUpSheetShowing) {
                        ProAccountButNotSignedInSheet(displaySheet: $signUpSheetShowing)
                    }
                }
                .padding(.top, 40)
                
                // SignInWithApple(displaySignInSheet: .constant(false))
                
                // SignInWithGoogle(displaySignInSheet: .constant(false))
                    
                Spacer()
            }
        } else {
            NavigationView {
                VStack {
                    TopBrandView()
                    
                    ScrollView(showsIndicators: false) {
                        
                        MyCoursesProUserView()
                        
                        
                        Spacer()
                        
                        BottomBrandView()
                    }
                }
                .navigationBarHidden(true)
                .padding(.horizontal, 20)
            }
            // Needed for iPad compliance
            .navigationViewStyle(StackNavigationViewStyle())
        }
    }
}

#Preview {
    MyCoursesMainView()
        .environmentObject(UserController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'MyCoursesModules',
                                path: 'Lectures/Views/MyCourses/MyCoursesModules',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'CourseHistory.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/CourseHistory.swift',
                                        type: 'file',
                                        content: `//
//  CourseHistory.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct CourseHistory: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    
    
    // list local to the view so navigation won't abrutpy change when the list on the controller is updated
    @State var localWatchHistories: [WatchHistory] = []
    var body: some View {
        Group {
            // Coure History (preview)
            HStack {
                Image(systemName: "play.circle")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Course History")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    ForEach(localWatchHistories, id: \\.id) { watchHistory in
                        if let watchHistoryCourseId = watchHistory.courseId {
                            if let course = courseController.cachedCourses[watchHistoryCourseId] {
                                
                                
                                if let lectureId = watchHistory.lectureId, let lectureNumberInCourse = watchHistory.lectureNumberInCourse {
                                    NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                        WatchedCourseCard(course: course, watchHistory: watchHistory)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .simultaneousGesture(TapGesture().onEnded {
                                        courseController.focusCourse(course)
                                    })
                                }
                            } else {
                                SkeletonLoader(width: 400 * 0.6, height: 150)
                            }
                        }
                    }
                }
            }
            
            HStack {
                NavigationLink(destination: FullCourseHistory()) {
                    Text("View All")
                        .font(.system(size: 10))
                }
                .buttonStyle(PlainButtonStyle())
                
                Spacer()
            }
        }
        .onAppear {
            self.localWatchHistories = myCourseController.watchHistories
        }
    }
}

#Preview {
    CourseHistory()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FollowedChannels.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/FollowedChannels.swift',
                                        type: 'file',
                                        content: `//
//  FollowedChannels.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct FollowedChannels: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    @State private var followedChannelIds: [String] = []
    
    var body: some View {
        Group {
            // Followed Channels
            HStack {
                Image(systemName: "graduationcap")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Channels You Follow")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: 16) {
                    let groupedUniversities = stride(from: 0, to: followedChannelIds.count, by: 2).map { index in
                        Array(followedChannelIds[index..<min(index + 2, followedChannelIds.count)])
                    }
                    
                    ForEach(groupedUniversities.indices, id: \\.self) { groupIndex in
                        let group = groupedUniversities[groupIndex]
                        VStack(spacing: 16) {
                            ForEach(group, id: \\.self) { channelId in
                                if let channel = courseController.cachedChannels[channelId] {
                                    NavigationLink(destination: ChannelView(channel: channel)) {
                                        ChannelCard(channel: channel)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .simultaneousGesture(TapGesture().onEnded {
                                        courseController.focusChannel(channel)
                                    })
                                }
                            }
                        }
                        .padding(.trailing, 10)
                    }
                }
            }
            
            
            
//            ScrollView(.horizontal, showsIndicators: false) {
//                HStack {
//                    ForEach(followedChannelIds, id: \\.self) { channelId in
//                        if let channel = courseController.cachedChannels[channelId] {
//                            NavigationLink(destination: ChannelView(channel: channel)) {
//                                ChannelCard(channel: channel)
//                            }
//                            .buttonStyle(PlainButtonStyle())
//                            .simultaneousGesture(TapGesture().onEnded {
//                                courseController.focusChannel(channel)
//                            })
//                        }
//                    }
//                }
//            }
            
            
            HStack {
                NavigationLink(destination: FullFollowedChannels()) {
                    Text("View All")
                        .font(.system(size: 10))
                }
                .buttonStyle(PlainButtonStyle())
                
                Spacer()
            }
            .padding(.top, 1)
        }
        .onAppear {
            if let user = userController.user {
                // Update the state variable when \`user\` changes
                DispatchQueue.main.async {
                    followedChannelIds = user.followedChannelIds ?? []
                }
            }
        }
    }
}

#Preview {
    FollowedChannels()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullCourseHistory.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/FullCourseHistory.swift',
                                        type: 'file',
                                        content: `//
//  FullCourseHistory.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct FullCourseHistory: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var userController: UserController
    
    // list local to the view so navigation won't abrutpy change when the list on the controller is updated
    @State var localWatchHistories: [WatchHistory] = []
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                HStack {
                    Text("Course History")
                        .font(.system(size: 13, design: .serif))
                        .bold()
                    
                    Spacer()
                }
                .padding(.top, 10)
                
                ForEach(localWatchHistories, id: \\.id) { watchHistory in
                    if let watchHistoryCourseId = watchHistory.courseId {
                        if let course = courseController.cachedCourses[watchHistoryCourseId] {
                            if let lectureId = watchHistory.lectureId, let lectureNumberInCourse = watchHistory.lectureNumberInCourse {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                    HStack {
                                        WatchedCourseCard(course: course, watchHistory: watchHistory)
                                        Spacer()
                                    }
                                }
                                .simultaneousGesture(TapGesture().onEnded { _ in
                                    courseController.focusCourse(course)
                                })
                            }
                        } else {
                            SkeletonLoader(width: 400 * 0.6, height: 150)
                        }
                    }
                }
                
                
                if !myCourseController.noWatchHistoriesLeftToLoad {
                    
                    FetchButton(isMore: true) {
                        // get more watch Histories
                        if let user = userController.user, let id = user.id {
                            myCourseController.getMoreWatchHistories(userId: id, courseController: courseController)
                        }
                    }
                    .padding(.top, 5)
                }
            }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 100)
        .onAppear {
            DispatchQueue.main.async {
                self.localWatchHistories = myCourseController.watchHistories
            }
        }
    }
}

#Preview {
    FullCourseHistory()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullFollowedChannels.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/FullFollowedChannels.swift',
                                        type: 'file',
                                        content: `//
//  FullFollowedChannels.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/11/25.
//

import SwiftUI

struct FullFollowedChannels: View {
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    
    @State private var followedChannelIds: [String] = []
    
    var body: some View {
        VStack {
            HStack {
                Image(systemName: "graduationcap")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Channels You Follow")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            ScrollView() {
                ForEach(followedChannelIds, id: \\.self) { channelId in
                    HStack {
                        if let channel = courseController.cachedChannels[channelId] {
                            NavigationLink(destination: ChannelView(channel: channel)) {
                                ChannelCard(channel: channel)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .simultaneousGesture(TapGesture().onEnded {
                                courseController.focusChannel(channel)
                            })
                        }
                        
                        Spacer()
                    }
                }
            }
            
            if myCourseController.currentChannelOffset < followedChannelIds.count {
                
                FetchButton(isMore: true) {
                    myCourseController.loadMoreFollowedChannels(channelIds: followedChannelIds, courseController: courseController)
                }
                .padding(.top, 6)
            }
        }
        .onAppear {
            if let user = userController.user {
                // Update the state variable when \`user\` changes
                DispatchQueue.main.async {
                    followedChannelIds = user.followedChannelIds ?? []
                }
            }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 100)
    }
}

#Preview {
    FullFollowedChannels()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullSavedCourses.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/FullSavedCourses.swift',
                                        type: 'file',
                                        content: `//
//  FullSavedCourses.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/11/25.
//

import SwiftUI

struct FullSavedCourses: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    var likedCourseIds: [String]
    var body: some View {
        VStack {
            HStack {
                Image(systemName: "mail.stack")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Saved Courses")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            ScrollView(showsIndicators: false) {
                ForEach(likedCourseIds, id: \\.self) { courseId in
                    HStack {
                        if let course = courseController.cachedCourses[courseId] {
                            if let watchHistory = myCourseController.cachedWatchHistories[courseId], let lectureNumberInCourse = watchHistory.lectureNumberInCourse, let lectureId = watchHistory.lectureId {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                    WatchedCourseCard(course: course, watchHistory: watchHistory)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .simultaneousGesture(TapGesture().onEnded {
                                    courseController.focusCourse(course)
                                })
                            } else {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                    CourseCardView(course: course)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .simultaneousGesture(TapGesture().onEnded {
                                    courseController.focusCourse(course)
                                })
                            }
                        }
                        Spacer()
                    }
                }
            }
            
            if myCourseController.currentCourseOffset < likedCourseIds.count {
                
                FetchButton(isMore: true) {
                    myCourseController.loadMoreLikedCourses(courseIds: likedCourseIds, courseController: courseController)
                }
                .padding(.top, 6)
            }
            
        }
        .padding(.bottom, 100)
        .padding(.horizontal, 20)
    }
}

//#Preview {
//    FullSavedCourses()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullSavedLectures.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/FullSavedLectures.swift',
                                        type: 'file',
                                        content: `//
//  FullSavedLectures.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/13/25.
//

import SwiftUI

struct FullSavedLectures: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    var likedLectureIds: [String]
    var body: some View {
        VStack {
            HStack {
                Image(systemName: "newspaper")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Saved Lectures")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            ScrollView(showsIndicators: false) {
                ForEach(likedLectureIds, id: \\.self) { lectureId in
                    HStack {
                        if let lecture = courseController.cachedLectures[lectureId], let lectureId = lecture.id, let courseId = lecture.courseId, let lectureNumberInCourse = lecture.lectureNumberInCourse {
                            
                            if let course = courseController.cachedCourses[courseId] {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, playingLecture: lecture, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                    LectureCardView(lecture: lecture)
                                }
                                .simultaneousGesture(TapGesture().onEnded { _ in
                                    courseController.focusCourse(course)
                                })
                            }
                        }
                        Spacer()
                    }
                }
                if myCourseController.currentLectureOffset < likedLectureIds.count {
                    
                    FetchButton(isMore: true) {
                        myCourseController.loadMoreLikedLectures(lectureIds: likedLectureIds, courseController: courseController)
                    }
                    .padding(.top, 6)
                }
                
            }
        }
        .padding(.bottom, 100)
        .padding(.horizontal, 20)
    }
}

//#Preview {
//    FullSavedLectures()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LectureCardView.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/LectureCardView.swift',
                                        type: 'file',
                                        content: `//
//  LectureCardView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct LectureCardView: View {
    @EnvironmentObject var courseController: CourseController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var lecture: Lecture
    
    var body: some View {
        Group {
            if let id = lecture.id, 
               let lectureTitle = lecture.lectureTitle, 
               let channelId = lecture.channelId, 
               let courseId = lecture.courseId {
                ZStack(alignment: .bottomLeading) {
                    if let image = courseController.courseThumbnails[courseId] {
                        Image(uiImage: image)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: cardWidth, height: cardHeight)
                            .clipped()
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    } else {
                        SkeletonLoader(width: cardWidth, height: cardHeight)
                    }
                    
                    // Add semi-transparent gradient overlay
                    LinearGradient(
                        gradient: Gradient(colors: [.clear, .black.opacity(0.85)]),
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    
                    // Play button overlay in center
                    Image(systemName: "play.circle.fill")
                        .resizable()
                        .frame(width: playButtonSize, height: playButtonSize)
                        .foregroundColor(.white)
                        .shadow(radius: 5)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .allowsHitTesting(false)
                    
                    VStack(spacing: 0) {
                        HStack {
                            VStack(alignment: .leading) {
                                HStack {
                                    Text(lectureTitle)
                                        .font(.system(size: titleFontSize, design: .serif))
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .multilineTextAlignment(.leading)
                                        .lineLimit(2)
                                        .truncationMode(.tail)
                                    Spacer()
                                }
                                
                                // Lecture Number in course
                                HStack {
                                    if let lectureNumberInCourse = lecture.lectureNumberInCourse,
                                       let courseTitle = lecture.courseTitle {
                                        Text("Lecture #\\(lectureNumberInCourse) in \\(courseTitle)")
                                            .lineLimit(1)
                                            .truncationMode(.tail)
                                            .font(.system(size: subtitleFontSize, design: .serif))
                                            .foregroundColor(.white.opacity(0.8))
                                    }
                                }
                                
                                HStack {
                                    if let channel = courseController.cachedChannels[channelId] {
                                        if let title = channel.title {
                                            Text(title)
                                                .lineLimit(1)
                                                .truncationMode(.tail)
                                                .font(.system(size: subtitleFontSize, design: .serif))
                                                .foregroundColor(.white.opacity(0.8))
                                        }
                                    }
                                    
                                    if let lectureDuration = lecture.lectureDuration {
                                        Text("\\(lectureDuration)")
                                            .lineLimit(1)
                                            .truncationMode(.tail)
                                            .font(.system(size: subtitleFontSize, design: .serif))
                                            .foregroundColor(.white.opacity(0.8))
                                    }
                                }
                            }
                            Spacer()
                        }
                        .padding(contentPadding)
                    }
                    .padding(.bottom, 1)
                }
                .frame(width: cardWidth, height: cardHeight)
            }
        }
        .onAppear {
            // We need to fetch the relevant course in case the user wants to tap this lecture and watch it
            if let courseId = lecture.courseId {
                courseController.retrieveCourse(courseId: courseId)
                courseController.getCourseThumbnail(courseId: courseId)
            }
        }
    }
    
    // Computed properties for responsive sizing
    private var cardWidth: CGFloat {
        horizontalSizeClass == .regular ? 320 : 240
    }
    
    private var cardHeight: CGFloat {
        horizontalSizeClass == .regular ? 180 : 130
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 18 : 14
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 14 : 11
    }
    
    private var contentPadding: CGFloat {
        horizontalSizeClass == .regular ? 20 : 16
    }
    
    private var playButtonSize: CGFloat {
        horizontalSizeClass == .regular ? 65 : 50
    }
}

//#Preview {
//    LectureCardView()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SavedCourses.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/SavedCourses.swift',
                                        type: 'file',
                                        content: `//
//  SavedCourses.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct SavedCourses: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    @State private var likedCourseIds: [String] = []
    @State var localWatchHistories: [WatchHistory] = []
    var body: some View {
        Group {
            HStack {
                Image(systemName: "mail.stack")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Saved Courses")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    ForEach(likedCourseIds, id: \\.self) { courseId in
                        if let course = courseController.cachedCourses[courseId] {
                            
                            
                            // check if course is watched, if it is display watched course  card
                            if self.localWatchHistories.contains(where: { $0.courseId == courseId }) {
                                if let watchHistory = myCourseController.cachedWatchHistories[courseId], let lectureNumberInCourse = watchHistory.lectureNumberInCourse, let lectureId = watchHistory.lectureId {
                                    NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                        WatchedCourseCard(course: course, watchHistory: watchHistory)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .simultaneousGesture(TapGesture().onEnded {
                                        courseController.focusCourse(course)
                                    })
                                }
                            } else {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                    CourseCardView(course: course)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .simultaneousGesture(TapGesture().onEnded {
                                    courseController.focusCourse(course)
                                })
                            }
                            
//                            if let watchHistory = myCourseController.cachedWatchHistories[courseId], let lectureNumberInCourse = watchHistory.lectureNumberInCourse, let lectureId = watchHistory.lectureId {
//                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
//                                    WatchedCourseCard(course: course, watchHistory: watchHistory)
//                                }
//                                .buttonStyle(PlainButtonStyle())
//                                .simultaneousGesture(TapGesture().onEnded {
//                                    courseController.focusCourse(course)
//                                })
//                            } else {
//                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
//                                    CourseCardView(course: course)
//                                }
//                                .buttonStyle(PlainButtonStyle())
//                                .simultaneousGesture(TapGesture().onEnded {
//                                    courseController.focusCourse(course)
//                                })
//                            }
                        }
                    }
                }
            }
            HStack {
                NavigationLink(destination: FullSavedCourses(likedCourseIds: likedCourseIds)) {
                    Text("View All")
                        .font(.system(size: 10))
                }
                .buttonStyle(PlainButtonStyle())
                
                Spacer()
            }
            .padding(.top, 1)
        }
        .onAppear {
            if let user = userController.user {
                // Update the state variable when \`user\` changes
                DispatchQueue.main.async {
                    likedCourseIds = (user.likedCourseIds ?? []).reversed()
                }
            }
            
            self.localWatchHistories = myCourseController.watchHistories
        }
    }
}

#Preview {
    SavedCourses()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SavedLectures.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/SavedLectures.swift',
                                        type: 'file',
                                        content: `//
//  SavedLectures.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct SavedLectures: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    
    @State private var likedLectureIds: [String] = []
    
    var body: some View {
        Group {
            HStack {
                Image(systemName: "newspaper")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Text("Saved Lectures")
                    .font(.system(size: 10))
                    .opacity(0.8)
                
                Spacer()
            }
            .padding(.top, 10)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    ForEach(likedLectureIds, id: \\.self) { lectureId in
                        if let lecture = courseController.cachedLectures[lectureId], let lectureId = lecture.id, let courseId = lecture.courseId, let lectureNumberInCourse = lecture.lectureNumberInCourse {
                            
                            if let course = courseController.cachedCourses[courseId] {
                                NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, playingLecture: lecture, lastWatchedLectureId: lectureId, lastWatchedLectureNumber: lectureNumberInCourse)) {
                                    LectureCardView(lecture: lecture)
                                }
                                .simultaneousGesture(TapGesture().onEnded { _ in
                                    courseController.focusCourse(course)
                                })
                            }
                        }
                    }
                }
            }
            HStack {
                NavigationLink(destination: FullSavedLectures(likedLectureIds: likedLectureIds)) {
                    Text("View All")
                        .font(.system(size: 10))
                }
                .buttonStyle(PlainButtonStyle())
//                
                Spacer()
            }
            .padding(.top, 1)
        }
        .onAppear {
            // We need to fetch the relevant course in case the user wants to tap this lecture and watch it
            if let user = userController.user {
                // Update the state variable when \`user\` changes
                DispatchQueue.main.async {
                    likedLectureIds = (user.likedLectureIds ?? []).reversed()
                }
            }
        }
    }
}

#Preview {
    SavedLectures()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'WatchedCourseCard.swift',
                                        path: 'Lectures/Views/MyCourses/MyCoursesModules/WatchedCourseCard.swift',
                                        type: 'file',
                                        content: `//
//  WatchedCourseCard.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/15/25.
//

import SwiftUI

struct WatchedCourseCard: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @Environment(\\.horizontalSizeClass) private var horizontalSizeClass
    
    var course: Course
    var watchHistory: WatchHistory
    
    private var watchProgress: CGFloat {
        if let watchHistoryLectureNumberInCourse = watchHistory.lectureNumberInCourse, 
           let courseNumLecturesInCourse = course.numLecturesInCourse {
            let progress = CGFloat(watchHistoryLectureNumberInCourse) / CGFloat(courseNumLecturesInCourse)
            return min(max(progress, 0), 1)
        } else {
            return 0
        }
    }
    
    private var progressColor: Color {
        watchProgress >= 1.0 ? .green : .red
    }
    
    var body: some View {
        Group {
            if let courseId = course.id, 
               let courseTitle = course.courseTitle, 
               let channelId = course.channelId, 
               let numLecturesInCourse = course.numLecturesInCourse, 
               let watchTimeInHrs = course.watchTimeInHrs {
                
                ZStack(alignment: .bottomLeading) {
                    if let image = courseController.courseThumbnails[courseId] {
                        Image(uiImage: image)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: cardWidth, height: cardHeight)
                            .clipped()
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    } else {
                        SkeletonLoader(width: cardWidth, height: cardHeight)
                    }
                    
                    LinearGradient(
                        gradient: Gradient(colors: [.clear, .black.opacity(0.85)]),
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    .frame(width: cardWidth, height: cardHeight)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    
                    VStack(spacing: 0) {
                        HStack {
                            VStack(alignment: .leading) {
                                HStack {
                                    Text(courseTitle)
                                        .font(.system(size: titleFontSize, design: .serif))
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .multilineTextAlignment(.leading)
                                        .lineLimit(4)
                                        .truncationMode(.tail)
                                    Spacer()
                                }
                                
                                HStack {
                                    if let channel = courseController.cachedChannels[channelId], 
                                       let channelTitle = channel.title {
                                        Text(channelTitle)
                                            .lineLimit(1)
                                            .truncationMode(.tail)
                                            .font(.system(size: subtitleFontSize, design: .serif))
                                            .foregroundColor(.white.opacity(0.8))
                                    }
                                    
                                    Text("\\(numLecturesInCourse) Lectures")
                                        .font(.system(size: subtitleFontSize, design: .serif))
                                        .foregroundColor(.white.opacity(0.8))
                                    Text("\\(watchTimeInHrs)hrs")
                                        .font(.system(size: subtitleFontSize, design: .serif))
                                        .foregroundColor(.white.opacity(0.8))
                                }
                            }
                            Spacer()
                        }
                        .padding(contentPadding)
                    }
                    .padding(.bottom, 1)
                    
                    GeometryReader { geometry in
                        Rectangle()
                            .fill(progressColor)
                            .frame(width: geometry.size.width * watchProgress, height: progressBarHeight)
                            .position(x: (geometry.size.width * watchProgress) / 2, y: geometry.size.height - progressBarHeight/2)
                    }
                    .cornerRadius(10)
                }
                .frame(width: cardWidth, height: cardHeight)
                .shadow(radius: 2.5)
            }
        }
        .onAppear {
            if let lectureId = watchHistory.lectureId {
                courseController.retrieveLecture(lectureId: lectureId)
            }
        }
    }
    
    // Computed properties for responsive sizing
    private var cardWidth: CGFloat {
        horizontalSizeClass == .regular ? 320 : 240
    }
    
    private var cardHeight: CGFloat {
        horizontalSizeClass == .regular ? 180 : 130
    }
    
    private var titleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 18 : 14
    }
    
    private var subtitleFontSize: CGFloat {
        horizontalSizeClass == .regular ? 14 : 11
    }
    
    private var contentPadding: CGFloat {
        horizontalSizeClass == .regular ? 20 : 16
    }
    
    private var progressBarHeight: CGFloat {
        horizontalSizeClass == .regular ? 4 : 3
    }
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'MyCoursesProUserView.swift',
                                path: 'Lectures/Views/MyCourses/MyCoursesProUserView.swift',
                                type: 'file',
                                content: `//
//  MyCoursesProUserView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/15/25.
//

import FirebaseAuth
import SwiftUI

struct MyCoursesProUserView: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var userController: UserController
    
    // wHcontroller - on init get 3 latest WachHistory Objects, and when you get them also retrieve the course using Coursecontroller.Retrieve course which was passed as an argument
    
    var body: some View {
        Group {
            if myCourseController.isWatchHistoryLoading {
                MyCoursesLoadingView()
            } else {
                
                CourseHistory()
                
                FollowedChannels()
                
                SavedCourses()
                
                SavedLectures()
                
            }
        }
        .onAppear {
            if let user = Auth.auth().currentUser {
                print("on appear on MyCoursesProUserView")
                
                // get recent watch histories (will not update if already fetched)
                myCourseController.retrieveRecentWatchHistories(userId: user.uid, courseController: courseController)
                
                // fetch followed channels, liked courses and lectures, need to change every time
                if let user = userController.user, let followedChannelIds = user.followedChannelIds, let likedCourseIds = user.likedCourseIds, let likedLectureIds = user.likedLectureIds {
                    myCourseController.retrieveFollowedChannels(channelIds:followedChannelIds, courseController: courseController)
                    myCourseController.retrieveLikedCourses(courseIds: likedCourseIds, courseController: courseController)
                    myCourseController.retrieveLikedLectures(lectureIds: likedLectureIds, courseController: courseController)
                }
            } else {
                print("user isn't auth'd yet? idk")
            }
        }
    }
}

#Preview {
    MyCoursesProUserView()
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Onboarding',
                        path: 'Lectures/Views/Onboarding',
                        type: 'directory',
                        children: [
                            {
                                name: 'FirstOpen',
                                path: 'Lectures/Views/Onboarding/FirstOpen',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'FirstOpenSignUpSheet.swift',
                                        path: 'Lectures/Views/Onboarding/FirstOpen/FirstOpenSignUpSheet.swift',
                                        type: 'file',
                                        content: `//
//  FirstOpenSignUpSheet.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/14/25.
//

import SwiftUI

struct FirstOpenSignUpSheet: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var userController: UserController
    
    var text: String
    @Binding var displaySheet: Bool
    var body: some View {
        ZStack {
//            LatticeBackground()
            VStack {
                if isSignedIn {
                    Text("You're signed in :)")
                        .font(.system(size: 16, design: .serif))
                        .foregroundStyle(Color.green)
                    
                    Text("You can close this tab and continue")
                        .font(.system(size: 16, design: .serif))
                } else {
                    Text(text)
                        .font(.system(size: 16, design: .serif))
                        
                    SignInWithApple(displaySignInSheet: $displaySheet)
                    SignInWithGoogle(displaySignInSheet: $displaySheet)
                        .onDisappear {
                            displaySheet = false
                        }
                }
            }
        }
    }
}

#Preview {
    FirstOpenSignUpSheet(text: "arg", displaySheet: .constant(false))
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'OnboardingPaywallWithFreeTrial.swift',
                                        path: 'Lectures/Views/Onboarding/FirstOpen/OnboardingPaywallWithFreeTrial.swift',
                                        type: 'file',
                                        content: `
import FirebaseAuth
import SwiftUI

struct OnboardingPaywallWithFreeTrial: View {
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var tabbarController: TabBarController
//    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    
    @StateObject private var subscriptionController = SubscriptionController.shared
    
    @State private var selectedPlan: String = "3 months" // Default selected plan
    @State private var showProFeaturesSheet: Bool = false
    @State private var showSignUpSheet: Bool = false
    @State private var showSignInSheet: Bool = false
    
    var body: some View {
        ZStack {
            LatticeBackground()
            
            VStack {
                HStack {
                    Image("lectura-icon")
                        .resizable()
                        .frame(width: 35, height: 35)
        //                .clipShape(RoundedRectangle(cornerRadius: 10))
                    
                    VStack {
                        Text("Lectura")
                            .font(.system(size: 16, design: .serif))
                            .bold()
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .foregroundStyle(Color.white)
                    }
                    
                    Spacer()
                    
                    // Skip button
                    Button(action: {
                        // let the user skip to the app, without creating an account
                        hasUserSeenPaywall = true
                    }) {
                        HStack {
                            Spacer()
                            Text("Skip")
                                .font(.system(size: 16, design: .serif))
                                .opacity(0.8)
                                .foregroundColor(.white)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .cornerRadius(5)
                .padding(.horizontal, 20)
                
                ScrollView(showsIndicators: false ) {
                    // Header with logo and title
                    VStack {
                        Text("Start your learning journey with a")
                            .font(.system(size: 16, design: .serif))
                        Text("7 day free trial")
                            .font(.system(size: 22, design: .serif))
                    }
                    .padding(.top, 5)
                    
                    Button(action: {
                        showProFeaturesSheet = true
                    }) {
                        HStack {
                            Text("Discover the advantages with")
                                .foregroundColor(.white)
                                .font(.system(size: 16, design: .serif))
                            
                            Text("PRO")
                                .foregroundColor(.orange)
                                .font(.system(size: 14, design: .serif))
                                .bold()
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Capsule().fill(Color.white))
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 8)
                        .background(Color.orange.opacity(0.8))
                        .cornerRadius(10)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .sheet(isPresented: $showProFeaturesSheet) {
                        ProFeaturesSheet()
                    }
                    .padding(.top, 10)
                    
                    Text("Choose your plan after the free trial")
                        .font(.system(size: 16, design: .serif))
                        .foregroundColor(.gray)
                        .padding(.top, 10)
                    
                    
                    ForEach(subscriptionController.packages, id: \\.identifier) { package in
                        Text("1 package!")
                    }
                    
                    // Subscription plans
                    VStack(spacing: 15) {
                        SubscriptionPlanView(
                            title: "1 month",
                            price: "$5.99",
                            subPrice: "$5.99 per month",
                            isSelected: selectedPlan == "1 month"
                        ) {
                            selectedPlan = "1 month"
                        }
                        SubscriptionPlanView(
                            title: "3 months",
                            price: "$14.99",
                            subPrice: "$4.99 per month",
                            discount: "Save 20%",
                            isSelected: selectedPlan == "3 months"
                        ) {
                            selectedPlan = "3 months"
                        }
                        SubscriptionPlanView(
                            title: "12 months",
                            price: "$34.99",
                            subPrice: "$2.99 per month",
                            discount: "Save 50%",
                            isSelected: selectedPlan == "12 months"
                        ) {
                            selectedPlan = "12 months"
                        }
                    }
                    .padding(.horizontal, 20)
                    
                    // Start free trial button
                    Button(action: {
                        print("Selected Plan: \\(selectedPlan)")
                        
                        // there's no way a user could be signed in viewing this page, there's a different view if the user is trying to upgrade after this
                        
                        // show the sign in sheet
                        if !isSignedIn {
                            showSignUpSheet = true
                        } else {
                            // for now just skip to app and write the users membership type to pro
                            
                            if let user = Auth.auth().currentUser {
                                userController.changeMebershipType(userId: user.uid, freeToPro: true)
                                userController.retrieveUserFromFirestore(userId: user.uid)
                                hasUserSeenPaywall = true
                            }
                            
                            // TODO: add the payment logic here and free trial logic
                        }
                        
                        
                    }) {
                        Text("Start free trial")
                            .font(.system(size: 16, design: .serif))
                            .bold()
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.orange.opacity(0.8))
                            .cornerRadius(10)
                    }
                    .padding(.horizontal, 30)
                    .sheet(isPresented: $showSignUpSheet) {
                        FirstOpenSignUpSheet(text: "Create an account to start your free trial", displaySheet: $showSignUpSheet)
                            .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
                    }
                    .padding(.top, 10)
                    
                    
                    Text("7 days for free, then $5.99 a month")
                        .font(.footnote)
                        .foregroundColor(.gray)
                        .padding(.top, 10)
                    
                    // Continue with free account
                    Button(action: {
                        hasUserSeenPaywall = true
                    }) {
                        Text("Continue with Free Account")
                            .font(.system(size: 16, design: .serif))
                            .bold()
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.green.opacity(0.8))
                            .cornerRadius(10)
                    }
                    .padding(.horizontal, 30)
                    .padding(.top, 10)
                    
                    
                    // don't let the user sign in again if they already signed in (they probably just signed in before starting free trial)
                    if !isSignedIn {
                        // already have an account
                        Button(action: {
                            showSignInSheet = true
                            //                        FirstOpenSignUpSheet(displaySheet: .constant(false))
                        }) {
                            Text("Log In with existing account")
                                .font(.system(size: 16, design: .serif))
                                .bold()
                                .foregroundColor(.white)
                                .padding()
                                .frame(maxWidth: .infinity)
                                .background(Color.blue.opacity(0.8))
                                .cornerRadius(10)
                        }
                        .padding(.horizontal, 30)
                        .sheet(isPresented: $showSignInSheet) {
                            FirstOpenSignUpSheet(text: "Sign in to your existing account", displaySheet: .constant(false))
                                .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
                        }
                        .padding(.top, 10)
                    }
                    
                    //                Spacer()
                    
                    Text("You can cancel the subscription at any time from the app store at no additional cost. If you do not cancel it before the end of the current period, you will be charged.")
                        .font(.footnote)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 20)
                        .padding(.bottom, 20)
                }
                .foregroundColor(.white)
                .edgesIgnoringSafeArea(.all)
            }
        }
        .onAppear {
            tabbarController.isTabbarShowing = false
        }
        .onDisappear {
            tabbarController.isTabbarShowing = true
        }
    }
}

struct SubscriptionPlanView: View {
    var title: String
    var price: String
    var subPrice: String? = nil
    var discount: String? = nil
    var isSelected: Bool
    var onTap: () -> Void // Action when the plan is tapped
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 5) {
                Text(title)
                    .font(.system(size: 16, design: .serif))
                if let subPrice = subPrice {
                    Text(subPrice)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
            }
            Spacer()
            VStack(alignment: .trailing) {
                Text(price)
                    .font(.system(size: 16, design: .serif))
                if let discount = discount {
                    Text(discount)
                        .font(.system(size: 14, design: .serif))
                        .foregroundColor(.orange)
                        .bold()
                }
            }
            .padding(.trailing, 10)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(isSelected ? Color.orange.opacity(0.2) : Color.white.opacity(0.1))
        .animation(.easeInOut(duration: 0.4), value: isSelected) // Animate background change
        .cornerRadius(10)
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(isSelected ? Color.orange : Color.clear, lineWidth: 2)
                .animation(.easeInOut(duration: 0.4), value: isSelected) // Animate border change
        )
        .onTapGesture {
            onTap() // Trigger the tap action
        }
    }
}

struct LatticeBackground: View {
    var body: some View {
        ZStack {
            Color.black.opacity(0.9)
            GeometryReader { geometry in
                let spacing: CGFloat = 20
                let lineWidth: CGFloat = 0.5
                let rows = Int(geometry.size.height / spacing)
                let columns = Int(geometry.size.width / spacing)
                
                Path { path in
                    for row in 0...rows {
                        let y = CGFloat(row) * spacing
                        path.move(to: CGPoint(x: 0, y: y))
                        path.addLine(to: CGPoint(x: geometry.size.width, y: y))
                    }
                    for column in 0...columns {
                        let x = CGFloat(column) * spacing
                        path.move(to: CGPoint(x: x, y: 0))
                        path.addLine(to: CGPoint(x: x, y: geometry.size.height))
                    }
                }
                .stroke(Color.gray.opacity(0.3), lineWidth: lineWidth)
            }
        }
        .ignoresSafeArea(.all)
    }
}

struct ProFeaturesSheet: View {
    var body: some View {
        ZStack {
            LatticeBackground()
            
            VStack(alignment: .leading, spacing: 20) {
                Text("Lectura PRO Features")
                    .font(.system(size: 24, design: .serif))
                    .bold()
                    .padding(.top, 20)
                
                VStack(alignment: .leading, spacing: 10) {
                    FeatureRow(icon: "checkmark.circle.fill", text: "Free Access to All Courses and Lectures")
                    FeatureRow(icon: "checkmark.circle.fill", text: "Ad-free Experience.")
                    FeatureRow(icon: "checkmark.circle.fill", text: "Personalized Learning (Course Progress, Saved Lectures, Follow Universities)")
                    FeatureRow(icon: "checkmark.circle.fill", text: "Free Access to AI Generated Lecture Resources")
                    FeatureRow(icon: "checkmark.circle.fill", text: "Download & Export Notes for Offline Learning")
                }
                .padding(.top)
                
                Spacer()
            }
            .padding()
        }
        .ignoresSafeArea(.all)
    }
}

struct FeatureRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(.orange)
                .font(.title2)
            Text(text)
                .font(.body)
                .font(.system(size: 18, design: .serif))
        }
    }
}

#Preview {
    OnboardingPaywallWithFreeTrial()
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'OnboardingModules',
                                path: 'Lectures/Views/Onboarding/OnboardingModules',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'SignInWithApple.swift',
                                        path: 'Lectures/Views/Onboarding/OnboardingModules/SignInWithApple.swift',
                                        type: 'file',
                                        content: `//
//  SignInWithApple.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//

import FirebaseAuth
import AuthenticationServices
import SwiftUI

struct SignInWithApple: View {
    // Light / Dark Theme
    @Environment(\\.colorScheme) var colorScheme
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false
    
    @EnvironmentObject var authController: AuthController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    var disablePadding: Bool?
    @Binding var displaySignInSheet: Bool
    
    var closePaywallOnSignIn: Bool?
    
    var body: some View {
        SignInWithAppleButton(
            onRequest: { request in
                let nonce = authController.randomNonceString()
                authController.currentNonce = nonce
                request.requestedScopes = [.fullName, .email]
                request.nonce = authController.sha256(nonce)
            },
            onCompletion: { result in
                
                Task {
                    
                    if let closePaywallOnSignIn = closePaywallOnSignIn, closePaywallOnSignIn == true {
                        authController.appleSignInButtonOnCompletion(result: result, displaySignInSheet: $displaySignInSheet, closePaywallOnSignIn: true)
                    } else {
                        authController.appleSignInButtonOnCompletion(result: result, displaySignInSheet: $displaySignInSheet, closePaywallOnSignIn: false)
                    }
                    
                    // restore purchases with revenue cat (will return the user's pro status)
                    await subscriptionController.restorePurchases()
                    
//                    if let _ = closePaywallOnSignIn {
//                        hasUserSeenPaywall = true
//                    }
                }
            }
        )
        .frame(maxWidth: .infinity, maxHeight: 40)
        .cornerRadius(10)
        .signInWithAppleButtonStyle(colorScheme == .light ? .black : .white)
        .padding(.horizontal, disablePadding ?? false ? 0 : 20)
    }
}

#Preview {
    SignInWithApple(displaySignInSheet: .constant(false))
        .environmentObject(AuthController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SignInWithGoogle.swift',
                                        path: 'Lectures/Views/Onboarding/OnboardingModules/SignInWithGoogle.swift',
                                        type: 'file',
                                        content: `//
//  SignInWithGoogle.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//

import SwiftUI

struct SignInWithGoogle: View {
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false
    
    @EnvironmentObject var authController: AuthController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    var disablePadding: Bool?
    @Binding var displaySignInSheet: Bool
    
    var closePaywallOnSignIn: Bool?
    
    
    var body: some View {
        // Sign in with Google Button
        Button(action: {
            Task {
                if let closePaywallOnSignIn = closePaywallOnSignIn, closePaywallOnSignIn == true {
                    authController.signInWithGoogle(displaySignInSheet: $displaySignInSheet, closePaywallOnSignIn: true)
                } else {
                    authController.signInWithGoogle(displaySignInSheet: $displaySignInSheet, closePaywallOnSignIn: false)
                }
                
                // restore purchases with revenue cat (will return the user's pro status)
                await subscriptionController.restorePurchases()
                
//                if let _ = closePaywallOnSignIn {
//                    hasUserSeenPaywall = true
//                }
            }
        }) {
            HStack {
                Image("google_logo")
                    .resizable()
                    .frame(width: 18, height: 18)
                Text("Sign in with Google")
                    .font(.system(size: 16))
                    .foregroundColor(.black)
            }
            .frame(maxWidth: .infinity, maxHeight: 40)
            .background(Color.white)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.black, lineWidth: 1)
            )
            .cornerRadius(10)
        }
        .padding(.horizontal, disablePadding ?? false ? 0 : 20 )
    }
}

#Preview {
    SignInWithGoogle(displaySignInSheet: .constant(false))
        .environmentObject(AuthController())
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'ProAccountButNotSignedInSheet.swift',
                                path: 'Lectures/Views/Onboarding/ProAccountButNotSignedInSheet.swift',
                                type: 'file',
                                content: `//
//  ProAccountButNotSignedInSheet.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/17/25.
//

import SwiftUI

struct ProAccountButNotSignedInSheet: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @Binding var displaySheet: Bool
    var body: some View {
        VStack(spacing: 20) {
            
            if isSignedIn {
                Text("You're signed in :)")
                    .font(.system(size: 16, design: .serif))
                    .foregroundStyle(Color.green)
                
                Text("You can close this tab and continue")
                    .font(.system(size: 16, design: .serif))
            } else {
                Image(systemName: "person.crop.circle.badge.exclamationmark")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)
                
                Text("Account Required")
                    .font(.title2)
                    .bold()
                
//                Text("You have a Pro subscription, but we need you to create an account or sign in to save your preferences and history.")
//                    .multilineTextAlignment(.center)
//                    .foregroundColor(.secondary)
//                    .padding(.horizontal)
                    
                SignInWithApple(displaySignInSheet: $displaySheet)
                SignInWithGoogle(displaySignInSheet: $displaySheet)
                    .onDisappear {
                        displaySheet = false
                    }
            }
        }
        .padding()
    }
}

//#Preview {
//    ProAccountButNotSignedInSheet()
//}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SignUpOrInOutsideOfPaywall.swift',
                                path: 'Lectures/Views/Onboarding/SignUpOrInOutsideOfPaywall.swift',
                                type: 'file',
                                content: `//
//  SignUpOrIn.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/30/24.
//

import SwiftUI
import AuthenticationServices

struct SignUpOrInOutsideOfPaywall: View {
    // Light / Dark Theme
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var authController: AuthController
    
    var body: some View {
        VStack {
            HStack {
                // Small Logo
                
                Image("AppIconLight")
                    .resizable()
                    .frame(width: 30, height: 30)
                    .cornerRadius(10)
                Text("Lectura")
                    .font(.system(size: 16, design: .serif))
                    .bold()
            }
            
            Text("Start your learning journey")
                .font(.system(size: 14, design: .serif))
                .padding(.bottom, 5)
            
            Text("Create an account today")
                .font(.system(size: 12, design: .serif))
                .padding(.bottom, 20)
            
            SignInWithAppleButton(
                onRequest: { request in
//                    let nonce = authController.randomNonceString()
//                    authController.currentNonce = nonce
//                    request.requestedScopes = [.fullName, .email]
//                    request.nonce = authController.sha256(nonce)
                },
                onCompletion: { result in
//                    if let rateLimit = userController.processFirestoreWrite() {
//                        print(rateLimit)
//                    } else {
//                        Task {
//                            authController.appleSignInButtonOnCompletion(result: result)
//                        }
//                    }
                }
            )
            .frame(maxWidth: 250, maxHeight: 40)
            .cornerRadius(10)
            .signInWithAppleButtonStyle(colorScheme == .light ? .black : .white)
            
            // Sign in with Google Button
            Button(action: {
                // sign in with google
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
                Text("Already have an account? Use the methods above to Login")
                    .font(.system(size: 12, design: .serif))
//                Text("Log in")
//                    .font(.system(size: 12, design: .serif))
//                    .foregroundStyle(Color.blue)
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
    SignUpOrInOutsideOfPaywall()
        .environmentObject(AuthController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'UpgradeAccountPaywallWithoutFreeTrial.swift',
                                path: 'Lectures/Views/Onboarding/UpgradeAccountPaywallWithoutFreeTrial.swift',
                                type: 'file',
                                content: `//
//  UpgradeAccountPaywallWithoutFreeTrial.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/14/25.
//

import SwiftUI
import RevenueCat

struct UpgradeAccountPaywallWithoutFreeTrial: View {
    @AppStorage("hasUserSeenPaywall") private var hasUserSeenPaywall = false
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @EnvironmentObject var userController: UserController
    
    @State private var selectedPlan: String = "3 months" // Default selected plan
    
    @State private var selectedPackage: Package?
    
    @State private var showProFeaturesSheet: Bool = false
    @State private var showSignUpSheet: Bool = false
    @State private var showNoPackageSelectedAlert = false
    @State private var showAlreadCreatedAccountSignInSheet: Bool = false
    
    @Binding var sheetShowingView: Bool
    
    @State var hasUserCompletedPurchase: Bool = false
    
    var body: some View {
        ZStack {
            LatticeBackground()
            
            VStack() {
                ScrollView(showsIndicators: false ) {
                    // Header with logo and title
                    VStack {
                        // Logo and app details
                        HStack {
                            Image("lectura-icon")
                                .resizable()
                                .frame(width: 50, height: 50)
                            
                            VStack(alignment: .leading) {
                                Text("Lectura")
                                    .font(.system(size: 18, design: .serif))
                                Text("Learn Anything")
                                    .font(.system(size: 12, design: .serif))
                                    .opacity(0.6)
                            }
                        }
                        .cornerRadius(5)
                        .padding(.top, 20)
                    }
                    .padding(.top, 40)
                    
                    
                    if hasUserCompletedPurchase {
                        Text("Your purchase has been completed!")
                            .foregroundColor(.white)
                            .font(.system(size: 16, design: .serif))
                        
                        
                        if !isSignedIn {
                            Text("Consider registering for an account in order to access features which require identification. Registering will also let your subscription status persist across all your devices.")
                                .foregroundColor(.white)
                                .font(.system(size: 14, design: .serif))
                                .padding(.top, 10)
                                .padding(.horizontal, 20)
                            
                            Button(action: {
                                showSignUpSheet = true
                            }) {
                                HStack {
                                    Text("Register for an account")
                                        .foregroundColor(.white)
                                        .font(.system(size: 16, design: .serif))
                                }
                                .padding(.horizontal)
                                .padding(.vertical, 8)
                                .background(Color.orange.opacity(0.8))
                                .cornerRadius(10)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .sheet(isPresented: $showSignUpSheet) {
                                FirstOpenSignUpSheet(text: "Register to continue", displaySheet: $showSignUpSheet)
                                    .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
                            }
                            .padding(.top, 10)
                        } else {
                            Text("You're signed in!")
                                .foregroundColor(.green)
                                .font(.system(size: 14, design: .serif))
                        }
                        
                        // continue button
                        Button(action: {
                            hasUserSeenPaywall = true
                            sheetShowingView = false
                        }) {
                            HStack {
                                Text("Continue")
                                    .foregroundColor(.white)
                                    .font(.system(size: 16, design: .serif))
                            }
                            .padding(.horizontal)
                            .padding(.vertical, 8)
                            .background(Color.green.opacity(0.8))
                            .cornerRadius(10)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .padding(.top, 10)
                        
                    } else {
                        
                        Button(action: {
                            showProFeaturesSheet = true
                        }) {
                            HStack {
                                Text("Discover the advantages with")
                                    .foregroundColor(.white)
                                    .font(.system(size: 16, design: .serif))
                                
                                Text("PRO")
                                    .foregroundColor(.orange)
                                    .font(.system(size: 14, design: .serif))
                                    .bold()
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(Capsule().fill(Color.white))
                            }
                            .padding(.horizontal)
                            .padding(.vertical, 8)
                            .background(Color.orange.opacity(0.8))
                            .cornerRadius(10)
                        }
                        .buttonStyle(PlainButtonStyle())
                        .sheet(isPresented: $showProFeaturesSheet) {
                            ProFeaturesSheet()
                        }
                        .padding(.top, 10)
                        
                        Text("Select your plan")
                            .font(.system(size: 16, design: .serif))
                            .foregroundColor(.gray)
                            .padding(.top, 10)
                        
                        if subscriptionController.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else if let error = subscriptionController.error {
                            Text(error)
                                .foregroundColor(.red)
                                .padding()
                        } else {
                            // Subscription plans
                            VStack(spacing: 15) {
                                ForEach(subscriptionController.packages, id: \\.identifier) { package in
                                    //                                Text(package.identifier)
                                    SubscriptionPlanView(
                                        title: package.storeProduct.subscriptionPeriod?.periodTitle ?? "",
                                        price: package.localizedPriceString,
                                        subPrice: calculateSubprice(for: package),
                                        discount: calculateDiscount(for: package),
                                        isSelected: selectedPackage?.identifier == package.identifier
                                    ) {
                                        selectedPackage = package
                                    }
                                }
                            }
                            .padding(.horizontal, 20)
                        }
                        
                        // Upgrade account
                        Button(action: {
                            
                            print("purchasing, but we don't force auth here")
                            guard let package = selectedPackage else {
                                showNoPackageSelectedAlert = true
                                return
                            }
                            
                            Task {
                                if await subscriptionController.purchase(package: package) {
                                    hasUserCompletedPurchase = true
                                }
                            }
                        }) {
                            Text("Continue")
                                .font(.system(size: 16, design: .serif))
                                .bold()
                                .foregroundColor(.white)
                                .padding()
                                .frame(maxWidth: .infinity)
                                .background(Color.orange.opacity(0.8))
                                .cornerRadius(10)
                        }
                        .alert("No Plan Selected", isPresented: $showNoPackageSelectedAlert) {
                            Button("OK", role: .cancel) { }
                        } message: {
                            Text("Please select a subscription plan to continue.")
                        }
                        .disabled(subscriptionController.isLoading)
                        .padding(.horizontal, 30)
                        .padding(.top, 10)
                        .sheet(isPresented: $showSignUpSheet) {
                            FirstOpenSignUpSheet(text: "Create an account to continue", displaySheet: $showSignUpSheet)
                                .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
                        }
                        
                        
                        Text("You can cancel the subscription at any time from the app store at no additional cost. If you do not cancel it before the end of the current period, you will be charged.")
                            .font(.footnote)
                            .foregroundColor(.gray)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                            .padding(.bottom, 20)
                        
                        
                        // already have an account
                        if !isSignedIn {
                            Button(action: {
                                showAlreadCreatedAccountSignInSheet = true
                            }) {
                                Text("Already have an account? Sign in instead")
                                    .font(.system(size: 14, design: .serif))
                                    .foregroundColor(.blue)
                            }
                            .buttonStyle(PlainButtonStyle())
                            .sheet(isPresented: $showAlreadCreatedAccountSignInSheet) {
                                VStack {
                                    SignInWithApple(displaySignInSheet: .constant(false), closePaywallOnSignIn: true)
                                    SignInWithGoogle(displaySignInSheet: .constant(false), closePaywallOnSignIn: true)
                                }
                                .presentationDetents([.fraction(0.4), .medium]) // User can drag between these heights
                            }
                        }
                        
                    }
                }
                .foregroundColor(.white)
                .edgesIgnoringSafeArea(.all)
            }
        }
    }
    
    private func calculateDiscount(for package: Package) -> String? {
        switch package.identifier {
        case "$rc_monthly": return ""
        case "$rc_three_month": return "Save 15%"
        case "$rc_annual": return "Save 50%"
        default: return ""
        }
    }
    
    private func calculateSubprice(for package: Package) -> String? {
        if let price = cleanAndConvertToDouble(package.localizedPriceString) {
            let roundedPrice = (price * 100).rounded() / 100
            switch package.identifier {
            case "$rc_monthly": return "$\\(((roundedPrice / 1) * 100).rounded() / 100) / month"
            case "$rc_three_month": return "$\\(((roundedPrice / 3) * 100).rounded() / 100) / month"
            case "$rc_annual": return "$\\(((roundedPrice / 12) * 100).rounded() / 100) / month"
            default: return "$.. / mo"
            }
        }
        
        return ""
    }
    
    private func cleanAndConvertToDouble(_ priceString: String) -> Double? {
        let cleanedString = priceString.unicodeScalars.filter {
            CharacterSet.decimalDigits.union(CharacterSet.punctuationCharacters).contains($0)
        }.map { String($0) }.joined()
        
        return Double(cleanedString)
    }
}

extension SubscriptionPeriod {
    var periodTitle: String {
        switch self.unit {
        case .month:
            return value == 1 ? "1 month" : "\\(value) months"
        case .year:
            return value == 1 ? "1 year" : "\\(value) years"
        default:
            return "\\(value) \\(unit)"
        }
    }
}

//#Preview {
//    UpgradeAccountPaywallWithoutFreeTrial()
//}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'RateLimitPopUp.swift',
                        path: 'Lectures/Views/RateLimitPopUp.swift',
                        type: 'file',
                        content: `//
//  RateLimitPopUp.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/23/25.
//

import SwiftUI

struct RateLimitPopUp: View {
    
    @AppStorage("numberBreach") private var numberBreach: Int = 0
    
    @EnvironmentObject var rateLimiter: RateLimiter
    
    
    @State private var timeRemaining: Int = 60
    @State private var timer: Timer?
    
    func startCountdown() {
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            guard rateLimiter.shouldRateLimitPopupShow else {
                stopTimer()
                return
            }
            
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                stopTimer()
                rateLimiter.shouldRateLimitPopupShow = false
            }
        }
    }
    
    func stopTimer() {
        timer?.invalidate()
        timer = nil
        if timeRemaining <= 0 {
            numberBreach = 0  // Reset the breach counter when timeout completes
        }
    }
    
    var body: some View {
        ZStack {
            Color.black.opacity(0.4)
                .edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 15) {
                // TODO: should or should not let users close out of this?
//                HStack {
//                    Spacer()
//                    
//                    Button(action: {
//                        rateLimiter.shouldRateLimitPopupShow = false
//                    }) {
//                        Text("Close")
//                            .foregroundStyle(Color.red)
//                            .font(.caption)
//                    }
//                }
                
                Image(systemName: "xmark.octagon.fill")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
                    .foregroundColor(.red)
                
                
                Text("Too Many Actions")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text("Please wait \\(timeRemaining) seconds before continuing.")
                    .multilineTextAlignment(.center)
                    .foregroundColor(.secondary)
                
                Text("Actions are temporarily disabled")
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            .frame(maxWidth: 300)
            .padding()
            .background(Color(UIColor.systemBackground))
            .cornerRadius(15)
            .shadow(radius: 10)
        }
        .onAppear {
            switch numberBreach {
            case 0: timeRemaining = 60
            case 1: timeRemaining = 60
            case 2: timeRemaining = 300
            case 3: timeRemaining = 600
            case 4...: timeRemaining = 300
            default: timeRemaining = 300
            }
            startCountdown()
        }
        .onDisappear {
            stopTimer()
        }
    }
}

#Preview {
    RateLimitPopUp()
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Reels',
                        path: 'Lectures/Views/Reels',
                        type: 'directory',
                        children: [
                            {
                                name: 'ReelMainView.swift',
                                path: 'Lectures/Views/Reels/ReelMainView.swift',
                                type: 'file',
                                content: `//
//  ReelMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 3/9/25.
//

import SwiftUI
import AVKit
import AVFoundation

struct ReelMainView: View {
    @EnvironmentObject var rateLimiter: RateLimiter
    @EnvironmentObject var courseController: CourseController
    
    @StateObject private var reelsController = ReelsController()
    @State private var dragOffset: CGFloat = 0
    @State private var dragThreshold: CGFloat = 100
    @State private var isTransitioning: Bool = false
    @State private var transitionDirection: TransitionDirection = .none
    @State private var nextIndex: Int? = nil
    @State private var animationProgress: CGFloat = 0
    @State private var completingTransition: Bool = false
    @State private var initialDragOffset: CGFloat = 0
    
    // Animation timing constants
    private let transitionDuration: Double = 0.3
    private let completionDelay: Double = 0.2
    
    enum TransitionDirection {
        case up, down, none
    }
    
    // Add this method to handle app state changes
    private func configureNotifications() {
        NotificationCenter.default.addObserver(
            forName: UIApplication.didBecomeActiveNotification,
            object: nil,
            queue: .main) { [weak reelsController] _ in
                // Reactivate audio session when app becomes active
                reelsController?.playCurrentVideo()
            }
        
        NotificationCenter.default.addObserver(
            forName: UIApplication.willResignActiveNotification,
            object: nil,
            queue: .main) { [weak reelsController] _ in
                // Pause playback when app is backgrounded
                reelsController?.pauseCurrentVideo()
            }
    }
    
    var body: some View {
        NavigationView {
            GeometryReader { geometry in
                ZStack {
                    Color.black.edgesIgnoringSafeArea(.all)
                    
                    // Loading indicator
                    if reelsController.isLoading {
                        ZStack {
                            // Show a blurred version of the previous video or a placeholder
                            if let currentReel = currentReel {
                                // You could show a cached thumbnail here
                                Rectangle()
                                    .fill(Color.black)
                                    .opacity(0.7)
                            }
                            
                            VStack {
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                    .scaleEffect(1.5)
                                
                                Text("Loading...")
                                    .foregroundColor(.white)
                                    .padding(.top, 10)
                            }
                        }
                        .transition(.opacity)
                        .animation(.easeInOut(duration: 0.3), value: reelsController.isLoading)
                    } else if reelsController.reels.isEmpty {
                        // No reels available
                        VStack {
                            Image(systemName: "video.slash")
                                .font(.system(size: 50))
                                .foregroundColor(.white)
                            
                            Text("No reels available")
                                .foregroundColor(.white)
                                .padding(.top, 20)
                        }
                    } else {
                        // Next Video Player (shown during transition)
                        if let nextIdx = nextIndex, nextIdx >= 0, nextIdx < reelsController.reels.count, 
                            let nextPlayer = reelsController.playerAt(index: nextIdx), let nextReel = reelsController.reelAt(index: nextIdx) {
                            
                            // Next video container with UI - properly centered
                            VStack(spacing: 0) {
                                Spacer()
                                
                                // Video container with fixed aspect ratio
                                ZStack {
                                    VStack {
                                        if let player = reelsController.playerAt(index: nextIdx) {
                                            VideoPlayer(player: player)
                                                .aspectRatio(16/9, contentMode: .fit)
                                                .frame(width: geometry.size.width)
                                                // .clipShape(RoundedRectangle(cornerRadius: 12))
                                                .disabled(true) // Disable video player controls but allow hit testing
                                        }
                                    }
                                    .padding(.bottom, 50)
                                    
                                    // Overlay UI for next video
                                    VStack {
                                        // Add more space at the top to push content down
                                        Spacer()
                                        
                                        // Video Info at bottom
                                        HStack(alignment: .bottom) {
                                            // Left side - Video information
                                            VStack(alignment: .leading, spacing: 8) {
                                                Text("@\\(nextReel.channelName ?? "Channel")")
                                                    .font(.headline)
                                                    .foregroundColor(.white)
                                                    .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                
                                                Text(nextReel.lectureName ?? "Reel Title")
                                                    .font(.subheadline)
                                                    .foregroundColor(.white)
                                                    .fontWeight(.bold)
                                                    .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                
                                                Text(nextReel.courseName ?? "Reel description")
                                                    .font(.caption)
                                                    .foregroundColor(.white)
                                                    .lineLimit(2)
                                                    .shadow(color: .black, radius: 2, x: 1, y: 1)
                                            }
                                            .padding(.horizontal)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                            
                                            // Right side - Action buttons
                                            VStack(spacing: 20) {
//                                                // Profile button
//                                                Button(action: {}) {
//                                                    VStack {
//                                                        Image(systemName: "person.circle.fill")
//                                                            .resizable()
//                                                            .scaledToFit()
//                                                            .frame(width: 40, height: 40)
//                                                            .foregroundColor(.white)
//                                                            .shadow(color: .black, radius: 3, x: 1, y: 1)
//                                                    }
//                                                }
                                                
                                                // Like button
                                                Button(action: {
                                                    print("tapping like")
                                                }) {
                                                    VStack {
                                                        Image(systemName: nextReel.id != nil && reelsController.isReelLiked(reelId: nextReel.id!) ? "heart.fill" : "heart")
                                                            .resizable()
                                                            .scaledToFit()
                                                            .frame(width: 30, height: 30)
                                                            .foregroundColor(nextReel.id != nil && reelsController.isReelLiked(reelId: nextReel.id!) ? .red : .white)
                                                            .shadow(color: .black, radius: 3, x: 1, y: 1)
                                                        
                                                        Text("\\(nextReel.likes)")
                                                            .foregroundColor(.white)
                                                            .font(.caption)
                                                            .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                    }
                                                }
                                                
                                                // Share button
                                                Button(action: {}) {
                                                    VStack {
                                                        Image(systemName: "arrowshape.turn.up.right.fill")
                                                            .resizable()
                                                            .scaledToFit()
                                                            .frame(width: 30, height: 30)
                                                            .foregroundColor(.white)
                                                            .shadow(color: .black, radius: 3, x: 1, y: 1)
                                                        
                                                        Text("\\(nextReel.shares)")
                                                            .foregroundColor(.white)
                                                            .font(.caption)
                                                            .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                    }
                                                }
                                            }
                                            .padding(.trailing, 20)
                                            .padding(.bottom, 0)
                                        }
                                        
                                        // Add padding at the bottom to move content up
                                        Spacer()
                                            .frame(height: geometry.size.height * 0.12)
                                    }
                                    .zIndex(10)
                                }
                                
                                Spacer()
                            }
                            .frame(maxHeight: .infinity)
                            .offset(y: nextVideoOffset(for: geometry))
                            .zIndex(completingTransition ? 2 : 0) // Bring to front during completion
                            .onAppear {
                                // Start preloading the video and play it immediately at low volume
                                // This ensures it's ready to go when needed
                                nextPlayer.volume = 0
                                nextPlayer.play()
                                nextPlayer.pause()
                            }
                        }
                        
                        // Current Video Player with UI
                        if let player = reelsController.playerForCurrentReel(), let currentReel = currentReel {
                            VStack(spacing: 0) {
                                Spacer()
                                
                                // Video container with fixed aspect ratio
                                ZStack {
                                    VStack {
                                        if let currentPlayer = reelsController.playerForCurrentReel() {
                                            VideoPlayer(player: currentPlayer)
                                                .aspectRatio(16/9, contentMode: .fit)
                                                .frame(width: geometry.size.width)
                                                // .clipShape(RoundedRectangle(cornerRadius: 12))
                                                .disabled(true) // Disable video player controls but allow hit testing
                                                .onAppear {
                                                    // Ensure player has correct audio settings
                                                    currentPlayer.volume = 1.0
                                                    
                                                    // Make sure player's audio is routed through speaker
                                                    try? AVAudioSession.sharedInstance().overrideOutputAudioPort(.speaker)
                                                }
                                        }
                                    }
                                    .padding(.bottom, 50)
                                    
                                    // Overlay UI
                                    VStack {
                                        // Add more space at the top to push content down
                                        Spacer()
                                        
                                        // Video Info at bottom
                                        HStack(alignment: .bottom) {
                                            // Left side - Video information
                                            VStack(alignment: .leading, spacing: 8) {
                                                if let newReel = reelsController.reelAt(index: reelsController.currentIndex) {
                                                    if let channel = courseController.cachedChannels[newReel.channelId ?? ""] {
                                                        NavigationLink(destination: ChannelView(channel: channel)) {
                                                            Text("@\\(newReel.channelName ?? "Channel")")
                                                                .font(.headline)
                                                                .foregroundColor(.white)
                                                                .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                        }
                                                        .buttonStyle(PlainButtonStyle())
                                                        .simultaneousGesture(TapGesture().onEnded {
                                                            courseController.focusChannel(channel)
                                                        })
                                                        
                                                    }
                                                    
                                                    
                                                    if let course = courseController.cachedCourses[newReel.courseId ?? ""] {
                                                        NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                                            VStack(alignment: .leading, spacing: 8) {
                                                                Text(currentReel.courseName ?? "Reel title")
                                                                    .font(.subheadline)
                                                                    .foregroundColor(.white)
                                                                    .fontWeight(.bold)
                                                                    .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                                
                                                                Text(currentReel.lectureName ?? "Reel description")
                                                                    .font(.caption)
                                                                    .foregroundColor(.white)
                                                                    .lineLimit(2)
                                                                    .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                            }
                                                        }
                                                        .buttonStyle(PlainButtonStyle())
                                                        .simultaneousGesture(TapGesture().onEnded {
                                                            courseController.getCourseThumbnail(courseId: course.id ?? "")
                                                            courseController.focusCourse(course)
                                                        })
                                                    }
                                                }
                                            }
                                            .padding(.horizontal)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                            
                                            // Right side - Action buttons
                                            VStack(spacing: 20) {
                                                // Profile button
                                                if let newReel = reelsController.reelAt(index: reelsController.currentIndex) {
                                                    if let channel = courseController.cachedChannels[newReel.channelId ?? ""] {
                                                        if let thumbnail = courseController.channelThumbnails[channel.id ?? ""] {
                                                            NavigationLink(destination: ChannelView(channel: channel)) {
                                                                VStack {
                                                                    Image(uiImage: thumbnail)
                                                                        .resizable()
                                                                        .scaledToFit()
                                                                        .frame(width: 40, height: 40)
                                                                        .foregroundColor(.white)
                                                                        .shadow(color: .black, radius: 3, x: 1, y: 1)
                                                                }
                                                            }
                                                            .buttonStyle(PlainButtonStyle())
                                                            .simultaneousGesture(TapGesture().onEnded {
                                                                courseController.focusChannel(channel)
                                                            })
                                                        }
                                                    }
                                                    
                                                    // Like button
                                                    Button(action: {
                                                        // Rate limiting
                                                        if let rateLimit = rateLimiter.processWrite() {
                                                            print(rateLimit)
                                                            return
                                                        }
                                                        
                                                        reelsController.toggleLike()
                                                    }) {
                                                        VStack {
                                                            Image(systemName: currentReel.id != nil && reelsController.isReelLiked(reelId: currentReel.id!) ? "heart.fill" : "heart")
                                                                .resizable()
                                                                .scaledToFit()
                                                                .frame(width: 30, height: 30)
                                                                .foregroundColor(currentReel.id != nil && reelsController.isReelLiked(reelId: currentReel.id!) ? .red : .white)
                                                                .shadow(color: .black, radius: 3, x: 1, y: 1)
                                                            
                                                            Text("\\(currentReel.likes)")
                                                                .foregroundColor(.white)
                                                                .font(.caption)
                                                                .shadow(color: .black, radius: 2, x: 1, y: 1)
                                                        }
                                                    }
                                                    
                                                    // Share button
                                                    if let course = courseController.cachedCourses[newReel.courseId ?? ""] {
                                                        NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                                                            VStack {
                                                                Image(systemName: "arrowshape.turn.up.right.fill")
                                                                    .resizable()
                                                                    .scaledToFit()
                                                                    .frame(width: 30, height: 30)
                                                                    .foregroundColor(.white)
                                                                    .shadow(color: .black, radius: 3, x: 1, y: 1)
                                                            }
                                                        }
                                                        .buttonStyle(PlainButtonStyle())
                                                        .simultaneousGesture(TapGesture().onEnded {
                                                            courseController.getCourseThumbnail(courseId: course.id ?? "")
                                                            courseController.focusCourse(course)
                                                        })
                                                    }
                                                }
                                                
                                                
                                            }
                                            .padding(.trailing, 20)
                                            .padding(.bottom, 0)
                                        }
                                        
                                        // Add padding at the bottom to move content up
                                        Spacer()
                                            .frame(height: geometry.size.height * 0.12)
                                    }
                                    .zIndex(10)
                                }
                                
                                Spacer()
                            }
                            .frame(maxHeight: .infinity)
                            .offset(y: currentVideoOffset(for: geometry))
                            .zIndex(completingTransition ? 0 : 1) // Send to back during completion
                            .opacity(completingTransition ? 0 : 1) // Fade out during completion
                            .onAppear {
                                reelsController.playCurrentVideo()
                                
                                // Reset loading state after a delay if it gets stuck
                                DispatchQueue.main.asyncAfter(deadline: .now() + 5.0) {
                                    reelsController.resetLoadingState()
                                }
                                
                                // TODO: When a new real loads, we need to fetch the associated channel and course using course controller
                                if let newReel = reelsController.reelAt(index: reelsController.currentIndex) {
                                    if let courseId = newReel.courseId, let channelId = newReel.channelId {
                                        courseController.retrieveCourse(courseId: courseId)
                                        courseController.retrieveChannel(channelId: channelId)
                                        courseController.getChannelThumbnail(channelId: channelId)
                                    }
                                }
                            }
                            .onDisappear {
                                reelsController.pauseCurrentVideo()
                            }
                        }
                        
                        // Swipe indicators
                        VStack {
                            if dragOffset > 0 && !isTransitioning {
                                HStack {
                                    Image(systemName: "arrow.up")
                                        .foregroundColor(.white)
                                        .opacity(min(dragOffset / dragThreshold, 1.0))
                                        .shadow(color: .black, radius: 2, x: 1, y: 1)
                                    Text("Previous video")
                                        .foregroundColor(.white)
                                        .opacity(min(dragOffset / dragThreshold, 1.0))
                                        .shadow(color: .black, radius: 2, x: 1, y: 1)
                                }
                                .padding(.top, 50)
                            } else if dragOffset < 0 && !isTransitioning {
                                Spacer()
                                HStack {
                                    Image(systemName: "arrow.down")
                                        .foregroundColor(.white)
                                        .opacity(min(-dragOffset / dragThreshold, 1.0))
                                        .shadow(color: .black, radius: 2, x: 1, y: 1)
                                    Text("Next video")
                                        .foregroundColor(.white)
                                        .opacity(min(-dragOffset / dragThreshold, 1.0))
                                        .shadow(color: .black, radius: 2, x: 1, y: 1)
                                }
                                .padding(.bottom, geometry.size.height * 0.15 + 50)
                            }
                            Spacer()
                        }
                        .zIndex(10) // Ensure indicators are above video players
                        .allowsHitTesting(false) // Disable interaction with indicators
                        
                        // Combined gesture overlay - only enable when not loading
                        Rectangle()
                            .fill(Color.clear)
                            .contentShape(Rectangle())
                            .edgesIgnoringSafeArea(.all)
                            .gesture(
                                DragGesture()
                                    .onChanged { value in
                                        if !isTransitioning {
                                            dragOffset = value.translation.height
                                        }
                                    }
                                    .onEnded { value in
                                        if !isTransitioning {
                                            if dragOffset > dragThreshold {
                                                // Swiped down - go to previous
                                                if reelsController.currentIndex > 0 {
                                                    // Store the current drag position to continue from
                                                    initialDragOffset = dragOffset
                                                    performTransition(direction: .down, geometry: geometry)
                                                } else {
                                                    // Bounce back if at first video
                                                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                                        dragOffset = 0
                                                    }
                                                }
                                            } else if dragOffset < -dragThreshold {
                                                // Swiped up - go to next
                                                if reelsController.currentIndex < reelsController.reels.count - 1 {
                                                    // Store the current drag position to continue from
                                                    initialDragOffset = dragOffset
                                                    performTransition(direction: .up, geometry: geometry)
                                                } else {
                                                    // Bounce back if at last video
                                                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                                        dragOffset = 0
                                                    }
                                                }
                                            } else {
                                                // Not enough to trigger change, bounce back
                                                withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                                    dragOffset = 0
                                                }
                                            }
                                        }
                                    }
                            )
                            .simultaneousGesture(
                                TapGesture()
                                    .onEnded {
                                        // Only handle tap if it's not on a button
                                        reelsController.togglePlayPause()
                                    }
                            )
                            .allowsHitTesting(!reelsController.isLoading)
                    }
                }
            }
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .onAppear {
            // Set up notifications when the view appears
            configureNotifications()
        }
        .onDisappear {
            // Remove observers when the view disappears
            NotificationCenter.default.removeObserver(self)
            reelsController.pauseCurrentVideo()
        }
    }
    
    private func currentVideoOffset(for geometry: GeometryProxy) -> CGFloat {
        if isTransitioning {
            // Calculate how far we need to go from the initial drag position
            let targetOffset = transitionDirection == .up ? -geometry.size.height : geometry.size.height
            let remainingDistance = targetOffset - initialDragOffset
            
            // Start from the initial drag position and move the remaining distance based on progress
            return initialDragOffset + (remainingDistance * animationProgress)
        } else {
            // During drag, just follow the finger
            return dragOffset
        }
    }
    
    private func nextVideoOffset(for geometry: GeometryProxy) -> CGFloat {
        if isTransitioning {
            // For next video, start from opposite direction and move in
            let startPosition = transitionDirection == .up ? 
                geometry.size.height : // Start from bottom when swiping up
                -geometry.size.height  // Start from top when swiping down
            
            // Move toward center as animation progresses
            return startPosition * (1 - animationProgress)
        }
        return 0
    }
    
    private func performTransition(direction: TransitionDirection, geometry: GeometryProxy) {
        // Set up transition state
        isTransitioning = true
        transitionDirection = direction
        animationProgress = 0
        completingTransition = false
        
        // Determine the next index
        nextIndex = direction == .up ? 
            reelsController.currentIndex + 1 : 
            reelsController.currentIndex - 1
        
        // Prepare the next video but don't play it yet
        if let nextIdx = nextIndex {
            reelsController.preparePlayerAt(index: nextIdx)
        }
        
        // Animate the transition - faster animation
        withAnimation(.easeInOut(duration: transitionDuration)) {
            animationProgress = 1.0
        }
        
        // Before the animation completes, start playing the next video
        // and mark that we're in the completion phase
        DispatchQueue.main.asyncAfter(deadline: .now() + completionDelay) {
            if let nextIdx = nextIndex {
                // Start playing the next video while the current one is still visible
                // but almost off-screen
                reelsController.playPlayerAt(index: nextIdx)
                
                // Mark that we're in the completion phase to adjust z-index
                withAnimation(.easeInOut(duration: 0.1)) {
                    completingTransition = true
                }
            }
        }
        
        // After the animation completes, switch to the new video
        DispatchQueue.main.asyncAfter(deadline: .now() + transitionDuration) {
            if let nextIdx = nextIndex {
                // Update the current index in the controller
                reelsController.setCurrentIndex(to: nextIdx)
                
            
                // TODO: When a new real loads, we need to fetch the associated channel and course using course controller
                if let newReel = reelsController.reelAt(index: nextIdx) {
                    if let courseId = newReel.courseId, let channelId = newReel.channelId {
                        courseController.retrieveCourse(courseId: courseId)
                        courseController.retrieveChannel(channelId: channelId)
                        courseController.getChannelThumbnail(channelId: channelId)
                    }
                }
                
                
                
                // TODO: Add logic to load more reels if we are at the end of the current reels array in the controller
            }
            
            // Reset states
            dragOffset = 0
            initialDragOffset = 0
            isTransitioning = false
            transitionDirection = .none
            animationProgress = 0
            completingTransition = false
            nextIndex = nil
        }
    }
    
    private var currentReel: Reel? {
        guard reelsController.currentIndex < reelsController.reels.count else { return nil }
        return reelsController.reels[reelsController.currentIndex]
    }
}

#Preview {
    ReelMainView()
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Resource',
                        path: 'Lectures/Views/Resource',
                        type: 'directory',
                        children: [
                            {
                                name: 'PDFViewer.swift',
                                path: 'Lectures/Views/Resource/PDFViewer.swift',
                                type: 'file',
                                content: `//
//  PDFViewer.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import SwiftUI
import PDFKit

struct PDFViewerSwiftUI: View {
    let url: URL
    @State private var showShareSheet = false
    
    var body: some View {
        ZStack {
            // PDF View wrapper
            PDFKitView(url: url)
            
            // Share button overlay
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    Button(action: {
                        showShareSheet = true
                    }) {
                        Image(systemName: "square.and.arrow.up")
                            .font(.title)
                            .padding()
                            .background(Color.black)
                            .clipShape(Circle())
                            .shadow(radius: 4)
                    }
                    .padding()
                }
            }
        }
        .sheet(isPresented: $showShareSheet) {
            ShareSheet(items: [url])
        }
    }
}

// PDF View wrapper
struct PDFKitView: View {
    let url: URL
    
    var body: some View {
        PDFKitRepresentedView(url: url)
    }
}

// PDFKit wrapper using SwiftUI
struct PDFKitRepresentedView: UIViewRepresentable {
    let url: URL
    
    func makeUIView(context: Context) -> PDFView {
        let pdfView = PDFView()
        pdfView.document = PDFDocument(url: url)
        pdfView.autoScales = true
        return pdfView
    }
    
    func updateUIView(_ pdfView: PDFView, context: Context) {
        pdfView.document = PDFDocument(url: url)
    }
}

// Share sheet using SwiftUI
struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        let controller = UIActivityViewController(
            activityItems: items,
            applicationActivities: nil
        )
        return controller
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ResourceNativeView.swift',
                                path: 'Lectures/Views/Resource/ResourceNativeView.swift',
                                type: 'file',
                                content: `//
//  ResourceNativeView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/30/25.
//

import SwiftUI

struct ResourceNativeView: View {
    @Environment(\\.presentationMode) var presentationMode
//    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var userController: UserController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @EnvironmentObject var courseController: CourseController
    
    @EnvironmentObject var rateLimiter: RateLimiter
    
    var resourceType: Int
    var resourceTitle: String
    var resourceContent: String
    
    @State var showingSignInSheet: Bool = false
    @State var showingUpgradeSheet: Bool = false
    @State private var showingShare = false
    @State private var showingReportAlert = false
    
    let markdownNotes = """
**My Important Notes**\\n
Here are some key points from today's meeting:\\n
**Project Updates**\\n
The new feature launch is going **really well**! We've seen:
• *Increased* user engagement
• **25%** improvement in load times
• Support for basic styling\\n
**Next Steps**\\n
• Complete documentation
• Schedule user testing
• Plan marketing campaign\\n
Note: Remember to follow up with the design team about the new color scheme.\\n
Visit our [internal wiki](https://wiki.example.com) for more details.\\n
*Last updated: January 30, 2025*
"""
    
    private var attributedText: AttributedString {
        do {
            // Replace \\\\n with actual newline characters
            let outputString = resourceContent.replacingOccurrences(of: "\\\\n", with: "\\n")
            
            return try AttributedString(markdown: outputString, options: .init(interpretedSyntax: .inlineOnlyPreservingWhitespace))
        } catch {
            print("Error converting markdown: \\(error)")
            return AttributedString("Failed to load notes")
        }
    }
    
    private func generatePDF() -> Data {
        let renderer = UIGraphicsPDFRenderer(bounds: CGRect(x: 0, y: 0, width: 612, height: 792)) // US Letter size
        
        let data = renderer.pdfData { context in
            context.beginPage()
            
            let titleAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 16, weight: .bold),
                .foregroundColor: UIColor.black
            ]
            
            let contentAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 12),
                .foregroundColor: UIColor.black
            ]
            
            // Draw title
            resourceTitle.draw(at: CGPoint(x: 50, y: 50), withAttributes: titleAttributes)
            
            // Convert AttributedString to NSAttributedString for drawing
            let nsAttributedString = try? NSAttributedString(attributedText)
            
            // Create frame for content
            let contentRect = CGRect(x: 50, y: 80, width: 512, height: 662)
            nsAttributedString?.draw(in: contentRect)
        }
        
        return data
    }
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack {
                HStack {
                    Text(resourceTitle)
                        .font(.system(size: 16, design: .serif))
                        .opacity(0.9)
                    
                    Spacer()
                    
                    // share button
                    Button(action: {
                        showingShare = true
                    }) {
                        Image(systemName: "square.and.arrow.up")
                            .resizable()
                            .frame(width: 15, height: 20)
                    }
                    .padding(.trailing, 5)
                    
                    // report button
                    Button(action: {
                        if let rateLimit = rateLimiter.processWrite() {
                            print(rateLimit)
                            return
                        }
                        
                        self.showingReportAlert = true
                    }) {
                        Image(systemName: "exclamationmark.circle")
                            .resizable()
                            .frame(width: 15, height: 15)
                    }
                    .alert("Report an Issue", isPresented: $showingReportAlert) {
                        Button("Content is Missing") {
                            courseController.reportIssueWithResource(resourceType: resourceType, resourceId: resourceTitle, issue: "Content is Missing")
                        }
                        Button("Content is Unrelated") {
                            courseController.reportIssueWithResource(resourceType: resourceType, resourceId: resourceTitle, issue: "Content is Unrelated")
                        }
                        Button("Formatting Issues") {
                            courseController.reportIssueWithResource(resourceType: resourceType, resourceId: resourceTitle, issue: "Formatting Issues")
                        }
                        Button("Cancel", role: .cancel) {}
                    } message: {
                        Text("Select the issue with this resource content:")
                    }
                }
                .padding(.bottom, 20)
                
                
                // if there was no generated resource for this (probably meant the transcript wasn't available on the video)
                if resourceContent == "" {
                    VStack(spacing: 12) {
                        Image(systemName: "face.smiling.inverse")
                            .resizable()
                            .frame(width: 40, height: 40)
                            .foregroundColor(.gray)
                        
                        Text("This resource is not available")
                            .font(.system(size: 16, design: .serif))
                            .foregroundColor(.gray)
                        
                        Text("This usually means the YouTube video does not have a transcript, or we had trouble generating the content on our server")
                            .font(.system(size: 14, design: .serif))
                            .foregroundColor(.gray.opacity(0.8))
                            .multilineTextAlignment(.center)
                    }
                    .padding(.vertical, 40)
                } else {
                    Text(attributedText)
                        // We probably don't want this text selectable, forces the user to use share, which is a pro feature
//                        .textSelection(.enabled)
                    
                    Divider()
                    
                    BottomBrandView()
                        .padding(.bottom, 20)
                        
                    
                    HStack {
                        Text("The following content has been generated by an artificial intelligence (AI) system. While every effort has been made to ensure accuracy, AI-generated content may contain errors or inaccuracies. Users are advised to exercise caution and not rely solely on this content as absolute truth. Always verify critical information from trusted sources.\\n")
                            .font(.system(size: 10, design: .serif))
                        Spacer()
                    }
                        
                        
                    HStack {
                        Text("This content was generated based on the linked recorded lecture. It adheres to all licensing and copyright policies associated with the original lecture material. The AI has synthesized and reformatted the information for clarity and accessibility, but the intellectual property rights remain with the original creators of the lecture.")
                            .font(.system(size: 10, design: .serif))
                        Spacer()
                    }
                    .padding(.bottom, 80)
                    
                }
                
                
            }
            .padding(.horizontal, 20)
        }
        .sheet(isPresented: $showingSignInSheet) {
            FirstOpenSignUpSheet(text: "", displaySheet: $showingSignInSheet)
                .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
        }
        .sheet(isPresented: $showingUpgradeSheet) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $showingUpgradeSheet)
        }
        .sheet(isPresented: $showingShare) {
            ShareSheetHelper(items: [generatePDF()])
        }
//        .navigationBarBackButtonHidden(true)
//        .navigationBarItems(leading: Button(action: {
//            self.presentationMode.wrappedValue.dismiss()
//        }) {
//            HStack {
//                Image(systemName: "chevron.left")
//                    .bold()
//                Text("Back")
//            }
//        })
    }
}

// Helper View for sharing
struct ShareSheetHelper: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        let controller = UIActivityViewController(activityItems: items, applicationActivities: nil)
        return controller
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'ResourceView.swift',
                                path: 'Lectures/Views/Resource/ResourceView.swift',
                                type: 'file',
                                content: `//
//  ResourceView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/5/25.
//

import FirebaseStorage
import SwiftUI

struct ResourceView: View {
    @EnvironmentObject var tabbarController: TabBarController
    
    @EnvironmentObject var resourceController: ResourceController
    
    var resource: Resource
    
    @State private var pdfUrl: URL?
    @State private var isLoading = true
    @State private var errorMessage: String?
    
    var body: some View {
        Group {
            if isLoading {
                ProgressView("Loading PDF...")
            } else if let pdfUrl = pdfUrl {
                PDFViewerSwiftUI(url: pdfUrl)
                    .onAppear {
                        tabbarController.isTabbarShowing = false
                    }
                    .onDisappear {
                        tabbarController.isTabbarShowing = true
                    }
            } else if let error = errorMessage {
                Text(error)
            }
        }
        .onAppear {
            fetchPDFFromFirebase()
        }
    }
    
    private func fetchPDFFromFirebase() {
        if let lectureId = resource.lectureId, let courseId = resource.courseId {
            
            
            let storage = Storage.storage()
            let storageRef = storage.reference()
            
            // Construct the path to the PDF in the 'resources' folder
            var childFolder = ""
            var lectureOrCourseId = ""
            switch resource.resourceType {
            case 0:
                childFolder = "notes"
                lectureOrCourseId = lectureId
            case 1:
                childFolder = "homeworks"
                lectureOrCourseId = lectureId
            case 2:
                childFolder = "homeworkAnswers"
                lectureOrCourseId = lectureId
            case 3:
                childFolder = "exams"
                lectureOrCourseId = courseId
            case 4:
                childFolder = "examAnswers"
                lectureOrCourseId = courseId
            default:
                childFolder = "notes"
                lectureOrCourseId = courseId
            }
            
            let path = "resources/\\(childFolder)/\\(lectureOrCourseId).pdf"
            
            if let url = resourceController.cachedUrls[path] {
                self.pdfUrl = url
                self.isLoading = false
                return
            }
            
            let pdfRef = storageRef.child(path)
            print(pdfRef.fullPath)
            
            // Download URL generation
            pdfRef.downloadURL { result in
                switch result {
                case .success(let url):
                    self.pdfUrl = url
                    self.isLoading = false
                    resourceController.cachedUrls[path] = url
                case .failure(let error):
                    self.errorMessage = "Could not load PDF: \\(error.localizedDescription)"
                    self.isLoading = false
                }
            }
        }
    }
}

#Preview {
    ResourceView(resource: Resource())
        .environmentObject(TabBarController())
}
`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'Search',
                        path: 'Lectures/Views/Search',
                        type: 'directory',
                        children: [
                            {
                                name: 'SearchMainView.swift',
                                path: 'Lectures/Views/Search/SearchMainView.swift',
                                type: 'file',
                                content: `//
//  SearchMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/18/24.
//

import SwiftUI

struct SearchMainView: View {
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var userController: UserController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @StateObject var searchController = SearchController()
    
    @State var isUpgradeAccountPopupShowing: Bool = false
    @State var isSignUpSheetShowing: Bool = false
    
    @State var isUserPro: Bool = false
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    TopBrandView()
                    
                    ScrollView(showsIndicators: false) {
                        if let user = userController.user, let accountType = user.accountType {
                            SearchBarWithFilters(accountType: accountType)
                        } else {
                            SearchBarWithFilters()
                        }
                        
                        
                        if searchController.displaySearchGraphic {
                            VStack(spacing: 16) {
                                Image(systemName: "magnifyingglass.circle.fill")
                                    .font(.system(size: 30))
                                    .foregroundColor(.gray.opacity(0.3))
                                    .padding(.top, 40)
                                
                                HStack(spacing: 4) {
                                    Text("Search for any")
                                    Image(systemName: "mail.stack")
                                    Text("course,")
                                    Image(systemName: "newspaper")
                                    Text("lecture or")
                                    Image(systemName: "graduationcap")
                                    Text("university")
                                }
                                .font(.system(size: 12, design: .serif))
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 20)
                            }
                        }
                        
                        // loading
                        if searchController.isChannelsLoading || searchController.isCoursesLoading || searchController.isLecturesLoading {
                            SearchLoadingView()
                        } else {
                            
                            
                            if searchController.searchResultChannels.isEmpty && searchController.searchResultCourses.isEmpty && searchController.searchResultLectures.isEmpty {
                                if searchController.wasSearchPerformed {
                                    HStack {
                                        Text("0 Results Found")
                                            .font(.system(size: 12))
                                            .bold()
                                        Spacer()
                                    }
                                    .padding(.top, 10)
                                }
                            } else {
                                if searchController.wasSearchPerformed {
                                    if searchController.wasSearchPerformed {
                                        if !searchController.isCoursesLoading && !searchController.isLecturesLoading && !searchController.isChannelsLoading {
                                            HStack {
                                                Text("Search Results (\\(searchController.searchResultChannels.count + searchController.searchResultCourses.count + searchController.searchResultLectures.count))")
                                                    .font(.system(size: 12))
                                                    .bold()
                                                Spacer()
                                            }
                                            .padding(.top, 10)
                                        }
                                    }
                                }
                            }
                            
                            
                            
                            // channels
                            if !searchController.searchResultChannels.isEmpty {
                                HStack {
                                    Image(systemName: "graduationcap")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    
                                    Text("Channels")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    Spacer()
                                }
                                .padding(.top, 10)
                                
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(alignment: .top, spacing: 16) {
                                        let groupedChannels = stride(from: 0, to: searchController.searchResultChannels.count, by: 2).map { index in
                                            Array(searchController.searchResultChannels[index..<min(index + 2, searchController.searchResultChannels.count)])
                                        }
                                        
                                        ForEach(groupedChannels.indices, id: \\.self) { groupIndex in
                                            let group = groupedChannels[groupIndex]
                                            VStack(spacing: 16) {
                                                ForEach(group, id: \\.id) { channel in
                                                    NavigationLink(destination: ChannelView(channel: channel)) {
                                                        ChannelCard(channel: channel)
                                                    }
                                                    .buttonStyle(PlainButtonStyle())
                                                    .simultaneousGesture(TapGesture().onEnded {
                                                        courseController.focusChannel(channel)
                                                    })
                                                }
                                                
                                            }
                                            .padding(.trailing, 10)
                                        }
                                    }
                                }
                                
                                
                                
                                HStack {
                                    if let user = userController.user, let accountType = user.accountType {
                                        NavigationLink(destination: FullChannelSearchResults()) {
                                            Text("View all")
                                                .font(.system(size: 10))
                                                .opacity(0.8)
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                    }
                                    Spacer()
                                }
                                .padding(.top, 1)
                            }
                            
                            if !searchController.searchResultCourses.isEmpty {
                                HStack {
                                    Image(systemName: "mail.stack")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    
                                    Text("Courses")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    Spacer()
                                }
                                .padding(.top, 10)
                                
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(alignment: .top, spacing: 16) {
                                        let groupedCourses = stride(from: 0, to: searchController.searchResultCourses.count, by: 2).map { index in
                                            Array(searchController.searchResultCourses[index..<min(index + 2, searchController.searchResultCourses.count)])
                                        }
                                        
                                        ForEach(groupedCourses.indices, id: \\.self) { groupIndex in
                                            let group = groupedCourses[groupIndex]
                                            VStack {
                                                ForEach(group, id: \\.id) { course in
                                                    CourseSearchResult(course: course, displayOnFullResultsPage: false)
                                                }
//                                                Spacer() // if there's only  1 course, push it to the top
                                            }
                                            .padding(.trailing, 10)
                                        }
                                    }
                                }
                                HStack {
                                    if let user = userController.user, let accountType = user.accountType {
                                        NavigationLink(destination: FullCourseSearchResults()) {
                                            Text("View all")
                                                .font(.system(size: 10))
                                                .opacity(0.8)
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                    }
                                    Spacer()
                                }
                                .padding(.top, 1)
                            }
                            
                            
                            if !searchController.searchResultLectures.isEmpty {
                                HStack {
                                    Image(systemName: "newspaper")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    
                                    Text("Lectures")
                                        .font(.system(size: 10))
                                        .opacity(0.8)
                                    Spacer()
                                }
                                .padding(.top, 10)
                                //                            .padding(.top, 10)
                                
                                
                                
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(alignment: .top, spacing: 16) {
                                        let groupedLectures = stride(from: 0, to: searchController.searchResultLectures.count, by: 2).map { index in
                                            Array(searchController.searchResultLectures[index..<min(index + 2, searchController.searchResultLectures.count)])
                                        }
                                        
                                        ForEach(groupedLectures.indices, id: \\.self) { groupIndex in
                                            let group = groupedLectures[groupIndex]
                                            VStack {
                                                ForEach(group, id: \\.id) { lecture in
                                                    
                                                    LectureSearchResult(lecture: lecture, displayOnFullResultsPage: false)
                                                    
                                                    
                                                }
//                                                Spacer() // if there's only  1 lecture, push it to the top
                                            }
                                            .padding(.trailing, 10)
                                        }
                                    }
                                }
                                
                                
                                HStack {
                                    if let user = userController.user, let accountType = user.accountType {
                                        NavigationLink(destination: FullLecturSearchResults()) {
                                            Text("View all")
                                                .font(.system(size: 10))
                                                .opacity(0.8)
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                    }
                                    Spacer()
                                }
                                .padding(.top, 1)
                            }
                        }
                    }
                    
                    
                    
                }
                .padding(.horizontal, 20)
                .scrollDismissesKeyboard(.interactively)
            }
            .navigationBarHidden(true)
            .sheet(isPresented: $isUpgradeAccountPopupShowing) {
                UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountPopupShowing)
            }
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
        .environmentObject(searchController)
    }
}

extension View {
    func hideKeyboard() {
        UIApplication.shared.sendAction(
            #selector(UIResponder.resignFirstResponder),
            to: nil,
            from: nil,
            for: nil
        )
    }
}

#Preview {
    SearchMainView()
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SearchModules',
                                path: 'Lectures/Views/Search/SearchModules',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'ChannelSearchResult.swift',
                                        path: 'Lectures/Views/Search/SearchModules/ChannelSearchResult.swift',
                                        type: 'file',
                                        content: `//
//  ChannelSerachResult.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/19/25.
//

import SwiftUI

struct ChannelSearchResult: View {
    @EnvironmentObject var courseController: CourseController
    
    var channel: Channel
    var body: some View {
        
        VStack {
            ChannelCard(channel: channel)
        }
        .padding(.top, 6)
    }
}

//#Preview {
//    ChannelSearchResult()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'CourseSearchResult.swift',
                                        path: 'Lectures/Views/Search/SearchModules/CourseSearchResult.swift',
                                        type: 'file',
                                        content: `//
//  CourseSearchResult.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/19/25.
//

import SwiftUI

struct CourseSearchResult: View {
    @EnvironmentObject var courseController: CourseController
    
    var course: Course
    var displayOnFullResultsPage: Bool
    
    var body: some View {
        if let courseId = course.id, let courseTitle = course.courseTitle, let numLecturesInCourse = course.numLecturesInCourse, let watchTimeInHrs = course.watchTimeInHrs, let aggregateViews = course.aggregateViews, let categories = course.categories {
            
            
            NavigationLink(destination: NewCourse(course: course, isLecturePlaying: false)) {
                HStack {
                    if let image = courseController.courseThumbnails[courseId] {
                        Image(uiImage: image)
                            .resizable()
                            .aspectRatio(contentMode: .fill) // Fill the frame while maintaining aspect ratio
//                            .frame(width: 120, height: 67.5)
                            .frame(width: 120, height: 67.5)
                            .clipped() // Clip the image to the frame
                            .clipShape(RoundedRectangle(cornerRadius: 10)) // Apply rounded corners
                    } else {
                        // default image when not loaded
                        SkeletonLoader(width: 120, height: 67.5)
                    }
                    
                    
                    VStack {
                        HStack {
                            Text(courseTitle)
                                .font(.system(size: 14, design: .serif))
                                .bold()
                                .lineLimit(2)
                                .truncationMode(.tail)
                            
                            Spacer()
                        }
                        
                        HStack {
                            // TODO: add a field course name on the lecture object
                            Text("\\(numLecturesInCourse) Lectures")
                                .font(.system(size: 12))
                                .opacity(0.6)
                                .lineLimit(1)
                                .truncationMode(.tail)
                            
                            Spacer()
                        }
                        
                        
                        HStack {
                            Text("\\(formatIntViewsToString(numViews: aggregateViews)) Views")
                                .font(.system(size: 12))
                                .opacity(0.6)
                                .lineLimit(1)
                                .truncationMode(.tail)
                            Spacer()
                        }
                    }
                    
                    
                    
                    
//                    VStack {
//                        HStack {
//                            Text(courseTitle)
//                                .font(.system(size: 14, design: .serif))
//                                .bold()
//                                .lineLimit(2)
//                                .truncationMode(.tail)
//                            
//                            
//                            Spacer()
//                        }
//                        
//                        HStack {
//                            Text("\\(numLecturesInCourse) Lectures")
//                                .font(.system(size: 12))
//                                .opacity(0.6)
//                                .lineLimit(1)
//                                .truncationMode(.tail)
//                            
//                            Spacer()
//                        }
//                        
//                        HStack {
//                            Text("\\(watchTimeInHrs)hrs")
//                                .font(.system(size: 12))
//                                .opacity(0.6)
//                                .lineLimit(1)
//                                .truncationMode(.tail)
//                            
//                            Text("\\(formatIntViewsToString(numViews: aggregateViews)) Views")
//                                .font(.system(size: 12))
//                                .opacity(0.6)
//                                .lineLimit(1)
//                                .truncationMode(.tail)
//                            Spacer()
//                        }
//                        .lineLimit(1)
//                        .truncationMode(.tail)
//                        
//                        HStack {
//                            Text(categories[0])
//                                .font(.system(size: 12))
//                                .opacity(0.6)
//                            
//                            Spacer()
//                        }
//                        .lineLimit(1)
//                        .truncationMode(.tail)
//                    }
                }
            }
            .frame(maxWidth: displayOnFullResultsPage ? 500 : 280)
            .buttonStyle(PlainButtonStyle())
            .simultaneousGesture(TapGesture().onEnded { _ in
                courseController.focusCourse(course)
            })
        }
    }
    
    func formatIntViewsToString(numViews: Int) -> String {
        switch numViews {
            case 0..<1_000:
                return String(numViews)
            case 1_000..<1_000_000:
                let thousands = Double(numViews) / 1_000.0
                return String(format: "%.0fk", thousands)
            case 1_000_000...:
                let millions = Double(numViews) / 1_000_000.0
                return String(format: "%.0fM", millions)
            default:
                return "0"
            }
    }
    
}

//#Preview {
//    CourseSearchResult()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'Filters',
                                        path: 'Lectures/Views/Search/SearchModules/Filters',
                                        type: 'directory',
                                        children: [
                                            {
                                                name: 'CategoryFilterPill.swift',
                                                path: 'Lectures/Views/Search/SearchModules/Filters/CategoryFilterPill.swift',
                                                type: 'file',
                                                content: `//
//  CategoryFilterPill.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/19/25.
//

import SwiftUI

struct CategoryFilterPill: View {
    @EnvironmentObject var searchController: SearchController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    var text: String
    var accountType: Int?
    
    @State private var isSelected: Bool = false
    @State var isUpgradeAccountPopupShowing: Bool = false
    
    var body: some View {
        Button(action: {
            // Action for the button
            withAnimation(.spring()) {
                // either add or remove this category from the list in the controller
                if isSelected {
                    // remove
                    searchController.activeCategories.removeAll { $0 == text }
                } else {
                    // add
                    searchController.activeCategories.append(text)
                }
                
                isSelected.toggle()
            }
        }) {
            HStack {
                Text(text)
                    .font(.system(size: 11, weight: .medium))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background( isSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
            .foregroundColor(.primary)
            .clipShape(Capsule())
        }
        .buttonStyle(PlainButtonStyle()) // To prevent default button styling
        .sheet(isPresented: $isUpgradeAccountPopupShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountPopupShowing)
        }
    }
}

//#Preview {
//    CategoryFilterPill()
//}
`,
                                                language: 'plaintext'
                                            },
                                            {
                                                name: 'FilterSearchResultType.swift',
                                                path: 'Lectures/Views/Search/SearchModules/Filters/FilterSearchResultType.swift',
                                                type: 'file',
                                                content: `//
//  FilterSearchResultType.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/19/25.
//

import SwiftUI

struct FilterSearchResultType: View {
    @EnvironmentObject var searchController: SearchController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @State var isUpgradeAccountPopupShowing: Bool = false
    
    var accountType: Int?
    var body: some View {
        Group {
            // settings for signed out users (button's don't do anything)
//            if accountType == nil {
//                HStack {
//                    Image(systemName: "newspaper")
//                        .font(.system(size: 11, weight: .medium))
//                    
//                    Text("Lecture")
//                        .font(.system(size: 11, weight: .medium))
//                }
//                .padding(.horizontal, 16)
//                .padding(.vertical, 8)
//                .background(Color(UIColor.systemGray5))
//                .foregroundColor(.primary)
//                .clipShape(Capsule())
//                
//                
//                // Course
//                
//                HStack {
//                    Image(systemName: "mail.stack")
//                        .font(.system(size: 11, weight: .medium))
//                    
//                    Text("Course")
//                        .font(.system(size: 11, weight: .medium))
//                }
//                .padding(.horizontal, 16)
//                .padding(.vertical, 8)
//                .background(Color.orange.opacity(0.6))
//                .foregroundColor(.primary)
//                .clipShape(Capsule())
//                
//                // Channel
//                
//                HStack {
//                    Image(systemName: "graduationcap")
//                        .font(.system(size: 11, weight: .medium))
//                    
//                    Text("Channel")
//                        .font(.system(size: 11, weight: .medium))
//                }
//                .padding(.horizontal, 16)
//                .padding(.vertical, 8)
//                .background( searchController.isChannelFilterSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
//                .foregroundColor(.primary)
//                .clipShape(Capsule())
//            }
            
            
            
            
            // Lecture
            Button(action: {
                // Action for the button
                withAnimation(.spring()) {
                    searchController.isLectureFilterSelected.toggle()
                }
            }) {
                HStack {
                    Image(systemName: "newspaper")
                        .font(.system(size: 11, weight: .medium))
                    
                    Text("Lecture")
                        .font(.system(size: 11, weight: .medium))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background( searchController.isLectureFilterSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
                .foregroundColor(.primary)
                .clipShape(Capsule())
            }
            .buttonStyle(PlainButtonStyle()) // To prevent default button styling
            
            // Course
            Button(action: {
                // Action for the button
                withAnimation(.spring()) {
                    searchController.isCourseFilterSelected.toggle()
                }
            }) {
                HStack {
                    Image(systemName: "mail.stack")
                        .font(.system(size: 11, weight: .medium))
                    
                    Text("Course")
                        .font(.system(size: 11, weight: .medium))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background( searchController.isCourseFilterSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
                .foregroundColor(.primary)
                .clipShape(Capsule())
            }
            .buttonStyle(PlainButtonStyle()) // To prevent default button styling
            
            // Channel
            Button(action: {
                // Action for the button
                withAnimation(.spring()) {
                    searchController.isChannelFilterSelected.toggle()
                }
            }) {
                HStack {
                    Image(systemName: "graduationcap")
                        .font(.system(size: 11, weight: .medium))
                    
                    Text("Channel")
                        .font(.system(size: 11, weight: .medium))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background( searchController.isChannelFilterSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
                .foregroundColor(.primary)
                .clipShape(Capsule())
            }
            .buttonStyle(PlainButtonStyle()) // To prevent default button styling
        }
        .sheet(isPresented: $isUpgradeAccountPopupShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountPopupShowing)
        }
    }
}

#Preview {
    FilterSearchResultType()
}
`,
                                                language: 'plaintext'
                                            },
                                            {
                                                name: 'PlainSearchFilterPill.swift',
                                                path: 'Lectures/Views/Search/SearchModules/Filters/PlainSearchFilterPill.swift',
                                                type: 'file',
                                                content: `//
//  PlainSearchFilterPill.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/18/25.
//

import SwiftUI

struct PlainSearchFilterPill: View {
    var text: String
    
    @Binding var isSelected: Bool 
    var onTap: (Bool) -> Void  // Add this closure property
    
    var body: some View {
        Button(action: {
            // Action for the button
            withAnimation(.spring()) {
                onTap(isSelected)  // Call the closure with the new state
            }
        }) {
            HStack {
                Text(text)
                    .font(.system(size: 11, weight: .medium))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background( isSelected ? Color.orange.opacity(0.6) : Color(UIColor.systemGray5))
            .foregroundColor(.primary)
            .clipShape(Capsule())
        }
        .buttonStyle(PlainButtonStyle()) // To prevent default button styling
    }
}

//#Preview {
//    PlainSearchFilterPill()
//}
`,
                                                language: 'plaintext'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'FullChannelSearchResults.swift',
                                        path: 'Lectures/Views/Search/SearchModules/FullChannelSearchResults.swift',
                                        type: 'file',
                                        content: `//
//  FullChannelSearchResults.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct FullChannelSearchResults: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var searchController: SearchController
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                HStack {
                    Image(systemName: "person")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Channels")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    Spacer()
                }
                .padding(.top, 10)
                
                ForEach(searchController.searchResultChannels, id: \\.id) { channel in
                    NavigationLink(destination: ChannelView(channel: channel)) {
                        ChannelCard(channel: channel)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .simultaneousGesture(TapGesture().onEnded {
                        courseController.focusChannel(channel)
                    })
                }
                
                if !searchController.noChannelsLeftToLoad {
                    
                    FetchButton(isMore: true) {
                        searchController.getMoreChannels(courseController: courseController)
                    }
                    .padding(.top, 5)
                    .padding(.bottom, 80)
                    
                }
                
                Spacer()
            }
        }
        .padding(.top, 10)
        .padding(.horizontal, 20)
    }
}

#Preview {
    FullChannelSearchResults()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullCourseSearchResults.swift',
                                        path: 'Lectures/Views/Search/SearchModules/FullCourseSearchResults.swift',
                                        type: 'file',
                                        content: `//
//  FullCourseSearchResults.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct FullCourseSearchResults: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var searchController: SearchController
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                HStack {
                    Image(systemName: "mail.stack")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Courses")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    Spacer()
                }
                .padding(.top, 10)
                
                ForEach(searchController.searchResultCourses, id: \\.id) { course in
                    HStack {
                        CourseSearchResult(course: course, displayOnFullResultsPage: true)
                        Spacer()
                    }
                }
                
                if !searchController.noCoursesLeftToLoad {
                    
                    FetchButton(isMore: true) {
                        searchController.getMoreCourses(courseController: courseController)
                    }
                    .padding(.top, 5)
                    .padding(.bottom, 80)
                    
                    
                }
                
                Spacer()
            }
        }
        .padding(.top, 10)
        .padding(.horizontal, 20)
    }
}

#Preview {
    FullCourseSearchResults()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FullLecturSearchResults.swift',
                                        path: 'Lectures/Views/Search/SearchModules/FullLecturSearchResults.swift',
                                        type: 'file',
                                        content: `//
//  FullLecturSearchResults.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/24/25.
//

import SwiftUI

struct FullLecturSearchResults: View {
    @EnvironmentObject var courseController: CourseController
    @EnvironmentObject var searchController: SearchController
    
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                HStack {
                    Image(systemName: "newspaper")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    
                    Text("Lectures")
                        .font(.system(size: 10))
                        .opacity(0.8)
                    Spacer()
                }
                .padding(.top, 10)
                
                ForEach(searchController.searchResultLectures, id: \\.id) { lecture in
                    HStack {
                        LectureSearchResult(lecture: lecture, displayOnFullResultsPage: true)
                        Spacer()
                    }
                }
                
                if !searchController.noLecturesLeftToLoad {
                    
                    FetchButton(isMore: true) {
                        searchController.getMoreLectures(courseController: courseController)
                    }
                    .padding(.top, 5)
                    .padding(.bottom, 80)
                    
                }
                
                Spacer()
            }
        }
        .padding(.top, 10)
        .padding(.horizontal, 20)
    }
}

#Preview {
    FullLecturSearchResults()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LectureSearchResult.swift',
                                        path: 'Lectures/Views/Search/SearchModules/LectureSearchResult.swift',
                                        type: 'file',
                                        content: `//
//  LectureSearchResult.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/19/25.
//

import SwiftUI

struct LectureSearchResult: View {
    @EnvironmentObject var courseController: CourseController
    
    var lecture: Lecture
    @State var course: Course?
    
    var displayOnFullResultsPage: Bool
    
    var body: some View {
        Group {
            if let id = lecture.id, let courseId = lecture.courseId, let lectureTitle = lecture.lectureTitle, let lectureNumberInCourse = lecture.lectureNumberInCourse, let viewsOnYouTube = lecture.viewsOnYouTube, let courseTitle = lecture.courseTitle {
                if let course = courseController.cachedCourses[courseId] {
                    NavigationLink(destination: NewCourse(course: course, isLecturePlaying: true, playingLecture: lecture, lastWatchedLectureId: id, lastWatchedLectureNumber: lectureNumberInCourse)) {
                        HStack {
                            ZStack {
                                if let image = courseController.courseThumbnails[courseId] {
                                    Image(uiImage: image)
                                        .resizable()
                                        .aspectRatio(contentMode: .fill) // Fill the frame while maintaining aspect ratio
                                        .frame(width: 120, height: 67.5)
                                        .clipped() // Clip the image to the frame
                                        .clipShape(RoundedRectangle(cornerRadius: 10)) // Apply rounded corners
                                } else {
                                    // default image when not loaded
                                    SkeletonLoader(width: 120, height: 67.5)
                                }
                                
                                Image(systemName: "play.circle.fill") // SF Symbol for play button
                                    .resizable()
                                    .frame(width: 25, height: 25)
                                    .foregroundColor(.white)
                                    .shadow(radius: 5)
                            }
                            
                            VStack {
                                HStack {
                                    Text(lectureTitle)
                                        .font(.system(size: 14, design: .serif))
                                        .bold()
                                        .lineLimit(2)
                                        .truncationMode(.tail)
                                    
                                    Spacer()
                                }
                                
                                HStack {
                                    // TODO: add a field course name on the lecture object
                                    Text("# \\(lectureNumberInCourse) in \\(courseTitle)")
                                        .font(.system(size: 12))
                                        .opacity(0.6)
                                        .lineLimit(1)
                                        .truncationMode(.tail)
                                    
                                    Spacer()
                                }
                                
                                
                                HStack {
                                    Text("\\(formatIntViewsToString(numViews: viewsOnYouTube)) Views")
                                        .font(.system(size: 12))
                                        .opacity(0.6)
                                        .lineLimit(1)
                                        .truncationMode(.tail)
                                    Spacer()
                                }
                            }
                        }
                    }
                    .frame(maxWidth: displayOnFullResultsPage ? 500:  280)
                    .buttonStyle(PlainButtonStyle())
                    .simultaneousGesture(TapGesture().onEnded { _ in
                        //                    courseController.focusLecture(lecture)
                        courseController.focusCourse(course)
                    })
                } else {
                    SkeletonLoader(width: 120, height: 67.5)
                }
            }
        }
        .onAppear {
            // We need to fetch the relevant course in case the user wants to tap this lecture and watch it
            if let courseId = lecture.courseId {
                courseController.retrieveCourse(courseId: courseId)
            }
        }
    }
    
    func formatIntViewsToString(numViews: Int) -> String {
        switch numViews {
            case 0..<1_000:
                return String(numViews)
            case 1_000..<1_000_000:
                let thousands = Double(numViews) / 1_000.0
                return String(format: "%.0fk", thousands)
            case 1_000_000...:
                let millions = Double(numViews) / 1_000_000.0
                return String(format: "%.0fM", millions)
            default:
                return "0"
            }
    }
}

//#Preview {
//    LectureSearchResult()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SearchBarWithFilters.swift',
                                        path: 'Lectures/Views/Search/SearchModules/SearchBarWithFilters.swift',
                                        type: 'file',
                                        content: `//
//  SearchBarWithFilters.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/28/24.
//

import SwiftUI

struct SearchBarWithFilters: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var searchController: SearchController
    @EnvironmentObject var courseController: CourseController
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @State var isUpgradeAccountPopupShowing: Bool = false
    
    var accountType: Int?
    var body: some View {
        VStack {
            HStack {
                // Search Icon
                Image(systemName: "magnifyingglass")
                
                // Search TextField
                TextField("Search", text: $searchController.searchText)
                    .font(.system(size: 16))
                    .textFieldStyle(PlainTextFieldStyle())
                    .onSubmit {
                        if let rateLimit = rateLimiter.processWrite() {
                            print(rateLimit)
                            return
                        }
                        
                        searchController.areFiltersShowing = false
                        searchController.performSearch(courseController: courseController)
                        hideKeyboard()
                    }
                
                
                // Clear Button (X Icon)
                if !searchController.searchText.isEmpty {
                    Button(action: {
                        searchController.searchText = "" // Clear the text
                        searchController.clearSearchResults()
                    }) {
                        Image(systemName: "xmark")
                            .foregroundStyle(Color.red)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.trailing, 10)
                }
                    
                
                // Submit search Button
                if !searchController.searchText.isEmpty {
                    Button(action: {
                        if let rateLimit = rateLimiter.processWrite() {
                            print(rateLimit)
                            return
                        }
                        
                        searchController.areFiltersShowing = false
                        searchController.performSearch(courseController: courseController)
                        hideKeyboard()
                        
                    }) {
                        Image(systemName: "arrow.forward.circle.fill")
                            .foregroundStyle(Color.green)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.trailing, 10)
                }
                
                // filters
                Button(action: {
                    withAnimation(.spring()) {
                        searchController.areFiltersShowing.toggle()
                    }
                }) {
                    Image(systemName: "text.alignright")
                }
                .buttonStyle(PlainButtonStyle())
            }
            
            if searchController.areFiltersShowing {
                // Result Type
                // Categories
                Group {
                    HStack {
                        Text("Result Type")
                            .font(.system(size: 12))
                        Spacer()
                    }
                    .padding(.top, 10)
                    
                    HStack {
                        
                        FilterSearchResultType(accountType: accountType)
                        
                        
                        Spacer()
                    }
                }
                
                // Categories
                Group {
                    HStack {
                        Text("Categories")
                            .font(.system(size: 12))
                        Spacer()
                    }
                    .padding(.top, 10)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack {
                            ForEach(searchController.categoryList, id: \\.self) { category in
                                if let accountType = accountType {
                                    CategoryFilterPill(text: category, accountType: accountType)
                                } else {
                                    CategoryFilterPill(text: category)
                                }
                            }
                            
                            Spacer()
                        }
                    }
                }
                
                
                // Course Size (selecting any of these removes lectures from search results)
                Group {
                    HStack {
                        Text("Course Size")
                            .font(.system(size: 12))
                        Spacer()
                    }
                    .padding(.top, 10)
                    
                    HStack {
                        PlainSearchFilterPill(text: "<5 lecture", isSelected: $searchController.lessThanFiveLectures, onTap: { isSelected in
                            if isSelected {
                                searchController.lessThanFiveLectures = false
                            } else {
                                searchController.lessThanFiveLectures = true
                                searchController.greaterThanFiveLectures = false
                                searchController.greaterThanTenLectures = false
                            }
                        })
                        
                        
                        PlainSearchFilterPill(text: ">5 lecture", isSelected: $searchController.greaterThanFiveLectures, onTap: { isSelected in
                            if isSelected {
                                searchController.greaterThanFiveLectures = false
                            } else {
                                searchController.lessThanFiveLectures = false
                                searchController.greaterThanFiveLectures = true
                                searchController.greaterThanTenLectures = false
                            }
                        })
                        PlainSearchFilterPill(text: ">10 lecture", isSelected: $searchController.greaterThanTenLectures, onTap: { isSelected in
                            if isSelected {
                                searchController.greaterThanTenLectures = false
                            } else {
                                searchController.lessThanFiveLectures = false
                                searchController.greaterThanFiveLectures = false
                                searchController.greaterThanTenLectures = true
                            }
                        })
                        
                        Spacer()
                    }
                }
                
                
                // Sort By
                Group {
                    HStack {
                        Text("Sory By")
                            .font(.system(size: 12))
                        Spacer()
                    }
                    .padding(.top, 10)
                    
                    HStack {
                        PlainSearchFilterPill(text: "Most Watched", isSelected: $searchController.sortByMostWatched, onTap: { isSelected in
                            if !isSelected {
                                searchController.sortByMostWatched = true
                                searchController.sortByMostLiked = false
                            }
                        })
                        
//                        PlainSearchFilterPill(text: "Most Liked", isSelected: $searchController.sortByMostLiked, onTap: { isSelected in
//                            if let accountType = accountType {
//                                if accountType == 0 {
//                                    isUpgradeAccountPopupShowing = true
//                                } else {
//                                    if !isSelected {
//                                        searchController.sortByMostWatched = false
//                                        searchController.sortByMostLiked = true
//                                    }
//                                }
//                            }
//                        })
                        
                        Spacer()
                    }
                }
                
                
            }
        }
        .padding(10)
        .background(colorScheme == .light ? Color.black.opacity(0.05) : Color.white.opacity(0.2))
        .cornerRadius(20) // Rounded corners
        .padding(.top, 10)
        .sheet(isPresented: $isUpgradeAccountPopupShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeAccountPopupShowing)
        }
        
    }
}

#Preview {
    SearchBarWithFilters()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SearchedCourse.swift',
                                        path: 'Lectures/Views/Search/SearchModules/SearchedCourse.swift',
                                        type: 'file',
                                        content: `//
//  SearchedCourse.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/28/24.
//

import SwiftUI

struct SearchedCourse: View {
    @State private var isLiked = false
    var coverImage: String
    var universityImage: String
    var courseName: String
    var universityName: String
    var numLectures: Int
    var watchTimeinHrs: Int
    var totalViews: String
    
    var body: some View {
        // A single course showing up in the search results
        // start with the image
        Image(coverImage)
            .resizable()
            .frame(maxWidth: .infinity, maxHeight: 220)
        
        // Then the info
        HStack {
            // University Photo
            Image(universityImage)
                .resizable()
                .clipShape(RoundedRectangle(cornerRadius: 15))
                .frame(width: 40, height: 40)
            
            VStack {
                // Course Name
                Text(courseName)
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                HStack {
                    Text(universityName)
                        .font(.system(size: 12, design: .serif))
                        .opacity(0.6)
                    
                    Text("\\(numLectures) Lectures")
                        .font(.system(size: 12, design: .serif))
                        .opacity(0.6)
                    
                    Text("\\(watchTimeinHrs)hr Watch Time")
                        .font(.system(size: 12, design: .serif))
                        .opacity(0.6)
                    
                    Text("\\(totalViews) Views")
                        .font(.system(size: 12, design: .serif))
                        .opacity(0.6)
                    
                    Spacer()
                }
            }
            
            Spacer()
            
            // Heart icon
            Button(action: {
                isLiked.toggle()
            }) {
                Image(systemName: isLiked ? "heart.fill" : "heart")
                    .foregroundColor(isLiked ? .red : .secondary)
            }
        }
        .padding(.horizontal, 10)
        .padding(.bottom, 10)
    }
}

#Preview {
    SearchedCourse(coverImage: "mit", universityImage: "stanford", courseName: "The Emotion Machine", universityName: "MIT", numLectures: 6, watchTimeinHrs: 9, totalViews: "50M")
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Settings',
                        path: 'Lectures/Views/Settings',
                        type: 'directory',
                        children: [
                            {
                                name: 'SettingsMainView.swift',
                                path: 'Lectures/Views/Settings/SettingsMainView.swift',
                                type: 'file',
                                content: `//
//  SettingsMainView.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/29/24.
//

import SwiftUI

struct SettingsMainView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    // App Storage: isSignedIn tracks auth status throughout app
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    @EnvironmentObject var authController: AuthController
    
    @State var signUpSheetShowing: Bool = false
    var body: some View {
        NavigationView {
            VStack {
                TopBrandView()
                
                ScrollView(showsIndicators: false) {
                    Text("General")
                        .font(.system(size: 15, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .bold()
                        .padding(.top, 10)
                        .padding(.bottom, 10)
                    
                    SingleSettingsLink(iconName: "person", settingName: "Account Information", destination: AccountInformation(), disableIfSignedOut: false)
//                    SingleSettingsLink(iconName: "wallet.pass", settingName: "Subscription Type", destination: SubscriptionType(), disableIfSignedOut: false)
//                    SingleSettingsLink(iconName: "dollarsign.square", settingName: "Purchase History", destination: PurchaseHistory())
                    SingleSettingsLink(iconName: "moon", settingName: "Appearance", destination: Appearance(), disableIfSignedOut: false)
//                    SingleSettingsLink(iconName: "bell", settingName: "Notifications", destination: Notifications())
                    
                    Text("Support")
                        .font(.system(size: 15, design: .serif))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .bold()
                        .padding(.top, 10)
                        .padding(.bottom, 10)
                    
                    
                    // Leave a tip
                    SingleSettingsLink(iconName: "heart", settingName: "Support Developer", destination: SupportDeveloper(), disableIfSignedOut: false)
                    SingleSettingsLink(iconName: "exclamationmark.circle", settingName: "Report Issues", destination: ReportIssues(), disableIfSignedOut: false)
                    SingleSettingsLink(iconName: "questionmark.app", settingName: "FAQ", destination: FAQ(), disableIfSignedOut: false)
                    SingleSettingsLink(iconName: "info.circle", settingName: "Licesne Information", destination: LicenseInformation(), disableIfSignedOut: false)
                    SingleSettingsLink(iconName: "hand.raised.circle", settingName: "Privacy Policy", destination: PrivacyPolicy(), disableIfSignedOut: false)
                    ExternalSettingsLink(
                        iconName: "filemenu.and.cursorarrow",
                        settingName: "End User License Agreement (EULA)",
                        url: URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/") ?? URL(fileURLWithPath: "")
                    )
                    
                    
                    if !isSignedIn {
                        Image(systemName: "person.crop.circle.fill")
                            .font(.system(size: 30))
                            .foregroundColor(.gray.opacity(0.3))
                            .padding(.top, 40)
                        
                        Text("You're not logged in")
                            .font(.system(size: 13, design: .serif))
                            .foregroundColor(.gray)
                            .multilineTextAlignment(.center)

                        Button(action: {
                            signUpSheetShowing = true
                        }) {
                            Text("Sign Up / Sign In")
                                .font(.system(size: 14))
                                .foregroundColor(.white)
                                .padding(.horizontal, 20)
                                .padding(.vertical, 10)
                                .background(Color.blue)
                                .cornerRadius(20)
                        }
                        .sheet(isPresented: $signUpSheetShowing) {
                            ProAccountButNotSignedInSheet(displaySheet: $signUpSheetShowing)
                        }
                    }
                    
                    if isSignedIn {
                        SignOutButton()
                        
                        DeleteAccountButton()
                    }
                }
                
                
                
                
                
            }
            .navigationBarHidden(true)
            .padding(.horizontal, 20)
        }
        // Needed for iPad compliance
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

struct SingleSettingsLink<Destination: View>: View {
    // App Storage: isSignedIn tracks auth status throughout app
    @AppStorage("isSignedIn") private var isSignedIn = false
    
    var iconName: String
    var settingName: String
    var destination: Destination
    var disableIfSignedOut: Bool
    
    var body: some View {
        VStack {
            NavigationLink(destination: destination) {
                HStack {
                    // icon
                    Image(systemName: iconName)
                    
                    // text
                    Text(settingName)
                        .font(.system(size: 14, design: .serif))
                    
                    Spacer()
                    
                    // arrow
                    Image(systemName: "chevron.right")
                }
                .contentShape(Rectangle())
            }
            .disabled(disableIfSignedOut && !isSignedIn)
            .buttonStyle(PlainButtonStyle())
            
            Divider()
                .padding(.bottom, 5)
        }
    }
}

struct ExternalSettingsLink: View {
    @Environment(\\.openURL) private var openURL
    
    var iconName: String
    var settingName: String
    var url: URL
    
    var body: some View {
        VStack {
            Button {
                openURL(url)
            } label: {
                HStack {
                    Image(systemName: iconName)
                    
                    Text(settingName)
                        .font(.system(size: 14, design: .serif))
                    
                    Spacer()
                    
                    Image(systemName: "arrow.up.right.square")
                }
            }
            .buttonStyle(PlainButtonStyle())
            
            Divider()
                .padding(.bottom, 5)
        }
    }
}

#Preview {
    SettingsMainView()
        .environmentObject(AuthController())
}
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'SettingsMoudles',
                                path: 'Lectures/Views/Settings/SettingsMoudles',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'DeleteAccountButton.swift',
                                        path: 'Lectures/Views/Settings/SettingsMoudles/DeleteAccountButton.swift',
                                        type: 'file',
                                        content: `//
//  DeleteAccountButton.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//

import SwiftUI

struct DeleteAccountButton: View {
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @State private var isHolding = false
    @State private var holdTime: CGFloat = 0.0
    private let holdDuration: CGFloat = 2.0 // Required hold time in seconds
    
    @State var isConfirmDeleteAccountAlertShowing: Bool = false
    var body: some View {
        VStack {
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(lineWidth: 1)
                        .foregroundColor(.red)
                    
                    RoundedRectangle(cornerRadius: 8)
                        .trim(from: 0, to: min(holdTime / holdDuration, 1)) // Ensure it stops at 1
                        .stroke(style: StrokeStyle(lineWidth: 5, lineCap: .square))
                        .foregroundColor(.red)
                        .animation(.easeInOut, value: holdTime)
                    
                    Text("Hold to Delete Account")
                        .font(.system(size: 16, design: .serif))
                        .foregroundColor(.red)
                }
                .frame(height: 40)
                .padding(.horizontal, 1)
                .gesture(
                    DragGesture(minimumDistance: 0)
                        .onChanged { _ in
                            if !isHolding {
                                isHolding = true
                                startHoldTimer()
                            }
                        }
                        .onEnded { _ in
                            isHolding = false
                            stopHoldTimer()
                        }
                )
            }
        .padding(.top, 5)
        .alert("Are you sure?", isPresented: $isConfirmDeleteAccountAlertShowing) {
            Button("Confirm") {
                // delete local user
                userController.deleteUser()
                // delete auth
                authController.deleteAuthUser()
                
//                subscriptionController.logOutRevenueCat()
            }
            
            Button("Cancel", role: .cancel) { }
        }
    }
    
    private func startHoldTimer() {
        Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { timer in
            if isHolding {
                holdTime += 0.1
                if holdTime >= holdDuration {
                    timer.invalidate()
                    performDeleteAction()
                }
            } else {
                timer.invalidate()
            }
        }
    }
    
    private func stopHoldTimer() {
        holdTime = 0 // Reset hold time
    }
    
    private func performDeleteAction() {
        holdTime = 0
        isConfirmDeleteAccountAlertShowing = true
    }
}

#Preview {
    DeleteAccountButton()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SignOutButton.swift',
                                        path: 'Lectures/Views/Settings/SettingsMoudles/SignOutButton.swift',
                                        type: 'file',
                                        content: `//
//  SignOutButton.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//

import SwiftUI

struct SignOutButton: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var authController: AuthController
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var myCourseController: MyCourseController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    var body: some View {
        // Log Out
        Button(action: {
            // Sign out of account - auth
            authController.logOut()
            userController.logOut()
//            subscriptionController.logOutRevenueCat()
            
            // clear any local vars in the app
            
            // watch history
            myCourseController.watchHistories = []
            
            
        }) {
            RoundedRectangle(cornerRadius: 8)
                .stroke(lineWidth: 1)
                .frame(height: 40)
                .overlay(
                    Text("Log Out")
                        .font(.system(size: 16, design: .serif))
                )
                .padding(.top, 30)
                .padding(.horizontal, 1)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'SettingsSections',
                                path: 'Lectures/Views/Settings/SettingsSections',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'AccountInformation.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/AccountInformation.swift',
                                        type: 'file',
                                        content: `//
//  AccountInformation.swift
//  Lectures
//
//  Created by Ben Dreyer on 12/31/24.
//

import FirebaseAuth
import SwiftUI

struct AccountInformation: View {
    // Light / Dark Theme
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var userController: UserController
    
    @State private var signInMethod: String?
    
    @State private var editNamePopover = false
    @State private var firstName = ""
    @State private var lastName = ""
    
    @State var signUpSheetShowing: Bool = false
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                Text("Account Information")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                
                if let user = userController.user {
                    // name
                    HStack {
                        // icon
                        Image(systemName: "person")
                        
                        // text
                        if let firstName = user.firstName, let lastName = user.lastName {
                            Text("\\(firstName) \\(lastName)")
                                .font(.system(size: 14, design: .serif))
                        }
                        
                        // edit button
                        Button(action: {
                            if let rateLimit = rateLimiter.processWrite() {
                                print(rateLimit)
                                return
                            }
                            
                            editNamePopover = true
                        }) {
                            Image(systemName: "square.and.pencil")
                                .imageScale(.medium)
                                .padding(.leading, 4)  // Add some space before the button
                        }
                        .buttonStyle(PlainButtonStyle())
                        .alert("Edit Name", isPresented: $editNamePopover) {
                            
                            if colorScheme == .light {
                                TextField("First Name", text: $firstName)
                                    .foregroundStyle(Color.black)
                                TextField("Last Name", text: $lastName)
                                    .foregroundStyle(Color.black)
                            } else if colorScheme == .dark {
                                TextField("First Name", text: $firstName)
                                    .foregroundStyle(Color.white)
                                TextField("Last Name", text: $lastName)
                                    .foregroundStyle(Color.white)
                            }
                            
                            
                            HStack {
                                Button("Cancel", role: .cancel) {
                                    editNamePopover = false
                                }.foregroundColor(.red)
                                Button("Save", role: .none) {
                                    if firstName != "" && lastName != "" {
                                        // change name
                                        userController.changeName(firstName: firstName, lastName: lastName)
                                    }
                                }.foregroundColor(.blue)
                            }
                        }
                        
                        Spacer()
                    }
                    
                    Divider()
                    
                    // email
                    HStack {
                        // icon
                        Image(systemName: "envelope")
                        
                        // text
                        if let email = user.email {
                            Text(email)
                                .font(.system(size: 14, design: .serif))
                        }
                        Spacer()
                    }
                    
                    Divider()
                    
                    // signin method
                    if let signInMethod = self.signInMethod {
                        HStack {
                            // image
                            if signInMethod == "Google" {
                                Image("google_logo")
                                    .resizable()
                                    .frame(width: 20, height: 20)
                            } else {
                                Image(systemName: "apple.logo")
                                    .resizable()
                                    .frame(width: 20, height: 20)
                            }
                            
                            Text("Authenticated with ")
                                .font(.system(size: 14, design: .serif))
                            
                            if signInMethod == "Google" {
                                Text("Google")
                                    .font(.system(size: 14, design: .serif))
                                    .bold()
                            } else {
                                Text("Apple")
                                    .font(.system(size: 14, design: .serif))
                                    .bold()
                            }
                            
                            Spacer()
                        }
                    }
                } else {
                    
                    Image(systemName: "person.crop.circle.fill")
                        .font(.system(size: 30))
                        .foregroundColor(.gray.opacity(0.3))
                        .padding(.top, 40)
                    
                    Text("You're not logged in")
                        .font(.system(size: 13, design: .serif))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                    
                    Button(action: {
                        signUpSheetShowing = true
                    }) {
                        Text("Sign Up / Sign In")
                            .font(.system(size: 14))
                            .foregroundColor(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(Color.blue)
                            .cornerRadius(20)
                    }
                    .sheet(isPresented: $signUpSheetShowing) {
                        FirstOpenSignUpSheet(text: "", displaySheet: $signUpSheetShowing)
                            .presentationDetents([.fraction(0.25), .medium]) // User can drag between these heights
                    }
                }
            }
        }
        .padding(.horizontal, 20)
        .onAppear {
            if let provider = getSignInProvider() {
                print("User signed in with: \\(provider)")
                self.signInMethod = provider
            }
        }
    }
    
    
    func getSignInProvider() -> String? {
        guard let user = Auth.auth().currentUser,
              let providerData = user.providerData.first else {
            return nil
        }
        
        switch providerData.providerID {
        case "google.com":
            return "Google"
        case "apple.com":
            return "Apple"
        default:
            return providerData.providerID
        }
    }
}

#Preview {
    AccountInformation()
        .environmentObject(UserController())
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'Appearance.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/Appearance.swift',
                                        type: 'file',
                                        content: `//
//  Appearance.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/20/25.
//

import SwiftUI

struct Appearance: View {
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @State var isUpgradeSheetShowing: Bool = false
    
    @State private var selectedIcon: String? = nil
    private let appIcons = [
        (name: "Default", iconName: nil),
        (name: "Dark", iconName: "AppIconDark"),
        (name: "Light", iconName: "AppIconLight")
    ]
    
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                Text("Appearance")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                // Dark Mode
                HStack {
                    // icon
                    Image(systemName: "moon")
                    
                    // text
                    
                    Text("Dark Mode")
                        .font(.system(size: 14, design: .serif))
                    
                    
                    Toggle("", isOn: $isDarkMode)
                        .padding(.trailing, 5)
                        .onChange(of: isDarkMode) { newValue in
                            // Code to run when the toggle changes
                            if newValue {
                                isDarkMode = true
                            } else {
                                isDarkMode = false
                            }
                        }
                    
                    
                    Spacer()
                    
                    
                }
                Divider()
            }
        }
        .padding(.horizontal, 20)
        .sheet(isPresented: $isUpgradeSheetShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeSheetShowing)
        }
    }
}

#Preview {
    Appearance()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'FAQ.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/FAQ.swift',
                                        type: 'file',
                                        content: `//
//  FAQ.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/22/25.
//

import SwiftUI

struct FAQ: View {
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                Text("Frequently Asked Questions")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                FAQItem(
                    question: "What content is available on this app?",
                    answer: "Our app provides access to publicly available university lectures from various institutions worldwide. These lectures are sourced from YouTube and cover a wide range of subjects including Computer Science, Mathematics, Physics, and more."
                )
                
                FAQItem(
                    question: "Is the content really free?",
                    answer: "Yes! All lectures and educational resources on our platform are completely free. The content comes from publicly available sources, and we've organized it to make learning more accessible."
                )
                
                FAQItem(
                    question: "How does Pro Account work?",
                    answer: "If you initially signed up with a Pro account or you chose to upgrade later, you will recieve additional features in the app to personalize your learning journey. You can access additional features such as: Course History, Extensive Search, Following Channels, Saving Lectures, Related Course Recommendations and more."
                )
                
                FAQItem(
                    question: "I bought a Pro account but want to log in to Lectura using another account",
                    answer: "Your subscription status will track across accounts as long as you are logging in on the same device. In order for your subcription to track across multiple devices, you will need to login in to Lectura using the same method which you used for the account where the Pro subscription was purchased."
                )
                
                FAQItem(
                    question: "I bought pro account but the app is telling me I have a free account",
                    answer: "Sometimes the app can lose track of your subscription status, but don't worry if you navigate to Settings > Subscription Type and click Restore Purchases, your subscription status should return."
                )
                
                FAQItem(
                    question: "What additional resources are available?",
                    answer: "Each lecture comes with supplementary learning materials such as lecture notes, practice problems, reading lists, and links to relevant educational resources. These materials are also freely available and carefully curated to enhance your learning experience."
                )
                
                FAQItem(
                    question: "Can I download lectures for offline viewing?",
                    answer: "You cannot download lectures on this app, but you may be able to through youtube itself."
                )
                
                FAQItem(
                    question: "How are the courses organized?",
                    answer: "Courses are organized by subject, university, and difficulty level. You can browse through different categories or use our search feature to find specific topics."
                )
                
                FAQItem(
                    question: "Can I track my progress?",
                    answer: "Yes, the app includes features to track your progress through courses, mark lectures as completed, and save your favorite content for later viewing."
                )
                
                FAQItem(
                    question: "How can I report technical issues or suggest improvements?",
                    answer: "You can report issues or provide feedback through the Settings menu in the app. We value user feedback and continuously work to improve the learning experience."
                )
            }
        }
        .padding(.horizontal, 20)
    }
}

struct FAQItem: View {
    let question: String
    let answer: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(question)
                .font(.title3)
                .fontWeight(.bold)
            
            Text(answer)
                .font(.body)
                .foregroundColor(.secondary)
        }
        .padding(.bottom, 10)
    }
}

#Preview {
    FAQ()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'LicenseInformation.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/LicenseInformation.swift',
                                        type: 'file',
                                        content: `//
//  LicenseInformation.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/22/25.
//

import SwiftUI

struct LicenseInformation: View {
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                Text("License Information")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                // Lecture Content Section
                LicenseSectionView(
                    title: "Lecture Content and Video Materials",
                    content: "The lectures and video content available in this application are not owned by Lectura. All video content is sourced from publicly available YouTube channels maintained by their respective universities and educational institutions. The rights to these lectures, including but not limited to:",
                    bulletPoints: [
                        "Video recordings",
                        "Audio content",
                        "Visual presentations",
                        "Lecture slides shown in videos",
                        "Original course materials presented in lectures"
                    ],
                    footer: "remain the exclusive property of their respective universities, professors, and content creators. Our application serves as an educational platform that organizes and presents this publicly available content in an accessible format for learning purposes."
                )
                
                // Supplementary Resources Section
                LicenseSectionView(
                    title: "Supplementary Educational Resources",
                    content: "The supplementary educational resources provided alongside the lectures, including:",
                    bulletPoints: [
                        "Practice problems",
                        "Study guides",
                        "Sample examinations",
                        "Problem sets",
                        "Learning exercises",
                        "Study materials",
                        "Review questions"
                    ],
                    footer: "are original works created by Lectura, inspired by and based on the concepts and topics discussed in the associated lectures. While these resources are designed to complement the lecture content, they are distinct and original materials."
                )
                
                // Usage Rights Section
                VStack(alignment: .leading, spacing: 16) {
                    Text("Usage Rights and Restrictions")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("Educational Use License")
                        .font(.title3)
                        .fontWeight(.semibold)
                    
                    Text("The supplementary educational resources are provided under a limited educational use license. This license:")
                        .padding(.bottom, 4)
                    
                    VStack(alignment: .leading, spacing: 16) {
                        PermissionsView(
                            title: "Permits users to:",
                            items: [
                                "Access and use the materials for personal educational purposes",
                                "Make copies for individual study use",
                                "Share with other registered users within the platform's ecosystem"
                            ]
                        )
                        
                        PermissionsView(
                            title: "Strictly prohibits:",
                            items: [
                                "Commercial use or monetization of any kind",
                                "Distribution outside the platform",
                                "Creation of derivative works for commercial purposes",
                                "Using the materials in paid tutoring or educational services",
                                "Republishing or redistributing the content on other platforms"
                            ]
                        )
                    }
                }
                
                // Commercial Use Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Commercial Use Restriction")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("The supplementary educational resources provided in this application are strictly for educational purposes only. Any commercial use, including but not limited to:")
                    
                    BulletListView(items: [
                        "Selling or monetizing the materials",
                        "Using the materials in paid courses",
                        "Incorporating the materials into commercial educational products",
                        "Using the materials in paid tutoring services",
                        "Creating and selling derivative works"
                    ])
                    
                    Text("is expressly prohibited without written permission from Lectura.")
                }
                
                // Copyright Notice
                VStack(alignment: .leading, spacing: 12) {
                    Text("Copyright Notice")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("© \\(Calendar.current.component(.year, from: Date())) Lectura. All rights reserved for supplementary educational resources.")
                    
                    Text("The application respects the intellectual property rights of all content creators and universities. If you believe any content violates copyright law or requires additional attribution, please contact our support team immediately.")
                }
                
                // Disclaimer
                VStack(alignment: .leading, spacing: 12) {
                    Text("Disclaimer")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("While we strive to ensure all supplementary materials are original and do not infringe on any existing copyrights, we respect the intellectual property rights of others. If you believe any content violates your copyright, please contact us with relevant details for prompt review and appropriate action.")
                }
            }
        }
        .padding(.horizontal, 20)
    }
    
    
}

// Helper Views
struct LicenseSectionView: View {
    let title: String
    let content: String
    let bulletPoints: [String]
    let footer: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.title2)
                .fontWeight(.bold)
            
            Text(content)
            
            BulletListView(items: bulletPoints)
            
            Text(footer)
        }
        .padding(.bottom, 10)
    }
}

struct PermissionsView: View {
    let title: String
    let items: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .fontWeight(.semibold)
            
            BulletListView(items: items)
        }
        .padding(.bottom, 10)
    }
}

struct BulletListView: View {
    let items: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(items, id: \\.self) { item in
                HStack(alignment: .top, spacing: 8) {
                    Text("•")
                    Text(item)
                }
            }
        }
        .padding(.leading, 4)
        .padding(.bottom, 10)
    }
}

#Preview {
    LicenseInformation()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'Notifications.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/Notifications.swift',
                                        type: 'file',
                                        content: `////
////  Notifications.swift
////  Lectures
////
////  Created by Ben Dreyer on 1/20/25.
////
//
//import SwiftUI
//
//struct Notifications: View {
//    @EnvironmentObject var userController: UserController
//    @EnvironmentObject var subscriptionController: SubscriptionController
//    
//    @State var areNotificationsEnabled: Bool = true
//    @State var isUpgradeSheetShowing: Bool = false
//    var body: some View {
//        VStack {
//            ScrollView(showsIndicators: false) {
//                Text("Notifications")
//                    .font(.system(size: 15, design: .serif))
//                    .frame(maxWidth: .infinity, alignment: .leading)
//                    .bold()
//                    .padding(.bottom, 10)
//                
//                if let user = userController.user, let accountType = user.accountType {
//                    if accountType == 0 {
//                        // name
//                        HStack {
//                            // icon
//                            Image(systemName: "bell")
//                            
//                            // text
//                            
//                            Text("Upgrade to customize notifications")
//                                .font(.system(size: 14, design: .serif))
//                            
//                            
//                            
//                            Spacer()
//                            
//                            // edit button
//                            Button(action: {
//                                isUpgradeSheetShowing = true
//                            }) {
//                                Text("Upgrade")
//                                    .foregroundColor(.white)
//                                    .padding(5)
//                                    .background(Color.orange)
//                                    .cornerRadius(5)
//                            }
//                            .buttonStyle(PlainButtonStyle())
//                            
//                        }
//                        
//                        Divider()
//                    } else {
//                        HStack {
//                            // icon
//                            Image(systemName: "bell")
//                            
//                            // text
//                            
//                            Text("Enable Notifications")
//                                .font(.system(size: 14, design: .serif))
//                            
//                            
//                            
//                            Spacer()
//                            Toggle("", isOn: $areNotificationsEnabled)
//                                .padding(.trailing, 5)
//                        }
//                    }
//                }
//            }
//        }
//        .padding(.horizontal, 20)
//        .sheet(isPresented: $isUpgradeSheetShowing) {
//            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeSheetShowing)
//        }
//    }
//}
//
//#Preview {
//    Notifications()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'PrivacyPolicy.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/PrivacyPolicy.swift',
                                        type: 'file',
                                        content: `//
//  PrivacyPolicy.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/22/25.
//

import SwiftUI

struct PrivacyPolicy: View {
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                Text("Privacy Policy")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                Text("Last Updated: January 22, 2025")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                
                Text("This Privacy Policy describes how Lectura (\\"Lectura\\", \\"we\\", \\"us\\", or \\"our\\") collects, uses, and shares your personal information when you use our educational mobile application (\\"App\\").")
                
                SectionHeader(title: "Information We Collect")
                VStack(alignment: .leading, spacing: 8) {
                    Text("We collect the following information from you when you use the App:")
                    BulletPoint(text: "Personal Information: This may include your name, email address, username, and learning preferences.")
                    BulletPoint(text: "Academic Progress Data: This may include your course progress, completed lectures, quiz results, and study history.")
                    BulletPoint(text: "Usage Data: This may include information about how you use the App, such as which lectures you watch, resources you access, and time spent studying.")
                    BulletPoint(text: "Device Information: This may include information about your device, such as your device type, operating system, and IP address.")
                }
                
                SectionHeader(title: "How We Use Your Information")
                VStack(alignment: .leading, spacing: 8) {
                    BulletPoint(text: "Provide and operate the educational platform and its features;")
                    BulletPoint(text: "Track and save your learning progress;")
                    BulletPoint(text: "Recommend relevant lectures and educational resources;")
                    BulletPoint(text: "Communicate with you about your educational journey and the App;")
                    BulletPoint(text: "Personalize your learning experience within the App;")
                    BulletPoint(text: "Analyze how you use the App to improve our educational services;")
                    BulletPoint(text: "Comply with legal and regulatory obligations.")
                }
                
                SectionHeader(title: "Sharing Your Information")
                VStack(alignment: .leading, spacing: 8) {
                    BulletPoint(text: "Educational institutions whose content is featured on our platform;")
                    BulletPoint(text: "Service providers who help us operate the App and provide our services;")
                    BulletPoint(text: "Analytics partners who help us improve our educational offerings;")
                    BulletPoint(text: "Law enforcement or other government officials, if required by law;")
                    BulletPoint(text: "Other third parties with your explicit consent.")
                }
                
                SectionHeader(title: "Academic Data Protection")
                VStack(alignment: .leading, spacing: 8) {
                    BulletPoint(text: "Your learning progress and academic performance are kept private;")
                    BulletPoint(text: "Educational resources you create or save are stored securely;")
                    BulletPoint(text: "We do not share your individual learning data with universities or content providers.")
                }
                
                SectionHeader(title: "Your Choices")
                VStack(alignment: .leading, spacing: 8) {
                    Text("You can access, update, or delete your personal information by contacting us at support@lectura.com. You can also choose to:")
                    BulletPoint(text: "Control which aspects of your learning progress are visible to others;")
                    BulletPoint(text: "Opt out of educational content recommendations;")
                    BulletPoint(text: "Download your learning history and progress data;")
                    BulletPoint(text: "Delete your account and associated learning data.")
                }
                
                SectionHeader(title: "Security")
                Text("We implement appropriate technical and organizational measures to protect your personal and academic information. However, no internet transmission is completely secure, and we cannot guarantee absolute security of your information.")
                
                SectionHeader(title: "Educational Content")
                VStack(alignment: .leading, spacing: 8) {
                    BulletPoint(text: "The lecture content available through our App is sourced from publicly available university courses;")
                    BulletPoint(text: "We strive to ensure all educational content is appropriate and accurate;")
                    BulletPoint(text: "If you encounter any issues with course content, please report it through our support system.")
                }
                
                SectionHeader(title: "Age Restrictions")
                Text("The App is intended for users aged 16 and older. Users between 13 and 16 may use the App with parental consent. We do not knowingly collect personal information from users under 13 years of age.")
                
                SectionHeader(title: "Changes to This Policy")
                Text("We may update this Privacy Policy to reflect changes in our practices or for legal compliance. We will notify you of any material changes by posting the new Privacy Policy on the App and sending you an email notification.")
                
                SectionHeader(title: "Contact Us")
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text("Email: ")
                        Link("lecturalearning@gmail.com", destination: URL(string: "mailto:lecturalearning@gmail.com") ?? URL(string: "https://")!)
                            .foregroundColor(.blue)
                    }
                }
                
                SectionHeader(title: "Educational Institution Partnerships")
                Text("If you are accessing content from a specific educational institution through our App, additional privacy terms from that institution may apply. Please refer to the specific institution's privacy policy for more information.")
            }
        }
        .padding(.horizontal, 20)
    }
}

struct SectionHeader: View {
    let title: String
    
    var body: some View {
        Text(title)
            .font(.headline)
            .padding(.top, 16)
    }
}

struct BulletPoint: View {
    let text: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 8) {
            Text(text)
                .font(.body)
                .lineLimit(nil)
        }
    }
}

#Preview {
    PrivacyPolicy()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'PurchaseHistory.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/PurchaseHistory.swift',
                                        type: 'file',
                                        content: `////
////  PurchaseHistory.swift
////  Lectures
////
////  Created by Ben Dreyer on 1/20/25.
////
//
//import SwiftUI
//
//struct PurchaseHistory: View {
//    @EnvironmentObject var userController: UserController
//    
//    var body: some View {
//        VStack {
//            ScrollView(showsIndicators: false) {
//
//                Text("Purchase History")
//                    .font(.system(size: 15, design: .serif))
//                    .frame(maxWidth: .infinity, alignment: .leading)
//                    .bold()
//                    .padding(.bottom, 10)
//                
//                if let user = userController.user, let accountType = user.accountType {
//                    if accountType == 1 {
//                        // name
//                        HStack {
//                            // icon
//                            Image(systemName: "wallet.pass")
//                            
//                            // text
//                           
//                            Text("Pro Account Purchase - 01/20/2025")
//                                .font(.system(size: 14, design: .serif))
//                            
//                            
//                            
//                            Spacer()
//                            
//                        }
//                        
//                        Divider()
//                    }
//                }
//            }
//        }
//        .padding(.horizontal, 20)
//    }
//}
//
//#Preview {
//    PurchaseHistory()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'ReportIssues.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/ReportIssues.swift',
                                        type: 'file',
                                        content: `//
//  ReportIssues.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/22/25.
//

import FirebaseFirestore
import SwiftUI

struct ReportIssues: View {
    @Environment(\\.colorScheme) var colorScheme
    
    @EnvironmentObject var userController: UserController
    
    @State var issueText: String = ""
    
    // Firestore
    let db = Firestore.firestore()
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                Text("Report Issues")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                VStack {
                    HStack {
                        // Search Icon
                        Image(systemName: "exclamationmark.circle")
                        
//                        // Search TextField
                        TextField("Your Issue", text: $issueText)
                            .font(.system(size: 16))
                            .textFieldStyle(PlainTextFieldStyle())
                            .textFieldStyle(PlainTextFieldStyle())
                            .lineLimit(1...5)  // This allows up to 5 lines before scrolling
                        
                    }
                }
                .padding(10)
                .background(colorScheme == .light ? Color.black.opacity(0.05) : Color.white.opacity(0.2))
                .cornerRadius(20) // Rounded corners
        //        .padding(.horizontal)
                .padding(.top, 10)
                
                
                // submit button
                Button(action: {
                    // TODO: rate limit
                    if self.issueText == "" { return }
                    
                    Task { @MainActor in
                        // Add a new document in collection "cities"
                        do {
                            if let user = userController.user, let id = user.id {
                                let ref = try await db.collection("issues").addDocument(data: [
                                  "reportingUser": id,
                                  "issueText": issueText,
                                  "timestamp": Timestamp()
                                ])
                                
                                self.issueText = ""
                            } else {
                                // user can't report an issue if not logged in
                                print("user not logged in")
                            }
                        } catch {
                            print("error writing issue")
                        }
                    }
                }) {
                    Text("Submit")
                        .font(.system(size: 16, design: .serif))
                        .bold()
                        .foregroundColor(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.green.opacity(0.8))
                        .cornerRadius(10)
                }
                .padding(.horizontal, 30)
                .padding(.top, 10)
            }
        }
        .padding(.horizontal, 20)
    }
}

//#Preview {
//    ReportIssues()
//}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'SubscriptionType.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/SubscriptionType.swift',
                                        type: 'file',
                                        content: `//
//  SubscriptionType.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/20/25.
//

import SwiftUI

struct SubscriptionType: View {
    @EnvironmentObject var userController: UserController
    @EnvironmentObject var rateLimiter: RateLimiter
    
    @EnvironmentObject var subscriptionController: SubscriptionController
    
    @State var isUpgradeSheetShowing: Bool = false
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                
                Text("Subscription Type")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                
                if !subscriptionController.isPro {
                    HStack {
                        // icon
                        Image(systemName: "wallet.pass")
                        
                        // text
                        
                        Text("Free Account")
                            .font(.system(size: 14, design: .serif))
                        
                        
                        
                        Spacer()
                        
                        // edit button
                        Button(action: {
                            isUpgradeSheetShowing = true
                        }) {
                            Text("Upgrade")
                                .font(.system(size: 10))
                                .foregroundColor(.white)
                                .padding(5)
                                .background(Color.orange)
                                .cornerRadius(5)
                        }
                        .buttonStyle(PlainButtonStyle())
                        
                    }
                    
                    Divider()
                } else {
                    HStack {
                        // icon
                        Image(systemName: "wallet.pass")
                        
                        // text
                        
                        Text("Pro Account")
                            .font(.system(size: 14, design: .serif))
                            .foregroundStyle(Color.orange)
                            .bold()
                        
                        
                        Spacer()
                        
                    }
                    Divider()
                }
                
                // Restore Purchase
                HStack {
                    // icon
                    Image(systemName: "arrow.uturn.forward")
                    
                    // text
                    
                    Button(action: {
                        // rate limit
                        if let rateLimit = rateLimiter.processWrite() {
                            print(rateLimit)
                            return
                        }
                        
                        Task {
                            await subscriptionController.restorePurchases()
                        }
                    }) {
                        Text("Restore Purchases")
                            .font(.system(size: 10))
                            .foregroundColor(.white)
                            .padding(5)
                            .background(Color.blue)
                            .cornerRadius(5)
                    
                    Spacer()
                    
                    
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(.top, 2)
            }
        }
        .padding(.horizontal, 20)
        .sheet(isPresented: $isUpgradeSheetShowing) {
            UpgradeAccountPaywallWithoutFreeTrial(sheetShowingView: $isUpgradeSheetShowing)
        }
    }
}

#Preview {
    SubscriptionType()
}
`,
                                        language: 'plaintext'
                                    },
                                    {
                                        name: 'Support the Developer.swift',
                                        path: 'Lectures/Views/Settings/SettingsSections/Support the Developer.swift',
                                        type: 'file',
                                        content: `//
//  Support the Developer.swift
//  Lectures
//
//  Created by Ben Dreyer on 2/27/25.
//

import SwiftUI
import StoreKit


struct SupportDeveloper: View {
    // Light / Dark Theme
    @Environment(\\.colorScheme) var colorScheme
    @Environment(\\.requestReview) var requestReview
    
    @State private var showTipAlert = false
    
    func requestAppReview() {
        requestReview()
    }
    
    var body: some View {
        VStack {
            ScrollView(showsIndicators: false) {
                Text("Support Developer")
                    .font(.system(size: 15, design: .serif))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .bold()
                    .padding(.bottom, 10)
                
                VStack(spacing: 15) {
                    Image(systemName: "heart.fill")
                        .font(.system(size: 40))
                        .foregroundColor(.red)
                        .padding(.top, 20)
                    
                    Text("This app is offered for free by a single developer")
                        .font(.system(size: 16, design: .serif))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                    
                    Text("Your support is greatly appreciated and helps keep the app running and improving.")
                        .font(.system(size: 14, design: .serif))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                    
                    Button(action: {
                        if let url = URL(string: "https://buymeacoffee.com/bendreyer") {
                            UIApplication.shared.open(url)
                        }
                    }) {
                        HStack {
                            Image("bmc-button")
                                .resizable()
                                .scaledToFit()
                                .frame(height: 24)
                            
                            Text("Leave a Tip")
                                .font(.system(size: 16, design: .serif))
                                .foregroundColor(colorScheme == .dark ? .white : .black)
                        }
                        .padding(.horizontal, 20)
                        .padding(.vertical, 12)
                        .background(Color.yellow.opacity(0.2))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.yellow, lineWidth: 1)
                        )
                    }
                    .padding(.top, 10)
                    
                    Divider()
                        .padding(.vertical, 10)
                    
                    HStack {
                        Image(systemName: "star.fill")
                            .foregroundColor(.yellow)
                        
                        Text("Rate on the App Store")
                            .font(.system(size: 14, design: .serif))
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 8)
                    .background(colorScheme == .dark ? Color.black.opacity(0.3) : Color.white.opacity(0.3))
                    .cornerRadius(10)
                    .onTapGesture {
                        requestAppReview()
                    }
                    
                    HStack {
                        Image(systemName: "envelope.fill")
                            .foregroundColor(.blue)
                        
                        Text("Contact Developer")
                            .font(.system(size: 14, design: .serif))
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 8)
                    .background(colorScheme == .dark ? Color.black.opacity(0.3) : Color.white.opacity(0.3))
                    .cornerRadius(10)
                    .onTapGesture {
                        if let url = URL(string: "mailto:lecturalearning@gmail.com") {
                            UIApplication.shared.open(url)
                        }
                    }
                }
            }
        }
        .padding(.horizontal, 20)
    }
}

#Preview {
    SupportDeveloper()
}
`,
                                        language: 'plaintext'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'TopBrandView.swift',
                        path: 'Lectures/Views/TopBrandView.swift',
                        type: 'file',
                        content: `//
//  TopBrandView.swift
//  Lectures
//
//  Created by Ben Dreyer on 1/4/25.
//

import SwiftUI

struct TopBrandView: View {
    @Environment(\\.colorScheme) var colorScheme
    
    var body: some View {
        HStack {
            Image(colorScheme == .light ? "LecturaBlueBlue" : "LecturaBlueBlue")
                .resizable()
                .frame(width: 35, height: 35)
//                .clipShape(RoundedRectangle(cornerRadius: 10))
            
            VStack {
                Text("Lectura")
                    .font(.system(size: 16, design: .serif))
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                TimeBasedGreeting()
            }
            
            Spacer()
            
            Text(Date().formatted(.dateTime.month().day()))
                .font(.system(size: 14, design: .serif))
        }
        .cornerRadius(5)
    }
}

struct TimeBasedGreeting: View {
    @EnvironmentObject var userController: UserController
    
    private var greeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        switch hour {
        case 0..<12:
            return "Good morning"
        case 12..<17:
            return "Good afternoon"
        default:
            return "Good evening"
        }
    }
    
    var body: some View {
        if let user = userController.user, let firstName = user.firstName, firstName != "Guest" {
            Text("\\(greeting), \\(firstName)")
                .font(.system(size: 10, design: .serif))
                .opacity(0.6)
                .lineLimit(1)
                .truncationMode(.tail)
                .frame(maxWidth: .infinity, alignment: .leading)
        } else {
            Text("\\(greeting)")
                .font(.system(size: 10, design: .serif))
                .opacity(0.6)
                .lineLimit(1)
                .truncationMode(.tail)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

#Preview {
    TopBrandView()
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'test-pdf-doc.pdf',
                path: 'Lectures/test-pdf-doc.pdf',
                type: 'file',
                content: `%PDF-1.4
%����
1 0 obj
<</Title (Minsky 1)
/Producer (Skia/PDF m133 Google Docs Renderer)>>
endobj
3 0 obj
<</ca 1
/BM /Normal>>
endobj
6 0 obj
<</Filter /FlateDecode
/Length 5592>> stream
x��]ێ\\��}���"��
\`;v�s�?8� �p��BUW�=�biqk�r�Ӟ�̠jjo�����bz������vz��>��C��������8���?=>�ǿ����?�����0�o�<�������?���J�o}F<}��x���g|����/�j��G���!��+�@̕���x��R�'��ԯy�C������!Qȉ�x��7����!7����o��79胤�o_H;}�C��w����R���K�����<L>������ܻ�,��	���2(Ƅ�����s	-	��2�\`�3�'f�Q��M�F�ʷ��!YR�rM
����R
9�J�2��Ơ��|1��e�Xc��dSٴZ�ʆ�*AG'emx��l��������۸�������:w��q������>h��0N�Y,�Y�KB�R�Y^�L�ޕI�U��xGI}ޅk(Ū˜tP�m$��?���(�$E���8P�,ܞғ*n�n���ep)�(���H%P�1�u<��DA�2~�E��q�Q=S����j����|�X2�U�_��ݗ�[�Ԛ4@j�W�Qp�[���ڝ�߅ad�ڙr�ϧ��"�Oׅ�[;�~G�vUU���ydU��-���(�-�;	�
&��k�s�3=_Y��of�J��'d�C|ƨ�k�W�~t�\`S�4��^���iz�$�NL�B3��-���z텑�3E�_9SG���E+�?\\�~��t�
Y8S��"�_U�����������y"�v��~�e7:7�As�t�M½�X"�I̽\`K�<�3���-Ye��+K�Ǽ���\`��/�;�/�Q�mW9J[銩}�g����@ ��jFhϻ!��8.���J�\\�
�R{�=��yv�t�0/S�� j�2��X�^�p���וWa�jzsVm��<���0�Ś��j�g	������2���m��>#���j�MG���s#o�6(c���ʮ30귶{��J���j�,�
\`R	���\\�&.3�\`]���a*Zs��0�?vys�b� ����ϷY��Rgd3M ��U�zGn�;��Y��f��K�D�6$v�h�q[�yY-)}\`ZBB�sh��CS�ˇ�Q{
���T�ֆ����X���6���uP��w��e�r[�{�o��H�tFz�P.߅�ӵ��k�!�������dRP�΅L_���n��/@��&X�MTB*}��sќ3N.Dnf��Bb*Ή*6g�F�4#?���3p٩?Qԏ[�*[r���JZ���S�w��|7�_���j4B���dk�u���ǜg�F�j��A��=8s�>�GM�.�G�4Wk�S���ѿ>m��47�dP3���H�<�
\`�����*�'}��.έ\\�Mhk��]51]-d�y�<+�TS�)4����&���X��t�C����ECWq�� �:�\`�kk?M2��TD��H"��i��Pk.Q�Mi��sN �1Fy�γ��D�#�ib�zn@���H�CL�
��$�D���o�ӹ<Y�s�b�s���Sϭn)�=p�8�w�R��������FM�S�c��>@W ���w.�r��<��g�
	F��۫B9�81��Y��a
ϐ��f|���u� ��MnZ�\`��������ka?n�\\9����f�5�Q	j��a��mL�-��m���{�vB����n{iL�4��4v4�A��*��h���L�մL�_���2���t�P��?�]c�#MXh�b��o��l�RFpϢO�S�k��>m��#sj��F�O��PR�~ұ!:��_IQ��"�:�(9n47�;*���]

��՜�(�$6x�������4��SI�k�ϵ����z�e/9� ��*#"3U��u���h$���:�d|n��~�1|#��Enal�����t.6O���Z$%#o�[�1�yա����p-��y-��\\<X�ā�I�5�+[3��8��nY��L�O�I>��A��f{Lܺlk�{*��a��#�g�Ƙ�yT�
%������E�ŏ��
<���Ꙝ�\`�p�wF���y	L���9�����O
͚7��ހ�M����K-�Z	��/����^b��R���=(���}t��;��(�����<J� u밬�~G�\`��(L�0�ۚ�7\\�Cl�T���f��p���Hج|2㤋w�0A��?�+l�����u�h���>E ��%��[p��z0M,J��W�a7d�c�61�ݖ���������L��h%��61���ZEƪu=��{'�J9E��.T��k�Ǆ����n��â9��:�8Z�{TW9!H�|Նdv���
�(n'<���T��o�:��7��#2��<�37�t�uؑXQ����GBw�1ͧ2A(��>'��+w�����W1��Aˌp-%�y�y�ZU�&�'�4��f��&B����<�Qܘz�K��;���ī\`����☡��/��dR.�3)!����JS��nI�YTG�x'Ā�3���}f��9�'R�S�*�O�/�9O����B,wy)G���m���ؚ����|:(��\`V�BK%\`�<+)p�%��
��1v������R#	R�J���*��ܘB��"��:m&iz��݈Ԉ1~.ݦ8Hu[F��l�af����&k�:�뢩#PK"3U��<�L���a
j a��^�|��
�l�& ^E��w/�'�
��.E�xR�В��5it;��I\\�,�;�m��\`MvhW��ɲf.���u+��ތ*	Ɉ#�ô>����B�%7�Tut�+����K�Lb�NҎe�+�T�~��E�p~��O�Qvx��c��lǠ�7탣�^J�P���i�B��SJ�G��d��>Qi�H�Kd�7)3G+�N�F?^���'�M�KȱC4�˕����c�mLUa�*B}�9��Q��.�=�R������s	l�>���A�x��)Ė�J)�j����/)�R9�_�&3#X�1pn�ظ��F�y�(�[?�#��J���ͪ��hQ_Kp�u���՝�ꎒ��<�U�2(�rVn#��H&Y��������k�ZE\`Z��ěS+�)�����G����^CW�Y�[��Z��=f��|Ԏ�%��e�������h��S[���5��4
�C�v=����������'r�u��k�7���
$�"��{E6�����l��r�0�b�!n%��2�_Wۍ��5*	j���N��f6���jfgn!�a5�z���"�,!��.�}k��T�ڭ��vS~cE�\\9J�ʬ��jMQ(��PSu�	}���U�!R�f9Ԭߜ�?��+(	a��s��g�/:�jj��@�<Ӈ]�_ՉHʮ�21ˤI�#��;�9e�R	�_�����'B��BI�$�>jR���6�w�]��($FH���)�
�b�r���0��~}���GJ����]��q���ODY�U3:5)����ܴګĄ4�]�C���=6��|Ϙ:�˨�~錴z�y�W��b��o�#��:GUl��V�u%�-W�+�k]�L�vT�J�)p.��YѼ��:l#�J;�mչ[���YFaq)x)ќ�R�^��5���4���{�j�:��ç
*ˀ�2�mo������Хr�t'���µ@
����u��H��j�W��^�Ѕ4#7D�\`��=�L���7�
Q��u�
�S����	(4���k��@:$I�Jd�t����б�͹�{��� l��}�=�	��j/K�T�~�1)=���h���!*8C�MϦ��x��n��yT�@��:�M��< ¡���[Rǯw�6\`k����n98I�d�o�i2�����GF ��ss=qu�#� "�QoH�tz��A멓N������~�}8vv�೫�3꤇6\`��lL~R�����-:wǃ���ݭ�'K:5OF�zc$�kI<i7���<z�2RI��L���/iP�7�TBj
�C�-�l���> Њ���bE��2���{��Y2YԾ������g�]�T9�q���;q2q���]��\`�[|z	�1~�Xfp8�tb!D�����'�Y���2���]R7������FwsW�{��؆$p�!x�����?��}�]SsN��a�J���R��2���6��/~k���z��B��x��%��)������bG��[�e��Ǭӡ�������RF�Ԙs�PVI�YF�E�����v5��Z;��ؑ�z�"�
��?��H�b�+Խk�8N�V��k�Fw�5^C,[\\�	�d��#�	��	�s�TwT���PwISH�x��R���黕��W���=��L�n&s�@���w�9��/��)A���T�m{h	놋>(RPC��;��O����1e����]5}K��[��sV7}WOHVܞM=ws��Y��{�k>��1��CbȈ8��(�}��Db������H���v�J	���n�c�B����D.�Բ>�)����ǆ0��xUBj����A�w�vk��)���ktoF�.i�:���A��TF;��(���7S/���ʊ�X(����']=ҋ�bP�T�.2��f�b�Mu崙�"��%.�Ԣ4"�u9G��h�C���r�A�נ�V$��X�j٦fQ�n����UhZ��}�h����m�۵��|�vi�-�w��	�M�b��C�5"4N���$1$a�
J�DYq�;L�ȌFq��-�b^�*ǥn�o��k�ǒD�"���t�Kc�W���ZS�Q@��ql0E͛τgnZ���q�{�7F��R������k�f��%�
m�Y�_\\��+��
�	�B�p��{p�S1M3k�n�g���8�Ji��O3��;��\\d�lpI��l�@�?�v�	xX
�LSj@�2c1�޴I��s�ѻ�
��^ EGMu�;׿���+9m�Cͤ�f;=֝.y���y���v��7 �?Un7�]�u$(9���"��{�ڻ��B���\`�}e�P}Ǫ��$�];�����/���H!�P�G�	3ą����\\N�F��xUs���Wd�"w��楇XF�R\`bGu�!��]aӖz�4���W���b��J"�b���B�L��ˠa���gRe�M��
���j�����c���kSqE��6���a�f�n�Tu\`���"EK;V��ߣ	3ĭ�D�k���zan�F�������Cs�@7�Rl���qd����О�~UꟌ'�����%�|�:���O�v�gll9���oeP��Z<<Pv-��s���ҟv��.�OM��������jc2e@2�/1����쵿<_��䮛����6�56�4I��+�H��0�����#�<�钶 �V���|�GC����6z�T����EE�X��� �NZߐ���w��
�ƺ_^�ZL����S�ę�F�S�q\`Έ� �&9����8�P��V��S
�@�v©;��΃�.M��Μ� �����pp=�ӏ��ìg��w��M���kOT�\`q�2���biR�m�o�0�?��/Qw��֖I��Zs��Z>+|�߼����]�L��A��B1%��޵q��c����[\\�B���� ]���
endstream
endobj
8 0 obj
<</Filter /FlateDecode
/Length 5944>> stream
x��]�\\������"R��X�3��{~��M� �c��BU�ݳ��ҡtou�ؙ\`t����:$�!�?"�W���_����>��/����Gz���_��?����I���y��@1���χ�~����B��_��x������y��_�~���@��O}����m\\,AjoTS�:~�O�ך$������o�����׿������)iӟ��]~�b�M�Jү>~���I=sa��?�j}О>�Lk{��|� �S����\\�o<>CBk�H~�@�����>=#V�5W�>B�N9i�o��f�Y{VM!����㓈��H1>��dk��2WZ&:{�b))�.��C��Da\`�Ys��q;�ܸ�n��a�%}�siY�%dBf�<!�X�ܰ�Z҇���b�&��=*�ߞ*p���A����3㓥�!q#~�����r����ƺ�&G������Ǚ	}��5б�B�sG|��lp�J&j���~�^s��7�h�R�Ig>8�{�#��#io�>Bc�j\`�[��q�p������y{T)�1\`ʟ.�+p���Y�#_����+8����p��p��s���=�#Vu���w�@��2w��A�^�S�
��7Ȝ[f��:O�������w�xYS��z��m�\`t'[���#���X_GRR�6O�n�_�}�f���91�������ڞ�U���X͊�Sf����O�{f�(ކ]
�r�
o�Ģ���{	1���eJ�����%;���C�m�/l��,#�e:,dU7ሤt�!�5�<��{ќщ�;�ά~\\\`�O����"W��o�Q���@�G�z�wh�A2(Y�����Lh�{)R�} �sq�.x+�g=~�4Q�y>lC�wK�=@tk�n�W���h7g���lE��^���)P�,��0C��/��_�~���dG�������m����1c�vP�	�^�w�^u�2G��r����d�b���z�#�qM�z���(y}����{C���:j,��yY�ZC�"@���~'�4��C�s���jy��k�qj�4Pl^�pL�D\`0�7�bF����-ci�]��"263z��uF��D�@�z��. �u��i'h��ɖi����g�t����h@�W<��BA_�B��q��Յ���/%5��21�g�NL��8#ѽ��-�8ƀ\`
�\\�1�O�h�i�MH��,�1�V����O6����(-��'qN��P�D$Pj�?B�w��2m����(*��2��OH�t�mj�dO�<���Im&Ck��e�L���4c&z�Μ �m��0��Ci3"W9�/?@#C�X��#�<��
������i���+��bV��6�	#�_s�r=�a7ќGz�C<��0����#�X��@R0�M��>�o���m�kH��{���~�2!��Ģ,�,�
GD�f/������z�[D��f������x
��>ƚ[;��w���r�����UC��)W�׽��4=�gc�H�d�:@
0
���6�}���=�y�B!Ռ�7�����:D��>.me���#\`�^�@H��M-1��0� A�"��A
Ozi��M�����\\0^���h׉��3�秠�m8����i�rW
���^K'�9�;�.D̓�#U�r ��)s�����������H]v����,n;���O&<ˠ��8Q�nsq�Q\\w�n!m�i\`���]E�Nّ�u�w�K��V3�S�1��yZ�Q����}sx��� (��R��]�����c�f��c�*���)Vz"�_��c��)O�i$��NB�7v����d�f30�"�m���Z���-	lp�R <̏'�Zx��H[r�����"h�U��,�N��N��z��6J�����Yٖ�p�3�ٚ3k%�ǧ;G��/�����W/9�.�0L+4�ay��)��쐺�a�O3�Y��S�$H��L��e�
��]�ᗦg\`P�ZV3�̀EAf�9��z�z��gu�MyGq�A���� L�*� d�ĉ��{�vԳ�����T'1�4�O2��Y���9T�]�q�fٴؚ��oL�"����	L:�����~
��cL.f���)pҥ�Ts�-ly���I!����4-&���&1C;v�<���34g��� �8"<��D�s<Ns<��R�m+�:��S�]���������z���Fd�j�"��G(~d�Z~9*�kIb&Y�M��A��&4�\`V
�)3v��="来�O$����Pu�X��F������Mڬ3��k˕M�.����ol��	L����-}�[��z�%�8�Y˹p �.�g0M$��������u�J�3T��c��{��4%�eH�'<�R�1�Gq���1Ϧ9�=�;�Y��lVZ���3���q4��I��!�L��{��}8��5}QӻKM�ѐĈ�ī1}0��ZP3�+�>�❢���s�0�A)�_����!�P�e���\`zߓ]��?�Ε�o���q�eA��
�te0Wl�˨�Ԍ0����)��0�˰C�tS1"���8��N1�K#�@�[Iv�Ӧ�tR��!�����#*"P��VC��*�U:Lk3��X��6Ɇ짣��Td5���k��L�gƛ���Gaq�t�ݪF���j�����ܱ�e���P>�<I�xg�_��-;vs���!�s,��/6�Vw\\�I�7�k�?���uՏ]
�]c�6=>1��Nj.��;�F�cnT����W��VK�,�d�Ԋܡ	��
���'���56<[-��R���:�O����c�y�y)�8��F]g�ȫ@5���%p��GN�ޡ%j���Y��*��sHKiᕤ�C=���7|�7��ܮK�TfDd��0Xp����P�&��\`g'W�	ƙFYc��y�C�U'������,�#�@�Np<������E{�����dY�)��M�AG��V b�a@�=j�oq3'���������M���=.���u���8_�z�+���C����#���'�kK�������+�w�|[\\\`P����ER����R�6�-��Ϝ{ߒ�] d&�0C.���E�x�
�Ȇ�_s�D�\\��EV���.u��s����:ŝN�qrJ��������,\\C^C���PهB^w�/
I�6��BJ��;��"�&�4'�Dh�=�Q�&5#��7̕�+���v��Y��v�R��ҭ�_Uq\\z�}㡰�գ�P���K�J�_Ӗ�v��q�EN:!�0紕�;0�l�^�
Mv���݉��1��_�Y^A�ƕs��쭚�(��z)��r�'��{�uM1	w�3�g=Y�u���oM�GK��}���n� ���r.z�Q������w*"�����!w�y��%�{�ށ�səJ���~mw���s?��b�Է�4��t�I��D��R"h[ߏoᏪ��Oe4��v����)-�B��m=����>.i��Y$m/;�vFu�ĵ�+ml���Ə�p-���oi����v��V�Zu�)7ğ�M���g�0����_I��yd3yjۭR��L���ihg���U^;w��T{���^dx�-�tR��+ .h�-�i뭹���ջh� ]�V��#�v���E4C$	$Ai�V�|OP�tx��P� �λ��2���%H��������zw��q6E["�~�0����0J��_�\`A���a�_bT�_rFm�N�Vz�F��t�F7���O,�ڔ�ۛ��]f�y�[���CPZ:�3\`.�}q
s�՟*w�FG����6�vQ�?��ʵ�����R!�])�>�R#��d���[0-|�t<I1����ڌO��9F�h�RT��5HG���o&�#+6z~ҍ؉�2V�;b�WN-�����8U�d�_���RЦwz�zG�S_�C4�����[��Q�PQI[(=5Uq�e,\`)�!K�:C����h�����*m�~�!b���Q~� ���;S��jz���K�-�d�ޜ%t�����_��O�lT�^���I��G޻��;�5;S*
����t�4#����~G�
��	� ��a�(��2R��������Ȱ�Z!����n�hL>�>����2)3G�j�K�$��������	=QB�u͝�׹r���/����[���y4r��
<v�,�q�_�Ws�sE��/���-�g���
����/s���pluul��$�=aso��Đ.����qs�Z�(��Tж���E��Q��N)��T��3���w�Lؙ)���nuP���?�ץ�=P�\`��4�S	D{aЅ��?�mm*X|��_g�v��xoV��ZS���{���C07n�@�8z�;�����1�X�b��6�-��3ɓB���\`q)��������0D�T.7�����ó~l������Û#�J	�e�&m@��'{z�oH�D�N�pHd��4��М
$�U��}!�ˆ�|���y!]n�ш��S�-b/v[>IJ�!�7P'�fL�_G;�p�X���GY���Y��ؐ�;� ��}j�\\=��t���1H~&�s�����q�I��==�G�� �v{P��u���
ɺq��ID�gA��*&�˱\`t�T�����ߍ����͛ F
%��,�h���a�#Qwsz����!?�#�@�P�scl
:�B.�����6-�q���Y �#�KG�ܞт8���^�9�';s. �;L�=�^!��!�BPK��;d�"�
D�N��e��+�}���y|�[{7�7��*]/�rNH$mIy��V�)3R����Њ�*H1��<;����~��o[��ĥ>o����p��SAZ3�����$��KDZ��5���F*�w���ܳ����j�Q��$w����@mb��k	T��T��?�f�9��){U�άG�G'�ė�"'�ҳ�������w��D�{#�w
!��W�����w����3��΂4ܹ���$�����̃㢎����+5�6h�%HD��kpTF���f.q�-�,����ͧ���|�*�&��Xړ~>\\�|�6�$m2�dH�I�j�p���K� *�;̔v�����$B��{��H�� .���N�Ǳ��@h�5��=���
���\\���<��8��q7��G�苈��@D���事�P�Eo���	��+��ǧ咖)'��3f!����!4d .T��b��g��8��=J�����A�M	ySnwU~�1g�nb�!aZZ\`
��\\rE�(]uW��+>�B���C:8@���*٩3e
�b�H��}�ܢ��c⛃�22*��o�������S�T��w��BuvR�B!D��/l_��r���)ۨ6cHsĝfv��\\/����>�p2Դd�G�5䧧.���T���_�-��B��6-Z�AwhAnr7wc�
��kxľ	J��M���ࢴ!���!�<�����x��2��F��F��ٻH\`���G�DD�b��\\��q���gl�?��N���ԸΕ�<�����9�±o�^��䱢��	�y�T�j��sA�p������w�_��J���7��m$ޯ������AIG�����}�*�R�ENF{��b't��MnR7�&�H\`)�TJ����B�	�&-N,
Xz웙��?3��]O�nu3��I-b���
�M
��8T'��_˧1�
g�	�?�.GA�uhN#%�2�]���\\
�>P��@��ƶ���2���~�t�L�r���������#s����=7~$��C����T+_�MG����$����9�Q� ���j�5R ����X���m�����+��?��-Ƿh��{.���6�!��Ɉ�v�g�²B�c�R����е�h�|-��@�����)���5�����#�oD��&�&4�/s0
endstream
endobj
10 0 obj
<</Filter /FlateDecode
/Length 2386>> stream
x��]َ\\7}���#��\`�v�yΠ�\`� �!���[ՙn�����tw�ۨkץ$.�����?�a��v9�����'�v�����C>/?������?~=}�����<o\\Μ������������*�V�r�b�W�������������v�Le�Q����I<ʵ7���˗|�JR�fm營��HI�w���u�"�Hp}�?>>\`cN�==h��|x���I�4ֱ����c+��>���,Í9x\`��4�Z�@��U	W!z�^�4d����V7���3��ͮ�eJ�{�:���W���'M�}��uZ��P�ty�B�Z�	y�=�Mk�d{�/"ŵ�o��-�g�B�WF�3���We7�Z���	ug�CB3�6n(ts�WD�P}Cۙ7���Z}�Ux��	u�95%k�w=�WP?ƀr2��
��~�y
��?Go��mM1�pǹ�JU���P+@L\\�F2�,�77�L�
��!<��X�-�pն���f4�,�ښՃ7�.&�P��p����a��o��A�!��u�2�3P�|}V+��:�j%e���c�Tr�)-Z��@�Y�c�ƈ�	���[�8U��Gg,�13��/�x\`� q<<�P��3��F�kB4m������
CT����ݠ��(��w�e���~E��
��+���>�pRJ{&4G��XҗS&�1m���t�a�Q�gF��C-qP[�q�n�� �V�c�F�4O��ӱJ]��k�����xX��T��( ��G2a��:4�������������B�lT�՞�-�9�|V�o���oh[JM{W��E��L,+
�\`Q55�������Q�@�Q��Mɭ��
���we钷$��s�95��N!<?�x���,@e3�}�V���в��ƖY�h�c�bObEA���D��J1��$N陆��e��"%*���*�7l���[�<�x���o�� L��}8RF�@a@Ē�\\|�S�Z/�&{�T�3��t-�Z�n�}E%D��)7F�4@
n�9u��O�آ�tw#�)�� �~J�%�o�ӠuT6c6��{n@���*�맛�Px~)�L����ϧ�/w �;P=��� ;]FW�Vp2�p�
OV3R*�=oh�ӵ��i�* �
ݿ�Q-C�"B�ž8�qi��c��O7�břOH�҄.8��-W��P8?VC(���Y�z��6O�[�4������Zٓje=�t����S�O�t+8>ӥذj��.��M���=��.߽z�2�wD�K.t*��~�{��R�8��'t[+!d�P�#+���OU��"�3O�S8;i����������������ۨ�ӥ��	M����u��ꟛ,URE2��m����<_]] Re(����	\`�L���eq�ڱ����䦅D������}���3��.�v)��w/
���D���tbt6��R�j��ըl|MHH�"�ek���P��U��V�������u��P�pw��Ī�_�����Y�P�^cҠ����淩0��BA'�y)�+#%��U[}��;_�l�a-��v��c����9���ȝ2�wՆ�C{}~�9��E�͛�6��lUj���K�_�9��s@(�Se+�8���f��dF�u�\\q[3����o��7��rӊ0w�Z�,{����&H5*���=�h��J5����ZcG�ԩ	��$���H6�ZǕ���q#��m��2��N�@K�ک�����0��Z�5o��_�
]I�kn�B��!˼��1��r���a�'|��is?X�@q$:]d���F��A���.��ni����|˫�(@���%Q9���e{�uN03sE.%���\`��b�
���2���^RMY��}�����p,�6�6�R!ͽ#�"z�Hn� �PNE7����	v���묍�b���Sֵ�����������(s��n�͈�V���Au��19�_n~��ٹ7 �,s<����;�����	�_��7U�0nns!�2�������D���7����{m�2�wXQ��4s�[F�����q
��m�°$u0%f�U��' �\\/l����V���&j�/�,d��z�f�-��P*
��uXP.�J_���v��� gt��np���S���;�h��[��C�_ M�g���LG2��a���֎(�U�������|=R���2�;F�U--������]��M)������etI�:N�=��"�<%h��V,�)��;�\`�[n-�+�kO>��2i�����*��cz��Ʊ	�T���h8���E_!
}hBw�?	��l��n�ːV=EK��v�.�Nߊ�7���^Ҧ!�[�ў(g���t+�ٿ2g{
�k��˞��܀Q @�$����
�\`�A!7�C*d��?��~<�w'2�
endstream
endobj
2 0 obj
<</Type /Page
/Resources <</ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/ExtGState <</G3 3 0 R>>
/Font <</F4 4 0 R
/F5 5 0 R>>>>
/MediaBox [0 0 612 792]
/Contents 6 0 R
/StructParents 0
/Tabs /S
/Parent 11 0 R>>
endobj
7 0 obj
<</Type /Page
/Resources <</ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/ExtGState <</G3 3 0 R>>
/Font <</F4 4 0 R
/F5 5 0 R>>>>
/MediaBox [0 0 612 792]
/Contents 8 0 R
/StructParents 1
/Tabs /S
/Parent 11 0 R>>
endobj
9 0 obj
<</Type /Page
/Resources <</ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/ExtGState <</G3 3 0 R>>
/Font <</F5 5 0 R>>>>
/MediaBox [0 0 612 792]
/Contents 10 0 R
/StructParents 2
/Tabs /S
/Parent 11 0 R>>
endobj
11 0 obj
<</Type /Pages
/Count 3
/Kids [2 0 R 7 0 R 9 0 R]>>
endobj
12 0 obj
<</h.z3hayh3u9x9s [2 0 R /XYZ 72 720 0]
/h.3ba9hfyf4qax [2 0 R /XYZ 72 684.80896 0]
/h.d5wroe95qx9k [2 0 R /XYZ 72 410.61499 0]
/h.9txo1d2rsha7 [2 0 R /XYZ 72 188.05981 0]
/h.goqwmxx4aoea [7 0 R /XYZ 72 591.62988 0]
/h.vwhat35tfqdg [7 0 R /XYZ 72 410.16724 0]>>
endobj
13 0 obj
<</Type /Catalog
/Pages 11 0 R
/Dests 12 0 R
/ViewerPreferences <</Type /ViewerPreferences
/DisplayDocTitle true>>>>
endobj
14 0 obj
<</Length1 33344
/Filter /FlateDecode
/Length 21250>> stream
x��yxTE7|������o�tw:	YHB �k�"&\`$��F�EG�+���J����&Qc�QGG\\FQǑQԑDGI�{�:	0:��.����=s/���u��r�ԩs�� �A��1��F�ߐ� �s��O����;�
 �  ��L={��[�:L'�~餩%ekFvN��-x�<�vB�t�e@�= �[�^4�E��;��~���U+"?
�C �\` eƂ���ؓ\`h�6�_8{y�A�����m�k�y���@�h�E�|���" �- �a�������EX� ��3k�<��>B���V\\�\\�~@��.�p����� �\\��ۋf_�b#��{g�u�����m._������-K��H������oY6���yp�8��1O PЀ�R�f�<��*�d̷A	��#��/����#�������ɉ0�?���6�s�q�ѠOi���s 2wͲ!�p�� �h��e�p���!r�N�\\���l|a���;������*�������Ǔ�60dcY��E�zҴ'Ep��FV�+.�!��$�
����Jˠq T"�B� �K�b-�.���c�-X@���C��=�0i�$U<!���Lʕ�]g�O�|�J{���{��t�̈s/�8��!\`ϳ {7��(��å������^
��:�S\`6����Ϲ?��3�A}�}箾��M��\\I����␾s�駔-�W�_)����0�p��.u�������q��E㋦����,͖�_:m��J{�~��>g������{����s�;��g��G�	�c�����B�g����
�\`\\qM����4��
=i�+��'- �F��E�{YOZB��z�20�R�\`1r�B(���y8�p&���xo	0��h0�<E9���Z+\`
� e��",�K^���#�H�����[�m
�3�=Y���y#�j����tO�y;�6�\`�B�_��\`W�1f�Z�8KB���Wo�������eP	��T���F��\`�2,{:���ʱ9!<�W����8o�\`4�D\\�C00"]6j�r�t�ҳ�g�\\���z
�Xj��ԍ����5U6~U!���~-�c1������٘n���\`C�P�
��K�b<�X�SNǸ��b P�w�& ;F/@b%/�JY�U#^���,5ֆb��*�-��Gù��G+a%��1��7O\\\`(�0C.��?����'� ���mfc�E���|��|l뺞rw��½�v���~coYN?������Y��u��ҁ��t�1>�i�\`}<�)����V��7������)6c�)�8})҅��zL�*�&�,�f�^=|X��!��+������/,藟���ˊF��\`���z�.��n�Z�&��YJ������H"�9!��Ǝ-bױ٘1����D�F�Y&i��"g�Ա�+��K�}%�-RUE�#�b����H'�1�����#�#<=������(DF��F�92*1zբM��k���Fmdl�|��?�Ԍ�4b*፵�$��'�wԐ��v�ةD V;*�ղ$��Q��%�'7��
F��E�d��؜�F$������$�	�7Y�F�#;�wm���s�M�b�f�ېf7�6��nm�{�!ߩK��1�a��w�¦Q��v�i��H�kr��w����9��7�Ʀ�C&�M�\`k��Ɔ������Q��7?6��4�I���E��oƩ	lJ��5��@@ߝ:�Q�M�b�Du0�8�6c�6MY���#�3���i����b�I�̧'����)^����q���ơ@$"s#ؓ��i0���a���X�F�T�y8#����M�!,��'�[,��;@	���̜�=9r��;\`I&'}���{Ӊ��DAe$�)�q8�X�U'k�E0B�A=�vv�d4�&xs�s�"�:�!}�9�v�K
������>��i���G�CI~��Lw���j�8G-� �������uScu�g4DFmj��mݴ3������I%�#� �IѠ��P��W�]4�b���P�K(�<�DF'l�c�بE����S1�Fԙ:ƨxt�����!�g^=���ޙ6	�_1��M��i�vƽѨ�6m���Լivg�uN,b�m�M��lj��;���=�����5� �!(�F쌑
�w�d��
��;�l���N	�<�qg6�k�AG��Ҿ\\vaWPGP�۩��
��Z�]�g�빝x��7���N�γ�<<� ���1�_J�
�ũC���W���ҡ�h���}�O"�A~/�@�d Zn"|�;����ͅ�mā��m�qD�2�p�;�*�%CK��3���v�#�?\`�"�a&b�����R�퀻�
Z�V�P�B<h����w؇���-�U�n�^��U��V�z>u����-��i�q�%rjnj1d�g����K}�h#=�c�
I�8�p\\w��2�n�� IL�I)=�-�C��bX�v�vx�8H�t@:��,uM'�K��Z��$�â)5<�!����8^vv�3�G����Խ��
���%�Ke�
�W��O=��X.Z��p��a\\ϣ��
|Kץ��X��-�DB$Br���Q?]K�
�Z�����Bgd<��7���q� O搛ȷ�D��7�����wE"�����
x=�?��&���RRO�'K���^r�&���{� ^%�$vK�ɃɟRSߡ�����Z��}:�)�#�	=��	b#��"r?I���k��,:�������	a�p��8P!^ �!~(]+mVf+ɓے7'�H��z&�ʎ��Ed1\\�R�0<�\`����7&?X�P2����,'�-�	�y�|��~fѡ�[]B�!���7�[��7��O?�ӿ��I�	K�����)�>mb�X,'�3��L�4F�*=*=&� ���yr���r�r����IBrQ2��@�5�$]���@�
��5�����8�B�DI����&ud9��K�+�z�kr��<@�����}/�5t*�M�ӫ�zz=}
�=�U�=@�\`ϽBL(��L�b�
a�p5r�&a����pX�B8���3ŕ���#�S�[�Y�Ex> ='uIoI'��2�r�\\"�/?*�M��AJ��QyW����d��y�K؏k0�n�.q9�!�H�8�B����*�	�B����c���/:����	�_A����%X'S�=�:������"��/>"\\,�F��j�-t/}����h�N�A��3�(|��~	�B. ��1r�!��
�ޥa*��RP��d9��B���ϭhR	�/���f�W��:�6�������H��Q�	��f�����\`Z�	��:\\�~� �o�SDFG�B.^
��_�%jj�����}⧩�T�0\\e�(��E0W�g(%��]��+]C]R�����yp9j��R��=��RkRK�u����'?�6\\�HQ���F��l�u8��o8�H΃.���H)��pDZ%m��KOI��ސ ����Q���Ҭ���[�|O87~�q��\`�{\\H�}0��#{GR��qz$˱�+�{��zއk��s�p�P�����
XO�y�ކ3x���y����8nLW\`{:�tj�.�ӟ�s�v���?�Z2��΁y�� �';qv�O�޲��w6���EB�f\\�A��)��?915�.�����6ܽ�0�,�^Xq��&�\`\`r
��"�	�6�ŝt~j��:y!���9��UJ-g,{F�l4�gu�(L1��ї\`P�SB@Q4�1Ré9�qy*���"�=	�d
+1U^���Y����P�[ՀI�pZ�����Wd�l�ά_�����*�T�6b�U=U?oN��"�Xg$Y4(F��X�Fށ��DIL��pz�F�Q�Q�j�Qӌ��Ϛ�TUD�gb��
x��l���pf���)�M&�L&���1i�L�S�������*Z4<d�R�X��b>�~I��S�������+����i��}B��7���o f��a5K\`1�13;N�o4�)�L�d������Vd��ic���Q� X�i�[��"a�v��{�i���x*f�$�$'k����&���v��1%Nu��~;6p��[�ఁ�f��N�o��i�ZŬ�YgT�2cK�\`���Տ��o\\ N��� �� .��K.���8U�Վ�j�VC�uƈWVl�
xXK_g
�oc����N�
X�<Np;n��m<5��\`�<�xe��l�H��w�O�T&׬������
~��� �\\�q�<�S�;�x�NMshN<�xe�;�h��;���A����@��b�!���q{=������r��C
!/]X���w8�9�^�W�{���}�����
Ao�KA�7�?U�ۋ����4���a�+w��r�DXW3LlA�"޾yAS$333��&�� �����8U�7��%0���� 6��bK���+��c
 +��@8��!;bºs ;�p(>U OkF��0�g���[3����[�?����W��-hV�wϞ��eggG!/یu���(dG#��wd��3-�K��p8�̰g�2��A%�x��mu�,e���s��� ϊuAA66���#3��#��2�%�ш�B�����xށ>fۘ��o^ ��AQ�
b�(��aF�����l��-�ËW�HfhdU/��l'��a��4}Qiii�K�Pگ�EPZ��}GN?<=��99Ϊ~x�*g\`NVV���� +R7J7��o^ 4��rà�jR�ʊ�����Oq��]�Y�G��U��N?���c�7�̊��
�����j��PU>j*��"�}Gq9���^o�w|9�*Q\\Tp�Q� �.��0�5+Rήzd�zĈ�\`� �<���*0��(�gx����<0e0�xU6�|@��:V���lA�"�oYi�Qcǎ	�f\`�Sa�H;rf����6,#88�qyx5�~�@�C�I��#���6v��*$C*�jCE�@C4�1Սń�����,�ճ7'Q�:�������гf�7�<�>�~D+Շ��_8+�3!�b2�F̂H���#��Qz�s ��وy�!��"@^�B>z��9�BC,�B��X
E�8�AI�8�C)b D�'�2�
(Gq�J�8�[
)�nz0�0�D��
��"���|����1���#��XՈ�@G
5�c8�����0jS���0
�F#��q�A��'�x�z�C���5L��RG\`*L@���8�ρɈ
0K6�T�g�4�saz���C��x�YЀ�����Ӛ�8f"��8���y�\`V�KX�q4��\`��χ���<�9^�/��K\`a�0�%���b�ep~�s�5.@\\"��
.B\\
�>C��q
,E���e��W�<u���k9��U�O�V#^� ^	k��x5\\�x
\\��\\�#�G�+l���a�&hE�W ^��z�
��:u}�k����7q�5�O}7��[\`⭈A�h3��p���#�	7 ���n؂x���������pǭp3b܂x?܆� ܎�<��!�s�;��]�� �=�{R��s/���}���V��?�'�
�I�q<����wrl��S�׺
�)x$�<�q��؎�	�!��� �g�	Ľ�$�>H��G/��s�������)�߃��.ė�ė�����ݩ?����5x�uؗz=K�o�o��!�	]���yķ���;�6����.�6�/!��#���>��x ^E� ^C��-�^G�3��cx#����x� �G�+���7x;�&|��������9��x���~��%@�
>H����_�G�G�ψ�����_��'�� ���������^���)�wO�!���3��s����k�#|��|�x�B솿#&_E��k����_��ǹN?�u����r��ϟ��o�N����o�N����o�N����o�N��g:���G�N?�u�Q�ӏr�~����\\��:�(��G�����t����:��\\�����\\��:� ��p���u���N���a���u���:���'�N?�u�	��Op�~�:��w:�������������Zk���bCt���\\�wb�p��SX�;Յ�!�<�薲ֽ�c��1����Y�czm�ˇ��<n7�o+��pM �J0P���&a��V�a��C��'R�Q���a��a��Z���|�Đ� \`�Ʊ<G{rD�Ճ��5� �

���mZ1���&	� nŐ� \`��� P���v[�V�	��:T�����%��a㼹���,�kl­P��BB� ](V{���׵
�,���,e6,�;�;��lC$�Z���o�pzX�W�[����x:�a��#."�.ƍ/,��8��0�#��M��S���Z��j,^-�q5�w��P+p�e�V�[���l�/(��|��U0���^�<+��:T#�߆v��l�p����Z��7l�'h8�ɴ�\\���$L�aNC�����|1���v���.�2� !4��h!�Ǐ��F����w=+�̩~�*�懧Ekx��R�U�
��nB�'�������eP�+�C)�<^��u\\�7aj��&��M8S��S��+$a#�وeJ�K�EX
[0l�4+w;2t7Od����c{YI07СZX�|�'/��0Yʪ�	�QΗc������+[�P��ҿ�d-�(��ozj��æd����\`�		���p�&��L��@�kt?c}���M7�ǯ��o��Lǩ.�?�(��,>X�A?��fQ�V0E��E4}��C��zA?���\`	�x=���c��=��p'����~w���K_l/,�I�sz�\`O��)�ɡ/��Ѫ��1���yڅ\\�>���.��}�>M�
�O�Ŀ�{���g�.��´��º�hWX��]fѓ퐾�/	�O��И�'�s��hGnv��,�G��tE{(�������Bmp����W�J��w�-t���s�"}�P�SZT�M��D�"�m���V��nF��E���c�B7����n�V�6�jFl�)@���=�S�����bk1��Њ�
/�p�_a������j�&-Hт-H��)Z��)Z���S���Wb\`�Hь�H��)���)����S��6#E3��G�z��G�zNQ��HQ����)ꑢ�S�H�#��:�БBG
)tN�#��:�(E�R�(E�RNQ��HQ����)J���SD�"���p�RD�"�NA�RD8�
)lHaC
��!�
)lHa�6>?+10��Hq)"�ANq)"�A�8�)"�A�8HW��׼�$��d?���$��d?��G���d?��G��=C_��AQl�bX����B�.��B�.N���k%F�@�R$�"�)H�@�R$8E)H��mHцmH��)ڐ�
)ڐ��S�q�]��Q�������+H��Z�J��x|��p�Ǘ�N�
���2��ǗB�WC.��>������+�5T�0�°�V;0<�A�71|�!E�Y�U��lUv(�)��B��$y��C~N�v�e�	R3ף�Z�F���b�M����iۍ���g��u�����fy���( 7���!"�t���qҠ�r��\`������]_{����do:�b�5���a�C�2Er0�y^�oгz�܋!CC�5���a7軩�l�x�*k'/�m�+Ũ�=oFϴ��	רd�1��<�3��;�Ç�������=��c�ԞW�����7�5fr6�EF:�'���f���t,6�=�����\\V=w��w�����,ͩ��-���C1�jW���cOd(�ݓ0�X���MD��G�7��F�#cQ<>�t����I��Zxo�}X�&�^���?��,~:�-gc�n����
�.�P�i����y��+#��1�n
��W
/��O	7�\`~{���^�Mh$
��]�z�p�"�=<&��wqtxMX�+#{ap�ފ���P�n�?� ������Į(ǔ-�Le�2T�)YJ�R\\��f�L�\`0��@
\`pu���Wg.��\\U�O�x�F�����0���p
u�n�R��us"�Sc�D�<#!�F���ꦍH.��TRS�u	�~f�NBnh����I\`ZC'I��k��*;	\\s}p7����F�yVU���핣k�{����;=J�V7�!�=Ԙ(c�T��.q�%�nj��Q����E�
��j5��-��X�/��l�b��",fV��V�(].ɱ\\�EXN3C./���y9��r;DF��Dx���́8�J������b��J��X�w��(�"Ea^��]�+
�X��T���"���m	�T�p��+���+��_�G��+׾�~�5Csb�E�D�Hd�ڕ=��m�3w�g�O��ͯM���Fvx�n��n���GMk���>��}�>\`TlvmcGuUC�mm�k���*�b�5���k~�v
�]�ڪamհ���j�֨�L��v\`D��s�q5j(���h���e8��C����="�G�Xؘ0�F$�ح���v��ea� ��[;4�C��e�l{l��X�����u���
LT��_�����}0jq-���<�yzIX��Ǌ_:V�\\������ u���u�A��'��M5�6b^qo� 𼝪:�3Յ7�dk��
I!rP���Rh�ܦP�*���ʖ��|������>��Y9�Y�Q20�����@�[�@R�c�^��-9[��T���UȘ�kf������d� +
��2�+���-����!�pK6.'�_?g6�ezc��Ժ�W��wB���{*��H����le����+I_������f ��~4��%IY�պ$1)���I~�,%����J��Bۉ���U���Ӷ�J���=���dD�:�K�D�.���a�0_ڃ��=�^Zo<!�0��$�K󍫤UF$��F͠HX�\`<ο?�ش�Z�Nr��	�0�݉@:�m��G��4�n�Ʈ؎ؽ��da@)Y��)���r�$e��;����G�ȶ�s1�޿��Z�{���i�$�>�8��t#k�����a�A�lwt��5x�魰�W&w��	�ED�Ӫ�(kJ'�ԃ�=d�QӖ�\\%ۊ�s�i����z�?�}�5p���+���pF�.YV�
��]G�+gT�=�n �W/��%�"c�٬���.F/U�2=ZJt�tδM���(�J6ޖ ~��Y[��&�>o��#M��d
�'�?y��v3���{�u7�=��b_o93��#���Li���\\�T���������fh�,�H���g*θI�gqC��7�f	İ�(��=���F�&0��ٮ�:�tMѨ]Vʮ(r���z�bBK��-�Rٯ^�zP ��!R��zڷ+�;����o�o��0282cdh��n�V�vq[�AD _��G�F�Gپlv@����
�{��d�ڞ�=dp@����V��m	�2��������!�f���#�qx��I���deFc,l*1Q����mNI=��I��@�z����3�y��{��#m'�VUM��Dt.=�K��iiJ��61�TW�������#�b�
�J�\`��^�� �;e:rZ�nT�� 
:	��
V���Q���&7�\`� d\`�<��,mjj"�� GŠ�A㹱,Y��]^�A�TdQVD��<[�׿-2��a�!���^���1ʓ'�x�����~�����ϛ�e_��Փs;����e�4!uX�,������W�����t����.a������c���"�{���(�N"�:=Ѱ�fB����&��n��L�f��$T���%N�d�unJY��
�
��S���<s�ԅs\`������~.,�*&e��@��w59 ��޹8������+K�z&��\\z���\`9KW���>hr�x<�ei�)�>6��e���bY��ͼl�9��MT^vIø�����E/�y��﬽=��ۯ$$�D]|u���r&,>g|ü���l�y���_�{���c��zB抵�W
���^i��+U��Th�j���7�|�Ld�#�����G�Ϙ_6�M}�lV$�hV�d2�;ɓz@]*j͂��(��˼/�%��㐧v�("����t�F46:��)��V�u�R�e9�����RT�pm��]�[KwSc!*U��z��P���;���+�E�a�	�7L�$H-�������^�ى�еݏ�_}�kW�Xr�;!<x���L�]҈7%n��
��M�g�DL�Q�q�;��Ynw|hQv�#j�9�q�:"f
���;i�]�١�؎���lA{�x=å+h6u��9��՘ j�\\L��.O<�*u�.��I�]v{�Vb�%�j�$�\`cEm�-��j�6��^�{�7�t���0�&{��a+�\`�<��dL��d�y��'���qm��}�ڴԞf�YK�������D�*��� %TF�I|�U.]3{M�-�p�?��7�Y".�1�z
ȚЬ%7nY���(�)���$�}��
/|���*.������(փ�\`"˃EM�!P*璈T*Qi�����Ό��P}��HzWB�c��+�/�Y|��]�9� =�;���
JꀮVT��|��[��u�:��G��B?(�|��4*�j��p>�/,�j_��2.�����JH�"���d�$�M��k|J���CA�S�"+TE��@�?�s�
�Vn�d�jX%�j�J�=4D,�FpW�ϛۻ��qqB}�Gͯ���R]5�NU	��Ul
�_����>)������]z�<��Us
��K���DC{7�d�A����ȩ�;e���t|z��F<I�)�s�߶v�Z�|�%���L&$;�='7�H�Af=ކ����w�^��ի�"�%��'DQ��U9�4���'�i�{���ݮXV��i��r�\`^��*S�.?o����6��l�CۥX/�/n.n)n-�R�Vl���bWV"�RT�tsGр���A7n�MKO��3�OY�j�o��Tk{��Ͷ� �Zw:ٮ؈��ʁ�H��ʜ-�|a�;Z�I�N�T4Z\`�ō��b[$y�1���ȍ�F�?���Kf]����U㓟%�$��'
�:�n|���G[ሩ��פ=�s��¼����[j6P����zΘڳU�{w���4qĹl��:,�'�xO�x��ѵѳ�_Q��5~'�9j�)����ϳRZ�^+���:��~�@ȑ�|�N�v�U�%�TM&���bcD�.�r�/�c
奓�н�"�\`�-���n��L������j�׳E�\`=j�G�W(� �6�X��R�zg�#�vj�6�hkB�;'n��Q*d1K41�0�B��X�6�F�����F���!���G$��:���r)���ʒ^���o[��g���Hf��ɭ[�K�^v�W��_}���܂:%ԆF�:�<���|q�I*�Vz�z=�<R�wPp}�N�6��3�t:r�6�?o�B��d�ҝ�Q��Fi��@)��ڨ�Ia���O�(�&F^���);ci!N�ܠ�BC�4_��\\T�\`�Us�~���������.�:�iiOF���|����ua�-��/m߾k���d�V���H��Ef�DŐ#;�)�v�b�TA̡�jj��\\'б�11��u��E5B���"�#2�>">�U�W���e%�z
UJ��pYIg,+AB�Ľw�'�*V�����Ҟ��~�\\�=�~J�>��j�у3�2�+��L��6]�:��^9��:���|_~ ?�0�8S���0�/^&^�[�e�e{����}�a�EȐ#L��p�2���ȉ'�HVL�u����$��$��Sd u�f�9��p$"�@$�4�f���4b��Z)sDQ��k��!ٌA��G�r���ppfVu/-��J�9�Ί�[(N8���G��6�y�@���mJn}����ǻv_�6�1����k}�/�6=;����y���ȼY�>{����O|��)�Ӹ�'��\\�sTQ��j9�c�@dIB	P� ���d�M7�Y����lZ̭f�ġ
�:�L�i��b���g
��M=O����,H{#�	!�jY�o2�+}�m$�֒���Ҟ��h͏����pL��O>�c\`	����x\\b�2��c��千�K�R�tP��R��"��V	��@�@���t�2G�������g(�U̠\\�{��wɗ��8�q'��E�[r�0����4I������MR
�f�$�腊�RY\`�������hh�*��/+h\`���~t,v�y��XF�Cዑ�q�w)�=�w?9_Z���ݏ|��[	�$�q��',a�U~'0�J�O��9���Z�!mf$��ݟ+�[�;�6t��D�j�Q��6M�\`GŔ�����y��B�V�S�S�K�.�^����IM���2�'H�ҦF.r���Z�L}�F��Z,5{L�j1btTcO�wX����M�X��X��=��-�j8�In�l�H��?�~'J�trC�::yE�"T��+���N^A�%G�Lދ��a�I�\`��W����K�A�
N�<\`��j0�$dBw��p�uߋ����i��L� �QJLԧ�B�!׈>����jƐ�24ι��ec.��2���5�e��9i�hS�Z��#j���.��k��%�C�v�iu�vB�Q�l��[���W����=��0�B�L�J3�V/Ѯ�׉W��i[��\`�O����Ut����:�V���1��6h�O+���1�ժ-
s�dU��4 zU���
#�4U2)J�l1���J�Po0Ǎ�(-(Yݒ72��{tK
AW���Z�d���Ilz"�H�ۻGXF�35T/�V"�AU��N'5jZ�@1I��$Rj�E�*����Gd�\`=n��̦�b�N���]Yg �}�p�#F���uj����,̌O���t����#����ت~[���U:Q���+���K/����[�9%ސ:��a�u?�F)\\(6(�i���D�%Q������O�A��'|��h�ʟֲ��؈{�a�����o�n7�a��"�b1X_��u�CYm��}��Ѱ�t���F���ߵ��0����p|��,2��"E����h6-����HiH5�ZB����	ѐ-�
{�W�w��:2־ط�qK��[:�Oá.Ek9��0������ם�G�=�pc�%�$�&�%w'ג�������<s��{�����!ɋ�w%�M.A�nѿ��T��?1[�Y8?��b|X����n�n�0F"��$��-ژ�c��g֛'*���YO_�gp}��t���k��䡁���b~�C��n%˔����>��W�\`Ǫ���&��D?ޱ�s������B��xNM�"��
��w;pC~Я�������o<ߴ]}���e9�j�Aּ�6�2�2ڪl��eqY]�A�A�1֕�5�w4�%�%�U�
���!Y��T��2ղ�r��˃�1�\\f��jr�����E�]m.�rA$�؅�s����<0�pz7��&'�.y�,��[b$+��X�}:ײNߙ�,�x^|yp�5-��*�6����EK�C�8?ѹ�:�B1����S\\E�j�������͗�ߑ��e��[P�џί�46���ҞI�]�����},�7R�Xc��abvÈ�3M���S������O���v�;C��_�/�{�F���+�/��_!_b^���齘�Q;�rvVcl�i�catq����C׆n��1��3�q������ɱ糞��K��ƮȺ"�׬���B������4�cuZ��6kd�|����Y͛��i���r��\`���_�=YJVL3��;ݧ�#�%>�ķ�G}{�|�3�$�"� c	Sl��8{�TO���F���?D=Pi�XT�����ī;�qo���(���ԑ����������
;A���扶.c�����M�����C���z�o�Yȏ\`hx�m����vge�#�z������VG�9��x���/t�	�̕��g���zQ��hC��"ǙGf��m�~���'~iw��9U?��2����zD.Y̳O"���o�i�Y���h^���o��x����_1���\`�xs�u)x.�U�=�q�M�L��:��N_�dˋ�}ͼt����xNɂ��m^��a��u�n��i�+QK�R�^mQ[�-�"��U��z�q{�A�tMV"��ǥ��.X�im�[�H����{fer�N��R�~:�0j~���T�
�ȓyU�����D�~��}�z3���+?l�+EUl�D�1�1�r�:�v��v��=�؞���L>!�&:�J�S5#�7ٶ�]�\`}�9(�[�4,
���b��
������)��t
�pe�MjgԎS��Kw?��Ʋ��;�f�ot������_zŁ'��\`�+�����ϸh�mO
�'��>��q��g�=����4
�'K��|OG%7?��Ļ������L�K���m�N�i+{�h�K̜j6�&�<r?ȕ����E��Nn�|����N:G7��5���R�Cg�o|�hE�Nl?���I���Nh>�هk�i,���bʞ�B��iO�p�5oj*��+��iU����:lܢ�zZ5ǧ�9��-w�z���h�
���㤆,'ɐ�J{~zQ�N
ܸ�b�8bPF�ꋔ�!C
y�c3��|d�Į�������0���_�ol���}�$�f�G�{��~�F�jz-�&?-�,���\`������l��8��g�#�C�%�'�i�h�>��b���,�WH���r�1��Ύ����!��h']񴨘�Z���=�mc��XB�]����~j��1l�j�h˥М�-��)0)N�͸"n\`�/���%�x�$�,�����/����P�-=��ܫ���!.���pɡ��u!��
�3�^"K��NOv��\`(>-{^6m*ldOSq�,��b]�ĔV�(��	.�7ʴ�,�"\`��bPE�D"̲p�<��bŠ�d~���7�v�	���WF�"�}��}����Kg�/��F��UvEC�Y��mF���ni��L��k�ʨ�F�n�0�����H��QC�o;�|yUC���Vd�G��Gi��[Tp�np�~�++�c��1]��M�L�5f|��š�΁�Qb���9*x�r���,�:A�}T!).6N��
�7j�d�L[?*�Z�G�&��l�	U����j��'������0M��}iiBGԸ@^�-�,�-ΐ�QΙ���s�I��s;Q��Y���������3w���5MW]�p�����%y8����3�Oj��خ��e��l{5�?�U��\`mt4zY;{.����No7�l{����=ߗ�/�_���������=�}���&e���S�VK���k���:��v��.����� W�Rnf9��8����yAC�9�Fб(�Xʷ���A�#⭈W!,�D�����$T́�u�
5=�$ٻ�	G
�)d������b��)��=��T
����1�EQ���e�ŗ���~���
���e���s����eS�ݴ}�=3�����KD�SraZd�nv��lы�r���HK�(?�jKfk&"�MC�q�x��4�]�SU]\\\\�Lj�UT,V��x�Y̹�I��
���D
�PCU���HK�����QV̋���bGZZ��ht\`� ���u�����?���L���W�������^8o�=3I�Q⿅�N�l?��z���8�oʊ2ȃ����d���N�.�m�G�G�g�g͝��E��1�hmR��]��+��M�iL?(ߛ����­[�q��9��n�ͥ!���/��z�wG���B->��v��qR����C�����~鸰(�2x�[Q���0m��Y��I4:|���F��ĝ���Y�K2�f��֨A7[���mXx�3�#��+�O�wU��L+�\`���Z����;�%�3X�ѣ�Y��[�,��8�
G%�t��E�U�/k������CL�6��-:r�����-:2�?j�/��(E/����-��L�A�r�Ù���G����߯YL\\�!�[��=bF�p��s���Rr��O��1�Ba���7�%^�n���Lo�p|��:��A")#���Ql�I�9u{�����-N+�,N�]�K5X�d�1e�F6�L�VIy��]f��g���i�.M-�6L2�C���>�N�D��g.u͂6O��z�L�����d7]�~�[�*�}�u�	ME�!��2a��j��2�w�z�!g9��˼
�
n��<j��s�%�sG6������s믽zj��l���>>��0����d��[%d�>guh}�:L�ך[��^�PJ�i����t�0���j̙�o:N���?8C�垡����=�����?f��j7��m4��&s���u�Mh����
x�� .�;��)��@,'�������Nؚ�"�V�nt+>�\\�Ϙ�1�������� TA����Q���O���?�#��C��U��eiw�w��9�x;N��C�����{���r�e]�Z���߂��%2�弒�ۻ�D�#�ށh9��AC��:��֐C(��9N�ڮ�.�C�s/�ex˳7&���ɫ�ްa���F�
vgF=b�����7��I��[O�ٻ����7X�U�����n���k�fQ�{�]/��0�diAF��B�ETE�Hٴ���.B�.��)�(�2��E�4�[� �\\��G��;T�R��lf�FeeǷ��|��w�G���\\�7W[X��M�����N3=͞�O�:�s��?��� O�ܼ2p�wf dR7�r�ow2K��6�}ϤP�pd���'�Y��ֱ-n쾉xd��ڍ�v��C!��ڍ�kP\`�nP���V���*mUj��_=�Ja�Y]��a�$�
H�\`e�b�w
4�M$K�"jT�=��b4;.�
=�:5�j�<O��Ź���c���;����<��x1����HN&�xݰY��Qr��w��� �z� J�v�m&���=��,�ݠZ�+���
���\`�5��p��=�zD��;���&�O8�����rM�]f_����o�k����ټ�^/�z�x�ʂك�b��
Gz0[~���GγZ��RN�J�;�U7����o���<��;�v���K��_W�������9����ڇ�6Uh�Y��s�di���xD<)~'K������u���=�]�]�]-,:�B�P*��C��N����w7�*ȢQe�q,{3�	�f;�Ez@*1T���7Sc.i�^)�M՗�������Rj
���> K?!fo\`z߻����]��|��ò���������#3���k�o%��
�dU�W�瑏7&��&���T�FL��dT��h���������k�uRfH8$MM!�@�4�_��4��_�'�=o���w���#CwC?�n¶pw5�e�).�
q_<VKGF�jc��P�o��ܯ���~ɏ(�LO�O����;���J�����}�O�2��x��oJJTT!��kJ�b����y.)�-�a�gl��%�@:�h��20oIi� ��TNnn�$��q�V�X���âyz
�*�y�<}ȰxIޛy��	ּp^k� y��ҼT��������9�y4���N��[퉥M�U�Tw�qk8�[�e�l�%�Ψ��}^��y=\\E����S�j-6w-��t��| uV(o��E��ÙՃj%��7�f��gO�un�ݍt�}�Uc7ߖ�t��3�������wPb#Ι��>��u�0,2��"�ٲ�j�_�$��l�b1�&�MpJr=�U6��N�'��sM�_��ԧ�M��!ghnΩ�)����ޣg�j�$T�bc�p���q+
QJ��i�kR�f>>p���ɰ�{�S#]}��S�.�GjF/�v}���{��n���D~ɯ�F�t�tO��vz�|��vS��'���g�O���a������򋆗M�J�F�j�\`�Rh�2�D�U���-A�D��+������]]]l[���b�HؖN��qG��9�mgn�i���M��|C��W��u��M$r���z���F��#��+G�I�xu���}��Ge�ݜ�P��kC��.�x�s��:�B����
��㜵�U���c'�
�~N��=F��j�����,k���0�{��T�D���W�{.�c�G_�Eu������������w{w	��\\.��s!^�f���t"���KPJjmAk�uD���#�v$�(��j�"u:��t�Қ��T�2��ؒK�۽�㌽ܾ�o�s�{�{����߻�X�K���B|��X��J���ջ/
�ص�
q��u�|��;w��]�����Xq�x�m��'�\`�+{���1ح��Y�h�k7�qNϙ����L}��^��X�<!+Wt�~s�\`b7Oz��T>���M-��e\\D
��
��"hN6j�NN�B��e��u�F���_�~��$�N���vZ��u��   9Λ�����+�[������7?���Bq�Gk��|��۟,~�g-ٱ��l�-���O����}/�|�Un#�#$4;��s;�G�K�u�fQ�+���n4U|Z��wi�n�jX�[�ZYf.\`����W��
Qb[�}^il5'b�Q
g\`�
��h�u��D��B�p��LL��W��������-G�;w�5����jH��uz����
�g}���Y�ڳ~f��W]�r�߬�
L����u����*=5V���1z�=5���l3��>�=���rTIJ��2}��[�cHj���v��ԝ�5���v������ԍR�ڮ/��%nH�ɪ�T�֔ๅ�*Y�b@ID�-�LV�UI�����n�;���v��{6���?�_�o�]֏#������^�a;Q�����0|��\\�'��zW5��#�rձz'	��΢zh��l=�ON4���	T�M.������6���.�K��81�����%:�J	�&	@�0���m��P��@�5,Lb�$Nu
�c+	����(����� {r\`2qtt��t�{K%�:餻�x{����mGcN�.c'�u��lK��O%�&�OJ���C%��9n볦�B	�;�du��\`Mb����"�\`��ؼ�-�3f���#+�0��a��:�h�쾖�nj�M�9�ǜ-����>��	�kY�f���E��.u�Ij9�C����Mn�F)�b�.��p9MU��mE5Z}iV09��
=��Z���x^��kj��)4���;&jR5UN��/_NPq�?�� f�}ǆ�j34���[p���溜+W|�!^��_V\\���d3���˳��{���<��c�N�p��P����?��^Ŀx�c����Y��۵q�@9���x۽�̿�]��eM�lBDPd*k.n��[����UG,� r(�h���%v���T%K�������鈐��e�Vs�y�V������)"�or�;1��������f�N\\����#<�u��q�/8�����2�ֳ�(�.: T0�ZR)y�ljl�����5�5���ϻ/�*< 1�*.}0S^v�����?����N&���Uf	I1駶�<pg�iQP��4O��s�Ĳ�iD
#2M�HA3
!�@zÎ��p����x.;H���롭kd��u���T����+�3aA˯:׿<��[go���e�o{�i��Z{���g����}"r�
evHLǲ9�/<�\`�>V;05k�=K@T��j*���bJ�&����1��Ó�9�D�DQ�թ9ԢnGJ�sNAל{���#��E����84�2�P%*U�A�?��1q;R�Ωz��F%�e����.t�)
�Jp^%�d!ț�����l�ք �w\`@T;��V�O�Ld��f�:�g�i;���'��jg���@���O�;\\\\
5�X���;H��������)S�dW�
CD�0�j�7{*�,E�����0�LbL6��4�iFF�H�j^�K���R��#9y{K�,&B��(*%Z���h*QҴJ�&5�%Mk���Y�NiC��,q�<Gق���[�[��h�.�Pv���)t��O*��I�:GΊg�s����������Ѧ�����wx1	'�h�؉j�*�UXfS@��aM���]�;*����$��z�}���8�/AC�&�T���e�͕JOѬ�Ջ�lT=�+�Eq&�
He�����!����lĢ��b���Xt,���ܨ���| W˻[��O�\`���u�j�y���C:O���Z�5~e�-ւ[I��������]b:��\`�?!!P(�B��a�����?;��f�l<����Ư�-csCc���ѷ�Ѵ�.�=� ����.z��Hi�]�
�6�4y��m�.���Ҩ�T��\\Gs��� �o�g]J
t
�@����)��&=I��KT�,+4L⤎6�V�F��������ar��Ef��3"\\�?�c2�F<�r@�L�ȱʃ��%�F�ܸCY�}᪜���"J�ZzyX~j[�e5�D����y�EQ�8�7�=Q=k���!]�~7���1�&)܍�k��o�Cn�οLs�^���x�k"3�MDX�|��J�l"��a����]]�����+�Q�\`k�	X��o���;�>8�+�P<UEe�0�x�k��xY�F5�~#-B�w=��r����ɼ�x!��5���[r�$]�J~��	b�f�b� dˠO�z�(j�
	<��xH��5�'�B�5��H4�ًPc+�ia��e@���r%F�y�da3.������!&�M���� ^��"�ا�h��ubӥ�cn���f�?zs�����k���B%��ǶW���(+�H�ȧk��k�蹮�^�a�'�Lq*�;gT�X�u�M�74��-�ʋ?��;V#8��S��O2��&}?��7�\`��=��Q\`��/�(���,:K[+p't⭆�CrB��i�f���[�^�A����$�j�;&���#���cf<u�9��Wh��Wr�ymWs����}
>۷�'�bL�Gn�iD۴�9�b�Ba��5�� s�k�|������M��\\ud6�/0��sg����g69��>?�7���&�0~��*��m\`5�=|,y��]wd�ݡ��ݦj^�k�Нu���\`Z�$�M����$<�:;uQq�pw�]�ˡ�p|cV �ɱb�s�E��� ��d�
endstream
endobj
15 0 obj
<</Type /FontDescriptor
/FontName /AAAAAA+Arial-BoldMT
/Flags 4
/Ascent 905.27344
/Descent -211.91406
/StemV 76.171875
/CapHeight 715.82031
/ItalicAngle 0
/FontBBox [-627.92969 -376.46484 2000 1017.57813]
/FontFile2 14 0 R>>
endobj
16 0 obj
<</Type /Font
/FontDescriptor 15 0 R
/BaseFont /AAAAAA+Arial-BoldMT
/Subtype /CIDFontType2
/CIDToGIDMap /Identity
/CIDSystemInfo <</Registry (Adobe)
/Ordering (Identity)
/Supplement 0>>
/W [0 [750] 5 [474.12109] 10 [237.79297] 15 [277.83203 333.00781 277.83203] 20 24 556.15234 29 [333.00781] 36 39 722.16797 40 [666.99219 0 777.83203 722.16797 277.83203 0 722.16797 610.83984 833.00781 0 777.83203 666.99219 0 722.16797 666.99219 610.83984 722.16797 666.99219] 68 [556.15234 610.83984 556.15234 610.83984 556.15234 333.00781 610.83984 610.83984 277.83203 277.83203 556.15234 277.83203 889.16016] 81 84 610.83984 85 [389.16016 556.15234 333.00781 610.83984 556.15234 777.83203 556.15234 556.15234]]
/DW 500>>
endobj
17 0 obj
<</Filter /FlateDecode
/Length 308>> stream
x�]��n�0��y��C	��I����a4���t�F�Bz��l�J���ٟ;$��PYx��UC�����8\\����X&$�F�E�[��cI4����l7�<�<���1���J=������{��}u}q�z����(��.Vzk�{�Oж�t��0���q�p�Z�iԠat���3�<����1��������N�4��1;M�,P���P����J�gw�p���iB�wO�
��%AIp����CH[�W�_f�\`F�H�Ȟ�>6�іxKt�y*���F�.��i������
nv��t%��
endstream
endobj
4 0 obj
<</Type /Font
/Subtype /Type0
/BaseFont /AAAAAA+Arial-BoldMT
/Encoding /Identity-H
/DescendantFonts [16 0 R]
/ToUnicode 17 0 R>>
endobj
18 0 obj
<</Length1 49308
/Filter /FlateDecode
/Length 24074>> stream
x��	xTE�7~���}{���;��t�C6I "i �$pa�]�(���8��.㠎C"tF�Qut�qQF�Q �����!���|>�7�睇�ԯέ���9u���;@  A�>#���� �b��5b�؉�7���'Hǈ�����܀t
����X^q�ﭑ�߇�-S�G7��y�� �p�-3/��\`��{��-l�{�%�{C����@�t΂s/x�;<x��sg,^ >0��k��~�����޵�Г0��3낋��s�@@b��3f�u=��#{��9X�4���x�P0�%p��o?��w���3n���/�^ �^0���A+�/9�G.�q�loK߷�
���/��xI��!}>k_�h�����w �: ��c� *Pp I���a$�P��u(�)8z���n�S������t8��ȥ:�9�í����#�X4�l�̼d��9w��� 2g�ً r��%B��1A�߹�����گՠʫ�{����/���Ȧ�suPqLq�g�Ud-^�*�)U�a�F)�ΡNU��,R�D>
ݧ=v�XHB~|��r�xR�&mI6@i���I�6vKf
�̵J�!xfD;Wp�@.~@��"�Cb?�8?G�����[�-�Ը:<��"��2y#�Y�G�/�?N��0΀&���f���Ky�h��ao�a�������7��]��@R\`*�*��Ak�fw�,C�q����^Z��G� �2h���Xs�χ�0	�o6n/ƚ������>�>��̇%p	,�^���\\�{!b�0?Z�~6�/Ez֞�u��Cس��?��9���?�0�Z�4�Xo\\ao~��3盋g��m�3g_��f�,�i̅�0
>J�Y��q�͵4��=h҃F�8o�"��3s���8�	�|/+9��!�D'v��x�)(Cy&\`�}�%�T����xNFi���(��s���Qk�Z�{��~��w}z�X�b}���<�NO��,'��$,��	�Ə����H�X\`�z�#���y2�F��ҟ���ӹ؛�gfv�
l�Gz8摘�s���0�F,��>�0P��b��,��ܚ�[s������kP��v�ބ{L�W�&��X����������������}����O�/�;�;%MZ(�!R~�?�֚�����r�m��9�"�"}���IN��lt=����������~| 43���["5���Cb�lM�VxC��E�����\\룞�����>�v�cH���@��a���]s��vV�OqVud2�Fx�̅Ga<E�^�\`���}�.�[\`%�ҩXs��	hE����[��l�va�3�J��KW�
�e�kj�|���P[�HNO/E���x5j��Q{/ ����M����\`��t'� ��Ϯ�����o�U����.���Z�3��m~�z�N�Y$�s�G�
�p^��vc�IK���#�#���(��S�g�W�����~d�J�ңӻ����z��V�t���
b��H?Z�S�~��/d��չ����H8JEP�-�����!1�:_�HRR�4�
j���?�5��!��?W	ϊ��C���ц?�{$@��X2����aZ�Rn
g���nǣ�CJ�Vj�����Gģrn�޴
9����w���F�b�3�*y����]t�p�����2��,��7�#�/Tb�xr&�C.'+���d�C>�C�$z�B�#,~'��Dq�x�t�t��qWc�3]��W�"}-�GyX�W+܃w�
v���y��hĆ�����2�\\In$����!Ҏg�C��Oȗ�kr��a�2
�(��O�.��[��t7~���跂W�J�~B��$�ǫZ)���c�{b@�-�q�+�u�zi����tP�(?SA}����ŝ�tAת�u]m]����j�Q�BF;}��?]�>��P�_&� )&���82��<��\\�#y
����_�oɓ8J��/�4į�7�G�ұ�9�Φ�Zz3m���#�"h�]p���Y�-,.�	)�E�ma�pX8���h�b��K��tq�x�����4MzA�@6�����?���\`e�2^iV�([�W��Χ�1x�/��\\h��h���Ay���є�R�*zi���� :����b��Y������d��h_�h�K|�Z�i8 >���<�Ų�\\I��-І�Q
��B�Dx��%�x/�)�����ơ�N,5BT�~+,$W�c�]���
(�c�è&�
�Q�RT-�W�y��p ��*���υ���\\��8+���b�M�L犫ii*>�wWC
� ���,�)A_Gs�h�w����樂F��	d΀+�ZX�^�H��K�\\���{Q�].T�Q,�B�2
u�V���QFc�%�t��ɨ!�����'D���8��@-�h�'�8W��:���5}����pa�f(C}�2}9q#| k\`#Y�u��y8s�!�K��nix�����Ӊt݉��ю|�����\`��V���D�Kߐ�Jw/԰w��p�ǻ��0R�	�]c���pa��0>��t��aN�|�[��_)�PJ��)���e0�NH/fw��q@/5��8���u�'�5�)�Id%Z��������0���:q1j��C���~�M���:�98�؆���a�\\\`����Z'?�c���>�������4ܯ�Y�r#�	�x��tmx��0_�.�8,�c����r(��9XE�K߇�X��x���s}��c���p�ܾ� ^���ss����L'��t2�oK�ߠ-9l�!ɺ���X3��_UeE�>��JK��z&���h$��
�>����q:t��j��&U�%Q�Jb�["�DKJL�F�,c۱X1�GEK*�U�O쓊��n�{&��9��4z&�{=R�e���X$��>� S�7"}c}�)�:��ќ^�i+��(�i�ͩ��HK�!5|ٜ�
-�x�͚yXl�lsY)l6kHjH�����w0��6�LA��E�����?VϮ %�f�J���P�F��JSd����)�
M�Kx�O����~��\\v7p}ds���7t�pvK�eVl֌i�)aF;���[��^��w|�ָ�gkPX���a��W���6�o��e�Ԅ��}i|x���x�pGM���芦�Y����;awe���X�i�I�bCcsV�kA�V�\`�%Ѷ@ �-�
�Փc�T]0�4�>���'\\�ş��Ol)+ݬ;���l�g��'1���S�;�FM�Y®(v*
D*23�W��{�\`� X=s v��Dp��,��ܔiX�j} �g�������Pb>;�fF�F��_#��t��g�TII�����2y��8�o�++]�Ac�z>�c;�i\`94�|}G�ƍT��Fc;g� Y^Ҕ�-�eg��=���f[�wo��$�s�НR�vݓ�0g\`�x����F����Q�6FV�d�vԤ����m*�3�Q�E�oE���ݙm4ZRb�d.Գ:��א���2��&s4�o�ԑ>������2��Xr����O�<�j/ïQ���^m>�
E�8ᩙ%&5F#�R0gf�:�;��L%qȆ�(FUf��݄�IgY�pTt�W�E��nY=�#�zv,��Vo�OѧV/hh�
NGz������p�搁8)(�#��oN�U�6n�"�&5�QB��m�\\�m��" I^KY-�d���dUy��$@+oyߞ�A�ש�:3;�Q�g�(։F]�ױ�t̰I�=��Oɦ2�\`b��kK���P{1S���$7�M(r���Bl��]aR&D��"����7a�!��PӅ<����܊y���\`Ƹ��F0�Ǽ�^�"�
��HXR(�q_?[����4f��b��y
���eޏ���|����m�����v=/��;��o�06�5��-g4���FY��m�ѭo�Q�{�Q��3^��J��b��������/@$������
)�T�35I��� Q�~� �@\`��;�fuT1�4�����F=���X?�4�6aށY����}��{٘#�a^�y�ݘ��,ӽ�y?��w�N߆r�u��c^�y�/0+�mD����GF�a��-D�����&������
���۪k*�q��<C����NOE}���"��r%�	!C�����|m�s���-����!}�+��L�J^�3���0�\`^�YF�U�^�V�k1o��R��c���1���U�9�yf��i��t��m���!��xq�w�?��E�,/_��埱���y�l[^�h������e9�K�[
���݁cF,�\\�y,���\`����6+�ă<ϫ�=��^>����N&�� F$������M&�݁�7݌��57 � q�r�$�_��ĬyH1HL�����IH!t�{/(W�=�D���E8J�(]��t��"��oEvmw��ݙ,)*�n'�O��	��>�:��^IZ���Z�zi-!�!ҚGZ���	�(��d�	�5Ii}��>JZ��i����!��m;��
��2�M:,O���N�8�Q��(���1��V;E���<V�o)�3�{��?d$}w|��4��YD=�b�4�i��
��t�;1�9�Y���x�k8��1�a���*�_\`���|�����%n�V���l�>�����d��K���瑱y�<Z
�N��� ֭��~�/+����Mt
�"#�f�5m��;��m�'�C��6�Q�H
$H���o�����*�G��hM���m���vbc{m
��$�A��8�D��H�H��ÚG��_	]�sy��5O&:�#��Ѐ���˱�ζ���"4"|^�7�6�Z�[I{xBbjx$�>tv8���5\\:+\\k�����Pb��x�E!~�X?���2'Y��S��J�B)U�JX�U��Ku��jS-�YUUYU����H�M��g�.������)�G��15%*�� �#���&%�R;g¨�#��cČފJR�Q0j��Ԁ�QJzB��dTJwf�fBnj��]�VzRcI��AlB+n��׊����YV�sv���h�\`���;��M�5�1�pnS���ܦQ�_��a��l��F�Ɋ��m�\`�e�V/�oj�A��~!��~(1���T4̬D�<�ߝF�8��
X��L&��~q���	�yqAC�����ż�bo�g����'�}<��<�󼧕�I
�]B!��]H B�K�x�)ǻ�g�\\���:~&��2�X�f�X�b��7�ZRB�j�9�]-��٘[R�/��K���l�ٔ��-gϜ���SM���������A�~�yk���&5n���]�6(9�!6��iˈqU�'���sU�����c�b�Q��լy;W5;W5;׈�~.�2>�q�
C�������Q^[�Ѧ�}�\`.����+���[��<���YSِ�!�	�k���:��rP4��l�4�X�
��%K/_��z�o1&�Z��
��%�,a[���� �JO��Cov��\`m����l��5�ooT��ʁ�R�;��ZVg2e:~��K3�06Z�[H2�,��MB*o�$��\`R&�َ�3�����8{��e����
잳y����%���wY������{Ė�Y@ ,I�@(��>�3m'|��U\`�L\`Jw�w��3d
�D+Xm�\`Cd�t�����p"� эx<�B�чx��E: ~��@q̅ b��ߢ��0��Qtl��|� ����"�!1��/(�b/(@,�b1�(L�R�XƱ7#�C	b(C��5T@o�J(G��>�CЏc�X
���*��p�q�����@5�\`�X5�/!	�� ġP�8�P� 6�\`��P�># �8� �
CO�8
�!����ax��q,�@#�é��aǉp�$�> �a4��g��F���\`�T�p&�GzLDl�I�gq�������8�@<�S�	M��\`*�l8������8���Y�a� }��a�p6�_3�s\\ ���B����E\\�q	�IKa.�2��x�p1��x	\\�x)\\�x��a>�� �JX��Wql�ň�a	��\`i�=]�x
�pQz\\#��KW�����e��\`5\\�x=\\�57 �7�7�U�k\`9�ZĽ�s���p5�/����p�[a�:X�x����߅;�:�;au���G�n@�%�{�&���q�E��m�~�x?܌� ��WpK�-xnM�	��u��6ć8>�#>w ��B|��o�n�M�K�܃��
h���[\`b;ܗ~������;�W���A������O�C���w�0��9�Gw�o� �">�E|6�_�g ��G؜�<��9hC�lI��v���1�\`+��8�.�@�lC��qlG�+<���.�2�����G��@|v��
�q�;<��:<��<��&Ƿ���oó���s�=�.ǽ���nx�G�/ ��q?����B�����I�>��	��Sx)��/#~�� ���9��~���r�'��Kx�+x�ǯ��p�F����
���-��x�"���q����.؏��O����:����u�?�m��ɏ��O���?�����t����N�߭��������>���O���:}_�����}\\�������N��u�^����/������_9��O���u:�����W����~R����?����_�Ӂ}��ܮ��w���(_�8�
e�[����,�
�@�=EV���n2K�,S*QՠY6#���E��꤀Ec_�._�l�_Մ�1�X�Ʉ{�p
s�c�"�� ��I�-�$I��v�k�V��|�8_DQ���(/L���E3�Y��
��qX�|Q�|�/H�Go�&�\`�k��|�C�D��O�|1k\`6if�jf�fF�ػ���$�*㋕�n)�!N���L�����8Η�xg��id�E�&������|1�T�I4���"_pve�rr���d��ʈ�|�d�_2�!���8@�t3�$!k_-��	�b:9_~R2CN�y.�|rp�d�;��Cm�݊���V;��j�b�����f�4Y3��Iԑ�d�d6Y��p2��'
�n���"+����:�V�Y��X�Æ{�m�3?y���
��i�hu
��f7k'��|^'#���ɡ�
�Ϥ�}���D9�5Ǒ��m���=�ɪ�l�l�]6�ͦZ���,8�~B�C0�~\\�;�*�	�l��}p:]�t�sX�7�
�r�9g�8v�ݮ���l�=vL&�j�� �����_�t��c��|�JKe �y��K�"��u��ѽn/���䡅�G�뺪�bS�:&�]խnf�N��������2=狉ل�<�:fn���������u�x!��H��p�NEѕ���ph��i��$����Mʁh>�Z�� �������
�8_| �����|q���������/v�'�OH.�'B��v�y����m�7 �?~on��s�~oh�3�q�]f�[1�(a7&���v'�L?!y��8��o�1��p�d�;�0�By
D�XS,/
�
�A1�2ݼht�V��lv���l.�כ�q��d�	��{���
WZV;Ν@�CƟ
��D�/�x�  E�7Z~#�@���^s"����Qd��v�kR**����+-���� 8F��pak**((���������-����^!L�-��������פ<�߿����|�;��=��L� Z\\Ț�؏lD�?Ĳ������r�֠�,7//���� �L?!Ea��RFp;��e=G���yQ++F�Dʋ� ��a $2�"��HD�D��<k���\\=�[
��d�	)ÆV0�1ܘ�xp�ĳ2�cYY(+��Ú��T�)+�C�,�-Ϗ�s�q�=�^���ωG�#�(�L?!��Q�0"Ȁ��Nq�CƟ�����gM��п��?���ϊ�W�(.v;	G]1&�]�W����RL�8�����Ї��񧪫k��rH-kj�P[]U���w��޽}�{;sJ�#zc
{{
*.<��S?)U��3��
w�a�Օ��}�)C�#���QCG=�f(�	�d�UV���VU���ѕ��U�ށʲ!eeep2��4 f�ňܘ��!V�I�=l�Hvʘ��i��1 #�
	3��d�3�b����O�gҀ���}G���N���jٷ��O���b���#��~R�XD�y,)�Q��;��2g	[�E�v���m �o��ǫ���7��DQ�&�	D�$k���k��l7����#�3�ګL�A��$iuT�e�}%c�C%��;k�Β���Z�����Y�@Κ���!%%9B�J�P�qmŮ�����#l!ރ�>1�}�z*V��L$� 	D����<B�J������Pw�G6��7?��믻>ǣ<���va�0�13�#r�L��Rb&�\`�n�<@8��|�
6�97h�ގ'8�|h�~ � O�n���O׷O%��%+���Wo�5��®]�O���8�;�t�y��Giҿ�.�h2O�\`���F6f����|�}\`!i��u�E����l�	��O�(��Z�7���7��*7�q0.j��]�ؾ�"��J;���H֛-�����l�4�9�U�i���y�Ut
�C#�L�P����XU �]:�{�u�NF�Ӥ�nG*d� ڬV^{0���ɠ[,�VĀEJ��H�X6v,�D��D%���Ԓ\`�����wYq�I��yk��IP34��1sȲ��PI��yy�m�ʗ��
�<���OGiG'׊	>/$#��b�r�(�Y��,�:��~�U3_�cYw@7�ʐ,&X����
M�v�51Mw�kB	U�Fs�I��Ƿ#}�8Y�)K�l�y��e���f:Ij�)���2���!a�C%�*�Fަ���f~�&?>�N��E;�_�g�o�O(;n���P�X����U�Z�U�Z��ҳ�N����R�B��s�����+�W6�h��M��&I-V�*+�iU�(���۹\\D��� �:7�"�Ņ{��$I͓��.H�@�|�����DB����ي0a��[|W֊D� $����T޵k-�¶u��[�W)�
U~a�5��~���C����૫
��_�����R+�gV�����T55+�g��=��J�(Q�F����Ry�6��vAU��2�l@Y�������$1!*�D�D������G:��u��;��*��G��'���T�n�E7^�4�: ��/z��d�6�SE�&O��)�sb�Mט乁���b�j�jM.��_aq�'���~�Τ�� ��&S�3����B�y8��<���t��Ǆ����Ղ{����v�#�a2�f��d�\\�e�]��%Gv1��'ųG�g�gG�aG�',!v4����$���(��a;�q��gf��"\\�D2��p;W6��h�#�\\�B6t����A�|ݺ�b��=� ¡�����egM9�ښr�t0�E�ެީtD+<���h�D+����W�H���VT���&6����sW�9��7t����|�i���잮7�g%�M8�����7m�}փ��O������0��9g���nP,�>ᒾL����HZ&��r��c3�\\J��{�89�Q��΄�$���]wJ���nڭ�Y���ܯr6g�#7W(�{9�C�����)�9�y��9�w�)�a�3��<@7:�f�t�QC��֫�0��ЫF��9y!�'���4HD!������Y���&"*A���jaW���fN3|��f�����;��.Bs�B���xe1�_���,���
�m�L�.��������)]Op�뵻6�aO�EJ��|��?����}�8�r�K�ɛ��P��������]��f�^	����~�_���[��T��� �	a6�i�*��ug�2I8-b�X�9\`M�P�|J�4�_���#�jtff\\2�::+�ͣ���t��wD��L�O,8v�Pr�o�5��G��~�e}�h#��
�Cܗ<����t�$����(
h?鮒�-KF��wO�A�~�����5n�����Qx��4�9����G;�aܺ ��6�q2&��n�RH�Rs�S((���K�G����u"{�lB4O6�(�d�QAV0}��[-��DaP���;喒�)op�qKYɎM���\\>d�|�r���&"fb��n�n�ٟ�y�	�>Zo>���r.�X����6S9���9�d��!H�-	=�N�j\\L��>kn<��(vv�D�ʗ�QҼQ�r 䙢Q(��;'N,�w����L��~q�	���UzS�e�"�<q�U;���k��l�{���-dܛ�	�9�)z���+��(:\`%�?���\`Z�ҹw��m䬿�J���qK����_3v��g��i�QM�����f�l+r̓��<�y�y���%J5��w�ej�e*c�������1���
�/��G:�G�����M"�&5�Z��j�ag���E2�,��x	����a�WVؿIz28b%�8k�u�U��Cϵۉ͚��Kj
�㤮��i.�e�Oи��C|�)z䩧:ei{�t��tK�h��8|�q����S~?G�������-.��o��CJ�v��|���|4�ǁ)ʼ�-N�����*�,�c����27��<��o�تWE���&	��}k0�J�XI���A���\\�Ι��p��ϳ��&&w�p�'���Ì���֊�as��E��ݞ����&6�;�b���y<����P�6	�s%鯓Q��(p�����Z?|\\2�O��C�����L�1m��)�^�W��9q;�l���oҢkx��f�~�s�8(\\U�����8��'{1��d͒�"��Pդ�@5Q�&�;�tv�^�V�K��r?�Fp�d��qo�����t�N}Ϟ�t�JJ���f�]T2�p��"G�#����(7������6��l0��!3*�ag�쬲s�,�dm3�qv4N��<A��t:%i�X#9�~X �^��^^]m�q3�=����\`�*�v�E����r��O8��S-�څ"1n-�5
g�ˬ�VZU�Jj���m,%�+Iu�u��|;�CX��S7
�Vd'��l}$�$�Z��>���j�\`�@�ި�	#9��f��Z��N��N7���m�"j��XLf���9��\\�m;ް�h؋v\`a'\\3S��	R���t���Ej�p�э[L5���Fs����%��p+�cs3�Iu�|	'�	\`��⥕W�p	��}�xX�;���������<*��\`[/lcZ���63��?�eM��5Zc+��X;����UTs�2�-�1�҄q,lƉ�l:G��ۿ�DQC�q�N
ș}<�~d:��蚲��Q�~�˟�w�p��p��ĽG#lvݍ'�<!��V���)?���U��������Թ�R1V�(*F�*UA5���U�e�"k�X
�%V�e)�Ѥn�$S�F2��GsD#m�֢-�Z5IS�]/w��M��E�{>��}����P�%�%����a�KX�+r|齏[Ujy�Է�#���jrx
��έ�k�d�AV�(��0l�#Ya��6�ɤ�Ql.�9l���$s
2I7#�����?���'�!��H��9�n�X2|�x2��h+�Uc�ߖ^�'9*\`'.��
z�AQ�E��Ղ�Cޭ�gm����Hn�16g�7h�Mg��s�z����^ｃ��<Ap�i&w�qgy�f3�
w"�n5��WXl��d���@�S��xg�������@k.ɵs+d�\`��'���b��r
��<�bg��nn�6�lq���
��������֡�U+�IV��/�Ᏼwmݱ�k��?����$�K>��_�^�ϓ�/����[�vmx�Od���յ�T�������{q�aP>ȧ�Q�f#�����s��,r�Q�.�N>2V6 ��d	-K8;���8UXܒ_X�\`۹�Uz��gJl���܄ю��L�ړ�"��:-2Q�� ��t���
�*�mև���m�u�K���p�v���р�,;��"�L&�7���+�.�4+�^������mj^VT򲢒����%lw�L@2n�1���Z�=W���4G
��>.>.>.�7.�T'�m���,#8����z��� ���7jʝl�[��ֻD�Bgc'�|A�AK�դ�Ʈt8��Kr�oC��8PK81ے�=߅9��{�7�Xf�z�91�7-L�b��-��t�3/^��ˣ{M>=}���Q��wź1����G�>�O���jn�\`�Ү���57ДΥBe�%#�\\�,´�G�?0��C��
��0tr�#C��J-�|:c��c��5��f�Z�e� 3"�p����7G�q�0S\\,,�xa?�&4L8U9=�!\\_0�p�ФL�=��u9���,��,Q�%b��Fg��g�D�(dB8�Q���Z ��۫b���)����y��l�f�.�.�^j�B_Z�8~��Z�κ�~��������u�u�WM8���)QD E�X�7�QX�.	^����Z�W'q�#���Xb�+3��y��J0�m6�^V4曕0>�dY��fդh(7/�*�(P���N��e�$�58��2�sK��GZ���Ȥ����2vJvj���L�vዢ_fWG��@*E���j��N.b�f�,
TD��(��Q��G�$������4tv�{;'����Yh����Y����������~��(�<c��l��.��"�Dzn�I�S�G+��Q�((L$�U��_��(�f�vy=��O*�~b�����b���M�u����^��-�{�����C�{k��[/���/�����~�g]\\�pn�;�������0k��m�ߴ�̱�����ز��/�O��\`���?y'闹�R8�<:U~,F�yt��@��\`�D����y���.�1�<.G-���c$��Ը~T3���l��/�%�e�b�"�#�[���!��A����Ο �e���uD���*�ӕ+��
J�G=�{��^[�pKҜ�7���U�ӑY������e�������>�&�\\Y���J%����w%h֫��^%�3�R{��y���g���xxZ=�������͇��Qe]^37#�1g���mF�b&�2̈�ی���̵<nFJ�3\\��v;��J@3�td��~�Ĺ<l	�!�<5���+�:���^��Vi���ow��&b�D{�m�cg?E��$�(˘oA/��t��� 6#Gw�#ݙi��7�a<=:Y����e>2"��Gj��v�;�����_ig�9*�W�<D/���ș��@G����T�8�9��g8�g������4�4+u𗸫�*K�To�$M���%Ͳ��^"-�\\�Kn�:U�_�2Ϣ�%����\`2O1��U��x�&��n��r�N����oZ�E_�����ɩn��R�.\\��U5��s��>��d�s;�t:,v{Dw�t��4YT�[�;tQ�$I��v�ɤ����t:��ހ>�D�C,�n�I�����T��� �o6܍�t'F���oL����}�l��܋̻�'q�{F�'(_+m�3� �>��z��vA��9��q��Ʊ��ǥ���K&��a�KRJb'T�dQ3t� =f=���ahe���JE�S=B���w����Kcc�������
����(�u������@�g_]�.�Ö�"�G����<���Q�-�&��1��p���ڭe<�p$Y���~(�b&9�]6=�5r_&�\\���q����xm(��p���8�Ux���6$D?����|n_�5�=9	��3!���r�8�̑�h�Ȣ$
��*&Y6���tL��2�5Y�M�M<�V�P�B�-�LP�����&��$PT���CO�4!in5Ssy�J�D@�0�����
�+�'5n,��/c�o���T�%��
jF�k2m_�4_)B�\\ٻ�DEW����=�F��(;!�\`X��,���!���d��m��a�	�]��q�f?su������m�4V;0⥃:_��D�5=���u>N/Fw
����kɦc[:���9-��C/����&���o
Y��k������ŧ7[���Y���Ym���N�]����^ه���n�����^[�O�zƿ��K�{������� �������˨�7�+)-��kJOG�NQ�J�Q�,��������Gu���zyA��"��M/�_D�B�:��z[�&��m�}alݯB�,�y6��?�VNFu]�f�l2{�Ė\`3��Wul�����'��R2��
��th(4W��h�>���7�	t,i�3M���0��q�?3�n��D��=(�4N�Ç�[��@�_WA��(�g&m�IH�H�ObSB�aa$��=5K��c��5|�'/Vէfg
�PCj���c���E�q_~9�?˹�*�f��\`��[�a�N����T.�G6^6��O�ǃM�~����6x�Vr�ǟ\\�7p��DG��07��6�/m�|����K�t��w�p�{߅�s_�{6���&\`a����S��~U��WU
S�z�n��K�b�H�gQ��	��������#���ƹ��a�U��|�n���t�7�ɐ��g�O��\`���WO�Ȋ1�Ǹl�@A�|a�)M}���qZ�]q� �v���kt�Ȗ3Ǟr�M��lb�:�?'/#��^ ��$�.�
�p8?TZ^���zj�{N4���F{���<�|����;ï[���ߗ��3���{��?"���]}�:{R:�>N:Gz#�k�n��6Q��=1�C6͗�H}Y������s�.أ]Kj-Z�&��|���͗Y�?�]K9�E�/�0����[�׬&9��^[��������Q	N>9D>Dc���ʕ��$���)�I0��@R� ä��%a�,�7�ͩ\\&ᄋ�>+q2�#\\��E&ۼ��]��G��U��Q}����j�����aD��1{H+G��o:x�"X��߉AQu��/0&B�b
�2)�u���goZ����wO�G�&�|�o~�t�o��_�����]_t��K�n���w���Y��ݸ���Ժ��6�&��2=AG;G�S���d��*;�k�= [ �ΐ��B�FlnEe��S,|�Pg�����g�h��
���	&G�,$�3�;1g��%��{�K�����@��Z��yt�0OZjY\`m�>hy̴�����\\ky�
�������삝0ݙ�ßڵ�e��
����q��k�g���ˊ���r���Qء�V�<���R�VF�~a�V�.G��7I����NH�KD���H..���\\��\\��\\߹v+$��)T��UU3�M�։��P>v�}�U�tv���x4�(���+|�b�C썠E���r�y?�� E�)c����/pT9Y��h3�j7�~��7�����}+����U?pͼ��
��I.1�����
�w��/����P�GYz�xߋ�H^n��5n���[�~�~�3�$���йt�4�4���~E�[���r>p}�����[<�pI�)�Q���޴���3�����
��SCg��Xϵ~ �9B�t�l��~-DS�JG8A�|�8W:���_>ιwسN�B.q]�� �#�hq�:P/1�5����T���c��2�s�V�2>:l�����=G�1#�-|"-qripr�:�48�<�V��Nޡ�V�UҊ��c�"(y|�p�����w$� �^ո����� �[���Z�x��v&�e���aϬ���aC�fH��:�j�����oK�ru˺�-���,]����]|���p���DX=~�N�/>��g�x�f�F�E�CM�F�'�
Cȍ�r��l���Γ�fk��9%��ڟ�����B�������9��74�9:0$4�9�?!4�yA\`F�b�b�azا��ح^�8[B<!�Z}�Nu]��
l��Y���;��U:N�[sP-x�'|u���2�7ܭ�&������\`Dfħ��Vv(SaqU�J��0{� ��b���
���نi�@�JC���:��@IWeym�zCDz�=��n��8w���D�\\�W��c���=�3���^h��\\X�yM8�~ �leՂ�dťD�J�&�s#�����m�t}A\\o���ȱ��m+f���o0��"S����0�P���N׷zd��9��k��y�ٜ�V�e�d��D��rҿ���n�CV5\`�eM�w�E?�d \\��Z�=d&nZ����]ĕ��c��3/����ZS��L���-}T�'�%�p�Z �$����go&���ì|6��4l}�y��<����y��5��ǹW~���$�Q8L̐�Ⱥy�b�Z��Ϻ%����]��xGʥ;d�"����&g�=H0�*^����|\\T����WU͖DQO35��t�m����^v�����	��wwް��g8i�r�
����7�k��)μ<(&L�h��*��ӵ�l���j	Wi�F��:M4js�#�ݶޱ��������-�P���/�+�
�6M�N*��̌�,j)m-}�����/
^���{�rn���ᆸv��H�^�ԥP�nn�Y�we�Ҝ�lfc�s��JWȘi��|{�D�&�-�V�X�,��K�6�rm����^�����^��ژ��ٶ����K"�8���G�s��,��8䇹0��0��0�v�w�ߵ��b�^g����s]m�s�\`�b�gg��ؙ�\\7۹n��KJ�D�z.s|�.�,��=54W�|�f���Ϧ�~V�f�.�z=^#�(ĉJ
-��W��k㉜���MZŰ%W���Ȳԛ/��O^���77���;���^z�����xŬ�թ�I�۷r�����}���G��������>�f�J �c�&|�6���r{�<��+.���V�W���*��8\\�D���f�dm�%�n��t1_�������&��D<��z����^]��&�:��7o
�~&�F��b���A4vM&3��&��^������W�<=t�g�'�I{DuqV�8K]�������Wu��������[S���#I/�b�ź�11� �\\=Pv�q����-,ɾU���Љ�}�ۈ�
�6٦�m�%H�*j\`/ˡ�}���
<�#�ଗݎ��W�\\��Q�K�wc-�_����ݝ��+/�x��O�vX�̭eo�B~��S�����5̙յc�������#$����2GEˬ�uf]���WJ:�_)�L��k�	e���Y=<�]=4)K�3�ϼ���kZk�\`J�v��54)\`
��ZM�3U{Mi�9lB�]�\`��+�2~�+	Ȓ,�e%.��^� �ĝ�^Q�))�qn���Qv��E�~���/rC!f
��}8ï��DA�~W�/�1V����Y�O�NL�=��U����?v�>�G�@����k<ȹ�$������K��!��X�:����-�F�s�p�r��4H����$�*I�(RQ�bըಈIS��&�C��J�a_����E-h���k5�괱��^�KV�!̼��k���hy<ڷ�Q�T�s]��s\\�FG|W��X�v��V�B�h:�����QY�RWk�I��������dS�\`L���F�Ts5��(�V�m�?\\ݿ�r�m�������^v��ԛ�iG7<3zӑ8��o�{��٭Ơ�z���ev�|���'l�����;'O�����+�,���[1�&1g	S���{�Q&��S����[��l��\`;�N�WDyE���EQ�j��\\fn4_$,5�!�/+�$&'��Z#0�Y�Z��&�Qi2]!^"�azV~I|U�/��K�Vu;�fID*ˊɤ�IU��RYŸdvI�ٌ�MT	N$�=��40�Ğ4I"_��W�VC��º�:�Zt�3�:s���iq0��RC�i����\`,*4�tɾ\\1s��E\\>?ي*b\`���o��qNO���q��C�Cn����\`��a��l!]��+�!������̳2�(	����ge�a�S��^b*ͭ1����2�zJn
��Ex�9j�H��_\\��)�w�E�{jmV�Ӧ��F��,�جe_>dA>;��m��.�����^�i�?�4���&ce���y�}5��ObDAeC��k��N׽WIۏ=IR]�:g��]��W���ov�NZ{Z�,G�m�v����O�'hf�q�p]��ޮ\`��]��(��5J��;�qtR�RXZ/�+�cJBXZ �JiID�n��a�ّ��w����N8�~���������a�
�2�5dȧ��G��c��?��l	:��7��nb,����nxar}�ݷ
r2*E��g�pd������D0K�Dn���,��,a�>ٷf	[��g�����g	g�pd����g	g�pd	k��B5K��t�њ�*.�����~��&�P���|��Iby!���n�ȱ�_7��
qG�c��u��o||�?
�7.�HS�^�L�K8��8�sG��N=rHs2ϧ�x���/�6H�����	�l��N�>b�������j��N�>r	�3�Z㇏qe��.'{���M����r���%O�#=��]%]�55D�fh��x�x�w-��N�C����=�yȶ;���������ɠ���W�z|	�fq�$\\G�8���]q�17E����20�Z���p�xp޲��W>��[b�/���q�����[�L?�q��������Ox���Ѷ�/w��;_��3�L���I�s�F�C_�(�p8G���G��D'��{|{}i�Q]6�ǉ��=V3����ڲ3Ζy�
��a|<��x$��HF�d4�F�|�#�itsx$������1g�yNrۥ�\`I#����1�Uʢ�A]���K�v�D�@+�.7����k���J��ު�ǭwu��I:��I#A�!vDS"�k$"�H_��!�EPa�נ�Y����=�.!ԕq��YQ�z@���z2�Lg�Ut��$]}��U��������d(̤'�uk�-ˣ��d0��f��\`����~�>38�1�+/�rÛ���#�RVYY���"��\`�X�"����4��	�{-�F�	���I��'o>4��KM�Ӱ\`Ҳm|ݦ��tɘ����o\\t��w_���	C��z�����{+��|�Cf�:U��Q���ES'
��YB�t��-I��n
7G/2��S�E;��ef���,�(�H��\\d/
_�V�B@�����sԅ�����BG��hEU^#5�WM��	�P4�\`�q�E��2���bl�c�S^�6�w�L�0Z�@4Ŕ���m�NP<�S���+�$%�L\\��@w�Pu�cli���d��Ґ��\`���|8��bB�%0�׺�y g�i�����$�\\��"nV����W~ӌ4�A��!_�F橻B_4[�  �(�'>&l���O\`x���Z:�w���w�k�N��V��<���/\`��y��?���[�\`ח��"6���:�U�,�<s�ɷ�v�Puj�Z[9�bL��ʛR���HkbJdJ�C��vF:�j��(� �?�^�P�P������UGRC�p-�7��|�y1?Ŝm~�|]Y2K��I
�
᤮ =�D���G'"��M��x
�SL,R�W���[#��~�)�\\�S�nfUp�a�	5y �?�PD��FC}�,A��@���AY�Q��������� h~���O�Z�r�3�ۃpE�DW�ŕ��������o�t��GYO����ۖ/{��x�����T���?k<�m�����~�C�
&���#d�M���:�G
�s�T�R�*�bScU=^(���	�	���k��&�V��:(�o!|�~5G����(�fu2�X����G�'���_ƾH���k�xRu!���bG�&�w9��=�h�1�Xc�U,�Y�V�\`iOc8�i����Ҟ����>��a�]��]L�-�ز[l�-��V�GxS9��a���7E���n���Ugf6��fYV��i���҂%��ȱ^"�4�idæ�_*�����xmɓ�5�ݺ���+n~�ԍ�s��QP|��˧7��������������]dq_'�j���%�Ah�/��3�y�r^�-I�d-h��$��\`9���t*�(�MN�t���p��w�*3�S���_njP(�B��_����Q�k\`)e����Մ,��7�댽ֵv�^��������ms�<��s�U�uO,�Ժ�~b�ܥ��1�
�'33�#����Nl�ms�4���:��P���������r|�P�U�"O��J_�^-o��e��v�+�&G����#?��r��1G;�N�w*�j�6_�/�����|����ޠ��c3�q�r]�u���3k2��ߨs�F����Y�����]u�Յs~���� ����S����h�tر��������x���WFU�)đ��d q�-��*�=�nL0bձűOc|u����D$���#��}�I)�&< �&d��]�p�a��n �Y��U&+Dޭ�bY�/���N����T�a<s�����f�mE�-�Zca*��}g,E�c9�C�^���� }��2S��A���
��~'}�O�i�uJ�[[���S��j�
s����Ƭ��Px5�nh��=�N>bB�ΈIK5=���T�\`��\`�n�<�v©c*�Qp=|���O�P�l
%Z��A
1���K��E\`�����2�i��o;�����x����p[���:�gU�B#�,�6�&'��T�91g�MU�<��k ]������zy>��J�Ѻ�؆�@
��kׂ2�Is�]���/
��]�X_W?
5ƶ��$A~���յ�4�]�����#�oi�����g���lk���{��p�1���M��_��ݏ�y�K��p^m4;f��iW��V�����deg�.X�9���?Gukf�[��"�z/P��_)�v�D ��(�uևm��A U
C�M9o\`�q�a�Aj��'�uOT8$J��o׈�< N���q�x@e��.0a��e�Hn��
<6�	&{�]�.M�z^����|�c��wFֆuUs���Ԣ��
jѬ�&��2RY6��QP��j�(d�xȌ�l�5G�[�k��\`>W��c���?��} �K�z\`�KF�iV���#|9�_�qZdP)�T0Li��81;T�aF
�U+ĀYd�@S؏Kþ��K��h��q�FX\\�t:\\#a�+2�FB��ak������Ȕ
E���L�Ӆ���h��8�)�x|G|(��]�� \\�A��ÆT�@N��#2/��T6�ڇ��
��ǢQ�Ak��i�5?�q��UV\\7�5��b���#R@"�'�&�&Y.:�а��)�^UL}"�Rd ׶��+�j7�źq��
����gҢ��eh��_�=q���Aœ��S��(FciO�o�i���d
���,���������.d���E�� ��(�a�����~�P?�J�CгM�5 H[ELM�f尝,Ht�ȗ�"�л�4�&W�@�lX� ��&��c�ܨH���� 9�A3�&�Ypꐮ���y�[�o��[�J�V���Gws���H���
6������%�'>���������3|���tp�q���,;\\��)x9v��=u@��\`��,���@謰gQ �*���P��
������S��8-X����C���P�e�0&�!��"���0ШB5-9�㶖���N\`M �ȑSȁi���by<��G����
c	V�����ޫ/>��:��d>#������lu4�׽����u7,���C�@���G$�\\Ey"���q=��+UA��X����+�����_��
�YZA�x�'�<�G�p
��w���B�������$�L�é�;NC�2�>~��U�Td�ǀ�K�J{;��@�1n�R�n����ûN]B{�M�)f ��y�����r?M�#+��;���.��i�#�a���A�G
Me-�T"���ͮ-�����o~�od�J<���'���~FS�9����â�#>�|�/��Ƒ�k
f�҅����L�T9($��/(��K�	�\\HLJ	�Rπ�� ��h[�s�	�D�/��*�)��2{�x�t��R�M\\.����߄�rN�r ���9��n�Z�[�����&u|=�<����>�
��#����= ���
#��lk
.���X�ͻ�X7xX�(eE#���.rT�ڞ��j4r��fIP�����筙�e��Zh���yr���p�L>Zc~��嬚G��푿��OM�KD��i��ѩ��&N�dg6���-QJ��m�b(u��YMi�.� =��y;%�y� (ڼdX���ó��ܨ~�
C�}gj��cZ�q�����v�;)s]���\\l�iQ���b�\\�mqDm�
�~7����K���ď%TuE���&�m��5Q7������3���Rj
�8t��:G�>t��6R�:>�E�U4uGa�t�yq4dO�̘���1KCG�Sכ����(�|6�v���'��}�7
���"�}�Б]8ŧ�9)Σ�쵋\`$�Q�5x���bp��c}[N����U�L##�O��spj�}϶�M��}���������!Qѿ>j��n��v?�w�c�z��]m����6��e<]m�8�T!�g�+�<�$hD�
��y&۬a�ϰ���1�ع4V�m<�?*m�����/��6d�	�\\P���f3lU��
��h���;�+�Mp3ެ��=��[�;�����O�ϱ�_��
lˈj�?��!�� 
\`�֛�JV>�Q?�	'J�A��:�y�K����
���p���|�.#3� 2���5�eU.���e�C�(U�vړ�;�46��;L�p�#\\*�a}Y/t�wJ��ɞl�fٖ��0�l~ng��N]�.wyB�u��*��o�%&����+\`�4Γ�=ZYTX��ʢ��9r��w�M�Z�(�tMQv�~��|C5O�����"�\\=4�Җ??5*92�������C���D9X�~���M'K��ᔎR��5���I��$����m.��lk��:�4�)�����ʪ�\\��F�\\+q��.3lA��m�GMyBk��ţ��I�X>����.#I���E�b.4�؎9Gs�ʧr�&݈�l���]�ԫ��Xu�֬o����N
w����n�;�]�RX���n�Vq�v����@���f������/��K�oڠ�}h(Y�n8�$�1�XgpFl���|�=�Un1�$�����P0��q�<0T���
)
RJ�"� I3��/'Qrj�m��pB{�LGi�]e�l#{�k�4�(��.6[NJ���ܥꐊT�]�����z��D���������WQs�h���>����Di ꋮT^�Bew=T��u��D;�@b�c@:�uch�poK�[�:m1UQ���&4��1���=���z��+��SbjI�tg�ܑ�&E���RZ�ʡ|�:�YOi��ѫgJ7<k�2�F%��r���+Ђ�ol�1��r�hŃD�u��^8���-���7%d�1.����L��*V��3�F���haO�����r��	g���l�Rs!�]+͗W���*�~x�t��=@��TGHy�(���!�U�gV�2����E�Ze�$��k� ������5@K�9'y�=��!�= ���  D�f�]Z{\\�@w����=���ݥ/����!��(��b�����/�lw+�h��%��Y��9HsX�����
~�8^xa�z�＜Y��#\`�Ds���It.ɣW��,ҩt�n.�\`\`j��4�$xw��EY
'Σ���H��A.���ç-%j�B-�7űM59�u��v���-^9~������^�J�5]���^��;A�
dx�MʳDn<��T��+�V�N,=��� �[��R�>b�
endstream
endobj
19 0 obj
<</Type /FontDescriptor
/FontName /BAAAAA+ArialMT
/Flags 4
/Ascent 905.27344
/Descent -211.91406
/StemV 45.898438
/CapHeight 715.82031
/ItalicAngle 0
/FontBBox [-664.55078 -324.70703 2000 1005.85938]
/FontFile2 18 0 R>>
endobj
20 0 obj
<</Type /Font
/FontDescriptor 19 0 R
/BaseFont /BAAAAA+ArialMT
/Subtype /CIDFontType2
/CIDToGIDMap /Identity
/CIDSystemInfo <</Registry (Adobe)
/Ordering (Identity)
/Supplement 0>>
/W [0 [750] 5 [354.98047] 10 [190.91797] 15 [277.83203 333.00781 277.83203 0 0 556.15234] 29 [277.83203] 36 37 666.99219 38 [722.16797 0 666.99219 610.83984 777.83203 722.16797 277.83203 0 0 556.15234 833.00781 722.16797 777.83203 0 0 722.16797 666.99219 610.83984 722.16797 0 943.84766 0 666.99219] 68 69 556.15234 71 72 556.15234 73 [277.83203 556.15234 556.15234 222.16797 222.16797] 79 [222.16797 833.00781] 81 84 556.15234 85 [333.00781] 87 [277.83203 556.15234] 90 [722.16797] 404 [604.00391]]
/DW 500>>
endobj
21 0 obj
<</Filter /FlateDecode
/Length 315>> stream
x�]��j�0��~
�CI�4�
!PR
9�e{��V:���=��gK������d)Y�Zk�>��:|0V{���W�Op6�	ɵQ�J�Vc�X��2[;L��8�>�w~�O{=���e�^�7�̟��.rwq�F��笮��!fz��[?�P�ju�������8�YP7j�0�^���X��S��O����-�N���=F�1:ϥ���D[$�F*сh�TPdI�EC�K$vI'ˆ:����*?=�H��\`&I5�?k*-_n!h,�H�B���]� AI�ZSΒ.�׶��4�������8{\\8=��X��nrI��?�_��
endstream
endobj
5 0 obj
<</Type /Font
/Subtype /Type0
/BaseFont /BAAAAA+ArialMT
/Encoding /Identity-H
/DescendantFonts [20 0 R]
/ToUnicode 21 0 R>>
endobj
xref
0 22
0000000000 65535 f 
0000000015 00000 n 
0000014272 00000 n 
0000000099 00000 n 
0000038109 00000 n 
0000063744 00000 n 
0000000136 00000 n 
0000014500 00000 n 
0000005799 00000 n 
0000014728 00000 n 
0000011814 00000 n 
0000014947 00000 n 
0000015015 00000 n 
0000015293 00000 n 
0000015426 00000 n 
0000036764 00000 n 
0000037005 00000 n 
0000037730 00000 n 
0000038253 00000 n 
0000062415 00000 n 
0000062651 00000 n 
0000063358 00000 n 
trailer
<</Size 22
/Root 13 0 R
/Info 1 0 R>>
startxref
63883
%%EOF
`,
                language: 'plaintext'
            }
        ]
    },
    {
        name: 'README.md',
        path: 'README.md',
        type: 'file',
        content: `Download Lecture on the App Store:
https://apps.apple.com/us/app/lectura-university-lectures/id6740043004

Access the world's top university lectures in your pocket. Lectura brings you official lectures from prestigious institutions like Stanford, Harvard, and MIT, transforming how you learn on the go.


Key Features:


Stream full university courses and individual lectures

AI-generated lecture notes for quick review and reference

Comprehensive course catalog from leading institutions

Powerful search to find exactly what you want to learn

Intuitive organization by subject, university, and course


Whether you're a curious learner, student, or professional looking to expand your knowledge, Lectura puts world-class education at your fingertips. Explore complex topics, supplement your studies, or dive into new subjects with lectures from renowned professors.


No more barriers to elite education. Download Lectura today and start learning from the world's best universities.


Privacy Policy: https://sites.google.com/view/lecturaprivacypolicy/home

End User License Agreement (EULA): https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
`,
        language: 'markdown'
    }
];
