import { title } from "process";
import {
  PrayerInput,
  Context,
  PrayerPayload,
  PrayerEditInput,
} from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Prayer } from "../../../mongoose/models";

export const prayersResolvers = {
  prayerSubmit: async (
    _: any,
    { prayer }: { prayer: PrayerInput },
    { userInfo }: Context
  ): Promise<PrayerPayload> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Could not identify user!",
          },
        ],
        prayers: null,
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
        prayers: null,
      };
    }

    const { title, details } = prayer;

    if (title.length < 1) {
      return {
        userErrors: [
          {
            message: "Title should be atleast a character",
          },
        ],
        prayers: null,
      };
    }

    if (details.length < 5) {
      return {
        userErrors: [
          {
            message: "Details should not be less than 5 character",
          },
        ],
        prayers: null,
      };
    }

    const newPrayer = new Prayer({
      title,
      details,
      date: new Date().getTime(),
      memberId: userInfo.userId,
    });

    const savedPrayer = await newPrayer.save();

    const prayers = await Prayer.find({ memberId: userInfo.userId });

    return {
      userErrors: [],
      prayers,
    };
  },
  prayerDelete: async (
    _: any,
    { prayerId }: { prayerId: String },
    { userInfo }: Context
  ) => {
    try {
      await dbConnect();
    } catch (err) {
      return {
        userErrors: [
          {
            message: "Could not connect to database",
          },
        ],
        prayers: null,
      };
    }

    //We check if the user owns the prayer
    const prayer = await Prayer.findOne({ _id: prayerId });
    if (prayer) {
      if (!(prayer.memberId.toString() === userInfo?.userId)) {
        return {
          userErrors: [
            { message: "You don't have permision to delete the message." },
          ],
        };
      }
    }

    //We go ahead to delete
    const remove = await Prayer.deleteOne({ _id: prayerId });

    if (remove.deletedCount === 1) {
      const prayers = await Prayer.find({ memberId: userInfo?.userId });
      return {
        userErrors: [],
        prayers,
      };
    } else {
      return {
        userErrors: [{ message: "We could not delete the prayer." }],
        prayers: [],
      };
    }
  },

  prayerEdit: async (
    _: any,
    { editPrayer }: { editPrayer: PrayerEditInput },
    { userInfo }: Context
  ) => {
    const { prayerId, title, details } = editPrayer;

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
            { message: "You don't have permision to edit the prayer." },
          ],
          prayers: [],
        };
      }
    }

    //We go ahead to edit
    const edited = await Prayer.updateOne(
      { _id: prayerId },
      { title, details }
    );

    if (edited.acknowledged && edited.modifiedCount > 0) {
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
