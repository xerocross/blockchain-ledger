
import React,{Component} from "react";
import "./BlockChainDisplay.css";
import ChainCorruptedMessage from "./ChainCorruptedMessage";
import RecordChainTable from "./RecordChainTable";

class RecordChainDisplay extends Component {

    constructor() {
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
                        <RecordChainTable 
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

export default RecordChainDisplay;