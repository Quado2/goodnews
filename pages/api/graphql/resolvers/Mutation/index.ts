import { authResolvers } from "./auth";
import { testResolver } from "./test";

export const Mutation = {
  ...authResolvers,
  ...testResolver,
}