import React,{Component} from "react";
import "./RecordRowItem.scss";

class RecordRowItem extends Component {
    render () {
        let block = this.props.block;
        let prevBlockHash = block.getPreviousBlockHash();
        let isValid = this.props.isValid;
        return (
            
            <li className={(isValid ? `list-group-item` : `invalid list-group-item list-group-item-danger`) + " record-row-item"}>
                <div className = "row">
                    <div className="col-sm-8">
                        {block.text}
                    </div>
                    <div className="col-sm-4">
                        <div>
                            <button 
                                className = "btn btn-secondary btn-sm"
                                onClick = {() => {this.props.tamper(block)}}
                            >
                            tamper
                            </button>
                            <button 
                                className = "btn btn-secondary btn-sm"
                                onClick = {() => {this.props.delete(block)}}
                            >
                            delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-sm-4">
                        Date: {block.getCreationDate()}
                    </div>
                    <div className="col-sm-4">
                        Hash: {block && block.getHash().slice(0,10)}
                    </div>
                    <div className="col-sm-4">
                        Prev. Block Hash: <span className="prev-block-hash">{prevBlockHash && prevBlockHash.slice(0,10)}</span>
                    </div>

                </div>
            </li>
        );
    }
}
export default RecordRowItem;