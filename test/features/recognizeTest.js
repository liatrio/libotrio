const Chance = require("chance")
const expect = require("chai").expect;
const features  = require("../../features/recognize.js");
const recognize  = require("../../services/recognizeServ.js");
const webAPI = require("@slack/web-api");
const slackClient=new webAPI.WebClient();
const sinon = require("sinon");
const { assert } = require("chai");
const sinonChai = require("sinon-chai");

describe("features/recognize", () => {
  let client;
  let chance;
  let ReceiverIdsInStub;
  let EmojiCountInStub;
  let SendNotificationToGiverStub;
  let SendNotificationToReceiversStub;
  let GetMessageReactedStub;
  //let recognize

  beforeEach(function() {
      client={
        reactions:{
          add: sinon.stub(),
        },
        chat:{
          postEphemeral: sinon.stub(),
          postMessage: sinon.stub()
        },
        users:{
          profile:{
            get: sinon.stub()
          }
        },
        conversations:{
          replies: sinon.stub()
        },
      };
      ReceiverIdsInStub = sinon.stub(recognize, "ReceiverIdsIn");
      EmojiCountInStub = sinon.stub(recognize, "EmojiCountIn");
      SendNotificationToGiverStub = sinon.stub(recognize, "SendNotificationToGiver");
      SendNotificationToReceiversStub = sinon.stub(recognize, "SendNotificationToReceivers");
      GetMessageReactedStub = sinon.stub(recognize, "GetMessageReacted");
      chance=Chance();
  
    });
    afterEach(function () {
        ReceiverIdsInStub.restore();
        EmojiCountInStub.restore();
        SendNotificationToGiverStub.restore();
        SendNotificationToReceiversStub.restore();
        GetMessageReactedStub.restore();
      }
    )
  
  describe.only("Recognize", () => {
    describe("When message is sent with specified emoji", ()=> {
      it("Adds the emoji to it", async ()=> {
        var emojiCount=chance.integer({min: 1, max:5});
        var receivers=[`U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`,`U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`];
        eventObj = {
                "type": "message",
                "channel": `C${chance.string({length:10, alpha:true, numeric:true, casing:"upper"})}`,
                "user": `U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`,
                "text": `Bad job <@${receivers[0]}><@${receivers[1]}> x${emojiCount}}`,
                "ts": "1355517523.000005"
        };
        reactionObj = {
            "channel": eventObj.channel,
            "name": "beerjar",
            "timestamp": eventObj.ts,
        }
        responseObj = {
            "ok": true
        }
        discontent = {
          giver: eventObj.user,
          receivers: receivers,
          count: emojiCount,
          message: eventObj.text,
          channel: eventObj.channel,
        };
        ReceiverIdsInStub.returns(receivers);
        EmojiCountInStub.returns(emojiCount);
        SendNotificationToReceiversStub.resolves(responseObj);
        SendNotificationToGiverStub.resolves(responseObj);
        client.reactions.add.resolves(responseObj);
        await features.Recognize(client, eventObj);
        /* client.reactions.add */
        assert.isOk(
          client.reactions.add.calledOnce
        )
        assert.equal(
          client.reactions.add.getCall(0).args[0].channel, eventObj.channel
        )
        assert.equal(
          client.reactions.add.getCall(0).args[0].name, "beerjar"
        )
        assert.equal(
          client.reactions.add.getCall(0).args[0].timestamp, eventObj.ts
        )
        /* SendNotificationToGiver */
        assert.isOk(
          SendNotificationToGiverStub.calledOnce
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[0], client
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].message, discontent.message
        )
        /* SendNotificationToReceivers */
        assert.isOk(
          SendNotificationToReceiversStub.calledOnce
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[0], client
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].message, discontent.message
        )
        /* EmojiCountIn */
        assert.isOk(
          EmojiCountInStub.calledOnce
        )
        assert.equal(
          EmojiCountInStub.getCall(0).args[0], eventObj.text
        )
        /* ReceiverIdsIn */
        assert.isOk(
          ReceiverIdsInStub.calledOnce
        )
        assert.equal(
          ReceiverIdsInStub.getCall(0).args[0], eventObj.text
        )
      })
    })
  })
  describe.only("Reaction", () => {
    describe("When message is sent with specified emoji", ()=> {
      it("Adds the emoji to it", async ()=> {
        var emojiCount=chance.integer({min: 1, max:5});
        var receivers=[`U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`,`U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`];
        eventObj = {
                "type": "reaction_added",
                "channel": `C${chance.string({length:10, alpha:true, numeric:true, casing:"upper"})}`,
                "user": `U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`,
                "text": `Bad job <@${receivers[0]}><@${receivers[1]}> x${emojiCount}}`,
                "item_user": `U${chance.string({length:8, alpha:true, numeric:true, casing:"upper"})}`,
                "item": {
                    "type": "message",
                    "channel": `C${chance.string({length:10, alpha:true, numeric:true, casing:"upper"})}`,
                    "ts": "1360782400.498405"
                },
                "event_ts": "1355517523.000005"
        };
        reactionObj = {
            "channel": eventObj.channel,
            "name": "beerjar",
            "timestamp": eventObj.ts,
        }
        responseObj = {
            "ok": true
        }
        responseMessageObj = {
          "messages": [
          {
              "type": "message",
              "user": "U061F7AUR",
              "text": `${chance.sentence()}`,
              "thread_ts": "1482960137.003543",
              "reply_count": 3,
              "subscribed": true,
              "last_read": "1484678597.521003",
              "unread_count": 0,
              "ts": "1482960137.003543"
          },
          {
              "type": "message",
              "user": "U061F7AUR",
              "text": "one island",
              "thread_ts": "1482960137.003543",
              "parent_user_id": "U061F7AUR",
              "ts": "1483037603.017503"
          },
          {
              "type": "message",
              "user": "U061F7AUR",
              "text": "two island",
              "thread_ts": "1482960137.003543",
              "parent_user_id": "U061F7AUR",
              "ts": "1483051909.018632"
          },
          {
              "type": "message",
              "user": "U061F7AUR",
              "text": "three for the land",
              "thread_ts": "1482960137.003543",
              "parent_user_id": "U061F7AUR",
              "ts": "1483125339.020269"
          }],
        "has_more": true,
        "ok": true,
        "response_metadata": {
            "next_cursor": "bmV4dF90czoxNDg0Njc4MjkwNTE3MDkx"
        }};
        discontent = {
          giver: eventObj.user,
          receivers: receivers,
          count: 1,
          message: responseMessageObj.messages[0].text,
          channel: eventObj.item.channel,
        };
        ReceiverIdsInStub.returns(receivers);
        SendNotificationToReceiversStub.resolves(responseObj);
        SendNotificationToGiverStub.resolves(responseObj);
        GetMessageReactedStub.resolves(responseMessageObj.messages[0]);
        await features.Reaction(client, eventObj);
        /* SendNotificationToGiver */
        assert.isOk(
            SendNotificationToGiverStub.calledOnce
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[0], client
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].message, discontent.message
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].giver, discontent.giver
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].receivers, discontent.receivers
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].channel, discontent.channel
        )
        assert.equal(
          SendNotificationToGiverStub.getCall(0).args[1].count, discontent.count
        )
        
        /* SendNotificationToReceivers */
        assert.isOk(
            SendNotificationToReceiversStub.calledOnce
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[0], client
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].message, discontent.message
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].giver, discontent.giver
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].receivers, discontent.receivers
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].channel, discontent.channel
        )
        assert.equal(
          SendNotificationToReceiversStub.getCall(0).args[1].count, discontent.count
        )
        /* GetMessageReacted */
        assert.isOk(
          GetMessageReactedStub.calledOnce
        )
        assert.equal(
          GetMessageReactedStub.getCall(0).args[0], client
        )
        assert.equal(
          GetMessageReactedStub.getCall(0).args[1], eventObj
        )
        /* ReceiverIdsIn */
        assert.isOk(
          ReceiverIdsInStub.calledOnce
        )
        assert.equal(
          ReceiverIdsInStub.getCall(0).args[0], responseMessageObj.messages[0].text
        )
      })
    })
  })
});
