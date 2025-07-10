"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextAreaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";
import { PROJECT_TEMPLATES } from "../../constants";
import { useClerk } from "@clerk/nextjs";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});

const ProjectForm = () => {
  const router = useRouter();
  const clerk = useClerk();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        // form.reset();
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        queryClient.invalidateQueries(trpc.usage.status.queryOptions());
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create project");

        if (error.data?.code === "UNAUTHORIZED") {
          // Redirect to sign in page if not authenticated
          clerk.openSignIn();
        }

        if (error.data?.code === "TOO_MANY_REQUESTS") {
          router.push("/pricing");
        }
      },
    })
  );
  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) => {
    form.setValue("value", value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <Form {...form}>
      <section className="space-y-6">
        <form
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-xs"
          )}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => {
              return (
                <TextAreaAutosize
                  {...field}
                  minRows={2}
                  maxRows={8}
                  className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                  placeholder="What would you like to build?"
                  disabled={isPending}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              );
            }}
          />

          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="flex items-center text-[10px] text-muted-foreground font-mono">
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-[1rem]">&#8984;</span> + Enter
              </kbd>
              &nbsp;to submit
            </div>

            <Button
              type="submit"
              className={cn(
                "size-8 rounded-full",
                isButtonDisabled && "bg-muted-foreground border"
              )}
              disabled={isButtonDisabled}
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </div>
        </form>

        <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
          {PROJECT_TEMPLATES.map((template) => {
            return (
              <Button
                key={template.title}
                variant="outline"
                size="sm"
                className="bg-white dark:bg-sidebar"
                onClick={() => onSelect(template.prompt)}
              >
                {template.emoji} {template.title}
              </Button>
            );
          })}
        </div>
      </section>
    </Form>
  );
};

export default ProjectForm;
