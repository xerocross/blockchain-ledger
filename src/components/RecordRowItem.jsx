import PropTypes from 'prop-types';
import React,{Component} from "react";
import "./RecordRowItem.scss";

class RecordRowItem extends Component {
    render () {
        let block = this.props.block;
        let prevBlockHash = block.getPreviousBlockHash();
        let isValid = this.props.isValid;
        return (
            <li 
                data-testid = "record-list-item"
                data-valid = {isValid ? "true" : "false"}
                className={(isValid ? `list-group-item` : `invalid list-group-item list-group-item-danger`) + " record-row-item"}
            >
                <div className = "row">
                    <div className="col-sm-8" data-testid = "block-text">
                        {block.getText()}
                    </div>
                    <div className="col-sm-4">
                        <div>
                            <button 
                                data-testid = "tamper-button"
                                className = "btn btn-secondary btn-sm"
                                onClick = {() => {this.props.tamper(block)}}
                            >
                            tamper
                            </button>
                            <button 
                                className = "btn btn-secondary btn-sm"
                                data-testid = "delete-button"
                                onClick = {() => {this.props.delete(block)}}
                            >
                            delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-sm-4" >
                        Date: <span data-testid = "creation-date">{block.getCreationDate()}</span>
                    </div>
                    <div className="col-sm-4" >
                        Hash: <span data-testid = "block-hash">{block && block.getHash().slice(0,10)}</span>
                    </div>
                    <div className="col-sm-4" >
                        Prev. Block Hash: <span className="prev-block-hash" data-testid = "previous-hash">{prevBlockHash && prevBlockHash.slice(0,10)}</span>
                    </div>

                </div>
            </li>
        );
    }
}
RecordRowItem.propTypes = {
    block : PropTypes.object,
    isValid : PropTypes.bool,
    tamper : PropTypes.func,
    delete : PropTypes.func
};
export default RecordRowItem;