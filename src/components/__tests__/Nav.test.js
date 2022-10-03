import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

const mockCartItems = [
  { quantity: 1 },
  { quantity: 5 }
]

describe("Nav component", () => {
  it("renders heading", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders nav items", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  it("span has correct number of items", () => {
    render(
      <BrowserRouter>
        <Nav cartItems={mockCartItems}/>
      </BrowserRouter>
    );
    expect(screen.getByTestId("cart-count").textContent).toBe('6');
  });
})
