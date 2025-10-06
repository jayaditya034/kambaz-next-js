"use client";

import { useParams } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

export default function EditAssignmentPage() {
  const { aid } = useParams<{ aid: string }>();

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control"
          defaultValue={aid ?? "A1"}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          rows={10}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </div>

      {/* Points */}
      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-md-3 col-form-label text-end">Points</label>
        <div className="col-md-9">
          <input id="wd-points" className="form-control" defaultValue={100} />
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

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-website-url" defaultChecked />
                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
              </div>
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
                <input
                  type="text"
                  id="wd-due-date"
                  className="form-control"
                  defaultValue="May 13, 2024, 11:59 PM"
                />
                <span className="input-group-text"><FaCalendarAlt /></span>
              </div>
            </div>

            {/* Available from / Until */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label">Available from</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-from"
                    className="form-control"
                    defaultValue="May 6, 2024, 12:00 AM"
                  />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label">Until</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-until"
                    className="form-control"
                    defaultValue=""
                  />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Footer actions (Cancel, Save) */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
