export default function Modules() {
  return (

    <div>
        <button>Collapse All</button>
        <button>View Progress</button>

      <select>
        <option>Publish All</option>
        <option>Unpublish All</option>
      </select>

      <button>+ Module</button>

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
      <li className="wd-lesson">
        <span className="wd-title">LEARNING OBJECTIVES</span>
        <ul className="wd-content">
          <li className="wd-content-item">Understand HTML structure</li>
          <li className="wd-content-item">Create basic HTML pages</li>
        </ul>
      </li>
      <li className="wd-lesson">
        <span className="wd-title">READING</span>
        <ul className="wd-content">
          <li className="wd-content-item">Chapter 2: Introduction to HTML</li>
        </ul>
      </li>
    </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
      <li className="wd-lesson">
        <span className="wd-title">LEARNING OBJECTIVES</span>
        <ul className="wd-content">
          <li className="wd-content-item">Understand CSS basics</li>
          <li className="wd-content-item">Style HTML pages with CSS</li>
        </ul>
      </li>
      <li className="wd-lesson">
        <span className="wd-title">READING</span>
        <ul className="wd-content">
          <li className="wd-content-item">Chapter 3: Styling with CSS</li>
        </ul>
      </li>
    </ul>
        </li>

        <li className="wd-module">
    <div className="wd-title">Week 4</div>
    <ul className="wd-lessons">
      <li className="wd-lesson">
        <span className="wd-title">LEARNING OBJECTIVES</span>
        <ul className="wd-content">
          <li className="wd-content-item">Learn basics of JavaScript</li>
          <li className="wd-content-item">Manipulate DOM elements</li>
        </ul>
      </li>
      <li className="wd-lesson">
        <span className="wd-title">READING</span>
        <ul className="wd-content">
          <li className="wd-content-item">Chapter 4: Introduction to JavaScript</li>
        </ul>
      </li>
    </ul>
  </li>

    <li className="wd-module">
    <div className="wd-title">Week 5</div>
    <ul className="wd-lessons">
      <li className="wd-lesson">
        <span className="wd-title">LEARNING OBJECTIVES</span>
        <ul className="wd-content">
          <li className="wd-content-item">Understand React basics</li>
          <li className="wd-content-item">Create reusable components</li>
        </ul>
      </li>
      <li className="wd-lesson">
        <span className="wd-title">READING</span>
        <ul className="wd-content">
          <li className="wd-content-item">Chapter 5: Introduction to React</li>
        </ul>
      </li>
    </ul>
  </li>
      </ul>
    </div>
);}
