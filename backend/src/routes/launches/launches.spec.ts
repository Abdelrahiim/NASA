import supertest from "supertest";
import app from "../../app";
import colors from "colors";
import {connectMongo, disconnectMongo} from "../../services/mongo"


// // Define Client
const Client = supertest(app);

describe("Testing Launches API", () => {
    // Connect The Test Environment To the DataBase before all the Tests
    beforeAll(async () => {
        await connectMongo()
    })
    // Disconnect From The Database After All Tests Done
    afterAll(async () => {
        await disconnectMongo()
    })
    /**
     * Testing Launch Get endpoint
     * GET /launches
     */
    describe(`Test ${colors.green("GET")} /launches`, () => {
        test("It Should Return Response 200 And Content-Type = Application/json ", async () => {
            const response = await Client.get("/launches").expect(200).expect("Content-type", /json/)
        })
    })


    /**
     * Testing Launch POST endpoint
     * POST /launches
     */
    describe(`Test ${colors.yellow("POST")} /launches`, () => {
        const launchDataWithDate = {
            mission: "ZTM255",
            rocket: "NCS 1704d",
            destination: "Kepler-440 b",
            launchDate: "January 4,2030"
        }

        const launchDataWithoutDate = {
            mission: "ZTM255",
            rocket: "NCS 1704d",
            destination: "Kepler-440 b",
        }

        const launchDataWithInvalidDate = {
            mission: "ZTM255",
            rocket: "NCS 1704d",
            destination: "Kepler-440 b",
            launchDate: "sddvcxvdfsfsdfds"
        }

        // Success Test
        test("It Should Return Response 201 & Content-type Application/json", async () => {
            const response = await Client.post("/launches")
                .send(launchDataWithDate)
                .expect(201)
                .expect("Content-type", /json/);

            const requestDate = new Date(launchDataWithDate.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            expect(responseDate).toBe(requestDate)
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })

        // Missing Property Test
        test("it Should Return Missing Required Properties", async () => {
            const response = await Client.post("/launches")
                .send(launchDataWithoutDate)
                .expect(400)
                .expect("Content-type", /json/)
            expect(response.body).toStrictEqual({
                error: "All Fields Are Mandatory"
            })
        })
        // Invalid Date Case Test
        test("It Should Return Date Is Invalid ", async () => {
            const response = await Client.post("/launches")
                .send(launchDataWithInvalidDate)
                .expect(400)
                .expect("Content-type", /json/)
            expect(response.body).toStrictEqual({error: "Date Is Invalid"})
        })
    })

    /**
     * Test Launch DELETE End Point
     * DELETE /launches:id
     */
    describe(`Test ${colors.red("DELETE")} /launches:id`, () => {

        // Test Normal Abort Case
        test("It Should Return Status Code 200 And Content-Type = Application/json", async () => {
            const response = await Client.del("/launches/200").expect(200).expect("Content-type", /json/)
        })

        test("It Should Launch Not Aborted ", async () => {
            const response = await Client.del("/launches/200").expect(400).expect("Content-type", /json/);
            expect(response.body).toStrictEqual({error: "Launch Not Aborted"})

        })
    })

})