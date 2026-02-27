type GameSettings = {
  hasRiseOfIx: boolean;     // 決定是否有科技卡、戰鬥船、新格子
  hasImmortality: boolean;  // 決定是否有研究進度條、甲蟲
  hasBloodlines: boolean;   // 決定是否有指揮官、新市場
  hasCHOAM : boolean;
};

// 1. 資源基礎類型 (維持原樣，但增加收納)
type Resources = {
  water: number;
  spice: number;
  solari: number;
  vp: number;          // 縮寫 victoryPoints 節省 code 長度
  persuasion: number;  // 本回合產生的說服力
  sword: number;       // 本回合產生的戰鬥力
};

type UnitState = {
  troops: number;        // 普通軍隊
  dreadnoughts: number;  // 戰鬥船 (崛起)
  sandworms: number;     // 沙蟲 (血脈/核心)
  sardaukarCommanders: number;
  agent: number;
};

type CommanderAbility = {
  id: string;            // 指揮官能力 ID
  usedThisRound: boolean; // 是否本回合已使用過 (如果是耗材型)
};

type Contract = {
  id: string;
  completed: boolean;
}

// 2. 玩家狀態
type PlayerState = {
  id: string;
  leader: string;
  res: Resources;      // 縮寫
  agents: number;      // 剩餘可用代理人數
  spy: number;
  garrison: UnitState;
  combat: UnitState;
  influence: {
    fremen: number;
    bg: number;        // beneGesserit 縮寫
    guild: number;
    emperor: number;
  };

  // 進階解鎖狀態
  highCouncil: boolean;
  swordmaster: boolean;

  // 科技與卡牌
  // tech 使用 number[] 很好，記錄科技卡的 ID
  commenderAbility: CommanderAbility[];
  tech: number[];
  contract: Contract[];

  // 牌組使用 ID 陣列
  deck: number[];       // 抽牌堆
  hand: number[];       // 手牌
  discard: number[];    // 棄牌堆
  trash: number[];      // 移除遊戲的牌
  intrigue: number[];
};

// 3. 行動紀錄 (加入更精確的內容)
type MoveLog = {
  pIdx: number;         // 使用 Player Index (0,1,2) 比 ID 省空間
  loc: string;          // Location ID
  card?: number;        // 使用的卡片 ID (Reveal Turn 可能沒用卡)
  type: 'AGENT' | 'REVEAL' | 'RESEARCH' | "INTRIGUE";
  // 記錄該動作導致的資源「淨變動」，方便 Undo 或顯示 Log
  diff?: Partial<Resources>;
};

// 4. 完整的遊戲快照
type GameState = {
  settings: GameSettings;
  gid: string;          // Game ID
  rd: number;           // Round
  turn: number;         // 誰的行動序
  players: PlayerState[];
  board: {
    occ: Record<string, number[]>; // { "Arrakeen": 0 } 記錄玩家 Index]
    spies: Record<string, number[]>;
    market: number[];            // 帝國橫排，改用 number[] 統一
    marketDeck: number[];
    tech: number[];
    commenderAbility: CommanderAbility[];
    contract: Contract[];
    reserve: {                   // 儲備卡數量 (如 奧瑞金、探險)
      theSpiceMustFlow: number;
      arrakisLiaison: number;
    };
    conflict: number;            // 當前衝突卡 ID
    conflictDeck: number[];      // 剩餘衝突卡堆
  };
  log: MoveLog[];                // 本回合 Move
};