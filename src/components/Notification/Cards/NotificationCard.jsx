import React from "react";
import { Column, Stack } from "../../Layout/Layout";
import ThemedText from "../../ThemedText/ThemedText";
import { ReactComponent as CardBell } from "../../../assets/svgs/CardBell.svg";
import "./Cards.scss";

const NotificationCard = () => {
  return (
    <>
      <Stack className="header" justify="space-between">
        <CardBell />
        <ThemedText.small colorVariant="secondary" hoverEffect>
          Save
        </ThemedText.small>
      </Stack>
      <Column className="notification_card_content" justify="flex-end" gap="sm">
        <ThemedText.small colorVariant="secondary">We’ll be sending notifications to you here</ThemedText.small>
        <input className="notification_card_content_input" />
      </Column>
    </>
  );
};

export default NotificationCard;
