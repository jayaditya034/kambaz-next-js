// app/(Kambaz)/Dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  addCourse,
  deleteCourse as deleteCourseAction,
  updateCourse as updateCourseAction,
  setCourses,
  type Course,
} from "../Courses/[cid]/reducer";

import { enroll, unenroll, setEnrollments } from "../Enrollments/reducer";
import * as enrollmentClient from "../Enrollments/client";

import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";

const thumbnails = [
  "/images/react.js.png",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const { enrollments } = useSelector((s: RootState) => s.enrollmentsReducer);

  const [draft, setDraft] = useState<Course>({
    _id: "new",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // false = show ONLY my enrolled courses (default)
  // true  = show ALL courses (enrollment explorer view)
  const [showAll, setShowAll] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const isEnrolled = (cid: string) =>
    !!currentUser &&
    enrollments.some((e) => e.user === currentUser._id && e.course === cid);

  // Courses currently displayed on screen
  const visibleCourses = !currentUser ? [] : courses;

  // Fetch courses whenever user or showAll changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser) {
        dispatch(setCourses([]));
        router.push("/Account/Signin");
        return;
      }

      try {
        // When showAll is true -> ALL courses for everyone
        if (showAll) {
          const allCourses = await courseClient.fetchAllCourses();
          dispatch(setCourses(allCourses));
        } else {
          // When showAll is false -> only "my" courses
          const myCourses = await userClient.findMyCourses();
          dispatch(setCourses(myCourses));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch courses:", err);
        dispatch(setCourses([]));
      }
    };

    void fetchCourses();
  }, [currentUser, showAll, dispatch, router]);

  // Fetch enrollments for the *current* user from the server
  useEffect(() => {
    const loadEnrollments = async () => {
      if (!currentUser) {
        dispatch(setEnrollments([]));
        return;
      }
      try {
        const data = await enrollmentClient.fetchMyEnrollments();
        dispatch(setEnrollments(data));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch enrollments:", err);
      }
    };

    void loadEnrollments();
  }, [currentUser, dispatch]);

  const onAdd = () => {
    const { _id, ...rest } = draft;
    dispatch(addCourse(rest));
  };

  // Delete from server, then Redux
  const onDelete = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      dispatch(deleteCourseAction({ _id: courseId }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete course from server:", err);
    }
  };

  const onUpdate = async () => {
    if (!courses.some((c) => c._id === draft._id)) {
      return;
    }

    try {
      const updated = await courseClient.updateCourse(draft);
      dispatch(updateCourseAction(updated));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to update course on server:", err);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Dashboard</span>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!touched) {
              setTouched(true);
            }
            setShowAll((v) => !v);
          }}
          id="wd-toggle-enrollments"
        >
          {/* When showing ALL courses, button says "Show My Enrollments" */}
          {!touched
            ? "Enrollments"
            : showAll
            ? "Show My Enrollments"
            : "Enrollments"}
        </button>
      </h1>
      <hr />

      <h5>New Course</h5>
      <button
        className="btn btn-primary float-end"
        id="wd-add-new-course-click"
        onClick={onAdd}
      >
        Add
      </button>
      <button
        className="btn btn-warning float-end me-2"
        onClick={onUpdate}
        id="wd-update-course-click"
      >
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
        onChange={(e) =>
          setDraft({ ...draft, description: e.target.value })
        }
      />

      <hr />
      <h2 id="wd-dashboard-published">
        {showAll ? "All Courses" : "My Enrolled Courses"} (
        {visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {visibleCourses.map((course, i) => {
            const img = thumbnails[i % thumbnails.length];
            const enrolled = isEnrolled(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      variant="top"
                      src={img}
                      width="100%"
                      height={160}
                    />
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

                      {currentUser && (
                        <button
                          className={`btn ${
                            enrolled ? "btn-danger" : "btn-success"
                          } ms-2`}
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              if (enrolled) {
                                // Unenroll on server + Redux
                                await enrollmentClient.unenrollFromCourse(
                                  course._id
                                );
                                dispatch(
                                  unenroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                                // If we are in "My Enrolled Courses" view,
                                // remove the course from the visible list.
                                if (!showAll) {
                                  const remaining = courses.filter(
                                    (c) => c._id !== course._id
                                  );
                                  dispatch(setCourses(remaining));
                                }
                              } else {
                                // Enroll on server + Redux
                                await enrollmentClient.enrollInCourse(
                                  course._id
                                );
                                dispatch(
                                  enroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                                // No need to modify courses list here:
                                // - in showAll view the card is already visible
                                // - when we later switch to "My Enrolled Courses",
                                //   useEffect will refetch my courses.
                              }
                            } catch (err) {
                              // eslint-disable-next-line no-console
                              console.error(
                                "Failed to update enrollment:",
                                err
                              );
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
                              void onDelete(course._id);
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
