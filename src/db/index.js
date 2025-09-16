import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    console.log("try runn");
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected succesfully");
    return res;
  } catch (er) {
    console.log("data base connection error", er);
    process.exit(1);
  }
};

export { dbConnect };
