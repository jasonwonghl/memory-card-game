import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { palette, textVariants } from 'styles/styles'

interface Props {
  val: number
  dimensions: { width: number; height: number }
  cleared: boolean
  flipped: boolean | null
  disabled: boolean
  animationDuration?: number
  handlePress: () => void
}

const NO_REVOLUTION = 0
const HALF_REVOLUTION = 180
const FULL_REVOLUTION = 360

const Card = ({
  val,
  dimensions,
  cleared = false,
  flipped = false,
  disabled = false,
  animationDuration = 500,
  handlePress,
}: Props) => {
  const animationSettings = {
    duration: animationDuration,
    easing: Easing.inOut(Easing.cubic),
  }

  const frontAnimatedValue = useSharedValue(HALF_REVOLUTION)
  const backAnimatedValue = useSharedValue(NO_REVOLUTION)

  const frontAnimatedStyle = useAnimatedStyle(() => {
    interpolate(
      frontAnimatedValue.value,
      [HALF_REVOLUTION, NO_REVOLUTION],
      [HALF_REVOLUTION, NO_REVOLUTION],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${frontAnimatedValue.value}deg` }],
    }
  })

  const backAnimatedStyle = useAnimatedStyle(() => {
    interpolate(
      frontAnimatedValue.value,
      [HALF_REVOLUTION, NO_REVOLUTION],
      [HALF_REVOLUTION, FULL_REVOLUTION],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${backAnimatedValue.value}deg` }],
    }
  })

  const flip = () => {
    if (flipped) {
      frontAnimatedValue.value = withTiming(NO_REVOLUTION, animationSettings)
      backAnimatedValue.value = withTiming(HALF_REVOLUTION, animationSettings)
    } else {
      frontAnimatedValue.value = withTiming(HALF_REVOLUTION, animationSettings)
      backAnimatedValue.value = withTiming(NO_REVOLUTION, animationSettings)
    }
  }

  const onPress = () => {
    if (!flipped && !disabled && !cleared) {
      handlePress()
    }
  }

  useEffect(() => {
    if (!cleared) {
      flip()
    }
  }, [flipped, cleared])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { width: `${dimensions.width - 4}%`, height: `${dimensions.height}%` },
      ]}
    >
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <Text style={[styles.label, styles.frontLabel]}>{val}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.label}>?</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  card: {
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    backgroundColor: palette.bluePrimary,
  },
  label: {
    fontSize: textVariants.subHeader.fontSize,
    color: textVariants.subHeader.color,
  },
  frontLabel: {
    color: 'black',
  },
})
