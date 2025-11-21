"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  addAssignment,
  updateAssignment,
  type Assignment,
} from "../../Assignments/reducer";
import * as assignmentsClient from "../../Assignments/client";


export default function EditAssignmentPage() {
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const dispatch = useDispatch();
  const { assignments } = useSelector((s: RootState) => s.assignmentsReducer);
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);

  // ✅ Count ADMIN as faculty too
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const existing = assignments.find((a) => a._id === aid);
  const isNew = aid === "new" || !existing;

  // local controlled state
  const a: Assignment = existing ?? {
    _id: "",
    course: cid!,
    title: "New Assignment",
    description: "",
    points: 100,
    due: "May 13, 2024, 11:59 PM",
    availableFrom: "May 6, 2024, 12:00 AM",
  };

  const back = () => router.push(`/Courses/${cid}/Assignments`);

  // ✅ Block students from creating new assignments via URL
  useEffect(() => {
    if (isNew && !canEdit) back();
  }, [isNew, canEdit]);

  const onSave = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const next: Assignment = {
      _id: a._id,
      course: cid!,
      title: String(data.get("title") ?? a.title),
      description: String(data.get("description") ?? a.description ?? ""),
      points: Number(data.get("points") ?? a.points ?? 100),
      due: String(data.get("due") ?? a.due ?? ""),
      availableFrom: String(
        data.get("availableFrom") ?? a.availableFrom ?? ""
      ),
    };

    if (isNew) {
      const created = await assignmentsClient.createAssignmentForCourse(
        cid!,
        next
      );
      dispatch(addAssignment(created));
    } else {
      const updated = await assignmentsClient.updateAssignmentOnServer(next);
      dispatch(updateAssignment(updated));
    }
    back();
  };


  return (
    <form
      id="wd-assignments-editor"
      className="container mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (canEdit) {
          void onSave(e.currentTarget);
        }
      }}

    >
      {/* Assignment name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          name="title"
          className="form-control"
          defaultValue={a.title}
          disabled={!canEdit}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <textarea
          id="wd-description"
          name="description"
          className="form-control"
          rows={10}
          defaultValue={a.description ?? ""}
          disabled={!canEdit}
        />
      </div>

      {/* Points */}
      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-md-3 col-form-label text-end">
          Points
        </label>
        <div className="col-md-9">
          <input
            id="wd-points"
            name="points"
            className="form-control"
            defaultValue={a.points ?? 100}
            disabled={!canEdit}
          />
        </div>
      </div>

      {/* Assign panel */}
      <div className="row mb-3">
        <label className="col-md-3 col-form-label text-end">Assign</label>
        <div className="col-md-9">
          <div className="border rounded p-3">
            {/* Due */}
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label">
                Due
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="wd-due-date"
                  name="due"
                  className="form-control"
                  defaultValue={a.due ?? ""}
                  disabled={!canEdit}
                />
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
              </div>
            </div>

            {/* Available from / Until */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label">
                  Available from
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-from"
                    name="availableFrom"
                    className="form-control"
                    defaultValue={a.availableFrom ?? ""}
                    disabled={!canEdit}
                  />
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label">
                  Until
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-until"
                    className="form-control"
                    defaultValue=""
                    disabled
                  />
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Footer actions */}
      <div className="d-flex justify-content-end">
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
          Cancel
        </Link>
        {canEdit && <button type="submit" className="btn btn-danger">Save</button>}
      </div>
    </form>
  );
}
