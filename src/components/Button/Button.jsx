import React from "react";
import "./Button.scss";

const Button = ({ onClick, children, secondary, ...props }) => {
  return (
    <button className={`button ${secondary ? "button--secondary" : ""}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
