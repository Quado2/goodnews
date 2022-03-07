import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: MemberPayload
    prayers(userId: ID!): [Prayer]
    profile(memberId: ID!): ProfilePayload
    prayersMe: PrayerPayload

  }

  type Mutation {
    signup(user: MemberInput!): AuthPayload!
    signIn(credentials: CredentialsInput!): AuthPayload!
    prayerSubmit(prayer: PrayerInput!): PrayerPayload!
    prayerDelete(prayerId: ID!): PrayerPayload!
    testIt: String
  }
  type PrayersMe{
    userErrors: [UserError]
    me: Profile!
    prayers: [Prayer]
  }

  type MemberPayload{
    userErrors: [UserError!]!
    member: Member!
  }

  type Member {
    _id: ID!
    email: String
    prayers: [Prayer]
    profile: Profile
  }

  type User {
    _id: ID!
    firstName: String!
    sureName: String!
    phone: String!
    email: String!
    prayers: [Prayer]
    
  }

  type ProfilePayload{
    profile: Profile
    userErrors: [UserError]
  }

  type Profile{
    firstName: String
    sureName: String
    phone: String
    gender: String
    serviveGroups: [String]
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
    date: Float!
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
