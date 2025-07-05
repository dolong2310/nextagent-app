import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert Next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    console.log("output: ", output);

    // const codeWriterAgent = createAgent({
    //   name: "codeWriter",
    //   system: "You are an expert code writer.",
    //   model: anthropic({ model: "claude-3-5-sonnet-latest", defaultParameters: { max_tokens: 100 } }),
    // });

    return { output };
  }
);
