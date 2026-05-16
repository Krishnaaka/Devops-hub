import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Award, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Header Section */}
      <div className="bg-purple-600 dark:bg-purple-900/40 relative overflow-hidden">
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl opacity-20"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
               Welcome back, <span className="text-purple-200">{user?.name}!</span>
            </h1>
            <p className="mt-4 text-purple-100 text-lg max-w-2xl font-medium opacity-90">
               You're making great progress. You've completed 75% of your weekly goal. Keep pushing!
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12 relative z-20">
         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard 
               icon={<BookOpen className="h-6 w-6 text-white" />} 
               title="Enrolled" 
               value="3" 
               color="bg-blue-500 shadow-blue-500/30"
            />
            <StatCard 
               icon={<Award className="h-6 w-6 text-white" />} 
               title="Certificates" 
               value="1" 
               color="bg-amber-500 shadow-amber-500/30"
            />
            <StatCard 
               icon={<TrendingUp className="h-6 w-6 text-white" />} 
               title="Learning Hours" 
               value="24.5" 
               color="bg-emerald-500 shadow-emerald-500/30"
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Section: Continue Learning */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none">
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                     <Link to="/courses" className="text-purple-600 font-bold text-sm hover:underline flex items-center">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                     </Link>
                  </div>

                  <div className="space-y-6">
                     <ProgressCourse 
                        title="Docker Fundamentals"
                        module="Module 3: Multi-stage Builds"
                        progress={65}
                        img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                     />
                     <ProgressCourse 
                        title="Kubernetes Mastery"
                        module="Module 1: K8s Architecture"
                        progress={12}
                        img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
                     />
                  </div>
               </div>

               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden group">
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-2">Ready for a challenge?</h3>
                     <p className="text-indigo-100 mb-6 opacity-90 max-w-md">Take our weekly DevOps assessment and earn a "Mastery" badge for your profile.</p>
                     <button className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        Start Assessment
                     </button>
                  </div>
                  <TrendingUp className="absolute top-1/2 right-8 -translate-y-1/2 w-48 h-48 text-white/10 -rotate-12 group-hover:scale-110 transition-transform" />
               </div>
            </div>

            {/* Sidebar Section: Recommendations */}
            <div className="space-y-8">
               <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recommended for you</h2>
                  <div className="space-y-6">
                     <RecommendationItem 
                        title="CI/CD with Actions"
                        level="Intermediate"
                        img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                     />
                     <RecommendationItem 
                        title="Terraform Basics"
                        level="Beginner"
                        img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md overflow-hidden rounded-3xl p-6 border border-white/20 dark:border-gray-800 shadow-xl hover:translate-y-[-4px] transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

const ProgressCourse = ({ title, module, progress, img }) => (
  <div className="group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
     <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
           <img src={img} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
           <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{title}</h4>
           <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{module}</p>
        </div>
        <button className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
           <Play className="w-5 h-5 fill-current" />
        </button>
     </div>
     <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
           <div className="text-right">
              <span className="text-xs font-bold inline-block text-purple-600">{progress}%</span>
           </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-purple-100 dark:bg-gray-800">
           <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600 transition-all duration-1000"></div>
        </div>
     </div>
  </div>
);

const RecommendationItem = ({ title, level, img }) => (
  <div className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-pointer group">
     <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-100 dark:border-gray-700">
        <img src={img} alt="" className="w-full h-full object-contain" />
     </div>
     <div>
        <h5 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{title}</h5>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{level}</span>
     </div>
  </div>
)

export default Dashboard;
