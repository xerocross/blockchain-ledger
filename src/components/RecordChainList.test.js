/* eslint-disable no-unused-vars */
import {cleanup,render} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import RecordChainList from "./RecordChainList";

afterEach(cleanup)

let div;
let getByTestId;

let block;
let recordTampering;

let setProps = () => {
    block = {
        getPreviousBlockHash: () => "84772028",
        getCreationDate: () => "may-9-2019",
        getHash : () => "884716499",
        getText : () => "block text"
    }
    recordTampering = ()=> {};
}

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
});

test('renders without crashing', () => {
    render(<RecordChainList
    />); 
});
