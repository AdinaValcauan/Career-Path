import React, {useEffect, useRef, useState} from "react";
import {addSubtitleService, deleteSubtitleService, updateSubtitleService,} from "../../services/subtitleService";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubtitleComponent = ({
                               field,
                               isEditing,
                               selectedDay,
                               handleFieldChange,
                               fetchForms,
                               formField,
                               updateOrderForms,
                               handleMoveUp,
                               handleMoveDown,
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
        if (contentS !== field.content && !field.BeId) {
            const response = await addSubtitleService(
                selectedDay,
                contentS,
                field.orderForm
            );
            if (response.error) {
               toast.error("Subtitlul nu a putut fi adăugat");
            }
        } else if (contentS !== field.content && field.BeId) {
            const updatedSubtitle = {
                subtitleId: field.BeId,
                subtitleText: contentS,
                dayId: selectedDay,
                orderForm: field.orderForm,
            };
            const response = await updateSubtitleService(updatedSubtitle);
            if (response.error) {
                toast.error("Subtitlul nu a putut fi actualizat");
            }
        }
        await fetchForms();
    };

    const handleDeleteSubtitle = async (event) => {
        event.preventDefault();

        const {success, error} = await deleteSubtitleService(field.BeId);
        if (success) {
            let formFields = [...formField];

            const deletedFieldIndex = formFields.findIndex(
                (f) => f.orderForm === field.orderForm
            );

            formFields.splice(deletedFieldIndex, 1);
            await updateOrderForms(formFields, deletedFieldIndex);
        } else {
            toast.error("Subtitlul nu a putut fi șters");
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
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            )}
            {isEditing && (
                <button
                    className="util-button"
                    onClick={(event) => handleMoveUp(event, field.orderForm)}
                >
                    <FontAwesomeIcon icon={faArrowUp}/>
                </button>
            )}
            {isEditing && (
                <button
                    className="util-button"
                    onClick={(event) => handleMoveDown(event, field.orderForm)}
                >
                    <FontAwesomeIcon icon={faArrowDown}/>
                </button>
            )}
        </div>
    );
};

export default SubtitleComponent;
