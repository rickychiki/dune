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

const COLORS = [
    { name: "紅", value: "#e74c3c" },
    { name: "黃", value: "#f1c40f" },
    { name: "藍", value: "#3498db" },
    { name: "綠", value: "#2ecc71" }
];

// ================= 初始化 =================
window.onload = () => {
    initGameUI();
    loadGame();
};

// ================= Setup =================
function initGameUI() {
    d3.select("body").html("");

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
            buyCards: []
        };
    });

    generateConflictDeck();
    currentRound = 1;
    firstPlayerIndex = 0;
    events = [];
    battleSummary = [];
    permanent = { swordmaster: [], highCouncil: [], makerHooks: [], tech: [], wall: [] };

    saveGame();
    renderGame();
}

// ================= Conflict =================
function generateConflictDeck() {
    const s = a => a.sort(() => Math.random() - 0.5);
    conflictDeck = [
        ...s(window.conflict.filter(c => c.level == "1")).slice(0, 1),
        ...s(window.conflict.filter(c => c.level == "2")).slice(0, 5),
        ...s(window.conflict.filter(c => c.level == "3")).slice(0, 4)
    ];
}

// ================= Render Game =================
function renderGame() {
    d3.select("body").html("");
    const b = d3.select("body");

    // Round
    const r = b.append("div");
    const card = conflictDeck[currentRound - 1];
    r.append("h2").text(`Round ${currentRound} - ${card ? card.name + " " + card.level : "error"}`);

    // Player cards
    const pc = b.append("div");
    players.forEach((p, i) => {
        const c = pc.append("div")
            .attr("class", "player-card")
            .style("border-color", p.color)
            .classed("first", i === firstPlayerIndex)
            .on("click", () => selectEventPlayer(p.id));

        c.append("h3").text(p.name);
        c.append("div").text(`VP ${p.vp}`);
        c.append("div").text(`⚔️ ${p.swordmaster ? '✓' : '✗'}  🏛️ ${p.highCouncil ? '✓' : '✗'}  🪝 ${p.makerHooks ? '✓' : '✗'}  💥 ${p.wall ? '✓' : '✗'}`);
    });

    // Event area
    b.append("div").attr("id", "eventDiv").append("h3").text("click player to add event");

    // Controls
    const ctl = b.append("div").attr("class", "btn-group");
    ctl.append("button").text("◀").on("click", prevRound);
    ctl.append("button").text("▶").on("click", nextRound);
    ctl.append("button").text("edit").on("click", () => { edit = !edit; });
    ctl.append("button").text("export").on("click", exportData);
    ctl.append("button").text("end game").on("click", initGameUI);

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
    d.append("h3").text(p.name);

    d.append("button").text("➕ VP").on("click", () => renderVPInput());
    d.append("button").text("⭐ Ability").on("click", () => renderPermInput());
    d.append("button").text("⚔️ Battle").on("click", () => renderBattleInput());
    d.append("button").text("🎴 Buy Card").on("click", () => renderBuyCardInput());
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
        { text: "reach 2 influence", vp: 1 },
        { text: "gain Alliance", vp: 1 },
        { text: "spice must flow", vp: 1 },
        { text: "combat", vp: 1 },
        { text: "battle icon", vp: 1 },
        { text: "intrigue", vp: 1 },
        { text: "imperium", vp: 1 },
        { text: "lose 2 influence", vp: -1 },
        { text: "lose Alliance", vp: -1 }
    ];

    const reasonDiv = d.append("div").attr("id", "vpReasonBtns").style("margin-top", "5px");
    reasons.forEach(r => {
        reasonDiv.append("button")
            .text(r.text)
            .style("margin", "2px")
            .on("click", () => commitVP(r.vp, r.text));
    });

    // ===== 陣營按鈕（如果需要）=====
    const factions = ["emperor", "spacing guild", "bene gesserit", "fremen"];
    const factionDiv = d.append("div").attr("id", "vpFactionBtns").style("margin-top", "5px");
    factionDiv.style("display", "none"); // 預設隱藏
    factions.forEach(f => {
        factionDiv.append("button")
            .text(f)
            .style("margin", "2px")
            .on("click", () => commitVP(eventDraft.vpChange, f));
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

        if (["reach 2 influence", "gain Alliance", "lose 2 influence", "lose Alliance"].includes(rText)) {
            factionDiv.style("display", "block");
        } else {
            factionDiv.style("display", "none");
            commitVP(vpVal); // 不需 faction 直接提交
        }
    });
}


function commitVP(vpValue, faction = null) {
    if (!eventDraft.playerId || !vpValue) return;

    const p = players.find(pl => pl.id === eventDraft.playerId);
    if (!p) return;

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
            c.location.join(",").toLowerCase().includes(val) ||
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
        ["breakWall", "💥", "global"]
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
        p.wall = !p.wall;
        newValue = p.wall;
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

// Battle
// ===== Battle =====
function renderBattleInput() {
    const d = d3.select("#eventDiv").html("");
    d.append("h3").text("Battle Ranking");

    let rank = [];

    // 顯示目前選擇狀態
    const status = d.append("div")
        .attr("id", "battleStatus")
        .style("margin", "8px 8px")
        .text("Choose rank 1");

    // 玩家按鈕區
    const btnDiv = d.append("div")
        .attr("id", "battleButtons");

    players.forEach(p => {
        const btn = btnDiv.append("button")
            .text(p.name)
            .style("margin", "4px")
            .on("click", function () {

                if (rank.includes(p.id)) return;

                rank.push(p.id);

                // 視覺反饋
                d3.select(this)
                    .style("opacity", "0.5")
                    .text(`${rank.length}. ${p.name}`);

                if (rank.length < 3) {
                    status.text(`Choose rank ${rank.length + 1}`);
                } else {
                    status.text("Selection complete");
                    setTimeout(() => commitBattle(rank), 300);
                }
            });
    });

    d.append("button")
        .text("Cancel")
        .style("margin-top", "10px")
        .on("click", resetEventDraft);
}

function commitBattle(r) {
    events.push({ type: "battle", round: currentRound, ranking: r });
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

        if (e.type === "vpChange")
            t += `${findP(e.playerId)} VP ${e.value} ${e.reason}${e.faction ? " (" + e.faction + ")" : ""}`;

        if (e.type === "permanent")
            t += `${findP(e.playerId)} ${e.value ? "gain" : "lose"} ${e.ability}`;

        if (e.type === "battle") {
            if (e.ranking && e.ranking.length) {
                const medals = ["🥇", "🥈", "🥉"];
                const names = e.ranking.map((pid, i) =>
                    `${medals[i]} ${findP(pid)}`
                );
                t += names.join(" ");
            } else {
                t += "Battle ended";
            }
        }

        if (e.type === "buyCard")
            t += `${findP(e.playerId)} Buy card ${e.card.name} (Persuasion: ${e.card.cost})`;

        ul.append("li").text(t);
    });
    renderTimelineFilters();
}

const findP = id => players.find(p => p.id === id).name;

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
            timelineFilter = { type:"all", playerId:null };
            renderTimeline();
        }
    );

    // ===== Battle =====
    addBtn(
        "Battle",
        timelineFilter.type === "battle",
        () => {
            timelineFilter = { type:"battle", playerId:null }
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
                timelineFilter = { type:"playerVP", playerId:p.id };
                renderTimeline();
            }
        );
    });
}



// ================= Round =================
function nextRound() {
    if (currentRound < conflictDeck.length) {
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