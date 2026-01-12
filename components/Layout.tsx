import React from 'react';
import { LayoutDashboard, Receipt, Wallet, PieChart, LogOut, TrendingUp } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onLogout, userName }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'transactions', label: 'History', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'tax', label: 'Tax', icon: Wallet }, // Using Wallet as proxy for Tax/Finance
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-100">
      {/* Header */}
      <header className="bg-white px-6 py-5 flex justify-between items-center sticky top-0 z-20 border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold text-green-600 tracking-tight">{APP_NAME}</h1>
          <p className="text-xs text-slate-500 font-medium">Hello, {userName}</p>
        </div>
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 fixed bottom-0 w-full max-w-md z-30 pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center w-full space-y-1 ${
                  isActive ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-green-50' : ''}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;