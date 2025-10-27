import React from "react";
import { Column, Stack } from "../Layout/Layout";
import ThemedText from "../ThemedText/ThemedText";
import { ReactComponent as Eye } from "../../assets/svgs/Eye.svg";
import CohortImage from "../../assets/images/cohort.png";
import "./Cohort.scss";
const Cohort = () => {
  return (
    <Stack className="cohort" justify="space-between">
      <img className="image" src={CohortImage} />
      <Column className="content" gap="sm" align="flex-end">
        <Eye />
        <ThemedText.h3 className='content_heading' colorVariant="primary" weight="normal" align="right">
          {" "}
          Watch what the  whales are doing
        </ThemedText.h3>
        <ThemedText.body colorVariant="xlight" align="right">
          All whales are not equal. Know exactly  what the whales impacting YOUR portfolio are doing.
        </ThemedText.body>
      </Column>
    </Stack>
  );
};

export default Cohort;
