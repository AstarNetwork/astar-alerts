import * as functions from "firebase-functions";
import Web3 from "web3";
import fetch from "cross-fetch";

const rpcURL = "https://evm.astar.network";
const slackHook = functions.config().slack.webhook;

const abi: any = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "guy",
        "type": "address",
      },
      {
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool",
      },
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "src",
        "type": "address",
      },
      {
        "name": "dst",
        "type": "address",
      },
      {
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool",
      },
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address",
      },
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "dst",
        "type": "address",
      },
      {
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool",
      },
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address",
      },
      {
        "name": "",
        "type": "address",
      },
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address",
      },
      {
        "indexed": true,
        "name": "guy",
        "type": "address",
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "Approval",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address",
      },
      {
        "indexed": true,
        "name": "dst",
        "type": "address",
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "Transfer",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "dst",
        "type": "address",
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "Deposit",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address",
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256",
      },
    ],
    "name": "Withdrawal",
    "type": "event",
  },
];


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  const web3 = new Web3(rpcURL);

  const address = "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720";
  const contract = new web3.eth.Contract(abi, address);
  contract.methods.totalSupply().call((err: any, result: any) => {
    const supply = web3.utils.fromWei(result, "ether");
    fetch(slackHook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `Token: WASTAR, Total Supply: ${Number(supply).toFixed(2)}`,
      }),
    });
  });


  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Ok!");
});
