// ================= 全局 =================
let players = [];
let playerCount = 3;
let setupPlayers = [];
let currentRound = 1;
let conflictDeck = [];
let firstPlayerIndex = 0;
let events = [];
let eventDraft = { playerId: null, type: null };
let bloodlines = false;

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

        tx.oncomplete = async () => {
            updateStatus(`✅ 成功載入 ${pendingData.length} 個資源！`);
            await loadAllAssetsFromDB();
            initGameUI();
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

    // 1. 修改按鈕容器的樣式，加入 position: relative 以便定位 X
    const controls = uiLayer.append("div")
        .attr("id", "upload-controls")
        .style("position", "fixed")
        .style("bottom", "150px")
        .style("left", "50%")
        .style("transform", "translateX(-50%)")
        .style("display", "flex")
        .style("gap", "10px")
        .style("padding", "25px 15px 15px 15px") // 上方留多一點空間給 X
        .style("background", "rgba(0,0,0,0.5)")   // 加個半透明背景，讓面板更有整體感
        .style("border-radius", "15px")
        .style("backdrop-filter", "blur(5px)"); // 毛玻璃效果 (可選)

    // 2. 加入關閉按鈕 (X)
    controls.append("div")
        .text("✕")
        .style("position", "absolute")
        .style("top", "5px")
        .style("right", "10px")
        .style("color", "white")
        .style("cursor", "pointer")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        // 修改 X 的 click 事件
        .on("click", function () {
            const isHidden = controls.style("height") === "0px";

            if (!isHidden) {
                // 縮小成一個小球
                controls.selectAll("button").style("display", "none");
                controls.style("height", "0px")
                    .style("width", "40px")
                    .style("overflow", "hidden")
                    .style("padding", "20px");
                d3.select(this).text("⚙️"); // 變成齒輪
            } else {
                // 展開回原樣
                controls.selectAll("button").style("display", "block");
                controls.style("height", "auto")
                    .style("width", "auto")
                    .style("padding", "25px 15px 15px 15px");
                d3.select(this).text("✕");
            }
        });

    // 上傳按鈕
    controls.append("button")
        .text("📦 upload ZIP")
        .style("padding", "15px")
        .style("background", "#28a745")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "10px")
        .style("cursor", "pointer")
        .on("click", () => document.getElementById("zipInput").click());

    // 清除按鈕
    controls.append("button")
        .text("🗑️ remove assets") // 修正了原本拼字 assets
        .style("padding", "15px")
        .style("background", "#dc3545")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "10px")
        .style("cursor", "pointer")
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
        .text("Bloodlines")
        .classed("active", bloodlines)
        // 初始化顏色
        .style("background", bloodlines ? "green" : "#ccc")
        .on("click", function () {
            // 1. 切換全域變數
            bloodlines = !bloodlines;

            // 2. 更新 Class (用於其他 CSS 選取器)
            d3.select(this).classed("active", bloodlines);

            // 3. 直接更新 Style (確保顏色會變)
            d3.select(this).style("background", bloodlines ? "green" : "#ccc");

            initGameUI();
        });
    c.append("button")
        .attr("class", "main-btn")
        .text("Start Game")
        .on("click", startFromSetup);

    renderSetupPlayers();
}

