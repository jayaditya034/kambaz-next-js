"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
  const count = useSelector((state: RootState) => state.counterReducer.count);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux">
      <h3>Counter (Redux)</h3>
      <h4>{count}</h4>
      <button onClick={() => dispatch(increment())} id="wd-counter-inc">
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} id="wd-counter-dec" style={{ marginLeft: 8 }}>
        Decrement
      </button>
      <hr />
    </div>
  );
}
