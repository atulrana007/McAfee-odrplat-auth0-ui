import React, { useContext, useState } from "react";
import { AccountContext } from "../providers/AccountContext";
import { CommonDataContext } from "../providers/CommonDataContext";
export default function LoginContainer(props) {
  const [loader, setLoader] = useState(false);
  const { loginWithPassword, otpLogin, otpStart, getSocialLogin } =
    useContext(AccountContext);
  const { LoginForm, setLoginForm } = useContext(CommonDataContext);
  const [LoginError, setLoginError] = useState({
    email: "",
    isEmailError: "",
    databaseError: "",
    errorCode: "",
  });
  const [switchLogin, setToggle] = useState(false);

  const [Continue, setContinue] = useState(false);

  const [hideEmail, setHideEmail] = useState(false);

  const onToggle = () => {
    setToggle(!switchLogin);
    setLoginError({
      ...LoginError,
      email: "",
      databaseError: "",
      errorCode: "",
    });
  };
  const onPressContinue = () => {
    setContinue(true);
  };
  const socialBtn = async (name) => {
    try {
      await getSocialLogin(name);
    } catch (err) {
      console.log(err);
    }
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onBlur = (e) => {
    switch (e.target.name) {
      case "email":
        if (!e.target.value) {
          setLoginError({
            ...LoginError,
            isEmailError: true,
            [e.target.name]: "Email is required",
          });
        } else if (e.target.value && !validateEmail(e.target.value)) {
          setLoginError({
            ...LoginError,
            isEmailError: true,
            [e.target.name]: "Email is not valid",
          });
        } else {
          setLoginError({
            ...LoginError,
            isEmailError: false,
            [e.target.name]: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const onChange = (e) => {
    setLoginForm({
      ...LoginForm,
      [e.target.name]: e.target.value,
    });
    onBlur(e);
  };

  const onSubmit = async (e) => {
    setLoginForm({
      ...LoginForm,
      isSubmitting: true,
    });

    e.preventDefault();
    if (!switchLogin) {
      try {
        setLoader(true);
        await loginWithPassword(LoginForm.email, LoginForm.password);
        setLoginError({
          ...LoginError,
          databaseError: "",
        });
        setLoginForm({
          ...LoginForm,
          isSubmitting: false,
        });
      } catch (err) {
        setLoginForm({
          ...LoginForm,
          isSubmitting: false,
        });
        setLoginError({
          ...LoginError,
          databaseError: err?.description,
          errorCode: err?.code === null ? err.original.message : err?.code,
        });
      }
      setLoader(false);
    } else {
      try {
        if (LoginForm.otpAvailable) {
          setLoader(true);
          await otpLogin(LoginForm.email, LoginForm.otp);
          setLoginForm({
            ...LoginForm,
            isSubmitting: false,
          });
        } else {
          await otpStart(LoginForm.email);
          setLoginForm({
            ...LoginForm,
            isSubmitting: false,
          });
          setLoginForm({
            ...LoginForm,
            otpAvailable: true,
          });
          setHideEmail(true);
        }
      } catch (err) {
        setLoginForm({
          ...LoginForm,
          isSubmitting: false,
        });
        setLoginError({
          ...LoginError,
          databaseError: err?.description,
          errorCode: err?.code ?? err?.message,
        });
      }
      setLoader(false);
    }
  };
  const getOtp = async (e) => {
    try {
      e.preventDefault();
      await otpStart(LoginForm.email);
    } catch (err) {
      console.log(err);
      setLoginError({
        ...LoginError,
        databaseError: err?.description,
        errorCode: err?.code ?? err?.message,
      });
    }
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    onChange,
    onToggle,
    switchLogin,
    onSubmit,
    LoginForm,
    LoginError,
    Continue,
    validateEmail,
    onPressContinue,
    getOtp,
    socialBtn,
    setHideEmail,
    loader,
    hideEmail,
  });
}
