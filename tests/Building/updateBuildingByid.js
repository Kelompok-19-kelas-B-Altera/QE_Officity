const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Update Building", function() {
        it("Update Building set all req body", function(done) {
            api
                .patch("/api/v1/building/5")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Quality Assurance",
                    building_name: " Assurance",
                    description: "Coba sih",
                    id_complex: 2,
                    room_space: 3,
                    total_room: 4,
                    total_view: 0,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Building/updateBuildingById.json")
                    );
                    done();
                });
        });

        it("Update Building -- With User Token", function(done) {
            api
                .patch("/api/v1/building/4")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .query({
                    address: "Quality Assurance",
                    building_name: "Quality Assurance",
                    description: "Coba sih",
                    id_complex: 2,
                    room_space: 3,
                    total_room: 4,
                    total_view: 0,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};