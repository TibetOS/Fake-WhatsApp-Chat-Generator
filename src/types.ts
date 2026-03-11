export type MessageStatus = "sent" | "delivered" | "read"

export type Message = {
  id: string
  text: string
  sender: "me" | "them"
  timestamp: string
  status: MessageStatus
}

export type PhoneType = "iphone" | "android"

export type ChatConfig = {
  contactName: string
  contactStatus: string
  darkMode: boolean
  phoneType: PhoneType
}
