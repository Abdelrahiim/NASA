import {ObjectId} from "mongoose";

export interface Launch  {
    flightNumber: number,
    mission: string,
    rocket: string,
    launchDate: Date,
    destination:string | ObjectId,
    customers: string[],
    upcoming: boolean,
    success: boolean
}

