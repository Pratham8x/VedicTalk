import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import ChatMessage from '../components/ChatMessage'
import TypingBubble from '../components/TypingBubble'

export default function ChatScreen() {
  const [message, setMessage] = useState('')
  const [showTyping, setShowTyping] = useState(false)

  const messages = [
    { id: '1', text: 'Hello Guruji 🙏', isUser: true },
    {
      id: '2',
      text: 'Thank you for your message. We’ll get back to you shortly.',
      isUser: false,
    },
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerTitle}>
          Sanjai Maharaj · Vedic Astrologer
        </Text>
      </TouchableOpacity>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage text={item.text} isUser={item.isUser} />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {showTyping && <TypingBubble />}

      {/* Input */}
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.plus}>
          <Text style={{ fontSize: 20 }}>＋</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type your message…"
          value={message}
          onChangeText={(text) => {
            setMessage(text)
            setShowTyping(text.length > 0)
          }}
        />

        <TouchableOpacity
          disabled={!message}
          style={[
            styles.send,
            { opacity: message.length ? 1 : 0.4 },
          ]}
          onPress={() => {
            setMessage('')
            setShowTyping(false)
          }}
        >
          <Text style={{ fontSize: 18 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  plus: {
    padding: 6,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  send: {
    padding: 6,
  },
})
