"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

// ✅ Database import (extra "../" because we're one level deeper)
import * as db from "../../../../Database";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  due?: string;         // e.g., "May 13, 2024, 11:59 PM"
  availableFrom?: string;
  available?: string;   // short banner string if you prefer
};

export default function EditAssignmentPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const all = (db as { assignments: Assignment[] }).assignments || [];
  const a = all.find((x) => x._id === aid);

  // reasonable fallbacks so the UI still renders
  const title = a?.title ?? aid ?? "Assignment";
  const description =
    a?.description ??
    `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;
  const points = a?.points ?? 100;
  const dueFull = a?.due ?? "May 13, 2024, 11:59 PM";
  const availFrom = a?.availableFrom ?? "May 6, 2024, 12:00 AM";

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue={title} />
      </div>

      {/* Description */}
      <div className="mb-3">
        <textarea id="wd-description" className="form-control" rows={10} defaultValue={description} />
      </div>

      {/* Points */}
      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-md-3 col-form-label text-end">Points</label>
        <div className="col-md-9">
          <input id="wd-points" className="form-control" defaultValue={points} />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-md-3 col-form-label text-end">Assignment Group</label>
        <div className="col-md-9">
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECT</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-md-3 col-form-label text-end">Display Grade as</label>
        <div className="col-md-9">
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
          </select>
        </div>
      </div>

      {/* Submission Type + Online Entry Options */}
      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-md-3 col-form-label text-end">Submission Type</label>
        <div className="col-md-9">
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-select mb-3" defaultValue="Online">
              <option>Online</option>
            </select>

            <div>
              <label className="form-label fw-bold">Online Entry Options</label>
              {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((label, i) => (
                <div className="form-check" key={i}>
                  <input type="checkbox" className="form-check-input" id={`wd-opt-${i}`} defaultChecked={label === "Website URL"} />
                  <label htmlFor={`wd-opt-${i}`} className="form-check-label">{label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign panel */}
      <div className="row mb-3">
        <label className="col-md-3 col-form-label text-end">Assign</label>
        <div className="col-md-9">
          <div className="border rounded p-3">
            {/* Assign to */}
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
              <div className="input-group">
                <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
                <button className="btn btn-outline-secondary" type="button" aria-label="remove">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>

            {/* Due */}
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label">Due</label>
              <div className="input-group">
                <input type="text" id="wd-due-date" className="form-control" defaultValue={dueFull} />
                <span className="input-group-text"><FaCalendarAlt /></span>
              </div>
            </div>

            {/* Available from / Until */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label">Available from</label>
                <div className="input-group">
                  <input type="text" id="wd-available-from" className="form-control" defaultValue={availFrom} />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label">Until</label>
                <div className="input-group">
                  <input type="text" id="wd-available-until" className="form-control" defaultValue="" />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Footer actions (Cancel, Save) – navigate back to course assignments */}
      <div className="d-flex justify-content-end">
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
      </div>
    </div>
  );
}
