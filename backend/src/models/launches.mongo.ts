import {Schema, model} from "mongoose";
import {Launch} from "../types";

// Launched Model Schema
const LaunchesSchema = new Schema<Launch>({
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    customers: {
        type: [String],
        required: true
    },
    upcoming: {
        type: Boolean,
        required: true,
        default: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },


})

// Connect Launches Schema With "Launches" Collection
export default model("Launch", LaunchesSchema)
