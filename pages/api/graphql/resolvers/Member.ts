import { UserParent, Context } from "../../interfaces/interfaces";
import { Prayer, Profile, Testimony, Tithe } from "../../mongoose/models";
export const Member = {
  profile: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const profile = await Profile.findOne({ memberId: _id });

    return profile;
  },

  prayers: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const prayers = await Prayer.find({ memberId: _id });

    return prayers;
  },

  testimonies: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const testimonies = await Testimony.find({ memberId: _id });

    return testimonies;
  },
  tithes: async (parent: UserParent, _: any, { userInfo }: Context) => {
    let { _id } = parent;
    const tithes = await Tithe.find({ memberId: _id });

    return tithes;
  },
};
