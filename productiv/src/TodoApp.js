import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp(initialTodos = []) {
  const [todos, setTodos] = useState([initialTodos]);

  /** add a new todo to list */
  function create(newTodo) {
    let todo = { ...newTodo, id: uuid() };
    setTodos(todos => [...todos, todo]);
  }

  /** update a todo with updatedTodo */
  //FIXME: 95% confident this works
  function update(updatedTodo) {
    setTodos(todos => todos.map(
      t => t.id !== updatedTodo.id ? t : updatedTodo)
    );
  }

  /** delete a todo by id */
  function remove(id) {
    setTodos(todos => todos.filter(t => t.id !== id))
  }

  return (
    <main className="TodoApp">
      <div className="row">

        <div className="col-md-6">
          {todos.length !== 0
          ? <EditableTodoList
              todos={todos}
              update={update}
              remove={remove}/>
          : <span className="text-muted">You have no todos.</span>}
        </div>

        <div className="col-md-6">
          {/* if no top todo, omit this whole section */}
          {todos.length !== 0 &&
          <section className="mb-4">
            <h3>Top Todo</h3>
            <TopTodo todos={todos}/>
          </section>}

          <section>
            <h3 className="mb-3">Add Nü</h3>
            <TodoForm handleSave={create}/>
          </section>
        </div>

      </div>
    </main>
  );
}

export default TodoApp;