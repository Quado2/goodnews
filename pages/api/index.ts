import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import { typeDefs } from "./graphql/schema";
import { Query, Mutations } from "./graphql/resolvers";
import { setDefaultResultOrder } from "dns";
import { FaSleigh } from "react-icons/fa";

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutations,
  },
});

const startServer = server.start();

export default cors(async function hander(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
