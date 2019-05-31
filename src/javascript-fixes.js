/* eslint-disable no-extend-native */

Object.defineProperty(Object.prototype, '_clone', {
    writable: false,
    enumerable : false,
    value: function() {
        let s = {};
        Object.assign(s, this);
        return s;
    }
});

Object.defineProperty(Array.prototype, '_clone', {
    writable: false,
    enumerable : false,
    value: function() {
        return this.slice(0);
    }
});

Object.defineProperty(Array.prototype, '_getLast', {
    writable: false,
    enumerable : false,
    value: function() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    }
});

Object.defineProperty(Array.prototype, '_reverse', {
    writable: false,
    enumerable : false,
    value: function() {
        return this._clone().reverse();
    }
});