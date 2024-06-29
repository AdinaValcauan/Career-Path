import React, {useEffect, useRef, useState} from "react";
import {addParagraphService, deleteParagraphService, updateParagraphService,} from "../../services/paragraphService";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ParagraphComponent = ({
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
    const [contentP, setContentP] = useState(field.content);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [contentP]);

    const handleOnChange = (e) => {
        const newContent = e.target.value;
        setContentP(newContent);
        handleFieldChange(field.orderForm, newContent);
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleDeleteParagraph = async (event) => {
        event.preventDefault();

        const {success, error} = await deleteParagraphService(field.BeId);
        if (success) {
            let formFields = [...formField];

            const deletedFieldIndex = formFields.findIndex(
                (f) => f.orderForm === field.orderForm
            );

            formFields.splice(deletedFieldIndex, 1);
            await updateOrderForms(formFields, deletedFieldIndex);
        } else {
            console.error(error); // TODO: in caz de eroare sa apara un popup cu mesajul de eroare
        }
        await fetchForms();
    };

    const handleSaveField = async () => {
        if (contentP !== field.content && !field.BeId) {
            const response = await addParagraphService(
                contentP,
                field.orderForm,
                selectedDay
            );
            if (response.success) {
                console.log("Paragraph adăugat cu succes");
                // Actualizați starea componentei aici, dacă este necesar
            } else {
                console.error(response.error);
            }
        } else if (contentP !== field.content && field.BeId) {
            const updatedParagraph = {
                paragraphId: field.BeId,
                paragraphText: contentP,
                dayId: selectedDay,
                orderForm: field.orderForm,
            };
            const response = await updateParagraphService(updatedParagraph);
            if (response.success) {
                console.log("Paragraph actualizat cu succes");
                // Actualizați starea componentei aici, dacă este necesar
            } else {
                console.error(response.error);
            }
        }
        await fetchForms();
    };

    return (
        <div>
      <textarea
          ref={textareaRef}
          className={`input-paragraph ${isEditing ? "input-editing" : ""}`}
          placeholder="Paragraf"
          value={contentP}
          onChange={handleOnChange}
          onBlur={handleSaveField}
          readOnly={!isEditing}
      />
            {isEditing && (
                <button
                    className="util-button"
                    onClick={(event) => handleDeleteParagraph(event)}
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

export default ParagraphComponent;
