"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.isNode = void 0;
function isNode() {
    // tslint:disable-next-line:strict-type-predicates
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
}
exports.isNode = isNode;
function range(length, from) {
    if (from === void 0) { from = 0; }
    return Array.from({ length: length }, function (_, i) { return i + from; });
}
exports.range = range;
//# sourceMappingURL=utils.js.map