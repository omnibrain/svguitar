"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGuitarChord = exports.ElementType = exports.Orientation = exports.ChordStyle = exports.Shape = exports.FretLabelPosition = exports.SILENT = exports.OPEN = void 0;
var range_1 = require("./utils/range");
var constants_1 = require("./constants");
var renderer_1 = require("./renderer");
/**
 * Value for an open string (O)
 */
exports.OPEN = 0;
/**
 * Value for a silent string (X)
 */
exports.SILENT = 'x';
/**
 * Possible positions of the fret label (eg. "3fr").
 */
var FretLabelPosition;
(function (FretLabelPosition) {
    FretLabelPosition["LEFT"] = "left";
    FretLabelPosition["RIGHT"] = "right";
})(FretLabelPosition = exports.FretLabelPosition || (exports.FretLabelPosition = {}));
var Shape;
(function (Shape) {
    Shape["CIRCLE"] = "circle";
    Shape["SQUARE"] = "square";
    Shape["TRIANGLE"] = "triangle";
    Shape["PENTAGON"] = "pentagon";
})(Shape = exports.Shape || (exports.Shape = {}));
var ChordStyle;
(function (ChordStyle) {
    ChordStyle["normal"] = "normal";
    ChordStyle["handdrawn"] = "handdrawn";
})(ChordStyle = exports.ChordStyle || (exports.ChordStyle = {}));
var Orientation;
(function (Orientation) {
    Orientation["vertical"] = "vertical";
    Orientation["horizontal"] = "horizontal";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var ElementType;
(function (ElementType) {
    ElementType["FRET"] = "fret";
    ElementType["STRING"] = "string";
    ElementType["BARRE"] = "barre";
    ElementType["BARRE_TEXT"] = "barre-text";
    ElementType["FINGER"] = "finger";
    ElementType["TITLE"] = "title";
    ElementType["TUNING"] = "tuning";
    ElementType["FRET_POSITION"] = "fret-position";
    ElementType["STRING_TEXT"] = "string-text";
    ElementType["SILENT_STRING"] = "silent-string";
    ElementType["OPEN_STRING"] = "open-string";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
var defaultSettings = {
    style: ChordStyle.normal,
    strings: 6,
    frets: 5,
    position: 1,
    tuning: [],
    tuningsFontSize: 28,
    fretLabelFontSize: 38,
    fretLabelPosition: FretLabelPosition.RIGHT,
    nutSize: 0.65,
    nutTextColor: '#FFF',
    nutTextSize: 24,
    nutStrokeWidth: 0,
    barreChordStrokeWidth: 0,
    sidePadding: 0.2,
    titleFontSize: 48,
    titleBottomMargin: 0,
    color: '#000',
    emptyStringIndicatorSize: 0.6,
    strokeWidth: 2,
    topFretWidth: 10,
    fretSize: 1.5,
    barreChordRadius: 0.25,
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    shape: Shape.CIRCLE,
    orientation: Orientation.vertical,
};
var SVGuitarChord = /** @class */ (function () {
    function SVGuitarChord(container) {
        var _this = this;
        this.container = container;
        this.settings = {};
        this.chordInternal = { fingers: [], barres: [] };
        // apply plugins
        // https://stackoverflow.com/a/16345172
        var classConstructor = this.constructor;
        classConstructor.plugins.forEach(function (plugin) {
            Object.assign(_this, plugin(_this));
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    SVGuitarChord.plugin = function (plugin) {
        var _a;
        var currentPlugins = this.plugins;
        var BaseWithPlugins = (_a = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return class_1;
            }(this)),
            _a.plugins = currentPlugins.concat(plugin),
            _a);
        return BaseWithPlugins;
    };
    Object.defineProperty(SVGuitarChord.prototype, "renderer", {
        get: function () {
            var _a;
            if (!this.rendererInternal) {
                var style = (_a = this.settings.style) !== null && _a !== void 0 ? _a : defaultSettings.style;
                switch (style) {
                    case ChordStyle.normal:
                        this.rendererInternal = new renderer_1.SvgJsRenderer(this.container);
                        break;
                    case ChordStyle.handdrawn:
                        this.rendererInternal = new renderer_1.RoughJsRenderer(this.container);
                        break;
                    default:
                        throw new Error(style + " is not a valid chord diagram style.");
                }
            }
            return this.rendererInternal;
        },
        enumerable: false,
        configurable: true
    });
    SVGuitarChord.prototype.configure = function (settings) {
        SVGuitarChord.sanityCheckSettings(settings);
        // special case for style: remove current renderer instance if style changed. The new renderer
        // instance will be created lazily.
        if (settings.style !== this.settings.style) {
            this.renderer.remove();
            delete this.rendererInternal;
        }
        this.settings = __assign(__assign({}, this.settings), settings);
        return this;
    };
    SVGuitarChord.prototype.chord = function (chord) {
        this.chordInternal = chord;
        return this;
    };
    SVGuitarChord.prototype.draw = function () {
        var _a;
        this.clear();
        this.drawBackground();
        var y;
        y = this.drawTitle((_a = this.settings.titleFontSize) !== null && _a !== void 0 ? _a : defaultSettings.titleFontSize);
        y = this.drawEmptyStringIndicators(y);
        y = this.drawTopFret(y);
        this.drawPosition(y);
        y = this.drawGrid(y);
        y = this.drawTunings(y);
        // now set the final height of the svg (and add some padding relative to the fret spacing)
        y += this.fretSpacing() / 10;
        var width = this.width(constants_1.constants.width, y);
        var height = this.height(y, constants_1.constants.width);
        this.renderer.size(width, height);
        this.drawTopEdges(y);
        return {
            width: constants_1.constants.width,
            height: y,
        };
    };
    SVGuitarChord.sanityCheckSettings = function (settings) {
        if (typeof settings.strings !== 'undefined' && settings.strings <= 1) {
            throw new Error('Must have at least 2 strings');
        }
        if (typeof settings.frets !== 'undefined' && settings.frets < 0) {
            throw new Error('Cannot have less than 0 frets');
        }
        if (typeof settings.position !== 'undefined' && settings.position < 1) {
            throw new Error('Position cannot be less than 1');
        }
        if (typeof settings.fretSize !== 'undefined' && settings.fretSize < 0) {
            throw new Error('Fret size cannot be smaller than 0');
        }
        if (typeof settings.nutSize !== 'undefined' && settings.nutSize < 0) {
            throw new Error('Nut size cannot be smaller than 0');
        }
        if (typeof settings.strokeWidth !== 'undefined' && settings.strokeWidth < 0) {
            throw new Error('Stroke width cannot be smaller than 0');
        }
    };
    SVGuitarChord.prototype.drawTunings = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        // add some padding relative to the fret spacing
        var padding = this.fretSpacing() / 5;
        var stringXPositions = this.stringXPos();
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        var color = (_c = (_b = this.settings.tuningsColor) !== null && _b !== void 0 ? _b : this.settings.color) !== null && _c !== void 0 ? _c : defaultSettings.color;
        var tuning = (_d = this.settings.tuning) !== null && _d !== void 0 ? _d : defaultSettings.tuning;
        var fontFamily = (_e = this.settings.fontFamily) !== null && _e !== void 0 ? _e : defaultSettings.fontFamily;
        var tuningsFontSize = (_f = this.settings.tuningsFontSize) !== null && _f !== void 0 ? _f : defaultSettings.tuningsFontSize;
        var text;
        tuning.forEach(function (tuning_, i) {
            if (i < strings) {
                var classNames = [ElementType.TUNING, ElementType.TUNING + "-" + i];
                var _a = _this.coordinates(stringXPositions[i], y + padding), textX = _a.x, textY = _a.y;
                var tuningText = _this.renderer.text(tuning_, textX, textY, tuningsFontSize, color, fontFamily, renderer_1.Alignment.MIDDLE, classNames, true);
                if (tuning_) {
                    text = tuningText;
                }
            }
        });
        if (text) {
            return y + this.height(text.height, text.width) + padding * 2;
        }
        return y;
    };
    SVGuitarChord.prototype.drawPosition = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var position = (_b = (_a = this.chordInternal.position) !== null && _a !== void 0 ? _a : this.settings.position) !== null && _b !== void 0 ? _b : defaultSettings.position;
        if (position <= 1) {
            return;
        }
        var stringXPositions = this.stringXPos();
        var endX = stringXPositions[stringXPositions.length - 1];
        var startX = stringXPositions[0];
        var text = position + "fr";
        var size = (_c = this.settings.fretLabelFontSize) !== null && _c !== void 0 ? _c : defaultSettings.fretLabelFontSize;
        var color = (_e = (_d = this.settings.fretLabelColor) !== null && _d !== void 0 ? _d : this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
        var nutSize = this.stringSpacing() * ((_f = this.settings.nutSize) !== null && _f !== void 0 ? _f : defaultSettings.nutSize);
        var fontFamily = (_g = this.settings.fontFamily) !== null && _g !== void 0 ? _g : defaultSettings.fontFamily;
        var fretLabelPosition = (_h = this.settings.fretLabelPosition) !== null && _h !== void 0 ? _h : defaultSettings.fretLabelPosition;
        // add some padding relative to the string spacing. Also make sure the padding is at least
        // 1/2 nutSize plus some padding to prevent the nut overlapping the position label.
        var padding = Math.max(this.stringSpacing() / 5, nutSize / 2 + 5);
        var className = ElementType.FRET_POSITION;
        if (this.orientation === Orientation.vertical) {
            var drawText_1 = function (sizeMultiplier) {
                if (sizeMultiplier === void 0) { sizeMultiplier = 1; }
                if (sizeMultiplier < 0.01) {
                    // text does not fit: don't render it at all.
                    // eslint-disable-next-line no-console
                    console.warn('Not enough space to draw the starting fret');
                    return;
                }
                if (fretLabelPosition === FretLabelPosition.RIGHT) {
                    var svgText = _this.renderer.text(text, endX + padding, y, size * sizeMultiplier, color, fontFamily, renderer_1.Alignment.LEFT, className);
                    var width = svgText.width, x = svgText.x;
                    if (x + width > constants_1.constants.width) {
                        svgText.remove();
                        drawText_1(sizeMultiplier * 0.9);
                    }
                }
                else {
                    var svgText = _this.renderer.text(text, 1 / sizeMultiplier + startX - padding, y, size * sizeMultiplier, color, fontFamily, renderer_1.Alignment.RIGHT, className);
                    var x = svgText.x;
                    if (x < 0) {
                        svgText.remove();
                        drawText_1(sizeMultiplier * 0.8);
                    }
                }
            };
            drawText_1();
            return;
        }
        // Horizontal orientation
        var _j = fretLabelPosition === FretLabelPosition.RIGHT
            ? this.coordinates(endX + padding, y)
            : this.coordinates(startX - padding, y), textX = _j.x, textY = _j.y;
        this.renderer.text(text, textX, textY, size, color, fontFamily, renderer_1.Alignment.MIDDLE, className, true);
    };
    /**
     * Hack to prevent the empty space of the svg from being cut off without having to define a
     * fixed width
     */
    SVGuitarChord.prototype.drawTopEdges = function (y) {
        var _a;
        var orientation = (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        var xTopRight = orientation === Orientation.vertical ? constants_1.constants.width : y;
        this.renderer.circle(0, 0, 0, 0, 'transparent', 'none', 'top-left');
        this.renderer.circle(xTopRight, 0, 0, 0, 'transparent', 'none', 'top-right');
    };
    SVGuitarChord.prototype.drawBackground = function () {
        if (this.settings.backgroundColor) {
            this.renderer.background(this.settings.backgroundColor);
        }
    };
    SVGuitarChord.prototype.drawTopFret = function (y) {
        var _a, _b, _c, _d, _e, _f;
        var stringXpositions = this.stringXPos();
        var strokeWidth = (_a = this.settings.strokeWidth) !== null && _a !== void 0 ? _a : defaultSettings.strokeWidth;
        var topFretWidth = (_b = this.settings.topFretWidth) !== null && _b !== void 0 ? _b : defaultSettings.topFretWidth;
        var startX = stringXpositions[0] - strokeWidth / 2;
        var endX = stringXpositions[stringXpositions.length - 1] + strokeWidth / 2;
        var position = (_d = (_c = this.chordInternal.position) !== null && _c !== void 0 ? _c : this.settings.position) !== null && _d !== void 0 ? _d : defaultSettings.position;
        var color = (_f = (_e = this.settings.fretColor) !== null && _e !== void 0 ? _e : this.settings.color) !== null && _f !== void 0 ? _f : defaultSettings.color;
        var fretSize;
        if (position > 1) {
            fretSize = strokeWidth;
        }
        else {
            fretSize = topFretWidth;
        }
        var _g = this.coordinates(startX, y + fretSize / 2), lineX1 = _g.x, lineY1 = _g.y;
        var _h = this.coordinates(endX, y + fretSize / 2), lineX2 = _h.x, lineY2 = _h.y;
        this.renderer.line(lineX1, lineY1, lineX2, lineY2, fretSize, color, ['top-fret', 'fret-0']);
        return y + fretSize;
    };
    SVGuitarChord.prototype.stringXPos = function () {
        var _a, _b;
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        var sidePadding = (_b = this.settings.sidePadding) !== null && _b !== void 0 ? _b : defaultSettings.sidePadding;
        var startX = constants_1.constants.width * sidePadding;
        var stringsSpacing = this.stringSpacing();
        return range_1.range(strings).map(function (i) { return startX + stringsSpacing * i; });
    };
    SVGuitarChord.prototype.stringSpacing = function () {
        var _a, _b;
        var sidePadding = (_a = this.settings.sidePadding) !== null && _a !== void 0 ? _a : defaultSettings.sidePadding;
        var strings = (_b = this.settings.strings) !== null && _b !== void 0 ? _b : defaultSettings.strings;
        var startX = constants_1.constants.width * sidePadding;
        var endX = constants_1.constants.width - startX;
        var width = endX - startX;
        return width / (strings - 1);
    };
    SVGuitarChord.prototype.fretSpacing = function () {
        var _a;
        var stringSpacing = this.stringSpacing();
        var fretSize = (_a = this.settings.fretSize) !== null && _a !== void 0 ? _a : defaultSettings.fretSize;
        return stringSpacing * fretSize;
    };
    SVGuitarChord.prototype.fretLinesYPos = function (startY) {
        var _a;
        var frets = (_a = this.settings.frets) !== null && _a !== void 0 ? _a : defaultSettings.frets;
        var fretSpacing = this.fretSpacing();
        return range_1.range(frets, 1).map(function (i) { return startY + fretSpacing * i; });
    };
    SVGuitarChord.prototype.toArrayIndex = function (stringIndex) {
        var _a;
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        return Math.abs(stringIndex - strings);
    };
    SVGuitarChord.prototype.drawEmptyStringIndicators = function (y) {
        var _this = this;
        var _a, _b, _c;
        var stringXPositions = this.stringXPos();
        var stringSpacing = this.stringSpacing();
        var emptyStringIndicatorSize = (_a = this.settings.emptyStringIndicatorSize) !== null && _a !== void 0 ? _a : defaultSettings.emptyStringIndicatorSize;
        var size = emptyStringIndicatorSize * stringSpacing;
        // add some space above and below the indicator, relative to the indicator size
        var padding = size / 3;
        var color = (_b = this.settings.color) !== null && _b !== void 0 ? _b : defaultSettings.color;
        var strokeWidth = (_c = this.settings.strokeWidth) !== null && _c !== void 0 ? _c : defaultSettings.strokeWidth;
        var hasEmpty = false;
        this.chordInternal.fingers
            .filter(function (_a) {
            var _b = __read(_a, 2), value = _b[1];
            return value === exports.SILENT || value === exports.OPEN;
        })
            .map(function (_a) {
            var _b = __read(_a, 3), index = _b[0], value = _b[1], textOrOptions = _b[2];
            return [
                _this.toArrayIndex(index),
                value,
                textOrOptions,
            ];
        })
            .forEach(function (_a) {
            var _b, _c, _d, _e, _f, _g;
            var _h = __read(_a, 3), stringIndex = _h[0], value = _h[1], textOrOptions = _h[2];
            hasEmpty = true;
            var fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions);
            var effectiveStrokeWidth = (_b = fingerOptions.strokeWidth) !== null && _b !== void 0 ? _b : strokeWidth;
            var effectiveStrokeColor = (_c = fingerOptions.strokeColor) !== null && _c !== void 0 ? _c : color;
            if (fingerOptions.text) {
                var textColor = (_e = (_d = fingerOptions.textColor) !== null && _d !== void 0 ? _d : _this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
                var textSize = (_f = _this.settings.nutTextSize) !== null && _f !== void 0 ? _f : defaultSettings.nutTextSize;
                var fontFamily = (_g = _this.settings.fontFamily) !== null && _g !== void 0 ? _g : defaultSettings.fontFamily;
                var classNames = [ElementType.STRING_TEXT, ElementType.STRING_TEXT + "-" + stringIndex];
                var _j = _this.coordinates(stringXPositions[stringIndex], y + padding + size / 2), textX = _j.x, textY = _j.y;
                _this.renderer.text(fingerOptions.text, textX, textY, textSize, textColor, fontFamily, renderer_1.Alignment.MIDDLE, classNames, true);
            }
            if (value === exports.OPEN) {
                // draw an O
                var classNames = [ElementType.OPEN_STRING, ElementType.OPEN_STRING + "-" + stringIndex];
                var _k = _this.rectCoordinates(stringXPositions[stringIndex] - size / 2, y + padding, size, size), lineX1 = _k.x, lineY1 = _k.y;
                _this.renderer.circle(lineX1, lineY1, size, effectiveStrokeWidth, effectiveStrokeColor, undefined, classNames);
            }
            else {
                // draw an X
                var classNames = [
                    ElementType.SILENT_STRING,
                    ElementType.SILENT_STRING + "-" + stringIndex,
                ];
                var startX = stringXPositions[stringIndex] - size / 2;
                var endX = startX + size;
                var startY = y + padding;
                var endY = startY + size;
                var _l = _this.coordinates(startX, startY), line1X1 = _l.x, line1Y1 = _l.y;
                var _m = _this.coordinates(endX, endY), line1X2 = _m.x, line1Y2 = _m.y;
                _this.renderer.line(line1X1, line1Y1, line1X2, line1Y2, effectiveStrokeWidth, effectiveStrokeColor, classNames);
                var _o = _this.coordinates(startX, endY), line2X1 = _o.x, line2Y1 = _o.y;
                var _p = _this.coordinates(endX, startY), line2X2 = _p.x, line2Y2 = _p.y;
                _this.renderer.line(line2X1, line2Y1, line2X2, line2Y2, effectiveStrokeWidth, effectiveStrokeColor, classNames);
            }
        });
        return hasEmpty || this.settings.fixedDiagramPosition ? y + size + 2 * padding : y + padding;
    };
    SVGuitarChord.prototype.drawGrid = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var frets = (_a = this.settings.frets) !== null && _a !== void 0 ? _a : defaultSettings.frets;
        var fretSize = (_b = this.settings.fretSize) !== null && _b !== void 0 ? _b : defaultSettings.fretSize;
        var relativeNutSize = (_c = this.settings.nutSize) !== null && _c !== void 0 ? _c : defaultSettings.nutSize;
        var stringXPositions = this.stringXPos();
        var fretYPositions = this.fretLinesYPos(y);
        var stringSpacing = this.stringSpacing();
        var fretSpacing = stringSpacing * fretSize;
        var height = fretSpacing * frets;
        var startX = stringXPositions[0];
        var endX = stringXPositions[stringXPositions.length - 1];
        var nutSize = relativeNutSize * stringSpacing;
        var nutColor = (_e = (_d = this.settings.nutColor) !== null && _d !== void 0 ? _d : this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
        var fretColor = (_g = (_f = this.settings.fretColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var barreChordRadius = (_h = this.settings.barreChordRadius) !== null && _h !== void 0 ? _h : defaultSettings.barreChordRadius;
        var strokeWidth = (_j = this.settings.strokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.strokeWidth;
        var fontFamily = (_k = this.settings.fontFamily) !== null && _k !== void 0 ? _k : defaultSettings.fontFamily;
        var nutTextColor = (_l = this.settings.nutTextColor) !== null && _l !== void 0 ? _l : defaultSettings.nutTextColor;
        var nutTextSize = (_m = this.settings.nutTextSize) !== null && _m !== void 0 ? _m : defaultSettings.nutTextSize;
        // draw frets
        fretYPositions.forEach(function (fretY, i) {
            var classNames = [ElementType.FRET, ElementType.FRET + "-" + i];
            var _a = _this.coordinates(startX, fretY), lineX1 = _a.x, lineY1 = _a.y;
            var _b = _this.coordinates(endX, fretY), lineX2 = _b.x, lineY2 = _b.y;
            _this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames);
        });
        // draw strings
        stringXPositions.forEach(function (stringX, i) {
            var classNames = [ElementType.STRING, ElementType.STRING + "-" + i];
            var _a = _this.coordinates(stringX, y), lineX1 = _a.x, lineY1 = _a.y;
            var _b = _this.coordinates(stringX, y + height + strokeWidth / 2), lineX2 = _b.x, lineY2 = _b.y;
            _this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames);
        });
        // draw barre chords
        this.chordInternal.barres.forEach(function (_a) {
            var _b, _c, _d, _e;
            var fret = _a.fret, fromString = _a.fromString, toString = _a.toString, text = _a.text, color = _a.color, textColor = _a.textColor, strokeColor = _a.strokeColor, className = _a.className, individualBarreChordStrokeWidth = _a.strokeWidth;
            var barreCenterY = fretYPositions[fret - 1] - strokeWidth / 4 - fretSpacing / 2;
            var fromStringX = stringXPositions[_this.toArrayIndex(fromString)];
            var distance = Math.abs(toString - fromString) * stringSpacing;
            var barreChordStrokeColor = (_d = (_c = (_b = strokeColor !== null && strokeColor !== void 0 ? strokeColor : _this.settings.barreChordStrokeColor) !== null && _b !== void 0 ? _b : _this.settings.nutColor) !== null && _c !== void 0 ? _c : _this.settings.color) !== null && _d !== void 0 ? _d : defaultSettings.color;
            var barreChordStrokeWidth = (_e = individualBarreChordStrokeWidth !== null && individualBarreChordStrokeWidth !== void 0 ? individualBarreChordStrokeWidth : _this.settings.barreChordStrokeWidth) !== null && _e !== void 0 ? _e : defaultSettings.barreChordStrokeWidth;
            var classNames = __spread([
                ElementType.BARRE,
                ElementType.BARRE + "-fret-" + (fret - 1)
            ], (className ? [className] : []));
            var barreWidth = distance + stringSpacing / 2;
            var barreHeight = nutSize;
            var _f = _this.rectCoordinates(fromStringX - stringSpacing / 4, barreCenterY - nutSize / 2, barreWidth, barreHeight), rectX = _f.x, rectY = _f.y, rectHeight = _f.height, rectWidth = _f.width;
            _this.renderer.rect(rectX, rectY, rectWidth, rectHeight, barreChordStrokeWidth, barreChordStrokeColor, classNames, color !== null && color !== void 0 ? color : nutColor, nutSize * barreChordRadius);
            // draw text on the barre chord
            if (text) {
                var textClassNames = [ElementType.BARRE_TEXT, ElementType.BARRE_TEXT + "-" + fret];
                var _g = _this.coordinates(fromStringX + distance / 2, barreCenterY), textX = _g.x, textY = _g.y;
                _this.renderer.text(text, textX, textY, nutTextSize, textColor !== null && textColor !== void 0 ? textColor : nutTextColor, fontFamily, renderer_1.Alignment.MIDDLE, textClassNames, true);
            }
        });
        // draw fingers
        this.chordInternal.fingers
            .filter(function (_a) {
            var _b = __read(_a, 2), value = _b[1];
            return value !== exports.SILENT && value !== exports.OPEN;
        })
            .map(function (_a) {
            var _b = __read(_a, 3), stringIndex = _b[0], fretIndex = _b[1], text = _b[2];
            return [
                _this.toArrayIndex(stringIndex),
                fretIndex,
                text,
            ];
        })
            .forEach(function (_a) {
            var _b = __read(_a, 3), stringIndex = _b[0], fretIndex = _b[1], textOrOptions = _b[2];
            var nutCenterX = startX + stringIndex * stringSpacing;
            var nutCenterY = y + fretIndex * fretSpacing - fretSpacing / 2;
            var fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions);
            var classNames = __spread([
                ElementType.FINGER,
                ElementType.FINGER + "-string-" + stringIndex,
                ElementType.FINGER + "-fret-" + (fretIndex - 1),
                ElementType.FINGER + "-string-" + stringIndex + "-fret-" + (fretIndex - 1)
            ], (fingerOptions.className ? [fingerOptions.className] : []));
            // const { x: x0, y: y0 } = this.coordinates(nutCenterX, nutCenterY)
            _this.drawNut(nutCenterX, nutCenterY, nutSize, nutColor, nutTextSize, fontFamily, fingerOptions, classNames);
        });
        return y + height;
    };
    SVGuitarChord.prototype.drawNut = function (x, y, size, color, textSize, fontFamily, fingerOptions, classNames) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var shape = (_a = fingerOptions.shape) !== null && _a !== void 0 ? _a : defaultSettings.shape;
        var nutTextColor = (_c = (_b = fingerOptions.textColor) !== null && _b !== void 0 ? _b : this.settings.nutTextColor) !== null && _c !== void 0 ? _c : defaultSettings.nutTextColor;
        var nutStrokeColor = (_g = (_f = (_e = (_d = fingerOptions.strokeColor) !== null && _d !== void 0 ? _d : this.settings.nutStrokeColor) !== null && _e !== void 0 ? _e : this.settings.nutColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var nutStrokeWidth = (_j = (_h = fingerOptions.strokeWidth) !== null && _h !== void 0 ? _h : this.settings.nutStrokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.nutStrokeWidth;
        var startX = x - size / 2;
        var startY = y - size / 2;
        var classNamesWithShape = __spread(classNames, [ElementType.FINGER + "-" + shape]);
        var _q = this.rectCoordinates(startX, startY, size, size), x0 = _q.x, y0 = _q.y;
        switch (shape) {
            case Shape.CIRCLE:
                this.renderer.circle(x0, y0, size, nutStrokeWidth, nutStrokeColor, (_k = fingerOptions.color) !== null && _k !== void 0 ? _k : color, classNamesWithShape);
                break;
            case Shape.SQUARE:
                this.renderer.rect(x0, y0, size, size, nutStrokeWidth, nutStrokeColor, classNamesWithShape, (_l = fingerOptions.color) !== null && _l !== void 0 ? _l : color);
                break;
            case Shape.TRIANGLE:
                this.renderer.triangle(x0, y0, size, nutStrokeWidth, nutStrokeColor, classNamesWithShape, (_m = fingerOptions.color) !== null && _m !== void 0 ? _m : color);
                break;
            case Shape.PENTAGON:
                this.renderer.pentagon(x0, y0, size, nutStrokeWidth, nutStrokeColor, (_o = fingerOptions.color) !== null && _o !== void 0 ? _o : color, classNamesWithShape);
                break;
            default:
                throw new Error("Invalid shape \"" + fingerOptions.shape + "\". Valid shapes are: " + Object.values(Shape)
                    .map(function (val) { return "\"" + val + "\""; })
                    .join(', ') + ".");
        }
        // draw text on the nut
        var textClassNames = __spread(classNames, [ElementType.FINGER + "-text"]);
        if (fingerOptions.text) {
            var _r = this.coordinates(x, y), textX = _r.x, textY = _r.y;
            this.renderer.text(fingerOptions.text, textX, textY, textSize, (_p = fingerOptions.textColor) !== null && _p !== void 0 ? _p : nutTextColor, fontFamily, renderer_1.Alignment.MIDDLE, textClassNames, true);
        }
    };
    SVGuitarChord.prototype.drawTitle = function (size) {
        var _a, _b, _c, _d, _e;
        var color = (_a = this.settings.color) !== null && _a !== void 0 ? _a : defaultSettings.color;
        var titleBottomMargin = (_b = this.settings.titleBottomMargin) !== null && _b !== void 0 ? _b : defaultSettings.titleBottomMargin;
        var fontFamily = (_c = this.settings.fontFamily) !== null && _c !== void 0 ? _c : defaultSettings.fontFamily;
        // This is somewhat of a hack to get a steady diagram position: If no title is defined we initially
        // render an 'X' and later remove it again. That way we get the same y as if there was a title. I tried
        // just rendering a space but that doesn't work.
        var title = (_e = (_d = this.chordInternal.title) !== null && _d !== void 0 ? _d : this.settings.title) !== null && _e !== void 0 ? _e : (this.settings.fixedDiagramPosition ? 'X' : '');
        // draw the title
        if (this.orientation === Orientation.vertical) {
            var _f = this.renderer.text(title, constants_1.constants.width / 2, 5, size, color, fontFamily, renderer_1.Alignment.MIDDLE, ElementType.TITLE), x = _f.x, y = _f.y, width_1 = _f.width, height_1 = _f.height, remove_1 = _f.remove;
            // check if the title fits. If not, try with a smaller size
            if (x < -0.0001) {
                remove_1();
                // try again with smaller font
                return this.drawTitle(size * (constants_1.constants.width / width_1));
            }
            if (!this.settings.title && this.settings.fixedDiagramPosition) {
                remove_1();
            }
            return y + height_1 + titleBottomMargin;
        }
        // render temporary text to get the height of the title
        var _g = this.renderer.text(title, 0, 0, size, color, fontFamily, renderer_1.Alignment.LEFT, ElementType.TITLE), removeTempText = _g.remove, height = _g.height, width = _g.width;
        removeTempText();
        var _h = this.rectCoordinates(constants_1.constants.width / 2, 5, 0, 0), textX = _h.x, textY = _h.y;
        var remove = this.renderer.text(title, textX, textY, size, color, fontFamily, renderer_1.Alignment.LEFT, ElementType.TITLE, true).remove;
        if (!this.settings.title && this.settings.fixedDiagramPosition) {
            remove();
        }
        return width + titleBottomMargin;
    };
    SVGuitarChord.prototype.clear = function () {
        this.renderer.clear();
    };
    /**
     * Completely remove the diagram from the DOM
     */
    SVGuitarChord.prototype.remove = function () {
        this.renderer.remove();
    };
    /**
     * Helper method to get an options object from the 3rd array value for a finger, that can either
     * be undefined, a string or and options object. This method will return an options object in
     * any case, so it's easier to work with this third value.
     *
     * @param textOrOptions
     */
    SVGuitarChord.getFingerOptions = function (textOrOptions) {
        if (!textOrOptions) {
            return {};
        }
        if (typeof textOrOptions === 'string') {
            return {
                text: textOrOptions,
            };
        }
        return textOrOptions;
    };
    /**
     * rotates x value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.x = function (x, y) {
        return this.orientation === Orientation.vertical ? x : y;
    };
    /**
     * rotates y value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.y = function (x, y) {
        return this.orientation === Orientation.vertical ? y : Math.abs(x - constants_1.constants.width);
    };
    /**
     * rotates coordinates if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.coordinates = function (x, y) {
        return {
            x: this.x(x, y),
            y: this.y(x, y),
        };
    };
    /**
     * rotates coordinates of a rectangle if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @param width width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.rectCoordinates = function (x, y, width, height) {
        if (this.orientation === Orientation.vertical) {
            return {
                x: x,
                y: y,
                width: width,
                height: height,
            };
        }
        return {
            x: this.x(x, y),
            y: this.y(x, y) - width,
            width: this.width(width, height),
            height: this.height(height, width),
        };
    };
    /**
     * rotates height if orientation is horizontal
     *
     * @param height_ height in vertical orientation
     * @param width width in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.height = function (height_, width) {
        return this.orientation === Orientation.vertical ? height_ : width;
    };
    /**
     * rotates width if orientation is horizontal
     *
     * @param width_ width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.width = function (width_, height) {
        return this.orientation === Orientation.horizontal ? height : width_;
    };
    Object.defineProperty(SVGuitarChord.prototype, "orientation", {
        get: function () {
            var _a;
            return (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        },
        enumerable: false,
        configurable: true
    });
    SVGuitarChord.plugins = [];
    return SVGuitarChord;
}());
exports.SVGuitarChord = SVGuitarChord;
//# sourceMappingURL=svguitar.js.map