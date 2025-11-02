// app/(Kambaz)/Account/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) return null; // wait while redirecting
  return <>{children}</>;
}
