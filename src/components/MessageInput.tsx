import React, { useState, useRef } from 'react'
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'

interface MessageInputProps {
  value: string
  onChange: (text: string) => void
  onSend: () => void
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handleSend = () => {
    if (value.trim()) {
      onSend()
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  const isSendDisabled = !value.trim()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, isFocused && styles.containerFocused]}>
        <TouchableOpacity
          style={styles.attachButton}
        >
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask your planets..."
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={true}
        />

        <Animated.View
          style={[
            styles.sendButton,
            {
              opacity: isSendDisabled ? 0.5 : 1,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Pressable
            onPress={handleSend}
            disabled={isSendDisabled}
            style={({ pressed }) => [
              styles.sendButtonInner,
              pressed && !isSendDisabled && styles.sendButtonPressed,
            ]}
          >
            <Text style={styles.sendIcon}>&gt;</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 10

  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
    minHeight: 52,
  },
  containerFocused: {
    paddingVertical: 12,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  attachButtonPressed: {
    backgroundColor: '#E0E0E0',
  },
  plusIcon: {
    fontSize: 24,
    color: '#999',
    fontWeight: '600',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonPressed: {
    backgroundColor: '#FF7A00',
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
})