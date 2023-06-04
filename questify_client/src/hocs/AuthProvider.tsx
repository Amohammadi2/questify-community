import { useAuthentication } from "@/hooks/useAuthenticate"
import { RcBaseProps } from "@/interfaces/RCBaseProps.interface"

export default function AuthProvider(props: RcBaseProps) {
  
  const { loading } = useAuthentication()
  
  if (loading)
    return null // block the rendering

  return <>{props.children}</>;
}