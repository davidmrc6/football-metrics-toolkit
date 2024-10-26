import { getHtml } from "../utils/helpers.js";

async function fetchTableData({
    params,
    urlBuilder,
    parser,
}) {
    try {
        const url = urlBuilder(params);
        const html = await getHtml(url);
        return parser(html, params);
    } catch (error) {
        throw new Error(`Failed to fetch table data: ${error.message}`);
    }
}

export { fetchTableData };
