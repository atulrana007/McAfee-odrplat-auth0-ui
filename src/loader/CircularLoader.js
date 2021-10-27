import React from "react";
import "./style.css";

function CircularLoader() {
  return (
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default CircularLoader;
