import dbConnect from "../../../mongoose/connection"
import {Context, PartnerCreateInput, PartnershipPayload, PaymentPayload} from '../../../interfaces/interfaces'
import { Partner, PartnerPayment } from "../../../mongoose/models";
import { monthList } from "../../../../../utils";

const plans = {
  Senior: 5000,
  Junior: 2000,
}

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

    const {plan} = partnerInput;
    const today = new Date();
    const year = today.getFullYear();
    const month = monthList[today.getMonth()];
    const startDate = month + " " + year
    
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

  }, 
  partnerPay: async(_:any, {amount, status}:{amount:number, status:string}, {userInfo}: Context):Promise<PaymentPayload>=> {

    //Connect DB
    dbConnect().catch(err => {
      console.log(err);
      return {
        partnerPayments:[],
        userErrors: [{message: "Could not connect to the database"}],
      }
    })

    //Get existing information
    const partnerData = await Partner.findOne({memberId: userInfo?.userId});
    const partnerPayments = await PartnerPayment.find({memberId: userInfo?.userId});
    
    //Check if its a multiple
    const planAmount = plans[partnerData.plan as  keyof typeof plans];
    if(amount%planAmount){
      return {
        userErrors: [{message: "Amount must be a factor of the plan subscribed to"}],
        partnerPayments: []
      }
    }


    let startDate;
    if(partnerPayments.length > 0){
      //startDate will be determined here
    }else{
      startDate = partnerData.startDate;
    }


    let [startMonth, startYear] = startDate.split(" ")
    startYear = parseInt(startYear);
    const iteration = amount/planAmount;
    for(let i = 0; i< iteration; i++){


      new PartnerPayment({
        date: ``,
        memberId: userInfo?.userId,
        plan: partnerData.plan,
        amount: planAmount,
        paidDate : new Date().getTime(),
        status,

      })
    }


   

    return {
      partnerPayments: [], 
      userErrors: []
  
    }
  }

  
}