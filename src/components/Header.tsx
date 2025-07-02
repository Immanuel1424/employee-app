
import React from 'react';
import { Building2, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">Employee Management System</h1>
          </div>
          <div className="flex items-center">
            <User className="h-6 w-6 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Welcome, Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
