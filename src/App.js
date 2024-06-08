import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApp from "./renderinglogic/MainApp";
import DashboardApp from "./renderinglogic/DashboardApp";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import useUserData from "./renderinglogic/useUserData";
import { getBearerTokenFromCookies, getRoleFromCookies } from "./config";

function App() {
  const { isLoading } = useUserData();
  const role = getRoleFromCookies();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={role === "admin" ? <DashboardApp /> : <MainApp />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
