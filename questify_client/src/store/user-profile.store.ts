import { selector } from "recoil";
import { $isAuthenticated } from "./auth.store";
import { $usersApi } from "@/apis";
import { UserRetrieve } from "@/gen";

export const $userProfile = selector<UserRetrieve|null>({
  key: 'user-profile',
  get: async ({get}) => {
    const usersApi = get($usersApi)
    if (get($isAuthenticated)) {
      return await usersApi.usersMeRetrieve()
    }
    return null
  }
})