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
          id="wd-lab1-link"
          eventKey="/Labs"
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
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/"
          id="wd-lab3-link"
          eventKey="/"
        >
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
