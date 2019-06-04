import {cleanup,fireEvent,render} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import TamperingEditor from "./TamperingEditor.jsx";

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
    render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />); 
});

test('shows previous block hash in input', () => {
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("previous-record-hash");
    expect(el.value).toBe("84772028");
});

test('shows block text in input', () => {
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("record-text");
    expect(el.value).toBe("block text");
});

test('shows block creation date in input', () => {
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("creation-date-input");
    expect(el.value).toBe("may-9-2019");
});

test('new text gets passed into tamper function', (done) => {
    const testInput = "apple";
    recordTampering = (block, data) => {
        expect(data._text).toBe(testInput);
        done();
    }
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("record-text");
    let saveButton = getByTestId("save-button");
    fireEvent.change(el, { target: { value: testInput } });
    fireEvent.click(saveButton)
});

test('new date gets passed into tamper function', (done) => {
    const testInput = "pear";
    recordTampering = (block, data) => {
        expect(data._creationDate).toBe(testInput);
        done();
    }
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("creation-date-input");
    let saveButton = getByTestId("save-button");
    fireEvent.change(el, { target: { value: testInput } });
    fireEvent.click(saveButton)
});

test('new previous hash gets passed into tamper function', (done) => {
    const testInput = "newhash";
    recordTampering = (block, data) => {
        expect(data._previousBlockHash).toBe(testInput);
        done();
    }
    ({ getByTestId } = render(<TamperingEditor
        block = {block}
        recordTampering = {recordTampering}
    />));
    let el = getByTestId("previous-record-hash");
    let saveButton = getByTestId("save-button");
    fireEvent.change(el, { target: { value: testInput } });
    fireEvent.click(saveButton)
});