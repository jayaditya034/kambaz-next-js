import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" className="wd-username" defaultValue="Jay"/> <br />
     <input placeholder="password" type="password" className="wd-password" defaultValue="3399"/> <br />
     <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="Signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}

