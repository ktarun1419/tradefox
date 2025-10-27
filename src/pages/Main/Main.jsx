import React, { useCallback, useState } from "react";
import { Stack } from "../../components/Layout/Layout";
import "./Main.scss";
import Signup from "../../components/Signup/Signup";
import Information from "../../components/Information/Information";
import Navbar from "../../components/Navbar/Navbar";
import BottomSignup from "../../components/Signup/BottomSignup";

const Main = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen((s) => !s);
  }, [setOpen]);
  return (
    <Stack className="main" gap="0">
      <Navbar handleClose={handleClose} />
      <Information />
      <Signup />
      <BottomSignup open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default Main;
