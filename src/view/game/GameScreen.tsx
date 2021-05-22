import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Card from 'view/game/components/Card'
import Header from 'view/game/components/Header'

const MS_PER_SECOND = 1000

export default function GameScreen() {
  const safeAreaInsets = useSafeAreaInsets()

  const [movesCount, setMovesCount] = useState<number>(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [shouldDisableAllCards, setShouldDisableAllCards] =
    useState<boolean>(false)

  const timeout = useRef<NodeJS.Timeout>()

  const numbers = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5]
  const height = 100 / Math.round(numbers.length / 3) + '%'

  const onCardPress = (idx: number) => {
    // Increment the number of user moves if the number of flipped cards is exactly 2
    if (openCards.length < 2) {
      setMovesCount(movesCount + 1)
    }

    if (openCards.length === 1) {
      // Add the second card to the open cards array
      setOpenCards((prev) => [...prev, idx])

      // Temporarily disable flipping of additional cards
      setShouldDisableAllCards(true)
    } else {
      timeout?.current && clearTimeout(timeout.current)
      // Add the first card to the open cards array
      setOpenCards([idx])
    }
  }

  /**
   * Compares the values of 2 cards
   */
  const compare = () => {
    const [firstCard, secondCard] = openCards

    // Re-enable flipping of cards
    setShouldDisableAllCards(false)

    // If the card values match, add the card value as a key with corresponding boolean value of true to the cleared cards object
    if (numbers[firstCard] === numbers[secondCard]) {
      setClearedCards((prev) => ({ ...prev, [numbers[firstCard]]: true }))

      // Clear the open cards array
      setOpenCards([])

      return
    }

    timeout.current = setTimeout(() => {
      setOpenCards([])
    }, MS_PER_SECOND)
  }

  /**
   * @param idx The index of the card
   * @returns {boolean} Returns the boolean indicating whether the card is flipped
   */
  const checkIsFlipped = (idx: number) => {
    return openCards.includes(idx)
  }

  /**
   *
   * @param val The value of the card
   * @returns {boolean} Returns the boolean indicating whether the card has been cleared
   */
  const checkIsCleared = (val: string) => {
    return clearedCards[val] === true
  }

  const restart = () => {}

  useEffect(() => {
    // Run the comparison function if exactly 2 cards are open
    let timeout: NodeJS.Timeout | null = null
    if (openCards.length === 2) {
      timeout = setTimeout(compare, MS_PER_SECOND * 0.5)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [openCards])

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}
    >
      <Header onPress={() => restart()} movesCount={movesCount} />
      <View style={styles.cardsContainer}>
        {numbers.map((val, idx) => (
          <Card
            key={idx}
            val={val}
            height={height}
            cleared={checkIsCleared(val.toString())}
            flipped={checkIsFlipped(idx)}
            disabled={shouldDisableAllCards}
            handlePress={() => onCardPress(idx)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39353C',
  },
  cardsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
