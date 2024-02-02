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
const queryFactory = async (model, urlQuery, find, populateOptions) => {
    const query = model.find(find);
    paginate(filter(query, urlQuery)
        .sort((0, parse_1.parse)(urlQuery.sort))
        .select(urlQuery.fields?.replaceAll(',', ' ') || '-__v'), urlQuery, await model.countDocuments());
    if (populateOptions) {
        query.populate(populateOptions);
    }
    return query;
};
exports.queryFactory = queryFactory;
