import {ObjectId} from "mongoose";

export interface Launch {
    flightNumber: number, //flight_number
    mission: string, //name
    rocket: string, // rocket.name
    launchDate: Date, // data_local
    destination: string | ObjectId, // not applicable
    customers: string[],
    upcoming: boolean, //upcoming
    success: boolean // upcoming
}

type Payload = {
    customers: string[]
}

export interface SpaceXAPILaunch {
    flight_number: number;
    name: string;
    rocket: {
        name: string
    };
    date_local: Date
    payloads: Payload[]
    upcoming: boolean, //upcoming
    success: boolean

}

export interface SpaceXAPILaunchData {
    docs: SpaceXAPILaunch[]
}


export interface RequestQueryParameters{
    limit?:number,
    page?:number
}
