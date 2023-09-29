import React from "react";
import { render } from "@testing-library/react";
import TodoApp from "./TodoApp";

describe("TodoApp", function () {
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

  test("renders without crashing", function() {
    render(<TodoApp initialTodos={todos}/>)
  })

  test('matches snapshot', function () {
    const { asFragment } = render(
      <TodoApp initialTodos={todos}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows no todos properly', function () {

  })


})