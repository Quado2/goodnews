import {
  Context,
  TitheInput,
  EditTitheInput,
  TithePayload,
} from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Tithe } from "../../../mongoose/models";

export const titheResolvers = {
  titheSubmit: async (
    _: any,
    { tithe }: { tithe: TitheInput },
    { userInfo }: Context
  ): Promise<TithePayload> => {
    
    try {
      await dbConnect();
    } catch (err) {
      console.log(err);
      return {
        userErrors: [{ message: "Could not connect to the database!" }],
        tithes: [],
      };
    }

    const { amount, date, isConfirmed } = tithe;

    const newTithe = new Tithe({
      amount,
      date,
      isConfirmed,
      memberId: userInfo?.userId,
    });

    await newTithe.save();

    const tithes = await Tithe.find({ memberId: userInfo?.userId });

    return {
      userErrors: [],
      tithes,
    };
  },

  titheEdit: async (
    _: any,
    { editTithe }: { editTithe: EditTitheInput },
    { userInfo }: Context
  ): Promise<TithePayload> => {
    try {
      await dbConnect();
    } catch (err) {
      console.log(err);
      return {
        userErrors: [{ message: "Could not connect to the database!" }],
        tithes: [],
      };
    }

    const { amount, date, isConfirmed, titheId } = editTithe;

    //We check if the user owns the prayer
    const tithe = await Tithe.findOne({ _id: titheId });
    if (tithe) {
      if (!(tithe.memberId.toString() === userInfo?.userId)) {
        return {
          userErrors: [
            { message: "You don't have permision to edit the tithe" },
          ],
          tithes: [],
        };
      }
    } else {
      return {
        userErrors: [{ message: "The tithe does not exist." }],
        tithes: [],
      };
    }

    //We go ahead to edit
    const edited = await Tithe.updateOne(
      { _id: titheId },
      { date, amount, isConfirmed }
    );

    if (edited.acknowledged && edited.modifiedCount > 0) {
      const tithes = await Tithe.find({ memberId: userInfo?.userId });
      return {
        userErrors: [],
        tithes,
      };
    } else {
      return {
        userErrors: [
          { message: "Something went wrong, we could not edit the testimony." },
        ],
        tithes: [],
      };
    }
  },
  titheDelete: async (
    _: any,
    { titheId }: { titheId: string },
    { userInfo }: Context
  ): Promise<TithePayload> => {

    try {
      await dbConnect();
    } catch (err) {
      return {
        userErrors: [
          {
            message: "Could not connect to database",
          },
        ],
        tithes: [],
      };
    }

    //We check if the user owns the prayer
    const testimony = await Tithe.findOne({ _id: titheId });
    if (testimony) {
      if (!(testimony.memberId.toString() === userInfo?.userId)) {
        return {
          userErrors: [
            { message: "You don't have permision to delete the tithe." },
          ],
          tithes: [],
        };
      }
    }

    //We go ahead to delete
    const remove = await Tithe.deleteOne({ _id: titheId });

    if (remove.deletedCount === 1) {
      const tithes = await Tithe.find({ memberId: userInfo?.userId });
      return {
        userErrors: [],
        tithes,
      };
    } else {
      return {
        userErrors: [{ message: "We could not delete the tithe." }],
        tithes: [],
      };
    }
  },
};
