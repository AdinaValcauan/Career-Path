import React, {useEffect, useRef, useState} from "react";
import {addTitleService, deleteTitleService, updateTitleService,} from "../../services/titleService";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TitleComponent = ({
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
            if (response.error) {
                toast.error("Eroare la adăugarea titlului");
            }
        } else if (contentT !== field.content && field.BeId) {
            const updatedTitle = {
                titleId: field.BeId,
                titleText: contentT,
                orderForm: field.orderForm,
                dayId: selectedDay,
            };
            const response = await updateTitleService(updatedTitle);
            if (response.error) {
                toast.error("Eroare la actualizarea titlului");
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
            toast.error("Eroare la ștergerea titlului");
        }
        await fetchForms();
    };

    return (
        <div tabIndex="-1">
      <textarea
          tabIndex="-1"
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

export default TitleComponent;