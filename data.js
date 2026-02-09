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

/* -------------------- conflict -------------------- */
(() => {
    const rows = readCSV("imperium-Table 1.csv");
    const groups = [];
    const locationFields = ['landsraad', 'city', 'spice_trade', 'emperor', 'spacing_guild', 'bene_gesserit', 'fremen'];
    const tagFields = ['emperor', 'spacing_guild', 'bene_gesserit', 'fremen'];


    for (const row of rows) {
        if (!row.no) continue;

        const img = `./image/${row.name.toLowerCase().replace(/\s+/g, "_")}.png`;
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

        groups.push({
            no: row.no,
            img,
            name: row.name,
            expanision: row.expansion,
            cost: row.cost_persuasion,
            location,
            tag,
            type: "imperium",
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