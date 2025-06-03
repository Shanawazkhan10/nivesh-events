import React, { useState, useEffect, useRef } from 'react';
import { Activity, Users, ShoppingCart, MousePointer, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EventCountCard from '../components/dashboard/EventCountCard';
import EventChart from '../components/dashboard/EventChart';
import EventTable from '../components/dashboard/EventTable';
import axios from 'axios';
const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
  const hasFetched = useRef(false);



  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, we'd fetch user-specific data
        const userId = currentUser?.uid;

        // This is mock data for demonstration purposes
        // In a real app, this would come from the Supabase database
        const mockEventData = [
          { id: '1', name: 'User Registration', category: 'Signup', created_at: '2025-03-01T12:00:00Z', description: 'New user registered via email' },
          { id: '2', name: 'Product Purchase', category: 'Purchase', created_at: '2025-03-02T14:30:00Z', description: 'User purchased premium plan' },
          { id: '3', name: 'Login Event', category: 'Login', created_at: '2025-03-03T09:15:00Z', description: 'User logged in from mobile device' },
          { id: '4', name: 'Page View', category: 'Page_View', created_at: '2025-03-03T10:45:00Z', description: 'User viewed pricing page' },
          { id: '5', name: 'Button Click', category: 'Click', created_at: '2025-03-04T16:20:00Z', description: 'User clicked sign up button' },
          { id: '6', name: 'Login Event', category: 'Login', created_at: '2025-03-05T08:10:00Z', description: 'User logged in from desktop' },
          { id: '7', name: 'Page View', category: 'Page_View', created_at: '2025-03-05T11:30:00Z', description: 'User viewed dashboard' },
          { id: '8', name: 'User Registration', category: 'Signup', created_at: '2025-03-06T13:45:00Z', description: 'New user registered via Google' },
          { id: '9', name: 'Product Purchase', category: 'Purchase', created_at: '2025-03-07T15:15:00Z', description: 'User upgraded to business plan' },
          { id: '10', name: 'Button Click', category: 'Click', created_at: '2025-03-08T09:50:00Z', description: 'User clicked help button' },
        ];
        if (hasFetched.current) return;

        hasFetched.current = true;
        const fetchData = async () => {
          try {
            const res = await axios.get('/api/events-summary?start=2025-05-08&end=2025-05-08');
            console.log('✅ API Response:', res.data); // 👈 This logs the data
            // setSummaryData(res.data.data)
            setEvents(res.data.data);
            const counts: Record<string, number> = {};
            res.data.data.forEach(event => {
              const eventname = event?.eventname?.toLowerCase();
              counts[eventname] = (counts?.[eventname] || 0) + 1;
            });
            setEventCounts(counts);
          } catch (err) {
            console.error('❌ API Error:', err);
          }
        };

        fetchData();
        // Count events by category

        // In a real app, we would fetch from Supabase like this:
        // const eventData = await fetchEvents(userId);
        // const eventCountData = await fetchEventCounts(userId);
        // setEvents(eventData);
        // setEventCounts(eventCountData);

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentUser]);

  // Prepare chart data
  const barChartData = {
    labels: ['Signup', 'Login', 'Purchase', 'Page View', 'Click'],
    datasets: [
      {
        label: 'Event Count',
        data: [
          eventCounts['signup'] || 0,
          eventCounts['login'] || 0,
          eventCounts['purchase'] || 0,
          eventCounts['page_view'] || 0,
          eventCounts['click'] || 0,
        ],
        backgroundColor: [
          'rgba(66, 133, 244, 0.7)', // Google blue
          'rgba(52, 168, 83, 0.7)',  // Google green
          'rgba(251, 188, 5, 0.7)',  // Google yellow
          'rgba(234, 67, 53, 0.7)',  // Google red
          'rgba(102, 102, 102, 0.7)', // Gray
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Signup', 'Login', 'Purchase', 'Page View', 'Click'],
    datasets: [
      {
        label: 'Event Distribution',
        data: [
          eventCounts['signup'] || 0,
          eventCounts['login'] || 0,
          eventCounts['purchase'] || 0,
          eventCounts['page_view'] || 0,
          eventCounts['click'] || 0,
        ],
        backgroundColor: [
          'rgba(66, 133, 244, 0.7)', // Google blue
          'rgba(52, 168, 83, 0.7)',  // Google green
          'rgba(251, 188, 5, 0.7)',  // Google yellow
          'rgba(234, 67, 53, 0.7)',  // Google red
          'rgba(102, 102, 102, 0.7)', // Gray
        ],
        borderColor: [
          'rgba(66, 133, 244, 1)',
          'rgba(52, 168, 83, 1)',
          'rgba(251, 188, 5, 1)',
          'rgba(234, 67, 53, 1)',
          'rgba(102, 102, 102, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-pulse-slow flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary-200 dark:bg-primary-800 mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center p-6 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Error Loading Dashboard</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Overview of event activity and analytics
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <EventCountCard
          title="Total Events"
          count={events.length}
          icon={<Activity size={24} className="text-white" />}
          color="bg-primary-500"
          change={12}
        />

        <EventCountCard
          title="Signups"
          count={eventCounts['signup'] || 0}
          icon={<Users size={24} className="text-white" />}
          color="bg-success-500"
          change={5}
        />

        <EventCountCard
          title="Purchases"
          count={eventCounts['purchase'] || 0}
          icon={<ShoppingCart size={24} className="text-white" />}
          color="bg-accent-500"
          change={-3}
        />

        <EventCountCard
          title="Logins"
          count={eventCounts['login'] || 0}
          icon={<LogIn size={24} className="text-white" />}
          color="bg-secondary-500"
          change={8}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventChart
          type="bar"
          title="Event Distribution"
          data={barChartData}
        />

        <EventChart
          type="doughnut"
          title="Event Types"
          data={doughnutChartData}
        />
      </div>

      {/* Recent Events Table */}
      <EventTable events={events} />
    </div>
  );
};

export default Dashboard;