import { TableType, FootballMetricsClient, convertToCSV, saveToCSV } from 'football-metrics-toolkit';

const client = new FootballMetricsClient();

const data = await client.fetchTable({
    league: 'premier-league',
    season: '2020-2021',
    cols: ['team', 'away_xg_against', 'xg_against']
})

console.log(data);
