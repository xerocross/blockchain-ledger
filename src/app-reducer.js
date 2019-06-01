import Block from "./Block.js";
import BlockChain from "./BlockChain.js";
import {getStateFromStorage} from "./bottle";

export const Actions = {
    getAddBlockAction (block) {
        return {
            type : "ADD_BLOCK",
            value : block
        }
    },
    getDeleteBlockAction (block) {
        return {
            type : "DELETE_BLOCK",
            value : block
        }
    },
    getTamperBlockAction (block, newData) {
        return {
            type : "TAMPER_BLOCK",
            value : {
                block : block,
                newData : newData
            }
        }
    },
    DELETE_RECORDS :  {
        type : "DELETE_RECORDS",
    }
}

const init = {
    blockChain : new BlockChain()
}


export const AppReducer = function (state, action) {

    if (typeof state === "undefined") {
        init.blockChain = new BlockChain();
        let stateFromStorage = getStateFromStorage();
        if (stateFromStorage !== null) {
            let blockChainList = [];
            let blockChainData = stateFromStorage.blockChain;
            for (let i = 0; i < blockChainData.length; i++) {
                // order matters, so we have to use 
                // old C-style loop
                let block = new Block();
                block.$tamper(blockChainData[i]);
                blockChainList.push(block);
            }
            init.blockChain.$setRawList(blockChainList);
            return init;
        }
        return init;
    }


    let newState;
    newState = state._clone();
    newState.blockChain = state.blockChain.clone();

    let index;
    switch (action.type) {
    case "ADD_BLOCK":
        newState.blockChain.push(action.value);
        break;
    case "DELETE_BLOCK":
        index = newState.blockChain.toList().indexOf(action.value);
        newState.blockChain.$getRawList().splice(index, 1);
        break;
    case "TAMPER_BLOCK":
        action.value.block.$tamper(action.value.newData);
        break;
    case "DELETE_RECORDS":
        newState.blockChain = new BlockChain();
        break;
    default:
        break;
    }
    return newState;
}