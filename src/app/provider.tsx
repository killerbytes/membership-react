import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
        {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
      </QueryClientProvider>
    </React.Suspense>
  );
};
