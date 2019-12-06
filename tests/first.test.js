const chai = require("chai");

const expect = chai.expect;

describe("My first tests", () => {
  describe("First Test", () => {
    it("this should be true", () => {
      expect(true).to.be.true;
    });
  });
});
