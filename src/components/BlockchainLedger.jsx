import debounce from "lodash.debounce";
import React,{Component} from "react";
import {createStore} from 'redux';
import {Actions,AppReducer} from "../app-reducer";
import {persistStateToStorage} from "../bottle";
import BlockWriter from "./BlockWriter";
import RecordChainDisplay from "./RecordChainDisplay";
import TamperingEditor from "./TamperingEditor";

class BlockchainLedger extends Component {
    
    constructor () {
        super();
        this.state = {
          blockChain : undefined,
          tampering : null
        };
        this.store = createStore(AppReducer);
        this.updateFromStore = this.updateFromStore.bind(this);
        this.delete = this.delete.bind(this);
        this.tamper = this.tamper.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.recordTampering = this.recordTampering.bind(this);
        const debounceDelay = 200;
        this.updateStorage = debounce((state) => {
            persistStateToStorage(state);
        }, debounceDelay);
    }

    updateFromStore () {
      let storeState = this.store.getState();
      this.setState({
        blockChain : storeState.blockChain
      });
    }

    delete (block) {
      if (window.confirm("Really delete this record?")) {
        this.store.dispatch(Actions.getDeleteBlockAction(block));
      }
    }

    tamper (block, data) {
      this.setState({tampering : block});
    }


    recordTampering(block, data) {
      this.setState({tampering : null});
      this.store.dispatch(Actions.getTamperBlockAction(block, data));
    }

    deleteAll () {
      if (window.confirm("Really delete all records?")) {
        this.store.dispatch(Actions.DELETE_RECORDS);
      }
    }

    componentDidMount () {
      
      this.updateFromStore();
        this.store.subscribe(() => {
          let storeState = this.store.getState();
          this.updateFromStore();
          this.updateStorage(storeState);
        });
      }
      render() {
        return (
            <div className="App container">
              {this.state.tampering === null &&
                <div>
                  <BlockWriter
                    store = {this.store}
                  />
                  <RecordChainDisplay 
                    blockChain  = {this.state.blockChain} 
                    delete = {this.delete}
                    tamper = {this.tamper}
                    deleteAll = {this.deleteAll}
                  
                  />
                </div>
              }
              {this.state.tampering !== null && 
                <TamperingEditor 
                  block = {this.state.tampering} 
                  recordTampering = {this.recordTampering}
                />
              }
            </div>
        );
      }

}


export default BlockchainLedger;