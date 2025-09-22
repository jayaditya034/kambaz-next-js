import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <h1>Name : Jayaditya Peddisetti</h1>
     <h1>Section : 18616</h1>
     <h3><a href = "https://github.com/jayaditya034/kambaz-next-js" id = "wd-github">Github Repository Link</a></h3>
     <h3><a href= "https://kambaz-next-js-jay.vercel.app/Account/Signin" id = "wd-kambaz">Kambaz</a></h3>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
     </ul>
   </div>
);}
