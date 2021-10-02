/* eslint-disable max-classes-per-file */
import { QuerySelector } from '@svgdotjs/svg.js'
import { range } from './utils'
import { constants } from './constants'
import { Alignment, GraphcisElement, Renderer, RoughJsRenderer, SvgJsRenderer } from './renderer'
import { Constructor, ReturnTypeOf, SVGuitarPlugin } from './plugin'

// Chord diagram input types (compatible with Vexchords input, see https://github.com/0xfe/vexchords)
export type SilentString = 'x'
export type OpenString = 0
export type Finger = [number, number | OpenString | SilentString, (string | FingerOptions)?]
export type Barre = {
  fromString: number
  toString: number
  fret: number
  text?: string
  color?: string
  textColor?: string
  strokeWidth?: number
  strokeColor?: string
  className?: string
}
export type Chord = {
  /**
   * The fingers (nuts)
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

export enum ElementType {
  FRET = 'fret',
  STRING = 'string',
  BARRE = 'barre',
  BARRE_TEXT = 'barre-text',
  FINGER = 'finger',
  TITLE = 'title',
  TUNING = 'tuning',
  FRET_POSITION = 'fret-position',
  STRING_TEXT = 'string-text',
  SILENT_STRING = 'silent-string',
  OPEN_STRING = 'open-string',
}

export interface ChordSettings {
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
  frets?: number
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
   * Size of a nut relative to the string spacing
   */
  nutSize?: number

  /**
   * Color of a finger / nut
   */
  nutColor?: string

  /**
   * The color of text inside nuts
   */
  nutTextColor?: string

  /**
   * The size of text inside nuts
   */
  nutTextSize?: number

  /**
   * stroke color of a nut. Defaults to the nut color if not set
   */
  nutStrokeColor?: string

  /**
   * stroke width of a nut
   */
  nutStrokeWidth?: number

  /**
   * stroke color of a barre chord. Defaults to the nut color if not set
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
   * Global color of the whole diagram. Can be overridden with more specifig color settings such as
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
   * Barre chord rectangle border radius relative to the nutSize (eg. 1 means completely round
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
   * The width of the top fret (only used if position is 1)
   */
  topFretWidth?: number

  /**
   * When set to true the distance between the chord diagram and the top of the SVG stayes the same,
   * no matter if a title is defined or not.
   */
  fixedDiagramPosition?: boolean
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
  nutSize: number
  nutTextColor: string
  nutTextSize: number
  nutStrokeWidth: number
  barreChordStrokeWidth: number
  sidePadding: number
  titleFontSize: number
  titleBottomMargin: number
  color: string
  emptyStringIndicatorSize: number
  strokeWidth: number
  topFretWidth: number
  fretSize: number
  barreChordRadius: number
  fontFamily: string
  shape: Shape
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
}

export class SVGuitarChord {
  static plugins: SVGuitarPlugin[] = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static plugin<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S extends Constructor<any> & { plugins: any[] },
    T extends SVGuitarPlugin | SVGuitarPlugin[]
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
    this.drawTopEdges()
    this.drawBackground()

    let y

    y = this.drawTitle(this.settings.titleFontSize ?? defaultSettings.titleFontSize)
    y = this.drawEmptyStringIndicators(y)
    y = this.drawTopFret(y)
    this.drawPosition(y)
    y = this.drawGrid(y)
    y = this.drawTunings(y)

    // now set the final height of the svg (and add some padding relative to the fret spacing)
    y += this.fretSpacing() / 10

    this.renderer.size(constants.width, y)

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

    if (typeof settings.nutSize !== 'undefined' && settings.nutSize < 0) {
      throw new Error('Nut size cannot be smaller than 0')
    }

