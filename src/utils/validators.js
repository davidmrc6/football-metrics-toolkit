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

    // if (!leagues.includes(params.league)) {
    //     throw new Error(`Wrong input for 'league', or the league '${params.league}' is not yet supported.` +
    //         ` Allowed parameters are: [${leagues.map(league => `'${league}'`).join(', ')}].`
    //     )
    // }

    // Season validator - regex expression to validate?

    return params;
}

export { validateParams };
