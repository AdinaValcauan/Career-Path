import React, { useEffect, useRef } from "react";
import {
  faArrowUp,
  faArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubtitleComponent = ({
  field,
  isEditing,
  handleFieldChange,
  handleDeleteField,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [field.content]);

  const handleOnChange = (e) => {
    handleFieldChange(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        className={`input-subtitle ${isEditing ? "input-editing" : ""}`}
        placeholder="Subtitlu"
        value={field.content}
        onChange={handleOnChange}
        readOnly={!isEditing}
      />
      {isEditing && (
        <button
          className="util-button"
          onClick={() => handleDeleteField(field.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
      {isEditing && (
        <button className="util-button" onClick={() => handleMoveUp(field.id)}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      {isEditing && (
        <button
          className="util-button"
          onClick={() => handleMoveDown(field.id)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  );
};

export default SubtitleComponent;
