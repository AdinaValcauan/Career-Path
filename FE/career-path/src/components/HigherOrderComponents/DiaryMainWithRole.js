import withRole from './withRole';
import DiaryMain from '../../pages/DiaryMain/DiaryMain';


const DiaryMainWithRole = withRole(DiaryMain, ['admin','user']);

export default DiaryMainWithRole;