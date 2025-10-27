import React from "react";
import { Column, Stack } from "../../Layout/Layout";
import ThemedText from "../../ThemedText/ThemedText";
import { ReactComponent as Clock } from "../../../assets/svgs/Clock.svg";
import Dropdown from "../../Dropdown/Dropdown";

const values = ["> 30 days"];

const ClockCard = () => {
  return (
    <>
      <Stack className="header" justify="space-between">
        <Clock />
        <input type="checkbox" />
      </Stack>
      <Column className="notification_card_content" justify="flex-end" gap="sm">
        <ThemedText.small colorVariant="secondary">Notify me when any wallet dormant for</ThemedText.small>
        <Dropdown options={values} defaultValue={"> 30 days"} size="sm" className="w" />
        <ThemedText.small colorVariant="secondary"> becomes active</ThemedText.small>
      </Column>
    </>
  );
};

export default ClockCard;
