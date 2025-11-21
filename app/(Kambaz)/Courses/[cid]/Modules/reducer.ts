// app/(Kambaz)/Courses/[cid]/Modules/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

// ---- Initial state (now empty; server will populate it)
const initialState: ModulesState = {
  modules: [],
};

// ---- Slice
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // ✅ replace modules list with data from server
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },

    // ✅ now we append the module returned by the server
    addModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = [...state.modules, payload];
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

    // payload: moduleId -> toggles editing on
    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
