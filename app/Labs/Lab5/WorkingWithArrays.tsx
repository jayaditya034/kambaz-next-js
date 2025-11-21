"use client";

import { useState, ChangeEvent } from "react";
import FormControl from "react-bootstrap/FormControl";

type WorkingWithArraysProps = {
  httpServer: string;
};

type TodoState = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function WorkingWithArrays({
  httpServer,
}: WorkingWithArraysProps) {
  const API = `${httpServer}/lab5/todos`;

  const [todo, setTodo] = useState<TodoState>({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, id: e.target.value });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, description: e.target.value });
  };

  const handleCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, completed: e.target.checked });
  };


  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* Retrieve whole array */}
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary"
        href={API}
      >
        Get Todos
      </a>
      <hr />

      {/* Retrieve item by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        className="w-50"
        defaultValue={todo.id}
        onChange={handleIdChange}
      />
      <hr />

      {/* Filter by completed=true */}
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      {/* Create new todo */}
      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      {/* Remove todo by ID */}
      <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        id="wd-remove-todo-id"
        className="w-50"
        defaultValue={todo.id}
        onChange={handleIdChange}
      />
      <hr />

      {/* NEW: Update todo title */}
      <h3>Updating an Item in an Array</h3>
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo
      </a>

      <FormControl
        id="wd-update-todo-id"
        className="w-25 float-start me-2"
        defaultValue={todo.id}
        onChange={handleIdChange}
      />
      <FormControl
        id="wd-update-todo-title"
        className="w-50 float-start"
        defaultValue={todo.title}
        onChange={handleTitleChange}
      />
      <br />
      <br />
      <hr />

            <h3>Updating Description and Completed</h3>

      {/* Update description */}
      <a
        id="wd-update-todo-description"
        className="btn btn-primary float-end mb-2"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>

      <FormControl
        id="wd-update-todo-description-input"
        className="w-75 float-start"
        defaultValue={todo.description}
        onChange={handleDescriptionChange}
      />
      <br />
      <br />

      {/* Update completed */}
      <a
        id="wd-update-todo-completed"
        className="btn btn-primary float-end mt-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed
      </a>

      <div className="form-check mt-2">
        <input
          id="wd-update-todo-completed-input"
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={handleCompletedChange}
        />
        <label
          className="form-check-label ms-2"
          htmlFor="wd-update-todo-completed-input"
        >
          Completed
        </label>
      </div>

      <br />
      <hr />
    </div>
  );
}
