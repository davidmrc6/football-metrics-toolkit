import { TableType, FootballMetricsClient, convertToCSV, saveToCSV } from 'football-metrics-toolkit';

const client = new FootballMetricsClient();

const data = await client.fetchTable({
    league: 'premier-league',
    season: '2020-2021',
    team: 'Arsenal'
})

const csv = convertToCSV(data);
await saveToCSV(csv);
