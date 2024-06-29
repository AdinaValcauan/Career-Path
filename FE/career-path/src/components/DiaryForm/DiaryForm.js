import React, { useEffect, useState } from "react";
import "./DiaryForm.css";
import TitleComponent from "../FormComponents/TitleComponents";
import SubtitleComponent from "../FormComponents/SubtitleComponent";
import ParagraphComponent from "../FormComponents/ParagraphComponent";
import QuestionComponent from "../FormComponents/QuestionComponent";
import {
  addTitleService,
  deleteTitleService,
  getTitlesByDayService,
  updateTitleService,
} from "../../services/titleService";
import {
  addSubtitleService,
  deleteSubtitleService,
  getSubtitlesByDayService,
  updateSubtitleService,
} from "../../services/subtitleService";
import {
  addParagraphService,
  deleteParagraphService,
  getParagraphsByDayService,
  updateParagraphService,
} from "../../services/paragraphService";
import {
  addQuestionService,
  deleteQuestionService,
  getQuestionsByDayService,
  updateQuestionService,
} from "../../services/questionService";
import {
  addAnswerService,
  deleteAnswerService,
  getAnswersByQuestionAndUserService,
  updateAnswerService,
} from "../../services/answerService";

const DiaryForm = ({ selectedDay }) => {
  const [formField, setFormField] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const userRole = sessionStorage.getItem("userRole");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchForms().then((r) => console.log("Forms fetched"));
  }, [selectedDay]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const fetchForms = async () => {
    const userId = sessionStorage.getItem("userId");
    console.log("fetchForms", selectedDay);

    let responseTitles = await getTitlesByDayService(selectedDay);
    let responseSubtitles = await getSubtitlesByDayService(selectedDay);
    let responseParagraphs = await getParagraphsByDayService(selectedDay);
    let responseQuestions = await getQuestionsByDayService(selectedDay);

    responseTitles = responseTitles.data.map((item) => ({
      ...item,
      type: "title",
    }));
    responseSubtitles = responseSubtitles.data.map((item) => ({
      ...item,
      type: "subtitle",
    }));
    responseParagraphs = responseParagraphs.data.map((item) => ({
      ...item,
      type: "paragraph",
    }));
    responseQuestions = responseQuestions.data.map((item) => ({
      ...item,
      type: "question",
    }));

    for (const question of responseQuestions) {
      const responseAnswers = await getAnswersByQuestionAndUserService(
        question.questionId,
        userId
      );

      if (responseAnswers.data) {
        question.answer = responseAnswers.data.answerText;
        question.answerId = responseAnswers.data.answerId;
      } else {
        question.answer = "";
        question.answerId = null;
      }
    }

    let responseForm = responseTitles.concat(responseSubtitles);
    responseForm = responseForm.concat(responseParagraphs);
    responseForm = responseForm.concat(responseQuestions);

    const formFields = responseForm.map((field) => {
      let fieldType, fieldContent, fieldBeId, fieldOrderForm;

      switch (field.type) {
        case "title":
          fieldOrderForm = field.orderForm;
          fieldBeId = field.titleId;
          fieldType = field.type;
          fieldContent = field.titleText;
          break;
        case "subtitle":
          fieldOrderForm = field.orderForm;
          fieldBeId = field.subtitleId;
          fieldType = field.type;
          fieldContent = field.subtitleText;
          break;
        case "paragraph":
          fieldOrderForm = field.orderForm;
          fieldBeId = field.paragraphId;
          fieldType = field.type;
          fieldContent = field.paragraphText;
          break;
        case "question":
          fieldOrderForm = field.orderForm;
          fieldBeId = field.questionId;
          fieldType = field.type;
          fieldContent = field.questionText;
          if (field.answer) {
            fieldOrderForm = field.orderForm;
            fieldBeId = field.questionId;
            fieldType = "question";
            fieldContent = field.questionText;
            return {
              orderForm: fieldOrderForm,
              BeId: fieldBeId,
              type: fieldType,
              content: fieldContent,
              answer: field.answer,
              answerId: field.answerId,
            };
          }
          break;
        default:
          break;
      }
      return {
        orderForm: fieldOrderForm,
        BeId: fieldBeId,
        type: fieldType,
        content: fieldContent,
      };
    });

    formFields.sort((a, b) => a.orderForm - b.orderForm);

    setFormField(formFields);
    console.log(formFields);
  };

  const handleFieldChange = (orderForm, content) => {
    const newFormField = [...formField];
    const fieldIndex = newFormField.findIndex(
      (field) => field.orderForm === orderForm
    );
    if (fieldIndex === -1) return;

    newFormField[fieldIndex].content = content;
    setFormField(newFormField);
  };

  const handleAddField = (type) => {
    const newField = {
      orderForm: formField.length + 2,
      type: type,
      content: "",
      BeId: null,
    };

    if (type === "question") {
      newField.answer = "";
      newField.answerId = null;
    }

    setFormField([...formField, newField]);
  };

  const handleDeleteField = async (event, orderForm) => {

    event.preventDefault();
    const newFormField = [...formField];

    const fieldIndex = newFormField.findIndex((field) => field.orderForm === orderForm);
    if (fieldIndex === -1) return;

    const currentField = newFormField[fieldIndex];

      switch (currentField.type) {
        case "title":
          const {successT, errorT} = deleteTitleService(currentField.BeId);
          if (errorT) {
            console.log(errorT);
            return;
          }
          break;
        case "subtitle":
          const {successS, errorS} = deleteSubtitleService(currentField.BeId);
          if (errorS) {
            console.log(errorS);
            return;
          }
          break;
        case "paragraph":
          const {successP, errorP} = deleteParagraphService(
              currentField.BeId
          );
          if (errorP) {
            console.log(errorP);
            return;
          }
          break;
        case "question":
          const {successQ, errorQ} = deleteQuestionService(currentField.BeId);
          if (errorQ) {
            console.log(errorQ);
            return;
          }
          if (currentField.answerId) {
            const {successA, errorA} = deleteAnswerService(
                currentField.answerId
            );
            if (errorA) {
              console.log(errorA);
              return;
            }
          }
          break;
        default:
          break;
      }

      await fetchForms();
    }

    const handleSubmit = async (event) => {
      setIsEditing(false);
    };

    const handleSaveAnswer = async (fieldId, event) => {
      event.preventDefault();

      const userId = sessionStorage.getItem("userId");
      const field = formField.find((field) => field.id === fieldId);

      if (field.answerId) {
        // Update existing answer
        const updatedAnswer = {
          answerId: field.answerId,
          answerText: field.answer,
          questionId: field.BeId,
          userId: userId,
        };
        const {success, error} = await updateAnswerService(updatedAnswer);
        if (error) {
          console.log(error);
        }
      } else {
        const response = await addAnswerService(field.answer, field.BeId, userId);
        if (response.error) {
          console.log(response.error);
        } else if (response.success) {
          // Update the answerId in the formField state
          const newFormField = formField.map((field) => {
            if (field.id === fieldId) {
              return {...field, answerId: response.answerId};
            } else {
              return field;
            }
          });
          setFormField(newFormField);
        }
      }
    };

    const handleAnswerChange = (fieldId, answer) => {
      if (answer === undefined) {
        answer = "";
      }

      setFormField(
          formField.map((field) => {
            if (field.id === fieldId) {
              return {...field, answer: answer};
            } else {
              return field;
            }
          })
      );
    };

    const handleMoveUp = (id) => {
    };

    const handleMoveDown = (id) => {
    };

    return (
        <form className="form-diary" style={{flex: 1}}>
          <label>
            Day {selectedDay}:
            {formField.map((field, index) => {
              switch (field.type) {
                case "title":
                  return (
                      <TitleComponent
                          key={index}
                          field={field}
                          isEditing={isEditing}
                          selectedDay={selectedDay}
                          handleFieldChange={(content) =>
                              handleFieldChange(field.id, content)
                          }
                          handleDeleteField={() => handleDeleteField(field.orderForm)}
                          formFields={formField}
                          setFormField={setFormField}
                          fetchForms={fetchForms}
                      />
                  );
                case "subtitle":
                  return (
                      <SubtitleComponent
                          key={index}
                          field={field}
                          isEditing={isEditing}
                          selectedDay={selectedDay}
                          handleFieldChange={(content) =>
                              handleFieldChange(field.id, content)
                          }
                          handleDeleteField={() => handleDeleteField(field.orderForm)}
                          fetchForms={fetchForms}
                      />
                  );
                case "paragraph":
                  return (
                      <ParagraphComponent
                          key={index}
                          field={field}
                          isEditing={isEditing}
                          selectedDay={selectedDay}
                          handleFieldChange={(content) =>
                              handleFieldChange(field.id, content)
                          }
                          handleDeleteField={() => handleDeleteField(field.orderForm)}
                          fetchForms={fetchForms}
                      />
                  );
                case "question":
                  return (
                      <QuestionComponent
                          key={index}
                          field={field}
                          isEditing={isEditing}
                          selectedDay={selectedDay}
                          handleFieldChange={(content) =>
                              handleFieldChange(field.id, content)
                          }
                          handleDeleteField={() => handleDeleteField(field.orderForm)}
                          fetchForms={fetchForms}
                          handleAnswerChange={(answer) =>
                              handleAnswerChange(field.id, answer)
                          }
                          handleMoveUp={() => handleMoveUp(field.id)}
                          handleMoveDown={() => handleMoveDown(field.id)}
                      />
                  );
                default:
                  return null;
              }
            })}
            <div className="button-column">
              {isEditing && userRole === "admin" && (
                  <button
                      className="form-button"
                      type="button"
                      onClick={() => handleAddField("title")}
                  >
                    Titlu
                  </button>
              )}
              {isEditing && userRole === "admin" && (
                  <button
                      type="button"
                      className="form-button"
                      onClick={() => handleAddField("subtitle")}
                  >
                    Subtitlu
                  </button>
              )}
              {isEditing && userRole === "admin" && (
                  <button
                      type="button"
                      className="form-button"
                      onClick={() => handleAddField("paragraph")}
                  >
                    Paragraf
                  </button>
              )}
              {isEditing && userRole === "admin" && (
                  <button
                      type="button"
                      className="form-button"
                      onClick={() => handleAddField("question")}
                  >
                    Întrebare
                  </button>
              )}
            </div>
          </label>
          {userRole === "admin" && !isEditing && (
              <button
                  className="login-button"
                  type="button"
                  onClick={handleEditClick}
              >
                Edit
              </button>
          )}
          <button className="login-button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
    );
  };

export default DiaryForm;
