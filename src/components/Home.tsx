import React, { useState } from "react";
import Timer from "./Timer";
import Calendar from "./Calendar";
export default function Home() {
  const [timerMenutab, setTimerMenuTab] = useState(4);
  const [calMenutab, setCalMenuTab] = useState(0);
  //fix the when you press a button the timer restarts

  //2 methods

  //cover one display while showing the other

  //pass the value of time into the Timer component
  function TimerTop() {
    setTimerMenuTab(4);
    setCalMenuTab(0);
  }
  function CalTop() {
    setTimerMenuTab(0);
    setCalMenuTab(4);
  }
  return (
    <div className="h-[99vh] flex  ">
      {/* left side menu */}
      <div className="left-container flex flex-col justify-start items-start text-start h-full gap-3">
        <button className="tab" onClick={() => TimerTop()}>
          Timer
        </button>
        <button className="tab" onClick={() => CalTop()}>
          Calender
        </button>
        <button className="tab ">Pomodoro</button>
      </div>

      {/* right side data */}
      <div className="right-container size-full relative h-auto">
        {/* <div className="cover size-full"></div> */}
        <Timer z={timerMenutab}></Timer>
        <div className=" blendIn z-[3] size-full bg- absolute"></div>
        <Calendar z={calMenutab}></Calendar>
      </div>
    </div>
  );
}
