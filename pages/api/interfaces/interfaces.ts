export  interface MemberInput {
  firstName: string,
  sureName: string,
  phone: string,
  email: string,
  password: string,
  gender: string,
}

export interface UserPayload{
  userErrors:{
    message: string,
  }[];
  token : string | null;
}

export interface Prayer{
  _id: String,
  title: string,
  details: string,
  date: number
  
}

export interface PrayerPayload{
  userErrors:{
    message: string,
  }[],
  prayers: Prayer[] | null
}

export interface Context {
  userInfo:{
    userId: string | null
  } | null
}

export interface CredentialsInput{
  email: string,
  password: string
}

export interface UserProfile {
  firstName: string,
}

export interface PrayerInput{
  title: string,
  details:string,
}

export interface UserParent{
  _id: string
}

export interface PrayerEditInput{
  prayerId: string;
  title: string;
  details: string;
}

