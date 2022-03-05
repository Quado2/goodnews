import { authResolvers } from "./auth";
import { testResolver } from "./test";
import {prayersResolvers} from './prayers'

export const Mutation = {
  ...authResolvers,
  ...testResolver,
  ...prayersResolvers,
}