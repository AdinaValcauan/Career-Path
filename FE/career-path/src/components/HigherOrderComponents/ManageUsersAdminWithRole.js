import withRole from './withRole';
import ManageUsersAdmin from '../../views/ManageUsersAdmin/ManageUsersAdmin';


const ManageUsersAdminWithRole = withRole(ManageUsersAdmin, ['admin']);

export default ManageUsersAdminWithRole;