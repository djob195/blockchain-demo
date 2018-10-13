const Block = require('../objects/block');

describe('Block', () =>{
    let data, lastBlock, block;

    beforeEach(() => {
         data = 'bar';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock, data);
    });

    it('Set the `data` to match the input', () =>{
        expect(block.data).toEqual(data);
    });

    it('Set the `lastHash` to match of the last block', () =>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});