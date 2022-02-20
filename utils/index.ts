import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../pages/api/graphql/signature";

export const getUserInfoFromToken = async (token: string) => {
	try {
		return JWT.verify(token, JSON_SIGNATURE) as {
			userId: number;
		};
	} catch (err) {
		return null;
	}  
};