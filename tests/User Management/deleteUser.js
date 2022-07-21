const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);
module.exports = function() {
    describe("Test User By Id", function() {
        it("Delete User By Id", function(done) {
            api
                .delete("/api/v1/user/management/13")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body.message).equals("Success");
                    done();
                });
        });

        it("Delete User By Id -- Data Not Found", function(done) {
            api
                .delete("/api/v1/user/management/111")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Data not found");
                    done();
                });
        });

        it("Delete User -- With User Token", function(done) {
            api
                .delete("/api/v1/user/management/13")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};