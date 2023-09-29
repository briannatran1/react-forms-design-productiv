import React from "react";
import { render } from "@testing-library/react";
import TopTodo from "./TopTodo";

describe('TopTodo component', function () {
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
    render(<TopTodo todos={todos} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(<TopTodo todos={todos} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('contains only highest priority todo', function () {
    const { queryByText, container } = render(<TopTodo todos={todos} />);

    expect(queryByText('eat')).toBeInTheDocument();
    expect(queryByText('(Priority: 1)')).toBeInTheDocument();
    expect(queryByText('eat lunch')).toBeInTheDocument();

    expect(container.querySelectorAll('.Todo').length).toEqual(1);

    expect(queryByText('testing')).not.toBeInTheDocument();
    expect(queryByText('finish testing')).not.toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).not.toBeInTheDocument();
  });
});