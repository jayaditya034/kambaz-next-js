"use client";
import { useState } from "react";
import type { MouseEvent } from "react";

type DisplayEvent = {
  type: string;
  timeStamp: number;
  target: string | null;
};

export default function EventObject() {
  const [eventObj, setEventObj] = useState<DisplayEvent | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const targetEl = e.target as HTMLElement | null;
    const snapshot: DisplayEvent = {
      type: e.type,
      timeStamp: e.timeStamp,
      target: targetEl?.outerHTML ?? null,
    };
    setEventObj(snapshot);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(eventObj, null, 2)}</pre>
      <hr />
    </div>
  );
}
