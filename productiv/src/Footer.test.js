import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe('Footer component', function () {
  test('renders without crashing', function () {
    render(<Footer />);
  });

  test('contains expected text', function () {
    const result = render(<Footer />);
    expect(result.queryByText(
      'Prødutïv is copyright ©2020 by Flüffy Data Enterprises, Inc.'))
      .toBeInTheDocument();
  });

  test('matches snapshot', function () {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});