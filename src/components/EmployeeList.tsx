
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmployeeCard from './EmployeeCard';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        department: 'Engineering',
        position: 'Senior Software Engineer',
        location: 'New York, NY',
        joinDate: '2022-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        phone: '+1 (555) 234-5678',
        department: 'Marketing',
        position: 'Marketing Manager',
        location: 'Los Angeles, CA',
        joinDate: '2021-11-20',
        status: 'active'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        phone: '+1 (555) 345-6789',
        department: 'HR',
        position: 'HR Specialist',
        location: 'Chicago, IL',
        joinDate: '2023-03-10',
        status: 'active'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        phone: '+1 (555) 456-7890',
        department: 'Finance',
        position: 'Financial Analyst',
        location: 'Boston, MA',
        joinDate: '2022-07-05',
        status: 'inactive'
      }
    ];

    setTimeout(() => {
      setEmployees(mockEmployees);
      setFilteredEmployees(mockEmployees);
      setLoading(false);
      toast({
        title: "Employees loaded",
        description: `Successfully loaded ${mockEmployees.length} employees`,
      });
    }, 1000);
  }, [toast]);

  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(emp => emp.department === departmentFilter);
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, departmentFilter, employees]);

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No employees found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
