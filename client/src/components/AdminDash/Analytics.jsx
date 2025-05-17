import { useEffect, useState } from "react";
import {
  BarChart as BarChartIcon,
  Package,
  Check,
  DollarSign,
  Calendar,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Users,
  MessageSquare,
  UserPlus,
  PieChart as PieChartIcon,
  Activity,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RechartPieChart, 
  Pie, 
  Cell, 
  AreaChart,
  Area,
  Line 
} from "recharts";

const COLORS = [
  "#C0526F", "#9C2A46", "#E3637F", "#D43E62", "#F27F97", 
  "#B03655", "#F9A7B8", "#7A1F38", "#FFC0CB", "#5C162B"
];

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    userStats: { total: 0, gymOwners: 0, nurseryOwners: 0, regularUsers: 0, newUsersThisMonth: 0 },
    bookingStats: { total: 0, pending: 0, accepted: 0, rejected: 0, revenue: 0 },
    facilityStats: { totalGyms: 0, totalNurseries: 0, pendingGyms: 0, pendingNurseries: 0 },
    reviewStats: { total: 0, avgRating: 0 },
    contactStats: { total: 0 },
    monthlyData: [],
    userTypeDistribution: [],
    bookingStatusDistribution: [],
    facilityDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodFilter, setPeriodFilter] = useState("6months");

  // Fetch data
  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockAnalytics = {
        userStats: { total: 342, gymOwners: 56, nurseryOwners: 41, regularUsers: 245, newUsersThisMonth: 28 },
        bookingStats: { total: 873, pending: 42, accepted: 764, rejected: 67, revenue: 36540 },
        facilityStats: { totalGyms: 97, totalNurseries: 65, pendingGyms: 12, pendingNurseries: 8 },
        reviewStats: { total: 456, avgRating: 4.2 },
        contactStats: { total: 189 },
        monthlyData: [
          { name: "Jan", users: 120, bookings: 45, revenue: 4500 },
          { name: "Feb", users: 150, bookings: 56, revenue: 5300 },
          { name: "Mar", users: 190, bookings: 68, revenue: 6800 },
          { name: "Apr", users: 230, bookings: 89, revenue: 8200 },
          { name: "May", users: 280, bookings: 102, revenue: 9500 },
          { name: "Jun", users: 320, bookings: 134, revenue: 12400 },
        ],
        userTypeDistribution: [
          { name: "Users", value: 245 },
          { name: "Gym Owners", value: 56 },
          { name: "Nursery Owners", value: 41 },
        ],
        bookingStatusDistribution: [
          { name: "Accepted", value: 764 },
          { name: "Pending", value: 42 },
          { name: "Rejected", value: 67 },
        ],
        facilityDistribution: [
          { name: "Gyms", value: 97 },
          { name: "Nurseries", value: 65 },
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (err) {
      setError("Failed to fetch analytics data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'JOD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Filter data based on period
  const filterData = () => {
    if (periodFilter === "6months") {
      return analytics.monthlyData.slice(0, 6);
    } else if (periodFilter === "3months") {
      return analytics.monthlyData.slice(0, 3);
    } else {
      return analytics.monthlyData;
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-[#C0526F] p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-white opacity-90">
              Monitor platform performance and user metrics
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Link
              to="/admin"
              className="bg-[#9C2A46] bg-opacity-70 px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-opacity-90 transition-colors flex items-center justify-center text-white text-xs sm:text-sm"
            >
              <ChevronLeft size={14} className="mr-1" /> 
              <span className="hidden xs:inline">Back to Dashboard</span>
              <span className="xs:hidden">Back</span>
            </Link>
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="bg-[#9C2A46] px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-opacity-90 transition-colors flex items-center justify-center text-white text-xs sm:text-sm"
            >
              {loading ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              )}
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-3 sm:mb-4 p-3 bg-[#F9A7B8] border-l-4 border-[#9C2A46] rounded-r">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C2A46] mr-2" />
            <p className="text-xs sm:text-sm text-[#7A1F38]">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C0526F]"></div>
          <p className="ml-3 text-sm sm:text-base text-[#C0526F]">Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards - Responsive Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <StatCard 
              title="Total Users" 
              value={analytics.userStats.total} 
              description={`+${analytics.userStats.newUsersThisMonth} new this month`} 
              icon={<Users size={18} className="text-[#9C2A46]" />}
              color="#F9A7B8"
            />
            <StatCard 
              title="Completed Bookings" 
              value={analytics.bookingStats.accepted} 
              description="Total completed" 
              icon={<Check size={18} className="text-[#9C2A46]" />}
              color="#F9A7B8"
            />
            <StatCard 
              title="Total Revenue" 
              value={formatCurrency(analytics.bookingStats.revenue)} 
              description="From all bookings" 
              icon={<DollarSign size={18} className="text-[#9C2A46]" />}
              color="#F9A7B8"
            />
          </div>

          {/* Filter Controls */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-3 sm:mb-4 flex flex-wrap justify-between items-center border border-[#F9A7B8]">
            <div className="flex items-center mb-2 sm:mb-0">
              <BarChartIcon size={18} className="text-[#9C2A46] mr-2" />
              <h2 className="text-base sm:text-lg font-semibold text-[#9C2A46]">Analytics Charts</h2>
            </div>
            <div className="flex space-x-2">
              <select
                className="bg-[#F9A7B8] border border-[#C0526F] text-[#9C2A46] text-xs sm:text-sm rounded-lg p-1 sm:p-2"
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
              >
                <option value="12months">Last 12 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="3months">Last 3 Months</option>
              </select>
            </div>
          </div>

          {/* Main Charts - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* User & Booking Chart */}
            <ChartCard 
              title="User & Booking Growth" 
              description="Monthly growth trends" 
              icon={<Calendar size={16} className="text-[#9C2A46]" />}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filterData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F9A7B8" />
                  <XAxis dataKey="name" stroke="#9C2A46" />
                  <YAxis yAxisId="left" orientation="left" stroke="#9C2A46" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9C2A46" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#F9A7B8',
                      borderColor: '#9C2A46',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="users" name="Users" fill="#C0526F" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#9C2A46" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Revenue Trend Chart */}
            <ChartCard 
              title="Revenue Trend" 
              description="Monthly revenue analysis" 
              icon={<DollarSign size={16} className="text-[#9C2A46]" />}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filterData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F9A7B8" />
                  <XAxis dataKey="name" stroke="#9C2A46" />
                  <YAxis stroke="#9C2A46" />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: '#F9A7B8',
                      borderColor: '#9C2A46',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#9C2A46"
                    strokeWidth={2}
                    name="Revenue"
                    activeDot={{ r: 6, stroke: '#C0526F', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Revenue Area Chart - Full Width */}
          <ChartCard 
            title="Revenue Analysis" 
            description="Monthly revenue trend from bookings" 
            icon={<DollarSign size={16} className="text-[#9C2A46]" />}
            className="mb-3 sm:mb-4"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filterData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F9A7B8" />
                <XAxis dataKey="name" stroke="#9C2A46" />
                <YAxis stroke="#9C2A46" />
                <Tooltip 
                  formatter={(value) => [`${value} JOD`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: '#F9A7B8',
                    borderColor: '#9C2A46',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="#F9A7B8"
                  fillOpacity={0.5}
                  stroke="#9C2A46"
                  strokeWidth={2}
                  name="Revenue (JOD)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Distribution Charts - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <DistributionChart 
              title="User Types" 
              data={analytics.userTypeDistribution} 
              icon={<Users size={16} className="text-[#9C2A46]" />}
            />
            <DistributionChart 
              title="Booking Status" 
              data={analytics.bookingStatusDistribution} 
              icon={<Activity size={16} className="text-[#9C2A46]" />}
            />
            <DistributionChart 
              title="Facility Types" 
              data={analytics.facilityDistribution} 
              icon={<Package size={16} className="text-[#9C2A46]" />}
            />
          </div>

          {/* Detailed Stats - Responsive Grid */}
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#F9A7B8] mb-3 sm:mb-4">
            <div className="mb-3 sm:mb-4 border-b border-[#F9A7B8] pb-3">
              <h3 className="text-base sm:text-lg font-semibold text-[#9C2A46]">Detailed Statistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <StatsSection 
                title="User Statistics" 
                icon={<Users size={16} className="text-[#9C2A46]" />}
                items={[
                  { label: "Total Users", value: analytics.userStats.total },
                  { label: "Regular Users", value: analytics.userStats.regularUsers },
                  { label: "Gym Owners", value: analytics.userStats.gymOwners },
                  { label: "Nursery Owners", value: analytics.userStats.nurseryOwners },
                  { label: "New This Month", value: analytics.userStats.newUsersThisMonth },
                ]}
              />
              <StatsSection 
                title="Booking Statistics" 
                icon={<Calendar size={16} className="text-[#9C2A46]" />}
                items={[
                  { label: "Total Bookings", value: analytics.bookingStats.total },
                  { label: "Accepted", value: analytics.bookingStats.accepted },
                  { label: "Pending", value: analytics.bookingStats.pending },
                  { label: "Rejected", value: analytics.bookingStats.rejected },
                  { label: "Total Revenue", value: formatCurrency(analytics.bookingStats.revenue) },
                ]}
              />
              <StatsSection 
                title="Facility Statistics" 
                icon={<Package size={16} className="text-[#9C2A46]" />}
                items={[
                  { label: "Total Gyms", value: analytics.facilityStats.totalGyms },
                  { label: "Total Nurseries", value: analytics.facilityStats.totalNurseries },
                  { label: "Pending Gyms", value: analytics.facilityStats.pendingGyms },
                  { label: "Pending Nurseries", value: analytics.facilityStats.pendingNurseries },
                  { label: "Avg Rating", value: `${analytics.reviewStats.avgRating}/5` },
                ]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Components

const StatCard = ({ title, value, description, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#F9A7B8]">
    <div className="flex items-center justify-between pb-2">
      <div>
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-[#9C2A46]">{value}</p>
      </div>
      <div className={`${color} p-2 rounded-lg`}>
        {icon}
      </div>
    </div>
    <p className="text-xs text-[#D43E62] mt-1">{description}</p>
  </div>
);

const ChartCard = ({ title, description, icon, children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow p-3 sm:p-4 border border-[#F9A7B8] ${className}`}>
    <div className="mb-2 sm:mb-3">
      <h3 className="flex items-center text-sm sm:text-base font-semibold text-[#9C2A46]">
        {icon} <span className="ml-2">{title}</span>
      </h3>
      <p className="text-xs text-[#C0526F]">{description}</p>
    </div>
    {children}
  </div>
);

const DistributionChart = ({ title, data, icon }) => (
  <ChartCard 
    title={title} 
    description={`Distribution of ${title.toLowerCase()}`} 
    icon={icon}
  >
    <ResponsiveContainer width="100%" height={250}>
      <RechartPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#F9A7B8',
            borderColor: '#9C2A46',
            borderRadius: '8px'
          }}
        />
        <Legend />
      </RechartPieChart>
    </ResponsiveContainer>
  </ChartCard>
);

const StatsSection = ({ title, icon, items }) => (
  <div>
    <h4 className="flex items-center text-sm sm:text-base font-medium text-[#9C2A46] mb-2 sm:mb-3">
      {icon} <span className="ml-2">{title}</span>
    </h4>
    <ul className="space-y-2 text-xs sm:text-sm">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between">
          <span className="text-[#C0526F]">{item.label}</span>
          <span className="font-medium text-[#9C2A46]">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Analytics;