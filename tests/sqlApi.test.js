import chai from "chai";
import chaiHttp from "chai-http";
import { App } from "../src/app/App";
import { SqlService } from "../src/services/SqlService";
import sinon from "sinon";
import { logger } from "../src/logger";

chai.use(chaiHttp);
chai.should();
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
      chai
        .request(app.express)
        .post("/sql/query")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
        });
    });
    it("query should return 501 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/sql/query")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("query should return 501 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/sql/query")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("query should return 501 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/sql/query")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
  });
  describe("GET sql/insert", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/sql/insert")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
    it("insert should return 501 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/sql/insert")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("insert should return 501 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/sql/insert")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("insert should return 501 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/sql/insert")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
  });
  describe("GET sql/update", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/sql/update")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
    it("update should return 501 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/sql/update")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("update should return 501 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/sql/update")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("update should return 501 if i try to make sql delete", () => {
      chai
        .request(app.express)
        .post("/sql/update")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
  });
  describe("GET sql/delete", () => {
    it("should get an 200", () => {
      chai
        .request(app.express)
        .post("/sql/delete")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("DELETE FROM BEC001R426.UHIN WHERE HINID = 21078")
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
    it("delete should return 501 if i try to make sql query", () => {
      chai
        .request(app.express)
        .post("/sql/delete")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send("select * from bec001r426")
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("delete should return 501 if i try to make sql insert", () => {
      chai
        .request(app.express)
        .post("/sql/delete")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "insert into bec001r426.dtr3pf (trsart, trtext, trbtrm, trdone) values ('{TRSART}', '{TRTEXT}', {TRBTRM}, '{TRDONE}')"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
    it("delete should return 501 if i try to make sql update", () => {
      chai
        .request(app.express)
        .post("/sql/delete")
        .set("content-type", "application/text")
        .set("encoding", "utf8")
        .send(
          "update bec001r426.ukop set kopaun7 = 12345678, kopaura = 0, kopaure = 0, koppos = 3 where kopid = 12345"
        )
        .end((err, res) => {
          res.should.have.status(501);
        });
    });
  });
});
