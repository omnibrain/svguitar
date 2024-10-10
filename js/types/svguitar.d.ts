import { QuerySelector } from '@svgdotjs/svg.js';
import { AnyFunction, ApiExtension, Constructor, ReturnTypeOf, SVGuitarPlugin, UnionToIntersection } from './plugin';
import { Alignment, GraphcisElement, Renderer, RoughJsRenderer, SvgJsRenderer } from './renderer';
export type { Constructor, ReturnTypeOf, SVGuitarPlugin, Renderer, Alignment, GraphcisElement, RoughJsRenderer, SvgJsRenderer, ApiExtension, AnyFunction, UnionToIntersection, };
export declare type SilentString = 'x';
export declare type OpenString = 0;
export declare type Finger = [number, number | OpenString | SilentString, (string | FingerOptions)?];
export declare type Barre = {
    fromString: number;
    toString: number;
    fret: number;
    text?: string;
    color?: string;
    textColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
    className?: string;
};
export declare type Chord = {
    /**
     * The fingers
     */
    fingers: Finger[];
    /**
     * The barre chords
     */
    barres: Barre[];
    /**
     * Position (defaults to 1). Can also be provided via {@link ChordSettings}.
     */
    position?: number;
    /**
     * Title of the chart. Can also be provided via {@link ChordSettings}.
     */
    title?: string;
};
export interface FingerOptions {
    text?: string;
    color?: string;
    textColor?: string;
    shape?: Shape;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
}
/**
 * Value for an open string (O)
 */
export declare const OPEN: OpenString;
/**
 * Value for a silent string (X)
 */
export declare const SILENT: SilentString;
/**
 * Possible positions of the fret label (eg. "3fr").
 */
