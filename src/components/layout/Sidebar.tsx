
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, CreditCard, Users, Landmark } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ to, icon, children }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen glass fixed left-0 top-0 p-4 z-20">
      <div className="flex flex-col h-full">
        <div className="flex justify-center mb-10">
          <NavLink to="/" className="inline-block">
            <div className="w-40 h-40 flex items-center justify-center">
              <img src="/assets/logo.svg" alt="Sollynx Logo" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            </div>
          </NavLink>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <SidebarLink to="/dashboard" icon={<BarChart3 className="w-5 h-5" />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/payment" icon={<CreditCard className="w-5 h-5" />}>
            Payment
          </SidebarLink>
          <SidebarLink to="/distribution" icon={<Users className="w-5 h-5" />}>
            Distribution
          </SidebarLink>
          <SidebarLink to="/vault" icon={<Landmark className="w-5 h-5" />}>
            Vault
          </SidebarLink>
        </nav>

        <div className="mt-auto text-center text-xs text-slate-500">
          <p>Sollynx v1.0</p>
          <p>Powering SME Finances</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
