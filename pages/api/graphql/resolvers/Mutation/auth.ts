import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../../signature";
import validator from "validator";
import { MemberInput, UserPayload } from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Member, Profile } from "../../../mongoose/models";
import { profile } from "console";

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
console.log({user})
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
      console.log(oldMember2)
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
      roles: ["user"]
    });

    const profile = new Profile({
      firstName,
      sureName,
      phone,
      gender,

    })


  //SAVE NOW
  try{
    const newMember = await member.save();
    const newProfile = await profile.save();
  

    const token = await JWT.sign(
      {
        userId: newMember._id,
      },
      JSON_SIGNATURE,
      { expiresIn: "3600000"}
    );

    return {
      userErrors: [],
      token,
    };
  }

  catch(err){
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
};
