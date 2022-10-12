import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "../Product";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { useHttp } from "../../hooks/http";
import parseApiData from "../../helpers/parseApiData";

jest.mock('../../hooks/http', () => ({
  __esModule: true,
  useHttp: jest.fn()
}))

jest.mock('../../helpers/parseApiData', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe("Product component", () => {
  it("shows loading when waiting for api", () => {
    useHttp.mockReturnValue([true, null]);
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /loading/i })).toBeInTheDocument();
  })

  it("renders product info", () => {
    useHttp.mockReturnValue([false, null]);
    parseApiData.mockReturnValue({
      id: '23',
      name: 'Everdell',
      thumb: 'a',
      image: 'b',
      desc: 'some text',
      price: 24.34
    })
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    expect(screen.getAllByRole("heading")[0].textContent).toMatch(/everdell/i);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders product not found", () => {
    useHttp.mockReturnValue([false, null]);
    parseApiData.mockReturnValue(null);
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /not found/i })).toBeInTheDocument();
  });
})
