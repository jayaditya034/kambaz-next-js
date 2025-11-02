"use client";

// 4.2.1 Handling User Events
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";

// 4.2.2 Managing Component State
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

// 4.3.x Redux
import HelloRedux from "./ReduxExamples/HelloRedux";            // 4.3.2
import CounterRedux from "./ReduxExamples/CounterRedux";        // 4.3.3
import AddRedux from "./ReduxExamples/AddRedux";                // 4.3.4
import TodoList from "./ReduxExamples/todos/TodoList";               // 4.3.5

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <hr />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <hr />
      {/* 4.3.2 Hello World Redux */}
      <h2>Redux Examples</h2>
      <HelloRedux />
      {/* 4.3.3 Counter Redux */}
      <CounterRedux />
      {/* 4.3.4 Passing Data to Reducers (AddRedux) */}
      <AddRedux />
      {/* 4.3.5 Todo List with Redux */}
      <TodoList />
    </div>
  );
}
