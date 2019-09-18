import { Container, QuerySelector, Element, SVG } from '@svgdotjs/svg.js'
import { isNode } from './utils'

function range(length: number, from: number = 0): number[] {
  return Array.from({ length }, (_, i) => i + from)
}

// Chart input types (compatible with Vexchords input, see https://github.com/0xfe/vexchords)
export type SilentString = 'x'
export type OpenString = 0
export type Finger = [number, number | OpenString | SilentString, string?]
export type Barre = { fromString: number; toString: number; fret: number }
export type Chord = { fingers: Finger[]; barres: Barre[] }

const OPEN: OpenString = 0
const SILENT: SilentString = 'x'

export enum FretLabelPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ChordSettings {
  strings: number
  frets: number
  /**
   * The starting fret (first fret is 1)
   */
  position: number

  tuning: string[]

  /**
   * The position of the fret label (eg. "3fr")
   */
  fretLabelPosition: FretLabelPosition

  /**
   * The font size of the fret label
   */
  fretLabelFontSize: number

  /**
   * The font size of the string labels
   */
  tuningsFontSize: number

  /**
   * Size of a nut relative to the string spacing
   */
  nutSize: number

  /**
   * Color of a finger / nut
   */
  nutColor?: string

  /**
   * Height of a fret, relative to the space between two strings
   */
  fretSize: number

  /**
   * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
   * This is only applied if it's larger than the letters inside of the padding (eg the starting fret)
   */
  sidePadding: number

  title?: string
  titleFontSize: number
  titleBottomMargin: number

  color: string
  titleColor?: string
  stringColor?: string
  fretLabelColor?: string
  tuningsColor?: string
  fretColor?: string

  /**
   * Size of the Xs and Os above empty strings relative to the space between two strings
   */
  emptyStringIndicatorSize: number

  strokeWidth: number

  /**
   * The width of the top fret (only used if position is 1)
   */
  topFretWidth: number
}

const defaultChordSettings: ChordSettings = {
  strings: 5,
  frets: 5,
  position: 1,
  tuning: [],
  tuningsFontSize: 28,
  fretLabelFontSize: 38,
  fretLabelPosition: FretLabelPosition.RIGHT,
  nutSize: 0.75,
  sidePadding: 0.2,
  titleFontSize: 48,
  titleBottomMargin: 0,
  color: '#000',
  emptyStringIndicatorSize: 0.6,
  strokeWidth: 2,
  topFretWidth: 10,
  fretSize: 1.5
}

interface ChartConstants {
  width: number
  fontFamily: string
}

const constants: ChartConstants = {
  /**
   * The viewbox width of the svg
   */
  width: 400,
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
}

export class SVGuitarChord {
  private svg: Container
  private settings: ChordSettings

  private _chord: Chord = { fingers: [], barres: [] }

  constructor(
    private container: QuerySelector | HTMLElement,
    settings: Partial<ChordSettings> = {}
  ) {
    // initialize the SVG
    const width = constants.width
    const height = 0

    /*
    For some reason the container needs to be initiated differently with svgdom (node) and
    and in the browser. Might be a bug in either svg.js or svgdom. But this workaround works fine
    so I'm not going to care for now.
     */
    /* istanbul ignore else */
    if (isNode()) {
      // node (jest)
      this.svg = SVG(container) as Container
    } else {
      // browser
      this.svg = SVG().addTo(container)
    }

    this.svg.attr('preserveAspectRatio', 'xMidYMid meet').viewbox(0, 0, width, height)

    // initialize settings
    this.settings = { ...defaultChordSettings, ...settings }
  }

  configure(settings: Partial<ChordSettings> = {}) {
    this.settings = { ...this.settings, ...settings }

    return this
  }

  chord(chord: Chord): SVGuitarChord {
    this._chord = chord

    return this
  }

  draw() {
    this.clear()
    this.drawTopEdges()

    let y

    y = this.drawTitle(this.settings.titleFontSize)
    y = this.drawEmptyStringIndicators(y)
    y = this.drawTopFret(y)
    this.drawPosition(y)
    y = this.drawGrid(y)
    y = this.drawTunings(y)

    // now set the final height of the svg (and add some padding relative to the fret spacing)
    y = y + this.fretSpacing() / 10

    this.svg.viewbox(0, 0, constants.width, y)
  }

  private drawTunings(y: number) {
    // add some padding relative to the fret spacing
    const padding = this.fretSpacing() / 5
    const stringXPositions = this.stringXPos()
    const strings = this.settings.strings
    const color = this.settings.tuningsColor || this.settings.color

    let text: Element | undefined

    this.settings.tuning.map((tuning, i) => {
      if (i < strings) {
        const tuningText = this.svg
          .text(tuning)
          .move(stringXPositions[i], y + padding)
          .font({
            family: constants.fontFamily,
            size: this.settings.tuningsFontSize,
            anchor: 'middle'
          })
          .fill(color)

        if (tuning) {
          text = tuningText
        }
      }
    })

    if (text) {
      return y + text.bbox().height + padding * 2
    } else {
      return y
    }
  }

  private drawPosition(y: number): void {
    if (this.settings.position <= 1) {
      return
    }

    const stringXPositions = this.stringXPos()
    const endX = stringXPositions[stringXPositions.length - 1]
    const startX = stringXPositions[0]
    const text = `${this.settings.position}fr`
    const size = this.settings.fretLabelFontSize
    const color = this.settings.fretLabelColor || this.settings.color

    // add some padding relative to the streing spacing
    const padding = this.stringSpacing() / 5

    if (this.settings.fretLabelPosition === FretLabelPosition.RIGHT) {
      this.svg
        .text(text)
        .move(endX + padding, y)
        .font({
          family: constants.fontFamily,
          size,
          anchor: 'start'
        })
        .fill(color)
    } else {
      this.svg
        .text(text)
        .move(startX - padding, y)
        .font({
          family: constants.fontFamily,
          size,
          anchor: 'end'
        })
        .fill(color)
    }
  }

