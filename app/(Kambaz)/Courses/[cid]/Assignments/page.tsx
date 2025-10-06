"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const base = `/Courses/${cid}/Assignments`;

  const assignments = [
    { id: "A1", title: "A1 – ENV + HTML", due: "May 13 • 11:59pm", pts: 100, avail: "Not available until May 6 • 12:00am" },
    { id: "A2", title: "A2 – CSS + BOOTSTRAP", due: "May 20 • 11:59pm", pts: 100, avail: "Not available until May 13 • 12:00am" },
    { id: "A3", title: "A3 – JAVASCRIPT + REACT", due: "May 27 • 11:59pm", pts: 100, avail: "Not available until May 20 • 12:00am" },
  ];

  return (
    <div id="wd-assignments" className="mt-2">
      {/* Top search + buttons */}
      <div className="clearfix mb-3">
        <div className="float-start" style={{ maxWidth: 420 }}>
          <InputGroup size="lg">
            <InputGroup.Text><BiSearch /></InputGroup.Text>
            <FormControl placeholder="Search..." id="wd-search-assignment" />
          </InputGroup>
        </div>
        <div className="float-end">
          <Button variant="secondary" className="me-2 text-nowrap">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger" className="text-nowrap" id="wd-add-assignment">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      {/* Group header bar */}
      <div className="d-flex align-items-center justify-content-between border rounded px-3 py-2 bg-white">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 text-muted" />
          <h5 className="m-0">ASSIGNMENTS</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="light" text="dark" pill className="wd-badge-pill">40% of Total</Badge>
          <Button size="sm" variant="light" className="px-2">+</Button>
          <Button size="sm" variant="light" className="px-2"><IoEllipsisVertical /></Button>
        </div>
      </div>

      {/* Rows */}
      <ListGroup className="rounded-0 mt-2">
        {assignments.map((a) => (
          <ListGroup.Item key={a.id} className="p-3 ps-1 wd-assignment-row">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 text-muted flex-shrink-0" />
              <div className="flex-fill">
                <Link href={`${base}/${a.id}`} className="fw-semibold text-decoration-none">
                  {a.title}
                </Link>
                <div className="small mt-1">
                  <span className="text-success me-3">Multiple Modules</span>
                  <span className="text-muted">{a.avail}</span>
                  <span className="mx-2 text-muted">|</span>
                  <span className="text-muted">Due {a.due}</span>
                  <span className="mx-2 text-muted">|</span>
                  <span className="text-muted">{a.pts} pts</span>
                </div>
              </div>
              <FaRegCheckCircle className="text-success fs-5 mx-2 flex-shrink-0" />
              <IoEllipsisVertical className="fs-4 flex-shrink-0" />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
