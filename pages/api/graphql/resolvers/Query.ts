import { Context, UserProfile } from "../../interfaces/interfaces";
import { Profile } from "../../mongoose/models";
import dbConnect from "../../mongoose/connection";

export const Query = {
  me: async (_: any, __: any, { userInfo }: Context) => {
    console.log({userInfo})
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
    if (!userInfo) {
      return null;
    }

    const profile = await Profile.findOne({ memberId: userInfo.userId });
    return profile;
  },
};
