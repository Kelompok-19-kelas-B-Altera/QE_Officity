const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);
module.exports = function() {
    describe("Test Delete Review By Id", function() {
        it("Delete Review By Id", function(done) {
            api
                .delete("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .query({
                    id_building: 9,
                    id_user: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body.message).equals("Data deleted");
                    done();
                });
        });

        it("Delete Review By Id -- Data Not Found", function(done) {
            api
                .delete("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .query({
                    id_building: 42,
                    id_user: 23,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });

        it("Delete Review -- With User Token", function(done) {
            api
                .delete("/api/v1/review/7")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .query({
                    id_building: 4,
                    id_user: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};