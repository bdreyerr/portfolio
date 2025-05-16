import { FileNode } from '../components/CodeViewer';

export const dailyShort: FileNode[] = [
    {
        name: 'Writing.xcodeproj',
        path: 'Writing.xcodeproj',
        type: 'directory',
        children: [
            {
                name: 'project.pbxproj',
                path: 'Writing.xcodeproj/project.pbxproj',
                type: 'file',
                content: `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 56;
	objects = {

/* Begin PBXBuildFile section */
		1A3C05EF2C2A10AE00BDB3F2 /* ProfileEditShortView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05EE2C2A10AE00BDB3F2 /* ProfileEditShortView.swift */; };
		1A3C05F12C2E76F200BDB3F2 /* ProfileChangePhotoView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05F02C2E76F200BDB3F2 /* ProfileChangePhotoView.swift */; };
		1A3C05F32C2F6E4B00BDB3F2 /* PromptSuggestion.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05F22C2F6E4B00BDB3F2 /* PromptSuggestion.swift */; };
		1A3C05F52C308A5A00BDB3F2 /* FreeWrite.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05F42C308A5A00BDB3F2 /* FreeWrite.swift */; };
		1A3C05F72C308C7A00BDB3F2 /* FreeWriteController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05F62C308C7A00BDB3F2 /* FreeWriteController.swift */; };
		1A3C05F92C309F1800BDB3F2 /* FreeWriteEntryPreviewView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05F82C309F1800BDB3F2 /* FreeWriteEntryPreviewView.swift */; };
		1A3C05FB2C31E62E00BDB3F2 /* FreeWriteFullListView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05FA2C31E62E00BDB3F2 /* FreeWriteFullListView.swift */; };
		1A3C05FD2C31EA7600BDB3F2 /* FreeWriteEditEntryView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A3C05FC2C31EA7600BDB3F2 /* FreeWriteEditEntryView.swift */; };
		1A4B25F62C55B22F004A0A6E /* ProfileAdvertiseWithUsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A4B25F52C55B22F004A0A6E /* ProfileAdvertiseWithUsView.swift */; };
		1A4B25F82C56ED52004A0A6E /* LocalNotificationController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A4B25F72C56ED52004A0A6E /* LocalNotificationController.swift */; };
		1A4B25FA2C56EE41004A0A6E /* ProfileNotificationsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A4B25F92C56EE41004A0A6E /* ProfileNotificationsView.swift */; };
		1A4B25FC2C56F6BC004A0A6E /* LocalNotification.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A4B25FB2C56F6BC004A0A6E /* LocalNotification.swift */; };
		1A61D0F72C69409600331361 /* ProfileAboutTheAppView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A61D0F62C69409600331361 /* ProfileAboutTheAppView.swift */; };
		1A61D0F92C7BCE2700331361 /* Ad.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A61D0F82C7BCE2700331361 /* Ad.swift */; };
		1A61D1002C7BDEE400331361 /* AdvertisementController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A61D0FF2C7BDEE300331361 /* AdvertisementController.swift */; };
		1A61D1022C7BE19F00331361 /* AdPreviewView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A61D1012C7BE19F00331361 /* AdPreviewView.swift */; };
		1A61D1042C7BE1CA00331361 /* AdFullView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A61D1032C7BE1CA00331361 /* AdFullView.swift */; };
		1A6B04E12C45B1B1003CD787 /* ShortAnalysisLoadingView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6B04E02C45B1B1003CD787 /* ShortAnalysisLoadingView.swift */; };
		1A6FDDB42C20D6B800C8F5FD /* FreeWriteSignedOutView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDB32C20D6B800C8F5FD /* FreeWriteSignedOutView.swift */; };
		1A6FDDB62C22197B00C8F5FD /* CreateShortController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDB52C22197B00C8F5FD /* CreateShortController.swift */; };
		1A6FDDB82C221CE500C8F5FD /* UserController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDB72C221CE500C8F5FD /* UserController.swift */; };
		1A6FDDBA2C224D1D00C8F5FD /* CreateShortOrYourExistingShort.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDB92C224D1D00C8F5FD /* CreateShortOrYourExistingShort.swift */; };
		1A6FDDBC2C27525700C8F5FD /* CreateCommentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDBB2C27525700C8F5FD /* CreateCommentView.swift */; };
		1A6FDDBE2C27799700C8F5FD /* ProfileSidebarContentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A6FDDBD2C27799700C8F5FD /* ProfileSidebarContentView.swift */; };
		1A71B27F2C3CA5D200C7E274 /* ProfileStreaksAndAwardsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A71B27E2C3CA5D200C7E274 /* ProfileStreaksAndAwardsView.swift */; };
		1A71B2822C436A3D00C7E274 /* ShortAnalysisMainView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A71B2812C436A3D00C7E274 /* ShortAnalysisMainView.swift */; };
		1A71B2862C436AE000C7E274 /* ShortAnalysisController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A71B2852C436AE000C7E274 /* ShortAnalysisController.swift */; };
		1A71B2882C436BCC00C7E274 /* ShortAnalysis.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A71B2872C436BCC00C7E274 /* ShortAnalysis.swift */; };
		1A71B28A2C4381C600C7E274 /* Secrets.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A71B2892C4381C600C7E274 /* Secrets.swift */; };
		1A71B28D2C445E9E00C7E274 /* OpenAI in Frameworks */ = {isa = PBXBuildFile; productRef = 1A71B28C2C445E9E00C7E274 /* OpenAI */; };
		1A723BA92C28CFBB00B0244A /* ProfileShortPreview.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A723BA82C28CFBB00B0244A /* ProfileShortPreview.swift */; };
		1A723BAB2C28D13400B0244A /* ProfileShortGrid.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A723BAA2C28D13400B0244A /* ProfileShortGrid.swift */; };
		1A723BAD2C28EB6D00B0244A /* ProfileFocusedShortView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A723BAC2C28EB6D00B0244A /* ProfileFocusedShortView.swift */; };
		1A7944D72C0C257000757A7E /* HomeMainView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944D62C0C257000757A7E /* HomeMainView.swift */; };
		1A7944E12C0E759F00757A7E /* SingleCommunityResponseView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944E02C0E759F00757A7E /* SingleCommunityResponseView.swift */; };
		1A7944E32C0E75AC00757A7E /* ListCommunityResponseView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944E22C0E75AC00757A7E /* ListCommunityResponseView.swift */; };
		1A7944E52C0E75C000757A7E /* CreateResponseView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944E42C0E75C000757A7E /* CreateResponseView.swift */; };
		1A7944E82C0E75E500757A7E /* ProfileMainView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944E72C0E75E500757A7E /* ProfileMainView.swift */; };
		1A7944EB2C0E77AE00757A7E /* SingleLimitedCommunityResponse.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944EA2C0E77AE00757A7E /* SingleLimitedCommunityResponse.swift */; };
		1A7944ED2C0E78FC00757A7E /* TodaysPrompt.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A7944EC2C0E78FC00757A7E /* TodaysPrompt.swift */; };
		1A8172BE2C1E20D6004217AA /* HomeController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172BD2C1E20D6004217AA /* HomeController.swift */; };
		1A8172C02C1E20E2004217AA /* ProfileController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172BF2C1E20E2004217AA /* ProfileController.swift */; };
		1A8172C32C1F7DF4004217AA /* GoogleSignIn in Frameworks */ = {isa = PBXBuildFile; productRef = 1A8172C22C1F7DF4004217AA /* GoogleSignIn */; };
		1A8172C52C1F7DF4004217AA /* GoogleSignInSwift in Frameworks */ = {isa = PBXBuildFile; productRef = 1A8172C42C1F7DF4004217AA /* GoogleSignInSwift */; };
		1A8172C72C1F7EB4004217AA /* GoogleService-Info.plist in Resources */ = {isa = PBXBuildFile; fileRef = 1A8172C62C1F7EB4004217AA /* GoogleService-Info.plist */; };
		1A8172CA2C1F98F1004217AA /* ApplicationUtility.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172C92C1F98F1004217AA /* ApplicationUtility.swift */; };
		1A8172CD2C1FA3C5004217AA /* FreeWriteMainView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172CC2C1FA3C5004217AA /* FreeWriteMainView.swift */; };
		1A8172D12C1FE091004217AA /* FreeWriteCreateEntryView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172D02C1FE091004217AA /* FreeWriteCreateEntryView.swift */; };
		1A8172D32C1FE2F9004217AA /* FreeWriteSingleEntryView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172D22C1FE2F9004217AA /* FreeWriteSingleEntryView.swift */; };
		1A8172D52C20D4DA004217AA /* FreeWriteContentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A8172D42C20D4DA004217AA /* FreeWriteContentView.swift */; };
		1A97B08E2C0FD58F00F597AB /* CommunityResponseComment.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A97B08D2C0FD58F00F597AB /* CommunityResponseComment.swift */; };
		1A97B0912C0FD9BA00F597AB /* NavBarView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1A97B0902C0FD9BA00F597AB /* NavBarView.swift */; };
		1AA1A4FE2C0BD15D009D9233 /* WritingApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1AA1A4FD2C0BD15D009D9233 /* WritingApp.swift */; };
		1AA1A5002C0BD15D009D9233 /* ContentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1AA1A4FF2C0BD15D009D9233 /* ContentView.swift */; };
		1AA1A5022C0BD15E009D9233 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 1AA1A5012C0BD15E009D9233 /* Assets.xcassets */; };
		1AA1A5052C0BD15E009D9233 /* Preview Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 1AA1A5042C0BD15E009D9233 /* Preview Assets.xcassets */; };
		1ABF08ED2C165D9E00F2E6AF /* SideBarStack.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08EC2C165D9E00F2E6AF /* SideBarStack.swift */; };
		1ABF08F12C16B4F400F2E6AF /* ProfileEditProfileView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08F02C16B4F400F2E6AF /* ProfileEditProfileView.swift */; };
		1ABF08F32C16B51E00F2E6AF /* ProfileSuggestPromptView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08F22C16B51E00F2E6AF /* ProfileSuggestPromptView.swift */; };
		1ABF08F52C16B53F00F2E6AF /* ProfileHowWeAnalyzeView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08F42C16B53F00F2E6AF /* ProfileHowWeAnalyzeView.swift */; };
		1ABF08F72C1809FD00F2E6AF /* ProfileSettingsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08F62C1809FD00F2E6AF /* ProfileSettingsView.swift */; };
		1ABF08FA2C1A4D0800F2E6AF /* User.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08F92C1A4D0800F2E6AF /* User.swift */; };
		1ABF08FC2C1A58BF00F2E6AF /* Prompt.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08FB2C1A58BF00F2E6AF /* Prompt.swift */; };
		1ABF08FE2C1A59E700F2E6AF /* Short.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08FD2C1A59E700F2E6AF /* Short.swift */; };
		1ABF09002C1A5A7C00F2E6AF /* ShortComment.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF08FF2C1A5A7C00F2E6AF /* ShortComment.swift */; };
		1ABF09032C1CD5B200F2E6AF /* SignUpOrIn.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF09022C1CD5B200F2E6AF /* SignUpOrIn.swift */; };
		1ABF09052C1CDCA400F2E6AF /* ProfileMainViewNotSignedIn.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF09042C1CDCA400F2E6AF /* ProfileMainViewNotSignedIn.swift */; };
		1ABF090A2C1D540C00F2E6AF /* FirebaseAuth in Frameworks */ = {isa = PBXBuildFile; productRef = 1ABF09092C1D540C00F2E6AF /* FirebaseAuth */; };
		1ABF090C2C1D540C00F2E6AF /* FirebaseFirestore in Frameworks */ = {isa = PBXBuildFile; productRef = 1ABF090B2C1D540C00F2E6AF /* FirebaseFirestore */; };
		1ABF090E2C1D540C00F2E6AF /* FirebaseFirestoreSwift in Frameworks */ = {isa = PBXBuildFile; productRef = 1ABF090D2C1D540C00F2E6AF /* FirebaseFirestoreSwift */; };
		1ABF09102C1D540C00F2E6AF /* FirebaseStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 1ABF090F2C1D540C00F2E6AF /* FirebaseStorage */; };
		1ABF09132C1D562800F2E6AF /* AuthController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF09122C1D562800F2E6AF /* AuthController.swift */; };
		1ABF09182C1E147700F2E6AF /* ProfileContentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 1ABF09172C1E147700F2E6AF /* ProfileContentView.swift */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		1A3C05EE2C2A10AE00BDB3F2 /* ProfileEditShortView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileEditShortView.swift; sourceTree = "<group>"; };
		1A3C05F02C2E76F200BDB3F2 /* ProfileChangePhotoView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileChangePhotoView.swift; sourceTree = "<group>"; };
		1A3C05F22C2F6E4B00BDB3F2 /* PromptSuggestion.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = PromptSuggestion.swift; sourceTree = "<group>"; };
		1A3C05F42C308A5A00BDB3F2 /* FreeWrite.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWrite.swift; sourceTree = "<group>"; };
		1A3C05F62C308C7A00BDB3F2 /* FreeWriteController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteController.swift; sourceTree = "<group>"; };
		1A3C05F82C309F1800BDB3F2 /* FreeWriteEntryPreviewView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteEntryPreviewView.swift; sourceTree = "<group>"; };
		1A3C05FA2C31E62E00BDB3F2 /* FreeWriteFullListView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteFullListView.swift; sourceTree = "<group>"; };
		1A3C05FC2C31EA7600BDB3F2 /* FreeWriteEditEntryView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteEditEntryView.swift; sourceTree = "<group>"; };
		1A4B25F52C55B22F004A0A6E /* ProfileAdvertiseWithUsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileAdvertiseWithUsView.swift; sourceTree = "<group>"; };
		1A4B25F72C56ED52004A0A6E /* LocalNotificationController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = LocalNotificationController.swift; sourceTree = "<group>"; };
		1A4B25F92C56EE41004A0A6E /* ProfileNotificationsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileNotificationsView.swift; sourceTree = "<group>"; };
		1A4B25FB2C56F6BC004A0A6E /* LocalNotification.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = LocalNotification.swift; sourceTree = "<group>"; };
		1A61D0F62C69409600331361 /* ProfileAboutTheAppView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileAboutTheAppView.swift; sourceTree = "<group>"; };
		1A61D0F82C7BCE2700331361 /* Ad.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Ad.swift; sourceTree = "<group>"; };
		1A61D0FF2C7BDEE300331361 /* AdvertisementController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AdvertisementController.swift; sourceTree = "<group>"; };
		1A61D1012C7BE19F00331361 /* AdPreviewView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AdPreviewView.swift; sourceTree = "<group>"; };
		1A61D1032C7BE1CA00331361 /* AdFullView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AdFullView.swift; sourceTree = "<group>"; };
		1A6B04E02C45B1B1003CD787 /* ShortAnalysisLoadingView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ShortAnalysisLoadingView.swift; sourceTree = "<group>"; };
		1A6FDDB32C20D6B800C8F5FD /* FreeWriteSignedOutView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteSignedOutView.swift; sourceTree = "<group>"; };
		1A6FDDB52C22197B00C8F5FD /* CreateShortController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CreateShortController.swift; sourceTree = "<group>"; };
		1A6FDDB72C221CE500C8F5FD /* UserController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = UserController.swift; sourceTree = "<group>"; };
		1A6FDDB92C224D1D00C8F5FD /* CreateShortOrYourExistingShort.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CreateShortOrYourExistingShort.swift; sourceTree = "<group>"; };
		1A6FDDBB2C27525700C8F5FD /* CreateCommentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CreateCommentView.swift; sourceTree = "<group>"; };
		1A6FDDBD2C27799700C8F5FD /* ProfileSidebarContentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileSidebarContentView.swift; sourceTree = "<group>"; };
		1A71B27E2C3CA5D200C7E274 /* ProfileStreaksAndAwardsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileStreaksAndAwardsView.swift; sourceTree = "<group>"; };
		1A71B2812C436A3D00C7E274 /* ShortAnalysisMainView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ShortAnalysisMainView.swift; sourceTree = "<group>"; };
		1A71B2852C436AE000C7E274 /* ShortAnalysisController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ShortAnalysisController.swift; sourceTree = "<group>"; };
		1A71B2872C436BCC00C7E274 /* ShortAnalysis.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ShortAnalysis.swift; sourceTree = "<group>"; };
		1A71B2892C4381C600C7E274 /* Secrets.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Secrets.swift; sourceTree = "<group>"; };
		1A723BA82C28CFBB00B0244A /* ProfileShortPreview.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileShortPreview.swift; sourceTree = "<group>"; };
		1A723BAA2C28D13400B0244A /* ProfileShortGrid.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileShortGrid.swift; sourceTree = "<group>"; };
		1A723BAC2C28EB6D00B0244A /* ProfileFocusedShortView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileFocusedShortView.swift; sourceTree = "<group>"; };
		1A7944D62C0C257000757A7E /* HomeMainView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = HomeMainView.swift; sourceTree = "<group>"; };
		1A7944E02C0E759F00757A7E /* SingleCommunityResponseView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SingleCommunityResponseView.swift; sourceTree = "<group>"; };
		1A7944E22C0E75AC00757A7E /* ListCommunityResponseView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ListCommunityResponseView.swift; sourceTree = "<group>"; };
		1A7944E42C0E75C000757A7E /* CreateResponseView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CreateResponseView.swift; sourceTree = "<group>"; };
		1A7944E72C0E75E500757A7E /* ProfileMainView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileMainView.swift; sourceTree = "<group>"; };
		1A7944EA2C0E77AE00757A7E /* SingleLimitedCommunityResponse.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SingleLimitedCommunityResponse.swift; sourceTree = "<group>"; };
		1A7944EC2C0E78FC00757A7E /* TodaysPrompt.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TodaysPrompt.swift; sourceTree = "<group>"; };
		1A8172BD2C1E20D6004217AA /* HomeController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = HomeController.swift; sourceTree = "<group>"; };
		1A8172BF2C1E20E2004217AA /* ProfileController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileController.swift; sourceTree = "<group>"; };
		1A8172C62C1F7EB4004217AA /* GoogleService-Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; name = "GoogleService-Info.plist"; path = "../../../DailyShort/GoogleService-Info.plist"; sourceTree = "<group>"; };
		1A8172C82C1F7F85004217AA /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist; path = Info.plist; sourceTree = "<group>"; };
		1A8172C92C1F98F1004217AA /* ApplicationUtility.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ApplicationUtility.swift; sourceTree = "<group>"; };
		1A8172CC2C1FA3C5004217AA /* FreeWriteMainView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteMainView.swift; sourceTree = "<group>"; };
		1A8172D02C1FE091004217AA /* FreeWriteCreateEntryView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteCreateEntryView.swift; sourceTree = "<group>"; };
		1A8172D22C1FE2F9004217AA /* FreeWriteSingleEntryView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteSingleEntryView.swift; sourceTree = "<group>"; };
		1A8172D42C20D4DA004217AA /* FreeWriteContentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FreeWriteContentView.swift; sourceTree = "<group>"; };
		1A97B08D2C0FD58F00F597AB /* CommunityResponseComment.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CommunityResponseComment.swift; sourceTree = "<group>"; };
		1A97B0902C0FD9BA00F597AB /* NavBarView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = NavBarView.swift; sourceTree = "<group>"; };
		1AA1A4FA2C0BD15D009D9233 /* Writing.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = Writing.app; sourceTree = BUILT_PRODUCTS_DIR; };
		1AA1A4FD2C0BD15D009D9233 /* WritingApp.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = WritingApp.swift; sourceTree = "<group>"; };
		1AA1A4FF2C0BD15D009D9233 /* ContentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ContentView.swift; sourceTree = "<group>"; };
		1AA1A5012C0BD15E009D9233 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		1AA1A5042C0BD15E009D9233 /* Preview Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = "Preview Assets.xcassets"; sourceTree = "<group>"; };
		1ABF08EC2C165D9E00F2E6AF /* SideBarStack.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SideBarStack.swift; sourceTree = "<group>"; };
		1ABF08F02C16B4F400F2E6AF /* ProfileEditProfileView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileEditProfileView.swift; sourceTree = "<group>"; };
		1ABF08F22C16B51E00F2E6AF /* ProfileSuggestPromptView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileSuggestPromptView.swift; sourceTree = "<group>"; };
		1ABF08F42C16B53F00F2E6AF /* ProfileHowWeAnalyzeView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileHowWeAnalyzeView.swift; sourceTree = "<group>"; };
		1ABF08F62C1809FD00F2E6AF /* ProfileSettingsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileSettingsView.swift; sourceTree = "<group>"; };
		1ABF08F92C1A4D0800F2E6AF /* User.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = User.swift; sourceTree = "<group>"; };
		1ABF08FB2C1A58BF00F2E6AF /* Prompt.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Prompt.swift; sourceTree = "<group>"; };
		1ABF08FD2C1A59E700F2E6AF /* Short.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Short.swift; sourceTree = "<group>"; };
		1ABF08FF2C1A5A7C00F2E6AF /* ShortComment.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ShortComment.swift; sourceTree = "<group>"; };
		1ABF09022C1CD5B200F2E6AF /* SignUpOrIn.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SignUpOrIn.swift; sourceTree = "<group>"; };
		1ABF09042C1CDCA400F2E6AF /* ProfileMainViewNotSignedIn.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileMainViewNotSignedIn.swift; sourceTree = "<group>"; };
		1ABF09122C1D562800F2E6AF /* AuthController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AuthController.swift; sourceTree = "<group>"; };
		1ABF09142C1D5EC100F2E6AF /* Writing.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = Writing.entitlements; sourceTree = "<group>"; };
		1ABF09172C1E147700F2E6AF /* ProfileContentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ProfileContentView.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		1AA1A4F72C0BD15D009D9233 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				1A8172C32C1F7DF4004217AA /* GoogleSignIn in Frameworks */,
				1ABF090A2C1D540C00F2E6AF /* FirebaseAuth in Frameworks */,
				1ABF09102C1D540C00F2E6AF /* FirebaseStorage in Frameworks */,
				1A8172C52C1F7DF4004217AA /* GoogleSignInSwift in Frameworks */,
				1A71B28D2C445E9E00C7E274 /* OpenAI in Frameworks */,
				1ABF090C2C1D540C00F2E6AF /* FirebaseFirestore in Frameworks */,
				1ABF090E2C1D540C00F2E6AF /* FirebaseFirestoreSwift in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		1A61D0FC2C7BDDAB00331361 /* Advertisements */ = {
			isa = PBXGroup;
			children = (
				1A61D1012C7BE19F00331361 /* AdPreviewView.swift */,
				1A61D1032C7BE1CA00331361 /* AdFullView.swift */,
			);
			path = Advertisements;
			sourceTree = "<group>";
		};
		1A71B2802C436A2300C7E274 /* Analysis */ = {
			isa = PBXGroup;
			children = (
				1A71B2812C436A3D00C7E274 /* ShortAnalysisMainView.swift */,
				1A6B04E02C45B1B1003CD787 /* ShortAnalysisLoadingView.swift */,
			);
			path = Analysis;
			sourceTree = "<group>";
		};
		1A723BA62C28CF5300B0244A /* SidebarViews */ = {
			isa = PBXGroup;
			children = (
				1A6FDDBD2C27799700C8F5FD /* ProfileSidebarContentView.swift */,
				1ABF08F42C16B53F00F2E6AF /* ProfileHowWeAnalyzeView.swift */,
				1ABF08F22C16B51E00F2E6AF /* ProfileSuggestPromptView.swift */,
				1ABF08F02C16B4F400F2E6AF /* ProfileEditProfileView.swift */,
				1A3C05F02C2E76F200BDB3F2 /* ProfileChangePhotoView.swift */,
				1A4B25F52C55B22F004A0A6E /* ProfileAdvertiseWithUsView.swift */,
				1A4B25F92C56EE41004A0A6E /* ProfileNotificationsView.swift */,
				1A61D0F62C69409600331361 /* ProfileAboutTheAppView.swift */,
			);
			path = SidebarViews;
			sourceTree = "<group>";
		};
		1A723BA72C28CF9200B0244A /* ProfileMainView-SignedIn */ = {
			isa = PBXGroup;
			children = (
				1A71B2802C436A2300C7E274 /* Analysis */,
				1A7944E72C0E75E500757A7E /* ProfileMainView.swift */,
				1A723BA82C28CFBB00B0244A /* ProfileShortPreview.swift */,
				1A723BAA2C28D13400B0244A /* ProfileShortGrid.swift */,
				1A723BAC2C28EB6D00B0244A /* ProfileFocusedShortView.swift */,
				1A3C05EE2C2A10AE00BDB3F2 /* ProfileEditShortView.swift */,
				1A71B27E2C3CA5D200C7E274 /* ProfileStreaksAndAwardsView.swift */,
			);
			path = "ProfileMainView-SignedIn";
			sourceTree = "<group>";
		};
		1A7944D52C0C255A00757A7E /* Home */ = {
			isa = PBXGroup;
			children = (
				1A61D0FC2C7BDDAB00331361 /* Advertisements */,
				1A7944DB2C0E753F00757A7E /* CommunityResponses */,
				1A7944D62C0C257000757A7E /* HomeMainView.swift */,
				1A7944E42C0E75C000757A7E /* CreateResponseView.swift */,
				1A6FDDBB2C27525700C8F5FD /* CreateCommentView.swift */,
			);
			path = Home;
			sourceTree = "<group>";
		};
		1A7944DB2C0E753F00757A7E /* CommunityResponses */ = {
			isa = PBXGroup;
			children = (
				1A7944EA2C0E77AE00757A7E /* SingleLimitedCommunityResponse.swift */,
				1A7944E02C0E759F00757A7E /* SingleCommunityResponseView.swift */,
				1A7944E22C0E75AC00757A7E /* ListCommunityResponseView.swift */,
			);
			path = CommunityResponses;
			sourceTree = "<group>";
		};
		1A7944E62C0E75D600757A7E /* Profile */ = {
			isa = PBXGroup;
			children = (
				1A723BA72C28CF9200B0244A /* ProfileMainView-SignedIn */,
				1A723BA62C28CF5300B0244A /* SidebarViews */,
				1ABF08F62C1809FD00F2E6AF /* ProfileSettingsView.swift */,
				1ABF09042C1CDCA400F2E6AF /* ProfileMainViewNotSignedIn.swift */,
				1ABF09172C1E147700F2E6AF /* ProfileContentView.swift */,
			);
			path = Profile;
			sourceTree = "<group>";
		};
		1A7944E92C0E779500757A7E /* Modules */ = {
			isa = PBXGroup;
			children = (
				1A7944EC2C0E78FC00757A7E /* TodaysPrompt.swift */,
				1A97B08D2C0FD58F00F597AB /* CommunityResponseComment.swift */,
				1ABF08EC2C165D9E00F2E6AF /* SideBarStack.swift */,
				1A6FDDB92C224D1D00C8F5FD /* CreateShortOrYourExistingShort.swift */,
			);
			path = Modules;
			sourceTree = "<group>";
		};
		1A8172CB2C1FA3B7004217AA /* FreeWrite */ = {
			isa = PBXGroup;
			children = (
				1A8172CC2C1FA3C5004217AA /* FreeWriteMainView.swift */,
				1A8172D02C1FE091004217AA /* FreeWriteCreateEntryView.swift */,
				1A8172D22C1FE2F9004217AA /* FreeWriteSingleEntryView.swift */,
				1A8172D42C20D4DA004217AA /* FreeWriteContentView.swift */,
				1A6FDDB32C20D6B800C8F5FD /* FreeWriteSignedOutView.swift */,
				1A3C05F82C309F1800BDB3F2 /* FreeWriteEntryPreviewView.swift */,
				1A3C05FA2C31E62E00BDB3F2 /* FreeWriteFullListView.swift */,
				1A3C05FC2C31EA7600BDB3F2 /* FreeWriteEditEntryView.swift */,
			);
			path = FreeWrite;
			sourceTree = "<group>";
		};
		1A97B08F2C0FD9AB00F597AB /* Navigation */ = {
			isa = PBXGroup;
			children = (
				1A97B0902C0FD9BA00F597AB /* NavBarView.swift */,
			);
			path = Navigation;
			sourceTree = "<group>";
		};
		1AA1A4F12C0BD15C009D9233 = {
			isa = PBXGroup;
			children = (
				1AA1A4FC2C0BD15D009D9233 /* Writing */,
				1AA1A4FB2C0BD15D009D9233 /* Products */,
			);
			sourceTree = "<group>";
		};
		1AA1A4FB2C0BD15D009D9233 /* Products */ = {
			isa = PBXGroup;
			children = (
				1AA1A4FA2C0BD15D009D9233 /* Writing.app */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		1AA1A4FC2C0BD15D009D9233 /* Writing */ = {
			isa = PBXGroup;
			children = (
				1A8172C82C1F7F85004217AA /* Info.plist */,
				1A8172C62C1F7EB4004217AA /* GoogleService-Info.plist */,
				1ABF09142C1D5EC100F2E6AF /* Writing.entitlements */,
				1A8172C92C1F98F1004217AA /* ApplicationUtility.swift */,
				1ABF09112C1D561B00F2E6AF /* Controllers */,
				1ABF08F82C1A4CF800F2E6AF /* Models */,
				1AA1A50B2C0BD5B0009D9233 /* Views */,
				1AA1A4FD2C0BD15D009D9233 /* WritingApp.swift */,
				1AA1A4FF2C0BD15D009D9233 /* ContentView.swift */,
				1AA1A5012C0BD15E009D9233 /* Assets.xcassets */,
				1AA1A5032C0BD15E009D9233 /* Preview Content */,
				1A71B2892C4381C600C7E274 /* Secrets.swift */,
			);
			path = Writing;
			sourceTree = "<group>";
		};
		1AA1A5032C0BD15E009D9233 /* Preview Content */ = {
			isa = PBXGroup;
			children = (
				1AA1A5042C0BD15E009D9233 /* Preview Assets.xcassets */,
			);
			path = "Preview Content";
			sourceTree = "<group>";
		};
		1AA1A50B2C0BD5B0009D9233 /* Views */ = {
			isa = PBXGroup;
			children = (
				1A8172CB2C1FA3B7004217AA /* FreeWrite */,
				1ABF09012C1CD58C00F2E6AF /* Auth */,
				1A97B08F2C0FD9AB00F597AB /* Navigation */,
				1A7944E92C0E779500757A7E /* Modules */,
				1A7944E62C0E75D600757A7E /* Profile */,
				1A7944D52C0C255A00757A7E /* Home */,
			);
			path = Views;
			sourceTree = "<group>";
		};
		1ABF08F82C1A4CF800F2E6AF /* Models */ = {
			isa = PBXGroup;
			children = (
				1ABF08F92C1A4D0800F2E6AF /* User.swift */,
				1ABF08FB2C1A58BF00F2E6AF /* Prompt.swift */,
				1ABF08FD2C1A59E700F2E6AF /* Short.swift */,
				1ABF08FF2C1A5A7C00F2E6AF /* ShortComment.swift */,
				1A3C05F22C2F6E4B00BDB3F2 /* PromptSuggestion.swift */,
				1A3C05F42C308A5A00BDB3F2 /* FreeWrite.swift */,
				1A71B2872C436BCC00C7E274 /* ShortAnalysis.swift */,
				1A4B25FB2C56F6BC004A0A6E /* LocalNotification.swift */,
				1A61D0F82C7BCE2700331361 /* Ad.swift */,
			);
			path = Models;
			sourceTree = "<group>";
		};
		1ABF09012C1CD58C00F2E6AF /* Auth */ = {
			isa = PBXGroup;
			children = (
				1ABF09022C1CD5B200F2E6AF /* SignUpOrIn.swift */,
			);
			path = Auth;
			sourceTree = "<group>";
		};
		1ABF09112C1D561B00F2E6AF /* Controllers */ = {
			isa = PBXGroup;
			children = (
				1ABF09122C1D562800F2E6AF /* AuthController.swift */,
				1A8172BD2C1E20D6004217AA /* HomeController.swift */,
				1A8172BF2C1E20E2004217AA /* ProfileController.swift */,
				1A6FDDB52C22197B00C8F5FD /* CreateShortController.swift */,
				1A6FDDB72C221CE500C8F5FD /* UserController.swift */,
				1A3C05F62C308C7A00BDB3F2 /* FreeWriteController.swift */,
				1A71B2852C436AE000C7E274 /* ShortAnalysisController.swift */,
				1A4B25F72C56ED52004A0A6E /* LocalNotificationController.swift */,
				1A61D0FF2C7BDEE300331361 /* AdvertisementController.swift */,
			);
			path = Controllers;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		1AA1A4F92C0BD15D009D9233 /* Writing */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 1AA1A5082C0BD15E009D9233 /* Build configuration list for PBXNativeTarget "Writing" */;
			buildPhases = (
				1AA1A4F62C0BD15D009D9233 /* Sources */,
				1AA1A4F72C0BD15D009D9233 /* Frameworks */,
				1AA1A4F82C0BD15D009D9233 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = Writing;
			packageProductDependencies = (
				1ABF09092C1D540C00F2E6AF /* FirebaseAuth */,
				1ABF090B2C1D540C00F2E6AF /* FirebaseFirestore */,
				1ABF090D2C1D540C00F2E6AF /* FirebaseFirestoreSwift */,
				1ABF090F2C1D540C00F2E6AF /* FirebaseStorage */,
				1A8172C22C1F7DF4004217AA /* GoogleSignIn */,
				1A8172C42C1F7DF4004217AA /* GoogleSignInSwift */,
				1A71B28C2C445E9E00C7E274 /* OpenAI */,
			);
			productName = Writing;
			productReference = 1AA1A4FA2C0BD15D009D9233 /* Writing.app */;
			productType = "com.apple.product-type.application";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		1AA1A4F22C0BD15C009D9233 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1500;
				LastUpgradeCheck = 1500;
				TargetAttributes = {
					1AA1A4F92C0BD15D009D9233 = {
						CreatedOnToolsVersion = 15.0.1;
					};
				};
			};
			buildConfigurationList = 1AA1A4F52C0BD15C009D9233 /* Build configuration list for PBXProject "Writing" */;
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 1AA1A4F12C0BD15C009D9233;
			packageReferences = (
				1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */,
				1A8172C12C1F7DF4004217AA /* XCRemoteSwiftPackageReference "GoogleSignIn-iOS" */,
				1A71B28B2C445E9D00C7E274 /* XCRemoteSwiftPackageReference "OpenAI" */,
			);
			productRefGroup = 1AA1A4FB2C0BD15D009D9233 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				1AA1A4F92C0BD15D009D9233 /* Writing */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		1AA1A4F82C0BD15D009D9233 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				1AA1A5052C0BD15E009D9233 /* Preview Assets.xcassets in Resources */,
				1AA1A5022C0BD15E009D9233 /* Assets.xcassets in Resources */,
				1A8172C72C1F7EB4004217AA /* GoogleService-Info.plist in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		1AA1A4F62C0BD15D009D9233 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				1ABF09002C1A5A7C00F2E6AF /* ShortComment.swift in Sources */,
				1A71B27F2C3CA5D200C7E274 /* ProfileStreaksAndAwardsView.swift in Sources */,
				1AA1A5002C0BD15D009D9233 /* ContentView.swift in Sources */,
				1ABF08FC2C1A58BF00F2E6AF /* Prompt.swift in Sources */,
				1A4B25F82C56ED52004A0A6E /* LocalNotificationController.swift in Sources */,
				1A61D1002C7BDEE400331361 /* AdvertisementController.swift in Sources */,
				1A4B25F62C55B22F004A0A6E /* ProfileAdvertiseWithUsView.swift in Sources */,
				1A7944EB2C0E77AE00757A7E /* SingleLimitedCommunityResponse.swift in Sources */,
				1A8172CD2C1FA3C5004217AA /* FreeWriteMainView.swift in Sources */,
				1A61D0F92C7BCE2700331361 /* Ad.swift in Sources */,
				1A71B2862C436AE000C7E274 /* ShortAnalysisController.swift in Sources */,
				1A723BAD2C28EB6D00B0244A /* ProfileFocusedShortView.swift in Sources */,
				1A3C05F92C309F1800BDB3F2 /* FreeWriteEntryPreviewView.swift in Sources */,
				1A4B25FA2C56EE41004A0A6E /* ProfileNotificationsView.swift in Sources */,
				1A4B25FC2C56F6BC004A0A6E /* LocalNotification.swift in Sources */,
				1A7944E52C0E75C000757A7E /* CreateResponseView.swift in Sources */,
				1A6FDDB62C22197B00C8F5FD /* CreateShortController.swift in Sources */,
				1ABF08FE2C1A59E700F2E6AF /* Short.swift in Sources */,
				1A71B2882C436BCC00C7E274 /* ShortAnalysis.swift in Sources */,
				1A8172D12C1FE091004217AA /* FreeWriteCreateEntryView.swift in Sources */,
				1ABF09182C1E147700F2E6AF /* ProfileContentView.swift in Sources */,
				1ABF09052C1CDCA400F2E6AF /* ProfileMainViewNotSignedIn.swift in Sources */,
				1A8172D52C20D4DA004217AA /* FreeWriteContentView.swift in Sources */,
				1A6B04E12C45B1B1003CD787 /* ShortAnalysisLoadingView.swift in Sources */,
				1A8172D32C1FE2F9004217AA /* FreeWriteSingleEntryView.swift in Sources */,
				1A6FDDBA2C224D1D00C8F5FD /* CreateShortOrYourExistingShort.swift in Sources */,
				1A71B28A2C4381C600C7E274 /* Secrets.swift in Sources */,
				1A6FDDBC2C27525700C8F5FD /* CreateCommentView.swift in Sources */,
				1A3C05F72C308C7A00BDB3F2 /* FreeWriteController.swift in Sources */,
				1A61D1022C7BE19F00331361 /* AdPreviewView.swift in Sources */,
				1A3C05F52C308A5A00BDB3F2 /* FreeWrite.swift in Sources */,
				1A7944E12C0E759F00757A7E /* SingleCommunityResponseView.swift in Sources */,
				1A3C05FB2C31E62E00BDB3F2 /* FreeWriteFullListView.swift in Sources */,
				1A3C05F32C2F6E4B00BDB3F2 /* PromptSuggestion.swift in Sources */,
				1A61D1042C7BE1CA00331361 /* AdFullView.swift in Sources */,
				1AA1A4FE2C0BD15D009D9233 /* WritingApp.swift in Sources */,
				1A6FDDB42C20D6B800C8F5FD /* FreeWriteSignedOutView.swift in Sources */,
				1A7944D72C0C257000757A7E /* HomeMainView.swift in Sources */,
				1ABF08FA2C1A4D0800F2E6AF /* User.swift in Sources */,
				1A3C05F12C2E76F200BDB3F2 /* ProfileChangePhotoView.swift in Sources */,
				1A97B08E2C0FD58F00F597AB /* CommunityResponseComment.swift in Sources */,
				1A723BA92C28CFBB00B0244A /* ProfileShortPreview.swift in Sources */,
				1A7944E32C0E75AC00757A7E /* ListCommunityResponseView.swift in Sources */,
				1A8172BE2C1E20D6004217AA /* HomeController.swift in Sources */,
				1A3C05FD2C31EA7600BDB3F2 /* FreeWriteEditEntryView.swift in Sources */,
				1A3C05EF2C2A10AE00BDB3F2 /* ProfileEditShortView.swift in Sources */,
				1A8172CA2C1F98F1004217AA /* ApplicationUtility.swift in Sources */,
				1A6FDDB82C221CE500C8F5FD /* UserController.swift in Sources */,
				1ABF08F32C16B51E00F2E6AF /* ProfileSuggestPromptView.swift in Sources */,
				1ABF09132C1D562800F2E6AF /* AuthController.swift in Sources */,
				1A8172C02C1E20E2004217AA /* ProfileController.swift in Sources */,
				1ABF08F72C1809FD00F2E6AF /* ProfileSettingsView.swift in Sources */,
				1A71B2822C436A3D00C7E274 /* ShortAnalysisMainView.swift in Sources */,
				1ABF09032C1CD5B200F2E6AF /* SignUpOrIn.swift in Sources */,
				1ABF08F12C16B4F400F2E6AF /* ProfileEditProfileView.swift in Sources */,
				1A61D0F72C69409600331361 /* ProfileAboutTheAppView.swift in Sources */,
				1A7944E82C0E75E500757A7E /* ProfileMainView.swift in Sources */,
				1A6FDDBE2C27799700C8F5FD /* ProfileSidebarContentView.swift in Sources */,
				1ABF08ED2C165D9E00F2E6AF /* SideBarStack.swift in Sources */,
				1A723BAB2C28D13400B0244A /* ProfileShortGrid.swift in Sources */,
				1A97B0912C0FD9BA00F597AB /* NavBarView.swift in Sources */,
				1ABF08F52C16B53F00F2E6AF /* ProfileHowWeAnalyzeView.swift in Sources */,
				1A7944ED2C0E78FC00757A7E /* TodaysPrompt.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		1AA1A5062C0BD15E009D9233 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu17;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = "DEBUG $(inherited)";
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
			};
			name = Debug;
		};
		1AA1A5072C0BD15E009D9233 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu17;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		1AA1A5092C0BD15E009D9233 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = Writing/Writing.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "\\"Writing/Preview Content\\"";
				DEVELOPMENT_TEAM = 283L88579N;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = Writing/Info.plist;
				INFOPLIST_KEY_CFBundleDisplayName = "The Daily Short";
				INFOPLIST_KEY_LSApplicationCategoryType = "public.app-category.entertainment";
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.bendreyer.DailyShort;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Debug;
		};
		1AA1A50A2C0BD15E009D9233 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = Writing/Writing.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "\\"Writing/Preview Content\\"";
				DEVELOPMENT_TEAM = 283L88579N;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = Writing/Info.plist;
				INFOPLIST_KEY_CFBundleDisplayName = "The Daily Short";
				INFOPLIST_KEY_LSApplicationCategoryType = "public.app-category.entertainment";
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.bendreyer.DailyShort;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		1AA1A4F52C0BD15C009D9233 /* Build configuration list for PBXProject "Writing" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				1AA1A5062C0BD15E009D9233 /* Debug */,
				1AA1A5072C0BD15E009D9233 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		1AA1A5082C0BD15E009D9233 /* Build configuration list for PBXNativeTarget "Writing" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				1AA1A5092C0BD15E009D9233 /* Debug */,
				1AA1A50A2C0BD15E009D9233 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		1A71B28B2C445E9D00C7E274 /* XCRemoteSwiftPackageReference "OpenAI" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/MacPaw/OpenAI.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 0.2.9;
			};
		};
		1A8172C12C1F7DF4004217AA /* XCRemoteSwiftPackageReference "GoogleSignIn-iOS" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/google/GoogleSignIn-iOS";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 7.1.0;
			};
		};
		1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/firebase/firebase-ios-sdk";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 10.27.0;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		1A71B28C2C445E9E00C7E274 /* OpenAI */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1A71B28B2C445E9D00C7E274 /* XCRemoteSwiftPackageReference "OpenAI" */;
			productName = OpenAI;
		};
		1A8172C22C1F7DF4004217AA /* GoogleSignIn */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1A8172C12C1F7DF4004217AA /* XCRemoteSwiftPackageReference "GoogleSignIn-iOS" */;
			productName = GoogleSignIn;
		};
		1A8172C42C1F7DF4004217AA /* GoogleSignInSwift */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1A8172C12C1F7DF4004217AA /* XCRemoteSwiftPackageReference "GoogleSignIn-iOS" */;
			productName = GoogleSignInSwift;
		};
		1ABF09092C1D540C00F2E6AF /* FirebaseAuth */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseAuth;
		};
		1ABF090B2C1D540C00F2E6AF /* FirebaseFirestore */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseFirestore;
		};
		1ABF090D2C1D540C00F2E6AF /* FirebaseFirestoreSwift */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseFirestoreSwift;
		};
		1ABF090F2C1D540C00F2E6AF /* FirebaseStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 1ABF09082C1D540B00F2E6AF /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseStorage;
		};
/* End XCSwiftPackageProductDependency section */
	};
	rootObject = 1AA1A4F22C0BD15C009D9233 /* Project object */;
}
`,
                language: 'plaintext'
            },
            {
                name: 'project.xcworkspace',
                path: 'Writing.xcodeproj/project.xcworkspace',
                type: 'directory',
                children: [
                    {
                        name: 'contents.xcworkspacedata',
                        path: 'Writing.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
                        type: 'file',
                        content: `<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "self:">
   </FileRef>
</Workspace>
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'xcshareddata',
                        path: 'Writing.xcodeproj/project.xcworkspace/xcshareddata',
                        type: 'directory',
                        children: [
                            {
                                name: 'IDEWorkspaceChecks.plist',
                                path: 'Writing.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist',
                                type: 'file',
                                content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>
`,
                                language: 'plaintext'
                            },
                            {
                                name: 'swiftpm',
                                path: 'Writing.xcodeproj/project.xcworkspace/xcshareddata/swiftpm',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'Package.resolved',
                                        path: 'Writing.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved',
                                        type: 'file',
                                        content: `{
  "originHash" : "afdc81444d245d68d1c0d04d94504f3c82bf1a562b49f8ce6ad81946e2f8c699",
  "pins" : [
    {
      "identity" : "abseil-cpp-binary",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/abseil-cpp-binary.git",
      "state" : {
        "revision" : "748c7837511d0e6a507737353af268484e1745e2",
        "version" : "1.2024011601.1"
      }
    },
    {
      "identity" : "app-check",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/app-check.git",
      "state" : {
        "revision" : "076b241a625e25eac22f8849be256dfb960fcdfe",
        "version" : "10.19.1"
      }
    },
    {
      "identity" : "appauth-ios",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/openid/AppAuth-iOS.git",
      "state" : {
        "revision" : "c89ed571ae140f8eb1142735e6e23d7bb8c34cb2",
        "version" : "1.7.5"
      }
    },
    {
      "identity" : "firebase-ios-sdk",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/firebase-ios-sdk",
      "state" : {
        "revision" : "8bcaf973b1d84e119b7c7c119abad72ed460979f",
        "version" : "10.27.0"
      }
    },
    {
      "identity" : "googleappmeasurement",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleAppMeasurement.git",
      "state" : {
        "revision" : "70df02431e216bed98dd461e0c4665889245ba70",
        "version" : "10.27.0"
      }
    },
    {
      "identity" : "googledatatransport",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleDataTransport.git",
      "state" : {
        "revision" : "a637d318ae7ae246b02d7305121275bc75ed5565",
        "version" : "9.4.0"
      }
    },
    {
      "identity" : "googlesignin-ios",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleSignIn-iOS",
      "state" : {
        "revision" : "a7965d134c5d3567026c523e0a8a583f73b62b0d",
        "version" : "7.1.0"
      }
    },
    {
      "identity" : "googleutilities",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleUtilities.git",
      "state" : {
        "revision" : "57a1d307f42df690fdef2637f3e5b776da02aad6",
        "version" : "7.13.3"
      }
    },
    {
      "identity" : "grpc-binary",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/grpc-binary.git",
      "state" : {
        "revision" : "e9fad491d0673bdda7063a0341fb6b47a30c5359",
        "version" : "1.62.2"
      }
    },
    {
      "identity" : "gtm-session-fetcher",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/gtm-session-fetcher.git",
      "state" : {
        "revision" : "0382ca27f22fb3494cf657d8dc356dc282cd1193",
        "version" : "3.4.1"
      }
    },
    {
      "identity" : "gtmappauth",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GTMAppAuth.git",
      "state" : {
        "revision" : "5d7d66f647400952b1758b230e019b07c0b4b22a",
        "version" : "4.1.1"
      }
    },
    {
      "identity" : "interop-ios-for-google-sdks",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/interop-ios-for-google-sdks.git",
      "state" : {
        "revision" : "2d12673670417654f08f5f90fdd62926dc3a2648",
        "version" : "100.0.0"
      }
    },
    {
      "identity" : "leveldb",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/leveldb.git",
      "state" : {
        "revision" : "a0bc79961d7be727d258d33d5a6b2f1023270ba1",
        "version" : "1.22.5"
      }
    },
    {
      "identity" : "nanopb",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/nanopb.git",
      "state" : {
        "revision" : "b7e1104502eca3a213b46303391ca4d3bc8ddec1",
        "version" : "2.30910.0"
      }
    },
    {
      "identity" : "openai",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/MacPaw/OpenAI.git",
      "state" : {
        "revision" : "843e087929aa806adb611dbca93f9a4a7f28be04",
        "version" : "0.3.0"
      }
    },
    {
      "identity" : "promises",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/promises.git",
      "state" : {
        "revision" : "540318ecedd63d883069ae7f1ed811a2df00b6ac",
        "version" : "2.4.0"
      }
    },
    {
      "identity" : "swift-protobuf",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-protobuf.git",
      "state" : {
        "revision" : "9f0c76544701845ad98716f3f6a774a892152bcb",
        "version" : "1.26.0"
      }
    }
  ],
  "version" : 3
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
                name: 'xcuserdata',
                path: 'Writing.xcodeproj/xcuserdata',
                type: 'directory',
                children: [
                    {
                        name: 'bendreyer.xcuserdatad',
                        path: 'Writing.xcodeproj/xcuserdata/bendreyer.xcuserdatad',
                        type: 'directory',
                        children: [
                            {
                                name: 'xcdebugger',
                                path: 'Writing.xcodeproj/xcuserdata/bendreyer.xcuserdatad/xcdebugger',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'Breakpoints_v2.xcbkptlist',
                                        path: 'Writing.xcodeproj/xcuserdata/bendreyer.xcuserdatad/xcdebugger/Breakpoints_v2.xcbkptlist',
                                        type: 'file',
                                        content: `<?xml version="1.0" encoding="UTF-8"?>
<Bucket
   uuid = "12BB85D6-F42C-428A-96EE-4210ABCDBC50"
   type = "1"
   version = "2.0">
</Bucket>
`,
                                        language: 'plaintext'
                                    }
                                ]
                            },
                            {
                                name: 'xcschemes',
                                path: 'Writing.xcodeproj/xcuserdata/bendreyer.xcuserdatad/xcschemes',
                                type: 'directory',
                                children: [
                                    {
                                        name: 'xcschememanagement.plist',
                                        path: 'Writing.xcodeproj/xcuserdata/bendreyer.xcuserdatad/xcschemes/xcschememanagement.plist',
                                        type: 'file',
                                        content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>SchemeUserState</key>
	<dict>
		<key>Promises (Playground) 1.xcscheme</key>
		<dict>
			<key>isShown</key>
			<false/>
			<key>orderHint</key>
			<integer>2</integer>
		</dict>
		<key>Promises (Playground) 2.xcscheme</key>
		<dict>
			<key>isShown</key>
			<false/>
			<key>orderHint</key>
			<integer>3</integer>
		</dict>
		<key>Promises (Playground).xcscheme</key>
		<dict>
			<key>isShown</key>
			<false/>
			<key>orderHint</key>
			<integer>0</integer>
		</dict>
		<key>Writing.xcscheme_^#shared#^_</key>
		<dict>
			<key>orderHint</key>
			<integer>0</integer>
		</dict>
	</dict>
</dict>
</plist>
`,
                                        language: 'plaintext'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
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
                name: 'Assets.xcassets',
                path: 'Writing/Assets.xcassets',
                type: 'directory',
                children: [
                    {
                        name: 'AccentColor.colorset',
                        path: 'Writing/Assets.xcassets/AccentColor.colorset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/AccentColor.colorset/Contents.json',
                                type: 'file',
                                content: `{
  "colors" : [
    {
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'AppIcon.appiconset',
                        path: 'Writing/Assets.xcassets/AppIcon.appiconset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/AppIcon.appiconset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "LogoFinal.png",
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'Contents.json',
                        path: 'Writing/Assets.xcassets/Contents.json',
                        type: 'file',
                        content: `{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                        language: 'json'
                    },
                    {
                        name: 'LogoBlackBackground.imageset',
                        path: 'Writing/Assets.xcassets/LogoBlackBackground.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/LogoBlackBackground.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "LogoBlackBackground.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'LogoTransparentWhiteBackground.imageset',
                        path: 'Writing/Assets.xcassets/LogoTransparentWhiteBackground.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/LogoTransparentWhiteBackground.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "LogoTransparentWhiteBackground.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'bmc-button.imageset',
                        path: 'Writing/Assets.xcassets/bmc-button.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/bmc-button.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "bmc-button.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            },
                            {
                                name: 'bmc-button.png',
                                path: 'Writing/Assets.xcassets/bmc-button.imageset/bmc-button.png',
                                type: 'file',
                                content: `�PNG

   
IHDR  B  2   ��u   	pHYs  %  %IR$�   sRGB ���   gAMA  ���a  ^�IDATx��M�����ċx��d�%S}�-,��#V.M#�
�BxfA�%���BbqMw�\`i"��K��s�Ũ��v��#X�1�dv��
�5-���v�*���ƪ�x ��/�I��T�s��y�d~?ġJU���K������s����p����:�6�x��>.�u�ǉ���
     ��t4>�wˢ�b��e7��߈>����c���
��F/ܽ�����:     F�|��~}���7ܫ�B���
z<�@ߍͽ     ������[t/��{�7dC	��K^����E�nt��    �&8�Y�~2vw�y�J
�� ?t��c��     4�?D�,{�L)�       ՘;�~PV�Hၐ(�@     � �Pƒ��!�����;v~     ~����������$Y       V�D��Ed�
��[�^v��#     ���f�߹g]@�\\ QD�P�:�       ?%o���߸�s��������F~�      ��T&W $�r������;     ��	�d��A�K�^��:     �❋b[��Խ�2�!     �$W0�!     �,s0ľk�j�     ó�]����;��kM����0�w      �u���^�n����,?tl�     ��n7�����j�ĩ&��;     �Z�2�����O|�<0G��~}��     T�b��:�
��;�,�Q]�u     ��Ƣ���7�����(��     ����J��;�]����.�:     P}����io���     ��1w]����@H�K�s�w      �d���5��׷�3B.�;�A     ��s����*��$g�����      T�
��n��4#��
     0��S��B�ܟ;     ��6������/^Y���@�:     0�Rw�����     �� ���{;�t%�.�z�     �e�|��W3B.�WS     a����Kc(�
     �f]g��8²     PScQ�������KK��     ��1�?'�.k�A     PG����_�	}��aY     ��	w[+��l�8"��     �W+�      Ԛ
�n�'ˢ��     �z[L2BY     jn��P��o9     �z���1�     @L(2��     � _�u��p      uw�'     ��[E�     �B     @c     �A      4�     �B     @c     �q�r�=�:��������g��\\��,�un1���+����ܾ]rW>��6����{     t"���X8�;���qpC�
1�y�,Y��(����՟������,����    �Y���GA�So-�'�^~%�%s�j�<�QQ�d�O��7D�2I    ����E��#��=ntG��Zjf�(�"�\\t۶|F�v,�    ����i?�����O���O���M����?d9
    �.!Mp��[����?�2���ι��>!S    F��:�7��) R�:U�c��w�9"    0��ѱ�ov����͵��E����^p    �J�!�Ԉ2@���kAJ�B����#��    T���Pd�3_v�}V�]O��     �F �f�^O�����~�    ��z��7�e��?o�"��Ċ�n\\���x)��x�k��wҒ�n*���;sÕ�ik�����pạ�Uf���z^    ��"2�4�W&BQ4�W�c�=�����5_��V�C�+jǔ�W�2���2w��W�}���J�{���d     �î1#�؉���#_s!(�1��81u�'q�[�*\`q���ȱ�o� 	A���O;    @�ĻƐ2���\\�B��sg��G(X�yӧ��ѝ�׺�#ǣ S���̱7ſ    P-K�����Q ���F%�F~���Y3O������     �����a}��I�$�O7�s�m��ֿ�|>�Ke�ۅV�H�Ȕ�B��������a��c_1-�	��    5Bjனu�I�B�q�����V^�?N�{�l{�����]	n$�ٳ7�o�x�n3��ϑ���
������{����o�<�     ��!R���=�|�U�dW�a�3��{�AA���Q0dc�)z��Z�����   �� R'Z�q���iǜ_>�۞�W��GV;_���^c��   ��!K��O�>���KLwJ'e�X2<NR0    *�@HMh���g�l�l�kN/��Z(�T�    P-Bj���?p���]�-_��q�ټ��_v	    \`8��ж-�7_~7�L�p��,?:��    P9LYט"�)3���[��os����s���K_6����l���1    P��0�k���/���"ElE;� ��sg�j��5���uc�    ��x�2BF���?�or��㢞��Z���y�-Ү;��Pu߭��s�    �!
�-aus���( �̑��7D���ֿG�
�j����¨��o�q�gށv�   �j!�%6�	̶�"�Q\`d���+_}=�^��q�͡ �n
r������ְ�� ��?p��1    P-��\`��TPPd���&	�t?m)N��Թt%d\`�j�}�;�s    T�*-�1��|������1    P-ld�y��6��_�'    (� �
���|�6    �!@�B���7�}3�    \`��2bTx��[��᣷���]ٕ$�[�"��v���n���������w�ٻ��P�   @�
��<?��O�e%��#qP䞋H;��
gu(���>(�d������     �gl�7nѡ����
� � I��;�$����	��ͷ��U�>*�f��
���7Ʒ���<���x��    @&��? Rq{��r)S+@�ŕ�o,�hm���C�Q]�1�^N4w�+��� G�����ʲw׹x�    �0q ��16� �$� _�A���2��ҕ���w�'���R$�RD���%�+;�a�"B0    �E ��40F$�� ��{�\`ѣ/8    @1XSAZ���I�f:��;�    @x�Ҙj�h8FEs�~�    (���Q6ȡ[��>����;q�    �G �bf��� (֑Wnu    ���Ṯ7;� YA    P���붵�s��a�g�V�2w�xy�vr9����n[W��er��n�=�])x�����[����ߓ�=    �p�T��(pa���
(���P���綿��:�_tS�>����ӏo�k)�{,z��    @XB*����2��:�5H��G���?���LD�1��+�����I�C���$��B����en�A�:0�     <!rҰ,f�\\�o��i��I��(02w������nu�(��Z��E�Q���5����-K�c������?|^Ǔ�eR    ���T�o
��M����⬇vI?I�D��@�uq����q���a�|ߧ� �sR�����D����<���0�oo��W1T-i�k��    �A �",�R{et�em�l�$hb�7F�Y���(�D�    �@HEX
�N���u�5hd�]~|Q0u�8�L+�j���    �!R�B��4K6
S{S�H;�?q�)�6��#�w����	  ԇ&\\f��'-�%�Z朵^_��>z˕���}�l���\`3����0t�ydu4�Q������m����~�����õ��Ξgn��}�n���]4$C  d��ƾ�/�ֹ+����/G�g"�{Zv=���L~��~@ �"���׽j�h��k/��0�|!r�����*����ځ��uL|ϕdy�\\�.I�%E��q���q�  P_\\�v?yg��h������IX�=@�Ł��T�)�Jm��9�O�B�>�6���)�q���ݱ7��9�Nu���f]���Z=̼  P?�h����v?q���sg]Q�r�� ��?�?�#=���0��
���؂�=k;�xϯe),�A�5��'���ދ#Go�o�c��  P3'�ɔ���{��|��'�-�#2b�����R�=3�B�1�H�9�g������\`ҡ�V�7"  ԇ%S{|�%W$�Pя�FX\`
j�~��h:��-��ق���|g^��98QJF����Gָc;�  ��4w�����Ʌ�yߗ�Ԁ?!���%�_r���ü�ã��}3�܎�����vU��	)Se�����  F�%��	+Kv��� ?��+b�OL
]���Ar���=�XE�7�g��aIv �����᣷^��� k�Q���@���}� ��c��(.�p�X�c|����T��֏�ʭ4�[Z!�$HF�@I�oE�Yn���q�_8��Ϟ������ ��-� Y(
�lX�Y��  -�!�-��N �]MF��@HEl��iܐ���N�$r��-K��(Q4{m�,I�Ia�$Б��!��|���U�Gg5�����» !�~^��Q,a95��@H�(�~�3_ve�Է�$��H0���Z|[y��>-SI�KZ��<_}l}�+����yMm���1]Fi+a=�=���~���  
���"��X&��Q�!R!��\\p_��R{�k0g�F_ i7ʝ�K�Խ��Bg�����ڨ:����U�@��#Go�w�a�  ���}��"5B� 6B*f&�j�Q��!1l{w�#�1E��J�eܨ�ZW3�.��O��U���7���������  0
�L ��>\`B �b6��{��?���L���H�<�R��n��������e\\���ɡL�d�5挏�����g� ��N�y}�d�N�� L������?t�����\`�����C�,���=����sg�F�Z6�=;�_��������}G(  P>�r���w-�/d� 6B*jۖ��k/�G��h?���@����Pq[_
����ۻ��^Suxt^Nk~�N  �>K_��~��.�G��@H�i����ﺙ���4���EKY
\\�#�[�0�u�xyQ� H��9i����  PmUY�b]Lm9��!#@KetSì:�^�)��J����f�6}�6��I��Cߟo�h��d��ع���p��gtβ2  �V����k&�,��
��5Й9p��[A���ǟ���]��si���;�T�r��֏M��yC�-  (_������aP$ΰ�]ftSfA'
� �ܙ�����%K�h�&�(���� @=Ti9�5#d-u!5���M��~O��(@r%0r~ٕ@I8ɱEi�(�@���3�^�3�6S�-X��-#�������  PUZ�b�N�F\`C ��4��خU�,iHn�/�_���(H�K�B�\\,�������6���K��(�p��y��΢�kK礬u��+��;c  �����j��@�A��\`�/E�;$�׮~~]�\`v�3��H��$�1�qߵ#������7���g�8�Q���]l�B�@3�x�[��Uo�Җ������:�-e�&�i�AM�l������3��Q��Q���oV:>U������Nr|������9�}C�'�j�u�]V��v��� ��>�u�\`�%�a=[�\`I-k��o6�_�Ͷk^��Չ
_o��>��x�7m��ˑ���η�����r���ݾ�z�}ӵI���A�-+�K��Q,��*��u|*�Z�\`��Sǧ�������:q�Ʒ]>�V�9w�@\`�D���R����<��#�
r��:�:���;
�:�#��+k���Ӛ6�����{���;��Ǽ�g���
xv?yg4���;�ܙJ=�"%��Ι�6mN*�^����� �[rl�v���$���8��:>���x��X��;ۢ�/�:l;��6�t��rKR�6C�-��z��^Z��ӏ��m�R�5E��}3_�]�5��P�y<֎Ī�Z��⨳Ax���휔5+r��[��;�3�R���/�v�����
��������P36��-��l�����d��WGv.No�v�Y���y���<?oOݯӪN�Lt�4��N�0�%=��}�4��4�ȚZw�u�>zKܞ��������6"�@��sR�\`Hr���]I����x�y����JU����wiL����.+=_����y�f	�=����M5���_��׺P�J�P��u����F��]S������!��<���B���k/����x�͗g3g�hP��o��;��O�����:"�:�zy:�:�zϴŴ�$�]Z��^�mq��_��A�:�I��J�ƣ��{y{�;Ѿf���\`��yϵ*d�gw��j� ��u�JAm�ʮ��������ڡ����~|
��򹳮��M��y�k���V�P�D�i��@��k/�K��zX����>ֈ.�JI�Հ����#�YC������)���w�μ:JEAD�\`?2�b��l{6f��:<Y�ڧ������?�$�F���_�^�[��f������eME��Z��P/$)�����l��B�ζ�9ת&yo��4�8�'��UۛF�-��׭
-C�{�+:��(B>�.0�ၵ��Y��T;��ZR��(�m|�58��#��j��#��C �&t��t��ұ�Q��=�|�D��1�ϵ����WZ�����L��5�Yx
d�3h�<u�-�Ɛ4�RPI�}�,}
��q@�ϵAXABuL��Cw��G�W�!O�r�2�!��l'��kU��*�{�����+�H3�dkp?}��_��ɨ	餀Hу���/# �I��,�u9J箅�Y��\\S�ě���Aѱ�'�Ud���f��e\\E �&|g�Ը;q�Cvsg�!{ǷUd�)�C���C' o�_�됡3s���o�f��:]&u��ŠA��Jz�q�_5�Ů��	����V���"���zj��.���ê�WFOG�"g�����v�A��G稂mqQڔ"�0Q@dX���DAEꔡ\\���kw���Y�c-2Ú2Q\`P&�O >�<K��.�.�����4��_'����qeiLU�B�5s~����:���IC�����%��g
�X2��Jf�z=�b+HRU���:��!e��!�����)�����E��'�ݢ��:�E��dUi����K��~t\\�����O\\���;\\��v�t���sc#��8\`���u���ߴf�f�v/�$�~��K�f��j���xkb|����m_�4~T
c޲iM،]�թ�2���4�:U� �[��@����g�|����!��X��0�1�A�]���2	{���V�@ 1jǟ��Eg2���=�����4���^�ס�VڶK��r�*e�t��]��y�8ISf�<
�g1�����m����c�1�_�܍�:w]��^u����/N;wi޹����7Z=Q,�|��S���N�;�Yg�f�X�s��@�;�N�v$�e]?<U�N:�}�zElU��:���I���K\\�%*�[?ZR���kRg#�DZ�U�@�̠h^z_�T���(�~bi�j�C�i���E��+�5ồT՗��Rf_S���3.�s�� ��z۶D�D �&&��7�'G�S�m�D+�q�w���ϝ�a]�k>�D>��s���������Tsg���<���f_5�wF+W6����}�������u?u�-��:�۶|��\`��R�6S)��Q�́�B�cė܁�޿��evX50��\\�@H�������g��#��N�UK�vk6��+m����~��UW��Z?!�\\�
�Ti9ʜiҭ��f�,;�:>,�O�κ7��]&��XSk
�\`�ֵ)б���}�ht%xǹ����:��^� �(sD�;���{�����sg)�Z��-��>Z�V��_���
�
�<�s!W�Z�n�!C�����œ}g׭�bB���cYn�6��A.ö�y�W\\��{BS�󺣔�f%��+Y^C�	o�<X�ђUUfݜ<�nYL�خ�e0w���]s<Y�!�W5\`��$�����r�*�Kz�d���{��ܻ���J%|�,e�˵�Tn2Bj�r!�DX+��[��ax��H�Xj�,����|�x�;sÕ����?qS!
��y�A�ҡԅ;Ϲl Z�e1ӆ�}z�����{�2sD��}�e��\\A��R�(�e}o;�����>��c|���W���k(� d�@[k)�-x�w׹k����x󁵵��(�@aV�lU\`����>��׃�u.��q�Z?�e~Y�:�;yM��kK�>Y�%m]�1�w�MYK�
z�����GAE��h!5b]/>r��8�#
|�@n�����K�d�8Q,5�l�7����rgTZ)�gr��:�,kO�vx���Yj���b��m�茲�o��5����?�fͮ����7�^0-�H��5h�����S����s���_[��l��W)-0�Z�aϭ�G���y�t��6���\`[��]��u0"�.y��Ƶ~2f�%uMvDｊ���Qz�3O�'�E�������rkfJKc��g����!!�Z�O����[j��R��#R#�m��S�md� �r��Ǌ��0��
��S0�tRu��j��[�).j-�j�{�^��ϖq���Z��Q�B�	�fEm�\`C�4
����ۓ&[!Zw�螵K�y�|�N�7�=Ƭ3�ݵQ:����ț9��p�HO?���ǘ�w
��DF%"��\\� ��M�d�uSa�,�l��H�G߀�����^\\�zx�+�d�:������n��߽^�́��[����=!�)��|�R#����	T�����Ǻsέ�q�A�>S}�Y�
ՠA҆ֺ]�,�ew�N�Am��XK��F�vƺ�]Y��[����\`j�=���� D�jbۖ�LK��� �f��[m�u���n:�-�砝��o��T�Ý5#@�O
h�c������|=�� � [+���Y&��ش�Em��K$�F�\\�Gw����|�à�J�Q���2
�[��zo�3	���kP
DM�X�+����c#��Ԉ�0ge�%+ر�o�>-c	L/)���3J�*��G�
�X�1�\`�U�<�l��ց�V��w[�YYg��>�\\D͠ D'K�Sƌ:e�c-
�7s�>#��5���P�w� HR7���������|��,���������Q�t��Pi^�Y�iX����A�o���X
��������Y�
!�l%��^��Y�zl���@H�X:ĕX*�ѝ��]\\��rz$�B��1�۔�;�%�#�Vs������ȱ����;�Ӑm��Ɯ�Ňu;_���r�v�Zw �S�2�^}�4�o�e��q30
�sַ�s#�,
[A{�,�7�[y�e��v�Y�g��e=w�
���O7�b��[?L��o�k���rK�xY[p�ubc���k��Ǳ�c��ꚹ���2l��Ȥi�!oǗ?���jdtK)�*et0p�Q�Ua��D�T�G����2O���(�xϼ�e�s�w�_Yf��>��wǇn�X;��f���̯�mY6��-����QW��zRՠz��)��%Y�f�� ��l�e&�5�f�����x{e=L~��x�\\�|(r9�u�������	6�f�z^�L��V���
�	���RkĒ7{�G �K�:w)
L|�+�>{���Ǎ�:��[�]_�lO[	��!��I�0fG4��fM5\`�逪��B�y�����P��=
�����3�!g5�T$M��Ȓ�b�����X�h00��9X��_�d����r|�oe*�9"�bB٬��,�,� �*����;��� ���5�P�rk���!��sz����[~��A}�˶-������k���!5b�N���)Pq�����W[�D>�'�.���<�u��PP#	lhY�
�Z�_����FJ��k�E�7�!	e��©�{9��5���P�Wl�bZ�o\`Q��7��t�G��b�v8�'d֌
�Y2�*$j	�My.�\\T1��x�³Y��g]9*!'���G��k�%-���w�.��}s�3B�\\�b��.��y�D� �����.�<.ߠd��l�!5b)�������N����]�(����6��°vN�L5C4[�k&��=s��9XaTX�p�1�b��T�Z��S�ey�N'�b��e�@aˀa���ŧ���{QU�q֥�vj�'K�۲��� T�D�s˹h]Zg����������k�lJ�^���J�Q.�y߷�
-�oط&Πk��>�O[�h��ݡ?!5b��뢱���<��zn�k��R,5k����<�C���:���}�:ìɸ��[7�"u��R�w�~��xǄ4�G�A�5X�����2fV4��e0դsx�1 �M�MށH���e��g�b�Q᳔E[	��	��M瓵�˳SC�m�7��l�e�}P;�jO/z��:߬�k&P� X�~�o����m+cY�/��U������9�����[��>����N>�0�Ԍw�
���K BZR^k�T�Ƅ"#D�x�h��ϭ��;%�\`�~�\\�OTu|�g��R�T,������ߝ0eT^W�+�*�fHci�����3\\�����)�\`���ܳy��:�|��*�ᶞOy�Y���v�"�5�gV���?pS}��}�?��f��X���w��(N���՜1֭_ Ģ� �5�\\tF����OP�&�l�A�-�.>.j�Fy�"�!R3���)�����R#d��s�"��a
�u����q )"(��Ӓ�=�-r�ͬr����BZf��,�A|�G�AK��O�uL��Ҙ���'&r����n�[YKp�'����;���.���@j"�Vܒ�~R�����g�n)�뺤롶��r�Y2	}���.�9�H5�d�k|�Rf�X���	3ǽ��A�����%@��Z��"R3� �6Z�S�V�Ғ�:X2�*�����d-��ef㨸�.�ӏ���u&�;t� B�l˺Z�,_�t��Pd��S�����n�>P��=y��0Xβ�Q!����~A���qR ��uW)k;��*��*:����M�8�^�%ϺDiPm��o�Q]3U�ag��Z����X�b�w

�u����z�l�d�7OG�S�����S�*��Y.������4NJf��V���BB�-�������������֝^n�d&�L���5�b�4[go�\\~�'��t�U�"�y�5c]6������+�q�-ګ�Z�� �l�m[�-Qɲ�u�� �-γ�r?�	[pV�ϛ/Ϲ�/��<w֝zy6�O�u9��TԵSR������yhE^��ښ�!��.t-���ΗO�!T���]1q�� R3�1u�BFHKΌ�����[qد�f�
��cSzt�%�3�Bl��EnA�5D��ɦ
vT\`v+���_�-@�H�:ۖ�Q�*f5����<��k���>�o�yd����;���ٳa�-�p�k���RѼm�m�$�{��5���ꖷVP�v�)�@|V��W���e�z�d�l0e��I?w��2A��!R3��w�R����X��"ߋ]^��c�9��vw�,��Ԯ8|�6��B����RTZo�liB03D���c�E-5�:�jtMF$�iKg��̯z�b�1U>��%{MB15x�X��
�
��\`i/�}����� �%3P5�:YؽX�rZ,՘R�dB��3���W*�k	Z�֬��ɯm����L�
����\\����7=�����>�fԶ+V��o:pk��օ\\C���x�c|��d�;����&3����]6��:\`�2۬�n?z��� �.�9��@���=g�,�k���V�K��}�3�������R����z�L��'�ؖ��T	Y����(�Z#$�@4�w�vVV�ϱ�e�E�.�z����2���C�Ԛ�t�z6",�I5J37ua>Uc��O�g1OF�S'��٨c�"�V���EQ�:o�r��6�*|��d�,3gdyO�)� �x����3Q��,����'5t����uk쩜��,�k�����a轝��ֺP�~�(��ɱ�����������1���o;��1Y��"Y�U�k��퇾n��������u_k�))<�vyjӧn�}l�[5Bj&w�TQ���u�գ\`��Cܔ�E�NbV��M�NX֥1�Z}X���bΓ�}�啵�DB ���V
�"+�g�XȻl!����ڝ���Βq��{r����:�����|���c���\\d9g!�,�e�cz��U֎E�Fe�^�v]�;��\\���#kܑ��x׭���>��(E�~o�ه�{w��n��}�S9�W=�����Q��������15c�*���]�����|1���Q[�Q� ����S�ѱ�u(���eO�
��)ؓ�p�d�'!*�6�W�㬔#Ѭ�����-�Q� �l�fɲ�g�T�}P�z��1����\\{���%y��k
n3e���2h�ԴɎP���c��^Ǹe�C�6���|X����Z�C;���/���G�vYme�vy�c_
�.#!5dY���hz����A'
�n�ńc���J�i�ЉIο2f�ta�ҩ�f��j�iP� �0��B��f0���4x��\\� �ҍ����,�������]�2�^���%��9���<��,�b$D��g	a��i�(����������}-;i,\\$ߝ�9Ξ�\\�(�:�v9K�ƠI���2��]��������o�4�M�|�Β/Y"�d���;ةR�)K���~�u��Ћ��,,ǳu��}S "�V��8ӧH���g��2f�T!#$Oz�}iL� b�Uu�}wJ�6h��E�X��<�:�x�d��*�계�i!�����(*{��=k�׫��C,�[��e����a!�vR���O�銦v�ϝuVeL��i�-�
�.#j�Ԑ:�ǝ_
|���b�)K�,��.LM�-^5�ޭ�=&A�2�]e�aͻο���u ��2����e��Yd޸s��
���8�[�J�R4ܴ��wR{3hY@����4���bJ(�*z=C\\F�� e���&����4�cKz���EM��Ք��vm��|�T�up��L�,�gљz��.#!5d9�Rgxzm������ZjU	�7S�*!����nLG�fVG6k�o��;f,njFDmi9LZ�V=�69T'(�kXD6H����c�G�&�ֹ�t����<�~��§�V�O������&\\|�ʐ�i�5�B����L��
�C_T3'����
]�D�R8t�GE�w?yG�A�<��"�h��??8��s�y�j /���WZ.�)��g��B�X�Y�^�Ϊ�
T%M�ځO���V�"�Yv�������Y�n!:��q��n����oIL�ـ��,3cS��e�䙽ϲcG���	W��k/��{@���dM��VT@�[�b�!2B|�ʐ�A&L5��YWy�++��O����K�|\\
<X
�.y,k��}���"�E�ߪu乳�� �<�P�򑣷���
l]�2Bjh�6���ٔk�k��͚�K
ŷ�]�S�c�^m	XkW���3�曹\`	$�B��Y)���'4P�f�l��/���/��1d	�d���'�*�Z���	��
+�:k����q����V�ol������ujPͣ^B�ԏR���f��&DO׮�gV���t��;OF��x;�((�� t��}�ne���xbYLu�!˺�'��!ׯs��cY�e&&��}��
;����8��k}���:Yeٚ7��:��)zs?
�X�Y���:�(jm�u�2u_�msźu�dy�!
��<�=W�B�|�}Üu�2xͻ����|�B����AD�R��y2�B��zm��{�\\~����kc�Xv�\`�ԦO�v(�y�%8שUT�b�.���Pž���x�e1UB ��&F\`�ie-�g�̝-?%��,����C��aLv��R[�"�����:�9�qjT� ɬXH��'d6J��P���%K�I�e'���\\�{*�]Ԓ=��3k!f_E�Cl}�u�S��}R�w.Y^W]u��^�ʹ;�]N�!�+�x����Q�ȼ�z,��r�c�=&e�q�Z�A���.N���9���E�˧]�Q���Ԑi��vѹ%���7��ri!�˖�EӶ�+ʬi���<�t�m�B���3��/� &K�>	<
s�P�7ˬ�� ��1�k��
X3k^v1WGԞc�f�:��¤��g�>���x{���^�4f�{��� &�{�јA� C��Y�C�ڻ���YG��k/�/AT=�a�.G	��[�k� ���-�(c��u�I=�*�ˡ'B�� 5e���o���)�>�yw!�[;�!y�4S��8)3D|�y�-�B����\\���^��Y� z�C��'��S�!۳R��z�z�h�M{��r�}I�YH���u��*�8���abt���_�/A���C�u��w�S(��n�~�X<�z��@��H�P��R�,u��
����ER�����̐��jj�Ԕb��eA±��S����C_��y/cV o�"�o0"�ݧ��t�4#�u9_�@��q�k\`���<�."E,�IX�#�X�b9We�=ծ���g_vVe��;�h�2ï��g��� E-|� ��u�di+h�d�>&���D�­E��R0I�^]�t��)���=� �v�8����P������ ��a>���!�FoBj���;�r7u�Ԍ��>��
�w\`Qv�Te%�Y��w׹�/�!�~�:&y�-��Z��pT��[��N\\�Y,��3O�o:�;�y3Q���z�-��:��������f�X�+���>�l�\\T�͚y����:�CA�9Ѡէ�@���͆�����$[����� 4D�a)j�t��;��zi������c����䝥d]��kz/�XtnMN���TJ�U�8"��;���"Y�_�˾m�b��!55a,��DS!)��̝�<M�<(�3ߋWY�'u04S��S��\`�5����H(�9m&X��P[ة(�nz/��qi�;c�o Ɍ�f{�tj�**־l��s�
Y)!�u֬h/�lhQ� b����f�w�Gw.ĵ0�<8�%j;V�X�C߀q�� ��5,\`��\\�6���	
§�~��|Uj�]�Sǰ�E������K���.R���e|���]3U�Ų-���-��<�QuuZ��۽�[d��|�Ԕ�\`�=����� �u�a̞-n��"Tq�d@�נ⢚��h���x��d����s����k�i���u��3�NN/Z�S�,�uw���s5o��"�>B������#@2�}\\Eo*��Iӏ�mQ���eJ�u��k\`=���}N��Ǻi ���.EVj�g�ϴ|EK;�s�H�g)"�'����|�C�%�6Ϫ�DG�A��'���s��4&DDN�uc�@����,%�A���15eZC���R!E���|_w�D|󁵦������h����A��������9 �����E��^�;#k�]݊*�Z� �䟁l-�)��y�%|�b2S,��jpV�3�������ZDwy��E�:���p�?��y�n_Eg�$�����D���At]K�wj0o.�l�{�u�_]?��F���Q �ѝ�q[��X�K*t<H�&�t���»��{�̘<�軅�{�H� Ui������K�F�) ���u�F�rQGO>��
��g��G��bu�~��پ"-�k�]�3�z}���a��Z��ɫs9N�Ng��fzΘ���}t�f�����fFU��r>Y��S��w�ԥH����f&�di9a�N��u^׾��d|]�Z�S�9]�ԦY�6s��\\�sPJ�C�=���y����\`��*\\Ӵ|L��a���l��z--[��	��}7�ˡ�㪶�Ȏ�15eٛ>}����mY�g~��c*���b��d�	R�K��v�B����Qg����ZZݿ�u��Y	���{P۽T���V!�QRM�Q4xVvV�L�����Xgz7�����V�=�PA����'܁���,;��5먿Sf[�;sg�� +��׭W]
k;��Z�v��Vi�ݚ}���r_�?�\\пu�[�F�8�<�N'5g�@Q7F��Q���������a_�Ӯ�q[������ۻ�oiZ/
����-���ز�ˣv<6�����.�jZ �R�,�:a�(�F��\`��{Qg��n!�Ά^�'A�����VJ��NA*�h�4�ٗ2� b	B�{��������J��^�k��Gtj��u��ޣ/d
:i&t��'ʜuL2���49����i��_��G$��ʞ��Ø��@m��|�0C��z����̤��0kyQEն��eS[_wK{m�I�q��,�|���f	8]�7mɗ������ܟT��euȇ@HM%�^߆U�%�wL�~�k��^�����*�R�RG\`�.�N�u7��y;�J}��c_	^�T�!U�F��fQ�֯#���7E?����̙����f���Jieyي6*�Y��$d[XD�)^)!�0[(#@����i
 �@������-p��D�U��NEQ��c���b�*j�����ֳe���x�:�?z�î)�+���Z�7�NAjK��Wd{�Ю�,���Y���o(iY�!����
k�R�/f]���c��$#$�Q]��*0��)"K�I�3P�^��C�V�S���_D���eA�t�:����=�c#���@�J�2j�$"}�!h5k�JQZ}��]+#���(j�:ks�D%��!j�d����G���ul�q��Z����(2S�Agtx���x�Q�{\\�Pr��c�I��~�Y(�<�x�|;{D�kT�-KD��\\QFǷ�˫]�,*�������( #��&W_�n\\�0,��nZ�Ԕ��R�c��h5M�cȜ���P�L\`�̙>W�%T��΁�Y�$(�NOH>K�t�j��%RêIR��sEǓ�����!Ӭc��Y3PQGZ���:2Q�z:��΀* �3�)��8�y.�y��N�s���B���$��Òd�e]v��e9�$���\`�Ӭ��d�P�1z��D���!�:�=�{famku-PpCA����B_W-�c�F%K�4�kyle��Y�ha8�Ԙ�Qw7y�w�|ʅ�i[�n�k(�Z�����\\3A��z��\`$�@X���@�:ݝFu|Ctd�eE(��C���g�= 4C�@������OZq����"5I� m��X��4i\`����.)#{,Y&�]��:Y�~Ly�y�r���k�+C�w\\��\`��)�T�5
Њ2��ۦ�i���CB��E�!q\`��;�,�aS۬l��FG_:.�����]h�}��~�) ^T��:w�%f��4��rLmZF���,���
�C�KE��)8u��=�N<�X��(2��kKפ#��o�,
�ɛ/��fkڹ^o
P�z��+�u���yk	ԻC���om���v�����x��?��l�~�l��u�,��>�.*Zk{h۬nQ��)�#kعd\`P��ځ��6�J���u-zYa��=g�6���2U��$�a������Η3$ӮzǌA���E_�,��}
��Uɾ�c��-,E ��,������vyi'�B�á��Ϻ�d-y0u��� O��,5
)j���@EґͲ.��)����N�f�4�Q0I�Y�j�:M���)�q�=�nuz�[Z�1�W��V�Z�Aa{�So�m��_�_3*/�N
f�Xh�M�c"���
�A\`��:��H: �5�����{�Z�]�ˡ86�* �)��9\`ne4~��Z���c�T��r�2k�iw*�$+d�������V�]N&�<��t,�����,�Rǖ~��1��$
\`X�P�^��օ�+m�x��MA2��~�X������l����[ȳ��x/$�,aɓN��=�B��ح<!�@�b�rY֮�_�6L�3QZ���ۆ��BQ��z|q
��o���ip�𒢧ɮY�%�
�mͽ�t���{[{\`m|���2_�t<o�����0o4��k��@�1=v]������څ,K�]�ze-|h;�u�<��l=.�_���x|]��P�F�Q̾�.Fɒ�"��>��.c���߸E�ZRgd���y�W
��֯�l¹u�H�+��UK�!Z�z��_���l��C8�Xw�=�Y�*|�<�$��.��Zwg�����v�㳸��2�����Q�U�9D�Ok�N
BufD�gc4 �;�C��VD�����լ�锶�����+z�Cul5�[V�I0Ed����k�U�¬U�v�H4Wa�~�e�Lm�4
~|rMQ�2�=���4H7E_kZ�����WFBR�3�1x�G&���]J��t]��<s�)H�cB���+��i�a���!5�FZ[S�h5���~�Otx��Ҭ�o?���ʵ����S��t����+^?$uf4��Z<u؅<˦\`�Tt�����&������-[���<�d9���z�°ey�>�X䰶�
i�#�������k���xB��������'ړ��H&$�:ޭ{:[��]��N)V��6�i��d	�ɰ<����nY�NC�{��"Rwj��Z�}B��ԓQ���u���h��%_���aײ�%[9�.SIhPUԫ��P
�
H����:'�uU�VǊ��x��֏�tS�͈f�U$.���}+�"�!y��5��Z:r��[zH������]��ի�^��(�{���Q6Gw���et�P����)�dY6�e;����+��S��Y���.���&��4fɬ���܍�����U��nY�����+5�����2�κ5:_5����\\��u �Q���a�,$��((���fh��;���}���Y�,��%E�wD�̍5�V�������H����>4@���7K�����~��tj-��kG��*��Kݤ�,_I]���\`B�ؾ��W�,1N�ȪmfS�Z�!K�9�I�6̳��׸�O��\\J�1�V(� ����59�@E+��"�I��I��$_�R��l�ѡ��%�e(Xy(�]�
���
�r��a|X����f�������<�!��2۔�TQ6a�ǒH��,��;҇�\\L���FM�d�*P�����#Rs�	�m���D�kj���rf�:��}V��A=�= N�����Y��;��ξj 45�U��UՍ����׀[����-�k���\\�KeeVL?���I"��p�D�L+�}�$���,-3t�{�zl��ɷn\\��U�X>�G ��&��ƻ)[�l�k�)�ߪ@>Z��;��)�"�YD��,���觵��/+D�m:�P-\\s��W��j��Gz�����LVUm���$A�S��A�T���BS!)�s��ȵ�	� e�>e�  P���
�u���u��ʈo�Qe,!�N��ܤGc�HM˻܌�7�秗|ɒby�d�m���Qu�Yz @�����%�י������oݍ<A\`���A�s�fϦBRMa-�
�X��ew����ŵX�  H̚�~�i |�|�F��O�3)Fꃌ4����\`'R��M��[,u
!@�f�[�Y)DU��&�� 0���t �g�%�Av_CS�9K�Tj�\\˲�!@������0e�d�9
 H��\\�{?]Ϭ�4�ɯ�M�d� ��@H�Y�l��1=�^,��l���+��C/�0��ھ�?�;�[b ��q�o�����R�n�z��1��{�:!� �F3u�_��1=��.L�����ٗ��2A��K�A ��d	vn��O����߾)�F4���LMi�^0uqi�ǒ&H
=P��/�0�_V]�m[������C\` ��o���3�>w��H��@oB\`�g�hY8�������#)m�\\C� �&�8��2�_�c�⨾�^l�
 (�%Xa]�=��!+
D ��)��_J�gἥP*�K EȒ
� HZ���c��E� @��
���4���N}�@���7�[K�T!@�� S�>q;�_H��ɷ�;_d� @�Y
��!
0~��@}����/ֽXj��K�m�\`��w����l�O���{�u6��_N Me��g؅��\`��Ro�=h"!
0�ƿ�O-&X�b�)�oְV�����X(�_���o�g��4 �����{�Ό�"�Y�q�>��h"!
�֐���\`60#�R,��c ,"�d��*��8eX��! \`t���B,כ������SA4���X� i5B����q���M�Wm�~ZV|���w �o|e� �%�s��7#d�9���u�%�h*!
�@H�\`H��B�j�j�F�uИ
���}�o	�X� ����r��S3\\o:���ۖ����AF��@HCX�6jyLJ6�5r�@��7���u\${��8f�}S�� M�a��2H߾�᣷zݯ;����L�?q���� @Si�I���E�Z05%b)�J˺,f��R�Πl�> 4�e����
���l�
>�֦�]zs��[��&�e�TB"w��/f]SX
���˒�!�><?��Y:�t����fb�ԙR��7s�;Ò�rң����Η�ouB �!,��F�I�t�;��\`]%��ھڵA�h�mx7S( e�粐A�e�;����^�i��<�z�,G]�,KLY��"���ةu�9&%�Ų���c ,��]$����: @s�X���o�K��c�2Le��f�˜�d�X*��@HC���r6m�غf��</K�T.@8'
� 2(p�Y1K�t�O �9����I0(�pȰ�Y�e��Y�
ʤC���Ǿ�+ 4	������Km@�Z,��w�|�b��pXwl�u�eVlۖ�l@�l6�6sp���U{CAm���GV�� ۶��-A��O�ye��8$
�lx\`�iy����<Pg�#>�4K-��b��]-]^X�%S��5KB�;c�$��b����� 4��S�>񮩱�g�Ƿ<��~���m�uh��΋��M��j��&󨍅&##�!,��[s�uiLJ�g�,�R�Qg�e�  �g[���~��$(S� h:!
2�g]B�I
�P,e
�X���/�, ��k�����s�,�PwBd|Ţ�}O���P�@H����	��e|*�j]��i h.��vn?�3]�Q�F}K=&��tBĔr>eyH�
��<�9
�Cc��%E�*�㱯8�H }x��7����A ��6���Ej@��YW+�K3B�
�VXK ۸�����|�͞�����E����oEg ����֌B���
�xt�;��m�\`|��u��<���(�F/u}�go�Z��OK�d�1�B�@Xj��Y!�^ZD�A,S @�=�s��I�_>w�t����!	�  �(��=�F�G�p���|����%�W�:�ġg�  �=�o�kt(�a�3j�f�\`��5 ����KM_sڹO^u�����K�l�i�B�@x�[?ve����{lKq  ����ӏ����e(Zꒅ~Nת�g�y�g��@H�X��k7�c'nZ��s?q�p�ǩ_N̈́�a�zQ@h��*�x)�� �^�d2DƠ2:�^k��ie��u�� � ��So�iRŨg�(��?�~�R#���EV��y��\`�_ @/۶|䎿�^��!
<�Y3A�)2�����&t�#,E �A��t��%������	�H����o)�xZL���OY!ECZ�IR� �i�̛/���
�LE��u�z�w�oˮ,eu��5�x���p�ҍ-��������w��\`�ݼ�ӥ߸~�s���>��$�#����v?y��!
��� (Ξgnw����Aլ��  �Є�ɷ��u���\\��7�拸_Xf�)=��,�_v�cQ6Y�@_��?�ޡQ�P[!_\\�I�
w��s7��*��3Y�����\\p
 �t��ݾ�U.͆�H�� ��\\�J�O�52=�|X�0�ۖsziE��
*�6
���/��T��s��sg���c<v�fӲ��9 �ۻ��͗g3gr�ȜҔ	�    �Ҙ��N0ӏ�6���|��n�߹[����o���cٌ�
~|�+�>�E����/,sS��ΔQ^kF�K)�
Z*S�x���U;��w�>���   :�Kc�4�]S��u�;���O��e�E�M�n��-�O�;������˙��Ǿ���������; Ó�V{�  0R�4վ�2�����Q�K&e��x쫦%1z��۩1�    #&�P#�����W�ķ��;��-n��9h9�%"�7@    F!
���;���V����|6�7:��(�Ћ+��}�W�>�
    #��1M����|\`�\\+���Z2�-
�lX�MTdٌ���Z<TG@��%�Ǒ�Φo%    B�n��q��/��T�Pu4 Y����s��"���L��<��p��+�}Ln�Q�c��uq�c.�<쪯��ι���9    �Ȋ!���1Ҵ�E�-( J�%'U�׉     ��R���?���E:��k    �!���U����d&zm     ���Ĕ�0���7�ʡ�z   ���X*��B��y�k��\\m��b�!���    �Z����4���-o����y�����]ShgD}�3A    ���A__��|q�;~�fWG
�<��B��g�_    �Ȋ3B�����>z�;��-#Q�cz�Gn���M�:    @#A6���o��N���͝�>�\\�����-wٸ�37���1���    h!o6��6#�ǅ׹��������VI}�paiy���T�D�
�&�����R�X��    ���@��"(t    ���5     4�     �B     @c     �A      4�     �B     @c(2�      �nѝ&     cY
!     �/��,sc�     ����4f��:     �z��32B     @��7�A!�     @�]v���]�^u      ����+}�l��xט�     ���Kc�     ���o�VĴ!�!      �3v�,Ȳ���      �g�]r/%��!cw��ї�
     ��؝���     �^N����䏫���Y     j�+��J d��(:ґ*     0��u��:���o��<     �Ę{5�����@�2����     �h[�!����k!Q�d�]�6e     \`����!��ݳ��     0����OҾ�$BV     q�� �,��d�     ���3DR!d�     ��3D����[��{'���     Tߢ����؟�7z�aY�����     T�bt��~A���{5�5�:     �j;E9��;�
���;n�]v�#��n     P=�Q�b��7ܯ�q٠;ąS���-���     �-���ODB$
�h}���     ���b����.��W D�_������     
�N�����m�_��G?�}     0<
�l�۝���=�⩋���g     �|�� ��5"�Kcq��1�5���     �KA��%KD�!	2C     @ɒ �.�́�5C     @	2��f^�m�߻�l�&��      �Z���u� �����7܏�ڮ�\`     EA�tׅ	�H�1��q��e�J���      �sZ�2�
�w.� !�8:����(Z�#;     �)�(�:"A3B:-���?z��͑     �(�� �O\\A
�$��ȏ���tD     @:�*�E?��P�@z)<"q�K�o���e�M     PyZ�jtS-�_������y��u��     M����������}�O�#��    �� �W
w��Ǣ���2� D;K�ѧ���     F_+������=�
���J�A���G�=���"�:�Mp    ��Zl��>{#�����V!�ѩ���(02ᾈ"׻oE�uї�c,�|�}     �:�1�8�.������ǐ��������ٰr'    IEND�B\`�`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'fire.imageset',
                        path: 'Writing/Assets.xcassets/fire.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/fire.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "fire.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'google_logo.imageset',
                        path: 'Writing/Assets.xcassets/google_logo.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/google_logo.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "google_logo.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            },
                            {
                                name: 'google_logo.png',
                                path: 'Writing/Assets.xcassets/google_logo.imageset/google_logo.png',
                                type: 'file',
                                content: `�PNG

   
IHDR  �  �   �!��   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �\`  :�  p��Q<   bKGD � � �����  � IDATx���y��Ua/����d$a� 8 *Z�̀BH��д��sG[���k�t�v��_{[o{{kk-�Z�U�$�I��V!�I�d>g?�����
䜓s��g���}i�9�����>���                                                                                                                                                                                                                                        �S �O��	�F�0RGO(�ւ��4eA���I=�i���2'�q�������$���$�5s�ʜԔ$'|篞�����Ck�OҺ���d�}��M�=������)Mv��֒]�ij��Uө��M����+��HR��Z�dO�fo�eO�nvuF���ޛ=�F�# �~�� zҝ�<a~3�^4�-ij]T�E�V��ZTS��Ҫ'������RrB�a����I���e�ޒ�)���iv�Rv&uG�䮦��YZ��P������� �%
, \`��ugͺg�qKF��ळ�U������<(i�&��$��,J2Wb]��HI�J�]%eGS����U��j�m�U�h:��sGf�~�'>�Kb �TS\` ���Z5�k���F����:��<$5I�Ф>4)�$Y"��s0�7��Q��Z%wԚo&�[��ۇ[�7O]p{ټyTT �D)� �1�I�{���5������$��%g��ӓzz�S�I��0��RsK-�5����[;�����֥��." ��(� ��T׭k�ص��R�rfR��G��%yx�9Rb
(ɭ5�5�-��[SZ7���Wg�6��   �]��>a��~D-��I^Z9��>65?�d���!#In+�-5��R��&����KK6o�S< 0X ���Y�����uV���զ>��rVI�J�T:�I�Rk��*�jSʗZe䋋����������>Pם5뮻�<�i�תy\\M}\\M�*�C�� ��&�/�������G�t����p@4 03)� \`��g���G��S�$g'yR��&�ܯN��%�%�M�S��n�z�h ��)� ��}s�ʓg��H-�RrvR��o��3&����\\���Z�
��s�i�>�u� @�}d =�.[6|�¡'�Vs~)eYS벒<��5L�=��RJn����t�
�^���b��� ���Ok���?�ݔsk��$Y���&���;�\\_����O6��-K6y�X \`z(� \`�y�淚�'�i��R�Orn��%3V�&_M��I�� \`j)� \`
ܳv�CGj�����$�KҖ��ے|2�|�tʧչ�/�7�� �� &����<�5Z/Lɪ$$9C*0�_����-�Z?VKk���_W���� �>UE  �}튇'���z^I.��
8����LZ�DM6,9���Z 06
, �;/y���腵Ե�����ӥ��%��)�I�Ē]�G�
7�� �� ��ݗ���9�\\XK֖dMMΒ
0��$�X���vs墫n��H ��X ���[��q��W&�%Y�de�!� ]���\\��#�C�����A��\`\`ݾj٢�V��Z�ڒ<;�)RzT'%��)lu�]s�gJR���P\`00�u�w����ΥIyFj�����LreI��ᴮ~��-w��~�K; }mת�Om=����ʥ�9Q*@��$�T����n�����$ ����sǪ�<lh�sI���&��d�T�rK�֒,���l�<* f: 3^]�֎��xJi�ٵ沒<V* I�I�@i�/�
_��k�=( f" 3R]�jhG{�E����Z��́�ru-Ϳ�n���W^{�H �)X �7]���GN|Z��,ɏ&Y*�	���)��i��)W}j�H �e
, zڝ�<a~kt�3S��<+�� L��$S�VfЫX ���.}���xIZe]��9QZL+� �I
, zB]w֬�vͿ8ɏ�Z(�B� tշWf�\\ޞ����?|�^� �-
, ���[�ޱk�E���)�-�IR�I��KI��E�;W�n	 �I�����g��yqj^��T� ̨ĮZsE)ͻo��%�B\`�?~ \`ܵ��5e􇓼4ɓ$�����Z�{RZ�\\r�u7I�����)r���,�n��R_�����Зj�kk���i��'0�X L�f}Z;>�bu����<7�\\� ��I�WK޹������4"�X)� �w�:���V}aJ}M��K�$�L��uF����͟�& &J���ݺj՜����R_S�5>W �MI6�Z�|����_���� 0& ��΋W.o����h��%�8�ɻڥ��E>��� \`,X �����[��G^Pk^������|�����ٻ/?��7 �G���{�9���%I^��%�؝�o�v��S��r�8 �^
, ����m�V" L��:+����+���D��wٹf�j�O'yi�m@Wg*��R��ó��	���.� �ǂ []�֎O�X]j~.ɳ|6 �c��_j�?Z�i��0�LR �7׬<y�4�(��d�3$�pmjy�� �G�0\`v�]�����$�I�J�h[)�����;O��u{���X �6A �ԽI�o��~۩�?�M ����ݺj՜yC~���Iy�D �SM�զ�u�5�R �G�Їv�ZqJ*?Qj��$'K����PS޾dt޻��ͣ��; }c���O�M��R�.ɰD \`�֒�?0:����y�!q �l
,�>�c���S[o�� ࿫�Y[�Og���7n�@ f&����}|}Zw}lų�*���z�D �ݛ����歋���q �,
,��K9{��I?Zj}S�GK ��p)��::�K6�fq �
,�bת�O����l�%�c2���Z��w]u�W���X =��U�

��O-?��x� ��j���6�7�^���� �M
,�u�%O]R�џ*��>�B� ���I�����o��3� �-
,�s��e������I�J �UM�)�W�l���� �
,��}��G�R~����$�$ ]դ�ۥ��'o�����]
,�.��W�M2[" �S�$�My�3� �G��%w_��!�N~!�+ �	���S�����L?�4�{�9_L�$s$ 3J��jZ�
�\\��Vq L�4�y�N�u��S�c� �t�j�'#)����[���R\`L�=O?��Ý�_J��⩂ �oS�})�O�í�������\`��" �w^����9?�Rߘ�� @_�+�������љ���8 &�\`��eˆ�:���Z�>ɩ�A�\`���Է,:�a�,W\\ё�d�_�u}Z;>�����_Or�D \`�}����K7l�R �N�0	v\\���)�wS�8i  ���N��q�5[�,
��S\`�����i5�W���  �GSJ����_\\���� ?��}Ɋ��v�撼*IK" ��_�j��:0:�gl�|H 㸃� \`�v���G�~Cj~.��  p[-��K6lyWI�8 �N�0u�Y��g��4���$'I ����'Z���E�n��Q�" x\`�׬|N)����Hi  �����Z��/����o��)� ��]�,������$�J �bj)��w���9��7����{�~�I�GG-�O%� 0}3�rs:��-���	�n�" ���l���Z?�d}�$ t��vy�)Wm�U 
,�$Ɏ��?3��$�� �#���:��͛�d
,\`�ݽ�7C�-��K �Q��R޼tÖ�0�X�\`~<�ܹ��w�Pj}C�9 z~�V����?�hç�]���E �;�.��V-oKr�4 ��PI޲��[���q �B�����ȴ[��gI ��njZ��S�޺Q� P\`}�sϝ;{���L-��d�D �>Q��s��ٿt�'>�K@?S\`}m�s.���Ӕ��4 �~T�{Z%��h�ֿ(�.� ���K;V�8����tA \`�l.M����\\�UQ �F�����kW�����IN� 0\`�R~oɉ���w��(����c��'�Z�OIVJ p_l���E���"
�(����˖�kh�FI~.ɐD  �$�����!�^{P�L��f��W\\���H�(i  ܧ��R_�x���E�T
,\`Fڵ������$�v/ 8�Z��(��c��/�0Ә�3���+.�%�H� i  �˭�Z^�hӖM� f0c�|��S�h돓<_  Vk��C�~a�'?y�8��@���7��ܵvūk��'Y( �I����z醭D�:���Y�졣���I.� ���5��k���8�/�ЫX@�ڱz庴꟥�Di  L�[���%�|\\@/R\`=�;g]�Y�ˤ 0m:)���'��rŗ���%
,��Xu �u_�i�h��� 
�W(���p��s��3�\\"
 ��;�䍋7n��Tq ݦ��n���j���$'I ��&�Z���O�|�7�t�~��V�}�h{��k�"i  ��=��o��� �E�t���+�^j��$�I ��՚w�n����n�4�����m�;w���_K�/&iI \`&M �כZ|馭��0���ir�E��i�Z��Q�  ��Fjʛ�<m���i�L0�jRv�Y�$��dX"  }�oS�5���W�vi SM�L��/Y��hޕ�� �gjv�Vy��
[�U�TR\`Sf���M�Y��� зj�?�3k�/�����

,\`��v�sg�}k��I \`\`|&�֏-����DL60�v�^��ZZ�N�hi  �{K�7n�;Q �I�L�����.������d�D  x�Y���=���m)&��"�Xݳv����I�ai  ����Y�t�
_p�X�1�k��M)�Ir�4  �{���%��GQ �B�LHM��5+^����K ����?^����r�
#� &B������-j����Li  0���'Jk�G_���e��"\`<v�]����wIN�  㴣��p醭D�GK�XԤ�X��k-�� \`b�����\\��W�z�Q\`�����K�Y�9��U��K �ə��
�yቛ?�[�Qo" Ȏ�W��&����  \`rg���N�>��k�~Y��d�_�׮|I�|2�+  �B��l�ʧ��]n�?�����ϭ�V͙����R�ji  0
jJ~o��[�T֧�X��}튇��Jr�4  �^�_�;�/r.�X�ھv��S�Kr�4  ��,��ܴ��r��_����&e��o(����
 ��~9��luZ��X�����+�\`��Xu�q��W�Y'
  zHM�o/޴�WKR��M�lǪ'?2��{�<^  ��jڇ_z�U_�/
\\
,P;֬xFJޝ�� @���Pi�}҆�!
L���S��c͊_N��+  f�'��֧�Z�b�(\`0Y��K9��#'�yR^"
  f��5y�ҍ[�V0XX0 v>}٩��Wk=G  �\`5%�����o*�ӈ����W�]���$�  }2����y�����������W�K��d�4  �3�k��쓯�z�(��9��TMʎ�+~3��C�W  ���;�\\����O�7+���~ٲyC�[�J�� � ����n�-W�����Χ/;���ޟ�#� $�Z��,ݴ������ȝ�,\\���\`M=]  ��/޸��KRE�C�}b��s.)��<���  \`�g�W����36o>$����v�]�Z�'I��  IR��>��͟�-��X0�?�׭k�ܵ��S�i  ��|_N��SG�yڦ�~]0�)�\`���'�ouf�'�J  ��)�YK6\\�YQ�̥����K�����\`<i  �2��Wky��M�]%��Z"��e��ouF>�  �Q=.������_ ��X0�ܵz��Rsm�GI  Ʈ$�j)�s͊�!
�yX0C�h���R�I�D  0!�&�c튷VG��̺xE �o���H-�dH  0)�zqg����ͣ��ާ��V��s���Jꛤ  ��������/<c��Cަ��^�,]�����m�(%��  L��|t����In�#�]
,�A7]����9�o����  �)V�V���hӵ��&��C��g���?|��+  �&%��ѿ�.BCپ朥���pJ�$
  �5�F�=�
,�w^�����
  ��wʫ��n�z�4�w�E ݷ���Ol�^��ti  ����tګNٴ�VQ@oS\`A�ݵfŊ�\\�d�4  \`z|g��j���B��xŅM�1���  ��a� �<
,蒝kW>�6�p��  �顼��I�]�c͊���/�\\i  ��P^�̥��i�}��'��$��  �顼��M��hǚ�?]J��$C�  �顼��O��d��oN��v� ����t�*�\`f3��i�}�����MI  ����7jɚS7z�4\`f+"���c���Lɛ%  �ǶA�/�ၩ��,;V��_)���  �i�.���>cL�fٹf�ے��4  \`Z��+��)�\`�?0�ε+ߞZF  0��ŕWЧ�"�I��\\����ʿL�k�  �j[�i�:eӖ[E�G���&eG{�;Jꫥ  ��]�)Y�����L�f�k��?)V^ �t�m��±\`��kV��$?)
  �����+V\`��}\`~���䧤  ��]\\yD���5���i�  0��W0xl!�	ڱz����$  �Gy�I��s���U^ ����t������D�E��s��_�)�+  �F�Yy�Fy��� �nǚ?��$  �ǶA@�c�c��W���t�  ��Q^1��پz��K)O� �i�����b���-�^g� ��Q^�M�\`��s.)���$��  �Cy|�����xŅI�\`�9�  �i���W��i˭� ��Xp��9�	%�G�� 
  �V^�Ǚ>�=v�z�#���(�  \`�(��b!|��?鴔��I,
  ��+�hZ"�o۵��j3��$�  L�0
,Hr�e�捴�?���  �顼�J���eˆ���1%�I  ��{��
����>�'����Ri  ����t�*����Bڎ�/����I  ����ʫ5�n��6i cUD��ھf�O��O$  �öA\`�X�kV�h�w�6Z  ��+�X(�8;�._Uk�H���  ��������r�%��ꔏ'9A  0��W�dh��Aq��s�dS���  ����&���V�}�h��2�C�  �b[�i_��&���W�-m_Q��J  ��;x�Z���͟�&
\`2(��{;Nh�qM�J  ��m��TP\`��v�Y�+%���  �������ҷv�]�#�y��9  L=�0�L��K;�.;?��!�li  ��R^SM�E�پz�#JZצd�4  \`j)����,�ʞ��{R)�+�  \`Zlk:��W�TS\`�7�e�GFF/Or�4  \`��'ߨ%kN���m� ����q�������  L-���6$���5+^W���  L-��
qg�۾��KJi�5
Y  �R�+�[X�h;/Z���*�Nr�4  \`�(��nr3֞��{Rm�Dy  SJyt�����j���ё�' �T��t�*��nrf3��������$  S�;+�֜���ۤt�3��q��^��R��H  ��m�@/Q\`1��X��I��I�J  ���
�5
,f��k�YZ�\\����  ����z�Cܙ�˖
���C�W  0u߻�W@�R\`1#�uby{J.�  L
���l!���\\��U�Կ�  L�m�N�"Oz������g�ɧ��v  �V^3�-���=O?��4yo�W  0%�W�L���7?Hקuxt�!
  �����+\`Q\`ѓv~lů'y�$  \`�)����X���kV�\`M}�  0�W�L����ܾ�I�����,
  �\\�+\`���q�Us���{�� �I��f2=c~���$y�$  \`r)����Bz��5�����$  \`r)��~����v�Y���z}��  �ɣ��Ő��/[6������\`ڌ&ٝRv���%�]Kv�&�[��)�k��VSw�dwm��V�h:�{��/h�ͮ����f�ѹ�$ٹ��g~������v�wނ�R��w�f��#i
���k5�Ps\\S3\\S�k榔�M-'�Z�daJ�fa�9����dQ�}f�\\�	<�mM�}ѩ�?�M�Lg]�c��w&�� \`���K��j��R�U���������t��C��d��%����_^��-�7�\`u�,jZ��i�%)�SK�iINI����$�G\`�l�(��~��'�e�ڕ/)��?I 0&5;�ܘVnLS�V[�-�����͡����
���Zu�	Gʬ�[iN��rFJ��ӓ�^����$)A�P^}G�EW8�
��q�&_+%_NrKIni�[�h��d��;�3uv���#�#��><��k�/5g���IJfg^�J�Ŵ���s�Ι7��&gI\`\`�O�R��ޘҹq�՟�]4���KV<d�)�MS_J�J�$��m��k�����i�}���SR_+	�Q�3%�+��M��Ү�;����T���#�<�����eg��zbi����<9ɩҁ�P^}M�Ŵھv��J�?I�?��������R��Z��7_�M���V��V}R�zr)���|� y\`�(�����b�ܽ�w������~0�55�J�O��O�V>~�U[n�k��O:-��e�������,K2G2p�y
����n]{�=�6%�@ 3���lI��~j�U?u҆������G�^x��U.��w����.0V^C�Ŵعfů���%0��.)M�Ǜ�O-�ݹ��pÈX�luݺ�]����4��)�<-5'J��
(
,�܎���Om]�dH =�I�g�l�Ɇ%���*�膺n]����qv-um)umM��d�d�;׈m�� R\`1�v���#��|���.
���ͤ\\�R����p����#z͎UgW��_XSצ��$��
��+\` )���/�kV�'ɏJ�gL�/�u�hS�<���_	3����QJ�Y)�Y���X���P^K�Ŕٹf�k� 躻��/�佇��7=��k��~�c�Y�����%�YI.K�T*�)�0�XL��W����P��t�]����W,��|�YV��>���X�Ԥ��Iy~j}�T���3� XLїǏ/ߐ���0�n��{S��%l�tY�F$���ܽf���y)y~�3��e�@XL���W�B)�}I L�[�|0��b�>Y�*�~w\\��V��+��(�#$�L\`��Q\`1��\\�������L�o�Կ��S���K�qe��e祶^��u)Y,z��W �E�Ť���G�>��	[��i L�����6�yג�]���@8vuժ���}���$yN�9R�G(� ���I�s�߯5� 	�IӔdSSʻ����.���}"������O<<����R^Zk=G"t��
�>(��;�.;?���$-i ��k-�j7��N�|�7%���5�<�I�5�%IN��Hyp�ߑ���y�淚9��j�c�'���t�_/����W�-�yB����ښ��ݙ)��x >�9f;֬��I~Z �"�{R�,��Ez��Ϊ'?2C�W���I�H�I�$�A��R\`qL�Z�ruS��%�q9\\�+��w,ݴ�S’��;k�]��}^M��$O����+�1P:0aw^������'y�4 ��[���l�G���v�8\`f۱v��j-?Q�'�+���+��S\`1�/mkV�E�WI�5%�Tk���ͼ��͛GE���K���5:���3I,�By0>
,&dǚ�H�!�!��uoM���n��S��r�8���ug��y����_��Y��60N��mת�Oi)Ƀ��}�L�����;N������S�r�ڕϬ��R�$��P^L��q۱f�_&啒 �o�����\\{�Aq ɷ��*i�����I�l�
L��q���kZM����O��Z~�[�_֧p_v�Y�����$/L2$��d��1PB0f�_�l�Ё�⩃ 5ɿ֒�o醭������v���$�M2["�a��1R\`1f�W���R��%��$�N��O�xݿ����W?���V��M-�(�,��5+� &��1�s�9Oi��qv0�:��w����X��37��,w_��!MS�Tkye�a����$Q\`qTu�Y��g�g<@MJ���j~u�U7|E�T�}��No��7���/��;�m� �J��Qm_��7J�+� kޑM���d���0]�Z���4��zj~�w��!���d>y@w�]��Vm�Kځ�s��i����k�|^@��x���Է$�X3�m� S@�����֧���+>��� �qCI޴h�֭� z���+֖�?H�Dì��V^L��u��/L�W�D)�� ���k��n�r�(�^T׭k���/K�o$9M"=��+�)���>�X�┴��IN�З��)�W�l����3� z��-�7����)�MIJ��>S���J
,�ӎ�+�!%?"	�'��j��E'��rŗ�H�iv>}٩u��5)/�}�'Xy0
|��}v�Y�$��gFj��Y�o>�ß�)\`���A�oOr�4���+���⿹��e������� ����~����,
��Ԥ�X��ť��K�T"Ӛ��
\`�D�w>���(����\\lIi��d��˔W@?*I]�a����ѵ��%�ʴ��t�*� ��3�m��s�P�ܐdH���R�/-ڰ�������V>���;b[�Tr�@X�E�o/?/�y{�W��6����Y��.ް���+\`�,�f��o�z^-�I�Ȥg�F-Y���~V\`�$ٱf�K��ג f�'�
���\\�q�Va \${�~�I�FG�$�����9�
��_�x�V�}�H{�+q�'03�]jy�M[�i����k���M���Ҙ0���B224�7��f�ZJyWg��co���+���hӖM�=>%���#�q~��6���pw�]��Vm}&ξf�t���O-���O�\`�v�]�����$O��>ml�V\`
�ri�����
�9�R~}�IW(� �oɆ�?�xwsNjycM�H��++� z�Xl��/O�_I�!�l��ꓯ�z�( ���5�<����$O���q�@�Q\`
�����$K���=I��7n�+�\\L���Y;>�/%iK$��
�'�B8�F��룼zߕ�v�d�'L�rŗ�,ٸ�MMӜ�䫃���z�3K�箵OyLS;�O2,
�G�-%��h�ֿP\\L���=w�������_� ��ng^�6� ڱf�G�<]@��p��z�ɛ���( �����\\RJ��IN��m� @�S\`
��-vm��K�A{J�/Yu�}��Z�h����$���k��
\`fP\`
�����$���c<a�m_��%��w$�חߏ�W 3�C��λ�>�+��(�?�d��g(� z��
[���unM��_޶�ӾPy03X�5 v>}٩u���$����v�/8y�u�&��v۹�Ν5o�J�>yIμ�a���i�h�-Q^=rKJ���s�9�+���!�^{p�ƭ�-��0)�f��Q^�@V\`
���|bi��Da	t�]���7m��( f��-tm�+�<~���μ���0ȭ���IæV:[y0�-�������_��/g���
\`����\\��Z�/� �h����K���e}q ��B��̧��cuݺ�]�l�|MΒ�%�j��n��)Q ���8;Mޛ䌞�N�������]�^���6a�yw94�	�+����ꭟ�4+K�����5����+���
�>����9GnJ�T�4M-o^�i��\`p�u��;wm����R/�3���/
�>�c���I�%L��kSd�5�R �=t͊M��$��;(� ����}Ɋ�t:�j��� ����ɏ.ټ�NQ ���|bi�N�.��m�N��S7z�� ����C�N~3�+\`����n�*� H���l�������4}���Q^�+��̝�,\\�S>��-
\`>F�%�UK6n�Y �n�����?r��I��Y�
�7+��m@;�-Q^�4/i�͹�+ �ϙ���[_���4S�s�W ��
�>�c���S[�0
>0�yɉ�?�[ ���E˟�V��$'��U^+��Im�����Ӥ�7/޸���W �ǒk��PZ�0����nk:��W ��
�>���Ϯ��~I S�P)啋7ly�( ���֋�tZm��5�����Xy0X���uݺvZ�-� ���Z/T^p�_���ˡY$�Ȅ��*� ���{ۋkr�$�)���:z�M�o �a�'?y���PI�v����
\`0�B8��ug��yϼ�&y�4�)��t����_�'
 &��lRv�]���������/:u�I\`�X�5���gޫ���������*� �*%�K6\\��Z�SI���5�F-Y����f�[W��3����$�0�F���K6^�'� \`�l_���w'����m� X�5����Q^�����l� �m�-�k��$�~���� �kƺ�'�ouf-�Ri �d[��\\���"
 ����W6��k�Eq� �a�U:s~:�+\`�|��F�S^�m�6]��U�$���
��\`��c�Yǥ=�kI�H8��R�;\\�o�r�4  �^d�L�l��>�+\`r|pdng��
  �e
��^����_%	�����ŝ��=�7  �ˆD0�����-|�Wz�C͑?A �D�}�?_�*
  ��9k��������Yr�s'g��N���VRS޸t��  0SX�5����Lʷ˫$�u��i�|(����4�%p��HJ}��
[�J  �Lb��Q?�y�s�o�}�����>=��'(��HS�-����  �i�>C�����ϓ[Ǎd���9O�SP�}�ߪ�2�  0S�E���5����{���~�PI��/C���-�Q�$�$�_J����^#
  \`��r� #�ïN�ic���g��ݘ��C��Ԕ�o�~�(  ���
�W��ps���%9a��L��ɬ�ߓf�p:��
Ӟ���q��-�  0�Y���F���$����+�M�?���mI�
��V�����:�  ����a���P�=IN�� �r0�yoF�-H=d����j%O_�����   ��X=ld���krƱ�=�Sd�Ko����
�Y��Z[�mܪ�  ��%9�:�<�:���IN����7�u��$��8N��v4�f�)�~Q  @���GuN��$��Կ���=����[R�t��c{;��N�p��
  �KV\`���>����O�xJ���~쮌~��}���mOJ�x��W  @��uΛuY��L��h?�/�9�ξ[�0sHi~pɆ�?+
  ��)�zP-���甡&�/�-�.�F�p#x�I���H-�yK6��	i   ������0��$[���v}�=#͞Yz�H�y��M[? 
  \`X��cJ���sۧ̂�ߘ�3��mM����+  \`�8Ľ��r��V��t�X,�Mf��+e�ft������\\����'
  \`�X��C�۝_H�KŒ�9w{�[wKʜQ�=��������$  �A��^��~$'�
#��^��������3ҹ}��n�#J������  0�����CC?�*����p$^xsf=�]Tky��
  d
�^��~(���O���V����72�o�5���˗\\��  2V�5�����˿���ݓ/�)��0�>�3{�K��h� ���)�]VkJ���7I����:n4��xO�{�s��S{w���C×���/�  0���e�f=���ofͫ�C�^��=%��B0���4��.�����  \`a�穵μ�mJ2���Y��[Қ?barhZ�g+�   ���3]t��᧔�kg�kh�g������P8v���矲����  �X��]���o��#9�E7g��F�U�?��  �~V\`uk�ze������dv����_:1?���Q�(�����.ٴ��  ��4
]2����Qy�$��+^rSZ'1�05�/�\`��  �}��s�k24��5)���w���<=#7-4�p�&��3{ך3?|�aa   �7+���3:�y�Z^%I���qϿ%��~+iU������  �S\`uA-����E�d���Y��_K����P+y��?{�(   �-����Yg����Aʾ�w8�����~k�7 ���W,ٴ��
  ����f���.V��d��nΜs�{@���{�+  ��S\`M�zMN���V3w���C_On�dW/:�7�  \`�X�hdt��Izݬ����W|5�E��!D�IyA�⊎(   Ʈ-��QkJ����IN�,��Nf?nW�ݳӹk�7���N�5ڴ��   +��IgS�I%�o+�;��C�2o���v��)5/<���_  ��)��I�ퟖ��(��;��Ǿ���y��7��7m��    &��\`��>Z;_�-����w8�����~k�0賛ly���[�[K
  &�
�i0��'��z�7ₑ,x�͙s�va�On;��Ry  pl�*S�^���)���8��?l_�Kf���IG�ʌ6Rk~�M[o  ���L�N��̤�&�����=Y���^|H�X��7,ݴ�S�   8v
�)V;�WJao̓g�Kn̬��3�m����   09l!�B��������ybJ�f��N{�HFn]�T�\`F��Hʥ�����   �V\`M��ѡ�%�ı�u��Y��7�uܨ0�u#����q�ݢ   �<
�)M��T�c�����U_����
����+  �)�o�\`j�l� �|T��)9��Sr��K�*z�o����	  0���"���O�;�f�;r��nI�ӑ��#)/S^  L
+��@�:Ǐ��ۓ̓��i}�;#��s�A7�6���S6\\�iQ   L
+���Hk�Q^M�����Y��3�	��������
  \`�; L�Rc��te=�d������ޖ���b�}fɮ�o�  \`���"�\\�����V�_�����9/��{F:{���t8�i���k�~Y   S�
����WI�;ڧ�q/�j�ϸWL�ZQy  0=������2{t�𷒜,�nD��O.͡��"��Ջ7n}��  L+�&Qg��gFy�}�f��w�u�����mw��W*�   ��k�ڼP
�c��{��%7���0�L?q�U[o  ����p��e���;�̕F���h+�zP�|��8������7n}�$   ��X�ddx�����Ie���gޖy�}#e����ó_'  ����$����7�q�d��ߜւa0^�i�'|��D  0�l!����U�Nm�|#I[��98��hFn](�v�����M[_#	  ��k���� ʫ��;��~���]u�0�;g��1   tq./��Pl�qC��9w{�[wK��Qyp�j�?c�   @ק���W���V���$f�f�p����t�'���l�z�   ��
�c
��Ia���,x�͙�Ļ��w���~R   ��ܦcPkJ���IN���VZ5��ܛ։G2z낤�8q���?�蚭�H  ����:���έ��%�?f?�,x�Mi�pD���EO��/�   �XǠT�����҃Y��3����L��i���O#
  ����\`b�5jj��I�K����&��+e�ft������o��O�   �V\`MP��/I�D}�$s�ݞ?�����c0|q�~O   �E�5Q��a0�~o�{�Mi�r@��֔ז+�� 4  ��Qk��^�����IIc�ƽSrp�i9|�ba���^�q���   �{������Ъ(�Ni�̻�[�w��S����g�-C͛�   ЛXPJy�����ʂ�ޔ։v���5��~�7�!	  �ޤ���>�Z�s$1��Kf�+��Y��#��U���ݝ?�  @�R\`���S��M꩒���d��n��Uw$�
d�����p��L  �0�x����*ɜs�g��-��:���K6n��    z�k�J�s���z�,xٍz�~a����b   �}
�q8�ixYMΐ�y1-ɂݜ9�n�PK��S��r�$   f��[cWO�hWT��Uwd����2�ȣw�V[�~_   3d�-�q(U�Ř�:kW��i�|H=����S�����   3D���4�VS�$	ƣn���#7/�ޱy�ƭ�  \`�k�A5��2nev'�wk��VҮ�ZS�$  ��E�5fοb�o�d���Y�c_K�ytw,�q��-�
  \`fQ\`���+眑䉒�X=t_���=��K]2�J���   0�(�Ơ������n�H����9w�0�Y���E>��   ���i�a�[�3���]u5sWݑ�?�-eV#��q�d��   0C��"x\`�S���%�d����Y�������0��B��Z���o	  \`fR\`E���I�J�)� O>�/�)�~\`�0��]C���   0���"8���}�)Ufw2���2��ےv�d�[�o���=�   ��XGє\\*�ì��΂|-��#<�v���1   �l
�p��Y�/��\`�=d_���>�^aL���ʙ���$   f6��Ӳ}�.�����%�W�L�<���<m��   �se<�ZXt�ʬ���[���[Rfw�1���7��4�   �i��g�{u�Or�$�Yg��ݘ��C����/��Or   �
���)���dXt�"=�p����z�na�Q���
  ����"�oM���2���ږ��ޖ��@0�r��+  �?X���O�$O��f��wg�KoJ��a�����fټyT   �C�uF.^�d�$�E�S丗}5��W��kKF�y�   @�Q\`݇�)�J���p���%s�v�0���[�b�  @΃Ep������x�f��w��%eNg���7�x�o�1   ���{'���$+$�L1|��,|ٍi/98�7���.W|��w  @��D��uj��$Ò\`F]�'΂�ޔYO�gP#�mщ��;  �O�"��j�Z-f�2�d����y�|3i�A�r��+  �����~
,f�����ܔ�	����<|\`���<  @�R\`}�<xCNN�DI0ӵO=�/�1�����m�;r���:  @�R\`}�Nf]$���7��~��]uG?��å�wm  �>��໔j� }��N朻=��ȭ)sG����{��wh  �����.�:���4��=Y����}���f;��3�   ����;��6���$����h+�~P�|��~x9W/ٸ��
  ������N{d��we���Ko˼˾�2���S�ی(  �\`P\`��d��A���ݓ/�)���ԗ���\\��  
��h���� i�r0^~c��w������4F  \`0(���f�#Kr�$�����#�d�;f�/]�����w=  ���� iu�_1�J2���9�GnI�3��n-y�C�����  
�oO�/�n�{��7�}J�vC59R:y��  ,
�oϊ�$��d�Kn���;{��+5��d��;�  ���W=�zռ�J�Po��Ү�w�2���2�[��V��  ��/�:e��+���+^zSZ'�_�%�o�dd   �X�>�� �[{��,|�W3��{z�b��>�Q  <��J�ܿ2���Ͻ5sWݑ�ڕߡ&Gj)m4   tn:�/�~*sG�I2� G7�����OO��/��˗l���F   \`0
�
���C�Dyc6��}Y�3t��i��M;.}  ����Wo� ���Y8��^tsf/�9]?��m�F�   <�Wߴ�P�5�.�V�?��)�S{�zM�3��  ��-�jMI�O����u֮,|��i�|hj���Hm���  ��XG6�zL����o"'�ݔY��3�w���S���)  ��sP_x���W0Y�ӬN�?���]uGR���5�wJ  ��-�Z%ο��T�9�nς~-��F&�o�c���(X   ��(�\`*=d_���=x��]����\\qEG�   d�U�ɢ$g~��˂�,x�͙s�������$  H���-OR?L�ݥf�;2���R�����7-���  @2�[K�z���ڝ���jZ���ͻ$  ��3��l�ao4'�ܔY��=�?_[��H
  ���W⋮�(�\`��ٝ���m���[I�>��v����$1   ���X�#9�$�z肒�^�3^����U��v   ���+�F������UCٗ��1C���.њ�?J  ��6x[�ܡ'n>�F��Goɜs��W�\\�UK7^�]:   ��9������+�;P��Uwd��oI��IIl  �������K͓;��Yg�͂��t��:�~i   ��,�zu�-û�,��+�}�kG�'   ��@��m9�zU�埥   �}�-�ο���i�|H   ܗ�*�j� w�Q-�.1   p_��Ŗ�e�zO��g) �d�o�R  �d��%ӂ��86��^��<ҐC���?   ����,)��)�FG������3�g�^th�  �~T[
��08+�Z�q�z���  зS��X��5@/���zOӴ�Y
  @���L��Y�U-ك^S���~��/I  �c
�I0HgB)����Zl  �݉�~o�)b86Q\`�
99�R�
��y�  �~7t�*�c5�h��
zϮ�]�׊  �w�Dx�cV�ܡ�l(?��  �~WkU\`��(�Z��z����   ���8V���zN�io�  0�Y���a��)��Bo��ܧ�U  ��8~��|�&��,O ��SJ��  0P����c���'B��  (%�QR���_����#�vg�  ���:Sǐ� �@�_Ao�T�(��   +��M����B赫�j   7J���S�f衛vS�  ��K�^g�ab����ȼ��b��g�=���ψ  @��=�.�	���/�ȜY�HR3�l(��H  D��r��u��.y�!���1   ��8k��{aK󠧮��	)   ���D�u�UR���ޱw�=G�,  \`P5��B8A}�K���|��H:r   vVTc�����U[�g���'�   ��V��q�Ưo�zy�IN7��#:q�  0�J��=R�׷֡�s�d�!��02txt�  �A�.U�5}[\`
��:�
z�
�  0�jS&����-�-�C�\\���A  �$i�M$�~}a%���+�c��  �������S+��7�v�ȧ�   ���s��o�B�q)����!  �$5���q�[��&�J  �?-x��='�a|�����II�7��}M+��  �z�Ƨ/�#C�lh�7�T  �w��y�Ƨ/�v�<��BOh�Z�_  �i5�aRgf}9cNK�����rQ�	  �x�"��9sU\`A�M>+  ��,U�8�i�UX��bU\`  |�Zm!�V�����X�  ps�3�0>��|Y�B/j�~N
   �g���^(����+
,貚|�\\��$  ���>M
c�wV�&s��dh��J�g�   p�Z���O^���w朖�Z�:�_  ܏�R\`�G�X�2� w腛qi+�   �w��8�]�Uj� z@�i}^
   ��&�Ja�����X�ݷ?k�&  ��Q����{
aS<���RR�   p�j��5�W\`�(���7�|U
   ���Q\`�C�_�=���q�Q
   8s:-�9�M?XK+t�6l  ���y���=Qcӏ�Ɇ��I�  �(�l#��*������\`X����#7I  ���ZrsV}�j�ωIچ���Y.�n9   E��U�u8�m�n+��W   c�Tc�WV;tYI�  05��06}U\`��6����o�  \`L�k����j�X�]��*�   ��
�1�X��dH��F[C�@  0�T�����x����&  ���z�1�X��Bw�].�1   ��Xc�WV����"   ��׭���pt}���X�ݽX   �D휷�y�c�gVX��;o�  \`<F�&��*�j1���K0�[R   ��&��1�X�DC
]�kQ\`  �CS�X
G�7V�&s��6��=�e!  �����[L��8�	��Ԗ  \`jm)�Ơo
�C����.�u�  \`J��B8}S\`�j3�pBW�[���b   �R�P
G�7VI���6   �OMQ\`�A�X�Z��u�   ƫ/��������n�rKvH  \`ܬ���y
a�B��ͤf�   �M�5�9g����(���j)
,  ��p�gV�3����\`��  7���E��et�X   �M�_���ၵ��X�ݼ�  \`���=�p�9gߌv���n���-  ��ՙm�Q��
,g\`A7նX   QJ�A�G�7V��j�3��  ��R+���X��{P�  0�V[�u�S\`�:�pB��9/��   0~���E�X5Æ�fW)�b   �Z�\\)<�~:�}�pB��>  0Q��#��OV�pB��  �Ĵ��:zF}�Z����9   ���)V\`���D   0Q�XG���]��   0QV\`M�XE�]S[�
,  �	*q���M��8����
,  ��O���:�>Z�U�����H��  ��Zb���}�R���n)9"  �	�U�u}T\`�a�	]���Q)   LpNU�~4�B��t�   01�£��B���6�   &�
����V\`  L�XG���]Q\`  �Y"x\`
,��5
,  �c���    zXq��Q�S�5j8�kw7[  �	��TG�v�t�^��  ���ʜ�hX�dp�  ��bNuT�T\`9D��:O  �(���
,\`�$�k  s��M;�祔�	]���!)   L��(���jl!�n��%  �	S\`E�X5�B�&�#  ��*�>�V�+��k���  �D9W�h�h�Cܡ[JS��  �8�Qx
!p�J�  \`�XG��&�X   ��
H��3O   ֈ���S��w�Rs�   &L�qV\`Ǭ��(  �	S\`E�X%#���ZS�   0E�u�S\`�r�pB״��,  �DTg\`Em!l�N��sl#  �+���o
����pB��t:
,  ��Q\`E?�ntQiU  ��(���o
�jtU)��   0!
��p09W\`c  �DT�Q��
�jtS)
,  �	ͧXG��Ѷ���X   RXG�7V�
,����
,  �	�
���XmtSS��  ���J�����(���J�b)   LdB�����g\`Aw=H   �WjF�������-��e  ���ԃRx\`}S\`5�etׂzu�  �8���:��)���X�eGڳ��  �&����Z}�ZX��J�Q\`  �S����;�r(�aC
�SS�  03����_/��cH��W\`�V\`  �[���(����wR�b  ����:ZB}�z�6��=�+�   �=����h�m���B  �	���h���*)�Bw)�   Ʃ�<��h����)V\`Aw�T��|1   �C+���϶6
,�#��)   ��XG�o[X�e��r�   Ʈq��QY�L�Z;��  ��fR�E_XMm9�����h)   �cU[V\`E�XV\`A���
,  ��̣Z�^)<��*�f7�X��;�X   �FղG
�����tv'�V����zMN�  ������:��z
��4IvV讑ΰ'  �Q�G��:�V�&���7��,  �1:�Ȃ{�p�yf��iX��j�,  ��9x��rD��
�Zr�a�._��V\`  �me���]�U�oV��uh  ��&Pp���BX����ZS�   pTV\`�A��j)����g�܇�  ��բ���;+�z@�ݜ-  �Vj��p����}ӰB���y�   �:y�k�����9t{�jh��7�(�   ��!�c�g\`=3���mh��jʓ�   p���Xc�����,貒<�^�E�   ����1�ԗ����ΐm�   ��E6&}Y\`�R��A�  � J)wI�������V\`AO\\�E�  � ���R8�>-�l!�^P��  x�yS�XcП[���^qf�D�  ���t����,���R\`A��cF=A   ��ȇ��{�0��e?��Y�#
,���'K  �>ݕR���?�>#�$�cx�n2%
,  ��Rc��X�}��n1����<U
   ����c��V��ᅞpf�2K�   �}���>.�Z
,�
�34�<1   |�l�X�5F}[\`�T[�W��ZX   �7Y��p����*�-��C7��   �ߕ4
�1��ktxH��sW~r�@�	  �4����-���<t[�#�z��蜡�b   �/���p��wᏤ���z�m�   ߥ�s�Ʀ��o�C�\\�-�  |�Α�ۥ06}]\`�8�zG}j�<m9   $Il^�n1�M_XU��d�Ȣ�ǉ   I�-�]���-���9X   IR�k<����4Q\`Aoy�   �R���q��k֑#�$��z��������   c�Y�5����H�GRB�8y��O  0�X�2 +!�W3�Ҫ�H  �Z�5}_\`��/f詫�b   ����X���V���a����zM�  0�j�k�V�Z��eV��^%  \`������q��k��*��ה�s�  �Av����Ʈ�W\`���I�j��F�  �(��Sk@^�UX�[}��9g�  P
�q��T�C�i�:k�   �Z�mR��(���X�kJ��R   s>T�Ia|cV�X�{����  0hJSo���D��I�ГN=q�\\1   ��i��Ia|c�'B�^��9B   ��X����j���<_
  ��9xկ�S�30V)
,��2y��g=^  � �5�T1���XM� w�śPi�+  \`P�������
��/n�ɫ�d   �Z�k���\\�ƐC�y��+�!  \`�Z�Ia�g�Eٗ�&C����\\&  \`4�Z�5���Ԓ9���<G
  �@�jk�Ư5Xo��C=�zM�  �wGZ#V\`M@k�^�zS��~�  �>���|�.1��@XCu�3I�a��SS�#  ��'>V_M�\`m!�8{J��;���   �=�).7A���0M�6B�5W~P����e�._�xi   ����&f�
�R�'B�8�V޶�qY��Ci��R  �V)
�	j
�k�z��fN~z�y�������5?���[�  �R�R\`M��M�f���CW}��Ҽdת|i�������1_8_B  @?jF�(���-�Oˮ�l3�Ѕ�uJ�y�����+��κ�?Sk��  �G�7�?q�&f ���T�a�������O�_xt����s%Y��]:[b  @��}��Y3
,�F�99/ݵ*[�,>꟭ɉ'���  }�V�1��ƓaZ.������=7;��/�*��  }�x��7���k�h�3�cP_?L�{�p~sߓ���K'���9�s���ݒ �����R�oJ���r��7���$&f W\`��rW'���q���|��-��d����J \`����R��iuF��:������O~�|>��v���Vgޱ~��� \`2'�Y&蚑{�,�&�c��
�oZ
,�LGj;o�wv~cߓs(���+/:��u�, ��)V\`A�|�ז1L��X�)�4�09n���+v?-8��I�?��I \`��X�]��<��'����g�=�$wy����S���k����/�5Y��%e �c�����%���)_�±�3�JjR������O<&oܻ2���T����x�WK �������tOI�$�c3�+�\`�����O�>/�:p������H �Xg~�B������66Я��s�\`��?�(/�sa�4zҴ���<gٻ�w�� &�Ԝ'蚑�F��Bx���:ntK�#�pt5ɻ����{n�ifO��P�%F  \`b���:7ɓ$]��+���1��<5�|�� ��fv^��)���I�2�ת�� &lޡ{�'�%	蒒/
�ؙV�����	yŞrݑ�>��a�  ��l�n^�U�5��*�� w��/:�����9?wt���/�0w ��͞�tO��'��X�ΐX�=����ʽ�����h�ۄ�� �o�嵝��I��5�rt�d�8��K�^��{+����9>/�}A6>��~5�� ��]_;pv�%]�g���&�c��$)���$�����ջ��7;�{�R-�թ]8E \`�j�sD����/��*�c��J���	�Av���;�>1o�wv�v/���X���=ӈ �q�\\$���D���i�6J�A�����r���/�O�_�Jy�Q 8�U��PO �.��ɣ�J2��7;�A��#���/�ͣgү�f����6z  �=���$%]�S� �ɡ��� ������?=�q���[�g�h~�( <��ֵR��:�n�,�ɡ��%��� �љ���}^�u���ԓk����y�M ���4ϐtu�r�'~��]r�
��hw���E߻adQ^���|a����Rf��Z?eD ������Ĥ��tQi� �ɣ�����%nO�W$A?jR��������{��}�j�?���y�|� ��fu�k�I�9i�
�I���.��FH��W��+��&��^�Ió�� �Ǽ9��R�n_��^
�G�����Wn=>/�}a>z���bk^�����  ��R.tU�5���&���wi��5II�>|��y���s{g^?��G-{�.5�  �墷�{bI"	�r˕돿G�G���o���;��%�Lv$��m������Ci��u[��: �w}?��H��n���R\`}?�\`1cmo������>|�^����;�� �Ǽ������a�>�Xߣ�3�
#�����#'ދo�7y  $k�z�)9[�]�Z�>ٙ��k��ǒ�H���&yׁ3�=��f��f���._�x� \`�5��J����0#�(�#p�d
��Q.ʾ$��2#����{W�O<&�\`O)����w @�}���
o<i�&���r��u7u��Kv_��>EIR�#�/_�hA  �����}b�$]���)����U?$z�G?8��u~n���i��8 X����K��&ο�
��0���l���HZy������}r�-��S^��=�}� ���5�uB��k�F�5���>������JI�Kvt��w���>\\������  �5o�{rMVK�n�s�ܧ��~�)��3>3�(/�sa�4z�0����+/_w�  �ARӶ}z��7�_�O�O�u?���G��H��~I�u����ssO3[ c3�4�� ���h� ��)L
����.Ξ$�J�n�_��?��ȟxL����
~œ��y�� O{˽��\\$	���������FHwl��W�~Z�9r�0&f�=T~Q � �Uˏ'�t_k��I)LQ�"�M�R\`1��<��b���9NǢ�UVa ��'/��omx��o�aj(��싏|�&_�ӡ��?=𘬿��9X��ɸ����� �~��7�}L�e���%����Q\`-��K��������}^�u�LaL�����'� �WM)/��Vu����+��%d!S볣�����K�'	c*�q%�% ��__[�䅒��Щ��WS:����ސ�$�l5�����yJ�n�d�<���~�j1  ����/*�C$=�����}^SG�u�9���J�I��ա���y���e����F�j�55E @_�U�WIzC-�r�kˈ$�p^'�1�k���I���qy�����>+���y� �/ּe��I�#	�M����k:M��R\`2\\y�Ay����s�0�[)����^3, �Ԧ��$Ρ���o�XSL�5s�~��$���IɟxL�߻,�@��Q9��W� �/�:kd���k����ʀ�����O�9/�:p�0���������  f�U�u�))y�$�G��ە돿GS>�c,���I
���FN��w_�/��$�Pk�:4�s�  f�$�y����e����ǘ�^{�ߒ��$�
,�����{n�nM�KJ-����u�H ��V�߻(%/���$��$�����Zl#�ԡ�ʽ�����hu����M��� �9���zU����#�cb������l9����qy՞�e��ӄ��J��'��yO� 0�����S�ZI@��������S\`�ì5#�)�-��|��)y����Qg�� ���'Y��= �1��೓<L�CZ�F�5�R��I���IɟxL޸we��a��O^��/�\\ �̙�5?#�-5E�5]�@�S����rO3;?��ܼ������|�sO� ����ƾǧ�"I@O��#G�5MX�4���O'�vI𹑓�����#��1S��\\GZ�* ��gɭ��$E�KӉ|v��wKbz(���]�����$������{n�j< f��5?��w?�	�  z�ſ���R�I@ϱ}p)�&2�-���0�ԡ�y��u�3Z]>}��n���7� @o���%�%	�n��W��|���hJvJb��֙�W�yZ69M}����-���aI  ���ݹ �k%=gt�ȡO�a�(�&��H:���;rJ^����:�@�z]���O��ϗ �Kf��}e�$=6H����O�+������G!��NJ޾���q�����g5�=��� �eV�S�󒀞,l�f
�	j�:W'�!��������yJ���#R�1j����'K ���}�eIN���&�(�����rQFKbV�����y�U�~d�0�PIy�kV
� �u��vj�EI@O�?g��O�az)��A-���������s���-��t��;N�91  �t���<ə�����ï+��0�X�\`x��J�͒��P~���y�'fĥ1�J-���=�y�$ �nX���R�K���/�^)��g�~�j�?Ha滭3?����l8|�0H�y%��HM 0�>6���I'	����|D
�O�u��&+���㇗敻/�-���]��~��b  ������V�I@Ϻiӯ��51L?�1���#_I�YI�<MJ�y��yý���:,�_����y�A  �����<5����b�U�(�&g��0�fW�������G�����l�ɳg��& \`:����k�fI@���_u�k5��>IG3�WFO�+w_��#���X>�~|��?�ْ  ���7xy�GKz��:���b��$(��=�7���C��5������\`y�����l�� Sfٟ���&I@O����K���;X����F���v~k��y�'f�۞�{���K �T9��}?Q�3$���>�Uf�dxd���D��fg~^��i��C��*y��x��% L��~w炔��+�qM�:���X�5�}f�&�C��-�8�4��}A��Y(�]�;�y���
 �LsF��rj<�z�7�����Mݣ��D��l#�MJ�y��y�ޕ���ɲ�Ӟ��b  &˪�=�����$��Տ���"�$j>�$wK��v�������/<:M�@��ϭ������W ��	�h�I<az}PZ�B��"�<�9�8̽��2zB^���\\d�0��O���ɗ�{�  �c���=!ɋ%=��qG�mCw)�&YS�_J�;����f�����_\`1�淚��]��-
 \`�j�I|��޿Z����r@ݥ��d�/>��$�Kb������g����oi��y�4�/� ���~���'�X0��ˠ����@-y���7;���=O�?TL��X�+����% �Ǫ�uNJ�}I���)�_��}
�)0|x��I,/�b�8rJ^��i�yt�0����)��^�ξU \`����_,����Sӂ�b�>�T| =3{k򏒘5ɻ��7�]���,����=y�hm�*	 \`,V�ց��7Hf��}�{�k����F8��Yy�ާ�O<&M�@�	��u+���ϓ p�B�I�f�V��)���SSgd���$19�:z|�x�JO�W�.�,����{wfe]����ϙ}FPpAM�
Eaf@rAfpIM%s��m3k�%�~Y�V��0�\`\`nɒ��(Z��"80��s����&"�,gy>����"f��9�}���}f�N
  �%#�o:ťG(���� Cr�
���]D����I�gx�d��#�y��sH  ���[<ǥ[)�nL.��P��wJ�Qb�uxD?j:Z?l�v�ɮd����  ���MM�%���:B\`%X]�Fi���ĎY����ܶ�����+Kf��Q  ��)�n<�̾C	 ��9�#o	��.f�s�Ov�/7���⽉����]鴲	  �n� �+I�� R�;���BB$X],b�H��ۺ��i9D��4D��l� U�<,   IqC��FRH1�!Bra��կ��˂�)��6z����X��r�B> ���a ��N�����J	 ��'�?�ɅV7�*���%>�?�t��'����@��yX  d�,��Iڕ@ʝ�Ϫ��:$X��F��%��ز���%�׻a>1���>�~H��C	 @fy]�Y������%Bnt�"�6"|T����h��i��=B��^�����9�7)  �#o����~A	 %��q���dH>��ItT�I��fk�\\]�p���Od��Y�ꊚ
&�  d�P�m����zL>�~��(�|\`uכ��n�5%��:��y���8�@�p��ox⇔   ����i��΢��BY
��n������^�랖C��MC�ɳyA �vuIu�xB  ��N��yo�n����y��dHN����FsM�ğ�ɳt��!���p�2^��݀�\\SQL
  Ҍ�%��;I�H����EU�Crb���f�j��H��^�r�I�k�^�  )/�Y��)  H#oh���є R�)����n�3�c�L�e���\`۾��p�V%����쟝e��Tp/-  i\`Ե����ǔ Rښ�)|�ɋV0�m��3v(���G�M��&>x
��������g�   ����s<���[ �������H^�z@$�#�����[��k�SM�ll\`�G��J��.!  �����'.C	 ���|�\`�c��o��K�#��X_]�p�^��ʆ��K���(N	  R���5���rJ )oՉ��'Ȑ�\`��hG�ג��h�{Zѕ�iC���]���4xz�@R  �:F^ߴ��+��@,h�WUYH��� ���iZ�Y��4{��n��[W����X���;n_R  ���Wy44UKړ@��M�P!�1��I�nM��D/��p��ھ�ؙ���O"jPSQH
  �|m��\\�)����O)|�)��%A��>%���������}u���kU�\\:��0��px�  $��7Q��(���J�z�����T��;���#����jS��t��Mk���  $�Q7��g��s��t��M'Cj\`���"�:�Jz)U�ߵ�\\]�p�jZd�]�+%3�'� ��1���Db��>� ҃������w)�\`�03�K?O��uY��.�x�^��ʆ�|��וT��G  �C���[]*��N���>�J\`%����]��N���%��r���8L�6�]�S��Jg��"  =��뚿*��)��M����Ȑ:\`%�*�4�K�����5{��l*��-�+�V��e����z쑤  �g���e��N	 ���Rݼ*k�D�\`��$���m����{z3Q��N�~l ���6��T�'  ������u��
H3:��X�����6���d�~n�W6��7�l���k��_M�?5  ��o�,�I{SH;�<>Q�R�$KD���DO~	�no9\\U����Q6
�<>D�/�5{� �.�n훚+i(1�t|���UUR"�0�J"y�o{C����G�s�Ն�tO�!l 	�t����GM��G� ЅN�Q��Υ��<���T� +��H���߻<�W4��⻱��607�����
�� �����\\�?���k�'M��eJ�XI&{Tl��ǻ��+մ�+7��a. H���������y>oZ  :���K��.�I@Z�M����s� �iw�=-���R��|���KH1#����/���  �'_׺\`~��|j i��0VPG����"	Ek�_�K]�w��(��
'iA{?��댦�}�TU�r  v¨7�R��'iOj ��e��UY%R��$dU
MvCW}�G���E
'��D����a��Þ�U.#  �ox�熉�yrE
 �E��
���AR�E�e��thg}̈́L�i9�O��K_>�RUU�q�  l��*�j�)y95����)�Cɐ��+IY���޺0W�n<����.)����N ��{,��g���Ye����B'�e��Ǥ7v��<�NԊ�nD���l������2� �Ӎ���;��N	 #Δ�ڣ-3��X�$�[�D�P;~�K�i=PWl��a.A���q��+���	 �d#oh���n��!<�����	��\`%��ޱ?�����������|���f2�iBӚ��a� �Ǎ��q��~/�d��q$���4�d#��h%��������3Q��6����{�ܽ����}�1� �?F^�t��M���1��u�2�>X) +��䫶��k�^����/"���Tٴ����\\�E
 @�yC�0��Hʡ�A���;��\`��n�ڤ�_���������MC��U|��\\���>��ќ� 2��5���J*��QZ��42�X)"�����[��6�9��M�tO�!��1&}�wcA
C, @&~}�1�C�zQ�,.�gQծ
�H�Re:F-r�����X}��$-��K$ [9z��7�=\\\\S��;  c���i\` =*i7j �'��N���'o���s�
㉬7$���?����6ŧ�/$<����"  �
�a�aA,�i/j i�)�'�!}0�H!6BM����QM�T���fx\`{��'�N+�c @�um���^���I����#�D=~�WN�����\`G}6��Kf�
"  ݌���pl��=�d�zG�\\2�X)�N��7�)\`���2=V2}�)�  ��Q?j��K��d��UY��V
2��T �	
��+H Huïk.	CT</@�j5G��� +-�P�����N�c�%��H HU#o�tB\`>_|� ���5}��]�S"�0�JQ��TIN	 � "��Kg��H
 @�9������C�v��H�n�Bz2����9�Τ���)�s��F,� ��w�uMd�KR5 Hz|���ɐ��+���H
� ��ؤ�5}<fΙ�i Hf#�k��L����s���V
[:~��j)�����G�-���O
 @2:������6�3 >d����#C�b���0��$n�ЩL:Da�dɌ���  $��*N���VI<��G�_�n��d1J�/X)���s��ҽ� �v��C%��� ��F��9�n�.�˩�4K�ߐ!�1�J�A0UR+% t���*�Y�UUq�  ��Wmܭ���Qs�E
 c���ɻ�'Dzc1����}�d�S@Wqו%���)�7&� ��4�GmƲ"O��xj ؂����ɐ�\`���D��&�O	 ]�̚���8�3�  t��׵��%��" >I͂�yo�!�1�J+Ξ����� ��1D�,��B
 @W:��Ɗ����v��O��3f[� }dE�f��E	 ]ʵ����겯 ������o�JfՒ�u����ѫ��!3	�KIu�$�M	 ݳ�н^�1�~̼b  v��*ϵ��ߙ�lj �4&�:J�_(��+�|6��Iz� ���k�^\\:��@b  v�	�7���cx\`=?r��d���LmemB�k(��-)�.M
 �����,�ӒJ�\`[���2sJdXih�Y�f��	J �F�I��ҙe7���c \`������II�Q�6�W��5d�,,2�U$�MIL�t's�U%���wԴ��� �5�o񜓯o���#)�" ��K?��d1JdXijie���Ϥ�pZN�����q� آ�7�������dQ�vj舶����V�zx��6J �����겯���[ ����� .�4� ���߲���)�y\`���'���d�P@�u��%3���=�9  �W�v��MW�����	\`lʎ�� Cfb���r�:��l
% ��3ȋ�g�}�Q���  8(IDAT ��N��q���o~Hҍ�"�#���W��@��� +�->cn�ܯ��>��3p=X:��j*xP/ d�Q�6�v��L�R�Nh���L��� +�����!�eJ �a�+����ie� ���*��|}cUأ.����:��n_T��{��\\�2@��;b
�+) I���+�1�\\R @zuc�~AV�ɾ/n���:d\\}���d�R2��~�� �� T�I\\����� �a�
���v��]���N�\`r��"�qV&mlO|CR% $�*��%%3�G
 Hm�ݴ�h�uMt�Z1��y�"�	�X����ǒ�M	 I�%���#�ϟwO39  ��|ݦ��"wI~05 t�I�ݶpJ�� W\`e���ص2�K	 I�$]����|Ɍ��� ��0��sO���FY��+ ] fp��o��SZ]~���@	 I���  ���i����hj �
&�c���I���Xi��G�%i	% $���tIVv��⚊�� �e@ME��~������ t�X$��H|x��4�zܱ��I^ ��K�mk|����&r @�*�Q6H��Km=\\�k�� �a t:����_�X��ew�t>% ��������� z�qޘ��%�{����ȿ?��Q���i?�H :S[ԃC���6)�o�2������|�1����A,��gΙ�� �=���O��7&��������9��4�X :��~�pr�7)�c���Jf�]&�/) ���쪥g��#�� ��1s��m��$��mY7d5~N��/s�\`'XS4�HU�ZZ��x�{�[���~%�g) ��%�]%3���8� ��Jg����G^�t����cEO�y��f����L������2^񌲡fzR4��v3�q�"?z���� �sM�$�"��wx��+w�$e�CP ۫�#���ս�'>v|!$�xF�f�� R��2]���Y� �߀����0�ԥ�$v�2#��4�/�F
\`;|w��Ȁ-Y I�j*v����K֗ R�K��	�|�ٳߢ l�ҙec��sIv�׎���5_�%z�V��n~���yU�B
|�k������u% ��&7�RC�[�'�# l��ie�$"����]���>�[s�"m�'2����F	|����%/�{I�) ���O������+� U<oL~Ɍ�DD+���+I
��ռ�uj��g��$oe������G�T�=R
�Iʢ��8Й-�п�t¬�� ��>�]�VI���ߟ�8L��.�y����t��ɅwQ[}�� ��xF�
f~5% ��Х���\`�S���@�ߕ
5ӏ%����K��3�[}��؞l ���0Vp�*��[� 3��"/�+$D
 i��L����9g�&r HwC���
�s�<����\\孽HYͥl$ ӹ��\`j�<B��0���7��������U&��A�����= �ݹ��	}�HǷ������u)��q�rߛ )�F2��-�\\8�ض��I'>���5�ٔ ��^��[KϚ� ) ���w�[���z��O��K*|ϑ���_s�,ы
d�����zR\`[0��VN�����5 ��G����	��!�T4��";7LL2�5�vO�EI|W对L��Cؘ@�p�]��O	l�ؚ��e��{J Ȍ���94����Z�%@j��
��??��~��~iD��MP��Sخ@�k
"���n�?I�m>U'��e%5�˝3	 ���0�� @Ҫ�
�{���?�tX:�hY���]{�,�c;i���ΟR�=J\`�^7��8vƙ�-�BR!5 dw������	���@R����ZI����:�R��+t��6ҍimNG�!V�����/\`�T���n���4+�����^&��P��K��׆	.�jRF<(��孻HѦ!� ��zw_�\`J����~� ۤ�*(���2F *!iz$�k�9{�+� ��Td�zx���+i�L\\��4|^9*%��� R��0Vp��*���D ��К�#a�LR5 d���昇?^2~�r �
����[s����#�3��#��_�k�&K����0���pJ�Ô��\`���;��9n��]K	 �$-6�MK*g�/����:��=�}�,�L�����%Q��5_S��b )�]-�Z8���� 	�=�/mZ��I�� �g�I�|���^=��vr �^���
]&�\\I|��'��#��P����X� �%$4���� v{}l���q�M���(5 �#ޖ������1�� ��e%5e�������vYM��[w��Hf�\\0��
B\`�^F$��(�Q~��O� l�&3�1j�����}� >��F���Tp��ߑ4�";&�����W(�ؗ@r[o��?y�����\`��2��";/��t5 ���kf(��~¬g�d�cg�y@<.���o�I��0G�뾢���� ���z�)��v��D�>��^�n��[f�o�;�=�=�� 2CEME�MG�u�K�$E����6�P�{�Ȝ'\\ I���X���*I��� ;���l���( �l��j)�u��9/�HO�j*��H�9f�5I�Q���U���Ĺ�
H�[𹅓�
��v���ãM�w[,�!� ����e����tG�@���
J_q2W[���&Q��5�*�z$1��[0��b:����$��\\=��@�2q+! �����6��|��URK鴲=�e�P�~��jD9ʔ�p���3����u�@ga��NQ<s�7���� ��JZ �=y�xV����6qלH��ϕ4����m��u���� �������Lh�9�������Uf� :�F��&<�{���'dr� =�xޘ|k�>�]M���,�$� ����\\�H��� ��a�\`Т*����:͐��φa���]� ��m3M���3g�z�@7��
��x�s��J� ��()Ƴ���y��t"-�nxǹ������J
t6X�T�3Ɲ�fwR ��P�S��ݞȮYq���It�;�Jj+J='�t�������6����g�<J��ܻ\`J�d@W\`��NWR]V'�� Х�%�o�����1��$���px�ym��.�)����,
E�R������|c���R�.)�\`��m~�i��$}� �-�$=a��A�~f��5$>ݰ��������%3��=���D���~Uі��t&�KL-�5!�e�o�+�L{���a^c ����6�6uOU־C�?��T���H���4VR!U2s��p���W�8]:�3'�
>WUe!)�u{n���T��"�� �Jzʥّ ��le�$A�q��eGE�NU���~�$�IR�y���]"K��qq��d�w�F
t%X�2�j*�:�p�IGP ��2s{ ���E��{zшE|�5�����٣\\ᩒ�*�b{(�
��#�#ܯ[0��B��1�B�*��8���iI9� ���Q�|��z��'��&I����y~nsn�qn:U�S%�y.�o���u�)��Z ��0V0pQ���]�;�\\iu��]�9%  ���L��pG{�_�?�f� Y
_8<ڲ��1�t�;U�o�0촬M#����2�"��ܥSN)�O
tX�ݚ���|�ܿH H	풞�����D�V[Y� z����-��j=փ�x�/�X��ut�����_}��x_b [_�ݹ\`jᅄ@wa��n1��b�����5  �4Kz�LOHZ�N<����Ȃ�2��{��C%��%�Jʦ�m��(TޚI��$�e��̏x|r�:R����$@w)�Y6�]K
� )-.i�d�e��Y�xIe�j�\`G���kGG��.�Hv��C)��_(���?C�Δ�l>��p�3j�4J�{��@7*�Yv���� ��W͵84{���}S��'�#>�?�^�ڒ}L�|��K6X�a���A���T�گ�� 6[�\`r�H�9)Н\`�[��,��'d6� ��:$�(�r7NAdynN���1��4�a��}�m::b���*�\`I��+��������_}�"���%�G=zu��@��I��V:��@�h��]� �]zU��2-��@���L���4��Ee�V����0��p��t��GH���f��,�w��7�Dd��ܿ�pj�-�@O\`��Q:���]3) �l�<|�e�0�+nz�=�{{}��������yc�՚{�%�=�a�2������)�L��x��֝'9�+��;^/>1�bU���@��I�;�w�ɾF	 �V�Tޕ�EI����2����h�rmem�@�cXME^<�ST�u�l������~�>�y#�A�~�_s����@�h	��ы���*)�s��@9���9�n�_�R15  ۩C�jI�2�PZ��K�w�*b��H�<UYۚɑ����E��H��lw��nn{�k3�åL�_�q[?���0_�k&)��b ~��)E�Q=�:zPq���"��zQ ��\\�ezW�ے�6B̭�L
	����xC$n
Mّ�+k���G8���9���zk�KY�.�T��a)
�{��"��2�n�]�������\\^@�.�r�?]9��O�4Ƨ"I��@+�YV&W%  I".y�d
&mt�Mҿ���0�Y���i�*�B�qK_�]�>�5��O.eI*��?.�Y��B�z�T$)�&�[��H孹T�($�M�������)��\`!)�T��"��   @J.��)�e��L��ۿ�\`rѯ�d�u�H
�q�o��)J    %�g#Բ�����1�L\\]�kB Y0�BR��tG,�p��
�   @*r����4��y�<h'RY��Kx��	,$��'����Β�Ǣ   e�
�e�*%�W)�e��WH6<I�d��˭�   Hia���^���RZ e��хW���WH6\\��������Jz�   H��V�Z��Mm}�7 E4D��W^!q��Q�&�i_*�@j    �EZ�+�e�D/b i����S�fRI��$�Ր�G�
���O
   ���+����\\�H�!�@�q��N-��HV�B�����93�$J    x�}5��#���31�d쵎�����Y�Hf��^z~��#��TL
   �<s%�_T��Zі�2Ei��=���ޯ�Ɍ+���|c��%=F	   ��X��j��{
��!z�U-���4��\`!��O�#	c�2��   Ha�j5��C��%z�˞�sH���@*�!�H�����	Iy�   @:��4By��OyA7��c]��&)�
�;"e�[�һ{��O���   �I���/m~.��]Υ�,�\\�8%�*\`!�������T�����   @:	��+Z�h�
�]�u�©�?$R	��B�)�c�7%-�   ҍG���j��gINt�kLz#'�~9%�jxRҠ���#a�D���   @:�j*U޺���[
�ibf�I�'�?E
�XHYCk*�H��S�v�   �Q�K���Pб/1�	��S�n�R,�����ђ��s  @�.�������x,vʼ�ΐ��"%��GJ[U���~e��4�   HK�P�p���FE[���(cl���b�ѯ��m%R,��wg�\\ܯ�}�TL
   ��0�M%�_P��HY�Ol�v��^S�:)���#=l�s��E�   @:K伮�}����&&��«�)��-ib��}�IQ   �-PΆ3���2�u����.�\\PI��^Hώ��>T8F�Fj    ��j�m�Z���<�Bl����i�&���L8WR�   HwAl/孹B��}��k��s�,#�qG�YU���~��5�tj    �y�I���$z+Ҿ?A �]�\`j�<B �0�BZz�n�~G��9j    �Y�x�r�э��)�i1�l�����ɀt�^
i��r�wL�N	   d��.ղϵ��:bd������җ�Z��"�Ib    S$r�TӾU��@�̲Aa|�#߶fR =��@�+�>����'M:�   Ȥ�^N�i�^_!c��Bɾ�\`J���@��рP\\}�A��S�v�   2I��孙$󉑦\\���)�?��,d��3�O���K
   d� ���W_��c?b�߲~�����2sZ ��c$@�X6��q3UJJP   �$�Z��}��]�J�tbZ��?��2A��$��^�����H�5   �Q,T�\`���u�j9��\`�{?��_����챐qVխ��W6 �L'P   �&�~[����)�����*M.z�����ޭ[�\`��O�A�   @��h�b�O*���=	�j�O��pJ᝔@&�X�L&��}'��!b    y�I-{�L�}j��J����Y'�H	dX�X���y~{�IOS   ������j��3y��ɿ��G���Cۑ���t��Gvv�C�  �L�vWޚ�i?�ɹx7���G��M
d�{ ��{�훈����   2v��Y�Y_�썧#��ʃ���?K
d����fC��F�����   2YV�q�]�eY�C���&�8JQ5)��\`RZ=��e�%Q   �,h�O�k�P��w{t�n6e��(��/� ����Ǟ��%�R   �\`s���bE�K���4s��xh;���l�����   2�mj��j�S#)$H��Ź�|� ��	��[U������k�q�"   2\\"�%�^S��h�g����)_����f��O�n��e�ʎx�L��  �Lf�U��iE�Vߍ ]�1H蔿|��
R �� ؊wg���>�G���   @�Z/zJ�*�~=:_ܥ��)|��G1�>Ū����O�����   2����P��Fі�d�Ҥ��ʯ\\0�h%��c�l�Uu/�ߧ|@���Q   �)QP�H�
E�iV�\`J�O� l,\`��]���_<���bj    �G/Z�H�����	��%�\`J�7� |���62�җ��Ԥ��    6�M-{�Rm} �v/3��0Vx)%���
,\`{,Z��N9a��%�0�    �%r_W"�EZ�<� �fI4��K�X;)��3 �o@MEv�{��O�   �Ef|W对L��C���R�Ec���*ZK\`�1$ v̀���0��4�   ��xD9ʔ��EZlٺH�8�/��z���a��5ٹa8ˤ/Q   ����c���Bn)��FɆ/�R����c��n'�-w�y	   �/A���W_��cbH1��,�R�0)��� �?0:����ْN�   �_�\\孻HYM��\\�]:�»yA ۏ�I��T����w���   |\\֦�[w��H���o/�Z�S^��a�t��yc򃖜y�   �-���W���d�^���6����?d�;�>"й~\`tN�M�u<�   ز ��r�\\�h����u���+���N��H t�5�yaX#�j    [��l(SN�ii�4u�]�\\ 3g�;' ��^���h
�J7�C
   \`,��>5j��yК�?�쾇|���I�( ]���"�z���dgS   ز ���W_��c����\\���Rp��WZ;[���.VQSy#�t.5   �OX��9�]�e5
M�ğ�f��ȷ���
t�	����v�Wy����h�    [\`	��ȃ�O�Y�m;u�w
�ؠ@'�"H t��,�٤�   �d��C���2�]S��~�,>�.�ق@�c�t�����=J    [Y�&����RE[�·�JLv��S
�e�]�[�n�n�K���
h3�(j    � �P���׶�����y0�SV�р�� ���Z��_�kM-��   >�+����m(�d�_�#L��mt-�@*�.?����   �ɂ؞�[s�"��&˷��
�F��VR]~��3%�P   �
�R�{�)kӉ=��~Un�^���#��J����A��j    [��q�r�O�y����fDF,�:�M��}\`I��z\\���,iwj    [i?@��/�Ż�����C\`Idp���Iڏ   ��,h��[s���Gv�_�VD�3�z��N ��q���zH�Q�    >M��
g(��3d]��ex�0X@:j��]s"��K�5   �Om9Fyk&���N���z�#����6���� HR�>� ;��V�hj    �.��Q���i?�����a48e�U���.г"$ �Ӛ9��v�<�6�� q;!   �<hU��)�>�t��ce]�c��|���ՔzW\`I��T�_��'   �m���S���%�ޑ?��,=�.�)	$X@�(�.��俒�   ��"�(o��
b�o��k{�u��vo� �<\`)����ɧKʧ   �
��D���LR�u��ǮZ�ʟ���RH��2	��RRS1�<��=�   l��7��4e���}�2�fc߂s�'Y�^@2�����iezDJ:�   ��������d������
c,��8���� H=KΞ�zGGx�ܟ�   �m��S�>�W"�������X��^ɍ+��6���s�r� �j    ۸�,嬯T��SoZ0��R�}K Ź�����2�>1   �m;�v���'��D
 50��D�̲����,j    ����/��0{:)��� H#�3�G�y����    >�Y�����$�Z\`if贲C�/>�   ���wM��U���H�w0	��3��{dgs$}�   �^s%>_?���H�&X@�:���9�7��J��  �^��a��L���@J������K\\�MR�   Ȩ�ق �3��s�m����g 鯤�|��3$��   2�˧��_������ �o���#	�Jz�   Hwf�����1���}M s5m�9��I��  �4��K�Ϛu)��� �0��6���3ɯ�   ����-�P��@�a�d����]~��|j    Ž*�Ҳ�s^"��\`�dF� 7�6� j    E�O�w�g<ޜ�� �q2��	��+�.�4�   H9fu� 8����\`�~��
�\\�3�D
   �
3ݲ��#�z����@��I ��Jg���;$�Q   I�M�IK���M
 s0�������N�g�  �$[®r�q�f=C �p!���?{Y$�{����   @Y�
cxd&���e.+�Yv�K?�%   z��tFV$�
ϻ2, [UZSq��a����  �n�p�)����! �1���T�Ù���   �i�����YK'��5 0��M�/m^��:w}�}   ��?<��g�L
 b
\`{�V��s��%��   :�jssr;�Y|��Fb �7>��vY2�n��ђ��   :QBn?X�ґc^�o\\�\`�_8<ڴ��T�_#��   �)��+8�~|�#� �%� ����_
��(Sj   \`��O�?=�7���p����l|����#�'�  ��tGK|���O�X :���ã�����̯�q   l]�ܿ�t��{H\`[0�Щ�g�a���ڗ   ؂W�Pe�&�z� �WI �T�g�^d��H��   �/�y�0����@�)�.?O��%P   ������u?���\`{1�Х���f��KD
  ���қ.��l�짩\`Gq!�.U?q�˾��P��@RH  �bV��Ibx\`�w'$ �]J��=Ń�N���  @Zk6�K���I
 ���nU\\S����ǒ.�  @�qi��\`|}e�
j �,� ����
s��L}�  �6�񂎯֏��B
 ���3��b�X�Aҩ�   Hi
r�x��u� �\`�Y.+�Yv�K�OR!A   RlQi�@a��%��65 t>�@��ȗ��uG���$>�   u������t�)� t�� �EUUPz؊�\\�YR>A   �֋�,��}� �, I���̃L�?H:�   I��t��E-�y������0����   ټ��_�?k�BR �n� $5��  H��cm4��Te�j �� $���������~ )�"   �ĵ^��Xz֬� Г\`H\\��I#�  �իE�s�٤�*k�!��%� @JqY���s%�Y�n  ��E�����d��;� ��M �zJk*�r�[�^N
  �������&-�0w5 $X RZ�̲1.�.׾�   ��!W]H�� ����M�5'��I�_  ��Eam<.[^Y�� �x_ �t�C�_�t5   >e1hZ�_�t��:j Hv	 ��%g�~L�c��Hj�  ���T&�0��B�- H?Cj*>��/%�F
  ��󚙾��Y��@*a� ���,�_Jڏ   ���������E��� R
, io�g�f�]뮯I�R  d�'"�Ȥg*kW@�b� c�{�+�ե�  2�F�����nUUUH ������m��I�5  @:r��h�/}�����t� @Fz�ٻ�����JIY  ���WL�������t� @FR=���"����  RX��~R�Vx#i��\`�����
��D���   ����:c�X2�Oo@���H  �
�����K]�VRE  @�����חL��) �;X �_�8}�e}_�E��  �$�,��6�j�ѫ�=�N �� |��5ő0�٥�  ��K�+.����'5 dX ���D+�)/�M�>C  �C��n�X6��qR �D� [c�g͚��I�*iQ  @7���K�//}���� d�� �͆���c����?�r(  �H��n�΍]������ ��\`�R=�PWp�K��K @'r���	���g�E ،E ��eC�Ox�;  �����	��� >� �,��T�+s�L:�   \`�N%�Lߩ?k�}� �-�!� ��L�t��:m�3��I.�C  �
V��2m�3�� |ڲ Щ�Td���2]�=(  �K��nb�7<s�4>� �, �"j*
s~��O��E  �x����^��ys֒ �, �b��'�
"�r��%�R ���4+��<=�7� ۏ t�⚊�,�H�@RE  H{nR��5K+k�N �q� ��;����*�<1�  ]Z�k�f-� t�~ �M�$b�%]()J  ��b7�����I �� ���ȺZ�  He� �1��$QRS�_���5A�  H�=��+k�  tX �d��q�� ��D|j!  �jq��[6q�R @�c� Ij����#Y��+$�S ����
 z , Hr�j*v�$�2����^ �۹K�~�dBݓ� ���  RĐ�c�$:�+�u�L}( @���U-oZ:~�� ���  R����-��n9;��e�! �ӵK��$t�3g�z� ��\`@���
J_�Ew}OR	A  �i�f�3�nZ>a�*r @�\`� i����x��U&}�  l�ȴ�C�U<7������@ H�}5	  }�(����8I�  �U+d�yCQ˴WO{�� ��\`@4���#ʾ�̯tiW�  �\\�|3ݲ�r��29I  �1��46���0?'�����  ��K��P7-�8�Er @ja� ��?|�R�(�  2hɳF�_�g��~��� )�7' d��5őDx��Β�K @�Z.��[#��/V�v� R, �P��9�wV{�ˡ�?&@ @�0�O2ݱ�Y�� �, �t�o/<9t}ݤ/rl  ��f�\\��%n��9k� i��' ��W�=<��2�ΓTD @%=l�_\`����	� @�b� ��a5y��+L~�K� $�I5�/?�%r @f\`� ت!3�J�%f� ��" ��d�)l-�Yt��� �� \`���Ӌ:Z�&�4I�\`�  �a��K�a�ۖM��<E  ��	  l���q����f:K�. t���
����M}ﯟtG�$  X �6���s�Ƙ�I#9�  v��f������=�-r  >�� �S��8�3��&��$I�� \`��4W�;�TΚ/�� �%�  ���*(>�Q���Δ�K ���f�H�{�xάgΙ��$ �O�  �e�k*zY�g��¤ђ"T����Js�
"v׳��oP �=\` �Ű��}�aX�җ%
� �?��	L�B�����^F ��b� �v���(�s]:O�~���Q�\\3�\`����	�  v, @��������w��4V�nT���hҼ�T[�R�Т��F @gb� H
5�ץa��J/i� @Rkqi��j;:�f=�=�$ tX ��s��svm�?�]�|eV!U  )0� �X ��6��srrZ��q�N�TD �V�\\>Ofu� �)�  )c����6�7��ƙt�xf t�2a�Γ����  =~d"  ���Y���V.��T����-��_9�IUU�$ $X ��WU���X��qi��D�O7���>ׂ\`�o� ��\` �Nq����1f�w?QR�*  ���K��l^["��gO�* �9� ����6qלh��~�d_�ԛ* 2H(���R<t@Ğ���M� �j\` 2FEME�5�K�(3#i���2 ҋ�g����{���殢	  �1� d�A5��7�(m�Tý� %LzN�GC��� �t�   }puV�(
<���GI*�� 9��.-4������v#Y  �  [0��srrZ�I%�(�s�Ѓ^���d����Te�;$ dN� ���GVv�n7���������5���'���g�~�( ��>4 ��6�������~�d'����.�d��-{����7� �0� ��q�ށeg�Q.o��g|��I�iq���¬��g�G  >'�  t�a5��<<Qn�$?N�@�Px 3�����̟�����u髧=�N  �,  �����-��i"�8sf�0�v��v���["i�[�diE�?dr�  ��\` �����CW6,P84���4@\\������r-�ٳ�p�6�]Q?�i  �\\�  H����[K� s+	�&+�t�k )$$�"�s.[�nKⱼeϟwO3i  �z� �Ď�sf�h��z�5�L�H:XR@��4Izޤ�Iz.t�M�+���k!
  =�  )f@MEa��?}����X�\`Iy���l�]�^4�Jw�����㨗TU �d:d ��W��K�"���)���t���:��= w�-3{Y�+]�R�Z�f������ ���	-  il@MEa�t���dv�̎��p����Pܥ7LzѤ��}e�����̳�  Hm�  �@�����XKV����@��2�J���_R.����ޒ���_��5s5���$��bem�  H?�  �TUC�xq�����Cd:P���~��%�	ݠMқ2{M�W$��������M}ެ�tG�D  dX  \`��3��e�@�:P
�����wi?����E%l�Ւ�����)�o��J��
"o/��]M"  �a�  @稪
�_�WT�H�g��3n�O�������kOI��V�K�MZ%i�L�k���)o��3����E���T  \`{0�  ݦ��"�j�}�,e����������O��%�����%R,)4I� i��ޓ�j��u�w�l���	-�&��w�{_�  @W\`�  ���;��m���7����=	��{_��J�W��&�v���ޒ������}Lӿ��Qf�}�\\dZ�n�eZ�p�G"<��OxbCc���WO{��|  ��1�  ieXME^\\����
"�*)OR�\\�]�o�<�z���乒��$�|�W���IE�^����,����|���?ip�Ѥ�c��,�b^�I�.�Kj�3��7����d��%�C��R��Mf��6Z\`
a����F�ƎXV㊉�dr^                                                                                                                                                                                                                                                                                                                                                               ����w㌱�o�   %tEXtdate:create 2023-11-20T01:59:00+00:00��f   %tEXtdate:modify 2023-11-20T01:59:00+00:00r��    IEND�B\`�`,
                                language: 'plaintext'
                            }
                        ]
                    },
                    {
                        name: 'logo.imageset',
                        path: 'Writing/Assets.xcassets/logo.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/logo.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "logo.jpg",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'missingPrompt.imageset',
                        path: 'Writing/Assets.xcassets/missingPrompt.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/missingPrompt.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "missingPrompt.jpeg",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`,
                                language: 'json'
                            }
                        ]
                    },
                    {
                        name: 'not-signed-in-profile.imageset',
                        path: 'Writing/Assets.xcassets/not-signed-in-profile.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Writing/Assets.xcassets/not-signed-in-profile.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "not-signed-in-profile.jpg",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
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
