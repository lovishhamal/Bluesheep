import React from "react";
import "./sidebar.css";

const Backdrop = ({ close, className }) => (
  <div className={className} onClick={() => close()}></div>
);

export default Backdrop;
