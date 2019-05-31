/* eslint-disable no-unused-vars */
import React,{Component} from "react";

class RecordErrorMessage extends Component {
    constructor() {
        super();
        this.state = {
            showErrorDetails : false
        }
        this.turnErrorMessageOn = this.turnErrorMessageOn.bind(this);
    }

    turnErrorMessageOn (e) {
        e.preventDefault();
        this.setState({
            showErrorDetails : true
        });
    }

    render() {
        return (
            <div>
                <div className = "alert alert-danger">
                    The chain has been altered or corrupted at or near the record listed below.
                    The "previous record hash" field in this record does not match the actual hash
                    of the previous record.  (<span className = "showMoreButton" onClick = {this.turnErrorMessageOn} >read more</span>)
                </div>

                { this.state.showErrorDetails &&
                    <div className = "alert alert-danger">
                        The previous record hash of a record is recorded when that record is created.  
                        Look closely at the "previous record hash" number for this record and 
                        compare it with the "hash" number for the previous record.  They are supposed 
                        to be the same.  It is possible to alter a record to change its "previous record hash"
                        field, but the hash field of a record can be re-computed at any time based on its
                        contents.  If these two fields do not match, it means that somewhere in between 
                        this record and the previous one data has been changed or lost.
                    </div>
                }
            </div>
        )
    }
}
export default RecordErrorMessage;