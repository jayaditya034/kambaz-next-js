// app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaRegCheckCircle, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  deleteAssignment,
  setAssignments,
  type Assignment,
} from "../Assignments/reducer";
import * as assignmentsClient from "./client";

export default function AssignmentsPage() {
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();
  const base = `/Courses/${cid}/Assignments`;

  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (s: RootState) => s.accountReducer
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const courseAssignments: Assignment[] = assignments.filter(
    (a) => a.course === cid
  );

  // load assignments from server when cid changes
  useEffect(() => {
    if (!cid) return;
    const load = async () => {
      const data = await assignmentsClient.findAssignmentsForCourse(
        cid as string
      );
      dispatch(setAssignments(data));
    };
    void load();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    const ok = window.confirm("Delete this assignment?");
    if (!ok) return;
    await assignmentsClient.deleteAssignmentOnServer(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments" className="mt-2">
      {/* Top bar */}
      <div className="clearfix mb-3">
        <div className="float-start" style={{ maxWidth: 420 }}>
          <InputGroup size="lg">
            <InputGroup.Text>
              <BiSearch />
            </InputGroup.Text>
            <FormControl placeholder="Search..." id="wd-search-assignment" />
          </InputGroup>
        </div>
        <div className="float-end">
          <Button variant="secondary" className="me-2 text-nowrap" disabled>
            <FaPlus className="me-2" /> Group
          </Button>

          {isFaculty && (
            <Button
              variant="danger"
              className="text-nowrap"
              id="wd-add-assignment"
              onClick={() => router.push(`${base}/new`)}
            >
              <FaPlus className="me-2" /> Assignment
            </Button>
          )}
        </div>
      </div>

      {/* Group header */}
      <div className="d-flex align-items-center justify-content-between border rounded px-3 py-2 bg-white">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 text-muted" />
          <h5 className="m-0">ASSIGNMENTS</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="light" text="dark" pill>
            40% of Total
          </Badge>
          <Button size="sm" variant="light" className="px-2" disabled>
            +
          </Button>
          <Button size="sm" variant="light" className="px-2">
            <IoEllipsisVertical />
          </Button>
        </div>
      </div>

      {/* Rows */}
      <ListGroup className="rounded-0 mt-2">
        {courseAssignments.map((a, index) => (
          <ListGroup.Item
            key={a._id || `assignment-${index}`} // ✅ unique key even if _id is ""
            className="p-3 ps-1 wd-assignment-row"
          >
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 text-muted flex-shrink-0" />
              <div className="flex-fill">
                <Link
                  href={`${base}/${a._id}`}
                  className="fw-semibold text-decoration-none"
                >
                  {a.title}
                </Link>
                <div className="small mt-1">
                  <span className="text-success me-3">Multiple Modules</span>
                  <span className="text-muted">
                    {a.available ?? "Available now"}
                  </span>
                  <span className="mx-2 text-muted">|</span>
                  <span className="text-muted">Due {a.due ?? "TBD"}</span>
                  <span className="mx-2 text-muted">|</span>
                  <span className="text-muted">{a.points ?? 100} pts</span>
                </div>
              </div>

              <FaRegCheckCircle className="text-success fs-5 mx-2 flex-shrink-0" />
              {isFaculty && (
                <Button
                  variant="link"
                  className="text-danger p-0 ms-2 flex-shrink-0"
                  title="Delete"
                  onClick={() => handleDelete(a._id)}
                >
                  <FaTrash />
                </Button>
              )}
              <IoEllipsisVertical className="fs-4 flex-shrink-0" />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
