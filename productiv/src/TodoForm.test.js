import React from "react";
import { render, fireEvent, queryByDisplayValue } from "@testing-library/react";
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
    const { queryByPlaceholderText, getByLabelText, queryByText } = render(
      <TodoForm handleSave={{}} />);

    expect(queryByPlaceholderText('Title')).toBeInTheDocument();
    expect(queryByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByLabelText('Priority:')).toBeInTheDocument();
    expect(queryByText('Gø!')).toBeInTheDocument();

    let options = getByLabelText('Priority:');
    expect(options.length).toEqual(3);
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toBeInTheDocument();
    expect(options[2]).toBeInTheDocument();
    expect(options[0].text).toEqual("Ultra-Über");
  });

  test('edit form - makes sure data is there', function () {
    const { queryByDisplayValue, getByLabelText, queryByText } = render(
      <TodoForm
        handleSave={{}}
        initialFormData={{ title: 'test', description: 'testing', priority: 1 }}
        />);

        expect(queryByDisplayValue('test')).toBeInTheDocument();
        expect(queryByDisplayValue('testing')).toBeInTheDocument();
        expect(getByLabelText('Priority:')).toBeInTheDocument();
        expect(queryByText('Gø!')).toBeInTheDocument();
  });
});