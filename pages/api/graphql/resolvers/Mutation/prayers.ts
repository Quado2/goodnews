import {PrayerInput,Context, PrayerPayload} from '../../../interfaces/interfaces'
import dbConnect from '../../../mongoose/connection';

export const prayersResolvers = {
  prayerSubmit: async (_:any, {prayer}: {prayer:PrayerInput}, {userInfo}: Context): Promise<PrayerPayload> => {

    if(!userInfo){
      return null;
    }
    try{
      await dbConnect();
    } catch(err){
      return {
        userErrors:[{
          message: "Could not connect to database",
        },],
        prayers: null,
      }
    }
   


  }
}