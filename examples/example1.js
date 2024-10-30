import { FootballMetricsClient } from '../src/client/FootballMetricsClient.js'
import { convertToCSV, saveToCSV } from '../src/utils/csvconverter.js';
import { TableType } from '../src/utils/types.js';

const client = new FootballMetricsClient();

const data = await client.fetchTable({
    league: 'ligue-1',
    season: '2023-2024',
    tables: [
        TableType.OVERALL_STANDINGS,
        TableType.SQUAD_STATS.STANDARD.FOR,
        TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.FOR
    ],
    teams: ['Paris S-G', 'Lille'],
    cols: ['team', 'wins', 'ties', 'losses', 'xg_for', 'gk_psxg_net_per90']
});


const csv = convertToCSV(data);
await saveToCSV(csv, 'football.csv');

console.log(data);
