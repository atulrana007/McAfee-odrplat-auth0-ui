import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CommonDataProvider } from "../../providers/CommonDataContext";
import { AppProvider } from "../../providers/AppContext";
import LanguageProvider from "../../localization/languageProvider";
import { AccountProvider } from "../../providers/AccountContext";
import Signup from "./index";

const setUp = () => {
  render(
    <CommonDataProvider config={{}}>
      <AppProvider>
        <LanguageProvider locale="en-us">
          <AccountProvider config={{}}>
            <Router>
              <Signup />
            </Router>
          </AccountProvider>
        </LanguageProvider>
      </AppProvider>
    </CommonDataProvider>
  );
};

describe("<Signup/>", () => {
  test("should be able to render the homePage Component", () => {});
});
