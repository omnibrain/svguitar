"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgJsRenderer = void 0;
var svg_js_1 = require("@svgdotjs/svg.js");
var renderer_1 = require("../renderer");
var constants_1 = require("../../constants");
var is_node_1 = require("../../utils/is-node");
var SvgJsRenderer = /** @class */ (function (_super) {
    __extends(SvgJsRenderer, _super);
    function SvgJsRenderer(container) {
        var _this = _super.call(this, container) || this;
        // initialize the SVG
        var width = constants_1.constants.width;
        var height = 0;
        /*
        For some reason the container needs to be initiated differently with svgdom (node) and
        and in the browser. Might be a bug in either svg.js or svgdom. But this workaround works fine
        so I'm not going to care for now.
         */
        /* istanbul ignore else */
        if ((0, is_node_1.isNode)()) {
            // node (jest)
            _this.svg = (0, svg_js_1.SVG)(container);
        }
        else {
            // browser
            _this.svg = (0, svg_js_1.SVG)().addTo(container);
        }
        _this.svg.attr('preserveAspectRatio', 'xMidYMid meet').viewbox(0, 0, width, height);
        return _this;
    }
    SvgJsRenderer.prototype.title = function (title) {
        this.svg.add(this.svg.element('title').words(title));
    };
    SvgJsRenderer.prototype.line = function (fromX, fromY, toX, toY, strokeWidth, color) {
        this.svg.line(fromX, fromY, toX, toY).stroke({ color: color, width: strokeWidth });
    };
    SvgJsRenderer.prototype.size = function (width, height) {
        this.svg.viewbox(0, 0, width, height);
    };
    SvgJsRenderer.prototype.clear = function () {
        this.svg.children().forEach(function (child) { return child.remove(); });
    };
    SvgJsRenderer.prototype.remove = function () {
        this.svg.remove();
    };
    SvgJsRenderer.prototype.background = function (color) {
        this.svg.rect().size('100%', '100%').fill(color);
    };
    SvgJsRenderer.prototype.text = function (text, x, y, fontSize, color, fontFamily, alignment, classes, plain) {
        var element;
        if (plain) {
            // create a text element centered at x,y. No SVG.js magic.
            element = this.svg
                .plain(text)
                .attr({
                x: x,
                y: y,
            })
                .font({
                family: fontFamily,
                size: fontSize,
                anchor: alignment,
                'dominant-baseline': 'central',
            })
                .fill(color)
                .addClass(renderer_1.Renderer.toClassName(classes));
        }
        else {
            element = this.svg
                .text(text)
                .move(x, y)
                .font({
                family: fontFamily,
                size: fontSize,
                anchor: alignment,
            })
                .fill(color)
                .addClass(renderer_1.Renderer.toClassName(classes));
        }
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.circle = function (x, y, diameter, strokeWidth, strokeColor, fill, classes) {
        var element = this.svg
            .circle(diameter)
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            color: strokeColor,
            width: strokeWidth,
        })
            .addClass(renderer_1.Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.rect = function (x, y, width, height, strokeWidth, strokeColor, classes, fill, radius) {
        var element = this.svg
            .rect(width, height)
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .radius(radius || 0)
            .addClass(renderer_1.Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.triangle = function (x, y, size, strokeWidth, strokeColor, classes, fill) {
        var element = this.svg
            .path(renderer_1.Renderer.trianglePath(x, y, size))
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .addClass(renderer_1.Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.pentagon = function (x, y, size, strokeWidth, strokeColor, fill, classes) {
        return this.ngon(x, y, size, strokeWidth, strokeColor, fill, 5, classes);
    };
    SvgJsRenderer.prototype.ngon = function (x, y, size, strokeWidth, strokeColor, fill, edges, classes) {
        var element = this.svg
            .path(renderer_1.Renderer.ngonPath(x, y, size, edges))
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .addClass(renderer_1.Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.boxToElement = function (box, remove) {
        return {
            width: box.width,
            height: box.height,
            x: box.x,
            y: box.y,
            remove: remove,
        };
    };
    return SvgJsRenderer;
}(renderer_1.Renderer));
exports.SvgJsRenderer = SvgJsRenderer;
exports.default = SvgJsRenderer;
//# sourceMappingURL=svg-js-renderer.js.map