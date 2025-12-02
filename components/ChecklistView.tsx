import React, { useState } from 'react';
import { DEFAULT_CHECKLIST } from '../constants';
import { ChecklistItem } from '../types';
import { Check, Plus, Trash2 } from 'lucide-react';

const ChecklistView: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
      category: 'essential'
    };
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const renderCategory = (title: string, category: string) => {
    const categoryItems = items.filter(i => i.category === category);
    if (categoryItems.length === 0) return null;

    return (
      <div className="mb-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-3 uppercase text-sm tracking-wider flex items-center">
          {title}
          <span className="ml-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px]">
            {categoryItems.filter(i => i.completed).length}/{categoryItems.length}
          </span>
        </h3>
        <div className="space-y-2">
          {categoryItems.map(item => (
            <div 
              key={item.id}
              className={`
                group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer
                ${item.completed 
                  ? 'bg-slate-50 border-slate-100' 
                  : 'bg-white border-slate-200 hover:border-indigo-300'}
              `}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors
                  ${item.completed 
                    ? 'bg-indigo-500 border-indigo-500 text-white' 
                    : 'border-slate-300 bg-white group-hover:border-indigo-400'}
                `}>
                  {item.completed && <Check size={14} strokeWidth={3} />}
                </div>
                <span className={`font-medium ${item.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {item.text}
                </span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">行李準備清單</h2>
           <p className="text-slate-500">別忘了檢查這些重要的物品！</p>
        </div>
        <div className="text-right hidden sm:block">
           <div className="text-3xl font-bold text-indigo-600">
             {Math.round((items.filter(i => i.completed).length / items.length) * 100)}%
           </div>
           <div className="text-xs text-slate-400">完成度</div>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="新增項目..."
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm"
        />
        <button 
          onClick={addItem}
          className="bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-2">
        {renderCategory('🛂 重要文件', 'essential')}
        {renderCategory('📱 電子產品 & App', 'electronics')}
        {renderCategory('👗 衣物 (早春 5-15度)', 'clothing')}
        {renderCategory('🧴 盥洗與個人用品', 'toiletries')}
      </div>
    </div>
  );
};

export default ChecklistView;