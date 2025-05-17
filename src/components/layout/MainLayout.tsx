import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Wallet from '@/components/ui-elements/Wallet'

const MainLayout = () => {
  return (
    <div className="space-bg flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 relative z-10">
        <div className="flex justify-end mb-6">
          <Wallet />
        </div>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
