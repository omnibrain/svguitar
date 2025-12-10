/* eslint-disable max-classes-per-file */
import { QuerySelector } from '@svgdotjs/svg.js'
import { constants } from './constants'
import {
  AnyFunction,
  ApiExtension,
  Constructor,
  ReturnTypeOf,
  SVGuitarPlugin,
  UnionToIntersection,
} from './plugin'
import { Alignment, GraphcisElement, Renderer, RoughJsRenderer, SvgJsRenderer } from './renderer'
import { range } from './utils/range'
import { ArcDirection } from './renderer/renderer'

// export types for Typedoc
export type {
  Constructor,
  ReturnTypeOf,
  SVGuitarPlugin,
  Renderer,
  Alignment,
  GraphcisElement,
  RoughJsRenderer,
  SvgJsRenderer,
  ApiExtension,
  AnyFunction,
  UnionToIntersection,
}

// Chord diagram input types (compatible with Vexchords input, see https://github.com/0xfe/vexchords)
export type SilentString = 'x'
export type OpenString = 0
export type Finger = [number, number | OpenString | SilentString, (string | FingerOptions)?]
export enum BarreChordStyle {
  RECTANGLE = 'rectangle',
  ARC = 'arc',
}
export type Barre = {
  fromString: number
  toString: number
  fret: number
  style?: BarreChordStyle
  text?: string
  color?: string
  textColor?: string
  strokeWidth?: number
  strokeColor?: string
  className?: string
}

export type Chord = {
  /**
   * The fingers
   */
  fingers: Finger[]

  /**
   * The barre chords
   */
  barres: Barre[]
  /**
   * Position (defaults to 1). Can also be provided via {@link ChordSettings}.
   */
  position?: number
  /**
   * Title of the chart. Can also be provided via {@link ChordSettings}.
   */
  title?: string
}

export interface FingerOptions {
  text?: string
  color?: string
  textColor?: string
  shape?: Shape
  strokeColor?: string
  strokeWidth?: number
  className?: string
}

/**
 * Value for an open string (O)
 */
export const OPEN: OpenString = 0

/**
 * Value for a silent string (X)
 */
export const SILENT: SilentString = 'x'

/**
 * Possible positions of the fret label (eg. "3fr").
 */
export enum FretLabelPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export type FretMarker = DoubleFretMarker | SingleFretMarker | number

export interface SingleFretMarker {
  /**
   * Position of the fret marker. Starts at 0.
   * Position of 0 means between fret 0 and 1.
   */
  fret: number,

  /**
   * The color of the fret marker.
   */
  color?: string,

  /**
   * The stroke color of the fret marker.
   */
  strokeColor?: string,
  /**
   * The stroke color of the fret marker.
   */
  strokeWidth?: number,

  /**
   * Shape of the fret marker. Defaults to {@link Shape.CIRCLE}
   */
  shape?: Shape

  /**
   * The relative size of a fret marker
   */
  size?: number

  /**
   * Class name on the fret markers
   */
  className?: string
}
export interface DoubleFretMarker extends SingleFretMarker {
  /**
   * Set to true if there should be two fret markers at this position
   */
  double: true

  /**
   * Distance between double fret markers.
   * Overrides the default {@link ChordSettings#doubleFretMarkerDistance}
   */
  distance?: number
}

export enum Shape {
  CIRCLE = 'circle',
  SQUARE = 'square',
  TRIANGLE = 'triangle',
  PENTAGON = 'pentagon',
}

export enum ChordStyle {
  normal = 'normal',
  handdrawn = 'handdrawn',
}

export enum Orientation {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum ElementType {
  FRET = 'fret',
  STRING = 'string',
  BARRE = 'barre',
  BARRE_TEXT = 'barre-text',
  FINGER = 'finger',
  TITLE = 'title',
  TUNING = 'tuning',
  FRET_POSITION = 'fret-position',
  FRET_MARKER = 'fret-marker',
  STRING_TEXT = 'string-text',
  SILENT_STRING = 'silent-string',
  OPEN_STRING = 'open-string',
  WATERMARK = 'watermark',
}

export interface ChordSettings {
  /**
   * Orientation of the chord diagram. Chose between "vertical" or "horizontal". Defaults to "vertical".
   */
  orientation?: Orientation

  /**
   * Style of the chord diagram. Currently you can chose between "normal" and "handdrawn".
   */
  style?: ChordStyle

  /**
   * The number of strings
   */
  strings?: number

  /**
   * The number of frets
   */
  frets?: number,

  /**
   * The fret markers
   */
  fretMarkers?: FretMarker[]

  /**
   * Flag to show or disable all fret markers globally. This is just for convenience.
   * The fret markers can also be removed by not setting the {@link fretMarkers} property.
   */
  showFretMarkers?: boolean,

  /**
   * The {@link Shape} of the fret markets. Applies to all fret markets unless overridden
   * on specific fret markers.
   */
  fretMarkerShape?: Shape,

  /**
   * The size of a fret marker. This is relative to the space between two strings, so
   * a value of 1 means a fret marker spans from one string to another.
   */
  fretMarkerSize?: number,

  /**
   * The color of the fret markers.
   */
  fretMarkerColor?: string,

  /**
   * The stroke color of the fret markers. By default, the fret markets have no border.
   */
  fretMarkerStrokeColor?: string,

  /**
   * The stroke width of the fret markers. By default, the fret markets have no border.
   */
  fretMarkerStrokeWidth?: number,

  /**
   * The distance between the double fret markers, relative to the width
   * of the whole neck. E.g. 0.5 means the distance between the fret markers
   * is equivalent to 0.5 times the width of the whole neck.
   */
  doubleFretMarkerDistance?: number

