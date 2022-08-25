import Web3 from "web3";

const rpcURL = "https://evm.astar.network";
const web3 = new Web3(rpcURL);

const abi: any = [];
const address = "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720";
const contract = new web3.eth.Contract(abi, address);
contract.methods.totalSupply().call((err: any, result: any) => {
  console.log(web3.utils.fromWei(result, "ether"));
});
