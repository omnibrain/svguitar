// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import { Container, QuerySelector, SVG } from '@svgdotjs/svg.js'
import range from 'lodash.range'

// Chart input types (compatible with Vexchords input, see https://github.com/0xfe/vexchords)
export type SilentString = 'x'
export type OpenString = 0
export type Finger = [number, number | OpenString | SilentString, string?]
export type Barre = { fromString: number; toString: number; fret: number }
export type Chord = { fingers: Finger[]; barres: Barre[] }

const OPEN: OpenString = 0
const SILENT: SilentString = 'x'

export interface ChordSettings {
  strings: number
  frets: number
  /**
   * The starting fret (first fret is 1)
   */
  position: number
  /**
   * Size of a nut relative to the string spacing
   */
  nutSize: number

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
    this.svg = SVG()
      .addTo(container)
      .viewbox(0, 0, constants.width, constants.width * 1.5)
      .attr('preserveAspectRatio', 'xMidYMid meet')

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

    let y

    y = this.drawTitle(this.settings.titleFontSize)
    y = this.drawEmptyStringIndicators(y)
    y = this.drawTopFret(y)
    this.drawGrid(y)
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

    return range(1, frets + 1).map(i => startY + fretSpacing * i)
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
          this.svg
            .circle(size)
            .move(stringXPositions[stringIndex] - size / 2, y + padding)
            .fill('none')
            .stroke(stroke)
        } else if (value === SILENT) {
          const startX = stringXPositions[stringIndex] - size / 2
          const endX = startX + size
          const startY = y + padding
          const endY = startY + size
          this.svg.line(startX, startY, endX, endY).stroke(stroke)
          this.svg.line(startX, endY, endX, startY).stroke(stroke)
        } else {
          throw new Error(`Invalid empty string value: ${value}`)
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
    if (bbox.x < 0) {
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
