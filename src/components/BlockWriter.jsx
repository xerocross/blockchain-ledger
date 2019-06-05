import React,{Component} from "react";
import {Actions} from "../app-reducer.js";
import Block from "../Block";
import "./BlockWriter.css";

class BlockEditor extends Component {
    constructor () {
        super();
        this.state = {
            text : "",
            currentBlock : undefined,
            previousBlock : undefined
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.setCurrentBlock = this.setCurrentBlock.bind(this);
        this.postBlock = this.postBlock.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = this.props.store.subscribe(() => {
            let storeState = this.props.store.getState();
            this.setState({
                previousBlock : storeState.blockChain.toList()._getLast(),
            });
        });
        this.setState({
            previousBlock : this.props.previousBlock,
        });
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    updateText (newText) {
        this.setState({
            text : newText
        })
    }


    handleTextInput (event) {
        this.updateText(event.target.value);
    }

    setCurrentBlock (block) {
    
        if (this.state.previousBlock) {
            block.attachPreviousBlock(this.state.previousBlock);
        }
        this.setState({
            currentBlock : block
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        this.postBlock (this.state.text)
        this.setState({
            text : "",
            currentBlock : undefined,
            previousBlock : undefined
        });
    }

    postBlock (text) {
        let block = new Block(text);
        this.setCurrentBlock (block);
        this.props.store.dispatch(Actions.getAddBlockAction(block));
    }

    render () {
        return (
            <div className="BlockWriter" data-testid = "BlockWriter">
                <div>
                    <form
                        onSubmit = {this.handleSubmit}
                    >
                        <input
                            name = "newBlockTextInput"
                            className = "form-control newBlockTextInput"
                            data-testid = "newBlockTextInput"
                            value={this.state.text}
                            onChange={this.handleTextInput}
                        />
                        <input 
                            type = "submit" 
                            data-testid = "submit-button"
                            className = "btn btn-primary"
                            value = "attach new record"
                        />
                    </form>
                </div>
            </div>
        );
    }
}
export default BlockEditor;