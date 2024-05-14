import withRole from './withRole';
import UserProfile from '../../views/UserProfile/UserProfile';


const UserProfileWithRole = withRole(UserProfile, ['admin', 'user']);

export default UserProfileWithRole;