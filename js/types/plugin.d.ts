import type { SVGuitarChord } from './svguitar';
export declare type ApiExtension = {
    [key: string]: any;
};
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type AnyFunction = (...args: any) => any;
/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
export declare type UnionToIntersection<Union> = (Union extends any ? (argument: Union) => void : never) extends (argument: infer Intersection) => void ? Intersection : never;
export declare type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction ? ReturnType<T> : T extends AnyFunction[] ? UnionToIntersection<ReturnType<T[number]>> : never;
export declare type SVGuitarPlugin = (instance: SVGuitarChord) => ApiExtension | undefined;
