import React, {useEffect, useState} from 'react';
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

const DiaryForm = ({selectedDay}) => {
    const [formField, setFormField] = useState([]);

    const userRole = sessionStorage.getItem('userRole');

    useEffect(() => {
        fetchForms().then(r => console.log("Forms fetched"));
    }, [selectedDay]);

    const fetchForms = async () => {
        const response = await getTitlesByDayService(selectedDay);
        const titles = response.data;
        const formFields = titles.map((title, index) => {
            return {id: title.id, type: 'title', content: title.titleText, orderForm: index, isNew: false};
        }
        );
        setFormField(formFields);
    }

    const handleFieldChange = (id, event) => {
        const newFormField = [...formField];

        const fieldIndex = newFormField.findIndex(field => field.id === id);
        if (fieldIndex === -1) return; // Dacă nu găsim câmpul, ieșim din funcție

        // Actualizăm câmpul
        newFormField[fieldIndex].content = event.target.value;

        // Actualizăm starea formField
        setFormField(newFormField);
    };

    const handleAddField = (type) => {
        // Generăm un id unic pentru noul câmp
        const newId = formField.length > 0 ? Math.max(...formField.map(field => field.id)) + 1 : 1;
        // Creăm noul câmp
        const newField = {id: newId, type: type, content: '', orderForm: formField.length, isNew: true};

        if (type === 'question') {
            newField.question = '';
            newField.answer = '';
        }

        setFormField([...formField, newField]);
    };

    const handleDeleteField = (id) => {
        const newFormField = [...formField];

        const fieldIndex = newFormField.findIndex(field => field.id === id);
        if (fieldIndex === -1) return;

        if (newFormField[fieldIndex].isNew === false) {
            const {success, error} = deleteTitleService(newFormField[fieldIndex].id);
            if (error) {
                console.log(error);
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
                            id: field.id,
                            titleText: field.content,
                            dayId: selectedDay,
                            orderForm: field.orderForm
                        };
                        const {success, error} = await updateTitleService(updatedTitle);
                        if (error) {
                            console.log(error);
                        } else if (success) {
                            field.isNew = false;
                        }
                    } else {
                        let titleText = field.content;
                        let orderForm = field.orderForm;
                        let dayId = selectedDay;

                        const {success, error} = await addTitleService(dayId, titleText, orderForm);
                        if (error) {
                            console.log(error);
                        }
                    }
                    break;
                case 'subtitle':
                    if (field.id) {
                        // update
                    } else {
                        // create
                    }
                    break;
                case 'paragraph':
                    if (field.id) {
                        // update
                    } else {
                        // create
                    }
                    break;
                case 'question':
                    if (field.id) {
                        // update
                    } else {
                        // create // create question and answer
                    }
                    break;
                default:
                    break;
            }
        }
    }

    // const handleQuestionChange = (index, event) => {
    //     const values = [...questions];
    //     values[index].question = event.target.value;
    //     setQuestions(values);
    // };
    //
    // const handleAnswerChange = (index, event) => {
    //     const values = [...questions];
    //     values[index].answer = event.target.value;
    //     setQuestions(values);
    // };
    //
    // const handleAddQuestion = () => {
    //     setQuestions([...questions, {question: '', answer: ''}]);
    // };
    //
    // const handleRemoveQuestion = (index) => {
    //     const values = [...questions];
    //     values.splice(index, 1);
    //     setQuestions(values);
    // };

    return (<form style={{flex: 1}}>
        <label>
            Day {selectedDay}:
            {formField.map((field, index) => {
                switch (field.type) {
                    case 'title':
                        return <TitleComponent key={index} field={field} handleFieldChange={handleFieldChange}
                                               handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'subtitle':
                        return <SubtitleComponent key={index} field={field} handleFieldChange={handleFieldChange}
                                                  handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'paragraph':
                        return <ParagraphComponent key={index} field={field} handleFieldChange={handleFieldChange}
                                                   handleDeleteField={() => handleDeleteField(field.id)}/>;
                    case 'question':
                        return <QuestionComponent key={index} field={field} handleFieldChange={handleFieldChange}
                                                  handleDeleteField={() => handleDeleteField(field.id)}/>;
                    default:
                        return null;
                }
            })}
            <div className="button-column">
                {userRole === 'admin' &&
                    <button type="button" onClick={() => handleAddField('title')}>Titlu</button>}
                {userRole === 'admin' &&
                    <button type="button" onClick={() => handleAddField('subtitle')}>Subtitlu</button>}
                {userRole === 'admin' &&
                    <button type="button" onClick={() => handleAddField('paragraph')}>Paragraf</button>}
                {userRole === 'admin' &&
                    <button type="button" onClick={() => handleAddField('question')}>Întrebare</button>}
            </div>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>);
};

export default DiaryForm;