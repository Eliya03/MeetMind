import React, { useState } from 'react';
import { Send, Download, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';

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
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.bg-white');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('MeetingSummary.pdf');
  };

  const handleSendSummary = () => {
    setShowEmailInput(true);
  };
const handleSendEmail = () => {
    if (email) {
      const recipients = email.split(",").map(e => e.trim());
      if (recipients.some(e => !/\S+@\S+\.\S+/.test(e))) {
        alert("אחת או יותר מכתובות המייל אינן תקינות, בדוק שנית.");
        return;
      }

      // הגדרת המשתנה templateParams במקום הנכון
      const templateParams = {
        user_name: 'משתמש יקר',
        to_email: recipients.join(","), // שולח לכמה נמענים
        decisions: decisions.join('\n- '),
        tasks: tasks.join('\n- '),
        open_questions: openQuestions.join('\n- '),
      };

      console.log("נשלח ל-EmailJS:", templateParams); // הדפסת הנתונים לקונסולה לבדיקה

      emailjs.send(
        'MeetMind8930', // Service ID החדש
        'template_zg3zl18', // Template ID החדש
        templateParams,
        '1N7ChyPxXRiQ-nDRM' // Public Key
      )
      .then(() => {
        alert(`הסיכום נשלח ל-${recipients.join(", ")} בהצלחה!`);
        setShowEmailInput(false);
        setEmail('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('שגיאה בשליחת המייל, נסה שנית.');
      });
    } else {
      alert('נא להזין כתובת מייל תקינה.');
    }
};

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold">סיכום פגישה - תדריך מבצעי</h2>
      <div className="space-y-8">
        <SummarySection title="החלטות" items={decisions} icon={CheckCircle} />
        <SummarySection title="משימות" items={tasks} icon={AlertCircle} />
        <SummarySection title="שאלות פתוחות" items={openQuestions} icon={HelpCircle} />
      </div>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-900 text-white rounded-md mt-8"
      >
        <Download size={20} />
        הורד סיכום
      </button>
      <button
        onClick={handleSendSummary}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-900 text-white rounded-md mt-8"
      >
        <Send size={20} />
        שלח סיכום במייל
      </button>
      {showEmailInput && (
        <div className="mt-4 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הכנס כתובת מייל"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleSendEmail}
            className="px-6 py-2 bg-green-600 text-white rounded-md"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};
export default MeetingSummary;
