const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get Building By Id", function() {
        it("Get Building By Id", function(done) {
            api.get("/api/v1/building/1").end(function(err, res) {
                // validasi reponse code
                expect(res.status).to.equals(200);

                // validasi JSON Schema
                expect(res.body).to.be.jsonSchema(
                    require("../../resource/schema/Building/getBuildingById.json")
                );
                done();
            });
        });

        it("Get Building By Id -- Data Not Found", function(done) {
            api.get("/api/v1/building/19").end(function(err, res) {
                // validasi reponse code
                expect(res.status).to.equals(400);
                expect(res.body.message).equal("Data not found");
                done();
            });
        });
    });
};