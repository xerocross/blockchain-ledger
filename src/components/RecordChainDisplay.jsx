import React,{Component} from "react";
import "./RecordChainDisplay.css";
import ChainCorruptedMessage from "./ChainCorruptedMessage";
import RecordChainList from "./RecordChainList";
import PropTypes from "prop-types";

class RecordChainDisplay extends Component {
    constructor () {
        super();
        this.state = {
            tampering : undefined,
        }
    }
    getIsListValid () {
        let chain = this.props.blockChain;
        let list = chain.toList();
        for (let i = 0; i < list.length; i++) {
            if (chain.validateBlock(list[i]) === false) return false;
        }
        return true;
    }
    render () {
        let chain = this.props.blockChain;
        return (
            <div className = "BlockChainDisplay">
                <div className = "delete-button-row">
                    <button
                        className = "btn btn-danger"
                        data-testid = "delete-all-button"
                        onClick = {this.props.deleteAll}
                    >
                        delete all records
                    </button>
                </div>
                {chain &&
                    <div>
                        <h2>Record Chain</h2>
                        { !this.getIsListValid() &&
                            <ChainCorruptedMessage />
                        }
                        <RecordChainList 
                            blockChain = {chain}
                            tamper = {this.props.tamper}
                            delete = {this.props.delete}
                        />
                    </div>
                }
            </div>
        )

    }
}
RecordChainDisplay.propTypes = {
    blockChain : PropTypes.object,
    tamper : PropTypes.func,
    delete : PropTypes.func,
};
export default RecordChainDisplay;