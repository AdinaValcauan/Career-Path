import React, {useEffect, useState} from 'react';
import {getRolesService} from "../../services/roleService";

const AddUserRow = ({
                        handleSave,
                        setAdding,
                        newFirstName,
                        newLastName,
                        newEmail,
                        newPassword,
                        newRole,
                        setNewFirstName,
                        setNewLastName,
                        setNewEmail,
                        setNewPassword,
                        setNewRole,
                        errMsgLine
                    }) => {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRolesService().then(response => {
            setRoles(response.data);

            if (response.data.length > 0) {
                setNewRole(response.data[0].name);
            }
        });
    }, []);

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
            {/*<td><input className="edit-input" type="text" placeholder="Rol user"*/}
            {/*           value={newRole} onChange={e => setNewRole(e.target.value)}/></td>*/}
            <td>
                <select className="edit-input" value={newRole} onChange={e => setNewRole(e.target.value)}>
                    {roles.map(role => (
                        <option key={role.roleId} value={role.name}>{role.name}</option>
                    ))}
                </select></td>
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