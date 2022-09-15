const expect = require("chai").expect;
const recognize = require("../../services/recognizeServ").respond;

describe("service/recognize", () => {
 describe("recognizeServ", () => {
  it("should add the amount of beerjars given to the total since last restart", () => {
	expect(recognize(5)).to.equal(`You've gotten :cheers_to_the_beer_jar: #5 since last restart`);
	expect(recognize(20)).to.equal(`You've gotten :cheers_to_the_beer_jar: #25 since last restart`);
	expect(recognize(1000)).to.equal(`You've gotten :cheers_to_the_beer_jar: #1025 since last restart`);
  	expect(recognize(1)).to.equal(`You've gotten :cheers_to_the_beer_jar: #1026 since last restart`)
  });
 });	
});
