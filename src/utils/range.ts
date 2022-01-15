export function range(length: number, from = 0): number[] {
  return Array.from({ length }, (_, i) => i + from)
}
