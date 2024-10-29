import { buildLeagueUrl } from '../utils/helpers.js';
import { TableParser } from '../utils/parsers.js'
import { validateParams } from '../utils/validators.js';
import { getHtml } from "../utils/helpers.js";
import { WarningHandler } from './WarningHandler.js';


class FbrefClient {
    #parser;
    #warningHandler;

    constructor(options = {}) {
        this.#warningHandler = new WarningHandler(options);
        this.#parser = new TableParser();
    };

    async fetchTable(params) {
        this.#warningHandler.warn('FbrefClient', 'Starting data fetch...');

        let validatedParams;
        try {
            validatedParams = validateParams(params);
            this.#warningHandler.warn('FbrefClient', 'Parameters validated successfully');
        } catch (error) {
            this.#warningHandler.warn('FbrefClient', `Parameter validation failed: ${error.message}`);
            throw error;
        }

        try {
            const url = buildLeagueUrl(validatedParams);
            this.#warningHandler.warn('FbrefClient', `Fetching data from: ${url}`);

            const html = await getHtml(url);
            this.#warningHandler.warn('FbrefClient', 'HTML content retrieved successfully');

            const result = await this.#parser.parse(html, validatedParams);

            // Final success message
            this.#warningHandler.warn('FbrefClient', 'Data fetching and parsing completed successfully');

            return result;
        } catch (error) {
            this.#warningHandler.warn('FbrefClient', `Critical error: ${error.message}`);
            throw error;
        }
    }

}

export default FbrefClient;
