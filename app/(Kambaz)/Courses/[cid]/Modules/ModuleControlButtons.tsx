// app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons.tsx
"use client";

type Props = {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
};

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: Props) {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      {/* Edit / Delete (faculty-only; parent controls visibility) */}
      <button
        className="btn btn-light border"
        title="Edit"
        id="wd-edit-module"
        onClick={() => editModule(moduleId)}
      >
        Edit
      </button>
      <button
        className="btn btn-light border text-danger"
        title="Delete"
        id="wd-delete-module"
        onClick={() => deleteModule(moduleId)}
      >
        Delete
      </button>
    </div>
  );
}
