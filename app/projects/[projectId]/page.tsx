import { ProjectDetails } from "@/app/_components/ProjectDetails";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectDetails projectId={projectId} />;
}
