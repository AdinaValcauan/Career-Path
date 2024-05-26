import React, {useEffect, useState} from 'react';
import {getUserByIdService} from "../../services/userService";

const DiaryForm = ({ selectedDay }) => {
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    // const [userRole, setUserRole] = useState('');
    const userRole = sessionStorage.getItem('userRole');

    // useEffect(() => {
    //     const fetchUserRole = async () => {
    //         const user = await getUserByIdService();
    //         setUserRole(user.role);
    //     };
    //
    //     fetchUserRole();
    // }, []);


    const handleQuestionChange = (index, event) => {
        const values = [...questions];
        values[index].question = event.target.value;
        setQuestions(values);
    };

    const handleAnswerChange = (index, event) => {
        const values = [...questions];
        values[index].answer = event.target.value;
        setQuestions(values);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const values = [...questions];
        values.splice(index, 1);
        setQuestions(values);
    };

    return (
        <form style={{flex: 1}}>
            <label>
                Day {selectedDay}:
                {questions.map((question, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Question" value={question.question} onChange={event => handleQuestionChange(index, event)} disabled={userRole !== 'admin'} />
                        <input type="text" placeholder="Answer" value={question.answer} onChange={event => handleAnswerChange(index, event)} />
                        {userRole === 'admin' && <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>}
                    </div>
                ))}
                {userRole === 'admin' && <button type="button" onClick={handleAddQuestion}>Add question</button>}
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DiaryForm;