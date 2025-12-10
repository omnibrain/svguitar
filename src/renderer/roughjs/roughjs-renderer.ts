/* istanbul ignore file */
/*
Unfortunately this roughjs implementation can't be tested with jsdom at the moment. The problem is
that there is no SVG implementation for JSDOM. If that changes at some point this class can be
tested just like the svg.js implementation
 */

import { Array, DOMRect, QuerySelector } from '@svgdotjs/svg.js'
import { RoughSVG } from 'roughjs/bin/svg'
import rough from 'roughjs'
import { Options } from 'roughjs/bin/core'
import defs from './defs'
import { Alignment, ArcDirection, GraphcisElement, Renderer } from '../renderer'

/**
 * Currently the font is hard-coded to 'Patrick Hand' when using the handdrawn chord diagram style.
 * The reason is that the font needs to be base64 encoded and embedded in the SVG. In theory a web-font
 * could be downloaded, base64 encoded and embedded in the SVG but that's too much of a hassle. But if the
 * need arises it should be possible.
 */
const FONT_FAMLILY = 'Patrick Hand'

export class RoughJsRenderer extends Renderer {
  private rc: RoughSVG

  private containerNode: HTMLElement

  private svgNode: SVGSVGElement

  constructor(container: QuerySelector | HTMLElement) {
    super(container)

    // initialize the container
    if (container instanceof HTMLElement) {
      this.containerNode = container
    } else {
      this.containerNode = container as unknown as HTMLElement
      const node = document.querySelector<HTMLElement>(container)

      if (!node) {
        throw new Error(`No element found with selector "${container}"`)
      }

      this.containerNode = node
    }

    // create an empty SVG element
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svgNode.setAttribute('version', '1.1')
    this.svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    this.svgNode.setAttribute('xmlns:svgjs', 'http://svgjs.com/svgjs')

    this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    this.svgNode.setAttribute('viewBox', '0 0 400 400')

    this.embedDefs()

    this.containerNode.appendChild(this.svgNode)

    this.rc = rough.svg(this.svgNode)
  }

  /**
   * This will embed all defs defined in the defs.html file. Specifically this is used to embed the base64
   * encoded font into the SVG so that the font always looks correct.
   */
  private embedDefs() {
    /*
    Embed the base64 encoded font. This is done in a timeout because roughjs also creates defs which will simply overwrite existing defs.
    By putting this in a timeout we make sure that the style tag is added after roughjs finished rendering.
    ATTENTION: This will only work as long as we're synchronously rendering the diagram! If we ever switch to asynchronous rendering a different
    solution must be found.
    */
    setTimeout(() => {
      // check if defs were already added
      if (this.svgNode.querySelector('defs [data-svguitar-def]')) {
        return
      }

      let currentDefs = this.svgNode.querySelector('defs')

      if (!currentDefs) {
        currentDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        this.svgNode.prepend(currentDefs)
      }

      // create dom nodes from HTML string
      const template = document.createElement('template')
      template.innerHTML = defs.trim()

      // typescript is complaining when I access content.firstChild.children, therefore this ugly workaround.
      const defsToAdd = template.content.firstChild?.firstChild?.parentElement?.children

      if (defsToAdd) {
        Array.from(defsToAdd).forEach((def) => {
          def.setAttribute('data-svguitar-def', 'true')
          currentDefs?.appendChild(def)
        })
      }
    })
  }

  title(title: string): void {
    const titleEl = document.createElement('title')
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
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    }

    if (strokeWidth > 0) {
      options.strokeWidth = strokeWidth
    }

    const circle = this.rc.circle(x + diameter / 2, y + diameter / 2, diameter, options)
    circle.classList.add(...RoughJsRenderer.toClassArray(classes))

    this.svgNode.appendChild(circle)

    return RoughJsRenderer.boxToElement(circle.getBBox(), () =>
      circle ? circle.remove() : undefined,
    )
  }

  clear(): void {
    while (this.svgNode.firstChild) {
      this.svgNode.removeChild(this.svgNode.firstChild)
    }

    this.rc = rough.svg(this.svgNode)
    this.embedDefs()
  }

  remove(): void {
    this.svgNode.remove()
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
        strokeWidth,
        stroke: color,
      })

      line.classList.add(...RoughJsRenderer.toClassArray(classes))
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
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    rect.setAttribute('transform', `translate(${x}, ${y})`)
    rect.classList.add(...RoughJsRenderer.toClassArray(classes))
    rect2.classList.add(...RoughJsRenderer.toClassArray(classes))
    this.svgNode.appendChild(rect)
    this.svgNode.appendChild(rect2)

    return RoughJsRenderer.boxToElement(rect.getBBox(), () => rect.remove())
  }


  arc(x: number,
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
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })

    arc.classList.add(...RoughJsRenderer.toClassArray(classes))
    this.svgNode.appendChild(arc)

    return RoughJsRenderer.boxToElement(arc.getBBox(), () => arc.remove())
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
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    triangle.setAttribute('transform', `translate(${x}, ${y})`)
    triangle.classList.add(...RoughJsRenderer.toClassArray(classes))
    this.svgNode.appendChild(triangle)

    return RoughJsRenderer.boxToElement(triangle.getBBox(), () => triangle.remove())
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
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5,
    })
    pentagon.setAttribute('transform', `translate(${x}, ${y})`)
    pentagon.classList.add(...RoughJsRenderer.toClassArray(classes))
    this.svgNode.appendChild(pentagon)

    return RoughJsRenderer.boxToElement(pentagon.getBBox(), () => pentagon.remove())
  }

  size(width: number, height: number): void {
    this.svgNode.setAttribute('viewBox', `0 0 ${Math.ceil(width)} ${Math.ceil(height)}`)
  }

  background(color: string): void {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

    bg.setAttributeNS(null, 'width', '100%')
    bg.setAttributeNS(null, 'height', '100%')
    bg.setAttributeNS(null, 'fill', color)

    this.svgNode.insertBefore(bg, this.svgNode.firstChild)
  }

  text(
    text: string,
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
    const txtElem = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    txtElem.setAttributeNS(null, 'x', String(x))
    txtElem.setAttributeNS(null, 'y', String(y))
    txtElem.setAttributeNS(null, 'font-size', String(fontSize))
    txtElem.setAttributeNS(null, 'font-family', FONT_FAMLILY)
    txtElem.setAttributeNS(null, 'align', alignment)
    txtElem.setAttributeNS(null, 'fill', color)

    if (plain) {
      txtElem.setAttributeNS(null, 'dominant-baseline', 'central')
    }

    txtElem.appendChild(document.createTextNode(text))

    this.svgNode.appendChild(txtElem)

    const bbox = txtElem.getBBox()

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

    txtElem.classList.add(...RoughJsRenderer.toClassArray(classes))
    txtElem.setAttributeNS(null, 'x', String(x + xOffset))
    txtElem.setAttributeNS(null, 'y', String(y + (plain ? 0 : bbox.height / 2)))

    return RoughJsRenderer.boxToElement(txtElem.getBBox(), txtElem.remove.bind(txtElem))
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

}

export default RoughJsRenderer
