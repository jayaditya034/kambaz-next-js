import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1" className="wd-dashboard-course-link">
            <Image src="/images/react.js.png" width={200} height={150} alt="description of image"/>
            <div>
              <h5> CS1 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2" className="wd-dashboard-course-link">
            <Image src="/images/CSharp.png" width={200} height={150} alt="description of image"/>
            <div>
              <h5> CS2 C-Sharp </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
        <Link href="/Courses/3" className="wd-dashboard-course-link">
    <Image src="/images/css3.jpg" width={200} height={150} alt="CSS3 logo"/>
    <div>
      <h5> CS3 CSS3 </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/4" className="wd-dashboard-course-link">
    <Image src="/images/Django.png" width={200} height={150} alt="Django logo"/>
    <div>
      <h5> CS4 Django </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/5" className="wd-dashboard-course-link">
    <Image src="/images/HTML5.png" width={200} height={150} alt="HTML5 logo"/>
    <div>
      <h5> CS5 HTML5 </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/6" className="wd-dashboard-course-link">
    <Image src="/images/Java.png" width={200} height={150} alt="Java logo"/>
    <div>
      <h5> CS6 Java </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/7" className="wd-dashboard-course-link">
    <Image src="/images/JavaScript.png" width={200} height={150} alt="JavaScript logo"/>
    <div>
      <h5> CS7 JavaScript </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/8" className="wd-dashboard-course-link">
    <Image src="/images/Node.js.png" width={200} height={150} alt="Node.js logo"/>
    <div>
      <h5> CS8 Node.js </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/9" className="wd-dashboard-course-link">
    <Image src="/images/PHP.png" width={200} height={150} alt="PHP logo"/>
    <div>
      <h5> CS9 PHP </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/10" className="wd-dashboard-course-link">
    <Image src="/images/python.png" width={200} height={150} alt="Python logo"/>
    <div>
      <h5> CS10 Python </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/11" className="wd-dashboard-course-link">
    <Image src="/images/SQL.png" width={200} height={150} alt="SQL logo"/>
    <div>
      <h5> CS11 SQL </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/12" className="wd-dashboard-course-link">
    <Image src="/images/TypeScript.png" width={200} height={150} alt="TypeScript logo"/>
    <div>
      <h5> CS12 TypeScript </h5>
      <p className="wd-dashboard-course-title">
        Full Stack software developer
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>
      </div>
    </div>
);}
