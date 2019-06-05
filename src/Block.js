import {hash} from "./stringHash.js";

var Block = function (text) {
    let _attached = false;
    let _hash = undefined;
    let _creationDate = (new Date()).toJSON();
    let _text = text;
    let _id = hash(`${_text} ${_creationDate}`);
    let _previousBlockHash = undefined;
    var self = this;

    this.getId = function () {
        return _id
    }

    Object.defineProperty(this, `id`, { 
        get: function () { return this._id} 
    });

    this.getText = function () {
        return _text;
    }
    Object.defineProperty(self, `text`, { 
        get: function () { return _text; } 
    });
 
    this.getHash = function () {
        return hash(_text + _creationDate + _previousBlockHash);
    }
    


    this.getCreationDate = function () {
        return _creationDate;
    }

    Object.defineProperty(self, `creationDate`, { 
        get: function () { return _creationDate} 
    });

    this.getPreviousBlockHash = function () {
        return _previousBlockHash;
    }
    Object.defineProperty(self, `previousBlockHash`, { 
        get: function () { return _previousBlockHash} 
    });



    this.attachPreviousBlock = function (prev) {
        if (_attached === true) {
            throw new Error("cannot attach to a difference chain");
        } else if (prev === null) {
            _previousBlockHash = "null";
        } else if (!(prev instanceof Block)) {
            throw new Error("invalid type");
        } else {
            _previousBlockHash = prev.getHash();
        }
    }

    this.$tamper = function (tamperObject) {
        ({ _id, _hash, _previousBlockHash, _creationDate, _text} = tamperObject);
    }

    this.toString = function () {
        return JSON.stringify({
            text: _text,
            id: _id,
            hash: _hash,
            creationDate : _creationDate,
            previousBlockHash: _previousBlockHash
        });
    }

    this.toJSON = function () {
        return {
            _text: _text,
            _id: _id,
            _hash: _hash,
            _creationDate : _creationDate,
            _previousBlockHash: _previousBlockHash
        }
    }
}
export default Block;
