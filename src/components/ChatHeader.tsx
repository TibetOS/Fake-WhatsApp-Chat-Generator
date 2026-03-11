import type { PhoneType } from "../types"

type ChatHeaderProps = {
  contactName: string
  contactStatus: string
  darkMode: boolean
  phoneType: PhoneType
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center flex-shrink-0">
      <span className="text-[#8696a0] text-sm font-medium">{initials}</span>
    </div>
  )
}

function AndroidHeader({
  contactName,
  contactStatus,
  darkMode,
}: Omit<ChatHeaderProps, "phoneType">) {
  const bgColor = darkMode ? "#202c33" : "#008069"

  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5"
      style={{ backgroundColor: bgColor, minHeight: "52px" }}
    >
      {/* Back arrow */}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
        <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8z" />
      </svg>

      <Avatar name={contactName} />

      <div className="flex-1 min-w-0">
        <p className="text-white text-[16px] font-normal leading-tight truncate">
          {contactName}
        </p>
        {contactStatus && (
          <p className="text-[12px] leading-tight truncate text-white/70">
            {contactStatus}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 mr-1">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  )
}

function IPhoneHeader({
  contactName,
  contactStatus,
  darkMode,
}: Omit<ChatHeaderProps, "phoneType">) {
  const bgColor = darkMode ? "#1a1a1e" : "#ffffff"
  const textColor = darkMode ? "#ffffff" : "#000000"
  const accentColor = darkMode ? "#0a84ff" : "#007aff"
  const subtitleColor = darkMode ? "#8e8e93" : "#8e8e93"
  const borderColor = darkMode ? "#38383a" : "#c6c6c8"

  return (
    <div
      className="flex items-center gap-1 px-2 py-1.5"
      style={{
        backgroundColor: bgColor,
        minHeight: "52px",
        borderBottom: `0.5px solid ${borderColor}`,
      }}
    >
      {/* Back chevron */}
      <div className="flex items-center gap-0.5">
        <svg viewBox="0 0 24 24" width="22" height="22" fill={accentColor}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span className="text-[17px]" style={{ color: accentColor }}>
          Back
        </span>
      </div>

      {/* Center: Avatar + Name + Status */}
      <div className="flex-1 flex flex-col items-center min-w-0">
        <Avatar name={contactName} />
        <p
          className="text-[11px] font-medium leading-tight truncate mt-0.5"
          style={{ color: textColor }}
        >
          {contactName}
        </p>
        {contactStatus && (
          <p
            className="text-[10px] leading-tight truncate"
            style={{ color: subtitleColor }}
          >
            {contactStatus}
          </p>
        )}
      </div>

      {/* Right: Video + Call */}
      <div className="flex items-center gap-5 mr-1">
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
  darkMode,
  phoneType,
}: ChatHeaderProps) {
  const props = { contactName, contactStatus, darkMode }
  if (phoneType === "iphone") {
    return <IPhoneHeader {...props} />
  }
  return <AndroidHeader {...props} />
}
