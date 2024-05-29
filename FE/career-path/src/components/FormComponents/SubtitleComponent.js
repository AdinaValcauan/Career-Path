import React from 'react';

const SubtitleComponent = ({ field, handleFieldChange, handleDeleteField}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Subtitlu"
                value={field.content}
                onChange={(event) => handleFieldChange(field.id, event)}
            />
            <button onClick={() => handleDeleteField(field.id)}>Șterge</button>
        </div>
    );
};

export default SubtitleComponent;