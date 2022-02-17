export  interface MemberInput {
  firstName: String,
  sureName: String,
  phone?: String,
  email?: String,
  password: String
}

export interface UserPayload{
  userErrors:{
    message: string,
  }[];
  token : string | null;
}