    if (typeof settings.strokeWidth !== 'undefined' && settings.strokeWidth < 0) {
      throw new Error('Stroke width cannot be smaller than 0')
    }
  }

  private drawTunings(y: number) {
    // add some padding relative to the fret spacing
    const padding = this.fretSpacing() / 5
    const stringXPositions = this.stringXPos()
    const strings = this.settings.strings ?? defaultSettings.strings
    const color = this.settings.tuningsColor ?? this.settings.color ?? defaultSettings.color
    const tuning = this.settings.tuning ?? defaultSettings.tuning
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const tuningsFontSize = this.settings.tuningsFontSize ?? defaultSettings.tuningsFontSize

    let text: GraphcisElement | undefined

    tuning.forEach((tuning_, i): void => {
      if (i < strings) {
        const classNames = [ElementType.TUNING, `${ElementType.TUNING}-${i}`]
        const tuningText = this.renderer.text(
          tuning_,
          stringXPositions[i],
          y + padding,
          tuningsFontSize,
          color,
          fontFamily,
          Alignment.MIDDLE,
          classNames,
        )

        if (tuning_) {
          text = tuningText
        }
      }
    })

    if (text) {
      return y + text.height + padding * 2
    }
    return y
  }

  private drawPosition(y: number): void {
    const position =
      this.chordInternal.position ?? this.settings.position ?? defaultSettings.position
    if (position <= 1) {
      return
    }

    const stringXPositions = this.stringXPos()
    const endX = stringXPositions[stringXPositions.length - 1]
    const startX = stringXPositions[0]
    const text = `${position}fr`
    const size = this.settings.fretLabelFontSize ?? defaultSettings.fretLabelFontSize
    const color = this.settings.fretLabelColor ?? this.settings.color ?? defaultSettings.color
    const nutSize = this.stringSpacing() * (this.settings.nutSize ?? defaultSettings.nutSize)
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const fretLabelPosition = this.settings.fretLabelPosition ?? defaultSettings.fretLabelPosition

    // add some padding relative to the string spacing. Also make sure the padding is at least
    // 1/2 nutSize plus some padding to prevent the nut overlapping the position label.
    const padding = Math.max(this.stringSpacing() / 5, nutSize / 2 + 5)

    const drawText = (sizeMultiplier = 1) => {
      if (sizeMultiplier < 0.01) {
        // text does not fit: don't render it at all.
        // eslint-disable-next-line no-console
        console.warn('Not enough space to draw the starting fret')
        return
      }

      const className = ElementType.FRET_POSITION
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
  }

  /**
   * Hack to prevent the empty space of the svg from being cut off without having to define a
   * fixed width
   */
  private drawTopEdges() {
    this.renderer.circle(constants.width, 0, 0, 0, 'transparent', 'none')
    this.renderer.circle(0, 0, 0, 0, 'transparent', 'none')
  }

  private drawBackground() {
    if (this.settings.backgroundColor) {
      this.renderer.background(this.settings.backgroundColor)
    }
  }

  private drawTopFret(y: number): number {
    const stringXpositions = this.stringXPos()
    const strokeWidth = this.settings.strokeWidth ?? defaultSettings.strokeWidth
    const topFretWidth = this.settings.topFretWidth ?? defaultSettings.topFretWidth
    const startX = stringXpositions[0] - strokeWidth / 2
    const endX = stringXpositions[stringXpositions.length - 1] + strokeWidth / 2
    const position =
      this.chordInternal.position ?? this.settings.position ?? defaultSettings.position
    const color = this.settings.fretColor ?? this.settings.color ?? defaultSettings.color

    let fretSize: number
    if (position > 1) {
      fretSize = strokeWidth
    } else {
      fretSize = topFretWidth
    }

    this.renderer.line(startX, y + fretSize / 2, endX, y + fretSize / 2, fretSize, color, [
      'top-fret',
      `fret-0`,
    ])

    return y + fretSize
  }

  private stringXPos(): number[] {
    const strings = this.settings.strings ?? defaultSettings.strings
    const sidePadding = this.settings.sidePadding ?? defaultSettings.sidePadding
    const startX = constants.width * sidePadding
    const stringsSpacing = this.stringSpacing()

    return range(strings).map((i) => startX + stringsSpacing * i)
  }

  private stringSpacing(): number {
    const sidePadding = this.settings.sidePadding ?? defaultSettings.sidePadding
    const strings = this.settings.strings ?? defaultSettings.strings
    const startX = constants.width * sidePadding
    const endX = constants.width - startX
    const width = endX - startX

    return width / (strings - 1)
  }

  private fretSpacing(): number {
    const stringSpacing = this.stringSpacing()
    const fretSize = this.settings.fretSize ?? defaultSettings.fretSize

    return stringSpacing * fretSize
  }

  private fretLinesYPos(startY: number): number[] {
    const frets = this.settings.frets ?? defaultSettings.frets
    const fretSpacing = this.fretSpacing()

    return range(frets, 1).map((i) => startY + fretSpacing * i)
  }

  private toArrayIndex(stringIndex: number): number {
    const strings = this.settings.strings ?? defaultSettings.strings

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
          const textSize = this.settings.nutTextSize ?? defaultSettings.nutTextSize
          const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
          const classNames = [ElementType.STRING_TEXT, `${ElementType.STRING_TEXT}-${stringIndex}`]

          this.renderer.text(
            fingerOptions.text,
            stringXPositions[stringIndex],
            y + padding + size / 2,
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

          this.renderer.circle(
            stringXPositions[stringIndex] - size / 2,
            y + padding,
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

          this.renderer.line(
            startX,
            startY,
            endX,
            endY,
            effectiveStrokeWidth,
            effectiveStrokeColor,
            classNames,
          )
          this.renderer.line(
            startX,
            endY,
            endX,
            startY,
            effectiveStrokeWidth,
            effectiveStrokeColor,
            classNames,
          )
        }
      })

    return hasEmpty || this.settings.fixedDiagramPosition ? y + size + 2 * padding : y + padding
  }

  private drawGrid(y: number): number {
    const frets = this.settings.frets ?? defaultSettings.frets
    const fretSize = this.settings.fretSize ?? defaultSettings.fretSize
    const relativeNutSize = this.settings.nutSize ?? defaultSettings.nutSize
    const stringXPositions = this.stringXPos()
    const fretYPositions = this.fretLinesYPos(y)
    const stringSpacing = this.stringSpacing()
    const fretSpacing = stringSpacing * fretSize
    const height = fretSpacing * frets

    const startX = stringXPositions[0]
    const endX = stringXPositions[stringXPositions.length - 1]

    const nutSize = relativeNutSize * stringSpacing
    const nutColor = this.settings.nutColor ?? this.settings.color ?? defaultSettings.color
    const fretColor = this.settings.fretColor ?? this.settings.color ?? defaultSettings.color
    const barreChordRadius = this.settings.barreChordRadius ?? defaultSettings.barreChordRadius
    const strokeWidth = this.settings.strokeWidth ?? defaultSettings.strokeWidth
    const fontFamily = this.settings.fontFamily ?? defaultSettings.fontFamily
    const nutTextColor = this.settings.nutTextColor ?? defaultSettings.nutTextColor
    const nutTextSize = this.settings.nutTextSize ?? defaultSettings.nutTextSize

    // draw frets
    fretYPositions.forEach((fretY, i) => {
      const classNames = [ElementType.FRET, `${ElementType.FRET}-${i}`]
      this.renderer.line(startX, fretY, endX, fretY, strokeWidth, fretColor, classNames)
    })

    // draw strings
    stringXPositions.forEach((stringX, i) => {
      const classNames = [ElementType.STRING, `${ElementType.STRING}-${i}`]
      this.renderer.line(
        stringX,
        y,
        stringX,
        y + height + strokeWidth / 2,
        strokeWidth,
        fretColor,
        classNames,
      )
    })

    // draw barre chords
    this.chordInternal.barres.forEach(
      ({
        fret,
        fromString,
        toString,
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
          this.settings.nutColor ??
          this.settings.color ??
          defaultSettings.color
        const barreChordStrokeWidth =
          individualBarreChordStrokeWidth ??
          this.settings.barreChordStrokeWidth ??
          defaultSettings.barreChordStrokeWidth

        const classNames = [
          ElementType.BARRE,
          `${ElementType.BARRE}-fret-${fret - 1}`,
          ...(className ? [className] : []),
        ]

        this.renderer.rect(
          fromStringX - stringSpacing / 4,
          barreCenterY - nutSize / 2,
          distance + stringSpacing / 2,
          nutSize,
          barreChordStrokeWidth,
          barreChordStrokeColor,
          classNames,
          color ?? nutColor,
          nutSize * barreChordRadius,
        )

        // draw text on the barre chord
        if (text) {
          const textClassNames = [ElementType.BARRE_TEXT, `${ElementType.BARRE_TEXT}-${fret}`]

          this.renderer.text(
            text,
            fromStringX + distance / 2,
            barreCenterY,
            nutTextSize,
            textColor ?? nutTextColor,
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
        const nutCenterX = startX + stringIndex * stringSpacing
        const nutCenterY = y + fretIndex * fretSpacing - fretSpacing / 2
        const fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions)

        const classNames = [
          ElementType.FINGER,
          `${ElementType.FINGER}-string-${stringIndex}`,
          `${ElementType.FINGER}-fret-${fretIndex - 1}`,
          `${ElementType.FINGER}-string-${stringIndex}-fret-${fretIndex - 1}`,
          ...(fingerOptions.className ? [fingerOptions.className] : []),
        ]

        this.drawNut(
          nutCenterX,
          nutCenterY,
          nutSize,
          nutColor,
          nutTextSize,
          fontFamily,
          fingerOptions,
          classNames,
        )
      })

    return y + height
  }

  private drawNut(
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
    const nutTextColor =
      fingerOptions.textColor ?? this.settings.nutTextColor ?? defaultSettings.nutTextColor
    const nutStrokeColor =
      fingerOptions.strokeColor ??
      this.settings.nutStrokeColor ??
      this.settings.nutColor ??
      this.settings.color ??
      defaultSettings.color
    const nutStrokeWidth =
      fingerOptions.strokeWidth ?? this.settings.nutStrokeWidth ?? defaultSettings.nutStrokeWidth
    const startX = x - size / 2
    const startY = y - size / 2

    const classNamesWithShape = [...classNames, `${ElementType.FINGER}-${shape}`]

    switch (shape) {
      case Shape.CIRCLE:
        this.renderer.circle(
          startX,
          startY,
          size,
          nutStrokeWidth,
          nutStrokeColor,
          fingerOptions.color ?? color,
          classNamesWithShape,
        )
        break
      case Shape.SQUARE:
        this.renderer.rect(
          startX,
          startY,
          size,
          size,
          nutStrokeWidth,
          nutStrokeColor,
          classNamesWithShape,
          fingerOptions.color ?? color,
        )
        break
      case Shape.TRIANGLE:
        this.renderer.triangle(
          startX,
          startY,
          size,
          nutStrokeWidth,
          nutStrokeColor,
          classNamesWithShape,
          fingerOptions.color ?? color,
        )
        break
      case Shape.PENTAGON:
        this.renderer.pentagon(
          startX,
          startY,
          size,
          nutStrokeWidth,
          nutStrokeColor,
          fingerOptions.color ?? color,
          classNamesWithShape,
        )
        break
      default:
        throw new Error(
          `Invalid shape "${fingerOptions.shape}". Valid shapes are: ${Object.values(Shape)
            .map((val) => `"${val}"`)
            .join(', ')}.`,
        )
    }

    // draw text on the nut
    const textClassNames = [...classNames, `${ElementType.FINGER}-text`]
    if (fingerOptions.text) {
      this.renderer.text(
        fingerOptions.text,
        x,
        y,
        textSize,
        fingerOptions.textColor ?? nutTextColor,
        fontFamily,
        Alignment.MIDDLE,
        textClassNames,
        true,
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
      return this.drawTitle(size * (constants.width / width))
    }

    if (!this.settings.title && this.settings.fixedDiagramPosition) {
      remove()
    }

    return y + height + titleBottomMargin
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
}
