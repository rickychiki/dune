// ================= 全局 =================
let players = [];
let playerCount = 3;
let setupPlayers = [];
let currentRound = 1;
let conflictDeck = [];
let firstPlayerIndex = 0;
let edit = false;
let events = [];
let battleSummary = [];
let permanent = { swordmaster: [], highCouncil: [], makerHooks: [], tech: [], wall: [] };
let eventDraft = { playerId: null, type: null };

// ================= DB及初始化 =================
let statusEl;
let db;
let imageMap = {}; // 全域圖片網址映射

// 1. 初始化資料庫
const request = indexedDB.open("DuneAssetsDB", 1);

request.onupgradeneeded = e => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("assets")) {
        db.createObjectStore("assets", { keyPath: "path" });
    }
};

request.onsuccess = async e => {
    db = e.target.result;
    console.log("Database opened successfully");
    try {
        await loadAllAssetsFromDB(); // 啟動後自動載入

        initGameUI();
        loadGame();
    } catch (err) {
        console.error("❌ Initialization failed:", err);
    }
};

// 2. 從資料庫載入所有圖片與音效
// 2. 從資料庫載入所有圖片與音效 (Promise 版本)
function loadAllAssetsFromDB() {
    return new Promise((resolve, reject) => {
        // 確保 db 已經存在
        if (!db) {
            reject("Database not initialized");
            return;
        }

        const tx = db.transaction("assets", "readonly");
        const store = tx.objectStore("assets");
        const request = store.getAll();

        request.onsuccess = e => {
            const results = e.target.result;

            // 釋放舊的 URL 防止記憶體洩漏
            Object.values(imageMap).forEach(url => URL.revokeObjectURL(url));
            imageMap = {};

            if (results.length > 0) {
                results.forEach(item => {
                    if (item.blob) {
                        // 建議：將路徑轉為小寫存入，增加比對的成功率
                        const pathKey = item.path.toLowerCase();
                        imageMap[pathKey] = URL.createObjectURL(item.blob);
                    }
                });
                console.log(`✅ Loaded ${results.length} assets from IndexedDB`);
            } else {
                console.warn("⚠️ IndexedDB is empty.");
            }

            // 關鍵：不論有無資料，都執行 resolve() 讓 await 結束
            resolve(imageMap);
        };

        request.onerror = err => {
            console.error("❌ IndexedDB read error", err);
            reject(err);
        };
    });
}

// 3. 上傳 ZIP 並寫入資料庫
async function handleZipUpload(file) {
    // 即時抓取，如果找不到就用 console 代替，避免當機
    const el = document.getElementById('assets-status');
    const updateStatus = (text) => {
        if (el) el.textContent = text;
        else console.log("Status:", text);
    };

    updateStatus("正在解壓縮...");

    try {
        const zip = await JSZip.loadAsync(file);
        const pendingData = [];
        const fileEntries = Object.keys(zip.files).filter(name => !zip.files[name].dir && !name.includes("__MACOSX"));

        for (const filename of fileEntries) {
            const blob = await zip.files[filename].async("blob");
            pendingData.push({ path: filename, blob: blob });
        }

        const tx = db.transaction("assets", "readwrite");
        const store = tx.objectStore("assets");
        store.clear();

        pendingData.forEach(item => {
            store.put(item);
        });

        tx.oncomplete = () => {
            updateStatus(`✅ 成功載入 ${pendingData.length} 個資源！`);
            loadAllAssetsFromDB();
        };
    } catch (err) {
        console.error(err);
        updateStatus("❌ 處理 ZIP 失敗");
    }
}
// ================= se =================
// 音效物件定義
// 1. 初始化音效物件
const sounds = {
    vp: 'se/fx-gainvictorypoint.mp3',
    factions: {
        "emperor": 'se/fx-alliancetok-emp.mp3',
        "spacing guild": 'se/fx-alliancetok-space.mp3',
        "bene gesserit": 'se/fx-alliancetok-bene.mp3',
        "fremen": 'se/fx-alliancetok-frem.mp3'
    },
    conflictresults: 'se/ui-prompt-conflictresults.mp3',
    conflictendon: 'se/fx-conflictarea-conflictendon.mp3',
    conflicttReveal: 'se/ui-prompt-conflictreveal.mp3',
    endGameWin: 'se/music-gameresults-win.mp3',
    sandworm: 'se/fx-spicemaker.mp3',
    breakWall: 'se/fx-immo-familyatomicsreset.mp3'
};

// 2. 播放函式
function playEffect(soundKey) {
    if (!soundKey) return;

    // 1. 檢查 imageMap (IndexedDB 載入的資源) 是否有這個路徑
    // 2. 如果沒有，則嘗試使用原始路徑 (Fallback)
    const src = imageMap[soundKey] || soundKey;

    try {
        const ad = new Audio(src);
        ad.volume = 1; // 調整到舒適音量
        ad.play().catch(e => {
            console.warn(`play sound failed: ${soundKey}. maybe the resource is not loaded or the path is incorrect`, e);
        });
    } catch (err) {
        console.error("can't play sound", err);
    }
}
const COLORS = [
    { name: "red", value: "#e74c3c" },
    { name: "yellow", value: "#f1c40f" },
    { name: "blue", value: "#3498db" },
    { name: "green", value: "#2ecc71" }
];

