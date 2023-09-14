import * as fs from "fs";
import {parse} from "csv-parse"
import path from "path";
import Planets from "./planets.mongo";

interface Planet {
    "kepid": number,
    "kepoi_name": string,
    "kepler_name": string,
    "koi_disposition": string,
    "koi_pdisposition": string,
    "koi_score": number,
    "koi_fpflag_nt": number,
    "koi_fpflag_ss": number,
    "koi_fpflag_co": number,
    "koi_fpflag_ec": number,
    "koi_period": string,
    "koi_period_err1": number,
    "koi_period_err2": number,
    "koi_time0bk": number,
    "koi_time0bk_err1": number,
    "koi_time0bk_err2": number,
    "koi_impact": number,
    "koi_impact_err1": number,
    "koi_impact_err2": number,
    "koi_duration": number,
    "koi_duration_err1": number,
    "koi_duration_err2": number,
    "koi_depth": number,
    "koi_depth_err1": number,
    "koi_depth_err2": number,
    "koi_prad": number,
    "koi_prad_err1": number,
    "koi_prad_err2": number,
    "koi_teq": number,
    "koi_teq_err1": string,
    "koi_teq_err2": string,
    "koi_insol": number,
    "koi_insol_err1": number,
    "koi_insol_err2": number,
    "koi_model_snr": number,
    "koi_tce_plnt_num": number,
    "koi_tce_delivname": string,
    "koi_steff": number,
    "koi_steff_err1": number,
    "koi_steff_err2": number,
    "koi_slogg": number,
    "koi_slogg_err1": number,
    "koi_slogg_err2": number,
    "koi_srad": number,
    "koi_srad_err1": number,
    "koi_srad_err2": number,
    "ra": number,
    "dec": number,
    "koi_kepmag": number
}


function isHabitablePlanet(planet: Planet) {
    return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.34 &&
        planet["koi_insol"] < 1.10 &&
        planet["koi_prad"] < 1.8
    );
}

// Loading The Data From The Csv File
export function loadPlanetsDate() {
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "..", "Data", "kepler_data.csv"))
            .pipe(parse({
                comment: "#",
                columns: true,
            }))
            .on("data", async (data: Planet) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data);

                }
            })
            .on("error", (error) => {
                // console.log("Error");
                reject(error)
                console.log(error);
            })
            .on("end", () => {
                resolve()
            });
    })
}


async function savePlanet(planet: Planet) {
    try {
        await Planets.updateOne({kepler_name: planet.kepler_name}, {kepler_name: planet.kepler_name}, {upsert: true})
    } catch (err) {
        console.log(`We Could Not Save Planet ${err}`)
    }
}

export async function listAllPlanets() {
    return Planets.find({},{__v:0});
}