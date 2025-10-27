import React, { useCallback, useState } from "react";
import { Box, Column } from "../Layout/Layout";
import ThemedText from "../ThemedText/ThemedText";
import "./Signup.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { validators } from "../../utils/input.utils";
import SignupForm from "./SignupForm";
const Signup = () => {


  return (
    <Column className="signup" justify="center" gap="lg">
      <SignupForm />
    </Column>
  );
};

export default Signup;
