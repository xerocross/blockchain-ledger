/* eslint-disable no-unused-vars */
import {cleanup,render, fireEvent} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockchainLedger from "./BlockchainLedger";
import $ from "jquery";
import {Actions,AppReducer} from "../app-reducer";
import "../javascript-fixes.js";


afterEach(cleanup)

let div;
let getByTestId;
let store;



beforeEach(()=>{
    div = document.createElement('div');
})

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    cleanup();
});

test('renders without crashing', () => {
    expect( ()=>{
        render(<BlockchainLedger
        />);
    }).not.toThrow(); 
});

test('can create new record, and list has correct length', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "apple" } });
    fireEvent.click(submitButton);
    expect($("[data-testid=record-list-item]")).toHaveLength(1);
});

test('can create two new records, and list has correct length 2', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    expect($("[data-testid=record-list-item]")).toHaveLength(2);
});

test('delete all button removes all records', (done) => {
    window.confirm = () => true;
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    expect($("[data-testid=record-list-item]")).toHaveLength(0);
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    expect($("[data-testid=record-list-item]")).toHaveLength(3);
    let deleteButton = getByTestId("delete-all-button");
    fireEvent.click(deleteButton);
    setTimeout(()=> {
        expect($("[data-testid=record-list-item]")).toHaveLength(0);
        done();
    },10);
});

test('delete item button deletes correct item (1)', () => {
    window.confirm = () => true;
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let row = rowItems.get(0);
    let deleteButton = $("[data-testid=delete-button]", row).get(0);
    fireEvent.click(deleteButton);
    //update 
    rowItems = $("[data-testid=record-list-item]");
    expect( $($(rowItems.get(0)).find("[data-testid=block-text]").get(0)).text()).toBe("b");
    expect( $($(rowItems.get(1)).find("[data-testid=block-text]").get(0)).text()).toBe("a");
    expect(rowItems).toHaveLength(2);
});

test('delete item button deletes correct item (2)', () => {
    window.confirm = () => true;
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let row = rowItems.get(1);
    let deleteButton = $("[data-testid=delete-button]", row).get(0);
    fireEvent.click(deleteButton);
    //update 
    rowItems = $("[data-testid=record-list-item]");
    expect( $($(rowItems.get(0)).find("[data-testid=block-text]").get(0)).text()).toBe("c");
    expect( $($(rowItems.get(1)).find("[data-testid=block-text]").get(0)).text()).toBe("a");
    expect(rowItems).toHaveLength(2);
});

test('delete item button deletes correct item (3)', () => {
    window.confirm = () => true;
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let row = rowItems.get(2);
    let deleteButton = $("[data-testid=delete-button]", row).get(0);
    fireEvent.click(deleteButton);
    //update 
    rowItems = $("[data-testid=record-list-item]");
    expect( $($(rowItems.get(0)).find("[data-testid=block-text]").get(0)).text()).toBe("c");
    expect( $($(rowItems.get(1)).find("[data-testid=block-text]").get(0)).text()).toBe("b");
    expect(rowItems).toHaveLength(2);
});

test('can create two new records, and second block has correct previous block hash', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    expect(rowItems).toHaveLength(2);
    let firstRowItem = $(rowItems.get(1));
    let secondRowItem = $(rowItems.get(0));
    let firstRowHash = $("[data-testid=block-hash]", firstRowItem).text();
    let secondRowPreviousHash = $("[data-testid=previous-hash]", secondRowItem).text();
    expect(secondRowPreviousHash).toBe(firstRowHash);
});

test('can create a record and tamper button appears', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem);
    expect(tamperButton).toHaveLength(1);
});

test('clicking tamper button reveals tamperingEditor', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem).get(0);
    fireEvent.click(tamperButton);
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    expect(tamperingEditor).toHaveLength(1);
});

test('tampering editor receives correct test value', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem).get(0);
    fireEvent.click(tamperButton);
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingTextEditor = $("[data-testid=record-text]", tamperingEditor).get(0);
    let editorTextVal = $(tamperingTextEditor).val();
    expect(editorTextVal).toBe("a");
});

