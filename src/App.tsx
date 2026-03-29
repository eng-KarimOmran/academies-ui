import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Layout/ProtectedLayout/ProtectedLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./Routes/Login/Login";
import Dashboard from "./Routes/Dashboard/Dashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
}

export default App;
