import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // This is a download step
    await step.sleep("wait-a-moment", "5s");

    // This is a transcript step
    await step.sleep("wait-a-moment", "5s");

    // This is a summary step
    await step.sleep("wait-a-moment", "5s");

    return { message: `Hello ${event.data.email}!` };
  }
);
