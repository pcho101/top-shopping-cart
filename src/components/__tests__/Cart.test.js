import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

const mockCartItems = [
  {
    id: '23',
    thumb: 'a',
    name: 'Everdell',
    price: 24.34,
    quantity: 1
  },
  {
    id: '34',
    thumb: 'b',
    name: 'Ark',
    price: 10.00,
    quantity: 5
  }
]

describe("Cart component", () => {
  it("renders cart page", () => {
    render(
      <BrowserRouter>
        <Cart cartItems={mockCartItems}/>
      </BrowserRouter>
    );
    expect(screen.getAllByTestId("cart-item").length).toBe(2);
    expect(screen.getByRole("heading", { name: /items/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /subtotal/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /taxes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Total/ })).toBeInTheDocument();
  });

  it("renders correct number of items and subtotal", () => {
    render(
      <BrowserRouter>
        <Cart cartItems={mockCartItems}/>
      </BrowserRouter>
    );

    const items = screen.getByRole("heading", { name: /items/i });
    const subtotal = screen.getByTestId("subtotal");
    
    expect(items.textContent).toContain("6");
    expect(subtotal.textContent).toContain("74.34");
  });
})
