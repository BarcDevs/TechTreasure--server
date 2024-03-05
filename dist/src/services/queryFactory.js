"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFactory = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const parse_1 = require("../utils/parse");
const paginate = (query, urlQuery, docs) => {
    const page = Math.max(Number(urlQuery.page) || 1, 1);
    const limit = Math.max(Number(urlQuery.limit) || 20, 1);
    const skip = (page - 1) * limit;
    if (skip > docs)
        throw new AppError_1.default(400, 'Page out of bounds');
    return query.skip(skip).limit(limit);
};
const filter = (query, urlQuery) => {
    /** query will be passed in as JSON object via url query
     example: filter={"category":"electronics","price":{"$gte":100,"$lte":500}} */
    const filterQuery = Array.isArray(urlQuery.filter) ?
        Object.fromEntries(urlQuery.filter.map(q => (0, parse_1.parse)(q))) :
        JSON.parse(urlQuery.filter || '{}');
    return query.find(filterQuery);
};
/**
 * Asynchronous function that creates a query for the given model and url query, with optional population options.
 *
 * @template T - a type that represents the document type of mongoose model
 * @param {Model<any>} model - the model to query
 * @param {UrlQuery} urlQuery - the URL query parameters
 * @param {object} find - use to initially filter the query
 * @param {PopulateOptions} [populateOptions] - optional populate options
 * @return {Promise<T[]>} a query promise that resolves to an array of type T
 *
 * optional queries present in @UrlQuery:
 * @page number representing the page number
 * @limit number representing the number of items per page
 * @sort string representing the sort field (add - for descending order. e.g. -createdAt)
 * @fields string representing the fields to return, must be separated by comma
 * @filter stringified JSON representing the filter query. e.g. {"category":"electronics"}
 */
const queryFactory = async (model, urlQuery, find, populateOptions) => {
    const query = model.find(find);
    paginate(filter(query, urlQuery)
        .sort(urlQuery.sort || '-createdAt')
        .select(urlQuery.fields?.replaceAll(',', ' ') || '-__v'), urlQuery, await model.countDocuments());
    if (populateOptions) {
        query.populate(populateOptions);
    }
    return query;
};
exports.queryFactory = queryFactory;
