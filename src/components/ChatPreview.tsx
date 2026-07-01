import { forwardRef, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import type { Message, ChatConfig } from "../types"
import { getChatTheme } from "../theme"
import type { ChatTheme } from "../theme"
import { StatusBar } from "./StatusBar"
import { ChatHeader } from "./ChatHeader"
import { ChatBubble } from "./ChatBubble"

type ChatPreviewProps = {
  messages: Message[]
  config: ChatConfig
}

// WhatsApp-style doodle wallpaper pattern with iconic small shapes
const WALLPAPER_PATTERN_LIGHT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='%23c3beb4' fill-opacity='0.22' stroke='none'%3E%3C!-- phone --%3E%3Crect x='10' y='10' width='8' height='14' rx='2'/%3E%3Crect x='12' y='20' width='4' height='1.5' rx='0.75'/%3E%3C!-- clock --%3E%3Ccircle cx='50' cy='18' r='7' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cline x1='50' y1='18' x2='50' y2='13' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cline x1='50' y1='18' x2='53' y2='20' stroke='%23c3beb4' stroke-width='1.2' stroke-opacity='0.22'/%3E%3C!-- heart --%3E%3Cpath d='M95 14 C95 10 100 8 102 12 C104 8 109 10 109 14 C109 19 102 23 102 23 C102 23 95 19 95 14Z'/%3E%3C!-- envelope --%3E%3Crect x='140' y='12' width='14' height='10' rx='1.5'/%3E%3Cpath d='M140 12 L147 18 L154 12' fill='none' stroke='%23efeae2' stroke-width='1'/%3E%3C!-- musical note --%3E%3Ccircle cx='178' cy='22' r='3'/%3E%3Cline x1='181' y1='22' x2='181' y2='10' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cpath d='M181 10 Q185 8 184 12' fill='%23c3beb4' fill-opacity='0.22'/%3E%3C!-- speech bubble --%3E%3Crect x='12' y='55' width='16' height='11' rx='3'/%3E%3Cpath d='M16 66 L14 70 L20 66'/%3E%3C!-- camera --%3E%3Crect x='52' y='55' width='14' height='10' rx='2'/%3E%3Ccircle cx='59' cy='60' r='3' fill='%23efeae2'/%3E%3C!-- star --%3E%3Cpath d='M105 55 L107 61 L113 61 L108 65 L110 71 L105 67 L100 71 L102 65 L97 61 L103 61Z'/%3E%3C!-- key --%3E%3Ccircle cx='147' cy='58' r='4' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cline x1='151' y1='58' x2='158' y2='58' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cline x1='156' y1='58' x2='156' y2='62' stroke='%23c3beb4' stroke-width='1.2' stroke-opacity='0.22'/%3E%3C!-- smiley --%3E%3Ccircle cx='183' cy='58' r='7' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Ccircle cx='180' cy='56' r='1'/%3E%3Ccircle cx='186' cy='56' r='1'/%3E%3Cpath d='M179 61 Q183 65 187 61' fill='none' stroke='%23c3beb4' stroke-width='1' stroke-opacity='0.22'/%3E%3C!-- pin/location --%3E%3Cpath d='M18 105 C18 99 28 99 28 105 C28 111 23 117 23 117 C23 117 18 111 18 105Z'/%3E%3Ccircle cx='23' cy='105' r='2.5' fill='%23efeae2'/%3E%3C!-- document --%3E%3Crect x='52' y='100' width='11' height='14' rx='1'/%3E%3Cline x1='55' y1='105' x2='60' y2='105' stroke='%23efeae2' stroke-width='1'/%3E%3Cline x1='55' y1='108' x2='60' y2='108' stroke='%23efeae2' stroke-width='1'/%3E%3C!-- globe --%3E%3Ccircle cx='105' cy='108' r='7' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cellipse cx='105' cy='108' rx='3.5' ry='7' fill='none' stroke='%23c3beb4' stroke-width='1' stroke-opacity='0.22'/%3E%3Cline x1='98' y1='108' x2='112' y2='108' stroke='%23c3beb4' stroke-width='1' stroke-opacity='0.22'/%3E%3C!-- lock --%3E%3Crect x='145' y='107' width='10' height='8' rx='1'/%3E%3Cpath d='M147 107 L147 103 C147 100 153 100 153 103 L153 107' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3C!-- wifi --%3E%3Cpath d='M178 115 L183 108 L188 115' fill='none' stroke='%23c3beb4' stroke-width='1.5' stroke-opacity='0.22'/%3E%3Cpath d='M175 112 L183 103 L191 112' fill='none' stroke='%23c3beb4' stroke-width='1' stroke-opacity='0.15'/%3E%3C!-- pencil --%3E%3Cline x1='15' y1='160' x2='25' y2='148' stroke='%23c3beb4' stroke-width='2' stroke-opacity='0.22'/%3E%3Cpath d='M25 148 L28 151 L15 160Z'/%3E%3C!-- thumbs up --%3E%3Cpath d='M56 155 L56 148 L60 145 L62 148 L62 155Z'/%3E%3Crect x='52' y='150' width='4' height='7' rx='1'/%3E%3C!-- lightning --%3E%3Cpath d='M105 145 L101 155 L105 155 L100 165 L110 153 L106 153Z'/%3E%3C!-- mic --%3E%3Crect x='148' y='147' width='6' height='10' rx='3'/%3E%3Cpath d='M146 155 C146 160 156 160 156 155' fill='none' stroke='%23c3beb4' stroke-width='1.3' stroke-opacity='0.22'/%3E%3Cline x1='151' y1='160' x2='151' y2='163' stroke='%23c3beb4' stroke-width='1.3' stroke-opacity='0.22'/%3E%3C!-- photo --%3E%3Crect x='177' y='148' width='14' height='11' rx='1.5'/%3E%3Ccircle cx='182' cy='152' r='2' fill='%23efeae2'/%3E%3Cpath d='M177 157 L182 153 L187 157 L189 155 L191 157 L191 159 L177 159Z' fill='%23efeae2'/%3E%3C/g%3E%3C/svg%3E")`

const WALLPAPER_PATTERN_DARK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='%23172520' fill-opacity='0.6' stroke='none'%3E%3Crect x='10' y='10' width='8' height='14' rx='2'/%3E%3Crect x='12' y='20' width='4' height='1.5' rx='0.75'/%3E%3Ccircle cx='50' cy='18' r='7' fill='none' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Cline x1='50' y1='18' x2='50' y2='13' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Cline x1='50' y1='18' x2='53' y2='20' stroke='%23172520' stroke-width='1.2' stroke-opacity='0.6'/%3E%3Cpath d='M95 14 C95 10 100 8 102 12 C104 8 109 10 109 14 C109 19 102 23 102 23 C102 23 95 19 95 14Z'/%3E%3Crect x='140' y='12' width='14' height='10' rx='1.5'/%3E%3Cpath d='M140 12 L147 18 L154 12' fill='none' stroke='%230b141a' stroke-width='1'/%3E%3Ccircle cx='178' cy='22' r='3'/%3E%3Cline x1='181' y1='22' x2='181' y2='10' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Crect x='12' y='55' width='16' height='11' rx='3'/%3E%3Cpath d='M16 66 L14 70 L20 66'/%3E%3Crect x='52' y='55' width='14' height='10' rx='2'/%3E%3Ccircle cx='59' cy='60' r='3' fill='%230b141a'/%3E%3Cpath d='M105 55 L107 61 L113 61 L108 65 L110 71 L105 67 L100 71 L102 65 L97 61 L103 61Z'/%3E%3Ccircle cx='147' cy='58' r='4' fill='none' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Cline x1='151' y1='58' x2='158' y2='58' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Ccircle cx='183' cy='58' r='7' fill='none' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Ccircle cx='180' cy='56' r='1'/%3E%3Ccircle cx='186' cy='56' r='1'/%3E%3Cpath d='M179 61 Q183 65 187 61' fill='none' stroke='%23172520' stroke-width='1' stroke-opacity='0.6'/%3E%3Cpath d='M18 105 C18 99 28 99 28 105 C28 111 23 117 23 117 C23 117 18 111 18 105Z'/%3E%3Ccircle cx='23' cy='105' r='2.5' fill='%230b141a'/%3E%3Crect x='52' y='100' width='11' height='14' rx='1'/%3E%3Ccircle cx='105' cy='108' r='7' fill='none' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Crect x='145' y='107' width='10' height='8' rx='1'/%3E%3Cpath d='M147 107 L147 103 C147 100 153 100 153 103 L153 107' fill='none' stroke='%23172520' stroke-width='1.5' stroke-opacity='0.6'/%3E%3Cpath d='M105 145 L101 155 L105 155 L100 165 L110 153 L106 153Z'/%3E%3Crect x='148' y='147' width='6' height='10' rx='3'/%3E%3Crect x='177' y='148' width='14' height='11' rx='1.5'/%3E%3C/g%3E%3C/svg%3E")`

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
    const iosBg = darkMode ? "#1c1c1e" : "#f6f6f6"
    const iosBorder = darkMode ? "#38383a" : "#c6c6c8"
    const iosComposeBg = darkMode ? "#2c2c2e" : "#ffffff"

    return (
      <div
        className="flex items-center gap-1.5 px-2 py-1.5"
        style={{
          backgroundColor: iosBg,
          borderTop: `0.5px solid ${iosBorder}`,
        }}
      >
        {/* Plus icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke={iconColor}
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        {/* Compose box */}
        <div
          className="flex-1 flex items-center rounded-full px-3 py-1.5"
          style={{
            backgroundColor: iosComposeBg,
            border: `0.5px solid ${iosBorder}`,
          }}
        >
          <span
            className="flex-1 text-[15px]"
            style={{ color: composeTextColor }}
          >
            Type a message
          </span>
          {/* Sticker icon inside compose */}
          <svg viewBox="0 0 24 24" width="22" height="22" fill={iconColor}>
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm5.603 0c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          </svg>
        </div>
        {/* Camera */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
          <circle cx="12" cy="13" r="3" />
          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
        </svg>
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

// Centered "pill" used for both date separators and system notices.
function CenterPill({
  children,
  theme,
  wide = false,
}: {
  children: ReactNode
  theme: ChatTheme
  wide?: boolean
}) {
  return (
    <div className="flex justify-center my-2">
      <span
        className={`text-[11.5px] px-3 py-1 rounded-lg shadow-xs font-medium text-center ${
          wide ? "max-w-[85%]" : ""
        }`}
        style={{
          backgroundColor: theme.pill.background,
          color: theme.pill.text,
        }}
      >
        {children}
      </span>
    </div>
  )
}

// Build the ordered list of things to render: date dividers (inserted when a
// message's date label changes) interleaved with messages/system notices.
type RenderItem =
  | { kind: "divider"; key: string; label: string }
  | { kind: "system"; key: string; text: string }
  | { kind: "message"; key: string; message: Message; showTail: boolean }

function buildRenderItems(messages: Message[]): RenderItem[] {
  const items: RenderItem[] = []
  let lastDate: string | undefined
  messages.forEach((msg, i) => {
    let dividerShown = false
    if (msg.date && msg.date !== lastDate) {
      items.push({ kind: "divider", key: `divider-${msg.id}`, label: msg.date })
      lastDate = msg.date
      dividerShown = true
    }
    if (msg.sender === "system") {
      items.push({ kind: "system", key: msg.id, text: msg.text })
      return
    }
    const prev = messages[i - 1]
    // A tail starts a new group: at the start, on sender change, or right
    // after a date divider or system notice broke the run.
    const showTail = dividerShown || !prev || prev.sender !== msg.sender
    items.push({ kind: "message", key: msg.id, message: msg, showTail })
  })
  return items
}

export const ChatPreview = forwardRef<HTMLDivElement, ChatPreviewProps>(
  function ChatPreview({ messages, config }, ref) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isIPhone = config.phoneType === "iphone"
    const theme = getChatTheme(config.phoneType, config.darkMode)
    const chatBgColor = theme.chatBackground

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
        <StatusBar
          theme={theme}
          phoneType={config.phoneType}
          time={config.statusBarTime}
          batteryLevel={config.batteryLevel}
        />
        <ChatHeader
          contactName={config.contactName}
          contactStatus={config.contactStatus}
          theme={theme}
          phoneType={config.phoneType}
        />

        {/* Chat area */}
        <div
          className="flex-1 overflow-y-auto py-2 relative"
          style={{
            backgroundColor: chatBgColor,
            backgroundImage: config.darkMode
              ? WALLPAPER_PATTERN_DARK
              : WALLPAPER_PATTERN_LIGHT,
          }}
        >
          <div className="flex flex-col gap-[1px] pt-1">
            {buildRenderItems(messages).map((item) => {
              if (item.kind === "divider") {
                return (
                  <CenterPill key={item.key} theme={theme}>
                    {item.label}
                  </CenterPill>
                )
              }
              if (item.kind === "system") {
                return (
                  <CenterPill key={item.key} theme={theme} wide>
                    {item.text}
                  </CenterPill>
                )
              }
              return (
                <ChatBubble
                  key={item.key}
                  message={item.message}
                  theme={theme}
                  showTail={item.showTail}
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
              backgroundColor: config.darkMode ? "#1c1c1e" : "#f6f6f6",
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
