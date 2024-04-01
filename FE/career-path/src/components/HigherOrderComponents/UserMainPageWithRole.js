import withRole from './withRole';
import UserMainPage from "../../pages/UserMainPage/UserMainPage";


const UserMainPageWithRole = withRole(UserMainPage, ['user']);

export default UserMainPageWithRole;