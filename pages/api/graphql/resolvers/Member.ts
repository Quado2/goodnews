import { UserParent, Context } from "../../interfaces/interfaces";
import { Prayer, Profile } from "../../mongoose/models";
export const Member = {

  profile: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const profile = await Profile.find({ memberId:_id });
    console.log(profile)
    return profile
  },

  prayers: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    //const memberId = _id.toString();
    const prayers = await Prayer.find({ memberId:_id });
      
    return prayers
  },

  
 
};
