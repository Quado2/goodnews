import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";
import {JSON_SIGNATURE} from '../../signature';
import validator from "validator";
import { MemberInput, UserPayload } from '../../../interfaces/interfaces';


export const authResolvers = {

  signup: () => async(_:any, {user}: {user:MemberInput}, __:any):Promise<UserPayload> => {
    const {firstName, sureName, email, password, phone} = user
    
    //VALIDATING THE DATA
    
    const isEmail = validator.isEmail(email);
		if (!isEmail) {
			return {
				userErrors: [
					{
						message: "Invalid Email",
					},
				],
				token: null,
			};
		}

		const isValidPassword = validator.isLength(password, {
			min: 5,
		});
		if (!isValidPassword) {
			return {
				userErrors: [
					{
						message: "Invalid Password",
					},
				],
				token: null,
			};
		}

    const isValidFirstName = validator.isLength(password, {
			min: 2,
		});
    if (!isValidFirstName) {
			return {
				userErrors: [
					{
						message: "First name Should not be less than 2 characters",
					},
				],
				token: null,
			};
		}

    const isValidLastName = validator.isLength(password, {
			min: 2,
		});
    if (!isValidLastName) {
			return {
				userErrors: [
					{
						message: "Last name Should not be less than 2 characters",
					},
				],
				token: null,
			};
		}


  }
}