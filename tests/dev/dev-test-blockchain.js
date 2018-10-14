const Blockchain = require('../../objects/blockchain');

console.log("Start Blockchain: ");
const blockchain = new Blockchain();

for(let i= 0; i < 10; i++)
{
    console.log(blockchain.addBlock(`foo ${i}`).toString());
}

