import withRole from './withRole';
import AdminMainPage from '../../views/AdminMainPage/AdminMainPage';


const AdminMainPageWithRole = withRole(AdminMainPage, ['admin']);

export default AdminMainPageWithRole;