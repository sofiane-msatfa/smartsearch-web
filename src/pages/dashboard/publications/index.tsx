import { useGetPublications } from "@/api/publications";
import CodeBlock from "@/components/code-block";
import { CreatePublicationForm } from "@/components/forms/publications/create-publication";

export function PublicationPage() {
  const { data, isPending } = useGetPublications();

  return (
    <div>
      <h1 className="mb-8">Publications</h1>
      <CreatePublicationForm />
      <CodeBlock code={data?.results} loading={isPending} className="mt-8" />
    </div>
  );
}
