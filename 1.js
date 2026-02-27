let cards = [
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

let locationsObj  = [
  {
    "no": "1",
    "img": "./image/conspire.png",
    "name": "conspire",
    "type": "emperor",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSolari",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainEmperorInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "2",
    "img": "./image/wealth.png",
    "name": "wealth",
    "type": "emperor",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSolari",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainEmperorInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "3",
    "img": "./image/sardaukar.png",
    "name": "sardaukar",
    "type": "emperor",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainEmperorInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "4",
    "img": "./image/dutiful-service.png",
    "name": "dutiful service",
    "type": "emperor",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainContract",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainEmperorInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "5",
    "img": "./image/heighliner.png",
    "name": "heighliner",
    "type": "spacingGuild",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 6,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainWater",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "6",
    "img": "./image/foldspace.png",
    "name": "foldspace",
    "type": "spacingGuild",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainFoldspace",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "7",
    "img": "./image/deliver-supplies.png",
    "name": "deliver supplies",
    "type": "spacingGuild",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "8",
    "img": "./image/selective-breeding.png",
    "name": "selective breeding",
    "type": "beneGesserit",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "trashCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "9",
    "img": "./image/secrets.png",
    "name": "secrets",
    "type": "beneGesserit",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "stealIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainBeneGesseritInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "stealIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainBeneGesseritInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "10",
    "img": "./image/espionage.png",
    "name": "espionage",
    "type": "beneGesserit",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "placeSpy",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpacingGuildInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "11",
    "img": "./image/hardy-warriors.png",
    "name": "hardy warriors",
    "type": "fremen",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainFremenInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "12",
    "img": "./image/stillsuits.png",
    "name": "stillsuits",
    "type": "fremen",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainFremenInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "13",
    "img": "./image/desert-tactics.png",
    "name": "desert tactics",
    "type": "fremen",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "trashCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainFremenInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "14",
    "img": "./image/fremkit.png",
    "name": "fremkit",
    "type": "fremen",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainFremenInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "15",
    "img": "./image/mentat.png",
    "name": "mentat",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainMentat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "16",
    "img": "./image/high-council.png",
    "name": "high council",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 5,
          "condition": "noHighCouncil",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainHighCouncil",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 5,
          "condition": "haveHighCouncil",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "spice",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 5,
          "condition": "noHighCouncil",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainHighCouncil",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "17",
    "img": "./image/swordmaster.png",
    "name": "swordmaster",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 8,
          "condition": "firstSwordmaster",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSwordmaster",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 6,
          "condition": "secondSwordmaster",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSwordmaster",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 8,
          "condition": "noSwordmaster",
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSwordmaster",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "18",
    "img": "./image/rally-troops.png",
    "name": "rally troops",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "19",
    "img": "./image/hall-of-oratory.png",
    "name": "hall of oratory",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainPersuasion",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "20",
    "img": "./image/dreadnought.png",
    "name": "dreadnought",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "ix": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainDreadnought",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "buyTech",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "21",
    "img": "./image/tech-negotiation.png",
    "name": "tech negotiation",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "ix": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainPersuasion",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "discountBuyTech",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gainPersuasion",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "discountTechToken",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "22",
    "img": "./image/imperial-privilege.png",
    "name": "imperial privilege",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySolari",
          "amount": 3,
          "condition": "emperorInfluence",
          "conditionValue": 2
        },
        {
          "group": 12,
          "branch": 0,
          "type": "returnAgent",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 2,
          "branch": 0,
          "type": "nestedAction",
          "subSteps": [
            {
              "group": 11,
              "branch": 0,
              "type": "trashIntrigue",
              "amount": 1,
              "condition": null,
              "conditionValue": null
            },
            {
              "group": 12,
              "branch": 0,
              "type": "drawIntrigue",
              "amount": 1,
              "condition": null,
              "conditionValue": null
            }
          ]
        }
      ]
    }
  },
  {
    "no": "23",
    "img": "./image/assembly-hall.png",
    "name": "assembly hall",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainPersuasion",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "24",
    "img": "./image/gather-support.png",
    "name": "gather support",
    "type": "landsraad",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "paySolari",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 1,
          "type": "gainTroop",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 1,
          "type": "gainWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "25",
    "img": "./image/arrakeen.png",
    "name": "arrakeen",
    "type": "city",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "26",
    "img": "./image/carthag.png",
    "name": "carthag",
    "type": "city",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "drawIntrigue",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "27",
    "img": "./image/research-station.png",
    "name": "research station",
    "type": "city",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainTroop",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "immortality": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "drawCard",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "research",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "28",
    "img": "./image/sietch-tabr.png",
    "name": "sietch tabr",
    "type": "city",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainMakerHook",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainWater",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gainWater",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 1,
          "type": "breakWall",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 1,
          "type": "combat",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainTroop",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainWater",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": "fremenInfluence",
          "conditionValue": 2
        }
      ]
    }
  },
  {
    "no": "29",
    "img": "./image/spice-refinery.png",
    "name": "spice refinery",
    "type": "city",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSolari",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "paySpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 1,
          "type": "gainSolari",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 1,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "30",
    "img": "./image/imperial-basin.png",
    "name": "imperial basin",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "31",
    "img": "./image/hagga-basin.png",
    "name": "hagga basin",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpice",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "summonSandworm",
          "amount": 1,
          "condition": "haveMakerHook",
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": "haveMakerHook",
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "combat",
          "amount": 1,
          "condition": "haveMakerHook",
          "conditionValue": null
        }
      ],
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpice",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "32",
    "img": "./image/the-great-flat.png",
    "name": "the great flat",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpice",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "33",
    "img": "./image/sell-melange.png",
    "name": "sell melange",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 2,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSolari",
          "amount": 6,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "paySpice",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 1,
          "type": "gainSolari",
          "amount": 8,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 2,
          "type": "paySpice",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 2,
          "type": "gainSolari",
          "amount": 10,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 3,
          "type": "paySpice",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 3,
          "type": "gainSolari",
          "amount": 12,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "34",
    "img": "./image/secure-contract.png",
    "name": "secure contract",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "base": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSolari",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        }
      ],
      "ix": null
    }
  },
  {
    "no": "35",
    "img": "./image/smuggling.png",
    "name": "smuggling",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "ix": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSolari",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "moveFreighter",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "36",
    "img": "./image/interstellar-shipping.png",
    "name": "interstellar shipping",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "ix": [
        {
          "group": 11,
          "branch": 0,
          "type": "moveFreighter",
          "amount": 2,
          "condition": "spacingGuildnfluence",
          "conditionValue": 2
        }
      ]
    }
  },
  {
    "no": "37",
    "img": "./image/deep-desert.png",
    "name": "deep desert",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "payWater",
          "amount": 3,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSpice",
          "amount": 4,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "summonSandworm",
          "amount": 2,
          "condition": "haveMakerHook",
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": "haveMakerHook",
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "combat",
          "amount": 1,
          "condition": "haveMakerHook",
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "38",
    "img": "./image/shipping.png",
    "name": "shipping",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "paySpice",
          "amount": 3,
          "condition": "spacingGuildInfluence",
          "conditionValue": 2
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainSolari",
          "amount": 5,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 12,
          "branch": 0,
          "type": "gainAnyInfluence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "39",
    "img": "./image/accept-contract.png",
    "name": "accept contract",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainContract",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "40",
    "img": "./image/tuek's-sietch.png",
    "name": "tuek's sietch",
    "type": "spice trade",
    "connect": [],
    "variants": {
      "bloodline": [
        {
          "group": 11,
          "branch": 0,
          "type": "gainSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 0,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "drawCard",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gainMakerSpice",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "combat",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "101",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      3,
      4
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "102",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      5,
      7
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "103",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      9,
      10
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "104",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      13,
      14
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "105",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      16,
      17,
      22
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "106",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      23,
      24
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "107",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      25,
      29
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "108",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      27,
      29
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "109",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      27,
      28
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "110",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      30
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "111",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      31
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "112",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      37
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "113",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      38,
      39
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "114",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      20,
      21
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  },
  {
    "no": "115",
    "img": "./image/spy-post.png",
    "name": "spy post",
    "type": "spy post",
    "connect": [
      35,
      36
    ],
    "variants": {
      "uprising": [
        {
          "group": 11,
          "branch": 0,
          "type": "infiltrate",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        },
        {
          "group": 11,
          "branch": 1,
          "type": "gatherIntelligence",
          "amount": 1,
          "condition": null,
          "conditionValue": null
        }
      ]
    }
  }
];


// 建立一個遞迴函式來抓取所有 type（包含 nestedAction 內部的）
function getTypes(effects) {
    if (!Array.isArray(effects)) return [];
    
    let types = [];
    effects.forEach(e => {
        if (e.type) types.push(e.type);
        // 如果有嵌套動作，遞迴抓取內部的 type
        if (e.type === "nestedAction" && e.subSteps) {
            types = types.concat(getTypes(e.subSteps));
        }
    });
    return types;
}


const allActionsInJson = [
    // 處理地點
    ...Object.values(locationsObj).flatMap(loc => 
        Object.values(loc.variants || {}).flatMap(v => getTypes(v))
    ),
    // 處理卡牌 (加上 ?. 防止 undefined)
    ...cards.flatMap(card => getTypes(card.agentEffect))
];

// 去重並排序
const uniqueActions = [...new Set(allActionsInJson.filter(Boolean))].sort();

console.log("✅ 成功提取所有 Action Type：", uniqueActions);

// 自動生成可以複製的定義檔格式
const actionTypesObject = uniqueActions.reduce((obj, type) => {
    obj[type] = type;
    return obj;
}, {});

console.log("📋 複製以下內容到你的 actionTypes.js：");
console.log("export const ACTION_TYPES = " + JSON.stringify(actionTypesObject, null, 2) + ";");