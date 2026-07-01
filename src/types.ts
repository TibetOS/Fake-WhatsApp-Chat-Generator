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
  // Emoji reactions shown in a small pill at the bubble's bottom corner
  // (e.g. "👍" or "❤️😂").
  reactions?: string
  // id of the message this one quotes (WhatsApp-style reply).
  replyTo?: string
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
