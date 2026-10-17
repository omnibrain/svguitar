/* istanbul ignore file */

import { Array, DOMRect, QuerySelector, getWindow } from '@svgdotjs/svg.js'
import { RoughSVG } from 'roughjs/bin/svg'
import rough from 'roughjs'
import { Options } from 'roughjs/bin/core'
import defs from './defs'
import patrickHandWoff2 from './patrick-hand'
import { Alignment, ArcDirection, GraphcisElement, Renderer, TextSegment } from '../renderer'

/**
 * Currently the font is hard-coded to 'Patrick Hand' when using the handdrawn chord diagram style.
 * The reason is that the font needs to be base64 encoded and embedded in the SVG. In theory a web-font
 * could be downloaded, base64 encoded and embedded in the SVG but that's too much of a hassle. But if the
 * need arises it should be possible.
 */
const FONT_FAMLILY = 'Patrick Hand'

/**
 * Seed for the random variations of the shapes, so the same diagram is always drawn identically.
 */
const SEED = 42

const fontFaces = new WeakMap<Document, FontFace>()

/**
 * Text is measured while drawing, so the font has to be available to the document by then. The
 * font embedded in the SVG only loads once the SVG is part of the document, and asynchronously, so
 * it's also added to the document's fonts directly.
 */
function loadFont(doc: Document): Promise<unknown> | undefined {
  if (typeof FontFace === 'undefined' || !doc.fonts) {
    return undefined
  }

  let face = fontFaces.get(doc)

  if (!face) {
    face = new FontFace(
      FONT_FAMLILY,
      Uint8Array.from(atob(patrickHandWoff2), (c) => c.charCodeAt(0)),
    )
    doc.fonts.add(face)
    fontFaces.set(doc, face)
  }

  return face.status === 'loaded' || face.status === 'error' ? undefined : face.load()
}

export class RoughJsRenderer extends Renderer {
  private rc: RoughSVG

  private containerNode?: HTMLElement

  private doc: Document

  private svgNode: SVGSVGElement

  private backgroundElement?: SVGRectElement

  private randomState = SEED

  constructor(container?: QuerySelector | HTMLElement) {
    super(container)

    if (typeof container === 'string') {
      const node = document.querySelector<HTMLElement>(container)

      if (!node) {
        throw new Error(`No element found with selector "${container}"`)
      }

      this.containerNode = node
    } else {
      this.containerNode = container
    }

    // Use the container's own document instead of the global `document` so this renderer also
    // works in environments (e.g. server-side rendering with svgdom) where there is no global
    // `document`, only the one associated with the container node. Without a container, fall
    // back to the document registered with svg.js, which is the global one in a browser.
    const doc = this.containerNode?.ownerDocument ?? getWindow()?.document

    if (!doc) {
      throw new Error(
        'No document available. Pass a container or, outside a browser, register a window ' +
          'with registerWindow() from @svgdotjs/svg.js (e.g. using svgdom).',
      )
    }

    this.doc = doc

    // create an empty SVG element
    this.svgNode = this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svgNode.setAttribute('version', '1.1')
    this.svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    this.svgNode.setAttribute('xmlns:svgjs', 'http://svgjs.com/svgjs')

    this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    this.svgNode.setAttribute('viewBox', '0 0 400 400')

    this.embedDefs()

    this.containerNode?.appendChild(this.svgNode)

    this.rc = rough.svg(this.svgNode)

    loadFont(this.doc)
  }

  /**
   * This will embed all defs defined in the defs.html file. Specifically this is used to embed the base64
   * encoded font into the SVG so that the font always looks correct.
   */
  private embedDefs() {
    // check if defs were already added
    if (this.svgNode.querySelector('defs [data-svguitar-def]')) {
      return
    }

    let currentDefs = this.svgNode.querySelector('defs')

    if (!currentDefs) {
      currentDefs = this.doc.createElementNS('http://www.w3.org/2000/svg', 'defs')
      this.svgNode.prepend(currentDefs)
    }

    // create dom nodes from HTML string. A plain container element (rather than a <template>) is
    // used here since svgdom, which renders diagrams server-side (e.g. in tests), doesn't implement
    // HTMLTemplateElement's `.content`.
    const container = this.doc.createElement('div')
    container.innerHTML = defs.trim()

    const defsToAdd = container.querySelector('defs')?.children

    if (defsToAdd) {
      Array.from(defsToAdd).forEach((def) => {
        def.setAttribute('data-svguitar-def', 'true')
        currentDefs?.appendChild(def)
      })
    }
  }

  title(title: string): void {
    const titleEl = this.doc.createElement('title')
    titleEl.textContent = title
    this.svgNode.appendChild(titleEl)
  }

