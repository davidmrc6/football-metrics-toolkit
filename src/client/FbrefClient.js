import { buildLeagueUrl } from '../utils/helpers.js';
import { TableParser } from '../utils/parsers.js'
import { fetchTableData } from './fetcher.js';
import { validateParams } from '../utils/validators.js';


class FbrefClient {
    #parser;

    constructor() {
        this.#parser = new TableParser();
    };


    // Private fetch table method
    // Change name to fetchTables() (or something generic like fetchData()?), make the method public, allow the user to
    // pass in either a single table type, or an array of table types (Probably inside of params). then, need
    // to update the validateParams() to account for this.
    // IDEA: if single 'table' param is passed, transform to array of just one table in 'validateParams'
    async fetchTable(params) {
        const validatedParams = validateParams(params);
        return fetchTableData({
            params: validatedParams,
            urlBuilder: buildLeagueUrl,
            parser: (html, params) => this.#parser.parse(html, params)
        })
    }

    // IDEA: To avoid a lot of short methods in FbrefClient, make user run a generic function
    // by passing in a table type (or an array of tables, or an empty cols parameter to parse
    // all available table stats )

    // Get comprehensive stats
    // The user inputs an array of `cols`, and the client parses all tables available.
    // Or, the default is all the data available in all tables.

}

export default FbrefClient;
