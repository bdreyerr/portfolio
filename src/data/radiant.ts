import { FileNode } from '../components/CodeViewer';

export const radiant: FileNode[] = [
    {
        name: 'README.md',
        path: 'README.md',
        type: 'file',
        content: `# Radiant

An app I made, find it on the [app store](https://apps.apple.com/us/app/radiant/id6464150947)
`,
        language: 'markdown'
    },
    {
        name: 'Radiant',
        path: 'Radiant',
        type: 'directory',
        children: [
            {
                name: 'Assets.xcassets',
                path: 'Radiant/Assets.xcassets',
                type: 'directory',
                children: [
                    {
                        name: 'AccentColor.colorset',
                        path: 'Radiant/Assets.xcassets/AccentColor.colorset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/AccentColor.colorset/Contents.json',
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
                        path: 'Radiant/Assets.xcassets/AppIcon.appiconset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/AppIcon.appiconset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Radiant_App_Icon.png",
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
                        name: 'BG_checkin.imageset',
                        path: 'Radiant/Assets.xcassets/BG_checkin.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/BG_checkin.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "BG_checkin.png",
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
                        name: 'CA_BG2.imageset',
                        path: 'Radiant/Assets.xcassets/CA_BG2.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_BG2.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_BG2.png",
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
                        name: 'CA_Caregiver.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Caregiver.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Caregiver.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Caregiver.png",
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
                        name: 'CA_Creator.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Creator.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Creator.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Creator.png",
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
                        name: 'CA_Destroyer.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Destroyer.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Destroyer.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Destroyer.png",
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
                        name: 'CA_Innocent.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Innocent.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Innocent.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Innocent.png",
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
                        name: 'CA_Jester.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Jester.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Jester.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Jester.png",
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
                        name: 'CA_Lover.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Lover.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Lover.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Lover.png",
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
                        name: 'CA_Magician.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Magician.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Magician.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Magician.png",
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
                        name: 'CA_Orphan.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Orphan.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Orphan.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Orphan.png",
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
                        name: 'CA_Ruler.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Ruler.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Ruler.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Ruler.png",
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
                        name: 'CA_Sage.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Sage.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Sage.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Sage.png",
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
                        name: 'CA_Seeker.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Seeker.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Seeker.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Seeker.png",
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
                        name: 'CA_Warrior.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Warrior.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Warrior.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Warrior.png",
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
                        name: 'CA_Wizard.imageset',
                        path: 'Radiant/Assets.xcassets/CA_Wizard.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/CA_Wizard.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "CA_Wizard.png",
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
                        name: 'Chat_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Chat_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Chat_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Chat_BG.png",
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
                        name: 'Contents.json',
                        path: 'Radiant/Assets.xcassets/Contents.json',
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
                        name: 'Dark_Hills_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Dark_Hills_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Dark_Hills_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Dark_Hills_BG.png",
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
                        name: 'Grief_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Grief_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Grief_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Grief_BG.png",
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
                        name: 'HealthyRelationship_BG.imageset',
                        path: 'Radiant/Assets.xcassets/HealthyRelationship_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/HealthyRelationship_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "HealthyRelationship_BG.png",
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
                        name: 'History_BG.imageset',
                        path: 'Radiant/Assets.xcassets/History_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/History_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "History_BG.png",
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
                        name: 'Impulsivity_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Impulsivity_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Impulsivity_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Impulsivity_BG.png",
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
                        name: 'JournalingPrompts_BG.imageset',
                        path: 'Radiant/Assets.xcassets/JournalingPrompts_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/JournalingPrompts_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "JournalingPrompts_BG.png",
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
                        name: 'Login_Email_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Login_Email_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Login_Email_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Login_Email_BG.png",
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
                        name: 'Montserrat-VariableFont_wght.dataset',
                        path: 'Radiant/Assets.xcassets/Montserrat-VariableFont_wght.dataset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Montserrat-VariableFont_wght.dataset/Contents.json',
                                type: 'file',
                                content: `{
  "data" : [
    {
      "filename" : "Montserrat-VariableFont_wght.ttf",
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
                        name: 'Profile_BG2.imageset',
                        path: 'Radiant/Assets.xcassets/Profile_BG2.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Profile_BG2.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Profile_BG2.png",
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
                        name: 'Radiant_App_Icon.imageset',
                        path: 'Radiant/Assets.xcassets/Radiant_App_Icon.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Radiant_App_Icon.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Radiant_App_Icon.png",
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
                        name: 'Radiant_App_Icon_Transparent.imageset',
                        path: 'Radiant/Assets.xcassets/Radiant_App_Icon_Transparent.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Radiant_App_Icon_Transparent.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Radiant_App_Icon_Transparent.png",
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
                        name: 'Radiant_Home_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Radiant_Home_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Radiant_Home_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Radiant_Home_BG.png",
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
                        name: 'Register_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Register_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Register_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Register_BG.png",
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
                        name: 'Register_Email_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Register_Email_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Register_Email_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Register_Email_BG.png",
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
                        name: 'Selection Mix II.imageset',
                        path: 'Radiant/Assets.xcassets/Selection Mix II.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Selection Mix II.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Selection Mix II.png",
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
                        name: 'ThinkingErrors_BG.imageset',
                        path: 'Radiant/Assets.xcassets/ThinkingErrors_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/ThinkingErrors_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "ThinkingErrors_BG.png",
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
                        name: 'Welcome_Survey_BG.imageset',
                        path: 'Radiant/Assets.xcassets/Welcome_Survey_BG.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/Welcome_Survey_BG.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "Welcome_Survey_BG.png",
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
                        name: 'White_Lotus_Field.imageset',
                        path: 'Radiant/Assets.xcassets/White_Lotus_Field.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/White_Lotus_Field.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "White_Lotus_Field.png",
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
                        name: 'default_prof_pic.imageset',
                        path: 'Radiant/Assets.xcassets/default_prof_pic.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/default_prof_pic.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "default_prof_pic.png",
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
                        name: 'launch_screen.imageset',
                        path: 'Radiant/Assets.xcassets/launch_screen.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/launch_screen.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "launch_screen.png",
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
                        name: 'lock.imageset',
                        path: 'Radiant/Assets.xcassets/lock.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/lock.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "lock.png",
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
                        name: 'profile_photo_0.imageset',
                        path: 'Radiant/Assets.xcassets/profile_photo_0.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/profile_photo_0.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "profile_photo_0.png",
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
                        name: 'profile_photo_1.imageset',
                        path: 'Radiant/Assets.xcassets/profile_photo_1.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/profile_photo_1.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "profile_photo_1.png",
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
                        name: 'profile_photo_2.imageset',
                        path: 'Radiant/Assets.xcassets/profile_photo_2.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/profile_photo_2.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "profile_photo_2.png",
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
                        name: 'profile_photo_3.imageset',
                        path: 'Radiant/Assets.xcassets/profile_photo_3.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/profile_photo_3.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "profile_photo_3.png",
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
                        name: 'profile_photo_4.imageset',
                        path: 'Radiant/Assets.xcassets/profile_photo_4.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/profile_photo_4.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "profile_photo_4.png",
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
                        name: 'upgrade_lotus.imageset',
                        path: 'Radiant/Assets.xcassets/upgrade_lotus.imageset',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Assets.xcassets/upgrade_lotus.imageset/Contents.json',
                                type: 'file',
                                content: `{
  "images" : [
    {
      "filename" : "upgrade_lotus.png",
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
                name: 'Constants.swift',
                path: 'Radiant/Constants.swift',
                type: 'file',
                content: `//
//  Constants.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/2/23.
//

import Foundation


struct Constants {
    static let appName = "Radiant"
    
    struct FStore {
        static let usersCollectionName = "users"
        static let userField = "user"
        static let bodyField = "body"
        static let dateField = "date"
        
        // Forum collection names
        static let forumCollectionNameGeneral = "forumGeneral"
        static let forumCollectionNameDepression = "forumDepression"
        static let forumCollectionNameStressAnxiety = "forumStressAnxiety"
        static let forumCollectionNameRelationships = "forumRelationships"
        static let forumCollectionNameRecovery = "forumRecovery"
        static let forumCollectionNameAddiction = "forumAddiction"
        static let forumCollectionNameSobriety = "forumSobriety"
        static let forumCollectionNamePersonalStories = "forumPersonalStories"
        static let forumCollectionNameAdvice = "forumAdvice"
        
        // Forum comments collection names
        static let commentsCollectionNameGeneral = "commentsGeneral"
        static let commentsCollectionNameDepression = "commentsDepression"
        static let commentsCollectionNameStressAnxiety = "commentsStressAnxiety"
        static let commentsCollectionNameRelationships = "commentsRelationships"
        static let commentsCollectionNameRecovery = "commentsRecovery"
        static let commentsCollectionNameAddiction = "commentsAddiction"
        static let commentsCollectionNameSobriety = "commentsSobriety"
        static let commentsCollectionNamePersonalStories = "commentsPersonalStories"
        static let commentsCollectionNameAdvice = "commentsAdvice"
        
        // Message collection name
        static let messageCollectionName = "messages"
    }
    
    struct GoogleMobileAds {
        static let testOnlyAdUnitId = "ca-app-pub-3940256099942544/3986624511"
    }
    
    struct AppleIDs {
        static let appleSignInServiceID = "com.bendreyer.radiant-applesigninid"
        static let appleSignInPrivateKeyName = "RadiantAppleSignInKey"
        static let appleSignInPrivateKeyID = "J4A348M8W5"
    }
    
    struct UserDefaults {
        static let emailKey = "emailKey"
        static let userLoggedInKey = "userLoggedInKey"
        static let isUserValidForBetaKey = "isUserValidForBetaKey"
        static let hasUserCompletedWelcomeSurveyKey = "hasUserCompletedWelcomeSurveyKey"
    }
}
`,
                language: 'plaintext'
            },
            {
                name: 'Controllers',
                path: 'Radiant/Controllers',
                type: 'directory',
                children: [
                    {
                        name: 'AuthStatusManager.swift',
                        path: 'Radiant/Controllers/AuthStatusManager.swift',
                        type: 'file',
                        content: `//
//  AuthStatusManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/4/23.
//

import AuthenticationServices
import CryptoKit
import Foundation
import FirebaseCore
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import PhotosUI


class AuthStatusManager: ObservableObject {
    // This variable tracks whether or not the user will encounter the login / register screens
    @Published var isLoggedIn: Bool = false
    
    // These vars are used for registering / logging in the user with email and password
    @Published var email = ""
    @Published var password = ""
    
    // Variables used for the closed beta
    @Published var betaCode = ""
    @Published var isBetaCodeValid: Bool = false
    @Published var betaErrorText: String?
    
    // Variables used for the welcome survey
    @Published var name: String = ""
    @Published var birthday: Date = Date()
    @Published var displayName: String = ""
    @Published var userPhotoNonPremium: String = ""
    @Published var hasUserCompletedSurvey: Bool = false
    @Published var isErrorInSurvey = false
    @Published var errorText: String = ""
    
    
    // These vars are used for controlling the Auth popups
    @Published var isRegisterPopupShowing: Bool = false
    @Published var isLoginPopupShowing: Bool = false
    
    // Unhashed nonce. (used for Apple sign in)
    @Published var currentNonce:String?
    
    // Firestore
    let db = Firestore.firestore()
    
    // Firebase Storage
    let storage = Storage.storage()
    
    //    @Published var userProfile: UserProfile?
    
    
    // Log the user in with email and password
    func loginWithEmail() {
//        print("The user logged in with email and password")
        
        Auth.auth().signIn(withEmail: email, password: password) { [weak self] authResult, error in
            if let e = error {
                print("Issue when trying to login: \\(e.localizedDescription)")
            }
            
            guard let strongSelf = self else {
                return
            }
            
            guard let user = authResult?.user else {
//                print("No user")
                return
            }
            
            
//            print("User was logged in as user, \\(user.uid), with email: \\(user.email ?? "no email")")
            
            strongSelf.isLoggedIn = true
            strongSelf.isLoginPopupShowing = false
            UserDefaults.standard.set(strongSelf.email, forKey: emailKey)
            UserDefaults.standard.set(strongSelf.isLoggedIn, forKey: loginStatusKey)
            
            // Retrieved the user profile from Firestore and store it in this class' userProfile var
            //            if let userID = Auth.auth().currentUser?.uid {
            //                strongSelf.retrieveUserProfile(userID: userID)
            //            } else {
            //                print("The current user could not be retrieved")
            ////                authStateManager.logOut()
            //            }
        }
    }
    
    // TODO: Deprecate this function, it's no  longer used in the view (sign in only available with apple now)
    // Register the user with email and password
    func registerWithEmail() {
//        print("User wanted to register with email and password")
        
        Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
            if let e = error {
//                print("There was an issue when trying to register: \\(e.localizedDescription)")
                return
            }
            
            guard let user = authResult?.user else {
//                print("No user")
                return
            }
            
//            print("User was registered as user, \\(user.uid) with email \\(user.email ?? "email null")")
            self.isLoggedIn = true
            self.isRegisterPopupShowing = false
            
            // Set user defaults to keep the user logged in
            UserDefaults.standard.set(self.email, forKey: emailKey)
            UserDefaults.standard.set(self.isLoggedIn, forKey: loginStatusKey)
            
            // Set beta status as false after register before user enters their code
//            print("setting the user default for the beta as false")
            UserDefaults.standard.set(false, forKey: isUserValidForBetaKey)
            
            // Set the user default for the user completing the welcome survey to false, they will complete it after register
//            print("setting the user default for the welcome survey as false")
            UserDefaults.standard.set(false, forKey: hasUserCompletedWelcomeSurveyKey)
            
            // Create the user profile in Firestore
            let userProf = UserProfile(email: self.email, displayName: self.email)
            let collectionRef = self.db.collection(Constants.FStore.usersCollectionName)
            do {
                try collectionRef.document(user.uid).setData(from: userProf)
//                print("User stored with new user reference: \\(user.uid)")
            } catch {
//                print("Error saving user to firestore: \\(error.localizedDescription)")
            }
        }
    }
    
    // The function called in the onComplete closure of the SignInWithAppleButton in the RegisterView
    func appleSignInButtonOnCompletion(result: Result<ASAuthorization, Error>) {
        switch result {
        case .success(let authResults):
            switch authResults.credential {
            case let appleIDCredential as ASAuthorizationAppleIDCredential:
                
                guard let nonce = currentNonce else {
                    fatalError("Invalid state: A login callback was received, but no login request was sent.")
                }
                guard let appleIDToken = appleIDCredential.identityToken else {
                    fatalError("Invalid state: A login callback was received, but no login request was sent.")
                }
                guard let idTokenString = String(data: appleIDToken, encoding: .utf8) else {
                    print("Unable to serialize token string from data: \\(appleIDToken.debugDescription)")
                    return
                }
                
                let credential = OAuthProvider.credential(withProviderID: "apple.com",idToken: idTokenString,rawNonce: nonce)
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
                    
//                    print("signed in with apple")
//                    print("\\(String(describing: user.uid))")
                    // Careful about saving the email into UserDefaults because the user may choose to hide email address from the app with sign in
                    if let email = user.email {
                        self.email = email
                        UserDefaults.standard.set(self.email, forKey: emailKey)
                    }
                    self.isLoggedIn = true
                    self.isRegisterPopupShowing = false
                    
                    // Set user defaults
                    UserDefaults.standard.set(self.isLoggedIn, forKey: loginStatusKey)
                    
                    
                    // Figure out if the user already has an account or is signing up for the first time
                    let docRef = self.db.collection(Constants.FStore.usersCollectionName).whereField("email", isEqualTo: self.email)
                    
                    docRef.getDocuments { (querySnapshot, err) in
                        if let err = err {
//                            print("Error getting documents: \\(err)")
                        } else {
                            if querySnapshot!.documents.isEmpty {
                                // New user is signing in
                                // Set beta status as false after register before user enters their code
//                                print("setting the user default for the beta as false")
                                UserDefaults.standard.set(false, forKey: isUserValidForBetaKey)
                                
                                // Set the user default for the user completing the welcome survey to false, they will complete it after register
//                                print("setting the user default for the welcome survey as false")
                                UserDefaults.standard.set(false, forKey: hasUserCompletedWelcomeSurveyKey)
                                
                                // Create the user profile in Firestore
                                let userProf = UserProfile(email: self.email, displayName: self.email)
                                let collectionRef = self.db.collection(Constants.FStore.usersCollectionName)
                                do {
                                    try collectionRef.document(user.uid).setData(from: userProf)
//                                    print("Apple sign in user stored with new user reference: \\(user.uid)")
                                } catch {
//                                    print("Error saving user to firestore: \\(error.localizedDescription)")
                                }
                            } else {
                                // Existing user is signing in
//                                print("Existing user signing in with Apple")
                                // the userID is available in querySnapshot.documents[0].documentID
                                print("A current user with that same email already exists: ")
                                print(querySnapshot!.documents[0].documentID)
                                
                                print("But did the Auth set the userID to something different?")
                                if let user = Auth.auth().currentUser {
                                    print(user.uid)
                                }
                                
                                // Create a new userProfile with a document ID equal to the to current Auth value
                                
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
    
    // Update a user's email address stored in the auth table (as long as they didn't sign in with apple)
    // We don't need to pass in a the newEmail as a argument, because the changing email is tied to the text field on the edit email popup
    func updateAuthEmail(newEmail: String) -> String? {
        var returnError: String?
        if let user = Auth.auth().currentUser {
            user.updateEmail(to: newEmail) { error in
                if let e = error {
                    // TEMPORARY FIX: WHEN THE USER IS REQUIRED TO REAUTHENTICATE BY FIREBASE, SIMPLY JUST LOG THEM OUT. IN THE FUTURE, WE NEED TO ASK FOR THEIR LOGIN CREDENTIALS AGAIN AND REAUTHENTICATE BEFORE THEY CAN CHANGE THEIR EMAIL
//                    print("There was an error updating the user's email: \\(e.localizedDescription)")
                    returnError = e.localizedDescription
                    
                    //                    self.logOut()
                } else {
//                    print("Successfully updated user email in the auth table, no error.")
                    self.email = newEmail
//                    print("Email updated on authStateManager: \\(self.email)")
                }
            }
        }
        if returnError != nil {
            return returnError
        } else {
            return nil
        }
    }
    
    func logOut() {
        let firebaseAuth = Auth.auth()
        do {
            try firebaseAuth.signOut()
        } catch let signOutError as NSError {
//            print("Error signing out: \\(signOutError.localizedDescription)")
            return
        }
        self.isLoggedIn = false
        UserDefaults.standard.set(isLoggedIn, forKey: loginStatusKey)
        
//        self.isBetaCodeValid = false
//        UserDefaults.standard.set(self.isBetaCodeValid, forKey: isUserValidForBetaKey)
//        
//        self.hasUserCompletedSurvey = false
//        UserDefaults.standard.set(self.hasUserCompletedSurvey, forKey: hasUserCompletedWelcomeSurveyKey)
        
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
    
    func addBetaCodes() {
        let codes = [""]
        
        // Add the beta codes to firebase
        for code in codes {
            print("adding beta code \\(code) to firebase")
            db.collection("betaCodes").document(code).setData([
                "code": code,
                "isCodeUsed": false,
            ]) { err in
                if let err = err {
                    print("Error adding code: \\(err)")
                } else {
                    print("Beta code successfully written!")
                }
            }
        }
    }
    
    // Check if a user's beta code is valid, allowing them to continue to the app
    func checkBetaCode(code: String, user: String) {
        
        //check if code is empty
        if code == "" {
            self.betaErrorText = "Code cannot be empty"
            return
        }
        // check if the code exists in the db
        let docRef = db.collection("betaCodes").document(code)

        docRef.getDocument { (document, error) in
            if let document = document, document.exists {
                let dataDescription = document.data().map(String.init(describing:)) ?? "nil"
//                print("Document data: \\(dataDescription)")
                
                if let isCodeUsed = document.data()!["isCodeUsed"] as? Bool {
                    if isCodeUsed == false {
                        self.isBetaCodeValid = true
                        UserDefaults.standard.set(self.isBetaCodeValid, forKey: isUserValidForBetaKey)
                        
                        // Mark the beta code as being used
                        docRef.setData([
                            "code": code,
                            "isCodeUsed": true,
                            "usedBy": user,
                        ])
                        
                    } else {
//                        print("Beta code has already been used")
                        
                        if let usedBy = document.data()!["usedBy"] as? String {
                            if usedBy == user {
                                self.isBetaCodeValid = true
                                UserDefaults.standard.set(self.isBetaCodeValid, forKey: isUserValidForBetaKey)
                            } else {
                                self.betaErrorText = "Code has been used by another user"
                            }
                        }
                    }
                }
                
            } else {
                self.betaErrorText = "Beta code is invalid"
            }
        }
    }
    
    func uploadUserProfilePicture(userID: String, image: UIImage) {
        let storageRef = storage.reference().child("profile_pictures/\\(userID).png")
        
        let data = image.pngData()
        
        let metadata = StorageMetadata()
        metadata.contentType = "image/png"
        
        if let data = data {
            storageRef.putData(data, metadata: metadata) { (metadata, error) in
                if let error = error {
                    print("Error while uploading file: ", error.localizedDescription)
                }
                
                if let metadata = metadata {
                    print("Metadata: ", metadata)
                }
            }
        }
    }
    
    // Complete the welcome survey
    func completeWelcomeSurvey(user: String, userPhotoSelection: Int) {
        // First check if the text fields are empty
        if self.name == "" {
            self.isErrorInSurvey = true
            self.errorText = "Please enter a name"
            return
        }
        
        // First check if the text fields are empty
        if self.displayName == "" {
            self.isErrorInSurvey = true
            self.errorText = "Please enter a username"
            return
        }
        
        
        switch userPhotoSelection {
            case 0: self.userPhotoNonPremium = "profile_photo_0"
            case 1: self.userPhotoNonPremium = "profile_photo_1"
            case 2: self.userPhotoNonPremium = "profile_photo_2"
            case 3: self.userPhotoNonPremium = "profile_photo_3"
            case 4: self.userPhotoNonPremium = "profile_photo_4"
            default: self.userPhotoNonPremium = "profile_photo_0"
        }
        
        // update the user's firestore document with name, birthday, displayName and aspirations
        db.collection("users").document(user).updateData([
            "name": self.name,
            "birthday": self.birthday,
            "displayName": self.displayName,
            "userPhotoNonPremium": self.userPhotoNonPremium,
            "hasUserCompletedWelcomeSurvey": true,
            "isPremiumUser": false,
        ]) { err in
            if let err = err {
//                print("Error writing document: \\(err)")
            } else {
//                print("Document successfully written!")
                // Set user default for completing the welcome survey to true
                self.hasUserCompletedSurvey = true
                UserDefaults.standard.set(self.hasUserCompletedSurvey, forKey: hasUserCompletedWelcomeSurveyKey)
            }
        }
    }
    
    func deleteAccount(userID: String) {
        print("deleting user: ", userID)
        // Delete the firestore user

        // Remove check ins with user id
        var checkIns: [String] = []
        db.collection("checkIns").whereField("userId", isEqualTo: userID).getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \\(err)")
                } else {
                    for document in querySnapshot!.documents {
//                        print("\\(document.documentID) => \\(document.data())")
                        checkIns.append(document.documentID)
                    }
                    print("checkIns: ", checkIns)
                    // Delete checkIns
                    for checkInId in checkIns {
                        self.db.collection("checkIns").document(checkInId).delete() { err in
                            if let err = err {
                                print("Error removing checkin: \\(err)")
                            } else {
                                print("CheckIn successfully removed!")
                            }
                        }
                    }
                }
        }
        // Remove forum posts
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameGeneral, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameDepression, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameStressAnxiety, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameRelationships, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameRecovery, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameAddiction, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameSobriety, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNamePersonalStories, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.forumCollectionNameAdvice, userID: userID)

        // Remove forum comments
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameGeneral, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameDepression, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameStressAnxiety, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameRelationships, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameRecovery, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameAddiction, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameSobriety, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNamePersonalStories, userID: userID)
        deleteForumPostsAndComments(collectionName: Constants.FStore.commentsCollectionNameAdvice, userID: userID)


        // remove messages
        var messages: [String] = []
        db.collection("messages").whereField("userID", isEqualTo: userID).getDocuments() { (querySnapshot, err) in
            if let err = err {
                print("Error getting documents: \\(err)")
            } else {
                for document in querySnapshot!.documents {
                    messages.append(document.documentID)
                }
                print("messages: ", messages)
                // Delete messages
                for messageID in messages {
                    self.db.collection("messages").document(messageID).delete() { err in
                        if let err = err {
                            print("Error removing message: \\(err)")
                        } else {
                            print("Message successfully removed!")
                        }
                        
                    }
                }
            }
        }
        self.isBetaCodeValid = false
        UserDefaults.standard.set(self.isBetaCodeValid, forKey: isUserValidForBetaKey)

        self.hasUserCompletedSurvey = false
        UserDefaults.standard.set(self.hasUserCompletedSurvey, forKey: hasUserCompletedWelcomeSurveyKey)
        
        // Wait a few seconds for the other documents to be deleted
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
            self.db.collection("users").document(userID).delete() { err in
                if let err = err {
                    print("Error removing user from firestore: \\(err)")
                } else {
                    print("Firestore user successfully removed!")
                    // Delete Auth user
                    let user = Auth.auth().currentUser
                    user?.delete { error in
                        if let error = error {
                            print("Error deleting auth user: ,", error)
                        } else {
                            print("Auth user got removed yay, now logging out")
                            self.logOut()
                        }
                    }
                }
            }
        }
    }
    
    func deleteForumPostsAndComments(collectionName: String, userID: String) {
        var objects: [String] = []
        db.collection(collectionName).whereField("authorID", isEqualTo: userID).getDocuments() { (querySnapshot, err) in
            if let err = err {
                print("Error getting documents: \\(err)")
            } else {
                for document in querySnapshot!.documents {
                    objects.append(document.documentID)
                }
                print("forum: ", objects)
                // Delete objects
                for object in objects {
                    self.db.collection(collectionName).document(object).delete() { err in
                        if let err = err {
                            print("Error removing forum object: \\(err)")
                        } else {
                            print("Forum object successfully removed!")
                        }
                        
                    }
                }
            }
        }
    }
    
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ChatManager.swift',
                        path: 'Radiant/Controllers/ChatManager.swift',
                        type: 'file',
                        content: `//
//  ChatManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 6/1/23.
//

import AuthenticationServices
import CryptoKit
import Foundation
import FirebaseAuth
import FirebaseCore
import FirebaseFirestore
import FirebaseFirestoreSwift
import Foundation
import OpenAI


class ChatManager: ObservableObject {
    let db = Firestore.firestore()
    
    let openAI = OpenAI(apiToken: Secrets.openAiAPIKey)
    
    @Published var displayLoadingMessage: Bool = false
    @Published var messages: [Message] = []
    @Published var currentId = 0
    
    @Published var isErrorSendingMessage: Bool = false
    @Published var errorText: String = ""
    
    
    init() {
        if let user = Auth.auth().currentUser?.uid {
            retrieveMessages(userID: user)
        }
    }
    
    func retrieveMessages(userID: String) {
        self.messages = []
        
        let collectionRef = self.db.collection(Constants.FStore.messageCollectionName).whereField("userID", isEqualTo: userID).order(by: "date", descending: false)
        
        collectionRef.getDocuments() { (querySnapshot, err) in
            if let err = err {
                print("Error retrieving comments: \\(err.localizedDescription)")
            } else if let querySnapshot = querySnapshot {
                for document in querySnapshot.documents {
                    let message = Message(
                        id: document.documentID,
                        userID: document.data()["userID"] as? String,
                        isMessageFromUser: document.data()["isMessageFromUser"] as? Bool,
                        content: document.data()["content"] as? String,
                        date: document.data()["date"] as? Date)
                    self.messages.append(message)
//                    print("Message was retrieved, messageID: \\(document.documentID), message content: \\(document.data()["content"] as? String ?? "No Content")")
                }
            }
        }
    }
    
    func sendMessage(userID: String, content: String, isPremiumUser: Bool?, lastMessageSendDate: Date?, numMessagesSentToday: Int?) -> Bool {
        
        // Free user rate limiting check
        var newNumMessagesToday = 0
        if let premium = isPremiumUser {
            if premium == false {
                if let lastMessageSendDate = lastMessageSendDate {
                    // Get current date
                    let currentDate = Date()
                    // Check if last message was sent today
                    if lastMessageSendDate > (currentDate - 86400) {
                        if let numMessagesSentToday = numMessagesSentToday {
                            if numMessagesSentToday >= 5 {
                                self.isErrorSendingMessage = true
                                self.errorText = "You've sent the max amount of messages today. Upgrate to premium to send unlimited chat messages."
                                return false
                            } else {
                                newNumMessagesToday = numMessagesSentToday
                            }
                        }
                    } else {
                        newNumMessagesToday = 0
                    }
                }
                // Free user hasn't reached message quota. Write to their userProfile. Don't write for premium users
                db.collection("users").document(userID).updateData([
                    "lastMessageSendDate": Date(),
                    "numMessagesSentToday": newNumMessagesToday + 1
                ]) { err in
                    if let err = err {
                        print("Error updating user chat fields: \\(err)")
                    } else {
                        print("User chat fields updated successfully written!")
                    }
                }
            }
        }
        
        if content.count > 300 {
//            print("Message length too long")
            self.isErrorSendingMessage = true
            self.errorText = "Message length is too long"
            return false
        }
        
        let message = Message(id: "\\(self.currentId)", userID: userID, isMessageFromUser: true, content: content, date: Date.now)
        self.currentId += 1
        // Firebase will assign it's own id
        let messageForFirebase = Message(userID: userID, isMessageFromUser: true, content: content, date: Date.now)
        self.messages.append(message)
        self.displayLoadingMessage = true
        
        let collectionName = Constants.FStore.messageCollectionName
        
        var ref: DocumentReference? = nil
        do {
            try ref = db.collection(collectionName).addDocument(from: messageForFirebase)
//            print("successfully saved message to db")
        } catch {
//            print("Error saving message to firestore")
        }

                
        // Generate OpenAI response
        let query = ChatQuery(model: .gpt3_5Turbo, messages: [.init(role: .user, content: content)] /*, maxTokens: 60*/)
        openAI.chats(query: query) { result in
          // Handle result here
            switch result {
            case .success(let result):
                if let response = result.choices[0].message.content {
//                    print("OPENAI RESPONSE: \\(response)")
                    let responseMessage = Message(id: "\\(self.currentId)", userID: userID, isMessageFromUser: false, content: response, date: Date.now)
                    self.currentId += 1
                    let responseMessageForFirebase = Message(userID: userID, isMessageFromUser: false, content: response, date: Date.now)
                    do {
                        try ref = self.db.collection(collectionName).addDocument(from: responseMessageForFirebase)
//                        print("successfully saved response message to db")
//                        self.retrieveMessages(userID: userID)
                        self.displayLoadingMessage = false
                        self.messages.append(responseMessage)
                    } catch {
//                        print("Error saving response message to firestore")
                    }
                } else {
//                    print("Response from openAI empty")
                }
            case .failure(let error):
//                print("Error getting result: \\(error.localizedDescription)")
                break
            }
        }
        return true
    }
    
    func clearMessages(userID: String) {
//        print("user wanted to reset chat")
        // lookup and delete all messages where the userID = userID
        let collectionRef = self.db.collection(Constants.FStore.messageCollectionName)
        let query = collectionRef.whereField("userID", isEqualTo: userID)
        
        query.getDocuments() { (snapshot, error) in
            if let err = error {
//                print("error getting messages to delete: \\(err.localizedDescription)")
                return
            }
            
            for document in snapshot!.documents {
                document.reference.delete() { error in
                    if let e = error {
//                        print("error deleting document: \\(e.localizedDescription)")
                    } else {
//                        print("Document deleted!")
                    }
                }
            }
            self.messages = []
        }
    }
    
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'CheckInManager.swift',
                        path: 'Radiant/Controllers/CheckInManager.swift',
                        type: 'file',
                        content: `//
//  CheckInManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 7/17/23.
//

import Foundation
import FirebaseFirestore
import FirebaseStorage
import _PhotosUI_SwiftUI


class CheckInManager: ObservableObject {
    @Published var happinessSliderVal: Double = 5.0
    @Published var depressionSliderVal: Double = 5.0
    @Published var anxeitySliderVal: Double = 5.0
    
    @Published var goalOne: String = ""
    @Published var goalTwo: String = ""
    @Published var goalThree: String = ""
    
    @Published var gratitude: String = ""
    
    @Published var journalEntry: String = ""
    
    @Published var isErrorInCheckIn: Bool = false
    @Published var errorText: String = ""
    
    // Firebase Storage
    let storage = Storage.storage()
    
    // Premium CheckIn Picture
    @Published var isUploadCheckInPhotoShowing: Bool = false
    @Published var data: Data?
    @Published var selectedItem: [PhotosPickerItem] = []
    
    let db = Firestore.firestore()
    
    func checkIn(userID: String) {
        
//        print("user wanted to check in and send the goals, user: \\(userID)")
        
        if goalOne == "" && goalTwo == "" && goalThree == "" {
            self.isErrorInCheckIn = true
            self.errorText = "Please enter at least one goal"
            return
        }
        
        if gratitude == "" {
            self.isErrorInCheckIn = true
            self.errorText = "Please enter something you are grateful for"
            return
        } else {
            self.isErrorInCheckIn = false
            self.errorText = ""
        }
        
        if goalOne.count > 300 || goalTwo.count > 300 || goalThree.count > 300 || gratitude.count > 300 || journalEntry.count > 600 {
            self.isErrorInCheckIn = true
            self.errorText = "Please limit the length of your responses, they are too long"
            return
        }
        
        let userDocumentRef = db.collection("users").document(userID)
        
        let date = Date()
        let formattedDate = date.formatted(date: .abbreviated, time: .omitted)
        
        userDocumentRef.updateData([
            "lastCheckinDate": formattedDate,
        ]) { err in
            if let err = err {
//                print("Error updating document: \\(err)")
            } else {
//                print("Document successfully updated")
            }
        }
        
        // Check for premium check-in photo
        var isPremiumPhoto: Bool = false
        if self.data != nil {
            isPremiumPhoto = true
            self.uploadPremiumCheckInPhoto(userID: userID)
        }
        
        let checkInsRef = db.collection("checkIns")
        checkInsRef.addDocument(data: [
            "userId": userID,
            "date": formattedDate,
            "goals": [self.goalOne, self.goalTwo, self.goalThree],
            "gratitude": self.gratitude,
            "happinessScore": self.happinessSliderVal,
            "depressionScore": self.depressionSliderVal,
            "anxietyScore": self.anxeitySliderVal,
            "journalEntry": self.journalEntry,
            "isPremiumCheckInPhoto": isPremiumPhoto
        ]) { err in
            if let err = err {
//                print("Error adding checkin: \\(err.localizedDescription)")
            } else {
//                print("Check in added successfully")
            }
        }
    }
    
    func uploadPremiumCheckInPhoto(userID: String) {
        let storageRef = storage.reference()
        // points to 'profile_pictures/userIDDate'
        let date = Date().formatted(date: .abbreviated, time: .omitted)
        let url = "checkin_photos/" + userID + date.description
        print(url)
        let imageRef = storageRef.child(url)
        
        // Add metadata for the image being uploaded
        let metadata = StorageMetadata()
        metadata.contentType = "image/png"
        
        imageRef.putData(self.data!, metadata: metadata) { (metadata, error) in
            guard let metadata = metadata else { return }
        }
        
        // Write to firestore editing user profile photo
//        let docRef = db.collection(Constants.FStore.usersCollectionName).document(userID)
//
//        userProfile?.doesPremiumUserHaveCustomProfilePicture = true
//        do {
//            try docRef.setData(from: userProfile)
//        } catch {
//            print(error.localizedDescription)
//        }
    }
}


`,
                        language: 'plaintext'
                    },
                    {
                        name: 'EntitlementManager.swift',
                        path: 'Radiant/Controllers/EntitlementManager.swift',
                        type: 'file',
                        content: `//
//  EntitlementManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 10/22/23.
//

import Foundation
import SwiftUI

class EntitlementManager: ObservableObject {
    static let userDefaults = UserDefaults(suiteName: "group.radiant")!
    
    @AppStorage("hasPro", store: userDefaults)
    var hasPro: Bool = false
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ForumManager.swift',
                        path: 'Radiant/Controllers/ForumManager.swift',
                        type: 'file',
                        content: `//
//  ForumManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/23/23.
//

import Foundation
import AuthenticationServices
import CryptoKit
import Foundation
import FirebaseCore
import FirebaseAuth
import FirebaseFirestore
import FirebaseFirestoreSwift
import GoogleMobileAds

class ForumManager: ObservableObject {
        
//    var posts: [ForumPost] = []
    
    @Published var isCreatePostPopupShowing: Bool = false
    @Published var isCreateCommentPopupShowing: Bool = false
    
    @Published var isReportPostAlertShowing: Bool = false
    @Published var isReportCommentAlertShowing: Bool = false
    @Published var isDeletePostPopupAlertShowing: Bool = false
    @Published var isDeleteCommentPopupAlertShowing: Bool = false
    
    // Firestore
    let db = Firestore.firestore()
    
//    @Published var isSinglePostFocused: Bool = false
    @Published var focusedPostID: String = ""
    @Published var focusedPostCategoryName: String = ""
    @Published var isFocusedPostLikedByCurrentUser: Bool = false
    
    @Published var focusedCommentID: String = ""
    
    @Published var isErrorCreatingPost: Bool = false
    @Published var isErrorCreatingComment: Bool = false
    @Published var errorText: String = ""

    // TODO: Find a way to limit the number of posts loaded, and load more when the user scrolls down
    @Published var lastDoc: QueryDocumentSnapshot?
    @Published var lastComment: QueryDocumentSnapshot?
    
    @Published var lastPostMyPosts: QueryDocumentSnapshot?
    @Published var lastCommentMyComments: QueryDocumentSnapshot?
    @Published var lastPostLikedPosts: QueryDocumentSnapshot?
    
    func publishPost(authorID: String, authorUsername: String, authorProfilePhoto: String, category: String, content: String, isPremiumUser: Bool?, lastPostDate: Date?, numPostsToday: Int?) -> Bool {
//        print("User wanted to publish a post")
//
//        print("The post length is: \\(content.count)")
        
        // Free user post number check
        var newNumPostsToday: Int = 0
        if let premium = isPremiumUser {
            if premium == false {
                if let lastPostDate = lastPostDate {
                    // Get current date
                    let currentDate = Date()
                    // Check if last post date is less than 24 hours ago (posted today)
                    if lastPostDate > (currentDate - 86400) {
                        if let numPostsToday = numPostsToday {
                            if numPostsToday >= 2 {
                                self.isErrorCreatingPost = true
                                self.errorText = "You've exceeded your max number of posts for today. Upgrade to premium for unlimited posts."
                                return false
                            } else {
                                newNumPostsToday = numPostsToday
                            }
                        }
                    } else {
                        newNumPostsToday = 0
                    }
                }
                // Free user hasn't reached post quota. Write to their userProfile. Don't write for premium users
                db.collection("users").document(authorID).updateData([
                    "lastForumPostDate": Date(),
                    "numPostsToday": newNumPostsToday + 1
                ]) { err in
                    if let err = err {
                        print("Error updating user forum fields: \\(err)")
                    } else {
                        print("User forum fields updated successfully written!")
                    }
                }
            }
        }
        
        
        if content == "" {
            self.isErrorCreatingPost = true
            self.errorText = "Please enter your post content"
            return false
        }
        
        if content.count > 300 {
            self.isErrorCreatingPost = true
            self.errorText = "Your post is too long, please shorten your post"
            return false
        } else {
            self.isErrorCreatingPost = false
            self.errorText = ""
        }
        
        // Create the Post Object and save it to the corresponding firestore collection
        let post = ForumPost(authorID: authorID, authorUsername: authorUsername, authorProfilePhoto: authorProfilePhoto, category: category, date: Date.now, content: content, reportCount: 0, likes: [authorID])
        // TODO: Add if let category = post.category to make sure the post has a corresponding cateogry to post to
        
        let collectionName = getFstoreForumCategoryCollectionName(category: category)
        
        var ref: DocumentReference? = nil
        do {
            try ref = db.collection(collectionName).addDocument(from: post)
//            print("Adding document was successful, documentID: \\(ref!.documentID)")
            isCreatePostPopupShowing = false
        } catch {
//            print("error adding post to collection")
        }
        return true
    }
    
    func deletePost(postID: String, postCategory: String, commentList: [ForumPostComment]) {
//        print("user wanted to delete their post")
        let collectionName = getFstoreForumCategoryCollectionName(category: postCategory)
        
        // Delete post
        db.collection(collectionName).document(postID).delete() { err in
            if let err = err {
//                print("Error removing document: \\(err.localizedDescription)")
            } else {
//                print("Post successfully deleted!")
            }
        }
        
        // Delete associated comments
        for comment in commentList {
            let commentCollectionName = getFstoreForumCommentsCategoryCollectionName(category: postCategory)
            db.collection(commentCollectionName).document(comment.id!).delete() { err in
                if let err = err {
//                    print("error deleting comment: \\(err.localizedDescription)")
                } else {
//                    print("successfully deleted comment")
                }
            }
        }
    }
    
    func likePost(postID: String, postCategory: String, userID: String) {
        
//        print("User: \\(userID) wanted to like a post: \\(postID)")
        
        let collectionName = getFstoreForumCategoryCollectionName(category: postCategory)
        let documentRef = db.collection(collectionName).document(postID)
        
        documentRef.updateData([
            "likes": FieldValue.arrayUnion([userID])
        ]) { err in
            if let err = err {
//                print("error liking the post: \\(err.localizedDescription)")
            } else {
//                print("user sucessfully liked the post")
            }
        }
    }
    
    func removeLikeFromPost(postID: String, postCategory: String, userID: String) {
//        print("user wanted to remove their like from the post")
        
        let collectionName = getFstoreForumCategoryCollectionName(category: postCategory)
        let documentRef = db.collection(collectionName).document(postID)
        
        documentRef.updateData([
            "likes": FieldValue.arrayRemove([userID])
        ]) { err in
            if let err = err {
//                print("error liking the post: \\(err.localizedDescription)")
            } else {
//                print("user sucessfully liked the post")
            }
        }
    }
    
    func publishComment(authorID: String, authorUsername: String, authorProfilePhoto: String, category: String, postID: String, content: String, isPremiumUser: Bool?, lastCommentDate: Date?, numCommentsToday: Int?) -> Bool {
//        print("User wanted to publish a comment on a post")
        
        // Free user comment count check
        var newNumCommentsToday: Int = 0
        if let premium = isPremiumUser {
            if premium == false {
                if let lastCommentDate = lastCommentDate {
                    // Get current date
                    let currentDate = Date()
                    // Check if last post date is less than 24 hours ago (posted today)
                    if lastCommentDate > (currentDate - 86400) {
                        if let numCommentsToday = numCommentsToday {
                            if numCommentsToday >= 3 {
                                self.isErrorCreatingComment = true
                                self.errorText = "You've exceeded your max number of comments for today. Upgrade to premium for unlimited posts."
                                return false
                            } else {
                                newNumCommentsToday = numCommentsToday
                            }
                        }
                    } else {
                        newNumCommentsToday = 0
                    }
                }
                // Free user hasn't reached post quota. Write to their userProfile. Don't write for premium users
                db.collection("users").document(authorID).updateData([
                    "lastForumCommentDate": Date(),
                    "numCommentsToday": newNumCommentsToday + 1
                ]) { err in
                    if let err = err {
                        print("Error updating user forum fields: \\(err)")
                    } else {
                        print("User forum fields updated successfully written!")
                    }
                }
            }
        }
        
        
        if content == "" {
            self.isErrorCreatingComment = true
            self.errorText = "Please enter your comment"
            return false
        }
        
        if content.count > 300 {
            self.isErrorCreatingComment = true
            self.errorText = "Your comment is too long, please shorten it"
            return false
        } else {
            self.isErrorCreatingComment = false
            self.errorText = ""
        }
        
        let comment = ForumPostComment(postID: postID, authorID: authorID, authorUsername: authorUsername, authorProfilePhoto: authorProfilePhoto, date: Date.now, commentCategory: category, content: content, likes: [authorID], reportCount: 0, isCommentLikedByCurrentUser: nil)
        let collectionName = getFstoreForumCommentsCategoryCollectionName(category: category)
        
        var ref: DocumentReference? = nil
        do {
            try ref = db.collection(collectionName).addDocument(from: comment)
            print("Adding comment was successful, commentID: \\(ref!.documentID) saved on postID: \\(postID)")
        } catch {
            print("Error adding comment to the post")
        }
        return true
    }
    
    func deleteComment(commentID: String, commentCategory: String, authorID: String) {
//        print("user wanted to delete their comment")
        let collectionName = getFstoreForumCommentsCategoryCollectionName(category: commentCategory)
        
        // Delete post
        db.collection(collectionName).document(commentID).delete() { err in
            if let err = err {
//                print("Error removing comment: \\(err.localizedDescription)")
            } else {
//                print("Comment successfully deleted!")
            }
        }
    }
    
    func likeComment(commentID: String, commentCategory: String, userID: String) {
//        print("User: \\(userID) wanted to like a comment: \\(commentID)")
        
        let collectionName = getFstoreForumCommentsCategoryCollectionName(category: commentCategory)
        let documentRef = db.collection(collectionName).document(commentID)
        
        documentRef.updateData([
            "likes": FieldValue.arrayUnion([userID])
        ]) { err in
            if let err = err {
//                print("error liking the post: \\(err.localizedDescription)")
            } else {
//                print("user sucessfully liked the post")
            }
        }
    }
    
    func removeLikeFromComment(commentID: String, commentCategory: String, userID: String) {
//        print("user wanted to remove their like from the comment")
        
        let collectionName = getFstoreForumCommentsCategoryCollectionName(category: commentCategory)
        let documentRef = db.collection(collectionName).document(commentID)
        
        documentRef.updateData([
            "likes": FieldValue.arrayRemove([userID])
        ]) { err in
            if let err = err {
//                print("error liking the post: \\(err.localizedDescription)")
            } else {
//                print("user sucessfully liked the post")
            }
        }
    }
    
    // Get the constant name of each FStore forum collection
    func getFstoreForumCommentsCategoryCollectionName(category: String) -> String {
        
        var categoryName: String
        
        switch category {
        case "General":
            categoryName = Constants.FStore.commentsCollectionNameGeneral
        case "Depression":
            categoryName = Constants.FStore.commentsCollectionNameDepression
        case "Stress and Anxiety":
            categoryName = Constants.FStore.commentsCollectionNameStressAnxiety
        case "Relationships":
            categoryName = Constants.FStore.commentsCollectionNameRelationships
        case "Recovery":
            categoryName = Constants.FStore.commentsCollectionNameRecovery
        case "Addiction":
            categoryName = Constants.FStore.commentsCollectionNameAddiction
        case "Sobriety":
            categoryName = Constants.FStore.commentsCollectionNameSobriety
        case "Personal Stories":
            categoryName = Constants.FStore.commentsCollectionNamePersonalStories
        case "Advice":
            categoryName = Constants.FStore.commentsCollectionNameAdvice
        default:
            categoryName = Constants.FStore.commentsCollectionNameGeneral
        }
        
        return categoryName
    }
    
    // getFstoreForumCategoryCollectionName
    // getFstoreForumCommentsCategoryCollectionName
    
    // Get the constant name of each FStore forum comments collection
    func getFstoreForumCategoryCollectionName(category: String) -> String {
        
        var categoryName: String
        
        switch category {
        case "General":
            categoryName = Constants.FStore.forumCollectionNameGeneral
        case "Depression":
            categoryName = Constants.FStore.forumCollectionNameDepression
        case "Stress and Anxiety":
            categoryName = Constants.FStore.forumCollectionNameStressAnxiety
        case "Relationships":
            categoryName = Constants.FStore.forumCollectionNameRelationships
        case "Recovery":
            categoryName = Constants.FStore.forumCollectionNameRecovery
        case "Addiction":
            categoryName = Constants.FStore.forumCollectionNameAddiction
        case "Sobriety":
            categoryName = Constants.FStore.forumCollectionNameSobriety
        case "Personal Stories":
            categoryName = Constants.FStore.forumCollectionNamePersonalStories
        case "Advice":
            categoryName = Constants.FStore.forumCollectionNameAdvice
        default:
            categoryName = Constants.FStore.forumCollectionNameGeneral
        }
        
        return categoryName
    }
    
    func reportForumPost(reasonForReport: Int) {
//        let reasonsForReport = ["Offensive", "Harmful or Dangerous", "Off Topic or Irrelevant", "Spam or Advertisment"]
        
        let documentRef = db.collection(getFstoreForumCategoryCollectionName(category: self.focusedPostCategoryName)).document(self.focusedPostID)
        
//        print("The post being reported: \\(self.focusedPostID)")
        
        let field = "reportCount"
        documentRef.updateData([
            field: FieldValue.increment(Int64(1))
        ]) { err in
            if let err = err {
//                print("There was an error updating the reportCount \\(err.localizedDescription)")
            } else {
//                print("Report count updated successfully")
            }
        }
    }
    
    func reportForumComment(reasonForreport: Int) {
//        print("comment being reported: \\(self.focusedCommentID)")
        let documentRef = db.collection(getFstoreForumCommentsCategoryCollectionName(category: self.focusedPostCategoryName)).document(self.focusedCommentID)
        
        let field = "reportCount"
        documentRef.updateData([
            field: FieldValue.increment(Int64(1))
        ]) { err in
            if let err = err {
//                print("There was an error updating the report count: \\(err.localizedDescription)")
            } else {
//                print("Comment report count updated successfully")
            }
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'HistoryManager.swift',
                        path: 'Radiant/Controllers/HistoryManager.swift',
                        type: 'file',
                        content: `//
//  HistoryManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 8/12/23.
//

import Foundation
import FirebaseFirestore
import FirebaseStorage
import FirebaseAuth


class HistoryManager: ObservableObject {
    @Published var focusedDay: Day?
    
    @Published var days: [Day] = []
    @Published var userCheckIns: [String : CheckIn] = [:]
    @Published var checkInPremiumPhotos: [String : UIImage] = [:]
    
    // Firebase Firestore
    let db = Firestore.firestore()
    
    // Firebase Storage
    let storage = Storage.storage()
    
    init(){
        // Generate a Day object for each day from today to 3 months ago
        let today = Date()
        let threeMonthsAgo = Date() - 7776000
        var curDay = threeMonthsAgo
        while (curDay <= today) {
            
            var newDay = Day(dayOfMonth: -1, month: "", formattedDateForFirestore: "")
            
            // Get the day of the month as an int
            let components = Calendar.current.dateComponents([.day], from: curDay)
            newDay.dayOfMonth = components.day!
            
            // Get the month as a string
            newDay.month = Calendar.current.monthSymbols[Calendar.current.component(.month, from: curDay) - 1]
            
            // Format the current date
            newDay.formattedDateForFirestore = curDay.formatted(date: .abbreviated, time: .omitted)
            
            // append a new Day object to the Days array
            self.days.append(newDay)
            
            curDay += 86400
        }
        self.focusedDay = self.days[self.days.count-1]
    }
    
    func crossCheckDaysWithCheckInsFromFirstore(userId: String) {
        
        // Read each checkIn with the user's ID attatched
        //   Add the check-In to the map of {date: checkIn}
        //     Read each of the days from the [days] array of the last 3 months
        //        if there exists a check-in for that day in the {date: checkin} map, attatch the checkIn to the Day() object, which can be accessed from the view
        
        // Get the user's checkIns from firebase and store them in the usercheckIns map
        db.collection("checkIns").whereField("userId", isEqualTo: userId)
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    //                    print("Error getting user's checkins: ", err.localizedDescription)
                } else {
                    for document in querySnapshot!.documents {
                        let date = document.data()["date"] as? String
                        let goals = document.data()["goals"] as? [String]
                        let gratitude = document.data()["gratitude"] as? String
                        let happinessScore = document.data()["happinessScore"] as? Double
                        let depressionScore = document.data()["depressionScore"] as? Double
                        let anxietyScore = document.data()["anxietyScore"] as? Double
                        let journalEntry = document.data()["journalEntry"] as? String
                        let isPremiumCheckInPhoto = document.data()["isPremiumCheckInPhoto"] as? Bool
                        let checkIn = CheckIn(userId: userId, date: date, goals: goals, gratitude: gratitude, happinessScore: happinessScore, depressionScore: depressionScore, anxietyScore: anxietyScore, journalEntry: journalEntry, isPremiumCheckInPhoto: isPremiumCheckInPhoto)
                        self.userCheckIns[date!] = checkIn
                    }
                    
                    // Read each of the days in the days array and attatch the check-in if it exists
                    for var i in 0...self.days.count - 1 {
                        if let daysCheckIn = self.userCheckIns[self.days[i].formattedDateForFirestore] {
                            self.days[i].doesCheckInExist = true
                            self.days[i].checkIn = daysCheckIn
                            // If check-in exists, look for a premium photo
                            if let isPhoto = self.days[i].checkIn!.isPremiumCheckInPhoto {
                                if isPhoto {
                                    self.days[i].doesCheckInPhotoExist = true
                                }
                            }

                        } else {
                            self.days[i].doesCheckInExist = false
                            //                            print("day doesn't exist for ", self.days[i].formattedDateForFirestore)
                        }
                        i += 1
                    }
                    self.focusedDay = self.days[self.days.count-1]
                    // Check for premium check in photos, store them in a separate map
                    self.attatchPremiumCheckInPhotos(userId: userId)
                }
            }
    }
    
    func attatchPremiumCheckInPhotos(userId: String) {
        for i in 0...self.days.count - 1 {
            if self.days[i].doesCheckInExist {
                if self.days[i].doesCheckInPhotoExist {
                    // If the checkIn has a respective photo, download it and store it in the Day : UIImage Map
                    let path = "checkin_photos/"
                    let id = userId
                    let fullPath = path + id + self.days[i].formattedDateForFirestore
                    print(fullPath)
                    
                    let pathReference = self.storage.reference(withPath: fullPath)
                    
                    // Download in memory with a maximum allowed size of 7MB (10 * 1024 * 1024 bytes)
                    pathReference.getData(maxSize: 7 * 1024 * 1024) { data, error in
                        if let error = error {
                            // Uh-oh, an error occurred!
                            print("error downloading photo from storage")
                            print(error.localizedDescription)
                        } else {
                            // Data for "images/island.jpg" is returned
                            self.checkInPremiumPhotos[self.days[i].formattedDateForFirestore] = UIImage(data: data!)
//                            print("checkin photo set, its accessible in the checkInManager.checkInPremiumPhotos")
                        }
                    }
                }
            }
        }
    }
}


class Day: Identifiable, Equatable {
    static func == (lhs: Day, rhs: Day) -> Bool {
        if lhs.id == rhs.id {
            return true
        }
        return false
    }
    
    // Variables populated during generateDays()
    var id = UUID()
    var dayOfMonth: Int
    var month: String
    var formattedDateForFirestore: String
    
    // Variables populated during crossCheckDaysFromFirestore()
    var doesCheckInExist: Bool = false
    var checkIn: CheckIn?
    // Premium CheckIn Photo
    @Published var doesCheckInPhotoExist: Bool = false
    @Published var checkInPremiumPhoto: UIImage = UIImage()
    
    init(dayOfMonth: Int, month: String, formattedDateForFirestore: String) {
        self.dayOfMonth = dayOfMonth
        self.month = month
        self.formattedDateForFirestore = formattedDateForFirestore
    }
}


`,
                        language: 'plaintext'
                    },
                    {
                        name: 'HomeManager.swift',
                        path: 'Radiant/Controllers/HomeManager.swift',
                        type: 'file',
                        content: `//
//  HomeManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 7/8/23.
//

import Foundation
import FirebaseCore
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage

class HomeManager: ObservableObject {
    
    @Published var isCheckInPopupShowing: Bool = false
    
    @Published var hasUserCheckedInToday: Bool = false
    @Published var lastCheckInDate: String = ""
    @Published var userFirstName: String = "User"
    @Published var userProfilePhoto: String = "default_prof_pic"
    
    
    @Published var todaysCheckIn: CheckIn? = CheckIn(userId: nil, date: "", goals: ["Please check-in to set your goals", "", ""], gratitude: "I'm grateful for you, user!", happinessScore: -1, depressionScore: -1, anxietyScore: -1, journalEntry: "")
    
    
    @Published var quoteOfTheDay: String = ""
    
    
    let db = Firestore.firestore()
    let storage = Storage.storage()
    
    // TODO(bendreyer): We're doing this read of the signed in userProfile twice, once here and once in the profileStatus manager. We can consolidate.
    let userProfile: UserProfile? = nil
    
    
    // initiate variables in the HomeManager on appear
    func userInit(userID: String) {
        // Get the day of the month for the quote of the day
        let day = Calendar.current.component(.day, from: Date())
//        print("day of the month: \\(day)")
        let quoteRef = db.collection("quotes").document("\\(day)")
        quoteRef.getDocument { (document, error) in
            if let document = document, document.exists {
                self.quoteOfTheDay = document.data()!["quote"] as! String
            } else {
//                print("Quote of the day does exist")
            }
        }
        
        let userDocRef = db.collection("users").document(userID)
        
        // Todo: Understand why we're doing this in homeManager?
        userDocRef.getDocument(as: UserProfile.self) { result in
            switch result {
            case .success(let user):
//                print("we sucessfully got the user in homeManager")
                print("user id: ", user.id!)
                if let name = user.name {
                    self.userFirstName = name
                }
                
                self.userProfilePhoto = user.userPhotoNonPremium ?? "default_prof_pic"
                

                let today = Date().formatted(date: .abbreviated, time: .omitted)
                
                if let lastCheckInDate = user.lastCheckinDate {
                    self.lastCheckInDate = lastCheckInDate
                }
                
                // Set has user checked in today boolean
                if today == user.lastCheckinDate {
                    self.hasUserCheckedInToday = true
//                    print("user has already checked in today")
                } else {
                    self.hasUserCheckedInToday = false
//                    print("user has not checked in today")
                }
            case .failure(let error):
//                print("error getting the user in the home manger: ", error.localizedDescription)
                break
            }
        }
        
        // Get today's checkIn Data
        db.collection("checkIns").whereField("userId", isEqualTo: userID).whereField("date", isEqualTo: Date().formatted(date: .abbreviated, time: .omitted))
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
//                    print("error retrievign user's checkins: ", err.localizedDescription)
                } else {
//                    print("retrieved checkins sucessfully!")
                    for document in querySnapshot!.documents {
                        
                        let userId = document.data()["userId"] as? String
                        let date = document.data()["date"] as? String
                        let goals = document.data()["goals"] as? [String]
                        let gratitude = document.data()["gratitude"] as? String
                        let happinessScore = document.data()["happinessScore"] as? Double
                        let depressionScore = document.data()["depressionScore"] as? Double
                        let anxietyScore = document.data()["anxietyScore"] as? Double
                        let journalEntry = document.data()["journalEntry"] as? String
                        let newCheckIn: CheckIn = CheckIn(userId: userId, date: date, goals: goals, gratitude: gratitude, happinessScore: happinessScore, depressionScore: depressionScore, anxietyScore: anxietyScore, journalEntry: journalEntry)
                        self.todaysCheckIn = newCheckIn
                    }
//                    print(self.todaysCheckIn)
                }
            }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ProfileStatusManager.swift',
                        path: 'Radiant/Controllers/ProfileStatusManager.swift',
                        type: 'file',
                        content: `//
//  ProfileStatusManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/9/23.
//


import Foundation
import FirebaseCore
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import PhotosUI
import _PhotosUI_SwiftUI

class ProfileStatusManager: ObservableObject {
    
    // Bool var controlling the settings popup
    @Published var isProfileSettingsPopupShowing: Bool = false
    
    // Rate limiting
    @Published var numActionsInLastMinute: Int = 0
    @Published var firstActionDate: Date?
    @Published var lastActionDate: Date?
    
    // Firestore
    let db = Firestore.firestore()
    @Published var userProfile: UserProfile?
    
    // Firebase Storage
    let storage = Storage.storage()
    // Premium User Profile Picture
    @Published var isUploadProfilePhotoPopupShowing: Bool = false
    @Published var data: Data?
    @Published var selectedItem: [PhotosPickerItem] = []
    
    // Premium User
    @Published var premiumUserProfilePicture: UIImage?
    

    func retrieveUserProfile(userID: String) {
        let docRef = db.collection(Constants.FStore.usersCollectionName).document(userID)
        
        docRef.getDocument(as: UserProfile.self) { result in
            switch result {
            case .success(let userProf):
                // A UserProfile value was successfully initalized from the DocumentSnapshot
                self.userProfile = userProf
                //                print("Successfully retrieved the user profile stored in Firestore. Access it with profileStatusManager.userProfile")
                print("user premium status: ", self.userProfile?.isPremiumUser ?? "none")
                
                // if user is premium download their profile picture and save it to the profileStateManager
                if let isPremium = self.userProfile?.isPremiumUser {
                    if isPremium {
                        if let hasPhoto = self.userProfile?.doesPremiumUserHaveCustomProfilePicture {
                            if hasPhoto {
                                // Download the photo from storage
                                let path = "profile_pictures/"
                                let id = self.userProfile?.id! ?? ""
                                let fullPath = path + id
                                
                                let pathReference = self.storage.reference(withPath: fullPath)

                                
                                // Download in memory with a maximum allowed size of 10MB (10 * 1024 * 1024 bytes)
                                pathReference.getData(maxSize: 10 * 1024 * 1024) { data, error in
                                  if let error = error {
                                    // Uh-oh, an error occurred!
                                      print("error downloading photo from storage")
                                      print(error.localizedDescription)
                                  } else {
                                      // Data for "images/island.jpg" is returned
                                      self.premiumUserProfilePicture = UIImage(data: data!)
                                      print("premium photo set, its accessible in profileStateManager")
                                  }
                                }
                            }
                        }
                    }
                }
                
            case .failure(let error):
                // A UserProfile value could not be initialized from the DocumentSnapshot
//                print("Failure retrieving the user profile from firestore: \\(error.localizedDescription)")
                break
            }
        }
    }
    
    func updateUserProfileEmail(newEmail: String) -> String? {
        var errorText: String?
        
        if let user = userProfile {
            // We can assume if the user exists they have an ID
            let docRef = db.collection(Constants.FStore.usersCollectionName).document(user.id!)
            
            // Before we set the new emails, make sure they are valid email addresses
            userProfile?.email = newEmail
            userProfile?.displayName = newEmail
            do {
                try docRef.setData(from: userProfile)
            } catch {
                errorText = error.localizedDescription
            }
        }
        return errorText
    }
    
    func updateUserName(newName: String) -> String? {
        var errorText: String?
        
        if let user = userProfile {
            if newName.count > 50 {
                return "name too long"
            }
            
            let docRef = db.collection(Constants.FStore.usersCollectionName).document(user.id!)
            
            userProfile?.name = newName
            do {
                try docRef.setData(from: userProfile)
            } catch {
                errorText = error.localizedDescription
            }
        }
        return errorText
    }
    
    func updateUserDisplayName(newName: String) -> String? {
        var errorText: String?
        
        if let user = userProfile {
            
            if newName.count > 50 {
                return "name too long"
            }
            
            let docRef = db.collection(Constants.FStore.usersCollectionName).document(user.id!)
            
            userProfile?.displayName = newName
            do {
                try docRef.setData(from: userProfile)
            } catch {
                errorText = error.localizedDescription
            }
        }
        return errorText
    }
    
    func isValidEmailAddress(emailAddressString: String) -> Bool {
        // Regular expression to validate email addresses
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,64}"
        
        // Create a regular expression object
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        
        // Return true if the email address is valid
        return emailTest.evaluate(with: emailAddressString)
    }
    
    func processFirestoreWrite() -> String? {
        var errorText: String?
        
        // if firstAction Date Exists
        if let firstD = self.firstActionDate {
            
            let oneMinFromFirst = firstD + 60
            
            // if last action date is within one minute of first action date
            if self.lastActionDate! <= oneMinFromFirst {
                // num actions within 1 minute greater than 5
                if self.numActionsInLastMinute >= 5 {
                    errorText = "Too many actions in one minute"
                } else {
                    // num actions within one minute less than 5
                    self.lastActionDate = Date()
                    self.numActionsInLastMinute += 1
                }
            } else {
                // Last action date after 1 miute from first action date
                self.firstActionDate = Date()
                self.lastActionDate = Date()
                self.numActionsInLastMinute = 1
            }
            
        } else {
            // First action date doesn't exist
            self.firstActionDate = Date()
            self.lastActionDate = Date()
            self.numActionsInLastMinute = 1
        }
        
        return errorText
    }
    
    func uploadPremiumUserProfilePhoto(userID: String) {
        let storageRef = storage.reference()
        // points to 'profile_pictures/userID'
        let url = "profile_pictures/" + userID
        print(url)
        let imageRef = storageRef.child(url)
        
        // Add metadata for the image being uploaded
        let metadata = StorageMetadata()
        metadata.contentType = "image/png"
        
        
        imageRef.putData(self.data!, metadata: metadata) { (metadata, error) in
            guard let metadata = metadata else { return }
            
            self.retrieveUserProfile(userID: userID)
        }
        
        // Write to firestore editing user profile photo
        let docRef = db.collection(Constants.FStore.usersCollectionName).document(userID)
        
        userProfile?.doesPremiumUserHaveCustomProfilePicture = true
        do {
            try docRef.setData(from: userProfile)
        } catch {
            print(error.localizedDescription)
        }
    }
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'PurchaseManager.swift',
                        path: 'Radiant/Controllers/PurchaseManager.swift',
                        type: 'file',
                        content: `//
//  PurchaseManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 10/15/23.
//

import Foundation
import StoreKit
import FirebaseFirestore
import FirebaseAuth

@MainActor
class PurchaseManager: NSObject, ObservableObject {
    
    private let productIds = ["PremiumMonthly", "PremiumYearly"]
    
    @Published
    private(set) var products: [Product] = []
    private var productsLoaded = false
    
    @Published private(set) var purchasedProductIds = Set<String>()
    
    var hasUnlockedPro: Bool {
        return !self.purchasedProductIds.isEmpty
    }
    
    private var updates: Task<Void, Never>? = nil
    
    private let entitlementManager: EntitlementManager
    
    init(entitlementManager: EntitlementManager) {
        self.entitlementManager = entitlementManager
        super.init()
        self.updates = observeTransactionUpdates()
        SKPaymentQueue.default().add(self)
    }
    
    deinit {
        self.updates?.cancel()
    }
    
    func loadProducts() async throws {
        guard !self.productsLoaded else { return }
        self.products = try await Product.products(for: productIds)
        self.productsLoaded = true
    }
    
    func purchase(_ product: Product) async throws {
        let result = try await product.purchase()
        
        switch result {
        case let .success(.verified(transaction)):
            // Successful purhcase
            await transaction.finish()
            await self.updatePurchasedProducts()
        case let .success(.unverified(_, error)):
            // Successful purchase but transaction/receipt can't be verified
            // Could be a jailbroken phone
            print(error)
            break
        case .pending:
            // Transaction waiting on SCA (Strong Customer Authentication) or
            // approval from Ask to Buy
            break
        case .userCancelled:
            // ^^^
            break
        @unknown default:
            break
        }
    }
    
    //TODO(): update this function to take the isPremiumUser bool from the already fetched user profile instead of making an extra call to firestore in this class.
    func updatePurchasedProducts() async {
        
        // Firebase Firestore
        let db = Firestore.firestore()
        
        for await result in Transaction.currentEntitlements {
            guard case .verified(let transaction) = result else {
                print("gaurd case .verfied on transaction")
                continue
            }
            
            if transaction.revocationDate == nil {
                self.purchasedProductIds.insert(transaction.productID)
                print("Apple found that u already have a premium acccount")
                
                // Add code to update isPremium boolean on userProfile in firestore.
                // (We can assume the only type of product being added is premium subscription, so no need to check which product is being added).
                // Try to get current signed in user
                if let user = Auth.auth().currentUser {
                    let userDocRef = db.collection("users").document(user.uid)
                    
                    // read the is premium field, if it's already true do nothing, else switch it to true.
                    userDocRef.getDocument { (document, error) in
                        if let document = document, document.exists {
                            let isPremium = document.data()!["isPremiumUser"] as! Bool
                            if !isPremium {
                                userDocRef.updateData([
                                    "isPremiumUser": true,
                                ]) { err in
                                    if let err = err {
                                        print(err.localizedDescription)
                                    } else {
                                        print("user status updated to premium")
                                    }
                                }
                            }
                        } else {
                            print("Document does not exist")
                        }
                    }
                }
            } else {
                self.purchasedProductIds.remove(transaction.productID)
                print("Apple thinks you are no longer subscibed to premium account")
                
                // Add code to update isPremium boolean on userProfile in firestore.
                // (We can assume the only type of product being added is premium subscription, so no need to check which product is being added).
                // Try to get current signed in user
                if let user = Auth.auth().currentUser {
                    let userDocRef = db.collection("users").document(user.uid)
                    
                    // read the is premium field, if it's already false do nothing, else switch it to false.
                    userDocRef.getDocument { (document, error) in
                        if let document = document, document.exists {
                            let isPremium = document.data()!["isPremiumUser"] as! Bool
                            if isPremium {
                                userDocRef.updateData([
                                    "isPremiumUser": false,
                                ]) { err in
                                    if let err = err {
                                        print(err.localizedDescription)
                                    } else {
                                        print("user premium status removed")
                                    }
                                }
                            }
                        } else {
                            print("Document does not exist")
                        }
                    }
                }
            }
        }
        
        self.entitlementManager.hasPro = !self.purchasedProductIds.isEmpty
    }
    
    private func observeTransactionUpdates() -> Task<Void, Never> {
        Task(priority: .background) { [unowned self] in
            for await verificationResult in Transaction.updates {
                // Using verificationResult directly would be better
                // buy this way works for this tutorial
                await self.updatePurchasedProducts()
            }
        }
    }
}

extension PurchaseManager: SKPaymentTransactionObserver {
    func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        
    }
    
    func paymentQueue(_ queue: SKPaymentQueue, shouldAddStorePayment payment: SKPayment, for product: SKProduct) -> Bool {
        return true
    }
}

`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Launch Screen.storyboard',
                path: 'Radiant/Launch Screen.storyboard',
                type: 'file',
                content: `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_72" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21678"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="430" height="932"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <label opaque="NO" clipsSubviews="YES" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" fixedFrame="YES" text="" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" minimumFontSize="9" translatesAutoresizingMaskIntoConstraints="NO" id="obG-Y5-kRd">
                                <rect key="frame" x="0.0" y="832" width="393" height="0.0"/>
                                <autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>
                                <fontDescription key="fontDescription" type="system" pointSize="17"/>
                                <color key="textColor" red="0.0" green="0.0" blue="0.0" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                <nil key="highlightedColor"/>
                            </label>
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" image="launch_screen" translatesAutoresizingMaskIntoConstraints="NO" id="5zL-5s-aPw">
                                <rect key="frame" x="-53" y="-114" width="536" height="1119"/>
                            </imageView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="Bcu-3y-fUS"/>
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                        <constraints>
                            <constraint firstItem="5zL-5s-aPw" firstAttribute="leading" secondItem="Ze5-6b-2t3" secondAttribute="leading" constant="-53" id="4hQ-7u-fIM"/>
                            <constraint firstAttribute="bottom" secondItem="5zL-5s-aPw" secondAttribute="bottom" constant="-73" id="ChZ-h1-d0A"/>
                            <constraint firstAttribute="trailing" secondItem="5zL-5s-aPw" secondAttribute="trailing" constant="-53" id="G4B-D0-duM"/>
                            <constraint firstItem="5zL-5s-aPw" firstAttribute="top" secondItem="Ze5-6b-2t3" secondAttribute="top" constant="-114" id="crz-Xs-bC0"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="50.467289719626166" y="373.86609071274302"/>
        </scene>
    </scenes>
    <resources>
        <image name="launch_screen" width="736" height="1632"/>
    </resources>
</document>
`,
                language: 'plaintext'
            },
            {
                name: 'MapManager.swift',
                path: 'Radiant/MapManager.swift',
                type: 'file',
                content: `//
//  MapManager.swift
//  Radiant
//
//  Created by Ben Dreyer on 8/6/23.
//

import Foundation
import MapKit
import CoreLocation

class MapManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    
    @Published var authorizationStatus: CLAuthorizationStatus?
    @Published var region: MKCoordinateRegion = MKCoordinateRegion(
        center: CLLocationCoordinate2D(
            latitude: 37.80341200169129,
            longitude:  -122.40623140737449),
        span: MKCoordinateSpan(
            latitudeDelta: 0.04,
            longitudeDelta: 0.04))
    
    // Filter Bubbles
    @Published var focusedFilter: Int = 0
    // Filters = [Therapists (0), Primary Care (1), Pyschology (2), Fitness (3), Rehabilitation (4)]
    
    @Published var isDetailedPopupShowing: Bool = false
    @Published var focusedDoctor: Int = 0
    
    
    var locationManager = CLLocationManager()
    
    var locations = [
        Location(name: "Ferry Building", coordinate: CLLocationCoordinate2D(latitude: 37.796154530569595, longitude: -122.3923854711943)),
        Location(name: "Coit Tower", coordinate: CLLocationCoordinate2D(latitude: 37.80381187785741, longitude: -122.44520093694825)),
        Location(name: "Tenderloin", coordinate: CLLocationCoordinate2D(latitude: 37.786, longitude: -122.41520093694825)),
        Location(name: "Sum", coordinate: CLLocationCoordinate2D(latitude: 37.80081187785741, longitude: -122.41520093694825))
    ]
    
    override init() {
        super.init()
        locationManager.delegate = self
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        switch manager.authorizationStatus {
        case .authorizedWhenInUse: // Location services are available
            authorizationStatus = .authorizedWhenInUse
            manager.requestLocation()
            self.region = MKCoordinateRegion(
                center: CLLocationCoordinate2D(
                    latitude: manager.location?.coordinate.latitude ?? 0, longitude: manager.location?.coordinate.longitude ?? 0),
                span: MKCoordinateSpan(
                    latitudeDelta: 0.03, longitudeDelta: 0.03)
            )
            break
        case .restricted, .denied: // Location services are unavailable
            authorizationStatus = .restricted
            break
        case .notDetermined: // Auth not determined yet
            authorizationStatus = .notDetermined
            manager.requestWhenInUseAuthorization()
            break
        default:
            break
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // Insert code to handle location updates
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("error: \\(error.localizedDescription)")
    }
    
}


struct Location: Identifiable {
    let id = UUID()
    let name: String
    let coordinate: CLLocationCoordinate2D
}
`,
                language: 'plaintext'
            },
            {
                name: 'Models',
                path: 'Radiant/Models',
                type: 'directory',
                children: [
                    {
                        name: 'CheckIn.swift',
                        path: 'Radiant/Models/CheckIn.swift',
                        type: 'file',
                        content: `//
//  CheckIn.swift
//  Radiant
//
//  Created by Ben Dreyer on 8/11/23.
//

import Foundation


public struct CheckIn: Codable {
    var userId: String?
    var date: String?
    var goals: [String]?
    var gratitude: String?
    var happinessScore: Double?
    var depressionScore: Double?
    var anxietyScore: Double?
    var journalEntry: String?
    // Premium Only
    var isPremiumCheckInPhoto: Bool?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ForumPost.swift',
                        path: 'Radiant/Models/ForumPost.swift',
                        type: 'file',
                        content: `//
//  ForumPost.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/23/23.
//

import Foundation
import Firebase
import FirebaseFirestore
import FirebaseFirestoreSwift

struct ForumPost: Codable, Identifiable {
//    @DocumentID var id: String?
    var id: String?
    var authorID: String?
    var authorUsername: String?
    var authorProfilePhoto: String?
    var category: String?
    var date: Date?
    // Var used to read the date Timestamp in firestore
    var timestamp: Timestamp?
    var content: String?
    var reportCount: Int?
    var likes: [String]?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'ForumPostComment.swift',
                        path: 'Radiant/Models/ForumPostComment.swift',
                        type: 'file',
                        content: `//
//  ForumPostComment.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/23/23.
//

import Foundation
import FirebaseFirestoreSwift

struct ForumPostComment: Codable, Identifiable {
//    @DocumentID var id: String?
    var id: String?
    var postID: String?
    var parentCommentID: String?
    var authorID: String?
    var authorUsername: String?
    var authorProfilePhoto: String?
    var date: Date?
    var commentCategory: String?
    var content: String?
    var likes: [String]?
    var reportCount: Int?
    
    // Var will never be stored in firebase, only used when translating back from firebase -> swift
    var isCommentLikedByCurrentUser: Bool?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'Message.swift',
                        path: 'Radiant/Models/Message.swift',
                        type: 'file',
                        content: `//
//  Message.swift
//  Radiant
//
//  Created by Ben Dreyer on 6/1/23.
//

import Foundation

struct Message: Codable, Identifiable {
    // Firebase will assign a docID automatically
//    @DocumentID var id: String?
    // this ID is necessary for swift to display messages in a list in the UI.
    // At read time, assign the firebase @docID to this var, don't set the ID when writing to database
    var id: String?
    // The user that this message belongs to
    var userID: String?
    // Denotes if this is a message from the user or the chat bot
    var isMessageFromUser: Bool?
    // Message body
    var content: String?
    // Date time
    var date: Date?
}
`,
                        language: 'plaintext'
                    },
                    {
                        name: 'UserProfile.swift',
                        path: 'Radiant/Models/UserProfile.swift',
                        type: 'file',
                        content: `//
//  UserProfile.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/7/23.
//

import Foundation
import FirebaseCore
import FirebaseFirestore
import FirebaseFirestoreSwift
import SwiftUI


struct UserProfile: Codable {
    @DocumentID var id: String?
    var email: String?
    var name: String?
    var displayName: String?
    var birthday: Date?
    var weight: Int?
    var height: Double?
    var userPhotoNonPremium: String?
    
    var lastCheckinDate: String?
//    var checkIns: [CheckIn]?
    
    // Login Info
    var hasUserCompletedWelcomeSurvey: Bool?
    var hasUserEnteredBetaCode: Bool?
    
    // Premium Features
    var isPremiumUser: Bool?
    var doesPremiumUserHaveCustomProfilePicture: Bool?
    // Community Forum
    var lastForumPostDate: Date?
    var numPostsToday: Int?
    var lastForumCommentDate: Date?
    var numCommentsToday: Int?
    // Chat
    var lastMessageSendDate: Date?
    var numMessagesSentToday: Int?
}
`,
                        language: 'plaintext'
                    }
                ]
            },
            {
                name: 'Preview Content',
                path: 'Radiant/Preview Content',
                type: 'directory',
                children: [
                    {
                        name: 'Preview Assets.xcassets',
                        path: 'Radiant/Preview Content/Preview Assets.xcassets',
                        type: 'directory',
                        children: [
                            {
                                name: 'Contents.json',
                                path: 'Radiant/Preview Content/Preview Assets.xcassets/Contents.json',
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
                name: 'Radiant.entitlements',
                path: 'Radiant/Radiant.entitlements',
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
                name: 'RadiantApp.swift',
                path: 'Radiant/RadiantApp.swift',
                type: 'file',
                content: `//
//  RadiantApp.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/2/23.
//

import SwiftUI
import FirebaseCore
import FirebaseFirestore
import FirebaseAuth
import FirebaseStorage
import GoogleMobileAds

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        // Use Firebase library to configure APIs.
        FirebaseApp.configure()
        let db = Firestore.firestore()
        let storage = Storage.storage()
        print("Database: \\(db)")
        
//        // Initialize the Google Mobile Ads SDK.
//        GADMobileAds.sharedInstance().start(completionHandler: nil)
        
        // print the login status of the user
        if let loginStatus = UserDefaults.standard.object(forKey: loginStatusKey) as? Bool {
            print("User login status on app launch finish: \\( loginStatus )")
        } else {
            print("User login status on app launch finish: \\( String(describing: UserDefaults.standard.object(forKey: loginStatusKey)) ))")
            UserDefaults.standard.set(false, forKey: loginStatusKey)
        }
        
        return true
    }
}

@main
struct RadiantApp: App {
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate
    
    @StateObject
        private var entitlementManager: EntitlementManager

    @StateObject
    private var purchaseManager: PurchaseManager
    
    init() {
        let entitlementManager = EntitlementManager()
        let purchaseManager = PurchaseManager(entitlementManager: entitlementManager)
        
        self._entitlementManager = StateObject(wrappedValue: entitlementManager)
        self._purchaseManager = StateObject(wrappedValue: purchaseManager)
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(entitlementManager)
                .environmentObject(purchaseManager)
                .task {
                    await purchaseManager.updatePurchasedProducts()
                }
        }
    }
}
`,
                language: 'plaintext'
            },
            {
                name: 'UserDefaults.swift',
                path: 'Radiant/UserDefaults.swift',
                type: 'file',
                content: `//
//  UserDefaults.swift
//  Radiant
//
//  Created by Ben Dreyer on 5/5/23.
//

import Foundation




// User Defaults for logging in a returning user
let emailKey = "email"
// Need to add something for apple sign in
let loginStatusKey = "loginStatus"

// User Default for beta code access
let isUserValidForBetaKey = "isUserValidForBeta"

// User default for completing the welcome survey
let hasUserCompletedWelcomeSurveyKey = "hasUserCompletedWelcomeSurvey"
`,
                language: 'plaintext'
            },
            {
                name: 'Views',
                path: 'Radiant/Views',
                type: 'directory',

            }
        ]
    },
    {
        name: 'UnitTests',
        path: 'UnitTests',
        type: 'directory',

    }
];
