import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native'
import { ChatMessage } from '../types/chat'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

interface MessagesListContainerProps {
  messages: ChatMessage[]
  onSwipeRight: (message: ChatMessage) => void
  isTyping: boolean
  isSendingResponse: boolean
}

export const MessagesListContainer = React.forwardRef<FlatList, MessagesListContainerProps>(
  ({ messages, onSwipeRight, isTyping, }, ref) => {
    if (messages.length === 0) {
      return <EmptyState />
    }

    return (
      <View style={styles.container}>
        <FlatList
          ref={ref}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onSwipeRight={() => onSwipeRight(item)}
            />

          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          scrollIndicatorInsets={{ right: 1 }}
          showsVerticalScrollIndicator={true}
        />


        {isTyping && (
          <TypingIndicator />
        )}
      </View>
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
      Ask Sanjai Maharaj about astrology and get cosmic insights
    </Text>
  </View>
)



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  indicatorContainer: {
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
  },
  astroBubble: {
    backgroundColor: '#F1F1F1',
  },
  sendingDots: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 2,
  },
  sendingText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
})