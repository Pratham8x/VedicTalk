export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'astro'
  quotedMessage?: ChatMessage
  timestamp?: Date
}

export interface ActionSheetAction {
  title: string
  icon: React.ReactNode
  onPress: () => void | Promise<void>
  color?: string
}

export interface ActionSheet {
  title?: string
  description?: string
  actions: ActionSheetAction[]
  highlightIndex?: number
}