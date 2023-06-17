import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const isAuthenticated = !!localStorage.getItem('access_token'); // Check if access token exists

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
}
