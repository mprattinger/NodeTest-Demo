import chai from "chai";
import chaiHttp from "chai-http";
import { App } from "../src/app/App";
import { SqlService } from "../src/app/services/SqlService";
import sinon from "sinon";
import { logger } from "../src/logger";
import httpStatus from "http-status";

chai.use(chaiHttp);
const should = chai.should();
let app = new App();

logger.transports.forEach(t => {
  t.silent = true;
});

describe("SQL Api Tests", () => {
  before(() => {
    sinon.stub(SqlService.prototype, "executeSql").callsFake(sql => {
      return new Promise(res => {
        res([]);
      });
    });
  });
  describe("POST sql/query", () => {
    it("should get an json array", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/query")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.OK);
          res.body.should.be.an("array");
        });
    });
    it("query should return 400 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/query")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("query should return 400 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/query")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("query should return 400 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/query")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
  });
  describe("POST sql/insert", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/insert")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.OK);
        });
    });
    it("insert should return 400 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/insert")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("insert should return 400 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/insert")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("insert should return 400 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/insert")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
  });
  describe("POST sql/update", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/update")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.OK);
        });
    });
    it("update should return 400 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/update")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("update should return 400 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/update")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("update should return 400 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/update")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
  });
  describe("POST sql/delete", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/delete")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.OK);
        });
    });
    it("delete should return 400 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/delete")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("delete should return 400 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/delete")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
    it("delete should return 400 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/api/v1/sql/delete")
        .set("content-type", "text/plain")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(httpStatus.BAD_REQUEST);
        });
    });
  });
});
