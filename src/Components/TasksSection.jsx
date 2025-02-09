import React from 'react';
import { AlertCircle, Clock, User, RefreshCw, Eye } from 'lucide-react';

const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };
  return colors[priority] || colors.medium;
};

const getPriorityText = (priority) => {
  const text = {
    high: 'דחוף',
    medium: 'בינוני',
    low: 'נמוך'
  };
  return text[priority] || text.medium;
};

const TaskItem = ({ title, assignee, dueDate, status, priority }) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
        <span className="text-sm">{getPriorityText(priority)}</span>
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-bold text-indigo-900 mb-2">{title}</h4>
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm">
            <User size={16} />
            אחראי: {assignee}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Clock size={16} />
            תאריך יעד: {dueDate}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            סטטוס: {status}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm">
          <RefreshCw size={16} />
          עדכן סטטוס
        </button>
        <button className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm">
          <Eye size={16} />
          צפה בפרטים
        </button>
      </div>
    </div>
  );
};

const TasksSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">משימות פתוחות</h2>
        <select className="px-4 py-2 border border-gray-200 rounded-md min-w-[150px]">
          <option value="all">כל המשימות</option>
          <option value="high">עדיפות גבוהה</option>
          <option value="medium">עדיפות בינונית</option>
          <option value="low">עדיפות נמוכה</option>
        </select>
      </div>

      <div className="space-y-4">
        <TaskItem 
          title="עדכון נהלי אבטחה"
          assignee='סרן דנה כהן'
          dueDate="05/02/2025"
          status="בביצוע"
          priority="high"
        />
        
        <TaskItem 
          title="הכנת תכנית אימונים מעודכנת"
          assignee='רס"ן יעל לוי'
          dueDate="10/02/2025"
          status="טרם התחיל"
          priority="medium"
        />
      </div>
    </div>
  );
};

export default TasksSection;