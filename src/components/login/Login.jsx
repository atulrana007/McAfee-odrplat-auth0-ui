import React from "react";
import "./style.css";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
// import SocialButtons from "./socialLogin";

const Login = (props) => {
    const {
        onChange,
        switchLogin,
        onSubmit,
        LoginError,
        LoginForm,
        onToggle,
        validateEmail,
        getOtp,
        // socialBtn,
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="LoginInputContainer">
                        {LoginForm.email !== "" ? (
                            <div
                                className="LoginInputLabel"
                                style={{
                                    color: validateEmail(LoginForm.email)
                                        ? "green"
                                        : "red",
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
                                    color: validateEmail(LoginForm.email)
                                        ? "green"
                                        : "",
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

                {LoginError.email && (
                    <div className="Error">{LoginError.email}</div>
                )}
                {!switchLogin && (
                    <>
                        <div className="LoginInputContainer">
                            {LoginForm.password !== "" ? (
                                <div className="LoginInputLabel">
                                    {translate("password")}
                                </div>
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
                )}
                {switchLogin && LoginForm.otpAvailable && (
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
                        <div
                            className="LoginOtpResendContainer"
                            onClick={getOtp}
                        >
                            <button className="LoginResendBtn">
                                {translate("ResendCode")}
                            </button>
                        </div>
                    </div>
                )}
                <button
                    className="RequestOtp"
                    onClick={(e) =>
                        onSubmit(e) && trackClickEvent("continue-auth0")
                    }
                    disabled={
                        !validateEmail(LoginForm.email) ||
                        LoginForm.isSubmitting
                    }
                    style={{
                        backgroundColor:
                            !validateEmail(LoginForm.email) ||
                            LoginForm.isSubmitting
                                ? "gray"
                                : "",
                        cursor: LoginForm.isSubmitting ? "progress" : "pointer",
                    }}
                >
                    {!switchLogin ? (
                        <div>{translate("signIn")}</div>
                    ) : LoginForm.otpAvailable ? (
                        <div>{translate("signIn")}</div>
                    ) : (
                        <div>{translate("Request_one_time_passcode")}</div>
                    )}
                    {/* <div>{translate("signIn")}</div> */}
                </button>
            </form>
            {LoginError.errorCode && (
                <div className="Error">{translate(LoginError.errorCode)}</div>
            )}

            <div className="SwitchContainer">
                <div className="Switch">{translate("or")}</div>

                {!switchLogin && (
                    <button className="SwitchBtn" onClick={onToggle}>
                        <div>
                            {translate("Sign_in_with_a_onetime_passcode")}
                        </div>
                    </button>
                )}
                {switchLogin && (
                    <button className="SwitchBtn" onClick={onToggle}>
                        <div>{translate("signIn_with_password")}</div>
                    </button>
                )}
                {/* {!switchLogin && (
                    <button className="SwitchBtn" onClick={getOtp}>
                        <div>
                            {translate("Sign_in_with_a_onetime_passcode")}
                        </div>
                    </button>
                )}
                {switchLogin && (
                    <button className="SwitchBtn" onClick={onToggle}>
                        <div>{translate("signIn_with_password")}</div>
                    </button>
                )} */}
            </div>
            {/* <SocialButtons socialBtn={socialBtn} /> */}
        </div>
    );
};

export default Login;
