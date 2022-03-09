import { authResolvers } from "./auth";
import { testResolver } from "./test";
import {prayersResolvers} from './prayers'
import {testimoniesResolvers} from './testimonies'

export const Mutation = {
  ...authResolvers,
  ...testResolver,
  ...prayersResolvers,
  ...testimoniesResolvers,
}