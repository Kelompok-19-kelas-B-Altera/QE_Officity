const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Login", function() {
        it("Login", function(done) {
            api
                .post("/api/v1/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "admin@officity.com",
                    password: "admin123",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Auth/login.json")
                    );

                    // store data to global variable
                    global.access_token = res.body.data.access_token;
                    //console.log(access_token);

                    done();
                });
        });

        it("Login -- Wrong Password", function(done) {
            api
                .post("/api/v1/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno@gmail.com",
                    password: "Haloo1233",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equal("Bad credentials")
                    done();
                });
        });

        it("Login -- Wrong Email", function(done) {
            api
                .post("/api/v1/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno@gmail.com",
                    password: "Seno123",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equal("Bad credentials")
                    done();
                });
        });

        it("Login -- Invalid Email Format", function(done) {
            api
                .post("/api/v1/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno@2121",
                    password: "seno123",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);

                    done();
                });
        });

        it("Login -- Unregister email", function(done) {
            api
                .post("/api/v1/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno11111111@gmail.com",
                    password: "seno123",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);

                    done();
                });
        });
    });
};