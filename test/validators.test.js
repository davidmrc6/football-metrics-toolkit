import { validateParams } from '../src/utils/validators.js';
import { TableType } from '../src/utils/types.js';

jest.mock('../src/utils/types.js', () => ({
    LEAGUE_TO_INDEX: {
        'premier-league': 0,
        'la-liga': 1,
    },
    TableType: {
        FULL: { selector: 'full-table' },
        HOME: { selector: 'home-table' },
        AWAY: { selector: 'away-table' },
        STANDARD: {
            FOR: { selector: 'standard-for' },
            AGAINST: { selector: 'standard-against' }
        }
    }
}));

describe('validateParams', () => {
    // Valid parameters to be used in multiple tests
    const validParams = {
        league: 'premier-league',
        season: '2023-2024',
        table: TableType.FULL,
    };

    describe('Required Parameters', () => {
        test('should throw error when league is missing', () => {
            const params = { ...validParams, league: undefined };
            expect(() => validateParams(params)).toThrow("The 'league' parameter is required");
        });

        test('should throw error when season is missing', () => {
            const params = { ...validParams, season: undefined };
            expect(() => validateParams(params)).toThrow("The 'season' parameter is required");
        });
    });

    describe('League Validation', () => {
        test('should accept valid league', () => {
            expect(() => validateParams(validParams)).not.toThrow();
        });

        test('should throw error for unsupported league', () => {
            const params = { ...validParams, league: 'InvalidLeague' };
            expect(() => validateParams(params)).toThrow(/Invalid input for 'league'/);
        });

        test('error message should list available leagues', () => {
            const params = { ...validParams, league: 'InvalidLeague' };
            expect(() => validateParams(params)).toThrow(/Allowed parameters are: premier-league, la-liga/);
        });
    });

    describe('Season Validation', () => {
        test('should accept valid season format', () => {
            expect(() => validateParams(validParams)).not.toThrow();
        });

        test('should throw error for invalid season format', () => {
            const params = { ...validParams, season: '2023' };
            expect(() => validateParams(params)).toThrow(/Invalid season format/);
        });

        test('should throw error for non-consecutive years', () => {
            const params = { ...validParams, season: '2023-2025' };
            expect(() => validateParams(params)).toThrow(/The years should be consecutive/);
        });

        test('should throw error for seasons before 1888', () => {
            const params = { ...validParams, season: '1887-1888' };
            expect(() => validateParams(params)).toThrow(/No data is available before 1888/);
        });
    });

    describe('Table Validation', () => {
        test('should accept valid table object', () => {
            expect(() => validateParams(validParams)).not.toThrow();
        });

        test('should throw error when both table and tables are provided', () => {
            const params = {
                ...validParams,
                table: { selector: 'full-table' },
                tables: [{ selector: 'full-table' }]
            };
            expect(() => validateParams(params))
                .toThrow(/Cannot provide both 'table' and 'tables' parameters/);
        });

        test('should throw error for invalid table type', () => {
            const params = {
                ...validParams,
                table: { selector: 'invalid-table' }
            };
            expect(() => validateParams(params)).toThrow(/Invalid table type provided/);
        });

        test('should accept valid tables array', () => {
            const params = {
                ...validParams,
                table: undefined,
                tables: [TableType.FULL, TableType.STANDARD.FOR]
            };
            expect(() => validateParams(params)).not.toThrow();
        });

        test('should throw error for invalid tables format', () => {
            const params = {
                ...validParams,
                table: undefined,
                tables: 'not-an-array'
            };
            expect(() => validateParams(params))
                .toThrow(/Invalid input for 'tables'. Must be an array/);
        });
    });

    describe('Teams Validation', () => {
        test('should accept single team', () => {
            const params = { ...validParams, team: 'Arsenal' };
            expect(() => validateParams(params)).not.toThrow();
        });

        test('should accept teams array', () => {
            const params = { ...validParams, teams: ['Arsenal', 'Chelsea'] };
            expect(() => validateParams(params)).not.toThrow();
        });

        test('should throw error when both team and teams are provided', () => {
            const params = {
                ...validParams,
                team: 'Arsenal',
                teams: ['Chelsea', 'Liverpool']
            };
            expect(() => validateParams(params))
                .toThrow(/Cannot provide both 'team' and 'teams' parameters/);
        });

        test('should throw error for invalid teams format', () => {
            const params = {
                ...validParams,
                teams: 'not-an-array'
            };
            expect(() => validateParams(params))
                .toThrow(/Invalid input for 'teams'. Must be an array/);
        });
    });

    describe('Cols Validation', () => {
        test('should accept valid cols array', () => {
            const params = { ...validParams, cols: ['position', 'team', 'points'] };
            expect(() => validateParams(params)).not.toThrow();
        });

        test('should throw error for invalid cols format', () => {
            const params = { ...validParams, cols: 'not-an-array' };
            expect(() => validateParams(params))
                .toThrow(/Invalid input for 'cols'. Must be an array/);
        });
    });

    describe('Return Value', () => {
        test('should return normalized parameters', () => {
            const result = validateParams(validParams);
            expect(result).toEqual({
                league: 'premier-league',
                leagueIndex: 0,
                season: '2023-2024',
                tables: [{ selector: 'full-table' }],
                teams: null,
                cols: undefined
            });
        });

        test('should normalize single team to array', () => {
            const params = { ...validParams, team: 'Arsenal' };
            const result = validateParams(params);
            expect(result.teams).toEqual(['Arsenal']);
        });

        test('should normalize single table to array', () => {
            const params = { ...validParams, table: TableType.STANDARD.AGAINST };
            const result = validateParams(params);
            expect(result.tables).toEqual([{ selector: 'standard-against' }]);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty object input', () => {
            expect(() => validateParams({}))
                .toThrow(/The 'league' parameter is required/);
        });

        test('should handle null input', () => {
            expect(() => validateParams(null))
                .toThrow(`Cannot read properties of null (reading 'league'`);
        });

        test('should handle undefined input', () => {
            expect(() => validateParams(undefined))
                .toThrow(`Cannot read properties of undefined (reading 'league')`);
        });
    });
});
