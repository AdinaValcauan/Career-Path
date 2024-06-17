import React, {useEffect, useState} from 'react';
import './DiaryForm.css';
import TitleComponent from "../FormComponents/TitleComponents";
import SubtitleComponent from "../FormComponents/SubtitleComponent";
import ParagraphComponent from "../FormComponents/ParagraphComponent";
import QuestionComponent from "../FormComponents/QuestionComponent";
import {
    addTitleService,
    deleteTitleService,
    getTitlesByDayService,
    updateTitleService
} from "../../services/titleService";
import {
    addSubtitleService,
    deleteSubtitleService,
    getSubtitlesByDayService,
    updateSubtitleService
} from "../../services/subtitleService";
import {
    addParagraphService,
    deleteParagraphService,
    getParagraphsByDayService,
    updateParagraphService
} from "../../services/paragraphService";
import {
    addQuestionService,
    deleteQuestionService,
    getQuestionsByDayService,
    updateQuestionService
} from "../../services/questionService";
import {
    addAnswerService,
    deleteAnswerService,
    getAnswersByQuestionAndUserService,
    updateAnswerService
} from "../../services/answerService";

const DiaryForm = ({selectedDay}) => {
    const [formField, setFormField] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const userRole = sessionStorage.getItem('userRole');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        fetchForms().then(r => console.log("Forms fetched"));
    }, [selectedDay]);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const fetchForms = async () => {
        const userId = sessionStorage.getItem('userId');

        let idCounter = formField.length;
        let responseTitles = await getTitlesByDayService(selectedDay);
        let responseSubtitles = await getSubtitlesByDayService(selectedDay);
        let responseParagraphs = await getParagraphsByDayService(selectedDay);
        let responseQuestions = await getQuestionsByDayService(selectedDay);

        responseTitles = responseTitles.data.map(item => ({...item, type: 'title'}));
        responseSubtitles = responseSubtitles.data.map(item => ({...item, type: 'subtitle'}));
        responseParagraphs = responseParagraphs.data.map(item => ({...item, type: 'paragraph'}));
        responseQuestions = responseQuestions.data.map(item => ({...item, type: 'question'}));

        for (const question of responseQuestions) {
            const responseAnswers = await getAnswersByQuestionAndUserService(question.questionId, userId);

            if (responseAnswers.data) {
                question.answer = responseAnswers.data.answerText;
                question.answerId = responseAnswers.data.answerId;
            } else {
                question.answer = '';
                question.answerId = null;
            }
        }

        let responseForm = responseTitles.concat(responseSubtitles);
        responseForm = responseForm.concat(responseParagraphs);
        responseForm = responseForm.concat(responseQuestions);

        const formFields = responseForm.map((field) => {
                idCounter++;
                let fieldType, fieldContent, fieldBeId, fieldOrderForm;

                switch (field.type) {
                    case 'title':
                        fieldType = 'title';
                        fieldContent = field.titleText;
                        fieldBeId = field.titleId;
                        fieldOrderForm = field.orderForm;
                        break;
                    case 'subtitle':
                        fieldType = 'subtitle';
                        fieldContent = field.subtitleText;
                        fieldBeId = field.subtitleId;
                        fieldOrderForm = field.orderForm;
                        break;
                    case 'paragraph':
                        fieldType = 'paragraph';
                        fieldContent = field.paragraphText;
                        fieldBeId = field.paragraphId;
                        fieldOrderForm = field.orderForm;
                        break;
                    case 'question':
                        fieldType = 'question';
                        fieldContent = field.questionText;
                        fieldBeId = field.questionId;
                        fieldOrderForm = field.orderForm;
                        if (field.answer) {
                            fieldType = 'question';
                            fieldContent = field.questionText;
                            fieldBeId = field.questionId;
                            fieldOrderForm = field.orderForm;
                            return {
                                id: idCounter,
                                type: fieldType,
                                content: fieldContent,
                                orderForm: fieldOrderForm,
                                isNew: false,
                                BeId: fieldBeId,
                                answer: field.answer,
                                answerId: field.answerId,
                            };
                        }
                        break;
                    default:
                        break;
                }
                return {
                    id: idCounter,
                    type: fieldType,
                    content: fieldContent,
                    orderForm: fieldOrderForm,
                    isNew: false,
                    BeId: fieldBeId,
                };
            }
        );
        formFields.sort((a, b) => a.orderForm - b.orderForm);

        setFormField(formFields);
    }

    const handleFieldChange = (id, content) => {
        const newFormField = [...formField];
        const fieldIndex = newFormField.findIndex(field => field.id === id);
        if (fieldIndex === -1) return;

        newFormField[fieldIndex].content = content;
        setFormField(newFormField);
    }

    const handleAddField = (type) => {
        const newId = formField.length + 1;

        const newField = {id: newId, type: type, content: '', orderForm: formField.length, isNew: true, BeId: null};

        if (type === 'question') {
            newField.answer = '';
            newField.answerId = null;
        }

        setFormField([...formField, newField]);
    };

    const handleDeleteField = (id) => {
        const newFormField = [...formField];

        const fieldIndex = newFormField.findIndex(field => field.id === id);
        if (fieldIndex === -1) return;

        const currentField = newFormField[fieldIndex];

        if (currentField.isNew === false) {
            switch (currentField.type) {
                case 'title':
                    const {successT, errorT} = deleteTitleService(currentField.BeId);
                    if (errorT) {
                        console.log(errorT);
                        return;
                    }
                    break;
                case 'subtitle':
                    const {successS, errorS} = deleteSubtitleService(currentField.BeId);
                    if (errorS) {
                        console.log(errorS);
                        return;
                    }
                    break;
                case 'paragraph':
                    const {successP, errorP} = deleteParagraphService(currentField.BeId);
                    if (errorP) {
                        console.log(errorP);
                        return;
                    }
                    break;
                case 'question':
                    const {successQ, errorQ} = deleteQuestionService(currentField.BeId);
                    if (errorQ) {
                        console.log(errorQ);
                        return;
                    }
                    if (currentField.answerId) {
                        const {successA, errorA} = deleteAnswerService(currentField.answerId);
                        if (errorA) {
                            console.log(errorA);
                            return;
                        }
                    }
                    break;
                default:
                    break;

            }
        }
        newFormField.splice(fieldIndex, 1);

        for (let i = 0; i < newFormField.length; i++) {
            newFormField[i].orderForm = i;
        }

        setFormField(newFormField);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const field of formField) {
            switch (field.type) {
                case 'title':
                    if (field.isNew === false) {
                        const updatedTitle = {
                            titleId: field.BeId,
                            titleText: field.content,
                            dayId: selectedDay,
                            orderForm: field.orderForm,
                        };
                        const {success, error} = await updateTitleService(updatedTitle);
                        if (error) {
                            console.log(error);
                        }
                    } else {
                        let titleText = field.content;
                        let orderForm = field.orderForm;
                        let dayId = selectedDay;

                        const response = await addTitleService(dayId, titleText, orderForm);
                        if (response.error) {
                            console.log(response.error);
                        } else if (response.success) {
                            field.isNew = false;
                            field.BeId = response.titleId;
                        }
                    }
                    break;
                case 'subtitle':
                    if (field.isNew === false) {
                        const updatedSubtitle = {
                            subtitleId: field.BeId,
                            subtitleText: field.content,
                            dayId: selectedDay,
                            orderForm: field.orderForm,
                        };
                        const {success, error} = await updateSubtitleService(updatedSubtitle);
                        if (error) {
                            console.log(error);
                        }
                    } else {
                        let subtitleText = field.content;
                        let orderForm = field.orderForm;
                        let dayId = selectedDay;

                        const response = await addSubtitleService(dayId, subtitleText, orderForm);
                        if (response.error) {
                            console.log(response.error);
                        } else if (response.success) {
                            field.isNew = false;
                            field.BeId = response.subtitleId;
                        }
                    }
                    break;
                case 'paragraph':
                    if (field.isNew === false) {
                        const updatedParagraph = {
                            paragraphId: field.BeId,
                            paragraphText: field.content,
                            dayId: selectedDay,
                            orderForm: field.orderForm,
                        };
                        const {success, error} = await updateParagraphService(updatedParagraph);
                        if (error) {
                            console.log(error);
                        }
                    } else {
                        let paragraphText = field.content;
                        let orderForm = field.orderForm;
                        let dayId = selectedDay;

                        const response = await addParagraphService(paragraphText, orderForm, dayId);
                        if (response.error) {
                            console.log(response.error);
                        } else if (response.success) {
                            field.isNew = false;
                            field.BeId = response.paragraphId;
                        }
                    }
                    break;
                case 'question':
                    if (field.isNew === false) {
                        const updatedQuestion = {
                            questionId: field.BeId,
                            questionText: field.content,
                            dayId: selectedDay,
                            orderForm: field.orderForm,
                        };
                        const {success, error} = await updateQuestionService(updatedQuestion);
                        if (error) {
                            console.log(error);
                        }
                    } else if (field.isNew === true) {
                        let questionText = field.content;
                        let orderForm = field.orderForm;
                        let dayId = selectedDay;

                        const response = await addQuestionService(questionText, dayId, orderForm);
                        console.log(questionText, orderForm, dayId, response)
                        if (response.error) {
                            console.log(response.error);
                        } else if (response.success) {
                            field.isNew = false;
                            field.answer = null;
                            field.BeId = response.paragraphId;
                        }
                    }
                    break;
                default:
                    field.isNew = false;
                    break;
            }
        }
        setIsEditing(false);

        for (const field of formField) {
            if (field.type === 'question' && field.answer !== null && field.answer !== '' && field.answer !== undefined) {
                console.log(field.answerId, field.answer, field.BeId, userId)
                if (field.answerId!==undefined) {
                    // Update existing answer
                    const updatedAnswer = {
                        answerId: field.answerId,
                        answerText: field.answer,
                        questionId: field.BeId,
                        userId: userId
                    };
                    const {success, error} = await updateAnswerService(updatedAnswer);
                    if (error) {
                        console.log(error);
                    } else if (success) {
                        await fetchForms();
                    }
                } else {
                    const response = await addAnswerService(field.answer, field.BeId, userId);
                    if (response.error) {
                        console.log(response.error);
                    } else if (response.success) {
                        await fetchForms();
                    }
                }
            }
        }
    }

    const handleSaveAnswer = async (fieldId, event) => {
        event.preventDefault();

        const userId = sessionStorage.getItem('userId');
        const field = formField.find(field => field.id === fieldId);

        if (field.answerId) {
            // Update existing answer
            const updatedAnswer = {
                answerId: field.answerId,
                answerText: field.answer,
                questionId: field.BeId,
                userId: userId
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
    }

    const handleAnswerChange = (fieldId, answer) => {
        if (answer === undefined) {
            answer = '';
        }

        setFormField(formField.map((field) => {
            if (field.id === fieldId) {
                return {...field, answer: answer};
            } else {
                return field;
            }

        }));
    };

    return (<form className="form-diary" style={{flex: 1}}>
        <label>
            Day {selectedDay}:
            {formField.map((field, index) => {
                switch (field.type) {
                    case 'title':
                        return <TitleComponent key={index} field={field} isEditing={isEditing}
                                               handleFieldChange={(content) => handleFieldChange(field.id, content)}
                                               handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'subtitle':
                        return <SubtitleComponent key={index} field={field} isEditing={isEditing}
                                                  handleFieldChange={(content) => handleFieldChange(field.id, content)}
                                                  handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'paragraph':
                        return <ParagraphComponent key={index} field={field} isEditing={isEditing}
                                                   handleFieldChange={(content) => handleFieldChange(field.id, content)}
                                                   handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'question':
                        return <QuestionComponent key={index} field={field} isEditing={isEditing}
                                                  handleFieldChange={(content) => handleFieldChange(field.id, content)}
                                                  handleDeleteField={() => handleDeleteField(field.id)}
                                                  handleAnswerChange={(answer) => handleAnswerChange(field.id, answer)}/>;
                    default:
                        return null;
                }
            })}
            <div className="button-column">
                {isEditing && userRole === 'admin' &&
                    <button className='form-button' type="button" onClick={() => handleAddField('title')}>Titlu</button>}
                {isEditing && userRole === 'admin' &&
                    <button type="button" className='form-button' onClick={() => handleAddField('subtitle')}>Subtitlu</button>}
                {isEditing && userRole === 'admin' &&
                    <button type="button" className='form-button' onClick={() => handleAddField('paragraph')}>Paragraf</button>}
                {isEditing && userRole === 'admin' &&
                    <button type="button" className='form-button' onClick={() => handleAddField('question')}>Întrebare</button>}
            </div>
        </label>
        {userRole === 'admin' && !isEditing && <button className='login-button' type="button" onClick={handleEditClick}>Edit</button>}
        <button className='login-button' type="submit" onClick={handleSubmit}>Submit</button>
    </form>);
};

export default DiaryForm;