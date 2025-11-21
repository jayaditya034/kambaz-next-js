// app/(Kambaz)/Account/Signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentUser, type User } from "../reducer";
import * as client from "../client";
import type { Credentials } from "../client";

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();

  // default credentials
  const [credentials, setCredentials] = useState<Credentials>({
    username: "Jay",
    password: "3399",
  });

  const [error, setError] = useState<string | null>(null);

  const onSignin = async () => {
    try {
      const user = (await client.signin(credentials)) as User | null;

      if (user) {
        dispatch(setCurrentUser(user));
        setError(null);
        router.push("/Account/Profile");
      } else {
        dispatch(setCurrentUser(null));
        setError("Invalid username or password.");
      }
    } catch (err: unknown) {
      // keep Redux state consistent
      dispatch(setCurrentUser(null));

      // 🔍 Detailed logging without using `any`
      if (axios.isAxiosError(err)) {
        console.error("Signin failed – Axios error:", {
          message: err.message,
          code: err.code,
          url: err.config?.url,
          status: err.response?.status,
          data: err.response?.data,
        });
      } else {
        console.error("Signin failed – non-Axios error:", err);
      }

      setError("Sign-in failed. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 360 }}>
      <h1 className="mb-3">Signin</h1>

      <FormControl
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        placeholder="password"
        type="password"
        className="mb-3"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
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
