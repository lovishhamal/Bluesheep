import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Menu from './menu';
import Header from './header';

export default function Main({ children }) {
  return (
    <div class="bg-gray-100 font-family-karla flex">
      <Menu />
      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
}
