import React, {useEffect, useState} from 'react';
import './DiaryDays.css';
import {getDaysService} from "../../services/dayService";
import DiaryForm from '../DiaryForm/DiaryForm';

const DiaryDays = () => {
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        fetchDays().then(r => console.log("Days fetched"));
    }, []);

    const fetchDays = async () => {
        const response = await getDaysService();

        const fetchedDays = response.data;
        setDays(fetchedDays);
    }

    return (
        <div className="diary-days">
            <div style={{display: 'flex'}}>
                <table>
                    <tbody>
                    {days.map(day => (
                        <tr key={day.dayId}>
                            <td>
                                <button onClick={() => {
                                    setSelectedDay(day.dayId);
                                }}>{day.dayText}</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    {selectedDay && <DiaryForm selectedDay={selectedDay} />}
                </div>
                </div>
        </div>
    );
};

export default DiaryDays;