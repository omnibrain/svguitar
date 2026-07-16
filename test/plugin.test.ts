import { SVGuitarChord } from '../src/svguitar'
import { setUpSvgDom } from './testutils'

describe('SVGuitarChord Plugin', () => {
  let container: HTMLElement

  beforeEach(() => {
    // create a fresh DOM for every test so that each test renders into its own,
    // empty container
    container = setUpSvgDom().documentElement
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
