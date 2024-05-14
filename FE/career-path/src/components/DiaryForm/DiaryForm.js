import React from 'react';

const DiaryForm = ({ selectedDay }) => {
    console.log(selectedDay);

    return (
        <form style={{flex: 1}}>
            <label>
                Day {selectedDay}:
                <input type="text"/>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DiaryForm;