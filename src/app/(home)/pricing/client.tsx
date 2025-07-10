"use client";

import useCurrentTheme from "@/hooks/useCurrentTheme";
import { PricingTable as PricingTableClerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const PricingTable = () => {
  const currentTheme = useCurrentTheme();
  return (
    <PricingTableClerk
      appearance={{
        elements: {
          pricingTableCard: "border! shadow-none! rounded-lg",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default PricingTable;
