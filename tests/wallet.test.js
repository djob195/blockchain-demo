const Wallet = require('../objects/wallet/index');
const TransactionPool = require('../objects/wallet/transaction-pool');
const Blockchain = require('../objects/blockchain');

describe('wallet', () =>{
    let wallet, tp,bc;

    beforeEach(() =>{
        wallet = new Wallet();
        tp = new TransactionPool();
        bc = new Blockchain();
    });

    describe('Creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(()=>{
            sendAmount = 50;
            recipient = 'r4nd0m-r3c1p13nt';
            transaction = wallet.createTransaction(recipient, sendAmount,bc,tp);
        });

        describe("and doing the same transaction",()=>{
            beforeEach(()=>{
                wallet.createTransaction(recipient, sendAmount,bc, tp);
            })

            it('double the `sendAmount` subtracted from the wallet balanced',()=>{
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount * 2);
            });

            it('clone the `sendAmount` output for the recipient',()=>{
                expect(transaction.outputs.filter(output => output.address === recipient)
                    .map(output => output.amount))
                    .toEqual([sendAmount, sendAmount]);
            });
        });
    });
});