import dbConnect from "../../../mongoose/connection";
import {
  Context,
  PartnerCreateInput,
  PartnershipPayload,
  PaymentPayload,
} from "../../../interfaces/interfaces";
import { Partner, PartnerPayment } from "../../../mongoose/models";
import { monthList } from "../../../../../utils";

const plans = {
  Senior: 5000,
  Junior: 2000,
};

export const partnerResolvers = {
  partnerCreate: async (
    _: any,
    { partnerInput }: { partnerInput: PartnerCreateInput },
    { userInfo }: Context
  ): Promise<PartnershipPayload> => {
    try {
      dbConnect();
    } catch (err) {
      return {
        partnerDetails: null,
        partnerPayments: [],
        userErrors: [
          {
            message:
              "Could not connect to the database. Refresh the page to try again",
          },
        ],
      };
    }

    const { plan } = partnerInput;
    const today = new Date();
    const year = today.getFullYear();
    const month = monthList[today.getMonth()];
    const startDate = month + " " + year;

    const newPartner = new Partner({
      memberId: userInfo?.userId,
      plan,
      startDate,
    }).save();

    if (newPartner) {
      return {
        partnerDetails: newPartner,
        partnerPayments: [],
        userErrors: [],
      };
    } else {
      return {
        partnerDetails: newPartner,
        partnerPayments: [],
        userErrors: [],
      };
    }
  },
  partnerPay: async (
    _: any,
    { amount, status }: { amount: number; status: string },
    { userInfo }: Context
  ): Promise<PaymentPayload> => {
    //Connect DB
    dbConnect().catch((err) => {
      console.log(err);
      return {
        partnerPayments: [],
        userErrors: [{ message: "Could not connect to the database" }],
      };
    });

    //Get existing information
    const partnerData = await Partner.findOne({ memberId: userInfo?.userId });
    let partnerPayments = await PartnerPayment.find({
      memberId: userInfo?.userId,
    });

    //Check if its a multiple
    const planAmount = plans[partnerData.plan as keyof typeof plans];
    if (amount % planAmount) {
      return {
        userErrors: [
          { message: "Amount must be a factor of the plan subscribed to" },
        ],
        partnerPayments: [],
      };
    }

    let startDate;
    if (partnerPayments.length > 0) {
      const lastPayment = partnerPayments[partnerPayments.length - 1].date;
      let [lastMonth, lastYear] = lastPayment.split(" ");
      let nextMonth, nextYear;
      if (monthList.indexOf(lastMonth) >= 11) {
        nextMonth = monthList[0];
        nextYear = parseInt(lastYear) + 1;
      } else {
        nextMonth = monthList[monthList.indexOf(lastMonth) + 1];
        nextYear = lastYear;
      }
      startDate = `${nextMonth} ${nextYear}`;
    } else {
      startDate = partnerData.startDate;
    }


    //process and save
    let [startMonth, startYear] = startDate.split(" ");
    let year = parseInt(startYear);
    let monthIndex = monthList.indexOf(startMonth);
    const iteration = amount / planAmount;
    for (let i = 0; i < iteration; i++) {
      if (monthIndex > 11) {
        monthIndex = 0;
        year++;
      }
      await new PartnerPayment({
        date: `${monthList[monthIndex]} ${year}`,
        memberId: userInfo?.userId,
        plan: partnerData.plan,
        amount: planAmount,
        paidDate: new Date().getTime(),
        status,
      }).save();

      monthIndex++;
    }

    //fetch the one to return
    partnerPayments = await PartnerPayment.find({
      memberId: userInfo?.userId,
    });

    return {
      partnerPayments,
      userErrors: [],
    };
  },
};
