import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const toolboxItems = [
    { id: 'title', content: 'Title' },
    { id: 'subtitle', content: 'Subtitle' },
    { id: 'paragraph', content: 'Paragraph' },
    { id: 'question', content: 'Question' },
];

const DiaryEditForm = () => {
    const [formItems, setFormItems] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aici ar trebui să implementați logica de salvare în baza de date
        console.log(formItems);
    };

    return (
        <div>
            {/*<Toolbox items={toolboxItems} />*/}
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <Form items={formItems} setItems={setFormItems} />*/}
            {/*    <button type="submit">Submit</button>*/}
            {/*</form>*/}
        </div>
    );
};

export default DiaryEditForm;