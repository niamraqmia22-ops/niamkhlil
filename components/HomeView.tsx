
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { Project } from '../types';

interface HomeViewProps {
  onProjectClick: (projectId: string) => void;
  projects: Project[];
}

const HomeView: React.FC<HomeViewProps> = ({ onProjectClick, projects }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="px-4 py-6 space-y-8 pb-10">
      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text"
          placeholder="ابحث عن مطعم، صيدلية، متجر..."
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-indigo-50 text-indigo-600 p-2 rounded-xl">
          <i className="fa-solid fa-sliders"></i>
        </button>
      </div>

      {/* On-duty Pharmacies Banner */}
      <div className="bg-gradient-to-l from-rose-500 to-rose-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-pills animate-bounce"></i>
            <h3 className="font-bold text-lg">الصيدليات المناوبة اليوم</h3>
          </div>
          <p className="text-white/80 text-sm mb-4">ابحث عن أقرب صيدلية مفتوحة الآن في منطقتك.</p>
          <button className="bg-white text-rose-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-rose-50 transition-colors">
            استعراض الصيدليات
          </button>
        </div>
        <i className="fa-solid fa-heart-pulse absolute -bottom-4 -left-4 text-8xl text-white/10 rotate-12"></i>
      </div>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">تصفح المجالات</h2>
          <button className="text-indigo-600 text-sm font-medium">عرض الكل</button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="flex flex-col items-center group">
              <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-md transition-transform group-hover:scale-110 mb-2`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <span className="text-xs text-center font-medium text-gray-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Personal Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">توصيات لك</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {projects.map(project => (
            <div 
              key={project.id} 
              onClick={() => onProjectClick(project.id)}
              className="min-w-[280px] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  {project.rating}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <i className="fa-solid fa-location-dot"></i>
                  {project.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">
                    {CATEGORIES.find(c => c.id === project.category)?.name}
                  </span>
                  {project.deliveryOption && (
                    <span className="text-[10px] text-green-600 flex items-center gap-1 font-bold">
                      <i className="fa-solid fa-truck-fast"></i>
                      خدمة التوصيل
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
