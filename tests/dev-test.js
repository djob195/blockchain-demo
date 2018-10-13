const Block = require('../objects/block');

/**
 * Test My First Block
 */
const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log("Test to my first Block");
console.log(block.toString());

/** 
 * Test Genesis Block
 */
console.log("Test to genesis function");
console.log(Block.genesis().toString());

/** 
 * Test Mine Block 
 */
const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log("Test mine Block");
console.log(fooBlock.toString());