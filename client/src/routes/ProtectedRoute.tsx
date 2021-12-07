import React, { useContext } from 'react';
import { UserContext } from '../context';
import { Outlet, Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';

export const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <Loader />;

  return state.data ? <Outlet /> : <Navigate to="/" />;
};
