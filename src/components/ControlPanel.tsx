import { useState } from "react"
import type {
  Message,
  MessageSender,
  MessageStatus,
  ChatConfig,
  PhoneType,
} from "../types"

type ControlPanelProps = {
  messages: Message[]
  config: ChatConfig
  onAddMessage: (msg: Omit<Message, "id">) => void
  onUpdateMessage: (id: string, msg: Omit<Message, "id">) => void
  onDeleteMessage: (id: string) => void
  onMoveMessage: (id: string, direction: "up" | "down") => void
  onUpdateConfig: (config: ChatConfig) => void
  onExport: () => void
}

export function ControlPanel({
  messages,
  config,
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  onMoveMessage,
  onUpdateConfig,
  onExport,
}: ControlPanelProps) {
  const [text, setText] = useState("")
  const [sender, setSender] = useState<MessageSender>("them")
  const [timestamp, setTimestamp] = useState("10:30")
  const [status, setStatus] = useState<MessageStatus>("read")
  const [date, setDate] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const isSystem = sender === "system"

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (!text.trim()) return

    const trimmedDate = date.trim()
    const payload: Omit<Message, "id"> = {
      text,
      sender,
      // System notices carry no timestamp or read receipt. For regular
      // messages, fall back to a sensible default if the field was cleared
      // (e.g. after editing a system message, which has an empty time).
      timestamp: isSystem ? "" : timestamp.trim() || "10:30",
      status,
      ...(trimmedDate ? { date: trimmedDate } : {}),
    }

    if (editingId) {
      onUpdateMessage(editingId, payload)
      setEditingId(null)
    } else {
      onAddMessage(payload)
    }
    setText("")
    setDate("")
  }

  const handleEdit = (msg: Message) => {
    setEditingId(msg.id)
    setText(msg.text)
    setSender(msg.sender)
    setTimestamp(msg.timestamp)
    setStatus(msg.status)
    setDate(msg.date ?? "")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setText("")
    setDate("")
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Export button */}
      <button
        onClick={onExport}
        className="w-full py-2.5 bg-[#008069] hover:bg-[#006b57] text-white rounded-lg font-medium transition-colors cursor-pointer"
      >
        Export as PNG
      </button>

      {/* Chat Settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Chat Settings
        </h3>
        <div className="flex flex-col gap-3">
          {/* Phone Type Toggle */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Layout
            </label>
            <div className="flex gap-2">
              {(["iphone", "android"] as PhoneType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    onUpdateConfig({ ...config, phoneType: type })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    config.phoneType === type
                      ? "bg-[#008069] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type === "iphone" ? "iPhone" : "Android"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Contact Name
            </label>
            <input
              type="text"
              value={config.contactName}
              onChange={(e) =>
                onUpdateConfig({ ...config, contactName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Contact Status
            </label>
            <input
              type="text"
              value={config.contactStatus}
              onChange={(e) =>
                onUpdateConfig({ ...config, contactStatus: e.target.value })
              }
              placeholder="online, typing..., last seen today at 10:30"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Status Bar Time
              </label>
              <input
                type="text"
                value={config.statusBarTime}
                onChange={(e) =>
                  onUpdateConfig({ ...config, statusBarTime: e.target.value })
                }
                placeholder="9:41"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Battery ({config.batteryLevel}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={config.batteryLevel}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    batteryLevel: Number(e.target.value),
                  })
                }
                className="w-full h-9 accent-[#008069] cursor-pointer"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.darkMode}
              onChange={(e) =>
                onUpdateConfig({ ...config, darkMode: e.target.checked })
              }
              className="w-4 h-4 accent-[#008069]"
            />
            <span className="text-sm text-gray-700">Dark Mode</span>
          </label>
        </div>
      </div>

      {/* Add/Edit Message */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-4 shadow-sm"
      >
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {editingId ? "Edit Message" : "Add Message"}
        </h3>
        <div className="flex flex-col gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
          />

          {/* Sender toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSender("me")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                sender === "me"
                  ? "bg-[#d9fdd3] text-[#111b21] ring-2 ring-[#008069]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Me (Sent)
            </button>
            <button
              type="button"
              onClick={() => setSender("them")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                sender === "them"
                  ? "bg-white text-[#111b21] ring-2 ring-[#008069] shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {config.contactName || "Contact"}
            </button>
            <button
              type="button"
              onClick={() => setSender("system")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isSystem
                  ? "bg-[#e1f2fb] text-[#54656f] ring-2 ring-[#008069]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              System
            </button>
          </div>

          {!isSystem && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="time"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
                />
              </div>
              {sender === "me" && (
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MessageStatus)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069] bg-white"
                  >
                    <option value="sent">Sent (✓)</option>
                    <option value="delivered">Delivered (✓✓)</option>
                    <option value="read">Read (✓✓ blue)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date separator{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Today, Yesterday, 12 May 2024"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/30 focus:border-[#008069]"
            />
            <p className="text-xs text-gray-400 mt-1">
              Shows a centered date pill above this message when it differs from
              the previous one.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#008069] hover:bg-[#006b57] text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {editingId ? "Save Changes" : "Add Message"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Messages List */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Messages ({messages.length})
        </h3>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No messages yet. Add one above.
          </p>
        ) : (
          <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                  editingId === msg.id ? "bg-[#008069]/10" : "hover:bg-gray-50"
                }`}
              >
                {/* Sender indicator */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      msg.sender === "me"
                        ? "#25d366"
                        : msg.sender === "system"
                          ? "#53bdeb"
                          : "#8696a0",
                  }}
                />
                {/* Message preview */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 truncate">{msg.text}</p>
                  <p className="text-xs text-gray-400">
                    {msg.sender === "me"
                      ? "You"
                      : msg.sender === "system"
                        ? "System"
                        : config.contactName}
                    {msg.date ? ` · ${msg.date}` : ""}
                    {msg.timestamp ? ` · ${msg.timestamp}` : ""}
                  </p>
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => onMoveMessage(msg.id, "up")}
                    disabled={i === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                    title="Move up"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onMoveMessage(msg.id, "down")}
                    disabled={i === messages.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                    title="Move down"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(msg)}
                    className="p-1 text-gray-400 hover:text-blue-500 cursor-pointer"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteMessage(msg.id)}
                    className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                    title="Delete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
