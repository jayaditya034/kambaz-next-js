"use client";

import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: 360 }}>
      <h1 className="mb-3">Signup</h1>

      <FormControl placeholder="username" className="mb-2" defaultValue="Jay" />
      <FormControl placeholder="password" type="password" className="mb-2" defaultValue="3399" />
      <FormControl placeholder="verify password" type="password" className="mb-3" defaultValue="3399" />

      <Link href="/Account/Profile" className="btn btn-primary w-100 mb-2">
        Signup
      </Link>

      <Link href="/Account/Signin" className="small">
        Signin
      </Link>
    </div>
  );
}
