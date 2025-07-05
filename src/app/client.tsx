"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const Client = (props: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.helloAi.queryOptions({ text: "Longdoo" })
  );

  return <div>HELLO {JSON.stringify(data)}</div>;
};

export default Client;
