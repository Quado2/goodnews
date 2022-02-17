export  interface MemberInput {
  firstName: string,
  sureName: string,
  phone: string,
  email: string,
  password: string
}

export interface UserPayload{
  userErrors:{
    message: string,
  }[];
  token : string | null;
}