// ================= Setup =================
// 1. 先建立資源管理層（只建立一次）
function setupPersistentUI() {
    // 檢查是否已存在，避免重複建立
    if (d3.select("#ui-layer").node()) return;

    // 建立 UI 圖層
    const uiLayer = d3.select("body").append("div")
        .attr("id", "ui-layer")
        .style("position", "fixed")
        .style("z-index", "20000"); // 超高層級

    // 狀態列
    uiLayer.append("div")
        .attr("id", "assets-status")
        .style("position", "fixed")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100%")
        .style("background", "rgba(0,0,0,0.8)")
        .style("color", "#fff")
        .style("text-align", "center")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text("Checking local assets...");

    // 按鈕容器
    const controls = uiLayer.append("div")
        .attr("id", "upload-controls")
        .style("position", "fixed")
        .style("bottom", "20px")
        .style("left", "50%")
        .style("transform", "translateX(-50%)")
        .style("display", "flex")
        .style("gap", "10px");

    // 上傳按鈕
    controls.append("button")
        .text("📦 上傳 ZIP")
        .style("padding", "15px")
        .style("background", "#28a745")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "10px")
        .on("click", () => document.getElementById("zipInput").click());

    // 清除按鈕
    controls.append("button")
        .text("🗑️ 清除快取")
        .style("padding", "15px")
        .style("background", "#dc3545")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "10px")
        .on("click", async () => {
            if (confirm("確定要清除資源嗎？")) {
                const tx = db.transaction("assets", "readwrite");
                tx.objectStore("assets").clear();
                tx.oncomplete = () => location.reload();
            }
        });

    // 隱藏的 Input
    uiLayer.append("input")
        .attr("type", "file")
        .attr("id", "zipInput")
        .attr("accept", ".zip")
        .style("display", "none")
        .on("change", (e) => {
            const file = e.target.files[0];
            if (file) handleZipUpload(file); // 呼叫你之前的 ZIP 處理函式
        });
}

// 2. 修改你的 initGameUI，讓它不要殺掉 ui-laye
function initGameUI() {
    d3.select("body").html("");
    setupPersistentUI();
    setupPlayers = createRandomPlayers(3);

    const c = d3.select("body").append("div").attr("id", "setup");
    c.append("h1").text("Dune: Uprising");

    c.append("div").attr("id", "playerForms");
    c.append("div").attr("id", "playerButtons");

    c.append("button")
        .attr("class", "main-btn")
        .text("Start Game")
        .on("click", startFromSetup);

    renderSetupPlayers();
}

function createRandomPlayers(n) {
    const leaders = d3.shuffle([...window.leader]).slice(0, n);
    const colors = d3.shuffle([...COLORS]).slice(0, n);

    return leaders.map((l, i) => ({
        leaderNo: l.no,
        color: colors[i].value
    }));
}

function renderSetupPlayers() {
    const div = d3.select("#playerForms").html("");

    setupPlayers.forEach((p, i) => {
        const row = div.append("div").attr("class", "player-setup");

        row.append("h3").text(`Player ${i + 1} (Seat ${i + 1})`);

        // Leader buttons
        const lb = row.append("div").attr("class", "btn-group");
        window.leader.forEach(l => {
            lb.append("button")
                .text(l.name)
                .classed("active", l.no === p.leaderNo)
                .on("click", () => {
                    setupPlayers.forEach(sp => {
                        if (sp.leaderNo === l.no) sp.leaderNo = p.leaderNo;
                    });
                    p.leaderNo = l.no;
                    renderSetupPlayers();
                });
        });

        // Color buttons
        const cb = row.append("div").attr("class", "btn-group");
        COLORS.forEach(c => {
            cb.append("button")
                .style("background", c.value)
                .classed("active", c.value === p.color)
                .on("click", () => swapColor(i, c.value));
        });
    });

    renderPlayerButtons();
}

function swapColor(idx, newColor) {
    const other = setupPlayers.find(p => p.color === newColor);
    if (other) other.color = setupPlayers[idx].color;
    setupPlayers[idx].color = newColor;
    renderSetupPlayers();
}

function renderPlayerButtons() {
    const d = d3.select("#playerButtons").html("");

    if (setupPlayers.length === 3) {
        d.append("button").text("➕ Add Player").on("click", () => {
            // 可用 leaders / colors
            const usedLeaders = setupPlayers.map(p => p.leaderNo);
            const usedColors = setupPlayers.map(p => p.color);

            const availLeaders = window.leader.filter(l => !usedLeaders.includes(l.no));
            const availColors = COLORS.filter(c => !usedColors.includes(c.value));

            if (availLeaders.length === 0 || availColors.length === 0) {
                alert("no leader or color available");
                return;
            }

            const newLeader = availLeaders[Math.floor(Math.random() * availLeaders.length)];
            const newColor = availColors[Math.floor(Math.random() * availColors.length)];

            setupPlayers.push({ leaderNo: newLeader.no, color: newColor.value });
            renderSetupPlayers();
        });
    }


    if (setupPlayers.length === 4) {
        d.append("button").text("➖ Remove Player").on("click", () => {
            setupPlayers.pop();
            renderSetupPlayers();
        });
    }
}

