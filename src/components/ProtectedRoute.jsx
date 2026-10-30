// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login while saving the page they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}