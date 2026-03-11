import type { PhoneType } from "../types"

type StatusBarProps = {
  darkMode: boolean
  phoneType: PhoneType
}

function SignalBars({ color }: { color: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill={color}>
      <rect x="0" y="9" width="3" height="3" rx="0.5" />
      <rect x="4" y="6" width="3" height="6" rx="0.5" />
      <rect x="8" y="3" width="3" height="9" rx="0.5" />
      <rect x="12" y="0" width="3" height="12" rx="0.5" />
    </svg>
  )
}

function WiFiIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="12" viewBox="0 0 24 24" fill={color}>
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
    </svg>
  )
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill={color}>
      <rect
        x="0"
        y="1"
        width="18"
        height="10"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="2.5" y="3.5" width="13" height="5" rx="1" />
      <rect x="19" y="4" width="2" height="4" rx="0.5" />
    </svg>
  )
}

function IPhoneStatusBar({ darkMode }: { darkMode: boolean }) {
  const textColor = darkMode ? "#ffffff" : "#000000"

  return (
    <div
      className="relative flex items-end justify-between px-6 text-white"
      style={{
        backgroundColor: darkMode ? "#000000" : "#f6f6f6",
        height: "54px",
        fontSize: "15px",
        paddingBottom: "4px",
      }}
    >
      {/* Time - left side */}
      <span className="font-semibold w-16" style={{ color: textColor }}>
        9:41
      </span>

      {/* Dynamic Island */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
        style={{ width: "120px", height: "34px", top: "10px" }}
      />

      {/* Right side icons */}
      <div className="flex items-center gap-1">
        <SignalBars color={textColor} />
        <WiFiIcon color={textColor} />
        <BatteryIcon color={textColor} />
      </div>
    </div>
  )
}

function AndroidStatusBar({ darkMode }: { darkMode: boolean }) {
  const bgColor = darkMode ? "#1a262d" : "#006b57"
  const now = new Date()
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div
      className="flex items-center justify-between px-4 text-white"
      style={{ backgroundColor: bgColor, height: "26px", fontSize: "12px" }}
    >
      <span className="font-medium">{timeStr}</span>
      <div className="flex items-center gap-1">
        <SignalBars color="white" />
        <WiFiIcon color="white" />
        <BatteryIcon color="white" />
      </div>
    </div>
  )
}

export function StatusBar({ darkMode, phoneType }: StatusBarProps) {
  if (phoneType === "iphone") {
    return <IPhoneStatusBar darkMode={darkMode} />
  }
  return <AndroidStatusBar darkMode={darkMode} />
}
