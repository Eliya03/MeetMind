import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const HistoryItem = ({ title, date, participants, decisions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">{date}</span>
      </div>
      <p className="mb-2">משתתפים: {participants}</p>
      <p className="mb-4">החלטות עיקריות: {decisions}</p>
      <button className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm">
        <Eye size={16} />
        צפה בסיכום
      </button>
    </div>
  );
};

const HistorySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const meetings = [
    {
      title: 'תדריך מבצעי - מבצע "חומת מגן"',
      date: '28/02/2025',
      participants: 'סא"ל דוד כהן, רס"ן יעל לוי, + 6 נוספים',
      decisions: 'אישור תכנית מבצעית, הגדלת תקציב אימונים',
      type: 'operational',
    },
    {
      title: 'תדריך מבצעי - מבצע "חומת מגן"',
      date: '11/03/2025',
      participants: 'סא"ל דוד כהן, רס"ן יעל לוי, + 6 נוספים',
      decisions: 'אישור תכנית מבצעית, הגדלת תקציב אימונים',
      type: 'operational',
    },
    {
      title: 'תדריך אימונים שבועי',
      date: '02/01/2024',
      participants: 'רס"ן אבי לוי, סרן דנה כהן, + 4 נוספים',
      decisions: 'עדכון תכנית אימונים, רכש ציוד חדש',
      type: 'training',
    },
  ];

  const getFilteredDate = (filter) => {
    const currentDate = new Date();
    switch (filter) {
      case 'week':
        currentDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
      case 'year':
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        return null;
    }
    return currentDate;
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearchQuery = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               meeting.participants.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateFilter = dateFilter ? parseDate(meeting.date) >= getFilteredDate(dateFilter) : true;
    const matchesTypeFilter = typeFilter ? meeting.type === typeFilter : true;
    return matchesSearchQuery && matchesDateFilter && matchesTypeFilter;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">היסטוריית סיכומים</h2>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חיפוש לפי נושא או משתתף..."
            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-md"
          />
        </div>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-md min-w-[150px]"
        >
          <option value="">סינון לפי תאריך</option>
          <option value="week">שבוע אחרון</option>
          <option value="month">חודש אחרון</option>
          <option value="year">שנה אחרונה</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-md min-w-[150px]"
        >
          <option value="">סינון לפי סוג</option>
          <option value="operational">תדריך מבצעי</option>
          <option value="training">תדריך אימונים</option>
          <option value="routine">שגרה</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting, index) => (
            <HistoryItem
              key={index}
              title={meeting.title}
              date={meeting.date}
              participants={meeting.participants}
              decisions={meeting.decisions}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">לא נמצאו פגישות תואמות</p>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
