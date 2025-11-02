// app/(Kambaz)/Account/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ✅ textbook highlight: read currentUser to decide which links to show
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // ✅ if signed in → only Profile; otherwise → Signin & Signup
  const links: Array<"Signin" | "Signup" | "Profile"> = currentUser
    ? ["Profile"]
    : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" style={{ minWidth: 220 }}>
      <ListGroup className="wd list-group fs-5 rounded-0">
        {links.map((label) => {
          const href = `/Account/${label}`;
          return (
            <Link
              key={label}
              href={href}
              className={`list-group-item border-0 ${
                active(href) ? "active" : "text-danger"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </ListGroup>
    </div>
  );
}
