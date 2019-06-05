/* eslint-disable no-unused-vars */
import {cleanup,render, fireEvent} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockWriter from "./BlockWriter";
import $ from "jquery";
import Block from "../Block";
import BlockChain from "../BlockChain"
import {createStore} from 'redux';
import {Actions,AppReducer} from "../app-reducer";
import "../javascript-fixes.js";


const init = {
    blockChain : new BlockChain(),
    recentAction: null
}

const storeReducerMock = function (state, action) {
    if (typeof state === "undefined") {
        init.blockChain = new BlockChain();
        return init;
    }
    let newState;
    newState = state._clone();
    newState.blockChain = state.blockChain.clone();
    let index;
    switch (action.type) {
    case "ADD_BLOCK":
        newState.recentAction = action
        break;
    default:
        break;
    }
    return newState;
}

afterEach(cleanup)

let div;
let getByTestId;
let store;

let setProps = () => {
    store = createStore(storeReducerMock);
}

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
});

test('renders without crashing', () => {
    expect( ()=>{
        render(<BlockWriter
            store = {store}
        />);
    }).not.toThrow(); 
});

test('submit fires ADD_BLOCK action', (done) => {
    ({ getByTestId } = render(<BlockWriter
        store = {store}
    />));
    let submitButton = getByTestId("submit-button")
    fireEvent.click(submitButton);
    setTimeout(()=>{
        expect(store.getState().recentAction.type).toBe("ADD_BLOCK");
        done()
    },10);
});

test('text edit plus submit fires ADD_BLOCK action with new block', (done) => {
    ({ getByTestId } = render(<BlockWriter
        store = {store}
    />));
    let submitButton = getByTestId("submit-button");
    let textInput = getByTestId("newBlockTextInput");
    fireEvent.change(textInput, { target: { value: "apple" } })
    fireEvent.click(submitButton);
    setTimeout(()=>{
        let dispatchedBlock = store.getState().recentAction.value;
        expect(dispatchedBlock.getText()).toBe("apple");
        done()
    },10);
});