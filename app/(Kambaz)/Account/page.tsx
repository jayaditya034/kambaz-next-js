// app/(Kambaz)/Account/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // ✅ textbook highlight: default to Signin if no user; Profile if signed in
  useEffect(() => {
    router.replace(currentUser ? "/Account/Profile" : "/Account/Signin");
  }, [currentUser, router]);

  return null; // nothing to render; we redirect
}
