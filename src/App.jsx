import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MeetingsSection from './Components/MeetingsSection';
import ActiveMeeting from './Components/ActiveMeeting';
import HistorySection from './Components/HistorySection';
import TasksSection from './Components/TasksSection';
import MeetingSummary from './Components/MeetingSummary';
import Modal from './Components/Modal';

const App = () => {
  const [currentSection, setCurrentSection] = useState('meetings');
  const [isActiveMeeting, setIsActiveMeeting] = useState(false);
  const [showMeetingSummary, setShowMeetingSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartMeeting = () => {
    setIsActiveMeeting(true);
    setCurrentSection('active-meeting');
    setIsModalOpen(true);
  };

  const handleEndMeeting = () => {
    setIsActiveMeeting(false);
    setShowMeetingSummary(true);
  };

  const renderContent = () => {
    if (isActiveMeeting) {
      return <ActiveMeeting onEndMeeting={handleEndMeeting} />;
    }

    if (showMeetingSummary) {
      return <MeetingSummary onClose={() => setShowMeetingSummary(false)} />;
    }

    switch (currentSection) {
      case 'meetings':
        return <MeetingsSection onNewMeeting={handleStartMeeting} />;
      case 'history':
        return <HistorySection />;
      case 'tasks':
        return <TasksSection />;
      default:
        return <MeetingsSection onNewMeeting={handleStartMeeting} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar 
        activeSection={currentSection}
        onSectionChange={setCurrentSection}
        isActiveMeeting={isActiveMeeting}
      />
      
      <main className="flex-1 p-8 mr-64">
        {renderContent()}
      </main>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> 
    </div>
  );
};

export default App;
