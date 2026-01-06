
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import ProjectDetailView from './components/ProjectDetailView';
import AuthView from './components/AuthView';
import OwnerDashboard from './components/OwnerDashboard';
import { User, UserRole, Project } from './types';
import { MOCK_PROJECTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  
  // Manage projects in state to allow real-time editing
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS as Project[]);

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setCurrentUser({
      id: 'o1', // Mocking owner ID for demo
      username: 'أحمد المحمد',
      email: 'ahmed@example.com',
      role: role
    });
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleProjectClick = (projectId: string) => {
    setViewingProjectId(projectId);
  };

  const handleBack = () => {
    setViewingProjectId(null);
  };

  if (!isLoggedIn) {
    return <AuthView onLogin={handleLogin} />;
  }

  if (viewingProjectId) {
    return <ProjectDetailView 
      projectId={viewingProjectId} 
      onBack={handleBack} 
      projects={projects}
    />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={currentUser?.role === UserRole.OWNER ? "لوحة التحكم" : "شام هب"}
    >
      {currentUser?.role === UserRole.OWNER ? (
        <OwnerDashboard 
          projects={projects.filter(p => p.ownerId === currentUser.id)}
          onUpdateProject={updateProject}
        />
      ) : (
        <>
          {activeTab === 'home' && <HomeView onProjectClick={handleProjectClick} projects={projects} />}
          {activeTab === 'bookmarks' && <PlaceholderScreen icon="fa-bookmark" title="الإشارات المرجعية" />}
          {activeTab === 'cart' && <PlaceholderScreen icon="fa-cart-shopping" title="سلة المشتريات" />}
          {activeTab === 'favorites' && <PlaceholderScreen icon="fa-heart" title="المفضلة" />}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100">
                <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  <i className="fa-solid fa-user"></i>
                </div>
                <h2 className="text-xl font-bold">{currentUser?.username}</h2>
                <p className="text-gray-500 text-sm mt-1">{currentUser?.email}</p>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="mt-8 text-rose-500 font-bold border border-rose-200 px-6 py-2 rounded-xl"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

const PlaceholderScreen: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-300">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">لا يوجد محتوى لعرضه حالياً، ابدأ باستكشاف المشاريع والمجالات.</p>
    </div>
  </div>
);

export default App;
