import {gql} from 'apollo-server-micro'

export const typeDefs = gql`

type Query {
  me: String
}

type Mutations{
  signup(user: MemberInput!): AuthPayload!
}

type Member {
  id: ID!
  name: String!
  email: String
  phone: String
  tithes: [Tithe!]!
}

type Tithe {
  month: String,
  year: String,
  amount: Int,
}

type AuthPayload{
  userErrors: [UserError!]!
  token: String
}

type UserError{
  message: String!
}

input MemberInput{
  name: String!
  email: String
  phone: String
  password: String!

}





`

