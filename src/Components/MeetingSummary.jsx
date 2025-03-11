import React from 'react';
import { Send, Download, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const SummarySection = ({ title, items, icon: Icon }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Icon size={20} />
        {title}
      </h3>
      <ul className="space-y-2 pr-6 relative">
        {items.map((item, index) => (
          <li key={index} className="relative before:content-['•'] before:absolute before:right-[-20px] before:text-indigo-900">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MeetingSummary = () => {
  const decisions = [
    'אישור תכנית מבצעית לשבוע הקרוב',
    'הגדלת תקציב אימונים ב-20%',
    'עדכון נהלי אבטחה עד סוף החודש'
  ];

  const tasks = [
    'עדכון נהלי אבטחה - אחראי: סרן דנה כהן - תאריך יעד: 05/02/2025',
    'הכנת תכנית אימונים מעודכנת - אחראי: רס"ן יעל לוי - תאריך יעד: 10/02/2025'
  ];

  const openQuestions = [
    'זמינות ציוד חדש לאימונים',
    'תיאום מול יחידות תומכות'
  ];

  const handleSendSummary = () => {
    alert('סיכום הפגישה נשלח בהצלחה לכל המשתתפים!');
  };
  
  const handleSendSummaryd = () => {
    alert('סיכום הפגישה ירד בהצלחה !');
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold">סיכום פגישה - תדריך מבצעי</h2>
      
      <div className="space-y-8">
        <SummarySection 
          title="החלטות"
          items={decisions}
          icon={CheckCircle}
        />
        
        <SummarySection 
          title="משימות"
          items={tasks}
          icon={AlertCircle}
        />
        
        <SummarySection 
          title="שאלות פתוחות"
          items={openQuestions}
          icon={HelpCircle}
        />
      </div>
      <button
        onClick={handleSendSummaryd}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-900 text-white rounded-md mt-8"
      >
        < Download size={20} />
        הורד סיכום
      </button>

      <button
        onClick={handleSendSummary}
        className="flex  gap-2 px-6 py-3 bg-indigo-900 text-white rounded-md mt-8"
      >
        <Send size={20} />
        שלח סיכום במייל
      </button>
    </div>
  );
};

export default MeetingSummary;