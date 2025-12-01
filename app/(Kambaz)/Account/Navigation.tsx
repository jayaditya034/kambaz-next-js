// app/(Kambaz)/Account/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type LinkLabel = "Signin" | "Signup" | "Profile" | "Users";

export default function AccountNavigation() {
  const pathname = usePathname();
  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Read currentUser to decide which links to show
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  let links: LinkLabel[];

  if (!currentUser) {
    // Not signed in → Signin & Signup
    links = ["Signin", "Signup"];
  } else if (currentUser.role === "ADMIN") {
    // Admin → Profile + Users
    links = ["Profile", "Users"];
  } else {
    // Signed in, non-admin → Profile only
    links = ["Profile"];
  }

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
