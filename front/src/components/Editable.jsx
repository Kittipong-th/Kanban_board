import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Editable = ({ initialText, uniqueKey }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    const storedText = localStorage.getItem(`Board_${uniqueKey}`);
    if (storedText) {
      setText(storedText);
    }
  }, [uniqueKey]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (text.trim() !== "") {
      setIsEditing(false);
      localStorage.setItem(`Board_${uniqueKey}`, text);
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

Editable.propTypes = {
  initialText: PropTypes.string.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default Editable;
