import { Navigate } from 'react-router-dom'
import { $isAuthenticated } from "@/store/auth.store"
import { ReactNode } from "react"
import { useRecoilValue } from "recoil"

interface RouteGuardOpts {
  authOnly?: boolean;
  nonAuthOnly?: boolean;
  redirect?: string;
}

export function withRouteGuard(component: ReactNode, { authOnly=true, nonAuthOnly=false, redirect='/' }: RouteGuardOpts = {}) {
  
  const isAuth = useRecoilValue($isAuthenticated)

  if (
    (isAuth && authOnly) || // is authenticated and auth is required
    (!isAuth && nonAuthOnly) || // is not authenticated and being non-auth is required (opens to non-auth users only)
    (!authOnly && !nonAuthOnly) // there's no restriction
  )
    return component
  
  return <Navigate replace to={redirect} />
}