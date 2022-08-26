import { useRouter } from "next/router";

export function AppSideBarLink({ appHref="", children }) {
  const router = useRouter();

  return children({ 
    isActive: router.route.includes(appHref),
    go: ()=>router.push(appHref) 
  });
}