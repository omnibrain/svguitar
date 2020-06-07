export function isNode(): boolean {
  // tslint:disable-next-line:strict-type-predicates
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null
}

export function range(length: number, from = 0): number[] {
  return Array.from({ length }, (_, i) => i + from)
}
