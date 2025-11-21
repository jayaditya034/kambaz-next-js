// app/Labs/Lab5/page.tsx
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item"
        >
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <PathParameters httpServer={HTTP_SERVER} />
      <QueryParameters httpServer={HTTP_SERVER} />
            <WorkingWithObjects httpServer={HTTP_SERVER} />
            <WorkingWithArrays httpServer={HTTP_SERVER} />
                  <HttpClient />
                  <hr />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
