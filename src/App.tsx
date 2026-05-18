import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CityScene from "./components/CityScene";
import LandingPage from "./pages/LandingPage";
import RoleSelectPage from "./pages/RoleSelectPage";
import AreaSelectPage from "./pages/AreaSelectPage";
import ProjectInputPage from "./pages/ProjectInputPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 3D City Background */}
        <CityScene />
        
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-select" element={<RoleSelectPage />} />
          <Route path="/area-select" element={<AreaSelectPage />} />
          <Route path="/project-input" element={<ProjectInputPage />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
