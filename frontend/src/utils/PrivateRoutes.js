import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