  circle(
    x: number,
    y: number,
    diameter: number,
    strokeWidth: number,
    strokeColor: string,
    fill?: string,
    classes?: string | string[],
  ): GraphcisElement {
    const options: Options = {
      seed: this.nextSeed(),
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    }

    if (strokeWidth > 0) {
      options.strokeWidth = strokeWidth
    }

    const circle = this.rc.circle(x + diameter / 2, y + diameter / 2, diameter, options)
    RoughJsRenderer.addClasses(circle, classes)

    this.svgNode.appendChild(circle)

    return RoughJsRenderer.boxToElement(this.bbox(circle), () =>
      circle ? circle.remove() : undefined,
    )
  }

  clear(): void {
    while (this.svgNode.firstChild) {
      this.svgNode.removeChild(this.svgNode.firstChild)
    }

    delete this.backgroundElement
    this.rc = rough.svg(this.svgNode)
    this.randomState = SEED
    this.embedDefs()
  }

  fontsLoading(): Promise<unknown> | undefined {
    return loadFont(this.doc)
  }

  /**
   * rough.js varies a shape based on its seed, so every shape gets its own seed. Otherwise all
   * shapes of the same size would wobble identically. The seeds are generated with a Lehmer RNG,
   * which never yields 0 (a seed of 0 makes rough.js fall back to Math.random()).
   */
  private nextSeed(): number {
    this.randomState = (this.randomState * 48271) % 2147483647

    return this.randomState
  }

  remove(): void {
    this.svgNode.remove()
  }

