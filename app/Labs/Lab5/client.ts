// app/Labs/Lab5/client.ts
import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";

// ---------- Shared types ----------

export type Assignment = {
  title: string;
  description: string;
  due: string;
  completed: boolean;
};

export type Todo = {
  id: number | string;
  title: string;
  completed: boolean;
};

export type NewTodoInput = Pick<Todo, "title" | "completed">;
export type TodoUpdateInput = Pick<Todo, "id" | "title" | "completed">;

// ---------- Welcome message ----------

export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data as string;
};

// ---------- Assignment APIs ----------

const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = async (): Promise<Assignment> => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data as Assignment;
};

export const updateTitle = async (title: string): Promise<Assignment> => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data as Assignment;
};

// ---------- Todos APIs ----------

const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(TODOS_API);
  return response.data as Todo[];
};

// old GET-based remove (uses /:id/delete, returns array)
export const removeTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data as Todo[];
};

// old GET-based create (returns full array)
export const createNewTodo = async (): Promise<Todo[]> => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data as Todo[];
};

// POST-based create (returns just the new todo)
export const postNewTodo = async (
  todo: NewTodoInput
): Promise<Todo> => {
  const response = await axios.post(TODOS_API, todo);
  return response.data as Todo;
};

// DELETE-based remove (no response body)
export const deleteTodo = async (todo: Todo): Promise<void> => {
  await axios.delete(`${TODOS_API}/${todo.id}`);
};

// PUT-based update – send updated todo, expect only status
export const updateTodo = async (
  todo: TodoUpdateInput
): Promise<void> => {
  await axios.put(`${TODOS_API}/${todo.id}`, todo);
};
