/* eslint-disable no-unused-vars */
import {cleanup,render} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import RecordChainList from "./RecordChainList";
import Blockchain from "../BlockChain";
import Block from "../Block";
import $ from "jquery";

afterEach(cleanup)

let div;
let getByTestId;
let blockChain;
let deleteFunc;
let tamperFunc;

let setProps = () => {
    blockChain = new Blockchain();
    let a = new Block("a");
    let b = new Block("b");
    let c = new Block("c");
    blockChain.push(a);
    blockChain.push(b);
    blockChain.push(c);
    deleteFunc = ()=>{};
    tamperFunc = ()=>{};
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
        render(<RecordChainList
            blockChain = {blockChain}
            delete = {deleteFunc}
            tamper = {tamperFunc}
        />);
    }).not.toThrow(); 
});

test('num li elements matches length of blockchain', () => {
    ({getByTestId} = render(<RecordChainList
        blockChain = {blockChain}
        delete = {deleteFunc}
        tamper = {tamperFunc}
    />));
    let el = getByTestId("recordchain-list-ul");
    expect($("li", el)).toHaveLength(3);
});