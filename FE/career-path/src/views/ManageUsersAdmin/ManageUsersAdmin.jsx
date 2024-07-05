import "./ManageUsersAdmin.css";
import {useEffect, useState} from 'react';
import {addUserService, deleteUserService, getUsersService, updateUserService} from "../../services/userService";
import Menu from "../../components/Menu/Menu";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import {useEffectValidation} from "../../hooks/useEffectValidation";
import AllUsersTable from "../../components/AllUsersTable/AllUsersTable";
import {createHandleUpdateUser} from "../../utils/createHandleUpdateUser";
import Footer from "../../components/Footer/Footer";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal.setAppElement('#root');

const ManageUsersAdmin = ({user}) => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [updateFirstName, setUpdateFirstName] = useState("");
    const [updateLastName, setUpdateLastName] = useState("");

    const [updateEmail, setUpdateEmail] = useState("");
    const [validUpdateEmail, setValidUpdateEmail] = useState(false);
    const [validNewEmail, setValidNewEmail] = useState(false);

    const [updatePassword, setUpdatePassword] = useState("");
    const [validUpdatePassword, setValidUpdatePassword] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(false);

    const [updateRole, setUpdateRole] = useState("");

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('');

    const [errMsgLine, setErrMsgLine] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [editId, setEditId] = useState(null);
    const [adding, setAdding] = useState(false);

    const handleAdd = () => {
        setAdding(true);
    };

    useEffect(() => {
        fetchUsers().then(r => console.log("Users fetched"));
    }, []);

    const fetchUsers = async () => {
        const response = await getUsersService();

        const sortedUsers = response.data.sort((a, b) => {
            if (a.role && a.role.name === 'admin' && (!b.role || b.role.name !== 'admin')) {
                return -1;
            }
            if ((!a.role || a.role.name !== 'admin') && b.role && b.role.name === 'admin') {
                return 1;
            }
            return 0;
        });
        setUsers(sortedUsers);
    };

    const handleEdit = (id) => {
        setEditId(id);

        const userToEdit = users.find(user => user.id === id);
        setUpdateFirstName(userToEdit.firstName);
        setUpdateLastName(userToEdit.lastName);
        setUpdateEmail(userToEdit.email);
        setUpdateRole(userToEdit.role.name);
    }

    useEffectValidation(updateEmail, EMAIL_REGEX, setValidUpdateEmail);
    useEffectValidation(updatePassword, PASSWORD_REGEX, setValidUpdatePassword);

    const handleUpdate = createHandleUpdateUser(setErrMsgLine, setSuccessMsg, setIsLoading, fetchUsers, updateUserService);

    const handleDelete = async (id) => {
        const {success, error} = await deleteUserService(id);

        if (error) {
            setErrMsgLine(error);
        } else if (success) {
            await fetchUsers();
        }
    }

    const handleExit = () => {
        setEditId(null); // Exit edit mode

        fetchUsers();
        // Reset the update fields
        setUpdateFirstName("");
        setUpdateLastName("");
        setUpdateEmail("");
        setUpdatePassword("");
        setUpdateRole("");
        setErrMsgLine("");
        setSuccessMsg("");
    }

    useEffectValidation(newEmail, EMAIL_REGEX, setValidNewEmail);
    useEffectValidation(newPassword, PASSWORD_REGEX, setValidNewPassword);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsgLine("");
        // setSuccessMsg(null)

        if (!newEmail || !newPassword || !newFirstName || !newLastName || !newRole) {
            setErrMsgLine("Exista câmpuri incomplete!");
            setIsLoading(false);
            return;
        }

        if (!validNewEmail && !validNewPassword) {
            setErrMsgLine("Email și parolă invalide");
            setIsLoading(false);
            return;
        } else if (!validNewEmail) {
            setErrMsgLine("Email invalid");
            setIsLoading(false);
            return;
        } else if (!validNewPassword) {
            setErrMsgLine("Parolă invalidă");
            setIsLoading(false);
            return;
        }

        const {success, error} = await addUserService(newFirstName, newLastName, newEmail, newPassword, newRole);

        if (error) {
            setErrMsgLine(error);
        } else if (success) {
            setAdding(false);
            await fetchUsers();
            setNewFirstName("");
            setNewLastName("");
            setNewEmail("");
            setNewPassword("");
            setNewRole("");
        }
        setIsLoading(false);
    }

    return (
        <div>
            <ToastContainer/>
            <div className="manage-container">
                <Menu menuItems={MenuItemsAdmin}/>

                <div className="table-container">
                    <button className="edit-button" onClick={handleAdd}>Adaugă un user nou</button>

                    <AllUsersTable
                        users={users}
                        editId={editId}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleUpdate={(id) => handleUpdate(id, updateEmail, validUpdateEmail, updatePassword, validUpdatePassword, updateFirstName, updateLastName, updateRole)}
                        handleExit={handleExit}
                        handleSave={handleSave}
                        updateFirstName={updateFirstName}
                        setUpdateFirstName={setUpdateFirstName}
                        updateLastName={updateLastName}
                        setUpdateLastName={setUpdateLastName}
                        updateEmail={updateEmail}
                        setUpdateEmail={setUpdateEmail}
                        updatePassword={updatePassword}
                        setUpdatePassword={setUpdatePassword}
                        updateRole={updateRole}
                        setUpdateRole={setUpdateRole}
                        errMsgLine={errMsgLine}
                        adding={adding}
                        setAdding={setAdding}
                        newFirstName={newFirstName}
                        newLastName={newLastName}
                        newEmail={newEmail}
                        newPassword={newPassword}
                        newRole={newRole}
                        setNewFirstName={setNewFirstName}
                        setNewLastName={setNewLastName}
                        setNewEmail={setNewEmail}
                        setNewPassword={setNewPassword}
                        setNewRole={setNewRole}
                        successMsg={successMsg}
                    />
                </div>
                {/*<Footer></Footer>*/}
            </div>
            <Footer/>
        </div>
    );
}

export default ManageUsersAdmin;