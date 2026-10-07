"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordinalSuffix = exports.toRoman = void 0;
var romanNumerals = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
];
function toRoman(value) {
    var rest = value;
    return romanNumerals.reduce(function (roman, _a) {
        var _b = __read(_a, 2), arabic = _b[0], numeral = _b[1];
        var count = Math.floor(rest / arabic);
        rest -= count * arabic;
        return roman + numeral.repeat(count);
    }, '');
}
exports.toRoman = toRoman;
function ordinalSuffix(value) {
    var _a;
    var lastTwo = value % 100;
    if (lastTwo >= 11 && lastTwo <= 13) {
        return 'th';
    }
    return (_a = { 1: 'st', 2: 'nd', 3: 'rd' }[value % 10]) !== null && _a !== void 0 ? _a : 'th';
}
exports.ordinalSuffix = ordinalSuffix;
//# sourceMappingURL=numbers.js.map