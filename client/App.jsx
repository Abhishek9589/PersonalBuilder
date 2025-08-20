import "./global.css";

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import About from "./pages/About";
import Templates from "./pages/Templates";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NotificationTestPage from "./pages/NotificationTest";

const queryClient = new QueryClient();

// Component to inject CSS for Sonner close button fix
const SonnerStyleFix = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Force close button positioning for Sonner */
      [data-sonner-toaster] [data-sonner-toast] button:last-child,
      [data-sonner-toaster] ol li button:last-child,
      li[data-sonner-toast] button:last-child {
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        width: 28px !important;
        height: 28px !important;
        background: rgba(0, 0, 0, 0.1) !important;
        border: 1px solid rgba(0, 0, 0, 0.2) !important;
        border-radius: 6px !important;
        z-index: 1000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 16px !important;
        color: #333 !important;
      }

      [data-sonner-toaster] [data-sonner-toast] button:last-child:hover,
      [data-sonner-toaster] ol li button:last-child:hover,
      li[data-sonner-toast] button:last-child:hover {
        background: rgba(0, 0, 0, 0.15) !important;
        transform: scale(1.05) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SonnerStyleFix />
      <Toaster
        position="bottom-right"
        expand={false}
        visibleToasts={5}
        duration={4000}
        gap={16}
        richColors={true}
        closeButton={true}
        offset={20}
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #E0E0E0',
            color: 'black',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '12px 42px 12px 16px',
            minWidth: '320px',
            maxWidth: '420px',
            marginBottom: '8px'
          },
          className: 'toast-notification'
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/about" element={<About />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notification-test" element={<NotificationTestPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
