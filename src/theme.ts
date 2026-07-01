import type { PhoneType } from "./types"

/**
 * Central theme (skin) tokens for the rendered phone preview.
 *
 * Colors that used to live as inline `darkMode ? ... : ...` ternaries across
 * the preview components are collected here and keyed by phone type + dark
 * mode. Keeping them in one place means new looks (WhatsApp redesigns, extra
 * platforms) become data rather than edits scattered across components.
 *
 * Note: this covers the *device skin* only — the editor/control-panel UI
 * keeps its own styling and is intentionally out of scope.
 */
export type ChatTheme = {
  chatBackground: string
  bubble: {
    sentBackground: string
    receivedBackground: string
    text: string
    timestamp: string
  }
  check: {
    gray: string
    blue: string
  }
  pill: {
    background: string
    text: string
  }
  statusBar: {
    background: string
    text: string
  }
  header: {
    background: string
    text: string
    subtitle: string
    accent: string
    border: string
  }
}

// Tokens that depend only on dark mode (shared across phone types).
function surfaceTokens(darkMode: boolean) {
  return {
    chatBackground: darkMode ? "#0b141a" : "#efeae2",
    bubble: {
      sentBackground: darkMode ? "#005c4b" : "#d9fdd3",
      receivedBackground: darkMode ? "#202c33" : "#ffffff",
      text: darkMode ? "#e9edef" : "#111b21",
      timestamp: darkMode ? "#8696a0" : "#667781",
    },
    check: {
      gray: darkMode ? "#8696a0" : "#667781",
      blue: "#53bdeb",
    },
    pill: {
      background: darkMode ? "#182229" : "#e1f2fb",
      text: darkMode ? "#8696a0" : "#54656f",
    },
  }
}

function iPhoneChrome(darkMode: boolean): Pick<ChatTheme, "statusBar" | "header"> {
  return {
    statusBar: {
      background: darkMode ? "#000000" : "#f6f6f6",
      text: darkMode ? "#ffffff" : "#000000",
    },
    header: {
      background: darkMode ? "#1a1a1e" : "#f6f6f6",
      text: darkMode ? "#ffffff" : "#000000",
      subtitle: "#8e8e93",
      accent: darkMode ? "#0a84ff" : "#007aff",
      border: darkMode ? "#38383a" : "#d1d1d6",
    },
  }
}

function androidChrome(darkMode: boolean): Pick<ChatTheme, "statusBar" | "header"> {
  return {
    statusBar: {
      background: darkMode ? "#1a262d" : "#006b57",
      text: "#ffffff",
    },
    header: {
      background: darkMode ? "#202c33" : "#008069",
      text: "#ffffff",
      subtitle: "rgba(255,255,255,0.7)",
      accent: "#ffffff",
      border: "transparent",
    },
  }
}

export function getChatTheme(
  phoneType: PhoneType,
  darkMode: boolean,
): ChatTheme {
  const chrome =
    phoneType === "iphone" ? iPhoneChrome(darkMode) : androidChrome(darkMode)
  return {
    ...surfaceTokens(darkMode),
    ...chrome,
  }
}
