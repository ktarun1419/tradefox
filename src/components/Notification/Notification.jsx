import React from "react";
import { Column, Stack } from "../Layout/Layout";
import ThemedText from "../ThemedText/ThemedText";
// import BellIcon from "../../assets/svgs/Bell.svg";
import { ReactComponent as Bell } from '../../assets/svgs/Bell.svg';
import './Notification.scss';
import CardCarousel from "./CardsCarousel";

const Notification = () => {
  return (
    <Stack className="notification">
      <Column className="content" gap="sm">
       <Bell />
        <ThemedText.h3 colorVariant="primary" weight="normal">
          {" "}
          Get notified when a highly correlated whale makes a move
        </ThemedText.h3>
        <ThemedText.body colorVariant="xlight">
          Find out when a certain whale moves more than any preset amount on-chain or when a dormant whale you care about becomes active.
        </ThemedText.body>
      </Column>
      <CardCarousel />
    </Stack>
  );
};

export default Notification;
