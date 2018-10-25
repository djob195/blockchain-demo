const TransactionPool = require('../objects/wallet/transaction-pool');
const Transaction = require('../objects/wallet/transaction');
const Wallet = require('../objects/wallet/index');
const {MINING_REWARD} = require('../config/index');
const Blockchain = require('../objects/blockchain');

describe('TransactionPool',() =>{
    let tp, wallet, transaction,bc;

    beforeEach(() =>{
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4ddr355',30,bc, tp);
        bc = new Blockchain();
    });

    it('add a transaction to the pool', () =>{
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it("updates a transaction in the pool", () =>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
            .not.toEqual(oldTransaction);
    });

    it(`clear transactions`, () =>{
        tp.clear();
        expect(tp.transactions).toEqual([]);
    })
    describe(`Mixing valid and corrupt transactions`, () =>{
        let validTransaction;

        beforeEach(()=>{
            validTransaction = [...tp.transactions];
            for(let i=0; i<6; i++){
                wallet = new Wallet();
                transaction = wallet.createTransaction('foo-4ddr355',30,bc,tp);
                if(i%2==0){
                    transaction.input.amount = 99999;
                } else {
                    validTransaction.push(transaction);
                }
            }
        });

        it('show a difference between valid and corrupt transactions',()=>{
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransaction));
        });

        it(`grab valid transactions`,()=>{
            expect(tp.validTransactions()).toEqual(validTransaction);
        });
    });

    describe(`creating a reward transaction`, ()=>{
        beforeEach(() =>{
            transaction = Transaction.rewardTransaction(wallet,Wallet.blockchainWallet());
        });
        
        it(`reward the miners wallet`, ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(MINING_REWARD);
        });
    });
})