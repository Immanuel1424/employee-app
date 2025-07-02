
import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {employee.name}
          </CardTitle>
          <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
            {employee.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <p className="text-xs text-blue-600 font-medium">{employee.department}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{employee.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
