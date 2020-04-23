const request = require("supertest");
const server = require("../api/server");
const router = require("./user-router");
const db = require("../data/dbConfig");
server.use("/api/users", router);

afterEach(async () => {
    await db("users").truncate();
})

describe("user-router.js", () => {
    describe("GET /api/users", () => {
        it("should return status code of 200", () => {
            return request(server).get("/api/users").expect(200);
        });
        it("should return JSON", () => {
            return request(server).get("/api/users").then(res => {
                expect(res.type).toMatch(/json/);            })
        });
        it("should return JSON object and match expected object", () => {
            const expectedJSON = JSON.stringify([])
            return request(server).get("/api/users").then(res => {
                expect(JSON.stringify(res.body)).toBe(expectedJSON);
            })
        });
    })

    describe("POST /api/users", () => {
        const sendData = {
            name: "Tony Balogne",
            email: "tony@tony.com",
            gender: "male",
            ip_address: "192.168.1.1"
        }

        it("should return status code of 201", () => {
            return request(server).post("/api/users").send(sendData).expect(201);
        });
        it("should store body into users table", () => {
            return request(server).post("/api/users").send(sendData).then(res => {
                expect(res.type).toMatch(/json/);
            });
        });
        it("should return object with id", () => {
            return request(server).post("/api/users").send(sendData).then(async res => {
                const expectedJSON = await db("users").where({name: "Tony Balogne"}).first();
                expect(JSON.stringify(res.body)).toMatch(JSON.stringify(expectedJSON))
            })
        });

        it("should return a status of 500 when req.body is incomplete", () => {
            return request(server).post("/api/users").send().expect(500).then(async res => {
                expect(res.body.errorMessage).toMatch("Something went wrong")
            })
        })
    })

    describe("DELETE /api/users/:id", () => {
        const sendData = {
            name: "Tony Balogne",
            email: "tony@tony.com",
            gender: "male",
            ip_address: "192.168.1.1"
        }
        it("should return status code of 200 and 1 user deleted with successful delete", async () => {
            await db("users").insert(sendData);

            return request(server).delete("/api/users/1").expect(200).then(res => {
                expect(res.body.message).toEqual("User was successfully deleted");
            });
        });

        it("should return status code of 401 and 0 users deleted with incorrect id", () => {
            return request(server).delete("/api/users/2").expect(401).then(res => {
                expect(res.body.message).toEqual("User could not be found");
            });
        })
    })
})