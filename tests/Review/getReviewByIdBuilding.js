const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get All Review By Building Id", function() {
        it("Get All Review By Building Id", function(done) {
            api
                .get("/api/v1/review/building/1")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Review/getAllReviewByBuildingId.json")
                    );
                    done();
                });
        });

        it("Get All Review By Building Id -- Building not Reviewed", function(done) {
            api
                .get("/api/v1/review/building/3")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Review/getAllReviewByBuildingIdReviewNull.json")
                    );
                    done();
                });
        });

        it("Get All Review By Building Id -- Data Not Found", function(done) {
            api
                .get("/api/v1/review/building/122")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);

                    // validasi JSON Schema
                    expect(res.body.message).equal("Data not found");
                    done();
                });
        });
    });
};