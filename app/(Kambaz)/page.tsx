// app/(Kambaz)/page.tsx
"use client";

import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard/page";

export default function KambazHome() {
  return (
    <div id="wd-kambaz">
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </div>
  );
}
