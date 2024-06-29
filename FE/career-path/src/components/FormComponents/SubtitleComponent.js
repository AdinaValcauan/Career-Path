import React, { useEffect, useRef, useState } from "react";
import {
  addSubtitleService,
  deleteSubtitleService,
  updateSubtitleService,
} from "../../services/subtitleService";
import {
  faArrowUp,
  faArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTitleService } from "../../services/titleService";

const SubtitleComponent = ({
  field,
  isEditing,
  selectedDay,
  handleFieldChange,
  handleDeleteField,
  fetchForms,
}) => {
  const textareaRef = useRef(null);
  const [contentS, setContentS] = useState(field.content);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [contentS]);

  const handleOnChange = (e) => {
    const newContent = e.target.value;
    setContentS(newContent);
    handleFieldChange(field.orderForm, newContent);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSaveField = async () => {
    if (content !== field.content && !field.BeId) {
      const response = await addSubtitleService(
        selectedDay,
        contentS,
        field.orderForm
      );
      if (response.success) {
        console.log("Subitlu adăugat cu succes");
        // Actualizați starea componentei aici, dacă este necesar
      } else {
        console.error(response.error);
      }
    } else if (contentS !== field.content && field.BeId) {
      const updatedSubtitle = {
        subtitleId: field.BeId,
        subtitleText: contentS,
        dayId: selectedDay,
        orderForm: field.orderForm,
      };
      const response = await updateSubtitleService(updatedSubtitle);
      if (response.success) {
        console.log("Subitlu actualizat cu succes");
        // Actualizați starea componentei aici, dacă este necesar
      } else {
        console.error(response.error);
      }
    }
    await fetchForms();
  };

  const handleDeleteSubtitle = async (event) => {
    event.preventDefault();

    const { success, error } = await deleteSubtitleService(field.BeId);
    if (success) {
      console.log("Subtitlu șters cu succes");
    } else {
      console.error(error);
    }
    await fetchForms();
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        className={`input-subtitle ${isEditing ? "input-editing" : ""}`}
        placeholder="Subtitlu"
        value={contentS}
        onChange={handleOnChange}
        onBlur={handleSaveField}
        readOnly={!isEditing}
      />
      {isEditing && (
        <button
          className="util-button"
          onClick={(event) => handleDeleteSubtitle(event)}
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
