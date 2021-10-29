import React from "react";
import { useState, useEffect } from "react";
import "./style.css";

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="timer-class">
      {minutes === 0 && seconds === 0 ? (
        <div className="timer-inactive">This passcode has expired</div>
      ) : (
        <div className="timer-active">
          Password expired in <span style={{ fontWeight: 700 }}>{minutes}</span>{" "}
          minutes
        </div>
      )}
    </div>
  );
};

export default Timer;
