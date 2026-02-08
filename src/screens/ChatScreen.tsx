import React, { useRef, useState, useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { ChatMessage } from '../types/chat'
import { ChatHeader } from '../components/ChatHeader'
import { MessageInput } from '../components/MessageInput'
import { QuickReplyPreview } from '../components/QuickReplyPreview'
import { AttachmentModal } from '../components/AttachmentModal'
import { useMenuActions } from '../components/Usemenuactions'
import { MessagesListContainer } from '../components/Messageslistcontainer'
import { ActionSheetComponent } from '../sheets/ActionSheet'

export const ChatScreen: React.FC<{
  onBackPress?: () => void
}> = ({ onBackPress }) => {
  // ===================== STATE =====================
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setText] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | undefined>()
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false)

  // ===================== REFS =====================
  const flatListRef = useRef<any>(null)
  const actionSheetRef = useRef<any>(null)

  // ===================== EFFECTS =====================
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  // ===================== HANDLERS =====================
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

    // Simulate astrologer response
    setTimeout(() => {
      const astroMessage: ChatMessage = {
        id: `msg-${Date.now()}-astro`,
        text: "Thank you for your message, I'll get back to you shortly.",
        sender: 'astro',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, astroMessage])
    }, 500)
  }, [inputText, selectedMessage])

  const handleMessageLongPress = useCallback((message: ChatMessage) => {
    setSelectedMessage(message)
  }, [])

  const { handleMenuPress } = useMenuActions({
    onClearChat: () => {
      setMessages([])
      setSelectedMessage(undefined)
    },
    onDeleteChat: () => {
      setMessages([])
      setSelectedMessage(undefined)
      onBackPress?.()
    },
    actionSheetRef,
  })

  const handleBackPress = useCallback(() => {
    onBackPress?.()
  }, [onBackPress])

  const handleAstroInfoPress = useCallback(() => {
    console.log('Astrologer info pressed - add your navigation/modal here')
  }, [])

  const handleAttachmentPress = useCallback(() => {
    setAttachmentModalVisible(true)
  }, [])

  const handleSelectPhoto = useCallback(() => {
    console.log('Photo selected - integrate with image picker library')
  }, [])

  const handleSelectCamera = useCallback(() => {
    console.log('Camera selected - integrate with camera library')
  }, [])

  const handleSelectFile = useCallback(() => {
    console.log('File selected - integrate with file picker library')
  }, [])

  return (
    <SafeAreaView style={styles.container} >
      {/* Header */}
      <ChatHeader
        onBackPress={handleBackPress}
        onMenuPress={handleMenuPress}
        onAstroPress={handleAstroInfoPress}
      />

      {/* Messages List */}
      <MessagesListContainer
        ref={flatListRef}
        messages={messages}
        onMessageLongPress={handleMessageLongPress}
      />

      {/* Quick Reply Preview */}
      <QuickReplyPreview
        message={selectedMessage}
        onClear={() => setSelectedMessage(undefined)}
      />

      {/* Message Input */}
      <MessageInput
        value={inputText}
        onChange={setText}
        onSend={handleSendMessage}
        onAttachment={handleAttachmentPress}
      />

      {/* Action Sheet - Menu Options */}
      <ActionSheetComponent ref={actionSheetRef} />

      {/* Attachment Modal */}
      <AttachmentModal
        visible={attachmentModalVisible}
        onClose={() => setAttachmentModalVisible(false)}
        onSelectPhoto={handleSelectPhoto}
        onSelectCamera={handleSelectCamera}
        onSelectFile={handleSelectFile}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})