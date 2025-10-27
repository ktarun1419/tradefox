import React from "react";
import { Column, Stack } from "../Layout/Layout";
import ThemedText from "../ThemedText/ThemedText";

const Card = ({details}) => {
  return (
    <Column className="card_layout">
      <Stack gap="xs">
        <ThemedText.body colorVariant='secondary'>{details.name}</ThemedText.body> <ThemedText.small colorVariant='light'>{details.title}</ThemedText.small>
      </Stack>
      <ThemedText.body colorVariant='secondary'>"{details.content}"</ThemedText.body>
    </Column>
  );
};

export default Card;
