import 'react-native-gesture-handler'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootNavigator from './src/navigation/RootNavigator'
import { ActionSheetProvider } from './src/hooks/ActionSheetContext'

export default function App() {
  return (
    <GestureHandlerRootView >
      <ActionSheetProvider>
        <RootNavigator />
      </ActionSheetProvider>
    </GestureHandlerRootView>
  )
}
