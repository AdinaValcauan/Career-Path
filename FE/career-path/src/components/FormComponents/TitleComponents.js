import React, {useEffect, useRef, useState} from "react";
import {addTitleService, deleteTitleService, updateTitleService,} from "../../services/titleService";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TitleComponent = ({
                            field,
                            isEditing,
                            selectedDay,
                            handleFieldChange,
                            fetchForms,
                            formField,
                            updateOrderForms
                        }) => {
    const textareaRef = useRef(null);
    const [contentT, setContentT] = useState(field.content);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [contentT]);

    const handleOnChange = (e) => {
        const newContent = e.target.value;
        setContentT(newContent);
        handleFieldChange(field.orderForm, newContent);
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleSaveField = async () => {
        if (contentT !== field.content && !field.BeId) {
            const response = await addTitleService(
                selectedDay,
                contentT,
                field.orderForm
            );
            if (response.success) {
                console.log("Titlu adăugat cu succes");
                // Actualizați starea componentei aici, dacă este necesar
            } else {
                console.error(response.error);
            }
        } else if (contentT !== field.content && field.BeId) {
            const updatedTitle = {
                titleId: field.BeId,
                titleText: contentT,
                orderForm: field.orderForm,
                dayId: selectedDay,
            };
            const response = await updateTitleService(updatedTitle);
            if (response.success) {
                console.log("Titlu actualizat cu succes");
                // Actualizați starea componentei aici, dacă este necesar
            } else {
                console.error(response.error);
            }
        }
        await fetchForms();
    };

    const handleDeleteTitle = async (event) => {
        event.preventDefault();

        const {success, error} = await deleteTitleService(field.BeId);
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

    return (
        <div>
      <textarea
          ref={textareaRef}
          className={`input-title ${isEditing ? "input-editing" : ""}`}
          placeholder="Titlu"
          value={contentT}
          onChange={handleOnChange}
          onBlur={handleSaveField}
          readOnly={!isEditing}
      />
            {isEditing && (
                <button
                    className="util-button"
                    onClick={(event) => handleDeleteTitle(event)}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            )}
            {isEditing && (
                <button className="util-button" onClick={() => handleMoveUp(field.id)}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                </button>
            )}
            {isEditing && (
                <button
                    className="util-button"
                    onClick={() => handleMoveDown(field.id)}
                >
                    <FontAwesomeIcon icon={faArrowDown}/>
                </button>
            )}
        </div>
    );
};

export default TitleComponent;
