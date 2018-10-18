const {INITIAL_BALANCE} = require('../../config/index');
const ChainUtil =  require('../../chain-util');
const Transaction = require("./transaction");

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

    createTransaction(recipient, amount, transactionPool){
        if(amount > this.balance){
            console.log(`Amount: ${amount} exceceds current balance: ${this.balance}`);
            return;
        }
        
        let transaction = transactionPool.existingTransaction(this.publicKey);

        if(transaction){
            transaction.update(this, recipient, amount);
        }else{
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }
}

module.exports = Wallet;