// app/(Kambaz)/Dashboard/page.tsx
"use client";

import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, Button } from "react-bootstrap";

// ---- Add a type for your course objects
type Course = {
  _id: string;
  name: string;
  description: string;
  // keep it minimal; add more fields if you later need them:
  // number?: string; startDate?: string; endDate?: string; department?: string; credits?: number;
};

// Keep your custom thumbnails here
const thumbnails = [
  "/images/react.js.png",
  "/images/CSharp.png",
  "/images/css3.jpg",
  "/images/Django.png",
  "/images/HTML5.png",
  "/images/Java.png",
  "/images/JavaScript.png",
  "/images/Node.js.png",
  "/images/PHP.png",
  "/images/python.png",
  "/images/SQL.png",
  "/images/TypeScript.png",
];

// Use a typed array instead of `any`
const courses: Course[] = db.courses as Course[];

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
          {courses.map((course, i) => {
            const img = thumbnails[i % thumbnails.length];
            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img variant="top" src={img} width="100%" height={160} />
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
