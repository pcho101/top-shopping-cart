import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const mockToggleCart = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

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

  it("renders browse shop button for empty cart", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={[]}
          toggleCart={mockToggleCart}
        />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", { name: /browse shop/i });

    expect(button).toBeInTheDocument();
  });

  it("navigates to shop when clicking browse shop", async () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={[]}
          toggleCart={mockToggleCart}
        />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /browse shop/i });

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/shop")
  });

  it("navigates to product when clicking image", async () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={mockCartItems}
          toggleCart={mockToggleCart}
        />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const img = screen.getAllByRole("img")[0];
    
    await user.click(img);

    expect(mockNavigate).toHaveBeenCalledWith("/product/23")
  });
})
