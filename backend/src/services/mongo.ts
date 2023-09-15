import mongoose from "mongoose";
import colors from "colors";
import {Mongo_URL} from "./settings";

mongoose.connection.once("open", () => {
    console.log(colors.green("MongoDB Server Connected Successfully"))
})
mongoose.connection.on("error", (err) => {
    console.log(err)
})


// Connecting To The Database
export async function connectMongo (){
    await mongoose.connect(Mongo_URL);
}


// Disconnect From The Database
export async function disconnectMongo(){
    await mongoose.disconnect()
}




