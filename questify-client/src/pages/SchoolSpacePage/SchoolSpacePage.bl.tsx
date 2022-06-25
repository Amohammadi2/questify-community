import { useRecoilState } from 'recoil';
import { authStore } from '../../store/auth.store';
import { SchoolSpacePageUI } from './SchoolSpacePage.ui';

export function SchooSpacelPageBL() {

  const [authValue] = useRecoilState(authStore);

  return (
    <SchoolSpacePageUI isAuth={authValue.isAuth} />
  )
}