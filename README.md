# SVGuitar - JavaScript Guitar Chord Renderer

![build](https://github.com/omnibrain/svguitar/actions/workflows/semantic-release.yml/badge.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Coveralls](https://img.shields.io/coveralls/omnibrain/svguitar.svg)](https://coveralls.io/github/omnibrain/svguitar)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Known Vulnerabilities](https://snyk.io/test/github/omnibrain/svguitar/badge.svg)](https://snyk.io/test/github/omnibrain/svguitar)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

JavaScript (TypeScript) library to create beautiful SVG guitar chord charts directly in the browser.

To see this library in action check out [chordpic.com](https://chordpic.com), a free online chord diagram creator.

**Demo**: https://omnibrain.github.io/svguitar/ [ [source](https://github.com/omnibrain/svguitar/blob/master/demo/index.html) ]

**TypeScript API Documentation**: https://omnibrain.github.io/svguitar/docs/

Example chord charts:

![Example Chord Chart 1](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example1.png)
![Example Chord Chart 2](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example2.png)
![Example Chord Chart 3](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example3.png)
![Example Chord Chart 4](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example4.png)

### Getting Started

```html
<!--container of the chart-->
<div id="chart"></div>

<!--load umd script -->
<script src="https://omnibrain.github.io/svguitar/js/svguitar.umd.js"></script>

<script>
  // initialize the chart
  var chart = new svguitar.SVGuitarChord('#chart')

  // draw the chart
  chart
    .configure({
      /* configuration */
    })
    .chord({
      /* chord */
    })
    .draw()
</script>
```

Of course you can also add SVGuitar as a dependency to your project:

```bash
# Add the dependency to your project
npm install --save svguitar

# or
yarn add svguitar
```

And then import it in your project:

```javascript
import { SVGuitarChord } from 'svguitar'

const chart = new SVGuitarChord('#chart')

// draw the chart
chart
  .configure({
    /* configuration */
  })
  .chord({
    /* chord */
  })
  .draw()
```

## Usage

The SVG charts are highly customizable.
For a full API documentation have a look at the [TypeScript documentation](https://omnibrain.github.io/svguitar/docs/).

Chart configuration is completely optional, you don't have to pass any configuration or you can
only override specific settings.

Here's an example of a very customized chart:

```javascript
new SVGuitarChord('#some-selector')
  .chord({
    // array of [string, fret, text | options]
    fingers: [
      // finger at string 1, fret 2, with text '2'
      [1, 2, '2'],

      // finger at string 2, fret 3, with text '3', colored red and has class '.red'
      [2, 3, { text: '3', color: '#F00', className: 'red' }],

      // finger is triangle shaped
      [3, 3, { shape: 'triangle' }],
      [6, 'x'],
    ],

    // optional: barres for barre chords
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 1,
        text: '1',
        color: '#0F0',
        textColor: '#F00',
        className: 'my-barre-chord',
      },
    ],

    // title of the chart (optional)
    title: 'F# minor',

    // position (defaults to 1)
    position: 2,
  })
  .configure({
    // Customizations (all optional, defaults shown)

    /**
     * Orientation of the chord diagram. Chose between 'vertical' or 'horizontal'
     */
    orientation: 'vertical',

    /**
     * Select between 'normal' and 'handdrawn'
     */
    style: 'normal',

    /**
     * The number of strings
     */
    strings: 6,

    /**
     * The number of frets
     */
    frets: 4,

    /**
     * Default position if no positon is provided (first fret is 1)
     */
    position: 1,

    /**
     * These are the labels under the strings. Can be any string.
     */
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

    /**
     * The position of the fret label (eg. "3fr")
     */
    fretLabelPosition: 'right',

    /**
     * The font size of the fret label
     */
    fretLabelFontSize: 38,

    /**
     * The font size of the string labels
     */
    tuningsFontSize: 28,

    /**
     * Size of a finger or barre relative to the string spacing
     */
    fingerSize: 0.65,

    /**
     * Color of a finger or barre
     */
    fingerColor: '#000',

    /**
     * The color of text inside fingers and barres
     */
    fingerTextColor: '#FFF',

    /**
     * The size of text inside fingers and barres
     */
    fingerTextSize: 22,

    /**
     * stroke color of a finger or barre. Defaults to the finger color if not set
     */
    fingerStrokeColor: '#000000',

    /**
     * stroke width of a finger or barre
     */
    fingerStrokeWidth: 0,

    /**
     * stroke color of a barre chord. Defaults to the finger color if not set
     */
    barreChordStrokeColor: '#000000',

    /**
     * stroke width of a barre chord
     */
    barreChordStrokeWidth: 0,

    /**
     * Height of a fret, relative to the space between two strings
     */
    fretSize: 1.5,

    /**
     * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
     * This is only applied if it's larger than the letters inside of the padding (eg the starting fret)
     */
    sidePadding: 0.2,

    /**
     * The font family used for all letters and numbers
     */
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

    /**
     * Default title of the chart if no title is provided
     */
    title: 'F# minor',

    /**
     * Font size of the title. This is only the initial font size. If the title doesn't fit, the title
     * is automatically scaled so that it fits.
     */
    titleFontSize: 48,

    /**
     * Space between the title and the chart
     */
    titleBottomMargin: 0,

    /**
     * Global color of the whole chart. Can be overridden with more specifig color settings such as
     * @link titleColor or @link stringColor etc.
     */
    color: '#000000',

    /**
     * The background color of the chord diagram. By default the background is transparent. To set the background to transparent either set this to 'none' or undefined
     */
    backgroundColor: 'none',

    /**
     * Barre chord rectangle border radius relative to the fingerSize (eg. 1 means completely round endges, 0 means not rounded at all)
     */
    barreChordRadius: 0.25,

    /**
     * Size of the Xs and Os above empty strings relative to the space between two strings
     */
    emptyStringIndicatorSize: 0.6,

    /**
     * Global stroke width
     */
    strokeWidth: 2,

    /**
     * The width of the nut (only used if position is 1)
     */
    nutWidth: 10,

    /**
     * If this is set to `true`, the starting fret (eg. 3fr) will not be shown. If the position is 1 the
     * nut will have the same width as all other frets.
     */
    noPosition: false,

    /**
     * The color of the title (overrides color)
     */
    titleColor: '#000000',

    /**
     * The color of the strings (overrides color)
     */
    stringColor: '#000000',

    /**
     * The color of the fret position (overrides color)
     */
    fretLabelColor: '#000000',

    /**
     * The color of the tunings (overrides color)
     */
    tuningsColor: '#000000',

    /**
     * The color of the frets (overrides color)
     */
    fretColor: '#000000',

    /**
     * When set to true the distance between the chord diagram and the top of the SVG stayes the same,
     * no matter if a title is defined or not.
     */
    fixedDiagramPosition: false,

    /**
     * Text of the watermark (text on the bottom of the chart)
     */
    watermark: 'some watermark',

    /**
     * Font size of the watermark
     */
    watermarkFontSize: 12,

    /**
     * Color of the watermark (overrides color)
     */
    watermarkColor: '#000000',

    /**
     * Font-family of the watermark (overrides fontFamily)
     */
    watermarkFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

    /**
     * The title of the SVG. This is not visible in the SVG, but can be used for accessibility.
     */
    svgTitle: 'Guitar chord diagram of F# minor',
  })
  .draw()
```

## Contribute

Pull Requests are very welcome!

## Projects using SVGuitar

Here are some projects that use `svguitar`:

- [ChordPic - Easily Create Guitar Chord Charts](https://chordpic.com)
- [muted.io - Magical Music Theory Tools to Learn Music Online for Free](https://muted.io/)
- [Chordpress Wordpress Plugin - ChordPro Text Formatter](https://wordpress.org/plugins/chordpress/)
- [Harmonote - Find chords for your favorite songs](https://harmonote.com/)

Are you using SVGuitar? Create an issue to get your project listed here! Or simply create a pull request with your project added.
