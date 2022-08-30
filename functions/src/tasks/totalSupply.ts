import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Web3 from "web3";
import fetch from "cross-fetch";
import BN from "bn.js";
import * as tokens from "../tokens.json";

const rpcURL = "https://evm.astar.network";


type Token = { [x: string]: { [x: string]: any; }; }

export const sendAlert = async (network: string, supply: BN) => {
  const slackHook = functions.config().slack.webhook;
  const message = `
    Token: ${network},
    Total Supply: ${Number(supply).toFixed(2)}
    Supply increased significantly.
  `;

  await fetch(slackHook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: message,
    }),
  });
};

export const checkSupply = async (token: Token) => {
  const network = Object.keys(token)[0];
  const address = token[network]["address"];
  const abi = token[network]["abi"];
  const web3 = new Web3(rpcURL);
  const contract = new web3.eth.Contract(abi, address);


  contract.methods.totalSupply().call(async (err: any, result: any) => {
    const supply = web3.utils.fromWei(result, "ether") as unknown as BN;
    if (!supply) {
      return;
    }
    const storedValue = await admin
        .firestore()
        .collection("totalSupply")
        .doc(network)
        .get() as unknown as BN;
    if (!storedValue) {
      await admin
          .firestore()
          .collection("totalSupply")
          .doc(network)
          .set({supply}).then(console.log).catch(console.error);
      return;
    }
    if (supply > storedValue.add(storedValue.div(new BN(3)))) {
      await sendAlert(network, supply);
    }
  });
};

exports.runner = functions
    .pubsub
    .schedule("every 5 minutes")
    .onRun(() => {
      tokens.forEach((token: any) => {
        checkSupply(token);
      });
    });
