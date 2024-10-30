import { buildLeagueUrl } from '../utils/helpers.js';
import { TableParser } from '../utils/parsers.js'
import { validateParams } from '../utils/validators.js';
import { getHtml } from "../utils/helpers.js";
import { WarningHandler } from './WarningHandler.js';

/**
 * Class responsible for fetching and parsing football metrics data.
 * It uses a TableParser to parse the HTML content and a WarningHandler to log warnings.
 */
class FootballMetricsClient {
    #parser;
    #warningHandler;


    /**
     * Creates an instance of FootballMetricsClient.
     *
     * @param {Object} [options={}] - Configuration options for the client.
     */
    constructor(options = {}) {
        this.#warningHandler = new WarningHandler(options);
        this.#parser = new TableParser();
    };

    /**
     * Fetches and parses the football metrics table based on the provided parameters.
     *
     * @param {Object} params - The parameters for fetching the football metrics table.
     * @returns {Promise<Object>} The parsed result of the football metrics table.
     * @throws {Error} Throws an error if parameter validation or data fetching/parsing fails.
     */
    async fetchTable(params) {
        this.#warningHandler.warn('FootballMetricsClient', 'Starting data fetch...');

        let validatedParams;
        try {
            validatedParams = validateParams(params);
            this.#warningHandler.warn('FootballMetricsClient', 'Parameters validated successfully');
        } catch (error) {
            this.#warningHandler.warn('FootballMetricsClient', `Parameter validation failed: ${error.message}`);
            throw error;
        }

        try {
            const url = buildLeagueUrl(validatedParams);
            this.#warningHandler.warn('FootballMetricsClient', `Fetching data from: ${url}`);

            const html = await getHtml(url);
            this.#warningHandler.warn('FootballMetricsClient', 'HTML content retrieved successfully');

            const result = await this.#parser.parse(html, validatedParams);

            // Final success message
            this.#warningHandler.warn('FootballMetricsClient', 'Data fetching and parsing completed successfully');

            return result;
        } catch (error) {
            this.#warningHandler.warn('FootballMetricsClient', `Critical error: ${error.message}`);
            throw error;
        }
    }

}

export { FootballMetricsClient };
