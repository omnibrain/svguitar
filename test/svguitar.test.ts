import { FretLabelPosition, Orientation, Shape, SVGuitarChord } from '../src/svguitar'
import { saveSvg, setUpSvgDom } from './testutils'

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
  it('Should completely remove the diagram from the DOM when removing', () => {
    // given
    svguitar.draw()

    // when
    svguitar.remove()

    // then
    expect(container.querySelector('svg')).toBeNull()
  })

  it('Should render an svg of an arbitrary chord', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, '1'],
          [2, 1, '2'],
          [3, 2, '3'],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [
          {
            fret: 3,
            fromString: 4,
            toString: 1,
            text: 'B',
          },
        ],
      })
      .configure({
        position: 5,
        tuning: ['1', '2', '3', '4', '5', '6'],
        strings: 5,
        frets: 6,
        title: 'Amaj7',
      })
      .draw()

    saveSvg('arbitrary chord', container.outerHTML)
  })

  it('Should render an svg of a horizontal chart', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, '1'],
          [2, 1, '2'],
          [3, 2, '3'],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [
          {
            fret: 3,
            fromString: 4,
            toString: 1,
            text: 'B',
          },
        ],
      })
      .configure({
        position: 5,
        tuning: ['1', '2', '3', '4', '5', '6'],
        orientation: Orientation.horizontal,
        strings: 5,
        frets: 6,
        title: 'Amaj7',
      })
      .draw()

    saveSvg('horizontal chord', container.outerHTML)
  })

  it('Should render an svg of a horizontal chart', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [],
      })
      .configure({
        fixedDiagramPosition: true,
        orientation: Orientation.horizontal,
        strings: 5,
        frets: 6,
      })
      .draw()

    saveSvg('horizontal fixed diagram position', container.outerHTML)
  })

  it('Should render the fret position correctly on the bottom', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [],
      })
      .configure({
        fixedDiagramPosition: true,
        orientation: Orientation.horizontal,
        fretLabelPosition: FretLabelPosition.LEFT,
        strings: 5,
        frets: 6,
        position: 5,
      })
      .draw()

    saveSvg('horizontal bottom fret position', container.outerHTML)
  })

  it('Should render fingers over barre chords', () => {
    svguitar
      .chord({
        fingers: [[2, 1, { color: 'green', text: '1' }]],
        barres: [
          {
            fromString: 3,
            toString: 1,
            fret: 1,
            color: 'blue',
          },
        ],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Finger over Barre Chord',
      })
      .draw()

    saveSvg('finger over barre', container.outerHTML)
  })

  it('Should render text on the fingers', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, 'A'],
          [2, 1, 'B'],
          [3, 2, 'C'],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Text on Fingers',
        fingerTextColor: 'tomato',
      })
      .draw()

    saveSvg('text on fingers', container.outerHTML)
  })

  it('Should set the stroke width on silent and open string indicators', () => {
    svguitar
      .chord({
        fingers: [
          [2, 0],
          [3, 'x'],
          [4, 0, { strokeWidth: 5 }],
          [5, 'x', { strokeWidth: 5 }],
        ],
        barres: [],
      })
      .configure({
        title: 'Open & Silent String Indicator Strokes',
      })
      .draw()

    saveSvg('silent and open strokes', container.outerHTML)
  })

  it('Should set the stroke colors on silent and open string indicators', () => {
    svguitar
      .chord({
        fingers: [
          [4, 0, { strokeColor: 'blue' }],
          [5, 'x', { strokeColor: 'green' }],
        ],
        barres: [],
      })
      .configure({
        title: 'Open & Silent String Indicator Colors',
      })
      .draw()

    saveSvg('silent and open colored', container.outerHTML)
  })

  it('Should render text on silent and open string indicators', () => {
    svguitar
      .chord({
        fingers: [
          [2, 0, 'A'],
          [3, 'x', 'B'],
          [4, 0, { text: 'C', textColor: 'green' }],
          [5, 'x', { text: 'D', textColor: 'blue' }],
        ],
        barres: [],
      })
      .configure({
        title: 'Text on Open & Silent Strings',
      })
      .draw()

    saveSvg('silent and open colored', container.outerHTML)
  })

  it('Should render text on silent and open string indicators vertically', () => {
    svguitar
      .chord({
        fingers: [
          [2, 0, 'A'],
          [3, 'x', 'B'],
          [4, 0, { text: 'C', textColor: 'green' }],
          [5, 'x', { text: 'D', textColor: 'blue' }],
        ],
        barres: [],
      })
      .configure({
        orientation: Orientation.horizontal,
        title: 'Text on Open & Silent Strings Horizontal',
      })
      .draw()

    saveSvg('silent and open colored', container.outerHTML)
  })

  it('Should render fingers with a different color', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { color: 'green' }],
          [2, 1, { text: 'B', color: 'blue' }],
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Colored Fingers',
      })
      .draw()

    saveSvg('colored fingers', container.outerHTML)
  })

  it('Should render square fingers', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { shape: Shape.SQUARE }],
          [2, 3, { shape: Shape.SQUARE, color: 'blue', text: 'X' }],
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Square Fingers',
      })
      .draw()

    saveSvg('square fingers', container.outerHTML)
  })

  it('Should render triangle fingers', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { shape: Shape.TRIANGLE }],
          [2, 3, { shape: Shape.TRIANGLE, color: 'blue', text: 'X' }],
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Triangle Fingers',
      })
      .draw()

    saveSvg('triangle fingers', container.outerHTML)
  })

  it('Should render pentagon shaped fingers', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { shape: Shape.PENTAGON }],
          [2, 3, { shape: Shape.PENTAGON, color: 'blue', text: 'X' }],
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Pentagon Fingers',
      })
      .draw()

    saveSvg('pentagon fingers', container.outerHTML)
  })

  it('Should render outline square fingers ', () => {
    svguitar
      .chord({
        fingers: [
          [
            2,
            3,
            {
              shape: Shape.SQUARE,
              color: 'blue',
              text: 'X',
              strokeColor: 'red',
              strokeWidth: 3,
            },
          ],
        ],
        barres: [],
      })
      .configure({
        title: 'Outline Square Fingers',
      })
      .draw()

    saveSvg('outline square fingers', container.outerHTML)
  })

  it('Should render outline triangle fingers', () => {
    svguitar
      .chord({
        fingers: [
          [
            2,
            3,
            {
              shape: Shape.TRIANGLE,
              color: 'blue',
              text: 'X',
              strokeColor: 'red',
              strokeWidth: 3,
            },
          ],
        ],
        barres: [],
      })
      .configure({
        title: 'Outline Triangle Fingers',
      })
      .draw()

    saveSvg('outline triangle fingers', container.outerHTML)
  })

  it('Should render pentagon shaped fingers', () => {
    svguitar
      .chord({
        fingers: [
          [
            2,
            3,
            {
              shape: Shape.PENTAGON,
              color: 'blue',
              text: 'X',
              strokeColor: 'red',
              strokeWidth: 3,
            },
          ],
        ],
        barres: [],
      })
      .configure({
        title: 'Outline Pentagon Fingers',
      })
      .draw()

    saveSvg('outline pentagon fingers', container.outerHTML)
  })

  it('Should render an outlined barre chord', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fromString: 4,
            toString: 2,
            fret: 1,
            strokeWidth: 3,
            strokeColor: 'green',
          },
        ],
      })
      .configure({
        title: 'Outlined Barre Chord',
      })
      .draw()

    saveSvg('outline barre', container.outerHTML)
  })

  it('Should render all fingers and barre chords with an outline', () => {
    svguitar
      .chord({
        fingers: [
          [2, 3, { shape: Shape.SQUARE }],
          [3, 4],
        ],
        barres: [
          {
            fromString: 3,
            toString: 1,
            fret: 1,
          },
        ],
      })
      .configure({
        fingerStrokeWidth: 3,
        barreChordStrokeWidth: 3,
        barreChordStrokeColor: 'green',
        fingerStrokeColor: 'red',
        title: 'Outlined',
      })
      .draw()

    saveSvg('outline fingers', container.outerHTML)
  })

  it('Should throw an error if an invliad shape is provided', () => {
    expect(() => {
      svguitar
        .chord({
          fingers: [[1, 2, { shape: 'XXX' as Shape }]],
          barres: [],
        })
        .draw()
    }).toThrowError(/XXX/)
  })

  it('Should render text on fingers with a different color', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { text: 'G', textColor: 'green' }],
          [2, 1, { text: 'B', textColor: 'blue' }],
          [3, 1, { textColor: 'green' }], // no effect
        ],
        barres: [],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Colored Text on Fingers',
      })
      .draw()

    saveSvg('colored text on fingers', container.outerHTML)
  })

  it('Should render barre chords with a different color', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
            color: 'blue',
          },
          {
            fret: 3,
            fromString: 5,
            toString: 2,
            color: 'red',
          },
        ],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Colored Barre Chords',
      })
      .draw()

    saveSvg('colored barre chords', container.outerHTML)
  })

  it('Should render text on barre chords with a different color', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
            text: 'Blue Text',
            textColor: 'blue',
          },
          {
            fret: 3,
            fromString: 5,
            toString: 2,
            text: 'Red Text',
            textColor: 'red',
          },
          {
            fret: 2,
            fromString: 3,
            toString: 2,
            textColor: 'red',
          },
        ],
      })
      .configure({
        strings: 5,
        frets: 6,
        title: 'Colored Text on Barre Chords',
      })
      .draw()

    saveSvg('colored text on barre chords', container.outerHTML)
  })

  it('Should render text on the barre chords', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
            text: 'B',
          },
          {
            fret: 3,
            fromString: 5,
            toString: 2,
            text: 'A',
          },
        ],
      })
      .configure({
        strings: 5,
        frets: 5,
        title: 'Text on Barres',
        fingerTextColor: 'lightgreen',
      })
      .draw()

    saveSvg('text on barre chords', container.outerHTML)
  })

  it('Should render a title nicely', () => {
    svguitar
      .configure({
        title: 'Test Title',
      })
      .draw()

    saveSvg('with title', container.outerHTML)
  })

  it('Should render a title provided as part of the chord', () => {
    svguitar
      .configure({
        title: 'DO NOT RENDER THIS',
      })
      .chord({
        fingers: [],
        barres: [],
        title: 'title from chord',
      })
      .draw()

    saveSvg('title from chord', container.outerHTML)
  })

  it('Should render the position provided as part of the chord', () => {
    svguitar
      .configure({
        position: 999,
      })
      .chord({
        fingers: [],
        barres: [],
        position: 3,
      })
      .draw()

    saveSvg('position from chord', container.outerHTML)
  })

  it('Should not render a nut if no position is true', () => {
    svguitar
      .configure({
        title: 'No position',
        noPosition: true,
      })
      .chord({
        fingers: [],
        barres: [],
        position: 3,
      })
      .draw()

    saveSvg('no position', container.outerHTML)
  })

  it('Should not render a nut if no position is true and position is 1', () => {
    svguitar
      .configure({
        title: 'No nut',
        noPosition: true,
      })
      .chord({
        fingers: [],
        barres: [],
      })
      .draw()

    saveSvg('no position with position 1', container.outerHTML)
  })

  it('Should render a very long title nicely', () => {
    svguitar
      .configure({
        title: 'This is a very long title that does not fit easily',
      })
      .draw()

    saveSvg('with long title', container.outerHTML)
  })

  it('Should render 8 strings', () => {
    svguitar
      .configure({
        title: '8 Strings',
      })
      .configure({
        strings: 8,
      })
      .draw()

    saveSvg('8 strings', container.outerHTML)
  })

  it('Should render 8 frets', () => {
    svguitar
      .configure({
        title: '8 Frets',
      })
      .configure({
        frets: 8,
      })
      .draw()

    saveSvg('8 frets', container.outerHTML)
  })

  it('Should render from fret 2 with the fret label left', () => {
    svguitar
      .configure({
        position: 2,
        fretLabelPosition: FretLabelPosition.LEFT,
      })
      .draw()

    saveSvg('starting fret 2 left', container.outerHTML)
  })

  it('Should render from fret 2 with the fret label right', () => {
    svguitar
      .configure({
        position: 2,
        fretLabelPosition: FretLabelPosition.RIGHT,
      })
      .draw()

    saveSvg('starting fret 2 right', container.outerHTML)
  })

  it('Should render all tunings', () => {
    svguitar
      .configure({
        strings: 5,
        tuning: ['1', '2', '3', '4', '5'],
      })
      .draw()

    saveSvg('tunings', container.outerHTML)
  })

  it('Should render not render all tunings if there are extranous tunings', () => {
    svguitar
      .configure({
        strings: 5,
        tuning: ['1', '2', '3', '4', '5', '6'],
      })
      .draw()

    saveSvg('too many tunings', container.outerHTML)
  })

  it('Should render barre chords', () => {
    svguitar
      .configure({
        strings: 5,
        frets: 5,
      })
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
          },
          {
            fret: 3,
            fromString: 5,
            toString: 2,
          },
        ],
      })
      .draw()

    saveSvg('barre chords', container.outerHTML)
  })

  it('Should render everything in red', () => {
    svguitar
      .configure({
        color: '#f00',
        tuning: ['1', '2', '3', '4', '5', '6'],
        title: 'Test',
        position: 3,
      })
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [],
      })
      .draw()

    saveSvg('red', container.outerHTML)
  })

  it('Should render correctly with all default settings overridden', () => {
    svguitar
      .configure({
        strings: 6,
        frets: 5,
        position: 1,
        tuning: [],
        tuningsFontSize: 28,
        fretLabelFontSize: 38,
        fretLabelPosition: FretLabelPosition.RIGHT,
        fingerSize: 0.65,
        sidePadding: 0.2,
        titleFontSize: 48,
        titleBottomMargin: 0,
        color: '#000',
        emptyStringIndicatorSize: 0.6,
        strokeWidth: 2,
        topFretWidth: 10,
        fretSize: 1.5,
        barreChordRadius: 0.25,
        fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      })
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [],
      })
      .draw()

    saveSvg('settings overridden', container.outerHTML)
  })

  it('Should render correctly without any configuration', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [],
      })
      .draw()

    saveSvg('settings overridden', container.outerHTML)
  })

  it('Should render very fat strokes', () => {
    svguitar
      .configure({
        title: 'Fat Strokes',
        strokeWidth: 10,
        topFretWidth: 30,
      })
      .chord({
        fingers: [
          [1, 2],
          [2, 1],
          [3, 2],
          [4, 0], // fret 0 = open string
          [5, 'x'], // fret x = muted string
        ],
        barres: [],
      })
      .draw()

    saveSvg('fat strokes', container.outerHTML)
  })

  it('Should render a green background', () => {
    svguitar
      .configure({
        title: 'With Background',
        backgroundColor: '#00FF00',
      })
      .draw()

    saveSvg('with background', container.outerHTML)
  })

  it('Should vertically center the barre correctly', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
          },
        ],
      })
      .configure({
        title: 'Centered Barre',
        fretSize: 1,
        fingerSize: 1,
        strokeWidth: 5,
        fingerColor: 'tomato',
        barreChordRadius: 0,
      })
      .draw()

    saveSvg('centered barre', container.outerHTML)
  })

  it('Should render two diagrams in the same position, with and without title', () => {
    svguitar
      .configure({
        title: 'With Title',
        fixedDiagramPosition: true,
      })
      .draw()
    saveSvg('fixed diagram position 1', container.outerHTML)

    svguitar
      .configure({
        title: undefined,
        fixedDiagramPosition: true,
      })
      .draw()
    saveSvg('fixed diagram position 2', container.outerHTML)

    svguitar
      .configure({
        fixedDiagramPosition: true,
      })
      .chord({
        fingers: [[5, 'x']],
        barres: [],
      })
      .draw()
    saveSvg('fixed diagram position 3', container.outerHTML)
  })

  it('Should add custom classes to the barrre chord', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [
          {
            fret: 1,
            fromString: 4,
            toString: 1,
            className: 'custom-class-123',
          },
        ],
      })
      .configure({
        title: 'Barre with Custom Class',
      })
      .draw()

    saveSvg('barre with class', container.outerHTML)
  })

  it('Should add custom classes to fingers', () => {
    svguitar
      .chord({
        fingers: [
          [1, 2, { text: 'a', className: 'custom-class-a' }],
          [2, 1, { text: 'b', className: 'custom-class-b' }],
          [3, 1, { text: 'c', className: 'custom-class-c' }],
        ],
        barres: [],
      })
      .configure({
        title: 'Fingers with Custom Class',
      })
      .draw()

    saveSvg('fingers with class', container.outerHTML)
  })

  it('Should add a watermark', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [],
      })
      .configure({
        tuning: ['1', '2', '3', '4', '5', '6'],
        title: 'With watermark',
        watermark: 'test watermark',
        watermarkFontSize: 20,
        watermarkColor: 'rgba(255, 0, 0, 0.5)',
      })
      .draw()

    saveSvg('with watermark', container.outerHTML)
  })

  it('Should add a watermark on a horizontal chart', () => {
    svguitar
      .chord({
        fingers: [],
        barres: [],
      })
      .configure({
        orientation: Orientation.horizontal,
        tuning: ['1', '2', '3', '4', '5', '6'],
        title: 'Horizontal watermark',
        watermark: 'test watermark',
        watermarkFontSize: 20,
        watermarkColor: 'rgba(255, 0, 0, 0.5)',
      })
      .draw()

    saveSvg('with watermark horizontal', container.outerHTML)
  })

  test.each`
    setting          | value | valid
    ${'strings'}     | ${1}  | ${false}
    ${'strings'}     | ${2}  | ${true}
    ${'frets'}       | ${0}  | ${true}
    ${'frets'}       | ${-1} | ${false}
    ${'position'}    | ${1}  | ${true}
    ${'position'}    | ${0}  | ${false}
    ${'fretSize'}    | ${-1} | ${false}
    ${'fingerSize'}  | ${-1} | ${false}
    ${'strokeWidth'} | ${-1} | ${false}
  `('Should correctly sanity check the settings', ({ setting, value, valid }) => {
    // console.log(`Should ${valid ? 'not' : ''} thrown if ${setting} is ${value}`)
    if (valid) {
      expect(() => svguitar.configure({ [setting]: value })).not.toThrow()
    } else {
      expect(() => svguitar.configure({ [setting]: value })).toThrow()
    }
  })
})
