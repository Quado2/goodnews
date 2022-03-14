import { authResolvers } from "./auth";
import { testResolver } from "./test";
import {prayersResolvers} from './prayers'
import {testimonyResolvers} from './testimonies'
import {titheResolvers} from './tithes'
import {partnerResolvers} from './partnership'

export const Mutation = {
  ...authResolvers,
  ...testResolver,
  ...prayersResolvers,
  ...testimonyResolvers,
  ...titheResolvers,
  ...partnerResolvers,
}