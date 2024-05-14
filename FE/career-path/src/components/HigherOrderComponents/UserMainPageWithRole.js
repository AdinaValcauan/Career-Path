import withRole from './withRole';
import UserMainPage from "../../views/UserMainPage/UserMainPage";


const UserMainPageWithRole = withRole(UserMainPage, ['user']);

export default UserMainPageWithRole;