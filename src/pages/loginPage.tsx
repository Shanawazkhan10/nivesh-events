import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const { currentUser, loading } = useAuth();

  // If already logged in, redirect to dashboard
  if (!loading && currentUser) {
    // return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to EventDash</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to view your event analytics
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;