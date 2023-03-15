import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoutes = ({ component: Component }) => {
  const { user } = useSelector((state) => state.auth);
  if (user && (user?.role === 100 || user?.role === 101)) return <Component />;
  return <Navigate to="/login" />;
};

export default AdminPrivateRoutes;
