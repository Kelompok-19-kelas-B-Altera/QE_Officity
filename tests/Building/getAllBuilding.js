const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get All Building", function() {
        it("Get All Building", function(done) {
            api.get("/api/v1/building").end(function(err, res) {
                // validasi reponse code
                expect(res.status).to.equals(200);
                // validasi JSON Schema
                expect(res.body).to.be.jsonSchema(
                    require("../../resource/schema/Building/getAllBuilding.json")
                );
                done();
            });
        });
    });
};