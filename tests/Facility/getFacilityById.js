const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get Facility By Id", function() {
        it("Get Facility By Id", function(done) {
            api
                .get("/api/v1/facility/1")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Facility/getFacilityById.json")
                    );
                    done();
                });
        });

        it("Get Facility By Id -- Data Not Found", function(done) {
            api
                .get("/api/v1/facility/91")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equal("Data not found");
                    done();
                });
        });
    });
};