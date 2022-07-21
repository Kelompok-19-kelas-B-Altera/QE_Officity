const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);
module.exports = function() {
    describe("Test Delete Facility By Id", function() {
        it("Delete Facility By Id", function(done) {
            api
                .delete("/api/v1/facility/9")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body.message).equals("Data deleted");
                    done();
                });
        });

        it("Delete Facility By Id -- Data Not Found", function(done) {
            api
                .delete("/api/v1/facility/99")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });

        it("Delete Facility By Id -- With User Token", function(done) {
            api
                .delete("/api/v1/facility/9")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};