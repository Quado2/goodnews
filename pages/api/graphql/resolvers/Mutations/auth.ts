import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";
import {JSON_SIGNATURE} from '../../signature';
import validator from "validator";
import { MemberInput } from '../../../interfaces/interfaces';


export const authResolvers = {

  signup: () => async(_:any, {user}: {user:MemberInput}, __:any):Promise<UserPayload> => {
    
  }
}