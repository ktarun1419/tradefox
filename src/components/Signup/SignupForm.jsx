import React, { useCallback, useState } from "react";
import ThemedText from "../ThemedText/ThemedText";
import { Column } from "../Layout/Layout";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { validators } from "../../utils/input.utils";

const SignupForm = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const validateEmail = useCallback((v) => {
    return validators.required("Email is required.")(v) || validators.email("Enter a valid email.")(v);
  }, []);

  const handleSubmit = useCallback(() => {
    if (error) return;
    window.open("https://tradefox.live/", "_blank");
  }, [error]);
  return (
    <>
      <ThemedText.h3 colorVariant="light">
        Signup for <br />
        exclusive access
      </ThemedText.h3>
      <Column className="input_container" gap="sm">
        <Input type="email" placeholder="Your email address" value={email} defaultValue="" validate={validateEmail} required onChange={setEmail} setError={setError} />
        <Button disabled={error} onClick={handleSubmit}>
          Get Started
        </Button>
        <ThemedText.body colorVariant="secondary">You’ll receive an email with an invite link to join.</ThemedText.body>
      </Column>
    </>
  );
};

export default SignupForm;
