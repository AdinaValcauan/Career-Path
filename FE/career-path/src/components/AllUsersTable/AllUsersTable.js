import React from 'react';
import AddUserRow from "../AddUserRow/AddUserRow";

const AllUsersTable = ({
                           users,
                           editId,
                           handleEdit,
                           handleDelete,
                           handleUpdate,
                           handleExit,
                           handleSave,
                           updateFirstName,
                           setUpdateFirstName,
                           updateLastName,
                           setUpdateLastName,
                           updateEmail,
                           setUpdateEmail,
                           updatePassword,
                           setUpdatePassword,
                           updateRoles,
                           setUpdateRoles,
                           errMsgLine,
                           adding,
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
                           successMsg
                       }) => {


    return (
        <table className="users-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Prenume</th>
                <th>Nume</th>
                <th>Email</th>
                <th>Parola</th>
                <th>Rol</th>
                <th>Actiuni</th>
            </tr>
            </thead>
            <tbody style={{}}>
            {adding && (
                <AddUserRow
                    handleSave={handleSave}
                    setAdding={setAdding}
                    newFirstName={newFirstName}
                    newLastName={newLastName}
                    newEmail={newEmail}
                    newPassword={newPassword}
                    newRoles={newRoles}
                    setNewFirstName={setNewFirstName}
                    setNewLastName={setNewLastName}
                    setNewEmail={setNewEmail}
                    setNewPassword={setNewPassword}
                    setNewRoles={setNewRoles}
                    errMsgLine={errMsgLine}
                    successMsg={successMsg}
                />
            )}
            {users.map(user => (
                user.id === editId ?
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><input className="edit-input" type="text" value={updateFirstName}
                                   onChange={e => setUpdateFirstName(e.target.value)}/>
                        </td>
                        <td><input className="edit-input" type="text" value={updateLastName}
                                   onChange={e => setUpdateLastName(e.target.value)}/>
                        </td>
                        <td><input className="edit-input" type="text" value={updateEmail}
                                   onChange={e => setUpdateEmail(e.target.value)}/>
                        </td>
                        <td><input className="edit-input" type="text" placeholder="Parola nouă"
                                   value={updatePassword}
                                   onChange={e => setUpdatePassword(e.target.value)}/>
                        </td>
                        <td><input className="edit-input" type="text" value={updateRoles}
                                   onChange={e => setUpdateRoles(e.target.value)}/>
                        </td>
                        <td>
                            <button className="edit-button"
                                    onClick={() => handleUpdate(user.id, updateEmail, updatePassword, updateFirstName, updateLastName)}>Modifică
                            </button>
                        </td>
                        <td>
                            <button className="edit-button" onClick={handleExit}>Înapoi</button>
                        </td>
                        <td>
                            <p className={errMsgLine ? "errMsgLine" : "offscreen"} aria-live="assertive">
                                {errMsgLine}
                            </p>
                            <p className={successMsg ? "successMsg" : "offscreen"} aria-live="assertive">
                                {successMsg}
                            </p>
                        </td>
                    </tr>
                    :
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td> {user.lastName}</td>
                        <td>{user.email}</td>
                        <td></td>
                        <td>{user.roles}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(user.id)}>Editează</button>
                        </td>
                        <td>
                            <button className="edit-button" onClick={() => handleDelete(user.id)}>Șterge</button>
                        </td>
                        {/*<td>*/}
                        {/*    <p className={errMsgLine[user.id] ? "errMsgLine" : "offscreen"} aria-live="assertive">*/}
                        {/*        {errMsgLine[user.id]}*/}
                        {/*    </p>*/}
                        {/*</td>*/}
                    </tr>
            ))}
            </tbody>
        </table>
    );

};

export default AllUsersTable;