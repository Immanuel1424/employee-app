
import React from 'react';
import EmployeeList from '@/components/EmployeeList';

const Employees = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
        <p className="text-gray-600">Manage and view all employee information</p>
      </div>
      <EmployeeList />
    </div>
  );
};

export default Employees;
