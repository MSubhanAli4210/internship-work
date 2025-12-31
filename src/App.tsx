import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import AuthLayout from "./@ui/@layouts/authlayout";
import { AppLogin } from "./@ui/@components/appLogin";
import { AppSignup } from "./@ui/@components/appSignup";

import { NoAuthLayout } from "./@ui/@layouts/noAuthlayout";
import { AppDashboard } from "./@ui/pages/appDashboard";
import { AppProfile } from "./@ui/pages/appProfile";
import { AppSettings } from "./@ui/pages/appSettings";
import AppDeposit from "./@ui/pages/appDeposits";
import AppWithdraw from "./@ui/pages/appWithdraw";
import AppExpenses from "./@ui/pages/appExpenses";

import {
  ProtectedRoute,
  ProtectedAuthRoute,
  RoleProtectedRoute,
} from "./@ui/utils/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route
            index
            element={
              <ProtectedAuthRoute>
                <AppLogin />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="create-new-account"
            element={
              <ProtectedAuthRoute>
                <AppSignup />
              </ProtectedAuthRoute>
            }
          />
        </Route>

        {/* Protected routes */}
        <Route element={<NoAuthLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AppDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <AppProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AppSettings />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="deposits"
            element={
              <RoleProtectedRoute 
              allowedRoles={["admin", "user"]}
              >
                <AppDeposit />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="withdraw"
            element={
              <RoleProtectedRoute allowedRoles={["admin","user"]}>
                <AppWithdraw />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="expenses"
            element={
              <RoleProtectedRoute allowedRoles={["admin","user"]}>
                <AppExpenses />
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;