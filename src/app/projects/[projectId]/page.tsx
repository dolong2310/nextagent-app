import React from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const Project = async ({ params }: Props) => {
  const { projectId } = await params;

  return <div>Project: {projectId}</div>;
};

export default Project;
