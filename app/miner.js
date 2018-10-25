const Transaction = require('../objects/wallet/transaction');
const Wallet = require('../objects/wallet/index');
class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
      }    

    mine(){
        const validTransactions = this.transactionPool.validTransactions();
        // include a reward for the miner
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        
        // create a block consisting of the valid transaction and synchronize the chains in the peer-to-peer server
        const block = this.blockchain.addBlock(validTransactions);
        this.p2pServer.syncChains();


        //clear the transaction pool
        this.transactionPool.clear();

        // broadcast to every miner to clear their transaction pools
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

module.exports = Miner;