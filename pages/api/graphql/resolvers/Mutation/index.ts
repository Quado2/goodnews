import { authResolvers } from "./auth";
import { testResolver } from "./test";
import {prayersResolvers} from './prayers'
import {testimonyResolvers} from './testimonies'
import {titheResolvers} from './tithes'

export const Mutation = {
  ...authResolvers,
  ...testResolver,
  ...prayersResolvers,
  ...testimonyResolvers,
  ...titheResolvers
}