function createRandomPlayers(n) {
    const leaderPool = bloodlines ? window.leader : window.leader.slice(0, 9); //bloodlines
    const leaders = d3.shuffle([...leaderPool]).slice(0, n); // base leader only
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

        // 1. 先找出 Leader 資料與圖片 URL
        const leaderData = window.leader.find(l => String(l.no) === String(p.leaderNo));
        const rawPath = leaderData ? leaderData.img : null;

        // 2. 只有當 path 存在時，才嘗試計算最終 URL
        let finalUrl = null;
        if (rawPath) {
            const cleanPath = rawPath.startsWith("./") ? rawPath.substring(2) : rawPath;
            finalUrl = imageMap[rawPath] || imageMap[cleanPath] || rawPath;
        }

        // 3. 建立圖片與選單的容器
        // --- 建立圖片與選單的容器 ---
        const leaderContainer = row.append("div")
            .style("display", "flex")       // 啟用 Flexbox
            .style("flex-direction", "row") // 確保水平排列
            .style("align-items", "center") // 垂直居中對齊
            .style("gap", "12px")           // 圖片與選單間的間距
            .style("width", "100%")
            .style("margin-bottom", "10px");

        // --- 圖片部分 (只有有圖才顯示) ---
        if (finalUrl) {
            leaderContainer.append("div")
                .attr("class", "leader-img-frame")
                .append("img")
                .attr("src", finalUrl)
                .attr("class", "leader-preview-img")
                .on("error", function () {
                    console.warn("圖片載入失敗，已自動隱藏:", finalUrl);
                    d3.select(this.parentNode).remove(); // 圖片載入失敗時，直接從容器中移除自己
                })
                .on("click", () => showImageOverlay(finalUrl));
        }

        // --- 下拉選單部分 ---
        const select = leaderContainer.append("select")
            .attr("class", "leader-select")
            .style("flex", "1") // 重要：這會讓選單自動佔滿剩下的空間
            .on("change", function () {
                p.leaderNo = this.value;
                renderSetupPlayers();
            });

        // 取得目前已被其他玩家選走的 Leader ID 列表
        const takenLeaders = setupPlayers
            .filter((other, idx) => idx !== i) // 排除自己
            .map(other => other.leaderNo);


        const displayPool = bloodlines ? window.leader : window.leader.slice(0, 9); //bloodlines
        displayPool.forEach((l, index) => {
            if (bloodlines && index === 9) {
                select.append("option")
                    .attr("disabled", true)
                    .text("--------- Bloodlines ---------")
                    .style("text-align", "center")
                    .style("background", "#444");
            }
            const isTaken = takenLeaders.includes(l.no);

            select.append("option")
                .attr("value", l.no)
                .text(l.name)
                .property("selected", l.no === p.leaderNo)
                .property("disabled", isTaken); // 防止重複選擇
        });

        // --- Color 按鈕 (維持原樣) ---
        const cb = row.append("div").attr("class", "btn-group").style("margin-top", "10px");
        COLORS.forEach(c => {
            const isActive = (c.value === p.color); // 判斷是否為選中項
            cb.append("button")
                // 根據 active 狀態切換背景色：選中用 c.value，沒選中用 #ccc
                .style("background", isActive ? c.value : "#ccc")
                .classed("active", isActive)
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
                console.log("no leader or color available");
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
    startGame(setupPlayers.length, setupPlayers, bloodlines);
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

    saveGame();
    renderGame();
}

// ================= Conflict =================
function generateConflictDeck() {
    const s = a => a.sort(() => Math.random() - 0.5);

    // 1. 決定可用池：如果是 false，只取前 16 張
    const availablePool = bloodlines ? window.conflict : window.conflict.slice(0, 16);

    // 2. 從可用池中根據 Level 過濾並抽牌
    conflictDeck = [
        // Level I 抽 1 張
        ...s(availablePool.filter(c => c.level === "I")).slice(0, 1),
        // Level II 抽 5 張
        ...s(availablePool.filter(c => c.level === "II")).slice(0, 5),
        // Level III 抽 4 張
        ...s(availablePool.filter(c => c.level === "III")).slice(0, 4)
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
        .attr("class", "round-title")
        .style("cursor", "pointer")
        .style("text-decoration", "underline")
        .text(` ${bloodlines ? "Bloodlines" : "Uprising"} - Round ${currentRound} - ${card ? card.level : "no"} - ${card ? card.name : "data"}`)
        .on("click", () => {
            // 從資料中獲取圖片路徑 (例如: "image/battle_for_arrakeen.png")
            // 並從我們標準化過後的 imageMap 抓取 blobUrl
            const path = card.img;
            const blobUrl = imageMap[path];

            if (blobUrl) {
                showImageOverlay(blobUrl, true);
            } else {
                console.warn("找不到圖片路徑:", path);
                // 如果 local 找不到，嘗試直接用路徑抓
                showImageOverlay(card.img, true);
            }
        });

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
    });

    // Event area
    b.append("div").attr("id", "eventDiv").append("h3").text("click player to add event");

    // Controls
    const ctl = b.append("div").attr("class", "btn-group");
    ctl.append("button").text("◀").on("click", prevRound);
    ctl.append("button").text("▶").on("click", nextRound);
    ctl.append("button").text("undo").on("click", confirmUndo);
    ctl.append("button").text("export").on("click", exportData);
    ctl.append("button").text("import").on("click", importData);
    ctl.append("button").text("end game").on("click", endGame);

    renderTimeline();
    saveGame();
}

// --- 建立懸浮視窗函式 ---
function showImageOverlay(src, isConflictCard = false) {
    const overlay = d3.select("body").append("div")
        .attr("id", "image-overlay")
        .on("click", function () { d3.select(this).remove(); });

    // 建立一個垂直排列的容器
    const container = overlay.append("div")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("align-items", "center")
        .style("gap", "20px")
        .on("click", (e) => e.stopPropagation());

    if (isConflictCard) {
        const card = conflictDeck[currentRound - 1];
        container.append("h2")
            .style("color", "white")
            .style("margin", "0")
            .style("text-shadow", "2px 2px 4px rgba(0,0,0,0.8)")
            .text(`Round ${currentRound} - ${card ? card.level : "no"} - ${card ? card.name : "data"}`);
    }

    container.append("img")
        .attr("id", "overlay-img")
        .attr("src", src)
        .on("error", function () {
            console.warn("圖片載入失敗，已自動隱藏:", src);
            d3.select(this).remove(); // 圖片載入失敗時，直接從容器中移除自己
        });

    if (isConflictCard) {
        container.append("button")
            .text("🔄 Swap Conflict Card")
            .style("padding", "15px 30px")
            .style("font-size", "32px")
            .style("background", "#f0ad4e")
            .style("border", "none")
            .style("border-radius", "10px")
            .style("font-weight", "bold")
            .style("cursor", "pointer")
            .on("click", () => {
                overlay.remove();
                showConflictSelector();
            });
    }
}

function showConflictSelector() {
    const overlay = d3.select("body").append("div")
        .attr("id", "selector-overlay")
        .style("position", "fixed")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100dvw")
        .style("height", "100dvh")
        .style("background", "rgba(0,0,0,0.95)")
        .style("overflow-y", "scroll")
        .style("padding", "20px")
        .style("z-index", "3000")
        .style("padding-bottom", "env(safe-area-inset-bottom)");

    overlay.append("h2")
        .text("Select Conflict Card")
        .style("color", "white")
        .style("text-align", "center");

    const grid = overlay.append("div")
        .style("display", "grid")
        .style("grid-template-columns", "repeat(auto-fill, minmax(230px, 1fr))")
        .style("gap", "10px");

    // 列出所有可用 Conflict Cards
    let targetLevel = "II";
    if (currentRound === 1) {
        targetLevel = "I";
    } else if (currentRound >= 2 && currentRound <= 6) {
        targetLevel = "II";
    } else if (currentRound >= 7) {
        targetLevel = "III";
    }
    // 1. 決定可用池：如果是 false，只取前 16 張
    const availablePool = bloodlines ? window.conflict : window.conflict.slice(0, 16);
    const availableCards = availablePool.filter(c => c.level === targetLevel);

    availableCards.forEach(card => {
        const btn = grid.append("div")
            .style("background", "#333")
            .style("padding", "10px")
            .style("border-radius", "8px")
            .style("text-align", "center")
            .style("cursor", "pointer")
            .on("click", () => {
                // 強制覆蓋當前輪次的卡片
                conflictDeck[currentRound - 1] = card;
                overlay.remove();
                saveGame();
                renderGame(); // 重新渲染，圖片和名字都會變
            });

        const imgPath = card.img;
        const blobUrl = imageMap[imgPath] || imgPath;

        if (blobUrl) {
            btn.append("img")
                .attr("src", blobUrl)
                .style("width", "100%")
                .style("border-radius", "4px")
                .on("error", function () {
                    console.warn("圖片載入失敗，已自動隱藏:", blobUrl);
                    d3.select(this).remove(); // 圖片載入失敗時，直接從容器中移除自己
                });;
        }

        btn.append("div")
            .text(card.name)
            .style("color", "white")
            .style("font-size", "24px")
            .style("margin-top", "5px");
    });

    // 關閉按鈕
    overlay.append("button")
        .text("Close")
        .style("position", "fixed")
        .style("bottom", "20px")
        .style("left", "50%")
        .style("font-size", "32px")
        .style("transform", "translateX(-50%)")
        .style("padding", "10px 40px")
        .on("click", () => overlay.remove());
}

// ================= Event Flow =================
function selectEventPlayer(pid) {
    eventDraft.playerId = pid;
    renderEventTypeButtons();
}

function renderEventTypeButtons() {
    const d = d3.select("#eventDiv").html("");
    const p = players.find(x => x.id === eventDraft.playerId);
    d.append("h3").text(p.name).style("color", findPlayerColor(p.id) || "#ccc");
    d.append("button").text("➕ VP").on("click", () => renderVPInput());
    d.append("button").text("🤝 influence").on("click", () => renderInfluenceInput());
    d.append("button").text("⭐ Ability").on("click", () => renderAbilityInput());
    d.append("button").text("⚔️ Battle").on("click", () => renderBattleInput());
    // d.append("button").text("🎴 Buy Card").on("click", () => renderBuyCardInput());
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

// VP
function renderVPInput() {
    if (!eventDraft.playerId) return;
    const p = players.find(pl => pl.id === eventDraft.playerId);

    const d = d3.select("#eventDiv").html(""); // 清空
    d.append("h3").html(`
    <span style="color: ${findPlayerColor(p.id) || '#ccc'}">${p.name}</span>
    <span style="color: #eee;">- VP Change</span>
`);

    // ===== 原因按鈕 =====
    const reasons = [
        { text: "spice must flow", vp: 1 },
        { text: "intrigue", vp: 1 },
        { text: "imperium", vp: 1 },
        { text: "endgame icon", vp: 1 },
        { text: "endgame intrigue", vp: 1 },
        { text: "tech/other", vp: 1 }, // 這個按鈕將受到 bloodlines 變數控制
    ];

    const reasonDiv = d.append("div").attr("id", "vpReasonBtns").style("margin-top", "5px");
    reasons.forEach(r => {
        // --- 關鍵判斷：如果是 tech/other 且 bloodlines 為 false，則跳過不渲染 ---
        if (r.text === "tech/other" && !bloodlines) {
            return;
        }

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
    d.append("h3").html(`
    <span style="color: ${findPlayerColor(p.id) || '#ccc'}">${p.name}</span>
    <span style="color: #eee;">- Select Faction</span>
`);

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
                console.warn("圖片載入失敗，已自動隱藏:", blobUrl || path);
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

// Ability
function renderAbilityInput() {
    if (!eventDraft.playerId) return;
    const p = players.find(pl => pl.id === eventDraft.playerId);

    const d = d3.select("#eventDiv").html(""); // 清空
    d.append("h3").html(`
    <span style="color: ${findPlayerColor(p.id) || '#ccc'}">${p.name}</span>
    <span style="color: #eee;">- Ability Effect</span>
`);

    const abilities = [
        ["swordmaster", "⚔️", "personal"],
        ["highCouncil", "🏛️", "personal"],
        ["makerHooks", "🪝", "personal"],
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

        // 非編輯模式 → 只顯示尚未取得的能力
        if (!hasAbility) {
            const btn = d.append("button").text(emoji);
            if (type === "global" && hasAbility) btn.attr("disabled", true);
            btn.on("click", () => commitAbility(key));
        }

    });
    d.append("button").text("Cancel").on("click", resetEventDraft);
}

function commitAbility(k) {
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
    } else if (k === "breakWall") {
        playEffect(sounds.breakWall); // 嘗試取得 breakWall 就播放音效
        p.wall = !p.wall;
        newValue = p.wall;
    } else if (k === "sandworm") {
        playEffect(sounds.sandworm);
    }

    // 記錄事件，value = 更新後的真偽值
    events.push({
        type: "ability",
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
            .style("color", findPlayerColor(p.id) || "#000")
            .style("margin", "4px")
            .on("click", function () {
                const idx = winners.indexOf(p.id);
                if (idx > -1) winners.splice(idx, 1);
                else winners.push(p.id);

                // 高亮處理
                btnDiv.selectAll(".battle-p-btn")
                    .style("background-color", (d, i) => winners.includes(players[i].id) ? "lightblue" : "")
                    .classed("active", (d, i) => winners.includes(players[i].id) ? true : false);

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
        if (e.type === "ability")
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

        // 自動觸發剛畫好的 h2 點擊事件
        d3.select(".round-title").dispatch("click");
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
function applyGameData(data) {
    if (!data) return;

    players = data.players;
    playerCount = players.length;
    currentRound = data.currentRound;
    events = data.events;
    firstPlayerIndex = data.firstPlayerIndex;
    bloodlines = data.bloodlines;

    // 重新關連 Conflict 物件
    conflictDeck = data.conflictDeckOrder.map(no =>
        window.conflict.find(c => c.no === no)
    );

    saveGame();   // 載入後存入 LocalStorage，確保重新整理也不會丟失
    renderGame(); // 刷新畫面
}
function saveGame() {
    localStorage.setItem("duneGame", JSON.stringify({
        players, currentRound, events, firstPlayerIndex,
        conflictDeckOrder: conflictDeck.map(c => c.no), bloodlines
    }));
}
function loadGame() {
    const d = localStorage.getItem("duneGame");
    if (d) {
        applyGameData(JSON.parse(d));
    }
}
// ================= Import =================
function importData() {
    // 1. 動態建立一個隱藏的 file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    // 2. 監聽選取檔案動作
    input.onchange = (e) => {
        const file = e.target.files[0]; // 這裡現在能讀到 '0' 了
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const gameData = JSON.parse(event.target.result);

                // 恢復玩家的 Leader 物件連結 (這點很重要，否則匯入後按鈕會失效)
                gameData.players.forEach(p => {
                    if (p.leader && p.leader.no) {
                        p.leader = window.leader.find(l => l.no === p.leaderNo) || p.leader;
                    }
                });

                applyGameData(gameData);
                console.log("Game Imported!");
            } catch (err) {
                console.error(err);
                console.log("Import failed: Invalid JSON");
            }
        };
        reader.readAsText(file);
    };

    // 3. 模擬點擊這個隱藏的 input
    input.click();
}
// ================= Export =================
function exportData() {
    const conflictDeckOrder = conflictDeck.map(c => c.no)
    const blob = new Blob([JSON.stringify({ players, currentRound, events, firstPlayerIndex, conflictDeckOrder, bloodlines }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dune.json";
    a.click();
}

// ================= Undo =================
function undo() {
    if (events.length === 0) {
        console.log("can't undo, no events");
        return;
    }

    // 1. 取得最後一個 event 並從陣列移除
    const lastEvent = events.pop();

    // 2. 根據 event 類型進行「逆運算」
    switch (lastEvent.type) {
        case "vpChange":
            // 找到該玩家，把加的分扣回去
            const p = players.find(x => x.id === lastEvent.playerId);

            // 1. 基本操作：扣回分數
            p.vp -= lastEvent.value;

            // 2. 處理副作用：根據 reason 還原其他狀態
            switch (lastEvent.reason) {
                case "reach 2 influence":
                    // 還原聲望：減 1 (假設這分是因為從 1 變 2 拿到的)
                    if (lastEvent.faction) {
                        p.influenceStates[lastEvent.faction] -= 1;
                    }
                    break;

                case "gain Alliance":
                    if (lastEvent.faction) {
                        p.influenceStates[lastEvent.faction] -= 1;
                    }
                    break;
                case "lose Alliance":
                    if (lastEvent.faction) {
                        p.influenceStates[lastEvent.faction] += 1;
                    }
                    break;
            }
            break;

        case "ability":
            // 還原能力狀態
            const pAbility = players.find(p => p.id === lastEvent.playerId);
            if (pAbility) {
                // 這裡要對應你的 ability 物件與 player 屬性
                // 假設 ability 是 "breakWall" 對應 player.wall
                if (lastEvent.ability === "breakWall") {
                    pAbility.wall = !lastEvent.value; // 設回相反值
                }
            }
            break;

        case "battle":
            // Battle 如果只是純紀錄，pop 掉即可
            // 但如果有影響戰力或領地，則需在此還原
            break;

        case "influenceChange": // 假設你有這個
            const pInf = players.find(p => p.id === lastEvent.playerId);
            if (pInf) {
                pInf.influenceStates[lastEvent.faction] -= lastEvent.value;
            }
            break;

        default:
            console.warn("未定義的撤銷類型:", lastEvent.type);
    }

    // 3. 重新儲存並渲染畫面
    saveGame();
    renderGame();
}

function confirmUndo() {
    if (events.length === 0) return;
    const last = events[events.length - 1];
    // 建立全螢幕背景遮罩
    const overlay = d3.select("body").append("div")
        .attr("id", "confirm-overlay")
        .style("position", "fixed")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100vw")
        .style("height", "100vh")
        .style("background", "rgba(0,0,0,0.85)")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center")
        .style("z-index", "2000");

    // 建立對話框主體
    const dialog = overlay.append("div")
        .style("background", "#2a2a2a")
        .style("padding", "30px")
        .style("border-radius", "16px")
        .style("border", "2px solid #555")
        .style("text-align", "center")
        .style("max-width", "80%");


    const actionDesc = last.reason ? `${last.type} (${last.reason})` : last.type;
    dialog.append("p")
        .text("Are you sure you want to revert the last action?")
        .style("color", "#ccc")
        .style("font-size", "32px");

    dialog.append("div")
        .style("background", "#1a1a1a")
        .style("padding", "10px")
        .style("border-radius", "8px")
        .style("margin", "15px 0")
        .style("color", "#f0ad4e")
        .style("font-size", "32px")
        .style("font-family", "monospace")
        .text(`${actionDesc}`);

    const btnGroup = dialog.append("div")
        .style("display", "flex")
        .style("gap", "20px")
        .style("justify-content", "center");

    // 「確定」按鈕
    btnGroup.append("button")
        .text("confirm")
        .style("background", "#d9534f") // 紅色，代表危險操作
        .style("color", "white")
        .style("padding", "10px 20px")
        .style("border", "none")
        .style("border-radius", "8px")
        .style("font-size", "32px")
        .on("click", () => {
            overlay.remove(); // 關閉彈窗
            undo();           // 執行原本的 undo
        });

    // 「取消」按鈕
    btnGroup.append("button")
        .text("cancel")
        .style("background", "#5bc0de") // 藍色或灰色
        .style("color", "white")
        .style("padding", "10px 20px")
        .style("border", "none")
        .style("border-radius", "8px")
        .style("font-size", "32px")
        .on("click", () => {
            overlay.remove(); // 關閉彈窗，不執行任何動作
        });
}