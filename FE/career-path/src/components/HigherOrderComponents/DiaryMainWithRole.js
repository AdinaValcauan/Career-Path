import withRole from './withRole';
import DiaryMain from '../../views/DiaryMain/DiaryMain';


const DiaryMainWithRole = withRole(DiaryMain, ['admin', 'user']);

export default DiaryMainWithRole;