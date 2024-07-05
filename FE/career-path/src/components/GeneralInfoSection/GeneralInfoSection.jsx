import React, {useEffect, useRef, useState} from "react";
import {
    addInfoService,
    deleteInfoService,
    getAllInfoService,
    updateInfoService
} from "../../services/generalInfoService";
import './GeneralInfoSection.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const GeneralInfoSection = () => {
    const [fieldInfo, setFieldInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef(null);

    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        fetchInfo().then((r) => console.log("Forms fetched"));
    }, []);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [fieldInfo]);

    const fetchInfo = async () => {
        const responseGeneralInfo = await getAllInfoService();
        setFieldInfo(responseGeneralInfo.data);
    };

    const handleTextChange = (index, event) => {
        const newFieldInfo = [...fieldInfo];

        newFieldInfo[index].infoText = event.target.value;
        setFieldInfo(newFieldInfo);
    };

    const handleAddField = (type) => {
        const newFieldInfo = {
            infoId: null,
            type: type,
            infoText: "",
        };
        setFieldInfo([...fieldInfo, newFieldInfo]);
    };

    const handleAddInfo = async (index, event) => {
        event.preventDefault();
        const fieldToAddOrUpdate = fieldInfo[index];

        let response;
        if (fieldToAddOrUpdate.infoId) {
            response = await updateInfoService(fieldToAddOrUpdate);
        } else {
            response = await addInfoService(fieldToAddOrUpdate.infoText, fieldToAddOrUpdate.type);
        }

        if (response.success) {
            console.log("Informația a fost adăugată cu succes");
        } else {
            console.error(response.error);
        }
        await fetchInfo();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    const handleDeleteField = async (index, event) => {
        event.preventDefault();

        const fieldToDelete = fieldInfo[index];
        const response = await deleteInfoService(fieldToDelete.infoId);

        if (response.success) {
            console.log("Informația a fost ștearsă cu succes");

            const newFieldInfo = [...fieldInfo];
            newFieldInfo.splice(index, 1);
            setFieldInfo(newFieldInfo);
        } else {
            console.error(response.error);
        }
        await fetchInfo();
    }

    return (
        <div className="general-info-section">
            {fieldInfo.map((info, index) => {
                let textarea;
                switch (info.type) {
                    case 'title':
                        textarea = <textarea
                            ref={textareaRef}
                            key={index}
                            className={`info-title ${isEditing ? "info-editing" : ""}`}
                            value={info.infoText}
                            onChange={event => handleTextChange(index, event)}
                            onBlur={(event) => handleAddInfo(index, event)}
                        />;
                        break;
                    case 'subtitle':
                        textarea = <textarea
                            ref={textareaRef}
                            key={index}
                            className={`info-subtitle ${isEditing ? "info-editing" : ""}`}
                            value={info.infoText}
                            onChange={event => handleTextChange(index, event)}
                            onBlur={(event) => handleAddInfo(index, event)}
                        />;
                        break;
                    case 'paragraph':
                        textarea = <textarea
                            ref={textareaRef}
                            key={index}
                            className={`info-paragraph ${isEditing ? "info-editing" : ""}`}
                            value={info.infoText}
                            onChange={event => handleTextChange(index, event)}
                            onBlur={(event) => handleAddInfo(index, event)}
                        />;
                        break;
                    default:
                        return null;
                }

                return (
                    <div key={index}>
                        {textarea}
                        {isEditing && userRole === "admin" && (
                            <button
                                className="util-button"
                                type="button"
                                onClick={(event) => handleDeleteField(index, event)}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        )}
                    </div>
                );
            })}

            <div className="button-column">
                {isEditing && userRole === "admin" && (
                    <>
                        <button
                            className="form-button"
                            type="button"
                            onClick={() => handleAddField("title")}
                        >
                            Titlu
                        </button>
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => handleAddField("subtitle")}
                        >
                            Subtitlu
                        </button>
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => handleAddField("paragraph")}
                        >
                            Paragraf
                        </button>
                    </>
                )}
            </div>
            {isEditing && userRole === "admin" && (
                <button
                    className="form-button"
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}
            {!isEditing && userRole === "admin" && (
                <button
                    className="form-button"
                    type="button"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            )}
        </div>
    );
}
export default GeneralInfoSection