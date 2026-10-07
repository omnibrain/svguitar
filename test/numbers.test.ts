import { ordinalSuffix, toRoman } from '../src/utils/numbers'

describe('toRoman', () => {
  it.each([
    [1, 'I'],
    [4, 'IV'],
    [5, 'V'],
    [9, 'IX'],
    [12, 'XII'],
    [14, 'XIV'],
    [19, 'XIX'],
    [24, 'XXIV'],
    [49, 'XLIX'],
  ])('Should convert %d to %s', (value, expected) => {
    expect(toRoman(value)).toBe(expected)
  })
})

describe('ordinalSuffix', () => {
  it.each([
    [1, 'st'],
    [2, 'nd'],
    [3, 'rd'],
    [4, 'th'],
    [11, 'th'],
    [12, 'th'],
    [13, 'th'],
    [21, 'st'],
    [22, 'nd'],
    [23, 'rd'],
    [111, 'th'],
  ])('Should return the suffix for %d', (value, expected) => {
    expect(ordinalSuffix(value)).toBe(expected)
  })
})
