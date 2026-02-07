import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export default function TypingBubble() {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 700 }),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[styles.bubble, animatedStyle]}>
      <Animated.Text style={styles.text}>typing…</Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#EDEDED',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginLeft: 12,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    color: '#555',
  },
})
