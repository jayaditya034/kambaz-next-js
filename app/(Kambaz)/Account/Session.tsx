// app/(Kambaz)/Account/Session.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import type { User } from "./reducer";

type SessionProps = {
  children: ReactNode;
};

export default function Session({ children }: SessionProps) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = (await client.profile()) as User | null;
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    // Optionally show nothing while we check the session
    return null;
  }

  return <>{children}</>;
}
