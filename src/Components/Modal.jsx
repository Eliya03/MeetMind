import React, { useState, useEffect, useRef } from "react";
import { UserRoundPlus, Pencil, CircleCheck, CircleX, Trash2, UsersRound } from "lucide-react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";


const predefinedParticipants = [
  { name: "יוסי כהן", email: "yossi@company.com", id: "123456" },
  { name: "מיכל לוי", email: "michal@company.com", id: "654321" },
  { name: "דניאל ישראלי", email: "daniel@company.com", id: "789012" },
];

const Modal = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isBulkDeleteConfirmOpen, setIsBulkDeleteConfirmOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setShouldRender(false);
    }, 500);
  };

  const getParticipantData = (value) => {
    return predefinedParticipants.find(
      (p) =>
        p.name.toLowerCase() === value.toLowerCase() ||
        p.email.toLowerCase() === value.toLowerCase() ||
        p.id === value
    );
  };

  const handleAddParticipant = () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    let newParticipant = { name: "", email: "", id: "" };

    if (getParticipantData(trimmed)) {
      newParticipant = getParticipantData(trimmed);
      newParticipant.manual = false;
    } else if (trimmed.includes("@")) {
      newParticipant.email = trimmed;
      newParticipant.manual = true;
    } else if (/^\d+$/.test(trimmed)) {
      newParticipant.id = trimmed;
      newParticipant.manual = true;
    } else {
      newParticipant.name = trimmed;
      newParticipant.manual = true;
    }

    if (!newParticipant.id) {
      newParticipant.id = Date.now().toString();
    }

    setParticipants((prev) => [...prev, newParticipant]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  const handleRemoveParticipant = (index) => {
    setIsDeleting(index);
  };

  const confirmDelete = () => {
    if (isDeleting !== null) {
      setParticipants((prev) =>
        prev.filter((_, i) => i !== isDeleting)
      );
      setIsDeleting(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleting(null);
  };

  const handleEditClick = (index) => {
    if (participants[index].manual) {
      setEditingIndex(index);
    }
  };

  const handleEditChange = (index, field, value) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateParticipant = (participant) => {
    if (participant.email && !isValidEmail(participant.email)) {
      alert("האימייל לא תקין!");
      return false;
    }
    if (participant.id && !/^\d+$/.test(participant.id)) {
      alert("המזהה צריך להיות מספר בלבד!");
      return false;
    }
    if (
      participant.name &&
      (isValidEmail(participant.name) || /^\d+$/.test(participant.name))
    ) {
      alert("שם לא יכול להיות אימייל או מספר בלבד!");
      return false;
    }
    return true;
  };

  const handleEditConfirm = () => {
    const participant = participants[editingIndex];
    if (!validateParticipant(participant)) {
      return;
    }
    setEditingIndex(null);
  };

  const handleContinue = () => {
    handleClose();
  };

  const handleBulkDelete = () => {
    setParticipants((prev) =>
      prev.filter((p) => !selectedParticipants.includes(p.id))
    );
    setSelectedParticipants([]);
    setIsBulkDeleteConfirmOpen(false);
    setIsSelecting(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 pb-20 rounded-lg w-[900px] relative transform transition-transform duration-500 ease-in-out flex flex-col gap-4 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 text-xl z-10"
        >
          &times;
        </button>

        <div className="flex gap-4">
          <div className="w-1/4 flex flex-col justify-center items-center gap-4">
            <h2 className="text-xl font-bold text-center flex justify-center items-center gap-2">
              הוספת משתתפים
              <span><UsersRound /></span>
              </h2>
            <div className="flex flex-col w-full">
              <label htmlFor="participant-input" className="text-xs text-gray-600 mb-1 text-center">
                *הקלד שם/מייל/מ.א
              </label>
              <input
                id="participant-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="לדוגמה: user@company.com"
                title={inputValue ? " " : "user@company.com"}
                className="border p-3 w-full rounded-lg"
              />
            </div>
            <button
              onClick={handleAddParticipant}
              disabled={isSelecting}
              className={`bg-green-500 text-white px-6 py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300 ${
                isSelecting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              <span>הוסף משתתף</span>
              <UserRoundPlus />
            </button>
          </div>

          <div className="w-3/4 bg-gray-100 p-4 rounded-lg shadow-md overflow-auto max-h-[400px]">
  <h4 className="font-semibold mb-2 flex items-center">
    {/* הטקסט - ממורכז */}
    <span className="flex-grow text-center flex justify-center gap-2">({participants.length}) משתתפים<span><UsersRound /></span></span>
    

    {/* הכפתור - בצד ימין (בעברית: שמאל) */}
    {participants.length > 0 && (
      <button
        onClick={() => {
          setIsSelecting(!isSelecting);
          setSelectedParticipants([]);
        }}
        className="text-blue-500 text-sm px-3 py-1 border rounded-lg hover:bg-blue-50 flex items-center gap-1"
      >
        {isSelecting ? 'בטל בחירה' : 'בחירה מרובה'}
        {isSelecting ? <MdCheckCircle size={20} /> : <MdRadioButtonUnchecked size={20} />}
      </button>
    )}
  </h4>
            {participants.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-center w-6"></th>
                    <th className="p-2 text-center w-6">#</th>
                    <th className="p-2 text-right w-32">שם</th>
                    <th className="p-2 text-center w-48">אימייל</th>
                    <th className="p-2 text-left w-24">מ.א</th>
                    <th className="p-2 text-left w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => {
                    const rowClasses = `
                      transition-all duration-300
                      ${editingIndex !== null && editingIndex !== index ? "opacity-50" : "opacity-100"}
                    `;
                    return (
                      <tr key={index} className={rowClasses}>
                        <td className="p-2 text-center">
                          {editingIndex === index ? (
                            <button
                              onClick={handleEditConfirm}
                              className="text-green-500 transition-all duration-300"
                            >
                              <CircleCheck size={20} />
                            </button>
                          ) : (
                            participant.manual && (
                              <button
                                onClick={() => handleEditClick(index)}
                                className="text-blue-500 transition-all duration-300"
                              >
                                <Pencil size={20} />
                              </button>
                            )
                          )}
                        </td>
                        <td className="p-2 text-center">{index + 1}</td>
                        {["name", "email", "id"].map((field) => (
                          <td key={field} className="p-2 text-right">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={participant[field]}
                                onChange={(e) =>
                                  handleEditChange(index, field, e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleEditConfirm();
                                  }
                                }}
                                className="border rounded p-1 w-full transition-all duration-300"
                              />
                            ) : (
                              <span className="truncate">
                                {participant[field] || "-"}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="p-2 text-left">
                          {isSelecting ? (
                            <input
                              type="checkbox"
                              checked={selectedParticipants.includes(participant.id)}
                              onChange={() => {
                                setSelectedParticipants((prev) =>
                                  prev.includes(participant.id)
                                    ? prev.filter((id) => id !== participant.id)
                                    : [...prev, participant.id]
                                );
                              }}
                              className="w-4 h-4 cursor-pointer"
                            />
                          ) : (
                            <button
                              onClick={() => handleRemoveParticipant(index)}
                              className="text-red-500 hover:text-red-700 transition-all duration-300"
                            >
                              <CircleX size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600">אין משתתפים</p>
            )}
          </div>
        </div>

        {participants.length > 0 && (
          <button
            onClick={handleContinue}
            disabled={isSelecting}
            className={`absolute bottom-4 left-4 bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 ${
              isSelecting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            המשך
          </button>
        )}

        {isSelecting && selectedParticipants.length > 0 && (
          <button
            onClick={() => setIsBulkDeleteConfirmOpen(true)}
            className="absolute bottom-4 right-[34px] bg-red-500 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-red-600 flex items-center gap-2"
          >
            מחק נבחרים ({selectedParticipants.length})
            <Trash2 size={18} />
          </button>
        )}

        {isDeleting !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p>האם אתה בטוח שברצונך למחוק את המשתתף הזה?</p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  כן
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}

        {isBulkDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p>האם אתה בטוח שברצונך למחוק את {selectedParticipants.length} המשתתפים הנבחרים?</p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  כן
                </button>
                <button
                  onClick={() => setIsBulkDeleteConfirmOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;