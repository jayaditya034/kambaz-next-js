import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home">
      <div className="d-flex" id="wd-home-flex">
        {/* Left: modules */}
        <div className="flex-fill me-3">
          <Modules />
        </div>

        {/* Right: course status — hidden on < lg */}
        <div className="d-none d-lg-block" style={{ minWidth: 260 }}>
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
