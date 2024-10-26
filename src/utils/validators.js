import { leagues, seasons } from "./constants.js";

function validateParams(params) {
    if (!params?.league) {
        throw new Error(`The 'league' parameter is required.`)
    }
    if (!params?.season) {
        throw new Error(`The 'season' parameter is required.`)
    }

    if (params?.cols && !Array.isArray(params.cols)) {
        throw new Error(`Wrong input for 'cols'. Must be an array object.`)
    }

    if (!leagues.includes(params.league)) {
        throw new Error(`Wrong input for 'league', or the league '${params.league}' is not yet supported.` +
            ` Allowed parameters are: [${leagues.map(league => `'${league}'`).join(', ')}].`
        )
    }

    if (!seasons.includes(params.season)) {
        throw new Error(`Wrong input for 'season', or the season '${params.season}' is not yet supported.` +
            ` Allowed parameters are: [${seasons.map(season => `'${season}'`).join(', ')}].`
        )
    }

    return params;
}

export { validateParams };
