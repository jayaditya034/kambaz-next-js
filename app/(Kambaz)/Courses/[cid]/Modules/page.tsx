// app/(Kambaz)/Courses/[cid]/Modules/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import { useParams } from "next/navigation";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
} from "./reducer";
import type { RootState } from "../../../store";
import * as coursesClient from "../../client";


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
  editing?: boolean;
};

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();

  // local input for the "+ Module" form
  const [moduleName, setModuleName] = useState("");

  // read from Redux
  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as Module[];

  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const dispatch = useDispatch();

  // ---- Fetch modules from server on load
  const fetchModules = async () => {
    const loadedModules = await coursesClient.findModulesForCourse(
      cid as string
    );
    dispatch(setModules(loadedModules));
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Guarded handlers (no-ops for students)
  const handleAdd = () => {
    if (!isFaculty) return;
    const trimmed = moduleName.trim();
    if (!trimmed) return;

    const newModuleData = { name: trimmed, course: cid as string };

    coursesClient
      .createModuleForCourse(cid as string, newModuleData)
      .then((createdModule) => {
        dispatch(addModule(createdModule));
        setModuleName("");
      });
  };


  const handleDelete = async (moduleId: string) => {
    if (!isFaculty) return;
    await coursesClient.deleteModule(cid as string, moduleId);
    dispatch(deleteModule(moduleId));
  };



  const handleEdit = (moduleId: string) => {
    if (!isFaculty) return;
    dispatch(editModule(moduleId));
  };

  const handleInlineNameChange = (m: Module, name: string) => {
    if (!isFaculty) return;
    dispatch(updateModule({ ...m, name }));
  };

  const handleInlineCommit = async (m: Module) => {
    if (!isFaculty) return;
    const updated: Module = { ...m, editing: false };
    const saved = await coursesClient.updateModule(cid as string, updated);
    dispatch(updateModule(saved));
  };



  return (
    <div id="wd-modules-page">
      {/* Faculty-only toolbar to create modules */}
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={handleAdd}
        />
      )}

      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {(modules ?? []).map((m: Module) => (
          <ListGroupItem
            key={m._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />

              {/* Title / inline editor */}
              <div className="flex-grow-1">
                {!m.editing && <span className="me-2">{m.name}</span>}

                {m.editing && isFaculty && (
                  <FormControl
                    className="w-50 d-inline-block me-2"
                    defaultValue={m.name}
                    onChange={(e) => handleInlineNameChange(m, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleInlineCommit(m);
                    }}
                  />
                )}

                {/* ✅ Always show module publish checkmark to all users */}
                <GreenCheckmark />
              </div>

              {/* Edit/Delete buttons only for faculty */}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={m._id}
                  deleteModule={handleDelete}
                  editModule={handleEdit}
                />
              )}
            </div>

            {/* Lessons list */}
            {m.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {m.lessons.map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <span className="me-2 flex-grow-1">{lesson.name}</span>

                    {/* ✅ Students must also see a green check mark for lessons.
                        Show it here for students; faculty already have controls on the right. */}
                    {!isFaculty && <GreenCheckmark />}

                    {/* Faculty lesson controls (keep as-is) */}
                    {isFaculty && <LessonControlButtons />}
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
