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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGuitarChord = exports.ElementType = exports.Orientation = exports.ChordStyle = exports.Shape = exports.FretLabelPosition = exports.SILENT = exports.OPEN = void 0;
var constants_1 = require("./constants");
var renderer_1 = require("./renderer");
var range_1 = require("./utils/range");
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
    ElementType["WATERMARK"] = "watermark";
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
    fingerSize: 0.65,
    fingerTextColor: '#FFF',
    fingerTextSize: 24,
    fingerStrokeWidth: 0,
    barreChordStrokeWidth: 0,
    sidePadding: 0.2,
    titleFontSize: 48,
    titleBottomMargin: 0,
    color: '#000',
    emptyStringIndicatorSize: 0.6,
    strokeWidth: 2,
    nutWidth: 10,
    fretSize: 1.5,
    barreChordRadius: 0.25,
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    shape: Shape.CIRCLE,
    orientation: Orientation.vertical,
    watermarkFontSize: 12,
    noPosition: false,
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
                        throw new Error("".concat(style, " is not a valid chord diagram style."));
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
        if (this.settings.svgTitle) {
            this.renderer.title(this.settings.svgTitle);
        }
        var y;
        y = this.drawTitle((_a = this.settings.titleFontSize) !== null && _a !== void 0 ? _a : defaultSettings.titleFontSize);
        y = this.drawEmptyStringIndicators(y);
        y = this.drawTopFret(y);
        this.drawPosition(y);
        y = this.drawGrid(y);
        y = this.drawTunings(y);
        y = this.drawWatermark(y);
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
        if (typeof settings.fingerSize !== 'undefined' && settings.fingerSize < 0) {
            throw new Error('Finger size cannot be smaller than 0');
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
                var classNames = [ElementType.TUNING, "".concat(ElementType.TUNING, "-").concat(i)];
                var _a = _this.coordinates(stringXPositions[i], y + padding), textX = _a.x, textY = _a.y;
                var tuningText = _this.renderer.text(tuning_, textX, textY, tuningsFontSize, color, fontFamily, renderer_1.Alignment.MIDDLE, classNames, true);
                if (tuning_) {
                    text = tuningText;
                }
            }
        });
        if (text) {
            return y + this.height(text.height, text.width);
        }
        return y;
    };
    SVGuitarChord.prototype.drawWatermark = function (y) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this.settings.watermark) {
            return y;
        }
        var padding = this.fretSpacing() / 5;
        var orientation = (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        var stringXPositions = this.stringXPos();
        var endX = stringXPositions[stringXPositions.length - 1];
        var startX = stringXPositions[0];
        var color = (_c = (_b = this.settings.watermarkColor) !== null && _b !== void 0 ? _b : this.settings.color) !== null && _c !== void 0 ? _c : defaultSettings.color;
        var fontSize = (_d = this.settings.watermarkFontSize) !== null && _d !== void 0 ? _d : defaultSettings.watermarkFontSize;
        var fontFamily = (_f = (_e = this.settings.watermarkFontFamily) !== null && _e !== void 0 ? _e : this.settings.fontFamily) !== null && _f !== void 0 ? _f : defaultSettings.fontFamily;
        var textX;
        var textY;
        if (orientation === Orientation.vertical) {
            textX = startX + (endX - startX) / 2;
            textY = y + padding;
        }
        else {
            var lastFret = y;
            var firstFret = y - ((_g = this.settings.frets) !== null && _g !== void 0 ? _g : defaultSettings.frets) * this.fretSpacing();
            textX = firstFret + (lastFret - firstFret) / 2;
            textY = this.y(startX, 0) + padding;
        }
        var height = this.renderer.text(this.settings.watermark, textX, textY, fontSize, color, fontFamily, renderer_1.Alignment.MIDDLE, ElementType.WATERMARK).height;
        return y + height * 2;
    };
    SVGuitarChord.prototype.drawPosition = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var position = (_b = (_a = this.chordInternal.position) !== null && _a !== void 0 ? _a : this.settings.position) !== null && _b !== void 0 ? _b : defaultSettings.position;
        var noPosition = (_c = this.settings.noPosition) !== null && _c !== void 0 ? _c : defaultSettings.noPosition;
        if (position <= 1 || noPosition) {
            return;
        }
        var stringXPositions = this.stringXPos();
        var endX = stringXPositions[stringXPositions.length - 1];
        var startX = stringXPositions[0];
        var text = "".concat(position, "fr");
        var size = (_d = this.settings.fretLabelFontSize) !== null && _d !== void 0 ? _d : defaultSettings.fretLabelFontSize;
        var color = (_f = (_e = this.settings.fretLabelColor) !== null && _e !== void 0 ? _e : this.settings.color) !== null && _f !== void 0 ? _f : defaultSettings.color;
        var fingerSize = this.stringSpacing() * ((_g = this.settings.fingerSize) !== null && _g !== void 0 ? _g : defaultSettings.fingerSize);
        var fontFamily = (_h = this.settings.fontFamily) !== null && _h !== void 0 ? _h : defaultSettings.fontFamily;
        var fretLabelPosition = (_j = this.settings.fretLabelPosition) !== null && _j !== void 0 ? _j : defaultSettings.fretLabelPosition;
        // add some padding relative to the string spacing. Also make sure the padding is at least
        // 1/2 fingerSize plus some padding to prevent the finger overlapping the position label.
        var padding = Math.max(this.stringSpacing() / 5, fingerSize / 2 + 5);
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
        var _k = fretLabelPosition === FretLabelPosition.RIGHT
            ? this.coordinates(endX + padding, y)
            : this.coordinates(startX - padding, y), textX = _k.x, textY = _k.y;
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var stringXpositions = this.stringXPos();
        var strokeWidth = (_a = this.settings.strokeWidth) !== null && _a !== void 0 ? _a : defaultSettings.strokeWidth;
        var nutWidth = (_c = (_b = this.settings.topFretWidth) !== null && _b !== void 0 ? _b : this.settings.nutWidth) !== null && _c !== void 0 ? _c : defaultSettings.nutWidth;
        var startX = stringXpositions[0] - strokeWidth / 2;
        var endX = stringXpositions[stringXpositions.length - 1] + strokeWidth / 2;
        var position = (_e = (_d = this.chordInternal.position) !== null && _d !== void 0 ? _d : this.settings.position) !== null && _e !== void 0 ? _e : defaultSettings.position;
        var color = (_g = (_f = this.settings.fretColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var noPositon = (_h = this.settings.noPosition) !== null && _h !== void 0 ? _h : defaultSettings.noPosition;
        var fretSize;
        if (position > 1 || noPositon) {
            fretSize = strokeWidth;
        }
        else {
            fretSize = nutWidth;
        }
        var _j = this.coordinates(startX, y + fretSize / 2), lineX1 = _j.x, lineY1 = _j.y;
        var _k = this.coordinates(endX, y + fretSize / 2), lineX2 = _k.x, lineY2 = _k.y;
        this.renderer.line(lineX1, lineY1, lineX2, lineY2, fretSize, color, ['top-fret', 'fret-0']);
        return y + fretSize;
    };
    SVGuitarChord.prototype.stringXPos = function () {
        var _a, _b;
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        var sidePadding = (_b = this.settings.sidePadding) !== null && _b !== void 0 ? _b : defaultSettings.sidePadding;
        var startX = constants_1.constants.width * sidePadding;
        var stringsSpacing = this.stringSpacing();
        return (0, range_1.range)(strings).map(function (i) { return startX + stringsSpacing * i; });
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
        return (0, range_1.range)(frets, 1).map(function (i) { return startY + fretSpacing * i; });
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
                var textSize = (_f = _this.settings.fingerTextSize) !== null && _f !== void 0 ? _f : defaultSettings.fingerTextSize;
                var fontFamily = (_g = _this.settings.fontFamily) !== null && _g !== void 0 ? _g : defaultSettings.fontFamily;
                var classNames = [ElementType.STRING_TEXT, "".concat(ElementType.STRING_TEXT, "-").concat(stringIndex)];
                var _j = _this.coordinates(stringXPositions[stringIndex], y + padding + size / 2), textX = _j.x, textY = _j.y;
                _this.renderer.text(fingerOptions.text, textX, textY, textSize, textColor, fontFamily, renderer_1.Alignment.MIDDLE, classNames, true);
            }
            if (value === exports.OPEN) {
                // draw an O
                var classNames = [ElementType.OPEN_STRING, "".concat(ElementType.OPEN_STRING, "-").concat(stringIndex)];
                var _k = _this.rectCoordinates(stringXPositions[stringIndex] - size / 2, y + padding, size, size), lineX1 = _k.x, lineY1 = _k.y;
                _this.renderer.circle(lineX1, lineY1, size, effectiveStrokeWidth, effectiveStrokeColor, undefined, classNames);
            }
            else {
                // draw an X
                var classNames = [
                    ElementType.SILENT_STRING,
                    "".concat(ElementType.SILENT_STRING, "-").concat(stringIndex),
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
        var relativefingerSize = (_c = this.settings.fingerSize) !== null && _c !== void 0 ? _c : defaultSettings.fingerSize;
        var stringXPositions = this.stringXPos();
        var fretYPositions = this.fretLinesYPos(y);
        var stringSpacing = this.stringSpacing();
        var fretSpacing = stringSpacing * fretSize;
        var height = fretSpacing * frets;
        var startX = stringXPositions[0];
        var endX = stringXPositions[stringXPositions.length - 1];
        var fingerSize = relativefingerSize * stringSpacing;
        var fingerColor = (_e = (_d = this.settings.fingerColor) !== null && _d !== void 0 ? _d : this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
        var fretColor = (_g = (_f = this.settings.fretColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var barreChordRadius = (_h = this.settings.barreChordRadius) !== null && _h !== void 0 ? _h : defaultSettings.barreChordRadius;
        var strokeWidth = (_j = this.settings.strokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.strokeWidth;
        var fontFamily = (_k = this.settings.fontFamily) !== null && _k !== void 0 ? _k : defaultSettings.fontFamily;
        var fingerTextColor = (_l = this.settings.fingerTextColor) !== null && _l !== void 0 ? _l : defaultSettings.fingerTextColor;
        var fingerTextSize = (_m = this.settings.fingerTextSize) !== null && _m !== void 0 ? _m : defaultSettings.fingerTextSize;
        // draw frets
        fretYPositions.forEach(function (fretY, i) {
            var classNames = [ElementType.FRET, "".concat(ElementType.FRET, "-").concat(i)];
            var _a = _this.coordinates(startX, fretY), lineX1 = _a.x, lineY1 = _a.y;
            var _b = _this.coordinates(endX, fretY), lineX2 = _b.x, lineY2 = _b.y;
            _this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames);
        });
        // draw strings
        stringXPositions.forEach(function (stringX, i) {
            var classNames = [ElementType.STRING, "".concat(ElementType.STRING, "-").concat(i)];
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
            var barreChordStrokeColor = (_d = (_c = (_b = strokeColor !== null && strokeColor !== void 0 ? strokeColor : _this.settings.barreChordStrokeColor) !== null && _b !== void 0 ? _b : _this.settings.fingerColor) !== null && _c !== void 0 ? _c : _this.settings.color) !== null && _d !== void 0 ? _d : defaultSettings.color;
            var barreChordStrokeWidth = (_e = individualBarreChordStrokeWidth !== null && individualBarreChordStrokeWidth !== void 0 ? individualBarreChordStrokeWidth : _this.settings.barreChordStrokeWidth) !== null && _e !== void 0 ? _e : defaultSettings.barreChordStrokeWidth;
            var classNames = __spreadArray([
                ElementType.BARRE,
                "".concat(ElementType.BARRE, "-fret-").concat(fret - 1)
            ], __read((className ? [className] : [])), false);
            var barreWidth = distance + stringSpacing / 2;
            var barreHeight = fingerSize;
            var _f = _this.rectCoordinates(fromStringX - stringSpacing / 4, barreCenterY - fingerSize / 2, barreWidth, barreHeight), rectX = _f.x, rectY = _f.y, rectHeight = _f.height, rectWidth = _f.width;
            _this.renderer.rect(rectX, rectY, rectWidth, rectHeight, barreChordStrokeWidth, barreChordStrokeColor, classNames, color !== null && color !== void 0 ? color : fingerColor, fingerSize * barreChordRadius);
            // draw text on the barre chord
            if (text) {
                var textClassNames = [ElementType.BARRE_TEXT, "".concat(ElementType.BARRE_TEXT, "-").concat(fret)];
                var _g = _this.coordinates(fromStringX + distance / 2, barreCenterY), textX = _g.x, textY = _g.y;
                _this.renderer.text(text, textX, textY, fingerTextSize, textColor !== null && textColor !== void 0 ? textColor : fingerTextColor, fontFamily, renderer_1.Alignment.MIDDLE, textClassNames, true);
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
            var fingerCenterX = startX + stringIndex * stringSpacing;
            var fingerCenterY = y + fretIndex * fretSpacing - fretSpacing / 2;
            var fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions);
            var classNames = __spreadArray([
                ElementType.FINGER,
                "".concat(ElementType.FINGER, "-string-").concat(stringIndex),
                "".concat(ElementType.FINGER, "-fret-").concat(fretIndex - 1),
                "".concat(ElementType.FINGER, "-string-").concat(stringIndex, "-fret-").concat(fretIndex - 1)
            ], __read((fingerOptions.className ? [fingerOptions.className] : [])), false);
            // const { x: x0, y: y0 } = this.coordinates(fingerCenterX, fingerCenterY)
            _this.drawFinger(fingerCenterX, fingerCenterY, fingerSize, fingerColor, fingerTextSize, fontFamily, fingerOptions, classNames);
        });
        return y + height;
    };
    SVGuitarChord.prototype.drawFinger = function (x, y, size, color, textSize, fontFamily, fingerOptions, classNames) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var shape = (_a = fingerOptions.shape) !== null && _a !== void 0 ? _a : defaultSettings.shape;
        var fingerTextColor = (_c = (_b = fingerOptions.textColor) !== null && _b !== void 0 ? _b : this.settings.fingerTextColor) !== null && _c !== void 0 ? _c : defaultSettings.fingerTextColor;
        var fingerStrokeColor = (_g = (_f = (_e = (_d = fingerOptions.strokeColor) !== null && _d !== void 0 ? _d : this.settings.fingerStrokeColor) !== null && _e !== void 0 ? _e : this.settings.fingerColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var fingerStrokeWidth = (_j = (_h = fingerOptions.strokeWidth) !== null && _h !== void 0 ? _h : this.settings.fingerStrokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.fingerStrokeWidth;
        var startX = x - size / 2;
        var startY = y - size / 2;
        var classNamesWithShape = __spreadArray(__spreadArray([], __read(classNames), false), ["".concat(ElementType.FINGER, "-").concat(shape)], false);
        var _q = this.rectCoordinates(startX, startY, size, size), x0 = _q.x, y0 = _q.y;
        switch (shape) {
            case Shape.CIRCLE:
                this.renderer.circle(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, (_k = fingerOptions.color) !== null && _k !== void 0 ? _k : color, classNamesWithShape);
                break;
            case Shape.SQUARE:
                this.renderer.rect(x0, y0, size, size, fingerStrokeWidth, fingerStrokeColor, classNamesWithShape, (_l = fingerOptions.color) !== null && _l !== void 0 ? _l : color);
                break;
            case Shape.TRIANGLE:
                this.renderer.triangle(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, classNamesWithShape, (_m = fingerOptions.color) !== null && _m !== void 0 ? _m : color);
                break;
            case Shape.PENTAGON:
                this.renderer.pentagon(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, (_o = fingerOptions.color) !== null && _o !== void 0 ? _o : color, classNamesWithShape);
                break;
            default:
                throw new Error("Invalid shape \"".concat(fingerOptions.shape, "\". Valid shapes are: ").concat(Object.values(Shape)
                    .map(function (val) { return "\"".concat(val, "\""); })
                    .join(', '), "."));
        }
        // draw text on the finger
        var textClassNames = __spreadArray(__spreadArray([], __read(classNames), false), ["".concat(ElementType.FINGER, "-text")], false);
        if (fingerOptions.text) {
            var _r = this.coordinates(x, y), textX = _r.x, textY = _r.y;
            this.renderer.text(fingerOptions.text, textX, textY, textSize, (_p = fingerOptions.textColor) !== null && _p !== void 0 ? _p : fingerTextColor, fontFamily, renderer_1.Alignment.MIDDLE, textClassNames, true);
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
            var _f = this.renderer.text(title, constants_1.constants.width / 2, 5, size, color, fontFamily, renderer_1.Alignment.MIDDLE, ElementType.TITLE), x = _f.x, y = _f.y, width_1 = _f.width, height = _f.height, remove_1 = _f.remove;
            // check if the title fits. If not, try with a smaller size
            if (x < -0.0001) {
                remove_1();
                // try again with smaller font
                return this.drawTitle(size * (constants_1.constants.width / width_1) * 0.97);
            }
            if (!this.settings.title && this.settings.fixedDiagramPosition) {
                remove_1();
            }
            return y + height + titleBottomMargin;
        }
        // render temporary text to get the height of the title
        var _g = this.renderer.text(title, 0, 0, size, color, fontFamily, renderer_1.Alignment.LEFT, ElementType.TITLE), removeTempText = _g.remove, width = _g.width;
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