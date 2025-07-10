import ProjectView from "@/modules/projects/ui/views/ProjectView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: "Project",
};

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const Project = async ({ params }: Props) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );
  await queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReactErrorBoundary fallback={<div>Error project</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </ReactErrorBoundary>
    </HydrationBoundary>
  );
};

export default Project;