function startFromSetup() {
    startGame(setupPlayers.length, setupPlayers);
}

// ================= Game Start =================
function startGame(cnt, cfg) {
    playerCount = cnt;
    players = cfg.map((c, i) => {
        const l = window.leader.find(x => x.no === c.leaderNo);
        return {
            id: "P" + i,
            name: l.name,
            leader: l,
            color: c.color,
            seat: i + 1,
            vp: (cnt === 4 ? 1 : 0),
            swordmaster: false,
            highCouncil: false,
            makerHooks: false,
            wall: false,
            sandworm: false,
            buyCards: [],
            influenceStates: {
                "emperor": 0,
                "spacing guild": 0,
                "bene gesserit": 0,
                "fremen": 0
            }
        };
    });

    generateConflictDeck();
    currentRound = 1;
    firstPlayerIndex = 0;
    events = [];
    battleSummary = [];
    permanent = { swordmaster: [], highCouncil: [], makerHooks: [], tech: [], wall: [], sandworm: [] };

    saveGame();
    renderGame();
}

// ================= Conflict =================
function generateConflictDeck() {
    const s = a => a.sort(() => Math.random() - 0.5);
    conflictDeck = [
        ...s(window.conflict.filter(c => c.level == "I")).slice(0, 1),
        ...s(window.conflict.filter(c => c.level == "II")).slice(0, 5),
        ...s(window.conflict.filter(c => c.level == "III")).slice(0, 4)
    ];
}

// ================= Render Game =================
function renderGame() {
    d3.select("body").html("");
    const b = d3.select("body");

    // Round
    const r = b.append("div");
    const card = conflictDeck[currentRound - 1];
    // 修改你原本的程式碼部分
    const h2 = r.append("h2")
        .style("cursor", "pointer")
        .style("text-decoration", "underline")
        .text(`Round ${currentRound} - ${card.level} - ${card ? card.name : "error"}`)
        .on("click", () => {
            // 從資料中獲取圖片路徑 (例如: "image/battle_for_arrakeen.png")
            // 並從我們標準化過後的 imageMap 抓取 blobUrl
            const path = card.img;
            const blobUrl = imageMap[path];

            if (blobUrl) {
                showImageOverlay(blobUrl);
            } else {
                console.warn("找不到圖片路徑:", path);
                // 如果 local 找不到，嘗試直接用路徑抓
                showImageOverlay(card.img);
            }
        });

    // --- 建立懸浮視窗函式 ---
    function showImageOverlay(src) {
        // 建立背景
        const overlay = d3.select("body").append("div")
            .attr("id", "image-overlay")
            .on("click", function () {
                d3.select(this).remove(); // 點擊背景或圖片後關閉
            });

        // 放入圖片
        overlay.append("img")
            .attr("id", "overlay-img")
            .attr("src", src)
            .on("click", (e) => e.stopPropagation()); // 防止點擊圖片本身時觸發背景關閉 (如果想按圖片也能關，可拿掉這行)
    }

    // Player cards
    const pc = b.append("div");
    players.forEach((p, i) => {
        const c = pc.append("div")
            .attr("class", "player-card")
            .style("border-color", p.color)
            .classed("first", i === firstPlayerIndex)
            .on("click", () => selectEventPlayer(p.id));

        c.append("h3").text(p.name);
        // 1. 取得圖片路徑與 Blob URL
        const vpPath = `image/vp.png`;
        const vpBlobUrl = imageMap[vpPath];

        // 2. 建立 VP 容器
        const vpContainer = c.append("div").attr("class", "vp-display");

        if (vpBlobUrl) {
            // 如果有圖片：插入圖片圖示 + 數字
            vpContainer.html(`
        <img src="${vpBlobUrl}" style="width: 48px; height: 48px; vertical-align: middle; margin-right: 4px;">
        <span style="vertical-align: middle;">${p.vp}</span>
    `);
        } else {
            // 如果沒有圖片：回退到原本的純文字格式
            vpContainer.text(`VP ${p.vp}`);
        }
        // c.append("div").text(`⚔️ ${p.influenceStates["emperor"]}  🏛️ ${p.highCouncil ? '✓' : '✗'}  🪝 ${p.makerHooks ? '✓' : '✗'}  💥 ${p.wall ? '✓' : '✗'}`);
    });

    // Event area
    b.append("div").attr("id", "eventDiv").append("h3").text("click player to add event");

    // Controls
    const ctl = b.append("div").attr("class", "btn-group");
    ctl.append("button").text("◀").on("click", prevRound);
    ctl.append("button").text("▶").on("click", nextRound);
    ctl.append("button").text("edit").on("click", () => { edit = !edit; });
    ctl.append("button").text("export").on("click", exportData);
    ctl.append("button").text("end game").on("click", endGame);

    renderTimeline();
    saveGame();
}

// ================= Event Flow =================
function selectEventPlayer(pid) {
    eventDraft.playerId = pid;
    renderEventTypeButtons();
}

