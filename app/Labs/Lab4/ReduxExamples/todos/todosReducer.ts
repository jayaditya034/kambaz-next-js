import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: string; title: string };

type TodosState = {
  todos: Todo[];
  // In the form, `todo` may not have an id yet (when creating a new one)
  todo: { id?: string; title: string };
};

const initialState: TodosState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { title: "Learn Mongo" },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      const newTodo: Todo = {
        id: new Date().getTime().toString(),
        title: action.payload.title,
      };
      state.todos = [...state.todos, newTodo];
      state.todo = { title: "" };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.todo = { title: "" };
    },
    // 👇 allow optional id while editing in the form
    setTodo: (state, action: PayloadAction<{ id?: string; title: string }>) => {
      state.todo = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;