  /**
   * The starting fret (first fret is 1). The position can also be provided with the {@link Chord}.
   * If the position is provided via the chord, this value will be ignored.
   */
  position?: number

  /**
   * These are the labels under the strings. Can be any string.
   */
  tuning?: string[]

  /**
   * The position of the fret label (eg. "3fr")
   */
  fretLabelPosition?: FretLabelPosition

  /**
   * The font size of the fret label
   */
  fretLabelFontSize?: number

  /**
   * The font size of the string labels
   */
  tuningsFontSize?: number

  /**
   * Size of a finger relative to the string spacing
   */
  fingerSize?: number

  /**
   * Color of a finger
   */
  fingerColor?: string

  /**
   * The color of text inside fingers or barres
   */
  fingerTextColor?: string

  /**
   * The size of text inside fingers or barres
   */
  fingerTextSize?: number

  /**
   * stroke color of a finger. Defaults to the finger color if not set
   */
  fingerStrokeColor?: string

  /**
   * stroke width of a finger or barre
   */
  fingerStrokeWidth?: number

  /**
   * style of barre chords. Can be either 'rectangle' (default) or 'arc'.
   * Can be changed for each barre individually as well with the `style` option.
   */
  barreChordStyle?: BarreChordStyle,

  /**
   * stroke color of a barre chord. Defaults to the finger color if not set
   */
  barreChordStrokeColor?: string


  /**
   * stroke width of a barre chord
   */
  barreChordStrokeWidth?: number

  /**
   * Height of a fret, relative to the space between two strings
   */
  fretSize?: number

  /**
   * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
   * This is only applied if it's larger than the letters inside of the padding (eg the starting
   * fret)
   */
  sidePadding?: number

  /**
   * The font family used for all letters and numbers. Please not that when using the 'handdrawn'
   * chord diagram style setting the font family has no effect.
   */
  fontFamily?: string

  /**
   * The title of the diagram. The title can also be provided with the {@link Chord}.
   * If the title is provided in the chord, this value will be ignored.
   */
  title?: string

  /**
   * Font size of the title. This is only the initial font size. If the title doesn't fit, the title
   * is automatically scaled so that it fits.
   */
  titleFontSize?: number

  /**
   * Space between the title and the chord diagram
   */
  titleBottomMargin?: number

  /**
   * Global color of the whole diagram. Can be overridden with more specific color settings such as
   * @link titleColor or @link stringColor etc.
   */
  color?: string

  /**
   * The background color of the chord diagram. By default the background is transparent. To set the
   * background to transparent either set this to 'none' or undefined
   */
  backgroundColor?: string

  /**
   * The color of the title (overrides color)
   */
  titleColor?: string

  /**
   * The color of the strings (overrides color)
   */
  stringColor?: string

  /**
   * The color of the fret position (overrides color)
   */
  fretLabelColor?: string

  /**
   * The color of the tunings (overrides color)
   */
  tuningsColor?: string

  /**
   * The color of the frets (overrides color)
   */
  fretColor?: string

  /**
   * Barre chord rectangle border radius relative to the fingerSize (eg. 1 means completely round
   * edges, 0 means not rounded at all)
   */
  barreChordRadius?: number

  /**
   * Size of the Xs and Os above empty strings relative to the space between two strings
   */
  emptyStringIndicatorSize?: number

  /**
   * Global stroke width
   */
  strokeWidth?: number

  /**
   * The width of the nut (only used if position is 1)
   */
  nutWidth?: number

  /**
   * The width of the nut (only used if position is 1). If `nutWidth` is set, this value will be ignored.
   *
   * @deprecated Use `nutWidth` instead. This will be removed in the next major version.
   */
  topFretWidth?: number

  /**
   * If this is set to true, the fret (eg. 3fr) will not be shown. If the position is 1 the
   * nut will have the same width as all other frets.
   */
  noPosition?: boolean

  /**
   * When set to true the distance between the chord diagram and the top of the SVG stays the same,
   * no matter if a title is defined or not.
   */
  fixedDiagramPosition?: boolean

  /**
   * Text of the watermark
   */
  watermark?: string

  /**
   * Font size of the watermark
   */
  watermarkFontSize?: number

  /**
   * Color of the watermark (overrides color)
   */
  watermarkColor?: string

  /**
   * Font-family of the watermark (overrides fontFamily)
   */
  watermarkFontFamily?: string

  /**
   * The title of the SVG. This is not visible in the SVG, but can be used for accessibility.
   */
  svgTitle?: string
}

/**
 * All required chord settings. This interface is only used internally. From the outside, none of
 * the chord settings are required.
 */
interface RequiredChordSettings {
  style: ChordStyle
  strings: number
  frets: number
  position: number
  tuning: string[]
  tuningsFontSize: number
  fretLabelFontSize: number
  fretLabelPosition: FretLabelPosition
  fingerSize: number
  fingerTextColor: string
  fingerTextSize: number
  fingerStrokeWidth: number
  barreChordStyle: BarreChordStyle
  barreChordStrokeWidth: number
  sidePadding: number
  titleFontSize: number
  titleBottomMargin: number
  color: string
  emptyStringIndicatorSize: number
  strokeWidth: number
  nutWidth: number
  fretSize: number
  barreChordRadius: number
  fontFamily: string
  shape: Shape
  orientation: Orientation
  watermarkFontSize: number
  noPosition: boolean
  showFretMarkers: boolean,
  fretMarkerSize: number,
  fretMarkerShape: Shape,
  fretMarkerColor: string,
  doubleFretMarkerDistance: number,
}

const defaultSettings: RequiredChordSettings = {
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
  barreChordStyle: BarreChordStyle.RECTANGLE,
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
  fretMarkerColor: 'rgba(0, 0, 0, 0.2)',
  fretMarkerSize: 0.4,
  doubleFretMarkerDistance: 0.4,
  fretMarkerShape: Shape.CIRCLE,
  showFretMarkers: true,
}

export class SVGuitarChord {
  static plugins: SVGuitarPlugin[] = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static plugin<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S extends Constructor<any> & { plugins: any[] },
    T extends SVGuitarPlugin | SVGuitarPlugin[],
  >(this: S, plugin: T) {
    const currentPlugins = this.plugins

    const BaseWithPlugins = class extends this {
      static plugins = currentPlugins.concat(plugin)
    }

    return BaseWithPlugins as typeof BaseWithPlugins & Constructor<ReturnTypeOf<T>>
  }

