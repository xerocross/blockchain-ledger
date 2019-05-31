import React,{Component} from "react";
import RecordErrorMessage from "./RecordErrorMessage";
import TamperingEditor from "./TamperingEditor";


class RecordBlock extends Component {
    constructor() {
        super();
        this.handleTamperButton = this.handleTamperButton.bind(this);

        this.state = {
            tampering : false
        }
    }
    
    setTampering () {
        this.setState({
            tampering : true
        });
    }

    handleTamperButton (e) {
        e.preventDefault(); 
        this.setTampering();
    }

    getShortHash (hash) {
        return hash.slice(0,10);
    }

    render () {
        let block = this.props.block;
        return (
            <div 
                className = "recordBlock"
            >
                { this.props.isValid === false &&
                    <RecordErrorMessage />
                }

                { (this.state.tampering) &&
                    <TamperingEditor 
                        block = {block} 
                        tamperBlock = {this.props.tamperBlock} 
                        deleteBlock = {this.props.deleteBlock}
                    />
                }
                { (!this.state.tampering) &&


                    <div>

                        <div className = "row">
                        
                            <div className = "col-sm-4">
                                {block.getText()}
                                
                            </div>
                            
                            <div className = "col-sm-2">
                                {block.getCreationDate()}
                            </div>
                            
                            <div className = "col-sm-2">
                                Hash: {this.getShortHash(block.getHash())}
                            </div>
                            
                            <div className = "col-sm-2">
                                Prev Record Hash: {this.getShortHash(block.getPreviousBlockHash())}
                            </div>
                            
                            <div className = "col-sm-2">
                                <span 
                                    onClick = {this.handleTamperButton} 
                                >
                                    tamper
                                </span>
                            </div>
                        </div>
{/* 

                        <BlockBodyDisplay 
                            block = {block} 
                            key = {block.getHash()} 
                            isValid = {this.props.isValid} 
                        />
                        <div>
                            Hash: {block.getHash()}
                            Previous Block Hash
                        </div> */}
                        <div>
                            
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default RecordBlock;