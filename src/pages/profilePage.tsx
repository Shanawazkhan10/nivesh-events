import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { User, Mail, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { currentUser, loading, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // If not logged in, redirect to login page
  if (!loading && !currentUser) {
    // return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse-slow flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary-200 dark:bg-primary-800 mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const avatarUrl = currentUser?.photoURL || 'https://via.placeholder.com/100';
  const displayName = currentUser?.displayName || 'User';
  const email = currentUser?.email;

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{displayName}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{email}</p>
                  {userProfile?.role && (
                    <div className="mt-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                        {userProfile.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Display Name
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                    <User size={18} className="text-gray-400 mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{displayName}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                    <Mail size={18} className="text-gray-400 mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <Key size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-800 dark:text-gray-200">••••••••</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-800 dark:text-gray-200">Not enabled</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" fullWidth>
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive email notifications about your account activity
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Marketing emails</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive updates about product news and features
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Data sharing</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Allow anonymous usage data to improve our service
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button>
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;