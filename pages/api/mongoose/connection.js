import mongoose from "mongoose";

//CONNECTING TO MONGOOSE
const { DATABASE_URL } = process.env;

//connection functions=
const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  console.log("About to try the connection");
  try {
    const db = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected? ", connection.isConnected);
  } catch (err) {
    console.log(err);
  }
}

export default dbConnect;
