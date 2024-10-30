import FootballMetricsClient from '../src/client/FootballMetricsClient.js';
import { TableType } from '../src/utils/types.js';

const client = new FootballMetricsClient();

// Example 1: Fetch only one table
// const table = await client.fetchTable({
//     league: 'premier-league',
//     season: '2023-2024',
//     table: TableType.OVERALL_STANDINGS,
//     cols: ['team', 'games', 'wins', 'ties', 'losses'],
// })

// console.log(table);

// Example 2: Fetch multiple tables
const multiTable = await client.fetchTable({
    league: 'premier-league',
    season: '2024-2025', // Idea: accept 'current' as param
    tables: [
        TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.FOR,
        TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.AGAINST
    ]
})

console.log(multiTable);

// const csv = await json2csv(multiTable);
// console.log(csv);

// Example 3: Fetch all tables
// const comprehensiveTable = await client.fetchTable({
//     league: 'la-liga',
//     season: '2023-2024',
//     // no table or tables col, parse all table data
// })

// const csv = await json2csv(comprehensiveTable);
// console.log(csv);

// Example 4: Fetch data for a particular team
// const teamTable = client.fetchTable({
//     league: 'premier-league',
//     season: '2020-2021',
//     team: 'Arsenal',
//     // empty table param, so get all stats
//     cols: ['team', 'xg', 'xga']
// })

// Example 5: Player data (coming soon)
