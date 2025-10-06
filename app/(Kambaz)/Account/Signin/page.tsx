"use client";

import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: 360 }}>
      <h1 className="mb-3">Signin</h1>

      <FormControl placeholder="username" className="mb-2" defaultValue="Jay" />
      <FormControl placeholder="password" type="password" className="mb-3" defaultValue="3399" />

      <Link href="/Dashboard" id="wd-signin-btn" className="btn btn-primary w-100 mb-2">
        Signin
      </Link>

      <Link href="/Account/Signup" id="wd-signup-link" className="small">
        Signup
      </Link>
    </div>
  );
}
