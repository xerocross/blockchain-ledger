// eslint-disable-next-line no-unused-vars
import React,{Component} from "react";
import TextContent from "../text-content.js";

class TamperingEditor extends Component {
    constructor () {
        super();

        this.state = {
            text : "",
            creationDate : "",
            previousBlockHash : ""
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
        this.handleHashInput = this.handleHashInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
    }
    componentDidMount () {
        let block = this.props.block;
        this.setState({
            text : block.text,
            creationDate : block.creationDate,
            previousBlockHash : block.previousBlockHash
        });
    }

    updateText (newText) {
        this.setState({text : newText});

    }
    updateDate (newText) {
        this.setState({creationDate : newText});
    }
    updateHash (newText) {
        this.setState({previousBlockHash : newText});
    }

    handleTextInput (event) {
        this.updateText(event.target.value);
    }
    handleDateInput (event) {
        this.updateDate(event.target.value);
    }
    handleHashInput (event) {
        this.updateHash(event.target.value);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.recordTampering(this.props.block, {
            _text : this.state.text,
            _previousBlockHash : this.state.previousBlockHash,
            _creationDate : this.state.creationDate
        })
    }

    render () {
        return (
            <div className="TamperingEditor">
                <h3>Record Tampering</h3>
                <p className = "alert alert-info">change anything you want</p>
                <div>
                    <form
                        onSubmit = {this.handleSubmit}
                    >
                        <div className = "row">
                            <div className="col-sm-3">
                                <label htmlFor = "newBlockTextInput">Content</label>
                            </div>
                            <div className = "col-sm-9">
                                <input
                                    name = "newBlockTextInput"
                                    type = "text"
                                    className = "form-control newBlockTextInput"
                                    value={this.state.text}
                                    onChange={this.handleTextInput}
                                />
                            </div>
                        </div>

                        <div className = "row">
                            <div className="col-sm-3">
                                <label>Creation Date</label>
                            </div>
                            <div className = "col-sm-9">
                                <input
                                    name = "newBlockDateInput"
                                    type = "text"
                                    className = "form-control newBlockDateInput"
                                    value={this.state.creationDate}
                                    onChange={this.handleDateInput}
                                />
                            </div>
                        </div>

                        <div className = "row">
                            <div className="col-sm-3">
                                <label>Previous Record Hash</label>
                            </div>
                            <div className = "col-sm-9">
                                <input
                                    name = "newBlockHashInput"
                                    type = "text"
                                    className = "form-control newBlockDateInput"
                                    value={this.state.previousBlockHash}
                                    onChange={this.handleHashInput}
                                />
                            </div>
                        </div>
    
                        <input 
                            type = "submit" 
                            className = "btn btn-primary"
                            value = "save tampered data"
                        />
                        <div >
                            <p className = "alert alert-info">Why can't I change the hash of this record?</p>
                            <div dangerouslySetInnerHTML = {{__html: TextContent["WHY_CANT_CHANGE_HASH"]}}></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default TamperingEditor;