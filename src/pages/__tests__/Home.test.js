import React from "react";
import { act, render, screen } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

jest.mock('../../hooks/http', () => ({
  __esModule: true,
  useHttp: () => ([false, null])
}))

describe("Home component", () => {
  it("renders correct heading", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /featured/i })).toBeInTheDocument();
  });

  it("can click button to switch between play and pause", async () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button");

    expect(button.textContent).toMatch(/pause/i);

    await user.click(button);

    expect(button.textContent).toMatch(/play/i);
  });

  it("timer changes radio button after 5 seconds", async () => {
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    
    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-1/i);

    act(() => jest.advanceTimersByTime(5000));

    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-2/i);

    act(() => jest.advanceTimersByTime(5000));

    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-3/i);

    act(() => jest.advanceTimersByTime(5000));

    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-1/i);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
})
