export type MessageStatus = "sent" | "delivered" | "read"

export type MessageSender = "me" | "them" | "system"

export type Message = {
  id: string
  text: string
  sender: MessageSender
  timestamp: string
  status: MessageStatus
  // Optional date-separator label (e.g. "Today", "Yesterday", "12 May 2024").
  // A divider is rendered whenever this differs from the previous message's.
  date?: string
}

export type PhoneType = "iphone" | "android"

export type ChatConfig = {
  contactName: string
  contactStatus: string
  darkMode: boolean
  phoneType: PhoneType
  // Device status bar (kept deterministic so exports are reproducible)
  statusBarTime: string
  batteryLevel: number
}
