/* istanbul ignore file */
/*
Unfortunately this roughjs implementation can't be tested with jsdom at the moment. The problem is
that there is no SVG implementation for JSDOM. If that changes at some point this class can be
tested just like the svg.js implementation
 */

import { Alignment, GraphcisElement, Graphics } from './graphics'
import { Box, QuerySelector } from '@svgdotjs/svg.js'
import { RoughSVG } from 'roughjs/bin/svg'
import rough from 'roughjs'
import { Options } from 'roughjs/src/core'

export class RoughJsGraphics extends Graphics {
  private rc: RoughSVG
  private containerNode: HTMLElement
  private svgNode: SVGSVGElement

  constructor(container: QuerySelector | HTMLElement) {
    super(container)

    // initialize the container
    if (container instanceof Element) {
      this.containerNode = container
    } else {
      this.containerNode = (container as unknown) as HTMLElement
      const node = document.querySelector<HTMLElement>(container)

      if (!node) {
        throw new Error(`No element found with selector "${container}"`)
      }

      this.containerNode = node
    }

    // create an empty SVG element
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    this.svgNode.setAttribute('viewBox', '0 0 400 402')

    this.containerNode.appendChild(this.svgNode)

    this.rc = rough.svg(this.svgNode)
  }

  circle(
    x: number,
    y: number,
    diameter: number,
    strokeWidth: number,
    strokeColor: string,
    fill?: string
  ): GraphcisElement {
    const options: Options = {
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5
    }

    if (strokeWidth > 0) {
      options.strokeWidth = strokeWidth
    }

    const circle = this.rc.circle(x + diameter / 2, y + diameter / 2, diameter, options)

    this.svgNode.appendChild(circle)

    return this.boxToElement(circle.getBBox(), () => (circle ? circle.remove() : void 0))
  }

  clear(): void {
    while (this.svgNode.firstChild) {
      this.svgNode.removeChild(this.svgNode.firstChild)
    }

    this.rc = rough.svg(this.svgNode)
  }

  line(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, color: string): void {
    if (strokeWidth > 2) {
      this.rect(x1, y1, x2 - x1, strokeWidth, 0, color, color)
    } else {
      const line = this.rc.line(x1, y1, x2, y2, {
        strokeWidth,
        stroke: color
      })

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
    fill?: string,
    radius?: number
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
      hachureGap: 4
    })

    const rectRadius = radius || 0
    const path = this.roundedRectData(width, height, rectRadius, rectRadius, rectRadius, rectRadius)
    const rect = this.rc.path(path, {
      fill: fill || 'none',
      fillWeight: 2.5,
      stroke: strokeColor || fill || 'none',
      roughness: 1.5
    })
    rect.setAttribute('transform', `translate(${x}, ${y})`)
    this.svgNode.appendChild(rect)
    this.svgNode.appendChild(rect2)

    return this.boxToElement(rect.getBBox(), () => rect.remove())
  }

  size(width: number, height: number): void {
    this.svgNode.setAttribute('viewBox', `0 0 ${Math.ceil(width)} ${Math.ceil(height)}`)
  }

  text(
    text: string,
    x: number,
    y: number,
    fontSize: number,
    color: string,
    fontFamily: string,
    alignment: Alignment
  ): GraphcisElement {
    // Place the SVG namespace in a variable to easily reference it.
    const txtElem = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    txtElem.setAttributeNS(null, 'x', String(x))
    txtElem.setAttributeNS(null, 'y', String(y))
    txtElem.setAttributeNS(null, 'font-size', String(fontSize))
    txtElem.setAttributeNS(null, 'font-family', fontFamily)
    txtElem.setAttributeNS(null, 'align', alignment)

    txtElem.appendChild(document.createTextNode(text))

    this.svgNode.appendChild(txtElem)

    const bbox = txtElem.getBBox()

    let yOffset: number

    switch (alignment) {
      case Alignment.MIDDLE:
        yOffset = -(bbox.width / 2)
        break
      case Alignment.LEFT:
        yOffset = 0
        break
      case Alignment.RIGHT:
        yOffset = -bbox.width
        break
      default:
        throw new Error(`Invalid alignment ${alignment}`)
    }

    txtElem.setAttributeNS(null, 'x', String(x + yOffset))
    txtElem.setAttributeNS(null, 'y', String(y + bbox.height / 2))

    return this.boxToElement(txtElem.getBBox(), txtElem.remove.bind(txtElem))
  }

  private boxToElement(box: DOMRect, remove: () => void): GraphcisElement {
    return {
      width: box.width,
      height: box.height,
      x: box.x,
      y: box.y,
      remove
    }
  }

  private svgJsBoxToElement(box: Box, remove: () => void): GraphcisElement {
    return {
      width: box.width,
      height: box.height,
      x: box.x,
      y: box.y,
      remove
    }
  }

  private roundedRectData(
    w: number,
    h: number,
    tlr: number,
    trr: number,
    brr: number,
    blr: number
  ) {
    return (
      'M 0 ' +
      tlr +
      ' A ' +
      tlr +
      ' ' +
      tlr +
      ' 0 0 1 ' +
      tlr +
      ' 0' +
      ' L ' +
      (w - trr) +
      ' 0' +
      ' A ' +
      trr +
      ' ' +
      trr +
      ' 0 0 1 ' +
      w +
      ' ' +
      trr +
      ' L ' +
      w +
      ' ' +
      (h - brr) +
      ' A ' +
      brr +
      ' ' +
      brr +
      ' 0 0 1 ' +
      (w - brr) +
      ' ' +
      h +
      ' L ' +
      blr +
      ' ' +
      h +
      ' A ' +
      blr +
      ' ' +
      blr +
      ' 0 0 1 0 ' +
      (h - blr) +
      ' Z'
    )
  }
}
