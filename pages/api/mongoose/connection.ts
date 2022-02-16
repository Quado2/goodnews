import mongoose from 'mongoose';


//CONNECTING TO MONGOOSE
const {DATABASE_URL} = process.env;

//connection functions=

export const connect = async () => {
  const conn = await mongoose.connect(DATABASE_URL as string)
    .catch(err =>console.log(err))
  console.log("Connection estabalished")

return {conn}

}