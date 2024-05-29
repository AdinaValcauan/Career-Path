import React from 'react';

const ParagraphComponent = ({ field, handleFieldChange, handleDeleteField}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Paragraf"
                value={field.content}
                onChange={(event) => handleFieldChange(field.id, event)}
            />
            <button onClick={() => handleDeleteField(field.id)}>Șterge</button>
        </div>
    );
};

export default ParagraphComponent;