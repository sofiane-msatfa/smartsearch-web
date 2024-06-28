import { useGetProjects } from "@/api/projects";
import CodeBlock from "@/components/code-block";
import { CreateProjectForm } from "@/components/forms/projects/create-project";

export function ProjectPage() {
  const { data, isPending } = useGetProjects();

  return (
    <div>
      <h1 className="mb-8">Projets</h1>
      <CreateProjectForm />
      <CodeBlock code={data} loading={isPending} className="mt-8" />
    </div>
  );
}
