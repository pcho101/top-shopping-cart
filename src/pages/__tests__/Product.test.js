import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "../Product";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock('../../hooks/http', () => ({
  __esModule: true,
  useHttp: () => ([false, null])
}))

jest.mock('../../helpers/parseApiData', () => ({
  __esModule: true,
  default: () => ({
    id: '23',
    name: 'Everdell',
    thumb: 'a',
    image: 'b',
    desc: 'some text',
    price: 24.34
  })
}))

describe("Product component", () => {
  // it("renders product page", () => {
  //   render(
  //     <BrowserRouter>
  //       <Product />
  //     </BrowserRouter>
  //   );
  //   expect(screen.getByRole("heading").textContent).toMatch(/Product loading/i)
  // });

  it("renders product info", () => {
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    expect(screen.getAllByRole("heading")[0].textContent).toMatch(/everdell/i)
  });
})
