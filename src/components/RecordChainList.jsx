import React,{Component} from "react";
import RecordRowItem from "./RecordRowItem";

class RecordChainTable extends Component {
    render () {
        let chain = this.props.blockChain;
        return (
            <ul className = "list-group">
                {
                    chain.toList()._reverse().map( (block) => {
                        return (
                            <RecordRowItem 
                                block = {block} 
                                key = {block.getHash()}
                                isValid = {chain.validateBlock(block)}
                                tamper = {this.props.tamper}
                                delete = {this.props.delete}
                            />
                        )
                    })
                }
            </ul>

        );
    }
}
export default RecordChainTable;