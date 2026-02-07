import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  text: string
  isUser?: boolean
}

export default function ChatMessage({ text, isUser }: Props) {
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userBubble : styles.astroBubble,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  userBubble: {
    backgroundColor: '#FFE2B8',
    alignSelf: 'flex-end',
  },
  astroBubble: {
    backgroundColor: '#F1F1F1',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
})
