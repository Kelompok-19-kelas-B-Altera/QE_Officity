const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);
module.exports = function() {
    describe("Test Delete Nearby", function() {
        it("Delete Nearby", function(done) {
            api
                .delete("/api/v1/nearby/delete")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .query({
                    id_building: 9,
                    id_facility: 15,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body.message).equals("Data deleted");
                    done();
                });
        });

        it("Delete Nearby -- Data Not Found", function(done) {
            api
                .delete("/api/v1/nearby/delete")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .query({
                    id_building: 9,
                    id_facility: 28,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });

        it("Delete Building -- With User Token", function(done) {
            api
                .delete("/api/v1/nearby/delete")
                .query({
                    id_building: 9,
                    id_facility: 15,
                })
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};