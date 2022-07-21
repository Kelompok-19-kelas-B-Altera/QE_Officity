const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Review", function() {
        it("Post Review", function(done) {
            api
                .post("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    id_building: 9,
                    id_user: 15,
                    rating: 4,
                    review: "nyoba dong xixiix",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Review/postAddReview.json")
                    );
                    done();
                });
        });

        it("Post Review -- Review Again", function(done) {
            api
                .post("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    id_building: 9,
                    id_user: 15,
                    rating: 4,
                    review: "nyoba dong xixiix",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Duplicate data");
                    done();
                });
        });

        it("Post Review -- With User token ", function(done) {
            api
                .post("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    id_building: 9,
                    id_user: 13,
                    rating: 1,
                    review: "nyoba dong xixiix",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};