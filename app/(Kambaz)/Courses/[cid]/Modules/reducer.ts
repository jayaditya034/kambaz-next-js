// app/(Kambaz)/Courses/[cid]/Modules/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// ---- Types
type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

export type Module = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
};

type ModulesState = {
  modules: Module[];
};

// ---- Initial state (copied from Database)
const initialState: ModulesState = {
  modules: (db.modules as unknown) as Module[],
};

// ---- Slice
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // payload: { name: string; course: string }
    addModule: (
      state,
      { payload }: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: payload.name,
        course: payload.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },

    // payload: moduleId
    deleteModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },

    // payload: the full, updated module (same _id)
    updateModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },

    // payload: moduleId -> toggles editing on (like the textbook)
    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
