import React, {useEffect, useRef, useState} from "react";
import {addQuestionService, deleteQuestionService, updateQuestionService,} from "../../services/questionService";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionComponent = ({
                               field,
                               isEditing,
                               selectedDay,
                               handleFieldChange,
                               fetchForms,
                               formField,
                               setFormField,
                               updateOrderForms,
                               handleSaveAnswer,
                               handleMoveUp,
                               handleMoveDown,
                           }) => {
    const textareaRef = useRef(null);
    const [contentQ, setContentQ] = useState(field.content);
    const [answer, setAnswer] = useState(field.answer);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [contentQ]);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [answer]);

    const handleOnChange = (e) => {
        const newContent = e.target.value;
        setContentQ(newContent);
        handleFieldChange(field.orderForm, newContent);
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleOnChangeAnswer = (e) => {
        const newAnswer = e.target.value;
        setAnswer(newAnswer);
        handleAnswerChange(field.orderForm, newAnswer);
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleAnswerChange = (orderForm, answer) => {
        setFormField(
            formField.map((field) => {
                if (field.orderForm === orderForm) {
                    return {...field, answer: answer};
                } else {
                    return field;
                }
            })
        );
    };

    const handleSaveField = async () => {
        if (contentQ !== field.content && !field.BeId) {
            const response = await addQuestionService(
                contentQ,
                selectedDay,
                field.orderForm
            );
            if (response.error) {
                toast.error("Întrebarea nu a putut fi adăugată");
            }
        } else if (contentQ !== field.content && field.BeId) {
            const updatedQuestion = {
                questionId: field.BeId,
                questionText: contentQ,
                dayId: selectedDay,
                orderForm: field.orderForm,
            };
            const response = await updateQuestionService(updatedQuestion);
            if (response.error) {
                toast.error("Întrebarea nu a putut fi actualizată");
            }
        }
        await fetchForms();
    };

    const handleDeleteQuestion = async (event) => {
        event.preventDefault();

        await fetchForms();

        const {success, error} = await deleteQuestionService(field.BeId);
        if (success) {
            let formFields = [...formField];

            const deletedFieldIndex = formFields.findIndex(
                (f) => f.orderForm === field.orderForm
            );

            formFields.splice(deletedFieldIndex, 1);
            await updateOrderForms(formFields, deletedFieldIndex);
        } else {
            toast.error("Întrebarea nu a putut fi ștearsă");
        }
        await fetchForms();
    };

    return (
        <div tabIndex="-1">
      <textarea
          tabIndex="-1"
          ref={textareaRef}
          className={`input-question ${isEditing ? "input-editing" : ""}`}
          placeholder="Întrebare"
          value={contentQ}
          onChange={handleOnChange}
          onBlur={handleSaveField}
          readOnly={!isEditing}
      />
            <textarea
                tabIndex="-1"
                ref={textareaRef}
                className={`input-answer ${isEditing ? "" : "input-editing"}`}
                placeholder="..."
                value={answer}
                onChange={handleOnChangeAnswer}
                onBlur={handleSaveAnswer}
                readOnly={isEditing}
            />
            {isEditing && (
                <button
                    className="util-button"
                    onClick={(event) => handleDeleteQuestion(event)}
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

export default QuestionComponent;
