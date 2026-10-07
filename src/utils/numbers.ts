const romanNumerals: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export function toRoman(value: number): string {
  let rest = value

  return romanNumerals.reduce((roman, [arabic, numeral]) => {
    const count = Math.floor(rest / arabic)
    rest -= count * arabic

    return roman + numeral.repeat(count)
  }, '')
}

export function ordinalSuffix(value: number): string {
  const lastTwo = value % 100

  if (lastTwo >= 11 && lastTwo <= 13) {
    return 'th'
  }

  return { 1: 'st', 2: 'nd', 3: 'rd' }[value % 10] ?? 'th'
}
