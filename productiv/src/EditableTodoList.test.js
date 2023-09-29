import React from "react";
import { render } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList";

describe('EditableTodoList', function () {
  const todos = [{
    id: 1,
    title: 'testing',
    description: 'finish testing',
    priority: 2
  },
  {
    id: 2,
    title: 'eat',
    description: 'eat lunch',
    priority: 1
  }
  ];

  test('renders without crashing', function () {
    render(<EditableTodoList todos={todos} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(
      <EditableTodoList todos={todos} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows list of todos', function () {
    const { queryByText, queryAllByText } = render(<EditableTodoList todos={todos} />);

    expect(queryByText('testing')).toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).toBeInTheDocument();
    expect(queryByText('finish testing')).toBeInTheDocument();

    expect(queryByText('eat')).toBeInTheDocument();
    expect(queryByText('(Priority: 1)')).toBeInTheDocument();
    expect(queryByText('eat lunch')).toBeInTheDocument();

    expect(queryAllByText('Edit').length).toEqual(2);
    expect(queryAllByText('Del').length).toEqual(2);
  });
});