import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../Search";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe("Search component", () => {
  it("renders search form", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("submits form with enter", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "test");
    await user.type(input, "{enter}");
  
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/shop",
      search: "?search=test"
    })
  });
  
  it("submits form with click", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, "test");
    await user.click(button);
  
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/shop",
      search: "?search=test"
    })
  });
  
  it("does nothing when submitting empty form", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    
    await user.click(button);
  
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
})
