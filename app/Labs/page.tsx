"use client";

import Link from "next/link";
import { Provider } from "react-redux";
import store from "./store";
export default function Labs() {
  return (
  <Provider store={store}>
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Name : Jayaditya Peddisetti</h2>
      <h3>Section : 18616</h3>
      <h4>
        <a href="https://github.com/jayaditya034/kambaz-next-js" id="wd-github">
          Github Repository Link
        </a>
      </h4>
      <h5>
        <a href="https://kambaz-next-js-jay.vercel.app/Account/Signin" id="wd-kambaz">
          Kambaz
        </a>
      </h5>

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: State & Events
          </Link>
        </li>
      </ul>
    </div>
    </Provider>
  );
}
