// app/(Kambaz)/Dashboard/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addCourse, deleteCourse, updateCourse, type Course } from "../Courses/[cid]/reducer";
import { enroll, unenroll } from "../Enrollments/reducer";

const thumbnails = [
  "/images/react.js.png","/images/CSharp.png","/images/css3.jpg","/images/Django.png",
  "/images/HTML5.png","/images/Java.png","/images/JavaScript.png","/images/Node.js.png",
  "/images/PHP.png","/images/python.png","/images/SQL.png","/images/TypeScript.png",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { courses }     = useSelector((s: RootState) => s.coursesReducer);
  const { enrollments } = useSelector((s: RootState) => s.enrollmentsReducer);

  const [draft, setDraft] = useState<Course>({
    _id: "new",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  // Blue "Enrollments" toggle
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [showAll, setShowAll] = useState<boolean>(isFaculty); // faculty sees all by default
  const [touched, setTouched] = useState<boolean>(false);     // controls initial label

  const isEnrolled = (cid: string) =>
    !!currentUser &&
    enrollments.some((e) => e.user === currentUser._id && e.course === cid);

  // NOTE: no "|| isFaculty" here so faculty can toggle views
  const visibleCourses =
    !currentUser ? [] : (showAll ? courses : courses.filter((c) => isEnrolled(c._id)));

  const onAdd = () => {
    const { _id, ...rest } = draft;
    dispatch(addCourse(rest));
  };
  const onDelete = (courseId: string) => {
    dispatch(deleteCourse({ _id: courseId }));
  };
  const onUpdate = () => {
    if (courses.some((c) => c._id === draft._id)) {
      dispatch(updateCourse(draft));
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between align-items-center">
        <span>Dashboard</span>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!touched) {
              setTouched(true);
              // On first click:
              // - Students: toggle to ALL
              // - Faculty: keep showing ALL (no toggle), only flip the label
              if (!isFaculty) setShowAll((v) => !v);
            } else {
              // After first click, everyone toggles normally
              setShowAll((v) => !v);
            }
          }}
          id="wd-toggle-enrollments"
        >
          {/* First render: always "Enrollments". After that, reflect state. */}
          {!touched ? "Enrollments" : showAll ? "Show My Enrollments" : "Enrollments"}
        </button>
      </h1>
      <hr />

      <h5>New Course</h5>
      <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={onAdd}>
        Add
      </button>
      <button className="btn btn-warning float-end me-2" onClick={onUpdate} id="wd-update-course-click">
        Update
      </button>

      <br />
      <FormControl
        value={draft.name}
        className="mb-2"
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={draft.description}
        rows={3}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      />

      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {visibleCourses.map((course, i) => {
            const img = thumbnails[i % thumbnails.length];
            const enrolled = isEnrolled(course._id);
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
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>

                      <Button variant="primary">Go</Button>

                      {currentUser && (
                        <button
                          className={`btn ${enrolled ? "btn-danger" : "btn-success"} ms-2`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (enrolled) {
                              dispatch(unenroll({ user: currentUser._id, course: course._id }));
                            } else {
                              dispatch(enroll({ user: currentUser._id, course: course._id }));
                            }
                          }}
                          id={enrolled ? "wd-unenroll-btn" : "wd-enroll-btn"}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDelete(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setDraft(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
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
