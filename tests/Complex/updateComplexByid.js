const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Update Complex", function() {
        it("Update Complex", function(done) {
            api
                .patch("/api/v1/complex/14")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    city: "Surabaya",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Complex/updateComplexById.json")
                    );
                    done();
                });
        });

        it("Update Complex -- User Token", function(done) {
            api
                .patch("/api/v1/complex/7")
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

        it("Update Complex -- Data Not Found", function(done) {
            api
                .get("/api/v1/complex/99")
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