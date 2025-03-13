import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Plus, File, StopCircle, UsersRound, Pencil, Search } from 'lucide-react';

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

const ActiveMeeting = ({ onEndMeeting, participants, onEditParticipants, isModalOpen }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00:00');
  const [transcript, setTranscript] = useState('תמלול בזמן אמת יופיע כאן...');
  const [seconds, setSeconds] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showHighlight, setShowHighlight] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(() => {
    return localStorage.getItem('hasShownMeetingAnimation') === 'true'
  });
  const [isBlurFading, setIsBlurFading] = useState(false);

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

  useEffect(() => {
    let timer1, timer2;
    
    if (!isModalOpen && !hasShownInitialAnimation) {
      setShowHighlight(true);
      setIsAnimating(true);
      localStorage.setItem('hasShownMeetingAnimation', 'true');
  
      timer1 = setTimeout(() => {
        setIsBlurFading(true);
      }, 4000);
  
      timer2 = setTimeout(() => {
        setShowHighlight(false);
        setIsAnimating(false);
        setIsBlurFading(false);
        setHasShownInitialAnimation(true);
      }, 4300);
    }
  
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isModalOpen, hasShownInitialAnimation]);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setSeconds(0);
    }
  };

  const handleAddNote = () => {
    const note = prompt('הוסף הערה:');
    if (note) {
      setTranscript(prev => `${prev}\n<span class="text-blue-600 font-bold">${note}</span>`);
    }
  };

  const handleAddTask = () => {
    const task = prompt('הוסף משימה חדשה:');
    if (task) {
      setTranscript(prev => `${prev}\n<span class="text-yellow-600 font-bold">${task}</span>`);
    }
  };

  const filteredParticipants = participants.filter(participant =>
    participant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.id?.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 relative">
      {showHighlight && (
  <div
    className={`fixed inset-0 blur-background ${isBlurFading ? 'fade-out' : ''}`}
    onTransitionEnd={() => {
      if (isBlurFading) {
        setShowHighlight(false);
        setIsBlurFading(false);
      }
    }}
  />
)}

      <h2 className="text-2xl font-bold relative z-10">פגישה פעילה</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <RecordingControls
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            recordingTime={recordingTime}
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">תיבת תמלול</h3>
            <div
              className={`min-h-[200px] p-4 border border-gray-200 rounded-lg bg-white overflow-auto relative ${
                isAnimating ? 'animate-pulseHighlight' : ''
              }`}
              contentEditable
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: transcript }}
            />
          </div>
        </div>

        <div
          className={`w-full bg-gray-100 p-4 rounded-lg max-h-[400px] overflow-auto relative ${
            isAnimating ? 'animate-pulseHighlight' : ''
          }`}
        >
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="חפש לפי שם, אימייל או מ.א..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search size={20} className="absolute left-3 top-2 text-gray-400" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              משתתפים ({filteredParticipants.length}) <UsersRound size={20} />
            </h3>
            <button
              onClick={onEditParticipants}
              className="text-blue-500 text-sm px-3 py-1 border rounded-lg hover:bg-blue-50 flex justify-center items-center gap-2 group"
            >
              ערוך 
              <Pencil size={17} className="transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
          {filteredParticipants.length > 0 ? (
            <ul className="space-y-3 text-sm">
              {filteredParticipants.map((participant, index) => (
                <li key={participant.id} className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{index + 1}.</span>
                    <div>
                      <p>{participant.name || 'ללא שם'}</p>
                      <p className="text-gray-600">{participant.email || 'ללא אימייל'}</p>
                      <p className="text-gray-600">מ.א: {participant.id || 'ללא מ.א'}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">אין משתתפים תואמים</p>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex gap-4 mt-4">
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
            onClick={onEndMeeting}
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
    </div>
  );
};

export default ActiveMeeting;