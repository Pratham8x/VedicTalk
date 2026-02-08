import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native'
import { ChatMessage } from '../types/chat'
import { MessageBubble } from './MessageBubble'


interface MessagesListContainerProps {
  messages: ChatMessage[]
  onMessageLongPress: (message: ChatMessage) => void
}

export const MessagesListContainer = React.forwardRef<FlatList, MessagesListContainerProps>(
  ({ messages, onMessageLongPress }, ref) => {
    // Show empty state when no messages
    if (messages.length === 0) {
      return <EmptyState />
    }

    return (
      <FlatList
        ref={ref}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            onLongPress={onMessageLongPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        scrollIndicatorInsets={{ right: 1 }}
        showsVerticalScrollIndicator={true}
      />
    )
  }
)

MessagesListContainer.displayName = 'MessagesListContainer'
const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>
      <Text style={styles.emptyIconText}>✦</Text>
    </View>
    <Text style={styles.emptyTitle}>Start a conversation</Text>
    <Text style={styles.emptySubtitle}>
      Ask Sanjai about astrology and get cosmic insights
    </Text>
  </View>
)

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIconText: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
})