const Chance = require("chance")
const expect = require("chai").expect;
const {noCallThru} = require('proxyquire');
const features  = require("../../features/recognize.js");
const recognize  = require("../../services/recognizeServ.js");
const webAPI = require("@slack/web-api");
const slackClient=new webAPI.WebClient();
const sinon = require("sinon");
const { assert } = require("chai");
const sinonChai = require("sinon-chai");
const proxyquireStrict = noCallThru();

describe("features/recognize", () => {
  let client;
  let chance;
  let ReceiverIdsInStub = sinon.stub(recognize, "ReceiverIdsIn");
  let EmojiCountInStub = sinon.stub(recognize, "EmojiCountIn");
  let SendNotificationToGiverStub = sinon.stub(recognize, "SendNotificationToGiver");
  let SendNotificationToReceiversStub = sinon.stub(recognize, "SendNotificationToReceivers");
  let GetMessageReactedStub = sinon.stub(recognize, "GetMessageReacted");
  //let recognize

  beforeEach(

    ()=>{
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
    
      chance=Chance();
  
    });
  
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
        responseMessageObj = {
          "messages": [
          {
              "type": "message",
              "user": "U061F7AUR",
              "text": "island",
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
          }
      ],
      "has_more": true,
      "ok": true,
      "response_metadata": {
          "next_cursor": "bmV4dF90czoxNDg0Njc4MjkwNTE3MDkx"
      }};
        ReceiverIdsInStub.returns(receivers);
        EmojiCountInStub.returns(emojiCount);
        SendNotificationToReceiversStub.resolves(responseObj);
        SendNotificationToGiverStub.resolves(responseObj);
        client.reactions.add.resolves(responseObj);
        await features.Recognize(client, eventObj);
        assert.isOk(
            client.reactions.add.calledOnce
        )
        assert.isOk(
            SendNotificationToGiverStub.called
        )
        assert.isOk(
            SendNotificationToReceiversStub.called
        )
        assert.isOk(
            EmojiCountInStub.calledOnce
        )
        assert.isOk(
            ReceiverIdsInStub.calledOnce
        )
      })
    })
  })
  describe.only("Recognize", () => {
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
              "text": "island",
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
          }
      ],
      "has_more": true,
      "ok": true,
      "response_metadata": {
          "next_cursor": "bmV4dF90czoxNDg0Njc4MjkwNTE3MDkx"
      }};
        ReceiverIdsInStub.resolves(receivers);
        SendNotificationToReceiversStub.resolves(responseObj);
        SendNotificationToGiverStub.resolves(responseObj);
        GetMessageReactedStub.resolves(responseMessageObj.messages[0]);
        await features.Reaction(client, eventObj);
        assert.isOk(
            SendNotificationToGiverStub.called
        )
        assert.isOk(
            SendNotificationToReceiversStub.called
        )
        assert.isOk(
            GetMessageReactedStub.called
        )
      })
    })
  })
});
