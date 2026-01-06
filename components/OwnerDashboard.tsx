
import React, { useState, useMemo } from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Project, Product } from '../types';

interface OwnerDashboardProps {
  projects: Project[];
  onUpdateProject: (updatedProject: Project) => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ projects: initialProjects, onUpdateProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState('');
  
  // Local state for product availability (demo only)
  const [localProducts, setLocalProducts] = useState(MOCK_PRODUCTS);

  // Dynamic calculations for stats based on the projects owned by this user
  const stats = useMemo(() => {
    if (initialProjects.length === 0) {
      return { 
        avgRating: "0.0", 
        totalOrders: 0, 
        totalProjects: 0 
      };
    }
    
    const totalRatingSum = initialProjects.reduce((acc, curr) => acc + curr.rating, 0);
    const totalOrdersSum = initialProjects.reduce((acc, curr) => acc + curr.reviewsCount, 0);
    
    return {
      avgRating: (totalRatingSum / initialProjects.length).toFixed(1),
      totalOrders: totalOrdersSum,
      totalProjects: initialProjects.length
    };
  }, [initialProjects]);

  const toggleProductAvailability = (productId: string) => {
    setLocalProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ));
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setDeliveryEnabled(project.deliveryOption);
    setServices(project.services || []);
    setShowModal(true);
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setServices([...services, newService.trim()]);
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (editingProject) {
      const updated: Project = {
        ...editingProject,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        deliveryOption: deliveryEnabled,
        services: services,
      };
      onUpdateProject(updated);
      alert("تم تحديث بيانات المشروع بنجاح!");
    } else {
      alert("تم إرسال مشروعك الجديد للمراجعة!");
    }
    
    setShowModal(false);
    setEditingProject(null);
  };

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مرحباً بك</h1>
          <p className="text-gray-500 text-sm">إدارة نشاطك التجاري بكل سهولة</p>
        </div>
        <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center">
          <i className="fa-solid fa-chart-line text-xl"></i>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label="إجمالي الطلبات" 
          value={stats.totalOrders.toLocaleString()} 
          color="text-indigo-600" 
          icon="fa-shopping-cart"
          bg="bg-indigo-50"
        />
        <StatCard 
          label="متوسط التقييم" 
          value={stats.avgRating} 
          color="text-yellow-500" 
          icon="fa-star"
          bg="bg-yellow-50"
        />
        <StatCard 
          label="إجمالي المشاريع" 
          value={stats.totalProjects.toString()} 
          color="text-emerald-600" 
          icon="fa-briefcase"
          bg="bg-emerald-50"
        />
        <StatCard 
          label="الإيرادات (تقديري)" 
          value="850k" 
          color="text-rose-600" 
          icon="fa-money-bill-trend-up"
          bg="bg-rose-50"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">مشاريعك الحالية</h2>
          <button 
            onClick={() => { setEditingProject(null); setDeliveryEnabled(false); setServices([]); setShowModal(true); }}
            className="text-indigo-600 text-sm font-bold"
          >
            + إضافة مشروع
          </button>
        </div>
        <div className="space-y-3">
          {initialProjects.length > 0 ? (
            initialProjects.map(project => (
              <div key={project.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:border-indigo-100">
                <div className="flex items-center gap-4">
                  <img src={project.logo} alt={project.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{CATEGORIES.find(c => c.id === project.category)?.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <i className="fa-solid fa-star text-[8px]"></i> {project.rating}
                       </span>
                       <span className="text-[10px] text-gray-400">{project.reviewsCount} طلب</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => openEditModal(project)}
                  className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition-colors"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            ))
          ) : (
             <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center">
                <p className="text-gray-400 text-sm">لا توجد مشاريع مسجلة بعد</p>
             </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto max-h-[90vh] shadow-2xl no-scrollbar">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-2 z-10">
              <h2 className="text-xl font-bold">{editingProject ? 'تعديل المشروع' : 'إدراج مشروع جديد'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1">المجال</label>
                  <select name="category" defaultValue={editingProject?.category || "restaurants"} className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-1">اسم المشروع</label>
                  <input name="name" type="text" defaultValue={editingProject?.name || ""} className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${deliveryEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                      <i className="fa-solid fa-truck-fast"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">خدمة التوصيل</p>
                      <p className="text-[10px] text-gray-500">تفعيل خيار طلب التوصيل للعملاء</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setDeliveryEnabled(!deliveryEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${deliveryEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${deliveryEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
                  </button>
                </div>

                {/* Services Management Section */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 block mb-1">خدمات المشروع</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="أضف خدمة (مثلاً: واي فاي مجاني)"
                      className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <button 
                      type="button"
                      onClick={handleAddService}
                      className="bg-indigo-100 text-indigo-600 px-4 rounded-2xl font-bold hover:bg-indigo-200 transition-colors"
                    >
                      إضافة
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {services.map((service, index) => (
                      <div key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-indigo-100">
                        {service}
                        <button type="button" onClick={() => handleRemoveService(index)} className="text-indigo-400 hover:text-indigo-600">
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                      </div>
                    ))}
                    {services.length === 0 && <p className="text-[10px] text-gray-400 italic">لم يتم إضافة خدمات بعد</p>}
                  </div>
                </div>
                
                <div>
                   <label className="text-sm font-bold text-gray-700 block mb-1">وصف المشروع</label>
                   <textarea name="description" defaultValue={editingProject?.description || ""} className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none h-24 focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4 active:scale-95 transition-transform"
              >
                {editingProject ? 'حفظ التغييرات' : 'تأكيد ونشر المشروع'}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">إدارة المنتجات</h2>
          <button className="text-indigo-600 text-sm font-bold">+ إضافة منتج</button>
        </div>
        <div className="space-y-3">
          {localProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{product.name}</h4>
                  <p className={`text-[10px] font-bold ${product.available ? 'text-green-600' : 'text-rose-500'}`}>
                    {product.available ? 'متوفر حالياً' : 'غير متوفر'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => toggleProductAvailability(product.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${product.available ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${product.available ? '-translate-x-6' : '-translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  icon: string;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, icon, bg }) => (
  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start gap-2 transition-all hover:shadow-md">
    <div className={`w-8 h-8 ${bg} ${color} rounded-lg flex items-center justify-center text-sm`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{label}</span>
      <span className={`text-xl font-extrabold ${color}`}>{value}</span>
    </div>
  </div>
);

export default OwnerDashboard;
