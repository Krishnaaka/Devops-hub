import { Link } from 'react-router-dom';
import { Terminal, Cloud, Shield, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Master Cloud Native Technologies
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          DevOpsHub is the premium learning platform for mastering Docker, Kubernetes, CI/CD, and everything DevOps.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning Now
          </Link>
          <Link
            to="/courses"
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold py-3 px-8 rounded-lg shadow transition-all"
          >
            View Courses
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full">
        <FeatureCard 
          icon={<Terminal className="h-8 w-8 text-blue-500" />}
          title="Containerization"
          description="Learn Docker from the ground up to build portable applications."
        />
        <FeatureCard 
          icon={<Cloud className="h-8 w-8 text-blue-400" />}
          title="Orchestration"
          description="Master Kubernetes to manage clusters at scale."
        />
        <FeatureCard 
          icon={<Activity className="h-8 w-8 text-green-500" />}
          title="CI/CD Pipelines"
          description="Automate testing and deployment with GitHub Actions."
        />
        <FeatureCard 
          icon={<Shield className="h-8 w-8 text-red-500" />}
          title="Security"
          description="Implement DevSecOps practices in your delivery pipeline."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="mb-4 bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default Home;
