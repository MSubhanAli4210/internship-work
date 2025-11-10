import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./@core/@tanstack/clientQueryProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./@ui/utils/errorFallback";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <QueryProvider>
      <App />
    </QueryProvider>
  </ErrorBoundary>
);
