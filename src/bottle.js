const NAMESPACE = "blockchainLedgerState";

function bottle (state) {
    let data = JSON.stringify(state);
    return data;
}

function unbottle (stateString) {
    try {
        let parsedState = JSON.parse(stateString);
        return parsedState;
    }
    catch (e) {
        return null;
    }
}

export function getStateFromStorage () {
    if (localStorage) {
        let stateFromStorage = unbottle(localStorage.getItem(NAMESPACE))
        if (stateFromStorage !== null) {
            return stateFromStorage
        }
    } 
    return null;
}

export function persistStateToStorage (state) {
    localStorage.setItem(NAMESPACE, bottle(state));
}