const Block = require('../objects/block');
const Blockchain = require('../objects/blockchain');

describe("Blockchain", () =>{
    let bc;

    beforeEach(() =>{
        bc = new Blockchain();
    });

    it('start with Genesis Block', () =>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Add new block', () =>{
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
});