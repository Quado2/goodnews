import { Context, TitheInput } from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";

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
    
  }
}