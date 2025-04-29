import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
  } catch (err) {
    console.log("error while connecting to db", err);
  }
}
export default connectDB;
