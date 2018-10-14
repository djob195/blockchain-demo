const Block = require('../objects/block');
const {DIFFICULTY} = require('../config/index');

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

    it('Generate a hash  that matches the difficulty', () =>{
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        console.log(block.toString());
    });

    it('lower the difficulty for slowly mined blocks', () =>{
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
    });

    it('raise the difficulty for quickly mined blocks', () =>{
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    });
});