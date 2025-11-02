"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <Button
        id="wd-add-todo-click"
        onClick={() => {
          if (todo.title.trim().length > 0) {
            dispatch(addTodo({ title: todo.title }));
          }
        }}
      >
        Add
      </Button>

      <Button
        id="wd-update-todo-click"
        style={{ marginLeft: 8 }}
        onClick={() => {
          if (todo.id && todo.title.trim().length > 0) {
            dispatch(updateTodo({ id: todo.id, title: todo.title }));
          }
        }}
      >
        Update
      </Button>

      <FormControl
        value={todo.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(
            setTodo({
              ...(todo.id ? { id: todo.id } : {}),
              title: e.target.value,
            })
          )
        }
        style={{ marginTop: 8 }}
      />
    </ListGroupItem>
  );
}
