import React from "react";
import BottomSheet from "../BottomSheet/BottomSheet";
import "./BottomSignup.scss";
import { Column } from "../Layout/Layout";
import SignupForm from "./SignupForm";

const BottomSignup = ({ open, handleClose }) => {
  return (
    <BottomSheet open={open} onClose={handleClose}>
      <Column className="bottomsignup">
      
        <SignupForm />
      </Column>
    </BottomSheet>
  );
};

export default BottomSignup;
