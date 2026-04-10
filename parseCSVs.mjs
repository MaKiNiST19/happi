import fs from 'fs';
import path from 'path';

const dir = 'd:/happio/bildirimler';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

// Sort files properly: table.csv (first), table (1).csv (wait, table (1) is 2nd?, user said "numarası olmayan 1. csvdir")
files.sort((a, b) => {
    const getNum = (str) => {
        if (str === 'table.csv') return 0;
        const match = str.match(/table \((\d+)\)\.csv/);
        return match ? parseInt(match[1]) : 999;
    };
    return getNum(a) - getNum(b);
});

let allRows = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const lines = content.split('\n').filter(l => l.trim() !== '');
    
    // Skip header line if it exists
    const startIndex = lines[0].includes('Gün') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;
        
        // Match CSV row respecting quotes: "1","title","msg","dev","partner"
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        const cols = [];
        let m;
        
        let cleanedLine = line;
        
        // Very basic simple CSV parser since the format is "A","B","C","D","E"
        // Let's replace quotes that wrap the cell.
        const rowData = [];
        let currentCell = '';
        let insideQuotes = false;
        
        for (let char of cleanedLine) {
            if (char === '"' && (currentCell.length === 0 || insideQuotes)) {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                rowData.push(currentCell.trim());
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
        rowData.push(currentCell.trim()); // push last cell
        
        if (rowData.length >= 3) {
            const dayNum = parseInt(rowData[0]);
            if (!isNaN(dayNum)) {
                allRows.push({
                    day: dayNum,
                    title: rowData[1] || "",
                    summary: rowData[2] || "",
                    details: rowData[3] || "",
                    tips: rowData[4] || ""
                });
            }
        }
    }
});

// Sort by day globally just in case
allRows.sort((a, b) => a.day - b.day);

const outPath = 'd:/happio/lib/data/dailyData.ts';

let outContent = `/**
 * Happi - Günlük Bildirim Verileri
 * \`bildirimler\` klasöründeki CSV dosyalarından otomatik oluşturulmuştur.
 */

import { DailyInfo } from "../types";

export const dailyPregnancyData: DailyInfo[] = [
`;

allRows.forEach(row => {
    outContent += `  {
    day: ${row.day},
    title: ${JSON.stringify(row.title)},
    summary: ${JSON.stringify(row.summary)},
    details: [${JSON.stringify(row.details)}],
    tips: [${JSON.stringify(row.tips)}]
  },
`;
});

outContent += `];\n`;

fs.writeFileSync(outPath, outContent);
console.log(`Parsed ${allRows.length} daily entries to dailyData.ts`);
