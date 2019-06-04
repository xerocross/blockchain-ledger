import {cleanup,fireEvent,render} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import RecordRowItem from "./RecordRowItem.jsx";

afterEach(cleanup)

let div;
let getByText;
let getByTestId;
let block;
let isValid;
let tamper;
let deleteFunc;

let setProps = () => {
    block = {
        getPreviousBlockHash: () => "84772028",
        getCreationDate: () => "may-9-2019",
        getHash : () => "884716499",
        getText : () => "block text"
    }
    isValid = true;
    tamper = ()=> {};
    deleteFunc = () => {};
}

beforeEach(()=>{
    setProps();
    div = document.createElement('div');
})

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
});

test('renders without crashing', () => {
    ({  getByText } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
});

test('shows the hash', () => {
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByTestId("block-hash");
    expect(el.textContent).toBe("884716499");
});

test('shows the block text', () => {
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByTestId("block-text");
    expect(el.textContent).toBe("block text");
});

test('shows the previous block hash', () => {
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByTestId("previous-hash");
    expect(el.textContent).toBe("84772028");
});

test('shows the creation date', () => {
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByTestId("creation-date");
    expect(el.textContent).toBe("may-9-2019");
});

test("clicking tamper fires tamper function prop", (done)=> {
    tamper = () => {
        done();
    }
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByText("tamper");
    fireEvent.click(el);
});
test("clicking delete fires delete function prop", (done)=> {
    deleteFunc = () => {
        done();
    }
    ({  getByText, getByTestId } = render(<RecordRowItem 
        block = {block}
        isValid = {isValid}
        tamper = {tamper}
        delete = {deleteFunc}
    />));
    let el = getByText("delete");
    fireEvent.click(el);
});