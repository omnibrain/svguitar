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
var PatrickHand_Regular_woff2_1 = __importDefault(require("../../../fonts/PatrickHand-Regular.woff2"));
var renderer_1 = require("../renderer");
/**
 * Currently the font is hard-coded to 'Patrick Hand' when using the handdrawn chord diagram style.
 * The reason is that the font needs to be base64 encoded and embedded in the SVG. In theory a web-font
 * could be downloaded, base64 encoded and embedded in the SVG but that's too much of a hassle. But if the
 * need arises it should be possible.
 */
var FONT_FAMLILY = 'Patrick Hand';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XMLNS_NS = 'http://www.w3.org/2000/xmlns/';
/**
 * Seed for the random variations of the shapes, so the same diagram is always drawn identically.
 */
var SEED = 42;
var fontFaces = new WeakMap();
/**
 * Text is measured while drawing, so the font has to be available to the document by then. The
 * font embedded in the SVG only loads once the SVG is part of the document, and asynchronously, so
 * it's also added to the document's fonts directly.
 */
function loadFont(doc) {
    if (typeof FontFace === 'undefined' || !doc.fonts) {
        return undefined;
    }
    var face = fontFaces.get(doc);
    if (!face) {
        face = new FontFace(FONT_FAMLILY, Uint8Array.from(atob(PatrickHand_Regular_woff2_1.default), function (c) { return c.charCodeAt(0); }));
        doc.fonts.add(face);
        fontFaces.set(doc, face);
    }
    return face.status === 'loaded' || face.status === 'error' ? undefined : face.load();
}
var RoughJsRenderer = /** @class */ (function (_super) {
    __extends(RoughJsRenderer, _super);
    function RoughJsRenderer(container) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, container) || this;
        _this.randomState = SEED;
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
        // `document`, only the one associated with the container node. Without a container, fall
        // back to the document registered with svg.js, which is the global one in a browser.
        var doc = (_b = (_a = _this.containerNode) === null || _a === void 0 ? void 0 : _a.ownerDocument) !== null && _b !== void 0 ? _b : (_c = (0, svg_js_1.getWindow)()) === null || _c === void 0 ? void 0 : _c.document;
        if (!doc) {
            throw new Error('No document available. Pass a container or, outside a browser, register a window ' +
                'with registerWindow() from @svgdotjs/svg.js (e.g. using svgdom).');
        }
        _this.doc = doc;
        // create an empty SVG element
        _this.svgNode = _this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        _this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        _this.svgNode.setAttribute('version', '1.1');
        // Namespaced, since serializing to XML (e.g. with svgdom) rejects an attribute name with a colon
        _this.svgNode.setAttributeNS(XMLNS_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        _this.svgNode.setAttributeNS(XMLNS_NS, 'xmlns:svgjs', 'http://svgjs.com/svgjs');
        _this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        _this.svgNode.setAttribute('viewBox', '0 0 400 400');
        _this.embedDefs();
        (_d = _this.containerNode) === null || _d === void 0 ? void 0 : _d.appendChild(_this.svgNode);
        _this.rc = roughjs_1.default.svg(_this.svgNode);
        loadFont(_this.doc);
        return _this;
    }
    /**
     * Embeds the font into the SVG so that the text always looks correct.
     */
    RoughJsRenderer.prototype.embedDefs = function () {
        // check if defs were already added
        if (this.svgNode.querySelector('defs [data-svguitar-def]')) {
            return;
        }
        var currentDefs = this.svgNode.querySelector('defs');
        if (!currentDefs) {
            currentDefs = this.doc.createElementNS(SVG_NS, 'defs');
            this.svgNode.prepend(currentDefs);
        }
        var style = this.doc.createElementNS(SVG_NS, 'style');
        style.setAttribute('data-svguitar-def', 'true');
        style.textContent = defs_1.default;
        currentDefs.appendChild(style);
    };
    RoughJsRenderer.prototype.title = function (title) {
        var titleEl = this.doc.createElementNS(SVG_NS, 'title');
        titleEl.textContent = title;
        this.svgNode.appendChild(titleEl);
    };
    RoughJsRenderer.prototype.circle = function (x, y, diameter, strokeWidth, strokeColor, fill, classes) {
        var options = {
            seed: this.nextSeed(),
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
        return RoughJsRenderer.boxToElement(this.bbox(circle), function () {
            return circle ? circle.remove() : undefined;
        });
    };
    RoughJsRenderer.prototype.clear = function () {
        while (this.svgNode.firstChild) {
            this.svgNode.removeChild(this.svgNode.firstChild);
        }
        delete this.backgroundElement;
        this.rc = roughjs_1.default.svg(this.svgNode);
        this.randomState = SEED;
        this.embedDefs();
    };
    RoughJsRenderer.prototype.fontsLoading = function () {
        return loadFont(this.doc);
    };
    /**
     * rough.js varies a shape based on its seed, so every shape gets its own seed. Otherwise all
     * shapes of the same size would wobble identically. The seeds are generated with a Lehmer RNG,
     * which never yields 0 (a seed of 0 makes rough.js fall back to Math.random()).
     */
    RoughJsRenderer.prototype.nextSeed = function () {
        this.randomState = (this.randomState * 48271) % 2147483647;
        return this.randomState;
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
                seed: this.nextSeed(),
                strokeWidth: strokeWidth,
                stroke: color,
            });
            RoughJsRenderer.addClasses(line, classes);
            this.svgNode.appendChild(line);
        }
    };
    RoughJsRenderer.prototype.rect = function (x, y, width, height, strokeWidth, strokeColor, classes, fill, radius) {
        var rect2 = this.rc.rectangle(x, y, width, height, {
            seed: this.nextSeed(),
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
            seed: this.nextSeed(),
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
        return RoughJsRenderer.boxToElement(this.bbox(rect), function () { return rect.remove(); });
    };
    RoughJsRenderer.prototype.arc = function (x, y, width, height, direction, strokeWidth, strokeColor, classes, fill) {
        var path = renderer_1.Renderer.arcBarrePath(x, y, width, height, direction);
        var arc = this.rc.path(path, {
            seed: this.nextSeed(),
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        RoughJsRenderer.addClasses(arc, classes);
        this.svgNode.appendChild(arc);
        return RoughJsRenderer.boxToElement(this.bbox(arc), function () { return arc.remove(); });
    };
    RoughJsRenderer.prototype.triangle = function (x, y, size, strokeWidth, strokeColor, classes, fill) {
        var triangle = this.rc.path(renderer_1.Renderer.trianglePath(0, 0, size), {
            seed: this.nextSeed(),
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        triangle.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        RoughJsRenderer.addClasses(triangle, classes);
        this.svgNode.appendChild(triangle);
        return RoughJsRenderer.boxToElement(this.bbox(triangle), function () { return triangle.remove(); });
    };
    RoughJsRenderer.prototype.pentagon = function (x, y, size, strokeWidth, strokeColor, fill, classes, spikes) {
        if (spikes === void 0) { spikes = 5; }
        var pentagon = this.rc.path(renderer_1.Renderer.ngonPath(0, 0, size, spikes), {
            seed: this.nextSeed(),
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        pentagon.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        RoughJsRenderer.addClasses(pentagon, classes);
        this.svgNode.appendChild(pentagon);
        return RoughJsRenderer.boxToElement(this.bbox(pentagon), function () { return pentagon.remove(); });
    };
    RoughJsRenderer.prototype.size = function (width, height, x, y) {
        var _a, _b;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.svgNode.setAttribute('viewBox', "".concat(Math.floor(x), " ").concat(Math.floor(y), " ").concat(Math.ceil(width), " ").concat(Math.ceil(height)));
        (_a = this.backgroundElement) === null || _a === void 0 ? void 0 : _a.setAttributeNS(null, 'x', String(Math.floor(x)));
        (_b = this.backgroundElement) === null || _b === void 0 ? void 0 : _b.setAttributeNS(null, 'y', String(Math.floor(y)));
    };
    RoughJsRenderer.prototype.background = function (color) {
        var bg = this.doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttributeNS(null, 'width', '100%');
        bg.setAttributeNS(null, 'height', '100%');
        bg.setAttributeNS(null, 'fill', color);
        this.backgroundElement = bg;
        this.svgNode.insertBefore(bg, this.svgNode.firstChild);
    };
    RoughJsRenderer.prototype.text = function (text, x, y, fontSize, color, fontFamily, alignment, classes, plain) {
        var _this = this;
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
        if (typeof text === 'string') {
            txtElem.appendChild(this.doc.createTextNode(text));
        }
        else {
            renderer_1.Renderer.textSpans(text, fontSize).forEach(function (span) {
                var tspan = _this.doc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttributeNS(null, 'font-size', String(span.fontSize));
                if (span.dy) {
                    tspan.setAttributeNS(null, 'dy', String(span.dy));
                }
                tspan.appendChild(_this.doc.createTextNode(span.text));
                txtElem.appendChild(tspan);
            });
        }
        this.svgNode.appendChild(txtElem);
        var bbox = this.bbox(txtElem);
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
        return RoughJsRenderer.boxToElement(this.bbox(txtElem), txtElem.remove.bind(txtElem));
    };
    /**
     * Browsers return an empty bounding box for elements that are not part of the document, so a
     * detached (headless) diagram is briefly attached to the document while it's being measured.
     */
    RoughJsRenderer.prototype.bbox = function (element) {
        var _a;
        if (this.containerNode) {
            return element.getBBox();
        }
        var host = (_a = this.doc.body) !== null && _a !== void 0 ? _a : this.doc.documentElement;
        host.appendChild(this.svgNode);
        try {
            return element.getBBox();
        }
        finally {
            this.svgNode.remove();
        }
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