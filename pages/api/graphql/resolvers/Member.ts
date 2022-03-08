import { UserParent, Context } from "../../interfaces/interfaces";
import { Prayer, Profile, Testimony } from "../../mongoose/models";
export const Member = {

  profile: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const profile = await Profile.findOne({ memberId:_id });
   
    return profile
  },

  prayers: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    //const memberId = _id.toString();
    const prayers = await Prayer.find({ memberId:_id });
      
    return prayers
  },

  testimonies: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    //const memberId = _id.toString();
    const testimonies = await Testimony.find({ memberId:_id });
      
    return testimonies
  },

  
 
};
