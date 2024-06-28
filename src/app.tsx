import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthContextProvider } from "./contexts/auth/auth-provider";
import { ThemeProvider } from "./contexts/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Router } from "./router";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
