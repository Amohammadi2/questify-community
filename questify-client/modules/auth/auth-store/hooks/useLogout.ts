import { useSetRecoilState } from "recoil";
import { accountAtom, tokenAtom } from "../states";

export function useLogout() {

  const setAccount = useSetRecoilState(accountAtom);
  const setToken = useSetRecoilState(tokenAtom);

  const logout = () => {
    setAccount(null);
    setToken(null);
  }


  return { logout };

}