import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { App } from "./App"

describe("App", () => {
  it("renders the app title", () => {
    render(<App />)
    expect(
      screen.getByText("Fake WhatsApp Chat Generator"),
    ).toBeInTheDocument()
  })

  it("renders sample messages", () => {
    render(<App />)
    expect(screen.getAllByText(/Hey! How are you/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sounds perfect/).length).toBeGreaterThan(0)
  })

  it("switches between iPhone and Android layouts", () => {
    render(<App />)
    const iphoneBtns = screen.getAllByRole("button", { name: "iPhone" })
    const androidBtns = screen.getAllByRole("button", { name: "Android" })

    fireEvent.click(iphoneBtns[0])
    expect(screen.getByText("9:41")).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()

    fireEvent.click(androidBtns[0])
    expect(screen.queryByText("Back")).not.toBeInTheDocument()
  })

  it("adds a new message", () => {
    render(<App />)
    const textarea = screen.getAllByPlaceholderText("Type your message...")[0]
    const addBtns = screen.getAllByRole("button", { name: "Add Message" })

    fireEvent.change(textarea, { target: { value: "Test message 123" } })
    fireEvent.click(addBtns[0])

    expect(screen.getAllByText("Test message 123").length).toBeGreaterThan(0)
  })

  it("deletes a message", () => {
    render(<App />)
    const deleteButtons = screen.getAllByTitle("Delete")
    const initialCount = deleteButtons.length

    fireEvent.click(deleteButtons[0])

    expect(screen.getAllByTitle("Delete")).toHaveLength(initialCount - 1)
  })

  it("toggles dark mode", () => {
    render(<App />)
    const checkboxes = screen.getAllByRole("checkbox")
    const darkModeCheckbox = checkboxes[0]
    expect(darkModeCheckbox).not.toBeChecked()
    fireEvent.click(darkModeCheckbox)
    expect(darkModeCheckbox).toBeChecked()
  })
})

describe("device chrome (deterministic)", () => {
  it("renders a fixed default status-bar time instead of the live clock", () => {
    // Android is the default layout; the status bar must show the configured
    // default ("9:41"), not the current wall-clock time, so exports reproduce.
    render(<App />)
    expect(screen.getByText("9:41")).toBeInTheDocument()
  })

  it("updates the previewed status-bar time from the control input", () => {
    render(<App />)
    const timeInput = screen.getByPlaceholderText("9:41")

    fireEvent.change(timeInput, { target: { value: "3:30" } })

    expect(screen.getByText("3:30")).toBeInTheDocument()
    expect(screen.queryByText("9:41")).not.toBeInTheDocument()
  })

  it("updates the battery level from the slider", () => {
    render(<App />)
    const slider = screen.getByRole("slider")
    expect(slider).toHaveValue("100")

    fireEvent.change(slider, { target: { value: "42" } })

    expect(slider).toHaveValue("42")
    // Label reflects the level (text is split across nodes, so match loosely).
    expect(screen.getByText(/Battery \(42%\)/)).toBeInTheDocument()
  })
})

describe("date separators & system messages", () => {
  it("renders the default end-to-end encryption system notice", () => {
    render(<App />)
    expect(
      screen.getAllByText(/end-to-end encrypted/i).length,
    ).toBeGreaterThan(0)
  })

  it("renders a date separator pill from a message's date label", () => {
    render(<App />)
    // The seeded encryption notice carries date "Today", so a pill shows.
    expect(screen.getAllByText("Today").length).toBeGreaterThan(0)
  })

  it("hides time and status controls when composing a system message", () => {
    render(<App />)
    expect(screen.getByText("Time")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "System" }))

    expect(screen.queryByText("Time")).not.toBeInTheDocument()
    expect(screen.queryByText("Status")).not.toBeInTheDocument()
  })

  it("adds a system message that appears in the preview", () => {
    render(<App />)
    fireEvent.click(screen.getByRole("button", { name: "System" }))

    const textarea = screen.getByPlaceholderText("Type your message...")
    fireEvent.change(textarea, {
      target: { value: "Missed voice call" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Add Message" }))

    expect(screen.getAllByText("Missed voice call").length).toBeGreaterThan(0)
  })

  it("falls back to a default time when a system message is edited into a regular one", () => {
    render(<App />)
    // The first message is the seeded system encryption notice (empty time).
    fireEvent.click(screen.getAllByTitle("Edit")[0])
    fireEvent.click(screen.getByRole("button", { name: "Me (Sent)" }))
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }))

    // It should render with the fallback time rather than an empty timestamp.
    expect(screen.getAllByText("10:30").length).toBeGreaterThan(0)
  })

  it("adds a date separator label via the compose form", () => {
    render(<App />)
    const dateInput = screen.getByPlaceholderText(
      "e.g. Today, Yesterday, 12 May 2024",
    )
    fireEvent.change(dateInput, { target: { value: "Yesterday" } })

    const textarea = screen.getByPlaceholderText("Type your message...")
    fireEvent.change(textarea, { target: { value: "A new day" } })
    fireEvent.click(screen.getByRole("button", { name: "Add Message" }))

    expect(screen.getAllByText("Yesterday").length).toBeGreaterThan(0)
  })
})

describe("reactions & replies", () => {
  it("adds a message with emoji reactions that render on the bubble", () => {
    render(<App />)
    fireEvent.change(screen.getByPlaceholderText("👍 ❤️ 😂"), {
      target: { value: "👍❤️" },
    })
    fireEvent.change(screen.getByPlaceholderText("Type your message..."), {
      target: { value: "React to this" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Add Message" }))

    expect(screen.getByText("👍❤️")).toBeInTheDocument()
  })

  it("adds a reply that renders the quoted message inside the bubble", () => {
    render(<App />)
    // Default sender is the contact, so the only combobox is "Reply to".
    const replySelect = screen.getByRole("combobox")
    const options = replySelect.querySelectorAll("option")
    // options[0] is "None"; options[1] is the first quotable message.
    fireEvent.change(replySelect, { target: { value: options[1].value } })

    fireEvent.change(screen.getByPlaceholderText("Type your message..."), {
      target: { value: "Replying!" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Add Message" }))

    // The quoted text now appears twice: original bubble + quote block.
    expect(screen.getAllByText(/Hey! How are you/).length).toBeGreaterThan(1)
    expect(screen.getAllByText("Replying!").length).toBeGreaterThan(0)
  })

  it("hides reply and reaction controls for system messages", () => {
    render(<App />)
    expect(screen.getByPlaceholderText("👍 ❤️ 😂")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "System" }))

    expect(screen.queryByPlaceholderText("👍 ❤️ 😂")).not.toBeInTheDocument()
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
  })
})
