import React from "react";
import translate from "../../localization/translate";

import { AiOutlineMail } from "react-icons/ai";

const PasswordLessFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    getOtp,
    hideEmail,
    onSubmit,
    trackClickEvent,
  } = props;
  return (
    <>
      {!hideEmail && (
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
                    : LoginError.isEmailError === false
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
      )}
      {LoginError.email && <div className="Error">{LoginError.email}</div>}

      {LoginForm.otpAvailable && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="LoginInputContainer">
            <div className="LoginInputLabel">
              {translate("one_time_passcode")}
            </div>
            <input
              id="otp"
              name="otp"
              className="LoginInput"
              onChange={onChange}
            />
          </div>
          <div className="LoginOtpResendContainer" onClick={getOtp}>
            <button className="LoginResendBtn">
              {translate("ResendCode")}
            </button>
          </div>
        </div>
      )}
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
        {LoginForm.otpAvailable ? (
          <div>{translate("signIn")}</div>
        ) : (
          <div>{translate("Request_one_time_passcode")}</div>
        )}
      </button>

      {LoginForm.otpAvailable && (
        <div className="LoginOptMessageContainer">
          <div className="LoginOtpMessage">
            <div>If you didn't receive a passcode,</div>
            <div>check your spam folder.</div>
          </div>
          <div className="ContactSupport">
            <div>Need Help?</div>
            <div
              style={{
                margin: "0 5px",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Contact Support
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordLessFlow;
