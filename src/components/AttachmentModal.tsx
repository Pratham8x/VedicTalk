import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native'
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated'

interface AttachmentModalProps {
  visible: boolean
  onClose: () => void
  onSelectPhoto: () => void
  onSelectCamera: () => void
  onSelectFile: () => void
}

export const AttachmentModal: React.FC<AttachmentModalProps> = ({
  visible,
  onClose,
  onSelectPhoto,
  onSelectCamera,
  onSelectFile,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={styles.overlay}
        entering={FadeIn.duration(200)}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
        />

        <Animated.View
          style={styles.container}
          entering={SlideInUp.duration(300)}
        >
          <SafeAreaView style={styles.sheet}>
            <Text style={styles.title}>Share Media</Text>

            <View style={styles.optionsContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  onSelectCamera()
                  onClose()
                }}
              >
                <View style={styles.optionIcon}>
                  <Text style={styles.optionIconText}>📷</Text>
                </View>
                <Text style={styles.optionText}>Camera</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  onSelectPhoto()
                  onClose()
                }}
              >
                <View style={styles.optionIcon}>
                  <Text style={styles.optionIconText}>🖼️</Text>
                </View>
                <Text style={styles.optionText}>Gallery</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  onSelectFile()
                  onClose()
                }}
              >
                <View style={styles.optionIcon}>
                  <Text style={styles.optionIconText}>📄</Text>
                </View>
                <Text style={styles.optionText}>Document</Text>
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.cancelButtonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '60%',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  option: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  optionPressed: {
    backgroundColor: '#F5F5F5',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionIconText: {
    fontSize: 28,
  },
  optionText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
  },
  cancelButton: {
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonPressed: {
    backgroundColor: '#E8E8E8',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})