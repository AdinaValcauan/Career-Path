import React from 'react';

const QuestionComponent = ({ field, handleFieldChange, handleDeleteField}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Întrebare"
                value={field.content}
                onChange={(event) => handleFieldChange(field.id, event)}
            />
            <input
                type="text"
                placeholder="Răspuns"
                value={field.answer}
                onChange={(event) => handleAnswerChange(field.id, event)}
            />
            <button onClick={() => handleDeleteField(field.id)}>Șterge</button>
        </div>
    );
};

export default QuestionComponent;