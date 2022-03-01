import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me(token: String): Profile

  }

  type Mutation {
    signup(user: MemberInput!): AuthPayload!
    signIn(credentials: CredentialsInput!): AuthPayload!
    prayerSubmit(prayer: PrayerInput!)!: PrayerPayload!
    testIt: String
  }

  type Member {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    gender: String!
    tithes: [Tithe!]!
  }

  type Profile{
    firstName: String
    sureName: String
    phone: String
  }
  type Tithe {
    month: String
    year: String
    amount: Int
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }
  
  type PrayerPayload{
    userErrors: [UserError!]!
    prayers: [Prayer]
  }
  
  type Prayer{
    title: String!
    details: String!
    date: String!
    _id: ID!
  }

  type UserError {
    message: String!
  }

  input MemberInput {
    firstName: String!
    sureName: String!
    email: String!
    phone: String!
    password: String!
    gender: String!
  }

  input PrayerInput{
    title: String!
    details: String!
  }

  input CredentialsInput{
    email: String!
    password: String
  }
`;
