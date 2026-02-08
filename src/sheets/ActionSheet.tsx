import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated'
import { ActionSheet } from '../types/chat'

interface ActionSheetRef {
  show: (options: ActionSheet) => void
  hide: () => void
}

export const ActionSheetComponent = forwardRef<ActionSheetRef, {}>((_, ref) => {
  const [sheet, setSheet] = useState<ActionSheet | null>(null)
  const [visible, setVisible] = useState(false)

  const show = useCallback((options: ActionSheet) => {
    setSheet(options)
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
    setTimeout(() => setSheet(null), 300)
  }, [])

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  if (!sheet) return null

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={hide}
    >
      <Animated.View
        style={styles.overlay}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
      >
        <Pressable style={StyleSheet.absoluteFillObject} onPress={hide} />

        <Animated.View
          style={styles.sheetContainer}
          entering={SlideInUp.duration(300)}
          exiting={SlideOutDown.duration(300)}
        >
          <SafeAreaView style={styles.sheet}>
            {sheet.title && (
              <View style={styles.header}>
                {sheet.description && (
                  <Text style={styles.description}>{sheet.description}</Text>
                )}
                <Text style={styles.title}>{sheet.title}</Text>
              </View>
            )}

            <View style={styles.actionsList}>
              {sheet.actions.map((action, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.action,
                    sheet.highlightIndex === index && styles.highlightAction,
                  ]}
                  onPress={() => {
                    action.onPress()
                    hide()
                  }}
                >
                  <View style={styles.actionContent}>
                    {action.icon && <View style={styles.icon}>{action.icon}</View>}
                    <Text
                      style={[
                        styles.actionText,
                        action.color && { color: action.color },
                        sheet.highlightIndex === index && styles.highlightText,
                      ]}
                    >
                      {action.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.cancelButton} onPress={hide}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
})

ActionSheetComponent.displayName = 'ActionSheet'

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    maxHeight: '75%',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  actionsList: {
    paddingVertical: 8,
  },
  action: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightAction: {
    backgroundColor: '#FFF5F0',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  highlightText: {
    color: '#FF6B35',
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})