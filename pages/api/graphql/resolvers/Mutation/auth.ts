import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../../signature";
import validator from "validator";
import {
  MemberInput,
  UserPayload,
  CredentialsInput,
  Context
} from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Member, Profile } from "../../../mongoose/models";


export const authResolvers = {
  signup: async (
    _: any,
    { user }: { user: MemberInput },
    __: any
  ): Promise<UserPayload> => {
    try {
      await dbConnect();
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

    const { firstName, sureName, email, password, phone, gender } = user;

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

    const isValidPhone = validator.isLength(phone, {
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

    //Check if the user with same email exists
    const oldMember1 = await Member.findOne({ email });

    if (oldMember1) {
      return {
        userErrors: [
          {
            message: "User with same email exists",
          },
        ],
        token: null,
      };
    }

    const oldMember2 = await Profile.findOne({ phone });
    if (oldMember2) {
      return {
        userErrors: [
          {
            message: "User with same phone number exists",
          },
        ],
        token: null,
      };
    }

    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 6);

    //CREATE SCHEMAS
    const member = new Member({
      password: hashedPassword,
      email,
      disabled: false,
      roles: ["user"],
    });
    const newMember = await member.save();
    const memberId = newMember._id.toString();

    const profile = new Profile({
      firstName,
      sureName,
      phone,
      gender,
      memberId,
    });

    //SAVE NOW
    try {
      
      const newProfile = await profile.save();

      const token = await JWT.sign(
        {
          userId: newMember._id,
        },
        JSON_SIGNATURE,
        { expiresIn: "3600000" }
      );

      return {
        userErrors: [],
        token,
      };
    } catch (err) {
      console.log(err);
      return {
        userErrors: [
          {
            message: "An error occured trying to save it, try again",
          },
        ],
        token: null,
      };
    }
  },

  signIn: async (
    _: any,
    { credentials }: { credentials: CredentialsInput },
    __: any
  ): Promise<UserPayload> => {

    try {
      await dbConnect();
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



    const { email, password } = credentials;
    const memberDetails = await Member.findOne({
      email,
    });

    if (!memberDetails) {
      return {
        userErrors: [{ message: "No user with such email exists!" }],
        token: null,
      };
    }

    const obtainedPassword = memberDetails.password;

    const isCorrect = await bcrypt.compare(password, obtainedPassword);

    if (!isCorrect) {
      return {
        userErrors: [{ message: "Wrong email or password" }],
        token: null,
      };
    }

    const token = JWT.sign(
      {
        userId: memberDetails._id,
      },
      JSON_SIGNATURE,
      { expiresIn: 3600000 }
    );


    return {
      userErrors: [],
      token,
    };
  },

  signOut: (_:any, {token}:{token:string}, {userInfo}:Context):Boolean=> {
    console.log(token);
    return true;
  }
};
