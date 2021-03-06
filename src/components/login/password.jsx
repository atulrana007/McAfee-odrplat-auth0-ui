import React from "react";
import "./style.css";
import translate from "../../localization/translate";
import { ReactComponent as OutlineMail } from "../../svg/mailIcon.svg";
import { ReactComponent as LockOutline } from "../../svg/lockIcon.svg";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";

const PasswordFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    trackClickEvent,
    LoginText,
  } = props;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="LoginInputContainer">
          {LoginForm.email !== "" ? (
            <div
              className="LoginInputLabel"
              style={{
                color: validateEmail(LoginForm.email) ? "#0CA77D" : "red",
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
                  ? "2px solid #0CA77D"
                  : "",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <OutlineMail
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
            {validateEmail(LoginForm.email) &&
            LoginText.title === "Looks_like_you_already_have_an_account" ? (
              <TickIcon
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.8rem",
                  marginRight: "0.2rem",
                }}
              />
            ) : null}
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
            <LockOutline className="LoginInputLogo" />
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
