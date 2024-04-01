import withRole from './withRole';
import UserProfile from '../../pages/UserProfile/UserProfile';


const UserProfileWithRole = withRole(UserProfile, ['admin', 'user']);

export default UserProfileWithRole;