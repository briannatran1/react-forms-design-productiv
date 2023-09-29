import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditableTodo from "./EditableTodo";

describe("EditableTodo", function () {
  const todo = {
    id: 1,
    title: 'testing',
    description: 'finish testing',
    priority: 2
  };


  test('renders without crashing', function () {
    render(<EditableTodo todo={todo} update={{}} remove={{}} />);
  });

  test('matches snapshot', function () {
    const { asFragment } = render(<EditableTodo todo={todo} update={{}} remove={{}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('contains expected elements', function () {
    const { queryByText } = render(
      <EditableTodo
        todo={todo}
        update={{}}
        remove={{}} />);

    expect(queryByText('testing')).toBeInTheDocument();
    expect(queryByText('(Priority: 2)')).toBeInTheDocument();
    expect(queryByText('finish testing')).toBeInTheDocument();
    expect(queryByText('Edit')).toBeInTheDocument();
    expect(queryByText('Del')).toBeInTheDocument();
  });

  test('contains edit form on click', function () {
    const { queryByText } = render(
      <EditableTodo
        todo={todo}
        update={{}}
        remove={{}} />);

    const editButton = queryByText('Edit');
    fireEvent.click(editButton);

    expect(queryByText('Edit')).not.toBeInTheDocument();
    expect(queryByText('Del')).not.toBeInTheDocument();
    expect(queryByText('Gø!')).toBeInTheDocument();
  });

});
