"use strict";
/* istanbul ignore file */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoughJsRenderer = void 0;
var svg_js_1 = require("@svgdotjs/svg.js");
var roughjs_1 = __importDefault(require("roughjs"));
var defs_1 = __importDefault(require("./defs"));
var renderer_1 = require("../renderer");
/**
 * Currently the font is hard-coded to 'Patrick Hand' when using the handdrawn chord diagram style.
 * The reason is that the font needs to be base64 encoded and embedded in the SVG. In theory a web-font
 * could be downloaded, base64 encoded and embedded in the SVG but that's too much of a hassle. But if the
 * need arises it should be possible.
 */
var FONT_FAMLILY = 'Patrick Hand';
var RoughJsRenderer = /** @class */ (function (_super) {
    __extends(RoughJsRenderer, _super);
    function RoughJsRenderer(container) {
        var _this = _super.call(this, container) || this;
        if (!container) {
            throw new Error('The handdrawn chord diagram style requires a container element and is not supported ' +
                'in headless mode yet. Use the default style to render without a DOM.');
        }
        // initialize the container
        if (typeof container === 'string') {
            var node = document.querySelector(container);
            if (!node) {
                throw new Error("No element found with selector \"".concat(container, "\""));
            }
            _this.containerNode = node;
        }
        else {
            _this.containerNode = container;
        }
        // Use the container's own document instead of the global `document` so this renderer also
        // works in environments (e.g. server-side rendering with svgdom) where there is no global
        // `document`, only the one associated with the container node.
        _this.doc = _this.containerNode.ownerDocument;
        // create an empty SVG element
        _this.svgNode = _this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        _this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        _this.svgNode.setAttribute('version', '1.1');
        _this.svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        _this.svgNode.setAttribute('xmlns:svgjs', 'http://svgjs.com/svgjs');
        _this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        _this.svgNode.setAttribute('viewBox', '0 0 400 400');
        _this.embedDefs();
        _this.containerNode.appendChild(_this.svgNode);
        _this.rc = roughjs_1.default.svg(_this.svgNode);
        return _this;
    }
    /**
     * This will embed all defs defined in the defs.html file. Specifically this is used to embed the base64
     * encoded font into the SVG so that the font always looks correct.
     */
    RoughJsRenderer.prototype.embedDefs = function () {
        var _a;
        // check if defs were already added
        if (this.svgNode.querySelector('defs [data-svguitar-def]')) {
            return;
        }
        var currentDefs = this.svgNode.querySelector('defs');
        if (!currentDefs) {
            currentDefs = this.doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
            this.svgNode.prepend(currentDefs);
        }
        // create dom nodes from HTML string. A plain container element (rather than a <template>) is
        // used here since svgdom, which renders diagrams server-side (e.g. in tests), doesn't implement
        // HTMLTemplateElement's `.content`.
        var container = this.doc.createElement('div');
        container.innerHTML = defs_1.default.trim();
        var defsToAdd = (_a = container.querySelector('defs')) === null || _a === void 0 ? void 0 : _a.children;
        if (defsToAdd) {
            svg_js_1.Array.from(defsToAdd).forEach(function (def) {
                def.setAttribute('data-svguitar-def', 'true');
                currentDefs === null || currentDefs === void 0 ? void 0 : currentDefs.appendChild(def);
            });
        }
    };
    RoughJsRenderer.prototype.title = function (title) {
        var titleEl = this.doc.createElement('title');
        titleEl.textContent = title;
        this.svgNode.appendChild(titleEl);
    };
    RoughJsRenderer.prototype.circle = function (x, y, diameter, strokeWidth, strokeColor, fill, classes) {
        var options = {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        };
        if (strokeWidth > 0) {
            options.strokeWidth = strokeWidth;
        }
        var circle = this.rc.circle(x + diameter / 2, y + diameter / 2, diameter, options);
        RoughJsRenderer.addClasses(circle, classes);
        this.svgNode.appendChild(circle);
        return RoughJsRenderer.boxToElement(circle.getBBox(), function () {
            return circle ? circle.remove() : undefined;
        });
    };
    RoughJsRenderer.prototype.clear = function () {
        while (this.svgNode.firstChild) {
            this.svgNode.removeChild(this.svgNode.firstChild);
        }
        this.rc = roughjs_1.default.svg(this.svgNode);
        this.embedDefs();
    };
    RoughJsRenderer.prototype.remove = function () {
        this.svgNode.remove();
    };
    RoughJsRenderer.prototype.toSvgString = function () {
        var svg = this.svgNode.outerHTML;
        if (svg.includes('xmlns=')) {
            return svg;
        }
        return svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    };
    RoughJsRenderer.prototype.line = function (x1, y1, x2, y2, strokeWidth, color, classes) {
        if (strokeWidth > 5 && (x1 - x2 === 0 || y1 - y2 === 0)) {
            if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
                this.rect(x1, y1, x2 - x1, strokeWidth, 0, color, color);
            }
            else {
                this.rect(x1 - strokeWidth / 2, y1, strokeWidth, y2 - y1, 0, color, color);
            }
        }
        else {
            var line = this.rc.line(x1, y1, x2, y2, {
                strokeWidth: strokeWidth,
                stroke: color,
            });
            RoughJsRenderer.addClasses(line, classes);
            this.svgNode.appendChild(line);
        }
    };
    RoughJsRenderer.prototype.rect = function (x, y, width, height, strokeWidth, strokeColor, classes, fill, radius) {
        var rect2 = this.rc.rectangle(x, y, width, height, {
            // fill: fill || 'none',
            fill: 'none',
            fillWeight: 2,
            strokeWidth: strokeWidth,
            stroke: strokeColor,
            roughness: 2.8,
            fillStyle: 'cross-hatch',
            hachureAngle: 60,
            hachureGap: 4,
        });
        var rectRadius = radius || 0;
        var path = RoughJsRenderer.roundedRectData(width, height, rectRadius, rectRadius, rectRadius, rectRadius);
        var rect = this.rc.path(path, {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        rect.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        RoughJsRenderer.addClasses(rect, classes);
        RoughJsRenderer.addClasses(rect2, classes);
        this.svgNode.appendChild(rect);
        this.svgNode.appendChild(rect2);
        return RoughJsRenderer.boxToElement(rect.getBBox(), function () { return rect.remove(); });
    };
    RoughJsRenderer.prototype.arc = function (x, y, width, height, direction, strokeWidth, strokeColor, classes, fill) {
        var path = renderer_1.Renderer.arcBarrePath(x, y, width, height, direction);
        var arc = this.rc.path(path, {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        RoughJsRenderer.addClasses(arc, classes);
        this.svgNode.appendChild(arc);
        return RoughJsRenderer.boxToElement(arc.getBBox(), function () { return arc.remove(); });
    };
    RoughJsRenderer.prototype.triangle = function (x, y, size, strokeWidth, strokeColor, classes, fill) {
        var triangle = this.rc.path(renderer_1.Renderer.trianglePath(0, 0, size), {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        triangle.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        RoughJsRenderer.addClasses(triangle, classes);
        this.svgNode.appendChild(triangle);
        return RoughJsRenderer.boxToElement(triangle.getBBox(), function () { return triangle.remove(); });
    };
    RoughJsRenderer.prototype.pentagon = function (x, y, size, strokeWidth, strokeColor, fill, classes, spikes) {
        if (spikes === void 0) { spikes = 5; }
        var pentagon = this.rc.path(renderer_1.Renderer.ngonPath(0, 0, size, spikes), {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        pentagon.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        RoughJsRenderer.addClasses(pentagon, classes);
        this.svgNode.appendChild(pentagon);
        return RoughJsRenderer.boxToElement(pentagon.getBBox(), function () { return pentagon.remove(); });
    };
    RoughJsRenderer.prototype.size = function (width, height) {
        this.svgNode.setAttribute('viewBox', "0 0 ".concat(Math.ceil(width), " ").concat(Math.ceil(height)));
    };
    RoughJsRenderer.prototype.background = function (color) {
        var bg = this.doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttributeNS(null, 'width', '100%');
        bg.setAttributeNS(null, 'height', '100%');
        bg.setAttributeNS(null, 'fill', color);
        this.svgNode.insertBefore(bg, this.svgNode.firstChild);
    };
    RoughJsRenderer.prototype.text = function (text, x, y, fontSize, color, fontFamily, alignment, classes, plain) {
        // Place the SVG namespace in a variable to easily reference it.
        var txtElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'text');
        txtElem.setAttributeNS(null, 'x', String(x));
        txtElem.setAttributeNS(null, 'y', String(y));
        txtElem.setAttributeNS(null, 'font-size', String(fontSize));
        txtElem.setAttributeNS(null, 'font-family', FONT_FAMLILY);
        txtElem.setAttributeNS(null, 'align', alignment);
        txtElem.setAttributeNS(null, 'fill', color);
        if (plain) {
            txtElem.setAttributeNS(null, 'dominant-baseline', 'central');
        }
        txtElem.appendChild(this.doc.createTextNode(text));
        this.svgNode.appendChild(txtElem);
        var bbox = txtElem.getBBox();
        var xOffset;
        switch (alignment) {
            case renderer_1.Alignment.MIDDLE:
                xOffset = -(bbox.width / 2);
                break;
            case renderer_1.Alignment.LEFT:
                xOffset = 0;
                break;
            case renderer_1.Alignment.RIGHT:
                xOffset = -bbox.width;
                break;
            default:
                throw new Error("Invalid alignment ".concat(alignment));
        }
        RoughJsRenderer.addClasses(txtElem, classes);
        txtElem.setAttributeNS(null, 'x', String(x + xOffset));
        txtElem.setAttributeNS(null, 'y', String(y + (plain ? 0 : bbox.height / 2)));
        return RoughJsRenderer.boxToElement(txtElem.getBBox(), txtElem.remove.bind(txtElem));
    };
    RoughJsRenderer.boxToElement = function (box, remove) {
        var _a, _b, _c, _d;
        return {
            width: (_a = box.width) !== null && _a !== void 0 ? _a : 0,
            height: (_b = box.height) !== null && _b !== void 0 ? _b : 0,
            x: (_c = box.x) !== null && _c !== void 0 ? _c : 0,
            y: (_d = box.y) !== null && _d !== void 0 ? _d : 0,
            remove: remove,
        };
    };
    RoughJsRenderer.roundedRectData = function (w, h, tlr, trr, brr, blr) {
        return ("M 0 ".concat(tlr, " A ").concat(tlr, " ").concat(tlr, " 0 0 1 ").concat(tlr, " 0") +
            " L ".concat(w - trr, " 0") +
            " A ".concat(trr, " ").concat(trr, " 0 0 1 ").concat(w, " ").concat(trr, " L ").concat(w, " ").concat(h - brr, " A ").concat(brr, " ").concat(brr, " 0 0 1 ").concat(w - brr, " ").concat(h, " L ").concat(blr, " ").concat(h, " A ").concat(blr, " ").concat(blr, " 0 0 1 0 ").concat(h - blr, " Z"));
    };
    RoughJsRenderer.toClassArray = function (classes) {
        if (!classes) {
            return [];
        }
        return renderer_1.Renderer.toClassName(classes).split(' ');
    };
    /**
     * Adds classes to an SVG element via the "class" attribute rather than the classList API, since
     * classList isn't implemented by svgdom (used to render server-side / in tests).
     */
    RoughJsRenderer.addClasses = function (element, classes) {
        var classArray = RoughJsRenderer.toClassArray(classes);
        if (classArray.length === 0) {
            return;
        }
        var existingClasses = element.getAttribute('class');
        var mergedClasses = existingClasses
            ? "".concat(existingClasses, " ").concat(classArray.join(' '))
            : classArray.join(' ');
        element.setAttribute('class', mergedClasses);
    };
    return RoughJsRenderer;
}(renderer_1.Renderer));
exports.RoughJsRenderer = RoughJsRenderer;
exports.default = RoughJsRenderer;
//# sourceMappingURL=roughjs-renderer.js.map