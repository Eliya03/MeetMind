import React from 'react';

// components/MeetingCard.jsx
const MeetingCard = ({ title, date, participants, duration, decisions, tasks, onView }) => (
  <div className="bg-white p-5 rounded-lg shadow-md">
    <h3 className="text-lg font-bold text-indigo-900 mb-3">{title} - {date}</h3>
    <p className="mb-2">משתתפים: {participants}</p>
    <p className="mb-2">משך: {duration} דקות</p>
    <p className="mb-2">החלטות: {decisions}</p>
    <p className="mb-4">משימות: {tasks}</p>
    <button 
      onClick={onView}
      className="bg-indigo-900 text-white px-4 py-2 rounded text-sm hover:bg-indigo-800"
    >
      צפה בפרטים
    </button>
  </div>
);

// components/MeetingsSection.jsx
const MeetingsSection = ({ onNewMeeting }) => {
  const meetings = [
   
      {
        id: 1,
        title: "תדריך מבצעי",
        date: "28/02/2025", // תאריך חוקי במקום 30/02/2025
        participants: "8",
        duration: "45",
        decisions: "3",
        tasks: "5"
      },
 
    {
      id: 2,
      title: "תדריך אימונים",
      date: "29/01/2025",
      participants: "5",
      duration: "30",
      decisions: "2",
      tasks: "3"
    }
  ];

  return (
    <div>
      <button 
        onClick={onNewMeeting}
        className="bg-green-500 text-white px-6 py-3 rounded mb-5 hover:bg-green-600 transition-colors"
      >
        פגישה חדשה +
      </button>
      
      <h2 className="text-xl font-bold mb-4">פגישות אחרונות</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {meetings.map(meeting => (
          <MeetingCard
            key={meeting.id}
            {...meeting}
            onView={() => console.log('View meeting:', meeting.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingsSection;