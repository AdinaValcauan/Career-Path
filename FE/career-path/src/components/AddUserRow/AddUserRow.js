import React from 'react';

const AddUserRow = ({
                        handleSave,
                        setAdding,
                        newFirstName,
                        newLastName,
                        newEmail,
                        newPassword,
                        newRoles,
                        setNewFirstName,
                        setNewLastName,
                        setNewEmail,
                        setNewPassword,
                        setNewRoles,
                        errMsgLine
                    }) => {

    // const handleInputChange = (event) => {
    //     setNewUser({...newUser, [event.target.name]: event.target.value});
    // };

    // const handleSaveClick = (e) => {
    //     e.preventDefault();
    //     handleSave(newUser);
    //     // setNewUser({firstName: '', lastName: '', email: '', password: '', roles: ''});
    //     setAdding(false);
    // };

    return (
        <tr>
            <td></td>
            <td><input className="edit-input" type="text" placeholder="Prenume user"
                       value={newFirstName} onChange={e => setNewFirstName(e.target.value)}/></td>
            <td><input className="edit-input" type="text" placeholder="Nume user"
                       value={newLastName} onChange={e => setNewLastName(e.target.value)}/></td>
            <td><input className="edit-input" type="text" placeholder="Email user"
                       value={newEmail} onChange={e => setNewEmail(e.target.value)}/></td>
            <td><input className="edit-input" type="text" placeholder="Parola user"
                       value={newPassword} onChange={e => setNewPassword(e.target.value)}/></td>
            <td><input className="edit-input" type="text" placeholder="Rol user"
                       value={newRoles} onChange={e => setNewRoles(e.target.value)}/></td>
            <td>
                <button className="edit-button" onClick={handleSave}>Save</button>
            </td>
            <td>
                <button className="edit-button" onClick={() => setAdding(false)}>Cancel</button>
            </td>
            <td>
                <p className={errMsgLine ? "errMsgLine" : "offscreen"} aria-live="assertive">
                    {errMsgLine}
                </p>
            </td>
        </tr>
    );
};

export default AddUserRow;