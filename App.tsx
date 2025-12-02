import React, { useState } from 'react';
import { 
  CalendarDays, 
  CheckSquare, 
  Home, 
  MessageCircle, 
  Menu,
  X,
  Languages
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import ItineraryView from './components/ItineraryView';
import ChecklistView from './components/ChecklistView';
import ToolsView from './components/ToolsView';
import AIAssistantView from './components/AIAssistantView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: '首頁總覽', icon: <Home size={20} /> },
    { id: AppView.ITINERARY, label: '行程規劃', icon: <CalendarDays size={20} /> },
    { id: AppView.CHECKLIST, label: '準備清單', icon: <CheckSquare size={20} /> },
    { id: AppView.TOOLS, label: '實用工具', icon: <Languages size={20} /> },
    { id: AppView.AI_ASSISTANT, label: 'AI 導遊', icon: <MessageCircle size={20} /> },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard onChangeView={setCurrentView} />;
      case AppView.ITINERARY: return <ItineraryView />;
      case AppView.CHECKLIST: return <ChecklistView />;
      case AppView.TOOLS: return <ToolsView />;
      case AppView.AI_ASSISTANT: return <AIAssistantView />;
      default: return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm z-50 sticky top-0">
        <h1 className="text-xl font-bold text-indigo-600 tracking-tight">首爾旅伴 2026</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky md:top-0 h-screen w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        flex flex-col
      `}>
        <div className="p-6 border-b border-slate-100 hidden md:block">
           <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">SeoulMate 2026</h1>
           <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">首爾旅遊小幫手</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm ring-1 ring-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-xs opacity-75 mb-1">出發日期</p>
            <p className="font-bold">2026年 3月 18日</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)]">
          {renderView()}
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;