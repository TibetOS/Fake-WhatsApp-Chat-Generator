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
