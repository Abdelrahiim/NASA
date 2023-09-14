import {Schema, model} from "mongoose";

const PlanetsSchema = new Schema({
    kepler_name: {
        type: String,
        required: true
    }
})


export default model("Planet", PlanetsSchema)