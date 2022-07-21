const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Search User", function() {
        it("Search User", function(done) {
            api
                .post("/api/v1/user/management/search")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    filters: [{
                        key: "username",
                        operator: "LIKE",
                        field_type: "STRING",
                        value: "Isyana",
                    }, ],
                    sorts: [],
                    page: null,
                    size: null,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/User/postSearchUser.json")
                    );
                    done();
                });
        });

        it("Search User -- Not Found", function(done) {
            api
                .post("/api/v1/user/management/search")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    filters: [{
                        key: "username",
                        operator: "LIKE",
                        field_type: "STRING",
                        value: "Michael",
                    }, ],
                    sorts: [],
                    page: null,
                    size: null,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/User/postSearchBuildingNotFound.json")
                    );
                    done();
                });
        });

        it("Search User -- With User token ", function(done) {
            api
                .post("/api/v1/review")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    filters: [{
                        key: "username",
                        operator: "LIKE",
                        field_type: "STRING",
                        value: "Isyana",
                    }, ],
                    sorts: [],
                    page: null,
                    size: null,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};