  /**
   * Hack to prevent the empty space of the svg from being cut off without having to define a
   * fixed width
   */
  private drawTopEdges() {
    this.svg.circle(1).move(constants.width, 0)
    this.svg.circle(1).move(0, 0)
  }

  private drawTopFret(y: number): number {
    const stringXpositions = this.stringXPos()
    const strokeWidth = this.settings.strokeWidth / 2
    const startX = stringXpositions[0] - strokeWidth
    const endX = stringXpositions[stringXpositions.length - 1] + strokeWidth

    let fretSize: number
    if (this.settings.position > 1) {
      fretSize = this.settings.strokeWidth
    } else {
      fretSize = this.settings.topFretWidth
    }

    this.svg
      .line(startX, y + fretSize / 2, endX, y + fretSize / 2)
      .stroke({ color: this.settings.fretColor || this.settings.color, width: fretSize })

    return y + fretSize
  }

  private stringXPos(): number[] {
    const strings = this.settings.strings
    const startX = constants.width * this.settings.sidePadding
    const stringsSpacing = this.stringSpacing()

    return range(strings).map(i => startX + stringsSpacing * i)
  }

  private stringSpacing(): number {
    const strings = this.settings.strings
    const startX = constants.width * this.settings.sidePadding
    const endX = constants.width - startX
    const width = endX - startX

    return width / (strings - 1)
  }

  private fretSpacing(): number {
    const stringSpacing = this.stringSpacing()

    return stringSpacing * this.settings.fretSize
  }

  private fretLinesYPos(startY: number): number[] {
    const frets = this.settings.frets
    const fretSpacing = this.fretSpacing()

    return range(frets, 1).map(i => startY + fretSpacing * i)
  }

  private toArrayIndex(stringIndex: number): number {
    return Math.abs(stringIndex - this.settings.strings)
  }

  private drawEmptyStringIndicators(y: number): number {
    const stringXPositions = this.stringXPos()
    const stringSpacing = this.stringSpacing()
    const size = this.settings.emptyStringIndicatorSize * stringSpacing
    const padding = size / 3 // add some space above and below the indicator, relative to the indicator size

    let hasEmpty = false

    const stroke = {
      width: this.settings.strokeWidth,
      color: this.settings.color
    }

    this._chord.fingers
      .filter(([_, value]) => value === SILENT || value === OPEN)
      .map<Finger>(([index, value]) => [this.toArrayIndex(index), value])
      .forEach(([stringIndex, value]) => {
        hasEmpty = true

        if (value === OPEN) {
          // draw an O
          this.svg
            .circle(size)
            .move(stringXPositions[stringIndex] - size / 2, y + padding)
            .fill('none')
            .stroke(stroke)
        } else {
          // draw an X
          const startX = stringXPositions[stringIndex] - size / 2
          const endX = startX + size
          const startY = y + padding
          const endY = startY + size
          this.svg.line(startX, startY, endX, endY).stroke(stroke)
          this.svg.line(startX, endY, endX, startY).stroke(stroke)
        }
      })

    return hasEmpty ? y + size + 2 * padding : y + padding
  }

  private drawGrid(y: number): number {
    const frets = this.settings.frets
    const stringXPositions = this.stringXPos()
    const fretYPositions = this.fretLinesYPos(y)
    const stringSpacing = this.stringSpacing()
    const fretSpacing = stringSpacing * this.settings.fretSize
    const height = fretSpacing * frets

    const startX = stringXPositions[0]
    const endX = stringXPositions[stringXPositions.length - 1]

    // draw frets
    fretYPositions.forEach(fretY => {
      this.svg.line(startX, fretY, endX, fretY).stroke({
        width: this.settings.strokeWidth,
        color: this.settings.fretColor || this.settings.color
      })
    })

    // draw strings
    stringXPositions.forEach(stringX => {
      this.svg.line(stringX, y, stringX, y + height).stroke({
        width: this.settings.strokeWidth,
        color: this.settings.stringColor || this.settings.color
      })
    })

    // draw fingers
    const nutSize = this.settings.nutSize * stringSpacing
    const nutColor = this.settings.nutColor || this.settings.color
    this._chord.fingers
      .filter(([_, value]) => value !== SILENT && value !== OPEN)
      .map(([stringIndex, fretIndex]) => [this.toArrayIndex(stringIndex), fretIndex as number])
      .forEach(([stringIndex, fretIndex]) => {
        this.svg
          .circle(nutSize)
          .move(
            startX - nutSize / 2 + stringIndex * stringSpacing,
            y - fretSpacing / 2 - nutSize / 2 + fretIndex * fretSpacing
          )
          .fill(nutColor)
      })

    return y + height
  }

  private drawTitle(size: number): number {
    // draw the title
    const text = this.svg
      .text(this.settings.title || '')
      .fill(this.settings.color)
      .move(constants.width / 2, 5)
      .font({
        family: constants.fontFamily,
        size,
        anchor: 'middle'
      })

    // check if the title fits. If not, try with a smaller size
    const bbox = text.bbox()
    if (bbox.x < -0.0001) {
      text.remove()

      // try again with smaller font
      return this.drawTitle(size * (constants.width / bbox.width))
    }

    return bbox.y + bbox.height + this.settings.titleBottomMargin
  }

  clear() {
    for (let child of this.svg.children()) {
      child.remove()
    }
  }
}

export default SVGuitarChord
