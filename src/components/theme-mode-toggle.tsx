import { useTheme } from "@/contexts/theme/use-theme";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Tooltip delayDuration={100} content="Switch Theme" side="bottom" triggerAsChild>
      <Button
        className="rounded-full w-8 h-8 bg-background"
        variant="secondary"
        size="icon"
        onClick={toggleTheme}
      >
        <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
        <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">Switch Theme</span>
      </Button>
    </Tooltip>
  );
}
