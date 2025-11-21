"use client";

import { useState, ChangeEvent } from "react";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";

type WorkingWithObjectsProps = {
  httpServer: string;
};

type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};

type Module = {
  id: string;
  name: string;
  description: string;
  course: string;
};

export default function WorkingWithObjects({
  httpServer,
}: WorkingWithObjectsProps) {
  // local copies of remote objects
  const [assignment, setAssignment] = useState<Assignment>({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState<Module>({
    id: "M01",
    name: "Intro to NodeJS",
    description: "Learn how to build HTTP servers with Express.",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${httpServer}/lab5/assignment`;
  const MODULE_API_URL = `${httpServer}/lab5/module`;

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setAssignment({ ...assignment, score: value });
  };

  const handleCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignment({ ...assignment, completed: e.target.checked });
  };

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* ASSIGNMENT – retrieving whole object and title */}
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      {/* MODULE – this whole block now comes BEFORE assignment modification */}
      <h4>Working With Module</h4>

      <h5>Module Object</h5>
      {/* Get whole module */}
      <a
        id="wd-get-module"
        className="btn btn-secondary me-2"
        href={MODULE_API_URL}
      >
        Get Module
      </a>

      {/* Get module name */}
      <a
        id="wd-get-module-name"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>

      <hr />

      <h5>Modifying Module</h5>

      {/* Update module name */}
      <a
        id="wd-update-module-name"
        className="btn btn-primary float-end mb-2"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <FormControl
        className="w-75 mb-3"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) =>
          setModule({
            ...module,
            name: e.target.value,
          })
        }
      />

      {/* Update module description */}
      <a
        id="wd-update-module-description"
        className="btn btn-primary float-end mb-2"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <FormControl
        className="w-75 mb-3"
        id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) =>
          setModule({
            ...module,
            description: e.target.value,
          })
        }
      />

      <hr />

      {/* ASSIGNMENT – modifying title, score, completed (now AFTER module) */}
      <h4>Modifying Assignment Properties</h4>

      {/* Title */}
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75 mb-3"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      {/* Score (number) */}
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-25 mb-3"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={handleScoreChange}
      />

      {/* Completed (checkbox) */}
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <FormCheck
        id="wd-assignment-completed"
        className="mb-3"
        type="checkbox"
        label="Completed"
        defaultChecked={assignment.completed}
        onChange={handleCompletedChange}
      />

      <hr />
    </div>
  );
}
