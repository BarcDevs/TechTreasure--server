import { Model, PopulateOptions, Query } from 'mongoose'
import { ParsedUrlQuery } from 'node:querystring'
import AppError from '../utils/AppError'
import { queryFields, UrlQuery } from '../types'

const paginate = (query: Query<any, any>, urlQuery: ParsedUrlQuery, docs: number) => {
  const page = Math.max(Number(urlQuery.page) || 1, 1)
  const limit = Math.max(Number(urlQuery.limit) || 20, 1)
  const skip = (page - 1) * limit

  if (skip < docs) throw new AppError(400, 'Page out of bounds')

  return query.skip(skip).limit(limit)
}

const filter = (query: Query<any, any>, urlQuery: ParsedUrlQuery) => {
  const filters = Object.entries(urlQuery)
    .filter(([key]) => !(key in queryFields))
    .map(([key, value]) => ({ [key]: value }))

  return query.find(
    JSON.parse(
      JSON.stringify(filters)
        .replace(
          /\b(gt|gte|lt|lte)\b/g,
          match => `$${match}`
        )))
}

export const queryFactory = async <T>(model: Model<T>, urlQuery: UrlQuery, find: Query<T, T>, populateOptions: PopulateOptions) => {
  const query = model.find(find)

  paginate(
    filter(query, urlQuery)
      .sort(
        urlQuery.sort?.replaceAll(',', ' '))
      .select(urlQuery.fields?.replaceAll(',', ' ') || '-__v')
      .populate(populateOptions),
    urlQuery,
    await model.countDocuments()
  )

  return query
}
