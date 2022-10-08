import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "../../pages/Product";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Product component", () => {
  it("renders product page", () => {
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading").textContent).toMatch(/Product loading/i)
  });
})
