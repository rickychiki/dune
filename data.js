const fs = require("fs");
const path = require("path");

/* -------------------- 通用函式 -------------------- */
function parseCSVLine(line) {
    const regex = /("(?:[^"]|"")*"|[^,]+)(?=,|$)/g;
    const result = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
        result.push(match[1].replace(/^"|"$/g, "").trim());
    }
    return result;
}

function readCSV(fileName) {
    const csvDir = path.join(__dirname, "csv");

    // 確認 ./csv 資料夾存在
    if (!fs.existsSync(csvDir)) {
        throw new Error("❌ 找不到 ./csv 資料夾，請確認檔案路徑。");
    }

    // 組合完整路徑
    const filePath = path.join(csvDir, fileName);

    // 確認 CSV 檔存在
    if (!fs.existsSync(filePath)) {
        throw new Error(`❌ 找不到檔案：${filePath}`);
    }

    // 讀取 CSV
    const rawData = fs.readFileSync(filePath, "utf8");
    const lines = rawData.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error(`${fileName} 沒有資料`);

    const headers = parseCSVLine(lines[0]);
    const rows = lines.slice(1).map(line => {
        const cols = parseCSVLine(line);
        return Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? ""]));
    });

    return rows;
}

function writeJS(fileName, varName, data) {
    const outputDir = path.join(__dirname, "data");

    // 如果沒有 data 資料夾就建立
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // 實際輸出檔案路徑
    const outputFile = path.join(outputDir, fileName);
    const jsContent = `window.${varName} = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(outputFile, jsContent, "utf8");
    console.log(`✅ 已生成 ${path.relative(__dirname, outputFile)}`);
}

function parseEffect(str, type, groupOffset = 1, branchIndex = 0) {
    if (!str || str === "-") return null;

    // 輔助函式：只拆分「最外層」的分隔符
    function splitTopLevel(input, separator) {
        const parts = [];
        let bracketLevel = 0;
        let tempPart = "";
        const tokens = input.split(/(\s+)/);

        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];
            const trimmedT = t.trim();

            if (t.includes("(")) bracketLevel += (t.match(/\(/g) || []).length;
            if (t.includes(")")) bracketLevel -= (t.match(/\)/g) || []).length;

            if (bracketLevel === 0 && trimmedT.toUpperCase() === separator.toUpperCase()) {
                parts.push(tempPart.trim());
                tempPart = "";
            } else {
                tempPart += t;
            }
        }
        const lastPart = tempPart.trim();
        if (lastPart) parts.push(lastPart);
        return parts.filter(p => p.length > 0);
    }

    let steps = [];

    // --- 第一層：拆分 OR (最高優先級，產生分支) ---
    if (groupOffset === 1) {
        const orParts = splitTopLevel(str, "OR");
        if (orParts.length > 1) {
            orParts.forEach((part, bIdx) => {
                steps = steps.concat(parseEffect(part, type, 1, bIdx));
            });
            return steps;
        }
    }

    // --- 【新加入】第二層：拆分 AND (重置 Group) ---
    // AND 連接的多個動作，每一段都從相同的 groupOffset 開始
    const andParts = splitTopLevel(str, "AND");
    if (andParts.length > 1) {
        andParts.forEach(part => {
            // 這裡傳入相同的 groupOffset，讓它們都從 gp1 (或當前起始點) 開始
            steps = steps.concat(parseEffect(part, type, groupOffset, branchIndex));
        });
        return steps;
    }

    // --- 第三層：拆分 THEN (Group 遞增) ---
    const thenParts = splitTopLevel(str, "THEN");
    if (thenParts.length > 1) {
        thenParts.forEach((part, tIdx) => {
            steps = steps.concat(parseEffect(part, type, groupOffset + tIdx, branchIndex));
        });
        return steps;
    }

// --- 第四層：拆分 + (同 Group) ---
    const plusParts = splitTopLevel(str, "+");

    // 【修正重點】在此處先預解析整段的 IF 條件
    let commonCondition = null;
    let commonConditionValue = null;
    let remainingStr = str.trim();

    // 檢查這一段是否以 IF 開頭
    const ifMatch = remainingStr.match(/^IF\s+(\d+)?\s*([\w\d_]+)\s+(.+)/i);
    if (ifMatch) {
        if (ifMatch[1]) commonConditionValue = parseInt(ifMatch[1], 10);
        commonCondition = ifMatch[2].trim();
        // 將剩餘的字串重新拆分，去除 IF 部分
        remainingStr = ifMatch[3].trim();
        // 重新獲得沒有 IF 的 plusParts
        const newPlusParts = splitTopLevel(remainingStr, "+");
        
        newPlusParts.forEach(part => {
            processPart(part, commonCondition, commonConditionValue);
        });
    } else {
        plusParts.forEach(part => {
            processPart(part, null, null);
        });
    }

    // 將重複的解析邏輯封裝成 function
    function processPart(part, cond, condVal) {
        let currentPart = part.trim();
        if (!currentPart) return;

        // 括號處理 (NESTED_CHAIN)
        if (currentPart.startsWith("(") && currentPart.endsWith(")")) {
            steps.push({
                group: groupOffset,
                branch: branchIndex,
                type: "nestedAction",
                subSteps: parseEffect(currentPart.slice(1, -1), type, 1, branchIndex)
            });
            return;
        }

        const match = currentPart.match(/^(\d+)?\s*([\w\d_]+)/i);
        steps.push({
            group: type == "location" ? 10 + groupOffset: groupOffset,
            branch: branchIndex,
            type: match ? match[2] : currentPart,
            amount: (match && match[1]) ? parseInt(match[1], 10) : 1,
            // 只有在 groupOffset 為 1 (或起始 group) 時才套用 commonCondition
            condition: groupOffset > 1 ? null : cond,
            conditionValue: groupOffset > 1 ? null : condVal
        });
    }

    return steps;
}

/* -------------------- conflict -------------------- */
(() => {
    const rows = readCSV("imperium-Table 1.csv");
    const groups = [];
    const locationFields = ['landsraad', 'city', 'spiceTrade', 'emperor', 'spacingGuild', 'beneGesserit', 'fremen', 'spy'];
    const tagFields = ['emperor', 'spacingGuild', 'beneGesserit', 'fremen'];


    for (const row of rows) {
        if (!row.no) continue;

        const img = `./image/${row.expansion}-imperium-${row.name.toLowerCase().replace(/\s+/g, "-")}.webp`;
        // 計算 location array
        const location = locationFields.filter(f => {
            const val = row[f] ? row[f].trim() : "";
            return val === "1" || val === "3";
        });

        // 計算 tag array
        const tag = tagFields.filter(f => {
            const val = row[f] ? row[f].trim() : "";
            return val === "2" || val === "3";
        });

        // Agent effects
        let agentEffect;
        if (row.agentEffect && row.agentEffect !== "-") {
            const parsed = parseEffect(row.agentEffect, "card")
            // parsed.text = row["agent effect text"] || "";
            agentEffect = parsed;
        }

        // Reveal effects
        let revealEffect;
        if (row.revealEffect && row.revealEffect !== "-") {
            const parsed = parseEffect(row.revealEffect, "card");
            // parsed.text = row["reveal effect text"] || "";
            revealEffect = parsed;
        }

        // Discard effects
        let discardEffect;
        if (row.discardEffect && row.discardEffect !== "-") {
            const parsed = parseEffect(row.discardEffect, "card");
            discardEffect = parsed;
        }

        // Acquire effects
        let acquireEffect;
        if (row.acquireEffect && row.acquireEffect !== "-") {
            const parsed = parseEffect(row.acquireEffect, "card");
            acquireEffect = parsed;
        }

        // Trash effects
        let trashEffect;
        if (row.trashEffect && row.trashEffect !== "-") {
            const parsed = parseEffect(row.trashEffect, "card");
            trashEffect = parsed;
        }

        // Push 到 groups
        groups.push({
            // no: row.no,
            // img,
            name: row.name,
            // expanision: row.expansion,
            numberOfCopy: row.numberOfCopy,
            cost: row.persuasion,
            location,
            tag,
            discardEffect,
            acquireEffect,
            trashEffect,
            agentEffect,
            revealEffect,
            // type: "imperium",
        });
    }

    writeJS("imperium.js", "imperium", groups);

})();

/* -------------------- conflict -------------------- */
(() => {
    const rows = readCSV("conflict-Table 1.csv");
    const groups = [];

    for (const row of rows) {
        if (!row.no) continue;

        const img = `./image/${row.name.toLowerCase().replace(/\s+/g, "_")}.png`;

        groups.push({
            no: row.no,
            img,
            name: row.name,
            expanision: row.expansion,
            location: row.location,
            level: row.level,
            icon: row.icon,
            type: "conflict",
        });
    }

    writeJS("conflict.js", "conflict", groups);

})();

/* -------------------- leader -------------------- */
(() => {
    const rows = readCSV("leader-Table 1.csv");
    const groups = [];

    for (const row of rows) {
        if (!row.no) continue;

        const img = `./image/${row.name.toLowerCase().replace(/\s+/g, "_")}.png`;

        groups.push({
            no: row.no,
            img,
            name: row.name,
            expanision: row.expansion,
            abilitiy: row.abilitiy,
            signet_ring: row.signet_ring,
            house: row.house,
            complex: row.complex,
            type: "leader",
        });
    }

    writeJS("leader.js", "leader", groups);

})();

/* -------------------- location -------------------- */
(() => {
    const rows = readCSV("location-Table 1.csv");
    const groups = [];
    const expansionKeys = ["uprising", "base", "ix", "immortality", "bloodline"];
    for (const row of rows) {
        if (!row.no) continue;

        const img = `./image/${row.name.toLowerCase().replace(/\s+/g, "-")}.png`;

        // 1. 建立 variants 物件
        const variants = {};

        // 2. 遍歷擴充欄位，解析非空內容
        expansionKeys.forEach(key => {
            const cellContent = row[key];

            // 只有當內容不是 "-" 且不是 "no" 且有值時才進行解析
            if (cellContent && cellContent !== "-" && cellContent !== "null") {
                const parsed = parseEffect(cellContent, "location");
                if (parsed) {
                    variants[key] = parsed;
                }
            } else if (cellContent && cellContent === "null") {
                variants[key] = null;
            }
        });

        groups.push({
            no: row.no,
            img,
            name: row.name,
            type: row.type,
            connect: (row.connect && row.connect !== "-")
                ? row.connect.split(",").map(id => parseInt(id.trim()))
                : [],
            variants: variants       // 這裡會包含如 { uprising: {...}, base: {...}
        });
    }

    writeJS("location.js", "location", groups);

})();