import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Plus, File, StopCircle } from 'lucide-react';

const RecordingControls = ({ isRecording, onToggleRecording, recordingTime }) => {
  return (
    <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
      <button 
        onClick={onToggleRecording}
        className={`flex items-center gap-2 px-6 py-2 rounded-full text-white ${
          isRecording ? 'bg-gray-600' : 'bg-red-600'
        }`}
      >
        {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        <span>{isRecording ? 'עצור הקלטה' : 'התחל הקלטה'}</span>
      </button>
      <div className="font-mono text-lg">{recordingTime}</div>
    </div>
  );
};

const ActiveMeeting = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00:00');
  const [transcript, setTranscript] = useState('תמלול בזמן אמת יופיע כאן...');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setRecordingTime(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, seconds]);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setSeconds(0);
    }
  };

  const handleAddNote = () => {
    const note = prompt('הוסף הערה:');
    if (note) {
      setTranscript(prev => `${prev}\n<span class='text-blue-600 font-bold'>[הערה]</span> ${note}`);
    }
  };

  const handleAddTask = () => {
    const task = prompt('הוסף משימה חדשה:');
    if (task) {
      setTranscript(prev => `${prev}\n<span class='text-yellow-600 font-bold'>[משימה]</span> ${task}`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">פגישה פעילה</h2>
      
      <RecordingControls 
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        recordingTime={recordingTime}
      />

      <div 
        className="min-h-[200px] p-4 border border-gray-200 rounded-lg bg-white"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: transcript }}
      />

      <div className="flex gap-4">
        <button 
          onClick={handleAddNote}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-md"
        >
          <Plus size={20} />
          הוסף הערה
        </button>
        <button 
          onClick={handleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-md"
        >
          <Plus size={20} />
          הוסף משימה
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-md"
        >
          <StopCircle size={20} />
          סיים פגישה
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">מסמכים מצורפים</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <File size={16} />
            <a href="#" className="text-indigo-600 hover:underline">
              מצגת תדריך.pptx
            </a>
          </li>
          <li className="flex items-center gap-2">
            <File size={16} />
            <a href="#" className="text-indigo-600 hover:underline">
              נספח מבצעי.docx
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActiveMeeting;
