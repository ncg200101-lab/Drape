import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InventoryPrivateRoutes = ({ component: Component }) => {
  const { user } = useSelector((state) => state.auth);
  if (user && (user?.role === 100 || user?.role === 104)) return <Component />;
  return <Navigate to="/login" />;
};

export default InventoryPrivateRoutes;
