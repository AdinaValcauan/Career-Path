import React, { useEffect, useRef } from "react";
import {
  faArrowUp,
  faArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionComponent = ({
  field,
  isEditing,
  handleFieldChange,
  handleDeleteField,
  handleAnswerChange,
  handleMoveUp,
  handleMoveDown,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [field.content]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [field.answer]);

  const handleOnChange = (e) => {
    handleFieldChange(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleOnChangeAnswer = (e) => {
    handleAnswerChange(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        className={`input-question ${isEditing ? "input-editing" : ""}`}
        placeholder="Întrebare"
        value={field.content}
        onChange={handleOnChange}
        readOnly={!isEditing}
      />
      <textarea
        ref={textareaRef}
        className={`input-answer ${isEditing ? "" : "input-editing"}`}
        placeholder="Răspunsul tău"
        value={field.answer}
        onChange={handleOnChangeAnswer}
        readOnly={isEditing}
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

export default QuestionComponent;
