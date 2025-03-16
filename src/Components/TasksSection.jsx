import React, { useState } from 'react';
import { AlertCircle, Clock, User, RefreshCw, Eye } from 'lucide-react';

const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-500',
    critical: 'bg-orange-500', 
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  
  return colors[priority] || colors.medium;
};

const getPriorityText = (priority) => {
  const text = {
    high: 'דחוף',
    medium: 'בינוני',
    low: 'נמוך',
    critical: 'ללא עדיפות'

  };
  return text[priority] || text.medium;
};

const TaskItem = ({ task, onUpdateStatus }) => {
  const { title, assignee, dueDate, status, priority } = task;

  const handleStatusUpdate = () => {
    const newStatus = status === "הושלם" ? "בביצוע" : "הושלם";
    onUpdateStatus(task, newStatus);
  };

  const handleViewDetails = () => {
    alert(`🔍 פרטי משימה:\n\n📌 כותרת: ${title}\n👤 אחראי: ${assignee}\n📅 תאריך יעד: ${dueDate}\n⚡ סטטוס: ${status}`);
  };

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
            <User size={16} /> אחראי: {assignee}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Clock size={16} /> תאריך יעד: {dueDate}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> סטטוס: {status}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm"
          onClick={handleStatusUpdate}
        >
          <RefreshCw size={16} />
          עדכן סטטוס
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1 bg-indigo-900 text-white rounded-md text-sm"
          onClick={handleViewDetails}
        >
          <Eye size={16} />
          צפה בפרטים
        </button>
      </div>
    </div>
  );
};

const TasksSection = () => {
  const [tasks, setTasks] = useState([
    { title: "עדכון נהלי אבטחה", assignee: "סרן דנה כהן", dueDate: "05/02/2025", status: "בביצוע", priority: "high" },
    { title: "הכנת תכנית  מעודכן ", assignee: "משה גולדשטיין סאל", dueDate: "10/05/2025", status: "טרם התחיל", priority:    "critical" },
    { title: "הכנת תכנית אימונים מעודכנת", assignee: "רס\"ן יעל לוי", dueDate: "10/02/2025", status: "טרם עודכן", priority: "medium" },
    { title: "ביצוע ביקורת ציוד", assignee: "רס\"ר משה לוי", dueDate: "15/02/2025", status: "הושלם", priority: "low" }
  ]);

  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleFilterChange = (value) => {
    setPriorityFilter(value);
  };

  const handleUpdateStatus = (taskToUpdate, newStatus) => {
    setTasks(tasks.map(task =>
      task.title === taskToUpdate.title ? { ...task, status: newStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task => priorityFilter === 'all' || task.priority === priorityFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">משימות פתוחות</h2>
        <select onChange={(e) => handleFilterChange(e.target.value)} className="px-3 py-2 border rounded-md">
          <option value="all">כל המשימות</option>
          <option value="high">עדיפות גבוהה</option>
          <option value="medium">עדיפות בינונית</option>
          <option value="low">עדיפות נמוכה</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskItem key={index} task={task} onUpdateStatus={handleUpdateStatus} />
          ))
        ) : (
          <p className="text-gray-500 text-center">לא נמצאו משימות תואמות</p>
        )}
      </div>
    </div>
  );
};

export default TasksSection;
