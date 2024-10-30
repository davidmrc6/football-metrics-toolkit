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
const __dirname = path.dirname(__filename);

function saveToCSV(csvData, filename = 'data.csv') {

    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, csvData, 'utf8', (err) => {
        if (err) {
            throw new Error('Error writing CSV file:', err);
        } else {
            console.log(`CSV file saved as ${filename}`);
        }
    });
}

export { convertToCSV, saveToCSV };
