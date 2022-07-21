const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Update Facility", function() {
        it("Update Facility", function(done) {
            api
                .patch("/api/v1/facility/9")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    name: "PLN",
                    type: "Pelayanan",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Facility/updateFacility.json")
                    );
                    done();
                });
        });

        it("Update Facility -- User Token", function(done) {
            api
                .patch("/api/v1/facility/1")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .query({
                    city: "Surabaya",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });

        it("Update Facility -- Data Not Found", function(done) {
            api
                .get("/api/v1/facility/99")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    city: "Surabaya",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equal("Data not found");
                    done();
                });
        });
    });
};