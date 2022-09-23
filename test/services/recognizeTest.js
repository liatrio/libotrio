const Chance = require("chance");
const expect = require("chai").expect;
const recognize = require("../../services/recognizeServ");
const webAPI = require("@slack/web-api");
const slackClient = new webAPI.WebClient();
const sinon = require("sinon");
const { assert } = require("chai");
const sinonChai = require("sinon-chai");

describe("service/recognize", () => {
  let client;
  let chance;
  let obj;
  beforeEach(() => {
    client = {
      chat: {
        postEphemeral: sinon.stub(),
        postMessage: sinon.stub(),
      },
      users: {
        profile: {
          get: sinon.stub(),
        },
      },
      conversations: {
        replies: sinon.stub(),
      },
    };
    chance = Chance();
  });
  describe("recognizeServ", () => {
    it("should add the amount of beerjars given to the total since last restart", () => {
      expect(recognize.respond(5)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #5 since last restart`
      );
      expect(recognize.respond(20)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #25 since last restart`
      );
      expect(recognize.respond(1000)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #1025 since last restart`
      );
      expect(recognize.respond(1)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #1026 since last restart`
      );
    });
  });

  describe("ReceiverIdsIn", () => {
    it("should find single user in message.", async () => {
      const text = ":cheers_to_the_beer_jar: <@TestUser> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser"]);
    });

    it("should find multiple users in message.", async () => {
      const text =
        ":cheers_to_the_beer_jar: <@TestUser1> <@TestUser2> <@TestUser3> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser1", "TestUser2", "TestUser3"]);
    });

    it("should get empty when no user is mentioned in message.", async () => {
      const text = ":cheers_to_the_beer_jar: TestUser Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal([]);
    });

    it("should get empty when user is mentioned incorrectly.", async () => {
      const text = ":cheers_to_the_beer_jar: @<TestUser1> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal([]);
    });

    it("should find mentioned users even with some incorrectly mentioned in message.", async () => {
      const text =
        ":cheers_to_the_beer_jar: <@TestUser1> <@TestUser2> @<TestUser3> <@TestUser4> @TestUser5 Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser1", "TestUser2", "TestUser4"]);
    });
  });

  describe("EmojiCountIn", () => {
    it("should set emoji counter to expected value.", async () => {
      const text = ":cheers_to_the_beer_jar: x10 <@TestUser Testing Message";
      const result = recognize.EmojiCountIn(text);
      expect(result).to.deep.equal(10);
    });
    it("should get default value of 1 if no multiplier is specified", async () => {
      const text = ":cheers_to_the_beer_jar: <@TestUser> Testing Message";
      const result = recognize.EmojiCountIn(text);
      expect(result).to.deep.equal(1);
    });

    it("should grab the first multiplier recognized in the message", async () => {
      const text =
        ":cheers_to_the_beer_jar: x4x5 <@TestUser> Testing Message x10";
      const result = recognize.EmojiCountIn(text);
      expect(result).to.deep.equal(4);
    });

    it("should grab the first multiplier from any location in the message", async () => {
      const text =
        ":cheers_to_the_beer_jar: <@TestUser> Testing Message. Just for being a working unit test I will be adding more beerjars. x10";
      const result = recognize.EmojiCountIn(text);
      expect(result).to.deep.equal(10);
    });
  });
  describe("GetMessageReacted", () => {
    describe("When message is reacted to", () => {
      it("Returns the message", async () => {
        eventObj = {
          type: "reaction_added",
          user: "U024BE7LH",
          reaction: "thumbsup",
          item_user: "U0G9QF9C6",
          item: {
            type: "message",
            channel: "C0G9QF9GZ",
            ts: "1360782400.498405",
          },
          event_ts: "1360782804.083113",
        };
        responseObj = {
          messages: [
            {
              type: "message",
              user: "U061F7AUR",
              text: "island",
              thread_ts: "1482960137.003543",
              reply_count: 3,
              subscribed: true,
              last_read: "1484678597.521003",
              unread_count: 0,
              ts: "1482960137.003543",
            },
            {
              type: "message",
              user: "U061F7AUR",
              text: "one island",
              thread_ts: "1482960137.003543",
              parent_user_id: "U061F7AUR",
              ts: "1483037603.017503",
            },
            {
              type: "message",
              user: "U061F7AUR",
              text: "two island",
              thread_ts: "1482960137.003543",
              parent_user_id: "U061F7AUR",
              ts: "1483051909.018632",
            },
            {
              type: "message",
              user: "U061F7AUR",
              text: "three for the land",
              thread_ts: "1482960137.003543",
              parent_user_id: "U061F7AUR",
              ts: "1483125339.020269",
            },
          ],
          has_more: true,
          ok: true,
          response_metadata: {
            next_cursor: "bmV4dF90czoxNDg0Njc4MjkwNTE3MDkx",
          },
        };
        client.conversations.replies.resolves(responseObj);
        const message = await recognize.GetMessageReacted(client, eventObj);
        assert.isOk(client.conversations.replies.calledOnce);
        assert.equal(message.text, responseObj.messages[0].text);
        assert.equal(
          client.conversations.replies.getCall(0).args[0].channel,
          eventObj.item.channel
        );
        assert.equal(
          client.conversations.replies.getCall(0).args[0].ts,
          eventObj.item.ts
        );
        assert.equal(client.conversations.replies.getCall(0).args[0].limit, 1);
      });
    });
  });
  describe("SendNotificationToGiver", () => {
    describe("When message contains giver and recipients", () => {
      it("Sends ephemeral message as response", async () => {
        var beerJarData = {
          giver: `U${chance.string({
            length: 8,
            alpha: true,
            numeric: true,
            casing: "upper",
          })}`,
          receivers: [
            `U${chance.string({
              length: 8,
              alpha: true,
              numeric: true,
              casing: "upper",
            })}`,
            `U${chance.string({
              length: 8,
              alpha: true,
              numeric: true,
              casing: "upper",
            })}`,
          ],
          count: chance.integer({ min: 1, max: 5 }),
          message: `${chance.sentence()}`,
          channel: `C${chance.string({
            length: 10,
            alpha: true,
            numeric: true,
            casing: "upper",
          })}`,
        };
        getObj = {
          ok: true,
          profile: {
            display_name: chance.name(),
          },
        };
        chatObj = {
          ok: true,
        };
        client.users.profile.get.resolves(getObj);
        client.chat.postEphemeral.resolves(chatObj);
        await recognize.SendNotificationToGiver(client, beerJarData);

        assert.isOk(client.users.profile.get.calledThrice);
        assert.isOk(client.chat.postEphemeral.calledOnce);

        assert.equal(
          client.chat.postEphemeral.getCall(0).args[0].channel,
          beerJarData.channel
        );
        assert.equal(
          client.chat.postEphemeral.getCall(0).args[0].user,
          beerJarData.giver
        );
        assert.include(
          client.chat.postEphemeral.getCall(0).args[0].text,
          getObj.profile.display_name
        );
        assert.include(
          client.chat.postEphemeral.getCall(0).args[0].text,
          beerJarData.count
        );
        assert.equal(
          client.users.profile.get.getCall(1).args[0].user,
          beerJarData.receivers[0]
        );
        assert.equal(
          client.users.profile.get.getCall(2).args[0].user,
          beerJarData.receivers[1]
        );
        assert.equal(
          client.users.profile.get.getCall(0).args[0].user,
          beerJarData.giver
        );

        //client.chat.("postEphemeral").once()
        //client.chat.verify()
      });
    });
  });
  describe("SendNotificationToReceivers", () => {
    describe("When message contains giver and recipients", () => {
      it("Sends ephemeral message as response", async () => {
        var beerJarData = {
          giver: `U${chance.string({
            length: 8,
            alpha: true,
            numeric: true,
            casing: "upper",
          })}`,
          receivers: [
            `U${chance.string({
              length: 8,
              alpha: true,
              numeric: true,
              casing: "upper",
            })}`,
            `U${chance.string({
              length: 8,
              alpha: true,
              numeric: true,
              casing: "upper",
            })}`,
          ],
          count: chance.integer({ min: 1, max: 5 }),
          message: `${chance.sentence()}`,
          channel: `C${chance.string({
            length: 10,
            alpha: true,
            numeric: true,
            casing: "upper",
          })}`,
        };
        getObj = {
          ok: true,
          profile: {
            display_name: chance.name(),
          },
        };
        chatObj = {
          ok: true,
        };
        client.users.profile.get.resolves(getObj);
        client.chat.postMessage.resolves(chatObj);
        await recognize.SendNotificationToReceivers(client, beerJarData);

        assert.isOk(client.users.profile.get.calledThrice);
        assert.isOk(client.chat.postMessage.calledTwice);

        assert.equal(
          client.chat.postMessage.getCall(0).args[0].channel,
          beerJarData.receivers[0]
        );
        assert.equal(
          client.chat.postMessage.getCall(1).args[0].channel,
          beerJarData.receivers[1]
        );
        assert.include(
          client.chat.postMessage.getCall(0).args[0].text,
          getObj.profile.display_name
        );
        assert.include(
          client.chat.postMessage.getCall(0).args[0].text,
          beerJarData.count
        );
        assert.equal(
          client.users.profile.get.getCall(1).args[0].user,
          beerJarData.receivers[0]
        );
        assert.equal(
          client.users.profile.get.getCall(2).args[0].user,
          beerJarData.receivers[1]
        );
        assert.equal(
          client.users.profile.get.getCall(0).args[0].user,
          beerJarData.giver
        );

        //client.chat.("postEphemeral").once()
        //client.chat.verify()
      });
    });
  });
});
