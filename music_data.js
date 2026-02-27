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

/* -------------------- anime -------------------- */
(() => {
    const rows = readCSV("anime-Table 1.csv");
    const groups = [];


    for (const row of rows) {

        let uri = row['Track URI'];
        let name = row['Track Name'];
        let anime = row['Anime Name'];
        let date = row['Release Date'];

        // Push 到 groups
        groups.push({
            uri,
            name,
            anime,
            date
        });
    }

    writeJS("anime.js", "anime", groups);

})();
