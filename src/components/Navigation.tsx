
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/employees', label: 'Employees', icon: Users },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm border-r min-h-screen w-64">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
