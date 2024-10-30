import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function convertToCSV(data) {
    const headers = ['team', ...Object.keys(data[Object.keys(data)[0]])];

    const csvRows = [headers.join(',')];

    for (const [team, stats] of Object.entries(data)) {
        const row = [team, ...headers.slice(1).map(key => stats[key])];
        csvRows.push(row.join(','));
    }

    // Join all rows with newline characters
    return csvRows.join('\n');
}

const __filename = fileURLToPath(import.meta.url);

function saveToCSV(csvData, filename = 'data.csv') {
    const currentDir = process.cwd();

    const filePath = path.join(currentDir, filename);

    fs.writeFile(filePath, csvData, 'utf8', (err) => {
        if (err) {
            throw new Error('Error writing CSV file:', err);
        } else {
            console.log(`CSV file saved as ${filename} in ${currentDir}`);
        }
    });
}

export { convertToCSV, saveToCSV };
