import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ScreensPage from "./pages/Screens/ScreensPage";
import PlaylistsPage from "./pages/Playlists/PlaylistsPage";
import { AuthProvider, useAuth } from "./hooks/useAuth";

function Protected({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/screens"
          element={
            <Protected>
              <ScreensPage />
            </Protected>
          }
        />
        <Route
          path="/playlists"
          element={
            <Protected>
              <PlaylistsPage />
            </Protected>
          }
        />
        <Route path="/" element={<Navigate to="/screens" />} />
      </Routes>
    </AuthProvider>
  );
}
