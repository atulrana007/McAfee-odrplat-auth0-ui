/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

const CommonDataContext = React.createContext({});

const CommonDataProvider = (props) => {
  const [connections, setConn] = useState([]);
  const [LoginText, setLoginText] = useState({
    title: "Sign_into_your_McAfee_account",
    subtitle: "choose_your_signIn_method_continue",
  });
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
    otp: "",
    otpAvailable: false,
    isSubmitting: false,
  });
  useEffect(() => {
    const getCommonData = async () => {
      const res = await axios.get(
        `https://${props.config.auth0Domain}/client/${props.config.clientID}.js`
      );
      const data = res.data;
      if (typeof data === "string") {
        const filteredData = data.slice(16, -2);
        const jsonData = JSON.parse(filteredData);
        const DB_ARRAY = jsonData?.strategies[0]?.connections.filter(
          (item) => item.name === "Test-CustomDB"
        );
        console.log("DB ARRAY RECIVED", DB_ARRAY);
        setConn(DB_ARRAY);
      }
    };
    getCommonData();
  }, []);
  return (
    <CommonDataContext.Provider
      value={{
        connections,
        LoginText,
        setLoginText,
        LoginForm,
        setLoginForm,
      }}
    >
      {props.children}
    </CommonDataContext.Provider>
  );
};

export { CommonDataProvider, CommonDataContext };
