import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "./mongoose/connection";
import {User} from './mongoose/models/user'
//import { User } from "./mongoose/models/user";

type Data = {
  name: string;
};

dbConnect();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = new User({
    name: "Ndubuisi",
    email: "email@gmail.com",
    phone: "08012322323",
    password: "goodboy"
  });

  user
    .save()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).json({name: "wE are deeply sorry"});
      
    });

  //res.status(200).json({ name: 'John Doe' })
}
