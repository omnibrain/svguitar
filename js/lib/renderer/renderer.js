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
exports.Renderer = exports.Alignment = void 0;
var Alignment;
(function (Alignment) {
    Alignment["LEFT"] = "left";
    Alignment["MIDDLE"] = "middle";
    Alignment["RIGHT"] = "right";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var Renderer = /** @class */ (function () {
    function Renderer(container) {
        this.container = container;
    }
    Renderer.trianglePath = function (x, y, size) {
        return "M" + (x + size / 2) + " " + y + " L" + (x + size) + " " + (y + size) + " L" + x + " " + (y + size);
    };
    Renderer.ngonPath = function (x, y, size, edges) {
        var i;
        var a;
        var degrees = 360 / edges;
        var radius = size / 2;
        var points = [];
        var curX = x;
        var curY = y;
        for (i = 0; i < edges; i += 1) {
            a = i * degrees - 90;
            curX = radius + radius * Math.cos((a * Math.PI) / 180);
            curY = radius + radius * Math.sin((a * Math.PI) / 180);
            points.push([curX, curY]);
        }
        var lines = points.reduce(function (acc, _a) {
            var _b = __read(_a, 2), posX = _b[0], posY = _b[1];
            return acc + " L" + posX + " " + posY;
        }, '');
        return "M" + curX + " " + curY + " " + lines;
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map