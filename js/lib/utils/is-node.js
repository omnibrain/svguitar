"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = void 0;
function isNode() {
    // tslint:disable-next-line:strict-type-predicates
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
}
exports.isNode = isNode;
//# sourceMappingURL=is-node.js.map