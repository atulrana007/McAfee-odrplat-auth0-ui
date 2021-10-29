import React from "react";
import "./style.css";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";

const PasswordFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    trackClickEvent,
  } = props;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="LoginInputContainer">
          {LoginForm.email !== "" ? (
            <div
              className="LoginInputLabel"
              style={{
                color: validateEmail(LoginForm.email) ? "green" : "red",
              }}
            >
              {translate("emailAddress")}
            </div>
          ) : null}
          <div
            style={{
              flex: 1,
              display: "flex",
              border:
                LoginError.isEmailError === true
                  ? "2px solid red"
                  : validateEmail(LoginForm.email)
                  ? "2px solid green"
                  : "",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <AiOutlineMail
              className="LoginInputLogo"
              style={{
                color: validateEmail(LoginForm.email) ? "green" : "",
              }}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={LoginForm.email}
              placeholder="Email"
              className="LoginInput"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      {LoginError.email && <div className="Error">{LoginError.email}</div>}
      <>
        <div className="LoginInputContainer">
          {LoginForm.password !== "" ? (
            <div className="LoginInputLabel">{translate("password")}</div>
          ) : null}
          <div
            style={{
              display: "flex",
              borderRadius: "1rem",
              backgroundColor: "#ffff",
            }}
          >
            <MdLockOutline className="LoginInputLogo" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="LoginInput"
              onChange={onChange}
            />
          </div>
        </div>
      </>
      <button
        className="RequestOtp"
        onClick={(e) => onSubmit(e) && trackClickEvent("continue-auth0")}
        disabled={!validateEmail(LoginForm.email) || LoginForm.isSubmitting}
        style={{
          backgroundColor:
            !validateEmail(LoginForm.email) || LoginForm.isSubmitting
              ? "gray"
              : "",
          cursor: LoginForm.isSubmitting ? "progress" : "pointer",
        }}
      >
        <div>{translate("signIn")}</div>
      </button>
    </>
  );
};

export default PasswordFlow;
