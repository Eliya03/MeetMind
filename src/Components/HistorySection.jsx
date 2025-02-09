import React from 'react';
import { Search, Calendar, Tag, Eye } from 'lucide-react';

const HistoryItem = ({ title, date, participants, decisions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">{date}</span>
      </div>
      <p className="mb-2">משתתפים: {participants}</p>
      <p className="mb-4">החלטות עיקריות: {decisions}</p>
      <button 
        className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm"
        onClick={() => {}} // Add your view summary handler
      >
        <Eye size={16} />
        צפה בסיכום
      </button>
    </div>
  );
};

const HistorySection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">היסטוריית סיכומים</h2>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש לפי נושא או משתתף..."
            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-md"
          />
        </div>
        
        <select className="px-4 py-2 border border-gray-200 rounded-md min-w-[150px]">
          <option value="">סינון לפי תאריך</option>
          <option value="week">שבוע אחרון</option>
          <option value="month">חודש אחרון</option>
          <option value="year">שנה אחרונה</option>
        </select>
        
        <select className="px-4 py-2 border border-gray-200 rounded-md min-w-[150px]">
          <option value="">סינון לפי סוג</option>
          <option value="operational">תדריך מבצעי</option>
          <option value="training">תדריך אימונים</option>
          <option value="routine">שגרה</option>
        </select>
      </div>

      <div className="space-y-4">
        <HistoryItem 
          title='תדריך מבצעי - מבצע "חומת מגן"'
          date="30/01/2025"
          participants='סא"ל דוד כהן, רס"ן יעל לוי, + 6 נוספים'
          decisions="אישור תכנית מבצעית, הגדלת תקציב אימונים"
        />
        
        <HistoryItem 
          title="תדריך אימונים שבועי"
          date="28/01/2025"
          participants='רס"ן אבי לוי, סרן דנה כהן, + 4 נוספים'
          decisions="עדכון תכנית אימונים, רכש ציוד חדש"
        />
      </div>
    </div>
  );
};

export default HistorySection;