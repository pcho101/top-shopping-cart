import React from "react";
import { act, render, screen } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { useHttp } from "../../hooks/http";

jest.mock('../../hooks/http', () => ({
  __esModule: true,
  useHttp: jest.fn()
}))

describe("Home component", () => {
  it("renders correct heading", () => {
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /featured/i })).toBeInTheDocument();
  });

  it("shows loading when waiting for api", () => {
    useHttp.mockReturnValue([true, null]);
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /loading/i })).toBeInTheDocument();
  })

  it("can click button to switch between play and pause", async () => {
    useHttp.mockReturnValue([false, null]);
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
    useHttp.mockReturnValue([false, null]);
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

  it("clicking pause stops timer, re-clicking restarts timer", async () => {
    jest.useFakeTimers();
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    const user = userEvent.setup({delay: null});
    const button = screen.getByRole("button");

    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-1/i);

    await user.click(button);
    act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-1/i);

    await user.click(button);
    act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByRole("radio", { checked: true }).id).toMatch(/item-2/i);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
})
