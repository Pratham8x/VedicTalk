import React, { useRef, useState, useCallback, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ChatMessage } from '../types/chat'
import { ChatHeader } from '../components/ChatHeader'
import { MessageInput } from '../components/MessageInput'
import { QuickReplyPreview } from '../components/QuickReplyPreview'
import { MessagesListContainer } from '../components/Messageslistcontainer'
import { AstrologerSheet } from '../sheets/AstrologerSheet'
import { useActionSheet } from '../hooks/ActionSheetContext'

export const ChatScreen: React.FC<{
  onBackPress?: () => void
}> = ({ onBackPress }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setText] = useState('')
  const [selectedMessage, setSelectedMessage] =
    useState<ChatMessage | undefined>()
  const [isTyping, setIsTyping] = useState(false)
  const [isSendingResponse, setIsSendingResponse] = useState(false)

  const flatListRef = useRef<any>(null)
  const astroSheetRef = useRef<any>(null)

  const { showActionSheet } = useActionSheet()

  useEffect(() => {
    if (!messages.length) return
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (!inputText.trim()) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: inputText.trim(),
      sender: 'user',
      quotedMessage: selectedMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setText('')
    setSelectedMessage(undefined)
    setIsSendingResponse(true)

    setTimeout(() => setIsTyping(true), 500)

    setTimeout(() => {
      const astroMessage: ChatMessage = {
        id: `msg-${Date.now()}-astro`,
        text: "Thank you for your message, I'll get back to you shortly.",
        sender: 'astro',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, astroMessage])
      setIsTyping(false)
      setIsSendingResponse(false)
    }, 2000)
  }, [inputText, selectedMessage])

  const handleSwipeRight = useCallback((message: ChatMessage) => {
    setSelectedMessage(message)
  }, [])

  const handleMenuPress = useCallback(() => {
    showActionSheet({
      description: 'Choose an action',
      highlightIndex: 1,
      actions: [
        {
          title: 'Clear chat',
          icon: null,
          onPress: () => {
            setMessages([])
            setSelectedMessage(undefined)
          },
        },
        {
          title: 'Delete chat',
          icon: null,
          onPress: () => {
            setMessages([])
            setSelectedMessage(undefined)
            onBackPress?.()
          },
        },
      ],
    })
  }, [showActionSheet, onBackPress])

  const handleBackPress = useCallback(() => {
    onBackPress?.()
  }, [onBackPress])

  const handleAstroInfoPress = useCallback(() => {
    astroSheetRef.current?.expand()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        onBackPress={handleBackPress}
        onMenuPress={handleMenuPress}
        onAstroPress={handleAstroInfoPress}
      />

      <MessagesListContainer
        ref={flatListRef}
        messages={messages}
        onSwipeRight={handleSwipeRight}
        isTyping={isTyping}
        isSendingResponse={isSendingResponse}
      />

      <QuickReplyPreview
        message={selectedMessage}
        onClear={() => setSelectedMessage(undefined)}
      />

      <MessageInput
        value={inputText}
        onChange={setText}
        onSend={handleSendMessage}
      />

      <AstrologerSheet ref={astroSheetRef} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})
