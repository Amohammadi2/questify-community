import axios, {AxiosRequestConfig} from 'axios';
import { useRecoilValue } from 'recoil';
import useAxios, {makeUseAxios} from 'axios-hooks';
import { tokenAtom } from 'modules/auth/auth-store/states';

const API_BASE_URL = "https://localhost:7224/api";

export function useAxiosClient(config: AxiosRequestConfig = {}) {

  const authToken = useRecoilValue(tokenAtom);

  const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': 'Bearer ' + authToken
    },
    ...config
  });
  return makeUseAxios({
    axios: axiosClient
  })
}