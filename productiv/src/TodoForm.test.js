import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe('TodoForm component', function () {

  test('renders without crashing', function () {
    render(<TodoForm handleSave={{}} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(<TodoForm handleSave={{}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('expect new form to create todo to be shown', function () {
    const { queryByPlaceholderText, getByLabelText, queryByText, queryByDisplayValue } = render(
      <TodoForm handleSave={{}} />);

    expect(queryByPlaceholderText('Title')).toBeInTheDocument();
    expect(queryByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByLabelText('Priority:')).toBeInTheDocument();
    expect(queryByText('Gø!')).toBeInTheDocument();
    expect(queryByDisplayValue('Ultra-Über!')).toBeInTheDocument();
  });

  // test('edit form - makes sure data is there');
});