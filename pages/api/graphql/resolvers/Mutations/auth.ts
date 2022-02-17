import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";
import {JSON_SIGNATURE} from '../../signature'


export const authResolvers = {

  signup: () => "Signed Up"
}