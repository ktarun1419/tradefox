import React from "react";
import { Column, Stack } from "../../Layout/Layout";
import ThemedText from "../../ThemedText/ThemedText";
import { ReactComponent as BarChart } from "../../../assets/svgs/BarChart.svg";
import Dropdown from "../../Dropdown/Dropdown";

const amounts = [ 1000, 2000, 3000];

const FundCard = () => {
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <>
      <Stack className="header" justify="space-between">
        <BarChart />
        <input type="checkbox" />
      </Stack>
      <Column className="notification_card_content" justify="flex-end" gap="sm" >
        <ThemedText.small colorVariant="secondary">Notify me when any wallets move more than</ThemedText.small>

        <Dropdown
          options={amounts}
          defaultValue={1000}
          getOptionLabel={(n) => fmt.format(n)}
          // getOptionValue default works for primitives
          size="sm"
          className="w"
        />
        <div></div>
      </Column>
    </>
  );
};

export default FundCard;
