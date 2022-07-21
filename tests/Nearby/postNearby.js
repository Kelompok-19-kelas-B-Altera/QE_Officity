const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Nearby", function() {
        it("Post Nearby", function(done) {
            api
                .post("/api/v1/nearby")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    distance: 3,
                    id_building: 9,
                    id_facility: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Nearby/postNearby.json")
                    );
                    done();
                });
        });

        it("Post Nearby -- Duplicate Data", function(done) {
            api
                .post("/api/v1/nearby")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    distance: 3,
                    id_building: 9,
                    id_facility: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Duplicate data");
                    done();
                });
        });

        it("Post Nearby -- With User token ", function(done) {
            api
                .post("/api/v1/complex")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    distance: 3,
                    id_building: 10,
                    id_facility: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });

        it("Post Nearby -- Building Not Found", function(done) {
            api
                .post("/api/v1/nearby")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    distance: 3,
                    id_building: 99,
                    id_facility: 13,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });

        it("Post Nearby -- Facility Not Found", function(done) {
            api
                .post("/api/v1/nearby")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    distance: 3,
                    id_building: 5,
                    id_facility: 55,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });
    });
};