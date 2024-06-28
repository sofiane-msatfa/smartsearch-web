import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages";
import { AuthGuard } from "./components/guards/auth-guard";
import { GuestGuard } from "./components/guards/guest-guard";
// auth
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
// dashboard
import { DashboardLayout } from "./components/layouts/dashboard-layout";
import { DashboardPage } from "./pages/dashboard";
import { ResearcherPage } from "./pages/dashboard/researchers";
import { PublicationPage } from "./pages/dashboard/publications";
import { ProjectPage } from "./pages/dashboard/projects";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<GuestGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/dashboard" element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route element={<AuthGuard />}>
              <Route path="researchers" element={<ResearcherPage />} />
              <Route path="publications" element={<PublicationPage />} />
              <Route path="projects" element={<ProjectPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
