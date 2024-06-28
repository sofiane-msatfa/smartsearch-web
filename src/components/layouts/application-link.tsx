import { StitchesLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export function ApplicationLink() {
  return (
    <Link
      to="#"
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
    >
      <StitchesLogoIcon className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Smartsearch</span>
    </Link>
  );
}
