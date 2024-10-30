import React, { useEffect, useState } from 'react';
import { getDashboardMetrics } from '../../../Services/adminService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   LineElement,  PointElement,LinearScale, CategoryScale,
   } from 'chart.js';
import { Pie,Line } from 'react-chartjs-2';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  Layers,
  TrendingUp,
  Activity,
  BarChart,
  Award,
  ShieldBan
} from 'lucide-react';
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale,);

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data.data);
        console.log(data.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-cyan2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <span className="mr-2">⚠️</span> Error: {error}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Students',
      value: metrics?.userCount || 0,
      icon: Users,
      color: 'bg-blue-500',
 
    
    },
    {
      title: 'Total Mentors',
      value: metrics?.mentorCount || 0,
      icon: UserCheck,
      color: 'bg-green-500',
     
    },
    {
      title: 'Course Categories',
      value: metrics?.CategoryCount || 0,
      icon: Layers,
      color: 'bg-purple-500',
     
    },
    {
      title: 'Total Courses',
      value: metrics?.CourseCount || 0,
      icon: BookOpen,
      color: 'bg-custom-cyan2',
  
    }
  ];


  const pieData = {
    labels: ['Silver', 'Platinum', 'Gold'],
    datasets: [
      {
        data: [metrics.membershipData.silver, metrics.membershipData.platinum, metrics.membershipData.gold],
        backgroundColor: ['#C0C0C0', '#bb00ff', '#FFD700']
      }
    ]
  };


  const lineData = {
    labels: metrics.formattedData.map(item => item.month), // X-axis labels
    datasets: [
      {
        label: 'Students Joined',
        data: metrics.formattedData.map(item => item.count), // Y-axis data
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1, // Smoother curve
      },
    ],
  };

  return (
    <div className="dashboard p-6 w-full font-roboto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Eduprops Admin Panel</h1>
        <div className="flex items-center text-sm text-gray-600">
          <Activity className="w-4 h-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center ${card.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-2xl font-bold text-gray-800">{card.value.toLocaleString()}</span>
                  <span className="text-sm font-medium">{card.trend}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
              <div className="flex items-center">
               
              </div>
            </div>
            <div className="h-1 w-full bg-gray-100">
              <div className={`h-full ${card.color} w-2/3`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <BarChart className="w-5 h-5 mr-2 text-custom-cyan2" />
              Students Joined Months
            </h3>
          </div>
          <div className="space-y-4">
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} height={100} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Award className="w-5 h-5 mr-2 text-custom-cyan2" />
              Top Performing Courses
            </h3>
          </div>
          <div className="space-y-4">
            {metrics.topCourses.map((data,index)=>(
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{data.title}</span>
               <span
      className={`p-1 px-4 rounded-xl text-white font-bold ${
        index === 0 ? 'bg-green-400' : index === 1 ? 'bg-blue-400' : 'bg-yellow-400'
      }`}
    >
      {index+1}
      </span>
                </div>
            ))}
           
          </div>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-center font-semibold text-lg ">Subscriptions</h3>
          <div>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={150} /> {/* Adjusted height */}
          </div>
          
   
        </div>
        <div className="bg-whi p- rounded-xl ">
  <div className="flex justify-between">
    <div className="p-4 flex-1 bg-custom-cyan rounded-lg shadow">
         <Users className="w-6 h-6 text-white float-right" />
      <h2 className="text-lg font-semibold">Google Auth Users</h2>
      <h1 className="text-2xl font-bold">{metrics.googleauthusers}</h1>
    </div>
    <div className="p-4 flex-1 bg-red-500 rounded-lg shadow ml-4 text-white">
      <  ShieldBan className="w-6 h-6 text-white float-right"/>
      <h2 className="text-lg font-semibold">Blocked Users</h2>
      <h1 className="text-2xl font-bold">{metrics.isBlocked}</h1>
    </div>
    
  </div>
  <div className="p-4 flex-1 bg-green-500 rounded-lg shadow mt-5 text-white">
  <div className="flex justify-between items-center p-3">
    <h2 className="text-lg font-semibold text-center">Total Revenue Generated From Purchased Courses</h2>
    <h1 className="text-4xl text-blue-800 font-bold bg-white rounded-xl p-2">{metrics.totalSales}/-</h1>
  </div>
</div>

   
</div>





        
      </div>
    </div>
  );
}

export default Dashboard;