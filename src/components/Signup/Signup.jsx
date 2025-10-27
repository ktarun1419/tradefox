import React from "react";
import { Column } from "../Layout/Layout";

import "./Signup.scss";

import SignupForm from "./SignupForm";
const Signup = () => {


  return (
    <Column className="signup" justify="center" gap="lg">
      <SignupForm />
    </Column>
  );
};

export default Signup;
