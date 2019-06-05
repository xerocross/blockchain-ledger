import "./javascript-fixes";

const BlockChain = function () {
    let _blockList = [];

    this.$getRawList = function () {
        return _blockList;
    }

    this.$setRawList = function (chainList) {
        _blockList = chainList;
    }

    this.push = function (block) {
        if (_blockList.length === 0) {
            _blockList.push(block);
            block.attachPreviousBlock(null);
        } else {
            let prev = _blockList._getLast();
            block.attachPreviousBlock(prev);
            _blockList.push(block);
        }
    }
    this.get = function (i) {
        return _blockList[i];
    }
    this.validateBlock = function (block) {
        let index = _blockList.indexOf(block);
        if (index === -1) {
            throw new Error("block not found");
        } else if (index === 0) {
            return true;
        } else {
            let previous = _blockList[index - 1];
            return (previous.getHash() === block.getPreviousBlockHash());
        }

    }
    this.clone = function () {
        let newBC = new BlockChain();
        newBC.$setRawList(_blockList._clone());
        return newBC;
    }
    this.toList = function () {
        return _blockList._clone();
    }
    this.toJSON = function () {
        return _blockList;
    }
}

export default BlockChain;

