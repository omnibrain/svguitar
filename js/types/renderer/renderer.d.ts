import { QuerySelector } from '@svgdotjs/svg.js';
export declare enum Alignment {
    LEFT = "left",
    MIDDLE = "middle",
    RIGHT = "right"
}
export interface GraphcisElement {
    width: number;
    height: number;
    x: number;
    y: number;
    remove: () => void;
}
export declare abstract class Renderer {
    protected container: QuerySelector | HTMLElement;
    protected constructor(container: QuerySelector | HTMLElement);
    abstract line(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, color: string): void;
    abstract size(width: number, height: number): void;
    abstract clear(): void;
    abstract remove(): void;
    abstract background(color: string): void;
    abstract text(text: string, x: number, y: number, fontSize: number, color: string, fontFamily: string, alignment: Alignment, plain?: boolean): GraphcisElement;
    abstract circle(x: number, y: number, diameter: number, strokeWidth: number, strokeColor: string, fill?: string): GraphcisElement;
    abstract rect(x: number, y: number, width: number, height: number, strokeWidth: number, strokeColor: string, fill?: string, radius?: number): GraphcisElement;
    abstract triangle(x: number, y: number, size: number, strokeWidth: number, strokeColor: string, fill?: string): GraphcisElement;
    abstract pentagon(x: number, y: number, size: number, strokeWidth: number, strokeColor: string, fill?: string): GraphcisElement;
    protected static trianglePath(x: number, y: number, size: number): string;
    protected static ngonPath(x: number, y: number, size: number, edges: number): string;
}
