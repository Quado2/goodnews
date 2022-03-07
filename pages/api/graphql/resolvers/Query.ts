import { Context, UserProfile } from "../../interfaces/interfaces";
import { Prayer, Profile, Member } from "../../mongoose/models";
import dbConnect from "../../mongoose/connection";

export const Query = {
  me: async (_: any, __: any, { userInfo }: Context) => {
    
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Could not identify the user",
          },
        ],
        member: [],
      };
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
        member: [],
      };
    }
   

    const member = await Member.findOne({ _id: userInfo.userId });
    return {member: member, userErrors: []}
  },



  profile:async (_: any, {memberId}: {memberId: string},__:any ) => {
   

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
        profile: [],
      };
    }

    const profile = await Profile.findOne({memberId});
     return {
       userErrors: [],
       profile
     }

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
   // const prayers =  await Prayer.find({memberId: userInfo.userId});
    let prayers
    return{
      userErrors: [],
      me,
      prayers
    }


  }
};
