
import {
  PrayerInput,
  Context,
  TestimonyPayload,
  TestimonyEditInput
} from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Testimony } from "../../../mongoose/models";

export const testimoniesResolvers = {
  testimonySubmit: async (
    _: any,
    { testimony }: { testimony: PrayerInput },
    { userInfo }: Context
  ): Promise<TestimonyPayload> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Could not identify user!",
          },
        ],
        testimonies: [],
      };
    }
    try {
      await dbConnect();
    } catch (err) {
      return {
        userErrors: [
          {
            message: "Could not connect to database",
          },
        ],
        testimonies: [],
      };
    }

    const { title, details } = testimony;

    if (title.length < 1) {
      return {
        userErrors: [
          {
            message: "Title should be atleast a character",
          },
        ],
        testimonies: [],
      };
    }

    if (details.length < 5) {
      return {
        userErrors: [
          {
            message: "Details should not be less than 5 character",
          },
        ],
        testimonies: [],
      };
    }

    const newTestimony = new Testimony({
      title,
      details,
      date: new Date().getTime(),
      memberId: userInfo.userId,
    });

    const savedPrayer = await newTestimony.save();

    const testimonies = await Testimony.find({ memberId: userInfo.userId });

    return {
      userErrors: [],
      testimonies,
    };
  },
  testimonyDelete: async (
    _: any,
    { testimonyId }: { testimonyId: String },
    { userInfo }: Context
  ): Promise<TestimonyPayload> => {

    try {
      await dbConnect();
    } catch (err) {
      return {
        userErrors: [
          {
            message: "Could not connect to database",
          },
        ],
        testimonies: [],
      };
    }

    //We check if the user owns the prayer
    const testimony = await Testimony.findOne({ _id: testimonyId });
    if (testimony) {
      if (!(testimony.memberId.toString() === userInfo?.userId)) {
        return {
          userErrors: [
            {message: "You don't have permision to delete the testimony."}
          ],
          testimonies: [],
        }
      }
    } 

    //We go ahead to delete
    const remove = await Testimony.deleteOne({ _id: testimonyId });

    if (remove.deletedCount === 1) {
      const testimonies = await Testimony.find({ memberId: userInfo?.userId });
      return {
        userErrors: [],
        testimonies,
      };
    } else {
      return {
        userErrors: [{ message: "We could not delete the prayer." }],
        testimonies: [],
      };
    }
  },



  testimonyEdit: async (
    _: any,
    {editPrayer}: {editPrayer:PrayerEditInput},
    { userInfo }: Context
  ) => {

   const {prayerId, title, details} = editPrayer

    try {
      await dbConnect();
    } catch (err) {
      return {
        userErrors: [
          {
            message: "Could not connect to database",
          },
        ],
        prayers: [],
      };
    }

    //We check if the user owns the prayer
    const prayer = await Prayer.findOne({ _id: prayerId });
    if (prayer) {
      if (!(prayer.memberId.toString() === userInfo?.userId)) {
        return {
          userErrors: [
            {message: "You don't have permision to edit the prayer."}
          ],
          prayers: []
        }
      }
    } 

    //We go ahead to edit
    const edited = await Prayer.updateOne({ _id: prayerId }, {title, details});

    console.log(edited)
    
    if (edited.acknowledged && edited.modifiedCount>0) {
      const prayers = await Prayer.find({ memberId: userInfo?.userId });
      return {
        userErrors: [],
        prayers,
      };
    } else {
      return {
        userErrors: [{ message: "We could not edit the prayer." }],
        prayers: [],
      };
    }
  },
};
