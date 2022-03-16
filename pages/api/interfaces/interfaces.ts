export interface MemberInput {
  firstName: string;
  sureName: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
}

export interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export interface Prayer {
  _id: String;
  title: string;
  details: string;
  date: number;
}

export interface Testimony {
  _id: String;
  title: string;
  details: string;
  date: number;
}

export interface PrayerPayload {
  userErrors: {
    message: string;
  }[];
  prayers: Prayer[] | null;
}

export interface TestimonyPayload {
  userErrors: {
    message: string;
  }[];
  testimonies: Testimony[] | null;
}

export interface Context {
  userInfo: {
    userId: string | null;
  } | null;
}

export interface CredentialsInput {
  email: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
}

export interface PrayerInput {
  title: string;
  details: string;
}

export interface UserParent {
  _id: string;
}

export interface PrayerEditInput {
  prayerId: string;
  title: string;
  details: string;
}

export interface TestimonyEditInput {
  testimonyId: string;
  title: string;
  details: string;
}
export interface UserError {
  message: string;
}

export interface Tithe {
  date: number;
  amount: number;
  isConfirmed: number;
  memberId: string;
  _id: string;
}

export interface TitheInput {
  date: number;
  amount: number;
  isConfirmed: Boolean;
}

export interface EditTitheInput {
  date: number;
  amount: number;
  isConfirmed: Boolean;
  titheId: String;
}

export interface TithePayload {
  userErrors: UserError[];
  tithes: Tithe[];
}

export interface PartnerCreateInput {
  plan: string;
}

export interface Partner {
  _id: string;
  memberId: string;
  startDate: string;
  plan: string;
}

export interface PartnerPayment {
  _id: string;
  memberId: string;
  date: string;
  plan: string;
  status: string;
}

export interface PartnershipPayload {
  partnerDetails: Partner | null;
  partnerPayments: PartnerPayment[];
  userErrors: UserError[];
}

export interface PaymentPayload {
  partnerPayments: PartnerPayment[];
  userErrors: UserError[];
}

export interface VisitorPayload {
  success: boolean;
  userErrors: UserError[];
}

export interface VisitorInput {
  name: string;
  phone: string;
  content: string;
  type: string
}
