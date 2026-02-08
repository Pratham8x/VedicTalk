import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
} from 'react'
import { ActionSheetComponent } from '../sheets/ActionSheet'
import { ActionSheet } from '../types/chat'

interface ActionSheetRef {
  show: (options: ActionSheet) => void
  hide: () => void
}

interface ActionSheetContextValue {
  showActionSheet: (options: ActionSheet) => void
}

const ActionSheetContext = createContext<ActionSheetContextValue | null>(
  null
)

export const ActionSheetProvider = ({ children }: { children: ReactNode }) => {
  const sheetRef = useRef<ActionSheetRef>(null)

  const showActionSheet = (options: ActionSheet) => {
    sheetRef.current?.show(options)
  }

  return (
    <ActionSheetContext.Provider value={{ showActionSheet }}>
      {children}
      {/* Mounted ONCE globally */}
      <ActionSheetComponent ref={sheetRef} />
    </ActionSheetContext.Provider>
  )
}

export const useActionSheet = () => {
  const context = useContext(ActionSheetContext)

  if (!context) {
    throw new Error(
      'useActionSheet must be used inside ActionSheetProvider'
    )
  }

  return context
}
