import BlockChain from "./BlockChain.js";
import Block from "./Block.js";

let chain;

let buildChain = () => {
    let blockChain = new BlockChain();
    let a = new Block("a");
    let b = new Block("b");
    let c = new Block("c");
    blockChain.push(a);
    blockChain.push(b);
    blockChain.push(c);
    chain = blockChain;
}

beforeEach(()=>{
    buildChain();
});

test("list length is 3", () => {
    expect(chain.toList()).toHaveLength(3);
});

test("second element's prevHash equals first element hash", () => {
    let secondEl = chain.toList()[1];
    let firstEl = chain.toList()[0];
    expect(secondEl.getPreviousBlockHash()).toBe(firstEl.getHash());
});

test("third element's prevHash equals second element hash", () => {
    let secondEl = chain.toList()[1];
    let thirdEl = chain.toList()[2];
    expect(thirdEl.getPreviousBlockHash()).toBe(secondEl.getHash());
});