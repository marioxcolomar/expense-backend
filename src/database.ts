import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//details from the env
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.du4t6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function db() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
  } catch (e) {
    console.log("Error in database connection", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
