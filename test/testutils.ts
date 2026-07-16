import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

// constants
export const svgOutputDir = './test-renders'

let svgJsParserWarmedUp = false

export function setUpSvgDom(): Document {
  const svgdom = require('svgdom')
  svgdom
    // your font directory
    .setFontDir('./fonts')
    // map the font-family to the file
    .setFontFamilyMappings({ Arial: './arial.ttf' })
    // you can preload your fonts to avoid the loading delay
    // when the font is used the first time
    .preloadFonts()

  const { registerWindow, PathArray } = require('@svgdotjs/svg.js')

  // svg.js lazily creates a hidden helper <svg> element for measurements and
  // caches it in module scope, attached to whichever document is registered at
  // that moment. Trigger its creation once against a throwaway document so it
  // doesn't end up in the rendered output of a test.
  if (!svgJsParserWarmedUp) {
    const throwawayWindow = svgdom.createSVGWindow()
    registerWindow(throwawayWindow, throwawayWindow.document)
    new PathArray('M0 0').bbox()
    svgJsParserWarmedUp = true
  }

  const window = svgdom.createSVGWindow()

  registerWindow(window, window.document)

  return window.document
}

export function saveSvg(name: string, svg: string) {
  if (!existsSync(svgOutputDir)) {
    mkdirSync(svgOutputDir)
  }

  writeFileSync(join(svgOutputDir, `${name}.svg`.replace(/\s+/g, '-')), svg)
}
