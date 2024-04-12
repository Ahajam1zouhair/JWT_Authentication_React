import { connect } from "mongoose";

const connectionDB = () => {
  try {
    connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
export default connectionDB;
