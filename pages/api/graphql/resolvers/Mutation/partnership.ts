import dbConnect from "../../../mongoose/connection"
import {Context, PartnerCreateInput, PartnershipPayload} from '../../../interfaces/interfaces'
import { Partner } from "../../../mongoose/models";
export const partnerResolvers ={
  partnerCreate: async (_:any, {partnerInput}:{partnerInput: PartnerCreateInput}, {userInfo}:Context):Promise<PartnershipPayload>=> {

    try{
      dbConnect();
    }
    catch(err){
      return{
        partnerDetails: null,
        partnerPayments: [],
        userErrors:[
          {message: "Could not connect to the database. Refresh the page to try again"}
        ]
      }
    }

    const {startDate, plan} = partnerInput;
    const newPartner = new Partner({
      memberId: userInfo?.userId,
      plan,
      startDate
    }).save();

    if(newPartner){
      return {
        partnerDetails: newPartner,
        partnerPayments:[],
        userErrors: [],
      }
    }
    else{
      return {
        partnerDetails: newPartner,
        partnerPayments:[],
        userErrors: [],
      }
    }

  }
}