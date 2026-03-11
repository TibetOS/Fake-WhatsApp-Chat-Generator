import type { Message } from "../types"
import { CheckMark } from "./CheckMark"

type ChatBubbleProps = {
  message: Message
  darkMode: boolean
  showTail: boolean
}

export function ChatBubble({ message, darkMode, showTail }: ChatBubbleProps) {
  const isSent = message.sender === "me"

  const bgColor = isSent
    ? darkMode
      ? "#005c4b"
      : "#d9fdd3"
    : darkMode
      ? "#202c33"
      : "#ffffff"

  const textColor = darkMode ? "#e9edef" : "#111b21"
  const timestampColor = darkMode ? "#8696a0" : "#667781"

  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} px-[3%]`}
      style={{ marginBottom: "2px" }}
    >
      <div
        className="relative max-w-[65%] rounded-lg shadow-xs"
        style={{
          backgroundColor: bgColor,
          padding: "6px 7px 8px 9px",
          borderTopLeftRadius: !isSent && showTail ? 0 : undefined,
          borderTopRightRadius: isSent && showTail ? 0 : undefined,
        }}
      >
        {showTail && (
          <div
            className="absolute top-0"
            style={{
              [isSent ? "right" : "left"]: "-8px",
              width: 0,
              height: 0,
              borderTop: `6px solid ${bgColor}`,
              ...(isSent
                ? { borderRight: "8px solid transparent" }
                : { borderLeft: "8px solid transparent" }),
            }}
          />
        )}

        <div className="relative">
          <span
            className="text-[14.2px] leading-[19px] whitespace-pre-wrap break-words"
            style={{ color: textColor }}
          >
            {message.text}
          </span>
          <span
            className="inline-block align-middle"
            style={{ width: isSent ? "68px" : "46px" }}
          />
        </div>

        <div
          className="float-right flex items-center gap-[3px] relative"
          style={{ marginTop: "-10px" }}
        >
          <span
            className="text-[11px] leading-[15px]"
            style={{ color: timestampColor }}
          >
            {message.timestamp}
          </span>
          {isSent && (
            <CheckMark status={message.status} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  )
}
