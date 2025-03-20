
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WixAppWrapper from "./components/WixAppWrapper";
import Dashboard from "./dashboard/dashboard";
import Settings from "./settings/settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WixAppWrapper>
        <BrowserRouter>
          <Routes>
            {/* Redirect from root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard Module */}
            <Route path="/dashboard/*" element={<Dashboard />} />
            
            {/* Settings Module */}
            <Route path="/settings/*" element={<Settings />} />
            
            {/* Catch-all for unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WixAppWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
