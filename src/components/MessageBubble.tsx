import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  UIManager,
  Platform,
} from 'react-native'
import { ChatMessage } from '../types/chat'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface MessageBubbleProps {
  message: ChatMessage
  onLongPress: (message: ChatMessage) => void
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onLongPress,
}) => {
  const isUser = message.sender === 'user'
  const timestamp = useMemo(() => {
    if (!message.timestamp) return ''
    const date = new Date(message.timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }, [message.timestamp])

  return (
    <View style={[styles.container, isUser ? styles.userRow : styles.astroRow]}>
      <Pressable
        onLongPress={() => onLongPress(message)}
        delayLongPress={200}
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
            {isUser && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
  userRow: {
    alignItems: 'flex-end',
  },
  astroRow: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#FFD8A8',
  },
  astroBubble: {
    backgroundColor: '#F1F1F1',
  },
  quotedMessageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingVertical: 6,
  },
  quoteBar: {
    width: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginRight: 8,
    borderRadius: 1.5,
  },
  quoteContent: {
    flex: 1,
  },
  quotedText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#333',
  },
  astroText: {
    color: '#333',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.5)',
    marginRight: 4,
  },
  checkmark: {
    fontSize: 11,
    color: '#0084FF',
    marginLeft: 2,
  },
})