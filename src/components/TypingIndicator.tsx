import React, { useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Text,
} from 'react-native'

export const TypingIndicator: React.FC = () => {
  const dot1Anim = useRef(new Animated.Value(0)).current
  const dot2Anim = useRef(new Animated.Value(0)).current
  const dot3Anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animateDot = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      )
    }

    const animation1 = animateDot(dot1Anim, 0)
    const animation2 = animateDot(dot2Anim, 150)
    const animation3 = animateDot(dot3Anim, 300)

    animation1.start()
    animation2.start()
    animation3.start()

    return () => {
      animation1.stop()
      animation2.stop()
      animation3.stop()
    }
  })

  const dot1Scale = dot1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  })

  const dot2Scale = dot2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  })

  const dot3Scale = dot3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  })

  return (
    <View style={styles.container}>
      <View style={[styles.bubble, styles.astroBubble]}>
        <View style={styles.typingContainer}>
          <Animated.View style={[styles.dot, { transform: [{ scale: dot1Scale }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: dot2Scale }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: dot3Scale }] }]} />
        </View>
        <View style={styles.astroInfo}>
          <Text style={styles.astroName}>Sanjai Maharaj</Text>
          <Text style={styles.typingText}>is typing...</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  astroBubble: {
    backgroundColor: '#F1F1F1',
  },
  typingContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 2,
  },
  astroInfo: {
    flex: 1,
  },
  astroName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  typingText: {
    fontSize: 13,
    color: '#666',
  },
})