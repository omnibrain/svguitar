export function isNode(): boolean {
  // tslint:disable-next-line:strict-type-predicates
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null
}
