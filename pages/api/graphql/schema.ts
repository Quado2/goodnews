import {gql} from 'apollo-server-micro'

export const typeDefs = gql`

type Query {
  me: Member
}

type Mutation{
  memberCreate(user: MemberInput!): AuthPayload!
}

type Member {
  id: ID!
  name: String!
  email: String
  phone: String
  tithes: [Tithe!]!
}

type AuthPayload{
  userErrors: [UserError!]!
  token: String
}

type UserError{
  message: String!
}

type MemberInput{
  name: String!
  email: String
  phone: String
  password: String!

}





`

