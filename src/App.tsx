import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { IntentProvider } from "@/contexts/IntentContext";
import "@/i18n";

import Index from "./pages/Index";
import IntentGateway from "./pages/IntentGateway";
import Residence from "./pages/Residence";
import Explore from "./pages/Explore";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VirtualTour from "./pages/VirtualTour";
import OwnInMauritius from "./pages/OwnInMauritius";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <IntentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/welcome" element={<IntentGateway />} />
              <Route path="/residence" element={<Residence />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/own-in-mauritius" element={<OwnInMauritius />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </IntentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
