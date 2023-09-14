import colors from "colors";
import dotenv from "dotenv"
import * as http from "http";
import mongoose from "mongoose";
import app from "./app";
import {loadPlanetsDate} from "./models/planets.model"

/*
This is Responsible for Creating and Setting up Server

 */

dotenv.config()
const PORT = process.env.PORT || 8000;

// Database URL
const Mongo_URL = process.env.MONGO_URL as string

// Setting up server
const server = http.createServer(app)


mongoose.connection.once("open", () => {
    console.log(colors.green("MongoDB Server Connected Successfully"))
})
mongoose.connection.on("error", (err) => {
    console.log(err)
})

/**
 * Start Server and made of Configuration
 *
 * */
async function startServer() {
    // Connecting to The DataBase
    await mongoose.connect(Mongo_URL);

    await loadPlanetsDate()
    // Make Server Listen on the Specified PORT
    server.listen(PORT, () => {
            console.log(`Starting server at ${colors.blue(colors.underline(`http://127.0.0.1:${PORT}/`))}`)
        }
    )
}

startServer();
