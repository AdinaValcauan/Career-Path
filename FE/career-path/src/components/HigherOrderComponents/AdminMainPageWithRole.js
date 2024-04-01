import withRole from './withRole';
import AdminMainPage from '../../pages/AdminMainPage/AdminMainPage';


const AdminMainPageWithRole = withRole(AdminMainPage, ['admin']);

export default AdminMainPageWithRole;