  toSvgString(): string {
    const svg = this.svgNode.outerHTML

    if (svg.includes('xmlns=')) {
      return svg
    }

    return svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeWidth: number,
    color: string,
    classes?: string | string[],
  ): void {
    if (strokeWidth > 5 && (x1 - x2 === 0 || y1 - y2 === 0)) {
      if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
        this.rect(x1, y1, x2 - x1, strokeWidth, 0, color, color)
      } else {
        this.rect(x1 - strokeWidth / 2, y1, strokeWidth, y2 - y1, 0, color, color)
      }
    } else {
      const line = this.rc.line(x1, y1, x2, y2, {
        seed: this.nextSeed(),
        strokeWidth,
        stroke: color,
      })

      RoughJsRenderer.addClasses(line, classes)
      this.svgNode.appendChild(line)
    }
  }

  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string,
    radius?: number,
  ): GraphcisElement {
    const rect2 = this.rc.rectangle(x, y, width, height, {
      seed: this.nextSeed(),
      // fill: fill || 'none',
      fill: 'none',
      fillWeight: 2,
      strokeWidth,
      stroke: strokeColor,
      roughness: 2.8,
      fillStyle: 'cross-hatch',
      hachureAngle: 60, // angle of hachure,
      hachureGap: 4,
    })

    const rectRadius = radius || 0
    const path = RoughJsRenderer.roundedRectData(
      width,
      height,
      rectRadius,
      rectRadius,
      rectRadius,
      rectRadius,
    )
    const rect = this.rc.path(path, {
      seed: this.nextSeed(),
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    rect.setAttribute('transform', `translate(${x}, ${y})`)
    RoughJsRenderer.addClasses(rect, classes)
    RoughJsRenderer.addClasses(rect2, classes)
    this.svgNode.appendChild(rect)
    this.svgNode.appendChild(rect2)

    return RoughJsRenderer.boxToElement(this.bbox(rect), () => rect.remove())
  }

  arc(
    x: number,
    y: number,
    width: number,
    height: number,
    direction: ArcDirection,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string,
  ): GraphcisElement {
    const path = Renderer.arcBarrePath(x, y, width, height, direction)

    const arc = this.rc.path(path, {
      seed: this.nextSeed(),
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })

    RoughJsRenderer.addClasses(arc, classes)
    this.svgNode.appendChild(arc)

    return RoughJsRenderer.boxToElement(this.bbox(arc), () => arc.remove())
  }

  triangle(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string | undefined,
  ): GraphcisElement {
    const triangle = this.rc.path(Renderer.trianglePath(0, 0, size), {
      seed: this.nextSeed(),
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    triangle.setAttribute('transform', `translate(${x}, ${y})`)
    RoughJsRenderer.addClasses(triangle, classes)
    this.svgNode.appendChild(triangle)

    return RoughJsRenderer.boxToElement(this.bbox(triangle), () => triangle.remove())
  }

  pentagon(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    fill?: string,
    classes?: string | string[],
    spikes = 5,
  ): GraphcisElement {
    const pentagon = this.rc.path(Renderer.ngonPath(0, 0, size, spikes), {
      seed: this.nextSeed(),
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    pentagon.setAttribute('transform', `translate(${x}, ${y})`)
    RoughJsRenderer.addClasses(pentagon, classes)
    this.svgNode.appendChild(pentagon)

    return RoughJsRenderer.boxToElement(this.bbox(pentagon), () => pentagon.remove())
  }

  size(width: number, height: number, x = 0, y = 0): void {
    this.svgNode.setAttribute(
      'viewBox',
      `${Math.floor(x)} ${Math.floor(y)} ${Math.ceil(width)} ${Math.ceil(height)}`,
    )
    this.backgroundElement?.setAttributeNS(null, 'x', String(Math.floor(x)))
    this.backgroundElement?.setAttributeNS(null, 'y', String(Math.floor(y)))
  }

  background(color: string): void {
    const bg = this.doc.createElementNS('http://www.w3.org/2000/svg', 'rect')

    bg.setAttributeNS(null, 'width', '100%')
    bg.setAttributeNS(null, 'height', '100%')
    bg.setAttributeNS(null, 'fill', color)

    this.backgroundElement = bg
    this.svgNode.insertBefore(bg, this.svgNode.firstChild)
  }

  text(
    text: string | TextSegment[],
    x: number,
    y: number,
    fontSize: number,
    color: string,
    fontFamily: string,
    alignment: Alignment,
    classes?: string | string[],
    plain?: boolean,
  ): GraphcisElement {
    // Place the SVG namespace in a variable to easily reference it.
    const txtElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'text')

    txtElem.setAttributeNS(null, 'x', String(x))
    txtElem.setAttributeNS(null, 'y', String(y))
    txtElem.setAttributeNS(null, 'font-size', String(fontSize))
    txtElem.setAttributeNS(null, 'font-family', FONT_FAMLILY)
    txtElem.setAttributeNS(null, 'align', alignment)
    txtElem.setAttributeNS(null, 'fill', color)

    if (plain) {
      txtElem.setAttributeNS(null, 'dominant-baseline', 'central')
    }

    if (typeof text === 'string') {
      txtElem.appendChild(this.doc.createTextNode(text))
    } else {
      Renderer.textSpans(text, fontSize).forEach((span) => {
        const tspan = this.doc.createElementNS('http://www.w3.org/2000/svg', 'tspan')
        tspan.setAttributeNS(null, 'font-size', String(span.fontSize))
        if (span.dy) {
          tspan.setAttributeNS(null, 'dy', String(span.dy))
        }
        tspan.appendChild(this.doc.createTextNode(span.text))
        txtElem.appendChild(tspan)
      })
    }

    this.svgNode.appendChild(txtElem)

    const bbox = this.bbox(txtElem)

    let xOffset: number

    switch (alignment) {
      case Alignment.MIDDLE:
        xOffset = -(bbox.width / 2)
        break
      case Alignment.LEFT:
        xOffset = 0
        break
      case Alignment.RIGHT:
        xOffset = -bbox.width
        break
      default:
        throw new Error(`Invalid alignment ${alignment}`)
    }

    RoughJsRenderer.addClasses(txtElem, classes)
    txtElem.setAttributeNS(null, 'x', String(x + xOffset))
    txtElem.setAttributeNS(null, 'y', String(y + (plain ? 0 : bbox.height / 2)))

    return RoughJsRenderer.boxToElement(this.bbox(txtElem), txtElem.remove.bind(txtElem))
  }

  /**
   * Browsers return an empty bounding box for elements that are not part of the document, so a
   * detached (headless) diagram is briefly attached to the document while it's being measured.
   */
  private bbox(element: SVGGraphicsElement): ReturnType<SVGGraphicsElement['getBBox']> {
    if (this.containerNode) {
      return element.getBBox()
    }

    const host = this.doc.body ?? this.doc.documentElement
    host.appendChild(this.svgNode)

    try {
      return element.getBBox()
    } finally {
      this.svgNode.remove()
    }
  }

  private static boxToElement(box: DOMRect, remove: () => void): GraphcisElement {
    return {
      width: box.width ?? 0,
      height: box.height ?? 0,
      x: box.x ?? 0,
      y: box.y ?? 0,
      remove,
    }
  }

  private static roundedRectData(
    w: number,
    h: number,
    tlr: number,
    trr: number,
    brr: number,
    blr: number,
  ): string {
    return (
      `M 0 ${tlr} A ${tlr} ${tlr} 0 0 1 ${tlr} 0` +
      ` L ${w - trr} 0` +
      ` A ${trr} ${trr} 0 0 1 ${w} ${trr} L ${w} ${h - brr} A ${brr} ${brr} 0 0 1 ${
        w - brr
      } ${h} L ${blr} ${h} A ${blr} ${blr} 0 0 1 0 ${h - blr} Z`
    )
  }

  private static toClassArray(classes?: string | string[]): string[] {
    if (!classes) {
      return []
    }

    return Renderer.toClassName(classes).split(' ')
  }

  /**
   * Adds classes to an SVG element via the "class" attribute rather than the classList API, since
   * classList isn't implemented by svgdom (used to render server-side / in tests).
   */
  private static addClasses(element: Element, classes?: string | string[]): void {
    const classArray = RoughJsRenderer.toClassArray(classes)

    if (classArray.length === 0) {
      return
    }

    const existingClasses = element.getAttribute('class')
    const mergedClasses = existingClasses
      ? `${existingClasses} ${classArray.join(' ')}`
      : classArray.join(' ')

    element.setAttribute('class', mergedClasses)
  }
}

export default RoughJsRenderer
