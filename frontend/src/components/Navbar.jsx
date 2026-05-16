import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, LogOut, Code, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                DevOpsHub
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-purple-600">
                  Courses
                </Link>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 flex items-center gap-1">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <UserCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 font-medium">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
