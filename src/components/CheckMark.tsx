import type { MessageStatus } from "../types"

type CheckMarkProps = {
  status: MessageStatus
  darkMode: boolean
}

export function CheckMark({ status, darkMode }: CheckMarkProps) {
  const grayColor = darkMode ? "#8696a0" : "#667781"
  const blueColor = "#53bdeb"
  const color = status === "read" ? blueColor : grayColor

  if (status === "sent") {
    return (
      <svg viewBox="0 0 16 11" width="16" height="11" fill="none">
        <path
          d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.36-.186.465.465 0 0 0-.344.156.38.38 0 0 0-.117.3c.005.11.052.213.13.293l2.32 2.42a.475.475 0 0 0 .36.177.508.508 0 0 0 .394-.195l6.555-8.09a.387.387 0 0 0 .063-.12.4.4 0 0 0-.115-.372z"
          fill={grayColor}
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 16 11" width="16" height="11" fill="none">
      <path
        d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.36-.186.465.465 0 0 0-.344.156.38.38 0 0 0-.117.3c.005.11.052.213.13.293l2.32 2.42a.475.475 0 0 0 .36.177.508.508 0 0 0 .394-.195l6.555-8.09a.387.387 0 0 0 .063-.12.4.4 0 0 0-.115-.372z"
        fill={color}
      />
      <path
        d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.25-.36.444 1.247 1.3a.475.475 0 0 0 .36.177.508.508 0 0 0 .394-.195l6.555-8.09a.387.387 0 0 0 .063-.12.4.4 0 0 0-.115-.372z"
        fill={color}
      />
    </svg>
  )
}
