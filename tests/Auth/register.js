const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.URL);

module.exports = function() {
    describe("Test Register", function() {
        it("Success", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    email: "admi12222@gmail.com",
                    password: "Admin123",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);

                    // validasi JSON Schema
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Auth/register.json")
                    );

                    // store data to global variable
                    global.access_token = res.body.data.access_token;
                    //console.log(access_token);

                    done();
                });
        });

        it("Register -- Invalid Format Fullname ", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    fullname: 1233,
                    email: "senooo122@gmail.com",
                    password: "Haloo1233",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Invalid Format Email ", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno@am",
                    password: "Haloo1233",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Invalid Format Password", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    email: "se1122n99o@gmail.com",
                    password: "Haloo1233&%*$(#$@#$",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Without set Email", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    fullname: "seno",
                    password: "Haloo1233",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Without set Fullname ", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    email: "seno2211@gmail.com",
                    password: "Haloo1233",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Without set Password ", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    fullname: "Wahhh",
                    email: "seno221xzcxz431@gmail.com",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).eql("Wrong register data format");
                    done();
                });
        });

        it("Register -- Duplicate Fullname", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    fullname: "hayolo",
                    email: "hayolooosiapa1@gmail.com",
                    password: "Ha1om12345",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(
                        require("../../resource/schema/Auth/register.json")
                    );
                    done();
                });
        });

        it("Register -- Duplicate Email", function(done) {
            api
                .post("/api/v1/auth/register")
                .set("Content-Type", "application/json")
                .send({
                    fullname: "hayolo",
                    email: "hai111@gmail.com",
                    password: "ha112345",
                })
                .end(function(err, res) {
                    // validasi reponse code
                    expect(res.status).to.equals(400);
                    expect(res.body.message).equals("Email already used");
                    done();
                });
        });
    });
};