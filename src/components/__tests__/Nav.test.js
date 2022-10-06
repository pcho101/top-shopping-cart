import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

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

  it("link has href attribute", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    const home = screen.getAllByRole("link")[0];
    const shop = screen.getAllByRole("link")[1];
  
    expect(home).toHaveAttribute("href", "/")
    expect(shop).toHaveAttribute("href", "/shop")
  });

  it("navigates to correct route", () => {
    const history = createMemoryHistory({
      initialEntries: ["/shop"]
    });
    render(
      <BrowserRouter location={history.location} navigator={history}>
        <Nav />
      </BrowserRouter>
    );

    expect(history.location.pathname).toBe('/shop');
  });

  it("navigates to correct route after clicking", async () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const home = screen.getByRole("link", { name: /home/i });
    const shop = screen.getByRole("link", { name: /shop/i });
    
    expect(window.location.pathname).toBe('/');
    
    await user.click(shop);
    expect(window.location.pathname).toBe('/shop');

    await user.click(home);
    expect(window.location.pathname).toBe('/');
  });
})
