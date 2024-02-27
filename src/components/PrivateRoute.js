// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
  />
);

export default PrivateRoute;
