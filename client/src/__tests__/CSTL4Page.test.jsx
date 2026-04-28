import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock useNavigate from react-router-dom so tests can assert navigation attempts.
// Keep other react-router-dom exports intact by delegating to the real module.
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Import the page under test after mocking react-router-dom
import CSTL4Page from "../../pages/CSTL4Page";

describe("CSTL4Page (AC1 & AC2)", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders header, hero heading, and primary CTA (accessibility checks)", () => {
    const { container } = render(<CSTL4Page />);

    // Header presence (semantic landmark)
    const banner = screen.queryByRole("banner");
    expect(banner).toBeInTheDocument();

    // Hero heading: prefer top-level heading (h1). If not present, assert at least one visible heading exists.
    const h1 = screen.queryByRole("heading", { level: 1 });
    if (h1) {
      expect(h1).toBeVisible();
      expect(h1.textContent).toBeTruthy();
    } else {
      // fallback: any heading
      const anyHeading = screen.getAllByRole("heading")[0];
      expect(anyHeading).toBeVisible();
      expect(anyHeading.textContent).toBeTruthy();
    }

    // Primary CTA: attempt to find an obvious labelled CTA first, otherwise pick the first button/link
    const ctaRegex = /get started|learn more|join|sign up|cta/i;
    let cta = null;
    try {
      cta = screen.getByRole("button", { name: ctaRegex });
    } catch (err) {
      // ignore
    }
    if (!cta) {
      try {
        cta = screen.getByRole("link", { name: ctaRegex });
      } catch (err) {
        // ignore
      }
    }
    if (!cta) {
      const buttons = screen.queryAllByRole("button");
      if (buttons && buttons.length) cta = buttons[0];
    }
    if (!cta) {
      const links = screen.queryAllByRole("link");
      if (links && links.length) cta = links[0];
    }

    expect(cta).toBeInTheDocument();
    expect(cta).toBeVisible();

    // Basic snapshot for desktop DOM structure
    expect(container).toMatchSnapshot();
  });

  test("clicking primary CTA triggers navigation (useNavigate called)", () => {
    render(<CSTL4Page />);

    // Reuse the same CTA-finding strategy as above
    const ctaRegex = /get started|learn more|join|sign up|cta/i;
    let cta = null;
    try {
      cta = screen.getByRole("button", { name: ctaRegex });
    } catch (err) {
      // ignore
    }
    if (!cta) {
      try {
        cta = screen.getByRole("link", { name: ctaRegex });
      } catch (err) {
        // ignore
      }
    }
    if (!cta) {
      const buttons = screen.queryAllByRole("button");
      if (buttons && buttons.length) cta = buttons[0];
    }
    if (!cta) {
      const links = screen.queryAllByRole("link");
      if (links && links.length) cta = links[0];
    }

    expect(cta).toBeInTheDocument();

    // Simulate user click
    fireEvent.click(cta);

    // Assert navigation attempted via useNavigate
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});