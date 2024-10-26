export function validateSingularOrPlural(params, singularName, pluralName) {
    const singular = params[singularName];
    const plural = params[pluralName];

    // Check if at least one is provided
    if (!singular && !plural) {
        throw new Error(`Either ${singularName} or ${pluralName} must be provided`);
    }

    // Check if both are provided
    if (singular && plural) {
        throw new Error(`Cannot provide both ${singularName} and ${pluralName}`);
    }
}

// You could also create a specific football validator
export function validateFootballParams({ league, leagues, season, seasons }) {
    validateSingularOrPlural({ league, leagues }, 'league', 'leagues');
    validateSingularOrPlural({ season, seasons }, 'season', 'seasons');
}
