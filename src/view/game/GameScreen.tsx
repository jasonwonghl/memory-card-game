import { generateRandomNumberArray, shuffleArray } from 'helpers/utils'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { palette } from 'styles/styles'
import Card from 'view/game/components/Card'
import Header from 'view/game/components/Header'

export const MS_PER_SECOND = 1000
export const CARD_PAIRS_VALUE = 6
export const CARD_COUNT = CARD_PAIRS_VALUE * 2
export const CARD_COLUMNS = 3
export const MAX = 100
export const DURATION = MS_PER_SECOND * 0.8

export default function GameScreen({
  cardPairsValue = CARD_PAIRS_VALUE,
}: {
  cardPairsValue?: number
}) {
  const safeAreaInsets = useSafeAreaInsets()

  const [cards, setCards] = useState<number[]>([])
  const [cardDimensions, setCardDimensions] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [movesCount, setMovesCount] = useState<number>(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [shouldDisableAllCards, setShouldDisableAllCards] =
    useState<boolean>(false)

  const timeout = useRef<NodeJS.Timeout>()

  /**
   * Generate, shuffle and set the card values
   */
  const generateCards = () => {
    const uniqueNumbers = generateRandomNumberArray(cardPairsValue, MAX)
    setCards(shuffleArray(uniqueNumbers.concat(uniqueNumbers)))
  }

  /**
   * Get and set the width and height of each card by percentage
   */
  const getCardDimensions = () => {
    // Get the number of rows
    const rows = Math.ceil(CARD_COUNT / CARD_COLUMNS)

    // Calculate the percentage height of each card based on the number of cards
    const height = 100 / rows

    // Calculate the percentage width of each card based on the number of cards and columns
    const width = 100 / CARD_COLUMNS

    setCardDimensions({ width, height })
  }

  const onCardPress = (idx: number) => {
    // Increment the number of user moves
    if (openCards.length <= 2) {
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

    // If the card values match, add the card value as the key with corresponding boolean value of true to the cleared cards object
    if (cards[firstCard] === cards[secondCard]) {
      setClearedCards((prev) => ({ ...prev, [cards[firstCard]]: true }))

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

  /**
   * Checks to see if all the cards are cleared and displays a congratulatory message
   */
  const checkIsCompleted = () => {
    if (Object.keys(clearedCards).length === cardPairsValue) {
      showCompletionAlert()
    }
  }

  /**
   * Show the congratulations alert when user has cleared all cards
   */
  const showCompletionAlert = () => {
    Alert.alert(
      'Congratulations!',
      `You win the game by ${movesCount} steps!`,
      [
        {
          text: 'Try another round',
          onPress: () => restart(),
        },
      ]
    )
  }

  /**
   * Reset game state
   */
  const restart = () => {
    setClearedCards({})
    setOpenCards([])
    setMovesCount(0)
    setShouldDisableAllCards(false)
    setTimeout(generateCards, DURATION)
  }

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

  useEffect(() => {
    checkIsCompleted()
  }, [clearedCards])

  useEffect(() => {
    // Initialise the cards
    if (cards.length === 0) {
      generateCards()
      getCardDimensions()
    }
  }, [])

  return (
    <View
      testID={'GameScreen'}
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
        {cards.map((val, idx) => (
          <Card
            key={idx}
            testID={`Card${idx}`}
            val={val}
            dimensions={cardDimensions}
            cleared={checkIsCleared(val.toString())}
            flipped={checkIsFlipped(idx)}
            disabled={shouldDisableAllCards}
            animationDuration={DURATION}
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
    backgroundColor: palette.greyPrimary,
  },
  cardsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
