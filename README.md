# SVGuitar - JavaScript Guitar Chord Renderer

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/omnibrain/svguitar.svg)](https://travis-ci.org/omnibrain/svguitar)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/alexjoverm/typescript-library-starter)
[![Dependencies](https://david-dm.org/omnibrain/svguitar/status.svg)](https://david-dm.org/omnibrain/svguitar)
[![Dev Dependencies](https://david-dm.org/omnibrain/svguitar/dev-status.svg)](https://david-dm.org/omnibrain/svguitar?type=dev)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

JavaScript (TypeScript) library to create beautiful SVG guitar chord charts directly in the browser.

Demo: https://omnibrain.github.io/svguitar/  [ [source](https://github.com/omnibrain/svguitar/blob/master/demo/index.html) ]

Example chord charts:

![Example Chord Chart 1](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example1.png)
![Example Chord Chart 2](https://raw.githubusercontent.com/omnibrain/svguitar/master/examples/example2.png)

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
    chart.configure({/* configuration */})
          .chord({/* chord */})
          .draw();
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
chart.configure({/* configuration */})
      .chord({/* chord */})
      .draw();
```

## Usage

For a full API documentation have a look at the [TypeScript documentation](https://omnibrain.github.io/svguitar/docs/).

Here's an example usage:

```javascript
new SVGuitarChord('#some-selector')
      .chord({
        // array of [string, fret, label (optional)]
        fingers: [
          [1, 2],
          [2, 3],
          [3, 3],
          [6, 'x']
        ],
      
        // optional: barres for barre chords
        barres: [
          { fromString: 5, toString: 1, fret: 1 },
        ],
      })
      .configure({
          // Customizations (all optional, defaults shown)

          /**
           * The number of strings
           */
          strings: 6,
        
          /**
           * The number of frets
           */
          frets: 4,
          /**
           * The starting fret (first fret is 1)
           */
          position: 1,
        
          /**
           * These are the labels under the strings. Can be any string.
           */
          tuning: [ 'E', 'A', 'D', 'G', 'B', 'E' ],
        
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
           * Size of a nut relative to the string spacing
           */
          nutSize: 0.65,
        
          /**
           * Color of a finger / nut
           */
          nutColor: '#000',
        
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
           * The title of the chart. Optional
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
          color: '#000',
        
          /**
           * Barre chord rectangle border radius relative to the nutSize (eg. 1 means completely round endges, 0 means not rounded at all)
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
           * The width of the top fret (only used if position is 1)
           */
          topFretWidth: 10,
        
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

      })
      .draw();
```

## Contribute

Pull Requests are very welcome! 

## Projects using SVGuitar

Here are some projects that use `svguitar`:

- [ChordPic - Easily Create Guitar Chord Charts](https://chordpic.com)

Are you using SVGuitar? Create an issue to get your project listed here! Or simply create a pull request with your project added.
