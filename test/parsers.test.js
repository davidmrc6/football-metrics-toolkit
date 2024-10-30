import { TableParser } from '../src/utils/parsers.js';

const mockHtml = `
<div>
    <div id="div_stats_standard">
        <table id="stats_standard">
            <thead>
                <tr>
                    <th data-stat="team">Team</th>
                    <th data-stat="wins">Wins</th>
                    <th data-stat="xg_for">xG</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th data-stat="team">Paris S-G</th>
                    <td data-stat="wins">20</td>
                    <td data-stat="xg_for">45.2</td>
                </tr>
                <tr>
                    <th data-stat="team">Lille</th>
                    <td data-stat="wins">15</td>
                    <td data-stat="xg_for">35.8</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="div_stats_against">
        <table id="stats_against">
            <thead>
                <tr>
                    <th data-stat="team">Team</th>
                    <th data-stat="goals">Against Goals</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th data-stat="team">vs Paris S-G</th>
                    <td data-stat="goals">15</td>
                </tr>
                <tr>
                    <th data-stat="team">vs Lille</th>
                    <td data-stat="goals">20</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

describe('TableParser', () => {
    let parser;

    beforeEach(() => {
        parser = new TableParser({ console: false });
    });

    describe('Basic Parsing', () => {
        test('should parse a simple table correctly', () => {
            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }],
                cols: ['team', 'wins', 'xg_for']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20',
                    'xg_for': '45.2'
                },
                'Lille': {
                    'wins': '15',
                    'xg_for': '35.8'
                }
            });
        });

        test('should handle against tables correctly', () => {
            const params = {
                tables: [{
                    selector: '#stats_against > tbody > tr'
                }],
                cols: ['team', 'against_goals']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'against_goals': '15'
                },
                'Lille': {
                    'against_goals': '20'
                }
            });
        });
    });

    describe('Column Filtering', () => {
        test('should handle invalid columns gracefully', () => {
            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }],
                cols: ['team', 'nonexistent_column', 'wins']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20'
                },
                'Lille': {
                    'wins': '15'
                }
            });
        });

        test('should parse all available columns when cols parameter is not provided', () => {
            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }]
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20',
                    'xg_for': '45.2'
                },
                'Lille': {
                    'wins': '15',
                    'xg_for': '35.8'
                }
            });
        });
    });

    describe('Team Filtering', () => {
        test('should filter teams correctly', () => {
            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }],
                cols: ['team', 'wins'],
                teams: ['Paris S-G']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20'
                }
            });
        });

        test('should return all teams if a non-existent team is inputted', () => {
            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }],
                cols: ['team', 'wins'],
                teams: ['Nonexistent Team']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20'
                },
                'Lille': {
                    'wins': '15'
                }
            });
        });
    });

    describe('Error Handling', () => {
        test('should throw error when no tables are found', () => {
            const params = {
                tables: [{
                    selector: '#nonexistent_table > tbody > tr'
                }],
                cols: ['team', 'wins']
            };

            expect(() => {
                parser.parse(mockHtml, params);
            }).toThrow();
        });

        test('should handle empty tables gracefully', () => {
            const emptyHtml = `
                <div id="div_stats_standard">
                    <table>
                        <thead>
                            <tr>
                                <th data-stat="team">Team</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            `;

            const params = {
                tables: [{
                    selector: '#stats_standard > tbody > tr'
                }],
                cols: ['team']
            };

            expect(() => {
                parser.parse(emptyHtml, params);
            }).toThrow();
        });
    });

    describe('Multiple Tables', () => {
        test('should combine data from multiple tables correctly', () => {
            const params = {
                tables: [
                    {
                        selector: '#stats_standard > tbody > tr'
                    },
                    {
                        selector: '#stats_against > tbody > tr'
                    }
                ],
                cols: ['team', 'wins', 'against_goals']
            };

            const result = parser.parse(mockHtml, params);

            expect(result).toEqual({
                'Paris S-G': {
                    'wins': '20',
                    'against_goals': '15'
                },
                'Lille': {
                    'wins': '15',
                    'against_goals': '20'
                }
            });
        });
    });

})
