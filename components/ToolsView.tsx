import React, { useState } from 'react';
import { translateToKorean } from '../services/geminiService';
import { ArrowRightLeft, Smartphone, Phone } from 'lucide-react';

const ToolsView: React.FC = () => {
  // Currency State
  const [amount, setAmount] = useState<number>(1000);
  const [currencyMode, setCurrencyMode] = useState<'KRW_TO_TWD' | 'TWD_TO_KRW'>('KRW_TO_TWD');
  // Simple fixed rate (approximate for TWD)
  // 1 KRW ~ 0.024 TWD, 1 TWD ~ 41.6 KRW
  const EXCHANGE_RATE = 0.024; 
  
  // Translation State
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translationResult, setTranslationResult] = useState<{korean: string, romanization: string, notes?: string} | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!textToTranslate.trim()) return;
    setIsTranslating(true);
    const result = await translateToKorean(textToTranslate);
    setTranslationResult(result);
    setIsTranslating(false);
  };

  const convertedValue = currencyMode === 'KRW_TO_TWD' 
    ? (amount * EXCHANGE_RATE).toFixed(1)
    : (amount / EXCHANGE_RATE).toFixed(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Currency Converter */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="bg-amber-100 text-amber-600 p-2 rounded-lg mr-3">₩</span>
          匯率換算 (KRW/TWD)
        </h3>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
             <span className="font-semibold text-slate-500">{currencyMode === 'KRW_TO_TWD' ? '韓元 (₩)' : '新台幣 (NT$)'}</span>
             <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="bg-transparent text-right text-2xl font-bold outline-none w-1/2"
             />
          </div>

          <div className="flex justify-center -my-2 z-10">
            <button 
              onClick={() => setCurrencyMode(currencyMode === 'KRW_TO_TWD' ? 'TWD_TO_KRW' : 'KRW_TO_TWD')}
              className="bg-white border border-slate-200 p-2 rounded-full shadow-sm hover:rotate-180 transition-transform duration-300"
            >
              <ArrowRightLeft size={20} className="text-indigo-600" />
            </button>
          </div>

          <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl border border-indigo-100">
             <span className="font-semibold text-indigo-400">{currencyMode === 'KRW_TO_TWD' ? '新台幣 (NT$)' : '韓元 (₩)'}</span>
             <span className="text-2xl font-bold text-indigo-700">{convertedValue}</span>
          </div>

          <p className="text-xs text-center text-slate-400 mt-2">
            *僅供參考，實際匯率以銀行為準 (1 KRW ≈ {EXCHANGE_RATE} TWD)。
          </p>
        </div>

        {/* Emergency Numbers */}
        <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center"><Phone size={16} className="mr-2"/> 緊急聯絡電話</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-red-50 text-red-700 p-3 rounded-lg flex justify-between">
                    <span>報案/警察</span>
                    <span className="font-bold">112</span>
                </div>
                <div className="bg-red-50 text-red-700 p-3 rounded-lg flex justify-between">
                    <span>火警/救護</span>
                    <span className="font-bold">119</span>
                </div>
                <div className="col-span-2 bg-blue-50 text-blue-700 p-3 rounded-lg flex justify-between">
                    <span>韓國旅遊諮詢 (有中文)</span>
                    <span className="font-bold">1330</span>
                </div>
            </div>
        </div>
      </div>

      {/* Translator */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">Aa</span>
          中韓翻譯
        </h3>

        <div className="space-y-4">
          <textarea 
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32"
            placeholder="請輸入想翻譯的中文 (例如：這個多少錢？)"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
          />
          
          <button 
            onClick={handleTranslate}
            disabled={isTranslating}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isTranslating ? '翻譯中...' : '翻譯成韓文'}
          </button>

          {translationResult && (
            <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200 animate-fade-in">
              <p className="text-3xl font-bold text-slate-800 mb-2 font-['Noto_Sans_KR']">
                {translationResult.korean}
              </p>
              <p className="text-slate-500 mb-3 italic">
                {translationResult.romanization}
              </p>
              {translationResult.notes && (
                <div className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded-lg">
                  💡 說明: {translationResult.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* App Recommendations */}
      <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4">韓國旅遊必備 App</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center text-center">
             <Smartphone className="text-green-600 mb-2" />
             <span className="font-bold text-green-800">Naver Map</span>
             <span className="text-xs text-green-600 mt-1">必備地圖，比 Google 好用</span>
          </div>
          <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 flex flex-col items-center text-center">
             <Smartphone className="text-yellow-600 mb-2" />
             <span className="font-bold text-yellow-800">KakaoTalk</span>
             <span className="text-xs text-yellow-600 mt-1">韓國人的 LINE</span>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center">
             <Smartphone className="text-blue-600 mb-2" />
             <span className="font-bold text-blue-800">Papago</span>
             <span className="text-xs text-blue-600 mt-1">最準確的韓語翻譯</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
             <Smartphone className="text-slate-600 mb-2" />
             <span className="font-bold text-slate-800">Subway Korea</span>
             <span className="text-xs text-slate-600 mt-1">地鐵路線查詢神氣</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsView;