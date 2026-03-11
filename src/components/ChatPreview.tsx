import { forwardRef, useEffect, useRef } from "react"
import type { Message, ChatConfig } from "../types"
import { StatusBar } from "./StatusBar"
import { ChatHeader } from "./ChatHeader"
import { ChatBubble } from "./ChatBubble"

type ChatPreviewProps = {
  messages: Message[]
  config: ChatConfig
}

const WALLPAPER_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c3ba' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

function InputBar({
  darkMode,
  isIPhone,
}: {
  darkMode: boolean
  isIPhone: boolean
}) {
  const inputBgColor = darkMode ? "#1f2c34" : "#f0f2f5"
  const composeBgColor = darkMode ? "#2a3942" : "#ffffff"
  const composeTextColor = darkMode ? "#8696a0" : "#667781"
  const iconColor = darkMode ? "#8696a0" : "#54656f"

  if (isIPhone) {
    const iosBg = darkMode ? "#1c1c1e" : "#ffffff"
    const iosBorder = darkMode ? "#38383a" : "#c6c6c8"
    const iosComposeBg = darkMode ? "#2c2c2e" : "#f2f2f7"

    return (
      <div
        className="flex items-center gap-2 px-2 py-1.5"
        style={{
          backgroundColor: iosBg,
          borderTop: `0.5px solid ${iosBorder}`,
        }}
      >
        {/* Plus icon */}
        <svg viewBox="0 0 24 24" width="26" height="26" fill={iconColor}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
        {/* Compose box */}
        <div
          className="flex-1 rounded-full px-3 py-1.5"
          style={{
            backgroundColor: iosComposeBg,
            border: `0.5px solid ${iosBorder}`,
          }}
        >
          <span className="text-[15px]" style={{ color: composeTextColor }}>
            Type a message
          </span>
        </div>
        {/* Mic */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ backgroundColor: inputBgColor }}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
        <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm5.603 0c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1.108-4.586c-1.005.462-2.162.656-3.166.22l-.676 1.517c1.525.672 3.277.382 4.95-.384 1.671-.766 2.946-1.927 3.746-3.195l-1.47-.856c-.612.972-1.675 1.936-3.384 2.698z" />
      </svg>
      <div
        className="flex-1 rounded-full px-3 py-1.5"
        style={{ backgroundColor: composeBgColor }}
      >
        <span className="text-[15px]" style={{ color: composeTextColor }}>
          Type a message
        </span>
      </div>
      <svg viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: darkMode ? "#00a884" : "#008069" }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </div>
    </div>
  )
}

export const ChatPreview = forwardRef<HTMLDivElement, ChatPreviewProps>(
  function ChatPreview({ messages, config }, ref) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isIPhone = config.phoneType === "iphone"
    const chatBgColor = config.darkMode ? "#0b141a" : "#efeae2"

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const frameRadius = isIPhone ? "44px" : "32px"
    const frameHeight = isIPhone ? "740px" : "700px"

    return (
      <div
        ref={ref}
        className="overflow-hidden shadow-2xl flex flex-col border border-gray-300"
        style={{
          width: "375px",
          height: frameHeight,
          borderRadius: frameRadius,
          background: "#000",
        }}
      >
        <StatusBar darkMode={config.darkMode} phoneType={config.phoneType} />
        <ChatHeader
          contactName={config.contactName}
          contactStatus={config.contactStatus}
          darkMode={config.darkMode}
          phoneType={config.phoneType}
        />

        {/* Chat area */}
        <div
          className="flex-1 overflow-y-auto py-2 relative"
          style={{
            backgroundColor: chatBgColor,
            backgroundImage: config.darkMode ? "none" : WALLPAPER_PATTERN,
          }}
        >
          <div className="flex justify-center my-2 mb-3">
            <span
              className="text-[12.5px] px-3 py-1 rounded-lg shadow-xs"
              style={{
                backgroundColor: config.darkMode ? "#182229" : "#e1f2fb",
                color: config.darkMode ? "#8696a0" : "#54656f",
              }}
            >
              TODAY
            </span>
          </div>

          <div className="flex flex-col gap-[1px]">
            {messages.map((msg, i) => {
              const prev = messages[i - 1]
              const showTail = !prev || prev.sender !== msg.sender
              return (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  darkMode={config.darkMode}
                  showTail={showTail}
                />
              )
            })}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <InputBar darkMode={config.darkMode} isIPhone={isIPhone} />

        {/* iPhone home indicator */}
        {isIPhone && (
          <div
            className="flex justify-center py-2"
            style={{
              backgroundColor: config.darkMode ? "#1c1c1e" : "#ffffff",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: "134px",
                height: "5px",
                backgroundColor: config.darkMode ? "#ffffff" : "#000000",
                opacity: 0.2,
              }}
            />
          </div>
        )}
      </div>
    )
  },
)
