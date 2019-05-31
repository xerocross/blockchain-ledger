/* eslint-disable no-unused-vars */
import React,{Component} from "react";
import RecordRowItem from "./RecordRowItem";

class RecordChainTable extends Component {
    render () {
        let chain = this.props.blockChain;
        return (
            // <table className = "table">
            //     <thead>
            //         <tr>
            //             <th>Data</th>
            //             <th>Date</th>
            //             <th>Hash</th>
            //             <th>Prev. Rec. Hash</th>
            //             <th>Tamper</th>
            //         </tr>
            //     </thead>
            // <tbody>
            <ul className = "list-group">
            {
                chain.toList()._reverse().map( (block, index) => {
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