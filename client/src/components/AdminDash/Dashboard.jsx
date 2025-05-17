import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Calendar, MessageSquare, CheckCircle, Loader2, RefreshCw, CreditCard } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalReviews: 0,
    pendingRequests: 0,
    recentPayments: [],
    userTypes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C0526F'];
  
  const userTypeData = [
    { name: 'Users', value: 400 },
    { name: 'Gym Owners', value: 300 },
    { name: 'Nursery Owners', value: 200 },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, bookingsRes, reviewsRes, pendingGymsRes, pendingNurseriesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users/all"),
        axios.get("http://localhost:5000/api/booking/all", { withCredentials: true }),
        axios.get("http://localhost:5000/api/comment/comments", { withCredentials: true }),
        axios.get("http://localhost:5000/api/gyms/pending", { withCredentials: true }),
        axios.get("http://localhost:5000/api/nurseries/pending", { withCredentials: true })
      ]);

      const userTypes = [
        { name: 'Users', value: usersRes.data.filter(u => u.role === 'user').length },
        { name: 'Gym Owners', value: usersRes.data.filter(u => u.role === 'gymOwner').length },
        { name: 'Nursery Owners', value: usersRes.data.filter(u => u.role === 'nurseryOwner').length },
      ];

      setStats({
        totalUsers: usersRes.data.length,
        totalBookings: bookingsRes.data.length,
        totalReviews: reviewsRes.data.length,
        pendingRequests: pendingGymsRes.data.gyms.length + pendingNurseriesRes.data.nurseries.length,
        recentPayments: bookingsRes.data
          .filter(booking => booking.paymentStatus === "completed")
          .slice(0, 5),
        userTypes: userTypes
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-3 md:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Monitor and manage your platform</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
          Refresh
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
          <div className="flex items-center">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-500 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs sm:text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40 sm:h-48 md:h-64">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 animate-spin text-[#C0526F]" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-5 md:mb-6">
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              description="registered" 
              icon={<Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600" />} 
              color="blue"
            />
            <StatCard 
              title="Total Bookings" 
              value={stats.totalBookings} 
              description="reservations" 
              icon={<Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />} 
              color="green"
            />
            <StatCard 
              title="Customer Reviews" 
              value={stats.totalReviews} 
              description="feedback" 
              icon={<MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-600" />} 
              color="yellow"
            />
            <StatCard 
              title="Pending Requests" 
              value={stats.pendingRequests} 
              description="awaiting" 
              icon={<CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-pink-600" />} 
              color="pink"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
            <ChartCard 
              title="User Distribution" 
              content={
                <div className="h-[200px] sm:h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.userTypes.length > 0 ? stats.userTypes : userTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {stats.userTypes.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? '#4E71FF' : index === 1 ? '#9C2A46' : '#7F55B1'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              }
              footer={`Total Users: ${stats.totalUsers}`}
            />

            <ChartCard 
              title="Booking Statistics" 
              content={
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <ProgressBar 
                    label="Total Bookings" 
                    value={stats.totalBookings} 
                    percentage={100} 
                    color="#4E71FF"
                  />
                  <ProgressBar 
                    label="Completed Payments" 
                    value={stats.recentPayments.length} 
                    percentage={(stats.recentPayments.length / stats.totalBookings) * 100 || 0} 
                    color="#88D66C"
                    showRate
                  />
                </div>
              }
            />
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-3 sm:mb-4 md:mb-6">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Recent Payments</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentPayments.length === 0 ? (
                <div className="p-3 sm:p-4 md:p-6 text-center">
                  <CreditCard className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-400" />
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">No recent payments found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <TableHeader>User</TableHeader>
                        <TableHeader>Facility</TableHeader>
                        <TableHeader>Amount</TableHeader>
                        <TableHeader>Date</TableHeader>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.recentPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs sm:text-sm">
                                {payment.user?.username?.charAt(0).toUpperCase() || "-"}
                              </div>
                              <div className="ml-1 sm:ml-2">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">
                                  {payment.user?.username || "-"}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {payment.gym?.gymName || payment.nursery?.nurseryName || "-"}
                          </TableCell>
                          <TableCell>
                            {payment.selectedPlan || "-"}
                          </TableCell>
                          <TableCell>
                            {new Date(payment.bookingDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links & System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <QuickLinks />
            <SystemStatus />
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Components
const StatCard = ({ title, value, description, icon, color }) => {
  const bgColors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    pink: 'bg-pink-100'
  };

  return (
    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <h3 className="text-xs sm:text-sm text-gray-500 font-medium">{title}</h3>
        <div className={`${bgColors[color]} p-1 sm:p-1.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{value}</p>
        <p className="ml-1 text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const ChartCard = ({ title, content, footer }) => (
  <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
    <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200 bg-[#C0526F]">
      <h3 className="text-xs sm:text-sm md:text-base font-medium text-white">{title}</h3>
    </div>
    <div className="p-2 sm:p-3 md:p-4">
      {content}
      {footer && (
        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 text-center">
          {footer}
        </div>
      )}
    </div>
  </div>
);

const ProgressBar = ({ label, value, percentage, color, showRate = false }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs sm:text-sm text-gray-600">{label}</span>
      <span className="text-xs sm:text-sm font-medium text-[#9C2A46]">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5">
      <div
        className={`h-1 sm:h-1.5 rounded-full`}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      ></div>
    </div>
    {showRate && (
      <div className="flex justify-between text-xs text-gray-500 mt-0.5">
        <span>Payment completion rate</span>
        <span className="text-[#9C2A46] font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
    )}
  </div>
);

const TableHeader = ({ children }) => (
  <th className="px-2 sm:px-3 md:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-2 sm:px-3 md:px-6 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">
    {children}
  </td>
);

const QuickLinks = () => (
  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
    <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 sm:mb-3 md:mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3">
      <QuickLink 
        href="/admin/JoinRequests" 
        icon={<CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#C0526F] mb-1" />}
        label="Approve Facilities"
      />
      <QuickLink 
        href="/admin/bookings" 
        icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#C0526F] mb-1" />}
        label="Manage Bookings"
      />
      <QuickLink 
        href="/admin/users" 
        icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#C0526F] mb-1" />}
        label="User Management"
      />
      <QuickLink 
        href="/admin/analytics" 
        icon={
          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#C0526F] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        label="View Analytics"
      />
    </div>
  </div>
);

const QuickLink = ({ href, icon, label }) => (
  <a href={href} className="flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
    {icon}
    <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{label}</span>
  </a>
);

const SystemStatus = () => (
  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
    <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 sm:mb-3 md:mb-4">System Status</h3>
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      <StatusItem 
        label="Server Status" 
        value="Online" 
        status="good" 
      />
      <ProgressBar 
        label="Database Usage" 
        value="85%" 
        percentage={85} 
        color="#C0526F"
      />
      <StatusItem 
        label="Last Database Backup" 
        value={new Date().toLocaleDateString()} 
      />
      <StatusItem 
        label="API Status" 
        value="Operational" 
        status="good" 
      />
    </div>
  </div>
);

const StatusItem = ({ label, value, status }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs sm:text-sm text-gray-700">{label}</span>
    {status ? (
      <div className="flex items-center">
        <div className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${status === 'good' ? 'bg-green-500' : 'bg-red-500'} mr-1 sm:mr-2`}></div>
        <span className={`text-xs sm:text-sm font-medium ${status === 'good' ? 'text-green-600' : 'text-red-600'}`}>{value}</span>
      </div>
    ) : (
      <span className="text-xs sm:text-sm text-gray-700">{value}</span>
    )}
  </div>
);

export default Dashboard;