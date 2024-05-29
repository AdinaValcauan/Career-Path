import React from 'react';

const TitleComponent = ({ field, handleFieldChange, handleDeleteField}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Titlu"
                value={field.content}
                onChange={(event) => handleFieldChange(field.id, event)}
            />
            <button onClick={() => handleDeleteField(field.id)}>Șterge</button>

        </div>
    );
};

export default TitleComponent;