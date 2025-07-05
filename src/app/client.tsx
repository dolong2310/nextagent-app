"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Client = () => {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    })
  );

  return (
    <div>
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ text: "Longdoo" })}
      >
        Invoke background job
      </Button>
    </div>
  );
};

export default Client;
