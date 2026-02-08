import React, { useMemo, useRef } from 'react'
import {
  View,
  Text,
  PanResponder,
  Animated,
  UIManager,
  Platform,
} from 'react-native'
import { ChatMessage } from '../types/chat'
import { styles } from './MessageBubbleStyles'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface MessageBubbleProps {
  message: ChatMessage
  onSwipeRight: (message: ChatMessage) => void
}

const SWIPE_THRESHOLD = 50

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSwipeRight,
}) => {
  const isUser = message.sender === 'user'

  // IMPORTANT: number-based Animated.Value
  const translateX = useRef(new Animated.Value(0)).current
  const replyIconOpacity = useRef(new Animated.Value(0)).current

  const timestamp = useMemo(() => {
    if (!message.timestamp) return ''
    const date = new Date(message.timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }, [message.timestamp])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy * 2),

      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0) {
          translateX.setValue(gesture.dx)
          replyIconOpacity.setValue(
            Math.min(gesture.dx / SWIPE_THRESHOLD, 1)
          )
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          onSwipeRight(message)
        }

        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
          }),
          Animated.timing(replyIconOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start()
      },
    })
  ).current

return (
  <View style={[styles.container, isUser ? styles.userRow : styles.astroRow]}>
    {/* Reply icon */}
    <Animated.View
      style={[
        styles.replyIconContainer,
        { opacity: replyIconOpacity },
      ]}
    >
      <Text style={styles.replyIcon}>↩️</Text>
      <Text style={styles.replyText}>Reply</Text>
    </Animated.View>

    <Animated.View
      style={[
        styles.bubbleWrapper,
        { transform: [{ translateX }] },
      ]}
      {...panResponder.panHandlers}
    >
      {/* MESSAGE BUBBLE */}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.astroBubble,
        ]}
      >
        {message.quotedMessage && (
          <View style={styles.quotedMessageContainer}>
            <View style={styles.quoteBar} />
            <View style={styles.quoteContent}>
              <Text
                style={styles.quotedText}
                numberOfLines={2}
              >
                {message.quotedMessage.text}
              </Text>
            </View>
          </View>
        )}

        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.astroText,
          ]}
        >
          {message.text}
        </Text>
      </View>

      {/* META INFO (OUTSIDE BUBBLE) */}
      {timestamp && (
        <View
          style={[
            styles.metaRow,
            isUser ? styles.metaUser : styles.metaAstro,
          ]}
        >
          <Text style={styles.timestamp}>{timestamp}</Text>
          {isUser && (
            <View style={styles.tickContainer}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </View>
      )}
    </Animated.View>
  </View>
)

}
