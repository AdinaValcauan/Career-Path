import React, {useEffect, useState} from "react";
import "./DiaryDays.css";
import {
    addDayService,
    deleteDayService,
    getDayByIdService,
    getDaysService,
    updateDayService,
} from "../../services/dayService";
import DiaryForm from "../DiaryForm/DiaryForm";
import {faArrowDown, faArrowUp, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiaryDays = () => {
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        fetchDays();
    }, []);

    const fetchDays = async () => {
        const response = await getDaysService();

        const fetchedDays = response.data;
        setDays(fetchedDays);
    };

    const selectedDayObj = days.find((day) => day.dayId === selectedDay);

    const handleAddDay = async () => {
        const newDay = {
            dayNumber: days.length + 1,
            dayText: `Ziua ${days.length + 1}`,
            orderDay: days.length + 1,
        };

        const response = await addDayService(newDay);
        if (response.status === 200) {
            setDays([...days, newDay]);
        } else if (response.error){
            toast.error("Ziua nu a putut fi adăugată");
        }

        await fetchDays();
    };

    const handleDelete = async (id) => {
        const dayToDelete = await getDayByIdService(id);
        const response = await deleteDayService(id);

        if (response.status === 200) {
            for (let i = 0; i < days.length; i++) {
                if (dayToDelete.orderDay < days[i].orderDay) {
                    const newDay = {
                        dayId: days[i].dayId,
                        dayNumber: days[i].dayNumber - 1,
                        dayText: `Ziua ${days[i].dayNumber - 1}`,
                        orderDay: days[i].orderDay - 1,
                    };
                    const {success, error} = await updateDayService(newDay);
                    if (!success) {
                        toast.error("Eroare internă");
                        break;
                    }
                }
            }
            await fetchDays();
        } else {
            toast.error("Ziua nu a putut fi ștearsă");
        }
    };

    const handleMoveUp = async (dayId) => {
        const dayToMove = await getDayByIdService(dayId);

        if (dayToMove.orderDay === 1) return;

        for (let i = 0; i < days.length; i++) {
            if (days[i].orderDay === dayToMove.orderDay - 1) {
                const newDay = {
                    dayId: dayToMove.dayId,
                    dayNumber: days[i].dayNumber,
                    dayText: `Ziua ${days[i].dayNumber}`,
                    orderDay: days[i].orderDay,
                };

                const newDayToSwap = {
                    dayId: days[i].dayId,
                    dayNumber: dayToMove.dayNumber,
                    dayText: `Ziua ${dayToMove.dayNumber}`,
                    orderDay: dayToMove.orderDay,
                };

                const {successMU1, errorMU1} = await updateDayService(newDay);
                if (errorMU1) {
                    toast.error("Eroare în mutare zi");
                }

                const {successMU2, errorMU2} = await updateDayService(newDayToSwap);
                if (errorMU2) {
                    toast.error("Eroare în mutare zi");
                }
            }
            await fetchDays();
        }
    };

    const handleMoveDown = async (dayId) => {
        const dayToMove = await getDayByIdService(dayId);

        if (dayToMove.orderDay === 1) return;

        for (let i = 0; i < days.length; i++) {
            if (days[i].orderDay === dayToMove.orderDay + 1) {
                const newDay = {
                    dayId: dayToMove.dayId,
                    dayNumber: days[i].dayNumber,
                    dayText: `Ziua ${days[i].dayNumber}`,
                    orderDay: days[i].orderDay,
                };

                const newDayToSwap = {
                    dayId: days[i].dayId,
                    dayNumber: dayToMove.dayNumber,
                    dayText: `Ziua ${dayToMove.dayNumber}`,
                    orderDay: dayToMove.orderDay,
                };

                const {successMD1, errorMD1} = await updateDayService(newDay);
                if (errorMD1) {
                    toast.error("Eroare în mutare zi");
                }

                const {successMD2, errorMD2} = await updateDayService(newDayToSwap);
                if (errorMD2) {
                    toast.error("Eroare în mutare zi");
                }
            }
            await fetchDays();
        }
    };

    return (
        <div className="diary-days" id="day-part">
            <div style={{display: "flex"}}>
                <table>
                    <tbody>
                    {days.map((day) => (
                        <tr key={day.dayId}>
                            <td>
                                <button
                                    className="day-button"
                                    onClick={() => {
                                        setSelectedDay(day.dayId);
                                    }}
                                >
                                    {day.dayText}
                                </button>
                                {userRole === "admin" && (
                                    <button
                                        className="util-button"
                                        onClick={() => {
                                            handleDelete(day.dayId);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                )}
                                {userRole === "admin" && (
                                    <button
                                        className="util-button"
                                        onClick={() => {
                                            handleMoveUp(day.dayId).then(r => fetchDays());
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowUp}/>
                                    </button>
                                )}
                                {userRole === "admin" && (
                                    <button
                                        className="util-button"
                                        onClick={() => {
                                            handleMoveDown(day.dayId).then(r => fetchDays());
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowDown}/>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <button className="day-button" onClick={handleAddDay}>
                                Adaugă zi
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    {selectedDay && (
                        <DiaryForm key={Date.now()} selectedDay={selectedDay} dayNumber={selectedDayObj.dayNumber}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiaryDays;
