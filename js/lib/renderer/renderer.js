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
exports.Renderer = exports.ArcDirection = exports.Alignment = void 0;
var Alignment;
(function (Alignment) {
    Alignment["LEFT"] = "left";
    Alignment["MIDDLE"] = "middle";
    Alignment["RIGHT"] = "right";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var ArcDirection;
(function (ArcDirection) {
    ArcDirection["UP"] = "up";
    ArcDirection["LEFT"] = "left";
})(ArcDirection = exports.ArcDirection || (exports.ArcDirection = {}));
var Renderer = /** @class */ (function () {
    function Renderer(container) {
        this.container = container;
    }
    Renderer.trianglePath = function (x, y, size) {
        return "M".concat(x + size / 2, " ").concat(y, " L").concat(x + size, " ").concat(y + size, " L").concat(x, " ").concat(y + size);
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
            return "".concat(acc, " L").concat(posX, " ").concat(posY);
        }, '');
        return "M".concat(curX, " ").concat(curY, " ").concat(lines);
    };
    Renderer.arcBarrePath = function (x, y, width, height, direction) {
        // arc thickness (0-1): higher means thicker
        var thickness = 0.35;
        var t = Math.max(0, Math.min(1, 1 - thickness));
        var xStart, yStart;
        var xEnd, yEnd;
        var cxOuter, cyOuter;
        var cxInner, cyInner;
        switch (direction) {
            case ArcDirection.UP: {
                xStart = x;
                yStart = y + height;
                xEnd = x + width;
                yEnd = y + height;
                cxOuter = x + width / 2;
                cyOuter = y - height;
                cxInner = cxOuter;
                cyInner = yStart - height * 2 * t;
                break;
            }
            case ArcDirection.LEFT: {
                xStart = x + width;
                yStart = y;
                xEnd = x + width;
                yEnd = y + height;
                cxOuter = x - width;
                cyOuter = y + height / 2;
                cxInner = xStart - width * 2 * t;
                cyInner = cyOuter;
                break;
            }
        }
        return [
            "M ".concat(xStart, " ").concat(yStart),
            "Q ".concat(cxOuter, " ").concat(cyOuter, " ").concat(xEnd, " ").concat(yEnd),
            "Q ".concat(cxInner, " ").concat(cyInner, " ").concat(xStart, " ").concat(yStart),
            "Z",
        ].join(' ');
    };
    Renderer.toClassName = function (classes) {
        if (!classes) {
            return '';
        }
        return Array.isArray(classes) ? classes.join(' ') : classes;
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map