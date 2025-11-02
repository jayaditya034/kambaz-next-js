"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <Button
        id="wd-delete-todo-click"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </Button>
      <Button
        id="wd-set-todo-click"
        style={{ marginLeft: 8 }}
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </Button>
      <span style={{ marginLeft: 8 }}>{todo.title}</span>
    </ListGroupItem>
  );
}
