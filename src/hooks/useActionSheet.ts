import { createContext, useContext, useRef } from 'react'
import { ActionSheet } from '../types/chat'

interface ActionSheetContextType {
  show: (options: ActionSheet) => void
}

export const ActionSheetContext = createContext<ActionSheetContextType | null>(
  null
)

export const useActionSheet = () => {
  const ctx = useContext(ActionSheetContext)
  if (!ctx) {
    throw new Error('useActionSheet must be used within ActionSheetProvider')
  }
  return ctx
}

export const useActionSheetRef = () => {
  return useRef<{
    show: (options: ActionSheet) => void
    hide: () => void
  }>(null)
}