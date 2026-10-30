// src/routes/AppNavigator.jsx
import { Routes, Route } from 'react-router-dom';

// Import Security Helper
import ProtectedRoute from '../components/ProtectedRoute';

// Import Pages
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import ReportItem from '../pages/ReportItem';
import MyClaims from '../pages/MyClaims';
import Register from '../pages/Register';

export default function AppNavigator() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Feed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes (Require Login) */}
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            <ReportItem />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-claims" 
        element={
          <ProtectedRoute>
            <MyClaims />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}