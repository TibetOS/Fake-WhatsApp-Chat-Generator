import type { Message } from "../types"
import type { ChatTheme } from "../theme"
import { CheckMark } from "./CheckMark"

// Resolved data for the message this bubble quotes (WhatsApp reply).
export type QuoteInfo = {
  senderLabel: string
  text: string
}

type ChatBubbleProps = {
  message: Message
  theme: ChatTheme
  showTail: boolean
  quote?: QuoteInfo
}

export function ChatBubble({ message, theme, showTail, quote }: ChatBubbleProps) {
  const isSent = message.sender === "me"

  const bgColor = isSent
    ? theme.bubble.sentBackground
    : theme.bubble.receivedBackground

  const textColor = theme.bubble.text
  const timestampColor = theme.bubble.timestamp
  const hasReactions = Boolean(message.reactions?.trim())

  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} px-[3%]`}
      // Leave room for the reaction pill overlapping the bubble's bottom edge.
      style={{ marginBottom: hasReactions ? "16px" : "2px" }}
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

        {quote && (
          <div
            className="rounded-md mb-1 px-2 py-1 overflow-hidden"
            style={{
              backgroundColor: theme.quote.background,
              borderLeft: `4px solid ${theme.quote.accent}`,
            }}
          >
            <p
              className="text-[12.5px] font-medium leading-tight"
              style={{ color: theme.quote.accent }}
            >
              {quote.senderLabel}
            </p>
            <p
              className="text-[13px] leading-snug truncate"
              style={{ color: theme.quote.text }}
            >
              {quote.text}
            </p>
          </div>
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
            <CheckMark status={message.status} theme={theme} />
          )}
        </div>

        {hasReactions && (
          <div
            className="absolute"
            style={{ bottom: "-14px", [isSent ? "right" : "left"]: "4px" }}
          >
            <span
              className="text-[12px] px-1.5 py-[1px] rounded-full shadow-xs inline-block whitespace-nowrap"
              style={{
                backgroundColor: theme.reaction.background,
                border: `1px solid ${theme.reaction.border}`,
              }}
            >
              {message.reactions}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
