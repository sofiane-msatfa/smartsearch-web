import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ApplicationLink } from "./application-link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./types";

interface NavigationMobileProps {
  items: NavigationItem[];
}

function MobileNavigationLink({ item }: { item: NavigationItem }) {
  return (
    <NavLink
      to={item.link}
      className={({ isActive }) => {
        return cn(
          "flex items-center gap-4 px-2.5",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        );
      }}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </NavLink>
  );
}

export function NavigationMobile({ items }: NavigationMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" className="sm:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <ApplicationLink />
          {items.map((item) => (
            <MobileNavigationLink key={item.label} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
