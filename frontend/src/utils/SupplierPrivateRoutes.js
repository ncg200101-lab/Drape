import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SupplierPrivateRoutes = ({ component: Component }) => {
  const { user } = useSelector((state) => state.auth);
  if (user && (user?.role === 100 || user?.role === 103)) return <Component />;
  return <Navigate to="/login" />;
};

export default SupplierPrivateRoutes;
