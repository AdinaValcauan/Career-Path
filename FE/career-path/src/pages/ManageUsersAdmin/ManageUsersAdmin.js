import "./ManageUsersAdmin.css";
import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {addUserService, getUsersService} from "../../services/userService";
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

    const [lastName, setLastName] = useState("");
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [roles, setRoles] = useState("");
    const [rolesFocus, setRolesFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(""); // error message to display
    const [succes, setSucces] = useState(false); // true if form is valid

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState('center')

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

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleSave = async (updatedUser) => {
        await updateUserService(updatedUser);
        await fetchUsers();
        setSelectedUser(null);
    };

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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.roles}</td>
                        <td>
                            <button className="editButton" onClick={() => handleEditClick(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*{selectedUser && (*/}
            {/*    <EditUser*/}
            {/*        user={selectedUser}*/}
            {/*        onSave={handleSave}*/}
            {/*        onClose={() => setSelectedUser(null)}*/}
            {/*    />*/}
            {/*)}*/}

            <button onClick={handleOpenModal}>Add</button>
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
                        <button className="modal-action" type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ManageUsersAdmin;