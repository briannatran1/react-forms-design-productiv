import React from "react";
import { render, fireEvent, getByPlaceholderText } from "@testing-library/react";
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

  test("renders without crashing", function () {
    render(<TodoApp initialTodos={todos} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(
      <TodoApp initialTodos={todos} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows no todos properly', function () {
    const { queryByText } = render(<TodoApp />);

    expect(queryByText('You have no todos.')).toBeInTheDocument();
    expect(queryByText('Top Todo')).not.toBeInTheDocument();
  });

  test('shows todos', function () {
    const { queryByText, queryAllByText } = render(<TodoApp initialTodos={todos} />);

    expect(queryByText('testing')).toBeInTheDocument();
    expect(queryByText('finish testing')).toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).toBeInTheDocument();

    expect(queryAllByText('eat')[0]).toBeInTheDocument();
    expect(queryAllByText('eat lunch')[0]).toBeInTheDocument();
    expect(queryAllByText('(Priority: 1)')[0]).toBeInTheDocument();
  });

  test('shows titles', function () {
    const { queryByText } = render(<TodoApp initialTodos={todos} />);

    expect(queryByText('Todos')).toBeInTheDocument();
    expect(queryByText('Top Todo')).toBeInTheDocument();
    expect(queryByText('Add Nü')).toBeInTheDocument();
  });

  test('creates new todo using form', function () {
    const { getByLabelText, queryByText, getByPlaceholderText } = render(<TodoApp initialTodos={todos} />);

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const priorityInput = getByLabelText('Priority:');
    const goBtn = queryByText('Gø!');

    fireEvent.change(titleInput, { target: { value: 'test2' } });
    fireEvent.change(descriptionInput, { target: { value: 'testing2' } });
    fireEvent.change(priorityInput, { target: { value: 3 } });
    fireEvent.click(goBtn);

    expect(queryByText('test2')).toBeInTheDocument();
    expect(queryByText('testing2')).toBeInTheDocument();
    expect(queryByText('(Priority: 3)')).toBeInTheDocument();

  });

  test('updates todo', function () {
    const { queryByText, queryByDisplayValue, queryAllByText, getByLabelText } = render(
      <TodoApp initialTodos={todos} />);

    const editBtn = queryAllByText('Edit')[0];

    fireEvent.click(editBtn);

    const titleInput = queryByDisplayValue('testing');
    const descriptionInput = queryByDisplayValue('finish testing');
    const priorityInput = getByLabelText('Priority:');
    const goBtn = queryAllByText('Gø!')[0];

    fireEvent.change(titleInput, { target: { value: 'test2' } });
    fireEvent.change(descriptionInput, { target: { value: 'testing2' } });
    fireEvent.change(priorityInput, { target: { value: 3 } });
    fireEvent.click(goBtn);

    expect(queryByText('test2')).toBeInTheDocument();
    expect(queryByText('testing2')).toBeInTheDocument();
    expect(queryByText('(Priority: 3)')).toBeInTheDocument();

  });

  test('deletes todo', function () {
    const { queryByText, queryAllByText } = render(
      <TodoApp initialTodos={todos} />);

    const deleteBtn = queryAllByText('Del')[0];

    fireEvent.click(deleteBtn);

    expect(queryByText('testing')).not.toBeInTheDocument();
    expect(queryByText('finish testing')).not.toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).not.toBeInTheDocument();
  });

});