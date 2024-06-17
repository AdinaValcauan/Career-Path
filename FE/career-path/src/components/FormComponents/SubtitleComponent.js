import React, {useEffect, useRef} from 'react';

const SubtitleComponent = ({ field, isEditing, handleFieldChange, handleDeleteField}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [field.content]);

    const handleOnChange = (e) => {
        handleFieldChange(e.target.value);
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    return (
        <div>
            <textarea
                ref={textareaRef}
                className={`input-subtitle ${isEditing ? 'input-editing' : ''}`}
                placeholder="Subtitlu"
                value={field.content}
                onChange={handleOnChange}
                readOnly={!isEditing}
            />
            {isEditing && <button className='delete-button' onClick={() => handleDeleteField(field.id)}>Șterge</button>}
        </div>
    );
};

export default SubtitleComponent;