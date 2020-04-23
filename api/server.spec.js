const server = require('./server');
const request = require('supertest');

describe("server.js", () => {
    describe("GET /", () => {
        it("should return status code of 200", () => {
            return request(server).get("/").expect(200);
        })
        it("should return JSON", () => {
            return request(server).get("/").then(res => {
                expect(res.type).toMatch(/json/);
            })
        });
        it("should return a matching json object", () => {
            const expectedJSON = JSON.stringify({api: "up"});
            return request(server).get("/").then(res => {
                expect(JSON.stringify(res.body)).toMatch(expectedJSON);
            })
        })
    })
})