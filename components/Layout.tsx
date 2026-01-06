
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title = "شام هب", showBack, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={onBack} className="p-2 -mr-2 text-gray-600 hover:text-indigo-600">
              <i className="fa-solid fa-arrow-right text-lg"></i>
            </button>
          )}
          <h1 className="text-xl font-bold text-indigo-700">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-indigo-600 transition-colors">
            <i className="fa-solid fa-headset text-lg"></i>
          </button>
          <button className="text-gray-500 hover:text-indigo-600 transition-colors">
            <i className="fa-solid fa-circle-question text-lg"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Fixed Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-2 py-1 z-50">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <NavItem 
            icon="fa-house" 
            label="الرئيسية" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavItem 
            icon="fa-bookmark" 
            label="مرجعية" 
            active={activeTab === 'bookmarks'} 
            onClick={() => setActiveTab('bookmarks')} 
          />
          <NavItem 
            icon="fa-cart-shopping" 
            label="السلة" 
            active={activeTab === 'cart'} 
            onClick={() => setActiveTab('cart')} 
          />
          <NavItem 
            icon="fa-heart" 
            label="المفضلة" 
            active={activeTab === 'favorites'} 
            onClick={() => setActiveTab('favorites')} 
          />
          <NavItem 
            icon="fa-user" 
            label="حسابي" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
  >
    <i className={`fa-solid ${icon} ${active ? 'text-xl' : 'text-lg'}`}></i>
    <span className="text-[10px] mt-1 font-medium">{label}</span>
    {active && <div className="w-1 h-1 bg-indigo-600 rounded-full mt-0.5"></div>}
  </button>
);

export default Layout;
