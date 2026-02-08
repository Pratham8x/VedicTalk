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
  const pan = useRef(new Animated.ValueXY()).current
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
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2)
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow right swipe (positive dx) for user messages
        if (isUser && gestureState.dx > 0) {
          pan.x.setValue(gestureState.dx)
          
          // Show reply icon with fade in effect
          const opacity = Math.min(gestureState.dx / SWIPE_THRESHOLD, 1)
          replyIconOpacity.setValue(opacity)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isUser && gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe successful - trigger reply
          onSwipeRight(message)
        }
        
        // Reset position
        Animated.spring(pan.x, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }).start()
        
        // Hide reply icon
        Animated.timing(replyIconOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
      },
    })
  ).current

  return (
    <View style={[styles.container, isUser ? styles.userRow : styles.astroRow]}>
      {/* Reply Icon (appears during swipe) */}
      {isUser && (
        <Animated.View 
          style={[
            styles.replyIconContainer,
            {
              opacity: replyIconOpacity,
              transform: [{ translateX: -30 }]
            }
          ]}
        >
          <Text style={styles.replyIcon}>↩️</Text>
          <Text style={styles.replyText}>Reply</Text>
        </Animated.View>
      )}
      
      <Animated.View
        style={[
          styles.bubbleContainer,
          {
            transform: [{ translateX: pan.x }]
          }
        ]}
        {...panResponder.panHandlers}
      >
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
                  ellipsizeMode="tail"
                >
                  {message.quotedMessage.text}
                </Text>
              </View>
            </View>
          )}

          <Text
            style={[styles.messageText, isUser ? styles.userText : styles.astroText]}
          >
            {message.text}
          </Text>

          {timestamp && (
            <View style={styles.timestampContainer}>
              <Text style={styles.timestamp}>{timestamp}</Text>
              {isUser && (
                <>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.checkmark}>✓</Text>
                </>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  )
}

