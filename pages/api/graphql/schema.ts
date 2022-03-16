import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: MemberPayload
    prayers(userId: ID!): [Prayer]
    testimonies(userId: ID!): [Testimony]
    profile(memberId: ID!): ProfilePayload
    prayersMe: PrayerPayload
  }

  type Mutation {
    signup(user: MemberInput!): AuthPayload!
    signIn(credentials: CredentialsInput!): AuthPayload!
    signOut(token: String): SignoutPayload!

    prayerSubmit(prayer: PrayerInput!): PrayerPayload!
    prayerDelete(prayerId: ID!): PrayerPayload!
    prayerEdit(editPrayer: PrayerEditInput!): PrayerPayload!

    testimonySubmit(testimony: PrayerInput!): TestimonyPayload!
    testimonyDelete(testimonyId: ID!): TestimonyPayload!
    testimonyEdit(editTestimony: TestimonyEditInput!): TestimonyPayload!

    titheSubmit(tithe: TitheInput!): TithePayload!
    titheEdit(editTithe: EditTitheInput!): TithePayload!
    titheDelete(titheId: ID!): TithePayload!
    # titheComfirm(titheId: ID!): TithePayload!

    partnerCreate(partnerInput: PartnerCreateInput): PartnershipPayload!
    partnerPay(amount: Float!, status: String!): PaymentPayload!

    visitorCreate(visitorInput: VisitorInput): VisitorPayload!

    testIt: String
  }


type VisitorPayload{
  userErrors: [userError]
  success: Boolean
}

input VisitorInput{
  name: String
  phone: String
  content: String
  type: string
}

  input PartnerCreateInput {
    plan: String!
  }

  type Partner {
    _id: ID!
    memberId: ID!
    startDate: String!
    plan: String!
  }

  type PartnerPayment {
    _id: ID!
    memberId: ID!
    plan: String!
    date: String!
    paidDate: Float!
    amount: Float!
    status: String!
  }

  type PaymentPayload {
    partnerPayments: [PartnerPayment!]!
    userErrors: [UserError]
  }
  type PartnershipPayload {
    partnerDetails: Partner
    partnerPayments: [PartnerPayment!]!
    userErrors: [UserError]
  }

  type Member {
    _id: ID!
    email: String
    prayers: [Prayer]
    profile: Profile
    testimonies: [Testimony]
    tithes: [Tithe]
    partnership: PartnershipPayload
  }
  type PrayersMe {
    userErrors: [UserError]
    me: Profile!
    prayers: [Prayer]
  }

  type MemberPayload {
    userErrors: [UserError!]!
    member: Member!
  }

  type User {
    _id: ID!
    firstName: String!
    sureName: String!
    phone: String!
    email: String!
    prayers: [Prayer]
  }

  type ProfilePayload {
    profile: Profile
    userErrors: [UserError]
  }

  type Profile {
    firstName: String
    sureName: String
    phone: String
    gender: String
    serviveGroups: [String]
  }

  type Tithe {
    date: Float!
    amount: Float!
    _id: ID!
    isConfirmed: Boolean
  }

  type TithePayload {
    userErrors: [UserError!]!
    tithes: [Tithe!]!
  }
  input TitheInput {
    date: Float
    amount: Float
    isConfirmed: Boolean
  }
  input EditTitheInput {
    date: Float
    amount: Float
    isConfirmed: Boolean
    titheId: String
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  type SignoutPayload{
    status: Boolean
  }

  type Prayer {
    title: String!
    details: String!
    date: Float!
    _id: ID!
  }

  type PrayerPayload {
    userErrors: [UserError!]!
    prayers: [Prayer]
  }

  type Testimony {
    title: String!
    details: String!
    date: Float!
    _id: ID!
  }

  type TestimonyPayload {
    userErrors: [UserError!]!
    testimonies: [Testimony]
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

  input PrayerInput {
    title: String!
    details: String!
  }

  input CredentialsInput {
    email: String!
    password: String
  }

  input PrayerEditInput {
    prayerId: ID!
    title: String!
    details: String!
  }

  input TestimonyEditInput {
    testimonyId: ID!
    title: String!
    details: String!
  }
`;
