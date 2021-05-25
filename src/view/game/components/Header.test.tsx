import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import Header from './Header'

describe('Header', () => {
  const mockOnPress = jest.fn()
  let wrapper: ShallowWrapper<any, any, React.Component<{}, {}, any>>
  let stepsCountText: ShallowWrapper<any, any, React.Component<{}, {}, any>>

  beforeEach(() => {
    wrapper = shallow(<Header movesCount={1} onPress={mockOnPress} />)

    stepsCountText = wrapper.findWhere(
      (node) => node.prop('testID') === 'StepsCountText'
    )
  })

  it('should render correctly', () => {
    const tree = renderer.create(
      <Header movesCount={1} onPress={mockOnPress} />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should receive the moves count as props', () => {
    expect(stepsCountText.props().children).toEqual(1)
  })
})
