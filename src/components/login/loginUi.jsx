import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import "./style.css";
import Login from "./Login";
import translate from "../../localization/translate";
import CircularLoader from "../../loader/CircularLoader";

const LoginUI = (props) => {
  const {
    onChange,
    switchLogin,
    onToggle,
    onSubmit,
    LoginError,
    LoginForm,
    validateEmail,
    Continue,
    onPressContinue,
    getOtp,
    socialBtn,
    hideEmail,
    loader,
  } = props;
  const { setWhichPage } = useContext(AppContext);

  return (
    <>
      {loader ? (
        <div className="loaderWrapper">
          <div className="loaderLogo">
            <img
              alt="McAfeeLogo"
              className="Logo"
              src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
            />
          </div>
          <div className="loader-creating-your-account">
            <img
              alt="McAfeeLogo"
              className="loading-logo"
              src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Document-Logo.png"
            />
            <div className="loading-text">{translate("Signing_you_in")}...</div>
            <CircularLoader />
          </div>
        </div>
      ) : (
        <>
          <div className="LoginContainer">
            <div className="LoginLeftWrapper">
              <div className="LoginWelcomeContainer">
                <img
                  alt="McAfeeLogo"
                  className="LoginPageLogo"
                  src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
                />
                <div className="LoginIntro">
                  {translate("Sign_into_your_McAfee_account")}
                </div>
                <div className="LoginIntroSubHeading">
                  {translate("choose_your_signIn_method_continue")}
                </div>
                <div className="LoginBottomHeading">
                  <div>{translate("Do_not_have_an_account")}</div>
                  <div
                    className="Login-page-link"
                    onClick={() => {
                      setWhichPage("signup-page");
                    }}
                  >
                    {translate("Create_one_now")}
                  </div>
                </div>
              </div>
            </div>
            <div className="LoginRightWrapper">
              <Login
                LoginError={LoginError}
                onChange={onChange}
                switchLogin={switchLogin}
                onSubmit={onSubmit}
                LoginForm={LoginForm}
                onToggle={onToggle}
                onPressContinue={onPressContinue}
                Continue={Continue}
                getOtp={getOtp}
                validateEmail={validateEmail}
                socialBtn={socialBtn}
                hideEmail={hideEmail}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginUI;
