import {useState} from 'react';

const ManageUsersAdmin = ({user}) => {
    const id = user.id;
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);


}