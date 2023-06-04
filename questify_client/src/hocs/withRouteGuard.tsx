import { Navigate } from 'react-router-dom';
import { $isAuthenticated } from "@/store/auth.store";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

interface RouteGuardOpts {
  authOnly?: boolean;
  nonAuthOnly?: boolean;
  redirect?: string;
}

export function withRouteGuard(component: ReactNode, { authOnly=false, nonAuthOnly=false, redirect='/' }: RouteGuardOpts = {}) {
  
  const isAuth = useRecoilValue($isAuthenticated)

  if (
    (isAuth && authOnly) ||
    (!isAuth && nonAuthOnly) ||
    (!authOnly && !nonAuthOnly)
  )
    return component
  
  return <Navigate replace to={redirect} />
}