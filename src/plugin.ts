/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SVGuitarChord } from './svguitar'

export type ApiExtension = { [key: string]: any }

export type Constructor<T> = new (...args: any[]) => T

export type AnyFunction = (...args: any) => any

/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
type UnionToIntersection<Union> = (Union extends any ? (argument: Union) => void : never) extends (
  argument: infer Intersection,
) => void // tslint:disable-line: no-unused
  ? Intersection
  : never

export type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never

export type SVGuitarPlugin = (instance: SVGuitarChord) => ApiExtension | undefined
