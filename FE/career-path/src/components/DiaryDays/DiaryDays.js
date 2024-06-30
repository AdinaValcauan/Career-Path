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

const DiaryDays = () => {
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        fetchDays().then((r) => console.log("Days fetched"));
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
        }

        await fetchDays();
    };

    const handleDelete = async (id) => {
        const dayToDelete = await getDayByIdService(id);
        const response = await deleteDayService(id);

        if (response.status === 200) {
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
                            console.log(error);
                            break;
                        }
                    }
                }
                await fetchDays();
            }
        }
    };

    const handleMoveUp = async (id) => {
        const dayToMove = await getDayByIdService(id);

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
                if (successMU1) {
                    console.log("Day moved up successfully");
                } else {
                    console.log(errorMU1);
                }

                const {successMU2, errorMU2} = await updateDayService(newDayToSwap);
                if (successMU2) {
                    console.log("Day moved down successfully");
                } else {
                    console.log(errorMU2);
                }
            }
            await fetchDays();
        }
    };

    const handleMoveDown = async (id) => {
        const dayToMove = await getDayByIdService(id);

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

                const {successMU1, errorMU1} = await updateDayService(newDay);
                if (successMU1) {
                    console.log("Day moved up successfully");
                } else {
                    console.log(errorMU1);
                }

                const {successMU2, errorMU2} = await updateDayService(newDayToSwap);
                if (successMU2) {
                    console.log("Day moved down successfully");
                } else {
                    console.log(errorMU2);
                }
            }
            await fetchDays();
        }
    };

    return (
        <div className="diary-days">
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
                                            handleMoveUp(day.dayId);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowUp}/>
                                    </button>
                                )}
                                {userRole === "admin" && (
                                    <button
                                        className="util-button"
                                        onClick={() => {
                                            handleMoveDown(day.dayId);
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
                        <DiaryForm selectedDay={selectedDay} dayNumber={selectedDayObj.dayNumber}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiaryDays;
