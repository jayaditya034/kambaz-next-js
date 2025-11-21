"use client";

import React, { useState } from "react";

type PathParametersProps = {
  httpServer: string;
};

export default function PathParameters({ httpServer }: PathParametersProps) {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>

      <input
        className="form-control mb-2"
        id="wd-path-parameter-a"
        type="number"
        defaultValue={a}
        onChange={(e) => setA(e.target.value)}
      />

      <input
        className="form-control mb-2"
        id="wd-path-parameter-b"
        type="number"
        defaultValue={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${httpServer}/lab5/add/${a}/${b}`}
      >
        Add {a} + {b}
      </a>

      <a
        className="btn btn-danger me-2"
        id="wd-path-parameter-subtract"
        href={`${httpServer}/lab5/subtract/${a}/${b}`}
      >
        Subtract {a} - {b}
      </a>

      <a
        className="btn btn-secondary me-2"
        id="wd-path-parameter-multiply"
        href={`${httpServer}/lab5/multiply/${a}/${b}`}
      >
        Multiply {a} × {b}
      </a>

      <a
        className="btn btn-secondary"
        id="wd-path-parameter-divide"
        href={`${httpServer}/lab5/divide/${a}/${b}`}
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
