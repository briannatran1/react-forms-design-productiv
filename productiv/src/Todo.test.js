import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

describe('Todo component', function () {
  const todo = { id: 1, title: 'testing', description: 'finish testing', priority: 2 };

  test('renders without crashing', function () {
    render(<Todo todo={todo} />);
  });

  test('contains expected text from todo', function () {
    const { queryByText, debug, container, getByText } = render(
      <Todo
        title={todo.title}
        description={todo.description}
        priority={todo.priority} />);

    debug(queryByText('Priority: 2'));
    expect(getByText('testing')).toBeInTheDocument();
    expect(getByText('Priority: 2')).toBeInTheDocument();
    expect(getByText('finish testing')).toBeInTheDocument();
  });
});
