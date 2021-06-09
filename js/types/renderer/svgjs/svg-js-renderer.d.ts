import { QuerySelector } from '@svgdotjs/svg.js';
import { Alignment, GraphcisElement, Renderer } from '../renderer';
export declare class SvgJsRenderer extends Renderer {
    private svg;
    constructor(container: QuerySelector | HTMLElement);
    line(fromX: number, fromY: number, toX: number, toY: number, strokeWidth: number, color: string): void;
    size(width: number, height: number): void;
    clear(): void;
    remove(): void;
    background(color: string): void;
    text(text: string, x: number, y: number, fontSize: number, color: string, fontFamily: string, alignment: Alignment, plain?: boolean): GraphcisElement;
    circle(x: number, y: number, diameter: number, strokeWidth: number, strokeColor: string, fill?: string): GraphcisElement;
    rect(x: number, y: number, width: number, height: number, strokeWidth: number, strokeColor: string, fill?: string, radius?: number): GraphcisElement;
    triangle(x: number, y: number, size: number, strokeWidth: number, strokeColor: string, fill?: string | undefined): GraphcisElement;
    pentagon(x: number, y: number, size: number, strokeWidth: number, strokeColor: string, fill: string): GraphcisElement;
    private ngon;
    private static boxToElement;
}
export default SvgJsRenderer;
