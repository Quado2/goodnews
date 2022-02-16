import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connect } from "./mongoose/connection";
import { User } from "./mongoose/models/user";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = new User({
    id: "adfaf",
    name: "Okonkwo",
    email: "email@gmail.com",
    phone: "2323423",
  });

  user
    .save()
    .then((res: any) => {
      res.json(res);
    })
    .catch((err: any) => {
      res.status(400).json({name: "wE are deeply sorry"});
      console.log;
    });

  //res.status(200).json({ name: 'John Doe' })
}
