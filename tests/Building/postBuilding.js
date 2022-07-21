const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Post Building", function() {
        it("Post Building", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Pahlawan No.25.",
                    building_name: "WarungSpace",
                    description: "SpaceRoom merupakan salah satu tempat cozy di Jakarta yang",
                    id_complex: 1,
                    room_space: 10,
                    total_room: 21,
                    total_view: 9,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Building/postBuilding.json")
                    );
                    done();
                });
        });

        it("Post Building -- Without Set Address", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    building_name: "Sport hall Center",
                    description: "Sport hall merupakan salah satu gedung olahraga di Jakarta",
                    id_complex: 1,
                    room_space: 12,
                    total_room: 3,
                    total_view: 8,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- Without Set Building Name", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Jenderal Patimura No.25.",
                    description: "Sport hall merupakan salah satu gedung olahraga di Jakarta",
                    id_complex: 1,
                    room_space: 12,
                    total_room: 3,
                    total_view: 8,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- Without Set Descripption ", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Semangka No.25.",
                    building_name: "Playground hall Center",
                    id_complex: 1,
                    room_space: 12,
                    total_room: 3,
                    total_view: 8,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- Without Id Complex ", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Jenderal Sudirman Kav.25.",
                    building_name: "Millennium Centennial Center",
                    description: "",
                    room_space: 10,
                    total_room: 21,
                    total_view: 9,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- Without Room Space ", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Salak No.25.",
                    building_name: "Jens Meet Room",
                    description: "Jens Meet",
                    id_complex: 1,
                    total_room: 21,
                    total_view: 9,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- Without Total Room ", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenAdmin })
                .send({
                    address: "Jl. Jambu No. 112.",
                    building_name: "SCBD Center",
                    description: "",
                    id_complex: 1,
                    room_space: 10,
                    total_view: 9,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Bad request body");
                    done();
                });
        });

        it("Post Building -- With User token ", function(done) {
            api
                .post("/api/v1/building")
                .set({ Authorization: "Bearer " + process.env.tokenUser })
                .send({
                    address: "Jl. Jenderal Sudirman Kav.25.",
                    building_name: "Millennium Centennial Center",
                    description: "Millennium Centennial Center merupakan salah satu gedung tertinggi di Jakarta yang beralamat di Jl. Jenderal Sudirman Kav.25. Gedung setinggi 254 meter dengan 52 lantai ini masih terbilang cukup baru, sebab pembangunannya rampung pada 2019. Masih terletak di kawasan Segitiga Emas Jakarta, gedung ini berfungsi sebagai gedung perkantoran.",
                    id_complex: 1,
                    room_space: 10,
                    total_room: 21,
                    total_view: 9,
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(403);
                    done();
                });
        });
    });
};