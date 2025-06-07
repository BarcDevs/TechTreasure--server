import User from '../db/userModel'
import { FilterQuery } from 'mongoose'

export const findUserById = async (id: string, fields: string = '') => User.findById(id).select(fields)

export const findUserWithPassword = async (query: FilterQuery<any>) => User.findOne(query).select('+password')
