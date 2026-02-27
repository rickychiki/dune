export const ENTITIES = {
  // 資源
  SOLARI: "solari",
  SPICE: "spice",
  WATER: "water",
  VICTORY_POINT: "victoryPoint",
  PERSUASION: "persuasion",

  // 軍事
  TROOP: "troop",
  SWORD: "sword",
  DREADNOUGHT: "dreadnought",
  SANDWORM: "sandworm",

  // 影響力/派系
  EMPEROR: "emperor",
  SPACING_GUILD: "spacingGuild",
  BENE_GESSERIT: "beneGesserit",
  FREMEN: "fremen",

  // 卡牌相關
  CARD: "card",
  INTRIGUE: "intrigue",

  // 狀態/間諜
  SPY: "spy",
  MENTAT: "mentat",
  SWORDMASTER: "swordmaster",
  HIGH_COUNCIL: "highCouncil",
  MAKER_HOOK: "makerHook",
  TECH: "tech",
  CONTRACT: "contract",
};

export const ACTION_TYPES = {
  // 得到資源
  GAIN_SOLARI: "gainSolari",
  GAIN_SPICE: "gainSpice",
  GAIN_WATER: "gainWater",
  GAIN_MAKER_SPICE: "gainMakerSpice",
  GAIN_VICTORY_POINT: "gainVictoryPoint",
  GAIN_PERSUASION: "gainPersuasion",
  PAY_SOLARI: "paySolari",
  PAY_SPICE: "paySpice",
  PAY_WATER: "payWater",

  // 卡牌與抽牌
  RETURN_THIS_CARD_TO_HAND: "returnThisCardToHand",
  LOOK_AT_TOP_CARD_DRAW_TRASH_DISCARD: "lookAtTopCardDrawTrashDiscard",
  DRAW_CARD: "drawCard",
  DISCARD_CARD: "discardCard",
  OPPONENT_DISCARD_CARD: "opponentDiscardCard",
  TRASH_CARD: "trashCard",
  TRASH_EMPEROR_CARD_IN_HAND: "trashEmperorCardInHand",
  TRASH_ANOTHER_EMPEROR_CARD_IN_PLAY: "trashAnotherEmperorCardInPlay",
  GAIN_FOLDSPACE: "gainFoldspace",
  ACQUIRE_CARD_USING_SOLARI: "acquireCardUsingSolari",

  // 陰謀卡
  DRAW_INTRIGUE: "drawIntrigue",
  STEAL_INTRIGUE: "stealIntrigue",
  TRASH_INTRIGUE: "trashIntrigue",
  TRASH_THIS_CARD: "trashThisCard",

  // 戰鬥與軍事
  GAIN_SWORD: "gainSword",
  GAIN_TROOP: "gainTroop",
  GAIN_DREADNOUGHT: "gainDreadnought",
  SUMMON_SANDWORM: "summonSandworm",
  DEPLOY_RECRUIT_TROOP: "deployRecruitTroop",
  COMBAT: "combat",
  RETREAT_TROOP: "retreatTroop",
  DEPLOY_OR_RETREAT_TROOP: "deployOrRetreatTroop",

  // 影響力
  GAIN_EMPEROR_INFLUENCE: "gainEmperorInfluence",
  GAIN_SPACING_GUILD_INFLUENCE: "gainSpacingGuildInfluence",
  GAIN_BENE_GESSERIT_INFLUENCE: "gainBeneGesseritInfluence",
  GAIN_FREMEN_INFLUENCE: "gainFremenInfluence",
  GAIN_ANY_INFLUENCE: "gainAnyInfluence",
  GAIN_SAME_INFLUENCE: "gainSameInfluence",
  LOST_ANY_INFLUENCE: "lostAnyInfluence",
  GAIN_EACH_FACTION_INFLUENCE_SPY_ON: "gainEachFactionInfluenceSpyOn",

  // 狀態
  GAIN_MENTAT: "gainMentat",
  GAIN_SWORDMASTER: "gainSwordmaster",
  GAIN_HIGH_COUNCIL: "gainHighCouncil",
  GAIN_MAKER_HOOK: "gainMakerHook",
  BREAK_WALL: "breakWall",

  // 間諜
  INFILTRATE: "infiltrate",
  GATHER_INTELLIGENCE: "gatherIntelligence",
  PLACE_SPY: "placeSpy",
  PLACE_DEEP_COVER_SPY_ON_AGENT_SPACE: "placeDeepCoverSpyOnAgentSpace",
  PLACE_SPY_ON_SPACING_GUILD_BENE_GESSERIT_FREMEN: "placeSpyplaceSpyOnSpacingGuildBeneGesseritFremen",
  RECALL_SPY: "recallSpy",

  // IX / 科技 /合約
  MOVE_FREIGHTER: "moveFreighter",
  BUY_TECH: "buyTech",
  DISCOUNT_BUY_TECH: "discountBuyTech",
  DISCOUNT_TECH_TOKEN: "discountTechToken",
  TAKE_CONTRACT: "takeContract",

  // Immortality / 研究
  RESEARCH: "research",

  // 其他
  IGNORE_INFLUENCE_REQUIREMENT: "ignoreInfluenceRequirement",
  RETURN_AGENT: "returnAgent",
  NESTED_ACTION: "nestedAction" // 加入我們之前的 camelCase 嵌套定義
};

export const CONDITION_TYPES = {
  // 影響力/同盟
  EMPEROR_INFLUENCE: "emperorInfluence",
  SPACING_GUILD_INFLUENCE: "spacingGuildInfluence",
  BENE_GESSERIT_INFLUENCE: "beneGesseritInfluence",
  FREMEN_INFLUENCE: "fremenInfluence",
  SPACING_GUILD_ALLIANCE: "spacingGuildAlliance",
  BENE_GESSERIT_ALLIANCE: "beneGesseritAlliance",

  // 卡牌
  EACH_FREMEN_CARD: "eachFremenCard",
  EACH_REVEAL_EMPEROR_CARD: "eachRevealEmperorCard",
  EACH_REVEAL_SWORD_CARD: "eachRevealSwordCard",
  ANOTHER_BENE_CARD_IN_PLAY: "anotherBeneCardInPlay",
  FREMEN_BOND: "fremenBond",
  ACQUIRE_THE_SPICE_MUST_FLOW: "acquireTheSpiceMustFlow",
  DECK_HAS_CARD: "deckHasCard",
  DISCARD_SPACING_GUILD_CARD: "discardSpacingGuildCard",

  // 合約
  COMPLETED_CONTRACT: "completedContract",
  EACH_COMPLETED_CONTRACT: "eachCompletedContract",

  // 狀態
  FIRST_SWORDMASTER: "firstSwordmaster",
  HAVE_HIGH_COUNCIL: "haveHighCouncil",
  HAVE_MAKER_HOOK: "haveMakerHook",
  HAVE_SWORDMASTER: "haveSwordmaster",
  NO_HIGH_COUNCIL: "noHighCouncil",
  NO_SWORDMASTER: "noSwordmaster",
  SECOND_SWORDMASTER: "secondSwordmaster",

  // 間諜
  SPY_ON_BOARD: "spyOnBoard",
  SPY_ON_MAKER: "spyOnMaker",
  RECALL_SPY_THIS_TURN: "recallSpyThisTurn",

  // Agent
  SEND_AGENT_TO_FACTION: "sendAgentToFaction",
  SENT_AGENT_TO_MAKER: "sentAgentToMaker",

  // 戰鬥
  EACH_SANDWORM_IN_CONFLICT: "eachSandwormInConflict",
  UNIT_IN_CONFLICT: "unitInConflict"
};