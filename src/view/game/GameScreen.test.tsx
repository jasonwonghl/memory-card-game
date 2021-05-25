import {
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'
import { ReactTestInstance } from 'react-test-renderer'
import { CARD_COUNT } from 'view/game/GameScreen'
import GameScreen from './GameScreen'

describe('Game', () => {
  let getByTestId: (testID: string | RegExp) => ReactTestInstance
  let queryByTestId: (testID: string | RegExp) => ReactTestInstance | null

  beforeEach(() => {
    ;({ getByTestId, queryByTestId } = render(<GameScreen />))
  })

  it('should generate pairs of cards whose number should equal CARD_COUNT', () => {
    for (let i = 0; i < CARD_COUNT - 1; i++) {
      expect(getByTestId(`Card${i}`)).toBeTruthy()
    }
  })

  it('should flip a card when it is tapped', () => {
    fireEvent.press(getByTestId(`Card1`))
    expect(getByTestId(`Card1FrontFlipped`)).toBeTruthy()
  })

  it('should increment the steps count when a card is flipped', () => {
    const stepsCountText = getByTestId('StepsCountText')

    fireEvent.press(getByTestId(`Card1`))
    expect(stepsCountText).toHaveTextContent('1')
  })

  it('should not allow flipping if 2 cards that are not cleared are already open', () => {
    const cardValues: string[] = []
    let currentIndex = 0

    for (let i = 0; i < CARD_COUNT - 1; i++) {
      const card = getByTestId(`Card${i}`)
      const cardText = getByTestId(`Card${i}Text`)
      currentIndex++

      fireEvent.press(card)

      if (
        !cardValues.includes(cardText.props.children) &&
        cardValues.length < 2
      ) {
        cardValues.push(cardText.props.children)
      } else if (cardValues.length === 2) {
        break
      }
    }

    expect(queryByTestId(`Card${currentIndex}FrontFlipped`)).toBeNull()
  })

  it('should reset the steps count if the restart button is pressed', () => {
    const gameScreen = getByTestId('GameScreen')
    const restartButton = within(gameScreen).getByTestId('RestartButton')
    const stepsCountText = within(gameScreen).getByTestId('StepsCountText')

    fireEvent.press(getByTestId(`Card1`))

    fireEvent.press(restartButton)

    expect(stepsCountText).toHaveTextContent('0')
  })
})

describe('Game Cleared', () => {
  const cardPairsValue = 1
  const cardCount = cardPairsValue * 2
  const spyAlert = jest.spyOn(Alert, 'alert')

  let getByTestId: (testID: string | RegExp) => ReactTestInstance

  beforeEach(() => {
    ;({ getByTestId } = render(<GameScreen cardPairsValue={cardPairsValue} />))
  })

  it('should show the congratulation alert when all cards have been cleared', async () => {
    for (let i = 0; i < cardCount; i++) {
      fireEvent.press(getByTestId(`Card${i}`))
    }

    await waitFor(() => expect(spyAlert).toHaveBeenCalled())
    expect(spyAlert).toHaveBeenCalledTimes(1)
  })
})
