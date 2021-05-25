import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import 'jest-enzyme'
import 'react-native'

Enzyme.configure({ adapter: new Adapter() })

// reanimated2
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  Reanimated.default.call = () => {}

  // Hotfix: Mock the following due to these methods not currently being typed and throwing errors
  Reanimated.useSharedValue = jest.fn
  Reanimated.useAnimatedStyle = jest.fn
  Reanimated.withTiming = jest.fn
  Reanimated.Easing = jest.fn
  Reanimated.Easing.inOut = jest.fn

  return Reanimated
})

// react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({"bottom": 0, "left": 0, "right": 0, "top": 48}),
}))

 /**
  * Set up Enzyme to mount to DOM, simulate events,
  * and inspect the DOM in tests.
  */
 Enzyme.configure({ adapter: new Adapter() })