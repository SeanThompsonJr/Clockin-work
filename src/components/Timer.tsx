//todo understand this better and fix ui
import React from "react";
import { useState, useEffect, useRef } from "react";
import { TimerButton } from "./Button";
import "../index.css";
//accepts a number that represents this elements z-index
interface TimerProps {
  z: number;
}

export default function Timer({ z }: TimerProps) {
  //for checking if the timer is running
  const [isRunning, setIsRunning] = useState(false);
  //for holding the current displayed time
  const [elapsedTime, setElapseTime] = useState(0);
  //for the color of the text
  const [timerColor, setTimerColor] = useState("");
  //to store the current time when you stop the time
  const intervalIdRef = useRef(null);
  //for setting the default start time | does not rerender
  const startTimeRef = useRef(0);

  //side effect - if isrunning ever changes do this code inside
  useEffect(() => {
    if (isRunning) {
      //setting the current time to intervalIdRef
      intervalIdRef.current = setInterval(() => {
        //elapse time will be the time now subtract the start time
        setElapseTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      //clears the interval to actually stop the timer
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    setTimerColor("timer-running");
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setTimerColor("timer-stopped");
    setIsRunning(false);
  }
  function reset() {
    setTimerColor("timer-idle");
    setElapseTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className={`absolute z-[3] top-20`} style={{ zIndex: z }}>
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-5xl ">time worked today</p>
        <div className={`text-5xl ${timerColor}`}>{formatTime()}</div>
        <p className="text-lg font-bold">Hours:Minutes:seconds</p>
        <div className="btn-container w-3/4  flex flex-wrap gap-x-9 items-center justify-center">
          <TimerButton text={"start"} func={start}></TimerButton>
          <TimerButton text={"pause/break"} func={stop}></TimerButton>
          {/* make it do the job of start and reset later */}
          <TimerButton text={"end of day"} func={reset}></TimerButton>
        </div>
      </div>
    </div>
  );
}
