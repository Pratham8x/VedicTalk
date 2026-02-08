import React, { useRef, useCallback } from 'react'
import { ActionSheetContext } from '../hooks/useActionSheet'
import { ActionSheet } from '../types/chat'
import { ActionSheetComponent } from '../sheets/ActionSheet'

interface ActionSheetProviderProps {
  children: React.ReactNode
}

export const ActionSheetProvider: React.FC<ActionSheetProviderProps> = ({
  children,
}) => {
  const actionSheetRef = useRef<{
    show: (options: ActionSheet) => void
    hide: () => void
  }>(null)

  const contextValue = useCallback(
    {
      show: (options: ActionSheet) => {
        actionSheetRef.current?.show(options)
      },
    },
    []
  )

  return (
    <ActionSheetContext.Provider value={contextValue}>
      {children}
      <ActionSheetComponent ref={actionSheetRef} />
    </ActionSheetContext.Provider>
  )
}