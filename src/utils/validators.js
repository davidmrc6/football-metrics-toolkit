import { LEAGUE_TO_INDEX } from "./types.js";

function validateParams(params) {
    const { league, season, cols } = params;

    if (!league) {
        throw new Error(`The 'league' parameter is required.`)
    }
    if (!season) {
        throw new Error(`The 'season' parameter is required.`)
    }

    if (cols && !Array.isArray(params.cols)) {
        throw new Error(`Wrong input for 'cols'. Must be an array object.`)
    }

    // Validate league
    if (!Object.hasOwn(LEAGUE_TO_INDEX, league)) {
        const leagues = Object.keys(LEAGUE_TO_INDEX);
        throw new Error(`Wrong input for 'league', or the league '${league}' is not yet supported.` +
            ` Allowed parameters are: ${leagues.join(', ')}`
        )
    }

    // Validate season
    const seasonRegex = /^(\d{4})-(\d{4})$/;
    if (!seasonRegex.test(season)) {
        throw new Error(`Invalid season format '${season}'. Expected format is 'XXXX-YYYY', with consecutive years.`);
    }
    const [_, startYear, endYear] = season.match(seasonRegex).map(Number);
    if (startYear < 1888) {
        throw new Error(`No data is available before 1888. The provided start year '${startYear}' is too early.`);
    }
    if (endYear !== startYear + 1) {
        throw new Error(`Invalid season '${season}'. The years should be consecutive, like '1999-2000'.`);
    }

    return {
        league,
        leagueIndex: LEAGUE_TO_INDEX[league],
        season,
        cols,
    };
}

export { validateParams };
