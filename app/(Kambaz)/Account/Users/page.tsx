// app/(Kambaz)/Account/Users/page.tsx
import { Suspense } from "react";
import UsersClient from "./UsersClient";

// NOTE: no "use client" here – this is a server component
export default function UsersPage() {
  return (
    <Suspense fallback={null}>
      <UsersClient />
    </Suspense>
  );
}
