import React, { useState } from 'react';
import './style.css';
import { Route } from 'react-router-dom';
import Menu from './menu';
import { getToken } from '../utils';
import jwtDecode from 'jwt-decode';

export default function Main({
  component: Component,
  layout: Layout,
  ...rest
}) {
  const token = getToken();
  const profile = token ? jwtDecode(token) : '';

  return (
    <div class="bg-gray-100 font-family-karla flex">
      <Menu />
      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <Layout token={token} profile={profile ? profile.data : ''} />
        <Route
          {...rest}
          render={(props) => (
            <Component
              {...props}
              token={token}
              admin={true}
              profile={profile ? profile.data : ''}
            />
          )}
        />
      </div>
    </div>
  );
}
