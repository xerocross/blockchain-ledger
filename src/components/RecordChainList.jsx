import React,{Component} from "react";
import RecordRowItem from "./RecordRowItem";
import PropTypes from "prop-types";

class RecordChainList extends Component {
    render () {
        let chain = this.props.blockChain;
        return (
            <ul 
                className = "list-group" 
                data-testid = "recordchain-list-ul"
            >
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
RecordChainList.propTypes = {
    blockChain : PropTypes.object,
    tamper : PropTypes.func,
    delete : PropTypes.func
};
export default RecordChainList;