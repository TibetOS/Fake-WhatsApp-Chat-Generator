import type { PhoneType } from "../types"
import type { ChatTheme } from "../theme"

type ChatHeaderProps = {
  contactName: string
  contactStatus: string
  theme: ChatTheme
  phoneType: PhoneType
}

function Avatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-[#dfe5e7] flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 212 212"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
      >
        <path
          d="M106 3.5C48.4 3.5 2 49.9 2 107.5c0 30.4 13 57.7 33.8 76.7C52.9 168 77.7 157 106 157s53.1 11 70.2 27.2C197 165.2 210 137.9 210 107.5 210 49.9 163.6 3.5 106 3.5z"
          fill="#d0d0d0"
        />
        <path
          d="M106 128c24.3 0 44-19.7 44-44s-19.7-44-44-44-44 19.7-44 44 19.7 44 44 44z"
          fill="#fff"
        />
        <path
          d="M106 157c-28.3 0-53.1 11-70.2 27.2C53.7 200 78.7 211.5 106 211.5s52.3-11.5 70.2-27.3C159.1 168 134.3 157 106 157z"
          fill="#fff"
        />
      </svg>
    </div>
  )
}

function AndroidHeader({
  contactName,
  contactStatus,
  theme,
}: Omit<ChatHeaderProps, "phoneType">) {
  const bgColor = theme.header.background
  const textColor = theme.header.text
  const subtitleColor = theme.header.subtitle
  const iconColor = theme.header.accent

  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5"
      style={{ backgroundColor: bgColor, minHeight: "52px" }}
    >
      {/* Back arrow */}
      <svg viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
        <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8z" />
      </svg>

      <Avatar size={38} />

      <div className="flex-1 min-w-0">
        <p
          className="text-[16px] font-normal leading-tight truncate"
          style={{ color: textColor }}
        >
          {contactName}
        </p>
        {contactStatus && (
          <p
            className="text-[12px] leading-tight truncate"
            style={{ color: subtitleColor }}
          >
            {contactStatus}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 mr-1">
        <svg viewBox="0 0 24 24" width="22" height="22" fill={iconColor}>
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
        <svg viewBox="0 0 24 24" width="22" height="22" fill={iconColor}>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <svg viewBox="0 0 24 24" width="22" height="22" fill={iconColor}>
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  )
}

function IPhoneHeader({
  contactName,
  contactStatus,
  theme,
}: Omit<ChatHeaderProps, "phoneType">) {
  const bgColor = theme.header.background
  const textColor = theme.header.text
  const accentColor = theme.header.accent
  const subtitleColor = theme.header.subtitle
  const borderColor = theme.header.border

  return (
    <div
      className="flex items-center px-1 py-1"
      style={{
        backgroundColor: bgColor,
        minHeight: "56px",
        borderBottom: `0.5px solid ${borderColor}`,
      }}
    >
      {/* Back chevron + label */}
      <div className="flex items-center gap-0 flex-shrink-0">
        <svg viewBox="0 0 24 24" width="28" height="28" fill={accentColor}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span
          className="text-[17px] -ml-1.5"
          style={{ color: accentColor }}
        >
          Back
        </span>
      </div>

      {/* Avatar + Name + Status (left-aligned, like real WhatsApp iOS) */}
      <div className="flex items-center gap-2 flex-1 min-w-0 ml-1">
        <Avatar size={36} />
        <div className="min-w-0">
          <p
            className="text-[16px] font-semibold leading-tight truncate"
            style={{ color: textColor }}
          >
            {contactName}
          </p>
          {contactStatus && (
            <p
              className="text-[12px] leading-tight truncate"
              style={{ color: subtitleColor }}
            >
              {contactStatus}
            </p>
          )}
        </div>
      </div>

      {/* Right: Video + Call */}
      <div className="flex items-center gap-5 mr-3 flex-shrink-0">
        <svg viewBox="0 0 24 24" width="22" height="22" fill={accentColor}>
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
        <svg viewBox="0 0 24 24" width="22" height="22" fill={accentColor}>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </div>
    </div>
  )
}

export function ChatHeader({
  contactName,
  contactStatus,
  theme,
  phoneType,
}: ChatHeaderProps) {
  const props = { contactName, contactStatus, theme }
  if (phoneType === "iphone") {
    return <IPhoneHeader {...props} />
  }
  return <AndroidHeader {...props} />
}