  private rendererInternal?: Renderer

  private settings: ChordSettings = {}

  private chordInternal: Chord = { fingers: [], barres: [] }

  constructor(private container: QuerySelector | HTMLElement) {
    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor as typeof SVGuitarChord
    classConstructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this))
    })
  }

  private get renderer(): Renderer {
    if (!this.rendererInternal) {
      const style = this.settings.style ?? defaultSettings.style

      switch (style) {
        case ChordStyle.normal:
          this.rendererInternal = new SvgJsRenderer(this.container)
          break
        case ChordStyle.handdrawn:
          this.rendererInternal = new RoughJsRenderer(this.container)
          break
        default:
          throw new Error(`${style} is not a valid chord diagram style.`)
      }
    }

    return this.rendererInternal
  }

  configure(settings: ChordSettings): SVGuitarChord {
    SVGuitarChord.sanityCheckSettings(settings)

    // special case for style: remove current renderer instance if style changed. The new renderer
    // instance will be created lazily.
    if (settings.style !== this.settings.style) {
      this.renderer.remove()
      delete this.rendererInternal
    }

    this.settings = { ...this.settings, ...settings }

    return this
  }

  chord(chord: Chord): SVGuitarChord {
    this.chordInternal = chord

    return this
  }

  draw(): { width: number; height: number } {
    this.clear()
    this.drawBackground()

    if (this.settings.svgTitle) {
      this.renderer.title(this.settings.svgTitle)
    }

    let y

    y = this.drawTitle(this.settings.titleFontSize ?? defaultSettings.titleFontSize)
    y = this.drawEmptyStringIndicators(y)
    y = this.drawTopFret(y)
    this.drawPosition(y)
    y = this.drawGrid(y)
    y = this.drawTunings(y)
    y = this.drawWatermark(y)

    // now set the final height of the svg (and add some padding relative to the fret spacing)
    y += this.fretSpacing() / 10

    const width = this.width(constants.width, y)
    const height = this.height(y, constants.width)

    this.renderer.size(width, height)

    this.drawTopEdges(y)

    return {
      width: constants.width,
      height: y,
    }
  }

  static sanityCheckSettings(settings: Partial<ChordSettings>): void {
    if (typeof settings.strings !== 'undefined' && settings.strings <= 1) {
      throw new Error('Must have at least 2 strings')
    }

    if (typeof settings.frets !== 'undefined' && settings.frets < 0) {
      throw new Error('Cannot have less than 0 frets')
    }

    if (typeof settings.position !== 'undefined' && settings.position < 1) {
      throw new Error('Position cannot be less than 1')
    }

    if (typeof settings.fretSize !== 'undefined' && settings.fretSize < 0) {
      throw new Error('Fret size cannot be smaller than 0')
    }

    if (typeof settings.fingerSize !== 'undefined' && settings.fingerSize < 0) {
      throw new Error('Finger size cannot be smaller than 0')
    }

    if (typeof settings.strokeWidth !== 'undefined' && settings.strokeWidth < 0) {
      throw new Error('Stroke width cannot be smaller than 0')
    }

    if (typeof settings.doubleFretMarkerDistance !== 'undefined'
      && settings.doubleFretMarkerDistance < 0
      && settings.doubleFretMarkerDistance > 1
    ) {
      throw new Error('Double fret marker distance has to be a number between [0, 1]')
    }
  }

  private drawTunings(y: number) {
    // add some padding relative to the fret spacing
    const padding = this.fretSpacing() / 5
    const stringXPositions = this.stringXPos()
    const strings = this.numStrings()
    const color = this.settings.tuningsColor ?? this.settings.color ?? defaultSettings.color
    const tuning = this.settings.tuning ?? defaultSettings.tuning
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const tuningsFontSize = this.settings.tuningsFontSize ?? defaultSettings.tuningsFontSize

    let text: GraphcisElement | undefined

    tuning.forEach((tuning_, i): void => {
      if (i < strings) {
        const classNames = [ElementType.TUNING, `${ElementType.TUNING}-${i}`]

        const { x: textX, y: textY } = this.coordinates(stringXPositions[i], y + padding)

        const tuningText = this.renderer.text(
          tuning_,
          textX,
          textY,
          tuningsFontSize,
          color,
          fontFamily,
          Alignment.MIDDLE,
          classNames,
          true,
        )

        if (tuning_) {
          text = tuningText
        }
      }
    })

    if (text) {
      return y + this.height(text.height, text.width)
    }

    return y
  }

  private drawWatermark(y: number): number {
    if (!this.settings.watermark) {
      return y
    }

    const padding = this.fretSpacing() / 5
    const orientation = this.settings.orientation ?? defaultSettings.orientation
    const stringXPositions = this.stringXPos()
    const endX = stringXPositions[stringXPositions.length - 1]
    const startX = stringXPositions[0]

    const color = this.settings.watermarkColor ?? this.settings.color ?? defaultSettings.color
    const fontSize = this.settings.watermarkFontSize ?? defaultSettings.watermarkFontSize
    const fontFamily =
      this.settings.watermarkFontFamily ?? this.settings.fontFamily ?? defaultSettings.fontFamily

    let textX
    let textY

    if (orientation === Orientation.vertical) {
      textX = startX + (endX - startX) / 2
      textY = y + padding
    } else {
      const lastFret = y
      const firstFret = y - (this.numFrets()) * this.fretSpacing()
      textX = firstFret + (lastFret - firstFret) / 2
      textY = this.y(startX, 0) + padding
    }

    const { height } = this.renderer.text(
      this.settings.watermark,
      textX,
      textY,
      fontSize,
      color,
      fontFamily,
      Alignment.MIDDLE,
      ElementType.WATERMARK,
    )

    return y + height * 2
  }

  private drawPosition(y: number): void {
    const position =
      this.chordInternal.position ?? this.settings.position ?? defaultSettings.position
    const noPosition = this.settings.noPosition ?? defaultSettings.noPosition

    if (position <= 1 || noPosition) {
      return
    }

    const stringXPositions = this.stringXPos()
    const endX = stringXPositions[stringXPositions.length - 1]
    const startX = stringXPositions[0]
    const text = `${position}fr`
    const size = this.settings.fretLabelFontSize ?? defaultSettings.fretLabelFontSize
    const color = this.settings.fretLabelColor ?? this.settings.color ?? defaultSettings.color
    const fingerSize =
      this.stringSpacing() * (this.settings.fingerSize ?? defaultSettings.fingerSize)
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const fretLabelPosition = this.settings.fretLabelPosition ?? defaultSettings.fretLabelPosition

    // add some padding relative to the string spacing. Also make sure the padding is at least
    // 1/2 fingerSize plus some padding to prevent the finger overlapping the position label.
    const padding = Math.max(this.stringSpacing() / 5, fingerSize / 2 + 5)
    const className = ElementType.FRET_POSITION

    if (this.orientation === Orientation.vertical) {
      const drawText = (sizeMultiplier = 1) => {
        if (sizeMultiplier < 0.01) {
          // text does not fit: don't render it at all.
          // eslint-disable-next-line no-console
          console.warn('Not enough space to draw the starting fret')
          return
        }

        if (fretLabelPosition === FretLabelPosition.RIGHT) {
          const svgText = this.renderer.text(
            text,
            endX + padding,
            y,
            size * sizeMultiplier,
            color,
            fontFamily,
            Alignment.LEFT,
            className,
          )

          const { width, x } = svgText
          if (x + width > constants.width) {
            svgText.remove()
            drawText(sizeMultiplier * 0.9)
          }
        } else {
          const svgText = this.renderer.text(
            text,
            1 / sizeMultiplier + startX - padding,
            y,
            size * sizeMultiplier,
            color,
            fontFamily,
            Alignment.RIGHT,
            className,
          )

          const { x } = svgText
          if (x < 0) {
            svgText.remove()
            drawText(sizeMultiplier * 0.8)
          }
        }
      }

      drawText()

      return
    }

    // Horizontal orientation
    const { x: textX, y: textY } =
      fretLabelPosition === FretLabelPosition.RIGHT
        ? this.coordinates(endX + padding, y)
        : this.coordinates(startX - padding, y)
    this.renderer.text(
      text,
      textX,
      textY,
      size,
      color,
      fontFamily,
      Alignment.MIDDLE,
      className,
      true,
    )
  }

  /**
   * Hack to prevent the empty space of the svg from being cut off without having to define a
   * fixed width
   */
  private drawTopEdges(y: number) {
    const orientation = this.settings.orientation ?? defaultSettings.orientation

    const xTopRight = orientation === Orientation.vertical ? constants.width : y

    this.renderer.circle(0, 0, 0, 0, 'transparent', 'none', 'top-left')
    this.renderer.circle(xTopRight, 0, 0, 0, 'transparent', 'none', 'top-right')
  }

  private drawBackground() {
    if (this.settings.backgroundColor) {
      this.renderer.background(this.settings.backgroundColor)
    }
  }

  private topFretSize() {
    const strokeWidth = this.strokeWidth()
    const position =
      this.chordInternal.position ?? this.settings.position ?? defaultSettings.position
    const noPositon = this.settings.noPosition ?? defaultSettings.noPosition
    const nutWidth =
      this.settings.nutWidth ?? this.settings.nutWidth ?? defaultSettings.nutWidth

    return position > 1 || noPositon ? strokeWidth : nutWidth
  }

  private drawTopFret(y: number): number {
    const strokeWidth = this.strokeWidth()
    const stringXpositions = this.stringXPos()
    const startX = stringXpositions[0] - strokeWidth / 2
    const endX = stringXpositions[stringXpositions.length - 1] + strokeWidth / 2
    const color = this.settings.fretColor ?? this.settings.color ?? defaultSettings.color

    const fretSize = this.topFretSize()

    const { x: lineX1, y: lineY1 } = this.coordinates(startX, y + fretSize / 2)
    const { x: lineX2, y: lineY2 } = this.coordinates(endX, y + fretSize / 2)

    this.renderer.line(lineX1, lineY1, lineX2, lineY2, fretSize, color, ['top-fret', 'fret-0'])

    return y + fretSize
  }

  private stringXPos(): number[] {
    const strings = this.numStrings()
    const sidePadding = this.settings.sidePadding ?? defaultSettings.sidePadding
    const startX = constants.width * sidePadding
    const stringsSpacing = this.stringSpacing()

    return range(strings).map((i) => startX + stringsSpacing * i)
  }

  private numStrings() {
    return this.settings.strings ?? defaultSettings.strings
  }

  private numFrets() {
    return this.settings.frets ?? defaultSettings.frets
  }

  private stringSpacing(): number {
    const sidePadding = this.settings.sidePadding ?? defaultSettings.sidePadding
    const strings = this.numStrings()
    const startX = constants.width * sidePadding
    const endX = constants.width - startX
    const width = endX - startX

    return width / (strings - 1)
  }

  private fingerSize() {
    const relativeFingerSize = this.settings.fingerSize ?? defaultSettings.fingerSize
    return relativeFingerSize * this.stringSpacing()
  }

  private arcBarHeight() {
    return this.fingerSize() / 1.5
  }

  private strokeWidth() {
    return this.settings.strokeWidth ?? defaultSettings.strokeWidth
  }

  private fretSpacing(): number {
    const stringSpacing = this.stringSpacing()
    const fretSize = this.settings.fretSize ?? defaultSettings.fretSize

    return stringSpacing * fretSize
  }

  private fretLinesYPos(startY: number): number[] {
    const frets = this.numFrets()
    const fretSpacing = this.fretSpacing()

    return range(frets, 1).map((i) => startY + fretSpacing * i)
  }

  private toArrayIndex(stringIndex: number): number {
    const strings = this.numStrings()

    return Math.abs(stringIndex - strings)
  }

  private drawEmptyStringIndicators(y: number): number {
    const stringXPositions = this.stringXPos()
    const stringSpacing = this.stringSpacing()
    const emptyStringIndicatorSize =
      this.settings.emptyStringIndicatorSize ?? defaultSettings.emptyStringIndicatorSize
    const size = emptyStringIndicatorSize * stringSpacing
    // add some space above and below the indicator, relative to the indicator size
    const padding = size / 3
    const color = this.settings.color ?? defaultSettings.color
    const strokeWidth = this.settings.strokeWidth ?? defaultSettings.strokeWidth

    let hasEmpty = false

    this.chordInternal.fingers
      .filter(([, value]) => value === SILENT || value === OPEN)
      .map<Finger>(([index, value, textOrOptions]) => [
        this.toArrayIndex(index),
        value,
        textOrOptions,
      ])
      .forEach(([stringIndex, value, textOrOptions]) => {
        hasEmpty = true

        const fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions)
        const effectiveStrokeWidth = fingerOptions.strokeWidth ?? strokeWidth
        const effectiveStrokeColor = fingerOptions.strokeColor ?? color

        if (fingerOptions.text) {
          const textColor = fingerOptions.textColor ?? this.settings.color ?? defaultSettings.color
          const textSize = this.settings.fingerTextSize ?? defaultSettings.fingerTextSize
          const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
          const classNames = [ElementType.STRING_TEXT, `${ElementType.STRING_TEXT}-${stringIndex}`]

          const { x: textX, y: textY } = this.coordinates(
            stringXPositions[stringIndex],
            y + padding + size / 2,
          )

          this.renderer.text(
            fingerOptions.text,
            textX,
            textY,
            textSize,
            textColor,
            fontFamily,
            Alignment.MIDDLE,
            classNames,
            true,
          )
        }

        if (value === OPEN) {
          // draw an O
          const classNames = [ElementType.OPEN_STRING, `${ElementType.OPEN_STRING}-${stringIndex}`]

          const { x: lineX1, y: lineY1 } = this.rectCoordinates(
            stringXPositions[stringIndex] - size / 2,
            y + padding,
            size,
            size,
          )

          this.renderer.circle(
            lineX1,
            lineY1,
            size,
            effectiveStrokeWidth,
            effectiveStrokeColor,
            undefined,
            classNames,
          )
        } else {
          // draw an X
          const classNames = [
            ElementType.SILENT_STRING,
            `${ElementType.SILENT_STRING}-${stringIndex}`,
          ]
          const startX = stringXPositions[stringIndex] - size / 2
          const endX = startX + size
          const startY = y + padding
          const endY = startY + size

          const { x: line1X1, y: line1Y1 } = this.coordinates(startX, startY)
          const { x: line1X2, y: line1Y2 } = this.coordinates(endX, endY)

          this.renderer.line(
            line1X1,
            line1Y1,
            line1X2,
            line1Y2,
            effectiveStrokeWidth,
            effectiveStrokeColor,
            classNames,
          )

          const { x: line2X1, y: line2Y1 } = this.coordinates(startX, endY)
          const { x: line2X2, y: line2Y2 } = this.coordinates(endX, startY)

          this.renderer.line(
            line2X1,
            line2Y1,
            line2X2,
            line2Y2,
            effectiveStrokeWidth,
            effectiveStrokeColor,
            classNames,
          )
        }
      })

    if (hasEmpty || this.settings.fixedDiagramPosition) {
      return y + size + 2 * padding
    }

    // add space for the arc barre chord between the title and the diagram
    // in case there are no empty string indicators
    const barreChordStyle = this.settings.barreChordStyle ?? defaultSettings.barreChordStyle
    const addSpaceForArcBarreChord = this.chordInternal.barres.some((barre) => barre.fret === 1)
      && ((this.chordInternal.barres[0]?.style ?? barreChordStyle) === BarreChordStyle.ARC)
    const barreChordSpace = addSpaceForArcBarreChord ? this.arcBarHeight() : 0

    return y + padding + barreChordSpace
  }

  private drawGrid(y: number): number {
    const frets = this.numFrets()
    const fretSize = this.settings.fretSize ?? defaultSettings.fretSize
    const relativeFingerSize = this.settings.fingerSize ?? defaultSettings.fingerSize
    const stringXPositions = this.stringXPos()
    const fretYPositions = this.fretLinesYPos(y)
    const stringSpacing = this.stringSpacing()
    const fretSpacing = stringSpacing * fretSize
    const height = fretSpacing * frets

    const startX = stringXPositions[0]
    const endX = stringXPositions[stringXPositions.length - 1]

    const fingerSize = relativeFingerSize * stringSpacing
    const fingerColor = this.settings.fingerColor ?? this.settings.color ?? defaultSettings.color
    const fretColor = this.settings.fretColor ?? this.settings.color ?? defaultSettings.color
    const barreChordRadius = this.settings.barreChordRadius ?? defaultSettings.barreChordRadius
    const strokeWidth = this.strokeWidth()
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const fingerTextColor = this.settings.fingerTextColor ?? defaultSettings.fingerTextColor
    const fingerTextSize = this.settings.fingerTextSize ?? defaultSettings.fingerTextSize

    // draw frets
    fretYPositions.forEach((fretY, i) => {
      const classNames = [ElementType.FRET, `${ElementType.FRET}-${i}`]
      const { x: lineX1, y: lineY1 } = this.coordinates(startX, fretY)
      const { x: lineX2, y: lineY2 } = this.coordinates(endX, fretY)

      this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames)
    })

    // draw strings
    stringXPositions.forEach((stringX, i) => {
      const classNames = [ElementType.STRING, `${ElementType.STRING}-${i}`]

      const { x: lineX1, y: lineY1 } = this.coordinates(stringX, y)
      const { x: lineX2, y: lineY2 } = this.coordinates(stringX, y + height + strokeWidth / 2)

      this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames)
    })

    // draw barre chords
    this.chordInternal.barres.forEach(
      ({
        fret,
        fromString,
        toString,
        style,
        text,
        color,
        textColor,
        strokeColor,
        className,
        strokeWidth: individualBarreChordStrokeWidth,
      }) => {
        const barreCenterY = fretYPositions[fret - 1] - strokeWidth / 4 - fretSpacing / 2
        const fromStringX = stringXPositions[this.toArrayIndex(fromString)]
        const distance = Math.abs(toString - fromString) * stringSpacing

        const barreChordStrokeColor =
          strokeColor ??
          this.settings.barreChordStrokeColor ??
          this.settings.fingerColor ??
          this.settings.color ??
          defaultSettings.color
        const barreChordStrokeWidth =
          individualBarreChordStrokeWidth ??
          this.settings.barreChordStrokeWidth ??
          defaultSettings.barreChordStrokeWidth

        const barreChordStyle = style ?? this.settings.barreChordStyle ?? defaultSettings.barreChordStyle

        const classNames = [
          ElementType.BARRE,
          `${ElementType.BARRE}-${barreChordStyle}`,
          `${ElementType.BARRE}-fret-${fret - 1}`,
          ...(className ? [className] : []),
        ]

        if (barreChordStyle == BarreChordStyle.RECTANGLE) {
          const barreWidth = distance + stringSpacing / 2

          const {
            x: rectX,
            y: rectY,
            height: rectHeight,
            width: rectWidth,
          } = this.rectCoordinates(
            fromStringX - stringSpacing / 4,
            barreCenterY - fingerSize / 2,
            barreWidth,
            fingerSize, // height
          )

          this.renderer.rect(
            rectX,
            rectY,
            rectWidth,
            rectHeight,
            barreChordStrokeWidth,
            barreChordStrokeColor,
            classNames,
            'black' ?? color ?? fingerColor,
            fingerSize * barreChordRadius,
          )
        } else if (barreChordStyle == BarreChordStyle.ARC) {
          const barreWidth = distance
          const barreHeight = this.arcBarHeight()

          const fretStroke = fret === 1 ? this.topFretSize() : 0
          const barreYStart = barreCenterY - (fretSpacing / 2) - barreHeight - fretStroke

          const {
            x: rectX,
            y: rectY,
            height: rectHeight,
            width: rectWidth,
          } = this.rectCoordinates(
            fromStringX,
            barreYStart,
            barreWidth,
            barreHeight,
          )

          this.renderer.arc(
            rectX,
            rectY,
            rectWidth,
            rectHeight,
            this.orientation == Orientation.horizontal ? ArcDirection.LEFT : ArcDirection.UP,
            barreChordStrokeWidth,
            barreChordStrokeColor,
            classNames,
            color ?? fingerColor,
          )
        } else {
          throw new Error(`Invalid barre chord style ${this.settings.barreChordStyle}`)
        }

        // draw text on the barre chord
        if (text) {
          const textClassNames = [ElementType.BARRE_TEXT, `${ElementType.BARRE_TEXT}-${fret}`]

          const { x: textX, y: textY } = this.coordinates(fromStringX + distance / 2, barreCenterY)

          this.renderer.text(
            text,
            textX,
            textY,
            fingerTextSize,
            textColor ?? fingerTextColor,
            fontFamily,
            Alignment.MIDDLE,
            textClassNames,
            true,
          )
        }
      },
    )

    // draw fingers
    this.chordInternal.fingers
      .filter(([, value]) => value !== SILENT && value !== OPEN)
      .map<[number, number, string | FingerOptions | undefined]>(
        ([stringIndex, fretIndex, text]) => [
          this.toArrayIndex(stringIndex),
          fretIndex as number,
          text,
        ],
      )
      .forEach(([stringIndex, fretIndex, textOrOptions]) => {
        const fingerCenterX = startX + stringIndex * stringSpacing
        const fingerCenterY = y + fretIndex * fretSpacing - fretSpacing / 2
        const fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions)

        const classNames = [
          ElementType.FINGER,
          `${ElementType.FINGER}-string-${stringIndex}`,
          `${ElementType.FINGER}-fret-${fretIndex - 1}`,
          `${ElementType.FINGER}-string-${stringIndex}-fret-${fretIndex - 1}`,
          ...(fingerOptions.className ? [fingerOptions.className] : []),
        ]

        this.drawFinger(
          fingerCenterX,
          fingerCenterY,
          fingerSize,
          fingerColor,
          fingerTextSize,
          fontFamily,
          fingerOptions,
          classNames,
        )
      })

    if (this.settings.showFretMarkers ?? defaultSettings.showFretMarkers) {
      this.settings.fretMarkers
      ?.forEach((fretMarker) => {
        const fretMarkerOptions = (typeof fretMarker == 'number' ? {
          fret: fretMarker,
        } : fretMarker) as DoubleFretMarker | SingleFretMarker

        if (fretMarkerOptions.fret >= this.numFrets()) {
          // don't draw fret markers outside the chord diagram
          return;
        }

        const fretMarkerIndex = fretMarkerOptions.fret
        const fretMarkerCenterX = constants.width / 2
        const fretMarkerCenterY = y + (fretMarkerIndex + 1) * fretSpacing - fretSpacing / 2
        const fretMarkerSize = this.settings.fretMarkerSize ?? defaultSettings.fretMarkerSize
        const fretMarkerColor = this.settings.fretMarkerColor ?? defaultSettings.fretMarkerColor

        const classNames = [
          ElementType.FRET_MARKER,
          `${ElementType.FRET_MARKER}-fret-${fretMarkerIndex}`,
          ...(fretMarkerOptions.className ?? []),
        ]

        if ('double' in fretMarkerOptions) {
          this.stringSpacing()
          const doubleFretMarkerDistance = fretMarkerOptions.distance ?? this.settings.doubleFretMarkerDistance ?? defaultSettings.doubleFretMarkerDistance

          const neckWidth = (this.numStrings() - 1) * this.stringSpacing();
          const fretMarkerDistanceFromCenter = neckWidth * doubleFretMarkerDistance / 2

          this.drawFretMarker(
            fretMarkerCenterX - fretMarkerDistanceFromCenter,
            fretMarkerCenterY,
            fretMarkerSize,
            fretMarkerColor,
            fretMarker,
            classNames
          )
          this.drawFretMarker(
            fretMarkerCenterX + fretMarkerDistanceFromCenter,
            fretMarkerCenterY,
            fretMarkerSize,
            fretMarkerColor,
            fretMarker,
            classNames
          )
        } else {
          this.drawFretMarker(
            fretMarkerCenterX,
            fretMarkerCenterY,
            fretMarkerSize,
            fretMarkerColor,
            fretMarker,
            classNames
          )
        }
      });
    }

    return y + height
  }

  private drawFretMarker(
    x: number,
    y: number,
    size: number,
    color: string,
    fretMarketOptions: FretMarker,
    classNames: string[],
  ) {
    const markerOptions = typeof fretMarketOptions === 'number' ? {fret: fretMarketOptions} : fretMarketOptions

    const shape = markerOptions.shape ?? defaultSettings.fretMarkerShape
    const fretMarkerColor = markerOptions.color ?? this.settings.fretMarkerColor ?? defaultSettings.fretMarkerColor
    const fretMarkerStrokeColor = markerOptions.strokeColor ?? this.settings.fretMarkerStrokeColor ?? color
    const fretMarkerStrokeWidth = markerOptions.strokeWidth ?? this.settings.fretMarkerStrokeWidth ?? 0

    const fretMarkerSize = this.stringSpacing() * (markerOptions.size ?? size)
    const startX = x - fretMarkerSize / 2
    const startY = y - fretMarkerSize / 2

    const classNamesWithShape = [...classNames, `${ElementType.FRET_MARKER}-${shape}`]

    const { x: x0, y: y0 } = this.rectCoordinates(startX, startY, fretMarkerSize, fretMarkerSize)

    this.drawShape(
      shape,
      x0,
      y0,
      fretMarkerSize,
      fretMarkerStrokeWidth,
      fretMarkerStrokeColor,
      fretMarkerColor ?? color,
      classNamesWithShape
    )

  }

  private drawFinger(
    x: number,
    y: number,
    size: number,
    color: string,
    textSize: number,
    fontFamily: string,
    fingerOptions: FingerOptions,
    classNames: string[],
  ) {
    const shape = fingerOptions.shape ?? defaultSettings.shape
    const fingerTextColor =
      fingerOptions.textColor ?? this.settings.fingerTextColor ?? defaultSettings.fingerTextColor
    const fingerStrokeColor =
      fingerOptions.strokeColor ??
      this.settings.fingerStrokeColor ??
      this.settings.fingerColor ??
      this.settings.color ??
      defaultSettings.color
    const fingerStrokeWidth =
      fingerOptions.strokeWidth ??
      this.settings.fingerStrokeWidth ??
      defaultSettings.fingerStrokeWidth
    const startX = x - size / 2
    const startY = y - size / 2

    const classNamesWithShape = [...classNames, `${ElementType.FINGER}-${shape}`]

    const { x: x0, y: y0 } = this.rectCoordinates(startX, startY, size, size)

    this.drawShape(
      shape,
      x0,
      y0,
      size,
      fingerStrokeWidth,
      fingerStrokeColor,
      fingerOptions.color ?? color,
      classNamesWithShape
    )

    // draw text on the finger
    const textClassNames = [...classNames, `${ElementType.FINGER}-text`]
    if (fingerOptions.text) {
      const { x: textX, y: textY } = this.coordinates(x, y)

      this.renderer.text(
        fingerOptions.text,
        textX,
        textY,
        textSize,
        fingerOptions.textColor ?? fingerTextColor,
        fontFamily,
        Alignment.MIDDLE,
        textClassNames,
        true,
      )
    }
  }

  private drawShape(
    shape: Shape,
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    fillColor: string,
    classNames: string[]
  ) {
    switch (shape) {
      case Shape.CIRCLE:
        this.renderer.circle(
          x,
          y,
          size,
          strokeWidth,
          strokeColor,
          fillColor,
          classNames,
        )
        break
      case Shape.SQUARE:
        this.renderer.rect(
          x,
          y,
          size,
          size,
          strokeWidth,
          strokeColor,
          classNames,
          fillColor,
        )
        break
      case Shape.TRIANGLE:
        this.renderer.triangle(
          x,
          y,
          size,
          strokeWidth,
          strokeColor,
          classNames,
          fillColor,
        )
        break
      case Shape.PENTAGON:
        this.renderer.pentagon(
          x,
          y,
          size,
          strokeWidth,
          strokeColor,
          fillColor,
          classNames,
        )
        break
      default:
        throw new Error(
          `Invalid shape "${shape}". Valid shapes are: ${Object.values(Shape)
          .map((val) => `"${val}"`)
          .join(', ')}.`,
        )
    }
  }

  private drawTitle(size: number): number {
    const color = this.settings.color ?? defaultSettings.color
    const titleBottomMargin = this.settings.titleBottomMargin ?? defaultSettings.titleBottomMargin
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily

    // This is somewhat of a hack to get a steady diagram position: If no title is defined we initially
    // render an 'X' and later remove it again. That way we get the same y as if there was a title. I tried
    // just rendering a space but that doesn't work.
    const title =
      this.chordInternal.title ??
      this.settings.title ??
      (this.settings.fixedDiagramPosition ? 'X' : '')

    // draw the title
    if (this.orientation === Orientation.vertical) {
      const { x, y, width, height, remove } = this.renderer.text(
        title,
        constants.width / 2,
        5,
        size,
        color,
        fontFamily,
        Alignment.MIDDLE,
        ElementType.TITLE,
      )

      // check if the title fits. If not, try with a smaller size
      if (x < -0.0001) {
        remove()

        // try again with smaller font
        return this.drawTitle(size * (constants.width / width) * 0.97)
      }

      if (!this.settings.title && this.settings.fixedDiagramPosition) {
        remove()
      }

      return y + height + titleBottomMargin
    }

    // render temporary text to get the height of the title
    const { remove: removeTempText, width } = this.renderer.text(
      title,
      0,
      0,
      size,
      color,
      fontFamily,
      Alignment.LEFT,
      ElementType.TITLE,
    )
    removeTempText()

    const { x: textX, y: textY } = this.rectCoordinates(constants.width / 2, 5, 0, 0)

    const { remove } = this.renderer.text(
      title,
      textX,
      textY,
      size,
      color,
      fontFamily,
      Alignment.LEFT,
      ElementType.TITLE,
      true,
    )

    if (!this.settings.title && this.settings.fixedDiagramPosition) {
      remove()
    }

    return width + titleBottomMargin
  }

  clear(): void {
    this.renderer.clear()
  }

  /**
   * Completely remove the diagram from the DOM
   */
  remove(): void {
    this.renderer.remove()
  }

  /**
   * Helper method to get an options object from the 3rd array value for a finger, that can either
   * be undefined, a string or and options object. This method will return an options object in
   * any case, so it's easier to work with this third value.
   *
   * @param textOrOptions
   */
  private static getFingerOptions(
    textOrOptions: string | FingerOptions | undefined,
  ): FingerOptions {
    if (!textOrOptions) {
      return {}
    }

    if (typeof textOrOptions === 'string') {
      return {
        text: textOrOptions,
      }
    }

    return textOrOptions
  }

  /**
   * rotates x value if orientation is horizontal
   *
   * @param x x in vertical orientation
   * @param y y in vertical orientation
   * @returns
   */
  private x(x: number, y: number): number {
    return this.orientation === Orientation.vertical ? x : y
  }

  /**
   * rotates y value if orientation is horizontal
   *
   * @param x x in vertical orientation
   * @param y y in vertical orientation
   * @returns
   */
  private y(x: number, y: number): number {
    return this.orientation === Orientation.vertical ? y : Math.abs(x - constants.width)
  }

  /**
   * rotates coordinates if orientation is horizontal
   *
   * @param x x in vertical orientation
   * @param y y in vertical orientation
   * @returns
   */
  private coordinates(x: number, y: number): { x: number; y: number } {
    return {
      x: this.x(x, y),
      y: this.y(x, y),
    }
  }

  /**
   * rotates coordinates of a rectangle if orientation is horizontal
   *
   * @param x x in vertical orientation
   * @param y y in vertical orientation
   * @param width width in vertical orientation
   * @param height height in vertical orientation
   * @returns
   */
  private rectCoordinates(
    x: number,
    y: number,
    width: number,
    height: number,
  ): { x: number; y: number; width: number; height: number } {
    if (this.orientation === Orientation.vertical) {
      return {
        x,
        y,
        width,
        height,
      }
    }

    return {
      x: this.x(x, y),
      y: this.y(x, y) - width,
      width: this.width(width, height),
      height: this.height(height, width),
    }
  }

  /**
   * rotates height if orientation is horizontal
   *
   * @param height_ height in vertical orientation
   * @param width width in vertical orientation
   * @returns
   */
  private height(height_: number, width: number): number {
    return this.orientation === Orientation.vertical ? height_ : width
  }

  /**
   * rotates width if orientation is horizontal
   *
   * @param width_ width in vertical orientation
   * @param height height in vertical orientation
   * @returns
   */
  private width(width_: number, height: number): number {
    return this.orientation === Orientation.horizontal ? height : width_
  }

  private get orientation(): Orientation {
    return this.settings.orientation ?? defaultSettings.orientation
  }

}
