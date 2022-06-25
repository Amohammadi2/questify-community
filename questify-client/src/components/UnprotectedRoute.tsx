import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authStore } from "../store/auth.store";

export function UnprotectedRoute() {
  
  const [authValue] = useRecoilState(authStore);

  return (
    (!authValue.isAuth) ? <Outlet /> : <Navigate to='/app/school-space' />
  )
}