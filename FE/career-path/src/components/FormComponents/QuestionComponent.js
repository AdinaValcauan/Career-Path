import React, { useEffect, useRef, useState } from "react";
import {
  addQuestionService,
  deleteQuestionService,
  updateQuestionService,
} from "../../services/questionService";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          console.log(field);
          return { ...field, answer: answer };
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
      if (response.success) {
        console.log("Question adăugat cu succes");
        // Actualizați starea componentei aici, dacă este necesar
      } else {
        console.error(response.error);
      }
    } else if (contentQ !== field.content && field.BeId) {
      const updatedQuestion = {
        questionId: field.BeId,
        questionText: contentQ,
        dayId: selectedDay,
        orderForm: field.orderForm,
      };
      const response = await updateQuestionService(updatedQuestion);
      if (response.success) {
        console.log("Question actualizat cu succes");
        // Actualizați starea componentei aici, dacă este necesar
      } else {
        console.error(response.error);
      }
    }
    await fetchForms();
  };

  const handleDeleteQuestion = async (event) => {
    event.preventDefault();

    const { success, error } = await deleteQuestionService(field.BeId);
    if (success) {
      let formFields = [...formField];

      const deletedFieldIndex = formFields.findIndex(
        (f) => f.orderForm === field.orderForm
      );

      formFields.splice(deletedFieldIndex, 1);
      await updateOrderForms(formFields, deletedFieldIndex);
    } else {
      console.error(error);
    }
    await fetchForms();
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        className={`input-question ${isEditing ? "input-editing" : ""}`}
        placeholder="Întrebare"
        value={contentQ}
        onChange={handleOnChange}
        onBlur={handleSaveField}
        readOnly={!isEditing}
      />
      <textarea
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
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
      {isEditing && (
        <button
          className="util-button"
          onClick={(event) => handleMoveUp(event, field.orderForm)}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      {isEditing && (
        <button
          className="util-button"
          onClick={(event) => handleMoveDown(event, field.orderForm)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  );
};

export default QuestionComponent;
