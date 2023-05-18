import { useAxiosClient } from "./client";

export function useGetAuthTokenAPI() {
  const client = useAxiosClient({
    url: '/'
  });


}