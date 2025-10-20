import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

type Todo = { title: string; status: string; done: boolean };

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {(todos as Todo[]).map((todo, i) => (
          <TodoItem key={i} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </>
  );
}
