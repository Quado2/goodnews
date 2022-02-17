import {gql} from 'apollo-server-micro'

export const typeDefs = gql`

type Query {
  me: User
}

type Mutation{
  userCreate(user: UserInput!): AuthPayload!
}

type User {
  id: ID!
  name: String!
  email: String
  phone: String
  tithes: [Tithe!]!
}

type UserInput{
  name: String!
  email: String
  phone: String
  
}





`

