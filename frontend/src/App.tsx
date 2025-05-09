import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/react-query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./app/contexts/AuthContext";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
