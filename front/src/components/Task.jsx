import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Task = ({ text, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(text);

  useEffect(() => {
    const storedText = localStorage.getItem(`TaskText_${text}`);
    if (storedText && storedText.trim() !== "") {
      setTaskText(storedText);
    }
  }, [text]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (taskText.trim() !== "") {
      setIsEditing(false);
      localStorage.setItem(`TaskText_${text}`, taskText); // Save the edited text
    }
  };

  const handleChange = (e) => {
    setTaskText(e.target.value);
  };

  return (
    <div className="bg-blue-300 text-white p-2 rounded-lg max-h-fit">
      {isEditing ? (
        <input
          className="block w-60 py-2.3 px-0 text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
          type="text"
          value={taskText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="flex justify-between">
          <div className="break-all" onDoubleClick={handleDoubleClick}>
            {taskText}
          </div>
          <i onClick={onDeleteTask} className="bi bi-trash2 cursor-pointer"></i>
        </div>
      )}
    </div>
  );
};

Task.propTypes = {
  text: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
