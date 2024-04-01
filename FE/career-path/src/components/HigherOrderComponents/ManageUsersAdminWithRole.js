import withRole from './withRole';
import ManageUsersAdmin from '../../pages/ManageUsersAdmin/ManageUsersAdmin';


const ManageUsersAdminWithRole = withRole(ManageUsersAdmin, ['admin']);

export default ManageUsersAdminWithRole;