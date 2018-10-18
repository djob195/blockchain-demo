const {INITIAL_BALANCE} = require('../../config/index');
const ChainUtil =  require('../../chain-util');

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keirPair = ChainUtil.genKeyPair();
        this.publicKey = this.keirPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet -
        PublicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
    }

    sign(dataHash){
        return this.keirPair.sign(dataHash);
    }
}

module.exports = Wallet;