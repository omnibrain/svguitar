import { Box, Container, QuerySelector, SVG } from '@svgdotjs/svg.js'
import { Alignment, ArcDirection, GraphcisElement, Renderer } from '../renderer'
import { constants } from '../../constants'

export class SvgJsRenderer extends Renderer {
  private svg: Container

  constructor(container: QuerySelector | HTMLElement) {
    super(container)

    // initialize the SVG
    const { width } = constants
    const height = 0

    this.svg = SVG().addTo(container)

    this.svg.attr('preserveAspectRatio', 'xMidYMid meet').viewbox(0, 0, width, height)
  }

  title(title: string): void {
    this.svg.add(this.svg.element('title').words(title))
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
          anchor: alignment === Alignment.RIGHT ? 'end' : alignment,
          'dominant-baseline': 'central',
        })
        .fill(color)
        .addClass(Renderer.toClassName(classes))
    } else {
      // the font must be set before positioning because the vertical position is
      // derived from the text's bounding box, which changes with the font settings.
      // x is set as a raw attribute so that text-anchor aligns the text around it,
      // while y() places the top of the bounding box at the given position.
      element = this.svg
        .text(text)
        .font({
          family: fontFamily,
          size: fontSize,
          anchor: alignment === Alignment.RIGHT ? 'end' : alignment,
        })
        .ax(String(x))
      element.y(y)
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

    const element = this.svg
      .path(path)
      .stroke({
        width: strokeWidth,
        color: strokeColor,
        linecap: 'round',
      })
      .fill({
        color: fill,
      })
      .addClass(Renderer.toClassName(classes))

    // this.rect(x, y, width, height, strokeWidth, strokeColor, classes, 'rgba(0, 0, 0, 0.2)') // TODO: remove rectangle

    return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element))
  }
}

export default SvgJsRenderer
