// app/(Kambaz)/store.ts
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";              // ✅ already added earlier
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer"; // ✅ ADD
import coursesReducer from "./Courses/[cid]/reducer";
import enrollmentsReducer from "./Enrollments/reducer";



const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,                                      // ✅ ADD
    coursesReducer,
    enrollmentsReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
