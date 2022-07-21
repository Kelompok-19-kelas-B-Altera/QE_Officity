const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Complex", function() {
        it("Post Complex", function(done) {
            api
                .post("/api/v1/complex")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    city: "Karanganyar",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Complex/postComplex.json")
                    );
                    done();
                });
        });

        it("Post Complex -- With User token ", function(done) {
            api
                .post("/api/v1/complex")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    city: "Kota Malang",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });

        it("Post Complex -- Duplicate data", function(done) {
            api
                .post("/api/v1/complex")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    city: "Karanganyar",
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