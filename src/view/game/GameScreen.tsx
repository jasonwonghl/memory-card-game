import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Card from 'view/game/components/Card'
import Header from 'view/game/components/Header'

export default function GameScreen() {
  const safeAreaInsets = useSafeAreaInsets()
  const numbers = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5]
  const height = 100 / Math.round(numbers.length / 4) + '%'

  console.log(safeAreaInsets.bottom, safeAreaInsets.top)

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
      <Header onPress={() => {}} />
      <View style={styles.cardsContainer}>
        {numbers.map((val, idx) => (
          <Card key={idx} val={val} height={height} onPress={() => {}} />
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
