import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Book, PlayCircle } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Explore Courses</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Master the tools of modern software delivery.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course) => (
          <div key={course._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center p-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
               <img src={course.imageUrl} alt={course.title} className="h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                  course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {course.difficulty}
                </span>
                <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Book className="w-4 h-4 mr-1.5 text-purple-500" />
                  {course.modules.length} Modules
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">{course.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                {course.description}
              </p>
              <Link 
                to={`/courses/${course._id}`}
                className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
