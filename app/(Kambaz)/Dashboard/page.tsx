"use client";

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

const courses = [
  { title: "CS1 React JS",       img: "/images/react.js.png" },
  { title: "CS2 C-Sharp",        img: "/images/CSharp.png" },
  { title: "CS3 CSS3",           img: "/images/css3.jpg" },
  { title: "CS4 Django",         img: "/images/Django.png" },
  { title: "CS5 HTML5",          img: "/images/HTML5.png" },
  { title: "CS6 Java",           img: "/images/Java.png" },
  { title: "CS7 JavaScript",     img: "/images/JavaScript.png" },
  { title: "CS8 Node.js",        img: "/images/Node.js.png" },
  { title: "CS9 PHP",            img: "/images/PHP.png" },
  { title: "CS10 Python",        img: "/images/python.png" },
  { title: "CS11 SQL",           img: "/images/SQL.png" },
  { title: "CS12 TypeScript",    img: "/images/TypeScript.png" },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* xs=1 (phones), md=4 (desktops). Use g-4 for spacing between cards */}
        <Row xs={1} md={4} className="g-4">
          {courses.map((c, i) => (
            <Col key={i} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {/* Per spec: send all to the same course's Home page for now */}
                <Link
                  href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img variant="top" src={c.img} width="100%" height={160} />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.title}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      Full Stack software developer
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
