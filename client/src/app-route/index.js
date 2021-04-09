import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { getToken } from '../utils';
import jwtDecode from 'jwt-decode';

export default function Index({
  component: Component,
  layout: Layout,
  ...rest
}) {
  const token = getToken();
  const profile = token ? jwtDecode(token) : '';
  return (
    <div>
      <Layout token={token} profile={profile ? profile.data : ''} />
      <Route
        {...rest}
        render={(props) => (
          <Component {...props} token={token} profile={profile} />
        )}
      />
    </div>
  );
}
