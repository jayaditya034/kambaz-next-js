// app/Labs/Lab5/WorkingWithArraysAsynchronously.tsx
"use client";

import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FormControl from "react-bootstrap/FormControl";
import * as client from "./client";
import type { Todo } from "./client";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import type { AxiosError } from "axios";

type UITodo = Todo & { editing?: boolean };

const extractErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return (
    axiosError.response?.data?.message ?? "Unexpected error occurred"
  );
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<UITodo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizeTodos = (serverTodos: Todo[]): UITodo[] =>
    serverTodos.map((t) => ({ ...t, editing: false }));

  const fetchTodos = async () => {
    const fetchedTodos = await client.fetchTodos();
    setTodos(normalizeTodos(fetchedTodos));
  };

  const removeTodo = async (todo: UITodo) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(normalizeTodos(updatedTodos));
    setErrorMessage(null);
  };

  // GET-based create: server returns whole todos array
  const createNewTodo = async () => {
    const todosFromServer = await client.createNewTodo();
    setTodos(normalizeTodos(todosFromServer));
    setErrorMessage(null);
  };

  // POST-based create: server returns just the new todo
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, { ...newTodo, editing: false }]);
    setErrorMessage(null);
  };

  // DELETE-based remove with error handling
  const deleteTodo = async (todo: UITodo) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    }
  };

  // mark a todo as "editing"
  const editTodo = (todo: UITodo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  // PUT-based update with error handling
  const applyUpdate = async (updated: UITodo) => {
    try {
      await client.updateTodo({
        id: updated.id,
        title: updated.title,
        completed: updated.completed,
      });
      setTodos(
        todos.map((t) => (t.id === updated.id ? { ...updated } : t))
      );
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        {/* GET /lab5/todos/create */}
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        {/* POST /lab5/todos */}
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {/* Pencil icon to start editing */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              id="wd-edit-todo"
            />

            {/* X icon using DELETE */}
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />

            {/* Old trash icon using GET /:id/delete */}
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />

            {/* Completed checkbox with onChange that PUTs update */}
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) =>
                void applyUpdate({
                  ...todo,
                  completed: e.target.checked,
                })
              }
            />

            {/* Title: either editable input or text span */}
            {todo.editing ? (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void applyUpdate({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  void applyUpdate({
                    ...todo,
                    title: e.target.value,
                  })
                }
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.title}
              </span>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
