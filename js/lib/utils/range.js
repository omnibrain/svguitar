"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(length, from) {
    if (from === void 0) { from = 0; }
    return Array.from({ length: length }, function (_, i) { return i + from; });
}
exports.range = range;
//# sourceMappingURL=range.js.map