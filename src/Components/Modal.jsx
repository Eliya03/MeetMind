import React, { useState, useEffect } from 'react';
import { UserRoundPlus } from 'lucide-react';

const Modal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (!isOpen && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setShouldRender(false);
      }, 500); // זמן האנימציה של fadeOut
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg w-96 relative transform transition-transform duration-500 ease-in-out ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">הוספת משתתפים</h2>
        <h3 className="text-xs text-center mb-0">*הקלד שם/אימייל/מ.א</h3>
        <input
          type="text"
          placeholder="שם המשתתף"
          className="border p-2 w-full rounded mb-4"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full flex justify-center gap-2">
        הוסף משתתף <span><UserRoundPlus/></span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
