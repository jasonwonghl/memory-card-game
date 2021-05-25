import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { textVariants } from 'styles/styles'

interface Props {
  movesCount?: number
  onPress: () => void
}

const Header = ({ movesCount = 0, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity testID={'RestartButton'} onPress={onPress}>
        <Text style={styles.restartButton}>Restart</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.movesLabel}>
          Steps:{' '}
          <Text testID={'StepsCountText'} style={styles.movesCount}>
            {movesCount}
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restartButton: {
    color: textVariants.highlight,
    fontSize: textVariants.body.fontSize,
  },
  movesLabel: {
    fontSize: textVariants.subHeader.fontSize,
    color: textVariants.body.color,
    textTransform: 'uppercase',
  },
  movesCount: { color: textVariants.highlight },
})

export default Header
