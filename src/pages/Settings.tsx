
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Acme Corporation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-employee">New Employee Alerts</Label>
              <Switch id="new-employee" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="leave-requests">Leave Request Notifications</Label>
              <Switch id="leave-requests" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-reports">Weekly Reports</Label>
              <Switch id="weekly-reports" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input id="api-endpoint" defaultValue="https://api.company.com/v1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Request Timeout (seconds)</Label>
              <Input id="timeout" type="number" defaultValue="30" />
            </div>
            <Button variant="outline">Test Connection</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="session-timeout">Auto Session Timeout</Label>
              <Switch id="session-timeout" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Input id="password-policy" defaultValue="Minimum 8 characters, 1 uppercase, 1 number" />
            </div>
            <Button variant="destructive">Reset All Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
