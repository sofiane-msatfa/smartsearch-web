import { useAuth } from "@/contexts/auth/use-auth";
import { NavigationSidebar } from "./navigation-sidebar";
import { NavigationMobile } from "./navigation-mobile";
import { Button } from "../ui/button";
import { Link, Outlet } from "react-router-dom";
import { NavigationItem } from "./types";
import {
  HomeIcon,
  FileTextIcon,
  CardStackIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { ThemeModeToggle } from "../theme-mode-toggle";

const navigationItems: NavigationItem[] = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: PersonIcon,
    label: "Chercheurs",
    link: "/dashboard/researchers",
  },
  {
    icon: CardStackIcon,
    label: "Projets",
    link: "/dashboard/projects",
  },
  {
    icon: FileTextIcon,
    label: "Publications",
    link: "/dashboard/publications",
  },
];

export function DashboardLayout() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavigationSidebar items={navigationItems} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <NavigationMobile items={navigationItems} />
          <div className="flex gap-6 ml-auto md:grow-0">
            <ThemeModeToggle />
            {isAuthenticated ? (
              <Button onClick={signOut}>Deconnexion</Button>
            ) : (
              <Link to="/auth/login" className="text-white">
                <Button>Connexion</Button>
              </Link>
            )}
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