function renderEventTypeButtons() {
    const d = d3.select("#eventDiv").html("");
    const p = players.find(x => x.id === eventDraft.playerId);
    d.append("h3").text(p.name).style("color", findPlayerColor(p.id)? findPlayerColor(p.id) : "#ccc");
    d.append("button").text("➕ VP").on("click", () => renderVPInput());
    d.append("button").text("🤝 influence").on("click", () => renderInfluenceInput());
    d.append("button").text("⭐ Ability").on("click", () => renderPermInput());
    d.append("button").text("⚔️ Battle").on("click", () => renderBattleInput());
    // d.append("button").text("🎴 Buy Card").on("click", () => renderBuyCardInput());
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

// VP
function renderVPInput() {
    if (!eventDraft.playerId) return;
    const p = players.find(pl => pl.id === eventDraft.playerId);

    const d = d3.select("#eventDiv").html(""); // 清空
    d.append("h3").text(`${p.name} VP Change`);

    // ===== 原因按鈕 =====
    const reasons = [
        { text: "spice must flow", vp: 1 },
        { text: "intrigue", vp: 1 },
        { text: "imperium", vp: 1 },
    ];

    const reasonDiv = d.append("div").attr("id", "vpReasonBtns").style("margin-top", "5px");
    reasons.forEach(r => {
        reasonDiv.append("button")
            .text(r.text)
            .style("margin", "2px")
            .on("click", () => commitVP(r.vp, r.text));
    });

    // ===== 取消按鈕 =====
    d.append("button").text("Cancel").style("margin-top", "5px").on("click", resetEventDraft);

    // ===== 處理 faction 顯示 =====
    // 影響力 / 同盟 / 失去2影響力 / 失去同盟 → 選 faction
    reasonDiv.selectAll("button").on("click", function (rBtn) {
        const rText = d3.select(this).text();
        let vpVal = reasons.find(r => r.text === rText).vp;
        eventDraft.vpChange = vpVal;
        eventDraft.reason = rText;

        commitVP(vpVal); // 不需 faction 直接提交
    });
}

// influence
function renderInfluenceInput() {
    if (!eventDraft.playerId) return;
    const p = players.find(pl => pl.id === eventDraft.playerId);
    const d = d3.select("#eventDiv").html("");
    d.append("h3").text(`${p.name} - Select Faction`);

    const factions = ["emperor", "spacing guild", "bene gesserit", "fremen"];
    const factionDiv = d.append("div").style("margin-top", "5px");
    const actionDiv = d.append("div").style("margin-top", "10px"); // 第二層容器

    // ===== 第一層：選陣營 =====
    factions.forEach(f => {
        const currentState = p.influenceStates[f];

        // 定義狀態顏色
        const stateColors = { 0: "#333", 1: "#2c3e50", 2: "#d4af37" };

        const btn = factionDiv.append("button")
            .attr("class", "faction-btn")
            .style("margin", "5px")
            .style("padding", "10px")
            .style("border", "2px solid transparent")
            .style("background-color", stateColors[currentState])
            .style("color", "white")
            .style("display", "inline-flex")       // 使用 flex 讓內容置中
            .style("flex-direction", "column")    // 圖片在上，文字在下
            .style("align-items", "center")       // 置中對齊
            .on("click", function () {
                factionDiv.selectAll(".faction-btn").style("border", "2px solid transparent");
                d3.select(this).style("border", "2px solid #fff");
                renderActionButtons(p, f, actionDiv);
            });

        // 取得圖片
        const path = `image/${f}.png`;
        const blobUrl = imageMap[path];

        // 1. 加入圖片標籤
        btn.append("img")
            .attr("src", blobUrl || path) // 修改為你的實際路徑，假設檔名跟 faction 名一樣
            .attr("alt", f)
            .style("width", "64px")             // 根據需求調整大小
            .style("height", "64px")
            .style("margin-bottom", "5px")      // 圖片跟文字的間距
            .style("pointer-events", "none")   // 確保點擊圖片也會觸發按鈕事件
            .on("error", function () {
                // --- 當圖片找不到時執行 ---
                const parent = d3.select(this.parentNode);

                // 1. 移除載入失敗的圖片
                d3.select(this).remove();

                // 2. 插入替代文字
                parent.append("span")
                    .text(f)
                    .style("font-weight", "bold")
                    .style("padding", "10px 0");

                // 選擇性：如果沒圖，可以調整一下按鈕的寬度或比例
                parent.style("min-width", "80px");
            });
    });

    d.append("hr");
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

// ===== 第二層：根據狀態動態顯示動作 =====
function renderActionButtons(p, faction, container) {
    container.html(""); // 清空舊按鈕
    const currentState = p.influenceStates[faction];

    const possibleActions = [];

    if (currentState === 0) {
        // 狀態 0：只能選擇到達 2 影響力
        possibleActions.push({ text: "reach 2 influence", vp: 1, nextState: 1 });
    } else if (currentState === 1) {
        // 狀態 1：可以拿同盟，或掉回 0 點
        possibleActions.push({ text: "gain Alliance", vp: 1, nextState: 2 });
        possibleActions.push({ text: "lose 2 influence", vp: -1, nextState: 0 });
    } else if (currentState === 2) {
        // 狀態 2：只能選擇失去同盟
        possibleActions.push({ text: "lose Alliance", vp: -1, nextState: 1 });
    }

    // 在 renderActionButtons 內部
    possibleActions.forEach(act => {
        container.append("button")
            .text(act.text)
            .on("click", function () {
                // 點擊動作後，可以先將按鈕變色代表「選中」
                container.selectAll("button").style("opacity", "0.5");
                d3.select(this).style("opacity", "1").style("background-color", "green");

                // 延遲一點點執行，讓玩家看到高亮回饋
                setTimeout(() => {
                    executeInfluenceChange(p, faction, act);
                }, 150);
            });
    });
}

function executeInfluenceChange(player, faction, action) {
    // 確保當前操作的理由被填入，供 commitVP 使用
    eventDraft.reason = action.text;

    if (action.text === "gain Alliance") {
        players.forEach(otherPlayer => {
            // 找到除了自己以外，本來擁有該同盟的人
            if (otherPlayer.id !== player.id && otherPlayer.influenceStates[faction] === 2) {

                // 1. 修改狀態與分數
                otherPlayer.influenceStates[faction] = 1;
                otherPlayer.vp -= 1;

                // 2. 手動建立一個符合你格式的事件物件
                const stealEv = {
                    type: "vpChange",
                    round: currentRound,
                    playerId: otherPlayer.id,
                    value: -1, // 扣分
                    reason: `lose Alliance`, // 紀錄原因
                    faction: faction
                };

                // 3. 推入全局 events
                events.push(stealEv);

            }
        });
    }

    // 更新當前操作玩家的狀態
    player.influenceStates[faction] = action.nextState;

    // 呼叫 commitVP 處理當前玩家的分數、音效與 UI 刷新
    commitVP(action.vp, faction);
}

async function commitVP(vpValue, faction = null) {
    if (!eventDraft.playerId || !vpValue) return;

    const p = players.find(pl => pl.id === eventDraft.playerId);
    if (!p) return;
    // --- 音效處理邏輯 ---
    if (vpValue > 0) {
        const isAlliance = eventDraft.reason === "gain Alliance" && faction;

        if (isAlliance && sounds.factions[faction]) {
            // 同盟情況：同步觸發（或極短延遲）
            playEffect(sounds.factions[faction]);

            // 延遲 550 毫秒播 VP 音效，讓兩個聲音疊加但有層次
            setTimeout(() => {
                playEffect(sounds.vp);
            }, 550);
        } else {
            // 一般加分：只播 VP 音效
            playEffect(sounds.vp);
        }
    }

    // 更新玩家 VP
    p.vp += vpValue;

    // 事件物件
    const ev = {
        type: "vpChange",
        round: currentRound,
        playerId: p.id,
        value: vpValue,
        reason: eventDraft.reason || "",
        faction: faction || null
    };

    events.push(ev);

    // 清空 draft
    resetEventDraft();

    // 重新渲染畫面與 timeline
    renderTimeline();
    saveGame();
    renderGame();
}

function renderBuyCardInput() {
    const pid = eventDraft.playerId;
    if (!pid) return;
    const p = players.find(pl => pl.id === pid);

    const d = d3.select("#eventDiv").html(""); // 清空
    d.append("h3").text(`${p.name} Buy Card`);

    // ===== 成本按鈕 =====
    const costs = [...new Set(window.imperium.map(c => c.cost))].sort((a, b) => a - b);
    const costDiv = d.append("div").attr("id", "costButtons");
    costs.forEach(c => {
        costDiv.append("button")
            .text(c)
            .style("margin", "2px")
            .on("click", () => {
                d3.select("#cardSearch").property("value", c); // 更新搜尋欄
                filterCards();
            });
    });

    // ===== 搜尋欄 =====
    d.append("input")
        .attr("id", "cardSearch")
        .attr("placeholder", "Enter name / location / tag")
        .style("margin-top", "5px")
        .style("width", "100%")
        .on("input", filterCards);

    // ===== 牌列表 =====
    d.append("div").attr("id", "cardList");

    filterCards(); // 初始顯示全部

    // 取消按鈕
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

function filterCards() {
    const val = d3.select("#cardSearch").property("value").toLowerCase();
    const listDiv = d3.select("#cardList").html("");

    window.imperium
        .filter(c =>
            c.name.toLowerCase().includes(val) ||
            c.cost.toLowerCase().includes(val) ||
            c.dunelocation.join(",").toLowerCase().includes(val) ||
            c.tag.join(",").toLowerCase().includes(val)
        )
        .forEach(c => {
            listDiv.append("div")
                .attr('class', 'cardItem')
                .text(`${c.name}`)
                .style("cursor", "pointer")
                .style("padding", "5px")
                .style("border-bottom", "1px solid #ccc")
                .on("click", () => addBuyCard(c));
        });
}

function addBuyCard(card) {
    const pid = eventDraft.playerId;
    const p = players.find(pl => pl.id === pid);

    // 加入玩家買的牌
    p.buyCards.push(card);

    // 紀錄事件
    events.push({
        type: "buyCard",
        round: currentRound,
        playerId: pid,
        card
    });

    renderTimeline();   // 更新 Timeline
    saveGame();         // 存 LocalStorage
    renderGame();       // 回到主畫面
}

// Permanent
function renderPermInput() {
    if (!eventDraft.playerId) return;
    const p = players.find(pl => pl.id === eventDraft.playerId);

    const d = d3.select("#eventDiv").html(""); // 清空
    d.append("h3").text(`${p.name} Permanent Effect`);

    const abilities = [
        ["swordmaster", "⚔️", "personal"],
        ["highCouncil", "🏛️", "personal"],
        ["makerHooks", "🪝", "personal"],
        ["tech", "🔧", "personal"],
        ["breakWall", "💥", "global"],
        ["sandworm", "🦠", "personal"]
    ];

    abilities.forEach(([key, emoji, type]) => {
        let hasAbility = false;
        if (type === "personal") {
            hasAbility = !!p[key]; // 只看玩家自己
        } else if (type === "global") {
            // breakWall 全局唯一：任何玩家 p.wall === true 就算已取得
            hasAbility = players.some(pl => pl.wall === true);
        }


        if (edit) {
            // 編輯模式 → 顯示全部按鈕
            const btn = d.append("button").text(emoji);
            btn.on("click", () => commitPerm(key));
        } else {
            // 非編輯模式 → 只顯示尚未取得的能力
            if (!hasAbility) {
                const btn = d.append("button").text(emoji);
                if (type === "global" && hasAbility) btn.attr("disabled", true);
                btn.on("click", () => commitPerm(key));
            }
        }
    });
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

function commitPerm(k) {
    const p = players.find(x => x.id === eventDraft.playerId);

    let newValue = false; // 這次更新後的值

    if (k === "swordmaster") {
        p.swordmaster = !p.swordmaster;
        newValue = p.swordmaster;
    } else if (k === "highCouncil") {
        p.highCouncil = !p.highCouncil;
        newValue = p.highCouncil;
    } else if (k === "makerHooks") {
        p.makerHooks = !p.makerHooks;
        newValue = p.makerHooks;
    } else if (k === "tech") {
        // tech 可以累加，每點一次就加一個 id
        permanent.tech.push(p.id);
        newValue = true;
    } else if (k === "breakWall") {
        playEffect(sounds.breakWall); // 嘗試取得 breakWall 就播放音效
        p.wall = !p.wall;
        newValue = p.wall;
    } else if (k === "sandworm") {
        playEffect(sounds.sandworm);
    }

    // 記錄事件，value = 更新後的真偽值
    events.push({
        type: "permanent",
        round: currentRound,
        playerId: p.id,
        ability: k,
        value: newValue
    });
    finishEvent();
}

// ===== Battle =====
function renderBattleInput() {
    const d = d3.select("#eventDiv").html("");
    d.append("h3").text("Battle & Rewards");

    let winners = [];
    let isIconActive = false;
    let selectedCombatVP = 0;

    const btnDiv = d.append("div");
    const rewardDiv = d.append("div").style("margin-top", "15px").style("display", "none");

    // 渲染玩家按鈕
    players.forEach(p => {
        const btn = btnDiv.append("button")
            .attr("class", "battle-p-btn")
            .text(p.name)
            .style("color", findPlayerColor(p.id)? findPlayerColor(p.id) : "#000")
            .style("margin", "4px")
            .on("click", function () {
                const idx = winners.indexOf(p.id);
                if (idx > -1) winners.splice(idx, 1);
                else winners.push(p.id);

                // 高亮處理
                btnDiv.selectAll(".battle-p-btn")
                    .style("background-color", (d, i) => winners.includes(players[i].id) ? "lightblue" : "")
                    .classed("active", (d, i) => winners.includes(players[i].id) ? true: false);

                // 判斷是否顯示獎勵區（僅在唯一贏家時出現）
                if (winners.length === 1) {
                    rewardDiv.style("display", "block");
                } else {
                    rewardDiv.style("display", "none");
                    extraVP = 0; // 平手或沒人贏不給分
                }
            });
    });

    // --- 獎勵設定區 ---

    // 1. Icon VP 區 (維持切換模式)
    const iconRow = rewardDiv.append("div").style("margin", "10px 0");
    const iconBtn = rewardDiv.append("button")
        .attr("id", "btn-icon-vp")
        .text("+1 Icon VP")
        .on("click", function () {
            // 切換變數狀態
            isIconActive = !isIconActive;

            // 更新視覺
            d3.select(this)
                .classed("active", isIconActive)
                .style("background", isIconActive ? "green" : "")
        });

    // 2. Combat VP 區 (單選按鈕模式)
    const combatRow = rewardDiv.append("div").style("margin", "10px 0");

    const combatBtnGroup = combatRow.append("div").attr("id", "combat-vp-group");

    // 根據回合定義可選的分數
    // 基本 0, 1, 2。如果回合 >= 7 則加上 3, 4
    let availableScores = [1, 2];
    if (currentRound >= 7) {
        availableScores.push(3, 4);
    }

    availableScores.forEach(score => {
        combatBtnGroup.append("button")
            .attr("class", "combat-val-btn")
            .text(`${score} Battle VP`)
            .on("click", function () {
                if (selectedCombatVP === score) {
                    // 如果點擊同一個已選的分數，則取消選擇
                    selectedCombatVP = 0;
                    d3.select(this).style("background", "")
                        .classed("active", false)
                } else {
                    selectedCombatVP = score;
                    // 清除其他按鈕高亮
                    combatBtnGroup.selectAll(".combat-val-btn").style("background", "")
                        .classed("active", false);
                    // 高亮當前按鈕
                    d3.select(this).style("background", "green")
                        .classed("active", true);
                }
            });
    });

    // 3. 修改 Confirm Result 按鈕的取值邏輯
    // 結算按鈕
    const actionDiv = d.append("div").style("margin-top", "20px");
    actionDiv.append("button")
        .text("Confirm Result")
        .style("background", "green")
        .style("color", "white")
        .style("padding", "10px 20px")
        .on("click", async function () {
            const btn = d3.select(this);

            // --- 1. 防止重複觸發 (防禦連點) ---
            if (btn.property("disabled")) return;

            // --- 2. 立即鎖定按鈕與給予視覺回饋 ---
            btn.property("disabled", true)
                .text("Processing...")
                .style("background", "#444") // 變灰色代表處理中
                .style("cursor", "not-allowed");

            try {
                // --- 3. 執行戰鬥勝負事件 (含 1.8s + 音效延遲) ---
                await commitBattle(winners, 0, "BATTLE_ONLY");

                // --- 4. 處理獎勵 (只有一位贏家時) ---
                if (winners.length === 1) {
                    const winnerId = winners[0];

                    // 分開處理 Icon VP
                    if (isIconActive) {
                        await commitBattle([winnerId], 1, "icon");
                    }

                    // 分開處理 Combat VP
                    if (selectedCombatVP > 0) {
                        await commitBattle([winnerId], selectedCombatVP, "combat");
                    }
                }

                // --- 5. 所有的 await 都完成後，最後才關閉視窗與刷新 ---
                // 這樣可以確保「叮叮叮」播完前，介面不會消失
                actionDiv.append("button").text("Cancel").style("margin-left", "10px").on("click", resetEventDraft);
                if (typeof render === "function") render();

            } catch (err) {
                console.error("Battle process error:", err);
                // 萬一出錯，恢復按鈕讓使用者可以重試
                btn.property("disabled", false)
                    .text("Confirm Result")
                    .style("background", "green")
                    .style("cursor", "pointer");
            }
        });


}

async function commitBattle(winners, vpValue, subType) {
    if (subType === "BATTLE_ONLY") {
        // 僅紀錄勝負，不加分
        events.push({ type: "battle", round: currentRound, winners: winners });
        // 先播結果提示音
        playEffect(sounds.conflictendon);

        // 返回一個 Promise，讓後面的 await 知道要等多久
        await new Promise(resolve => {
            setTimeout(() => {
                playEffect(sounds.conflictresults);
                resolve(); // 1.8 秒後才完成這個 Promise
            }, 1800);
        });

        // 如果你希望聽完 conflictresults 的重音再加分，這裡可以再多等一點點
        await new Promise(resolve => setTimeout(resolve, 800));
    } else {
        // 處理加分事件 (Icon VP 或 Combat VP)
        const p = players.find(pl => pl.id === winners[0]);
        if (p && vpValue > 0) {
            p.vp += vpValue; // 實質加分

            const ev = {
                type: "vpChange",
                round: currentRound,
                playerId: p.id,
                value: vpValue,
                reason: subType,
                faction: null
            };
            events.push(ev);

            // ===== 核心修改：根據 vpValue 播放對應次數的音效 =====
            for (let i = 0; i < vpValue; i++) {
                playEffect(sounds.vp);

                // 每次叮完後等待 300ms 再叮下一聲
                // 如果是最後一聲，可以等久一點 (600ms) 讓玩家準備接下一個獎勵
                const delay = (i === vpValue - 1) ? 400 : 400;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    finishEvent();
}

function finishEvent() {
    eventDraft = { playerId: null, type: null };
    renderGame();
}

// ===== 重置事件輸入 =====
function resetEventDraft() {
    eventDraft = { playerId: null, type: null };
    renderGame();
}

// ================= Timeline =================
function renderTimeline() {

    let ul = d3.select("#eventTimeline");

    if (ul.empty()) {
        ul = d3.select("body")
            .append("ul")
            .attr("id", "eventTimeline");
    }

    ul.html("");

    // ===== 篩選 =====
    let filtered = events;

    if (timelineFilter.type === "playerVP") {
        filtered = events.filter(e =>
            e.type === "vpChange" &&
            e.playerId === timelineFilter.playerId
        );
    }

    if (timelineFilter.type === "battle") {
        filtered = events.filter(e => e.type === "battle");
    }

    // ===== 原本邏輯保持 =====
    [...filtered].reverse().forEach(e => {

        let t = `Round ${e.round} `;

        const reasonMap = {
            "reach 2 influence": "(2)",
            "gain Alliance": "(4)",
            "lose 2 influence": "(lost2)",
            "lose Alliance": "(lose4)"
        };


        if (e.type === "vpChange") {
            // 1. 準備 VP 的顯示內容
            const vpIconPath = `image/vp.png`;
            const vpBlobUrl = imageMap[vpIconPath];

            // 如果有圖就用 img 標籤，沒圖就維持文字 "VP"
            const vpDisplay = vpBlobUrl
                ? `<img src="${vpBlobUrl}" style="width: 48px; height: 48px;">`
                : ` VP `;

            // 2. 組裝 HTML 字串 (將原本的 " VP " 替換成 vpDisplay)
            t += `
    <span style="color: ${findPlayerColor(e.playerId)}; font-weight: bold;">
        ${findPlayerName(e.playerId)}
    </span> 
    ${vpDisplay} 
    <span style="font-size: 1.1em; font-weight: bold;">${e.value}</span> 
    ${e.faction ? e.faction.toUpperCase() + " " : ""}
    ${e.faction ? reasonMap[e.reason] : e.reason}
`;
        }
        if (e.type === "permanent")
            t += `${findPlayerName(e.playerId)} ${e.value ? "gain" : "lose"} ${e.ability}`;

        if (e.type === "battle") {
            if (e.winners && e.winners.length > 0) {
                const winnerNames = e.winners.map(pid => {
                    const pName = findPlayerName(pid);
                    const pColor = findPlayerColor(pid);
                    // 為每一個贏家單獨封裝顏色標籤
                    return `<span style="color: ${pColor}; font-weight: bold;">${pName}</span>`;
                }).join(" & ");
                if (e.winners.length === 1) {
                    // 單一人贏
                    t += `${winnerNames} wins the Conflict!`;
                } else {
                    // 多人平手贏
                    t += `${winnerNames} tied the Conflict!`;
                }
            } else {
                // 沒有人贏
                t += "No one wins the Conflict!";
            }
        }

        if (e.type === "buyCard")
            t += `${findPlayerName(e.playerId)} Buy card ${e.card.name} (Persuasion: ${e.card.cost})`;

        const playerColor = findPlayerColor(e.playerId) ? findPlayerColor(e.playerId) : "#eee";
        const li = ul.append("li")
            .style("border-left", `6px solid ${playerColor}`) // 在左側加一條顏色邊
            .style("padding-left", "10px")                  // 留點空間給顏色條
            .style("margin-bottom", "5px")
            .style("color", "#eee");                         // 主要文字顏色維持白色方便閱讀

        li.html(t);
    });
    renderTimelineFilters();
}

const findPlayerColor = id => {
    const p = players.find(p => p.id === id);
    return p ? p.color : "#ccc";
};
const findPlayerName = id => players.find(p => p.id === id).name;

let timelineFilter = {
    type: "all",
    playerId: null
};

function renderTimelineFilters() {

    let f = d3.select("#timelineFilters");

    if (f.empty()) {
        f = d3.select("body")
            .insert("div", "#eventTimeline")
            .attr("id", "timelineFilters");
    }

    f.html("");

    function addBtn(text, isActive, onClick) {
        f.append("button")
            .text(text)
            .classed("active", isActive)
            .on("click", onClick);
    }

    // ===== All =====
    addBtn(
        "All",
        timelineFilter.type === "all",
        () => {
            timelineFilter = { type: "all", playerId: null };
            renderTimeline();
        }
    );

    // ===== Battle =====
    addBtn(
        "Battle",
        timelineFilter.type === "battle",
        () => {
            timelineFilter = { type: "battle", playerId: null }
            renderTimeline();
        }
    );

    // ===== Players =====
    players.forEach(p => {
        addBtn(
            p.name,
            timelineFilter.type === "playerVP" &&
            timelineFilter.playerId === p.id,
            () => {
                timelineFilter = { type: "playerVP", playerId: p.id };
                renderTimeline();
            }
        );
    });
}



// ================= Round =================
function nextRound() {
    if (currentRound < conflictDeck.length) {
        // 🔊 播放揭曉音效
        playEffect(sounds.conflicttReveal);
        currentRound++;
        firstPlayerIndex = (firstPlayerIndex + 1) % playerCount;
        renderGame();
    }
}
function prevRound() {
    if (currentRound > 1) {
        currentRound--;
        firstPlayerIndex = (firstPlayerIndex - 1 + playerCount) % playerCount;
        renderGame();
    }
}
// ================= Endgame =================
function endGame() {
    playEffect(sounds.endGameWin);
    initGameUI();
}
// ================= Storage =================
function saveGame() {
    localStorage.setItem("duneGame", JSON.stringify({
        players, currentRound, events, firstPlayerIndex,
        conflictDeckOrder: conflictDeck.map(c => c.no)
    }));
}
function loadGame() {
    const d = localStorage.getItem("duneGame");
    if (!d) return;
    const g = JSON.parse(d);
    players = g.players;
    currentRound = g.currentRound;
    events = g.events;
    firstPlayerIndex = g.firstPlayerIndex;
    conflictDeck = g.conflictDeckOrder.map(no => window.conflict.find(c => c.no === no));
    renderGame();
}

// ================= Export =================
function exportData() {
    const blob = new Blob([JSON.stringify({ players, events }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dune.json";
    a.click();
}