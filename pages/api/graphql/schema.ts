import {gql} from 'apollo-server-micro'

export const typeDefs = gql`

type Query {
  me: String
}

type User {
  id: ID!
  name: String!
  email: String
  phone: String
  tithes: [Tithe!]!
}





`

