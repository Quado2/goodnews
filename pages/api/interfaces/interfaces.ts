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

export interface Context {
  userInfo:{
    userId: number | null
  } | null
}