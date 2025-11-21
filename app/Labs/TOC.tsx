"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills" activeKey={pathname} className="mb-3">
      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs"
          id="wd-labs-home-link"
          eventKey="/Labs"
          className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}
        >
          Home
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs/Lab1"
          id="wd-lab1-link"
          eventKey="/Labs/Lab1"
          className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs/Lab2"
          id="wd-lab2-link"
          eventKey="/Labs/Lab2"
          className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs/Lab3"
          id="wd-lab3-link"
          eventKey="/Labs/Lab3"
          className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs/Lab4"
          id="wd-lab4-link"
          eventKey="/Labs/Lab4"
          className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}
        >
          Lab 4
        </Nav.Link>
      </Nav.Item>

            <Nav.Item>
        <Nav.Link
          as={Link}
          href="/Labs/Lab5"
          id="wd-lab5-link"
          eventKey="/Labs/Lab5"
          className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}
        >
          Lab 5
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/" id="wd-kambaz-link" eventKey="/">
          Kambaz
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi" target="_blank" rel="noreferrer">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
