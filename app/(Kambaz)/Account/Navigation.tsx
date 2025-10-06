"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";

export default function AccountNavigation() {
  const pathname = usePathname();
  const active = (href: string) => (pathname === href || pathname.startsWith(href + "/"));

  return (
    <div id="wd-account-navigation" style={{ minWidth: 220 }}>

      <ListGroup className="wd list-group fs-5 rounded-0">
        <Link href="/Account/Signin"  className={`list-group-item border-0 ${active("/Account/Signin")  ? "active" : "text-danger"}`}>Signin</Link>
        <Link href="/Account/Signup"  className={`list-group-item border-0 ${active("/Account/Signup")  ? "active" : "text-danger"}`}>Signup</Link>
        <Link href="/Account/Profile" className={`list-group-item border-0 ${active("/Account/Profile") ? "active" : "text-danger"}`}>Profile</Link>
      </ListGroup>
    </div>
  );
}
