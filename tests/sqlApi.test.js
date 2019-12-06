const chai = require("chai");
const chaiHttp = require("chai-http");
const App = require("../src/app/App");
const SqlService = require("../src/services/SqlService");
const sinon = require("sinon");

chai.use(chaiHttp);
chai.should();
let app = new App();
let sqlService = new SqlService("");

describe("SQL Api Tests", () => {
  describe("GET sql/", () => {
    it("should return Hello World!", () => {
      chai
        .request(app.express)
        .get("/sql/")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal("Hello World!");
        });
    });
  });
  describe("GET sql/ping", () => {
    it("should return pong to check alive", () => {
      chai
        .request(app.express)
        .get("/sql/ping")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal("pong");
        });
    });
  });
  describe("GET sql/query", () => {
    it("should get an json array", () => {
      sinon.stub(sqlService, "executeSql").callsFake(() => {
        return [];
      });
      chai
        .request(app.express)
        .post("/sql/query")
        .set("content-type", "application/x-www-form-urlencoded")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
        });
    });
  });
});
