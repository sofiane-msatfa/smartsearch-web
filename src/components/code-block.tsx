import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { ScrollArea } from "./ui/scroll-area"


interface CodeBlockProps {
  code?: unknown;
  className?: string;
  loading?: boolean;
}

export default function CodeBlock({
  code,
  loading,
  className,
}: CodeBlockProps) {
  return (
    <ScrollArea
      className={cn(
        "flex flex-1 items-center rounded-lg border border-dashed shadow-sm h-96",
        className
      )}
    >
      <div className="flex flex-col gap-1 w-full">
        {loading ? (
          <Spinner size="medium" />
        ) : (
          <pre className="text-sm text-left p-4">
            {JSON.stringify(code, null, 2)}
          </pre>
        )}
      </div>
    </ScrollArea>
  );
}
