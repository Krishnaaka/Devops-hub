import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ChevronLeft, PlayCircle, CheckCircle, Clock, BookOpen, 
  Video, FileText, HelpCircle, Download, Edit3, MessageSquare,
  ChevronRight, Send, X, Trophy
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState('tutorial'); // tutorial, quiz, assignments, resources, notes
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // AI Assistant State
  const [showAi, setShowAi] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hi! I'm your DevOps Learning Assistant. How can I help you with this module today?" }
  ]);

  // Notes State
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        setCourse(data);
        // Load saved note if exists
        const savedNote = localStorage.getItem(`note_${id}_${activeModule}`);
        if (savedNote) setNote(savedNote);
      } catch (error) {
        console.error('Error fetching course', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, activeModule]);

  const saveNote = () => {
    localStorage.setItem(`note_${id}_${activeModule}`, note);
    alert('Note saved locally! 📝');
  };

  const handleQuizSubmit = () => {
    const currentQuiz = course.modules[activeModule].quiz;
    let correctCount = 0;
    currentQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setQuizSubmitted(true);
  };

  const sendAiMessage = (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    
    const newHistory = [...chatHistory, { role: 'user', text: aiMessage }];
    setChatHistory(newHistory);
    setAiMessage('');

    // Mock AI Response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        text: `Great question about "${course.modules[activeModule].title}"! To master this, you should focus on the hands-on assignments in the next tab.` 
      }]);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const module = course.modules[activeModule];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Sidebar: Course Modules */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50/50 dark:bg-gray-900/40 backdrop-blur-xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-transparent">
          <Link to="/courses" className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-purple-600 transition-colors mb-4 group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Exit Player
          </Link>
          <h1 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{course.title}</h1>
          <div className="mt-4 bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
             <div 
               className="bg-purple-600 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(147,51,234,0.5)]" 
               style={{ width: `${((activeModule + 1) / course.modules.length) * 100}%` }}
             ></div>
          </div>
          <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Progress: {Math.round(((activeModule + 1) / course.modules.length) * 100)}% Complete</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          {course.modules.map((m, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveModule(index);
                setActiveTab('tutorial');
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
              className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-all relative ${
                activeModule === index 
                ? 'bg-purple-600/10 border-r-4 border-purple-600' 
                : 'hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                activeModule === index 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${activeModule === index ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {m.title}
                </p>
                <div className="flex items-center text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">
                  <Clock className="w-3 h-3 mr-1" /> {m.duration} mins
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-950">
        {/* Top Tab Bar */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex gap-8">
            <TabButton icon={<Video />} label="Tutorial" active={activeTab === 'tutorial'} onClick={() => setActiveTab('tutorial')} />
            <TabButton icon={<HelpCircle />} label="Quiz" active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} />
            <TabButton icon={<FileText />} label="Assignments" active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} />
            <TabButton icon={<Download />} label="Resources" active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
            <TabButton icon={<Edit3 />} label="My Notes" active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-10">
            
            {/* 📺 TUTORIAL TAB */}
            {activeTab === 'tutorial' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                  {module.title}
                </h2>
                
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 mb-10 group relative">
                  {module.videoUrl ? (
                    <iframe 
                      className="w-full h-full"
                      src={module.videoUrl}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-4">
                      <PlayCircle className="w-16 h-16 opacity-20" />
                      <p className="font-bold uppercase tracking-widest text-xs">Video content coming soon</p>
                    </div>
                  )}
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Overview
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {module.content}
                  </p>
                </div>
              </div>
            )}

            {/* 🧠 QUIZ TAB */}
            {activeTab === 'quiz' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Module Quiz</h2>
                  {quizSubmitted && (
                    <div className="flex items-center gap-3 bg-purple-600 text-white px-6 py-2 rounded-2xl shadow-xl shadow-purple-500/30">
                       <Trophy className="w-5 h-5" />
                       <span className="font-black">Score: {score} / {module.quiz.length}</span>
                    </div>
                  )}
                </div>

                {module.quiz && module.quiz.length > 0 ? (
                  <div className="space-y-8">
                    {module.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm">
                        <p className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex gap-3">
                          <span className="text-purple-600">Q{qIdx + 1}.</span> {q.question}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              className={`p-4 rounded-2xl text-left font-bold transition-all border-2 ${
                                quizAnswers[qIdx] === oIdx 
                                ? (quizSubmitted 
                                   ? (oIdx === q.correctAnswer ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white')
                                   : 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20')
                                : (quizSubmitted && oIdx === q.correctAnswer 
                                   ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' 
                                   : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300')
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {!quizSubmitted && (
                      <button 
                        onClick={handleQuizSubmit}
                        className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/30"
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                    <p className="text-gray-500 font-bold uppercase tracking-widest">No quiz available for this module yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* 📝 ASSIGNMENTS TAB */}
            {activeTab === 'assignments' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Practice Assignments</h2>
                <div className="space-y-6">
                  {module.assignments.map((ass, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl group hover:border-purple-600 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-black">
                        {idx + 1}
                      </div>
                      <p className="flex-1 text-lg font-bold text-gray-700 dark:text-gray-300 pt-1 leading-relaxed">
                        {ass}
                      </p>
                      <button className="text-gray-300 group-hover:text-purple-600 transition-colors">
                        <CheckCircle className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 📚 RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Study Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {module.resources && module.resources.map((res, idx) => (
                    <a 
                      key={idx} 
                      href={res.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:shadow-xl hover:translate-y-[-4px] transition-all group"
                    >
                      <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                         <Download className="w-6 h-6 text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{res.name}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">{res.type}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 📓 NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Private Notes</h2>
                  <button 
                    onClick={saveNote}
                    className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea 
                  className="w-full h-80 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 focus:border-purple-600 dark:focus:border-purple-600 focus:outline-none text-lg font-medium text-gray-700 dark:text-gray-300 shadow-inner"
                  placeholder="Start typing your study notes here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <p className="mt-4 text-sm text-gray-500 font-medium italic">Your notes are stored locally in your browser for this lesson.</p>
              </div>
            )}

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-20 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-12 bg-white dark:bg-gray-950">
           <button 
             disabled={activeModule === 0}
             onClick={() => {
                setActiveModule(prev => prev - 1);
                setActiveTab('tutorial');
             }}
             className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors group"
           >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Previous Lesson
           </button>
           
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAi(true)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-all group"
              >
                 <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" /> Ask AI Assistant
              </button>
              
              <button 
                onClick={() => {
                  if (activeModule < course.modules.length - 1) {
                    setActiveModule(prev => prev + 1);
                    setActiveTab('tutorial');
                  } else {
                    alert('Congratulations! You finished the course! 🎓');
                  }
                }}
                className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/30 flex items-center gap-2 group"
              >
                {activeModule < course.modules.length - 1 ? (
                  <>
                    Next Lesson
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Finish & Claim Certificate
                    <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
           </div>
        </div>
      </div>

      {/* 🤖 AI CHAT DRAWER */}
      {showAi && (
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-800 flex flex-col animate-in slide-in-from-right duration-300">
           <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-purple-600 text-white">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <h3 className="font-black tracking-tight text-lg">AI Learning Buddy</h3>
              </div>
              <button onClick={() => setShowAi(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
                 <X className="w-6 h-6" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-transparent">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                     msg.role === 'user' 
                     ? 'bg-purple-600 text-white rounded-tr-none' 
                     : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm'
                   }`}>
                      {msg.text}
                   </div>
                </div>
              ))}
           </div>

           <form onSubmit={sendAiMessage} className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                 <input 
                   type="text" 
                   className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm font-medium dark:text-white"
                   placeholder="Ask me anything..."
                   value={aiMessage}
                   onChange={(e) => setAiMessage(e.target.value)}
                 />
                 <button type="submit" className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20">
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all relative ${
      active 
      ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' 
      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
    }`}
  >
    {active && <span className="absolute -bottom-[21px] left-0 right-0 h-1 bg-purple-600 rounded-t-full shadow-[0_-2px_10px_rgba(147,51,234,0.5)]"></span>}
    <span className={active ? 'text-purple-600' : 'text-gray-400'}>
      {React.cloneElement(icon, { size: 18 })}
    </span>
    {label}
  </button>
);

export default CourseDetail;
