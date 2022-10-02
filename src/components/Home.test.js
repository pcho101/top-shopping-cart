import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const gameIds = [
  { id: 332398 },
  { id: 296108 },
  { id: 325494 }
]

describe("Home component", () => {
  it("renders correct heading", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(getByRole("heading").textContent).toMatch(/featured games/i);
  });

  it("renders pause button", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(getByRole("button").textContent).toMatch(/pause/i);
  });

  it("renders play after button press", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(screen.getByRole("button").textContent).toMatch(/play/i);
  });

  it("renders no images", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );

    expect(screen.queryAllByRole("img").length).toBe(0);
  });
})
