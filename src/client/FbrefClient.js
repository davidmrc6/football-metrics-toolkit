import { buildLeagueUrl } from '../utils/helpers.js';
import { TableParser } from '../utils/parsers.js'
import { validateParams } from '../utils/validators.js';
import { getHtml } from "../utils/helpers.js";


class FbrefClient {
    #parser;

    constructor() {
        this.#parser = new TableParser();
    };

    async fetchTable(params) {
        const validatedParams = validateParams(params);
        return this.#fetchTableData({
            params: validatedParams,
            urlBuilder: buildLeagueUrl,
            parser: (html, params) => this.#parser.parse(html, params)
        })
    }

    async #fetchTableData({
        params,
        urlBuilder,
        parser,
    }) {
        try {
            const url = urlBuilder(params);
            const html = await getHtml(url);
            return parser(html, params);
        } catch (error) {
            console.trace(error);
            throw new Error(`Failed to fetch table data: ${error.message}`);
        }
    }

}

export default FbrefClient;
