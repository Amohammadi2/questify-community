import { IAccount } from "../../entities";
import { useSetRecoilState } from "recoil";
import { accountAtom, tokenAtom } from "../states";

export function useLogin() {
  const setAccount = useSetRecoilState(accountAtom);
  const setToken = useSetRecoilState(tokenAtom);

  const login = (accessToken: string, accountData: IAccount) => {
    setAccount(accountData);
    setToken({ access: accessToken });
  }

  return { login };
}