import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardPegawai from "./components/DashboardPegawai";
import ReportForm from "./components/ReportForm";
import DashboardAdmin from "./components/DashboardAdmin";
import News from "./components/News";
import AdminSettings from "./components/AdminSettings";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedRoute = ({ userType, allowedRoles, children }) => {
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [userType, setUserType] = useState("guest");

  return (
    <Router>
      <Navigation userType={userType} />
      <Routes>
        {/* Routes for guest */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<div>About Us Page</div>} />
        <Route path="/contact" element={<div>Contact Us Page</div>} />

        {/* Routes for pegawai */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userType={userType} allowedRoles={["pegawai"]}>
              <DashboardPegawai />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute userType={userType} allowedRoles={["pegawai"]}>
              <ReportForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute userType={userType} allowedRoles={["pegawai"]}>
              <News />
            </ProtectedRoute>
          }
        />

        {/* Routes for admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute userType={userType} allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-settings"
          element={
            <ProtectedRoute userType={userType} allowedRoles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={<Logout setUserType={setUserType} />}
        />

        {/* Fallback route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;