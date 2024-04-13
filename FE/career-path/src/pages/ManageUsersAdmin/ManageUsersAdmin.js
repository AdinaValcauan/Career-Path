import "./ManageUsersAdmin.css";
import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {addUserService, deleteUserService, getUsersService, updateUserService} from "../../services/userService";
import Menu from "../../components/Menu/Menu";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import {useEffectValidation} from "../../components/useEffectValidation";

Modal.setAppElement('#root');

const ManageUsersAdmin = ({user}) => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [updateFirstName, setUpdateFirstName] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [updateLastName, setUpdateLastName] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [updateEmail, setUpdateEmail] = useState("");
    const [validUpdateEmail, setValidUpdateEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [updatePassword, setUpdatePassword] = useState("");
    const [validUpdatePassword, setValidUpdatePassword] = useState(false);

    const [roles, setRoles] = useState("");
    const [rolesFocus, setRolesFocus] = useState(false);
    const [updateRoles, setUpdateRoles] = useState("");

    const [errMsg, setErrMsg] = useState(""); // error message to display
    const [success, setSuccess] = useState(false); // true if form is valid

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState('center')

    const [editId, setEditId] = useState(-1);

    useEffectValidation(email, EMAIL_REGEX, setValidEmail);
    useEffectValidation(password, PASSWORD_REGEX, setValidPassword);

    const handleOpenModal = () => {
        console.log("open modal")
        setShowModal(true);
        console.log(showModal);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsersService();

        // sort the users so that the admins are at the top
        const sortedUsers = response.data.sort((a, b) => {
            if (a.roles === 'admin' && b.roles !== 'admin') {
                return -1;
            }
            if (a.roles !== 'admin' && b.roles === 'admin') {
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
        setUpdateRoles(userToEdit.roles);
    }

    useEffectValidation(updateEmail, EMAIL_REGEX, setValidUpdateEmail);
    useEffectValidation(updatePassword, PASSWORD_REGEX, setValidUpdatePassword);

    const handleUpdate = async (id) => {
        setIsLoading(true);
        setErrMsg("");

        if (updateEmail && !validUpdateEmail) {
            setErrMsg("Not a valid email");
            setIsLoading(false);
            return;
        }
        if (updatePassword && !validUpdatePassword) {
            setErrMsg("Not a valid password");
            setIsLoading(false);
            return;
        }

        const updatedUser = {id, updateFirstName, updateLastName, updateEmail, updatePassword, updateRoles};

        const {success, error} = await updateUserService(updatedUser);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            await fetchUsers();
            setEditId(-1);

            setUpdateFirstName("");
            setUpdateLastName("");
            setUpdateEmail("");
            setUpdatePassword("");
            setUpdateRoles("");
        }

        setIsLoading(false);
    }

    const handleDelete = async (id) => {
        const {success, error} = await deleteUserService(id);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            await fetchUsers();
        }
    }

    const handleExit = () => {
        setEditId(-1); // Exit edit mode

        fetchUsers();
        // Reset the update fields
        setUpdateFirstName("");
        setUpdateLastName("");
        setUpdateEmail("");
        setUpdatePassword("");
        setUpdateRoles("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg("");

        if (!email || !password || !firstName || !lastName || !roles) {
            setErrMsg("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!validEmail && !validPassword) {
            setErrMsg("Please enter a valid email and password");
            setIsLoading(false);
            return;
        } else if (!validEmail) {
            setErrMsg("Please enter a valid email");
            setIsLoading(false);
            return;
        } else if (!validPassword) {
            setErrMsg("Please enter a valid password");
            setIsLoading(false);
            return;
        }

        const {success, error} = await addUserService(firstName, lastName, email, password, roles);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            await fetchUsers();
            handleCloseModal();
        }
    }

    return (
        <div className="container">
            <Menu menuItems={MenuItemsAdmin}/>
            {/*<Hero/>*/}

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody style={{}}>
                {users.map(user => (
                    user.id === editId ?
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><input type="text" value={updateFirstName}
                                       onChange={e => setUpdateFirstName(e.target.value)}/>
                            </td>
                            <td><input type="text" value={updateLastName}
                                       onChange={e => setUpdateLastName(e.target.value)}/>
                            </td>
                            <td><input type="text" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)}/>
                            </td>
                            <td><input type="text" placeholder="Enter new password" value={updatePassword}
                                       onChange={e => setUpdatePassword(e.target.value)}/>
                            </td>
                            <td><input type="text" value={updateRoles} onChange={e => setUpdateRoles(e.target.value)}/>
                            </td>
                            <td>
                                <button className="editButton" onClick={() => handleUpdate(user.id)}>Update</button>
                            </td>
                            <td>
                                <button className="editButton" onClick={handleExit}>Exit</button>
                            </td>
                            <td>
                                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                                    {errMsg}
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
                                <button className="editButton" onClick={() => handleEdit(user.id)}>Edit</button>
                            </td>
                            <td>
                                <button className="editButton" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                            <td>
                                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                                    {errMsg}
                                </p>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>

            <button className="editButton" onClick={handleOpenModal}>Add</button>
            <Modal
                isOpen={showModal}
                position={modalPlacement}
                onRequestClose={handleCloseModal}
                contentLabel="Add user"
            >
                <div className="modal-content">
                    <h2 className="modal-title">Add user</h2>
                    <button className="modal-action" onClick={handleCloseModal}>X</button>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Enter first name'
                                   onChange={e => setFirstName(e.target.value)}/>
                            <input type="text" placeholder='Enter last name'
                                   onChange={e => setLastName(e.target.value)}/>
                            <input type="text" placeholder='Enter email' onChange={e => setEmail(e.target.value)}/>
                            <input type="password" placeholder='Enter password'
                                   onChange={e => setPassword(e.target.value)}/>
                            <input type="text" placeholder='Enter role' onChange={e => setRoles(e.target.value)}/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <br></br>
                        <button className="editButton" type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ManageUsersAdmin;