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
    const [editingFields, setEditingFields] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const firstElementRef = useRef(null);
    const textareaRef = useRef(null);
    const textareaRefs = useRef([]);
    textareaRefs.current = editingFields.map((_, i) => textareaRefs.current[i] ?? createRef());

    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        console.log("s-a apelat useEffect", editingFields);
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
        // setFieldInfo(responseGeneralInfo.data);
        setFieldInfo(responseGeneralInfo.data);
        setEditingFields(responseGeneralInfo.data);
    };

    const handleTextChange = (index, event) => {
        event.preventDefault();

        const newEditingFields = [...editingFields];
        newEditingFields[index].infoText = event.target.value;
        setEditingFields(newEditingFields);

        const textarea = textareaRefs.current[index].current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleAddField = (type) => {
        console.log("type", type);
        const newField = {
            infoId: null,
            type: type,
            infoText: "",
        };
        console.log("newField", newField)
        setEditingFields([...editingFields, newField]);
    };

    // const handleAddInfo = async (index, event) =>
    // {
    //     event.preventDefault();
    //     await fetchInfo();
    //     const fieldToAddOrUpdate = editingFields[index];
    //     console.log("fieldToAddOrUpdate", fieldToAddOrUpdate)
    //
    //     if (fieldToAddOrUpdate.infoText.trim() === '') {
    //         const newFieldInfo = [...fieldInfo];
    //         newFieldInfo.splice(index, 1);
    //         setFieldInfo(newFieldInfo);
    //     } else {
    //         // If the field text is not empty, save it to the database
    //         let response;
    //         if (fieldToAddOrUpdate.infoId) {
    //             response = await updateInfoService(fieldToAddOrUpdate);
    //         } else {
    //             response = await addInfoService(fieldToAddOrUpdate.infoText, fieldToAddOrUpdate.type);
    //         }
    //
    //         if (response.error) {
    //             toast.error("A apărut o eroare la adăugarea informației");
    //         }
    //         await fetchInfo();
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    const handleDeleteField = async (index, event) => {
        event.preventDefault();
        const fieldToDelete = editingFields[index];
        if (fieldToDelete.infoId) {
            const response = await deleteInfoService(fieldToDelete.infoId);
            if (response.error) {
                toast.error("A apărut o eroare la ștergerea informației");
            }
        }
        const newEditingFields = [...editingFields];
        newEditingFields.splice(index, 1);
        setEditingFields(newEditingFields);
        textareaRefs.current[index].current.focus();
        textareaRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSave = async (event) => {
        event.preventDefault();
        for (let field of editingFields) {
            let response;
            if (field.infoId) {
                response = await updateInfoService(field);
            } else {
                response = await addInfoService(field.infoText, field.type);
            }

            if (response.error) {
                toast.error("A apărut o eroare la adăugarea informației");
            }
        }
        await fetchInfo();
        setIsEditing(false);
    };

    return (
        <div id="general-info-part" className="general-info-section">
            <form className="info-form"
                  onSubmit={handleSubmit}
                  onClick={(e) => {
                      e.preventDefault();
                      if (e.target instanceof HTMLElement) {
                          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') {
                              e.stopPropagation();
                          }
                      }
                  }}
                  onMouseDown={(e) => {
                      if (e.target instanceof HTMLElement) {
                          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') {
                              e.stopPropagation();
                          }
                      }
                  }}>
                {editingFields.map((info, index) => {
                    let textarea;
                    switch (info.type) {
                        case 'title':
                            textarea = <textarea
                                ref={textareaRefs.current[index]}
                                key={index}
                                className={`info-title ${isEditing ? "info-editing" : ""}`}
                                value={info.infoText}
                                readOnly={!isEditing}
                                onFocus={event => event.preventDefault()}
                                onChange={event => handleTextChange(index, event)}
                                // onBlur={(event) => handleAddInfo(index, event)}
                            />;
                            break;
                        case 'subtitle':
                            textarea = <textarea
                                ref={textareaRefs.current[index]}
                                key={index}
                                className={`info-subtitle ${isEditing ? "info-editing" : ""}`}
                                value={info.infoText}
                                readOnly={!isEditing}
                                onChange={event => handleTextChange(index, event)}
                                // onBlur={(event) => handleAddInfo(index, event)}
                            />;
                            break;
                        case 'paragraph':
                            textarea = <textarea
                                ref={textareaRefs.current[index]}
                                key={index}
                                className={`info-paragraph ${isEditing ? "info-editing" : ""}`}
                                value={info.infoText}
                                readOnly={!isEditing}
                                onChange={event => handleTextChange(index, event)}
                                onFocus={event => event.preventDefault()}
                                // onBlur={(event) => handleAddInfo(index, event)}
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
                                className="formi-button"
                                type="button"
                                onClick={() => handleAddField("title")}
                            >
                                Titlu
                            </button>
                            <button
                                type="button"
                                className="formi-button"
                                onClick={() => handleAddField("subtitle")}
                            >
                                Subtitlu
                            </button>
                            <button
                                type="button"
                                className="formi-button"
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
                        onClick={(event) => handleSave(event)}
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
            </form>
        </div>
    );
}
export default GeneralInfoSection