import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

describe('Todo component', function () {
  const todo = { id: 1, title: 'testing', description: 'finish testing', priority: 2 };

  test('renders without crashing', function () {
    render(
      <Todo
        title={todo.title}
        description={todo.description}
        priority={todo.priority} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(
      <Todo
        title={todo.title}
        description={todo.description}
        priority={todo.priority} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('contains expected text from todo', function () {
    const { queryByText } = render(
      // const result = render(
      <Todo
        title={todo.title}
        description={todo.description}
        priority={todo.priority} />);

    // debug(queryByText('Priority:'));
    expect(queryByText('testing')).toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).toBeInTheDocument();
    expect(queryByText('finish testing')).toBeInTheDocument();
  });
});
