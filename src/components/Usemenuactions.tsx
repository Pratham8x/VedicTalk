import { useCallback, MutableRefObject } from 'react'
import { Alert, Text } from 'react-native'
import { ActionSheet as ActionSheetType } from '../types/chat'

interface UseMenuActionsProps {
  onClearChat: () => void
  onDeleteChat: () => void
  actionSheetRef: MutableRefObject<any>
}

export const useMenuActions = ({
  onClearChat,
  onDeleteChat,
  actionSheetRef,
}: UseMenuActionsProps) => {
  const handleMenuPress = useCallback(() => {
    const menuActions: ActionSheetType = {
      actions: [
        {
          title: 'Clear Chat',
          icon: <Text >🧹</Text>,
          onPress: () => {
            Alert.alert(
              'Clear Chat',
              'Are you sure you want to clear this chat?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Clear',
                  onPress: onClearChat,
                  style: 'destructive',
                },
              ]
            )
          },
        },
        {
          title: 'Delete Chat',
          icon: <Text>🗑️</Text>,
          color: '#FF3B30',
          onPress: () => {
            Alert.alert(
              'Delete Chat',
              'Are you sure you want to delete this chat? This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: onDeleteChat,
                  style: 'destructive',
                },
              ]
            )
          },
        },
      ],
    }

    actionSheetRef.current?.show(menuActions)
  }, [onClearChat, onDeleteChat, actionSheetRef])

  return { handleMenuPress }
}