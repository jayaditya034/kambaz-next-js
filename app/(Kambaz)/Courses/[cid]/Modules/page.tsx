"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

import { useParams } from "next/navigation";
// ⬇️ UPDATE THIS PATH to wherever your Database module is:
import * as db from "../../../Database";

// ---- minimal types to satisfy ESLint/TS
type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

type Module = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
};

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const modules = (db as { modules: Module[] }).modules;

  return (
    <div id="wd-modules-page">
      <ModulesControls />
      <br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((m) => m.course === cid)
          .map((m) => (
            <ListGroupItem key={m._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {m.name}
                <ModuleControlButtons />
              </div>

              {m.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {m.lessons.map((lesson) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
