// main.tsx
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createClient, Session } from "@supabase/supabase-js";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { supabase } from "./lib/utils";

import App from "./App.tsx";
import Login from "./Login.tsx";
import { ErrorFallback } from "./ErrorFallback.tsx";

import "./main.css";
import "./styles/theme.css";
import "./index.css";
import Logout from "./logout.tsx";

function Root() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <App /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={session ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/logout" element={session ? <Logout /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Root />
  </ErrorBoundary>,
);
