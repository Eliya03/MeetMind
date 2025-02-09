// components/Sidebar.jsx
import React from 'react';
import { Calendar, Clock, FileText, CheckSquare } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'meetings', icon: Calendar, text: 'פגישות' },
    { id: 'history', icon: FileText, text: 'היסטוריית סיכומים' },
    { id: 'tasks', icon: CheckSquare, text: 'משימות פתוחות' }
  ];

  return (
    <div className="w-64 h-screen bg-indigo-900 p-5 text-white fixed right-0">
      <div className="text-2xl font-bold mb-8">מערכת תיעוד</div>
      <ul className="space-y-4">
        {menuItems.map(({ id, icon: Icon, text}) => (
          <li key={id}>
            <button 
              onClick={() => onSectionChange(id)}
              className={`flex items-center p-2 w-full rounded transition-colors ${
                activeSection === id ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`}
            >
              <Icon className="ml-2" size={20} />
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;