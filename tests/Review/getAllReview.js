const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get All Review", function() {
        it("Get All Review", function(done) {
            api
                .get("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Review/getAllReview.json")
                    );
                    done();
                });
        });
    });
};