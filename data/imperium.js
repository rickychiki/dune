window.imperium = [
  {
    "name": "Sardaukar Soldier",
    "numberOfCopy": "1",
    "cost": "1",
    "location": [
      "city"
    ],
    "tag": [
      "emperor"
    ],
    "trashEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Smuggler's Harvester",
    "numberOfCopy": "2",
    "cost": "1",
    "location": [
      "spiceTrade"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": "sentAgentToMaker",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Space-time Folding",
    "numberOfCopy": "1",
    "cost": "1",
    "location": [
      "spacingGuild"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "discardCard",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "drawCard",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          }
        ]
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "discardSpacingGuildCard",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Unswerving Loyalty",
    "numberOfCopy": "2",
    "cost": "1",
    "location": [],
    "tag": [
      "fremen"
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "deployOrRetreatTroop",
        "amount": 1,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Weirding Woman",
    "numberOfCopy": "2",
    "cost": "1",
    "location": [
      "city",
      "spiceTrade"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "returnThisCardToHand",
        "amount": 1,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Desert Survival",
    "numberOfCopy": "2",
    "cost": "2",
    "location": [
      "spiceTrade"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Fedaykin Stilltent",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "spiceTrade"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 1,
        "condition": "sentAgentToMaker",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Hidden Missive",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "landsraad"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 1,
        "condition": "beneGesseritInfluence",
        "conditionValue": 2
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "beneGesseritInfluence",
        "conditionValue": 2
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Imperial Spymaster",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "emperor",
      "spy"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": "recallSpyThisTurn",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Maker Keeper",
    "numberOfCopy": "2",
    "cost": "2",
    "location": [
      "city"
    ],
    "tag": [
      "beneGesserit",
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": "beneGesseritInfluence",
        "conditionValue": 2
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": "fremenInfluence",
        "conditionValue": 2
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Reliable Informant",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "spacingGuild"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": "onSpacingGuildBeneGesseritFremen",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Spy Network",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [],
    "tag": [
      "emperor",
      "spacingGuild"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "recallSpy",
            "amount": 1,
            "condition": "spyOnBoard",
            "conditionValue": 2
          },
          {
            "group": 2,
            "branch": 0,
            "type": "drawIntrigue",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          }
        ]
      }
    ]
  },
  {
    "name": "Undercover Asset",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [
      "emperor",
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "ignoreInfluenceRequirement",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 1,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Wheels Within Wheels",
    "numberOfCopy": "1",
    "cost": "2",
    "location": [
      "spy"
    ],
    "tag": [
      "emperor",
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 2,
        "condition": "emperorInfluence",
        "conditionValue": 2
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": "spacingGuildInfluence",
        "conditionValue": 2
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Bene Gesserit Operative",
    "numberOfCopy": "2",
    "cost": "3",
    "location": [
      "beneGesserit"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": "spyOnBoard",
        "conditionValue": 2
      }
    ]
  },
  {
    "name": "Branching Path",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "city",
      "beneGesserit"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashIntrigue",
        "amount": 1,
        "condition": "beneGesseritAlliance",
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Calculus of Power",
    "numberOfCopy": "2",
    "cost": "3",
    "location": [
      "city",
      "spy"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "trashAnotherEmperorCardInPlay",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "gainSword",
            "amount": 3,
            "condition": null,
            "conditionValue": null
          }
        ]
      }
    ]
  },
  {
    "name": "Cargo Runner",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "completedContract",
        "conditionValue": 2
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "completedContract",
        "conditionValue": 4
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Covert Operation",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "spy"
    ],
    "tag": [],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "opponentDiscardCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Dangerous Rhetoric",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "landsraad",
      "spy"
    ],
    "tag": [],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainAnyInfluence",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "trashThisCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Double Agent",
    "numberOfCopy": "2",
    "cost": "3",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [
      "emperor",
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeDeepCoverSpy",
        "amount": 1,
        "condition": "onAgentSpace",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Ecological Testing Station",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "city",
      "fremen"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "payWater",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "drawCard",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Guild Envoy",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "emperor",
      "spacingGuild",
      "beneGesserit",
      "fremen"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "discardCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 2,
        "condition": "discardSpacingGuildCard",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Guild Spy",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "spy"
    ],
    "tag": [
      "spacingGuild"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "discardCard",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "drawCard",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          }
        ]
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": "discardSpacingGuildCard",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainEachFactionInfluenceSpyOn",
        "amount": 1,
        "condition": "acquireTheSpiceMustFlow",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Maula Pistol",
    "numberOfCopy": "2",
    "cost": "3",
    "location": [
      "city",
      "spiceTrade"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Northern Watermaster",
    "numberOfCopy": "1",
    "cost": "3",
    "location": [
      "city"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Rebel Supplier",
    "numberOfCopy": "2",
    "cost": "3",
    "location": [
      "city"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 2,
        "condition": "recallSpyThisTurn",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Paracompass",
    "numberOfCopy": "1",
    "cost": "4",
    "location": [
      "city"
    ],
    "tag": [],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": "haveHighCouncil",
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": "haveSwordmaster",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Public Spectacle",
    "numberOfCopy": "2",
    "cost": "4",
    "location": [
      "spy"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainAnyInfluence",
        "amount": 1,
        "condition": "recallSpyThisTurn",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Sardaukar Coordination",
    "numberOfCopy": "2",
    "cost": "4",
    "location": [
      "landsraad",
      "emperor"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "deployRecruitTroop",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": "eachRevealEmperorCard",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Shishakli",
    "numberOfCopy": "1",
    "cost": "4",
    "location": [
      "city",
      "spiceTrade"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainFremenInfluence",
        "amount": 1,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Smuggler's Haven",
    "numberOfCopy": "1",
    "cost": "4",
    "location": [
      "spiceTrade",
      "spacingGuild"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "paySpice",
        "amount": 4,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": "spyOnMaker",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Southern Elders",
    "numberOfCopy": "1",
    "cost": "4",
    "location": [
      "beneGesserit",
      "fremen"
    ],
    "tag": [
      "beneGesserit",
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 2,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Tread in Darkness",
    "numberOfCopy": "2",
    "cost": "4",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashCard",
        "amount": 1,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Truthtrance",
    "numberOfCopy": "2",
    "cost": "4",
    "location": [
      "emperor",
      "spacingGuild",
      "beneGesserit",
      "fremen"
    ],
    "tag": [
      "beneGesserit"
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Captured Mentat",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "landsraad",
      "spiceTrade"
    ],
    "tag": [],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "discardCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "lostAnyInfluence",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "gainAnyInfluence",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          }
        ]
      }
    ]
  },
  {
    "name": "Chani, Clever Tactician",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "city",
      "spiceTrade",
      "fremen"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": "unitInConflict",
        "conditionValue": 3
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "retreatTroop",
            "amount": 2,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "gainSword",
            "amount": 4,
            "condition": null,
            "conditionValue": null
          }
        ]
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": "fremenBond",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Delivery Agreement",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "city"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "discardCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "takeContract",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 1,
        "type": "trashThisCard",
        "amount": 1,
        "condition": "completedContract",
        "conditionValue": 4
      },
      {
        "group": 2,
        "branch": 1,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "In High Places",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "emperor",
      "beneGesserit"
    ],
    "tag": [
      "emperor",
      "beneGesserit"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": "anotherBeneCardInPlay",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "recallSpy",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "gainPersuasion",
            "amount": 3,
            "condition": null,
            "conditionValue": null
          }
        ]
      }
    ]
  },
  {
    "name": "Leadership",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "spiceTrade",
      "fremen"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "eachSandwormInConflict",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 1,
        "condition": "eachRevealSwordCard",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Spacing Guild's Favor",
    "numberOfCopy": "2",
    "cost": "5",
    "location": [
      "spiceTrade",
      "spacingGuild"
    ],
    "tag": [
      "spacingGuild"
    ],
    "discardEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "nestedAction",
        "subSteps": [
          {
            "group": 1,
            "branch": 0,
            "type": "paySpice",
            "amount": 3,
            "condition": null,
            "conditionValue": null
          },
          {
            "group": 2,
            "branch": 0,
            "type": "gainAnyInfluence",
            "amount": 1,
            "condition": null,
            "conditionValue": null
          }
        ]
      }
    ]
  },
  {
    "name": "Strike Fleet",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "spy"
    ],
    "tag": [],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 3,
        "condition": "recallSpyThisTurn",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 3,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Subversive Advisor",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "spy"
    ],
    "tag": [],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "placeSpy",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSameInfluence",
        "amount": 1,
        "condition": "sentAgentToFaction",
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "trashThisCard",
        "amount": 1,
        "condition": "sentAgentToFaction",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Theacherous Maneuver",
    "numberOfCopy": "1",
    "cost": "5",
    "location": [
      "emperor",
      "spacingGuild",
      "beneGesserit",
      "fremen"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashThisCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "trashEmperorCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "gainSameInfluence",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Corrinth City",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "landsraad",
      "emperor"
    ],
    "tag": [
      "emperor"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "discardCard",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "paySolari",
        "amount": 5,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 5,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 1,
        "type": "paySolari",
        "amount": 5,
        "condition": "noHighCouncil",
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 1,
        "type": "gainHighCouncil",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Desert Power",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "spiceTrade"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": "sentAgentToMaker",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 1,
        "type": "payWater",
        "amount": 1,
        "condition": "haveMakerHook",
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 1,
        "type": "summonSandworm",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Junction Headquaters",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "trashIntrigue",
        "amount": 1,
        "condition": "spacingGuildAlliance",
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "paySpice",
        "amount": 2,
        "condition": "spacingGuildAlliance",
        "conditionValue": null
      },
      {
        "group": 2,
        "branch": 0,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainWater",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Price is No Object",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "emperor",
      "beneGesserit"
    ],
    "tag": [
      "emperor",
      "beneGesserit"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "acquireCardUsingSolari",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSolari",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Priority Contracts",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "landsraad",
      "spiceTrade"
    ],
    "tag": [
      "spacingGuild"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "takeContract",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 1,
        "type": "trashThisCard",
        "amount": 1,
        "condition": "completedContract",
        "conditionValue": 4
      },
      {
        "group": 2,
        "branch": 1,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Stilgar, The Devoted",
    "numberOfCopy": "1",
    "cost": "6",
    "location": [
      "city",
      "spiceTrade",
      "fremen"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": "eachFremenCard",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Interstellar Trade",
    "numberOfCopy": "1",
    "cost": "7",
    "location": [
      "landsraad",
      "city",
      "spiceTrade"
    ],
    "tag": [],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "takeContract",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainAnyInfluence",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 1,
        "condition": "eachCompletedContract",
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Long Live the Fighters",
    "numberOfCopy": "1",
    "cost": "7",
    "location": [
      "city",
      "fremen"
    ],
    "tag": [
      "fremen"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "lookAtTopCardDrawTrashDiscard",
        "amount": 3,
        "condition": "deckHasCard",
        "conditionValue": 3
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 3,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Overthrow",
    "numberOfCopy": "1",
    "cost": "8",
    "location": [
      "emperor",
      "spacingGuild",
      "beneGesserit",
      "fremen"
    ],
    "tag": [],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawIntrigue",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSameInfluence",
        "amount": 1,
        "condition": "sendAgentToFaction",
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSword",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainTroop",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Steersman",
    "numberOfCopy": "1",
    "cost": "8",
    "location": [
      "landsraad",
      "city",
      "spiceTrade",
      "spacingGuild"
    ],
    "tag": [
      "spacingGuild"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpacingGuildInfluence",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "returnAgent",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      },
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "Prepare The Way",
    "numberOfCopy": "8",
    "cost": "2",
    "location": [
      "landsraad",
      "city"
    ],
    "tag": [
      "beneGesserit"
    ],
    "agentEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "drawCard",
        "amount": 1,
        "condition": "beneGesseritInfluence",
        "conditionValue": 2
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainPersuasion",
        "amount": 2,
        "condition": null,
        "conditionValue": null
      }
    ]
  },
  {
    "name": "The Spice Must Flow",
    "numberOfCopy": "10",
    "cost": "9",
    "location": [],
    "tag": [
      "spacingGuild"
    ],
    "acquireEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainVictoryPoint",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ],
    "revealEffect": [
      {
        "group": 1,
        "branch": 0,
        "type": "gainSpice",
        "amount": 1,
        "condition": null,
        "conditionValue": null
      }
    ]
  }
];
