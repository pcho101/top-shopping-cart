import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

describe("Home component", () => {
  it("renders correct heading", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("can click button to switch between play and pause", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );
    const button = screen.getByRole("button");

    expect(button.textContent).toMatch(/pause/i);
    userEvent.click(button);
    expect(button.textContent).toMatch(/play/i);
  });

  it("renders no images", () => {
    render(
      <BrowserRouter>
        <Home hotGames={[]}/>
      </BrowserRouter>
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
})
