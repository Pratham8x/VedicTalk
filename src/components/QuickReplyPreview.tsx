import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native'
import { ChatMessage } from '../types/chat'

interface QuickReplyPreviewProps {
  message: ChatMessage | undefined
  onClear: () => void
}

export const QuickReplyPreview: React.FC<QuickReplyPreviewProps> = ({
  message,
  onClear,
}) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: message ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [message, slideAnim])

  if (!message) return null

  const height = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  })

  return (
    <Animated.View style={[styles.container, { height }]}>
      <View style={styles.content}>
        <View style={styles.quoteBar} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Replying to:</Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {message.text}
          </Text>
        </View>
        <Pressable onPress={onClear} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quoteBar: {
    width: 3,
    height: 30,
    backgroundColor: '#FF9500',
    borderRadius: 1.5,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 12,
  },
  closeIcon: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
})