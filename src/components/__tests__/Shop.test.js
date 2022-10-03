import React from "react";
import { render, screen } from "@testing-library/react";
import Shop from "../Shop";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const mockHotGames = [
  {
    id: "332398",
    price: 33.24,
    name: "Everdell: The Complete Collection",
    thumb: "https://cf.geekdo-images.com/AkYQwEPr0fq_summgnx4wA__thumb/img/K_2DTzS-XA-QePfSVNcyBVGZMoQ=/fit-in/200x150/filters:strip_icc()/pic6010050.png"
  }
]

describe("Shop component", () => {
  it("renders heading", () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders filter input field", () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("input has correct values", () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    const input = screen.getByRole("textbox");
    userEvent.type(input, 'ab');

    expect(input).toHaveValue('ab');
  });

  it("renders details when hotgames prop specified", () => {
    render(
      <BrowserRouter>
        <Shop hotGames={mockHotGames}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getAllByRole("heading")[1].textContent).toMatch(/everdell/i);
    expect(screen.getAllByRole("heading")[2].textContent).toMatch(/33.24/i);
  });
})
