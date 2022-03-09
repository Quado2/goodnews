import { Context, TitheInput } from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import {Tithe} from '../../../mongoose/models'

export const titheResolvers = {
  titheSubmit:  async (_: any, {tithe}: {tithe:TitheInput}, {userInfo}:Context) => {
      try{
        await dbConnect();
      }catch(err){
        console.log(err);
        return{
          userErrors: [{message:"Could not connect to the database!"}],
          tithes: []
        }
      }

    
    const {amount, date, isConfirmed} = tithe;

    const newTithe = new Tithe({
      amount,
      date,
      isConfirmed,
      memberId: userInfo?.userId
    })

   const savedTithe =  await newTithe.save();
   console.log(savedTithe);

   const tithes = await Tithe.find({memberId: userInfo?.userId});


   return {
     userErrors: [],
     tithes,
   }

  }
}