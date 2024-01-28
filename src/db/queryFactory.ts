import { Model, PopulateOptions, Query } from 'mongoose'
import { ParsedUrlQuery } from 'node:querystring'
import AppError from '../utils/AppError'
import {  UrlQuery } from '../types'

const paginate = (query: Query<any, any>, urlQuery: ParsedUrlQuery, docs: number) => {
  const page = Math.max(Number(urlQuery.page) || 1, 1)
  const limit = Math.max(Number(urlQuery.limit) || 20, 1)
  const skip = (page - 1) * limit

  if (skip > docs) throw new AppError(400, 'Page out of bounds')

  return query.skip(skip).limit(limit)
}

const filter = (query: Query<any, any>, urlQuery: ParsedUrlQuery) => {
  /** query will be passed in as JSON object via url query
  example: filter={"category":"electronics","price":{"$gte":100,"$lte":500}} */
  const filterQuery = Array.isArray(urlQuery.filter) ?
    Object.fromEntries(urlQuery.filter.map(q => JSON.parse(q))) :
  JSON.parse(urlQuery.filter || '{}')

  return query.find(filterQuery)
}

export const queryFactory = async <T>(model: Model<any>, urlQuery: UrlQuery, find: object, populateOptions?: PopulateOptions): Promise<T[]> => {
  const query = model.find(find)

  paginate(
    filter(query, urlQuery)
      .sort(
        JSON.parse(urlQuery.sort))
      .select(urlQuery.fields?.replaceAll(',', ' ') || '-__v'),
    urlQuery,
    await model.countDocuments()
  )

  if (populateOptions) {
    query.populate(populateOptions)
  }
  return query
}
