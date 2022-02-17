import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../../signature";
import validator from "validator";
import { MemberInput, UserPayload } from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";

export const authResolvers = {
  signup:
    () =>
    async (
      _: any,
      { user }: { user: MemberInput },
      __: any
    ): Promise<UserPayload> => {


      try {
        dbConnect();
      } catch (err) {
        console.log(err);
        return {
          userErrors: [
            {
              message: "Could not connect to the database",
            },
          ],
          token: null,
        };
      }

      const { firstName, sureName, email, password, phone } = user;

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
        min: 6,
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

      const isValidPhone = validator.isLength(password, {
        min: 8,
      });
      if (!isValidPhone) {
        return {
          userErrors: [
            {
              message: "Phone number should not be less than 8 characters",
            },
          ],
          token: null,
        };
      }
    },
};
