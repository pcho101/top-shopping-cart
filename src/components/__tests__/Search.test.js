import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../Search";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

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
})
