import React from "react";
import { Stack } from "../Layout/Layout";
import "./Navbar.scss";
import Button from "../Button/Button";
import {ReactComponent as Logo} from '../../assets/svgs/Logo.svg'

const Navbar = ({ handleClose }) => {
  return (
    <Stack className="navbar" justify='space-between'>
        <div className="navbar_logo">
            <Logo className='navbar_logo' />
        </div>
        <div className="navbar_button">

        <Button secondary onClick={handleClose}>Start</Button>
        </div>
    </Stack>
  );
};

export default Navbar;
