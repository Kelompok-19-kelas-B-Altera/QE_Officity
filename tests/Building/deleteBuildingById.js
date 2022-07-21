const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);
module.exports = function() {
    describe("Test Delete Building By Id", function() {
        it("Delete Building By Id", function(done) {
            api
                .delete("/api/v1/building/7")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body.message).equals("Data deleted");
                    done();
                });
        });

        it("Delete Building By Id -- With User Token", function(done) {
            api
                .delete("/api/v1/building/7")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};