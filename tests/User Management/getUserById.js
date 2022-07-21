const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Get User By User Id", function() {
        it("Get User By User Id", function(done) {
            api
                .get("/api/v1/user/management/4")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/User/getUserById.json")
                    );
                    done();
                });
        });

        it("Get User By User Id -- Data Not Found", function(done) {
            api
                .get("/api/v1/user/management/49")
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