import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthLayout } from "./@ui/@layouts/authlayout";
import { Toaster } from "./components/ui/sonner";
import NoAuthLayout from "./@ui/@layouts/noAuthlayout";
import { AppLogin } from "./@ui/@components/appLogin";
// import { NoAuthLayout } from "./@ui/@layouts/noAuthlayout";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./@ui/utils/errorFallback";
import { AppSignup } from "./@ui/@components/appSignin";
import {AuthLayout} from "./@ui/@layouts/authlayout";
import { AppDashboard } from "./@ui/pages/appDashboard";
import { AppProfile } from "./@ui/pages/appProfile";
import { AppSettings } from "./@ui/pages/appSettings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          {/* not auth paths */}
          <Route path="/" element={<NoAuthLayout/>}>
            {/* <Route index element={<AppLogin />} /> */}
            <Route path="/" element={<AppLogin />}/>
            <Route path="/create-new-account" element={<AppSignup />} />
          </Route>
          {/* auth paths */}
           <Route path="/" element={<AuthLayout/>}>
            <Route path="/dashboard" element={<AppDashboard />} />
            <Route path="/profile" element={<AppProfile />} />
            <Route path="/settings" element={<AppSettings />} />

          </Route>     
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
