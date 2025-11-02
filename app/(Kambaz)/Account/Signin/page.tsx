// app/(Kambaz)/Account/Signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser, User } from "../reducer";
import * as db from "../../Database";

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState<string>("Jay");
  const [password, setPassword] = useState<string>("3399");
  const [error, setError] = useState<string | null>(null);

  const onSignin = () => {
    const users = db.users as unknown as User[];
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      dispatch(setCurrentUser(found));
      setError(null);
      router.push("/Account/Profile"); // navigate after successful sign-in
    } else {
      dispatch(setCurrentUser(null));
      setError("Invalid username or password.");
    }
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 360 }}>
      <h1 className="mb-3">Signin</h1>

      <FormControl
        placeholder="username"
        className="mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        placeholder="password"
        type="password"
        className="mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={onSignin}>
        Signin
      </Button>

      {error && <div className="text-danger small mb-2">{error}</div>}

      <Link href="/Account/Signup" id="wd-signup-link" className="small">
        Signup
      </Link>
    </div>
  );
}
