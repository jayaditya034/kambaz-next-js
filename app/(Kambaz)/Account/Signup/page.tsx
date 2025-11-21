// app/(Kambaz)/Account/Signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser, User } from "../reducer";
import * as client from "../client";
import type { NewUser } from "../client";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState<NewUser>({
    username: "Jay",
    password: "3399",
  });

  const [verifyPassword, setVerifyPassword] = useState<string>("3399");
  const [error, setError] = useState<string | null>(null);

  const signup = async () => {
    if (user.password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const currentUser = (await client.signup(user)) as User;
      dispatch(setCurrentUser(currentUser));
      setError(null);
      router.push("/Account/Profile");
    } catch (e) {
      setError("Signup failed. Username may already be in use.");
    }
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: 360 }}>
      <h1 className="mb-3">Signup</h1>

      <FormControl
        placeholder="username"
        className="mb-2"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
      />
      <FormControl
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />
      <FormControl
        placeholder="verify password"
        type="password"
        className="mb-3"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />

      <Button
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
        onClick={signup}
      >
        Signup
      </Button>

      {error && <div className="text-danger small mb-2">{error}</div>}

      <Link href="/Account/Signin" id="wd-signin-link" className="small">
        Signin
      </Link>
    </div>
  );
}
