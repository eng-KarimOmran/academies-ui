import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Layout/ProtectedLayout/ProtectedLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./Routes/Login/Login";
import Dashboard from "./Routes/Dashboard/Dashboard";

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
    </BrowserRouter>
  );
}

export default App;