export declare enum FretLabelPosition {
    LEFT = "left",
    RIGHT = "right"
}
export declare type FretMarker = DoubleFretMarker | SingleFretMarker | number;
export interface SingleFretMarker {
    /**
     * Position of the fret marker. Starts at 0.
     * Position of 0 means between fret 0 and 1.
     */
    fret: number;
    /**
     * The color of the fret marker.
     */
    color?: string;
    /**
     * The stroke color of the fret marker.
     */
    strokeColor?: string;
    /**
     * The stroke color of the fret marker.
     */
    strokeWidth?: number;
    /**
     * Shape of the fret marker. Defaults to {@link Shape.CIRCLE}
     */
    shape?: Shape;
    /**
     * The relative size of a fret marker
     */
    size?: number;
    /**
     * Class name on the fret markers
     */
    className?: string;
}
export interface DoubleFretMarker extends SingleFretMarker {
    /**
     * Set to true if there should be two fret markers at this position
     */
    double: true;
    /**
     * Distance between double fret markers.
     * Overrides the default {@link ChordSettings#doubleFretMarkerDistance}
     */
    distance?: number;
}
export declare enum Shape {
    CIRCLE = "circle",
    SQUARE = "square",
    TRIANGLE = "triangle",
    PENTAGON = "pentagon"
}
export declare enum ChordStyle {
    normal = "normal",
    handdrawn = "handdrawn"
}
export declare enum Orientation {
    vertical = "vertical",
    horizontal = "horizontal"
}
export declare enum ElementType {
    FRET = "fret",
    STRING = "string",
    BARRE = "barre",
    BARRE_TEXT = "barre-text",
    FINGER = "finger",
    TITLE = "title",
    TUNING = "tuning",
    FRET_POSITION = "fret-position",
    FRET_MARKER = "fret-marker",
    STRING_TEXT = "string-text",
    SILENT_STRING = "silent-string",
    OPEN_STRING = "open-string",
    WATERMARK = "watermark"
}
export interface ChordSettings {
    /**
     * Orientation of the chord diagram. Chose between "vertical" or "horizontal". Defaults to "vertical".
     */
    orientation?: Orientation;
    /**
     * Style of the chord diagram. Currently you can chose between "normal" and "handdrawn".
     */
    style?: ChordStyle;
    /**
     * The number of strings
     */
    strings?: number;
    /**
     * The number of frets
     */
    frets?: number;
    /**
     * The fret markers
     */
    fretMarkers?: FretMarker[];
    /**
     * Flag to show or disable all fret markers globally. This is just for convenience.
     * The fret markers can also be removed by not setting the {@link fretMarkers} property.
     */
    showFretMarkers?: boolean;
    /**
     * The {@link Shape} of the fret markets. Applies to all fret markets unless overridden
     * on specific fret markers.
     */
    fretMarkerShape?: Shape;
    /**
     * The size of a fret marker. This is relative to the space between two strings, so
     * a value of 1 means a fret marker spans from one string to another.
     */
    fretMarkerSize?: number;
    /**
     * The color of the fret markers.
     */
    fretMarkerColor?: string;
    /**
     * The stroke color of the fret markers. By default, the fret markets have no border.
     */
    fretMarkerStrokeColor?: string;
    /**
     * The stroke width of the fret markers. By default, the fret markets have no border.
     */
    fretMarkerStrokeWidth?: number;
    /**
     * The distance between the double fret markers, relative to the width
     * of the whole neck. E.g. 0.5 means the distance between the fret markers
     * is equivalent to 0.5 times the width of the whole neck.
     */
    doubleFretMarkerDistance?: number;
    /**
     * The starting fret (first fret is 1). The position can also be provided with the {@link Chord}.
     * If the position is provided via the chord, this value will be ignored.
     */
    position?: number;
    /**
     * These are the labels under the strings. Can be any string.
     */
    tuning?: string[];
    /**
     * The position of the fret label (eg. "3fr")
     */
    fretLabelPosition?: FretLabelPosition;
    /**
     * The font size of the fret label
     */
    fretLabelFontSize?: number;
    /**
     * The font size of the string labels
     */
    tuningsFontSize?: number;
    /**
     * Size of a finger relative to the string spacing
     */
    fingerSize?: number;
    /**
     * Color of a finger
     */
    fingerColor?: string;
    /**
     * The color of text inside fingers or barres
     */
    fingerTextColor?: string;
    /**
     * The size of text inside fingers or barres
     */
    fingerTextSize?: number;
    /**
     * stroke color of a finger. Defaults to the finger color if not set
     */
    fingerStrokeColor?: string;
    /**
     * stroke width of a finger or barre
     */
    fingerStrokeWidth?: number;
    /**
     * stroke color of a barre chord. Defaults to the finger color if not set
     */
    barreChordStrokeColor?: string;
    /**
     * stroke width of a barre chord
     */
    barreChordStrokeWidth?: number;
    /**
     * Height of a fret, relative to the space between two strings
     */
    fretSize?: number;
    /**
     * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
     * This is only applied if it's larger than the letters inside of the padding (eg the starting
     * fret)
     */
    sidePadding?: number;
    /**
     * The font family used for all letters and numbers. Please not that when using the 'handdrawn'
     * chord diagram style setting the font family has no effect.
     */
    fontFamily?: string;
    /**
     * The title of the diagram. The title can also be provided with the {@link Chord}.
     * If the title is provided in the chord, this value will be ignored.
     */
    title?: string;
    /**
     * Font size of the title. This is only the initial font size. If the title doesn't fit, the title
     * is automatically scaled so that it fits.
     */
    titleFontSize?: number;
    /**
     * Space between the title and the chord diagram
     */
    titleBottomMargin?: number;
    /**
     * Global color of the whole diagram. Can be overridden with more specific color settings such as
     * @link titleColor or @link stringColor etc.
     */
    color?: string;
    /**
     * The background color of the chord diagram. By default the background is transparent. To set the
     * background to transparent either set this to 'none' or undefined
     */
    backgroundColor?: string;
    /**
     * The color of the title (overrides color)
     */
    titleColor?: string;
    /**
     * The color of the strings (overrides color)
     */
    stringColor?: string;
    /**
     * The color of the fret position (overrides color)
     */
    fretLabelColor?: string;
    /**
     * The color of the tunings (overrides color)
     */
    tuningsColor?: string;
    /**
     * The color of the frets (overrides color)
     */
    fretColor?: string;
    /**
     * Barre chord rectangle border radius relative to the fingerSize (eg. 1 means completely round
     * edges, 0 means not rounded at all)
     */
    barreChordRadius?: number;
    /**
     * Size of the Xs and Os above empty strings relative to the space between two strings
     */
    emptyStringIndicatorSize?: number;
    /**
     * Global stroke width
     */
    strokeWidth?: number;
    /**
     * The width of the nut (only used if position is 1)
     */
    nutWidth?: number;
    /**
     * The width of the nut (only used if position is 1). If `nutWidth` is set, this value will be ignored.
     *
     * @deprecated Use `nutWidth` instead. This will be removed in the next major version.
     */
    topFretWidth?: number;
    /**
     * If this is set to true, the fret (eg. 3fr) will not be shown. If the position is 1 the
     * nut will have the same width as all other frets.
     */
    noPosition?: boolean;
    /**
     * When set to true the distance between the chord diagram and the top of the SVG stayes the same,
     * no matter if a title is defined or not.
     */
    fixedDiagramPosition?: boolean;
    /**
     * Text of the watermark
     */
    watermark?: string;
    /**
     * Font size of the watermark
     */
    watermarkFontSize?: number;
    /**
     * Color of the watermark (overrides color)
     */
    watermarkColor?: string;
    /**
     * Font-family of the watermark (overrides fontFamily)
     */
    watermarkFontFamily?: string;
    /**
     * The title of the SVG. This is not visible in the SVG, but can be used for accessibility.
     */
    svgTitle?: string;
}
export declare class SVGuitarChord {
    private container;
    static plugins: SVGuitarPlugin[];
    static plugin<S extends Constructor<any> & {
        plugins: any[];
    }, T extends SVGuitarPlugin | SVGuitarPlugin[]>(this: S, plugin: T): {
        new (...args: any[]): {
            [x: string]: any;
        };
        plugins: any[];
    } & S & Constructor<ReturnTypeOf<T>>;
    private rendererInternal?;
    private settings;
    private chordInternal;
    constructor(container: QuerySelector | HTMLElement);
    private get renderer();
    configure(settings: ChordSettings): SVGuitarChord;
    chord(chord: Chord): SVGuitarChord;
    draw(): {
        width: number;
        height: number;
    };
    static sanityCheckSettings(settings: Partial<ChordSettings>): void;
    private drawTunings;
    private drawWatermark;
    private drawPosition;
    /**
     * Hack to prevent the empty space of the svg from being cut off without having to define a
     * fixed width
     */
    private drawTopEdges;
    private drawBackground;
    private drawTopFret;
    private stringXPos;
    private numStrings;
    private numFrets;
    private stringSpacing;
    private fretSpacing;
    private fretLinesYPos;
    private toArrayIndex;
    private drawEmptyStringIndicators;
    private drawGrid;
    private drawFretMarker;
    private drawFinger;
    private drawShape;
    private drawTitle;
    clear(): void;
    /**
     * Completely remove the diagram from the DOM
     */
    remove(): void;
    /**
     * Helper method to get an options object from the 3rd array value for a finger, that can either
     * be undefined, a string or and options object. This method will return an options object in
     * any case, so it's easier to work with this third value.
     *
     * @param textOrOptions
     */
    private static getFingerOptions;
    /**
     * rotates x value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    private x;
    /**
     * rotates y value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    private y;
    /**
     * rotates coordinates if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    private coordinates;
    /**
     * rotates coordinates of a rectangle if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @param width width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    private rectCoordinates;
    /**
     * rotates height if orientation is horizontal
     *
     * @param height_ height in vertical orientation
     * @param width width in vertical orientation
     * @returns
     */
    private height;
    /**
     * rotates width if orientation is horizontal
     *
     * @param width_ width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    private width;
    private get orientation();
}
