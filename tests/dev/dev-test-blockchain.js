const Blockchain = require('../../objects/blockchain');

console.log("Start Blockchain: ");
let blockchain = new Blockchain();
console.log(`Blockchain Length ${blockchain.chain.length}`);
let newBlock = blockchain.addBlock('data');
console.log("New block:");
console.log(newBlock.toString());
console.log(`Blockchain Length ${blockchain.chain.length}`);

