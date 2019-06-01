import React,{Component} from "react";

class BlockBodyDisplay extends Component {
    render () {
        return (
            <div className="BlockBodyDisplay">
                <div className = "card" >
                    <div className ="card-body">
                        <div>{this.props.block.getText()}</div>
                        <div>Created: {this.props.block.getCreationDate()}</div>
                
                        <div
                            data-toggle="tooltip" data-placement="bottom" title="previous block hash is stored as part of this block"
                        >Previous Block Hash: {this.props.block.getPreviousBlockHash()}</div>
                    </div>
                </div>
                <div className = "alert alert-info"
                    data-toggle="tooltip" data-placement="left" title="hash is live-computed from the values of the block, including the stored previous block hash"
                >
                    <span>Hash: {this.props.block.getHash()}</span>
                </div>
            </div>
        );
    }
}
export default BlockBodyDisplay;