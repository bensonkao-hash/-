import React, { useState } from 'react';
import { INITIAL_ITINERARY } from '../constants';
import { DayPlan, ItineraryItem } from '../types';
import { generateItinerary } from '../services/geminiService';
import { MapPin, Clock, Utensils, ShoppingBag, Landmark, Bus, Sparkles, AlertCircle } from 'lucide-react';

const ItineraryView: React.FC = () => {
  const [plans, setPlans] = useState<DayPlan[]>(INITIAL_ITINERARY);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const newPlans = await generateItinerary(aiPrompt);
      if (newPlans && Array.isArray(newPlans)) {
        setPlans(newPlans);
        setShowPrompt(false);
      }
    } catch (error) {
      alert("行程生成失敗，請稍後再試。");
    } finally {
      setIsGenerating(false);
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'food': return <Utensils size={18} />;
      case 'shopping': return <ShoppingBag size={18} />;
      case 'sightseeing': return <Landmark size={18} />;
      case 'travel': return <Bus size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'shopping': return 'bg-pink-100 text-pink-600 border-pink-200';
      case 'sightseeing': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'travel': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-indigo-100 text-indigo-600 border-indigo-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">旅遊行程表</h2>
          <p className="text-slate-500">2026年 3月 18日 - 3月 22日</p>
        </div>
        <button 
          onClick={() => setShowPrompt(!showPrompt)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all text-sm font-medium"
        >
          <Sparkles size={16} />
          <span>AI 客製化行程</span>
        </button>
      </div>

      {showPrompt && (
        <div className="bg-white p-4 rounded-xl shadow border border-indigo-100 animate-fade-in">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            你想要什麼樣的旅程？
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="例如：我想要多一點逛街行程，少一點爬山，想吃海鮮。"
              className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isGenerating ? '規劃中...' : '開始生成'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            生成全新行程約需 10-20 秒，請耐心等候。
          </p>
        </div>
      )}

      {/* Day Tabs */}
      <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
        {plans.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`
              flex-shrink-0 px-4 py-3 rounded-xl transition-all font-medium min-w-[100px] text-center
              ${selectedDayIndex === index 
                ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}
            `}
          >
            <div className="text-xs opacity-75">{new Date(day.date).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}</div>
            <div>Day {index + 1}</div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold mb-6 text-slate-800 border-b border-slate-100 pb-2">
          {plans[selectedDayIndex].dayLabel}
        </h3>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {plans[selectedDayIndex].items.map((item) => (
            <div key={item.id} className="relative flex items-start group">
              {/* Dot on Timeline */}
              <div className="absolute left-0 mt-1.5 ml-1 h-3 w-3 rounded-full border-2 border-indigo-500 bg-white z-10 group-hover:scale-125 transition-transform" />
              
              <div className="ml-8 w-full p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group-hover:border-indigo-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                   <div className="flex items-center space-x-2 text-sm font-semibold text-slate-600">
                      <Clock size={16} className="text-indigo-500" />
                      <span>{item.time}</span>
                   </div>
                   <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getColor(item.category)} flex items-center w-fit gap-1`}>
                     {getIcon(item.category)}
                     {item.category === 'food' ? '美食' : 
                      item.category === 'shopping' ? '購物' :
                      item.category === 'sightseeing' ? '景點' :
                      item.category === 'travel' ? '交通' : '其他'}
                   </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800">{item.activity}</h4>
                <div className="flex items-center text-sm text-slate-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  {item.location}
                </div>
                
                {item.note && (
                  <div className="mt-3 text-sm bg-yellow-50 text-yellow-800 p-2 rounded-lg border border-yellow-100 flex items-start">
                    <span className="mr-2">💡</span>
                    {item.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;