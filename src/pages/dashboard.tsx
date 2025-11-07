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
  const fetchData = async (dateRangeParam?: { from: Date | null; to: Date | null }) => {
    try {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];

      // 🔍 Extract from/to safely from param or fallback to state
      const startDate =
        dateRangeParam?.from?.toISOString().split("T")[0]  ||
        formattedToday;

      const endDate =
        dateRangeParam?.to?.toISOString().split("T")[0]  ||
        formattedToday;

      console.log("📅 Using Dates =>", { startDate, endDate });

      const res = await axios.get(
        `https://trk.nivesh.com/api/events-summary?start=${startDate}&end=${endDate}`
      );

      console.log("✅ API Response:", JSON.stringify(res.data.data, null, 2));

      const rawEvents = res.data.data || [];

      const formattedEvents = rawEvents.map((e: any, index: number) => ({
        id: String(index + 1),
        name: e.eventname || "Unknown Event",
        category: e.eventname?.toLowerCase().replace(/\s+/g, "_") || "unknown",
        created_at: e.event_date,
        description: `Count: ${e.count}`,
      }));

      setEvents(formattedEvents);

      // ✅ Count by event name
      const counts: Record<string, number> = {};
      rawEvents.forEach((event: any) => {
        const eventname = event?.eventname?.toLowerCase();
        counts[eventname] = (counts[eventname] || 0) + 1;
      });
      setEventCounts(counts);
    } catch (err) {
      console.error("❌ API Error:", err);
    }
  };

useEffect(() => {
  const loadData = async () => {
    try {
      if (hasFetched.current) return; // ⛔ move this check to the TOP
      setIsLoading(true);
      setError(null);

      await fetchData(); // ✅ wait for API call to finish
      hasFetched.current = true;

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
  // 🧠 Step 1: Extract event labels and counts dynamically
  const labels = events?.map((e) => e.name);
  const dataValues = events?.map((e) => {
    // description = "Count: 644" → extract number
    const match = e.description.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  });

  // 🧩 Step 2: Generate colors dynamically (so each event looks unique)
  const generateColors = (count) =>
    Array.from({ length: count }, (_, i) => {
      const hue = (i * 37) % 360; // different hue each time
      return `hsla(${hue}, 70%, 55%, 0.7)`;
    });

  const backgroundColors = generateColors(events?.length);
  const borderColors = backgroundColors.map((c) =>
    c.replace("0.7", "1") // solid version for border
  );

  // 🎨 Step 3: Create dynamic chart data
  const barChartData = {
    labels,
    datasets: [
      {
        label: "Event Count",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels,
    datasets: [
      {
        label: "Event Distribution",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
      <EventTable events={events} fetchData={(data) => fetchData(data)} />
    </div>
  );
};

export default Dashboard;