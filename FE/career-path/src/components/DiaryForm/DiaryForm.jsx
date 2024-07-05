import React, {useEffect, useState} from "react";
import "./DiaryForm.css";
import TitleComponent from "../FormComponents/TitleComponents";
import SubtitleComponent from "../FormComponents/SubtitleComponent";
import ParagraphComponent from "../FormComponents/ParagraphComponent";
import QuestionComponent from "../FormComponents/QuestionComponent";
import {getTitlesByDayService} from "../../services/titleService";
import {getSubtitlesByDayService} from "../../services/subtitleService";
import {getParagraphsByDayService} from "../../services/paragraphService";
import {getQuestionsByDayService} from "../../services/questionService";
import {addAnswerService, getAnswersByQuestionAndUserService, updateAnswerService,} from "../../services/answerService";
import {updateOrderFormService} from "../../services/orderFormService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DiaryForm = ({selectedDay, dayNumber}) => {
    const [formField, setFormField] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const userRole = sessionStorage.getItem("userRole");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        fetchForms();
    }, [selectedDay]);

    const handleEditClick = async (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const fetchForms = async () => {
        const userId = sessionStorage.getItem("userId");

        let [responseTitles, responseSubtitles, responseParagraphs, responseQuestions] = await Promise.all([
            getTitlesByDayService(selectedDay),
            getSubtitlesByDayService(selectedDay),
            getParagraphsByDayService(selectedDay),
            getQuestionsByDayService(selectedDay)
        ]);
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
            orderForm: formField.length + 1,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    const handleSaveAnswer = async (orderForm, event) => {
        event.preventDefault();

        const userId = sessionStorage.getItem("userId");
        const field = formField.find((field) => field.orderForm === orderForm);

        if (field.answerId) {
            const updatedAnswer = {
                answerId: field.answerId,
                answerText: field.answer,
                questionId: field.BeId,
                userId: userId,
            };
            const {success, error} = await updateAnswerService(updatedAnswer);
            if (error) {
                toast.error()
            }
        } else {
            const response = await addAnswerService(field.answer, field.BeId, userId);
            if (response.error) {
                toast.error("Eroare la adăugarea răspunsului");
            }
        }
        await fetchForms();
    };

    const handleMoveUp = async (event, orderForm) => {
        event.preventDefault();
        let formFields = [...formField];

        const currentField = formFields.find((f) => f.orderForm === orderForm);
        const previousField = formFields.find(
            (f) => f.orderForm === currentField.orderForm - 1
        );

        if (previousField) {
            [currentField.orderForm, previousField.orderForm] = [
                previousField.orderForm,
                currentField.orderForm,
            ];

            const {successMU1, errorMU1} = await updateOrderFormService(
                currentField.type,
                currentField.BeId,
                currentField.orderForm
            );

            const {successMU2, errorMU2} = await updateOrderFormService(
                previousField.type,
                previousField.BeId,
                previousField.orderForm
            );
            if (errorMU1 || errorMU2) {
                toast.error("Eroare la schimbarea ordinii");
            }
        }

        await fetchForms();
    };

    const handleMoveDown = async (event, orderForm) => {
        event.preventDefault();
        let formFields = [...formField];

        const currentField = formFields.find((f) => f.orderForm === orderForm);
        const nextField = formFields.find(
            (f) => f.orderForm === currentField.orderForm + 1
        );

        if (nextField) {
            [currentField.orderForm, nextField.orderForm] = [
                nextField.orderForm,
                currentField.orderForm,
            ];

            const {successMD1, errorMD1} = await updateOrderFormService(
                currentField.type,
                currentField.BeId,
                currentField.orderForm
            );
            const {successMD2, errorMD2} = await updateOrderFormService(
                nextField.type,
                nextField.BeId,
                nextField.orderForm
            );
            if (errorMD1 || errorMD2) {
                toast.error("Eroare la schimbarea ordinii");
            }
        }

        await fetchForms();
    };

    const updateOrderForms = async (formFields, deletedFieldIndex) => {
        for (let i = deletedFieldIndex; i < formFields.length; i++) {
            formFields[i].orderForm--;

            const response = await updateOrderFormService(
                formFields[i].type,
                formFields[i].BeId,
                formFields[i].orderForm
            );
            if (response.error) {
                toast.error("Eroare la actualizarea ordinii");
            }
        }
    };

    function removeDiacritics(str) {
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        str = str.replace(/→/g, "->");
        return str;
    }

    const downloadFormAsPDF = () => {
        const doc = new jsPDF();

        let currentHeight = 20;
        const pageHeight = doc.internal.pageSize.height - 20;
        const pageWidth = doc.internal.pageSize.width;

        doc.setFont('Roboto-Regular');
        doc.setFontSize(18);

        const dayText = `Ziua ${dayNumber}:`;
        const dayWidth = doc.getStringUnitWidth(dayText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const dayPosition = (pageWidth - dayWidth) / 2;
        doc.text(dayText, dayPosition, currentHeight);
        currentHeight += 20; // Ajustează înălțimea curentă pentru a face loc pentru textul zilei


        formField.forEach((field, index) => {
            let titlePosition = 0;
            switch (field.type) {
                case 'title':
                    doc.setFontSize(20);
                    doc.setTextColor(232, 73, 29);
                    const title = removeDiacritics(field.content);
                    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    titlePosition = (pageWidth - titleWidth) / 2;
                    break;
                case 'subtitle':
                    doc.setFontSize(18);
                    doc.setTextColor(210, 105, 30);
                    break;
                case 'paragraph':
                    doc.setFontSize(14);
                    doc.setTextColor(100);
                    break;
                case 'question':
                    doc.setFontSize(14);
                    doc.setTextColor(100);
                    break;
                default:
                    doc.setFontSize(12);
                    doc.setTextColor(100);
                    break;
            }

            const lines = doc.splitTextToSize(`${removeDiacritics(field.content)}`, 180);



            if (currentHeight + lines.length * 10 > pageHeight) {
                doc.addPage();
                currentHeight = 20;
            }

            if (field.type === 'title') {
                doc.text(lines, titlePosition, currentHeight);
            } else {
                doc.text(lines, 14, currentHeight);
            }
            currentHeight += lines.length * 10;


            if (field.type === 'question' && field.answer) {
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 139);
                const answerLines = doc.splitTextToSize(`${removeDiacritics(field.answer)}`, 180);

                if (currentHeight + answerLines.length * 10 > pageHeight) {
                    doc.addPage();
                    currentHeight = 20;
                }

                doc.text(answerLines, 14, currentHeight);
                currentHeight += answerLines.length * 10;
            }
        });

        doc.save('jurnal_calatorie.pdf');
    };

    return (
        <form className="form-diary" style={{flex: 1}}>
            <label>
                Ziua {dayNumber}:
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
                                        handleFieldChange(field.orderForm, content)
                                    }
                                    formFields={formField}
                                    setFormField={setFormField}
                                    fetchForms={fetchForms}
                                    formField={formField}
                                    updateOrderForms={updateOrderForms}
                                    handleMoveUp={(event) => handleMoveUp(event, field.orderForm)}
                                    handleMoveDown={(event) =>
                                        handleMoveDown(event, field.orderForm)
                                    }
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
                                        handleFieldChange(field.orderForm, content)
                                    }
                                    fetchForms={fetchForms}
                                    formField={formField}
                                    updateOrderForms={updateOrderForms}
                                    handleMoveUp={(event) => handleMoveUp(event, field.orderForm)}
                                    handleMoveDown={(event) =>
                                        handleMoveDown(event, field.orderForm)
                                    }
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
                                        handleFieldChange(field.orderForm, content)
                                    }
                                    fetchForms={fetchForms}
                                    formField={formField}
                                    updateOrderForms={updateOrderForms}
                                    handleMoveUp={(event) => handleMoveUp(event, field.orderForm)}
                                    handleMoveDown={(event) =>
                                        handleMoveDown(event, field.orderForm)
                                    }
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
                                        handleFieldChange(field.orderForm, content)
                                    }
                                    fetchForms={fetchForms}
                                    formField={formField}
                                    setFormField={setFormField}
                                    updateOrderForms={updateOrderForms}
                                    handleSaveAnswer={(event) =>
                                        handleSaveAnswer(field.orderForm, event)
                                    }
                                    handleMoveUp={(event) => handleMoveUp(event, field.orderForm)}
                                    handleMoveDown={(event) =>
                                        handleMoveDown(event, field.orderForm)
                                    }
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
                    onClick={(event) => handleEditClick(event)}
                >
                    Editează
                </button>
            )}
            <button
                className="login-button"
                type="submit"
                onClick={(event) => handleSubmit(event)}
            >
                Salvează
            </button>
            <p className="before-text"> Daca dorești și versiunea PDF completată de tine, apasă mai jos: </p>
            <button type="button" className="login-button" onClick={downloadFormAsPDF}>Descarcă ca PDF</button>
        </form>
    );
};

export default DiaryForm;
