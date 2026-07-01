import { useRef, useState, useCallback } from "react"
import { toPng } from "html-to-image"
import type { Message, ChatConfig } from "./types"
import { ChatPreview } from "./components/ChatPreview"
import { ControlPanel } from "./components/ControlPanel"

const INITIAL_MESSAGES: Message[] = [
  {
    id: crypto.randomUUID(),
    text: "🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.",
    sender: "system",
    timestamp: "",
    status: "read",
    date: "Today",
  },
  {
    id: crypto.randomUUID(),
    text: "Hey! How are you? 😊",
    sender: "them",
    timestamp: "09:41",
    status: "read",
  },
  {
    id: crypto.randomUUID(),
    text: "I'm great, thanks! How about you?",
    sender: "me",
    timestamp: "09:42",
    status: "read",
  },
  {
    id: crypto.randomUUID(),
    text: "Doing well! Want to grab lunch today?",
    sender: "them",
    timestamp: "09:43",
    status: "read",
  },
  {
    id: crypto.randomUUID(),
    text: "Sure! Where do you want to go?",
    sender: "me",
    timestamp: "09:44",
    status: "read",
  },
  {
    id: crypto.randomUUID(),
    text: "How about that new place downtown? I heard they have amazing pasta 🍝",
    sender: "them",
    timestamp: "09:45",
    status: "read",
  },
  {
    id: crypto.randomUUID(),
    text: "Sounds perfect! Let's meet at 12:30",
    sender: "me",
    timestamp: "09:46",
    status: "delivered",
  },
]

const INITIAL_CONFIG: ChatConfig = {
  contactName: "Sarah",
  contactStatus: "online",
  darkMode: false,
  phoneType: "android",
  statusBarTime: "9:41",
  batteryLevel: 100,
}

function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [config, setConfig] = useState<ChatConfig>(INITIAL_CONFIG)
  const phoneRef = useRef<HTMLDivElement>(null)

  const handleAddMessage = useCallback(
    (msg: Omit<Message, "id">) => {
      setMessages((prev) => [...prev, { ...msg, id: crypto.randomUUID() }])
    },
    [],
  )

  const handleUpdateMessage = useCallback(
    (id: string, updates: Omit<Message, "id">) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...updates, id } : m)),
      )
    },
    [],
  )

  const handleDeleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const handleMoveMessage = useCallback(
    (id: string, direction: "up" | "down") => {
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === id)
        if (idx === -1) return prev
        const newIdx = direction === "up" ? idx - 1 : idx + 1
        if (newIdx < 0 || newIdx >= prev.length) return prev
        const next = [...prev]
        ;[next[idx], next[newIdx]] = [next[newIdx], next[idx]]
        return next
      })
    },
    [],
  )

  const handleExport = useCallback(async () => {
    if (!phoneRef.current) return
    try {
      const dataUrl = await toPng(phoneRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })
      const link = document.createElement("a")
      link.download = "whatsapp-chat.png"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Export failed:", err)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Fake WhatsApp Chat Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create realistic WhatsApp conversations
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 max-w-5xl mx-auto">
        {/* Phone preview */}
        <div className="flex justify-center w-full lg:w-auto flex-shrink-0 lg:sticky lg:top-6">
          <ChatPreview ref={phoneRef} messages={messages} config={config} />
        </div>

        {/* Control panel */}
        <div className="w-full lg:w-auto flex justify-center">
          <ControlPanel
            messages={messages}
            config={config}
            onAddMessage={handleAddMessage}
            onUpdateMessage={handleUpdateMessage}
            onDeleteMessage={handleDeleteMessage}
            onMoveMessage={handleMoveMessage}
            onUpdateConfig={setConfig}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  )
}

export { App }
