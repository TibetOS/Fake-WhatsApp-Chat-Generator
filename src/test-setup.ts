import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// Vitest is configured without `globals`, so React Testing Library's
// automatic afterEach cleanup does not register itself. Unmount between
// tests explicitly to keep each render isolated.
afterEach(cleanup)

Element.prototype.scrollIntoView = () => {}
