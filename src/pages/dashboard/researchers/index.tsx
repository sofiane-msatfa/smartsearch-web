import { useGetResearchers } from "@/api/researchers";
import CodeBlock from "@/components/code-block";
import { CreateResearcherForm } from "@/components/forms/researchers/create-researcher";

export function ResearcherPage() {
  const { data, isPending } = useGetResearchers();

  return (
    <div>
      <h1 className="mb-8">Chercheurs</h1>
      <CreateResearcherForm />
      <CodeBlock code={data} loading={isPending} className="mt-8" />
    </div>
  );
}
