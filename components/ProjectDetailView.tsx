
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Project } from '../types';

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
  projects: Project[];
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId, onBack, projects }) => {
  const project = projects.find(p => p.id === projectId) || projects[0];
  const products = MOCK_PRODUCTS.filter(p => p.projectId === project.id);
  const [activeSection, setActiveSection] = useState<'products' | 'info' | 'reviews'>('products');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-64">
        <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-gray-800 shadow-md"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-xl text-indigo-600 shadow-md">
            <i className="fa-solid fa-heart"></i>
          </button>
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-xl text-gray-600 shadow-md">
            <i className="fa-solid fa-share-nodes"></i>
          </button>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h1>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
            </div>
            <div className="bg-yellow-50 px-3 py-1 rounded-xl text-yellow-700 font-bold flex flex-col items-center">
              <span className="text-lg">{project.rating}</span>
              <span className="text-[10px] opacity-70">({project.reviewsCount})</span>
            </div>
          </div>

          <div className="flex gap-4 border-t border-gray-100 pt-4 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
              اطلب الآن
            </button>
            <button className="flex-shrink-0 bg-white border border-indigo-200 text-indigo-600 px-6 py-2 rounded-xl text-sm font-bold">
              حجز موعد
            </button>
            <button className="flex-shrink-0 bg-emerald-50 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <i className="fa-brands fa-whatsapp text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <TabButton label="المنتجات" active={activeSection === 'products'} onClick={() => setActiveSection('products')} />
          <TabButton label="عن المشروع" active={activeSection === 'info'} onClick={() => setActiveSection('info')} />
          <TabButton label="التقييمات" active={activeSection === 'reviews'} onClick={() => setActiveSection('reviews')} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-6">
        {activeSection === 'products' && (
          <div className="space-y-4">
            {products.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-indigo-600 font-bold text-sm">
                      {item.price.toLocaleString()} ل.س
                    </span>
                    <button className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'info' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <InfoItem icon="fa-clock" title="ساعات العمل" value={project.workingHours} />
            <InfoItem icon="fa-location-dot" title="الموقع" value={project.location} />
            <InfoItem icon="fa-wallet" title="طرق الدفع" value="شام كاش، نقدي عند الاستلام" />
            <InfoItem icon="fa-truck-fast" title="التوصيل" value={project.deliveryOption ? "متاح" : "غير متاح"} />
            <div className="h-48 bg-gray-100 rounded-2xl relative overflow-hidden flex items-center justify-center">
                <p className="text-gray-400 font-bold">خريطة الموقع</p>
                <i className="fa-solid fa-map-location-dot absolute text-6xl opacity-10"></i>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-transparent pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-indigo-100 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center">
                      <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-xs text-gray-500">مجموع الطلب</span>
                      <span className="font-bold text-indigo-600">0 ل.س</span>
                  </div>
              </div>
              <button className="bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold">إتمام الطلب</button>
          </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
  >
    {label}
  </button>
);

const InfoItem: React.FC<{ icon: string; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{title}</h5>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

export default ProjectDetailView;
