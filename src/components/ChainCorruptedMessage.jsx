import React,{Component} from "react";
class ChainCorruptedMessage extends Component {
    render () {
        return (
            <div className="alert alert-danger">
                This chain has been corrupted.  Some of the data was altered, deleted, or corrupted.
                We should be able to identify a specific record in the chain that 
                appears corrupted.  Look for an alert below.
            </div>
        )
    }

}
export default ChainCorruptedMessage;