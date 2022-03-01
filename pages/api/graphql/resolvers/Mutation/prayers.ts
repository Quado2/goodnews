import { title } from 'process';
import {PrayerInput,Context, PrayerPayload} from '../../../interfaces/interfaces'
import dbConnect from '../../../mongoose/connection';
import { Prayer } from '../../../mongoose/models';

export const prayersResolvers = {
  prayerSubmit: async (_:any, {prayer}: {prayer:PrayerInput}, {userInfo}: Context): Promise<PrayerPayload> => {

    if(!userInfo){
      return {
        userErrors:[{
          message: "Could not identify user!",
        },],
        prayers: null,
      };
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

    const {title, details} = prayer;

    if(title.length < 1){
      return {
        userErrors:[{
          message: "Title should be atleast a character",
        },],
        prayers: null,
      }
    }

    if(details.length < 5){
      return {
        userErrors:[{
          message: "Details should not be less than 5 character",
        },],
        prayers: null,
      }
    }


    const newPrayer = new Prayer({
      title,
      details,
      date: new Date().getTime(),
      memberId: userInfo.userId
    })

    await newPrayer.save();

    const prayers = await Prayer.findById(userInfo.userId);

    return {
      userErrors: [],
      prayers
    }

   


  }
}