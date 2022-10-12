import React from "react";
import { render, screen } from "@testing-library/react";
import Shop from "../Shop";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { useHttp } from "../../hooks/http";

jest.mock('../../hooks/http', () => ({
  __esModule: true,
  useHttp: jest.fn()
}))

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
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders filter input field", () => {
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("input has correct values", async () => {
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, 'ab');

    expect(input).toHaveValue('ab');
  });

  it("renders details when hotgames prop specified", () => {
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Shop hotGames={mockHotGames}/>
      </BrowserRouter>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getAllByRole("heading")[1].textContent).toMatch(/everdell/i);
    expect(screen.getAllByRole("heading")[2].textContent).toMatch(/33.24/i);
  });

  it("renders loading games if games are not loaded yet", () => {
    useHttp.mockReturnValue([false, null]);
    render(
      <BrowserRouter>
        <Shop
          hotGames={mockHotGames}
          hotGamesLoading={true}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /loading games/i })).toBeInTheDocument();
  });

  it("renders loading search results when loading from api", () => {
    useHttp.mockReturnValue([true, null]);
    render(
      <MemoryRouter initialEntries={["/shop?search=dune"]}>
        <Shop />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /loading search results/i })).toBeInTheDocument();
  });
})
