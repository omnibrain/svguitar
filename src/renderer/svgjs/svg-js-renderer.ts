import { Box, Container, QuerySelector, SVG } from '@svgdotjs/svg.js'
import { Alignment, GraphcisElement, Renderer } from '../renderer'
import { constants } from '../../constants'
import { isNode } from "../../utils/is-node"

export class SvgJsRenderer extends Renderer {
  private svg: Container

  constructor(container: QuerySelector | HTMLElement) {
    super(container)

    // initialize the SVG
    const { width } = constants
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
  }

  line(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    strokeWidth: number,
    color: string,
  ): void {
    this.svg.line(fromX, fromY, toX, toY).stroke({ color, width: strokeWidth })
  }

  size(width: number, height: number): void {
    this.svg.viewbox(0, 0, width, height)
  }

  clear(): void {
    this.svg.children().forEach((child) => child.remove())
  }

  remove(): void {
    this.svg.remove()
  }

  background(color: string): void {
    this.svg.rect().size('100%', '100%').fill(color)
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
    let element

    if (plain) {
      // create a text element centered at x,y. No SVG.js magic.
      element = this.svg
        .plain(text)
        .attr({
          x,
          y,
        })
        .font({
          family: fontFamily,
          size: fontSize,
          anchor: alignment,
          'dominant-baseline': 'central',
        })
        .fill(color)
        .addClass(Renderer.toClassName(classes))
    } else {
      element = this.svg
        .text(text)
        .move(x, y)
        .font({
          family: fontFamily,
          size: fontSize,
          anchor: alignment,
        })
        .fill(color)
        .addClass(Renderer.toClassName(classes))
    }

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
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
    const element = this.svg
      .circle(diameter)
      .move(x, y)
      .fill(fill || 'none')
      .stroke({
        color: strokeColor,
        width: strokeWidth,
      })
      .addClass(Renderer.toClassName(classes))

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
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
    const element = this.svg
      .rect(width, height)
      .move(x, y)
      .fill(fill || 'none')
      .stroke({
        width: strokeWidth,
        color: strokeColor,
      })
      .radius(radius || 0)
      .addClass(Renderer.toClassName(classes))

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
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
    const element = this.svg
      .path(Renderer.trianglePath(x, y, size))
      .move(x, y)
      .fill(fill || 'none')
      .stroke({
        width: strokeWidth,
        color: strokeColor,
      })
      .addClass(Renderer.toClassName(classes))

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
  }

  pentagon(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    fill: string,
    classes?: string | string[],
  ): GraphcisElement {
    return this.ngon(x, y, size, strokeWidth, strokeColor, fill, 5, classes)
  }

  private ngon(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    fill: string,
    edges: number,
    classes?: string | string[],
  ) {
    const element = this.svg
      .path(Renderer.ngonPath(x, y, size, edges))
      .move(x, y)
      .fill(fill || 'none')
      .stroke({
        width: strokeWidth,
        color: strokeColor,
      })
      .addClass(Renderer.toClassName(classes))

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
  }

  private static boxToElement(box: Box, remove: () => void): GraphcisElement {
    return {
      width: box.width,
      height: box.height,
      x: box.x,
      y: box.y,
      remove,
    }
  }
}

export default SvgJsRenderer
