import React, { useEffect, useState } from 'react';
import { TRIP_START_DATE } from '../constants';
import { AppView } from '../types';
import { Plane, Calendar, Wallet, Sparkles } from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number }>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TRIP_START_DATE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-900 text-white min-h-[300px] flex items-center justify-center">
        <img 
          src="https://picsum.photos/1200/600?grayscale&blur=2" 
          alt="Seoul Cityscape" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center p-6">
          <h2 className="text-lg md:text-xl font-medium tracking-widest uppercase mb-2 text-indigo-300">距離韓國之旅還有</h2>
          <div className="flex justify-center items-end space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold tabular-nums">{timeLeft.days}</span>
              <span className="text-sm md:text-base opacity-75">天</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold tabular-nums">{timeLeft.hours}</span>
              <span className="text-sm md:text-base opacity-75">小時</span>
            </div>
             <div className="flex flex-col items-center hidden sm:flex">
              <span className="text-5xl md:text-7xl font-bold tabular-nums">{timeLeft.minutes}</span>
              <span className="text-sm md:text-base opacity-75">分鐘</span>
            </div>
          </div>
          <p className="mt-6 text-xl font-light">2026年 3月 18日 - 3月 22日</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => onChangeView(AppView.ITINERARY)}
          className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Calendar size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">行程規劃</h3>
          <p className="text-sm text-slate-500 mt-1">查看 5 天詳細行程</p>
        </button>

        <button 
          onClick={() => onChangeView(AppView.CHECKLIST)}
          className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-100 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Plane size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">行前準備</h3>
          <p className="text-sm text-slate-500 mt-1">護照、網卡、行李清單</p>
        </button>

        <button 
          onClick={() => onChangeView(AppView.TOOLS)}
          className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-100 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Wallet size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">實用工具</h3>
          <p className="text-sm text-slate-500 mt-1">匯率換算 & 即時翻譯</p>
        </button>

        <button 
          onClick={() => onChangeView(AppView.AI_ASSISTANT)}
          className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md text-left group text-white"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Sparkles size={24} />
          </div>
          <h3 className="font-bold text-lg">AI 導遊</h3>
          <p className="text-sm opacity-80 mt-1">詢問美食推薦與交通資訊</p>
        </button>
      </div>

      {/* Weather Preview (Static Estimate for March) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">首爾 3 月天氣預測</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🌤️</div>
            <div>
              <p className="text-2xl font-bold text-slate-800">10°C <span className="text-sm text-slate-400 font-normal">/ 50°F</span></p>
              <p className="text-slate-500 text-sm">3 月下旬平均氣溫</p>
            </div>
          </div>
          <div className="text-right text-sm text-slate-500 space-y-1">
            <p>🧥 洋蔥式穿搭 (早晚溫差大)</p>
            <p>🌸 櫻花季可能剛開始</p>
            <p>😷 建議攜帶口罩 (防黃沙/空汙)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;