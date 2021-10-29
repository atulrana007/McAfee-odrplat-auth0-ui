import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import translate from "../../localization/translate";

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const { setOtpValid } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setOtpValid(false);
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
        <div className="timer-inactive">
          {translate("This_passcode_has_expired")}
        </div>
      ) : (
        <div className="timer-active">
          {translate("Password_expired_in")}{" "}
          <span style={{ fontWeight: 700 }}>
            {minutes === 0 && seconds > 0
              ? seconds
              : minutes === initialMinute
              ? minutes
              : minutes + 1}
          </span>{" "}
          {minutes === 0 && seconds > 0 ? "seconds" : "minutes"}
        </div>
      )}
    </div>
  );
};

export default Timer;
