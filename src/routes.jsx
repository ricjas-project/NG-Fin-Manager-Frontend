import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
	<Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
	 {userRole === "admin" && <Route path="/admin" element={<AdminPanel />} />}
        {userRole === "admin" && <Route path="/fake-kyc" element={<FakeKYC />} />}
        {userRole === "admin" && <Route path="/iban-validation" element={<IBANValidation />} />}
        {userRole === "admin" && <Route path="/send-sms" element={<SendSMS />} />}
        {userRole === "admin" && <Route path="/exchange-rate" element={<ExchangeRate />} />}
{userRole === "admin" && <Route path="/user-location" element={<IpGeo />} />}

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;