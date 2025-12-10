import { QuerySelector } from '@svgdotjs/svg.js'

export enum Alignment {
  LEFT = 'left',
  MIDDLE = 'middle',
  RIGHT = 'right',
}

export enum ArcDirection {
  UP = 'up',
  LEFT = 'left',
}

export interface GraphcisElement {
  width: number
  height: number
  x: number
  y: number
  remove: () => void
}

export abstract class Renderer {
  protected constructor(protected container: QuerySelector | HTMLElement) {}

  abstract line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeWidth: number,
    color: string,
    classes?: string | string[],
  ): void

  abstract size(width: number, height: number): void

  abstract clear(): void

  abstract remove(): void

  abstract background(color: string): void

  abstract title(title: string): void

  abstract text(
    text: string,
    x: number,
    y: number,
    fontSize: number,
    color: string,
    fontFamily: string,
    alignment: Alignment,
    classes?: string | string[],
    plain?: boolean,
  ): GraphcisElement

  abstract circle(
    x: number,
    y: number,
    diameter: number,
    strokeWidth: number,
    strokeColor: string,
    fill?: string,
    classes?: string | string[],
  ): GraphcisElement

  abstract rect(
    x: number,
    y: number,
    width: number,
    height: number,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string,
    radius?: number,
  ): GraphcisElement

  abstract arc(
    x: number,
    y: number,
    width: number,
    height: number,
    direction: ArcDirection,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string,
  ): GraphcisElement

  abstract triangle(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    classes?: string | string[],
    fill?: string,
  ): GraphcisElement

  abstract pentagon(
    x: number,
    y: number,
    size: number,
    strokeWidth: number,
    strokeColor: string,
    fill?: string,
    classes?: string | string[],
  ): GraphcisElement

  protected static trianglePath(x: number, y: number, size: number): string {
    return `M${x + size / 2} ${y} L${x + size} ${y + size} L${x} ${y + size}`
  }

  protected static ngonPath(x: number, y: number, size: number, edges: number): string {
    let i: number
    let a: number
    const degrees = 360 / edges
    const radius = size / 2
    const points: [number, number][] = []

    let curX = x
    let curY = y

    for (i = 0; i < edges; i += 1) {
      a = i * degrees - 90

      curX = radius + radius * Math.cos((a * Math.PI) / 180)
      curY = radius + radius * Math.sin((a * Math.PI) / 180)

      points.push([curX, curY])
    }

    const lines = points.reduce((acc, [posX, posY]) => `${acc} L${posX} ${posY}`, '')

    return `M${curX} ${curY} ${lines}`
  }

  protected static arcBarrePath(
    x: number,
    y: number,
    width: number,
    height: number,
    direction: ArcDirection,
  ): string {
    // arc thickness (0-1): higher means thicker
    const thickness = 0.35
    const t = Math.max(0, Math.min(1, 1 - thickness))

    let xStart: number, yStart: number
    let xEnd: number, yEnd: number
    let cxOuter: number, cyOuter: number
    let cxInner: number, cyInner: number

    switch (direction) {
      case ArcDirection.UP: {
        xStart = x
        yStart = y + height
        xEnd = x + width
        yEnd = y + height

        cxOuter = x + width / 2
        cyOuter = y - height

        cxInner = cxOuter
        cyInner = yStart - height * 2 * t
        break
      }

      case ArcDirection.LEFT: {
        xStart = x + width
        yStart = y
        xEnd = x + width
        yEnd = y + height

        cxOuter = x - width
        cyOuter = y + height / 2

        cxInner = xStart - width * 2 * t
        cyInner = cyOuter
        break
      }
    }

    return [
      `M ${xStart} ${yStart}`,
      `Q ${cxOuter} ${cyOuter} ${xEnd} ${yEnd}`,
      `Q ${cxInner} ${cyInner} ${xStart} ${yStart}`,
      `Z`,
    ].join(' ')
  }

  protected static toClassName(classes?: string | string[]): string {
    if (!classes) {
      return ''
    }

    return Array.isArray(classes) ? classes.join(' ') : classes
  }
}
