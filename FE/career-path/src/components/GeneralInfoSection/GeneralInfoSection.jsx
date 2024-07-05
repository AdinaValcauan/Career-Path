import React, {createRef, useEffect, useRef, useState} from "react";
import {
    addInfoService,
    deleteInfoService,
    getAllInfoService,
    updateInfoService
} from "../../services/generalInfoService";
import './GeneralInfoSection.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

const GeneralInfoSection = () => {
    const [fieldInfo, setFieldInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef(null);
    const textareaRefs = useRef([]);
    textareaRefs.current = fieldInfo.map((_, i) => textareaRefs.current[i] ?? createRef());

    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        textareaRefs.current.forEach(textareaRef => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            }
        });
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

        if (response.error) {
            toast.error("A apărut o eroare la adăugarea informației");
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

        if (response.error) {
            toast.error("A apărut o eroare la ștergerea informației");
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
                            ref={textareaRefs.current[index]}
                            key={index}
                            className={`info-title ${isEditing ? "info-editing" : ""}`}
                            value={info.infoText}
                            onChange={event => handleTextChange(index, event)}
                            onBlur={(event) => handleAddInfo(index, event)}
                        />;
                        break;
                    case 'subtitle':
                        textarea = <textarea
                            ref={textareaRefs.current[index]}
                            key={index}
                            className={`info-subtitle ${isEditing ? "info-editing" : ""}`}
                            value={info.infoText}
                            onChange={event => handleTextChange(index, event)}
                            onBlur={(event) => handleAddInfo(index, event)}
                        />;
                        break;
                    case 'paragraph':
                        textarea = <textarea
                            ref={textareaRefs.current[index]}
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
                    className="info-button"
                    type="button"
                    onClick={handleSubmit}
                >
                    Salvează
                </button>
            )}
            {!isEditing && userRole === "admin" && (
                <button
                    className="info-button"
                    type="button"
                    onClick={() => setIsEditing(true)}
                >
                    Editează
                </button>
            )}
        </div>
    );
}
export default GeneralInfoSection