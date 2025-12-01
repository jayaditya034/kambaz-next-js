// app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (s: RootState) => s.accountReducer
  );

  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isNewRoute = aid === "new";

  const back = () => router.push(`/Courses/${cid}/Assignments`);

  // Load the assignment:
  //  - if aid === "new", create a local default
  //  - else try Redux, then fall back to server fetch
  useEffect(() => {
    if (!cid || !aid) return;

    const load = async () => {
      if (isNewRoute) {
        const fresh: Assignment = {
          _id: "",
          course: cid,
          title: "New Assignment",
          description: "",
          points: 100,
          due: "May 13, 2024, 11:59 PM",
          availableFrom: "May 6, 2024, 12:00 AM",
        };
        setAssignment(fresh);
        setLoading(false);
        return;
      }

      // 1) Try Redux state first
      const fromState = assignments.find(
        (a) => String(a._id) === String(aid)
      );
      if (fromState) {
        setAssignment(fromState);
        setLoading(false);
        return;
      }

      // 2) Fall back to server
      try {
        const fetched = await assignmentsClient.findAssignmentById(aid);
        setAssignment(fetched);
        // keep Redux in sync
        dispatch(addAssignment(fetched));
      } catch (err) {
        console.error("EditAssignmentPage: failed to load assignment", err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [cid, aid, isNewRoute, assignments, dispatch]);

  const onSave = async (form: HTMLFormElement) => {
    if (!cid || !assignment) return;

    const data = new FormData(form);
    const next: Assignment = {
      _id: assignment._id ?? "",
      course: cid,
      title: String(data.get("title") ?? assignment.title),
      description: String(
        data.get("description") ?? assignment.description ?? ""
      ),
      points: Number(data.get("points") ?? assignment.points ?? 100),
      due: String(data.get("due") ?? assignment.due ?? ""),
      availableFrom: String(
        data.get("availableFrom") ?? assignment.availableFrom ?? ""
      ),
      available: assignment.available,
    };

    if (isNewRoute) {
      const created = await assignmentsClient.createAssignmentForCourse(
        cid,
        next
      );
      dispatch(addAssignment(created));
    } else {
      const updated = await assignmentsClient.updateAssignmentOnServer(next);
      dispatch(updateAssignment(updated));
    }
    back();
  };

  if (loading || !assignment) {
    return <div className="container mt-4">Loading assignment…</div>;
  }

  const pageTitle = assignment.title || "Assignment";

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
      {/* (Breadcrumb in the layout will still say Web Development > ... ) */}

      {/* Assignment name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          name="title"
          className="form-control"
          defaultValue={pageTitle}
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
          defaultValue={assignment.description ?? ""}
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
            defaultValue={assignment.points ?? 100}
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
                  defaultValue={assignment.due ?? ""}
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
                    defaultValue={assignment.availableFrom ?? ""}
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
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-danger" disabled={!canEdit}>
          Save
        </button>
      </div>
    </form>
  );
}
