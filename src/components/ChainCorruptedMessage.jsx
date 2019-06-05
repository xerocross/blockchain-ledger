import React,{Component} from "react";
class ChainCorruptedMessage extends Component {
    render () {
        return (
            <div className="alert alert-danger" data-testid = "corrupted-chain-message">
                <p>
                    This chain has been corrupted.  Some of the data was altered, deleted, or corrupted.
                    If a record is highlighted below, then that is where the chain is broken.  What this means 
                    is that the "previous block hash" recorded with that item does not match  
                    the <em>actual</em> hash of the record that is below it now.  Either the record below it was 
                    altered or one or more records below it were deleted.
                </p>
                <p>
                    Real blockchains have other security mechanisms that protect against going all the 
                    way up the chain editing the "previous block hash" field to cover up your tampering.
                </p>
            </div>
        )
    }
}
export default ChainCorruptedMessage;