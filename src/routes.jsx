import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import FakeKYC from "./pages/FakeKYC";
import IBANValidation from "./pages/IBANValidation";
import SendSMS from "./pages/SendSMS";
import ExchangeRate from "./pages/ExchangeRate";
import Profile from "./pages/Profile";
import IpGeo from "./pages/IpGeo";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" 
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
            <Route path="/fake-kyc" element={<FakeKYC />} />
            <Route path="/iban-validation" element={<IBANValidation />} />
            <Route path="/send-sms" element={<SendSMS />} />
            <Route path="/exchange-rate" element={<ExchangeRate />} />
            <Route path="/user-location" element={<IpGeo />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;