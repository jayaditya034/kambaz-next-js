// app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input 
        placeholder="Search for Assignments"
        id="wd-search-assignment" 
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A1" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <div>Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A2" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A3" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A4" className="wd-assignment-link">
            A4 - STATE + REDUX
          </Link>
          <div>Multiple Modules | Not available until May 27 at 12:00am | Due June 3 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A5" className="wd-assignment-link">
            A5 - NODE + EXPRESS
          </Link>
          <div>Multiple Modules | Not available until June 3 at 12:00am | Due June 10 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/A6" className="wd-assignment-link">
            A6 - MONGODB
          </Link>
          <div>Multiple Modules | Not available until June 10 at 12:00am | Due June 17 at 11:59pm | 100 pts</div>
        </li>
      </ul>
      
      <h3>QUIZZES 30% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Q1" className="wd-assignment-link">
            Q1 - HTML Quiz
          </a>
          <div>Multiple Attempts | Available May 10 at 6:00pm - May 15 at 11:59pm | 50 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Q2" className="wd-assignment-link">
            Q2 - CSS Quiz  
          </a>
          <div>Multiple Attempts | Available May 17 at 6:00pm - May 22 at 11:59pm | 50 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Q3" className="wd-assignment-link">
            Q3 - JavaScript Quiz
          </a>
          <div>Multiple Attempts | Available May 24 at 6:00pm - May 29 at 11:59pm | 50 pts</div>
        </li>
      </ul>
      
      <h3>EXAMS 20% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Midterm" className="wd-assignment-link">
            Midterm Exam
          </a>
          <div>One Attempt | Available May 31 at 6:00pm - June 2 at 11:59pm | 100 pts</div>
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Final" className="wd-assignment-link">
            Final Exam
          </a>
          <div>One Attempt | Available June 14 at 6:00pm - June 17 at 11:59pm | 100 pts</div>
        </li>
      </ul>
      
      <h3>PROJECT 10% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/Project" className="wd-assignment-link">
            Final Project
          </a>
          <div>Not available until June 1 at 12:00am | Due June 17 at 11:59pm | 100 pts</div>
        </li>
      </ul>
    </div>
  );
}