test('tampering with text works', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem).get(0);
    fireEvent.click(tamperButton);
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingTextEditor = $("[data-testid=record-text]", tamperingEditor).get(0);
    fireEvent.change(tamperingTextEditor, { target: { value: "b" } });
    let saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    //update rowItems
    rowItems = $("[data-testid=record-list-item]");
    firstRowItem = $(rowItems.get(0));
    let text = $("[data-testid=block-text]", firstRowItem).text();
    expect(text).toBe("b");
});

test('tampering with previous hash works', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem).get(0);
    fireEvent.click(tamperButton);
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingHashEditor = $("[data-testid=previous-record-hash]", tamperingEditor).get(0);
    fireEvent.change(tamperingHashEditor, { target: { value: "myhash" } });
    let saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    //update rowItems
    rowItems = $("[data-testid=record-list-item]");
    firstRowItem = $(rowItems.get(0));
    let text = $("[data-testid=previous-hash]", firstRowItem).text();
    expect(text).toBe("myhash");
});

test('tampering with creation date works', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    let rowItems = $("[data-testid=record-list-item]");
    let firstRowItem = $(rowItems.get(0));
    let tamperButton = $("[data-testid=tamper-button]", firstRowItem).get(0);
    fireEvent.click(tamperButton);
    //tamper
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingDateEditor = $("[data-testid=creation-date-input]", tamperingEditor).get(0);
    fireEvent.change(tamperingDateEditor, { target: { value: "mydate" } });
    let saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    //update rowItems
    rowItems = $("[data-testid=record-list-item]");
    firstRowItem = $(rowItems.get(0));
    let text = $("[data-testid=creation-date]", firstRowItem).text();
    expect(text).toBe("mydate");
});

test('initially all records are valid', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    //check that initial valid of valid is true
    let rowItems = $("[data-testid=record-list-item]");
    expect(rowItems).toHaveLength(3);
    $(rowItems).each(function (index) {
        expect($(this).attr("data-valid")).toBe("true");
    });
});

test('tampering with middle element causes next element to be invalid', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    //check that initial valid of valid is true
    let rowItems = $("[data-testid=record-list-item]");
    let rowItem = $(rowItems.get(1));
    let tamperButton = $("[data-testid=tamper-button]", rowItem).get(0);
    fireEvent.click(tamperButton);
    //tamper
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingDateEditor = $("[data-testid=creation-date-input]", tamperingEditor).get(0);
    fireEvent.change(tamperingDateEditor, { target: { value: "mydate" } });
    let saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    //update rowItems
    rowItems = $("[data-testid=record-list-item]");
    //check that now the row above shows invalid
    let rowAbove = $(rowItems.get(0));
    expect(rowAbove.attr("data-valid")).toBe("false");
});

test('tampering causes corrupted chain message to appear', () => {
    ({getByTestId} = render(<BlockchainLedger
    />));
    let blockWriter = getByTestId("BlockWriter");
    let textInput = getByTestId("newBlockTextInput");
    let submitButton = getByTestId("submit-button");
    fireEvent.change(textInput, { target: { value: "a" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "b" } });
    fireEvent.click(submitButton);
    fireEvent.change(textInput, { target: { value: "c" } });
    fireEvent.click(submitButton);
    //check that initial valid of valid is true
    let rowItems = $("[data-testid=record-list-item]");
    let rowItem = $(rowItems.get(1));
    let tamperButton = $("[data-testid=tamper-button]", rowItem).get(0);
    fireEvent.click(tamperButton);
    //tamper
    let tamperingEditor = $("[data-testid=TamperingEditor]");
    let tamperingDateEditor = $("[data-testid=creation-date-input]", tamperingEditor).get(0);
    fireEvent.change(tamperingDateEditor, { target: { value: "mydate" } });
    let saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    //check for corrupted chain message
    expect($("[data-testid=corrupted-chain-message]")).toHaveLength(1);
});