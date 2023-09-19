import {RequestQueryParameters} from "../types";

const DEFAULT_PAGE_LIMIT = 30
const DEFAULT_PAGE_NUMBER = 1

/**
 *  Calculate The Skip Value For Pagination
 * @param query RequestQueryParameters
 */
function getPagination(query: RequestQueryParameters) {

    const limit = Math.abs(query.limit as number) || DEFAULT_PAGE_LIMIT
    const page = Math.abs(query.page as number) || DEFAULT_PAGE_NUMBER
    const skip = limit * (page - 1)
    return {
        limit, skip
    }

}

export default getPagination