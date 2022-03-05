import { Context, UserProfile } from "../../interfaces/interfaces";
import { Prayer, Profile } from "../../mongoose/models";
import dbConnect from "../../mongoose/connection";

export const Query = {
  me: async (_: any, __: any, { userInfo }: Context) => {
    
    if (!userInfo) {
      return null;
    }

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
   

    const profile = await Profile.findOne({ memberId: userInfo.userId });
    return profile;
  },
  prayersMe: async(_:any, __:any,{userInfo}: Context) => {
    if(!userInfo){
      return null
    }

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
        prayers: null,
        me: null,
      };
    }

    const me = await Profile.findOne({memberId: userInfo.userId});
    const prayers =  await Prayer.find({memberId: userInfo.userId});

    return{
      userErrors: [],
      me,
      prayers
    }


  }
};
