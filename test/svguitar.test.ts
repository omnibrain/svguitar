import { FretLabelPosition, SVGuitarChord } from '../src/svguitar'
import { setUpSvgDom, saveSvg } from './testutils'

const document = setUpSvgDom()

describe('SVGuitarChord', () => {
  let container: HTMLElement
  let svguitar: SVGuitarChord

  beforeEach(() => {
    container = document.documentElement
    svguitar = new SVGuitarChord(container)
  })

  it('Should create an instance of the SVGuitarChord class', () => {
    expect(svguitar).toBeTruthy()
  })

  it('Should render an svg of an arbitrary chord', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'] // fret x = muted string
        ],
        barres: []
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Amaj7'
      })
      .draw()

    saveSvg('arbitrary chord', container.outerHTML)
  })

  it('Should render a title nicely', () => {
    svguitar
      .configure({
        title: 'Test Title'
      })
      .draw()

    saveSvg('with title', container.outerHTML)
  })

  it('Should render a very long title nicely', () => {
    svguitar
      .configure({
        title: 'This is a very long title that does not fit easily'
      })
      .draw()

    saveSvg('with long title', container.outerHTML)
  })

  it('Should render 8 strings', () => {
    svguitar
      .configure({
        title: '8 Strings'
      })
      .configure({
        strings: 8
      })
      .draw()

    saveSvg('8 strings', container.outerHTML)
  })

  it('Should render 8 frets', () => {
    svguitar
      .configure({
        title: '8 Frets'
      })
      .configure({
        frets: 8
      })
      .draw()

    saveSvg('8 frets', container.outerHTML)
  })

  it('Should render from fret 2 with the fret label left', () => {
    svguitar
      .configure({
        position: 2,
        fretLabelPosition: FretLabelPosition.LEFT
      })
      .draw()

    saveSvg('starting fret 2 left', container.outerHTML)
  })

  it('Should render from fret 2 with the fret label right', () => {
    svguitar
      .configure({
        position: 2,
        fretLabelPosition: FretLabelPosition.RIGHT
      })
      .draw()

    saveSvg('starting fret 2 right', container.outerHTML)
  })

  it('Should render all tunings', () => {
    svguitar
      .configure({
        strings: 5,
        tuning: ['1', '2', '3', '4', '5']
      })
      .draw()

    saveSvg('tunings', container.outerHTML)
  })

  it('Should render not render all tunings if there are extranous tunings', () => {
    svguitar
      .configure({
        strings: 5,
        tuning: ['1', '2', '3', '4', '5', '6']
      })
      .draw()

    saveSvg('too many tunings', container.outerHTML)
  })

  it('Should render everything in red', () => {
    svguitar
      .configure({
        color: '#f00',
        tuning: ['1', '2', '3', '4', '5', '6'],
        title: 'Test',
        position: 3
      })
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'] // fret x = muted string
        ],
        barres: []
      })
      .draw()

    saveSvg('red', container.outerHTML)
  })
})
