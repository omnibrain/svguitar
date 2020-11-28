import { SVGuitarChord } from './svguitar'
import { setUpSvgDom } from '../test/testutils'

const document = setUpSvgDom()

describe('SVGuitarChord Plugin', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.documentElement
  })

  test('should apply a basic plugin', () => {
    // given
    const spy = jest.fn()
    function myFooPlugin(/* instance: SVGuitarChord */): { foo: jest.Mock } {
      return {
        foo: spy,
      }
    }

    // when
    const PluginTest = SVGuitarChord.plugin(myFooPlugin)
    const withPlugin = new PluginTest(container)
    withPlugin.foo()

    // then
    expect(spy).toHaveBeenCalledWith()
  })
})
