import React from "react";
import "./style.css";
import translate from "../../localization/translate";
import PasswordFlow from "./password";
import PasswordLessFlow from "./passwordless";
const Login = (props) => {
  const {
    onChange,
    switchLogin,
    onSubmit,
    LoginError,
    LoginForm,
    hideEmail,
    onToggle,
    validateEmail,
    getOtp,
    LoginText,
  } = props;
  const trackClickEvent = async (navElement) => {
    let utag_data = window.utag_data;
    let utag = window.utag;
    let utagdata = { ...utag_data };
    utagdata["tm_global_tealium_calltype"] = "manual";
    utagdata["tm_global_navigation_element"] = navElement;
    utagdata["tm_global_navigation_element_click"] = "true";
    utag.link(utagdata);
  };
  return (
    <div className="LoginWrapperContainer">
      <form className="LoginInputWrapper">
        {!switchLogin && (
          <PasswordFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
          />
        )}

        {switchLogin && (
          <PasswordLessFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            getOtp={getOtp}
            hideEmail={hideEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
          />
        )}
      </form>
      {LoginError.errorCode && (
        <div className="Error">{translate(LoginError.errorCode)}</div>
      )}

      <div className="SwitchContainer">
        <div className="Switch">{translate("or")}</div>

        {!switchLogin && (
          <>
            <button className="SwitchBtn" onClick={onToggle}>
              <div>{translate("Sign_in_with_a_onetime_passcode")}</div>
            </button>
            <div className="opt-info">{translate("we_will_send_otp")}</div>
          </>
        )}
        {switchLogin && (
          <button className="SwitchBtn" onClick={onToggle}>
            <div>{translate("signIn_with_password")}</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
