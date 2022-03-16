import {
  Context,
  VisitorInput,
  VisitorPayload,
} from "../../../interfaces/interfaces";
import dbConnect from "../../../mongoose/connection";
import { Visitor } from "../../../mongoose/models";

export const visitorResolvers = {
  visitorSubmit: async (
    _: any,
    { visitorInput }: { visitorInput: VisitorInput },
    { userInfo }: Context
  ): Promise<VisitorPayload> => {
    console.log("we got here");
    await dbConnect().catch((err) => {
      console.log(err);
      return {
        userErrors: [{ message: "Could not connect to the database!" }],
        success: false,
      };
    });

    const { name, phone, content, type } = visitorInput;
    console.log({name, phone, content, type});
    
    const newVisitor = new Visitor({
      type,
      phone,
      name,
      content,
    });

    await newVisitor.save();

    return {
      userErrors: [],
      success: true,
    };
  },
};
