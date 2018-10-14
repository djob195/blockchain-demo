const Block = require('../objects/block');
const Blockchain = require('../objects/blockchain');

describe("Blockchain", () =>{
    let bc, bc2, data;

    beforeEach(() =>{
        bc = new Blockchain();
        bc2 = new Blockchain();
        data = 'foo';
    });

    it('start with Genesis Block', () =>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Add new block', () =>{
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validate a valid chain', () =>{
        bc2.addBlock(data);
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a chain a corrupt genesis block', () =>{
        bc2.chain[0].data = 'Bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidate a corrupte chain', () =>{
        bc2.addBlock(data);
        bc2.chain[1].data = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace the chain with a valid chain', () =>{
        bc2.addBlock('other things');
        bc.replaceChain(bc2.chain);
        
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not the chain with one of less than or equal to length', () =>{
        bc.addBlock('hmmm, its bad');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });
});