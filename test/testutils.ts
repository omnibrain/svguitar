import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

// constants
export const svgOutputDir = './test-renders'

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

  const window = svgdom.createSVGWindow()

  const { registerWindow } = require('@svgdotjs/svg.js')
  registerWindow(window, window.document)

  return window.document
}

export function saveSvg(name: string, svg: string) {
  if (!existsSync(svgOutputDir)) {
    mkdirSync(svgOutputDir)
  }

  writeFileSync(join(svgOutputDir, `${name}.svg`.replace(' ', '-')), svg)
}
