"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Client = () => {
  const router = useRouter();
  const trpc = useTRPC();

  const [value, setValue] = useState("");

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Project created successfully");
        router.push(`/projects/${data.id}`);
      },
      onError: () => {
        toast.error("Project created failed");
      },
    })
  );

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex items-center justify-center flex-col gap-4">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value })}
        >
          Invoke background job
        </Button>
      </div>
    </div>
  );
};

export default Client;
