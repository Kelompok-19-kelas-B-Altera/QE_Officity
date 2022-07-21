const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Facility", function() {
        it("Post Facility", function(done) {
            api
                .post("/api/v1/facility")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    name: "Kantor Urusan Agama",
                    type: "Layanan",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Facility/postFacility.json")
                    );
                    done();
                });
        });

        it("Post Facility -- With User token ", function(done) {
            api
                .post("/api/v1/facility")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    name: "PDAM",
                    type: "Pelayanan",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });

        it("Post Facility -- Duplicate data", function(done) {
            api
                .post("/api/v1/facility")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    name: "Kantor Urusan Agama",
                    type: "Layanan",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Duplicate data");
                    done();
                });
        });
    });
};